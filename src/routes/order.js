const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const orderController = require("../app/controllers/OrderController");


router.post("/create", orderController.create);

router.put("/updateToProcessing/:id", orderController.updateToProcessing);
router.put("/updateToSuccessed/:id", orderController.updateToSuccessed);
router.put("/updateToCancel/:id", orderController.updateToCancel);

router.get("/getWait", orderController.getWait);
router.get("/getProcessing", orderController.getProcessing);
router.get("/getSuccessed", orderController.getSuccessed);
router.get("/getCancel", orderController.getCancel);

router.get("/getQuantityOrderNew", orderController.getQuantityOrderNew);




module.exports = router;