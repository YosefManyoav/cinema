const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    Name : String,
    Premiered : String,
    Image : String,
    Summary: String
},{versionKey: false})

const movieModel = mongoose.model("movies", movieSchema)
module.exports = movieModel