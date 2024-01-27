const Collection = require("../models/Collection");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class CollectionController {
    // [POST] /api/v1/collection/create
    async create(req, res, next) {
        try {
            const collection = new Collection({
                ...req.body,
                createDate: Date.now(),
            });

            await collection.save();

            res.status(200).json({
                success: true,
                collection,
            });
        } catch (error) {
            for (const image of req.body.images) {
                const filename = stringImage(image);
                cloudinary.uploader.destroy(filename);
            }

            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/collection/find
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
            const collection = await Collection.find({
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

            const totalCollection = await Collection.find({
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
            const totalAddToday = await Collection.find({
                createDate: { $gte: today },
            }).count();

            return res.status(200).json({
                success: true,
                collection,
                totalCollection,
                totalAddToday,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/collection/delete
    async delete(req, res, next) {
        try {
            const { listId } = req.body;

            listId.map(async (id) => {
                const collection = await Collection.findById(id);
                const resDelete = await Collection.findByIdAndDelete(id);

                if (resDelete) {
                    for (const image of collection.images) {
                        const filename = stringImage(image);
                        cloudinary.uploader.destroy(filename);
                    }
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

    // [POST] /api/v1/collection/deleteSingleImage?id=""&path=""
    async deleteSingleImage(req, res, next) {
        try {
            const id = req.query.id;
            const path = req.query.path;

            const collection = await Collection.findByIdAndUpdate(
                id,
                { $pull: { images: path } },
                { new: true }
            );

            if (collection) {
                const filename = stringImage(path);
                cloudinary.uploader.destroy(filename);
            }

            return res.status(200).json({
                success: true,
                collection,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/collection/getSingle/:id
    async getSingle(req, res, next) {
        try {
            const id = req.params.id;

            const collection = await Collection.findById(id);

            return res.status(200).json({
                success: true,
                collection,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/collection/update/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            const images = req.body.images;

            let collection;

            if (name) {
                collection = await Collection.findByIdAndUpdate(
                    id,
                    {
                        name,
                        updateDate: Date.now(),
                    },
                    { new: true }
                );
            }

            if (images) {
                collection = await Collection.findByIdAndUpdate(
                    id,
                    {
                        $push: { images },
                        updateDate: Date.now(),
                    },
                    { new: true }
                );
            }

            return res.status(200).json({
                success: true,
                collection,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/collection/getAll?end=
    async getAll(req, res, next) {
        try {
            const end = req.query.end;
            const colections = await Collection.find()
                .sort({ createDate: -1 })
                .limit(end);

            const totalColection = await Collection.find().count();

            return res.status(200).json({
                success: true,
                colections,
                totalColection,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/collection/get
    async get(req, res, next) {
        try {
            const colections = await Collection.find()
                .sort({ createDate: -1 })
                .limit(3);

            return res.status(200).json({
                success: true,
                colections,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/collection/createComment/:id
    async createComment(req, res, next) {
        try {
            const id = req.params.id;

            const collection = await Collection.findByIdAndUpdate(
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
            const comment = collection.comment.slice(0, 10);
            const commentLength = collection.comment.length;

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

    // [POST] /api/v1/collection/findComment/:id?limit=
    async findComment(req, res, next) {
        try {
            const id = req.params.id;
            const limit = req.query.limit;

            const collection = await Collection.findById(id);

            // Giới hạn mảng comment chỉ lấy 10 phần tử
            const comment = collection.comment.slice(
                limit * 10,
                (limit + 1) * 10
            );
            const commentLength = collection.comment.length;

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

    // [GET] /api/v1/collection/getAdminComment?limit=&skip=
    async getAdminComment(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const collections = await Collection.find()
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalCollection = await Collection.find().count();

            return res.status(200).json({
                success: true,
                collections,
                totalCollection,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/collection/updateComment/:idCollection/:idComment
    async updateComment(req, res, next) {
        try {
            const collection = await Collection.findById(
                req.params.idCollection
            );

            const commentToUpdate = collection.comment.find(
                (comment) => comment._id.toString() === req.params.idComment
            );

            commentToUpdate.feedback = req.body.feedback;
            collection.updateDate = new Date();

            const updatedCollection = await collection.save();

            return res.status(200).json({
                success: true,
                updatedCollection,
                feedback: commentToUpdate.feedback,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/collection/findCommentByNotFeedback/:id?limit=
    async findCommentByNotFeedback(req, res, next) {
        try {
            const id = req.params.id;
            const limit = req.query.limit;

            const collection = await Collection.findById(id);

            const commentTemp = collection.comment.filter((com) => {
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

    // [POST] /api/v1/collection/deleteComment/:idCollection/:idComment
    async deleteComment(req, res, next) {
        try {
            const result = await Collection.findByIdAndUpdate(
                req.params.idCollection,
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

module.exports = new CollectionController();
