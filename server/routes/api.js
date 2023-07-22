const router = require('express').Router();
const { ValidationError } = require('mongoose').Error;
const {
  BadRequestError,
  NotFoundError,
  ConflictRequestError,
} = require('../errors');
const Product = require('../models/product');
const User = require('../models/user');
const { validateCreateUser } = require('../validators');

router.get('/products', async (_, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).send(products);
  } catch (err) {
    return next(new BadRequestError(err.message));
  }
});

router.get('/products-by-categories', async (_, res, next) => {
  try {
    const products = await Product.aggregate([
      { $match: {} },
      {
        $group: {
          _id: '$category',
          products: { $push: '$$ROOT' },
        },
      },
      { $project: { name: '$_id', products: 1, _id: 0 } },
      { $sort: { name: 1 } },
    ]);
    return res.status(200).send(products);
  } catch (err) {
    return next(new BadRequestError(err.message));
  }
});

router.post('/create-user', validateCreateUser, async (req, res, next) => {
  const { email, name, uid } = req.body;
  try {
    const user = await User.create({ name, email, uid });

    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError());
    } else if (err.code === 11000) {
      next(new ConflictRequestError('User with this credentials already exists'));
    } else {
      next(err);
    }
  }

  return next();
});

if (process.env != 'production') {
  router.delete('/user/:id', async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).orFail(new NotFoundError());
      if (user) {
        User.deleteOne(user).then(() => res.send()).catch(next);
      }
    } catch (err) {
      next(err)
    }
  })
}

module.exports = router;
