const bookRepository = require('./book.repository');


const createBooKCollection = async () => {

    return await bookRepository.createBooKCollection();

};


const createdBookByIndex = async () => {

    return await bookRepository.createdBookByIndex();

};


const insertBook = async (bookData) => {

    return await bookRepository.insertBook(bookData);

};


const insertManyBook = async (bookData) => {

    return await bookRepository.insertManyBook(bookData);

};

const updateBook = async ()=>{
  return await bookRepository.updateBook();
}
const findBookByTitle = async (title)=>{
  return await bookRepository.findBookByTitle(title)
}
const findBookBetween = async (from,to)=>{
  return await bookRepository.findBookBetween(from,to)
}
const findIncludesGenre = async (genres)=>{
  return await bookRepository.findIncludesGenre(genres)
}
const findBookSkipLimit = async ()=>{
  return await bookRepository.findBookSkipLimit()
}
const findBookYearInt = async ()=>{
  return await bookRepository.findBookYearInt()
}
const findExcludegenre = async (genres)=>{
  return await bookRepository.findExcludegenre(genres)
}
const deleteBeforeYear = async (year)=>{
  return await bookRepository.deleteBeforeYear(year)
}
const findByaggregate1 = async ()=>{
  return await bookRepository.findByaggregate1()
}
const findByaggregate2 = async ()=>{
  return await bookRepository.findByaggregate2()
}
const findByaggregate3 = async ()=>{
  return await bookRepository.findByaggregate3()
}
const findByaggregate4 = async ()=>{
  return await bookRepository.findByaggregate4()
}
module.exports = {
    createBooKCollection,
    createdBookByIndex,
    insertBook,
    insertManyBook,
    updateBook,
    findBookByTitle,
    findBookBetween,
    findIncludesGenre,
    findBookSkipLimit,
    findBookYearInt,
    findExcludegenre,
    deleteBeforeYear,
    findByaggregate1,
    findByaggregate2,
    findByaggregate3,
    findByaggregate4
};