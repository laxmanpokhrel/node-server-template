const { default: mongoose } = require("mongoose")

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    alt: {
        type: String
    },
    keywords: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},
    { timestamps: true })
const Media = mongoose.model("Media", mediaSchema);
module.exports = Media