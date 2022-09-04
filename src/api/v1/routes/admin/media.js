const express = require("express");
const mediaController = require("../../controllers/admin/media");
const router = express.Router()
const { multer } = require("../../config/multer")

router.post("/media", mediaController.postMedia);
router.get("/media", mediaController.getAllMedia);
router.get("/media/get/:mediaId", mediaController.getOneMedia);
router.put("/media", mediaController.putMedia);
router.delete("/media/:mediaId", mediaController.deleteMedia);
module.exports = router;