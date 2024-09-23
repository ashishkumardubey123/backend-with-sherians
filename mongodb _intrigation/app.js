const express = require("express");
const usermodel = require("./usermodel");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/create", async (req, res) => {
  const createdUser = await usermodel.create({
    name: "poornima",
    email: "poornima@example.com",
    userName: "poornima",
  }, 
   
);

  res.send(createdUser);
});

 app.get("/update", async (req, res) => {
  const users = await usermodel.findOneAndUpdate(

    {userName:'john'},
     {name:"ashish"}, 
     {new:  true}
    );

  res.send(users);
 })

//  read all the uusers ***********************************************
  app.get("/read", async (req,res)=>{
   let users= await usermodel.find()
     
   res.send(users)

  })

  // read One user ******************************************************
  app.get("/readOne", async (req,res)=>{
    let users= await usermodel.find({userName: "poornima"})
      
    res.send(users)
 
   })

   app.get("/delete", async (req,res)=>{

     let users= await usermodel.findOneAndDelete({userName: "john"})
     
     res.send(users)
   })

app.listen("3000", function(err){

  if (err) console.log(err.message);
  else console.log("Server is running on port 3000");
 });
   

