const FaqCategory = require("../../models/faqCategory");
exports.postFaqCategory = (req, res, next) => {
    const faqCategory = new FaqCategory(req.body);
    faqCategory.save()
        .then(result => {
            res.status(201).json({
                "message": "Faq category upload success.",
                "faqCategory": result
            })
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
        });
}
exports.getAllFaqCategory = (req, res, next) => {
    FaqCategory.find().sort({ createdAt: -1 })
        .then(result => {
            if (!result.length) {
                const err = new Error("No Faq Category Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Successfully Fetched Faq Category.",
                "faqCategory": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.getOneFaqCategory = (req, res, next) => {
    const id = req.params.faqCategoryId;
    FaqCategory.findById(id)
        .then(result => {
            if (!result) {
                const err = new Error("No Faq Category Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Successfully Fetched.",
                "faqCategory": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.putFaqCategory = (req, res, next) => {
    const { _id, ...props } = req.body;
    FaqCategory.findByIdAndUpdate(_id, props)
        .then(result => {
            console.log("result: ", result);
            if (!result) {
                const err = new Error("Faq Category Not Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Updated Successfully.",
                "faqCategory": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.deleteFaqCategory = (req, res, next) => {
    const id = req.params.faqCategoryId;
    FaqCategory.findByIdAndDelete({ _id: id })
        .then(result => {
            if (!result) {
                const err = new Error("Faq Category Not Found!");
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                "message": "Faq Category Deleted Successfully.",
                "faqCategory": result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.searchFaqCategory = (req, res, next) => {
    const searchKey = req.params.searchKey;
    // const $regex = escapeRegExp(searchKey);
    let $regex = new RegExp(searchKey, 'i');
    FaqCategory.find({
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
                "faqCategory": result
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.changeIspublish = (req, res, next) => {
    const id = req.params.faqCategoryId;
    FaqCategory.findById(id)
        .then(result => {
            if (!result) {
                const err = new Error("Faq Category Not Found!");
                err.ststusCode = 404;
                throw err;
            }
            const { isPublish } = result;
            FaqCategory.findByIdAndUpdate(id, { isPublish: !isPublish })
                .then(result => {
                    if (!result) {
                        const err = new Error("Faq Category Not Found!");
                        err.statusCode = 404;
                        throw err;
                    }
                    res.status(200).json({
                        "message": "Is Publish Updated Successfully.",
                        "faqCategory": result
                    });
                })
        })
        .catch(err => {
            console.log("err: ", err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
