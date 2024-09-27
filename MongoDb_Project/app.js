const express = require('express')
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const userModel = require('./models/user')



app.set('view engine', 'ejs');
 app.use(express.json())
 app.use(express.urlencoded({extended: true}));
 app.use(express.static(path.join(__dirname, 'public')))




 app.get('/' ,(req, res)=>{
        
     res.render('index')
      
 })
  
 app.get('/read' , async (req, res)=>{
     
    let allUsers = await userModel.find()
     
    res.render('read' , {users: allUsers})
     
})
 
app.post('/create' , async (req, res)=>{
     
     const {name, email, image} = req.body

     const user =  await userModel.create({
        name,
        email,
        image
     })
     
    res.redirect('/read')
     
})
 
app.get('/delete/:id' , async (req, res)=>{
     
    let allUsers = await userModel.findOneAndDelete({_id: req.params.id})
     
    res.redirect('/read' )
     
})
 
app.listen('3000', function(e){
      

     if (e) console.log(e)
     else console.log('Server is running on port 3000')
     
})