const express = require('express');
const products = require('../data/products');
const data = require('../data/products');
const router = express.Router();
const filteredProducts = products.filter(products => products.characteristics.includes(req.params.characteristics));

router.get('/data/products', function(req, res, next) {
  res.send(data)
});

router.get('/data/products/:characteristics', function(req, res, next) {
  res.send(filteredProducts)
});



module.exports = router;
