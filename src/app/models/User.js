const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter user name'],
        trim: true,
        maxLength: [100, 'User name cannot exceed 100 characters']
    },
    username: {
        type: String,
        required: [true, 'Please enter user username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter user password'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.87/static/media/user-default.3ff115bb.png",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
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


module.exports = mongoose.model('users', UserSchema);