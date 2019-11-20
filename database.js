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
      price: item.price
    }));
  }

  addItemsToCart(items) {
    items.forEach(item => {
      this.validateProductExists(item)
    })

    // may want to filter out duplicate cart entires here.
    // for example if I have 3 spoons in my cart
    // and i make a request to add 2 more, it should
    // update my spoon count to 5 instead of having
    // one entry of 3 spoons and one entry of 2 spoons

    this.storage.cart.push(...items)
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
