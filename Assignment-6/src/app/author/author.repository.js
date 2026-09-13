const db = require('../../common/db/mongodb');

const createAuthor = async (authorData) => {
   const result = await db.collection('authors').insertOne(authorData);
  return {
        message: 'Author collection created successfully',
        acknowledged:result.acknowledged,
        insertedId: result.insertedId
    }
};

module.exports = {
    createAuthor
};