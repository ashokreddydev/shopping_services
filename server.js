var express = require('./config/express');
var server = express();

var config = require('./config/config')
global.responseHandler = require('./Helpers/responseHandler')

var mongo = require('./config/mongoose')();

server.listen(config.port)
console.log("Your Port Number:" + config.port)

