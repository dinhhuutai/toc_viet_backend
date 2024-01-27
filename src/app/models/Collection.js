const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    name: {
        type: String,
    },
    images: [
        {
            type: String,
        },
    ],
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
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("collections", CollectionSchema);
