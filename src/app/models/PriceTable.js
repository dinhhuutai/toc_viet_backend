const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceTableSchema = new Schema({
    service: {
        type: String,
    },
    type: [
        {
            detail: {
                type: String,
            },
            price: {
                type: Number,
            },
            isPriceRange: {
                type: Boolean,
            },
            priceMin: {
                type: Number,
            },
            priceMax: {
                type: Number,
            },
        },
    ],
    price: {
        type: Number,
    },
    isPriceRange: {
        type: Boolean,
    },
    priceMin: {
        type: Number,
    },
    priceMax: {
        type: Number,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("pricetables", PriceTableSchema);
