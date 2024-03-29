const Service = require("../models/Service");
const shortid = require("shortid");

const cloudinary = require("cloudinary").v2;
const stringImage = require("../../utils/sliceStringImage");

class ServiceController {
    // [POST] /api/v1/service/create
    async create(req, res, next) {
        try {
            const service = new Service({
                ...req.body,
                comment: [
                    {
                        star: "5",
                        title: "",
                        content:
                            "Salon không gian thoải mái, sang trọng và sạch sẽ. Nhân viên nhiệt tình, vui vẻ, chuyên nghiệp, chất lượng dịch vụ tốt, kiểu tóc đẹp.",
                        name: "Khách hàng tóc việt",
                        phone: "",
                        image: "https://res.cloudinary.com/duqn7oauj/image/upload/v1706185892/salon_hair_toc_viet/bg-login_ncc1h8.jpg",
                        createDate: Date.now(),
                    },
                ],
                createDate: Date.now(),
            });

            await service.save();

            res.status(200).json({
                success: true,
                service,
            });
        } catch (error) {
            const filename = stringImage(req.body.image);
            cloudinary.uploader.destroy(filename);

            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/service/find
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
            const service = await Service.find({
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

            const totalService = await Service.find({
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
            const totalAddToday = await Service.find({
                createDate: { $gte: today },
            }).count();

            return res.status(200).json({
                success: true,
                service,
                totalService,
                totalAddToday,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/service/delete
    async delete(req, res, next) {
        try {
            const { listId } = req.body;

            listId.map(async (id) => {
                const service = await Service.findById(id);
                const image = service.image;
                const resDelete = await Service.findByIdAndDelete(id);

                if (resDelete) {
                    const filename = await stringImage(image);
                    await cloudinary.uploader.destroy(filename);
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

    // [GET] /api/v1/service/getSingle/:id
    async getSingle(req, res, next) {
        try {
            const id = req.params.id;

            const service = await Service.findById(id);

            return res.status(200).json({
                success: true,
                service,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/service/update/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;

            const service = await Service.findByIdAndUpdate(
                id,
                {
                    ...req.body,
                    updateDate: Date.now(),
                },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                service,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/service/getAll
    async getAll(req, res, next) {
        try {
            const services = await Service.find({
                $or: [
                    { name: { $regex: new RegExp(search, "i") } },
                    {
                        title: {
                            $regex: new RegExp(search.replace(/ /g, "-"), "i"),
                        },
                    },
                ],
            }).sort({ createDate: -1 });

            return res.status(200).json({
                success: true,
                services,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/service/getAllMale
    async getAllMale(req, res, next) {
        try {
            const services = await Service.find({
                sex: false,
            });

            return res.status(200).json({
                success: true,
                services,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [GET] /api/v1/service/getAllFemale
    async getAllFemale(req, res, next) {
        try {
            const services = await Service.find({
                sex: true,
            });

            return res.status(200).json({
                success: true,
                services,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/service/createComment/:id
    async createComment(req, res, next) {
        try {
            const id = req.params.id;

            const service = await Service.findByIdAndUpdate(
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
            const comment = service.comment.slice(0, 10);
            const commentLength = service.comment.length;

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

    // [POST] /api/v1/service/findComment/:id?limit=
    async findComment(req, res, next) {
        try {
            const id = req.params.id;
            const limit = req.query.limit;

            const service = await Service.findById(id);

            // Giới hạn mảng comment chỉ lấy 10 phần tử
            const comment = service.comment.slice((limit*10), (limit+1)*10);
            const commentLength = service.comment.length;

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

    // [GET] /api/v1/service/getAdminComment?limit=&skip=
    async getAdminComment(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const services = await Service.find()
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalService = await Service.find().count();

            return res.status(200).json({
                success: true,
                services,
                totalService,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [PUT] /api/v1/service/updateComment/:idService/:idComment
    async updateComment(req, res, next) {
        try {
            const service = await Service.findById(
                req.params.idService
            );

            const commentToUpdate = service.comment.find(
                (comment) => comment._id.toString() === req.params.idComment
            );

            commentToUpdate.feedback = req.body.feedback;
            service.updateDate = new Date();

            const updatedService = await service.save();

            return res.status(200).json({
                success: true,
                updatedService,
                feedback: commentToUpdate.feedback,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    // [POST] /api/v1/service/findCommentByNotFeedback/:id?limit=
    async findCommentByNotFeedback(req, res, next) {
        try {
            const id = req.params.id;
            const limit = req.query.limit;

            const service = await Service.findById(id);

            const commentTemp = service.comment.filter((com) => {
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

    // [POST] /api/v1/service/deleteComment/:idService/:idComment
    async deleteComment(req, res, next) {
        try {
            const result = await Service.findByIdAndUpdate(
                req.params.idService,
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

module.exports = new ServiceController();
