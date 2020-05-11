/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({"about":"about"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/getusermedia.js":
/*!******************************!*\
  !*** ../src/getusermedia.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n\n// getUserMedia helper by @HenrikJoreteg used for navigator.getUserMedia shim\nmodule.exports = function (constraints, cb) {\n  var error;\n  var haveOpts = arguments.length === 2;\n  var defaultOpts = {\n    video: true,\n    audio: true\n  };\n  var denied = 'PermissionDeniedError';\n  var altDenied = 'PERMISSION_DENIED';\n  var notSatisfied = 'ConstraintNotSatisfiedError'; // make constraints optional\n\n  if (!haveOpts) {\n    cb = constraints;\n    constraints = defaultOpts;\n  } // normalize error handling when no media types are requested\n\n\n  if (!constraints.video) {\n    error = new Error('MediaStreamError');\n    error.name = 'NoMediaRequestedError'; // keep all callbacks async\n\n    return setTimeout(function () {\n      cb(error);\n    }, 0);\n  }\n\n  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {\n    cb(null, stream);\n  }).catch(function (err) {\n    var error; // coerce into an error object since FF gives us a string\n    // there are only two valid names according to the spec\n    // we coerce all non-denied to \"constraint not satisfied\".\n\n    if (typeof err === 'string') {\n      error = new Error('MediaStreamError');\n\n      if (err === denied || err === altDenied) {\n        error.name = denied;\n      } else {\n        error.name = notSatisfied;\n      }\n    } else {\n      // if we get an error object make sure '.name' property is set\n      // according to spec: http://dev.w3.org/2011/webrtc/editor/getusermedia.html#navigatorusermediaerror-and-navigatorusermediaerrorcallback\n      error = err;\n\n      if (!error.name) {\n        // this is likely chrome which\n        // sets a property called \"ERROR_DENIED\" on the error object\n        // if so we make sure to set a name\n        if (error[denied]) {\n          err.name = denied;\n        } else {\n          err.name = notSatisfied;\n        }\n      }\n    }\n\n    cb(error);\n  });\n};\n\n//# sourceURL=webpack:///../src/getusermedia.js?");

/***/ }),

/***/ "../src/identiface.vue":
/*!*****************************!*\
  !*** ../src/identiface.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _identiface_vue_vue_type_template_id_2f92c022_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identiface.vue?vue&type=template&id=2f92c022&scoped=true& */ \"../src/identiface.vue?vue&type=template&id=2f92c022&scoped=true&\");\n/* harmony import */ var _identiface_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identiface.vue?vue&type=script&lang=js& */ \"../src/identiface.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css& */ \"../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css&\");\n/* harmony import */ var _demo_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../demo/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_demo_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _identiface_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _identiface_vue_vue_type_template_id_2f92c022_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _identiface_vue_vue_type_template_id_2f92c022_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2f92c022\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/identiface.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///../src/identiface.vue?");

/***/ }),

/***/ "../src/identiface.vue?vue&type=script&lang=js&":
/*!******************************************************!*\
  !*** ../src/identiface.vue?vue&type=script&lang=js& ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo_node_modules_cache_loader_dist_cjs_js_ref_12_0_demo_node_modules_babel_loader_lib_index_js_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../demo/node_modules/cache-loader/dist/cjs.js??ref--12-0!../demo/node_modules/babel-loader/lib!../demo/node_modules/cache-loader/dist/cjs.js??ref--0-0!../demo/node_modules/vue-loader/lib??vue-loader-options!./identiface.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_demo_node_modules_cache_loader_dist_cjs_js_ref_12_0_demo_node_modules_babel_loader_lib_index_js_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///../src/identiface.vue?");

/***/ }),

/***/ "../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css&":
/*!**************************************************************************************!*\
  !*** ../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_demo_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_demo_node_modules_vue_loader_lib_loaders_stylePostLoader_js_demo_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../demo/node_modules/vue-style-loader??ref--6-oneOf-1-0!../demo/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../demo/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../demo/node_modules/postcss-loader/src??ref--6-oneOf-1-2!../demo/node_modules/cache-loader/dist/cjs.js??ref--0-0!../demo/node_modules/vue-loader/lib??vue-loader-options!./identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css&\");\n/* harmony import */ var _demo_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_demo_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_demo_node_modules_vue_loader_lib_loaders_stylePostLoader_js_demo_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_demo_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_demo_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_demo_node_modules_vue_loader_lib_loaders_stylePostLoader_js_demo_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _demo_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_demo_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_demo_node_modules_vue_loader_lib_loaders_stylePostLoader_js_demo_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _demo_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_demo_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_demo_node_modules_vue_loader_lib_loaders_stylePostLoader_js_demo_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_demo_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_demo_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_demo_node_modules_vue_loader_lib_loaders_stylePostLoader_js_demo_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_2f92c022_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///../src/identiface.vue?");

