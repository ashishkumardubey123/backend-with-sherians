const mongoose = requier('mongoose')

mongoose.connect('mongodb://localhost:27017/project')

const userSchema =  mongoose.Schema({
    name: String,
    email: String,
    Image: String
})

module.exports = mongoose.model('user', userSchema)