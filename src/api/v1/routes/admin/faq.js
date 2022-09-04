const express = require("express")
const faqController = require("../../controllers/admin/faq")
const router = express.Router()

router.get("/faq", faqController.getAllFaq)
router.get("/faq/get/:faqId", faqController.getOneFaq)
router.get("/faq/changeIsPublish/:faqId", faqController.changeIspublish)
router.delete("/faq/:faqId", faqController.deleteFaq)
router.post("/faq", faqController.postFaq)
router.put("/faq", faqController.putFaq)

module.exports = router