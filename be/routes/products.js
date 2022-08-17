const express = require('express');
const data = require('../data/products');
const router = express.Router();

router.get('/', function(req, res, next) {
  let products = data;
  let characteristic = req.query.characteristic ? req.query.characteristic : undefined;
  characteristic ? products = data.filter(element => element.characteristics && element.characteristics.includes(characteristic)) : null;
  res.send(products);
});

module.exports = router;
