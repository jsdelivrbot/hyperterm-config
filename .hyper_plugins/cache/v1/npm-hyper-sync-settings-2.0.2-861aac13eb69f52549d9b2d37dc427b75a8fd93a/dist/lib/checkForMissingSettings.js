'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

var _getGitConfig = require('./getGitConfig');

var _getGitConfig2 = _interopRequireDefault(_getGitConfig);

var _getCommands = require('./getCommands');

var _getCommands2 = _interopRequireDefault(_getCommands);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (open) {
  var config = (0, _getGitConfig2.default)();
  var personalAccessToken = config.personalAccessToken,
      gistId = config.gistId;

  var hyperConfig = _electron.app.config.getConfig().syncSettings || { quiet: false };

  if (personalAccessToken && gistId) {
    var commands = (0, _getCommands2.default)(config, open, hyperConfig);
    return { config: config, commands: commands };
  }

  var notify = function notify(message) {
    return open.notification(_constants.errorTitle, message, _constants.setupUrl);
  };

  if (!personalAccessToken && !gistId) {
    notify('Settings not found! Click for more info.');
    return false;
  }

  if (!personalAccessToken) notify('`personalAccessToken` not set! Click for more info.');
  if (!gistId) notify('`gistId` not set! Click for more info.');
  return false;
};
//# sourceMappingURL=checkForMissingSettings.js.map