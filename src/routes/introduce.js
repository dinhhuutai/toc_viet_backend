const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const introduceController = require("../app/controllers/IntroduceController");


router.post("/create", verifyToken, introduceController.create);
router.post("/delete", verifyToken, introduceController.delete);
router.get("/getSingle/:id", introduceController.getSingle);
router.put("/update/:id", introduceController.update);
router.get("/get", introduceController.get);



module.exports = router;