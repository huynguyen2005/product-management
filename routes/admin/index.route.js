const dashboardRouter = require('./dashboard.route');
const productRouter = require('./product.route');

const systemConfig = require('../../config/system');
module.exports = (app) => {

    app.use(systemConfig.preFixAdmin + '/dashboard', dashboardRouter);

    app.use(systemConfig.preFixAdmin + '/products', productRouter);
};