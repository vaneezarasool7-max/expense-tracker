# Expense Tracker

A full-stack web app where users register, log in, and track their personal expenses. Each user sees only their own data, and a chart shows spending by category.

## Features

- User registration and login with JWT authentication
- Passwords hashed with bcrypt
- Add, view, edit and delete expenses (full CRUD)
- Each user's data is private (protected API routes)
- Pie chart of spending by category
- Protected pages with React Router and logout
- Dark responsive UI

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, Recharts
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas with Mongoose
- **Auth:** JSON Web Tokens, bcryptjs

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Create an account |
| POST | /api/auth/login | Log in and receive a token |
| GET | /api/expenses | Get my expenses |
| POST | /api/expenses | Add an expense |
| PUT | /api/expenses/:id | Edit an expense |
| DELETE | /api/expenses/:id | Delete an expense |

## Run Locally

```bash
git clone https://github.com/vaneezarasool7-max/expense-tracker.git
cd expense-tracker
```

Backend:

```bash
cd server
npm install
```

Create `server/.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

```bash
node index.js
```

Frontend (second terminal):

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## Author

Vaneeza Rasool - [GitHub](https://github.com/vaneezarasool7-max)