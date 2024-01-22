const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const collectionController = require("../app/controllers/ColectionController");


router.post("/create", verifyToken, collectionController.create);
router.post("/delete", verifyToken, collectionController.delete);
router.get("/getSingle/:id", collectionController.getSingle);
router.put("/update/:id", collectionController.update);
router.get("/getAll", collectionController.getAll);
router.get("/get", collectionController.get);
router.post("/find", verifyToken, collectionController.find);
router.post("/deleteSingleImage", verifyToken, collectionController.deleteSingleImage);



module.exports = router;