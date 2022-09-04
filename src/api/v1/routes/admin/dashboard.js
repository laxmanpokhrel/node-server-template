const express = require("express")
const dashController = require("../../controllers/admin/dashboard")
const router = express.Router()
router.get("/dash", dashController.getDashMeta)

module.exports = router