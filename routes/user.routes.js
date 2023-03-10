const express = require("express");
const {userModel} = require("../model/user.model")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const userRouter= express.Router();

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass}= req.body;
    try {
        bcrypt.hash(pass, 4, async function(err, hash) {
            if(err){
                res.send({"msg":"something went wrong ","err":err.message})
            }else{
                const user= new userModel ({name,email,pass:hash})
                await user.save()
                res.send({"msg":"new users has been register"})
            }
        })
    } catch (error) {
        res.send({"msg":"something went wrong ","err":error.message})
    }  
})

userRouter.post("/login",async (req,res)=>{
    const {email,pass}= req.body;
    try {
        const user= await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                 if(result){
                    let token= jwt.sign({userId:user[0]._id},"masai")
                    res.send({"msg":"new users has been login",token})
                 }else{
                    res.send("Wrong crediatial")
                 }
            });
        }else{
            res.send("Wrong crediatial")
        }
    } catch (error) {
        res.send({"msg":"something went wrong "})
    } 
 })

 module.exports={userRouter}