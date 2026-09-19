import { toMs } from "../../../common/utils/time.js";
import * as authService from "../service/auth.service.js";
export async function register(req,res,next) {
    try {
      const userCreated =  await authService.register(req.body);
        res.status(201).json({
            message:"user is Created Successfully",
            success:true,
            data:userCreated
        })
    } catch (error) {
        next(error)
    }
}
export async function verifyAcount(req,res,next) {
    try {
        const {email,code} = req.body;
      const updateUser =  await authService.verifyAcount(email,code);
        res.status(200).json({
            message:"user is Verified Successfully",
            success:true,
            data:updateUser
        })
    } catch (error) {
        next(error)
    }
}

export async function login(req,res,next) {
    try {
        const {email,password} = req.body;
      const token =  await authService.login(email,password);
      res.cookie('access-token',token,{
        httpOnly:true,
        maxAge:toMs(1,'hours')
      });
        res.status(200).json({
            message:"user is login Successfully",
            success:true,
        })
    } catch (error) {
        next(error)
    }
}

export async function sendotp(req,res,next) {
    try {
        const {email} = req.body;
       await authService.sendOtp(email);
        res.json({
            message:"new otp send , check user email",
            success:true,
        })
    } catch (error) {
        next(error)
    }
}