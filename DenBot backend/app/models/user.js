const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        select: false,
    },
    plan: {
        type: String,
        enum: ['Free', 'Monthly', 'Annually'],
        default: "Free"
    },
    paymentMethod: { type: String },
    expiredDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
    { strict: true }
);

module.exports = mongoose.model('User', userSchema.plugin(mongoosePaginate), 'user');
