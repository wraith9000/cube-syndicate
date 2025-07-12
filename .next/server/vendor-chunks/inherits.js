/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/inherits";
exports.ids = ["vendor-chunks/inherits"];
exports.modules = {

/***/ "(ssr)/./node_modules/inherits/inherits.js":
/*!*******************************************!*\
  !*** ./node_modules/inherits/inherits.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("try {\r\n  var util = __webpack_require__(/*! util */ \"util\");\r\n  /* istanbul ignore next */\r\n  if (typeof util.inherits !== 'function') throw '';\r\n  module.exports = util.inherits;\r\n} catch (e) {\r\n  /* istanbul ignore next */\r\n  module.exports = __webpack_require__(/*! ./inherits_browser.js */ \"(ssr)/./node_modules/inherits/inherits_browser.js\");\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHMuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRSxzSEFBaUQ7QUFDbkQiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYXZheDRcXE9uZURyaXZlXFxEb2N1bWVudHNcXEdpdEh1YlxcY3ViZS1zeW5kaWNhdGVcXG5vZGVfbW9kdWxlc1xcaW5oZXJpdHNcXGluaGVyaXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInRyeSB7XHJcbiAgdmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cclxuICBpZiAodHlwZW9mIHV0aWwuaW5oZXJpdHMgIT09ICdmdW5jdGlvbicpIHRocm93ICcnO1xyXG4gIG1vZHVsZS5leHBvcnRzID0gdXRpbC5pbmhlcml0cztcclxufSBjYXRjaCAoZSkge1xyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luaGVyaXRzX2Jyb3dzZXIuanMnKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/inherits/inherits.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

eval("if (typeof Object.create === 'function') {\r\n  // implementation from standard node.js 'util' module\r\n  module.exports = function inherits(ctor, superCtor) {\r\n    if (superCtor) {\r\n      ctor.super_ = superCtor\r\n      ctor.prototype = Object.create(superCtor.prototype, {\r\n        constructor: {\r\n          value: ctor,\r\n          enumerable: false,\r\n          writable: true,\r\n          configurable: true\r\n        }\r\n      })\r\n    }\r\n  };\r\n} else {\r\n  // old school shim for old browsers\r\n  module.exports = function inherits(ctor, superCtor) {\r\n    if (superCtor) {\r\n      ctor.super_ = superCtor\r\n      var TempCtor = function () {}\r\n      TempCtor.prototype = superCtor.prototype\r\n      ctor.prototype = new TempCtor()\r\n      ctor.prototype.constructor = ctor\r\n    }\r\n  }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGF2YXg0XFxPbmVEcml2ZVxcRG9jdW1lbnRzXFxHaXRIdWJcXGN1YmUtc3luZGljYXRlXFxub2RlX21vZHVsZXNcXGluaGVyaXRzXFxpbmhlcml0c19icm93c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcclxuICAgIGlmIChzdXBlckN0b3IpIHtcclxuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xyXG4gICAgICAgICAgdmFsdWU6IGN0b3IsXHJcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcbn0gZWxzZSB7XHJcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcclxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xyXG4gICAgaWYgKHN1cGVyQ3Rvcikge1xyXG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxyXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxyXG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXHJcbiAgICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcclxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/inherits/inherits_browser.js\n");

/***/ })

};
;