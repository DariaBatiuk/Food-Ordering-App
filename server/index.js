const { errors } = require('celebrate');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./errors');

const app = express();

const { PORT, ORIGINS } = require('./config/settings');

require('./db');

app.use(cors({ origin: ORIGINS }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./middlewares/webhook'));
app.use(require('./routes'));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
