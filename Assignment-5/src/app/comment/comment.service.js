const commentRepository = require('./comment.repository');


// 1. Create bulk comments
const createcomment = async (comments) => {
    if (!Array.isArray(comments) || comments.length === 0)  throw new Error("Comments must be a non-empty array");
    return await commentRepository.createdcomment(comments);

};
// 2. Update comment
const updatecomment = async (id, userId, content) => {

    if (!userId)  throw new Error("User ID is required");
    if (!content)  throw new Error("Content is required");
    const existComment = await commentRepository.findCommentById(id);
    if (!existComment) throw new Error("Comment not found");
    if (existComment.userId !== Number(userId))  throw new Error("You are not the owner of this comment");
    return await commentRepository.updatedcomment( id,content);

};
// 3. Find or create comment
const findOrCreateComment = async (postId,userId, content) => {

    if (!postId)  throw new Error("Post ID is required");
    if (!userId) throw new Error("User ID is required");
    if (!content) throw new Error("Content is required");
    const existComment = await commentRepository.findComment(postId, userId, content);
    if (existComment)  return existComment;
    return await commentRepository.createComment(postId,userId,content);

};
// 4. Search comments
const searchComments = async (word) => {

    if (!word)  throw new Error("Word is required");
    return await commentRepository.searchComments(word);

};
// 5. Get newest comments
const getNewestComments = async (postId) => {

    if (!postId)  throw new Error("Post ID is required");
    return await commentRepository.getNewestComments(postId);

};
// 6. Get comment details
const getCommentDetails = async (id) => {

    const comment = await commentRepository.getCommentDetails(id);
    if (!comment) throw new Error("Comment not found");
    return comment;

};


module.exports = {
    createcomment,
    updatecomment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails

};