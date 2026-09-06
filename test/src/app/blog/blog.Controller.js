const blogServce = require('./blog.servce');

const createBlog = async(req,res,next)=>{
    
  try {
    const { title, description, author_id } = req.body;
    const createdBlog =await blogServce.createBlog(title,description,author_id)
    res.status(201).json({message:"blog is created successfully",success:true,data:createdBlog});
  } catch (error) {
    next(error)
  }
}

const deletedHardBlog = async(req,res,next)=>{
try {
     const { id } = req.params;
      const { author_id } = req.body;

        if (!author_id)  throw new Error("author_id is required");
        const deletedBlog = await blogServce.delethardBlog(id,author_id)
        res.status(200).json({message: "Blog is deleted successfully",success: true,data: deletedBlog});
} catch (error) {
  next(error)
}
}

const deleteSoftBlog = async(req,res,next)=>{
try {
     const { id } = req.params;
      const { author_id } = req.body;

        if (!author_id)  throw new Error("author_id is required");
        const deletedBlog = await blogServce.deletSoftBlog(id,author_id)
        if(!deletedBlog) res.status(404).json({message: "Blog is not found",success: false});
        res.status(200).json({message: "Blog is deleted successfully",success: true,data: deletedBlog});
      } catch (error) {
  next(error)
}
}

const restoreBlog = async(req,res,next)=>{
try {
     const { id } = req.params;
      const { author_id } = req.body;

        if (!author_id)  throw new Error("author_id is required");
        const restoresBlog = await blogServce.restoredtBlog(id,author_id)
        // if(restoresBlog) res.status(404).json({message: "Blog is not found",success: false});
        res.status(200).json({message: "Blog is restored successfully",success: true,data: restoresBlog});
      } catch (error) {
  next(error)
}
}

const updateBlog = async(req,res,next)=>{
try {
     const { id } = req.params;
      const { author_id } = req.body;

        if (!author_id)  throw new Error("author_id is required");
        const updatesBlog = await blogServce.updatedBlog(id,author_id)
        res.status(200).json({message: "Blog is deleted successfully",success: true,data: updatesBlog});
} catch (error) {
  next(error)
}
}


module.exports = {createBlog,deletedHardBlog,deleteSoftBlog,restoreBlog,updateBlog};