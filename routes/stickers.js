var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//Factory using MongoDB
var Sticker = require('../models/Sticker.js');


//GET 
router.get('/', function(req, res, next) {
  Sticker.find(function (err, stickers) {
    if (err) return next(err);
    res.json(stickers);
  });
});

//POST
router.post('/', function(req, res, next) {
	Sticker.create(req.body, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  });
	});

//GET ID
router.get('/:id', function(req, res, next) {
	Sticker.findById(req.params.id, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  });
	});

//UPDATE
router.put('/:id', function(req, res, next) {
	Sticker.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  });
	});

//DELETE
router.delete('/:id', function(req, res, next) {
	  Sticker.findByIdAndRemove(req.params.id, req.body, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
	  });
	}); 
module.exports = router;