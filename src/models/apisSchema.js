const mongoose = require('mongoose');

const apisSchema = new mongoose.Schema({
    API: {
        type: String
    },
    Description: {
        type: String
    },
    Auth: {
        type: String
    },
    HTTPS: {
        type: Boolean
    },
    Cors: {
        type: String
    },
    Link: {
        type: String
    },
    Category: {
        type: String
    }
});

const apiSchema = mongoose.model('apiSchema', apisSchema);

module.exports = apiSchema;