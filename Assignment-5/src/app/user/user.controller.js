const { empty } = require('@prisma/client/runtime/library');
const userService = require('./user.service') ;
const { findUseremail } = require('./user.repository');

const signup = ('/',async(req,res,next)=>{
try {
    const {name,email,password} = req.body;
    const createdUser = await userService.signup(name,email,password);
    res.status(201).json({message:"user is added successfully",success:true,data:createdUser});
} catch (error) {
    next(error)
}
})

const login = ('/',async(req,res,next)=>{
try {
    const {email,password} = req.body;
    const token = await userService.login(email,password);
    res.status(200).json({message:"user is login successfully",success:true,data:token});
} catch (error) {
    next(error)
}
});


const updateUser = async (req, res, next) => {
    try {

        const { id } = req.params;
        if(Number(id)!==Number(req.user.id)) throw new Error("You cannot update another user");

        const { name, email, password } = req.body;

        const userUpdate =
            await userService.updatedUser(
                id,
                name,
                email,
                password
            );

        res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: userUpdate
        });

    } catch (error) {
        next(error);
    }
};

const findeUSerbyid = async (req, res, next) => {
    try {

        const { id } = req.params;

        const finduser = await userService.findUserID(id);

        if (!finduser) {
            throw new Error("User not found");
        }

        res.status(200).json({
            message: "User found successfully",
            success: true,
            data: finduser
        });

    } catch (error) {
        next(error);
    }
};

const findeUSerbyemail = async (req, res, next) => {
    try {

         const { email } = req.query;

        if (!email) {
            throw new Error("Email is required");
        }

        const finduser = await userService.findUserEmail(email);

        if (!finduser) {
            throw new Error("User not found");
        }

        res.status(200).json({
            message: "User found successfully",
            success: true,
            data: finduser
        });

    } catch (error) {
        next(error);
    }
};
const deledUserHard = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletUser = await userService.deleteUserhard(id);

        res.status(200).json({
            message: "User deleted successfully",
            success: true,
            data: deletUser
        });

    } catch (error) {
        next(error);
    }
};

const deledUserSoft = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletUser = await userService.deleteUsersoft(id);

        res.status(200).json({
            message: "User deleted successfully",
            success: true,
            data: deletUser
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {signup,login,updateUser,findeUSerbyid,findeUSerbyemail,deledUserHard,deledUserSoft};