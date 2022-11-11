import express from "express";
const app = express();
import dotenv from 'dotenv'
import db from './config/DbConnection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';



app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json())









app.use('/user', userRouter);
app.use ('/admin', adminRouter);




app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

  
app.listen(3002,(err,server)=>{
    if (err) {
        console.log('not connected server');
    }else{
        console.log('server connected');
    }
})