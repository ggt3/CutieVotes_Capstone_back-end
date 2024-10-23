import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI)
// middlewares
console.log("connected to mongo")


app.get("/", (req,res)=> {
    res.send("welcome to my app")
})

app.listen(PORT, () => console.log("server running on port: ", PORT))