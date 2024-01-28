const BannerTocViet = require("../models/BannerTocViet");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class BannerTocVietController {
    
    // [POST] /api/v1/bannerTocViet/create
    async create(req, res, next) {
        try {

            const image = new BannerTocViet({
                ...req.body,
                createDate: Date.now(),
            });

            await image.save();

            res.status(200).json({
                success: true,
                image,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [POST] /api/v1/bannerTocViet/delete
    async delete(req, res, next) {
        try {
            const resDelete = await BannerTocViet.findById(req.body.id);
            
            const filename = await stringImage(resDelete.image);
            await cloudinary.uploader.destroy(filename);

            await BannerTocViet.findByIdAndDelete(req.body.id);
            

            res.status(200).json({
                success: true,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/bannerTocViet/getAll
    async getAll(req, res, next) {
        try {

            const images = await BannerTocViet.find();

            res.status(200).json({
                success: true,
                images,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new BannerTocVietController();
