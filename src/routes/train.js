const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const trainController = require("../app/controllers/TrainCollection");


router.post("/create", verifyToken, trainController.create);
router.post("/delete", verifyToken, trainController.delete);
router.get("/getSingle/:id", trainController.getSingle);
router.put("/update/:id", trainController.update);
router.get("/get", trainController.get);



module.exports = router;