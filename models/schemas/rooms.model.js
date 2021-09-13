const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const roomSchema = new Schema ({

    roomNumber : {
        type : Number ,
        unique : true, 
        required : true
    },

    booked : {
        type : Boolean,
        required : true
    },

    //Cola or Pepsi
    owner : {
        type :String,
        required : true
    },

    //All bookings single day
    //TODO : - To support different days
    availableTime : {
        type : Date,
        required : true
    },

    bookings : {
        type : String
    }
    },{
        timestamps : true
    })
module.exports = roomSchema;