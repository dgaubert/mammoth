var path = require('path');
var moment = require('moment');

// application setting
function init(app) {

  // rendering views helper 
  app.locals.moment = moment;

  // setup
  app.set('port', process.env.PORT);
  app.set('views', path.join(__dirname, '/../views'));
  app.set('view engine', 'jade');

  // development enviroment
  if (process.env.DEVELOPMENT) {
    app.configure('development', function () {
      app.enable('verbose errors');
    });
  }

}

module.exports.init = init;
