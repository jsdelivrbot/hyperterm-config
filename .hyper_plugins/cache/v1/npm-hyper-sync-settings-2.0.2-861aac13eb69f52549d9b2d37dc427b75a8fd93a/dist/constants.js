'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.possibleAccelerators = exports.paths = exports.setupUrl = exports.errorTitle = exports.title = exports.gistUrl = undefined;

var _os = require('os');

var _path = require('path');

var gistUrl = exports.gistUrl = function gistUrl(gistId, token) {
  return 'https://' + (token ? token + '@' : '') + 'gist.github.com/' + gistId + '.git';
};

var title = exports.title = 'hyper-sync-settings';
var errorTitle = exports.errorTitle = title + ' error \uD83D\uDD25';
var setupUrl = exports.setupUrl = 'https://github.com/dfrankland/hyper-sync-settings#setup';

var home = (0, _os.homedir)();
var repo = (0, _path.resolve)(home, './.hyper_plugins/.hyper-sync-settings');
var paths = exports.paths = {
  dirs: { home: home, repo: repo },
  files: {
    config: (0, _path.resolve)(home, './.hyper_plugins/.hyper-sync-settings.json'),
    configTemplate: (0, _path.resolve)(__dirname, './config.default.json'),
    backup: (0, _path.resolve)(repo, './.hyper.js'),
    restore: (0, _path.resolve)(home, './.hyper.js')
  }
};

var possibleAccelerators = exports.possibleAccelerators = ['checkForUpdates', 'backupSettings', 'restoreSettings', 'openGist', 'openRepo', 'openConfiguration'];
//# sourceMappingURL=constants.js.map