const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Razorpay = require('razorpay');
const crypto = require("crypto")

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

exports.processPayment = catchAsyncError(async (req, res, next) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
        payment_capture: req.body.payment_capture
    }

    const order = await instance.orders.create(options);

    if (!order) {
        return next(new ErrorHandler("Server Error", 500));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

exports.sendKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ key: process.env.RAZORPAY_ID_KEY })
})

//Verification
exports.verifyPayment = catchAsyncError(async (req, res, next) => {

    const { order_id, payment_id, signature } = req.query;

    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === signature;

    res.status(200).json({ isValid: isAuthentic });

})