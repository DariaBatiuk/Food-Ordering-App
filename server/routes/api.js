const router = require('express').Router();

const Product = require('../models/productModel');
const User = require ('../models/userModel');

router.get('/products', async (_, res) => {
  try {
    const products = await Product.find()
    return res.status(200).send({ data: products})
  } catch(err) {
    return res.status(400).send({ error: err })
  }
});

router.get('/products-by-categories', async (_, res) => {
  try {
    const products = await Product.aggregate([
      { $match: {}},
      { $group: {
        _id: '$category',
        products: { $push: '$$ROOT'}
      }},
      { $project: { name: '$_id', products: 1, _id: 0}}
    ])
    res.status(200).send({ data: products})
  } catch (err) {
    res.status(400).send({ error: err})
  }
});

router.post('/create-user', (req, res) => {
  if (req.body.email && req.body.name && req.body.uid) {
    const { email, name, uid } = req.body
    return User.create({ name, email, uid })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(400).send({ error: err }))
  }

  return res.status(400).send({ err: new Error('No empty data') })
})

module.exports = router;