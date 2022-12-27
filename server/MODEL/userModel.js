const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : String,
    email : String,
    password : String
})

const model = mongoose.model('users', userSchema)
module.exports = model