const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerProductSchema = new Schema({
    image: { type: String },
    createDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("bannerProducts", BannerProductSchema);
