'use strict';

var Bikeshed = require('../models').Bikeshed,
  _ = require('lodash'),
  q = require('q');
  // async = require('async');

exports.index = function (req, res) {

  var limit = 5,
    offset = req.query.page > 0 ? req.query.page : 0;

  Bikeshed.findAll({
    where: {
      pub: true
    },
    limit: limit,
    offset: limit * offset
  }).success(function (bikesheds) {
    res.json(bikesheds);
  }).error(function (err) {
    res.json(404, err);
  });
};

exports.create = function (req, res) {

  // var bikeshed = Bikeshed.build(req.body, ['title', 'pub', 'limit']);

  // if (!req.files.A || !req.files.B) {
  //   return res.json(400, 'File A and File B are both required.');
  // }



  return Bikeshed.build(req.body, ['title', 'pub', 'limit'])
    .success(function (bikeshed) {
      return res.json(bikeshed);
    })
    .error(function (err) {
      return res.json(422, err);
    });

};

exports.show = function (req, res) {
  return Bikeshed
    .find(req.params.id)
    .success(function (bikeshed) {
      if (_.isNull(bikeshed)) {
        return res.json(404, 'Bikeshed not found.');
      } else {
        return res.json(bikeshed);
      }
    })
    .error(function (err) {
      return res.json(404, err);
    });
};

exports.vote = function (req, res) {
  return Bikeshed
    .find(req.params.id)
    .success(function (bikeshed) {
      if (_.isNull(bikeshed)) {
        return res.json(404, 'Bikeshed not found.');
      } else {

        var oldVote = req.session.votes[bikeshed.id],
          newVote = req.session.votes[bikeshed.id] = req.body.vote,
          promises = [];
        if (oldVote === 'A') promises.push(bikeshed.decrement('A', {by: 1}));
        if (oldVote === 'B') promises.push(bikeshed.decrement('B', {by: 1}));
        if (newVote === 'A') promises.push(bikeshed.increment('A', {by: 1}));
        if (newVote === 'B') promises.push(bikeshed.increment('B', {by: 1}));
        if (newVote !== 'A' && newVote !== 'B') promises.push(bikeshed.reload());

        return q.all(promises).then(function (arr) {
          return res.json(arr[arr.length -1]);
        }, function (err) {
          return res.json(404, err);
        });

      }
    })
    .error(function (err) {
      return res.json(404, err);
    });
};

