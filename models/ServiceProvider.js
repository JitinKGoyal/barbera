const mongoose = require("mongoose");

const ServiceProviderSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    availability: {
        type: Boolean,
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

module.exports = mongoose.model("serviceProvider", ServiceProviderSchema);