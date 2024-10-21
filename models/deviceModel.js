const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Please enter user ID"]
    },

    deviceName: {
        type: String,
        required: [true, "Please enter device name"]
    },

    category: {
        type: String,
        required: [true, "Please enter category"]
    },

    status: {
        type: Boolean,
        required: [true, "Please enter status"],
        default: false
    }
});

module.exports = mongoose.model("device", deviceSchema);