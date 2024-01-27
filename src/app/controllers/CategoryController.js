const Category = require("../models/Category");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class CategoryController {
    
    // [POST] /api/v1/category/create
    async create(req, res, next) {
        try {
            const category = new Category({
                ...req.body,
                createDate: Date.now(),
            });

            await category.save();

            res.status(200).json({
                success: true,
                category,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/category/update/:id
    async update(req, res, next) {
        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            )

            res.status(200).json({
                success: true,
                category,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [POST] /api/v1/category/delete
    async delete(req, res, next) {
        try {
            const category = await Category.findByIdAndDelete(req.body.id);

            res.status(200).json({
                success: true,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [GET] /api/v1/category/getAll
    async getAll(req, res, next) {
        try {
            const categories = await Category.find().sort({createDate: -1});

            res.status(200).json({
                success: true,
                categories,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new CategoryController();
