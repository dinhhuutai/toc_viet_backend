const PriceTable = require("../models/PriceTable");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;

class PriceTableController {
    // [POST] /api/v1/pricetable/create
    async create(req, res, next) {
        try {
            const priceTable = new PriceTable({
                ...req.body,
                createDate: Date.now(),
            });

            await priceTable.save();

            const priceTables = await PriceTable.find();

            res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/pricetable/delete
    async delete(req, res, next) {
        try {
            await PriceTable.findByIdAndDelete(req.body.id);

            const priceTables = await PriceTable.find();

            return res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/pricetable/deleteElement/:id
    async deleteElement(req, res, next) {
        try {
            const id = req.params.id;

            const priceTableTemp = await PriceTable.findById(id);

            if (priceTableTemp.type.length <= 1) {
                await PriceTable.findByIdAndDelete(id);
            } else {
                await PriceTable.findByIdAndUpdate(
                    id,
                    {
                        $pull: { type: { _id: req.body.idElement } },
                        updateDate: Date.now(),
                    },
                    { new: true }
                );
            }

            const priceTables = await PriceTable.find();

            return res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/pricetable/getSingle/:id
    async getSingle(req, res, next) {
        res.status(200).json({
            success: true,
            pricetable: "pricetable",
        });
    }

    // [PUT] /api/v1/pricetable/update/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;

            const priceTable = await PriceTable.findByIdAndUpdate(
                id,
                {
                    $push: { type: req.body.type },
                    updateDate: Date.now(),
                },
                { new: true }
            );

            const priceTables = await PriceTable.find();

            return res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/pricetable/updateOut/:id
    async updateOut(req, res, next) {
        try {
            const id = req.params.id;

            const priceTable = await PriceTable.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            );

            const priceTables = await PriceTable.find();

            return res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/pricetable/updateIn/:id
    async updateIn(req, res, next) {
        try {
            const id = req.params.id;

            const priceTableTemp = await PriceTable.findOne({
                _id: id,
                "type._id": req.body.idType, // Tìm theo _id của phần tử trong mảng type
            });

            const priceTable = await PriceTable.findOneAndUpdate(
                {
                    _id: id,
                    "type._id": req.body.idType, // Tìm theo _id của phần tử trong mảng type
                },
                {
                    $set: {
                        "type.$.detail": req.body.detail,
                        "type.$.price": req.body.price,
                        "type.$.priceMin": req.body.priceMin,
                        "type.$.priceMax": req.body.priceMax,
                        "type.$.isPriceRange": req.body.isPriceRange,
                        updateDate: Date.now(),
                    },
                },
                { new: true }
            );

            const priceTables = await PriceTable.find();

            return res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/pricetable/getAll
    async getAll(req, res, next) {
        try {
            const priceTables = await PriceTable.find();

            return res.status(200).json({
                success: true,
                priceTables,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new PriceTableController();
