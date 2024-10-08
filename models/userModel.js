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
    }
});

module.exports = mongoose.model("user", UserSchema);