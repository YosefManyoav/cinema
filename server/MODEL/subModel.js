const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movieId: {type: mongoose.SchemaTypes.ObjectId, ref:"movies"},
    date: Date,
},
{_id: false}
)

const subSchema = new mongoose.Schema({
    moviesWatch : [movieSchema],
    memberId :{type: mongoose.SchemaTypes.ObjectId, ref:"members"} ,
},{versionKey: false}
)

const model = mongoose.model('subscriptions', subSchema)
module.exports = model