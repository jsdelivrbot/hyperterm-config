'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _constants = require('../../constants');

var _updates = require('./updates');

var _updates2 = _interopRequireDefault(_updates);

var _restore = require('./restore');

var _restore2 = _interopRequireDefault(_restore);

var _backup = require('./backup');

var _backup2 = _interopRequireDefault(_backup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config, open, _ref) {
  var quiet = _ref.quiet;

  var catchError = function catchError(err) {
    open.notification(_constants.errorTitle, err);
    throw err;
  };

  var notify = function notify(emoji, message) {
    return open.notification(_constants.title + ' ' + emoji, message, config.url);
  };

  return {
    checkForUpdates: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var isUpdated;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _updates2.default)(config).catch(catchError);

              case 2:
                isUpdated = _context.sent;


                if (isUpdated) {
                  notify('❗️', 'Your settings need to be updated.');
                } else if (!quiet) {
                  notify('👍', 'Your settings are up to date.');
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function checkForUpdates() {
        return _ref2.apply(this, arguments);
      };
    }(),
    tryToBackup: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _backup2.default)(config).catch(catchError);

              case 2:
                notify('🔜', 'Your settings have been saved.');

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function tryToBackup() {
        return _ref3.apply(this, arguments);
      };
    }(),
    tryToRestore: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _restore2.default)(config).catch(catchError);

              case 2:
                notify('🔙', 'Your settings have been restored.');

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function tryToRestore() {
        return _ref4.apply(this, arguments);
      };
    }()
  };
};
//# sourceMappingURL=index.js.map