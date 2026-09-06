const { prisma } = require('./../../common/db/db');


// 1. Create bulk comments
const createdcomment = async (comments) => {

    return await prisma.comment.createMany({
        data: comments
    });

};
// Find comment by ID
const findCommentById = async (id) => {

    return await prisma.comment.findUnique({
        where: {
            id: Number(id)
        }
    });

};
// 2. Update comment
const updatedcomment = async (id, content) => {

    return await prisma.comment.update({
        where: {
            id: Number(id)
        },
        data: {
            content
        }
    });

};
// 3. Find comment for specific post, user and content
const findComment = async (postId, userId, content) => {

    return await prisma.comment.findFirst({
        where: {
            postId: Number(postId),
            userId: Number(userId),
            content
        }
    });

};
// Create one comment
const createComment = async (postId, userId, content) => {

    return await prisma.comment.create({
        data: {
            postId: Number(postId),
            userId: Number(userId),
            content
        }
    });

};

// 4. Search comments + count
const searchComments = async (word) => {

    const where = {
        content: {
            contains: word,
            mode: 'insensitive'
        }
    };

    const comments = await prisma.comment.findMany({
        where
    });

    const count = await prisma.comment.count({
        where
    });

    return {
        comments,
        count
    };

};
// 5. Get 3 newest comments for post
const getNewestComments = async (postId) => {

    return await prisma.comment.findMany({
        where: {
            postId: Number(postId)
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 3
    });

};
// 6. Get comment details with User and Post
const getCommentDetails = async (id) => {

    return await prisma.comment.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: true,
            post: true
        }
    });

};


module.exports = {

    createdcomment,
    findCommentById,
    updatedcomment,
    findComment,
    createComment,
    searchComments,
    getNewestComments,
    getCommentDetails

};