const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let invoiceSchema = new Schema({
    invoiceNumber:{
        type: Number,
        required: true
    },
    net:{
        type: Number,
        required: true
    },
    tax:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: new Date()
    },
    total:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model( 'invoice', invoiceSchema);