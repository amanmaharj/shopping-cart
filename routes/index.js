var express = require('express');
var router = express.Router();

var Cart = require('../models/cart')

var Product = require('../models/product')

var Order = require('../models/order')


/* GET home page. */

router.get('/', function (req, res, next) {
  var successMsg = req.flash('success')[0]
  Product.find((err, docs) => {
    var productChunks = []
    var chunkSize = 3
    for (i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize))
    }
    res.render('shop/index', {
      title: 'Shopping-Cart',
      products: productChunks,
      successMsg: successMsg,
      noMessage: !successMsg
    })
  })

})

router.get('/add-to-cart/:id', function (req, res) {
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect('/')
    }
    cart.add(product, product.id)
    req.session.cart = cart
    console.log(req.session.cart)
    res.redirect('/')
  })
})


router.get('/shopping-cart', function (req, res) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null })
  }
  var cart = new Cart(req.session.cart)
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  })
})

router.get('/check-out',isLoggedIn, function (req, res) {
  if (!req.session.cart) {
    return res.redirect('shop/shopping-cart')
  }
  var cart = new Cart(req.session.cart)
  var errMsg = req.flash('error')[0]
  res.render('shop/check-out', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noErrors: !errMsg
  })
})

router.post('/check-out',isLoggedIn, function (req, res) {
  if (!req.session.cart) {
    return res.redirect('shop/shopping-cart')
  }
  var cart = new Cart(req.session.cart)
  const stripe = require("stripe")("sk_test_WM0Mvr0iX9qybu0rLCHYr7Km00x5v0y7Ji")

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "test charge"
  }, function (err, charge) {
    if (err) {
      req.flash('error', err.message)
      return res.redirect('/check-out')
    }
    var newOrder = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    })
    newOrder.save(function (err, result) {
      req.flash('success', 'successfully bought product')
      req.session.cart = null
      res.redirect('/')
    })

  })
})

module.exports = router

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl=req.url
  res.redirect('/users/signin')
}