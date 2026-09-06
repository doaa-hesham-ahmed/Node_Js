const {prisma} = require('./../../common/db/db');

const findPostByid=async(id)=>{
   return await prisma.post.findUnique({
        where:{
            id : Number(id)
        }
    })
};

const creatPost = async (title, content, userId) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            userId
        }
    });
};

const deletePost = async (id) => {
    return await prisma.post.update({
        where: {
            id:Number(id)
        },
        data:{
            isDeleted:true
        }
    });
};

const findAllPostsDetails = async () => {
    return await prisma.post.findMany({
        where: {
            isDeleted: false
        },

        select: {
            id: true,
            title: true,

            user: {
                select: {
                    id: true,
                    name: true
                }
            },

            comments: {
                select: {
                    id: true,
                    content: true
                }
            }
        }
    });
};
const findAllPosts = async ()=>{
    return await prisma.post.findMany({
        where:{
            isDeleted:false
        },
        select:{
            id:true,
            title:true,
           _count: {
              select: {
              comments: true
    }
}
        }
    }) 
}

module.exports = {findPostByid,creatPost,deletePost,findAllPostsDetails,findAllPosts }