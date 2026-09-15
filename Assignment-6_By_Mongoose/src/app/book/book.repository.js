
const Book = require('./book.model')

const createBooKCollection = async () => {

    await Book.createCollection();

    return {
        collection: 'books',
        created: true
    };
};


const createdBookByIndex = async () => {
    // return await db.collection('books').createIndex({ title: 1});
      return await Book.collection.createIndex({ title: 1});
};


const insertBook = async (bookData) => {
    // const result = await db.collection('books').insertOne(bookData);
     const result = await Book.create(bookData);
    return {
        acknowledged: result.acknowledged,
        insertedId: result._id
    };
};


const insertManyBook = async (bookData) => {
    // const result = await db.collection('books').insertMany(bookData);
    const result = await Book.insertMany(bookData);
    return {
        acknowledged: result.acknowledged,
        // insertedIds: result.insertedIds
        insertedIds: result.map(Book => Book._id)
    };
};

const updateBook = async () => {
    // const result = await db.collection('books').updateOne(
    //     { title: "Future" },
    //     { $set: { year: 2022 } });
    const result = await Book.updateOne(
        { title: "Future" },
        { $set: { year: 2022 } });
    return {
        acknowledged: result.acknowledged,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
    }
}

const findBookByTitle = async (title) => {
    //return await db.collection('books').findOne({ title })
    return await Book.findOne({ title })
}

const findBookBetween = async (from, to) => {
    // return await db.collection('books').find({
    //     year: { $gte: Number(from), $lte: Number(to) }
    // }).toArray()
     return await Book.find({
        year: { $gte: Number(from), $lte: Number(to) }
    })
}

const findIncludesGenre = async (genre) => {
    // return await db.collection('books').find({
    //     genres: { $in: [genre] }
    // }).toArray();
    return await Book.find({
        genres: { $in: [genre] }
    })
};

const findBookSkipLimit = async () => {
    // return await db.collection('books').find({}).sort({ year: -1 }).skip(2).limit(3).toArray();
     return await Book.find({}).sort({ year: -1 }).skip(2).limit(3);
};

const findBookYearInt = async () => {
    // return await db.collection('books').find({ year: { $type: "int" } }).toArray();
    return await Book.find({ year: { $type: "int" } });
};

const findExcludegenre = async (genre) => {
    // return await db.collection('books').find({ genres: { $nin: [genre] } }).toArray();
     return await Book.find({ genres: { $nin: [genre] } });
};

const deleteBeforeYear = async (year) => {
    // return await db.collection('books').deleteMany({
    //     year: { $lt: Number(year) }
    // })
    return await Book.deleteMany({
        year: { $lt: Number(year) }
    })
};

const findByaggregate1 = async () => {
    return await Book.aggregate([
        { $match: { year: { $gt: 2000 } } },
        {
            $project: {
                title: 1,
                author: 1,
                year: 1,
                genres: 1,
                _id:0
            }
        },
        { $sort: {year:-1}}
    ])
};

const findByaggregate2 = async () => {
    return await Book.aggregate([
        { $match: { year: { $gt: 2000 } } },
        {
            $project: {
                title: 1,
                author: 1,
                year: 1,
                _id:0
            }
        },
        { $sort: {year:-1}}
    ])
};

const findByaggregate3 = async () => {
    return await Book.aggregate([
        { $unwind:"$genres" },
        { $project: { 
            title:1,
            genre:"$genres",
            _id:0
         } }
    ])
};

const findByaggregate4 = async () => {

    return await Book.aggregate([

        {
            $addFields: {
                convertedBookId: {
                    $convert: {
                        input: "$Book_id",
                        to: "objectId",
                        onError: null,
                        onNull: null
                    }
                }
            }
        },

        {
            $lookup: {
                from: "books",
                localField: "convertedBookId",
                foreignField: "_id",
                as: "book_details"
            }
        },

        {
            $project: {
                _id: 0,
                Action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1
            }
        }

    ])
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
    findExcludegenre,
    deleteBeforeYear,
    findByaggregate1,
    findByaggregate2,
    findByaggregate3,
    findByaggregate4
};