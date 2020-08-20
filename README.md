# Book Giveaway - MERN APP

> A social network for peoples to giveaway books

### The APP live at https://book-giveaway.herokuapp.com/

### The API live at https://documenter.getpostman.com/view/6870044/T1LTe4eW?version=latest

---

# Giveaway Workflow

1. Giver: Post book to giveaway (isGave: false)
2. Receiver: Enter giveaway (create request, create notification to book owner)
3. Giver: Accept Request (create transaction: pending, delete all requests of the book, isGave: true, create notification to request owner)
4. Receiver: Received book, make done (change transaction status: success)
   \*\*If book owner don't want to giveaway, owner can cancel transaction (change transaction status: fail)

---

# Functionality

## Authetication

- Register User
- Login User (Block user when fail login over 3 times)
- Logout User
- Active Account
- Resend Email to Active Account
- Forgot Password
- Reset Password
- Google OAuth
- Facebook OAuth

## Profile (Required Auth)

- Get Profile
- Update Profile
- Change Password
- Change Email
- Change Avatar

## Books

- Get Books (pagination, limit, search, filter, sort)
- Get Book
- Create Book (Required Auth)
- Edit Book (Required Owner)
- Delete Book (Required Owner)
- Get All My Books (Required Auth)

## Category

- Get All Categories
- Get Category
- Get Descendants
- Create Category (Required Admin)
- Rename Category (Required Admin)
- Change Parent (Required Admin)
- Delete Category (Required Admin)

## Enter Giveaway

- Create Request - Enter Giveaway (Required Auth)
- Get All Requests (Required Admin)
- Get All My Requests (Required Auth)
- Get All Requests by BookId
- Delete Request (Required Owner)

## Transactions

- Create Transaction - Choose Participant (Required Book Owner)
- Get Transaction
- Get All My Transactions (Required Auth)
- Change Transaction Status (Required Auth):
  - Receiver can mark as received book
  - Giver can cancel transaction

## Notifications (Required Auth)

- Get All My Notifications
- Mark as Read or Unread Notification
- Mark All as Read Notifications
- Delete Notification
- Delete All Notifications

## Find Books Near Me

----- Building

## Realtime Chat

----- Building

# Quick Start

### Add a .env file in root

```
PORT=5000
NODE_ENV=development
MONGO_URI=

AVATAR_DEFAULT=
BOOKCOVER_DEFAULT=

JWT_SECRET=
JWT_EXPIRE=(number)d
JWT_COOKIE_EXPIRE=number

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
TOKEN_EXPIRE=number

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLOUDINARY_URL=
MAX_SIZE=number
```

### Install server dependencies

```
npm install
```

### Install client dependencies

```
cd client
npm install
```

### Run both Express & React from root

```
npm run dev
```

### Debug server

```
npm run debug
```

### Build for production

```
cd client
npm run build
```

---

## App Info

### Author

Tuong Huynh

### Version

1.0.0

### License

This project is licensed under the MIT License
