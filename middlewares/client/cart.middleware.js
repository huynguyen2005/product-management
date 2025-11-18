const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    let cart;
    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();
        const expiresCookie = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        })
    }else{
        const cartId = req.cookies.cartId;
        cart = await Cart.findOne({
            _id: cartId
        });
        let totalQuantity = 0;
        if(cart.products.length > 0)
            totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalQuantity = totalQuantity;
        res.locals.miniCart = cart;
    }
    next();
}