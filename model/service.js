const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    title: {type: String, required: true},
    headline: {type: String, required: true},
    description:{type:String, required: true},
    twitter: {type: String, required: true},
    instagram: {type: String, required: true},
});

module.exports = mongoose.model('Service', serviceSchema);