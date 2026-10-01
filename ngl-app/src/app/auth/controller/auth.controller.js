import { toMs } from "../../../common/utils/time.js";
import * as authService from "../service/auth.service.js";
import { validateBody } from "../../../common/validation/validation.js";
import { registerODT, verifyAcountODT, loginODT, sendOtpODT, resetPasswordODT } from "../dto/auth.dto.js";

export async function register(req, res, next) {
    try {
        const data = validateBody(registerODT, req.body);
        const userCreated = await authService.register(data);
        res.status(201).json({
            message: "user is Created Successfully",
            success: true,
            data: userCreated
        });
    } catch (error) {
        next(error);
    }
}

export async function verifyAcount(req, res, next) {
    try {
        // Fixed: use validateBody and verifyAcountODT correctly
        const data = validateBody(verifyAcountODT, req.body);
        const { email, code } = data;
        const updateUser = await authService.verifyAcount(email, code);
        res.status(200).json({
            message: "user is Verified Successfully",
            success: true,
            data: updateUser
        });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const data = validateBody(loginODT, req.body);
        const { email, password } = data;
        const token = await authService.login(email, password);
        res.cookie('access-token', token, {
            httpOnly: true,
            maxAge: toMs(1, 'hours')
        });
        res.status(200).json({
            message: "user is login Successfully",
            success: true,
        });
    } catch (error) {
        next(error);
    }
}

export async function sendotp(req, res, next) {
    try {
        const data = validateBody(sendOtpODT, req.body);
        const { email } = data;
        await authService.sendOtp(email);
        res.json({
            message: "new otp send , check user email",
            success: true,
        });
    } catch (error) {
        next(error);
    }
}

export async function resetPassword(req, res, next) {
    try {
        const data = validateBody(resetPasswordODT, req.body);
        const { email, code, newPassword } = data;
        await authService.resetPassword(email, code, newPassword);
        res.json({
            message: "reset password successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export async function loginWithGoogle(req, res, next) {
    try {
        const token = await authService.loginWithGoogle(req.body.idToken);
        res.cookie('access_token',token,{
            httpOnly:true,
            maxAge: toMs(1,'hours')
        })
        res.json({
            message: "user login successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}