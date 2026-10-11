import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";


export const allowedTypes  = {
    images: ["image/jpeg", "image/png"],
    files: [ "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ],
    videos: ["video/mp4"],
    audios: ["audio/mp4"]
};

// Middleware to validate file type by magic number (file signatures)
export const fileValidation =
    (allowTypes = allowedTypes.images)=>async (req, _res, next) => {
    try {
      // get the file pat *
        const filePath = req.file.path;
        // read the file and return buffer
        const buffer = fs.readFileSync(filePath);
        // get the file type
        const type = await fileTypeFromBuffer(buffer);

        if (!type || !allowedTypes.includes(type.mime)) {
            fs.unlinkSync(filePath)
            return next(new Error("Invalid file type"));
        }

        return next();
    } catch (error) {
        return next(new Error("Internal server error"));
    }
};