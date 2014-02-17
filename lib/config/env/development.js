'use strict';

module.exports = {
  env: 'development',
  sequelize: {
    db: 'development',
    options: {
      port: 5432,
      dialect: 'postgres'
    }
  },
  mongo: {
    uri: 'mongodb://localhost/fullstack-dev'
  }
};
