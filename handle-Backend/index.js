const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/portfolio", (req, res) => {
  res.render("index");
});

app.get("/portfolio/:username", function (req, res) {
  res.send( `hello ${req.params.username}`);
});

app.get("/portfolio/:username/:age", function (req, res) {
  res.send( `hello ${req.params.username} age of ${req.params.age } `);
});

app.listen("3000", function (err) {
  if (err) console.log(err.message);
  else console.log("Server is running on port 3000");
});
