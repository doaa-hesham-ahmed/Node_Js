const {Router} = require('express');
const authContoller = require('./auth.Controller');
const authRoute = Router();

//register
authRoute.post('/register',authContoller.register);
//login
authRoute.post('/login',authContoller.login);
//logout
authRoute.post('/logout',authContoller.logout);
//send_otp
authRoute.post('/send_otp',authContoller.send_otp);
//verify_otp
authRoute.post('/verify_otp',authContoller.verify_otp);
//reset_password
authRoute.post('/reset_password',authContoller.reset_password);

module.exports = authRoute;