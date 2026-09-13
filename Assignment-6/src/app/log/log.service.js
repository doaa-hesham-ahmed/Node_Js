const logRepository = require('./log.repository');
const createLogCollection = async ()=>{
 return await logRepository.createLogCollection()
}
const insertLog = async (logData)=>{
 return await logRepository.insertLog(logData)
}

module.exports = {
    createLogCollection,
    insertLog
}