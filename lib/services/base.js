'use strict';

var BaseService = {

  list: function (filter, fields, options) {
    return this.dao.find(filter, fields, options);
  },

  create: function (data) {
    return this.dao.create(data);
  },

  update: function (id, data) {
    return this.dao.getAndSave(id, data);
  },

  retrieve: function (id) {
    return this.dao.get(id);
  },

  remove: function (id) {
    return this.dao.getAndRemove(id);
  }

};

module.exports = BaseService;
