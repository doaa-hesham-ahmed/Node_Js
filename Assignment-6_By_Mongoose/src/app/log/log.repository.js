const Log = require('./log.model');

const createLogCollection = async ()=>{
     await Log.createCollection()
    return {
        collection: 'logs',
        created: true
    };
}

const insertLog = async (logData) => {

    const result = await Log.create(logData);

    return {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId
    };
};

module.exports = {
    createLogCollection,
    insertLog
}