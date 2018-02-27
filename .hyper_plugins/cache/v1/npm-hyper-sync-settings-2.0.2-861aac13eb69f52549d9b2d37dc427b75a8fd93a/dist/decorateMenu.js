'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _electron = require('electron');

var _checkForMissingSettings = require('./lib/checkForMissingSettings');

var _checkForMissingSettings2 = _interopRequireDefault(_checkForMissingSettings);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (open) {
  var menu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var checkAndCallback = function checkAndCallback(callback) {
    return function () {
      var commandsAndConfig = (0, _checkForMissingSettings2.default)(open);
      if (commandsAndConfig === false) return;
      callback(commandsAndConfig);
    };
  };

  checkAndCallback(function (_ref) {
    var commands = _ref.commands;
    return commands.checkForUpdates();
  });

  var _ref2 = _electron.app.config.getConfig().syncSettings || {},
      _ref2$accelerators = _ref2.accelerators,
      syncSettingsAccelerators = _ref2$accelerators === undefined ? {} : _ref2$accelerators;

  var accelerators = _constants.possibleAccelerators.reduce(function (allAccelerators, nextKey) {
    var accelerator = syncSettingsAccelerators[nextKey];
    return (0, _extends4.default)({}, allAccelerators, (0, _defineProperty3.default)({}, nextKey, accelerator ? { accelerator: accelerator } : {}));
  }, {});

  return menu.map(function (item) {
    if (item.label !== 'Plugins') return item;
    return (0, _extends4.default)({}, item, {
      submenu: [].concat((0, _toConsumableArray3.default)(item.submenu), [{
        label: 'Sync Settings',
        type: 'submenu',
        submenu: [(0, _extends4.default)({
          label: 'Check for Updates',
          click: checkAndCallback(function (_ref3) {
            var commands = _ref3.commands;
            return commands.checkForUpdates();
          })
        }, accelerators.checkForUpdates), (0, _extends4.default)({
          label: 'Backup Settings',
          click: checkAndCallback(function (_ref4) {
            var commands = _ref4.commands;
            return commands.tryToBackup();
          })
        }, accelerators.backupSettings), (0, _extends4.default)({
          label: 'Restore Settings',
          click: checkAndCallback(function (_ref5) {
            var commands = _ref5.commands;
            return commands.tryToRestore();
          })
        }, accelerators.restoreSettings), {
          label: 'Open',
          type: 'submenu',
          submenu: [(0, _extends4.default)({
            label: 'Gist',
            click: checkAndCallback(function (_ref6) {
              var config = _ref6.config;
              return open.window(config ? config.url : _constants.gistUrl);
            })
          }, accelerators.openGist), (0, _extends4.default)({
            label: 'Repo',
            click: function click() {
              return open.item(_constants.paths.dirs.repo);
            }
          }, accelerators.openRepo), (0, _extends4.default)({
            label: 'Configuration',
            click: function click() {
              return open.item(_constants.paths.files.config);
            }
          }, accelerators.openConfiguration)]
        }]
      }])
    });
  });
};
//# sourceMappingURL=decorateMenu.js.map