import express from "express"
import router from "./routes/route.js"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import { checkUserLoggedin } from "./middlewares/middlware.js"
import bodyParser from "body-parser"


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("connected")})

const app = express()
app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api",router)
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})