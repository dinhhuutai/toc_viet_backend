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
    information: {
        type: String,
    },
    expiry: {
        type: String,
    },
    ingredient: {
        type: String,
    },
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
        }
    ],
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("products", ProductSchema);
