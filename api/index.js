const roomsRoute = require('./routes/rooms.routes');
const userRoute = require('./routes/users.routes');
const Router = require('express');
let router = Router();
//Export the routes
exports.routes = async (app)=>{

    await userRoute(app);

    await roomsRoute(app);

};