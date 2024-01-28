const express = require("express");
const router = express.Router();
const bannerCollectionController = require("../app/controllers/BannerCollectionController");


router.post("/create", bannerCollectionController.create);
router.put("/update/:id", bannerCollectionController.update);
router.get("/getAll", bannerCollectionController.getAll);

module.exports = router;