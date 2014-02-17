'use strict';

var index = require('./controllers'),
    bikeshed = require('./controllers/bikeshed');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  // Upload 2 images and set it private or public
  // it has a time limit
  app.post('/api/bikeshed', bikeshed.create);
  app.get('/api/bikeshed', bikeshed.index);
  app.get('/api/bikeshed/:id', bikeshed.show);
  app.post('/api/bikeshed/:id', bikeshed.vote);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};
