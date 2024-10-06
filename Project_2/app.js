// ! note:- use "bcrypt" insted of "bcryptjs"

const express = require("express");
const app = express();
const userModel = require("./models//user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;

  const existsUser = await userModel.findOne({ email });

  if (existsUser) return res.status(500).send("user already registerd ");

  await bcrypt.hash(password, 12, async (err, hash) => {
    const user = await userModel.create({
      username,
      name,
      password: hash,

      email,
      age,
    });

    const token = jwt.sign({ email, userid: user._id }, "shhhhh");
    res.cookie("token", token);
    res.send(`Congratulation ${name} youre account is  created.`);
    // res.render("/profile");
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) return res.send("Somthing went wrong ");

  // ? first method to check user password
  // ! note:- use "bcrypt" insted of "bcryptjs"
  // const isPasswordCorrect = await bcrypt.compare(password, user.password);

  //   if(!isPasswordCorrect) res.send("invalid password ")
  //      else res.send("log in success")

  // ? second mathod --------------------------------------

  await bcrypt.compare(password, user.password, (err, result) => {
    if (result == true) {
      const token = jwt.sign({ email, userid: user._id }, "shhhhh");
      res.cookie("token", token);
      res.redirect("/profile");

    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isloggdIn, async (req, res) => {
  const user = await userModel.findOne({email: req.user.email}).populate("post")
    

  const randomImageId = Math.floor(Math.random() * 100);
  const randomGender = Math.random() > 0.5 ? 'men' : 'women';

  profileImage =`https://randomuser.me/api/portraits/${randomGender}/${randomImageId}.jpg`


   
  res.render("profile", {user , profileImage});
});


app.get("/like/:id", isloggdIn, async (req, res) => {
  const post = await postModel.findOne({_id: req.params.id}).populate("user")
      
  if(post.like.indexOf(req.user.userid)=== -1){

    post.like.push( req.user.userid)

  }
   else{
     post.like.splice(post.like.indexOf(req.user.userid), 1)
   
 
   } 
    await post.save()
 

  res.redirect("/profile",);
});

app.get("/edit/:id", isloggdIn, async (req, res) => {
  const post = await postModel.findOne({_id: req.params.id}).populate("user")
      
    
  res.render("edit", {post})
  
});

app.post("/update/:id", isloggdIn, async (req, res) => {
  const post = await postModel.findOneAndUpdate({_id: req.params.id},{content:req.body.content} )
      
    
  res.redirect("/profile")
  
});

app.post("/post", isloggdIn, async (req, res) => {
  
  const user = await userModel.findOne({email: req.user.email});
    
     let {content}=req.body
   
      let post=  await postModel.create({
                user: user._id,
                content 
              })
               
  user.post.push(post._id)
  await user.save()

   res.redirect("/profile")
              

});


function isloggdIn(req, res, next) {
  if (req.cookies.token === "") res.render("notfound");
  else {
    let data = jwt.verify(req.cookies.token, "shhhhh");
    req.user = data;
    next()
  }
}

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
