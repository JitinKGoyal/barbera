const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
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
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'serviceProvider'
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'worker'
    }

});

module.exports = mongoose.model("review", ReviewSchema);