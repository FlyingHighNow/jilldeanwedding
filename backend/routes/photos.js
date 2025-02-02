const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// Set up multer to store the uploaded files in the 'uploads/' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp to avoid overwriting
    },
  });

const upload = multer({ storage: storage });
  
// List all uploaded photos
router.get('/', (req, res) => {
    const uploadDir = path.join(__dirname, '../uploads');
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to list files.');
        }
        // Send a list of uploaded file paths
        res.status(200).json(files.map(file => `/uploads/${file}`));
    });
});

// Upload photo route (for a single photo)
router.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.status(200).send({
    message: 'File uploaded successfully!',
    fileUrl: `/uploads/${req.file.filename}`, // Return URL for the uploaded file
  });
});


module.exports = router;