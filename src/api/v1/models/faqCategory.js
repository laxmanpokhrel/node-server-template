const { default: mongoose } = require("mongoose")

const faqCategorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
    isPublish: {
        type: Boolean,
    },
    displayOrder: {
        type: Number,
    },
}, { timestamps: true }
)
const FaqCategory = mongoose.model("FaqCategory", faqCategorySchema);
module.exports = FaqCategory;