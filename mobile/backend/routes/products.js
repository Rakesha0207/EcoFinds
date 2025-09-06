const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let products = [];

router.get('/', (req, res) => {
  const { q, category } = req.query;
  let result = products;
  if (category) result = result.filter(p => p.category === category);
  if (q) result = result.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
  res.json(result);
});

router.post('/add', (req, res) => {
  const { ownerId, title, description, category, price, image } = req.body;
  if (!ownerId || !title) return res.status(400).json({ msg: "ownerId and title required" });
  const product = { id: uuidv4(), ownerId, title, description: description||'', category: category||'Other', price: price||0, image: image||null, createdAt: Date.now() };
  products.push(product);
  res.json({ msg: "OK", product });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ msg: "Not found" });
  products[idx] = { ...products[idx], ...req.body };
  res.json({ msg: "OK", product: products[idx] });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id !== id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
