const bookService = require('./book.service');


// 1. Create Books Collection
const createBooKCollection = async (req, res, next) => {

    try {

        const bookCreated = await bookService.createBooKCollection();

        res.status(201).json({
            message: "book collection is created successfully",
            ok: 1,
            data: bookCreated
        });

    } catch (error) {
        next(error);
    }

};


const createdBookByIndex = async (req, res, next) => {

    try {

        const bookCreated = await bookService.createdBookByIndex();

        res.status(201).json({
            message: "book index is created successfully",
            ok: 1,
            data: bookCreated
        });

    } catch (error) {
        next(error);
    }

};


// 3. Insert One Book
const insertBook = async (req, res, next) => {

    try {

        const existTitle = await bookService.findBookByTitle(req.body.title);

        if (existTitle) {
            throw new Error("the Book title is Already Exist");
        }

        const bookData = await bookService.insertBook(req.body);

        res.status(201).json({
            message: "book is created successfully",
            acknowledged: bookData.acknowledged,
            insertedId: bookData.insertedId
        });

    } catch (error) {
        next(error);
    }

};


// 4. Insert Many Books
const insertManyBook = async (req, res, next) => {

    try {

        const bookData = await bookService.insertManyBook(req.body);

        res.status(201).json({
            message: "books are created successfully",
            acknowledged: bookData.acknowledged,
            insertedIds: bookData.insertedIds
        });

    } catch (error) {
        next(error);
    }

};


// 5. Update Book
const updateBook = async (req, res, next) => {

    try {

        const result = await bookService.updateBook(req.body);

        res.status(200).json({
            message: "book is updated successfully",
            acknowledged: result.acknowledged,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        next(error);
    }

};


// 6. Find Book By Title
const findBookByTitle = async (req, res, next) => {

    try {

        const title = req.params.title || req.query.title;

        const book = await bookService.findBookByTitle(title);

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "book is Founded successfully",
            data: book
        });

    } catch (error) {
        next(error);
    }

};


// 7. Find Books Between Years
const findBookBetween = async (req, res, next) => {

    try {

        const { from, to } = req.query;

        const books = await bookService.findBookBetween(from, to);

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "books are Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 8. Find Books Including Genre
const findIncludesGenre = async (req, res, next) => {

    try {

        const { genres } = req.query;

        const books = await bookService.findIncludesGenre(genres);

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "books are Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 9. Find Books With Skip And Limit
const findBookSkipLimit = async (req, res, next) => {

    try {

        const books = await bookService.findBookSkipLimit();

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "books are Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 10. Find Books Where Year Is Integer
const findBookYearInt = async (req, res, next) => {

    try {

        const books = await bookService.findBookYearInt();

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "books are Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 11. Find Books Excluding Genre
const findExcludegenre = async (req, res, next) => {

    try {

        const { genres } = req.query;

        const books = await bookService.findExcludegenre(genres);

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "books are Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 12. Delete Books Before Year
const deleteBeforeYear = async (req, res, next) => {

    try {

        const year = Number(req.query.year);

        // Validate year
        if (Number.isNaN(year)) {
            return res.status(400).json({
                message: "year must be a valid number"
            });
        }

        const result = await bookService.deleteBeforeYear(year);

        // No books deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "book is Deleted successfully",
            acknowledged: result.acknowledged,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        next(error);
    }

};


// 13. Aggregation 1
const findByaggregate1 = async (req, res, next) => {

    try {

        const books = await bookService.findByaggregate1();

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "book is Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 14. Aggregation 2
const findByaggregate2 = async (req, res, next) => {

    try {

        const books = await bookService.findByaggregate2();

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "book is Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 15. Aggregation 3
const findByaggregate3 = async (req, res, next) => {

    try {

        const books = await bookService.findByaggregate3();

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "book is Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


// 16. Aggregation 4
const findByaggregate4 = async (req, res, next) => {

    try {

        const books = await bookService.findByaggregate4();

        if (books.length === 0) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "book is Founded successfully",
            data: books
        });

    } catch (error) {
        next(error);
    }

};


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
    deleteBeforeYear,
    findExcludegenre,
    findByaggregate1,
    findByaggregate2,
    findByaggregate3,
    findByaggregate4
};