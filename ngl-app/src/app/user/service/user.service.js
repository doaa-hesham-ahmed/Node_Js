import {userNotExist} from "../error.js";
import bcrypt from "bcrypt";
import * as userRepository from "../repository/user.repo.js";
import * as otpRepository from "../../auth/repository/otp.repo.js";
import fs from "node:fs"


export async function loginUser(email, password) {
    const user = await userRepository.findUserById(email);
    if (!user) throw userNotExist;

    // Check if account is temporarily banned (5 minutes)
    if (user.loginBlockedUntil && user.loginBlockedUntil > Date.now()) {
        const remainingMinutes = Math.ceil((user.loginBlockedUntil - Date.now()) / 60000);
        throw new Error(`Account is temporarily banned due to consecutive failed attempts. Try again in ${remainingMinutes} minute(s).`);
    }

    // Validate password (for local provider)
    if (user.provider === "local") {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            user.failedLoginAttempts += 1;

            // If 5 consecutive failed attempts, block account for 5 minutes
            if (user.failedLoginAttempts >= 5) {
                user.loginBlockedUntil = new Date(Date.now() + 5 * 60 * 1000);
                user.failedLoginAttempts = 0; // Reset counter for the next cycle
            }
            await user.save();
            throw new Error("Invalid credentials");
        }
    }

    // Reset failed attempts on success
    user.failedLoginAttempts = 0;
    user.loginBlockedUntil = null;
    await user.save();

    // IF 2-STEP VERIFICATION IS ENABLED: Send OTP and pause login
    if (user.isTwoStepEnabled) {
        const otpRecord = await otpRepository.createOtp(user.email, 5);
        
        // TODO: Send otpRecord.code via your email/mailer service
        // await sendEmail(user.email, `Your login OTP is: ${otpRecord.code}`);

        return {
            requireOTP: true,
            email: user.email,
            message: "2-step verification enabled. Please check your email for the OTP."
        };
    }

    // IF 2-STEP VERIFICATION IS DISABLED: Return tokens directly without extra steps
    // const token = generateAuthTokens(user);
    return {
        requireOTP: false,
        message: "Logged in successfully",
        // token
    };
}

// 2. LOGIN CONFIRMATION ENDPOINT (Verify OTP)
export async function loginConfirmation(email, enteredCode) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw userNotExist;

    const otpRecord = await otpRepository.findValidOtp(email, enteredCode);
    if (!otpRecord) {
        throw new Error("Invalid or expired OTP");
    }

    // Clean up OTP document after success
    await otpRepository.deleteOtp(email);

    // Issue tokens after successful OTP verification
    // const token = generateAuthTokens(user);
    return {
        message: "OTP verified successfully. Logged in.",
        // token
    };
}

// 3. ENABLE 2-STEP VERIFICATION: Step A (Request OTP while logged in)
export async function requestEnable2SV(userId) {
    const user = await userRepository.findUserById(userId);
    if (!user) throw userNotExist;

    const otpRecord = await otpRepository.createOtp(user.email, 10); // 10 min expiry

    // TODO: Send activation OTP via email
    // await sendEmail(user.email, `Your 2SV activation code is: ${otpRecord.code}`);

    return { message: "OTP sent to your email to enable 2-step verification." };
}

// 4. ENABLE 2-STEP VERIFICATION: Step B (Verify OTP & Turn on)
export async function verifyAndEnable2SV(userId, enteredCode) {
    const user = await userRepository.findUserById(userId);
    if (!user) throw userNotExist;

    const otpRecord = await otpRepository.findValidOtp(user.email, enteredCode);
    if (!otpRecord) {
        throw new Error("Invalid or expired OTP");
    }

    // Enable 2SV flag
    user.isTwoStepEnabled = true;
    await user.save();

    // Clean up OTP
    await otpRepository.deleteOtp(user.email);

    return { message: "2-Step verification has been successfully enabled on your account." };
}

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