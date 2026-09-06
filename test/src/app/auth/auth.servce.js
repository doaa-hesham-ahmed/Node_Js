const authRepository = require('./auth.Repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async (name, email, password) => {
    //check user is exist 
    const userExist = await authRepository.findUserByEmail(email);
    //if exist throw error
    if (userExist) throw new Error("user is already exist");

    //hash password
    const password_hash = await bcrypt.hash(password, 10);
    //create user into DB
    const userCreated = await authRepository.createUser(name, email, password_hash);
    //send response
    res.status(201).json({ message: "user is created successfuuly", success: true, data: userCreated })
};

const login = async (email, password) => {
    //check if user exist
    const userExist = await authRepository.findUserByEmail(email);
    //if not exist throw error
    if (!userExist) throw new Error("invaild credentials");
    //compare pasword
    const matching = await bcrypt.compare(password, userExist.password_hash)
    if (!matching) throw new Error("invaild credentials");

    //generate token
    const token = await jwt.sign({ id: userExist.id, name: userExist.name }, process.env.JWT_SECRIT, { expiresIn: '1d' })
    //return token
    return token;
}

const logout = async (email, token) => {

    // 1. Check token exists
    if (!token) {
        throw new Error("Authorization token is required");
    }
    // 2. Extract token from Bearer
    const [bearer, accessToken] = token.split(" ");
    if (bearer !== "Bearer" || !accessToken) {
        throw new Error("Invalid Authorization format");
    }

    // 3. Verify token
    let decoded;

    try {
        decoded = jwt.verify( accessToken, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }

    // 4. Check token belongs to the user
    if (decoded.email !== email) {
        throw new Error("Unauthorized");
    }

    // 5. Logout
    // JWT is stateless, so there is nothing to delete here.
    // The client should remove the token.

    return {message: "Logout successfully",success: true};
};


const send_otp = async (req, res, next) => {
    //check if user exist
    //if not exist throw error
    //generate otp
    //saved otp +expiration
    //send otp to user email
    //return success
}
const verify_otp = async (req, res, next) => {
    //     1. Find OTP by email
    // 2. If OTP doesn't exist → throw error
    // 3. Compare entered OTP with saved OTP
    // 4. Check expiration
    // 5. If valid → mark as verified
    // 6. Return success
}
const reset_password = async (req, res, next) => {

    //    1. Check user exists
    // 2. Check that OTP was verified
    // 3. Validate new password
    // 4. Hash new password
    // 5. Update password in DB
    // 6. Delete/invalidate OTP
    // 7. Return success
}


module.exports = {
    register,
    login,
    logout,
    send_otp,
    verify_otp,
    reset_password
};