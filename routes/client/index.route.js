const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const searchRoutes = require('./search.route');
const productsCategoryMiddleware = require("../../middlewares/client/products-category.middleware");
module.exports = (app) => {
    app.use(productsCategoryMiddleware.category);
    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
} 