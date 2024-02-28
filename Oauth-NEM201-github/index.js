const express=require("express")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app=express()


const client_id="8e488887eb81a975d761"
const client_secret="8f3b94800d10e8c993d8c99497e430aa94c73e82"

app.get("/",(req,res)=>{
    res.send("base end point")
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/auth/github",(req,res)=>{
    let {code}=req.query
    // console.log(code)

    fetch("https://github.com/login/oauth/access_token",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            client_id,
            client_secret,
            code
          })
    }).then((res)=>res.json())
    .then((data)=>{
        // console.log(data) 
        fetch("https://api.github.com/user",{
            headers: {
                Authorization: `Bearer ${data.access_token}`
              },
         
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })

        //  for email

         fetch("https://api.github.com/user/emails", {
            headers : {
                Authorization : `Bearer ${accessToken.access_token}`
            }
        })
        .then((res) => res.json())
        .then((data)=>console.log(">>>>>>>>>>>>>>>>>>>>>>>>"+data))
        .catch((err) => console.log(err))
    
    }).catch((err)=>{
        console.log(err)
    })

    
    res.send("Github Login succesfully")
})

app.listen(8080,()=>{
    console.log("server is running")
})