const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter a name"]
    },
    email: {
        type: String,
        required: [true, "Enter an email"]
    },
    password: {
        type: String,
        required: [true, "Enter a password"]
    },
    profession: {
        type: String,
        required: [true, "Enter person's profession"]
    },
    photo_url: {
        type: String,
        required: [true, "Enter url for user"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    }
});

module.exports = mongoose.model("user", UserSchema);