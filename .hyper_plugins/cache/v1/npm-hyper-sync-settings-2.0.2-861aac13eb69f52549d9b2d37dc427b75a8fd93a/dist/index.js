'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateMenu = exports.onWindow = undefined;

var _getOpen = require('./lib/getOpen');

var _getOpen2 = _interopRequireDefault(_getOpen);

var _decorateMenu = require('./decorateMenu');

var _decorateMenu2 = _interopRequireDefault(_decorateMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var open = void 0;
var onWindow = exports.onWindow = function onWindow(win) {
  open = (0, _getOpen2.default)(win);
};

var decorateMenu = exports.decorateMenu = function decorateMenu(menu) {
  return (0, _decorateMenu2.default)(open, menu);
};
//# sourceMappingURL=index.js.map