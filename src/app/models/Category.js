const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: {type: String, required: true},
    code: {type: String},
    createDate: {type: Date},
    updateDate: {type: Date},
});


module.exports = mongoose.model('categorys', CategorySchema);