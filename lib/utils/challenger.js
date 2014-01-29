/* jslint node: true */
'use strict';

// Anti spam utility
var challenger = {
  challenges: [{
    id: 1,
    options: [{
      name: 'Caballo',
      value: 'C',
      valid: false
    }, {
      name: 'Gato',
      value: 'true',
      valid: false
    }, {
      name: 'Cabra',
      value: '7',
      valid: false
    }, {
      name: 'Ballena',
      value: 'x',
      valid: true
    }, {
      name: 'Perro',
      value: '9',
      valid: false
    }]
  }, {
    id: 2,
    options: [{
      name: 'Sarten',
      value: 'd',
      valid: false
    }, {
      name: 'Martillo',
      value: '2',
      valid: true
    }, {
      name: 'Cuchillo',
      value: 'r',
      valid: false
    }, {
      name: 'Azucar',
      value: '+',
      valid: false
    }, {
      name: 'Vaso',
      value: '5',
      valid: false
    }]
  }, {
    id: 3,
    options: [{
      name: 'Cristal',
      value: '*',
      valid: true
    }, {
      name: 'Marron',
      value: '4',
      valid: false
    }, {
      name: 'Azul',
      value: 'true',
      valid: false
    }, {
      name: 'Verde',
      value: '2',
      valid: false
    }, {
      name: 'Negro',
      value: 'Z',
      valid: false
    }]
  }, {
    id: 4,
    options: [{
      name: 'Metro',
      value: 'true',
      valid: false
    }, {
      name: 'Segundo',
      value: '1',
      valid: false
    }, {
      name: 'Coche',
      value: 't',
      valid: true
    }, {
      name: 'Kilogramo',
      value: '7',
      valid: false
    }, {
      name: 'Voltio',
      value: 'g',
      valid: false
    }]
  }, {
    id: 5,
    options: [{
      name: 'Baloncesto',
      value: 'a',
      valid: false
    }, {
      name: 'Tenis',
      value: '2',
      valid: false
    }, {
      name: 'Waterpolo',
      value: 'H',
      valid: false
    }, {
      name: 'Golf',
      value: '6',
      valid: false
    }, {
      name: 'Boxeo',
      value: 'false',
      valid: true
    }]
  }],

  //
  getChallenge: function getChallenge() {
    var i = Math.floor(Math.random() * (this.challenges.length));
    return this.challenges[i];
  },

  //
  getChallenges: function getChallenges() {
    return this.challenges;
  },

  //
  isHuman: function isHuman(answer) {
    var valid = false;

    for (var i = 0; i < this.challenges.length; i++) {
      if (this.challenges[i].id == answer.id) {
        for (var j = 0; j < this.challenges[i].options.length; j++) {
          if (this.challenges[i].options[j].value === answer.option.value &&
              this.challenges[i].options[j].valid) {
            valid = true;
          }
        }
      }
    }

    return valid;
  }
};

module.exports = challenger;
