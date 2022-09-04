const multer = require("multer")
const console_log = require("../utils/logger/logger")
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("file storage :", file);
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/gif"
        ) cb(null, "./src/api/v1/uploads/image");
        if (file.mimetype === "video/mp4")
            cb(null, "./src/api/v1/uploads/image");

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "video/mp4"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
exports.multer = multer({ storage: fileStorage, fileFilter: fileFilter })