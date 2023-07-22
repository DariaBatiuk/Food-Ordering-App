const router = require('express').Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to Food Ordering' });
});

router.use('/api', require('./api'));
router.use(require('./payment'));
router.use(require('./webhook'));

module.exports = router;
