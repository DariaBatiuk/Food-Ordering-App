const router = require('express').Router();
const initStripe = require('stripe');
const { STRIPE_SECRET_KEY } = require('../config/settings');
const { BadRequestError, NotFoundError } = require('../errors');

const stripe = initStripe(STRIPE_SECRET_KEY);

const Order = require('../models/order');
const user = require('../models/user');

const calculateOrderAmount = (orderItems) => {
  const initialValue = 0;
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price * currentValue.amount,
    initialValue,
  );
  return itemsPrice * 100;
};

router.post('/create-payment-intent', async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, uid } = req.body;
    // console.log({ orderItems, shippingAddress, userId });

    const totalPrice = calculateOrderAmount(orderItems);

    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({
      orderItems: orderItems.map(order => ({...order, product: { _id: order._id }})),
      shippingAddress,
      paymentMethod: 'stripe',
      totalPrice,
      taxPrice,
      shippingPrice,
      user: await user.findOne({ uid }).orFail(new NotFoundError('User not found')),
    });

    await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd',
    });

    return res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    return next(new BadRequestError(err.message));
  }
});

module.exports = router;
