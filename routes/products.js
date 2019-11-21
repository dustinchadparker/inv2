let express = require('express');
let router = express.Router();
let db = require('../database');

router.get('/products', function (req, res, next) {
    const products = db.getProducts();
    res.send(products);
  })
  

module.exports = router;
