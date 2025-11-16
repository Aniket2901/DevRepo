const express = require('express');
const authRouter= express.Router();

const bcrypt = require('bcrypt');
const User=require("../models/user");

authRouter.post("/signup", async(req,res)=>{
    try{
    const {firstName,lastName,age,email,password,gender}=req.body; 

    const pass = await bcrypt.hash(password,10);

    const user=new User({firstName,lastName,age,email,password:pass,gender});
    
    await user.save();

    res.status(201).json({message:"User created successfully"});
    }catch(err){
        res.status(500).json({message:"User creation failed",error:err.message});
    }
});     

authRouter.post("/login",async(req,res)=>{
    try{
    const {email,password}=req.body;        
    const user=await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"Invalid credentials"});
    }
    const isMatch=await user.validatePassword(password);
    if(isMatch){
        const token= await user.generateAuthToken();
        res.cookie("token",token,{httpOnly:true});
        res.status(200).json({message:"Login successful"});
    }else{
        throw new Error("Invalid credentials");
    }
    }catch(err){
        res.status(500).json({message:"Login failed",error:err.message});
    }
});

authRouter.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Logout successful"});
})

authRouter.post("/change-password",async(req,res)=>{
    try{
        const {email,oldPassword,newPassword}=req.body; 
        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }               
        const isMatch=await user.validatePassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({message:"Old password is incorrect"});
        }               
        const hashedNewPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedNewPassword;
        await user.save();
        res.status(200).json({message:"Password changed successfully"});
    }catch(err){
        res.status(500).json({message:"Password change failed",error:err.message});
    }
});

module.exports=authRouter;