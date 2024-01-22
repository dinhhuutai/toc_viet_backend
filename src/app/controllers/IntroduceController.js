const Salon = require("../models/Salon");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;

class IntroduceController {
    // [POST] /api/v1/introduce/create
    async create(req, res, next) {
        try {
            const salon = new Salon({
                ...req.body,
                createDate: Date.now(),
            });

            await salon.save();

            res.status(200).json({
                success: true,
                salon,
            });
        } catch (error) {
            const filename = stringImage(req.body.logo);
            cloudinary.uploader.destroy(filename);

            
            const filename1 = stringImage(req.body.imageFanpage);
            cloudinary.uploader.destroy(filename1);

            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/introduce/delete
    async delete(req, res, next) {
        res.status(200).json({
            success: true,
            introduce: 'introduce'
        });
    }

    // [GET] /api/v1/introduce/getSingle/:id
    async getSingle(req, res, next) {
        res.status(200).json({
            success: true,
            introduce: 'introduce'
        });
    }

    // [PUT] /api/v1/introduce/update/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;

            const salon = await Salon.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                salon,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/v1/introduce/get
    async get(req, res, next) {
        try {

            const salon = await Salon.find();

            return res.status(200).json({
                success: true,
                salon: salon[0],
                length: salon.length,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new IntroduceController();
