//FAKE DATA ON LOCAL STORAGE

class Database {
  constructor(initialStorage) {
    this.storage = initialStorage;
  }

  // Returns all products currently in the store inventory.
  getProducts() {
    return this.storage.products;
  }

  // Returns a specific product in the store inventory.
  getProduct(id) {
    return this.storage.products.find(product => product.id === id);
  }

  // Retrieves the current working cart of the consumer.
  getCart() {
    return this.storage.cart.map(item => ({
      id: item.id,
      qty: item.qty,
      name: this.getProduct(item.id).name,
      price: this.getProduct(item.id).price,
    }));
  }


  // Changes the cart to the current items
  editCart(items) {
    this.storage.cart = items;
  }

  // Check to see if cart contains a specific item
  cartContainsItem(item) {
    return this.storage.cart.find(itemInCart => itemInCart.id === item.id)
  }

  // Adds new items to the cart
  addItemsToCartWithoutDuplicates(itemsToAdd) {

    // Sets a duplicate of the cart to modify
    let updatedCart = this.storage.cart;

    itemsToAdd.forEach(importedItem => {
      this.validateProductExists(importedItem);

      updatedCart.forEach(itemInCart => {

        /** Compares new/added item to every cart item
         *  If the added item is already somewhere in the cart, AND
         *  if it's the same item being compared, remove the old entry
         *  and add the new one with the updated quantity. */
        if (this.cartContainsItem(importedItem) && importedItem.id === itemInCart.id) {
          let replacementItem = { id: importedItem.id, qty: (itemInCart.qty + importedItem.qty) }
          updatedCart = updatedCart.filter(cartItems => cartItems.id !== importedItem.id);
          updatedCart.push(replacementItem);

          /** If the cart does NOT contain the item being compared
           * AND the item does NOT already exist in the cart,
           * add the new item!
          */
        } else if (!this.cartContainsItem(importedItem) && importedItem.id !== itemInCart.id) {
          updatedCart.push(importedItem);
        }
        /** Otherwise, if the item being compared is already in the cart
           *somewhere, but is NOT the one being compared, DO NOTHING. */

        this.storage.cart = updatedCart;
      })
    })

  }

  // Generates a random order# between 0 and 10000.
  orderNumber() {
    return Math.floor(Math.random() * 10000);
  }

  // Removes a specific item from the current working cart.
  removeItemFromCart(id) {
    
    let cart = this.storage.cart.filter(item => item.id === id);
    this.storage.cart = cart;
  }

  /** Checks to see if the product to be added even exists (or
    * possibly if it's in stsock). */
  validateProductExists(item) {
    const product = this.getProduct(item.id);
    if (!product) {
      throw ('This product doesn\'t exist')
    }
  }
}

// A mock storage containing the store's inventory.
const initialStorage = {
  cart: [{
    id: 1,
    qty: 1,
    price: 10
  }],

  products: [{
    id: 1,
    price: 10,
    name: 'cup'
  },
  {
    id: 2,
    price: 15,
    name: 'plate'
  },
  {
    id: 3,
    price: 5,
    name: 'spoon'
  },
  {
    id: 4,
    price: 5,
    name: 'fork'
  },
  ]
}

module.exports = new Database(initialStorage)
