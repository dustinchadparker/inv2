let express = require('express');
let router = express.Router();
let db = require('../database');

// Retrieves the current working cart.
router.get('/', function (req, res, next) {
  const cart = db.getCart();
  res.send(cart)
})

// Adds the specified items to the current cart. 
router.post('/', function (req, res, next) {
  const items = req.body

  try {
    db.addItemsToCart(items)
  } catch (error) {
    res.status(500).send(error)
    return
  }

  const cart = db.getCart();
  res.send(cart);
});

// Edits the current cart. 
router.put('/edit', function (req, res, next) {
  const items = req.body

  try {
    db.editCart(items)
  } catch (error) {
    res.status(500).send(error)
    return
  }
  const cart = db.getCart();
  res.send(cart);
});

// Deletes a specific item from the current cart.
router.delete('/:id', function (req, res, next) {
  const id = req.params.id
  db.removeItemFromCart(id)
  const cart = db.getCart()
  res.send(cart)
})

// Retrieves the total cost and order number of the items that were in the cart.
router.get('/checkout', function (req, res, next) {
  let totalCost = 0;

  db.getCart().forEach(item => {
    
    totalCost += (item.price * item.qty);
    console.log(totalCost);
  })

  let checkout = { cost: totalCost, orderNumber: db.orderNumber() };
  res.send(checkout);
})


module.exports = router;
