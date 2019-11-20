let express = require('express');
let router = express.Router();
let db = require('../database');

router.get('/', function (req, res, next) {
    const cart = db.getCart();
    res.send(cart)
  })
  
  router.post('/', function (req, res, next) {
    const items = req.body
    try {
      db.addItemsToCart(items)
    } catch (error) {
      res.status(500).send(error)
    }
  
    const cart = db.getCart();
    res.send(cart);
  });
  
  router.delete('/:id', function (req, res, next) {
    const id = req.params.id
    db.removeItemFromCart(id)
    const cart = db.getCart()
    res.send(cart)
  })
  
  router.post('/checkout', function (req, res, next) {
    res.sendStatus(200);
  })

  
module.exports = router;
