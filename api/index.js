import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
//import authRoute from "./routes/auth.js"

const app = express()
dotenv.config()

//const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true
}));


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
      } catch (err) {
        throw err
      }
}

app.get("/", (req, res) => {
  res.status(200).send({
    message: 'Hello, WELCOME TO TRAVELLA!'
  })
})

// app.get('/', async (req, res) => {
//   res.status(200).send({
//     message: 'Hello from My Helper App!'
//   })
// })

// mongoose.connection.on("connected", () => {
//   console.log("mongoDM connected");
// })
mongoose.connection.on("disconnected", () => {
  console.log("mongoDM disconnected");
})


//middlewares
app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})


app.listen(8800, () => {
    connect()
    console.log(`starting on port port 8800`)
})