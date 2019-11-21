// fake data storage module

class Database {
  constructor(initialStorage) {
    this.storage = initialStorage;
  }

  getProducts() {
    return this.storage.products;
  }

  getProduct(id) {
    return this.storage.products.find(product => product.id === id);
  }

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

      //is this logic correct?
      if (this.storage.cart.includes(item.id)) {
        let foundItem = this.storage.cart.find(cartItem => cartItem.id === item.id);
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

  //generates random order number
  orderNumber() {
    return Math.floor(Math.random() * 10000);
  }

  removeItemFromCart(id) {
    const cart = this.storage.cart.filter(item => item.id === id);
    this.storage.cart = cart;
  }

  // cart validations
  validateProductExists(item) {
    const product = this.getProduct(item.id);
    if (!product) {
      throw ('This product doesn\'t exist')
    }
  }
}

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
