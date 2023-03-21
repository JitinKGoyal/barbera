const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    preferedPaymentMethod: {
        type: String,
        default: "COD"
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    startOtp: {
        type: Number,
        required: true
    },
    endOtp: {
        type: Number,
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
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
});

module.exports = mongoose.model("booking", BookingSchema);