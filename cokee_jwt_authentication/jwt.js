const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//  ? inserting a tokon in jwt
app.get("/", (req, res) => {
  let token = jwt.sign({ email: "ashish@gamil.com" }, "ashishKaSecret");
  res.cookie("token", token, { expiresIn: "1h" }); // 1 second token expiration.

  //  console.log(req.cookies)  // to check if cookie is set.
  //   console.log(token )
  res.send("Hello World!");
});

// ?   extrecting a data on jwt
app.get("/read", (req, res) => {
  let data = jwt.verify(req.cookies.token, "ashishKaSecret");
  console.log(data);
  res.send("Access granted!");
});

app.listen("3000", function (e) {
  if (e) console.log(e);
  else console.log("Server is running on port 3000");
});
