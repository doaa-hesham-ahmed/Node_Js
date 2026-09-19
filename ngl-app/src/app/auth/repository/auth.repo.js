import User from '../../user/model/user.model.js';

export async function findUserByEmail (email){
   return await User.findOne({email:email});
};

export async function createUser(userDate) {
    return await User.create(userDate)
}