'use strict';

var moduleName = 'app.auth';

require('angular').module(
  moduleName,
  []
)
.controller('authCtrl', require('./authCtrl'));

module.exports = moduleName;
