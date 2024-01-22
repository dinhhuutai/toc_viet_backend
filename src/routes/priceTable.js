const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const priceTableController = require("../app/controllers/PriceTableController");


router.post("/create", verifyToken, priceTableController.create);
router.post("/delete", verifyToken, priceTableController.delete);
router.put("/deleteElement/:id", verifyToken, priceTableController.deleteElement);
router.get("/getSingle/:id", priceTableController.getSingle);
router.put("/update/:id", priceTableController.update);
router.put("/updateOut/:id", priceTableController.updateOut);
router.put("/updateIn/:id", priceTableController.updateIn);
router.get("/getAll", priceTableController.getAll);



module.exports = router;