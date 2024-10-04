const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

 


app.get("/", (req, res) => {
  res.render("index");
  
});

app.post("/create",  (req, res) => {
  const { username, password, email, age } = req.body;
    
  bcrypt.genSalt(10, function(err, salt) {
    
    bcrypt.hash(password, salt, async function(err, hash) {
       
            const newUser = await userModel.create({
              username,
              password:hash,
              email,
              age,
       });
         
       let token = jwt.sign({ email }, 'shhhhh');
        res.cookie("token", token)
        const randomImageId = Math.floor(Math.random() * 100);
        const randomGender = Math.random() > 0.5 ? 'men' : 'women';

        profileImage =`https://randomuser.me/api/portraits/${randomGender}/${randomImageId}.jpg`
        
            res.render('create', {newUser ,profileImage});
      
      
  });
    
     
});
   
   
 
});

 app.get('/login', (req, res)=>{
    res.render('login')
 })

 app.post('/login',async (req, res)=>{
 
  let user=  await userModel.findOne({email: req.body.email})
       if (!user) return res.render('notfound')

        bcrypt.compare(req.body.password , user.password , (err,result)=>{
             if(result) {

              let token = jwt.sign({ email: user.email }, 'shhhhh');
              res.cookie("token", token)
              res.send( user )
             } 
              else res.render('notfound')
    
            
        })
})


 app.get('/logout', (req, res)=>{
  
      res.cookie("token" ,"")
      res.redirect('/')

 })

app.listen(3000, function(err){

  console.log('Server is running on port 3000')
   
});
