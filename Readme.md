Features (MVP — build this first)

User Authentication:

Register
Login
Logout

Tasks:

Create task
View tasks
Update task
Delete task
Mark completed

Extra:

Priority (High/Medium/Low)
Due date
Search tasks
Filter completed/pending
Tech Stack

Frontend:

React
React Router
Axios
Context API (or Redux later)
Tailwind CSS

Backend:

Node.js
Express.js
JWT authentication
bcryptjs

Database:

MongoDB + Mongoose

Deployment:

Frontend → Vercel
Backend → Render
DB → MongoDB Atlas
Project Structure

Backend:

server/
│
├── controllers/
│      authController.js
│      taskController.js
│
├── middleware/
│      authMiddleware.js
│
├── models/
│      User.js
│      Task.js
│
├── routes/
│      authRoutes.js
│      taskRoutes.js
│
├── config/
│      db.js
│
├── .env
├── server.js
└── package.json

client/

src/
│
├── pages/
│      Login.jsx
│      Register.jsx
│      Dashboard.jsx
│
├── components/
│      Navbar.jsx
│      TaskCard.jsx
│      AddTask.jsx
│
├── context/
│      AuthContext.jsx
│
├── services/
│      api.js
│
└── App.jsx