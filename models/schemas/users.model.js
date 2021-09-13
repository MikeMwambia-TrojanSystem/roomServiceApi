const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

//To do : - Use Joi for validation
const userSchema = new Schema ({
    etheAddress : {
        type : Number , 
        required : [true,'Please enter a valid Ethereum Address'],
        unique : true
    },
    company : {
        type : String,
        required : [true,'Please enter a valid Company Name']
    }
})