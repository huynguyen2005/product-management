const dashboardRouter = require('./dashboard.route');
const productRouter = require('./product.route');
const productCategoryRouter = require('./product-category.route');
const roleRouter = require('./role.route');
const accountRouter = require('./account.route');
const authRouter = require('./auth.route');
const myAccountRouter = require('./my-account.route');
const systemConfig = require('../../config/system');
const authMiddleware = require('../../middlewares/admin/auth.middleware');

module.exports = (app) => {

    app.use(
        systemConfig.preFixAdmin + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRouter
    );
    app.use(
        systemConfig.preFixAdmin + '/products', 
        authMiddleware.requireAuth,
        productRouter
    );
    app.use(
        systemConfig.preFixAdmin + '/product-category', 
        authMiddleware.requireAuth,
        productCategoryRouter
    );
    app.use(
        systemConfig.preFixAdmin + '/roles', 
        authMiddleware.requireAuth,
        roleRouter
    );
    app.use(
        systemConfig.preFixAdmin + '/accounts', 
        authMiddleware.requireAuth,
        accountRouter,
    );
    app.use(
        systemConfig.preFixAdmin + '/my-account', 
        authMiddleware.requireAuth,
        myAccountRouter,
    );
    app.use(systemConfig.preFixAdmin + '/auth', authRouter);
};