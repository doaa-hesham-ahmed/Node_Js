import multer, { diskStorage } from "multer";
import crypto from "node:crypto";
import { AppError } from "../error/error.js";
import { allowedTypes } from "./file.validation.js";

export function uploadFile(allowTypes = allowedTypes.images) {
    return multer({
        
      fileFilter(_req, file, cb) {
    console.log("File name:", file.originalname);
    console.log("Received MIME type:", file.mimetype);
    console.log("Allowed types:", allowTypes);

    if (!allowTypes.includes(file.mimetype)) {
        return cb(new AppError("Invalid file format", 400));
    }

    cb(null, true);
},
        limits: {
            fileSize: 5 * 1024 * 1024,
        },

        storage: diskStorage({
            destination: "uploads",
            filename(_req, file, cb) {
                cb(
                    null,
                    `${crypto.randomUUID()}-${file.originalname}`
                );
            },
        }),
    });
}

export function uploadSingleFile(
    fileName,
    allowTypes = allowedTypes.images
) {
    return uploadFile(allowTypes).single(fileName);
}

export function uploadMultiFile(fileName, maxCount = 5) {
    return uploadFile().array(fileName, maxCount);
}

export function uploadFieldsFile(fields) {
    return uploadFile().fields(fields);
}