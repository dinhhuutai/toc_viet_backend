const express = require("express");
const router = express.Router();
const bannerTocVietController = require("../app/controllers/BannerTocVietController");


router.post("/create", bannerTocVietController.create);
router.post("/delete", bannerTocVietController.delete);
router.get("/getAll", bannerTocVietController.getAll);

module.exports = router;