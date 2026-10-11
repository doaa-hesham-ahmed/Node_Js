import { Router } from "express";
import {uploadMultiFile, uploadSingleFile} from "../../lib/media/multer.js";
import {allowedTypes, fileValidation} from "../../lib/media/file.validation.js";
import * as userController from "./controller/user.controller.js"
import {Guard} from "../../lib/auth/guard.js";

const userRouter = Router();

userRouter.post(
    "/profile-pic",
    Guard,
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
export default userRouter ;