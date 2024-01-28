const express = require("express");
const router = express.Router();
const bannerProductController = require("../app/controllers/BannerProductController");


router.post("/create", bannerProductController.create);
router.put("/update/:id", bannerProductController.update);
router.get("/getAll", bannerProductController.getAll);

module.exports = router;