const jwt = require('jsonwebtoken');
const blogRepository = require('./blog.Repository');
const createBlog = async(title , description , author_id)=>{
//     const patload = jwt.verify(token,process.env.JWT_SECRIT);
//    const author_id= patload.id
    //check if blog exist
    const ExistBlog = await blogRepository.findBlogById(author_id);
    //if  not exist throw error
    if(!ExistBlog) throw new Error("blog is not exist");
    //create blog in DB
    return await blogRepository.creatBlog(title,description,author_id);
}

const delethardBlog = async(id,author_id)=>{
    // const patload = jwt.verify(patload,process.env.JWT_SECRIT)
    // const author_id =patload.id ;
    //check if blog exist
     const ExistBlog = await blogRepository.findBlogById(author_id);
    //if  not exist throw error
    if(!ExistBlog) throw new Error("blog is not exist");
    //delete blog from DB
    return await blogRepository.deleteHArdBlog(id,author_id);
}

const deletSoftBlog = async(id,author_id)=>{
    // const patload = jwt.verify(patload,process.env.JWT_SECRIT)
    // const author_id =patload.id ;
    //check if blog exist
     const ExistBlog = await blogRepository.findBlogById(author_id);
    //if  not exist throw error
    if(!ExistBlog) throw new Error("blog is not exist");
    //delete blog from DB
    return await blogRepository.deleteSOFTBlog(id,author_id);
}

const restoredtBlog = async(id,author_id)=>{
    // const patload = jwt.verify(patload,process.env.JWT_SECRIT)
    // const author_id =patload.id ;

    //check if blog exist
     const ExistBlog = await blogRepository.findBlogById(author_id);
    //if  not exist throw error
    if(!ExistBlog) throw new Error("blog is not exist");
    //delete blog from DB
    return await blogRepository.restorBlog(id,author_id);
}

const updatedBlog = async(id,author_id)=>{
    // const patload = jwt.verify(patload,process.env.JWT_SECRIT)
    // const author_id =patload.id ;

    //check if blog exist
     const ExistBlog = await blogRepository.findBlogById(author_id);
    //if  not exist throw error
    if(!ExistBlog) throw new Error("blog is not exist");
    //delete blog from DB
    return await blogRepository.updatBlog(id,author_id);
}

module.exports={
    createBlog,delethardBlog,deletSoftBlog,restoredtBlog,updatedBlog
}