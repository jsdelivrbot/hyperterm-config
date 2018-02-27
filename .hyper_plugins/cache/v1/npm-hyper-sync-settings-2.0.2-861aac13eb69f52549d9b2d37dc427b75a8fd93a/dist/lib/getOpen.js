'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var webContents = _ref.webContents;

  var runJs = function runJs(js, run) {
    var wrappedJs = '\n      () => {\n        ' + js + '\n      }\n    ';
    if (!run) return wrappedJs;
    wrappedJs = '(' + wrappedJs + ')()';
    webContents.executeJavaScript(wrappedJs);
    return undefined;
  };

  var open = function open(run) {
    return {
      window: function window(url) {
        return runJs('\n      const { shell } = require(\'electron\');\n      shell.openExternal(\'' + url + '\');\n    ', run);
      },
      notification: function notification(title, body, url) {
        return runJs('\n      const notification = new Notification(\n        \'' + (title || '') + '\',\n        {\n          body: \'' + (body || '') + '\',\n        }\n      );\n      ' + (url && 'notification.onclick = ' + open(false).window(url)) + '\n    ', run);
      },
      item: function item(path) {
        return runJs('\n      const { shell } = require(\'electron\');\n      shell.openItem(\'' + path + '\');\n    ', run);
      }
    };
  };

  return open(true);
};
//# sourceMappingURL=getOpen.js.map