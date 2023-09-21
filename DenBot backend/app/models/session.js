const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    name: { type: String },
    avatar: { type: String },
    color: { type: String },
    gTagID: { type: String },
    zapierUrl: { type: String },
    bubbleText: { type: String },
    bubbleColor: { type: String },
    chatBackColor: { type: String },
    isLeft: { type:  Boolean},
    isAuto: { type:  Boolean},
    isTransparent: { type:  Boolean},
    isBubbleEnabled: { type: Boolean },
    isDisable: { type: Boolean },
    nodes: [{
        id: {
            type: String,
            trim: true,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        toolbarPosition: {
            type: String,
            default: "top"
        },
        position: {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        setData: {
            type: Object,
        },
        data: {
            type: Object,
        }
    }],
    edges: [{
        id: {
            type: String,
            trim: true,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: true
        },
        sourceHandle: {
            type: String,
        },
        targetHandle: {
            type: String,
        },
        animated: {
            type: Boolean,
            default: true
        },
    }],
    createdBy: { type: String }
}
);

module.exports = mongoose.model('Session', sessionSchema.plugin(mongoosePaginate), 'session');
