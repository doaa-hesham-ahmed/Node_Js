const postService = require('./post.service');

//1. Create new Post
const createPost = async (req,res,next)=>{
    try {
         const {title, content} = req.body;
         const userId = req.user.id;
         const created =await postService.createdPost(title,content,userId);
         res.status(201).json({message:"Post Created successfully",success:true,data:created})
    } catch (error) {
        next(error)
    }

}
//2. Delete a post by its id
const deletePost = async (req,res,next)=>{
    try {
        const userId = req.user.id;
        const postId = req.params.postId;
        const deleted =await postService.deletedPost(userId,postId);
         res.status(201).json({message:"Post is deleted successfully",success:true,data:deleted})
        
    } catch (error) {
        next(error)
    }

}
//3. Retrieve all posts, including the details of the user who created each post and the 
// associated comments. (Show only for the post the
// “id, title”, and for user “id, name”, and for the comments “id, content”)
const retrieveAll = async (req,res,next)=>{
    try {
         const findAll =await postService.retievedAll();
         res.status(201).json({message:"Post is Found successfully",success:true,data:findAll})
        
        
    } catch (error) {
        next(error)
    }

}
//4. Retrieve all posts and count the number of comments associated with each post.
const reterieveAllPost = async (req,res,next)=>{
    try {
        const findAllPosts =await postService.retievedAllPost();
         res.status(201).json({message:"Post is found successfully",success:true,data:findAllPosts})
        

    } catch (error) {
        next(error)
    }

}

module.exports = {createPost,deletePost,reterieveAllPost,retrieveAll}