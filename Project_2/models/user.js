const mongoose =  require('mongoose')
const post = require("./post");

mongoose.connect("mongodb+srv://ashish9039062705:s4YLItm4V3tNaheC@cluster0.hqot9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

 const userSchema = mongoose.Schema({
    username: String,
    age :Number,
    email: String,
    password: String,
    post: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'post'
   }]
 })
   
  module.exports= mongoose.model('user', userSchema)