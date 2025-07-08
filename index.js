require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');
const commentRoutes = require('./server/routes/comment');

//  Connect to MongoDB
mongoose.connect(process.env.dbURL)
  .then(() => console.log("✅ DB Connected!"))
  .catch(error => console.log(error));

//  Use CORS properly
app.use(cors());

//  Parse JSON body
app.use(express.json());

//  Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

//  API routes (fix this line!)
app.use('/api/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/api/comments', commentRoutes);

// Fallback 404 route (optional but useful)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

//  Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
