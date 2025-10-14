const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    gender: String    
})
module.exports = model('User', userSchema);