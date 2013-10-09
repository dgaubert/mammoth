var support = require('./support'),
    sinon = require('sinon'),
    Cloud = require('../lib/routes/cloud');

describe('routes/cloud', function () {
  var SummaryModel = support.SummaryModel,
      SummaryModelKO = support.SummaryModelKO,
      cloud = new Cloud(SummaryModel),
      cloudKO = new Cloud(SummaryModelKO),
      req = support.req,
      res = support.res,
      next = support.next;

  describe('.getWords(req, res, next)', function () {

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
      next = sinon.spy();

      cloudKO.getWords(req, res, next);

      SummaryModelMock.verify();
      next.called.should.be.false;
      next.reset();
    });

  });

});
