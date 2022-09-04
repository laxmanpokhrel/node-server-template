const Media = require("../../models/media");

exports.postMedia = (req, res, next) => {
    if (!req.body.title && !req.file) {
        const err = new Error("Error uploading file!");
        err.statusCode = 500;
        throw err;
    }
    const media = new Media({
        title: req?.body?.title,
        description: req.body.description || "",
        alt: req.body.alt || "",
        keywords: req.body.keywords || "",
        url: (() => {
            if (req.file.mimetype.includes("image")) {
                return process.env.STATIC_IMAGE_SERVICE_PATH + req.file.filename;
            }
            if (req.file.mimetype.includes("video")) {
                return process.env.STATIC_VIDEO_SERVICE_PATH + req.file.filename;
            }
        })(),
        type: (() => {
            if (req.file.mimetype.includes("image")) {
                return "image";
            }
            if (req.file.mimetype.includes("video")) {
                return "video";
            }
        })()
    })
    media.save()
        .then(result => {
            res.status(201).json({
                message: "Media upload success.",
                media: result
            })
        }).catch(err => {
            // if (!err.statusCode) err.statusCode = 500;
            next(err);
        });
}
exports.putMedia = (req, res, next) => {
    console.log("put media hit")
    const { _id, ...props } = req.body;
    Media.findById(_id)
        .then(result => {
            if (!result) {
                console.log("inside not result!!");
                const err = new Error("Media Not Found!");
                err.statusCode = 404;
                throw err;
            }
            Media.findByIdAndUpdate(_id, props)
                .then(result => {
                    if (!result) {
                        console.log("inside not result!!");
                        const err = new Error("Media Update Failed!");
                        err.statusCode = 404;
                        throw err;
                    }
                    res.status(200).json({
                        message: "Media update success.",
                        media: result
                    });
                })
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })

}


exports.deleteMedia = (req, res, next) => {
    const mediaId = req.params.mediaId;
    Media.findByIdAndDelete(mediaId)
        .then(result => {
            if (!result) {
                const err = new Error("Media Not Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                message: "Media Delete Success.",
                media: result
            });
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })
}
exports.getAllMedia = (req, res, next) => {
    Media.find()
        .sort({ createdAt: -1 })
        .then(result => {
            res.status(201).json({
                message: "Media upload success.",
                media: result
            })
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        })
}

exports.getOneMedia = (req, res, next) => {
    const mediaId = req.params.mediaId;
    Media.findById(mediaId)
        .then(result => {
            if (!result) {
                const err = new Error("No Media Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                message: "Successfully Fetched.",
                media: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}