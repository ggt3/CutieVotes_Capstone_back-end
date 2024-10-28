import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import usersRouter from './routes/users.js'
import pictureRouter from './routes/pictures.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI)
console.log("connected to mongo")
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users", usersRouter)
app.use("/pictures", pictureRouter)

app.get("/", (req,res)=> {
    res.send("welcome to my app")
})

app.listen(PORT, () => console.log("server running on port: ", PORT))