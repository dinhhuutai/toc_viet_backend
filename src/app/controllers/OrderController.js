const Order = require("../models/Order");
const shortid = require("shortid");


class OrderController {
    // [POST] /api/v1/order/create
    async create(req, res, next) {
        try {
            const order = new Order({
                ...req.body,
                status: 'wait',
                createDate: Date.now(),
            });

            await order.save();

            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [PUT] /api/v1/order/updateToProcessing/:id
    async updateToProcessing(req, res, next) {
        try {
            const order = await Order.findByIdAndUpdate(id, {
                status: 'processing',
            }, {new: true})


            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/order/updateToSuccessed/:id
    async updateToSuccessed(req, res, next) {
        try {
            const order = await Order.findByIdAndUpdate(id, {
                status: 'successed',
            }, {new: true})


            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
    
    // [PUT] /api/v1/order/updateToCancel/:id
    async updateToCancel(req, res, next) {
        try {
            const order = await Order.findByIdAndUpdate(id, {
                status: 'cancel',
            }, {new: true})


            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/v1/order/getWait?limit=&skip=
    async getWait(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const orders = await Order.find({status: 'wait'})
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalOrder = await Product.find({status: 'wait'}).count();

            return res.status(200).json({
                success: true,
                orders,
                totalOrder,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/order/getProcessing?limit=&skip=
    async getProcessing(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const orders = await Order.find({status: 'processing'})
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalOrder = await Product.find({status: 'processing'}).count();

            return res.status(200).json({
                success: true,
                orders,
                totalOrder,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    // [GET] /api/v1/order/getSuccessed?limit=&skip=
    async getSuccessed(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const orders = await Order.find({status: 'successed'})
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalOrder = await Product.find({status: 'successed'}).count();

            return res.status(200).json({
                success: true,
                orders,
                totalOrder,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/order/getCancel?limit=&skip=
    async getCancel(req, res, next) {
        const limit = req.query.limit;
        const skip = req.query.skip;

        try {
            const orders = await Order.find({status: 'cancel'})
                .sort({ createDate: -1 })
                .limit(limit)
                .skip(skip);

            const totalOrder = await Product.find({status: 'cancel'}).count();

            return res.status(200).json({
                success: true,
                orders,
                totalOrder,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }

    
    
    // [GET] /api/v1/order/getQuantityOrderNew
    async getQuantityOrderNew(req, res, next) {

        try {
            const totalOrderNew = await Order.find({status: 'wait'}).count();


            return res.status(200).json({
                success: true,
                totalOrderNew,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
}

module.exports = new OrderController();
