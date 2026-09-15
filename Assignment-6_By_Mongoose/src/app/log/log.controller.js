const logService = require('./log.service');

const createLogCollection = async(req,res,next)=>{
try {
    const logCreated = await logService.createLogCollection();
    
    res.status(201).json({
        message:"log is created successfully",
        Ok:1,
        data:logCreated
    })
} catch (error) {
    next(error)
}
}

const insertLog = async(req,res,next)=>{
try {
    const ExistLog = await logService.insertLog(req.body);
   
    res.status(200).json({
            message:"log is created successfully",
            acknowledged:ExistLog.acknowledged,
            insertedId: ExistLog.insertedId
    })
} catch (error) {
    next(error)
}
}
module.exports={
    createLogCollection,
    insertLog
}