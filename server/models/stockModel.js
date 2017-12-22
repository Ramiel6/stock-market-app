var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockModelSchema = new Schema({
    stockSymbol: String,
    stockData:[],
    quandlDBid:Number
});
module.exports = mongoose.model('stock', stockModelSchema);