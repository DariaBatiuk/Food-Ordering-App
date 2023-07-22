const router = require('express').Router();
const initStripe = require('stripe');
const { STATUS_BAD_REQUEST } = require('../errors')
const { STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } = require('../config/settings');

const stripe = initStripe(STRIPE_SECRET_KEY);

/**
 * Expose a endpoint as a webhook handler for asynchronous events.
 * Configure your webhook in the stripe developer dashboard
 * @see https://dashboard.stripe.com/test/webhooks
*/
router.post('/webhook', async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.');
      return res.sendStatus(STATUS_BAD_REQUEST);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'payment_intent.succeeded') {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log('💰 Payment captured!', data);
  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  }
  return res.sendStatus(200);
});

module.exports = router;
