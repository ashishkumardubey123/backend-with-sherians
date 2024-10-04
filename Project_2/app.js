const express = require("express");
const app = express();
const userModel = require("./models//user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});



app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return res.status(500).send("user already registerd ");
         console.log(password)

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("password", salt, async function (err, hash) {
      //
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
    });
  });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if (!user) return res.send("Somthing went wrong "); 
             
     console.log(user)
           console.log(password)
  
    bcrypt.compare(password, user.password, (err, result) => {
          console.log(user.password)
         console.log(result)
        if(result) res.send("you can log in ")
         
        else res.redirect("/login");

    });
    
  });


app.get("/login", (req, res) => {
    res.render("login");
  });

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
