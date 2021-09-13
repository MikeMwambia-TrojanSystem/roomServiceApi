const Router = require('express');
let router = Router();

module.exports = async  (app)=> {

//Function to create users with eth address as username
//Requires to sign in with metamask to book room
app.post('/signUp',(req,res)=>{
 return true;
})

app.post('/logIn',(req,res)=>{
    return true;
})

}
