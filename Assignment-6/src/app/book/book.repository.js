const db = require('../../common/db/mongodb');

const createBooKCollection = async () => {

    await db.createCollection('books', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title'],
                properties: {
                    title: {
                        bsonType: 'string',
                        minLength: 1
                    }
                }
            }
        },
        validationLevel: 'strict',
        validationAction: 'error'
    });

    return {
        collection: 'books',
        created: true
    };
};


const createdBookByIndex = async () => {
    return await db.collection('books').createIndex({ title: 1});
};


const insertBook = async (bookData) => {
    const result = await db.collection('books').insertOne(bookData);
    return {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId
    };
};


const insertManyBook = async (bookData) => {
    const result = await db.collection('books').insertMany(bookData);
    return {
        acknowledged: result.acknowledged,
        insertedIds: result.insertedIds
    };
};

const updateBook = async () => {
    const result = await db.collection('books').updateOne(
        { title: "Future" },
        { $set: { year: 2022 } });
    return {
        acknowledged: result.acknowledged,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
    }
}

const findBookByTitle = async (title) => {
    return await db.collection('books').findOne({ title })
}

const findBookBetween = async (from, to) => {
    return await db.collection('books').find({
        year: { $gte: Number(from), $lte: Number(to) }
    }).toArray()
}

const findIncludesGenre = async (genre) => {
    return await db.collection('books').find({
        genres: { $in: [genre] }
    }).toArray();
};

const findBookSkipLimit = async () => {
    return await db.collection('books').find({}).sort({ year: -1 }).skip(2).limit(3).toArray();
};

const findBookYearInt = async () => {
    return await db.collection('books').find({ year: { $type: "int" } }).toArray();
};

const findExcludegenre = async (genre) => {
    return await db.collection('books').find({ genres: { $nin: [genre] } }).toArray();
};

const deleteBeforeYear = async (year) => {
    return await db.collection('books').deleteMany({
        year: { $lt: Number(year) }
    })
};

const findByaggregate1 = async () => {
    return await db.collection('books').aggregate([
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
    ]).toArray();
};

const findByaggregate2 = async () => {
    return await db.collection('books').aggregate([
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
    ]).toArray();
};

const findByaggregate3 = async () => {
    return await db.collection('books').aggregate([
        { $unwind:"$genres" },
        { $project: { 
            title:1,
            genre:"$genres",
            _id:0
         } }
    ]).toArray();
};

const findByaggregate4 = async () => {

    return await db.collection('logs').aggregate([

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

    ]).toArray();
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