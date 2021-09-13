//Export a function that ensures all are loaded
const Logger = require('./logger');
const logger = new Logger();
const dependencyI = require('./dependecyInjection');
const mongooseC = require('./mongoose');
const expressInit = require('./expressInit');
const Cluster = require('./cluster');
exports.configLoaders = async (app)=>{
return new Promise(async (resolve,reject)=>{

    try {
        
        //Make connection //Load the connection
        const mongooseConnection = await mongooseC();
        logger.log('DB Loaded','info','Connection available');
    
        //Load DI
        const loadDI = await dependencyI.initDI();
        logger.log('DI Injected','info','Dependecies available');
    
        //Load Express 
        const appE = await expressInit.expressApp(app);
        logger.log('App config','info','Express App available');

        resolve(true);
    
    }catch(err){
        logger.log('Error loading DI','error',err);
        reject(err);
    }
    
})
}