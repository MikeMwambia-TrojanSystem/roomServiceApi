//Validation
const Joi = require('joi');
const creationSchema = require('./roomVSchema').roomCreation;
const bookingSchema = require('./roomVSchema').roomBooking;

//Request Handler
const path = require('path');
const RequestHandler = require(path.join(__dirname,'..','..','util','requestHandler.js'));
const Logger = require(path.join(__dirname,'..','..','loaders','logger'));
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

//Room service
const roomService = require(path.join(__dirname,'..','..','services','roomService.js'));
let roomservice = new roomService();

//Config
const config = require(path.join(__dirname,'..','..','config')).config;

module.exports = class validation {

    constructor (){

    }

    async validateRequest(req,res){

        //Globals
        this.req = req;
        this.res = res;
        this.baseUrl = req.url;

        return await this.extractUrl(req);
        
    }


    async extractUrl(){

        let baseUrl = this.baseUrl;
        //Create rooms route
        let createRoute = baseUrl.indexOf(config.rooms.createRooms);
        //Get rooms route
        let getRooms = baseUrl.indexOf(config.rooms.getRooms);
        //Make booking route
        let makeBooking = baseUrl.indexOf(config.rooms.makeBooking);
        //Cancel booking route
        let cancelBooking = baseUrl.indexOf(config.rooms.cancelBooking);

        try {
            if(createRoute > -1){
               await this.validateCreation(this.req);
            }else if(getRooms > -1){
               await this.getAvailableRooms();
            }else if(makeBooking > -1){
                await this.validateBooking(this.req,true);
            }else if(cancelBooking > -1){
                this.validateBooking(this.req,false);
            }else{
                return;
            }
        }catch(err){
            console.log(err);
            return requestHandler.sendError(this.req,this.res,new Error('Undefined route'));
        }
    }


    async validateCreation(req){

        let room = {};
        room.roomNumber = req.query.roomNumber;
        room.booked = req.query.booked;
        room.owner = req.query.owner;
        room.bookedBy = req.query.bookedBy;
        //Default available
        room.availableTime = new Date().getTime();
        //Validate
        let valid = await this.validate(room,creationSchema);
        if(valid === true){
            return this.createRooms(room);
        }else{
            console.log(valid);
            return requestHandler.sendError(this.req,this.res,new Error('Validation failed'));
        }
    }

    async validateBooking(req,flag){

        let doc = {};
        doc.id = req.query.id;
        doc.booked = flag;
        doc.bookedBy = req.query.bookedBy;
        doc.startTimeStamp = req.query.startTimeStamp;
        doc.endTimeStamp = req.query.endTimeStamp;

        //Validate
        let valid = await this.validate(doc,bookingSchema);
        let validStartTime = await this.ensureCorrectTimings(doc.startTimeStamp);
        let validEndTime = await this.ensureCorrectTimings(doc.endTimeStamp);

        if(valid && validStartTime && validEndTime){
            let bookings = [{
                startTime : doc.startTimeStamp,
                endTime : doc.endTimeStamp
            }]
            doc.bookings = bookings;
            return await this.populateBookingHistory(doc);
        }else{
            return requestHandler.sendError(this.req,this.res,new Error('Validation failed'));
        }
        
    }

    async ensureCorrectTimings(timing){
        //To do ensure only future times
        let timeNow = new Date().getTime();
        if(timeNow>timing){
            return true;
        }else{
            return false;
        }
    }

    async validate(doc,schema){

        try{
            if(schema == creationSchema || schema == bookingSchema){
            const {error , value} = schema.validate(doc);
            if(!error){
                return true;
            }else{
                return error;
            }
            }else{
                return false;
            }
        }catch(err){
            return requestHandler.sendError(this.req,this.res,err);
        }

    }
    


    async createRooms (doc){
        await roomservice.createRooms(doc).then(async result=>{
            requestHandler.sendSuccess(this.res,result,200);
        },error=>{
            requestHandler.sendError(this.req,this.res,error);
        })
    }

    async getAvailableRooms(doc){
        await roomservice.getAvailableRooms(doc).then(async result=>{
            requestHandler.sendSuccess(this.res,result,200);
        },error=>{
            requestHandler.sendError(this.req,this.res,error);
        })
    }

    async populateBookingHistory(doc){
        console.log(doc);
        console.log('------------');
        await roomservice.populateBookingHistory(doc).then(async result=>{
            console.log(result);
            this.bookRoom(doc);
            //requestHandler.sendSuccess(this.res,result,200);
        },error=>{
            requestHandler.sendError(this.req,this.res,error);
        })
    }

    async bookRoom(doc){
        await roomservice.bookRoom(doc).then(async result=>{
            requestHandler.sendSuccess(this.res,result,200);

        },error=>{
            requestHandler.sendError(this.req,this.res,error);
        })
    }
}


