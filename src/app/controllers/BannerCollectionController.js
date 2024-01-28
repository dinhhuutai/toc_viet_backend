const BannerCollection = require("../models/BannerCollection");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class BannerCollectionController {
    
    // [POST] /api/v1/bannerCollection/create
    async create(req, res, next) {
        try {

            const bannerCollection = new BannerCollection({
                ...req.body,
                createDate: Date.now(),
            });

            await bannerCollection.save();

            res.status(200).json({
                success: true,
                bannerCollection,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/bannerCollection/update/:id
    async update(req, res, next) {
        try {
            
            const resDelete = await BannerCollection.findById(req.params.id);

            
            const filename = await stringImage(resDelete.image);
            await cloudinary.uploader.destroy(filename);


            const bannerCollection = await BannerCollection.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            )

            res.status(200).json({
                success: true,
                bannerCollection,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/bannerCollection/getAll
    async getAll(req, res, next) {
        try {

            const bannerCollection = await BannerCollection.find();

            res.status(200).json({
                success: true,
                bannerCollection,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new BannerCollectionController();
