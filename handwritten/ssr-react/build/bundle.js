/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _server = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _home = __webpack_require__(/*! ./src/home */ \"./src/home.js\");\n\nvar _home2 = _interopRequireDefault(_home);\n\nvar _reactRouterConfig = __webpack_require__(/*! react-router-config */ \"react-router-config\");\n\nvar _routers = __webpack_require__(/*! ./src/routers */ \"./src/routers.js\");\n\nvar _routers2 = _interopRequireDefault(_routers);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// 将路由配置对象转换为组件\n//引入renderToString方法\nconsole.log('router====', _routers2.default);\n// import Router from './src/router';\n//引入React以支持JSX的语法\n\nvar app = (0, _express2.default)();\n\n// 使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹\napp.use(_express2.default.static('public'));\n\n// const content = renderToString(<Home/>)\napp.get('/', function (req, res) {\n  var content = (0, _server.renderToString)(\n  // <StaticRouter location={req.path}>{renderRoutes(router)}</StaticRouter>\n  _react2.default.createElement(\n    _reactRouterDom.StaticRouter,\n    { location: req.path },\n    _routers2.default\n  ));\n  res.send('\\n  <html>\\n    <head>\\n        <title>SSR Demo</title>\\n    </head>\\n    <body>\\n        <div id=\"root\">\\n          ' + content + '\\n        </div>\\n    </body>\\n    <script src=\"/bundle.js\"></script>\\n  </html>\\n  ');\n});\n\napp.listen(3000, function () {\n  return console.log('Exampleapp listening on port 3000!');\n});\n\n//# sourceURL=webpack://ssr-react/./app.js?");

/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Home = function Home() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'div',\n      { onClick: function onClick() {\n          return alert('Home click');\n        } },\n      'Home, This is wbh\\'s ssr demo'\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: '/text' },\n      '\\u8DF3\\u8F6C\\u5230 text'\n    )\n  );\n};\nexports[\"default\"] = Home;\n\n//# sourceURL=webpack://ssr-react/./src/home.js?");

/***/ }),

/***/ "./src/routers.js":
/*!************************!*\
  !*** ./src/routers.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n\nvar _home = __webpack_require__(/*! ./home */ \"./src/home.js\");\n\nvar _home2 = _interopRequireDefault(_home);\n\nvar _text = __webpack_require__(/*! ./text */ \"./src/text.js\");\n\nvar _text2 = _interopRequireDefault(_text);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//引入路由\nexports[\"default\"] = _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _home2.default }),\n    _react2.default.createElement(_reactRouterDom.Route, { path: '/Text', exact: true, component: _text2.default })\n); //引入Home组件\n//引入React以支持JSX\n\n//# sourceURL=webpack://ssr-react/./src/routers.js?");

/***/ }),

/***/ "./src/text.js":
/*!*********************!*\
  !*** ./src/text.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Text = function Text() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'div',\n      { onClick: function onClick() {\n          return alert('Home click');\n        } },\n      'text, This is wbh\\'s ssr demo'\n    )\n  );\n};\nexports[\"default\"] = Text;\n\n//# sourceURL=webpack://ssr-react/./src/text.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("react-router-config");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;