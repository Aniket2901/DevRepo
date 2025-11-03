const mongoose = require('mongoose');
const connectionRequsetSchema = new mongoose.Schema({
    requesterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    reciversId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:['ignored','intersted','accepted','rejected'],
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('ConnectionRequestModel', connectionRequsetSchema);