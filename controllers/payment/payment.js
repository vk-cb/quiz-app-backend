const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");
const { ErrorHandler } = require("../../helper/error-handler");
const { SERVER_ERROR, BAD_GATEWAY, OK } = require("../../helper/status-codes");
const { SERVER_ERROR_MSG } = require("../../utils/constant");
const billing = require("../../models/billing");
const { CASHFREE_APP_ID, CASHFREE_SECRET_KEY } = process.env;
const { Cashfree } = require("cashfree-pg");

//cashfree payment gateway integaration
Cashfree.XClientId = CASHFREE_APP_ID;
Cashfree.XClientSecret = CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
 
const createPayment = async (req) => {
  try {
    const {
        fullName,
        email,
        amount,
        paymentMethod,
    //   customerAddress = "N/A",
    //   cartProducts = [],
    //   subTotal,
    //   cgstPercentage,
    //   cgstAmount,
    //   sgstPercentage,
    //   sgstAmount,
    //   roundOff,
    //   isRoundPositive,
    //   totalAmount,
    } = req.body;
    const userId = req.user.id;
    const newOrder = await billing.create({
      customerName: customerName,
      customerContact: customerContact,
      customerEmail: customerEmail,
      customerAddress: customerAddress,
      paymentMethod: paymentMethod,
    //   products: cartProducts,
    //   subTotal: subTotal,
    //   cgstPercentage: cgstPercentage,
    //   cgstAmount: cgstAmount,
    //   sgstPercentage: sgstPercentage,
    //   sgstAmount: sgstAmount,
    //   roundOff: roundOff,
    //   isRoundPositive: isRoundPositive,
    //   totalAmount: totalAmount,
      createdBy: userId,
      updatedBy: userId,
    });
    if (paymentMethod === "Cash") {
      const filter = { _id: newOrder._id };
      const update = {
        paymentStatus: "Paid",
        updatedBy: userId,
        updatedAt: new Date(),
      };
      await billing.findOneAndUpdate(filter, update);
      return { message: "Billing Successfull" };
    } else {
      const request = {
        order_amount: totalAmount,
        order_currency: "INR",
        order_id: newOrder._id,
        customer_details: {
          customer_id: await generateCustomerId(),
          customer_phone: customerContact,
          customer_name: customerName,
          customer_email: customerEmail,
        },
      };
      const response = await Cashfree.PGCreateOrder("2023-08-01", request);
      return response.data;
    }
  } catch (error) {
    if (error.statusCode) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
    console.log(error);
    throw new ErrorHandler(SERVER_ERROR, SERVER_ERROR_MSG);
  }
};
const verifyPayment = async (req) => {
  try {
    const { orderId } = req.body;
    const tenantId = req.user.tenantId;
    const userId = req.user.userId;
    const filter = { _id: orderId, tenantId: tenantId };
    const update = {
      paymentStatus: "Paid",
      updatedBy: userId,
      updatedAt: new Date(),
    };
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    if (response.status === OK) {
      await billing.findOneAndUpdate(filter, update);
      return { message: "Payment Verified" };
    }
  } catch (error) {
    console.error(error);
    throw new ErrorHandler(BAD_GATEWAY, "Invalid order Id");
  }
};
async function generateCustomerId() {
  try {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256");
    hash.update(uniqueId);
    const orderId = hash.digest("hex");
    return orderId.substr(0, 12);
  } catch (error) {
    if (error.statusCode) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
    console.log(error);
    throw new ErrorHandler(SERVER_ERROR, SERVER_ERROR_MSG);
  }
}
module.exports = { createPayment, verifyPayment };
