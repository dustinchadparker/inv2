let express = require('express');
let router = express.Router();
let db = require('../database');

// Retreives all products in the store inventory.
router.get('/products', function (req, res, next) {
  const products = db.getProducts();
  res.send(products);
})

module.exports = router;
