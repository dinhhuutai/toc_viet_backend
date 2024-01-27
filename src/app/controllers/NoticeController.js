const Collection = require("../models/Collection");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Service = require("../models/Service");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;

class NoticeController {
    // [GET] /api/v1/notice/getNotice
    async getNotice(req, res, next) {
        try {
            const collections = await Collection.find();
            let commentCollectionLength = 0;
            for(var collection of collections) {
                const commentTemp = collection.comment.filter((com) => {
                    if (com.feedback === "" || !com.feedback) {
                        return com;
                    }
                });

                commentCollectionLength += commentTemp.length;
            }

            const products = await Product.find();
            let commentProductLength = 0;
            for(var product of products) {
                const commentTemp = product.comment.filter((com) => {
                    if (com.feedback === "" || !com.feedback) {
                        return com;
                    }
                });

                commentProductLength += commentTemp.length;
            }

            const services = await Service.find();
            let commentServiceLength = 0;
            for(var service of services) {
                const commentTemp = service.comment.filter((com) => {
                    if (com.feedback === "" || !com.feedback) {
                        return com;
                    }
                });

                commentServiceLength += commentTemp.length;
            }

            const orderNewLength = await Order.find({status: 'wait'}).count();


            res.status(200).json({
                success: true,
                commentCollectionLength,
                commentProductLength,
                commentServiceLength,
                orderNewLength,
            });
        } catch (error) {

            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new NoticeController();
