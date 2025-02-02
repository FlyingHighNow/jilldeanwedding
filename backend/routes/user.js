const express = require('express');
const router = express.Router();

// In-memory storage for users (will replace with a database later)
const users = [];

// User registration route
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).send('User already exists.');
    }

    // Simulate saving the user (store in memory for now)
    users.push({ username, email, password });
    res.status(201).send('User registered successfully!');
});

module.exports = router;