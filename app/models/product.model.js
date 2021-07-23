var mongoose = require('mongoose')

var productsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    size: { type: Array, enum: ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'] },
    image:{type:String},
    shipping: {
        free: { type: Boolean },
        price:{ type: Number },
    },
    seller:{type:Object}


});

module.exports = mongoose.model('product', productsSchema)
