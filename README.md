# 🌐 Social Media Web App (MERN Stack)

A full-stack social media application built with the **MERN stack**: MongoDB, Express.js, React.js, and Node.js.

> 🔗 Inspired by JavaScript Mastery's project: [View Tutorial](https://www.youtube.com/watch?v=ngc9gnGgUdA)

---

## 📸 Preview

![App Screenshot](project-1.JPG)

---

## 📌 Features

- 🔐 User authentication (Sign up / Sign in)
- 📝 Create, edit, delete, and view posts
- 📄 Responsive UI with React
- ⚙ RESTful API with Express.js
- 🧠 MongoDB integration for data storage

---

## 🛠 Technologies Used

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas or local)
- **Auth:** JWT (JSON Web Tokens)
- **Dev Tools:** Nodemon, Concurrently

---

## ⚙ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB CLI](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Git (optional)

---

## 📦 Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Ahmed0754/Social-Media_Web_App.git
   cd Social-Media_Web_App
Install frontend and backend dependencies:

bash
Copy
Edit
cd client
npm install
cd ../server
npm install
Setup Environment Variables:

Create a .env file inside the server/ directory and add the following:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
▶ Running the App
Run both frontend and backend servers

Option A: Run separately in two terminals
bash
Copy
Edit
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
Option B: Run together (if using concurrently)
bash
Copy
Edit
npm run start:dev
Frontend runs on: http://localhost:3000

Backend runs on: http://localhost:5000

📂 Project Structure
bash
Copy
Edit
Social-Media_Web_App/
├── client/           # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── server/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env
├── README.md
└── project-1.JPG
🚧 Future Improvements
✅ User profiles

🗨️ Post comments

❤️ Likes and reactions

📦 Image uploads (Cloudinary or S3)

🔄 Real-time features (WebSockets)

🧪 Unit & integration tests

🚀 Deployment to Vercel / Render / Heroku

🤝 Contributing
Contributions are welcome! Here's how:

Fork the repo

Create a new branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature: xyz"

Push to your branch: git push origin feature-name

Open a Pull Request

📝 License
Currently unlicensed. Consider adding an MIT or Apache 2.0 license.

📫 Contact
Ahmed Ali
📧 ahmed0754@gmail.com
🔗 GitHub Profile

Built with 💻 by Ahmed — @Ahmed0754
