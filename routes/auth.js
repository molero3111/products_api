const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.JWT_SECRET_KEY;

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, email, password });
        await user.save();
        const payload = { id: user.id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
        res.status(201).json({ 
            message: "Registration completed successfully",
            token 
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid email' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

        const payload = { id: user.id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
        res.status(200).json({ 
            message: "Login successful",
            token 
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
