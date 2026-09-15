
const express = require('express');

const bookRouter = require('./app/book/book.route');
const authorRouter = require('./app/author/author.route');
const logRouter = require('./app/log/log.route');
const connectDB = require('./common/db/mongoose');

connectDB();
const app = express();
const PORT = 3000;
app.use(express.json()) ;//parse json to object

app.use('/',bookRouter);
app.use('/',authorRouter);
app.use('/',logRouter);
// global handel error
app.use ((error,req,res,next)=>{
    res.status(404).json({
        message:error.message,
        success:false,
        stack:error.stack
    })
})
app.listen(PORT,()=>{
    console.log(`the server is Running on ${PORT}`);
    
})