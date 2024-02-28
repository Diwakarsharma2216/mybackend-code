const express=require("express")
const connection = require("./db")
const passport = require("passport")
const UserModel = require("./model/user.model");
const memo = require("./Configure");

const app=express()

memo(passport)
// passport js
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// 
app.use(express.json())
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))





// #routes start

app.get("/login",(req,res)=>{
  res.render("login")
})

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),

  (req, res)=>{
 
    res.send("Login succesfully");
  });


app.get("/",(req,res)=>{
  res.render("home")
})

app.get("/register",(req,res)=>{
  res.render("singup");
})
app.post("/register",async(req,res)=>{
  try {
    const user=await UserModel.findOne({username:req.body.username})
  if(user){
    return res.status(400).send("user already exists")
  }

  const newuser=await UserModel.create(req.body)


  res.status(200).json({message:"register Succesfully",newuser})
  } catch (error) {
    res.status(200).json({message:error.message})
  }
  
  
})


app.listen(8080,async()=>{
  try {
    await connection
  console.log("Server is ruuning")
  } catch (error) {
    console.log(error.message)
  }
  
})