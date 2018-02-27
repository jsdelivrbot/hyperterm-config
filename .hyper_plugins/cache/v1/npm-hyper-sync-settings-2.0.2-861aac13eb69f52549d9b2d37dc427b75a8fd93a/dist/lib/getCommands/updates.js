'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gitDateToISOString = function gitDateToISOString(gitDate) {
  return (0, _moment2.default)(gitDate, 'YYYY-MM-DD HH:mm:ss Z');
};

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var repoPromise = _ref2.repoPromise;
    var local, remote;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            local = {};
            remote = {};
            _context.next = 4;
            return repoPromise;

          case 4:
            _context.next = 6;
            return new _promise2.default(function (resolve) {
              return (0, _simpleGit2.default)(_constants.paths.dirs.repo).fetch().checkout('origin/master').log(['-n', '1', '--date=iso'], function (err, log) {
                remote.hash = log.latest.hash;
                remote.date = gitDateToISOString(log.latest.date);
              }).checkout('master').log(['-n', '1', '--date=iso'], function (err, log) {
                local.hash = log.latest.hash;
                local.date = gitDateToISOString(log.latest.date);
              }).then(resolve);
            });

          case 6:
            return _context.abrupt('return', (0, _moment2.default)(remote.date).isAfter(local.date) && local.hash !== remote.hash);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=updates.js.map