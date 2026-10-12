
import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";

export const allowedTypes = {
    images: ["image/jpeg", "image/png"],
    files: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    videos: ["video/mp4"],
    audios: ["audio/mp4"]
};

export const fileValidation =
    (allowTypes = allowedTypes.images) =>
    async (req, _res, next) => {
        try {
            // Support single and multiple uploads
            const files = req.files || (req.file ? [req.file] : []);

            if (files.length === 0) {
                return next(new Error("No file uploaded"));
            }

            for (const file of files) {
                const buffer = fs.readFileSync(file.path);
                const type = await fileTypeFromBuffer(buffer);

                if (!type || !allowTypes.includes(type.mime)) {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }

                    return next(new Error("Invalid file type"));
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    };