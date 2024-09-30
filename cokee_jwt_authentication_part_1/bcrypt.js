const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("ashishKaPassword", salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
      res.send("password encrepted");
    });
  });
});

app.get("/read", (req, res) => {
  bcrypt.compare(
    "ashishKaPassword",
    "$2b$10$nXWFID2ltoxHGtGPewkf8uRrKWVHo3o3vnvQYfBp0446UT7cBtIp2",
    function (err, result) {
      // result == true
      console.log(result);
    }
  );

  res.send("working fine ");
});

app.listen("3000", function (e) {
  if (e) console.log(e);
  else console.log("Server is running on port 3000");
});
