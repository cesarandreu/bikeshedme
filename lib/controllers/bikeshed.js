'use strict';

var Bikeshed = require('../models').Bikeshed,
  _ = require('lodash'),
  q = require('q'),
  multiparty = require('multiparty');
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
    res.json({
      page: offset,
      bikesheds: bikesheds
    });
  }).error(function (err) {
    res.json(404, err);
  });
};

exports.create = function (req, res) {

  var form = new multiparty.Form({
    maxFieldsSize: 256, // 0.25 KiB
    maxFields: 10,
    maxFilesSize: 4194304, // 4.0 MiB
    autoFiles: true,
    autoFields: true
  });

  form.parse(req, function (err, fields, files) {
    fields = fields || {};
    fields.pub = (fields.pub = fields.pub || [])[0] === 'true' ? true : false;
    fields.limit = parseInt((fields.limit = fields.limit || [])[0], 10);
    fields.title = (fields.title = fields.title || [])[0];

    var model = {
      title: fields.title,
      pub: fields.pub,
      limit: fields.limit
    };

    Bikeshed
    .create(model)
    .complete(function (err, bikeshed) {
      console.log(err, 'is our complete error');
      console.log(bikeshed, 'is out complete bikeshed');
    });



    console.log('Err', err);
    console.log('Fields', fields);
    console.log('Files', files);

    res.json(200, 'Finished');
  });


  // var bikeshed = Bikeshed.build(req.body, ['title', 'pub', 'limit']);

  // if (!req.files.A || !req.files.B) {
  //   return res.json(400, 'File A and File B are both required.');
  // }

  // return Bikeshed.build(req.body, ['title', 'pub', 'limit'])
  //   .success(function (bikeshed) {
  //     return res.json(bikeshed);
  //   })
  //   .error(function (err) {
  //     return res.json(422, err);
  //   });

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

