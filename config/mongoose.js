var mongoose = require('mongoose');
var config = require("./config");

module.exports = function () {
    mongoose.connect(config.db, function (err, data) {
        if (!err) {
            console.log("database connected");
            global.products = require("../app/models/product.model");
            global.cart = require("../app/models/cart.model");

        }
        else {
            console.log("error");
        }
    })
}