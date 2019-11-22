let express = require('express');
let router = express.Router();
let db = require('../database');

// Retreives all products in the store inventory.
router.get('/', function (req, res, next) {
  let products = db.getProducts();
  res.send(products);
})

module.exports = router;
