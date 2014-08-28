/* jslint node: true */
'use strict';

function PictureController(PictureService) {

  // public

  function retrieve(name, callback) {
    PictureService.read(name, callback);
  }

  function create(name, path, slug, callback) {
    PictureService.save(name, path, slug, callback);
  }

  function remove(name, callback) {
    PictureService.remove(name, callback);
  }

  // expose

  return {
    'retrieve': retrieve,
    'create': create,
    'remove': remove
  };
}

module.exports = PictureController;
