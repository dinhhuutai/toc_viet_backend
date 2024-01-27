const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');
const productController = require("../app/controllers/ProductController");


router.post("/create", productController.create);
router.post("/find", productController.find);
router.post("/delete", verifyToken, productController.delete);
router.get("/getSingle/:id", productController.getSingle);
router.put("/update/:id", productController.update);
router.get("/getAll", productController.getAll);
router.post("/createComment/:id", productController.createComment);
router.post("/findComment/:id", productController.findComment);

router.get("/getAdminComment", productController.getAdminComment);
router.put("/updateComment/:idProduct/:idComment", productController.updateComment);
router.post("/findCommentByNotFeedback/:id", productController.findCommentByNotFeedback);
router.post("/deleteComment/:idProduct/:idComment", productController.deleteComment);


module.exports = router;