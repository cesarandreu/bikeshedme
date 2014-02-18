'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

  var Bikeshed = sequelize.define('Bikeshed', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Title must be between 1 and 255 characters long.'
        }
      }
    },
    pub: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        isBool: function (value) {
          if (typeof value !== 'boolean' && typeof value !== 'undefined') {
            throw new Error('Pub must be a boolean.');
          }
        }
      }
    },
    limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        max: {
          args: 30,
          msg: 'Maximum limit is 30 minutes.'
        },
        min: {
          args: 5,
          msg: 'Minimum limit is 5 minutes.'
        }
      }
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    A: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    B: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fileA: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    fileB: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  });

  return Bikeshed;

};


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
