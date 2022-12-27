const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    _id: mongoose.Types.ObjectId

})

const membersModel = mongoose.model("members", memberSchema)
module.exports = membersModel
