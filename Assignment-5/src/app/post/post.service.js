const postRepository = require('./post.repository');

const createdPost = async(title, content, userId)=>{
   if(!title || !title.trim()) throw new Error("title is require");
   if(!content || !content.trim()) throw new Error("content is require");
 //created
 return await postRepository.creatPost(title, content, userId);

}

const deletedPost = async(userId,postId)=>{
     const postexist = await postRepository.findPostByid(postId);
     if(!postexist) throw new Error("post is not exist");
         if (postexist.userId !== userId) {
        throw new Error("You are not allowed to delete this post");
    }


     return await postRepository.deletePost(postId)
     
}



const retievedAll = async()=>{
     return await postRepository.findAllPostsDetails()
}

const retievedAllPost = async()=>{
    return await postRepository.findAllPosts()
}

module.exports={createdPost,deletedPost,retievedAll,retievedAllPost};