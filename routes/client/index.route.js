const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const searchRoutes = require('./search.route');
const chatRoutes = require('./chat.route');
const userRoutes = require('./user.route');
const usersRoutes = require('./users.route');
const productsCategoryMiddleware = require("../../middlewares/client/products-category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const authMiddleware = require("../../middlewares/client/auth.middleware");
module.exports = (app) => {
    app.use(productsCategoryMiddleware.category);
    app.use(userMiddleware.inforUser);
    app.use(cartMiddleware.cartId);
    app.use('/', homeRoutes);
    app.use('/products', productRoutes);
    app.use('/search', searchRoutes);
    app.use('/chat', authMiddleware.requireAuth, chatRoutes);
    app.use('/user', userRoutes);
    app.use('/users', authMiddleware.requireAuth, usersRoutes);
} 