/***/ }),

/***/ "../src/identiface.vue?vue&type=template&id=2f92c022&scoped=true&":
/*!************************************************************************!*\
  !*** ../src/identiface.vue?vue&type=template&id=2f92c022&scoped=true& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo_node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_demo_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_template_id_2f92c022_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../demo/node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!../demo/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../demo/node_modules/cache-loader/dist/cjs.js??ref--0-0!../demo/node_modules/vue-loader/lib??vue-loader-options!./identiface.vue?vue&type=template&id=2f92c022&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"b9946af2-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=template&id=2f92c022&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _demo_node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_demo_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_template_id_2f92c022_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _demo_node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_demo_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_demo_node_modules_cache_loader_dist_cjs_js_ref_0_0_demo_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_template_id_2f92c022_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///../src/identiface.vue?");

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! exports provided: default, WebCam, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"version\", function() { return version; });\n/* harmony import */ var _identiface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identiface */ \"../src/identiface.vue\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WebCam\", function() { return _identiface__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\nfunction plugin(Vue) {\n  Vue.component(\"vue-web-cam\", _identiface__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n} // Install by default if using the script tag\n\n\nif (typeof window !== \"undefined\" && window.Vue) {\n  window.Vue.use(plugin);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (plugin);\nvar version = \"__VERSION__\"; // Export all components too\n\n\n\n//# sourceURL=webpack:///../src/index.js?");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!../src/identiface.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ \"./node_modules/core-js/modules/es.function.name.js\");\n/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptors.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _getusermedia__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./getusermedia */ \"../src/getusermedia.js\");\n/* harmony import */ var _getusermedia__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_getusermedia__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var canvas_to_blob__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! canvas-to-blob */ \"../node_modules/canvas-to-blob/index.js\");\n/* harmony import */ var canvas_to_blob__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(canvas_to_blob__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var opencv_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! opencv.js */ \"../node_modules/opencv.js/opencv.js\");\n/* harmony import */ var opencv_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(opencv_js__WEBPACK_IMPORTED_MODULE_17__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_13__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"identiface\",\n  props: {\n    awsUrl: {\n      type: String,\n      required: true\n    },\n    awsConfig: {\n      type: Object,\n      required: true\n    },\n    width: {\n      type: [Number, String],\n      default: \"100%\"\n    },\n    height: {\n      type: [Number, String],\n      default: 500\n    },\n    autoplay: {\n      type: Boolean,\n      default: true\n    },\n    screenshotFormat: {\n      type: String,\n      default: \"image/jpeg\"\n    },\n    deviceId: {\n      type: String,\n      default: null\n    },\n    isFrontCam: {\n      type: Boolean,\n      default: true\n    },\n    resolution: {\n      type: Object,\n      default: null,\n      validator: function validator(value) {\n        return value.height && value.width;\n      }\n    }\n  },\n  data: function data() {\n    return {\n      source: null,\n      notSupported: false,\n      canvas: null,\n      errorMessage: '',\n      camerasListEmitted: false,\n      cameras: [],\n      camsList: {\n        back: null,\n        front: null\n      },\n      //detection\n      frame: undefined,\n      cap: undefined,\n      inProcess: false,\n      //meanshift Setup\n      trackWindow: undefined,\n      roi: undefined,\n      hsvRoi: undefined,\n      mask: undefined,\n      lowScalar: undefined,\n      highScalar: undefined,\n      low: undefined,\n      high: undefined,\n      roiHist: undefined,\n      hsvRoiVec: undefined,\n      termCrit: undefined,\n      hsv: undefined,\n      dst: undefined,\n      hsvVec: undefined,\n      startX: undefined,\n      startY: undefined,\n      moveX: undefined,\n      moveY: undefined,\n      tracking: false,\n      drawing: false\n    };\n  },\n  watch: {\n    deviceId: function deviceId(id) {\n      if (!this.notSupported) {\n        this.changeCamera(id);\n      }\n    },\n    isFrontCam: function isFrontCam(newValue, oldValue) {\n      if (newValue !== oldValue) {\n        this.changeFrontBack(newValue);\n      }\n    }\n  },\n  computed: {\n    supportFacingMode: function supportFacingMode() {\n      var result = '';\n\n      if (navigator.mediaDevices.getSupportedConstraints()[\"facingMode\"]) {\n        result = \"Supported!\";\n      } else {\n        result = \"Not supported!\";\n      }\n\n      return result;\n    },\n    Constrains: function Constrains() {\n      var facingMode = this.isFrontCam ? 'user' : 'environment';\n\n      var video = _objectSpread({}, this.deviceId ? {\n        deviceId: {\n          exact: this.deviceId\n        }\n      } : {}, {\n        facingMode: facingMode\n      });\n\n      return {\n        video: video\n      };\n    }\n  },\n  mounted: function mounted() {\n    this.setupMedia();\n  },\n  methods: {\n    down: function down(evt) {\n      var canvasPos = this.$refs.canvas.getBoundingClientRect();\n\n      try {\n        this.startX = Math.round(evt.touches[0].clientX - canvasPos.left);\n        this.startY = Math.round(evt.touches[0].clientY - canvasPos.top);\n      } catch (_unused) {\n        this.startX = Math.round(evt.clientX - canvasPos.left);\n        this.startY = Math.round(evt.clientY - canvasPos.top);\n      }\n\n      this.moveX = this.startX;\n      this.moveY = this.startY;\n      this.drawing = true;\n      this.tracking = false;\n      this.inProcess = false;\n    },\n    up: function up(evt) {\n      this.drawing = false;\n      this.tracking = true;\n    },\n    move: function move(evt) {\n      var canvasPos = this.$refs.canvas.getBoundingClientRect();\n\n      if (this.drawing == true) {\n        try {\n          this.moveX = Math.round(evt.touches[0].clientX - canvasPos.left);\n          this.moveY = Math.round(evt.touches[0].clientY - canvasPos.top);\n        } catch (_unused2) {\n          this.moveX = Math.round(evt.clientX - canvasPos.left);\n          this.moveY = Math.round(evt.clientY - canvasPos.top);\n        }\n      }\n    },\n\n    /**\n     * setup media\n     */\n    validateFile: function validateFile(event) {\n      var _this = this;\n\n      this.errorMessage = '';\n      var exFile = event.target.files[0].type;\n\n      if (exFile === 'image/jpeg') {\n        //console.log(event.target.files[0]);\n        var reader = new FileReader();\n        reader.readAsDataURL(event.target.files[0]);\n\n        reader.onload = function () {\n          _this.$emit(\"preview\", reader.result);\n        };\n\n        this.uploadImage(event.target.files[0]);\n      } else {\n        this.errorMessage = 'Only jpg/jpeg and png files are allowed!';\n      }\n    },\n    setupMedia: function setupMedia() {\n      this.loadCameras();\n    },\n\n    /**\n     * load available cameras\n     */\n    loadCameras: function loadCameras() {\n      var _this2 = this;\n\n      return Object(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee() {\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                try {\n                  navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {\n                    for (var i = 0; i !== deviceInfos.length; ++i) {\n                      var deviceInfo = deviceInfos[i];\n\n                      if (deviceInfo.kind === \"videoinput\") {\n                        _this2.cameras.push(deviceInfo);\n\n                        if (deviceInfo.label.toLowerCase().indexOf('back') !== -1) {\n                          _this2.camsList.back = deviceInfo;\n                        }\n\n                        if (deviceInfo.label.toLowerCase().indexOf('front') !== -1) {\n                          _this2.camsList.front = deviceInfo;\n                        }\n                      }\n                    }\n                  }).then(function () {\n                    if (!_this2.camerasListEmitted) {\n                      _this2.$emit(\"cameras\", _this2.cameras);\n\n                      _this2.camerasListEmitted = true;\n                    }\n                  }).catch(function (error) {\n                    _this2.notSupported = true;\n\n                    _this2.$emit(\"notsupported\", error);\n                  });\n                } catch (err) {\n                  _this2.notSupported = true;\n\n                  _this2.$emit('notsupported', err);\n                }\n\n              case 1:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }))();\n    },\n\n    /**\n     * change to a different camera stream, like front and back camera on phones\n     */\n    changeCamera: function changeCamera(deviceId) {\n      this.stop();\n      this.$emit(\"camera-change\", deviceId);\n      this.deviceId = deviceId;\n      this.loadCamera();\n    },\n\n    /**\n     * load the stream to the\n     */\n    loadSrcStream: function loadSrcStream(stream) {\n      var _this3 = this;\n\n      if (\"srcObject\" in this.$refs.video) {\n        // new browsers api\n        this.$refs.video.srcObject = stream;\n      } else {\n        // old broswers\n        this.source = window.HTMLMediaElement.srcObject(stream);\n      } // Emit video start/live event\n\n\n      this.$refs.video.onloadedmetadata = function () {\n        _this3.$emit(\"video-live\", stream); //prevent Opencv.js error.\n\n\n        _this3.$refs.video.width = 888;\n        _this3.$refs.video.height = 500;\n        setTimeout(_this3.setupCV, 0);\n      };\n\n      this.$emit(\"started\", stream);\n    },\n\n    /**\n     * Detection\n     */\n    setupCV: function setupCV() {\n      var _this4 = this;\n\n      return Object(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee2() {\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                if (!(_this4.frame == undefined)) {\n                  _context2.next = 8;\n                  break;\n                }\n\n                _context2.next = 3;\n                return new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"VideoCapture\"](_this4.$refs.video);\n\n              case 3:\n                _this4.cap = _context2.sent;\n                _context2.next = 6;\n                return new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"](500, 888, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"CV_8UC4\"]);\n\n              case 6:\n                _this4.frame = _context2.sent;\n                console.log(\"cv setup complete.\");\n\n              case 8:\n                setTimeout(_this4.process, 0);\n\n              case 9:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2);\n      }))();\n    },\n    process: function process() {\n      this.cap.read(this.frame);\n\n      if (this.drawing === true) {\n        opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"rectangle\"](this.frame, new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Point\"](this.startX, this.startY), new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Point\"](this.moveX, this.moveY), new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Scalar\"](255, 0, 0, 255), 2);\n      }\n\n      if (this.tracking === true) {\n        try {\n          this.meanShift();\n        } catch (_unused3) {\n          console.log(\"Error on meanshift.\");\n        }\n      }\n\n      opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"imshow\"](this.$refs.canvas, this.frame);\n      setTimeout(this.process, 33);\n    },\n    meanShift: function meanShift() {\n      if (this.inProcess === false) {\n        console.log('Setup meanshift.');\n        this.inProcess = true;\n        var p1 = Math.min(this.startX, this.moveX);\n        var p2 = Math.min(this.startY, this.moveY);\n        var p3 = Math.max(this.startX, this.moveX) - p1;\n        var p4 = Math.max(this.startY, this.moveY) - p2;\n        this.trackWindow = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Rect\"](p1, p2, p3, p4);\n        this.roi = this.frame.roi(this.trackWindow);\n        this.hsvRoi = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"]();\n        opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"cvtColor\"](this.roi, this.hsvRoi, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"COLOR_RGBA2RGB\"]);\n        opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"cvtColor\"](this.hsvRoi, this.hsvRoi, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"COLOR_RGB2HSV\"]);\n        this.mask = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"]();\n        this.lowScalar = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Scalar\"](30, 30, 0);\n        this.highScalar = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Scalar\"](180, 180, 180);\n        this.low = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"](this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.lowScalar); //\n\n        this.high = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"](this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.highScalar); //\n\n        opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"inRange\"](this.hsvRoi, this.low, this.high, this.mask);\n        this.roiHist = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"]();\n        this.hsvRoiVec = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"MatVector\"]();\n        this.hsvRoiVec.push_back(this.hsvRoi);\n        opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"calcHist\"](this.hsvRoiVec, [0], this.mask, this.roiHist, [180], [0, 180]);\n        opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"normalize\"](this.roiHist, this.roiHist, 0, 255, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"NORM_MINMAX\"]);\n        this.roi.delete();\n        this.hsvRoi.delete();\n        this.mask.delete();\n        this.low.delete();\n        this.high.delete();\n        this.hsvRoiVec.delete();\n        this.termCrit = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"TermCriteria\"](opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"TERM_CRITERIA_EPS\"] | opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"TERM_CRITERIA_COUNT\"], 10, 1);\n        this.hsv = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"](500, 888, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"CV_8UC3\"]);\n        this.dst = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Mat\"]();\n        this.hsvVec = new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"MatVector\"]();\n        this.hsvVec.push_back(this.hsv);\n      }\n\n      this.cap.read(this.frame);\n      opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"cvtColor\"](this.frame, this.hsv, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"COLOR_RGBA2RGB\"]);\n      opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"cvtColor\"](this.hsv, this.hsv, opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"COLOR_RGB2HSV\"]);\n      opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"calcBackProject\"](this.hsvVec, [0], this.roiHist, this.dst, [0, 180], 1);\n\n      var _cv$meanShift = opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"meanShift\"](this.dst, this.trackWindow, this.termCrit);\n\n      var _cv$meanShift2 = Object(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__[\"default\"])(_cv$meanShift, 2);\n\n      this.trackWindow = _cv$meanShift2[1];\n      var _ref = [this.trackWindow.x, this.trackWindow.y, this.trackWindow.width, this.trackWindow.height],\n          x = _ref[0],\n          y = _ref[1],\n          w = _ref[2],\n          h = _ref[3];\n      opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"rectangle\"](this.frame, new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Point\"](x, y), new opencv_js__WEBPACK_IMPORTED_MODULE_17__[\"Point\"](x + w, y + h), [255, 0, 0, 255], 2);\n    },\n\n    /**\n     * stop the selected streamed video to change camera\n     */\n    stopStreamedVideo: function stopStreamedVideo(videoElem) {\n      var _this5 = this;\n\n      var stream = videoElem.srcObject;\n      var tracks = stream.getTracks();\n      tracks.forEach(function (track) {\n        // stops the video track\n        track.stop();\n\n        _this5.$emit(\"stopped\", stream);\n\n        _this5.$refs.video.srcObject = null;\n        _this5.source = null;\n      });\n    },\n    // stop the video   \n    stop: function stop() {\n      if (this.$refs.video !== null && this.$refs.video.srcObject) {\n        this.stopStreamedVideo(this.$refs.video);\n      }\n    },\n    // start the video\n    start: function start() {\n      this.loadCamera();\n    },\n    // pause the video\n    pause: function pause() {\n      if (this.$refs.video !== null && this.$refs.video.srcObject) {\n        this.$refs.video.pause();\n      }\n    },\n    // resume the video\n    resume: function resume() {\n      if (this.$refs.video !== null && this.$refs.video.srcObject) {\n        this.$refs.video.play();\n      }\n    },\n    changeFrontBack: function changeFrontBack(newFrontCam) {\n      if (newFrontCam && this.camsList.front) {\n        this.changeCamera(this.camsList.front.deviceId);\n      }\n\n      if (!newFrontCam && this.camsList.back) {\n        this.changeCamera(this.camsList.back.deviceId);\n      }\n    },\n\n    /**\n     * load the camera passed as index!\n     */\n    loadCamera: function loadCamera() {\n      var _this6 = this;\n\n      _getusermedia__WEBPACK_IMPORTED_MODULE_15___default()(this.Constrains, function (err, stream) {\n        if (err !== null) {\n          if (err.name === 'NotAllowedError') {\n            _this6.errorMessage = 'please  reload the page and accept the permissions for camera use';\n\n            _this6.$emit('error', err);\n          } else {\n            _this6.notSupported = true;\n\n            _this6.$emit('error', err);\n          }\n\n          return;\n        }\n\n        if (window.ImageCapture) {\n          var mediaStreamTrack = stream.getVideoTracks()[0];\n          _this6.imageCapture = new ImageCapture(mediaStreamTrack);\n        }\n\n        _this6.video = _this6.$refs.video;\n\n        _this6.loadSrcStream(stream);\n      });\n    },\n\n    /**\n     * capture screenshot\n     */\n    capture: function capture() {\n      this.$emit(\"preview\", this.getCanvas().toDataURL(this.screenshotFormat));\n      this.uploadImage(canvas_to_blob__WEBPACK_IMPORTED_MODULE_16___default()(this.getCanvas().toDataURL(this.screenshotFormat)));\n    },\n    uploadImage: function uploadImage(image) {\n      var _this7 = this;\n\n      return Object(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee3() {\n        var res, credentials, url, imageUrl, data;\n        return regeneratorRuntime.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                _context3.next = 2;\n                return axios__WEBPACK_IMPORTED_MODULE_14___default.a.post(_this7.awsUrl, _this7.awsConfig);\n\n              case 2:\n                res = _context3.sent;\n                credentials = res.data.data.fields;\n                url = res.data.data.url;\n                imageUrl = res.data.url;\n                data = new FormData();\n                Object.keys(credentials).forEach(function (key) {\n                  return data.append(key, credentials[key]);\n                });\n                data.append('file', image);\n                _context3.next = 11;\n                return axios__WEBPACK_IMPORTED_MODULE_14___default()({\n                  method: 'post',\n                  url: url,\n                  data: data,\n                  headers: {\n                    'Content-Type': 'multipart/form-data'\n                  },\n                  onUploadProgress: function onUploadProgress(progressEvent) {\n                    var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);\n\n                    _this7.$emit(\"progress\", percentCompleted);\n                  }\n                });\n\n              case 11:\n                _this7.$emit(\"image-ready\", imageUrl);\n\n              case 12:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3);\n      }))();\n    },\n\n    /**\n     * get canvas\n     */\n    getCanvas: function getCanvas() {\n      var video = this.$refs.video;\n\n      if (!this.ctx) {\n        var _canvas = document.createElement(\"canvas\");\n\n        _canvas.height = video.videoHeight;\n        _canvas.width = video.videoWidth;\n        this.canvas = _canvas;\n        this.ctx = _canvas.getContext(\"2d\");\n      }\n\n      var ctx = this.ctx,\n          canvas = this.canvas;\n      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);\n      return canvas;\n    }\n  }\n});\n\n//# sourceURL=webpack:///../src/identiface.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/example.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ \"./node_modules/core-js/modules/es.array.find.js\");\n/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../src */ \"../src/index.js\");\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'example',\n  props: {\n    msg: String\n  },\n  components: {\n    WebCam: _src__WEBPACK_IMPORTED_MODULE_1__[\"WebCam\"]\n  },\n  data: function data() {\n    return {\n      error: '',\n      notSupport: false,\n      initCamera: false,\n      img: null,\n      camera: null,\n      frontCamera: true,\n      deviceId: null,\n      devices: []\n    };\n  },\n  mounted: function mounted() {\n    this.initCamera = true;\n  },\n  computed: {\n    device: function device() {\n      var _this = this;\n\n      return this.devices.find(function (n) {\n        return n.deviceId === _this.deviceId;\n      });\n    }\n  },\n  watch: {\n    camera: function camera(id) {\n      this.deviceId = id;\n    },\n    devices: function devices() {\n      // Once we have a list select the first one\n      var first = this.devices[0];\n\n      if (first) {\n        this.camera = first.deviceId;\n        this.deviceId = first.deviceId;\n      }\n    }\n  },\n  methods: {\n    onPreviewImage: function onPreviewImage(preview) {\n      this.img = preview;\n    },\n    onImageProgress: function onImageProgress(percent) {\n      console.log(percent);\n    },\n    onImageReady: function onImageReady(image) {\n      console.log(image);\n    },\n    Capture: function Capture() {\n      this.$refs.webcam.capture();\n    },\n    onStarted: function onStarted(stream) {//console.log(\"On Started Event\", stream);\n    },\n    onStopped: function onStopped(stream) {\n      console.log(\"On Stopped Event\", stream);\n    },\n    Stop: function Stop() {\n      this.$refs.webcam.stop();\n    },\n    Start: function Start() {\n      this.$refs.webcam.start();\n    },\n    onError: function onError(error) {\n      this.notSupport = true;\n      this.error = error;\n      console.log(\"On Error Event\", error);\n    },\n    onCameras: function onCameras(cameras) {\n      this.devices = cameras;\n    },\n    onCameraChange: function onCameraChange(deviceId) {\n      this.deviceId = deviceId;\n      this.camera = deviceId;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/example.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_example_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/example.vue */ \"./src/components/example.vue\");\n//\n//\n//\n//\n//\n//\n//\n// @ is an alias to /src\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'home',\n  components: {\n    HelloWorld: _components_example_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n});\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=template&id=2f92c022&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9946af2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!../src/identiface.vue?vue&type=template&id=2f92c022&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"identiface\" },\n    [\n      _vm.notSupported\n        ? [\n            _c(\n              \"label\",\n              {\n                staticClass: \"inputContent\",\n                class: { error: _vm.errorMessage !== \"\" },\n                attrs: { id: \"identify__content\" }\n              },\n              [\n                _c(\"input\", {\n                  staticClass: \"inputfile\",\n                  attrs: {\n                    type: \"file\",\n                    id: \"identify__input\",\n                    accept: \"image/jpeg\"\n                  },\n                  on: {\n                    change: function($event) {\n                      return _vm.validateFile($event)\n                    }\n                  }\n                }),\n                _c(\n                  \"span\",\n                  {\n                    staticClass: \"inputcustom\",\n                    attrs: { id: \"identify__inputcustom\" }\n                  },\n                  [_vm._t(\"identify__inputcustom\")],\n                  2\n                )\n              ]\n            )\n          ]\n        : [\n            _c(\"video\", {\n              ref: \"video\",\n              staticClass: \"identify__webcamera\",\n              class: { error: _vm.errorMessage !== \"\" },\n              attrs: {\n                width: _vm.width,\n                height: _vm.height,\n                src: _vm.source,\n                autoplay: _vm.autoplay,\n                playsinline: \"\"\n              }\n            }),\n            _c(\"canvas\", {\n              ref: \"canvas\",\n              attrs: { width: 888, height: _vm.height },\n              on: {\n                mousedown: function($event) {\n                  return _vm.down($event)\n                },\n                mousemove: function($event) {\n                  return _vm.move($event)\n                },\n                mouseup: function($event) {\n                  return _vm.up($event)\n                }\n              }\n            })\n          ],\n      _c(\"div\", { staticClass: \"progress\" }),\n      _vm.errorMessage\n        ? _c(\"p\", { staticClass: \"errorMessage\" }, [\n            _vm._v(\" \" + _vm._s(this.errorMessage) + \" \")\n          ])\n        : _vm._e()\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///../src/identiface.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22b9946af2-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9946af2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: \"app\" } }, [_c(\"router-view\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22b9946af2-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=template&id=82b452ec&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9946af2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/example.vue?vue&type=template&id=82b452ec&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"hello\" },\n    [\n      _vm.initCamera\n        ? [\n            _c(\"WebCam\", {\n              ref: \"webcam\",\n              attrs: {\n                awsUrl:\n                  \"https://api.dev.prestamype.com/v1/prestajapi/post_upload_file_s3\",\n                awsConfig: { hola: \"Mundo\" },\n                \"device-id\": _vm.deviceId,\n                isFrontCam: _vm.frontCamera,\n                width: \"100%\",\n                resolution: { width: 1280, height: 720 }\n              },\n              on: {\n                started: _vm.onStarted,\n                stopped: _vm.onStopped,\n                error: _vm.onError,\n                cameras: _vm.onCameras,\n                \"camera-change\": _vm.onCameraChange,\n                \"image-ready\": _vm.onImageReady,\n                progress: _vm.onImageProgress,\n                preview: _vm.onPreviewImage\n              }\n            }),\n            _c(\"img\", { attrs: { src: _vm.img, alt: \"\" } }),\n            _vm._v(\" \" + _vm._s(_vm.error) + \" \"),\n            !_vm.notSupport\n              ? [\n                  _c(\"button\", { on: { click: _vm.Start } }, [\n                    _vm._v(\"Iniciar\")\n                  ]),\n                  _c(\"button\", { on: { click: _vm.Stop } }, [_vm._v(\"Parar\")]),\n                  _c(\"button\", { on: { click: _vm.Capture } }, [\n                    _vm._v(\"Foto\")\n                  ]),\n                  _c(\"hr\"),\n                  _c(\"label\", [\n                    _c(\"input\", {\n                      directives: [\n                        {\n                          name: \"model\",\n                          rawName: \"v-model\",\n                          value: _vm.frontCamera,\n                          expression: \"frontCamera\"\n                        }\n                      ],\n                      attrs: { type: \"checkbox\" },\n                      domProps: {\n                        checked: Array.isArray(_vm.frontCamera)\n                          ? _vm._i(_vm.frontCamera, null) > -1\n                          : _vm.frontCamera\n                      },\n                      on: {\n                        change: function($event) {\n                          var $$a = _vm.frontCamera,\n                            $$el = $event.target,\n                            $$c = $$el.checked ? true : false\n                          if (Array.isArray($$a)) {\n                            var $$v = null,\n                              $$i = _vm._i($$a, $$v)\n                            if ($$el.checked) {\n                              $$i < 0 && (_vm.frontCamera = $$a.concat([$$v]))\n                            } else {\n                              $$i > -1 &&\n                                (_vm.frontCamera = $$a\n                                  .slice(0, $$i)\n                                  .concat($$a.slice($$i + 1)))\n                            }\n                          } else {\n                            _vm.frontCamera = $$c\n                          }\n                        }\n                      }\n                    }),\n                    _vm._v(\"front Camera\")\n                  ])\n                ]\n              : _vm._e()\n          ]\n        : _vm._e()\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/example.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22b9946af2-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=template&id=fae5bece&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b9946af2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=template&id=fae5bece& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"home\" },\n    [_c(\"HelloWorld\", { attrs: { msg: \"Prestamype WebCam\" } })],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22b9946af2-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../demo/node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\ncanvas[data-v-2f92c022]{\\n    display: block;\\n}\\n.inputContent[data-v-2f92c022] {\\n    position: relative;\\n    display: inline-block;\\n    cursor: pointer;\\n}\\n.inputfile[data-v-2f92c022] {\\n    min-width: 14rem;\\n    margin: 0;\\n    filter: alpha(opacity=0);\\n    opacity: 0;\\n}\\n.inputcustom[data-v-2f92c022] {\\n    position: absolute;\\n    top: 0;\\n    right: 0;\\n    left: 0;\\n    z-index: 5;\\n    -webkit-user-select: none;\\n    -moz-user-select: none;\\n    -ms-user-select: none;\\n    user-select: none;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///../src/identiface.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n#app {\\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n  text-align: center;\\n  color: #2c3e50;\\n}\\n#nav {\\n  padding: 30px;\\n}\\n#nav a {\\n  font-weight: bold;\\n  color: #2c3e50;\\n}\\n#nav a.router-link-exact-active {\\n  color: #42b983;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\nh3[data-v-82b452ec] {\\n    margin: 40px 0 0;\\n}\\nul[data-v-82b452ec] {\\n    list-style-type: none;\\n    padding: 0;\\n}\\nli[data-v-82b452ec] {\\n    display: inline-block;\\n    margin: 0 10px;\\n}\\na[data-v-82b452ec] {\\n    color: #42b983;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/example.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../demo/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../demo/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../demo/node_modules/postcss-loader/src??ref--6-oneOf-1-2!../demo/node_modules/cache-loader/dist/cjs.js??ref--0-0!../demo/node_modules/vue-loader/lib??vue-loader-options!./identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../src/identiface.vue?vue&type=style&index=0&id=2f92c022&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../demo/node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"7e824b21\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///../src/identiface.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"fa1ef42a\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"1652a357\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/example.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ \"./src/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\nvar script = {}\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  script,\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--6-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"b9946af2-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/components/example.vue":
/*!************************************!*\
  !*** ./src/components/example.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _example_vue_vue_type_template_id_82b452ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./example.vue?vue&type=template&id=82b452ec&scoped=true& */ \"./src/components/example.vue?vue&type=template&id=82b452ec&scoped=true&\");\n/* harmony import */ var _example_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./example.vue?vue&type=script&lang=js& */ \"./src/components/example.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css& */ \"./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _example_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _example_vue_vue_type_template_id_82b452ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _example_vue_vue_type_template_id_82b452ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"82b452ec\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/example.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/example.vue?");

