const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    pageHome: [
        {
            type: String,
        },
    ],
    pageProduct: {
        type: String,
    },
    pageCollection: {
        type: String,
    },
    pageTrain: {
        type: String,
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

module.exports = mongoose.model("banners", BannerSchema);
