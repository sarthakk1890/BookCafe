const Order = require("../models/ordersModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const returning_Days = 5;

//Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, deliveryCharge, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        deliveryCharge,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
        returnDate: Date.now() + returning_Days * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        success: true,
        order
    });
});


//Get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");
    //Populate means it'll get only "name" and "email" from the "user"

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });

});


//Get logged in users' Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });

});


//Get all users' Orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

});


//Update Order Status-- Admin
exports.updateOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === 'Shipped') {
        order.orderItems.forEach(async (temp) => {
            await updateStock(temp.product, temp.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
        order
    });
});

//For above route
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });

}

//Delete Order --Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true
    });

});