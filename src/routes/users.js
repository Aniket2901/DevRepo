const express = require('express');
const userRouter= express.Router();


const { jwtUserAuth } = require('../middleware/auth');
const User=require("../models/user");

const ConnectionRequestModel=require("../models/connectionRequest");

userRouter.get("/user/connnections",jwtUserAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest= await ConnectionRequestModel.find({
            $or:[
                {requesterId:loggedInUser._id,status:'accepted'},
                {reciversId:loggedInUser._id,status:'accepted'}
            ]
        }).populate('requestedId',"firstName lastName").
        populate('reciversId',"firstName lastName");
        const connections=connectionRequest.map(request=>{
            if(request.requesterId._id.equals(loggedInUser._id)){
                return request.reciversId;  
            }else{
                return request.requesterId;
            }
        });
        res.status(200).json({connections});
    }catch(err){
        res.status(500).json({message:"Failed to fetch connections",error:err});
    }
});

userRouter.get("/user/requests",jwtUserAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;        
        const connectionRequests= await ConnectionRequestModel.find({
            reciversId:loggedInUser._id,
            status:'intersted'
        }).populate('requesterId',"firstName lastName email");
        res.status(200).json({connectionRequests});
    }catch(err){
        res.status(500).json({message:"Failed to fetch connection requests",error:err});
    }               
});

userRouter.get("/user/feed",jwtUserAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;        

        const connectionsRequests= await ConnectionRequestModel.find({
            $or:[
                {requesterId:loggedInUser._id},
                {reciversId:loggedInUser._id}
            ]
        }).select("requesterId reciversId");

        const connectionIds= new Set();
        connectionsRequests.forEach(request=>{
            connectionIds.add(request.requesterId.toString());
            connectionIds.add(request.reciversId.toString());
        });
        const feedUsers= await User.find({
           $and:[{ _id:{$nin:Array.from(connectionIds)}},{_id:{$ne:loggedInUser._id}}]
        }).select("firstName lastName email");
        res.status(200).json({feedUsers});
    }catch(err){
        res.status(500).json({message:"Failed to fetch feed users",error:err});
    }
});

module.exports = userRouter;