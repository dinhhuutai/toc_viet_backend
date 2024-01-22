const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const serviceController = require("../app/controllers/ServiceController");


router.post("/create", verifyToken, serviceController.create);
router.post("/delete", verifyToken, serviceController.delete);
router.get("/getSingle/:id", serviceController.getSingle);
router.put("/update/:id", serviceController.update);
router.get("/getAll", serviceController.getAll);
router.get("/getAllMale", serviceController.getAllMale);
router.get("/getAllFemale", serviceController.getAllFemale);
router.post("/find", verifyToken, serviceController.find);



module.exports = router;