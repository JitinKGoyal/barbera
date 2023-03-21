const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'worker'
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

module.exports = mongoose.model("order", OrderSchema);