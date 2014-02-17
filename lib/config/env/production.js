'use strict';

module.exports = {
  env: 'production',
  sequelize: {
    port: process.env.PGPORT || 5432
  },
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/fullstack'
  }
};
