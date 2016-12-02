'use strict';

var moduleName = 'app.nav';

require('angular').module(
  moduleName,
  []
)
.controller('userMenuCtrl', require('./userMenuCtrl'));

module.exports = moduleName;
