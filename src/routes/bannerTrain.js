const express = require("express");
const router = express.Router();
const bannerTrainController = require("../app/controllers/BannerTrainController");


router.post("/create", bannerTrainController.create);
router.put("/update/:id", bannerTrainController.update);
router.get("/getAll", bannerTrainController.getAll);

module.exports = router;