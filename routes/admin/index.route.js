const dashboardRouter = require('./dashboard.route');
const productRouter = require('./product.route');
const productCategoryRouter = require('./product-category.route');
const roleRouter = require('./role.route');
const accountRouter = require('./account.route');
const authRouter = require('./auth.route');
const systemConfig = require('../../config/system');
module.exports = (app) => {

    app.use(systemConfig.preFixAdmin + '/dashboard', dashboardRouter);

    app.use(systemConfig.preFixAdmin + '/products', productRouter);

    app.use(systemConfig.preFixAdmin + '/product-category', productCategoryRouter);

    app.use(systemConfig.preFixAdmin + '/roles', roleRouter);

    app.use(systemConfig.preFixAdmin + '/accounts', accountRouter);

    app.use(systemConfig.preFixAdmin + '/auth', authRouter);
};