const BannerTrain = require("../models/BannerTrain");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class BannerTrainController {
    
    // [POST] /api/v1/bannerTrain/create
    async create(req, res, next) {
        try {

            const bannerTrain = new BannerTrain({
                ...req.body,
                createDate: Date.now(),
            });

            await bannerTrain.save();

            res.status(200).json({
                success: true,
                bannerTrain,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/bannerTrain/update/:id
    async update(req, res, next) {
        try {
            
            const resDelete = await BannerTrain.findById(req.params.id);

            
            const filename = await stringImage(resDelete.image);
            await cloudinary.uploader.destroy(filename);


            const bannerTrain = await BannerTrain.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            )

            res.status(200).json({
                success: true,
                bannerTrain,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/bannerTrain/getAll
    async getAll(req, res, next) {
        try {

            const bannerTrain = await BannerTrain.find();

            res.status(200).json({
                success: true,
                bannerTrain,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new BannerTrainController();
