const { Router } = require('express');
const authorRouter = Router();

const authorController = require('./author.controller');

authorRouter.post('/collection/authors', authorController.createAuthor);

module.exports = authorRouter;