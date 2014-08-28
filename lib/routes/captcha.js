/* jslint node: true */
'use strict';

function CaptchaRoute(CaptchaController) {

  // public

  function list(req, res, next) {
    CaptchaController.list(function listCaptchasDone(err, captchas) {
      if (err) {
        return next(err);
      }

      res.render('blog/admin/captchas', {
        title: 'Administración de captchas',
        section:'blog',
        captchas: captchas
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

    CaptchaController.retrieve(name, function retrieveCaptchaDone(err, captcha) {
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

    CaptchaController.create(value, path, function createCaptchaDone(err) {
      if (err) {
        return next(err);
      }

      res.redirect('/blog/admin/captcha');
    });

  }

  function remove(req, res, next) {
    var name = req.params.captchaName;

    CaptchaController.remove(name, function removeCaptchaDone(err) {
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

module.exports = CaptchaRoute;
