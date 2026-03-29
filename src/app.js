const express = require('express');

const cookieParser = require('cookie-parser');

const cors = require("cors");
const http = require("http");

const databaseConnect=require("./config/database");
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/users");


const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


databaseConnect().then(()=>{
    console.log("Database connected successfully");
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
    }).catch((err)=>{
    console.log("Database connection failed",err);
    });

