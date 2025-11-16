const mongoose= require("mongoose")

const dbConnect=async()=>{
    try{
        await mongoose.connect("mongodb+srv://aniketdhamange:Aniket%401234@aniketdb.zsywfd6.mongodb.net/devTinder")
    }       
    catch(err){
        console.log("Database connection failed",err)
    }       
}

module.exports=dbConnect;