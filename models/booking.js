const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const bookingSchema = new mongoose.Schema({
    bookingStartDate: {
        type: Date,
        required: true
    },
    bookingEndDate: {
        type: Date,
        required: true
    },
    itemId: [{
        _id: {
            type: ObjectId,
            ref: 'Item',
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        night: {
            type: Number,
            required: true
        }
    }],
    userId: [{
        type: ObjectId,
        ref: 'User'
    }],
    bankId: [{
        type: ObjectId,
        ref: 'Bank'
    }],
    paymentProof: {
        type: String,
        required: true
    },
    bankFrom: {
        type: String,
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Booking', bookingSchema)