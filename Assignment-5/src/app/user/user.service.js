const userRepository = require('./user.repository') ;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPasswordLength = (password) => {
    if (password.length <= 6) {
        throw new Error(
            "Password must be greater than 6 characters"
        );
    }
};
const signup = async(name,email,password)=>{
    checkPasswordLength(password);
    //check user is exist
    const existUser = await userRepository.findUserByEmail(email)
    //if exist throw error
    if(existUser) throw new Error("email is already exist");
    //hash password
    const hash_password = await bcrypt.hash(password,10) ;
    //created user in DB 
    return await userRepository.createUser(name,email,hash_password)
    // //generte token 
    // const token = jwt.sign({ id: createdUser.id,name: createdUser.name},process.env.JWT_SECRET,{expiresIn: "1d"});
    // //return token
    // return token;
};

const login = async(email,password)=>{

    checkPasswordLength(password);

    //check user is exist
    const existUser = await userRepository.findUserByEmail(email)
    //if exist throw error
    if(!existUser) throw new Error("invaild credation");
    //compare password
    const matchingpassword = await bcrypt.compare(password,existUser.password)
    //if not matching throw error
    if(!matchingpassword) throw new Error("invaild credation");
    //verify token 
    const token = jwt.sign({ id: existUser.id,name: existUser.name},process.env.JWT_SECRET,{expiresIn: "1d"});
    //return token
    return token;
};

const updatedUser = async (id, name, email, password) => {
    checkPasswordLength(password);

    return await userRepository.updateUser( id,  name,  email, password );
};

const findUserID = async (id) => {
    //check user is exist
    const existUser = await userRepository.checkUserExistById(id)
    //if exist throw error
    if(!existUser) throw new Error("invaild credation");

    return await userRepository.findUserid( id );

};

const findUserEmail = async (email) => {

    const existUser =
        await userRepository.findUserByEmail(email);

    if (!existUser) {
        throw new Error("User not found");
    }

    return existUser;
};

const deleteUserhard = async (id) => {

    const existUser = await userRepository.findUserid(id);

    if (!existUser) {
        throw new Error("User not found");
    }

    return await userRepository.deleteHardUser (id);
};
const deleteUsersoft = async (id) => {

    const existUser = await userRepository.findUserid(id);

    if (!existUser) {
        throw new Error("User not found");
    }

    return await userRepository.deleteSoftUser (id);
};


module.exports={
    signup,login,updatedUser,findUserID,findUserEmail,deleteUserhard,deleteUsersoft
}