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
      price: this.getProduct(item.id).price
    }));
  }


  //I FEEL LIKE THIS IS ALL WRONG...
  addItemsToCart(items) {
    items.forEach(item => {
      this.validateProductExists(item)

      //IS THIS LOGIC CORRECT?
      if (this.storage.cart.includes(item.id)) {
        let foundItem = this.storage.cart.find(cartItem => cartItem.id === item.id);
        //DO I NEED TO PARSEINT THIS FOLLOWING LINE?
        this.item.qty += foundItem.qty;
        this.removeItemFromCart(item.id);

      }

    })

    this.storage.cart.push(...items)
  }


  //IS THERE A SIMPLER WAY TO CALCULATE THIS? DOES THIS EVEN WORK?
  calculateCosts() {
    this.getCart().forEach(item => {
      this.totalCost += parseInt(item.price);
    })
    return this.totalCost;
  }

  // Generates a random order# between 0 and 10000.
  orderNumber() {
    return Math.floor(Math.random() * 10000);
  }

  // Removes a specific item from the current working cart.
  removeItemFromCart(id) {
    const cart = this.storage.cart.filter(item => item.id === id);
    this.storage.cart = cart;
  }

  /** Checks to see if the product to be added even exists (or
    * possibly if it's in stock). */
  validateProductExists(item) {
    const product = this.getProduct(item.id);
    if (!product) {
      throw ('This product doesn\'t exist')
    }
  }
}

// A mock storage containing the stores inventory.
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
