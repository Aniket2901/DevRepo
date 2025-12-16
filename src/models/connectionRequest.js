const mongoose = require('mongoose');
const connectionRequsetSchema = new mongoose.Schema({
    requesterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    reciversId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        enum:['ignored','intersted','accepted','rejected'],
        required:true
    }
},{timestamps:true});

// Index on requesterId and reciversId to optimize queries
// this is compound index on both fields
connectionRequsetSchema.index({requesterId:1,reciversId:1});

module.exports = mongoose.model('ConnectionRequestModel', connectionRequsetSchema);