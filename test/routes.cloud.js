var sinon = require('sinon'),
    Cloud = require('../lib/routes/cloud');

describe('routes/cloud', function () {
  var SummaryModel = {
        categoriesCount: function (callback) {
          callback(null, [{_id: 'category1', value: 1}]);
        },
        tagsCount: function (callback) {
          callback(null, [{_id: 'tag1', value: 1}]);
        }
      },
      SummaryModelKO = {
        categoriesCount: function (callback) {
          callback('error', null);
        },
        tagsCount: function (callback) {
          callback('error', null);
        }
      },
      cloud = new Cloud(SummaryModel),
      cloudKO = new Cloud(SummaryModelKO);

  describe('.getWords(req, res, next)', function () {
    var req = {},
        res = {
          writeHead: function () {},
          end: function () {}
        },
        next = function () {};

    it('Tag and categories should be gotten', function () {
      var SummaryModelMock = sinon.mock(SummaryModel);
      SummaryModelMock.expects('categoriesCount').once();
      SummaryModelMock.expects('tagsCount').once();

      cloud.getWords(req, res, next);

      SummaryModelMock.verify();
    });

    it('No categories found', function () {
      var SummaryModelMock = sinon.mock(SummaryModelKO);
      SummaryModelMock.expects('categoriesCount').once();
      SummaryModelMock.expects('tagsCount').once();
      var nextSpy = sinon.spy();

      cloudKO.getWords(req, res, nextSpy);

      SummaryModelMock.verify();
      nextSpy.called.should.be.false;
    });

  });

});
