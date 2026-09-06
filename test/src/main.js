const {config} = require('dotenv');
config();

const express = require('express');
const healthRoute = require('./app/Health/heath.Route');
const authRoute = require('./App/auth/auth.Route');
const blogRoute = require('./App/blog/blog.Route');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/health',healthRoute);
app.use('/auth',authRoute);
// app.use('/user',us);
app.use('/blog',blogRoute);

app.use((req , res , next)=>{
    res.status(404).json({message:"invaild Route" , success:false});
});

app.use((error ,req , res , next)=>{
    res.json({message:error.message,success:false})
});

app.listen(PORT,()=>{
    console.log(`server is Running on Port.... ${PORT}`);
    
})