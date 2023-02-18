const express= require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {noteRouter} = require("./routes/note.route")
const {authenticate} = require("./middleware/authorization.middleware")
const cors = require("cors")
const app= express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)

app.listen(8000, async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server at listing at port 8000")
})