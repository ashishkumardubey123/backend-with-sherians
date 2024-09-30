const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
//? setting and reading a  cookie

app.get("/", (req, res) => {
  res.cookie("name", "ashish");
  console.log(req.cookies);
  res.send("Hello World!");
});

app.listen("3000", function (e) {
  if (e) console.log(e);
  else console.log("Server is running on port 3000");
});
