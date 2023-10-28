const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendKey, verifyPayment } = require("../controllers/paymentController")
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/apiKey").get(isAuthenticatedUser, sendKey);
router.route("/verifyPayment").get(isAuthenticatedUser, verifyPayment);

module.exports = router