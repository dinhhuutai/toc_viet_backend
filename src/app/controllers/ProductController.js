const Product = require("../models/Product");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class ProductController {
    
    // [POST] /api/v1/product/create
    async create(req, res, next) {
        try {
            const product = new Product({
                ...req.body,
                createDate: Date.now(),
            });

            await product.save();

            res.status(200).json({
                success: true,
                product,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/product/find
    async find(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;
        const search = req.query.search;

        const name = Number(req.query.sortName);
        const createDate = Number(req.query.sortCreateDate);

        let sort = {};
        if (name === 1 || name === -1) {
            sort = { name: name };
        } else if (createDate === 1 || createDate === -1) {
            sort = { createDate: createDate };
        }

        try {
            const product = await Product.find({
                $or: [
                    { name: { $regex: new RegExp(search, "i") } },
                    {
                        title: {
                            $regex: new RegExp(search.replace(/ /g, "-"), "i"),
                        },
                    },
                ],
            })
                .sort(sort)
                .limit(limit)
                .skip(skip);

            const totalProduct = await Product.find({
                $or: [
                    { name: { $regex: new RegExp(search, "i") } },
                    {
                        title: {
                            $regex: new RegExp(search.replace(/ /g, "-"), "i"),
                        },
                    },
                ],
            }).count();

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const totalAddToday = await Product.find({
                createDate: { $gte: today },
            }).count();

            return res.status(200).json({
                success: true,
                product,
                totalProduct,
                totalAddToday,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/product/getAll?limit=&skip=
    async getAll(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const products = await Product.find().sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalProduct = await Product.find().count();

            return res.status(200).json({
                success: true,
                products,
                totalProduct,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/product/delete
    async delete(req, res, next) {
        try {
            const { listId } = req.body;

            listId.map(async (id) => {
                const product = await Product.findById(id);
                const image = product.image;
                const resDelete = await Product.findByIdAndDelete(id);

                if (resDelete) {
                    const filename = await stringImage(image);
                    await cloudinary.uploader.destroy(filename);
                }
            });

            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/product/getSingle/:id
    async getSingle(req, res, next) {
        try {
            const id = req.params.id;

            const product = await Product.findById(id);

            return res.status(200).json({
                success: true,
                product,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/product/update/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;

            const product = await Product.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                product,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/product/createComment/:id
    async createComment(req, res, next) {
        try {
            const id = req.params.id;

            const product = await Product.findByIdAndUpdate(
                id,
                {
                    $push: {
                        comment: {
                            $each: [{ ...req.body, createDate: Date.now() }],
                            $position: 0,
                        },
                    },
                },
                { new: true }
            );

            // Giới hạn mảng comment chỉ lấy 10 phần tử
            const comment = product.comment.slice(0, 10);
            const commentLength = product.comment.length;

            return res.status(200).json({
                success: true,
                comment,
                commentLength,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/product/findComment/:id?limit=
    async findComment(req, res, next) {
        try {
            const id = req.params.id;
            const limit = req.query.limit;

            const product = await Product.findById(id);

            // Giới hạn mảng comment chỉ lấy 10 phần tử
            const comment = product.comment.slice((limit*10), (limit+1)*10);
            const commentLength = product.comment.length;

            return res.status(200).json({
                success: true,
                comment,
                commentLength,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/product/getAdminComment?limit=&skip=
    async getAdminComment(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const products = await Product.find()
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalProduct = await Product.find().count();

            return res.status(200).json({
                success: true,
                products,
                totalProduct,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/product/updateComment/:idProduct/:idComment
    async updateComment(req, res, next) {
        try {
            const product = await Product.findById(
                req.params.idProduct
            );

            const commentToUpdate = product.comment.find(
                (comment) => comment._id.toString() === req.params.idComment
            );

            commentToUpdate.feedback = req.body.feedback;
            product.updateDate = new Date();

            const updatedProduct = await product.save();

            return res.status(200).json({
                success: true,
                updatedProduct,
                feedback: commentToUpdate.feedback,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/product/findCommentByNotFeedback/:id?limit=
    async findCommentByNotFeedback(req, res, next) {
        try {
            const id = req.params.id;
            const limit = req.query.limit;

            const product = await Product.findById(id);

            const commentTemp = product.comment.filter((com) => {
                if (com.feedback === "" || !com.feedback) {
                    return com;
                }
            });

            // Giới hạn mảng comment chỉ lấy 10 phần tử
            const comment = commentTemp.slice(limit * 10, (limit + 1) * 10);

            const commentLength = commentTemp.length;

            return res.status(200).json({
                success: true,
                comment,
                commentLength,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/product/deleteComment/:idProduct/:idComment
    async deleteComment(req, res, next) {
        try {
            const result = await Product.findByIdAndUpdate(
                req.params.idProduct,
                {
                    $pull: {
                        comment: { _id: req.params.idComment },
                    },
                }
            );

            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new ProductController();
