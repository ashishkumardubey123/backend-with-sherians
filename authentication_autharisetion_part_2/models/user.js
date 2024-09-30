const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ashish9039062705:s4YLItm4V3tNaheC@cluster0.hqot9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number, 
    email: String
})


module.exports=  mongoose.model('user', userSchema)