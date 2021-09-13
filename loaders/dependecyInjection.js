
exports.initDI = async ()=>{
    try {

    //Manual DI
    const Logger = require('./logger');
    let logger = new Logger();
    const UserService = require('../services/userService');
    let userService = new UserService();
    const RoomService = require('../services/roomService');
    let roomService = new RoomService();
    const RequestHandler = require('../util/requestHandler');
    let requestHandler = new RequestHandler(logger);

    let dInjection = {};
    //Logger
    dInjection.logger = logger;
    //User service 
    dInjection.userService = userService;
    //Room service
    dInjection.roomService = roomService;
    //Request Handler
    dInjection.requestHandler = requestHandler;

    return dInjection;

    }catch(err){
        logger.log('D.I init error','error',err);
    }
}
