const {Router} = require('express');
const postContentroller = require('./post.controller');
const authGuard = require('../../common/auth/guard');
const postRouter = Router();
// //URL: POST /posts
postRouter.post('/',authGuard,postContentroller.createPost);
// //URL: DELETE /posts/:postId
postRouter.delete('/:postId',authGuard,postContentroller.deletePost);
// //URL: GET /posts/details
postRouter.get('/details',authGuard,postContentroller.retrieveAll);
// //URL: GET /posts/comment-count
postRouter.get('/comment-count',postContentroller.reterieveAllPost);
module.exports = postRouter;