var mongoose = require('mongoose')

var cartSchema = new mongoose.Schema({
    productID:{type:String},
    qty:{type:String},
    userID:{type:String}, // not using
});

module.exports = mongoose.model('cart', cartSchema)