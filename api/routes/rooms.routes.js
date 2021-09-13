//Path
const path = require('path');
//Validation
const validation = require('../middlewares/validationRoom');
let validate = new validation();


module.exports = async  (app)=>{


//Function to get all rooms and availability 
app.get('/api/getrooms',async (req,res)=>{
    validate.validateRequest(req,res);
});

//Function to book room
app.put('/api/makebooking',async (req,res)=>{
    validate.validateRequest(req,res);
});

//Function to create rooms
app.post('/api/createrooms',async (req,res)=>{
    validate.validateRequest(req,res);
});

//Function to cancel reservation
app.put('/api/cancelbooking',async (req,res)=>{
    validate.validateRequest(req,res);
});

}
