/* jslint node: true */
'use strict';

function CaptchaController(CaptchaService) {

  // public

  function list(req, res, next) {
    CaptchaService.find(function done(err, files) {
      if (err) {
        return next(err);
      }

      res.render('blog/admin/captchas', {
        title: 'Administración de captchas',
        section:'blog',
        captchas: files
      });
    });
  }

  function show(req, res) {
    res.render('blog/admin/captcha', {
      title: 'Nuevo captcha',
      section:'blog',
      captcha: undefined
    });
  }

  function retrieve(req, res, next) {
    var name = req.params.captchaName;

    CaptchaService.read(name, function done(err, captcha) {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'image/png');
      res.send(new Buffer(captcha, 'binary'));
    });
  }

  function create(req, res, next) {
    var value = req.body.value;
    var path = req.files.captcha.path;

    CaptchaService.count(function done(err, count) {
      if (err) {
        return next(err);
      }

      var name = (count + 1) + '.png';

      CaptchaService.save(name, path, value, function done(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/blog/admin/captcha');
      });

    });
  }

  function remove(req, res, next) {
    var name = req.params.captchaName;

    CaptchaService.remove(name, function done(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/blog/admin/captcha');
    });
  }

  // expose

  return {
    'list': list,
    'show': show,
    'retrieve': retrieve,
    'create': create,
    'remove': remove
  };
}

module.exports = CaptchaController;
