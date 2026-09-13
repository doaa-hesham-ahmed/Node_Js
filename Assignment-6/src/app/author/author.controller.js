const authorService = require('./author.service');

const createAuthor = async (req, res, next) => {
    try {
        const existAuthor = await authorService.createAuthor(req.body);
        if(existAuthor) throw new Error("Aothor already Exist");
        
        res.status(201).json({
            message: 'Author created successfully',
            acknowledged:existAuthor.acknowledged,
            insertedId: existAuthor.insertedId
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAuthor
};