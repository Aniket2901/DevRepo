const express = require('express');

const databaseConnect=require("./config/database");

const User=require("./models/user");

const app = express();
const port = 3000;

// const {adminAuth,userAuth}=require("./middleware/auth");

// app.use("/admin", adminAuth);
// app.use("/user", userAuth);

// app.get("/user/userData",(req,res)=>{
//   res.json({name:"Aniket",age:21});
// });

// app.post("/user/userData",(req,res)=>{
//     const param =req.params;
//     res.status(200).json({message:"Data received successfully",data:param});
// });

// app.get("/admin/getAdminList",(req,res)=>{
//   res.send({name:"Aniket",age:21});
// });

// app.post("/admin/userData",(req,res)=>{
//     const param =req.body?.data;
//     res.status(200).json({message:"Data received successfully",data:param});
// });

app.use(express.json());
app.post("/signup",(req,res)=>{
    // const {firstName,lastName,email,password}=req.body; 
    const user=new User(req.body);
    try{
        user.save();
        res.status(201).json({message:"User created successfully"});
    }catch(err){
        res.status(500).json({message:"User creation failed",error:err});
    }
});       


databaseConnect().then(()=>{
    console.log("Database connected successfully");
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
    }).catch((err)=>{
    console.log("Database connection failed",err);
    });

