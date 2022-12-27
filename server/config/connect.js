const mongoose = require('mongoose')
const DB_URL ="mongodb://localhost:27017/cinema"
mongoose.connect(DB_URL,() =>{
    console.log('server is connect');
})