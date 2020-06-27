const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

// JWT strategy (auth middleware)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(null, false);
      }
    }
  )
);

// Local strategy (login middleware)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // Check for user
        const user = await User.findOne({ email }).select(
          'password wrongLogin'
        );
        if (!user) {
          return done(
            { statusCode: 401, message: 'Invalid credentials' },
            false
          );
        }

        // Check if wrongLogin over 5 times
        if (user.wrongLogin >= 5) {
          return done(
            {
              statusCode: 401,
              message:
                'The account has been locked because of wrong login more than 5 times. Please contact the admin to unlock the account.',
            },
            false
          );
        }

        // Check for password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          user.wrongLogin += 1;
          await user.save();

          return done(
            { statusCode: 401, message: 'Invalid credentials' },
            false
          );
        }

        user.wrongLogin = 0;
        await user.save();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
