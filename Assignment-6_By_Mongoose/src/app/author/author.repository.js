const Author = require('./author.model');

const createAuthor = async (authorData) => {
   const result = await Author.create(authorData);
  return {
        message: 'Author collection created successfully',
        acknowledged:result.acknowledged,
        insertedId: result.insertedId
    }
};

module.exports = {
    createAuthor
};