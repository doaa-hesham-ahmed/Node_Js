const authorRepository = require('./author.repository');

const createAuthor = async(authorData)=>{
 return await authorRepository.createAuthor(authorData);
}
module.exports = {
   createAuthor
}