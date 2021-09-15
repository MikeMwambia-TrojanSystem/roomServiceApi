//Logger
const Logger = require('../loaders/logger');
let logger = new Logger();

//DAO
let roomDao = require('../models/dao/room.dao');
let bookingHistory = require('../models/dao/bookingH.model');

class roomService {

    constructor(){

    }

    //Books room or Cancel Booking
    async bookRoom(room){
        return new Promise(async (resolve,reject)=>{
            roomDao.updateOne({_id:room.id},
                {$set:{booked:room.flag,
                    availableTime:room.endTimeStamp,
                    bookings : room.bookings}},
                (error,room)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(room);
                    }
            })
        })
    }

    
    //Get available rooms
    async getAvailableRooms(){
        return new Promise(async(resolve,reject)=>{
            roomDao.get({},(error,rooms)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(rooms);
                }
            })
        })
    }

    //Create rooms
    async createRooms(room){
        return new Promise(async(resolve,reject)=>{
            roomDao.create(room,(error,room)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(room);
                }
            })
        })
    }

    //Update availability
    async updateAvailability (id,flag){
        return new Promise(async (resolve,reject)=>{
            roomDao.updateOne({_id:id},{$set:{booked:flag}},
                (error,room)=>{
                    if(error){
                        reject(error);
                    }else{
                        resolve(room);
                    }
            })
        })
    }

    async populateBookingHistory(roomH) { 
        return new Promise(async (resolve,reject)=>{
            bookingHistory.create(roomH,(error,roomH)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(roomH);
                }
            })
        })
    }
}

module.exports = roomService;