import { Router } from "express";
import {uploadMultiFile, uploadSingleFile} from "../../lib/media/multer.js";
import {allowedTypes, fileValidation} from "../../lib/media/file.validation.js";
import * as userController from "./controller/user.controller.js"
import {authGuard} from "../../lib/auth/guard.js";

const userRouter = Router();

userRouter.post(
    "/profile-pic",
    authGuard,
    uploadSingleFile("pic", allowedTypes.images),
    fileValidation(allowedTypes.images),
    userController.uploadPicture
);

userRouter.post(
    "/cv",
    uploadSingleFile("cv", allowedTypes.files),
    fileValidation(allowedTypes.files),
    (req, res) => {
        res.json({ message: "CV uploaded successfully" });
    }
);

userRouter.post(
    "/cover-pic",
    uploadMultiFile("cover-pic", 3),
    fileValidation(),
    (req, res) => {
        res.json({
            message: "Cover pictures uploaded successfully",
            count: req.files.length
        });
    }
);

userRouter.post("/login", userController.login);
userRouter.post("/login-confirmation", userController.loginConfirmation);
// 2. 2-Step Verification Enabling Endpoints (requires user to be logged in)
userRouter.post("/2sv/request", authGuard, userController.requestEnable2SV);
userRouter.post("/2sv/verify", authGuard, userController.verifyAndEnable2SV);
export default userRouter ;