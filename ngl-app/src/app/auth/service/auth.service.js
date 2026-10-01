import { sendEmail } from "../../../common/email/nodemailler.js";
import * as authRepository from "../repository/auth.repo.js";
import * as otpRepository from "../repository/otp.repo.js"
import * as userRepository from "../../user/repository/user.repo.js"
import { toMs } from "../../../common/utils/time.js";

import { invalidCode, invalidPassword, otpExpired } from "../error.js";
import { userAlreadyExist, userAlreadyVerified, userNotExist } from "../../user/error.js";
import { generatedOtp } from "../../../common/utils/otp.js";
import { generatedToken } from "../utils/token.js";
import { comparePassword, hashedPassword } from "../utils/hash.js";
import { AppError } from "../../../common/error/error.js";
import { verifyGoogleToken } from "../../../common/utils/google.auth.js";

export async function register(userDate) {
    // 1-check userByEmail Exist
    const User = await authRepository.findUserByEmail(userDate.email);
    // 1.1 if-> exist throw an Error
    if (User) throw new userAlreadyExist();

    // 2-prepare Date (hash-password)
    userDate.password = await hashedPassword(userDate.password);

    // 3-save User into DB
    const createdUser = await authRepository.createUser(userDate);

    // 4-generate & send email verification
    const otp = generatedOtp();
    
    // Fixed: Added await here so the OTP saves before the email sends
    await otpRepository.createOtp({
        code: otp,
        email: userDate.email,
        expiredAt: new Date(Date.now() + toMs(5, 'minutes'))
    });
    await sendEmail(
        userDate.email,
        'verification code',
        `
        <div style=" font-family: Arial, Helvetica, sans-serif; background-color: #f4f7fb; padding: 40px 20px; ">
         <div style=" max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 12px; padding: 35px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); ">
          <h1 style=" color: #2563eb; text-align: center; margin-bottom: 10px; ">
           Verify Your Email
            </h1> 
            <p style=" color: #555; font-size: 16px; text-align: center; line-height: 1.6; ">
             Welcome! Thank you for creating an account with us. Please use the verification code below to verify your email address. 
             </p>
              <div style=" background-color: #f0f6ff; border: 2px dashed #2563eb; border-radius: 10px; padding: 20px; margin: 30px 0; text-align: center; ">
               <p style=" margin: 0 0 8px; color: #666; font-size: 14px; ">
                Your Verification Code 
                </p> <div style=" font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2563eb; ">
                 ${otp} 
                 </div>
                  </div>
                   <p style=" color: #777; font-size: 14px; text-align: center; line-height: 1.5; ">
                    This code will expire in <strong>5 minutes</strong>. Please do not share this code with anyone. 
                    </p> <hr style=" border: none; border-top: 1px solid #eee; margin: 30px 0; ">
                     <p style=" color: #999; font-size: 12px; text-align: center; margin: 0; ">
                     If you did not create this account, you can safely ignore this email. </p>
                      </div> </div> `
    )
    //5-save otp into DB
    return createdUser;
}

export async function verifyAcount(email, code) {
    //1-check user exist
    const User = await authRepository.findUserByEmail(email);
    //1.1- not exist -> throw error "user is not exist"
    if (!User) throw userNotExist;
    //1.2- isVerifed == true -> throw error "user is verified" 
    if (User.isVerify === true) throw userAlreadyVerified;
    //2- check otp validation
    const otp = await otpRepository.getOtpByEmail(email)
    //2.1-not exist into DB -> throw error "otp expired"
    if (!otp) throw otpExpired;
    //2.2- code not equel code -> throw error "invalid code"
    if (String(otp.code) !== String(code)) throw invalidCode;
    //3-switch is verifed = true 
    const updatedUSer = await userRepository.updateToUserByEmail(email, { isVerify: true });
    //4-delete otp from DB
    await otpRepository.deleteOtp(email);
    return updatedUSer;
}

export async function login(email, password) {
    // 1 - Check user existence
    const User = await authRepository.findUserByEmail(email);
    if (!User)  throw us;

    // 1.1 - Check verification status if required
    if (User.isVerify !== true) throw new AppError("Please verify your account first", 400);

    // 2 - Compare password
    const matching = await comparePassword(password, User['password']);
    if (!matching) throw invalidPassword;
    

    // 3 - Generate token 
    const token = generatedToken({
        id: User._id,
        name: User.name,
        email: User.email,
    });

    return token;
}

export async function sendOtp(email) {
    //1-check user existence
     const User = await authRepository.findUserByEmail(email)
     //1.1-if NO -> throw error "user not exist"
     if(!User) throw userNotExist;
     //2-delete any otp
     await otpRepository.deleteOtpByEmail(email)
     //3-generate otp 
     const otp = generatedOtp();
     await otpRepository.createOtp({
        code:otp,
        email:email,
        expiredAt:Date.now()+toMs(3,'minutes')
     })
     //4-send otp email
    await sendEmail(
    email,
    'New verification code',
    `
    <div style="
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f7fb;
        padding: 40px 20px;
    ">
        <div style="
            max-width: 500px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 35px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        ">
            <h1 style="
                color: #2563eb;
                text-align: center;
                margin-bottom: 10px;
            ">
                New Verification Code
            </h1>

            <p style="
                color: #555;
                font-size: 16px;
                text-align: center;
                line-height: 1.6;
            ">
                You requested a new verification code.
                Please use the code below to verify your email address.
            </p>

            <div style="
                background-color: #f0f6ff;
                border: 2px dashed #2563eb;
                border-radius: 10px;
                padding: 20px;
                margin: 30px 0;
                text-align: center;
            ">
                <p style="
                    margin: 0 0 8px;
                    color: #666;
                    font-size: 14px;
                ">
                    Your New Verification Code
                </p>

                <div style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    color: #2563eb;
                ">
                    ${otp}
                </div>
            </div>

            <p style="
                color: #777;
                font-size: 14px;
                text-align: center;
                line-height: 1.5;
            ">
                This code will expire in <strong>3 minutes</strong>.
                Please do not share this code with anyone.
            </p>

            <hr style="
                border: none;
                border-top: 1px solid #eee;
                margin: 30px 0;
            ">

            <p style="
                color: #999;
                font-size: 12px;
                text-align: center;
                margin: 0;
            ">
                If you did not request a new verification code,
                you can safely ignore this email.
            </p>
        </div>
    </div>
    `
);
     
}

export async function resetPassword(email, code, newPassword) {
    // 1 - Await the OTP from otpRepository
    const otp = await otpRepository.getOtpByEmail(email);
    if (!otp) throw otpExpired;
    
    // 2 - Compare codes safely
    if (String(otp.code) !== String(code)) throw invalidCode;
    
    // 3 - Hash new password and update user using userRepository
    const hashedpassword = await hashedPassword(newPassword);
    await userRepository.updateToUserByEmail(email, { password: hashedpassword });
    
    // 4 - Delete OTP using otpRepository
    await otpRepository.deleteOtpByEmail(email);
}

export async function loginWithGoogle (idToken) {
    //get idToken from FE
   const payload = await verifyGoogleToken(idToken);
    //verify IdToken
    const user = await authRepository.findUserByEmail(payload.email)
    //get payload from idToken
    if(user){
        await generatedToken({
            id:user._id,
            email:user.email,
        })
    }
    //if exist -> generate token
    const createdUser = await authRepository.createUser({
        name:payload.name,
        email:payload.email,
        provider:'google',
        isVerify:true,
    })
   await generatedToken({
            id:createdUser._id,
            email:createdUser.email,
        })
    //if not exist -> create user -> generate token
}