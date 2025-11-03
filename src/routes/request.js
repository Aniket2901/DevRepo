const express = require('express');
const requestRouter= express.Router();

const { jwtUserAuth } = require('../middleware/auth');
const User=require("../models/user");

const ConnectionRequestModel=require("../models/connectionRequest");



requestRouter.post("/request/send/:status/:reciversId",jwtUserAuth, async(req,res)=>{

    try{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        if(!req.params.status || !req.params.reciversId){
            return res.status(400).json({message:"Missing parameters"});
        }
        const {status, reciversId}=req.params;
        if(req.user._id.equals(reciversId)){
            return res.status(400).json({message:"cannot send request to yourself!"});
        }
        if(!['ignored','intersted'].includes(status)){
            return res.status(400).json({message:"Invalid status value"});
        }
        const user=await User.findOne({_id:reciversId});
        if(!user){
            return res.status(404).json({message:"Request user not found"});
        }
        const requesterId=req.user._id;
        const existingRequest=await ConnectionRequestModel.findOne({
            $or:[ {requesterId,reciversId},
            {requesterId:reciversId,reciversId:requesterId}
            ]
        });
        if(existingRequest){
            return res.status(400).json({message:"Request already sent to this user"});
        }
        const newconnectonRequest=new ConnectionRequestModel({requesterId,reciversId,status});
        await newconnectonRequest.save();
        res.status(200).json({message:`${status} sent successfully to ${user.firstName}`});

    }catch(err){
        res.status(500).json({message:"Failed to send request",error:err});
    }
});

module.exports=requestRouter;