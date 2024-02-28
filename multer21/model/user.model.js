const mongoose=require("mongoose")

const userchema=mongoose.Schema({
    name:String,
    email:String,
    userprofile:String
})




const UserModel=mongoose.model("User",userchema)

module.exports=UserModel