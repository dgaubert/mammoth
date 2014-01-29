/* jslint node:true */
/* global describe: true, it:true*/
'use strict';

var challenger = require('../lib/utils/challenger');

describe('utils/challenger', function() {
    
  describe('.getChallenge()', function () {
        
    it('Return a challenge object', function () {
      var challenge = challenger.getChallenge();

      challenge.should.have.property('id');
      challenge.should.have.property('options');
      challenge.options.should.be.an.instanceof(Array);

      var option = challenge.options[0];
      option.should.have.property('name');
      option.should.have.property('value');
      option.should.have.property('valid');
    });

  });

});
