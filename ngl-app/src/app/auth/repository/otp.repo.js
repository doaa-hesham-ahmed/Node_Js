import Otp from './../model/otp.model.js';
export async function createOtp(otpDate) {
    return await Otp.create(otpDate)
}
export async function getOtpByEmail(email) {
    return await Otp.findOne({email:email})
}

export async function deleteOtpByEmail(email) {
    return await Otp.deleteMany({email:email})
}


