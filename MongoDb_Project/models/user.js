const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ashish9039062705:JULCBp1EGQfiBsDk@cluster0.hqot9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("user", userSchema);
