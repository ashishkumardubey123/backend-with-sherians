const express = require("express");
const app = express();

// ? middleware ----------------------------
app.use(function (req, res, next) {
  console.log("middel ware chala");
  next();
});

// Todo:  req= Request.  
// Todo:  res= Response.  

// ! Express code -----------------------------------------------
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res ,next) => {
    return next(new Error("somthing went wrong"))
    // res.send("hello world about page ");
  });


  // ? error hendlare 
 
app.use(function(err ,req,res,next){

    console.error(err.message)
    res.status(500).send('somthing brokan')
})

//** listning the on server  */
app.listen("3000", (err) => {
  if (err) console.log(err.message);
  console.log("server is running on port 3000");
});


