const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

 


app.get("/", (req, res) => {
  res.render("index");
  //  res.send("hi chal raha he ")
});

app.post("/create", async (req, res) => {
  const { username, password, email, age } = req.body;
  try {
    const newUser = await userModel.create({
      username,
      password,
      email,
      age,
    });
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
 
});


app.listen(3000, function(err){

  console.log('Server is running on port 3000')
   
});
