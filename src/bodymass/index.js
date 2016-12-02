'use strict';

var moduleName = 'app.main';

require('angular').module(
  moduleName,
  []
).controller('bodyMassCtrl', require('./bodyMassCtrl'));

module.exports = moduleName;
