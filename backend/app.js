const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();  // To load environment variables

const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse incoming JSON requests

// Static file serving for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload setup using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
});

const upload = multer({ storage: storage });

// Example route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Wedding Photo Upload API!');
});

// Route to handle photo uploads
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send({
        message: 'File uploaded successfully!',
        fileUrl: `/uploads/${req.file.filename}`
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Import user routes
const userRoutes = require('./routes/user');

// Use the user routes
app.use('/api/users', userRoutes);

// Import photos routes
const photoRoutes = require('./routes/photos');

// Use the photos routes
app.use('/api/photos', photoRoutes);