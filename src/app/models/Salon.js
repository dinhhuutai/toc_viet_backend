const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalonSchema = new Schema({
    logo: {
        type: String,
    },
    address: {
        type: String,
    },
    linkFb: {
        type: String,
    },
    linkZalo: {
        type: String,
    },
    linkTiktok: {
        type: String,
    },
    linkYoutube: {
        type: String,
    },
    imageFanpage: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    openHour: {
        type: String,
    },
    introduce: {
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

module.exports = mongoose.model("salons", SalonSchema);
