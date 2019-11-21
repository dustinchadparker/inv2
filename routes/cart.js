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
    res.sendStatus(200);

    const total = db.calculateCosts();
    const orderNumber = db.orderNumber();

    //THIS DOES NOT WORK -- WHY? BETTER WAY TO DO THIS OR DO I 
    //JUST NEED TO RETURN ONLY THE VALUES?
    res.send(<div><h1>#{orderNumber}</h1><br /><h1>${total}</h1></div>);
  })

  
module.exports = router;
