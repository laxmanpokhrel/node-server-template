const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path")
const bodyParser = require('body-parser');
const { multer } = require("./src/api/v1/config/multer");
const {
    dashboard: adminDashboardRouter,
    faq: adminFaqRouter,
    faqCategory: adminFaqCategoryRouter,
    media: adminMediaRouter
} = require("./src/api/v1/routes/admin");

// const {
//     contact: clientContactRouter,
// } = require("./src/api/v1/routes/client");

const console_log = require("./src/api/v1/utils/logger/logger");
require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api/v1/file/image", express.static(path.join(__dirname, "src", "api", "v1", "uploads", "image")));
app.use("/api/v1/file/video", express.static(path.join(__dirname, "src", "api", "v1", "uploads", "video")));
app.use("/api/v1/file/pdf", express.static(path.join(__dirname, "src", "api", "v1", "uploads", "pdf")));
app.use("/api/v1/file/zip", express.static(path.join(__dirname, "src", "api", "v1", "uploads", "zip")));

app.use("/api/v1/admin/", multer.single("file"),
    adminDashboardRouter,
    adminFaqRouter,
    adminFaqCategoryRouter,
    adminMediaRouter
)
// app.use("/api/v1/client/", multer.single("file"),
//     clientContactRouter
// )

app.use((err, req, res, next) => {
    const message = err.message;
    // const status = err.statusCode;
    res.status(500).json({ message })
})
mongoose.connect(process.env.DB_URL).then(() => {
    console_log("info", "Database connected successfully.")
    app.listen(process.env.PORT, () => {
        console_log("info", `Listening to port: ${process.env.PORT}`)
    })
}).catch(err => console_log("error", "Error connecting to DB."))

