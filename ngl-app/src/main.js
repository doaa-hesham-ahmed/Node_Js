import "dotenv/config";

import "./common/db/mongoose.js";
import express from 'express';
import authRouter from './app/auth/auth.route.js';
import userRouter from './app/user/user.route.js';
import messageRouter from './app/message/message.route.js';
import { logger } from "./common/logger/logger.js";
import core from "cors";
const PORT = 3000;
const app = express();

app.use(core({origin:'http://localhost:4200'}))
//parse convert json to object
app.use(express.json());
//routing
app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/message',messageRouter);

//global handle error
app.use((error,req,res,next)=>{
    if(error.isOperational === true){
       return res.status(error.statusCode).json({
        message:error.message,
        sucess:false,
    })
    }
     return res.status(500).json({
        message:"Internal Server Error",
        sucess:false,
    })
});

app.listen(PORT,()=>{
    logger.info(`Server is Running on ${PORT} ...`);
    
})

