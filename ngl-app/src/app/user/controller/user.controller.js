import * as userService from '../service/user.service.js';

export async function uploadPicture (req,res,next){
    try {
       await userService.uploadPicture(req.user.id,req.file)
        res.json({
            message:"Profile picture uploaded successfully",
            status:true
        })
    }catch (error){
        next(error);
    }
}