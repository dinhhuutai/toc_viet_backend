const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
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
        type: Number,
    },
    view: {
        type: String,
    },
    sex: {
        type: Boolean,
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
        },
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

module.exports = mongoose.model("services", ServiceSchema);
