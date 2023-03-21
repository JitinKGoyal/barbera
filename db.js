const mongoose = require('mongoose');
const { dbURI } = require('./config');

const connectMongo = () => {
    mongoose.connect(dbURI, () => {
        console.log("mongo connection is establised");
    });
}

module.exports = connectMongo;
