const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    zapierUrl: {
        type: String,
        trim: true,
    },
});

module.exports = mongoose.model('Admin', adminSchema.plugin(mongoosePaginate), 'admin');
