const {config} = require('dotenv');
config();

const express = require ('express');
const userRouter = require('./App/user/user.Route');
const postRouter = require('./app/post/post.route');
const commentRouter = require('./app/comment/comment.route');
const healthRouter = require('./App/health/health.Route');
const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/health',healthRouter)
app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/comments',commentRouter);
app.use((req,res)=>{
    res.status(404).json({message:"invaild Route",success:false});
});

app.use((error,req,res,next)=>{
    res.status(404).json({message:error.message,success:false,stack:error.stack});
});

app.listen(PORT,()=>{
    console.log(`the server in Running on port ${PORT}`);
    
})

//Postman linl
// https://documenter.getpostman.com/view/49918132/2sBYAvwqwM