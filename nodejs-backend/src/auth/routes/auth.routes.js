const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.register(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const user = await authService.getUserFromToken(token);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router; 