const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: { 
        type: String, 
    },
    price: {
        type: String,
    },
    idCategory: {type: Schema.Types.ObjectId, ref: 'categorys'},
    view: {
        type: String,
    },
    comment: [
        {
            star: {
                type: String,
            },
            title: {
                type: String,
            },
            content: {
                type: String,
            },
            name: {
                type: String,
            },
            phone: {
                type: String,
            },
            image: {
                type: String,
            },
            feedback: {
                type: String,
                trim: true,
            },
            createDate: {
                type: Date,
                default: Date.now
            },
        },
    ],
    createDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("products", ProductSchema);
