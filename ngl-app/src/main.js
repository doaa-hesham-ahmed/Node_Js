import "dotenv/config";

import "./common/db/mongoose.js";
import express from 'express';
import authRouter from './app/auth/auth.route.js';
import userRouter from './app/user/user.route.js';
import messageRouter from './app/message/message.route.js';
const PORT = 3000;
const app = express();
//parse convert json to object
app.use(express.json());
//routing
app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/message',messageRouter);

//global handle error
app.use((error,req,res,next)=>{
    res.status(404).json({
        message:error.message,
        sucess:false,
        stack:error.stack
    })
});

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT} ...`);
    
})

