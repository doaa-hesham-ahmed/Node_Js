const { Router } = require('express');

const commentRouter = Router();

const commentController =
    require('./comment.controller');

const authGuard =
    require('../../common/auth/guard');


// 3. Find or create
commentRouter.post(
    '/find-or-create',
    authGuard,
    commentController.findOrCreateComment
);


// 4. Search comments
commentRouter.get(
    '/search',
    authGuard,
    commentController.searchComments
);


// 5. Get 3 newest comments
commentRouter.get(
    '/newest/:postId',
    authGuard,
    commentController.getNewestComments
);


// 6. Get comment details
commentRouter.get(
    '/details/:id',
    authGuard,
    commentController.getCommentDetails
);


// 1. Create bulk comments
commentRouter.post(
    '/',
    authGuard,
    commentController.creatcomment
);


// 2. Update comment
commentRouter.patch(
    '/:commentId',
    authGuard,
    commentController.updatcomment
);


module.exports = commentRouter;