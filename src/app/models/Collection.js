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
