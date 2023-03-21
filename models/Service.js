const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    details: {
        type: Object,
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
        ref: 'serviceProvider',
        required: true
    }
});

module.exports = mongoose.model("service", ServiceSchema);