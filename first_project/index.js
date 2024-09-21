const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf8", function (err, data) {
    if (err) res.send(err);
    else {
      res.render("show", { filename: req.params.filename, filedata: data });
    }
  });
});

app.post("/create", function (req, res) {
  const { title, details } = req.body;
  fs.writeFile(
    `./files/${title.split(" ").join("")}.txt`,
    details,
    function (err) {
      res.redirect("/");
    }
  );
});

app.get("/edit/:filename", function (req, res) {
 
  res.render("edit", {filename: req.params.filename} )
  
});
 
app.post("/edit", function (req, res) {
 

fs.rename(`./files/${req.body.previous}` , `./files/${req.body.new}.txt`, function(err){
       
  console.log(req.body)
  
    res.redirect("/");

})
  


  
});



app.post("/delete", function (req, res) {
  const filename = req.body.filename;
  fs.unlink(`./files/${filename}`, (err) => {
    if (err) res.send(err.message);
    res.redirect("/");
  });
});



 



app.listen(3000, function (err) {
  if (err) console.log(err.message);
  else console.log("server is running on port 3000");
});
