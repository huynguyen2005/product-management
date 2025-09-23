const dashboardRouter = require('./dashboard.route');
const systemConfig = require('../../config/system');
module.exports = (app) => {

    app.use(systemConfig.preFixAdmin + '/dashboard', dashboardRouter);
};