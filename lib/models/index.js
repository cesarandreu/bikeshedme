'use strict';
var fs        = require('fs'),
  path      = require('path'),
  Sequelize = require('sequelize'),
  lodash    = require('lodash'),
  sequelize = new Sequelize('cesarandreu', 'cesarandreu', null, {
    dialect: 'postgres',
    port: 5432
  }),
  db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);



// var sequelize = new Sequelize('cesarandreu', 'cesarandreu', undefined, {
//   port: 5432,
//   dialect: 'postgres'
// });

// sequelize.authenticate().complete(function (err) {
//   if (!!err) {
//     console.log('Unable to connect to database:', err);
//   } else {
//     console.log('Connected to database.');
//   }
// });
