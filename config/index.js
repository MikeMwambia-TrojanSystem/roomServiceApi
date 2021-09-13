const dotenv = require('dotenv');
var path = require('path');
const envPath = path.join(__dirname,'/consesys.env')
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = dotenv.config({path:envPath});

if(envFile.error){
    //This error should stop the process
    throw new Error('.env file missing');
}

exports.config = {
    
    //Node Port
   port : parseInt(process.env.PORT),

   //DB url 
   databaseURL : process.env.MONGODB_URI,

   //Token Secret 
   tokenSecret : process.env.JWT_SECRET,

   //Logging Level
   logs : {
       level :process.env.LOG_LEVEL || 'silly'
   },

   //API prefix
   api : {
       prefix : '/api'
   },

   //Rooms prefix
   rooms : {
        createRooms : 'createrooms',
        getRooms : 'getrooms',
        makeBooking : 'makebooking',
        cancelBooking : 'cancelbooking'
   }
}