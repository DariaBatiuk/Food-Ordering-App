const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { PORT, ORIGINS } = require('./config/settings');

const db = require("./db");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors({ origin: ORIGINS }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Food Ordering" });
});

app.use(require('./routes/webhook'));
app.use("/api", require('./routes/api'));
app.use(require('./routes/payment'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});