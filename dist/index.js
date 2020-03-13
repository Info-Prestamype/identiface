(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["prestamype-webcam"] = factory();
	else
		root["prestamype-webcam"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (170:12)\n\n\u001b[0m \u001b[90m 168 | \u001b[39m        \u001b[36mconst\u001b[39m facingMode \u001b[33m=\u001b[39m  \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39misFrontCam \u001b[33m?\u001b[39m \u001b[32m'user'\u001b[39m \u001b[33m:\u001b[39m \u001b[32m'environment'\u001b[39m\n \u001b[90m 169 | \u001b[39m        \u001b[36mconst\u001b[39m video \u001b[33m=\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 170 | \u001b[39m            \u001b[33m...\u001b[39m\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mmediaConstraints\u001b[33m.\u001b[39mvideo\u001b[33m,\u001b[39m\n \u001b[90m     | \u001b[39m            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 171 | \u001b[39m            \u001b[33m...\u001b[39m(\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mdeviceId \u001b[33m?\u001b[39m {\n \u001b[90m 172 | \u001b[39m            deviceId\u001b[33m:\u001b[39m { exact\u001b[33m:\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mdeviceId }\n \u001b[90m 173 | \u001b[39m            } \u001b[33m:\u001b[39m {})\u001b[33m,\u001b[39m\u001b[0m\n");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/Diego/Documents/projects/identiface-local/node_modules/vue-loader/lib/index.js?{\"loaders\":{\"scss\":\"vue-style-loader!css-loader!sass-loader\",\"sass\":\"vue-style-loader!css-loader!sass-loader?indentedSyntax\"}}!/Users/Diego/Documents/projects/identiface-local/src/identiface.vue?vue&type=style&index=0&id=0c274ade&scoped=true&lang=css& Unexpected token (47:0)\nYou may need an appropriate loader to handle this file type.\n| \n| \n| .inputContent {\n|     position: relative;\n|     display: inline-block;");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_script_lang_js___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_script_lang_js___);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_script_lang_js___["default"]); 

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__identiface_vue_vue_type_template_id_0c274ade_scoped_true___ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__identiface_vue_vue_type_script_lang_js___ = __webpack_require__(2);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identiface_vue_vue_type_style_index_0_id_0c274ade_scoped_true_lang_css___ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(8);






/* normalize component */

var component = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__identiface_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__identiface_vue_vue_type_template_id_0c274ade_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__identiface_vue_vue_type_template_id_0c274ade_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "0c274ade",
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__identiface__ = __webpack_require__(3);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__identiface__, "default")) __webpack_require__.d(__webpack_exports__, "WebCam", function() { return __WEBPACK_IMPORTED_MODULE_0__identiface__["default"]; });


function plugin(Vue) {
    Vue.component("vue-web-cam", __WEBPACK_IMPORTED_MODULE_0__identiface__["default"]);
}

// Install by default if using the script tag
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (plugin);
const version = "__VERSION__";
// Export all components too


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_0c274ade_scoped_true_lang_css___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_0c274ade_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_0c274ade_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_style_index_0_id_0c274ade_scoped_true_lang_css___["default"]); 

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_template_id_0c274ade_scoped_true___ = __webpack_require__(7);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_template_id_0c274ade_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_identiface_vue_vue_type_template_id_0c274ade_scoped_true___["b"]; });


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"identiface"},[(_vm.notSupported)?[_c('label',{staticClass:"inputContent",class:{ 'error' : _vm.errorMessage !== ''},attrs:{"id":"identify__content"}},[_c('input',{staticClass:"inputfile",attrs:{"type":"file","id":"identify__input","accept":"image/jpeg"},on:{"change":function($event){return _vm.validateFile($event)}}}),_vm._v(" "),_c('span',{staticClass:"inputcustom",attrs:{"id":"identify__inputcustom"}},[_vm._t("identify__inputcustom")],2)])]:[_c('video',{ref:"video",staticClass:"identify__webcamera",class:{ 'error' : _vm.errorMessage !== ''},attrs:{"width":_vm.width,"height":_vm.height,"src":_vm.source,"autoplay":_vm.autoplay,"playsinline":""}}),_vm._v("\n        "+_vm._s(_vm.cameras)+" \n\n        "),_c('hr'),_vm._v("\n\n        "+_vm._s(_vm.camsList)+" \n\n        "),_c('hr'),_vm._v("\n        "+_vm._s(_vm.Constrains)+"\n\n        "),_c('hr')],_vm._v(" "),_c('div',{staticClass:"progress"}),_vm._v(" "),(_vm.errorMessage)?_c('p',{staticClass:"errorMessage"},[_vm._v("\n        "+_vm._s(this.errorMessage)+"\n    ")]):_vm._e()],2)}
var staticRenderFns = []



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);
});