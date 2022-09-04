const Faq = require("../../models/faq");
exports.postFaq = (req, res, next) => {
    const faq = new Faq(req.body);
    faq.save()
        .then(result => {
            res.status(201).json({
                "message": "Faq upload success.",
                "faq": result
            })
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        });
}

exports.getAllFaq = (req, res, next) => {
    Faq.find().sort({ createdAt: -1 })
        .then(result => {
            if (!result.length) {
                const err = new Error("No Faq Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Successfully Fetched Faqs.",
                "faq": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getOneFaq = (req, res, next) => {
    const id = req.params.faqId;
    Faq.findById(id)
        .then(result => {
            if (!result) {
                const err = new Error("No Faq Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Successfully Fetched.",
                "faq": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.putFaq = (req, res, next) => {
    const { _id, ...props } = req.body;
    Faq.findByIdAndUpdate(_id, props)
        .then(result => {
            console.log("result: ", result);
            if (!result) {
                const err = new Error("Faq Not Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Updated Successfully.",
                "faq": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.deleteFaq = (req, res, next) => {
    const id = req.params.faqId;
    Faq.findByIdAndDelete({ _id: id })
        .then(result => {
            if (!result) {
                const err = new Error("Faq Not Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Faq Deleted Successfully.",
                "faq": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.searchFaq = (req, res, next) => {
    const searchKey = req.params.searchKey;
    // const $regex = escapeRegExp(searchKey);
    let $regex = new RegExp(searchKey, 'i');
    Faq.find({
        title: { $regex },
        description: { $regex },
        category: { $regex },
    })
        .sort({ createdAt: -1 })
        .then(result => {
            if (!result.length) {
                const err = new Error("No Match Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Searched Successfully.",
                "faq": result
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.changeIspublish = (req, res, next) => {
    const id = req.params.faqId;
    Faq.findById(id)
        .then(result => {
            if (!result) {
                const err = new Error("Faq Not Found!");
                err.ststusCode = 404;
                throw err;
            }
            const { isPublish } = result;
            Faq.findByIdAndUpdate(id, { isPublish: !isPublish })
                .then(result => {
                    if (!result) {
                        const err = new Error("Faq Not Found!");
                        err.statusCode = 404;
                        throw err;
                    }
                    res.status(200).json({
                        "message": "Is Publish Updated Successfully.",
                        "faq": result
                    });
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
