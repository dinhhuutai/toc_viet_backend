const Opinion = require("../models/Opinion");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class OpinionController {
    
    // [POST] /api/v1/opinion/create
    async create(req, res, next) {
        try {

            const opinion = new Opinion({
                ...req.body,
                createDate: Date.now(),
            });

            await opinion.save();

            res.status(200).json({
                success: true,
                opinion,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/opinion/update/:id
    async update(req, res, next) {
        try {
            
            const resDelete = await Opinion.findById(req.params.id);

            
            const filename = await stringImage(resDelete.image);
            await cloudinary.uploader.destroy(filename);


            const opinion = await Opinion.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            )

            res.status(200).json({
                success: true,
                opinion,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/opinion/getAll
    async getAll(req, res, next) {
        try {

            const opinions = await Opinion.find();

            res.status(200).json({
                success: true,
                opinions,
            });
        } catch (error) {

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

}

module.exports = new OpinionController();
