const express = require("express");

const webhook = express.json({
  // We need the raw body to verify webhook signatures.
  // Let's compute it only when hitting the Stripe webhook endpoint.
  verify(req, _, buf) {
    if (req.originalUrl.startsWith("/webhook")) {
      req.rawBody = buf.toString();
    }
  },
});

module.exports = webhook;
