const {Router} = require('express');
const bookRouter = Router();
const bookController = require('./book.controller');
bookRouter.post('/collection/books',bookController.createBooKCollection);

bookRouter.post('/collection/books/index',bookController.createdBookByIndex)
bookRouter.post('/books',bookController.insertBook)
bookRouter.post('/books/batch',bookController.insertManyBook)
bookRouter.patch('/books/future',bookController.updateBook)
bookRouter.get('/books/title',bookController.findBookByTitle)
bookRouter.get('/books/year',bookController.findBookBetween)
bookRouter.get('/books/genres',bookController.findIncludesGenre)
bookRouter.get('/books/skip-limit',bookController.findBookSkipLimit)
bookRouter.get('/books/year-integer',bookController.findBookYearInt)
bookRouter.delete('/books/before-year',bookController.deleteBeforeYear)

bookRouter.get('/books/aggregate1',bookController.findByaggregate1)
bookRouter.get('/books/aggregate2',bookController.findByaggregate2)
bookRouter.get('/books/aggregate3',bookController.findByaggregate3)
bookRouter.get('/books/aggregate4',bookController.findByaggregate4)

module.exports=bookRouter;