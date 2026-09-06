const jwt = require('jsonwebtoken');
const userRepository = require("../../App/user/user.repository");

async function  authGuard(req,res,next) {
        try {
        // check token [verify]
        const authorization = req.headers.authorization;//  'Bearer '
        if (!authorization) throw new Error('authorization is missing');
        const token = authorization.split(' ')[1];// ['Bearer' ,'token']
        if (!token) throw new Error('token is missing');
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // check user [find]
        const userId = payload.id;
        const userExist = await userRepository.checkUserExistById(userId);// true | false
        if (!userExist) throw new Error('User not found');
        // if yes next()
        req.user = payload;// inject req by user data [payload = {id, name}]
        next();// ??
    } catch (err) {
        next(err);
    }

}


module.exports = authGuard;