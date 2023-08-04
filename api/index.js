const { errors } = require("celebrate");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./errors");

const { PORT, ORIGINS, MONGODB_URI } = require("../config/settings");

const app = express();

console.log({ MONGODB_URI });

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors({ origin: ORIGINS }));
app.use(express.json());
app.use(require("./middlewares/webhook"));
app.use(require("./routes"));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
