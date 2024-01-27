const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    status: {type: String},
    phone: {type: String},
    address: {type: String},
    idProduct: {type: Schema.Types.ObjectId, ref: 'products'},
    createDate: {type: Date},
    updateDate: {type: Date},
});


module.exports = mongoose.model('orders', OrderSchema);