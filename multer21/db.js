const mongoose=require("mongoose")


const ConntectToDb=mongoose.connect("mongodb://localhost:27017/alfa-pop")


module.exports=ConntectToDb