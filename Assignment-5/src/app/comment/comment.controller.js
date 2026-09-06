const commentService = require('./comment.service');


// 1. Create bulk comments
const creatcomment = async (req, res, next) => {

    try {

        const { comments } = req.body;

        const created =await commentService.createcomment(comments);

        res.status(201).json({
            message: "Comments created successfully",
            success: true,
            data: created
        });

    } catch (error) {

        next(error);

    }

};


// 2. Update comment
const updatcomment = async (req, res, next) => {

    try {

        const { commentId } = req.params;

        const { userId, content } = req.body;

        const updated =
            await commentService.updatecomment(
                commentId,
                userId,
                content
            );

        res.status(200).json({
            message: "Comment updated successfully",
            success: true,
            data: updated
        });

    } catch (error) {

        next(error);

    }

};


// 3. Find or create
const findOrCreateComment = async (req, res, next) => {

    try {

        const { postId, userId, content } = req.body;

        const comment =
            await commentService.findOrCreateComment(
                postId,
                userId,
                content
            );

        res.status(200).json({
            message: "Comment found or created successfully",
            success: true,
            data: comment
        });

    } catch (error) {

        next(error);

    }

};


// 4. Search comments
const searchComments = async (req, res, next) => {

    try {

        const { word } = req.query;

        const result =
            await commentService.searchComments(word);

        res.status(200).json({
            message: "Comments retrieved successfully",
            success: true,
            data: result
        });

    } catch (error) {

        next(error);

    }

};


// 5. Get newest comments
const getNewestComments = async (req, res, next) => {

    try {

        const { postId } = req.params;

        const comments =
            await commentService.getNewestComments(postId);

        res.status(200).json({
            message: "Newest comments retrieved successfully",
            success: true,
            data: comments
        });

    } catch (error) {

        next(error);

    }

};


// 6. Get comment details
const getCommentDetails = async (req, res, next) => {

    try {

        const { id } = req.params;

        const comment =
            await commentService.getCommentDetails(id);

        res.status(200).json({
            message: "Comment details retrieved successfully",
            success: true,
            data: comment
        });

    } catch (error) {

        next(error);

    }

};


module.exports = {

    creatcomment,
    updatcomment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails

};