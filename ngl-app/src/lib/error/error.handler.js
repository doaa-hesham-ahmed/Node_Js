import { logger } from "../../pkg/logger/logger.js"
import { correlatioId } from "../correlationId/correlationId.js"

export function globalErrorHandler(err,req,res,_next){
    logger.error(err.message,{stack:err.message})
    if(err.isOperational === true){
       return res.status(err.statusCode).json({
        stack:err.stack,
        correlatioId:req.correlatioId,
        message:err.message,
        sucess:false,
    })
    }
     return res.status(500).json({
        message:"Internal Server Error",
        sucess:false,
    })
};