/***/ }),

/***/ "./src/components/example.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/components/example.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./example.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/example.vue?");

/***/ }),

/***/ "./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css&":
/*!*********************************************************************************************!*\
  !*** ./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=style&index=0&id=82b452ec&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_style_index_0_id_82b452ec_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/example.vue?");

/***/ }),

/***/ "./src/components/example.vue?vue&type=template&id=82b452ec&scoped=true&":
/*!*******************************************************************************!*\
  !*** ./src/components/example.vue?vue&type=template&id=82b452ec&scoped=true& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_template_id_82b452ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./example.vue?vue&type=template&id=82b452ec&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"b9946af2-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/example.vue?vue&type=template&id=82b452ec&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_template_id_82b452ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_example_vue_vue_type_template_id_82b452ec_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/example.vue?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_Diego_Documents_projects_identiface_local_demo_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _views_Home_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/Home.vue */ \"./src/views/Home.vue\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar routes = [{\n  path: '/',\n  name: 'home',\n  component: _views_Home_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}, {\n  path: '/about',\n  name: 'about',\n  // route level code-splitting\n  // this generates a separate chunk (about.[hash].js) for this route\n  // which is lazy-loaded when the route is visited.\n  component: function component() {\n    return __webpack_require__.e(/*! import() | about */ \"about\").then(__webpack_require__.bind(null, /*! ../views/About.vue */ \"./src/views/About.vue\"));\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  mode: 'history',\n  base: \"/\",\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  state: {},\n  mutations: {},\n  actions: {},\n  modules: {}\n}));\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/views/Home.vue":
/*!****************************!*\
  !*** ./src/views/Home.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=fae5bece& */ \"./src/views/Home.vue?vue&type=template&id=fae5bece&\");\n/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ \"./src/views/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/Home.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=script&lang=js&":
/*!*****************************************************!*\
  !*** ./src/views/Home.vue?vue&type=script&lang=js& ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ "./src/views/Home.vue?vue&type=template&id=fae5bece&":
/*!***********************************************************!*\
  !*** ./src/views/Home.vue?vue&type=template&id=fae5bece& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"b9946af2-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=fae5bece& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"b9946af2-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Home.vue?vue&type=template&id=fae5bece&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_b9946af2_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_fae5bece___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/Home.vue?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 3:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///buffer_(ignored)?");

/***/ }),

/***/ 4:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///crypto_(ignored)?");

/***/ })

/******/ });