const { default: mongoose } = require("mongoose");

const faqSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    isPublish: {
        type: Boolean,
    },
    displayOrder: {
        type: Number,
    },
},
    { timestamps: true })
const Faq = mongoose.model("Faq", faqSchema);
module.exports = Faq