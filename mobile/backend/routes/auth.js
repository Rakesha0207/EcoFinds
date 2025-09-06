const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let users = [];

router.post('/signup', (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) return res.status(400).json({ msg: "Email and password required" });
  if (users.find(u => u.email === email)) return res.status(400).json({ msg: "Email exists" });
  const user = { id: uuidv4(), email, password, username: username||'', purchases: [], cart: [] };
  users.push(user);
  res.json({ msg: "OK", user });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  res.json({ msg: "OK", user });
});

module.exports = router;
