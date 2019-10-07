'user strict';
var config = require('../config/config');
var mongoose = require('mongoose');

//TODO: this hard coded url should be in a env 
mongoose.connect(config.DATABASE_URL);
module.exports = mongoose;