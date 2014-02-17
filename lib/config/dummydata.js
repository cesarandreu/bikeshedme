'use strict';

var mongoose = require('mongoose'),
  Bikeshed = mongoose.model('Bikeshed');

/**
 * Populate database with sample application data
 */

Bikeshed.find({}).remove(function () {
  Bikeshed.create({
    title: 'My bikeshed',
    limit: 10,
    pub: true
  }, {
    title: 'My private bikeshed',
    limit: 10
  }, function () {
    console.log('finished creating bikesheds.');
  });
});

// var Bikeshed = new Schema({
//   title: {
//     type: String,
//     max: 256
//   },
//   createdAt: {
//     type: Date,
//     expires: '1h',
//     default: Date.now
//   },
//   limit: {
//     type: Number,
//     min: 5,
//     max: 30,
//     default: 5
//   },
//   pub: {
//     type: Boolean,
//     default: false
//   },
//   votes: {
//     up: {
//       type: Number,
//       default: 0
//     },
//     down: {
//       type: Number,
//       default: 0
//     }
//   }
// }, {
//   toObject: {
//     virtuals: true
//   },
//   toJSON: {
//     virtuals: true
//   }
// });
