var nospam = require('../lib/utils/nospam');

describe('utils/nospam', function() {
    
  describe('.getRandom()', function () {
        
    it('Return a challenge object', function () {
      var challenge = nospam.getChallenge();

      challenge.should.have.property('id');
      challenge.should.have.property('options');
      challenge.options.should.be.an.instanceof(Array);

      var option = challenge[0];
      option.should.have.property('name');
      option.should.have.property('value');
      option.should.have.property('valid');
    });

  });

});
