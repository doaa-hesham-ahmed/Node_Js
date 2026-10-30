
import express from 'express';
import core from "cors";
import { router } from "./route.js";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import { correlatioId } from "./pkg/correlationId/correlationId.js";
import cookieParser from "cookie-parser"


export function createapp(){
const app = express();
app.use(core({origin:'http://localhost:4200'}))
//get static file
  app.use('/uploads',express.static('uploads'))
//parse convert json to object
app.use(express.json());
app.use(cookieParser());
app.use(correlatioId)
//routing
app.use('/health',(req,res,next)=>{
  console.log('server is HIT');
  res.json('ok')
  
})
app.use('/api',router)

//global handle error
app.use(globalErrorHandler)
  return app;
}