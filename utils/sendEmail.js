const nodemailer = require('nodemailer');

module.exports = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Book Giveaway<noreply@bookgiveaway.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Message sent: %s', info.messageId);
  }
};
