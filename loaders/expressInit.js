//Export a function that sets the app parameters
const cors = require('cors');
const routes = require('../api/index');
const config = require('../config/index').config
const helmet = require('helmet');
const express = require('express');

exports.expressApp = async (app)=>{
    
    //Check the health status of the app
   app.get('/status',(req,res)=>{
       res.status(200).end();
   })

   //Set up helmet
   app.use(helmet());

   //To enable showing of the origin IP
   app.enable('trust proxy');

   //Enable cors sharing by default
   app.use(cors());

   //Transform  the raw string of req.body. to json
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));

   //Load api end points
   routes.routes(app);

   //Handle 500 status error
   app.use((err,req,res,next)=>{
       res.status(err.status || 500);
       res.json({
           errors : {
               message : err.message,
           },
       });
   });

}

