const router = require('express').Router();

const { STRIPE_SECRET_KEY } = require('../config/settings')

const stripe = require("stripe")(STRIPE_SECRET_KEY)

const Order = require("../models/orderModel")

const calculateOrderAmount = (orderItems) => {
  const initialValue = 0;
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    initialValue
  );
  return itemsPrice * 100;
}

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;
    console.log(shippingAddress);

    const totalPrice = calculateOrderAmount(orderItems)

    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod: "stripe",
      totalPrice,
      taxPrice,
      shippingPrice,
      user: "",
    })

    // await order.save();
     
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
    })

    return res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (e) {
    res.status(400).json({
      error: {
        message: e.message,
      },
    })
  }
})

module.exports = router