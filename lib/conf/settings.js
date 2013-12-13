var path = require('path'),
    moment = require('moment');

module.exports.init = function (app, express) {

  // rendering views helper 
  app.locals.moment = moment;

  // setup
  app.set('port', process.env.PORT);
  app.set('views', path.join(__dirname, '/../views'));
  app.set('view engine', 'jade');

  // development enviroment
  app.configure('development', function () {
    app.enable('verbose errors');
  });

};