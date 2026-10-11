import User from "../model/user.model.js";

export async function updateToUserByEmail (email,updateDate){
    return await User.findOneAndUpdate(
        {email:email},
        updateDate,
        {returnDocument:'after'}
    )
}
export async function findUserById(id){
    return await User.findOne({
        _id:id,
        isDeleted:false,
        },
       // {password:-password},
    )
}
