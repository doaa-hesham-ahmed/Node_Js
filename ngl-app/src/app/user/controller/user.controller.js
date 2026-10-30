import * as userService from '../service/user.service.js';
import * as authService from "../../auth/service/auth.service.js";

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

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function loginConfirmation(req, res, next) {
    try {
        const { email, otp } = req.body;
        const result = await authService.loginConfirmation(email, otp);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function requestEnable2SV(req, res, next) {
    try {
        const userId = req.user._id; // Assumes auth middleware populates req.user
        const result = await authService.requestEnable2SV(userId);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function verifyAndEnable2SV(req, res, next) {
    try {
        const userId = req.user._id;
        const { otp } = req.body;
        const result = await authService.verifyAndEnable2SV(userId, otp);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}