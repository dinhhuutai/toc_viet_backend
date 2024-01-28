const express = require("express");
const router = express.Router();
const opinionController = require("../app/controllers/OpinionController");


router.post("/create", opinionController.create);
router.put("/update/:id", opinionController.update);
router.get("/getAll", opinionController.getAll);

module.exports = router;