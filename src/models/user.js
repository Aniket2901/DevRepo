const {Schema , model} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
    },
    lastName: String,
    age: Number,
    email: {
        type: String,
        required : true,
        trim: true,
        unique: true,
        validate: ( value =>{
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address");
            }
        })
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
          validate: ( value =>{
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password");
            }
        })
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    }    
},{timestamps:true});

userSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ id: user._id }, "Aniket@1234", { expiresIn: '1d' });
    return token;
};

userSchema.methods.validatePassword = function(password) {
    const user = this;
    return bcrypt.compare(password,user.password);
}
module.exports = model('User', userSchema);