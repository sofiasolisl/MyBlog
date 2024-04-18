import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

const app=express()

app.use(express.json())

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to the database")
    app.listen(3000,()=>{console.log('Server is running on port 3000')})
}).catch((error)=>{
    console.log("Could not connect to the database. Error: ", error)
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message||"Internal Server Error"
    res.status(statusCode).json({message:message, success:false, statusCode})
})

