//To Do : - Write a cron job to update status of rooms
const cron = require('node-cron');

const roomService = require('../services/roomService');
let roomservice = new roomService();

module.exports = async function runRoomUpdate(){
//Run a cron job
//Queries all rooms
//Checks the room data against the current time 
//Updates the room availability field

}

//Checks the room end time against current time
async function updateRoomStatus(roomTime){
    let timeN = new Date();
    let timeStamp = timeN.getTime();
    if(timeStamp>roomTime){
        return true;
    }else{
        return false;
    }
}

//Queries all rooms 
async function getRooms(){
    let rooms = [];
    roomService.getAvailableRooms().then(async result=>{
        if(result.length>0){
            rooms = result;
        }
    },error=>{
        return false;
    })
}

//Updates the room availability field
async function updateField(id,flag){
    roomService.updateAvailability(id,flag).then(async result=>{
        return true
    },error=>{
        return false
    })
}