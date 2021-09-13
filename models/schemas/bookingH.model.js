const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const bookingH = new Schema ({

    roomId : {
        type : Number ,
        unique : true, 
        required : true
    },

    bookings : {
        type : [],
        required : true
    }

    },{
        timestamps : true
    })
module.exports = bookingH;