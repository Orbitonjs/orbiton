'use strict';

var Orbiton = require('orbiton');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Orbiton__default = /*#__PURE__*/_interopDefaultLegacy(Orbiton);

function createFromJSX(tag, props) {
  if (typeof tag === 'string') {
    return Orbiton__default['default'].createElement(tag, props);
  }

  return Orbiton__default['default'].createComponent(tag, props);
}

const jsxRuntime = {
  jsx: createFromJSX,
  jsxs: createFromJSX
};

module.exports = jsxRuntime;
