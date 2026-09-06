const {Router} = require('express');
const blogController = require('./blog.Controller');
const blogRoute = Router();

blogRoute.post('/', blogController.createBlog);
// blogRoute.delete('/:id',blogController.deletedHardBlog);
blogRoute.delete('/:id',blogController.deleteSoftBlog);
blogRoute.patch('/:id',blogController.restoreBlog);
blogRoute.put('/:id',blogController.updateBlog);

module.exports = blogRoute;