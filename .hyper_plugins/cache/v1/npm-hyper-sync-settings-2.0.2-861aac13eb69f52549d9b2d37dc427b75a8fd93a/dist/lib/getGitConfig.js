'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

var _fs = require('./fs');

var _fs2 = _interopRequireDefault(_fs);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {};

var _process$env = process.env,
    HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN = _process$env.HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN,
    HYPER_SYNC_SETTINGS_GIST_ID = _process$env.HYPER_SYNC_SETTINGS_GIST_ID;


if (!HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN || !HYPER_SYNC_SETTINGS_GIST_ID) {
  try {
    config = require(_constants.paths.files.config); // eslint-disable-line import/no-dynamic-require, global-require, max-len
  } catch (err) {
    console.error( // eslint-disable-line no-console
    'hyper-sync-settings: error \uD83D\uDD25 no config file found in `' + _constants.paths.files.config + '`, creating one');
    _fs2.default.copySync(_constants.paths.files.configTemplate, _constants.paths.files.config);
  }
}

if (HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN) {
  config.personalAccessToken = HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN;
}

if (HYPER_SYNC_SETTINGS_GIST_ID) {
  config.gistId = HYPER_SYNC_SETTINGS_GIST_ID;
}

exports.default = function () {
  var _config = config,
      personalAccessToken = _config.personalAccessToken,
      gistId = _config.gistId;


  if (!personalAccessToken || !gistId) return config;

  var remoteUrl = (0, _constants.gistUrl)(gistId, personalAccessToken);

  var repoPromise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fs2.default.ensureDirAsync(_constants.paths.dirs.repo);

          case 2:
            return _context.abrupt('return', new _promise2.default(function (resolve) {
              (0, _simpleGit2.default)(_constants.paths.dirs.repo).clone(remoteUrl, _constants.paths.dirs.repo, function (error) {
                resolve();
                if (error) console.error(_constants.errorTitle + ' ' + error); // eslint-disable-line no-console
              });
            }));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();

  return (0, _extends3.default)({}, config, {
    url: (0, _constants.gistUrl)(gistId),
    remoteUrl: remoteUrl,
    repoPromise: repoPromise
  });
};
//# sourceMappingURL=getGitConfig.js.map