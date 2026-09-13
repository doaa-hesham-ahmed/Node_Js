const db = require('../../common/db/mongodb');

const createLogCollection = async ()=>{
     await db.createCollection('logs',{
        capped:true,
        size:1048576
    })
    return {
        collection: 'books',
        created: true
    };
}

const insertLog = async (logData) => {

    const result = await db.collection('logs').insertOne(logData);

    return {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId
    };
};

module.exports = {
    createLogCollection,
    insertLog
}