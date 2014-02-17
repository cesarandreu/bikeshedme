'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.use(express.errorHandler());
    app.set('views', config.root + '/app/views');
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  });

  app.configure(function(){
    app.set('view engine', 'jade');
    app.use(express.cookieParser('secret'));
    app.use(express.cookieSession());
    app.use(function (req, res, next) {
      req.session.votes = req.session.votes || {};
      next();
    });
    // app.use(express.csrf());
    // app.use(function (req, res, next) {
    //   res.cookie('XSRF-TOKEN', req.csrfToken());
    //   next();
    // });
    app.use(express.logger('dev'));
    app.use(express.bodyParser({keepExtensions: true}));
    app.use(express.methodOverride());
    // Router needs to be last
    app.use(app.router);
  });
};
