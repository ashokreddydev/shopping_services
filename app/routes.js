var products = require("./controllers/products.ctrl");

module.exports = function (app) {
  app.get('/api/getProducts',products.getProducts)
  app.post('/api/addProducts',products.addProducts)
  app.get('/api/addCart/:productID',products.addCart)
  app.delete('/api/deleteCart/:productID',products.deleteCart,products.addCart)
}

 

