const mongoose= require("mongoose")
const noteSchema= mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    userId:{type:String,required:true}
});

const noteModel= mongoose.model("note",noteSchema)

module.exports={noteModel}