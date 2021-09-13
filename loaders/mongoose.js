//Export a DB connection
const mongoose = require('mongoose');
let mongoDB = process.env.MONGODB_URI;



module.exports = async ()=>{

    const dbConnection = await mongoose.connect(mongoDB,
        {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        autoIndex: true,
        keepAlive: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4
        });

        return dbConnection.connection.db;

}
    
    