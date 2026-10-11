import * as userRepository from "../repository/user.repo.js"
import {userNotExist} from "../error.js";
import fs from "node:fs"

export async function uploadPicture(userId,file){
    //get user -> old image
    const user = await userRepository.findUserById(userId);
    if(!user) throw userNotExist;
    //delete old picture
    if(user.profilePicPath){
        fs.unlinkSync(user.profilePicPath)
    }
    await userRepository.updateToUserByEmail(user.email,{profilePicPath:file.path})
}