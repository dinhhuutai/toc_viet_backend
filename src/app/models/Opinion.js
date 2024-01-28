const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpinionSchema = new Schema({
    image: { type: String },
    name: { type: String },
    content: { type: String },
    createDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("opinions", OpinionSchema);
