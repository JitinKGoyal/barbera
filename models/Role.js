const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "ACTIVE"
    },
    createdOn: {
        type: Date,
        required: true
    },
    updatedOn: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("role", RoleSchema);