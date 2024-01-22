const Train = require("../models/Train");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;

class TrainController {
    // [POST] /api/v1/train/create
    async create(req, res, next) {
        try {
            const train = new Train({
                ...req.body,
                createDate: Date.now(),
            });

            await train.save();

            res.status(200).json({
                success: true,
                train,
            });
        } catch (error) {
            const filename1 = stringImage(req.body.image1);
            cloudinary.uploader.destroy(filename1);

            const filename2 = stringImage(req.body.image2);
            cloudinary.uploader.destroy(filename2);

            const filename3 = stringImage(req.body.image3);
            cloudinary.uploader.destroy(filename3);
            
            const filename4 = stringImage(req.body.image4);
            cloudinary.uploader.destroy(filename4);


            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/train/delete
    async delete(req, res, next) {
        res.status(200).json({
            success: true,
            train: 'train'
        });
    }

    // [GET] /api/v1/train/getSingle/:id
    async getSingle(req, res, next) {
        res.status(200).json({
            success: true,
            train: 'train'
        });
    }

    // [PUT] /api/v1/train/update/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;

            const train = await Train.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                train,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/train/get
    async get(req, res, next) {
        try {

            const train = await Train.find();

            return res.status(200).json({
                success: true,
                train: train[0],
                length: train.length,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new TrainController();
