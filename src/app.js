const express = require('express');
const app = express();
const port = 3000;

const {adminAuth,userAuth}=require("./middleware/auth");

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/user/userData",(req,res)=>{
  res.json({name:"Aniket",age:21});
});

app.post("/user/userData",(req,res)=>{
    const param =req.params;
    res.status(200).json({message:"Data received successfully",data:param});
});

app.get("/admin/getAdminList",(req,res)=>{
  res.send({name:"Aniket",age:21});
});

app.post("/admin/userData",(req,res)=>{
    const param =req.body?.data;
    res.status(200).json({message:"Data received successfully",data:param});
});








app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });