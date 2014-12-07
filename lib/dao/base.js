'use strict';

var Q = require('q');
var _ = require('lodash');

var BaseDao = {

  'getModelName': function () {
    return this.Model.modelName;
  },

  'get': function get(id) {
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

  'save': function save(doc) {
    var saveDoc = Q.nbind(doc.save, doc);

    return saveDoc()
      .then(function (result /* [docSaved, numDocsAffected] */) {
        return result[0];
      });
  },

  'create': function create(data) {
    var doc = new this.Model(data);
    return this.save(doc);
  },

  'getAndSave': function getAndSave(id, data) {
    var _this = this;

    return this.get(id)
      .then(function (doc) {
        var updatedDocument = _.assign(doc, data);
        return _this.save(updatedDocument);
      });
  },

  'find': function find(filter) {
    var findDocs = Q.nbind(this.Model.find, this.Model);
    return findDocs(filter);
  },

  'findOne': function findOne(filter) {
    var findOneDoc = Q.nbind(this.Model.findOne, this.Model);
    return findOneDoc(filter);
  },

  'remove': function remove(doc) {
    var removeDoc = Q.nbind(doc.remove, doc);
    return removeDoc();
  },

  'getAndRemove': function getAndRemove(id) {
    var _this = this;

    return this.get(id)
      .then(function (doc) {
        return _this.remove(doc);
      });
  }

};

module.exports = BaseDao;
