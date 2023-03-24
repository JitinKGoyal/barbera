const mongoose = require("mongoose");
const ServiceProvider = require("./ServiceProvider");

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
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
    status: {
        type: String,
        default: "ACTIVE"
    },
    role: {
        type: String,
        required: true
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

module.exports = mongoose.model("worker", WorkerSchema);