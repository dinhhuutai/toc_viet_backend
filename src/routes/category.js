const express = require("express");
const router = express.Router();
const categoryController = require("../app/controllers/CategoryController");


router.post("/create", categoryController.create);
router.put("/update/:id", categoryController.update);
router.post("/delete", categoryController.delete);
router.get("/getAll", categoryController.getAll);

module.exports = router;