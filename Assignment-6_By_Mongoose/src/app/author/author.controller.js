const authorService = require('./author.service');

const createAuthor = async (req, res, next) => {
    try {
        const author = await authorService.createAuthor(req.body);

        res.status(201).json({
            message: 'Author created successfully',
            acknowledged: author.acknowledged,
            insertedId: author.insertedId
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAuthor
};
