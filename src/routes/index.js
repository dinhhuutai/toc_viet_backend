const collectionRouter = require('./collection');
const introduceRouter = require('./introduce');
const priceTableRouter = require('./priceTable');
const serviceRouter = require('./service');
const trainRouter = require('./train');
const cloudRouter = require('./cloud');
const userRouter = require('./user');
const productRouter = require('./product');
const categoryRouter = require('./category');

const noticeRouter = require('./notice');
const orderRouter = require('./order');
const bannertocVietRouter = require('./bannertocViet');
const bannerProductRouter = require('./bannerProduct');
const bannerCollectionRouter = require('./bannerCollection');
const bannerTrainRouter = require('./bannerTrain');

const opinionRouter = require('./opinion');


function routes(app) {

    app.use("/api/v1/collection", collectionRouter);
    app.use("/api/v1/introduce", introduceRouter);
    app.use("/api/v1/pricetable", priceTableRouter);
    app.use("/api/v1/service", serviceRouter);
    app.use("/api/v1/train", trainRouter);
    app.use("/api/v1/product", productRouter);
    app.use("/api/v1/category", categoryRouter);
    
    app.use("/api/v1/cloudinary", cloudRouter);
    app.use("/api/v1/user", userRouter);

    app.use("/api/v1/notice", noticeRouter);
    app.use("/api/v1/order", orderRouter);

    app.use("/api/v1/bannerTocViet", bannertocVietRouter);
    app.use("/api/v1/bannerProduct", bannerProductRouter);
    app.use("/api/v1/bannerCollection", bannerCollectionRouter);
    app.use("/api/v1/bannerTrain", bannerTrainRouter);

    app.use("/api/v1/opinion", opinionRouter);

}

module.exports = routes;