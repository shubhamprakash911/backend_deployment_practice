const express= require("express");
const {noteModel}= require("../model/note.model")
const noteRouter= express.Router()

noteRouter.get("/",async(req,res)=>{
    try {
        const note= await noteModel.find()
        res.send(note)
    } catch (error) {
        res.send({"msg":"Something wend Wrong","err":error.message})
    }
})

noteRouter.post("/create",async(req,res)=>{
    try {
        const note= new noteModel(req.body)
        await note.save()
        res.send({"msg":"note created"})
    } catch (error) {
        res.send({"msg":"Something wend Wrong","err":error.message})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const note= await noteModel.findOne({"_id":req.params.id})
    try {
        if(req.body.userId===note.userId){
            await noteModel.findByIdAndDelete({_id:req.params.id})
            res.send("note delelted succefully")
        }else{
            res.send({"msg":"You are not authorized"})
        }

    } catch (error) {
        res.send({"msg":"Something wend Wrong","err":error.message})

    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
     const note= await noteModel.findOne({"_id":req.params.id})
    try {
        if(req.body.userId===note.userId){
            await noteModel.findByIdAndUpdate({_id:req.params.id},req.body)
            res.send("note update succefully")
        }else{
            res.send({"msg":"You are not authorized"})
        }  
    } catch (error) {
        res.send({"msg":"Something wend Wrong","err":error.message})

    }
})

module.exports={noteRouter}