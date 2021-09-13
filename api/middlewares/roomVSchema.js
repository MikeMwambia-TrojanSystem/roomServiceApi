const Joi = require('joi');

exports.roomCreation =  Joi.object({
    
    roomNumber : Joi.number().min(0).max(20).required(),

    booked : Joi.boolean().required(),

    owner : Joi.string().min(3).max(100).required(),

    bookedBy : Joi.string().required(),

    availableTime : Joi.date().timestamp('javascript').required()
})


exports.roomBooking =  Joi.object({
    
    booked : Joi.boolean().required(),

    id : Joi.string().min(3).max(100).required(),

    bookedBy : Joi.string().required(),

    startTimeStamp : Joi.date().timestamp('javascript').required(),

    endTimeStamp : Joi.date().timestamp('javascript').required()
})


