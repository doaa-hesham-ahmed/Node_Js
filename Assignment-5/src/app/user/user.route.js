const {Router} = require('express');
const userRouter = Router();
const authGuard = require("../../common/auth/guard");

const userController = require('./user.controller');
// URL: POST /users/signup
userRouter.post ('/signup',userController.signup);
// URL: POST /users/login
userRouter.post ('/login',userController.login);
// URL: PUT /users/:id
userRouter.put("/:id", authGuard, userController.updateUser);
// URL: GET /users/by-email (for example /user/by-email?email=user1@gmail.com)
userRouter.get('/by-email',userController.findeUSerbyemail);
// URL: GET /user/:id
userRouter.get("/:id", userController.findeUSerbyid);
// URL: DELETE /user/:id
// userRouter.delete("/:id", userController.deledUserHard);
 userRouter.delete("/:id", userController.deledUserSoft);
module.exports = userRouter;