import * as userRepository from "../repository/user.repo.js"
import {userNotExist} from "../error.js";
import fs from "node:fs"

export async function uploadPicture(userId,file){
    //get user -> old image
    const user = await userRepository.findUserById(userId);
    if(!user) throw userNotExist;
     if (!file) {
        throw new Error("No file uploaded");
    }
    //delete old picture
    if (user.profilePicPath && fs.existsSync(user.profilePicPath)) {
    fs.unlinkSync(user.profilePicPath);
}
    await userRepository.updateToUserByEmail(user.email,{profilePicPath:file.path})
}