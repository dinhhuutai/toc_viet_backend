const BannerProduct = require("../models/BannerProduct");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class BannerProductController {
    
    // [POST] /api/v1/bannerProduct/create
    async create(req, res, next) {
        try {

            const bannerProduct = new BannerProduct({
                ...req.body,
                createDate: Date.now(),
            });

            await bannerProduct.save();

            res.status(200).json({
                success: true,
                bannerProduct,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/bannerProduct/update/:id
    async update(req, res, next) {
        try {
            
            const resDelete = await BannerProduct.findById(req.params.id);

            
            const filename = await stringImage(resDelete.image);
            await cloudinary.uploader.destroy(filename);


            const bannerProduct = await BannerProduct.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            )

            res.status(200).json({
                success: true,
                bannerProduct,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/bannerProduct/getAll
    async getAll(req, res, next) {
        try {

            const bannerProduct = await BannerProduct.find();

            res.status(200).json({
                success: true,
                bannerProduct,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new BannerProductController();
