'use strict';

var Q = require('q');
var _ = require('lodash');

var BaseDao = {

  getModelName: function () {
    return this.Model.modelName;
  },

  get: function (id) {
    var _this = this;
    var findDocById = Q.nbind(this.Model.findById, this.Model);

    return findDocById(id)
      .then(function (doc) {
        if (!doc) {
          throw new Error(_this.getModelName() + ' not found');
        }
        return doc;
      });
  },

  save: function (doc) {
    var saveDoc = Q.nbind(doc.save, doc);

    return saveDoc()
      .then(function (result /* [docSaved, numDocsAffected] */) {
        return result[0];
      });
  },

  create: function (data) {
    var doc = new this.Model(data);
    return this.save(doc);
  },

  getAndSave: function (id, data) {
    var _this = this;

    return this.get(id)
      .then(function (doc) {
        var updatedDocument = _.assign(doc, data);
        return _this.save(updatedDocument);
      });
  },

  find: function (filter, fields, options) {
    var findDocs = Q.nbind(this.Model.find, this.Model);
    return findDocs(filter, fields, options);
  },

  findOne: function (filter) {
    var findOneDoc = Q.nbind(this.Model.findOne, this.Model);
    return findOneDoc(filter);
  },

  remove: function (doc) {
    var removeDoc = Q.nbind(doc.remove, doc);
    return removeDoc();
  },

  getAndRemove: function (id) {
    var _this = this;

    return this.get(id)
      .then(function (doc) {
        return _this.remove(doc);
      });
  },

  count: function (filter, options) {
    var countDocs = Q.nbind(this.Model.count, this.Model);
    return countDocs(filter, null, options);
  },

  mapReduce: function (options) {
    var mapReducePromise = Q.nbind(this.Model.mapReduce, this.Model);
    return mapReducePromise(options);
  }

};

module.exports = BaseDao;
