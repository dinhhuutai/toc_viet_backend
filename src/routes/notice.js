const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/auth');

const noticeController = require("../app/controllers/NoticeController");


router.get("/getNotice", noticeController.getNotice);



module.exports = router;