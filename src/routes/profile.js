const express = require('express');
const profileRouter = express.Router();

const {jwtUserAuth}=require("../middleware/auth");
const User=require("../models/user");
const {validateUpdates}=require("../utils/validation");


profileRouter.get("/profile",jwtUserAuth, async(req,res)=>{
    try{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const user=await User.findOne({_id:req.user._id});  
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:"Failed to fetch users",error:err});
    }
});

profileRouter.patch("/profile/update",jwtUserAuth, async (req,res)=>{
    try{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        const updates=req.body;
        const userId=req.user._id;

        if(validateUpdates(updates)){
            return res.status(400).json({message:"Invalid updates"});
        }
        const updatedUser=await User.findByIdAndUpdate(userId,updates,{new:true});

        res.status(200).json({message:"User updated successfully",user:updatedUser});
    }catch(err){
        res.status(500).json({message:"Failed to update user",error:err});
    }
});


module.exports = profileRouter;

