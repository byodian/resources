/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Component */ "./src/js/models/Component.js");
/* harmony import */ var _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/DOMElements */ "./src/js/views/DOMElements.js");
/* harmony import */ var _views_skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/skeleton */ "./src/js/views/skeleton.js");
/* harmony import */ var _services_resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/resources */ "./src/js/services/resources.js");
/* harmony import */ var _views_handleMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/handleMenu */ "./src/js/views/handleMenu.js");
/* harmony import */ var _views_scrollTo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/scrollTo */ "./src/js/views/scrollTo.js");
/* harmony import */ var _views_resize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/resize */ "./src/js/views/resize.js");
/* harmony import */ var _views_slides__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/slides */ "./src/js/views/slides.js");









const app = (function () {
  //
  // Variables
  //
  let settings;
  
  const that = {};
  const defaults = {
    selectors: {
      menuItemsGroup: '#left_menu_items',
      sectionsGroup: '#section_groups',
    },
    classes: {
      enterDone: 'left_menu_overlay left_menu_overlay-enter-done',
      exitDone: 'left_menu_overlay left_menu_overlay-exit-done',
      leftMenuShow: 'left_menu_show',
      leftMenuHidden: 'left_menu_hidden'
    },
    resources: [],
    callback: function (content) {
      return content;
    },
  };

  //
  // Methods
  //
  
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const uniqueResources = function (category) {
    return function (resources) {
      return resources.filter(
        (resource) => resource.category.trim() === category
      );
    };
  };

  /**
   * 
   * @param {String} selector The selector for the content parent element
   * @param {Array} resources The data for the content items
   * @param {Function} template The function render UI
   */
  const renderContent = function(selector, resources, template) {
    return new _models_Component__WEBPACK_IMPORTED_MODULE_0__["Component"](selector, {
      resources: resources,
      template: template,
    });
  }

  const destory = function() {
    // Make sure the plugin has been initialized
    if (!settings) return;

    // Remove the table of contents
    settings.nodeList.leftMenuItems.innerHTML = '';
    settings.nodeList.sectionsItems.innerHTML = '';

    // Reset variables
    settings = null;
  }

  const init = function (options) {
    // Destory the current initialization
    destory();

    options = options || {};

    // Merge both user defaults and options.
    settings = Object.assign({}, defaults, options);

    // Get all categories of the resources
    const categories = uniqueArray(
      settings.resources.map((resource) => resource.category)
    );

    // Get all items of left menu items then append it to document
    renderContent(settings.selectors.menuItemsGroup, categories, _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["getMenuItems"]).render();

    // Get all sections of main content
    renderContent(settings.selectors.sectionsGroup, categories, _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["getSections"]).render();

    // Render the items into a unique section id
    categories.forEach((category) => {
      const selector = `#${category} .group_items`;

      // Get resources of the same category
      // For example: HTML、Javascript、Tools、podcast
      const resources = uniqueResources(category)(settings.resources);
      renderContent(selector, resources, _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["getCards"]).render();
    });

    // Scroll to the specified category by clicking the menu
    const scrollTo = (function (offset) {
      const items = document.querySelectorAll('.left_menu_item')
      const links = document.querySelectorAll('.left_menu_item a');

      for (let link of links) {
        link.addEventListener('click', Object(_views_scrollTo__WEBPACK_IMPORTED_MODULE_5__["scrollHandler"])(offset));
        link.addEventListener('click', function() {
          [...items].forEach(item => {
            if (item.classList.contains('current')) {
              item.classList.remove('current');
            }
          });
          
          link.parentElement.classList.add('current');
        })
      }
    })(76);


    // 
    // init & Events
    //

    // Show or hide the left menu by resizing the size of document.documentElement.clientWidth
    Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleMenu"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes)();

    // Resize the width of left_menu and main_content
    _views_resize__WEBPACK_IMPORTED_MODULE_6__["resize"].initialize({ nodeList: _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"] });
    
    // banner slides
    Object(_views_slides__WEBPACK_IMPORTED_MODULE_7__["autoShowSlides"])();
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].prev.addEventListener('click', Object(_views_slides__WEBPACK_IMPORTED_MODULE_7__["plusSlides"])(-1));
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].next.addEventListener('click', Object(_views_slides__WEBPACK_IMPORTED_MODULE_7__["plusSlides"])(1));
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].dotWrapper.addEventListener('click', function(event) {
      if (!event.target.matches('#dot')) return;
      const number = Number(event.target.dataset.dot);
      Object(_views_slides__WEBPACK_IMPORTED_MODULE_7__["currentSlide"])(number);
    })

    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftControlMenu.addEventListener('click', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleOverlay"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenuOverlay.addEventListener('click', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleOverlay"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));
    
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenu.addEventListener('mousedown', function (event) {
      event.preventDefault();
      return false;
    });

    // Hide left menu navigation when user click a menu in mobile devices
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenuItems.addEventListener('click', function() {
      if (_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].html.clientWidth < 750) {
        Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["hideMenu"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes);
      }
    });

  };

  //
  // Inits & Events
  //

  // Render the skeleton screen before getting the resources from server
  Object(_views_skeleton__WEBPACK_IMPORTED_MODULE_2__["render"])(defaults.selectors.sectionsGroup, _views_skeleton__WEBPACK_IMPORTED_MODULE_2__["getSkeleton"]);

  // banner slides Initial 
  Object(_views_slides__WEBPACK_IMPORTED_MODULE_7__["showSlides"])();

  // Get resources from the service side
  _services_resources__WEBPACK_IMPORTED_MODULE_3__["default"].getAll().then((resources) => {
    init(resources);
  });

  that.init = init;
  that.destory = destory;
  
  return that;
})();


/***/ }),

/***/ "./src/js/models/Component.js":
/*!************************************!*\
  !*** ./src/js/models/Component.js ***!
  \************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
Function.prototype.method = function(name, func) {
  if (this.prototype[name]) return;
  this.prototype[name] = func;
  return this;
}

const Component = (function() {

  /**
   * 
   * @param {String} selector The selector for the table of contents target
   * @param {Object} options User options 
   */
  var Constructor = function(selector, options) {
    this.selector = selector;
    this.resources = options.resources;
    this.template = options.template;
  }

  Constructor.method('render', function() {
    const target = document.querySelector(this.selector);
    if (!target) return;
    target.innerHTML = this.handleTemplate(this.resources);
  })

  Constructor.method('handleTemplate', function() {
    if (this.resources.length < 1) return;

    return this.resources
      .map(resource => this.template(resource))
      .join('')
  })

  Constructor.method('setData', function(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperties(key)) {
        this.resources = obj[key];
      }
    }

    this.render();
  })

  Constructor.method('getData', function() {
    return Object.parse(Object.stringify(this.resources));
  })

  return Constructor;
})();

/***/ }),

/***/ "./src/js/services/resources.js":
/*!**************************************!*\
  !*** ./src/js/services/resources.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const baseUrl = '/.netlify/functions/api/resources';

const getAll = function() {
  const request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(baseUrl);
  return request.then(response => response.data);
}

const create = function(newObject) {
  const request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const update = function(id, newObject) {
  const request = axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

/* harmony default export */ __webpack_exports__["default"] = ({ getAll, create, update });


/***/ }),

/***/ "./src/js/views/DOMElements.js":
/*!*************************************!*\
  !*** ./src/js/views/DOMElements.js ***!
  \*************************************/
/*! exports provided: nodeList, getMenuItems, getSections, getCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeList", function() { return nodeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMenuItems", function() { return getMenuItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSections", function() { return getSections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCards", function() { return getCards; });
const nodeList = {
  leftControlMenu: document.querySelector('.left_control_menu'),
  leftMenuOverlay: document.querySelector('.left_menu_overlay'),
  sectionItems: document.querySelector('#section_groups'),
  leftMenuItems: document.querySelector('#left_menu_items'),
  html: document.documentElement,
  body: document.body,
  leftMenu: document.querySelector('.left_menu'),
  resizeHandle: document.querySelector('.resize_handle'),
  mainContent: document.querySelector('.main_content'),
  prev: document.querySelector('#prev'),
  next: document.querySelector('#next'),
  dotWrapper: document.querySelector('.dot-wrapper')
}

  // Generate a item of the navigation
const getMenuItems = category => `
  <li class="left_menu_item">
    <a href="#${category}"> 
      <img class="menu_item_icon" src="./svg/${category}.svg" alt="This is a ${category} category"></img>
      <span class="menu_item_content">${category}</span>
    </a>
  </li>
`;

  // Generate a section of the main content
const getSections = category => `
  <section id="${category}" class="group" >
    <h2 class="group_title">${category}</h2>
    <div class="group_content">
      <ul class="row group_items"></ul>
    </div>
  </section>  
`;

  // Generate a list of the section 
const getCards = resource => `
  <li class="group_item col3">
    <a class="group_item_link" href="${resource.href}">
      <div class="card">
        <img class="card_icon" src="${resource.src}" alt="${resource.src.replace(/\.\/img\//g, '')}">
        <div class="card_body">
          <h3 class="card_title">${resource.title}</h3>
          <p class="card_text">${resource.content}</p>
        </div>
      </div>
    </a>
  </li>
`;

/***/ }),

/***/ "./src/js/views/handleMenu.js":
/*!************************************!*\
  !*** ./src/js/views/handleMenu.js ***!
  \************************************/
/*! exports provided: hideMenu, handleOverlay, handleMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideMenu", function() { return hideMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleOverlay", function() { return handleOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleMenu", function() { return handleMenu; });
// Represent the left menu opening or closing
// True means it's opening
let isActive = false;

function hideMenu(nodelist, classes) {
  nodelist.html.className = classes.leftMenuHidden;
  nodelist.leftMenuOverlay.className = classes.exitDone;
  isActive = true;
}

function handleOverlay (nodelist, classes) {
  return function () {
    if (isActive) {
      nodelist.html.className = classes.leftMenuShow;
      nodelist.leftMenuOverlay.className = classes.enterDone;
    } else {
      nodelist.html.className = classes.leftMenuHidden;
      nodelist.leftMenuOverlay.className = classes.exitDone;
    }

    isActive = !isActive;
  }
}

function handleMenu(nodelist, classes) {
  return function() {
    if (nodelist.html.clientWidth < 750) {
      hideMenu(nodelist, classes);
    } else {
      nodelist.html.className = classes.leftMenuShow;
      nodelist.leftMenuOverlay.className = classes.enterDone;
      isActive = false;
    }
  }
}


/***/ }),

/***/ "./src/js/views/resize.js":
/*!********************************!*\
  !*** ./src/js/views/resize.js ***!
  \********************************/
/*! exports provided: resize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resize", function() { return resize; });
const resize = (function() {
  let settings;

  const that = {}; 
  const defaults = {
    sizes: {
      maxWidth: 425,
      minWidth: 200,
      x: 250
    },
  }

  // Inits and Events
  const initialize = function(options) {
    options = options || {} 
    settings = Object.assign({}, defaults, options);

    // methods
    const moveAt = function(x) {
      settings.nodeList.leftMenu.style.width = x + 'px';
      settings.nodeList.resizeHandle.style.left = x + 'px';
      settings.nodeList.mainContent.style.marginLeft = x + 'px';
    }

    const onMouseUp = function func() {
      settings.nodeList.leftMenu.classList.remove('transition_none');
      settings.nodeList.mainContent.classList.remove('transition_none');
      settings.nodeList.body.classList.remove('no_user_selection');
      document.removeEventListener('mousemove', onMouseMove);
      this.removeEventListener('mouseup', func);
    }

    const onMouseMove = function(event) {
      const leftMenuWidth = parseInt(settings.nodeList.leftMenu.style.width, 10);
      if (leftMenuWidth > settings.sizes.maxWidth || leftMenuWidth < settings.sizes.minWidth) {
        document.removeEventListener('mousemove', onMouseMove);
      } else if (leftMenuWidth <= settings.sizes.maxWidth && leftMenuWidth >= settings.sizes.minWidth) {
        settings.nodeList.leftMenu.classList.add('transition_none');
        settings.nodeList.mainContent.classList.add('transition_none');
        settings.nodeList.body.classList.add('no_user_selection');
        moveAt(event.pageX);
      }
    }

    settings.nodeList.resizeHandle.addEventListener('mousedown', function(event) {
      document.addEventListener('mousemove', onMouseMove);
      this.addEventListener('mouseup', onMouseUp);

      this.addEventListener('dragstart', function(event) {
        event.preventDefault;
      });

    })

    settings.nodeList.resizeHandle.addEventListener('dblclick', function() {
      moveAt(settings.sizes.x);
    });

    // Initial 
    moveAt(settings.sizes.x);
  }

  that.initialize = initialize;

  return that;
})();

/***/ }),

/***/ "./src/js/views/scrollTo.js":
/*!**********************************!*\
  !*** ./src/js/views/scrollTo.js ***!
  \**********************************/
/*! exports provided: scrollHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollHandler", function() { return scrollHandler; });
/**
 * 
 * @param {Number} offsetThe height of both topbar and group element
 */
const scrollHandler = function(offset) {
  return function(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(`${href}`).offsetTop;
    scroll({
      top: offsetTop - offset,
      behavior: 'smooth'
    })
  }
}

/***/ }),

/***/ "./src/js/views/skeleton.js":
/*!**********************************!*\
  !*** ./src/js/views/skeleton.js ***!
  \**********************************/
/*! exports provided: getSkeleton, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSkeleton", function() { return getSkeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
const makeItems = () => {
  let items = '';

  for (let i = 0; i < 20; i++) {
    items += `
      <li class="group_item col3">
        <a class="group_item_link">
          <div class="card">
            <div class="card_icon loading"></div>
            <div class="card_body">
              <h4 class="card_title loading"></h4>
              <p class="card_text loading"></p>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  return items;
}

const getSkeleton = () => `
  <section class="group" >
    <h3 class="group_title loading"></h3>
    <div class="group_content">
      <ul class="row group_items">
        ${makeItems()}
      </ul>
    </div>
  </section>
`;

function render(selector, template) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.innerHTML = template();
}

/***/ }),

/***/ "./src/js/views/slides.js":
/*!********************************!*\
  !*** ./src/js/views/slides.js ***!
  \********************************/
/*! exports provided: showSlides, autoShowSlides, plusSlides, currentSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSlides", function() { return showSlides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoShowSlides", function() { return autoShowSlides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plusSlides", function() { return plusSlides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentSlide", function() { return currentSlide; });
let showlideIndex = 1;

const handleBanner = function(callback) {
  const slides = document.querySelectorAll('.slides');
  const dots = document.querySelectorAll('.dot');

  if (!slides) return;
  if(!dots) return;

  const len = slides.length;
  
  callback(len);

  for(let i = 0; i < len; i++) {
    slides[i].style.display = 'none';
    dots[i].classList.remove('active');
  }

  slides[showlideIndex - 1].style.display = 'block';
  dots[showlideIndex - 1].classList.add('active');
}

function showSlides(n = 1) {
  return handleBanner(function(len) {
    showlideIndex = n > len ? 1 : n < 1 ? len : showlideIndex;
  });
}

function autoShowSlides() {
  handleBanner(function(len) {
    showlideIndex = showlideIndex > len ? 1 : showlideIndex;
  });

  setTimeout(autoShowSlides, 4000);
  showlideIndex++;
}

function plusSlides(n) {
  return function() {
    showSlides(showlideIndex += n);
  }
}

function currentSlide(n) {
  showSlides(showlideIndex = n);
}

/***/ }),

/***/ 0:
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/models/Component.js ./src/js/views/DOMElements.js ./src/js/views/handleMenu.js ./src/js/views/resize.js ./src/js/views/scrollTo.js ./src/js/views/skeleton.js ./src/js/views/slides.js ./src/js/services/resources.js ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\models\Component.js */"./src/js/models/Component.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\DOMElements.js */"./src/js/views/DOMElements.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\handleMenu.js */"./src/js/views/handleMenu.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\resize.js */"./src/js/views/resize.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\scrollTo.js */"./src/js/views/scrollTo.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\skeleton.js */"./src/js/views/skeleton.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\slides.js */"./src/js/views/slides.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\services\resources.js */"./src/js/services/resources.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kZWxzL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvaGFuZGxlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvcmVzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9zY3JvbGxUby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3Mvc2tlbGV0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXdzL3NsaWRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCO0FBQ3ZDLGNBQWMsbUJBQU8sQ0FBQyx5RUFBc0I7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLDJFQUF1QjtBQUM5QyxvQkFBb0IsbUJBQU8sQ0FBQyw2RUFBdUI7QUFDbkQsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTJCO0FBQ3RELHNCQUFzQixtQkFBTyxDQUFDLHlGQUE4QjtBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDbExhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrREFBUztBQUM3QixXQUFXLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ25DLFlBQVksbUJBQU8sQ0FBQyw0REFBYztBQUNsQyxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBb0I7QUFDOUMsZUFBZSxtQkFBTyxDQUFDLHdEQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxrRUFBaUI7QUFDeEMsb0JBQW9CLG1CQUFPLENBQUMsNEVBQXNCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLHNFQUFtQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFPLENBQUMsb0VBQWtCOztBQUV6Qzs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcERhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xCYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsMkRBQVU7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3hEYTs7QUFFYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNKYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsZUFBZSxtQkFBTyxDQUFDLHlFQUFxQjtBQUM1Qyx5QkFBeUIsbUJBQU8sQ0FBQyxpRkFBc0I7QUFDdkQsc0JBQXNCLG1CQUFPLENBQUMsMkVBQW1CO0FBQ2pELGtCQUFrQixtQkFBTyxDQUFDLG1FQUFlOztBQUV6QztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7O0FDOUZhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ25EYTs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQyxtRkFBMEI7QUFDdEQsa0JBQWtCLG1CQUFPLENBQUMsK0VBQXdCOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQmE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMscUVBQWdCOztBQUUzQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxvQkFBb0IsbUJBQU8sQ0FBQyx1RUFBaUI7QUFDN0MsZUFBZSxtQkFBTyxDQUFDLHVFQUFvQjtBQUMzQyxlQUFlLG1CQUFPLENBQUMseURBQWE7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUM5RWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekNhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBVTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwyQkFBMkI7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RGYTs7QUFFYixrQkFBa0IsbUJBQU8sQ0FBQyxtRUFBZTs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4QmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsZUFBZTtBQUMxQixhQUFhLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJBLCtDQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrREFBUztBQUM3QiwwQkFBMEIsbUJBQU8sQ0FBQyw4RkFBK0I7O0FBRWpFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGdFQUFnQjtBQUN0QyxHQUFHO0FBQ0g7QUFDQSxjQUFjLG1CQUFPLENBQUMsaUVBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLFlBQVk7QUFDbkI7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUNqR2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDO0FBQzFDLFNBQVM7O0FBRVQ7QUFDQSw0REFBNEQsd0JBQXdCO0FBQ3BGO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLCtCQUErQixhQUFhLEVBQUU7QUFDOUM7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ25FYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVU7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ1hhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixlQUFlOztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcERhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUJhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRW5DOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlWQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBK0M7QUFDc0M7QUFDOUI7QUFDWjtBQUM4QjtBQUN4QjtBQUNUO0FBQzhDOztBQUV0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDckNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vbW9kZWxzL0NvbXBvbmVudCc7XHJcbmltcG9ydCB7IG5vZGVMaXN0LCBnZXRTZWN0aW9ucywgZ2V0Q2FyZHMsIGdldE1lbnVJdGVtcywgfSBmcm9tICcuL3ZpZXdzL0RPTUVsZW1lbnRzJztcclxuaW1wb3J0IHsgZ2V0U2tlbGV0b24sIHJlbmRlciB9IGZyb20gJy4vdmlld3Mvc2tlbGV0b24nO1xyXG5pbXBvcnQgc2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3Jlc291cmNlcyc7XHJcbmltcG9ydCB7IGhhbmRsZU92ZXJsYXksIGhhbmRsZU1lbnUgLCBoaWRlTWVudX0gZnJvbSAnLi92aWV3cy9oYW5kbGVNZW51JztcclxuaW1wb3J0IHsgc2Nyb2xsSGFuZGxlciB9IGZyb20gJy4vdmlld3Mvc2Nyb2xsVG8nO1xyXG5pbXBvcnQgeyByZXNpemUgfSBmcm9tICcuL3ZpZXdzL3Jlc2l6ZSc7XHJcbmltcG9ydCB7IHNob3dTbGlkZXMsIGF1dG9TaG93U2xpZGVzLCBwbHVzU2xpZGVzLCBjdXJyZW50U2xpZGUgfSBmcm9tICcuL3ZpZXdzL3NsaWRlcyc7XHJcblxyXG5jb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIC8vXHJcbiAgLy8gVmFyaWFibGVzXHJcbiAgLy9cclxuICBsZXQgc2V0dGluZ3M7XHJcbiAgXHJcbiAgY29uc3QgdGhhdCA9IHt9O1xyXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xyXG4gICAgc2VsZWN0b3JzOiB7XHJcbiAgICAgIG1lbnVJdGVtc0dyb3VwOiAnI2xlZnRfbWVudV9pdGVtcycsXHJcbiAgICAgIHNlY3Rpb25zR3JvdXA6ICcjc2VjdGlvbl9ncm91cHMnLFxyXG4gICAgfSxcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgZW50ZXJEb25lOiAnbGVmdF9tZW51X292ZXJsYXkgbGVmdF9tZW51X292ZXJsYXktZW50ZXItZG9uZScsXHJcbiAgICAgIGV4aXREb25lOiAnbGVmdF9tZW51X292ZXJsYXkgbGVmdF9tZW51X292ZXJsYXktZXhpdC1kb25lJyxcclxuICAgICAgbGVmdE1lbnVTaG93OiAnbGVmdF9tZW51X3Nob3cnLFxyXG4gICAgICBsZWZ0TWVudUhpZGRlbjogJ2xlZnRfbWVudV9oaWRkZW4nXHJcbiAgICB9LFxyXG4gICAgcmVzb3VyY2VzOiBbXSxcclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy9cclxuICAvLyBNZXRob2RzXHJcbiAgLy9cclxuICBcclxuICBjb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIHJldHVybiBhcnIuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBjb25zdCB1bmlxdWVSZXNvdXJjZXMgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmVzb3VyY2VzKSB7XHJcbiAgICAgIHJldHVybiByZXNvdXJjZXMuZmlsdGVyKFxyXG4gICAgICAgIChyZXNvdXJjZSkgPT4gcmVzb3VyY2UuY2F0ZWdvcnkudHJpbSgpID09PSBjYXRlZ29yeVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgY29udGVudCBwYXJlbnQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IHJlc291cmNlcyBUaGUgZGF0YSBmb3IgdGhlIGNvbnRlbnQgaXRlbXNcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZW1wbGF0ZSBUaGUgZnVuY3Rpb24gcmVuZGVyIFVJXHJcbiAgICovXHJcbiAgY29uc3QgcmVuZGVyQ29udGVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCByZXNvdXJjZXMsIHRlbXBsYXRlKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbXBvbmVudChzZWxlY3Rvciwge1xyXG4gICAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZXN0b3J5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHBsdWdpbiBoYXMgYmVlbiBpbml0aWFsaXplZFxyXG4gICAgaWYgKCFzZXR0aW5ncykgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgdGFibGUgb2YgY29udGVudHNcclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LmxlZnRNZW51SXRlbXMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBzZXR0aW5ncy5ub2RlTGlzdC5zZWN0aW9uc0l0ZW1zLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vIFJlc2V0IHZhcmlhYmxlc1xyXG4gICAgc2V0dGluZ3MgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAvLyBEZXN0b3J5IHRoZSBjdXJyZW50IGluaXRpYWxpemF0aW9uXHJcbiAgICBkZXN0b3J5KCk7XHJcblxyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gTWVyZ2UgYm90aCB1c2VyIGRlZmF1bHRzIGFuZCBvcHRpb25zLlxyXG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gR2V0IGFsbCBjYXRlZ29yaWVzIG9mIHRoZSByZXNvdXJjZXNcclxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB1bmlxdWVBcnJheShcclxuICAgICAgc2V0dGluZ3MucmVzb3VyY2VzLm1hcCgocmVzb3VyY2UpID0+IHJlc291cmNlLmNhdGVnb3J5KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIGl0ZW1zIG9mIGxlZnQgbWVudSBpdGVtcyB0aGVuIGFwcGVuZCBpdCB0byBkb2N1bWVudFxyXG4gICAgcmVuZGVyQ29udGVudChzZXR0aW5ncy5zZWxlY3RvcnMubWVudUl0ZW1zR3JvdXAsIGNhdGVnb3JpZXMsIGdldE1lbnVJdGVtcykucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gR2V0IGFsbCBzZWN0aW9ucyBvZiBtYWluIGNvbnRlbnRcclxuICAgIHJlbmRlckNvbnRlbnQoc2V0dGluZ3Muc2VsZWN0b3JzLnNlY3Rpb25zR3JvdXAsIGNhdGVnb3JpZXMsIGdldFNlY3Rpb25zKS5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBSZW5kZXIgdGhlIGl0ZW1zIGludG8gYSB1bmlxdWUgc2VjdGlvbiBpZFxyXG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICBjb25zdCBzZWxlY3RvciA9IGAjJHtjYXRlZ29yeX0gLmdyb3VwX2l0ZW1zYDtcclxuXHJcbiAgICAgIC8vIEdldCByZXNvdXJjZXMgb2YgdGhlIHNhbWUgY2F0ZWdvcnlcclxuICAgICAgLy8gRm9yIGV4YW1wbGU6IEhUTUzjgIFKYXZhc2NyaXB044CBVG9vbHPjgIFwb2RjYXN0XHJcbiAgICAgIGNvbnN0IHJlc291cmNlcyA9IHVuaXF1ZVJlc291cmNlcyhjYXRlZ29yeSkoc2V0dGluZ3MucmVzb3VyY2VzKTtcclxuICAgICAgcmVuZGVyQ29udGVudChzZWxlY3RvciwgcmVzb3VyY2VzLCBnZXRDYXJkcykucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gdGhlIHNwZWNpZmllZCBjYXRlZ29yeSBieSBjbGlja2luZyB0aGUgbWVudVxyXG4gICAgY29uc3Qgc2Nyb2xsVG8gPSAoZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZWZ0X21lbnVfaXRlbScpXHJcbiAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxlZnRfbWVudV9pdGVtIGEnKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGxpbmsgb2YgbGlua3MpIHtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2Nyb2xsSGFuZGxlcihvZmZzZXQpKTtcclxuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBbLi4uaXRlbXNdLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XHJcbiAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsaW5rLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY3VycmVudCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pKDc2KTtcclxuXHJcblxyXG4gICAgLy8gXHJcbiAgICAvLyBpbml0ICYgRXZlbnRzXHJcbiAgICAvL1xyXG5cclxuICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgbGVmdCBtZW51IGJ5IHJlc2l6aW5nIHRoZSBzaXplIG9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgaGFuZGxlTWVudShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykoKTtcclxuXHJcbiAgICAvLyBSZXNpemUgdGhlIHdpZHRoIG9mIGxlZnRfbWVudSBhbmQgbWFpbl9jb250ZW50XHJcbiAgICByZXNpemUuaW5pdGlhbGl6ZSh7IG5vZGVMaXN0OiBub2RlTGlzdCB9KTtcclxuICAgIFxyXG4gICAgLy8gYmFubmVyIHNsaWRlc1xyXG4gICAgYXV0b1Nob3dTbGlkZXMoKTtcclxuICAgIG5vZGVMaXN0LnByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbHVzU2xpZGVzKC0xKSk7XHJcbiAgICBub2RlTGlzdC5uZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGx1c1NsaWRlcygxKSk7XHJcbiAgICBub2RlTGlzdC5kb3RXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcygnI2RvdCcpKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5kb3QpO1xyXG4gICAgICBjdXJyZW50U2xpZGUobnVtYmVyKTtcclxuICAgIH0pXHJcblxyXG4gICAgbm9kZUxpc3QubGVmdENvbnRyb2xNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3ZlcmxheShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykpO1xyXG4gICAgbm9kZUxpc3QubGVmdE1lbnVPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3ZlcmxheShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykpO1xyXG4gICAgXHJcbiAgICBub2RlTGlzdC5sZWZ0TWVudS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGlkZSBsZWZ0IG1lbnUgbmF2aWdhdGlvbiB3aGVuIHVzZXIgY2xpY2sgYSBtZW51IGluIG1vYmlsZSBkZXZpY2VzXHJcbiAgICBub2RlTGlzdC5sZWZ0TWVudUl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChub2RlTGlzdC5odG1sLmNsaWVudFdpZHRoIDwgNzUwKSB7XHJcbiAgICAgICAgaGlkZU1lbnUobm9kZUxpc3QsIHNldHRpbmdzLmNsYXNzZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfTtcclxuXHJcbiAgLy9cclxuICAvLyBJbml0cyAmIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIC8vIFJlbmRlciB0aGUgc2tlbGV0b24gc2NyZWVuIGJlZm9yZSBnZXR0aW5nIHRoZSByZXNvdXJjZXMgZnJvbSBzZXJ2ZXJcclxuICByZW5kZXIoZGVmYXVsdHMuc2VsZWN0b3JzLnNlY3Rpb25zR3JvdXAsIGdldFNrZWxldG9uKTtcclxuXHJcbiAgLy8gYmFubmVyIHNsaWRlcyBJbml0aWFsIFxyXG4gIHNob3dTbGlkZXMoKTtcclxuXHJcbiAgLy8gR2V0IHJlc291cmNlcyBmcm9tIHRoZSBzZXJ2aWNlIHNpZGVcclxuICBzZXJ2aWNlLmdldEFsbCgpLnRoZW4oKHJlc291cmNlcykgPT4ge1xyXG4gICAgaW5pdChyZXNvdXJjZXMpO1xyXG4gIH0pO1xyXG5cclxuICB0aGF0LmluaXQgPSBpbml0O1xyXG4gIHRoYXQuZGVzdG9yeSA9IGRlc3Rvcnk7XHJcbiAgXHJcbiAgcmV0dXJuIHRoYXQ7XHJcbn0pKCk7XHJcbiIsIkZ1bmN0aW9uLnByb3RvdHlwZS5tZXRob2QgPSBmdW5jdGlvbihuYW1lLCBmdW5jKSB7XHJcbiAgaWYgKHRoaXMucHJvdG90eXBlW25hbWVdKSByZXR1cm47XHJcbiAgdGhpcy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ29tcG9uZW50ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgdGFibGUgb2YgY29udGVudHMgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVXNlciBvcHRpb25zIFxyXG4gICAqL1xyXG4gIHZhciBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnJlc291cmNlcyA9IG9wdGlvbnMucmVzb3VyY2VzO1xyXG4gICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBDb25zdHJ1Y3Rvci5tZXRob2QoJ3JlbmRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcclxuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGhpcy5oYW5kbGVUZW1wbGF0ZSh0aGlzLnJlc291cmNlcyk7XHJcbiAgfSlcclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdoYW5kbGVUZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yZXNvdXJjZXNcclxuICAgICAgLm1hcChyZXNvdXJjZSA9PiB0aGlzLnRlbXBsYXRlKHJlc291cmNlKSlcclxuICAgICAgLmpvaW4oJycpXHJcbiAgfSlcclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdzZXREYXRhJywgZnVuY3Rpb24ob2JqKSB7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydGllcyhrZXkpKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSBvYmpba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfSlcclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdnZXREYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnBhcnNlKE9iamVjdC5zdHJpbmdpZnkodGhpcy5yZXNvdXJjZXMpKTtcclxuICB9KVxyXG5cclxuICByZXR1cm4gQ29uc3RydWN0b3I7XHJcbn0pKCk7IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuY29uc3QgYmFzZVVybCA9ICcvLm5ldGxpZnkvZnVuY3Rpb25zL2FwaS9yZXNvdXJjZXMnO1xyXG5cclxuY29uc3QgZ2V0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLmdldChiYXNlVXJsKTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGUgPSBmdW5jdGlvbihuZXdPYmplY3QpIHtcclxuICBjb25zdCByZXF1ZXN0ID0gYXhpb3MucG9zdChiYXNlVXJsLCBuZXdPYmplY3QpO1xyXG4gIHJldHVybiByZXF1ZXN0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuZGF0YSk7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKGlkLCBuZXdPYmplY3QpIHtcclxuICBjb25zdCByZXF1ZXN0ID0gYXhpb3MucHV0KGAke2Jhc2VVcmx9LyR7aWR9YCwgbmV3T2JqZWN0KTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldEFsbCwgY3JlYXRlLCB1cGRhdGUgfTtcclxuIiwiZXhwb3J0IGNvbnN0IG5vZGVMaXN0ID0ge1xyXG4gIGxlZnRDb250cm9sTWVudTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfY29udHJvbF9tZW51JyksXHJcbiAgbGVmdE1lbnVPdmVybGF5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdF9tZW51X292ZXJsYXknKSxcclxuICBzZWN0aW9uSXRlbXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWN0aW9uX2dyb3VwcycpLFxyXG4gIGxlZnRNZW51SXRlbXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsZWZ0X21lbnVfaXRlbXMnKSxcclxuICBodG1sOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXHJcbiAgYm9keTogZG9jdW1lbnQuYm9keSxcclxuICBsZWZ0TWVudTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfbWVudScpLFxyXG4gIHJlc2l6ZUhhbmRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2l6ZV9oYW5kbGUnKSxcclxuICBtYWluQ29udGVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fY29udGVudCcpLFxyXG4gIHByZXY6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2JyksXHJcbiAgbmV4dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHQnKSxcclxuICBkb3RXcmFwcGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZG90LXdyYXBwZXInKVxyXG59XHJcblxyXG4gIC8vIEdlbmVyYXRlIGEgaXRlbSBvZiB0aGUgbmF2aWdhdGlvblxyXG5leHBvcnQgY29uc3QgZ2V0TWVudUl0ZW1zID0gY2F0ZWdvcnkgPT4gYFxyXG4gIDxsaSBjbGFzcz1cImxlZnRfbWVudV9pdGVtXCI+XHJcbiAgICA8YSBocmVmPVwiIyR7Y2F0ZWdvcnl9XCI+IFxyXG4gICAgICA8aW1nIGNsYXNzPVwibWVudV9pdGVtX2ljb25cIiBzcmM9XCIuL3N2Zy8ke2NhdGVnb3J5fS5zdmdcIiBhbHQ9XCJUaGlzIGlzIGEgJHtjYXRlZ29yeX0gY2F0ZWdvcnlcIj48L2ltZz5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW51X2l0ZW1fY29udGVudFwiPiR7Y2F0ZWdvcnl9PC9zcGFuPlxyXG4gICAgPC9hPlxyXG4gIDwvbGk+XHJcbmA7XHJcblxyXG4gIC8vIEdlbmVyYXRlIGEgc2VjdGlvbiBvZiB0aGUgbWFpbiBjb250ZW50XHJcbmV4cG9ydCBjb25zdCBnZXRTZWN0aW9ucyA9IGNhdGVnb3J5ID0+IGBcclxuICA8c2VjdGlvbiBpZD1cIiR7Y2F0ZWdvcnl9XCIgY2xhc3M9XCJncm91cFwiID5cclxuICAgIDxoMiBjbGFzcz1cImdyb3VwX3RpdGxlXCI+JHtjYXRlZ29yeX08L2gyPlxyXG4gICAgPGRpdiBjbGFzcz1cImdyb3VwX2NvbnRlbnRcIj5cclxuICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+PC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj4gIFxyXG5gO1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhIGxpc3Qgb2YgdGhlIHNlY3Rpb24gXHJcbmV4cG9ydCBjb25zdCBnZXRDYXJkcyA9IHJlc291cmNlID0+IGBcclxuICA8bGkgY2xhc3M9XCJncm91cF9pdGVtIGNvbDNcIj5cclxuICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCIgaHJlZj1cIiR7cmVzb3VyY2UuaHJlZn1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZF9pY29uXCIgc3JjPVwiJHtyZXNvdXJjZS5zcmN9XCIgYWx0PVwiJHtyZXNvdXJjZS5zcmMucmVwbGFjZSgvXFwuXFwvaW1nXFwvL2csICcnKX1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9ib2R5XCI+XHJcbiAgICAgICAgICA8aDMgY2xhc3M9XCJjYXJkX3RpdGxlXCI+JHtyZXNvdXJjZS50aXRsZX08L2gzPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHRcIj4ke3Jlc291cmNlLmNvbnRlbnR9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvYT5cclxuICA8L2xpPlxyXG5gOyIsIi8vIFJlcHJlc2VudCB0aGUgbGVmdCBtZW51IG9wZW5pbmcgb3IgY2xvc2luZ1xyXG4vLyBUcnVlIG1lYW5zIGl0J3Mgb3BlbmluZ1xyXG5sZXQgaXNBY3RpdmUgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlTWVudShub2RlbGlzdCwgY2xhc3Nlcykge1xyXG4gIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudUhpZGRlbjtcclxuICBub2RlbGlzdC5sZWZ0TWVudU92ZXJsYXkuY2xhc3NOYW1lID0gY2xhc3Nlcy5leGl0RG9uZTtcclxuICBpc0FjdGl2ZSA9IHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVPdmVybGF5IChub2RlbGlzdCwgY2xhc3Nlcykge1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgbm9kZWxpc3QuaHRtbC5jbGFzc05hbWUgPSBjbGFzc2VzLmxlZnRNZW51U2hvdztcclxuICAgICAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZW50ZXJEb25lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9kZWxpc3QuaHRtbC5jbGFzc05hbWUgPSBjbGFzc2VzLmxlZnRNZW51SGlkZGVuO1xyXG4gICAgICBub2RlbGlzdC5sZWZ0TWVudU92ZXJsYXkuY2xhc3NOYW1lID0gY2xhc3Nlcy5leGl0RG9uZTtcclxuICAgIH1cclxuXHJcbiAgICBpc0FjdGl2ZSA9ICFpc0FjdGl2ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVNZW51KG5vZGVsaXN0LCBjbGFzc2VzKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKG5vZGVsaXN0Lmh0bWwuY2xpZW50V2lkdGggPCA3NTApIHtcclxuICAgICAgaGlkZU1lbnUobm9kZWxpc3QsIGNsYXNzZXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbm9kZWxpc3QuaHRtbC5jbGFzc05hbWUgPSBjbGFzc2VzLmxlZnRNZW51U2hvdztcclxuICAgICAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZW50ZXJEb25lO1xyXG4gICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgcmVzaXplID0gKGZ1bmN0aW9uKCkge1xyXG4gIGxldCBzZXR0aW5ncztcclxuXHJcbiAgY29uc3QgdGhhdCA9IHt9OyBcclxuICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgIHNpemVzOiB7XHJcbiAgICAgIG1heFdpZHRoOiA0MjUsXHJcbiAgICAgIG1pbldpZHRoOiAyMDAsXHJcbiAgICAgIHg6IDI1MFxyXG4gICAgfSxcclxuICB9XHJcblxyXG4gIC8vIEluaXRzIGFuZCBFdmVudHNcclxuICBjb25zdCBpbml0aWFsaXplID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge30gXHJcbiAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBtZXRob2RzXHJcbiAgICBjb25zdCBtb3ZlQXQgPSBmdW5jdGlvbih4KSB7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0LmxlZnRNZW51LnN0eWxlLndpZHRoID0geCArICdweCc7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0LnJlc2l6ZUhhbmRsZS5zdHlsZS5sZWZ0ID0geCArICdweCc7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0Lm1haW5Db250ZW50LnN0eWxlLm1hcmdpbkxlZnQgPSB4ICsgJ3B4JztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlVXAgPSBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5sZWZ0TWVudS5jbGFzc0xpc3QucmVtb3ZlKCd0cmFuc2l0aW9uX25vbmUnKTtcclxuICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubWFpbkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9fdXNlcl9zZWxlY3Rpb24nKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IGxlZnRNZW51V2lkdGggPSBwYXJzZUludChzZXR0aW5ncy5ub2RlTGlzdC5sZWZ0TWVudS5zdHlsZS53aWR0aCwgMTApO1xyXG4gICAgICBpZiAobGVmdE1lbnVXaWR0aCA+IHNldHRpbmdzLnNpemVzLm1heFdpZHRoIHx8IGxlZnRNZW51V2lkdGggPCBzZXR0aW5ncy5zaXplcy5taW5XaWR0aCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgfSBlbHNlIGlmIChsZWZ0TWVudVdpZHRoIDw9IHNldHRpbmdzLnNpemVzLm1heFdpZHRoICYmIGxlZnRNZW51V2lkdGggPj0gc2V0dGluZ3Muc2l6ZXMubWluV2lkdGgpIHtcclxuICAgICAgICBzZXR0aW5ncy5ub2RlTGlzdC5sZWZ0TWVudS5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uX25vbmUnKTtcclxuICAgICAgICBzZXR0aW5ncy5ub2RlTGlzdC5tYWluQ29udGVudC5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uX25vbmUnKTtcclxuICAgICAgICBzZXR0aW5ncy5ub2RlTGlzdC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vX3VzZXJfc2VsZWN0aW9uJyk7XHJcbiAgICAgICAgbW92ZUF0KGV2ZW50LnBhZ2VYKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LnJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XHJcblxyXG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0pXHJcblxyXG4gICAgc2V0dGluZ3Mubm9kZUxpc3QucmVzaXplSGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIG1vdmVBdChzZXR0aW5ncy5zaXplcy54KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEluaXRpYWwgXHJcbiAgICBtb3ZlQXQoc2V0dGluZ3Muc2l6ZXMueCk7XHJcbiAgfVxyXG5cclxuICB0aGF0LmluaXRpYWxpemUgPSBpbml0aWFsaXplO1xyXG5cclxuICByZXR1cm4gdGhhdDtcclxufSkoKTsiLCIvKipcclxuICogXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXRUaGUgaGVpZ2h0IG9mIGJvdGggdG9wYmFyIGFuZCBncm91cCBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2Nyb2xsSGFuZGxlciA9IGZ1bmN0aW9uKG9mZnNldCkge1xyXG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGhyZWYgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgY29uc3Qgb2Zmc2V0VG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtocmVmfWApLm9mZnNldFRvcDtcclxuICAgIHNjcm9sbCh7XHJcbiAgICAgIHRvcDogb2Zmc2V0VG9wIC0gb2Zmc2V0LFxyXG4gICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiY29uc3QgbWFrZUl0ZW1zID0gKCkgPT4ge1xyXG4gIGxldCBpdGVtcyA9ICcnO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgIGl0ZW1zICs9IGBcclxuICAgICAgPGxpIGNsYXNzPVwiZ3JvdXBfaXRlbSBjb2wzXCI+XHJcbiAgICAgICAgPGEgY2xhc3M9XCJncm91cF9pdGVtX2xpbmtcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX2ljb24gbG9hZGluZ1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9ib2R5XCI+XHJcbiAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF90aXRsZSBsb2FkaW5nXCI+PC9oND5cclxuICAgICAgICAgICAgICA8cCBjbGFzcz1cImNhcmRfdGV4dCBsb2FkaW5nXCI+PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgIGA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaXRlbXM7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTa2VsZXRvbiA9ICgpID0+IGBcclxuICA8c2VjdGlvbiBjbGFzcz1cImdyb3VwXCIgPlxyXG4gICAgPGgzIGNsYXNzPVwiZ3JvdXBfdGl0bGUgbG9hZGluZ1wiPjwvaDM+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBfY29udGVudFwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJyb3cgZ3JvdXBfaXRlbXNcIj5cclxuICAgICAgICAke21ha2VJdGVtcygpfVxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9zZWN0aW9uPlxyXG5gO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihzZWxlY3RvciwgdGVtcGxhdGUpIHtcclxuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gIHRhcmdldC5pbm5lckhUTUwgPSB0ZW1wbGF0ZSgpO1xyXG59IiwibGV0IHNob3dsaWRlSW5kZXggPSAxO1xyXG5cclxuY29uc3QgaGFuZGxlQmFubmVyID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICBjb25zdCBzbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVzJyk7XHJcbiAgY29uc3QgZG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb3QnKTtcclxuXHJcbiAgaWYgKCFzbGlkZXMpIHJldHVybjtcclxuICBpZighZG90cykgcmV0dXJuO1xyXG5cclxuICBjb25zdCBsZW4gPSBzbGlkZXMubGVuZ3RoO1xyXG4gIFxyXG4gIGNhbGxiYWNrKGxlbik7XHJcblxyXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgc2xpZGVzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBkb3RzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgc2xpZGVzW3Nob3dsaWRlSW5kZXggLSAxXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBkb3RzW3Nob3dsaWRlSW5kZXggLSAxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTbGlkZXMobiA9IDEpIHtcclxuICByZXR1cm4gaGFuZGxlQmFubmVyKGZ1bmN0aW9uKGxlbikge1xyXG4gICAgc2hvd2xpZGVJbmRleCA9IG4gPiBsZW4gPyAxIDogbiA8IDEgPyBsZW4gOiBzaG93bGlkZUluZGV4O1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b1Nob3dTbGlkZXMoKSB7XHJcbiAgaGFuZGxlQmFubmVyKGZ1bmN0aW9uKGxlbikge1xyXG4gICAgc2hvd2xpZGVJbmRleCA9IHNob3dsaWRlSW5kZXggPiBsZW4gPyAxIDogc2hvd2xpZGVJbmRleDtcclxuICB9KTtcclxuXHJcbiAgc2V0VGltZW91dChhdXRvU2hvd1NsaWRlcywgNDAwMCk7XHJcbiAgc2hvd2xpZGVJbmRleCsrO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGx1c1NsaWRlcyhuKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgc2hvd1NsaWRlcyhzaG93bGlkZUluZGV4ICs9IG4pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRTbGlkZShuKSB7XHJcbiAgc2hvd1NsaWRlcyhzaG93bGlkZUluZGV4ID0gbik7XHJcbn0iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dmQyVmljR0ZqYXk5aWIyOTBjM1J5WVhBaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJsdVpHVjRMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdllXUmhjSFJsY25NdmVHaHlMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdllYaHBiM011YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOWpZVzVqWld3dlEyRnVZMlZzTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMkZ1WTJWc0wwTmhibU5sYkZSdmEyVnVMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyRnVZMlZzTDJselEyRnVZMlZzTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMjl5WlM5QmVHbHZjeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyTnZjbVV2U1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMjl5WlM5aWRXbHNaRVoxYkd4UVlYUm9MbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlqY21WaGRHVkZjbkp2Y2k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMk52Y21VdlpHbHpjR0YwWTJoU1pYRjFaWE4wTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMjl5WlM5bGJtaGhibU5sUlhKeWIzSXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5amIzSmxMMjFsY21kbFEyOXVabWxuTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMjl5WlM5elpYUjBiR1V1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOWpiM0psTDNSeVlXNXpabTl5YlVSaGRHRXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5a1pXWmhkV3gwY3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMmhsYkhCbGNuTXZZbWx1WkM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMmhsYkhCbGNuTXZZblZwYkdSVlVrd3Vhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5b1pXeHdaWEp6TDJOdmJXSnBibVZWVWt4ekxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlqYjI5cmFXVnpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdmFHVnNjR1Z5Y3k5cGMwRmljMjlzZFhSbFZWSk1MbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdmFHVnNjR1Z5Y3k5cGMxVlNURk5oYldWUGNtbG5hVzR1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOW9aV3h3WlhKekwyNXZjbTFoYkdsNlpVaGxZV1JsY2s1aGJXVXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5b1pXeHdaWEp6TDNCaGNuTmxTR1ZoWkdWeWN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJobGJIQmxjbk12YzNCeVpXRmtMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdmRYUnBiSE11YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwzQnliMk5sYzNNdlluSnZkM05sY2k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12YldGcGJpNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmJXOWtaV3h6TDBOdmJYQnZibVZ1ZEM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12YzJWeWRtbGpaWE12Y21WemIzVnlZMlZ6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDNOeVl5OXFjeTkyYVdWM2N5OUVUMDFGYkdWdFpXNTBjeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZkbWxsZDNNdmFHRnVaR3hsVFdWdWRTNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmRtbGxkM012Y21WemFYcGxMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OTJhV1YzY3k5elkzSnZiR3hVYnk1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12ZG1sbGQzTXZjMnRsYkdWMGIyNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZjM0pqTDJwekwzWnBaWGR6TDNOc2FXUmxjeTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzFGQlFVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPMUZCUTBFN096dFJRVWRCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3d1EwRkJNRU1zWjBOQlFXZERPMUZCUXpGRk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2QwUkJRWGRFTEd0Q1FVRnJRanRSUVVNeFJUdFJRVU5CTEdsRVFVRnBSQ3hqUVVGak8xRkJReTlFT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRU3g1UTBGQmVVTXNhVU5CUVdsRE8xRkJRekZGTEdkSVFVRm5TQ3h0UWtGQmJVSXNSVUZCUlR0UlFVTnlTVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMREpDUVVFeVFpd3dRa0ZCTUVJc1JVRkJSVHRSUVVOMlJDeHBRMEZCYVVNc1pVRkJaVHRSUVVOb1JEdFJRVU5CTzFGQlEwRTdPMUZCUlVFN1VVRkRRU3h6UkVGQmMwUXNLMFJCUVN0RU96dFJRVVZ5U0R0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3pzN096czdPenM3T3pzN1FVTnNSa0VzYVVKQlFXbENMRzFDUVVGUExFTkJRVU1zYzBSQlFXRXNSVHM3T3pzN096czdPenM3TzBGRFFYcENPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHRCUVVOb1F5eGhRVUZoTEcxQ1FVRlBMRU5CUVVNc2FVVkJRV3RDTzBGQlEzWkRMR05CUVdNc2JVSkJRVThzUTBGQlF5eDVSVUZCYzBJN1FVRkROVU1zWlVGQlpTeHRRa0ZCVHl4RFFVRkRMREpGUVVGMVFqdEJRVU01UXl4dlFrRkJiMElzYlVKQlFVOHNRMEZCUXl3MlJVRkJkVUk3UVVGRGJrUXNiVUpCUVcxQ0xHMUNRVUZQTEVOQlFVTXNiVVpCUVRKQ08wRkJRM1JFTEhOQ1FVRnpRaXh0UWtGQlR5eERRVUZETEhsR1FVRTRRanRCUVVNMVJDeHJRa0ZCYTBJc2JVSkJRVThzUTBGQlF5eDVSVUZCY1VJN08wRkJSUzlETzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzTkVOQlFUUkRPMEZCUXpWRE96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JT3pzN096czdPenM3T3pzN08wRkRiRXhoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHJSRUZCVXp0QlFVTTNRaXhYUVVGWExHMUNRVUZQTEVOQlFVTXNaMFZCUVdkQ08wRkJRMjVETEZsQlFWa3NiVUpCUVU4c1EwRkJReXcwUkVGQll6dEJRVU5zUXl4clFrRkJhMElzYlVKQlFVOHNRMEZCUXl4M1JVRkJiMEk3UVVGRE9VTXNaVUZCWlN4dFFrRkJUeXhEUVVGRExIZEVRVUZaT3p0QlFVVnVRenRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1dVRkJXU3hOUVVGTk8wRkJRMnhDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxHVkJRV1VzYlVKQlFVOHNRMEZCUXl4clJVRkJhVUk3UVVGRGVFTXNiMEpCUVc5Q0xHMUNRVUZQTEVOQlFVTXNORVZCUVhOQ08wRkJRMnhFTEdsQ1FVRnBRaXh0UWtGQlR5eERRVUZETEhORlFVRnRRanM3UVVGRk5VTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hsUVVGbExHMUNRVUZQTEVOQlFVTXNiMFZCUVd0Q096dEJRVVY2UXpzN1FVRkZRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEY0VSaE96dEJRVVZpTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhSUVVGUk8wRkJRMjVDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHM3T3pzN096czdPenM3T3p0QlEyeENZVHM3UVVGRllpeGhRVUZoTEcxQ1FVRlBMRU5CUVVNc01rUkJRVlU3TzBGQlJTOUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFRRVUZUTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3T3pzN096czdPenM3T3p0QlEzaEVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOS1lUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdRVUZEYUVNc1pVRkJaU3h0UWtGQlR5eERRVUZETEhsRlFVRnhRanRCUVVNMVF5eDVRa0ZCZVVJc2JVSkJRVThzUTBGQlF5eHBSa0ZCYzBJN1FVRkRka1FzYzBKQlFYTkNMRzFDUVVGUExFTkJRVU1zTWtWQlFXMUNPMEZCUTJwRUxHdENRVUZyUWl4dFFrRkJUeXhEUVVGRExHMUZRVUZsT3p0QlFVVjZRenRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3huUkVGQlowUTdRVUZEYUVRN1FVRkRRVHRCUVVOQkxIbENRVUY1UWp0QlFVTjZRaXhMUVVGTE8wRkJRMHc3UVVGRFFTeERRVUZET3p0QlFVVkVPMEZCUTBFN1FVRkRRVHRCUVVOQkxHZEVRVUZuUkR0QlFVTm9SRHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVN4RFFVRkRPenRCUVVWRU96czdPenM3T3pzN096czdPMEZET1VaaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXh4UkVGQldUczdRVUZGYUVNN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1UwRkJVenRCUVVOd1FpeFhRVUZYTEZOQlFWTTdRVUZEY0VJN1FVRkRRU3haUVVGWkxFOUJRVTg3UVVGRGJrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFRRVUZUTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0RzN1FVRkZRVHM3T3pzN096czdPenM3T3p0QlEyNUVZVHM3UVVGRllpeHZRa0ZCYjBJc2JVSkJRVThzUTBGQlF5eHRSa0ZCTUVJN1FVRkRkRVFzYTBKQlFXdENMRzFDUVVGUExFTkJRVU1zSzBWQlFYZENPenRCUVVWc1JEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExFOUJRVTg3UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTnVRbUU3TzBGQlJXSXNiVUpCUVcxQ0xHMUNRVUZQTEVOQlFVTXNjVVZCUVdkQ096dEJRVVV6UXp0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1RVRkJUVHRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3TzBGRGFrSmhPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHRCUVVOb1F5eHZRa0ZCYjBJc2JVSkJRVThzUTBGQlF5eDFSVUZCYVVJN1FVRkROME1zWlVGQlpTeHRRa0ZCVHl4RFFVRkRMSFZGUVVGdlFqdEJRVU16UXl4bFFVRmxMRzFDUVVGUExFTkJRVU1zZVVSQlFXRTdPMEZCUlhCRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMQ3RDUVVFclFqdEJRVU12UWl4MVEwRkJkVU03UVVGRGRrTTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4SFFVRkhPMEZCUTBnN096czdPenM3T3pzN096czdRVU01UldFN08wRkJSV0k3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4TlFVRk5PMEZCUTJwQ0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEUxQlFVMDdRVUZEYmtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRla05oT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHRSRUZCVlRzN1FVRkZPVUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1QwRkJUenRCUVVOd1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRUQ3d5UWtGQk1rSTdRVUZETTBJc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3TzBGQlJVRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRM1JHWVRzN1FVRkZZaXhyUWtGQmEwSXNiVUpCUVU4c1EwRkJReXh0UlVGQlpUczdRVUZGZWtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFRRVUZUTzBGQlEzQkNMRmRCUVZjc1UwRkJVenRCUVVOd1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0R0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVONFFtRTdPMEZCUldJc1dVRkJXU3h0UWtGQlR5eERRVUZETEhGRVFVRlpPenRCUVVWb1F6dEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMR05CUVdNN1FVRkRla0lzVjBGQlZ5eE5RVUZOTzBGQlEycENMRmRCUVZjc1pVRkJaVHRCUVVNeFFpeGhRVUZoTEVWQlFVVTdRVUZEWmp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0R0QlFVTkJPenM3T3pzN096czdPenM3TzBGRGJrSkJMQ3REUVVGaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXhyUkVGQlV6dEJRVU0zUWl3d1FrRkJNRUlzYlVKQlFVOHNRMEZCUXl3NFJrRkJLMEk3TzBGQlJXcEZPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNZMEZCWXl4dFFrRkJUeXhEUVVGRExHZEZRVUZuUWp0QlFVTjBReXhIUVVGSE8wRkJRMGc3UVVGRFFTeGpRVUZqTEcxQ1FVRlBMRU5CUVVNc2FVVkJRV2xDTzBGQlEzWkRPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNkMFZCUVhkRk8wRkJRM2hGTzBGQlEwRTdRVUZEUVR0QlFVTkJMSFZFUVVGMVJEdEJRVU4yUkR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUExGbEJRVms3UVVGRGJrSTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNRMEZCUXpzN1FVRkZSRHRCUVVOQk8wRkJRMEVzUTBGQlF6czdRVUZGUkRzN096czdPenM3T3pzN096czdRVU5xUjJFN08wRkJSV0k3UVVGRFFUdEJRVU5CTzBGQlEwRXNiVUpCUVcxQ0xHbENRVUZwUWp0QlFVTndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRWbUU3TzBGQlJXSXNXVUZCV1N4dFFrRkJUeXhEUVVGRExIRkVRVUZaT3p0QlFVVm9RenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTlCUVU4N1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0R0QlFVTkJMRWRCUVVjN1FVRkRTRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVQ3hMUVVGTE96dEJRVVZNTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTnlSV0U3TzBGQlJXSTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExFOUJRVTg3UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEWW1FN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMSEZFUVVGWk96dEJRVVZvUXp0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzTUVOQlFUQkRPMEZCUXpGRExGTkJRVk03TzBGQlJWUTdRVUZEUVN3MFJFRkJORVFzZDBKQlFYZENPMEZCUTNCR08wRkJRMEVzVTBGQlV6czdRVUZGVkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPMEZCUTBFc2EwTkJRV3RETzBGQlEyeERMQ3RDUVVFclFpeGhRVUZoTEVWQlFVVTdRVUZET1VNN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREczdPenM3T3pzN096czdPenRCUTNCRVlUczdRVUZGWWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3TzBGRFltRTdPMEZCUldJc1dVRkJXU3h0UWtGQlR5eERRVUZETEhGRVFVRlpPenRCUVVWb1F6dEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hqUVVGakxFOUJRVTg3UVVGRGNrSXNaMEpCUVdkQ08wRkJRMmhDTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNZMEZCWXl4UFFVRlBPMEZCUTNKQ0xHZENRVUZuUWl4UlFVRlJPMEZCUTNoQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHM3T3pzN096czdPenM3T3p0QlEyNUZZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2JVUkJRVlU3TzBGQlJUbENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0RzN096czdPenM3T3pzN096dEJRMWhoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExFOUJRVTg3UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTEdsQ1FVRnBRaXhsUVVGbE96dEJRVVZvUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hQUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnpzN1FVRkZTRHRCUVVOQk96czdPenM3T3pzN096czdPMEZEY0VSaE96dEJRVVZpTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3dyUWtGQkswSTdRVUZETDBJN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWl4aFFVRmhPMEZCUTJJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRNVUpoT3p0QlFVVmlMRmRCUVZjc2JVSkJRVThzUTBGQlF5eG5SVUZCWjBJN08wRkJSVzVET3p0QlFVVkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzV1VGQldTeFJRVUZSTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTlCUVU4N1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExHRkJRV0U3UVVGRGVFSXNWMEZCVnl4VFFVRlRPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3h0UTBGQmJVTXNUMEZCVHp0QlFVTXhRenRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVFrRkJkVUlzVTBGQlV5eEhRVUZITEZOQlFWTTdRVUZETlVNc01rSkJRVEpDTzBGQlF6TkNPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRUQ3cwUWtGQk5FSTdRVUZETlVJc1MwRkJTenRCUVVOTU8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVRzN1FVRkZRU3gxUTBGQmRVTXNUMEZCVHp0QlFVTTVRenRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WlFVRlpMRTlCUVU4N1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmxCUVZrc1QwRkJUenRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096czdPenM3T3pzN096dEJRemxXUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFRRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNVMEZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CTEVOQlFVTTdRVUZEUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFc1UwRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenM3UVVGSlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzZFVKQlFYVkNMSE5DUVVGelFqdEJRVU0zUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIRkNRVUZ4UWp0QlFVTnlRanM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFc2NVTkJRWEZET3p0QlFVVnlRenRCUVVOQk8wRkJRMEU3TzBGQlJVRXNNa0pCUVRKQ08wRkJRek5DTzBGQlEwRTdRVUZEUVR0QlFVTkJMRFJDUVVFMFFpeFZRVUZWT3pzN096czdPenM3T3pzN08wRkRka3gwUXp0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCSzBNN1FVRkRjME03UVVGRE9VSTdRVUZEV2p0QlFVTTRRanRCUVVONFFqdEJRVU5VTzBGQlF6aERPenRCUVVWMFJqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1lVRkJZU3hQUVVGUE8wRkJRM0JDTEdGQlFXRXNUVUZCVFR0QlFVTnVRaXhoUVVGaExGTkJRVk03UVVGRGRFSTdRVUZEUVR0QlFVTkJMR1ZCUVdVc01rUkJRVk03UVVGRGVFSTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRU3dyUWtGQkswSTdPMEZCUlM5Q08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2FVVkJRV2xGTEN0RVFVRlpPenRCUVVVM1JUdEJRVU5CTEdkRlFVRm5SU3c0UkVGQlZ6czdRVUZGTTBVN1FVRkRRVHRCUVVOQkxESkNRVUV5UWl4VFFVRlRPenRCUVVWd1F6dEJRVU5CTzBGQlEwRTdRVUZEUVN4NVEwRkJlVU1zTWtSQlFWRTdRVUZEYWtRc1MwRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxIVkRRVUYxUXl4eFJVRkJZVHRCUVVOd1JEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWenM3UVVGRldEdEJRVU5CTEZOQlFWTTdRVUZEVkR0QlFVTkJMRXRCUVVzN096dEJRVWRNTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFbEJRVWtzYjBWQlFWVXNRMEZCUXl3eVJFRkJVVHM3UVVGRmRrSTdRVUZEUVN4SlFVRkpMRzlFUVVGTkxHRkJRV0VzVjBGQlZ5d3lSRUZCVVN4RlFVRkZPenRCUVVVMVF6dEJRVU5CTEVsQlFVa3NiMFZCUVdNN1FVRkRiRUlzU1VGQlNTd3lSRUZCVVN4blEwRkJaME1zWjBWQlFWVTdRVUZEZEVRc1NVRkJTU3d5UkVGQlVTeG5RMEZCWjBNc1owVkJRVlU3UVVGRGRFUXNTVUZCU1N3eVJFRkJVVHRCUVVOYU8wRkJRMEU3UVVGRFFTeE5RVUZOTEd0RlFVRlpPMEZCUTJ4Q0xFdEJRVXM3TzBGQlJVd3NTVUZCU1N3eVJFRkJVU3d5UTBGQk1rTXNkVVZCUVdFc1EwRkJReXd5UkVGQlVUdEJRVU0zUlN4SlFVRkpMREpFUVVGUkxESkRRVUV5UXl4MVJVRkJZU3hEUVVGRExESkVRVUZST3p0QlFVVTNSU3hKUVVGSkxESkVRVUZSTzBGQlExbzdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFTeEpRVUZKTERKRVFVRlJPMEZCUTFvc1ZVRkJWU3d5UkVGQlVUdEJRVU5zUWl4UlFVRlJMR3RGUVVGUkxFTkJRVU1zTWtSQlFWRTdRVUZEZWtJN1FVRkRRU3hMUVVGTE96dEJRVVZNT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEVWQlFVVXNPRVJCUVUwc2JVTkJRVzFETERKRVFVRlhPenRCUVVWMFJEdEJRVU5CTEVWQlFVVXNaMFZCUVZVN08wRkJSVm83UVVGRFFTeEZRVUZGTERKRVFVRlBPMEZCUTFRN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hEUVVGRE96czdPenM3T3pzN096czdPMEZEY0V4RU8wRkJRVUU3UVVGQlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWUE96dEJRVVZRTzBGQlEwRTdRVUZEUVN4aFFVRmhMRTlCUVU4N1FVRkRjRUlzWVVGQllTeFBRVUZQTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRU3hEUVVGRExFazdPenM3T3pzN096czdPenRCUTJoRVJEdEJRVUZCTzBGQlFVRTdRVUZCTUVJN1FVRkRNVUk3TzBGQlJVRTdRVUZEUVN4clFrRkJhMElzTkVOQlFVczdRVUZEZGtJN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEd0Q1FVRnJRaXcwUTBGQlN6dEJRVU4yUWp0QlFVTkJPenRCUVVWQk8wRkJRMEVzYTBKQlFXdENMRFJEUVVGTExGRkJRVkVzVVVGQlVTeEhRVUZITEVkQlFVYzdRVUZETjBNN1FVRkRRVHM3UVVGRlpTeG5SVUZCUXl4NVFrRkJlVUlzUlVGQlF6czdPenM3T3pzN096czdPenRCUTJ4Q01VTTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRUenRCUVVOUU8wRkJRMEVzWjBKQlFXZENMRk5CUVZNN1FVRkRla0lzSzBOQlFTdERMRk5CUVZNc2RVSkJRWFZDTEZOQlFWTTdRVUZEZUVZc2QwTkJRWGRETEZOQlFWTTdRVUZEYWtRN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwODdRVUZEVUN4cFFrRkJhVUlzVTBGQlV6dEJRVU14UWl3NFFrRkJPRUlzVTBGQlV6dEJRVU4yUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwODdRVUZEVUR0QlFVTkJMSFZEUVVGMVF5eGpRVUZqTzBGQlEzSkVPMEZCUTBFc2MwTkJRWE5ETEdGQlFXRXNVMEZCVXl4MVEwRkJkVU03UVVGRGJrYzdRVUZEUVN4dFEwRkJiVU1zWlVGQlpUdEJRVU5zUkN4cFEwRkJhVU1zYVVKQlFXbENPMEZCUTJ4RU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSVHM3T3pzN096czdPenM3TzBGRGFFUkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGRFFUdEJRVU5CT3p0QlFVVlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMnhEUVR0QlFVRkJPMEZCUVU4N1FVRkRVRHM3UVVGRlFTeHJRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N08wRkJSVUU3UVVGRFFUdEJRVU5CTERKQ08wRkJRMEVzSzBKQlFTdENPenRCUVVVdlFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVQ3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQkxFTkJRVU1zU1RzN096czdPenM3T3pzN08wRkRha1ZFTzBGQlFVRTdRVUZCUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTzBGQlEwODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRU3huUkVGQlowUXNTMEZCU3p0QlFVTnlSRHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVN4RE96czdPenM3T3pzN096czdRVU5rUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVOQk96dEJRVVZCTEdsQ1FVRnBRaXhSUVVGUk8wRkJRM3BDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlZUdEJRVU5XTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRXNRenM3T3pzN096czdPenM3TzBGRGNrTkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHM3UVVGRlFTeG5Ra0ZCWjBJc1UwRkJVenRCUVVONlFqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHM3UVVGRlR6dEJRVU5RTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFUczdRVUZGVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVN4RElpd2labWxzWlNJNklqSTBPVEptWlRRNU9XWXlOMkUwTW1Rd01HUTVMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwSUh0Y2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmlCY2RGeDBmVnh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBhVG9nYlc5a2RXeGxTV1FzWEc0Z1hIUmNkRngwYkRvZ1ptRnNjMlVzWEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMxY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaR1ZtYVc1bElHZGxkSFJsY2lCbWRXNWpkR2x2YmlCbWIzSWdhR0Z5Ylc5dWVTQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SekxDQnVZVzFsTENCblpYUjBaWElwSUh0Y2JpQmNkRngwYVdZb0lWOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieWhsZUhCdmNuUnpMQ0J1WVcxbEtTa2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCdVlXMWxMQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUdkbGREb2daMlYwZEdWeUlIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1gxOWxjMDF2WkhWc1pTQnZiaUJsZUhCdmNuUnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuSWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpLU0I3WEc0Z1hIUmNkR2xtS0hSNWNHVnZaaUJUZVcxaWIyd2dJVDA5SUNkMWJtUmxabWx1WldRbklDWW1JRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeWtnZTF4dUlGeDBYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY3NJSHNnZG1Gc2RXVTZJQ2ROYjJSMWJHVW5JSDBwTzF4dUlGeDBYSFI5WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENBblgxOWxjMDF2WkhWc1pTY3NJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmpjbVZoZEdVZ1lTQm1ZV3RsSUc1aGJXVnpjR0ZqWlNCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQXhPaUIyWVd4MVpTQnBjeUJoSUcxdlpIVnNaU0JwWkN3Z2NtVnhkV2x5WlNCcGRGeHVJRngwTHk4Z2JXOWtaU0FtSURJNklHMWxjbWRsSUdGc2JDQndjbTl3WlhKMGFXVnpJRzltSUhaaGJIVmxJR2x1ZEc4Z2RHaGxJRzV6WEc0Z1hIUXZMeUJ0YjJSbElDWWdORG9nY21WMGRYSnVJSFpoYkhWbElIZG9aVzRnWVd4eVpXRmtlU0J1Y3lCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQTRmREU2SUdKbGFHRjJaU0JzYVd0bElISmxjWFZwY21WY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1ZENBOUlHWjFibU4wYVc5dUtIWmhiSFZsTENCdGIyUmxLU0I3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUF4S1NCMllXeDFaU0E5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2RtRnNkV1VwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnT0NrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUnBaaWdvYlc5a1pTQW1JRFFwSUNZbUlIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkbUZzZFdVZ0ppWWdkbUZzZFdVdVgxOWxjMDF2WkhWc1pTa2djbVYwZFhKdUlIWmhiSFZsTzF4dUlGeDBYSFIyWVhJZ2JuTWdQU0JQWW1wbFkzUXVZM0psWVhSbEtHNTFiR3dwTzF4dUlGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5Jb2JuTXBPMXh1SUZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvYm5Nc0lDZGtaV1poZFd4MEp5d2dleUJsYm5WdFpYSmhZbXhsT2lCMGNuVmxMQ0IyWVd4MVpUb2dkbUZzZFdVZ2ZTazdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXlJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQWhQU0FuYzNSeWFXNW5KeWtnWm05eUtIWmhjaUJyWlhrZ2FXNGdkbUZzZFdVcElGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2h1Y3l3Z2EyVjVMQ0JtZFc1amRHbHZiaWhyWlhrcElIc2djbVYwZFhKdUlIWmhiSFZsVzJ0bGVWMDdJSDB1WW1sdVpDaHVkV3hzTENCclpYa3BLVHRjYmlCY2RGeDBjbVYwZFhKdUlHNXpPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdaMlYwUkdWbVlYVnNkRVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm1iM0lnWTI5dGNHRjBhV0pwYkdsMGVTQjNhWFJvSUc1dmJpMW9ZWEp0YjI1NUlHMXZaSFZzWlhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YmlBOUlHWjFibU4wYVc5dUtHMXZaSFZzWlNrZ2UxeHVJRngwWEhSMllYSWdaMlYwZEdWeUlEMGdiVzlrZFd4bElDWW1JRzF2WkhWc1pTNWZYMlZ6VFc5a2RXeGxJRDljYmlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSRVpXWmhkV3gwS0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsV3lka1pXWmhkV3gwSjEwN0lIMGdPbHh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEUxdlpIVnNaVVY0Y0c5eWRITW9LU0I3SUhKbGRIVnliaUJ0YjJSMWJHVTdJSDA3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNoblpYUjBaWElzSUNkaEp5d2daMlYwZEdWeUtUdGNiaUJjZEZ4MGNtVjBkWEp1SUdkbGRIUmxjanRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiRnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZJRDBnWm5WdVkzUnBiMjRvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2tnZXlCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFtVmpkQ3dnY0hKdmNHVnlkSGtwT3lCOU8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dVhHNGdYSFF2THlCTWIyRmtJR1Z1ZEhKNUlHMXZaSFZzWlNCaGJtUWdjbVYwZFhKdUlHVjRjRzl5ZEhOY2JpQmNkSEpsZEhWeWJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y3lBOUlEQXBPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCeVpYRjFhWEpsS0NjdUwyeHBZaTloZUdsdmN5Y3BPeUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTkxZEdsc2N5Y3BPMXh1ZG1GeUlITmxkSFJzWlNBOUlISmxjWFZwY21Vb0p5NHZMaTR2WTI5eVpTOXpaWFIwYkdVbktUdGNiblpoY2lCamIyOXJhV1Z6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTlvWld4d1pYSnpMMk52YjJ0cFpYTW5LVHRjYm5aaGNpQmlkV2xzWkZWU1RDQTlJSEpsY1hWcGNtVW9KeTR2TGk0dmFHVnNjR1Z5Y3k5aWRXbHNaRlZTVENjcE8xeHVkbUZ5SUdKMWFXeGtSblZzYkZCaGRHZ2dQU0J5WlhGMWFYSmxLQ2N1TGk5amIzSmxMMkoxYVd4a1JuVnNiRkJoZEdnbktUdGNiblpoY2lCd1lYSnpaVWhsWVdSbGNuTWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwyaGxiSEJsY25NdmNHRnljMlZJWldGa1pYSnpKeWs3WEc1MllYSWdhWE5WVWt4VFlXMWxUM0pwWjJsdUlEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5b1pXeHdaWEp6TDJselZWSk1VMkZ0WlU5eWFXZHBiaWNwTzF4dWRtRnlJR055WldGMFpVVnljbTl5SUQwZ2NtVnhkV2x5WlNnbkxpNHZZMjl5WlM5amNtVmhkR1ZGY25KdmNpY3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUhob2NrRmtZWEIwWlhJb1kyOXVabWxuS1NCN1hHNGdJSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2htZFc1amRHbHZiaUJrYVhOd1lYUmphRmhvY2xKbGNYVmxjM1FvY21WemIyeDJaU3dnY21WcVpXTjBLU0I3WEc0Z0lDQWdkbUZ5SUhKbGNYVmxjM1JFWVhSaElEMGdZMjl1Wm1sbkxtUmhkR0U3WEc0Z0lDQWdkbUZ5SUhKbGNYVmxjM1JJWldGa1pYSnpJRDBnWTI5dVptbG5MbWhsWVdSbGNuTTdYRzVjYmlBZ0lDQnBaaUFvZFhScGJITXVhWE5HYjNKdFJHRjBZU2h5WlhGMVpYTjBSR0YwWVNrcElIdGNiaUFnSUNBZ0lHUmxiR1YwWlNCeVpYRjFaWE4wU0dWaFpHVnljMXNuUTI5dWRHVnVkQzFVZVhCbEoxMDdJQzh2SUV4bGRDQjBhR1VnWW5KdmQzTmxjaUJ6WlhRZ2FYUmNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdjbVZ4ZFdWemRDQTlJRzVsZHlCWVRVeElkSFJ3VW1WeGRXVnpkQ2dwTzF4dVhHNGdJQ0FnTHk4Z1NGUlVVQ0JpWVhOcFl5QmhkWFJvWlc1MGFXTmhkR2x2Ymx4dUlDQWdJR2xtSUNoamIyNW1hV2N1WVhWMGFDa2dlMXh1SUNBZ0lDQWdkbUZ5SUhWelpYSnVZVzFsSUQwZ1kyOXVabWxuTG1GMWRHZ3VkWE5sY201aGJXVWdmSHdnSnljN1hHNGdJQ0FnSUNCMllYSWdjR0Z6YzNkdmNtUWdQU0JqYjI1bWFXY3VZWFYwYUM1d1lYTnpkMjl5WkNBL0lIVnVaWE5qWVhCbEtHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaGpiMjVtYVdjdVlYVjBhQzV3WVhOemQyOXlaQ2twSURvZ0p5YzdYRzRnSUNBZ0lDQnlaWEYxWlhOMFNHVmhaR1Z5Y3k1QmRYUm9iM0pwZW1GMGFXOXVJRDBnSjBKaGMybGpJQ2NnS3lCaWRHOWhLSFZ6WlhKdVlXMWxJQ3NnSnpvbklDc2djR0Z6YzNkdmNtUXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lIWmhjaUJtZFd4c1VHRjBhQ0E5SUdKMWFXeGtSblZzYkZCaGRHZ29ZMjl1Wm1sbkxtSmhjMlZWVWt3c0lHTnZibVpwWnk1MWNtd3BPMXh1SUNBZ0lISmxjWFZsYzNRdWIzQmxiaWhqYjI1bWFXY3ViV1YwYUc5a0xuUnZWWEJ3WlhKRFlYTmxLQ2tzSUdKMWFXeGtWVkpNS0daMWJHeFFZWFJvTENCamIyNW1hV2N1Y0dGeVlXMXpMQ0JqYjI1bWFXY3VjR0Z5WVcxelUyVnlhV0ZzYVhwbGNpa3NJSFJ5ZFdVcE8xeHVYRzRnSUNBZ0x5OGdVMlYwSUhSb1pTQnlaWEYxWlhOMElIUnBiV1Z2ZFhRZ2FXNGdUVk5jYmlBZ0lDQnlaWEYxWlhOMExuUnBiV1Z2ZFhRZ1BTQmpiMjVtYVdjdWRHbHRaVzkxZER0Y2JseHVJQ0FnSUM4dklFeHBjM1JsYmlCbWIzSWdjbVZoWkhrZ2MzUmhkR1ZjYmlBZ0lDQnlaWEYxWlhOMExtOXVjbVZoWkhsemRHRjBaV05vWVc1blpTQTlJR1oxYm1OMGFXOXVJR2hoYm1Sc1pVeHZZV1FvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWEpsY1hWbGMzUWdmSHdnY21WeGRXVnpkQzV5WldGa2VWTjBZWFJsSUNFOVBTQTBLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnTHk4Z1ZHaGxJSEpsY1hWbGMzUWdaWEp5YjNKbFpDQnZkWFFnWVc1a0lIZGxJR1JwWkc0bmRDQm5aWFFnWVNCeVpYTndiMjV6WlN3Z2RHaHBjeUIzYVd4c0lHSmxYRzRnSUNBZ0lDQXZMeUJvWVc1a2JHVmtJR0o1SUc5dVpYSnliM0lnYVc1emRHVmhaRnh1SUNBZ0lDQWdMeThnVjJsMGFDQnZibVVnWlhoalpYQjBhVzl1T2lCeVpYRjFaWE4wSUhSb1lYUWdkWE5wYm1jZ1ptbHNaVG9nY0hKdmRHOWpiMndzSUcxdmMzUWdZbkp2ZDNObGNuTmNiaUFnSUNBZ0lDOHZJSGRwYkd3Z2NtVjBkWEp1SUhOMFlYUjFjeUJoY3lBd0lHVjJaVzRnZEdodmRXZG9JR2wwSjNNZ1lTQnpkV05qWlhOelpuVnNJSEpsY1hWbGMzUmNiaUFnSUNBZ0lHbG1JQ2h5WlhGMVpYTjBMbk4wWVhSMWN5QTlQVDBnTUNBbUppQWhLSEpsY1hWbGMzUXVjbVZ6Y0c5dWMyVlZVa3dnSmlZZ2NtVnhkV1Z6ZEM1eVpYTndiMjV6WlZWU1RDNXBibVJsZUU5bUtDZG1hV3hsT2ljcElEMDlQU0F3S1NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDOHZJRkJ5WlhCaGNtVWdkR2hsSUhKbGMzQnZibk5sWEc0Z0lDQWdJQ0IyWVhJZ2NtVnpjRzl1YzJWSVpXRmtaWEp6SUQwZ0oyZGxkRUZzYkZKbGMzQnZibk5sU0dWaFpHVnljeWNnYVc0Z2NtVnhkV1Z6ZENBL0lIQmhjbk5sU0dWaFpHVnljeWh5WlhGMVpYTjBMbWRsZEVGc2JGSmxjM0J2Ym5ObFNHVmhaR1Z5Y3lncEtTQTZJRzUxYkd3N1hHNGdJQ0FnSUNCMllYSWdjbVZ6Y0c5dWMyVkVZWFJoSUQwZ0lXTnZibVpwWnk1eVpYTndiMjV6WlZSNWNHVWdmSHdnWTI5dVptbG5MbkpsYzNCdmJuTmxWSGx3WlNBOVBUMGdKM1JsZUhRbklEOGdjbVZ4ZFdWemRDNXlaWE53YjI1elpWUmxlSFFnT2lCeVpYRjFaWE4wTG5KbGMzQnZibk5sTzF4dUlDQWdJQ0FnZG1GeUlISmxjM0J2Ym5ObElEMGdlMXh1SUNBZ0lDQWdJQ0JrWVhSaE9pQnlaWE53YjI1elpVUmhkR0VzWEc0Z0lDQWdJQ0FnSUhOMFlYUjFjem9nY21WeGRXVnpkQzV6ZEdGMGRYTXNYRzRnSUNBZ0lDQWdJSE4wWVhSMWMxUmxlSFE2SUhKbGNYVmxjM1F1YzNSaGRIVnpWR1Y0ZEN4Y2JpQWdJQ0FnSUNBZ2FHVmhaR1Z5Y3pvZ2NtVnpjRzl1YzJWSVpXRmtaWEp6TEZ4dUlDQWdJQ0FnSUNCamIyNW1hV2M2SUdOdmJtWnBaeXhjYmlBZ0lDQWdJQ0FnY21WeGRXVnpkRG9nY21WeGRXVnpkRnh1SUNBZ0lDQWdmVHRjYmx4dUlDQWdJQ0FnYzJWMGRHeGxLSEpsYzI5c2RtVXNJSEpsYW1WamRDd2djbVZ6Y0c5dWMyVXBPMXh1WEc0Z0lDQWdJQ0F2THlCRGJHVmhiaUIxY0NCeVpYRjFaWE4wWEc0Z0lDQWdJQ0J5WlhGMVpYTjBJRDBnYm5Wc2JEdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ0x5OGdTR0Z1Wkd4bElHSnliM2R6WlhJZ2NtVnhkV1Z6ZENCallXNWpaV3hzWVhScGIyNGdLR0Z6SUc5d2NHOXpaV1FnZEc4Z1lTQnRZVzUxWVd3Z1kyRnVZMlZzYkdGMGFXOXVLVnh1SUNBZ0lISmxjWFZsYzNRdWIyNWhZbTl5ZENBOUlHWjFibU4wYVc5dUlHaGhibVJzWlVGaWIzSjBLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRnlaWEYxWlhOMEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVZxWldOMEtHTnlaV0YwWlVWeWNtOXlLQ2RTWlhGMVpYTjBJR0ZpYjNKMFpXUW5MQ0JqYjI1bWFXY3NJQ2RGUTA5T1RrRkNUMUpVUlVRbkxDQnlaWEYxWlhOMEtTazdYRzVjYmlBZ0lDQWdJQzh2SUVOc1pXRnVJSFZ3SUhKbGNYVmxjM1JjYmlBZ0lDQWdJSEpsY1hWbGMzUWdQU0J1ZFd4c08xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdkx5QklZVzVrYkdVZ2JHOTNJR3hsZG1Wc0lHNWxkSGR2Y21zZ1pYSnliM0p6WEc0Z0lDQWdjbVZ4ZFdWemRDNXZibVZ5Y205eUlEMGdablZ1WTNScGIyNGdhR0Z1Wkd4bFJYSnliM0lvS1NCN1hHNGdJQ0FnSUNBdkx5QlNaV0ZzSUdWeWNtOXljeUJoY21VZ2FHbGtaR1Z1SUdaeWIyMGdkWE1nWW5rZ2RHaGxJR0p5YjNkelpYSmNiaUFnSUNBZ0lDOHZJRzl1WlhKeWIzSWdjMmh2ZFd4a0lHOXViSGtnWm1seVpTQnBaaUJwZENkeklHRWdibVYwZDI5eWF5Qmxjbkp2Y2x4dUlDQWdJQ0FnY21WcVpXTjBLR055WldGMFpVVnljbTl5S0NkT1pYUjNiM0pySUVWeWNtOXlKeXdnWTI5dVptbG5MQ0J1ZFd4c0xDQnlaWEYxWlhOMEtTazdYRzVjYmlBZ0lDQWdJQzh2SUVOc1pXRnVJSFZ3SUhKbGNYVmxjM1JjYmlBZ0lDQWdJSEpsY1hWbGMzUWdQU0J1ZFd4c08xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdkx5QklZVzVrYkdVZ2RHbHRaVzkxZEZ4dUlDQWdJSEpsY1hWbGMzUXViMjUwYVcxbGIzVjBJRDBnWm5WdVkzUnBiMjRnYUdGdVpHeGxWR2x0Wlc5MWRDZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCMGFXMWxiM1YwUlhKeWIzSk5aWE56WVdkbElEMGdKM1JwYldWdmRYUWdiMllnSnlBcklHTnZibVpwWnk1MGFXMWxiM1YwSUNzZ0oyMXpJR1Y0WTJWbFpHVmtKenRjYmlBZ0lDQWdJR2xtSUNoamIyNW1hV2N1ZEdsdFpXOTFkRVZ5Y205eVRXVnpjMkZuWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhVzFsYjNWMFJYSnliM0pOWlhOellXZGxJRDBnWTI5dVptbG5MblJwYldWdmRYUkZjbkp2Y2sxbGMzTmhaMlU3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WldwbFkzUW9ZM0psWVhSbFJYSnliM0lvZEdsdFpXOTFkRVZ5Y205eVRXVnpjMkZuWlN3Z1kyOXVabWxuTENBblJVTlBUazVCUWs5U1ZFVkVKeXhjYmlBZ0lDQWdJQ0FnY21WeGRXVnpkQ2twTzF4dVhHNGdJQ0FnSUNBdkx5QkRiR1ZoYmlCMWNDQnlaWEYxWlhOMFhHNGdJQ0FnSUNCeVpYRjFaWE4wSUQwZ2JuVnNiRHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeThnUVdSa0lIaHpjbVlnYUdWaFpHVnlYRzRnSUNBZ0x5OGdWR2hwY3lCcGN5QnZibXg1SUdSdmJtVWdhV1lnY25WdWJtbHVaeUJwYmlCaElITjBZVzVrWVhKa0lHSnliM2R6WlhJZ1pXNTJhWEp2Ym0xbGJuUXVYRzRnSUNBZ0x5OGdVM0JsWTJsbWFXTmhiR3g1SUc1dmRDQnBaaUIzWlNkeVpTQnBiaUJoSUhkbFlpQjNiM0pyWlhJc0lHOXlJSEpsWVdOMExXNWhkR2wyWlM1Y2JpQWdJQ0JwWmlBb2RYUnBiSE11YVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTa2dlMXh1SUNBZ0lDQWdMeThnUVdSa0lIaHpjbVlnYUdWaFpHVnlYRzRnSUNBZ0lDQjJZWElnZUhOeVpsWmhiSFZsSUQwZ0tHTnZibVpwWnk1M2FYUm9RM0psWkdWdWRHbGhiSE1nZkh3Z2FYTlZVa3hUWVcxbFQzSnBaMmx1S0daMWJHeFFZWFJvS1NrZ0ppWWdZMjl1Wm1sbkxuaHpjbVpEYjI5cmFXVk9ZVzFsSUQ5Y2JpQWdJQ0FnSUNBZ1kyOXZhMmxsY3k1eVpXRmtLR052Ym1acFp5NTRjM0ptUTI5dmEybGxUbUZ0WlNrZ09seHVJQ0FnSUNBZ0lDQjFibVJsWm1sdVpXUTdYRzVjYmlBZ0lDQWdJR2xtSUNoNGMzSm1WbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRFaGxZV1JsY25OYlkyOXVabWxuTG5oemNtWklaV0ZrWlhKT1lXMWxYU0E5SUhoemNtWldZV3gxWlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCQlpHUWdhR1ZoWkdWeWN5QjBieUIwYUdVZ2NtVnhkV1Z6ZEZ4dUlDQWdJR2xtSUNnbmMyVjBVbVZ4ZFdWemRFaGxZV1JsY2ljZ2FXNGdjbVZ4ZFdWemRDa2dlMXh1SUNBZ0lDQWdkWFJwYkhNdVptOXlSV0ZqYUNoeVpYRjFaWE4wU0dWaFpHVnljeXdnWm5WdVkzUnBiMjRnYzJWMFVtVnhkV1Z6ZEVobFlXUmxjaWgyWVd3c0lHdGxlU2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlISmxjWFZsYzNSRVlYUmhJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJyWlhrdWRHOU1iM2RsY2tOaGMyVW9LU0E5UFQwZ0oyTnZiblJsYm5RdGRIbHdaU2NwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJTWlcxdmRtVWdRMjl1ZEdWdWRDMVVlWEJsSUdsbUlHUmhkR0VnYVhNZ2RXNWtaV1pwYm1Wa1hHNGdJQ0FnSUNBZ0lDQWdaR1ZzWlhSbElISmxjWFZsYzNSSVpXRmtaWEp6VzJ0bGVWMDdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1QzUm9aWEozYVhObElHRmtaQ0JvWldGa1pYSWdkRzhnZEdobElISmxjWFZsYzNSY2JpQWdJQ0FnSUNBZ0lDQnlaWEYxWlhOMExuTmxkRkpsY1hWbGMzUklaV0ZrWlhJb2EyVjVMQ0IyWVd3cE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJCWkdRZ2QybDBhRU55WldSbGJuUnBZV3h6SUhSdklISmxjWFZsYzNRZ2FXWWdibVZsWkdWa1hHNGdJQ0FnYVdZZ0tDRjFkR2xzY3k1cGMxVnVaR1ZtYVc1bFpDaGpiMjVtYVdjdWQybDBhRU55WldSbGJuUnBZV3h6S1NrZ2UxeHVJQ0FnSUNBZ2NtVnhkV1Z6ZEM1M2FYUm9RM0psWkdWdWRHbGhiSE1nUFNBaElXTnZibVpwWnk1M2FYUm9RM0psWkdWdWRHbGhiSE03WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnUVdSa0lISmxjM0J2Ym5ObFZIbHdaU0IwYnlCeVpYRjFaWE4wSUdsbUlHNWxaV1JsWkZ4dUlDQWdJR2xtSUNoamIyNW1hV2N1Y21WemNHOXVjMlZVZVhCbEtTQjdYRzRnSUNBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNCeVpYRjFaWE4wTG5KbGMzQnZibk5sVkhsd1pTQTlJR052Ym1acFp5NXlaWE53YjI1elpWUjVjR1U3WEc0Z0lDQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRVY0Y0dWamRHVmtJRVJQVFVWNFkyVndkR2x2YmlCMGFISnZkMjRnWW5rZ1luSnZkM05sY25NZ2JtOTBJR052YlhCaGRHbGliR1VnV0UxTVNIUjBjRkpsY1hWbGMzUWdUR1YyWld3Z01pNWNiaUFnSUNBZ0lDQWdMeThnUW5WMExDQjBhR2x6SUdOaGJpQmlaU0J6ZFhCd2NtVnpjMlZrSUdadmNpQW5hbk52YmljZ2RIbHdaU0JoY3lCcGRDQmpZVzRnWW1VZ2NHRnljMlZrSUdKNUlHUmxabUYxYkhRZ0ozUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObEp5Qm1kVzVqZEdsdmJpNWNiaUFnSUNBZ0lDQWdhV1lnS0dOdmJtWnBaeTV5WlhOd2IyNXpaVlI1Y0dVZ0lUMDlJQ2RxYzI5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2NtOTNJR1U3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCSVlXNWtiR1VnY0hKdlozSmxjM01nYVdZZ2JtVmxaR1ZrWEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJqYjI1bWFXY3ViMjVFYjNkdWJHOWhaRkJ5YjJkeVpYTnpJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQnlaWEYxWlhOMExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0ozQnliMmR5WlhOekp5d2dZMjl1Wm1sbkxtOXVSRzkzYm14dllXUlFjbTluY21WemN5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdUbTkwSUdGc2JDQmljbTkzYzJWeWN5QnpkWEJ3YjNKMElIVndiRzloWkNCbGRtVnVkSE5jYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR052Ym1acFp5NXZibFZ3Ykc5aFpGQnliMmR5WlhOeklEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlISmxjWFZsYzNRdWRYQnNiMkZrS1NCN1hHNGdJQ0FnSUNCeVpYRjFaWE4wTG5Wd2JHOWhaQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R3Y205bmNtVnpjeWNzSUdOdmJtWnBaeTV2YmxWd2JHOWhaRkJ5YjJkeVpYTnpLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvWTI5dVptbG5MbU5oYm1ObGJGUnZhMlZ1S1NCN1hHNGdJQ0FnSUNBdkx5QklZVzVrYkdVZ1kyRnVZMlZzYkdGMGFXOXVYRzRnSUNBZ0lDQmpiMjVtYVdjdVkyRnVZMlZzVkc5clpXNHVjSEp2YldselpTNTBhR1Z1S0daMWJtTjBhVzl1SUc5dVEyRnVZMlZzWldRb1kyRnVZMlZzS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doY21WeGRXVnpkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSEpsY1hWbGMzUXVZV0p2Y25Rb0tUdGNiaUFnSUNBZ0lDQWdjbVZxWldOMEtHTmhibU5sYkNrN1hHNGdJQ0FnSUNBZ0lDOHZJRU5zWldGdUlIVndJSEpsY1hWbGMzUmNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRDQTlJRzUxYkd3N1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9JWEpsY1hWbGMzUkVZWFJoS1NCN1hHNGdJQ0FnSUNCeVpYRjFaWE4wUkdGMFlTQTlJRzUxYkd3N1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1UyVnVaQ0IwYUdVZ2NtVnhkV1Z6ZEZ4dUlDQWdJSEpsY1hWbGMzUXVjMlZ1WkNoeVpYRjFaWE4wUkdGMFlTazdYRzRnSUgwcE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTkxZEdsc2N5Y3BPMXh1ZG1GeUlHSnBibVFnUFNCeVpYRjFhWEpsS0NjdUwyaGxiSEJsY25NdlltbHVaQ2NwTzF4dWRtRnlJRUY0YVc5eklEMGdjbVZ4ZFdseVpTZ25MaTlqYjNKbEwwRjRhVzl6SnlrN1hHNTJZWElnYldWeVoyVkRiMjVtYVdjZ1BTQnlaWEYxYVhKbEtDY3VMMk52Y21VdmJXVnlaMlZEYjI1bWFXY25LVHRjYm5aaGNpQmtaV1poZFd4MGN5QTlJSEpsY1hWcGNtVW9KeTR2WkdWbVlYVnNkSE1uS1R0Y2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdVZ1lXNGdhVzV6ZEdGdVkyVWdiMllnUVhocGIzTmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1pHVm1ZWFZzZEVOdmJtWnBaeUJVYUdVZ1pHVm1ZWFZzZENCamIyNW1hV2NnWm05eUlIUm9aU0JwYm5OMFlXNWpaVnh1SUNvZ1FISmxkSFZ5YmlCN1FYaHBiM045SUVFZ2JtVjNJR2x1YzNSaGJtTmxJRzltSUVGNGFXOXpYRzRnS2k5Y2JtWjFibU4wYVc5dUlHTnlaV0YwWlVsdWMzUmhibU5sS0dSbFptRjFiSFJEYjI1bWFXY3BJSHRjYmlBZ2RtRnlJR052Ym5SbGVIUWdQU0J1WlhjZ1FYaHBiM01vWkdWbVlYVnNkRU52Ym1acFp5azdYRzRnSUhaaGNpQnBibk4wWVc1alpTQTlJR0pwYm1Rb1FYaHBiM011Y0hKdmRHOTBlWEJsTG5KbGNYVmxjM1FzSUdOdmJuUmxlSFFwTzF4dVhHNGdJQzh2SUVOdmNIa2dZWGhwYjNNdWNISnZkRzkwZVhCbElIUnZJR2x1YzNSaGJtTmxYRzRnSUhWMGFXeHpMbVY0ZEdWdVpDaHBibk4wWVc1alpTd2dRWGhwYjNNdWNISnZkRzkwZVhCbExDQmpiMjUwWlhoMEtUdGNibHh1SUNBdkx5QkRiM0I1SUdOdmJuUmxlSFFnZEc4Z2FXNXpkR0Z1WTJWY2JpQWdkWFJwYkhNdVpYaDBaVzVrS0dsdWMzUmhibU5sTENCamIyNTBaWGgwS1R0Y2JseHVJQ0J5WlhSMWNtNGdhVzV6ZEdGdVkyVTdYRzU5WEc1Y2JpOHZJRU55WldGMFpTQjBhR1VnWkdWbVlYVnNkQ0JwYm5OMFlXNWpaU0IwYnlCaVpTQmxlSEJ2Y25SbFpGeHVkbUZ5SUdGNGFXOXpJRDBnWTNKbFlYUmxTVzV6ZEdGdVkyVW9aR1ZtWVhWc2RITXBPMXh1WEc0dkx5QkZlSEJ2YzJVZ1FYaHBiM01nWTJ4aGMzTWdkRzhnWVd4c2IzY2dZMnhoYzNNZ2FXNW9aWEpwZEdGdVkyVmNibUY0YVc5ekxrRjRhVzl6SUQwZ1FYaHBiM003WEc1Y2JpOHZJRVpoWTNSdmNua2dabTl5SUdOeVpXRjBhVzVuSUc1bGR5QnBibk4wWVc1alpYTmNibUY0YVc5ekxtTnlaV0YwWlNBOUlHWjFibU4wYVc5dUlHTnlaV0YwWlNocGJuTjBZVzVqWlVOdmJtWnBaeWtnZTF4dUlDQnlaWFIxY200Z1kzSmxZWFJsU1c1emRHRnVZMlVvYldWeVoyVkRiMjVtYVdjb1lYaHBiM011WkdWbVlYVnNkSE1zSUdsdWMzUmhibU5sUTI5dVptbG5LU2s3WEc1OU8xeHVYRzR2THlCRmVIQnZjMlVnUTJGdVkyVnNJQ1lnUTJGdVkyVnNWRzlyWlc1Y2JtRjRhVzl6TGtOaGJtTmxiQ0E5SUhKbGNYVnBjbVVvSnk0dlkyRnVZMlZzTDBOaGJtTmxiQ2NwTzF4dVlYaHBiM011UTJGdVkyVnNWRzlyWlc0Z1BTQnlaWEYxYVhKbEtDY3VMMk5oYm1ObGJDOURZVzVqWld4VWIydGxiaWNwTzF4dVlYaHBiM011YVhORFlXNWpaV3dnUFNCeVpYRjFhWEpsS0NjdUwyTmhibU5sYkM5cGMwTmhibU5sYkNjcE8xeHVYRzR2THlCRmVIQnZjMlVnWVd4c0wzTndjbVZoWkZ4dVlYaHBiM011WVd4c0lEMGdablZ1WTNScGIyNGdZV3hzS0hCeWIyMXBjMlZ6S1NCN1hHNGdJSEpsZEhWeWJpQlFjbTl0YVhObExtRnNiQ2h3Y205dGFYTmxjeWs3WEc1OU8xeHVZWGhwYjNNdWMzQnlaV0ZrSUQwZ2NtVnhkV2x5WlNnbkxpOW9aV3h3WlhKekwzTndjbVZoWkNjcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR0Y0YVc5ek8xeHVYRzR2THlCQmJHeHZkeUIxYzJVZ2IyWWdaR1ZtWVhWc2RDQnBiWEJ2Y25RZ2MzbHVkR0Y0SUdsdUlGUjVjR1ZUWTNKcGNIUmNibTF2WkhWc1pTNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQmhlR2x2Y3p0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkJJR0JEWVc1alpXeGdJR2x6SUdGdUlHOWlhbVZqZENCMGFHRjBJR2x6SUhSb2NtOTNiaUIzYUdWdUlHRnVJRzl3WlhKaGRHbHZiaUJwY3lCallXNWpaV3hsWkM1Y2JpQXFYRzRnS2lCQVkyeGhjM05jYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuUFgwZ2JXVnpjMkZuWlNCVWFHVWdiV1Z6YzJGblpTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1EyRnVZMlZzS0cxbGMzTmhaMlVwSUh0Y2JpQWdkR2hwY3k1dFpYTnpZV2RsSUQwZ2JXVnpjMkZuWlR0Y2JuMWNibHh1UTJGdVkyVnNMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeUE5SUdaMWJtTjBhVzl1SUhSdlUzUnlhVzVuS0NrZ2UxeHVJQ0J5WlhSMWNtNGdKME5oYm1ObGJDY2dLeUFvZEdocGN5NXRaWE56WVdkbElEOGdKem9nSnlBcklIUm9hWE11YldWemMyRm5aU0E2SUNjbktUdGNibjA3WEc1Y2JrTmhibU5sYkM1d2NtOTBiM1I1Y0dVdVgxOURRVTVEUlV4Zlh5QTlJSFJ5ZFdVN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdRMkZ1WTJWc08xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1EyRnVZMlZzSUQwZ2NtVnhkV2x5WlNnbkxpOURZVzVqWld3bktUdGNibHh1THlvcVhHNGdLaUJCSUdCRFlXNWpaV3hVYjJ0bGJtQWdhWE1nWVc0Z2IySnFaV04wSUhSb1lYUWdZMkZ1SUdKbElIVnpaV1FnZEc4Z2NtVnhkV1Z6ZENCallXNWpaV3hzWVhScGIyNGdiMllnWVc0Z2IzQmxjbUYwYVc5dUxseHVJQ3BjYmlBcUlFQmpiR0Z6YzF4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdaWGhsWTNWMGIzSWdWR2hsSUdWNFpXTjFkRzl5SUdaMWJtTjBhVzl1TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJEWVc1alpXeFViMnRsYmlobGVHVmpkWFJ2Y2lrZ2UxeHVJQ0JwWmlBb2RIbHdaVzltSUdWNFpXTjFkRzl5SUNFOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWduWlhobFkzVjBiM0lnYlhWemRDQmlaU0JoSUdaMWJtTjBhVzl1TGljcE8xeHVJQ0I5WEc1Y2JpQWdkbUZ5SUhKbGMyOXNkbVZRY205dGFYTmxPMXh1SUNCMGFHbHpMbkJ5YjIxcGMyVWdQU0J1WlhjZ1VISnZiV2x6WlNobWRXNWpkR2x2YmlCd2NtOXRhWE5sUlhobFkzVjBiM0lvY21WemIyeDJaU2tnZTF4dUlDQWdJSEpsYzI5c2RtVlFjbTl0YVhObElEMGdjbVZ6YjJ4MlpUdGNiaUFnZlNrN1hHNWNiaUFnZG1GeUlIUnZhMlZ1SUQwZ2RHaHBjenRjYmlBZ1pYaGxZM1YwYjNJb1puVnVZM1JwYjI0Z1kyRnVZMlZzS0cxbGMzTmhaMlVwSUh0Y2JpQWdJQ0JwWmlBb2RHOXJaVzR1Y21WaGMyOXVLU0I3WEc0Z0lDQWdJQ0F2THlCRFlXNWpaV3hzWVhScGIyNGdhR0Z6SUdGc2NtVmhaSGtnWW1WbGJpQnlaWEYxWlhOMFpXUmNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IwYjJ0bGJpNXlaV0Z6YjI0Z1BTQnVaWGNnUTJGdVkyVnNLRzFsYzNOaFoyVXBPMXh1SUNBZ0lISmxjMjlzZG1WUWNtOXRhWE5sS0hSdmEyVnVMbkpsWVhOdmJpazdYRzRnSUgwcE8xeHVmVnh1WEc0dktpcGNiaUFxSUZSb2NtOTNjeUJoSUdCRFlXNWpaV3hnSUdsbUlHTmhibU5sYkd4aGRHbHZiaUJvWVhNZ1ltVmxiaUJ5WlhGMVpYTjBaV1F1WEc0Z0tpOWNia05oYm1ObGJGUnZhMlZ1TG5CeWIzUnZkSGx3WlM1MGFISnZkMGxtVW1WeGRXVnpkR1ZrSUQwZ1puVnVZM1JwYjI0Z2RHaHliM2RKWmxKbGNYVmxjM1JsWkNncElIdGNiaUFnYVdZZ0tIUm9hWE11Y21WaGMyOXVLU0I3WEc0Z0lDQWdkR2h5YjNjZ2RHaHBjeTV5WldGemIyNDdYRzRnSUgxY2JuMDdYRzVjYmk4cUtseHVJQ29nVW1WMGRYSnVjeUJoYmlCdlltcGxZM1FnZEdoaGRDQmpiMjUwWVdsdWN5QmhJRzVsZHlCZ1EyRnVZMlZzVkc5clpXNWdJR0Z1WkNCaElHWjFibU4wYVc5dUlIUm9ZWFFzSUhkb1pXNGdZMkZzYkdWa0xGeHVJQ29nWTJGdVkyVnNjeUIwYUdVZ1lFTmhibU5sYkZSdmEyVnVZQzVjYmlBcUwxeHVRMkZ1WTJWc1ZHOXJaVzR1YzI5MWNtTmxJRDBnWm5WdVkzUnBiMjRnYzI5MWNtTmxLQ2tnZTF4dUlDQjJZWElnWTJGdVkyVnNPMXh1SUNCMllYSWdkRzlyWlc0Z1BTQnVaWGNnUTJGdVkyVnNWRzlyWlc0b1puVnVZM1JwYjI0Z1pYaGxZM1YwYjNJb1l5a2dlMXh1SUNBZ0lHTmhibU5sYkNBOUlHTTdYRzRnSUgwcE8xeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lIUnZhMlZ1T2lCMGIydGxiaXhjYmlBZ0lDQmpZVzVqWld3NklHTmhibU5sYkZ4dUlDQjlPMXh1ZlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQkRZVzVqWld4VWIydGxianRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCcGMwTmhibU5sYkNoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z0lTRW9kbUZzZFdVZ0ppWWdkbUZzZFdVdVgxOURRVTVEUlV4Zlh5azdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwzVjBhV3h6SnlrN1hHNTJZWElnWW5WcGJHUlZVa3dnUFNCeVpYRjFhWEpsS0NjdUxpOW9aV3h3WlhKekwySjFhV3hrVlZKTUp5azdYRzUyWVhJZ1NXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUlEMGdjbVZ4ZFdseVpTZ25MaTlKYm5SbGNtTmxjSFJ2Y2sxaGJtRm5aWEluS1R0Y2JuWmhjaUJrYVhOd1lYUmphRkpsY1hWbGMzUWdQU0J5WlhGMWFYSmxLQ2N1TDJScGMzQmhkR05vVW1WeGRXVnpkQ2NwTzF4dWRtRnlJRzFsY21kbFEyOXVabWxuSUQwZ2NtVnhkV2x5WlNnbkxpOXRaWEpuWlVOdmJtWnBaeWNwTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlNCaElHNWxkeUJwYm5OMFlXNWpaU0J2WmlCQmVHbHZjMXh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnBibk4wWVc1alpVTnZibVpwWnlCVWFHVWdaR1ZtWVhWc2RDQmpiMjVtYVdjZ1ptOXlJSFJvWlNCcGJuTjBZVzVqWlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJCZUdsdmN5aHBibk4wWVc1alpVTnZibVpwWnlrZ2UxeHVJQ0IwYUdsekxtUmxabUYxYkhSeklEMGdhVzV6ZEdGdVkyVkRiMjVtYVdjN1hHNGdJSFJvYVhNdWFXNTBaWEpqWlhCMGIzSnpJRDBnZTF4dUlDQWdJSEpsY1hWbGMzUTZJRzVsZHlCSmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJb0tTeGNiaUFnSUNCeVpYTndiMjV6WlRvZ2JtVjNJRWx1ZEdWeVkyVndkRzl5VFdGdVlXZGxjaWdwWEc0Z0lIMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHbHpjR0YwWTJnZ1lTQnlaWEYxWlhOMFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOdmJtWnBaeUJVYUdVZ1kyOXVabWxuSUhOd1pXTnBabWxqSUdadmNpQjBhR2x6SUhKbGNYVmxjM1FnS0cxbGNtZGxaQ0IzYVhSb0lIUm9hWE11WkdWbVlYVnNkSE1wWEc0Z0tpOWNia0Y0YVc5ekxuQnliM1J2ZEhsd1pTNXlaWEYxWlhOMElEMGdablZ1WTNScGIyNGdjbVZ4ZFdWemRDaGpiMjVtYVdjcElIdGNiaUFnTHlwbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2TUNvdlhHNGdJQzh2SUVGc2JHOTNJR1p2Y2lCaGVHbHZjeWduWlhoaGJYQnNaUzkxY213bld5d2dZMjl1Wm1sblhTa2dZU0JzWVNCbVpYUmphQ0JCVUVsY2JpQWdhV1lnS0hSNWNHVnZaaUJqYjI1bWFXY2dQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnWTI5dVptbG5JRDBnWVhKbmRXMWxiblJ6V3pGZElIeDhJSHQ5TzF4dUlDQWdJR052Ym1acFp5NTFjbXdnUFNCaGNtZDFiV1Z1ZEhOYk1GMDdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdZMjl1Wm1sbklEMGdZMjl1Wm1sbklIeDhJSHQ5TzF4dUlDQjlYRzVjYmlBZ1kyOXVabWxuSUQwZ2JXVnlaMlZEYjI1bWFXY29kR2hwY3k1a1pXWmhkV3gwY3l3Z1kyOXVabWxuS1R0Y2JseHVJQ0F2THlCVFpYUWdZMjl1Wm1sbkxtMWxkR2h2WkZ4dUlDQnBaaUFvWTI5dVptbG5MbTFsZEdodlpDa2dlMXh1SUNBZ0lHTnZibVpwWnk1dFpYUm9iMlFnUFNCamIyNW1hV2N1YldWMGFHOWtMblJ2VEc5M1pYSkRZWE5sS0NrN1hHNGdJSDBnWld4elpTQnBaaUFvZEdocGN5NWtaV1poZFd4MGN5NXRaWFJvYjJRcElIdGNiaUFnSUNCamIyNW1hV2N1YldWMGFHOWtJRDBnZEdocGN5NWtaV1poZFd4MGN5NXRaWFJvYjJRdWRHOU1iM2RsY2tOaGMyVW9LVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JqYjI1bWFXY3ViV1YwYUc5a0lEMGdKMmRsZENjN1hHNGdJSDFjYmx4dUlDQXZMeUJJYjI5cklIVndJR2x1ZEdWeVkyVndkRzl5Y3lCdGFXUmtiR1YzWVhKbFhHNGdJSFpoY2lCamFHRnBiaUE5SUZ0a2FYTndZWFJqYUZKbGNYVmxjM1FzSUhWdVpHVm1hVzVsWkYwN1hHNGdJSFpoY2lCd2NtOXRhWE5sSUQwZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0dOdmJtWnBaeWs3WEc1Y2JpQWdkR2hwY3k1cGJuUmxjbU5sY0hSdmNuTXVjbVZ4ZFdWemRDNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlIVnVjMmhwWm5SU1pYRjFaWE4wU1c1MFpYSmpaWEIwYjNKektHbHVkR1Z5WTJWd2RHOXlLU0I3WEc0Z0lDQWdZMmhoYVc0dWRXNXphR2xtZENocGJuUmxjbU5sY0hSdmNpNW1kV3htYVd4c1pXUXNJR2x1ZEdWeVkyVndkRzl5TG5KbGFtVmpkR1ZrS1R0Y2JpQWdmU2s3WEc1Y2JpQWdkR2hwY3k1cGJuUmxjbU5sY0hSdmNuTXVjbVZ6Y0c5dWMyVXVabTl5UldGamFDaG1kVzVqZEdsdmJpQndkWE5vVW1WemNHOXVjMlZKYm5SbGNtTmxjSFJ2Y25Nb2FXNTBaWEpqWlhCMGIzSXBJSHRjYmlBZ0lDQmphR0ZwYmk1d2RYTm9LR2x1ZEdWeVkyVndkRzl5TG1aMWJHWnBiR3hsWkN3Z2FXNTBaWEpqWlhCMGIzSXVjbVZxWldOMFpXUXBPMXh1SUNCOUtUdGNibHh1SUNCM2FHbHNaU0FvWTJoaGFXNHViR1Z1WjNSb0tTQjdYRzRnSUNBZ2NISnZiV2x6WlNBOUlIQnliMjFwYzJVdWRHaGxiaWhqYUdGcGJpNXphR2xtZENncExDQmphR0ZwYmk1emFHbG1kQ2dwS1R0Y2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCd2NtOXRhWE5sTzF4dWZUdGNibHh1UVhocGIzTXVjSEp2ZEc5MGVYQmxMbWRsZEZWeWFTQTlJR1oxYm1OMGFXOXVJR2RsZEZWeWFTaGpiMjVtYVdjcElIdGNiaUFnWTI5dVptbG5JRDBnYldWeVoyVkRiMjVtYVdjb2RHaHBjeTVrWldaaGRXeDBjeXdnWTI5dVptbG5LVHRjYmlBZ2NtVjBkWEp1SUdKMWFXeGtWVkpNS0dOdmJtWnBaeTUxY213c0lHTnZibVpwWnk1d1lYSmhiWE1zSUdOdmJtWnBaeTV3WVhKaGJYTlRaWEpwWVd4cGVtVnlLUzV5WlhCc1lXTmxLQzllWEZ3L0x5d2dKeWNwTzF4dWZUdGNibHh1THk4Z1VISnZkbWxrWlNCaGJHbGhjMlZ6SUdadmNpQnpkWEJ3YjNKMFpXUWdjbVZ4ZFdWemRDQnRaWFJvYjJSelhHNTFkR2xzY3k1bWIzSkZZV05vS0ZzblpHVnNaWFJsSnl3Z0oyZGxkQ2NzSUNkb1pXRmtKeXdnSjI5d2RHbHZibk1uWFN3Z1puVnVZM1JwYjI0Z1ptOXlSV0ZqYUUxbGRHaHZaRTV2UkdGMFlTaHRaWFJvYjJRcElIdGNiaUFnTHlwbGMyeHBiblFnWm5WdVl5MXVZVzFsY3pvd0tpOWNiaUFnUVhocGIzTXVjSEp2ZEc5MGVYQmxXMjFsZEdodlpGMGdQU0JtZFc1amRHbHZiaWgxY213c0lHTnZibVpwWnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuSmxjWFZsYzNRb2JXVnlaMlZEYjI1bWFXY29ZMjl1Wm1sbklIeDhJSHQ5TENCN1hHNGdJQ0FnSUNCdFpYUm9iMlE2SUcxbGRHaHZaQ3hjYmlBZ0lDQWdJSFZ5YkRvZ2RYSnNMRnh1SUNBZ0lDQWdaR0YwWVRvZ0tHTnZibVpwWnlCOGZDQjdmU2t1WkdGMFlWeHVJQ0FnSUgwcEtUdGNiaUFnZlR0Y2JuMHBPMXh1WEc1MWRHbHNjeTVtYjNKRllXTm9LRnNuY0c5emRDY3NJQ2R3ZFhRbkxDQW5jR0YwWTJnblhTd2dablZ1WTNScGIyNGdabTl5UldGamFFMWxkR2h2WkZkcGRHaEVZWFJoS0cxbGRHaHZaQ2tnZTF4dUlDQXZLbVZ6YkdsdWRDQm1kVzVqTFc1aGJXVnpPakFxTDF4dUlDQkJlR2x2Y3k1d2NtOTBiM1I1Y0dWYmJXVjBhRzlrWFNBOUlHWjFibU4wYVc5dUtIVnliQ3dnWkdGMFlTd2dZMjl1Wm1sbktTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjbVZ4ZFdWemRDaHRaWEpuWlVOdmJtWnBaeWhqYjI1bWFXY2dmSHdnZTMwc0lIdGNiaUFnSUNBZ0lHMWxkR2h2WkRvZ2JXVjBhRzlrTEZ4dUlDQWdJQ0FnZFhKc09pQjFjbXdzWEc0Z0lDQWdJQ0JrWVhSaE9pQmtZWFJoWEc0Z0lDQWdmU2twTzF4dUlDQjlPMXh1ZlNrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdRWGhwYjNNN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZkWFJwYkhNbktUdGNibHh1Wm5WdVkzUnBiMjRnU1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5S0NrZ2UxeHVJQ0IwYUdsekxtaGhibVJzWlhKeklEMGdXMTA3WEc1OVhHNWNiaThxS2x4dUlDb2dRV1JrSUdFZ2JtVjNJR2x1ZEdWeVkyVndkRzl5SUhSdklIUm9aU0J6ZEdGamExeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWjFiR1pwYkd4bFpDQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z2FHRnVaR3hsSUdCMGFHVnVZQ0JtYjNJZ1lTQmdVSEp2YldselpXQmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUhKbGFtVmpkR1ZrSUZSb1pTQm1kVzVqZEdsdmJpQjBieUJvWVc1a2JHVWdZSEpsYW1WamRHQWdabTl5SUdFZ1lGQnliMjFwYzJWZ1hHNGdLbHh1SUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlNCQmJpQkpSQ0IxYzJWa0lIUnZJSEpsYlc5MlpTQnBiblJsY21ObGNIUnZjaUJzWVhSbGNseHVJQ292WEc1SmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJdWNISnZkRzkwZVhCbExuVnpaU0E5SUdaMWJtTjBhVzl1SUhWelpTaG1kV3htYVd4c1pXUXNJSEpsYW1WamRHVmtLU0I3WEc0Z0lIUm9hWE11YUdGdVpHeGxjbk11Y0hWemFDaDdYRzRnSUNBZ1puVnNabWxzYkdWa09pQm1kV3htYVd4c1pXUXNYRzRnSUNBZ2NtVnFaV04wWldRNklISmxhbVZqZEdWa1hHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2RHaHBjeTVvWVc1a2JHVnljeTVzWlc1bmRHZ2dMU0F4TzF4dWZUdGNibHh1THlvcVhHNGdLaUJTWlcxdmRtVWdZVzRnYVc1MFpYSmpaWEIwYjNJZ1puSnZiU0IwYUdVZ2MzUmhZMnRjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdhV1FnVkdobElFbEVJSFJvWVhRZ2QyRnpJSEpsZEhWeWJtVmtJR0o1SUdCMWMyVmdYRzRnS2k5Y2JrbHVkR1Z5WTJWd2RHOXlUV0Z1WVdkbGNpNXdjbTkwYjNSNWNHVXVaV3BsWTNRZ1BTQm1kVzVqZEdsdmJpQmxhbVZqZENocFpDa2dlMXh1SUNCcFppQW9kR2hwY3k1b1lXNWtiR1Z5YzF0cFpGMHBJSHRjYmlBZ0lDQjBhR2x6TG1oaGJtUnNaWEp6VzJsa1hTQTlJRzUxYkd3N1hHNGdJSDFjYm4wN1hHNWNiaThxS2x4dUlDb2dTWFJsY21GMFpTQnZkbVZ5SUdGc2JDQjBhR1VnY21WbmFYTjBaWEpsWkNCcGJuUmxjbU5sY0hSdmNuTmNiaUFxWEc0Z0tpQlVhR2x6SUcxbGRHaHZaQ0JwY3lCd1lYSjBhV04xYkdGeWJIa2dkWE5sWm5Wc0lHWnZjaUJ6YTJsd2NHbHVaeUJ2ZG1WeUlHRnVlVnh1SUNvZ2FXNTBaWEpqWlhCMGIzSnpJSFJvWVhRZ2JXRjVJR2hoZG1VZ1ltVmpiMjFsSUdCdWRXeHNZQ0JqWVd4c2FXNW5JR0JsYW1WamRHQXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdabTRnVkdobElHWjFibU4wYVc5dUlIUnZJR05oYkd3Z1ptOXlJR1ZoWTJnZ2FXNTBaWEpqWlhCMGIzSmNiaUFxTDF4dVNXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUxuQnliM1J2ZEhsd1pTNW1iM0pGWVdOb0lEMGdablZ1WTNScGIyNGdabTl5UldGamFDaG1iaWtnZTF4dUlDQjFkR2xzY3k1bWIzSkZZV05vS0hSb2FYTXVhR0Z1Wkd4bGNuTXNJR1oxYm1OMGFXOXVJR1p2Y2tWaFkyaElZVzVrYkdWeUtHZ3BJSHRjYmlBZ0lDQnBaaUFvYUNBaFBUMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ1ptNG9hQ2s3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibjA3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1NXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2FYTkJZbk52YkhWMFpWVlNUQ0E5SUhKbGNYVnBjbVVvSnk0dUwyaGxiSEJsY25NdmFYTkJZbk52YkhWMFpWVlNUQ2NwTzF4dWRtRnlJR052YldKcGJtVlZVa3h6SUQwZ2NtVnhkV2x5WlNnbkxpNHZhR1ZzY0dWeWN5OWpiMjFpYVc1bFZWSk1jeWNwTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlhNZ1lTQnVaWGNnVlZKTUlHSjVJR052YldKcGJtbHVaeUIwYUdVZ1ltRnpaVlZTVENCM2FYUm9JSFJvWlNCeVpYRjFaWE4wWldSVlVrd3NYRzRnS2lCdmJteDVJSGRvWlc0Z2RHaGxJSEpsY1hWbGMzUmxaRlZTVENCcGN5QnViM1FnWVd4eVpXRmtlU0JoYmlCaFluTnZiSFYwWlNCVlVrd3VYRzRnS2lCSlppQjBhR1VnY21WeGRXVnpkRlZTVENCcGN5QmhZbk52YkhWMFpTd2dkR2hwY3lCbWRXNWpkR2x2YmlCeVpYUjFjbTV6SUhSb1pTQnlaWEYxWlhOMFpXUlZVa3dnZFc1MGIzVmphR1ZrTGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JpWVhObFZWSk1JRlJvWlNCaVlYTmxJRlZTVEZ4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlISmxjWFZsYzNSbFpGVlNUQ0JCWW5OdmJIVjBaU0J2Y2lCeVpXeGhkR2wyWlNCVlVrd2dkRzhnWTI5dFltbHVaVnh1SUNvZ1FISmxkSFZ5Ym5NZ2UzTjBjbWx1WjMwZ1ZHaGxJR052YldKcGJtVmtJR1oxYkd3Z2NHRjBhRnh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHSjFhV3hrUm5Wc2JGQmhkR2dvWW1GelpWVlNUQ3dnY21WeGRXVnpkR1ZrVlZKTUtTQjdYRzRnSUdsbUlDaGlZWE5sVlZKTUlDWW1JQ0ZwYzBGaWMyOXNkWFJsVlZKTUtISmxjWFZsYzNSbFpGVlNUQ2twSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZMjl0WW1sdVpWVlNUSE1vWW1GelpWVlNUQ3dnY21WeGRXVnpkR1ZrVlZKTUtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnhkV1Z6ZEdWa1ZWSk1PMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdWdWFHRnVZMlZGY25KdmNpQTlJSEpsY1hWcGNtVW9KeTR2Wlc1b1lXNWpaVVZ5Y205eUp5azdYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxJR0Z1SUVWeWNtOXlJSGRwZEdnZ2RHaGxJSE53WldOcFptbGxaQ0J0WlhOellXZGxMQ0JqYjI1bWFXY3NJR1Z5Y205eUlHTnZaR1VzSUhKbGNYVmxjM1FnWVc1a0lISmxjM0J2Ym5ObExseHVJQ3BjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCdFpYTnpZV2RsSUZSb1pTQmxjbkp2Y2lCdFpYTnpZV2RsTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTnZibVpwWnlCVWFHVWdZMjl1Wm1sbkxseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJRnRqYjJSbFhTQlVhR1VnWlhKeWIzSWdZMjlrWlNBb1ptOXlJR1Y0WVcxd2JHVXNJQ2RGUTA5T1RrRkNUMUpVUlVRbktTNWNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JiY21WeGRXVnpkRjBnVkdobElISmxjWFZsYzNRdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM0psYzNCdmJuTmxYU0JVYUdVZ2NtVnpjRzl1YzJVdVhHNGdLaUJBY21WMGRYSnVjeUI3UlhKeWIzSjlJRlJvWlNCamNtVmhkR1ZrSUdWeWNtOXlMbHh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHTnlaV0YwWlVWeWNtOXlLRzFsYzNOaFoyVXNJR052Ym1acFp5d2dZMjlrWlN3Z2NtVnhkV1Z6ZEN3Z2NtVnpjRzl1YzJVcElIdGNiaUFnZG1GeUlHVnljbTl5SUQwZ2JtVjNJRVZ5Y205eUtHMWxjM05oWjJVcE8xeHVJQ0J5WlhSMWNtNGdaVzVvWVc1alpVVnljbTl5S0dWeWNtOXlMQ0JqYjI1bWFXY3NJR052WkdVc0lISmxjWFZsYzNRc0lISmxjM0J2Ym5ObEtUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JuWmhjaUIwY21GdWMyWnZjbTFFWVhSaElEMGdjbVZ4ZFdseVpTZ25MaTkwY21GdWMyWnZjbTFFWVhSaEp5azdYRzUyWVhJZ2FYTkRZVzVqWld3Z1BTQnlaWEYxYVhKbEtDY3VMaTlqWVc1alpXd3ZhWE5EWVc1alpXd25LVHRjYm5aaGNpQmtaV1poZFd4MGN5QTlJSEpsY1hWcGNtVW9KeTR1TDJSbFptRjFiSFJ6SnlrN1hHNWNiaThxS2x4dUlDb2dWR2h5YjNkeklHRWdZRU5oYm1ObGJHQWdhV1lnWTJGdVkyVnNiR0YwYVc5dUlHaGhjeUJpWldWdUlISmxjWFZsYzNSbFpDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2RHaHliM2RKWmtOaGJtTmxiR3hoZEdsdmJsSmxjWFZsYzNSbFpDaGpiMjVtYVdjcElIdGNiaUFnYVdZZ0tHTnZibVpwWnk1allXNWpaV3hVYjJ0bGJpa2dlMXh1SUNBZ0lHTnZibVpwWnk1allXNWpaV3hVYjJ0bGJpNTBhSEp2ZDBsbVVtVnhkV1Z6ZEdWa0tDazdYRzRnSUgxY2JuMWNibHh1THlvcVhHNGdLaUJFYVhOd1lYUmphQ0JoSUhKbGNYVmxjM1FnZEc4Z2RHaGxJSE5sY25abGNpQjFjMmx1WnlCMGFHVWdZMjl1Wm1sbmRYSmxaQ0JoWkdGd2RHVnlMbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdiMkpxWldOMGZTQmpiMjVtYVdjZ1ZHaGxJR052Ym1acFp5QjBhR0YwSUdseklIUnZJR0psSUhWelpXUWdabTl5SUhSb1pTQnlaWEYxWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3VUhKdmJXbHpaWDBnVkdobElGQnliMjFwYzJVZ2RHOGdZbVVnWm5Wc1ptbHNiR1ZrWEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdaR2x6Y0dGMFkyaFNaWEYxWlhOMEtHTnZibVpwWnlrZ2UxeHVJQ0IwYUhKdmQwbG1RMkZ1WTJWc2JHRjBhVzl1VW1WeGRXVnpkR1ZrS0dOdmJtWnBaeWs3WEc1Y2JpQWdMeThnUlc1emRYSmxJR2hsWVdSbGNuTWdaWGhwYzNSY2JpQWdZMjl1Wm1sbkxtaGxZV1JsY25NZ1BTQmpiMjVtYVdjdWFHVmhaR1Z5Y3lCOGZDQjdmVHRjYmx4dUlDQXZMeUJVY21GdWMyWnZjbTBnY21WeGRXVnpkQ0JrWVhSaFhHNGdJR052Ym1acFp5NWtZWFJoSUQwZ2RISmhibk5tYjNKdFJHRjBZU2hjYmlBZ0lDQmpiMjVtYVdjdVpHRjBZU3hjYmlBZ0lDQmpiMjVtYVdjdWFHVmhaR1Z5Y3l4Y2JpQWdJQ0JqYjI1bWFXY3VkSEpoYm5ObWIzSnRVbVZ4ZFdWemRGeHVJQ0FwTzF4dVhHNGdJQzh2SUVac1lYUjBaVzRnYUdWaFpHVnljMXh1SUNCamIyNW1hV2N1YUdWaFpHVnljeUE5SUhWMGFXeHpMbTFsY21kbEtGeHVJQ0FnSUdOdmJtWnBaeTVvWldGa1pYSnpMbU52YlcxdmJpQjhmQ0I3ZlN4Y2JpQWdJQ0JqYjI1bWFXY3VhR1ZoWkdWeWMxdGpiMjVtYVdjdWJXVjBhRzlrWFNCOGZDQjdmU3hjYmlBZ0lDQmpiMjVtYVdjdWFHVmhaR1Z5YzF4dUlDQXBPMXh1WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvWEc0Z0lDQWdXeWRrWld4bGRHVW5MQ0FuWjJWMEp5d2dKMmhsWVdRbkxDQW5jRzl6ZENjc0lDZHdkWFFuTENBbmNHRjBZMmduTENBblkyOXRiVzl1SjEwc1hHNGdJQ0FnWm5WdVkzUnBiMjRnWTJ4bFlXNUlaV0ZrWlhKRGIyNW1hV2NvYldWMGFHOWtLU0I3WEc0Z0lDQWdJQ0JrWld4bGRHVWdZMjl1Wm1sbkxtaGxZV1JsY25OYmJXVjBhRzlrWFR0Y2JpQWdJQ0I5WEc0Z0lDazdYRzVjYmlBZ2RtRnlJR0ZrWVhCMFpYSWdQU0JqYjI1bWFXY3VZV1JoY0hSbGNpQjhmQ0JrWldaaGRXeDBjeTVoWkdGd2RHVnlPMXh1WEc0Z0lISmxkSFZ5YmlCaFpHRndkR1Z5S0dOdmJtWnBaeWt1ZEdobGJpaG1kVzVqZEdsdmJpQnZia0ZrWVhCMFpYSlNaWE52YkhWMGFXOXVLSEpsYzNCdmJuTmxLU0I3WEc0Z0lDQWdkR2h5YjNkSlprTmhibU5sYkd4aGRHbHZibEpsY1hWbGMzUmxaQ2hqYjI1bWFXY3BPMXh1WEc0Z0lDQWdMeThnVkhKaGJuTm1iM0p0SUhKbGMzQnZibk5sSUdSaGRHRmNiaUFnSUNCeVpYTndiMjV6WlM1a1lYUmhJRDBnZEhKaGJuTm1iM0p0UkdGMFlTaGNiaUFnSUNBZ0lISmxjM0J2Ym5ObExtUmhkR0VzWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaUzVvWldGa1pYSnpMRnh1SUNBZ0lDQWdZMjl1Wm1sbkxuUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObFhHNGdJQ0FnS1R0Y2JseHVJQ0FnSUhKbGRIVnliaUJ5WlhOd2IyNXpaVHRjYmlBZ2ZTd2dablZ1WTNScGIyNGdiMjVCWkdGd2RHVnlVbVZxWldOMGFXOXVLSEpsWVhOdmJpa2dlMXh1SUNBZ0lHbG1JQ2doYVhORFlXNWpaV3dvY21WaGMyOXVLU2tnZTF4dUlDQWdJQ0FnZEdoeWIzZEpaa05oYm1ObGJHeGhkR2x2YmxKbGNYVmxjM1JsWkNoamIyNW1hV2NwTzF4dVhHNGdJQ0FnSUNBdkx5QlVjbUZ1YzJadmNtMGdjbVZ6Y0c5dWMyVWdaR0YwWVZ4dUlDQWdJQ0FnYVdZZ0tISmxZWE52YmlBbUppQnlaV0Z6YjI0dWNtVnpjRzl1YzJVcElIdGNiaUFnSUNBZ0lDQWdjbVZoYzI5dUxuSmxjM0J2Ym5ObExtUmhkR0VnUFNCMGNtRnVjMlp2Y20xRVlYUmhLRnh1SUNBZ0lDQWdJQ0FnSUhKbFlYTnZiaTV5WlhOd2IyNXpaUzVrWVhSaExGeHVJQ0FnSUNBZ0lDQWdJSEpsWVhOdmJpNXlaWE53YjI1elpTNW9aV0ZrWlhKekxGeHVJQ0FnSUNBZ0lDQWdJR052Ym1acFp5NTBjbUZ1YzJadmNtMVNaWE53YjI1elpWeHVJQ0FnSUNBZ0lDQXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCUWNtOXRhWE5sTG5KbGFtVmpkQ2h5WldGemIyNHBPMXh1SUNCOUtUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1ZYQmtZWFJsSUdGdUlFVnljbTl5SUhkcGRHZ2dkR2hsSUhOd1pXTnBabWxsWkNCamIyNW1hV2NzSUdWeWNtOXlJR052WkdVc0lHRnVaQ0J5WlhOd2IyNXpaUzVjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMFZ5Y205eWZTQmxjbkp2Y2lCVWFHVWdaWEp5YjNJZ2RHOGdkWEJrWVhSbExseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR052Ym1acFp5QlVhR1VnWTI5dVptbG5MbHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUZ0amIyUmxYU0JVYUdVZ1pYSnliM0lnWTI5a1pTQW9abTl5SUdWNFlXMXdiR1VzSUNkRlEwOU9Ua0ZDVDFKVVJVUW5LUzVjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCYmNtVnhkV1Z6ZEYwZ1ZHaGxJSEpsY1hWbGMzUXVYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnVzNKbGMzQnZibk5sWFNCVWFHVWdjbVZ6Y0c5dWMyVXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1JYSnliM0o5SUZSb1pTQmxjbkp2Y2k1Y2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJsYm1oaGJtTmxSWEp5YjNJb1pYSnliM0lzSUdOdmJtWnBaeXdnWTI5a1pTd2djbVZ4ZFdWemRDd2djbVZ6Y0c5dWMyVXBJSHRjYmlBZ1pYSnliM0l1WTI5dVptbG5JRDBnWTI5dVptbG5PMXh1SUNCcFppQW9ZMjlrWlNrZ2UxeHVJQ0FnSUdWeWNtOXlMbU52WkdVZ1BTQmpiMlJsTzF4dUlDQjlYRzVjYmlBZ1pYSnliM0l1Y21WeGRXVnpkQ0E5SUhKbGNYVmxjM1E3WEc0Z0lHVnljbTl5TG5KbGMzQnZibk5sSUQwZ2NtVnpjRzl1YzJVN1hHNGdJR1Z5Y205eUxtbHpRWGhwYjNORmNuSnZjaUE5SUhSeWRXVTdYRzVjYmlBZ1pYSnliM0l1ZEc5S1UwOU9JRDBnWm5WdVkzUnBiMjRnZEc5S1UwOU9LQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQXZMeUJUZEdGdVpHRnlaRnh1SUNBZ0lDQWdiV1Z6YzJGblpUb2dkR2hwY3k1dFpYTnpZV2RsTEZ4dUlDQWdJQ0FnYm1GdFpUb2dkR2hwY3k1dVlXMWxMRnh1SUNBZ0lDQWdMeThnVFdsamNtOXpiMlowWEc0Z0lDQWdJQ0JrWlhOamNtbHdkR2x2YmpvZ2RHaHBjeTVrWlhOamNtbHdkR2x2Yml4Y2JpQWdJQ0FnSUc1MWJXSmxjam9nZEdocGN5NXVkVzFpWlhJc1hHNGdJQ0FnSUNBdkx5Qk5iM3BwYkd4aFhHNGdJQ0FnSUNCbWFXeGxUbUZ0WlRvZ2RHaHBjeTVtYVd4bFRtRnRaU3hjYmlBZ0lDQWdJR3hwYm1WT2RXMWlaWEk2SUhSb2FYTXViR2x1WlU1MWJXSmxjaXhjYmlBZ0lDQWdJR052YkhWdGJrNTFiV0psY2pvZ2RHaHBjeTVqYjJ4MWJXNU9kVzFpWlhJc1hHNGdJQ0FnSUNCemRHRmphem9nZEdocGN5NXpkR0ZqYXl4Y2JpQWdJQ0FnSUM4dklFRjRhVzl6WEc0Z0lDQWdJQ0JqYjI1bWFXYzZJSFJvYVhNdVkyOXVabWxuTEZ4dUlDQWdJQ0FnWTI5a1pUb2dkR2hwY3k1amIyUmxYRzRnSUNBZ2ZUdGNiaUFnZlR0Y2JpQWdjbVYwZFhKdUlHVnljbTl5TzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpNHZkWFJwYkhNbktUdGNibHh1THlvcVhHNGdLaUJEYjI1bWFXY3RjM0JsWTJsbWFXTWdiV1Z5WjJVdFpuVnVZM1JwYjI0Z2QyaHBZMmdnWTNKbFlYUmxjeUJoSUc1bGR5QmpiMjVtYVdjdGIySnFaV04wWEc0Z0tpQmllU0J0WlhKbmFXNW5JSFIzYnlCamIyNW1hV2QxY21GMGFXOXVJRzlpYW1WamRITWdkRzluWlhSb1pYSXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTnZibVpwWnpGY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmpiMjVtYVdjeVhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JPWlhjZ2IySnFaV04wSUhKbGMzVnNkR2x1WnlCbWNtOXRJRzFsY21kcGJtY2dZMjl1Wm1sbk1pQjBieUJqYjI1bWFXY3hYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2JXVnlaMlZEYjI1bWFXY29ZMjl1Wm1sbk1Td2dZMjl1Wm1sbk1pa2dlMXh1SUNBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxdVpYaDBMV3hwYm1VZ2JtOHRjR0Z5WVcwdGNtVmhjM05wWjI1Y2JpQWdZMjl1Wm1sbk1pQTlJR052Ym1acFp6SWdmSHdnZTMwN1hHNGdJSFpoY2lCamIyNW1hV2NnUFNCN2ZUdGNibHh1SUNCMllYSWdkbUZzZFdWR2NtOXRRMjl1Wm1sbk1rdGxlWE1nUFNCYkozVnliQ2NzSUNkdFpYUm9iMlFuTENBblpHRjBZU2RkTzF4dUlDQjJZWElnYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsYzB0bGVYTWdQU0JiSjJobFlXUmxjbk1uTENBbllYVjBhQ2NzSUNkd2NtOTRlU2NzSUNkd1lYSmhiWE1uWFR0Y2JpQWdkbUZ5SUdSbFptRjFiSFJVYjBOdmJtWnBaekpMWlhseklEMGdXMXh1SUNBZ0lDZGlZWE5sVlZKTUp5d2dKM1J5WVc1elptOXliVkpsY1hWbGMzUW5MQ0FuZEhKaGJuTm1iM0p0VW1WemNHOXVjMlVuTENBbmNHRnlZVzF6VTJWeWFXRnNhWHBsY2ljc1hHNGdJQ0FnSjNScGJXVnZkWFFuTENBbmRHbHRaVzkxZEUxbGMzTmhaMlVuTENBbmQybDBhRU55WldSbGJuUnBZV3h6Snl3Z0oyRmtZWEIwWlhJbkxDQW5jbVZ6Y0c5dWMyVlVlWEJsSnl3Z0ozaHpjbVpEYjI5cmFXVk9ZVzFsSnl4Y2JpQWdJQ0FuZUhOeVpraGxZV1JsY2s1aGJXVW5MQ0FuYjI1VmNHeHZZV1JRY205bmNtVnpjeWNzSUNkdmJrUnZkMjVzYjJGa1VISnZaM0psYzNNbkxDQW5aR1ZqYjIxd2NtVnpjeWNzWEc0Z0lDQWdKMjFoZUVOdmJuUmxiblJNWlc1bmRHZ25MQ0FuYldGNFFtOWtlVXhsYm1kMGFDY3NJQ2R0WVhoU1pXUnBjbVZqZEhNbkxDQW5kSEpoYm5Od2IzSjBKeXdnSjJoMGRIQkJaMlZ1ZENjc1hHNGdJQ0FnSjJoMGRIQnpRV2RsYm5RbkxDQW5ZMkZ1WTJWc1ZHOXJaVzRuTENBbmMyOWphMlYwVUdGMGFDY3NJQ2R5WlhOd2IyNXpaVVZ1WTI5a2FXNW5KMXh1SUNCZE8xeHVJQ0IyWVhJZ1pHbHlaV04wVFdWeVoyVkxaWGx6SUQwZ1d5ZDJZV3hwWkdGMFpWTjBZWFIxY3lkZE8xeHVYRzRnSUdaMWJtTjBhVzl1SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFJoY21kbGRDd2djMjkxY21ObEtTQjdYRzRnSUNBZ2FXWWdLSFYwYVd4ekxtbHpVR3hoYVc1UFltcGxZM1FvZEdGeVoyVjBLU0FtSmlCMWRHbHNjeTVwYzFCc1lXbHVUMkpxWldOMEtITnZkWEpqWlNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMWRHbHNjeTV0WlhKblpTaDBZWEpuWlhRc0lITnZkWEpqWlNrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNoMWRHbHNjeTVwYzFCc1lXbHVUMkpxWldOMEtITnZkWEpqWlNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMWRHbHNjeTV0WlhKblpTaDdmU3dnYzI5MWNtTmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFYwYVd4ekxtbHpRWEp5WVhrb2MyOTFjbU5sS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhOdmRYSmpaUzV6YkdsalpTZ3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnYzI5MWNtTmxPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsY3lod2NtOXdLU0I3WEc0Z0lDQWdhV1lnS0NGMWRHbHNjeTVwYzFWdVpHVm1hVzVsWkNoamIyNW1hV2N5VzNCeWIzQmRLU2tnZTF4dUlDQWdJQ0FnWTI5dVptbG5XM0J5YjNCZElEMGdaMlYwVFdWeVoyVmtWbUZzZFdVb1kyOXVabWxuTVZ0d2NtOXdYU3dnWTI5dVptbG5NbHR3Y205d1hTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDZ2hkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9ZMjl1Wm1sbk1WdHdjbTl3WFNrcElIdGNiaUFnSUNBZ0lHTnZibVpwWjF0d2NtOXdYU0E5SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFZ1WkdWbWFXNWxaQ3dnWTI5dVptbG5NVnR3Y205d1hTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdkWFJwYkhNdVptOXlSV0ZqYUNoMllXeDFaVVp5YjIxRGIyNW1hV2N5UzJWNWN5d2dablZ1WTNScGIyNGdkbUZzZFdWR2NtOXRRMjl1Wm1sbk1paHdjbTl3S1NCN1hHNGdJQ0FnYVdZZ0tDRjFkR2xzY3k1cGMxVnVaR1ZtYVc1bFpDaGpiMjVtYVdjeVczQnliM0JkS1NrZ2UxeHVJQ0FnSUNBZ1kyOXVabWxuVzNCeWIzQmRJRDBnWjJWMFRXVnlaMlZrVm1Gc2RXVW9kVzVrWldacGJtVmtMQ0JqYjI1bWFXY3lXM0J5YjNCZEtUdGNiaUFnSUNCOVhHNGdJSDBwTzF4dVhHNGdJSFYwYVd4ekxtWnZja1ZoWTJnb2JXVnlaMlZFWldWd1VISnZjR1Z5ZEdsbGMwdGxlWE1zSUcxbGNtZGxSR1ZsY0ZCeWIzQmxjblJwWlhNcE8xeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29aR1ZtWVhWc2RGUnZRMjl1Wm1sbk1rdGxlWE1zSUdaMWJtTjBhVzl1SUdSbFptRjFiSFJVYjBOdmJtWnBaeklvY0hKdmNDa2dlMXh1SUNBZ0lHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5NbHR3Y205d1hTa3BJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0hWdVpHVm1hVzVsWkN3Z1kyOXVabWxuTWx0d2NtOXdYU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5NVnR3Y205d1hTa3BJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0hWdVpHVm1hVzVsWkN3Z1kyOXVabWxuTVZ0d2NtOXdYU2s3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibHh1SUNCMWRHbHNjeTVtYjNKRllXTm9LR1JwY21WamRFMWxjbWRsUzJWNWN5d2dablZ1WTNScGIyNGdiV1Z5WjJVb2NISnZjQ2tnZTF4dUlDQWdJR2xtSUNod2NtOXdJR2x1SUdOdmJtWnBaeklwSUh0Y2JpQWdJQ0FnSUdOdmJtWnBaMXR3Y205d1hTQTlJR2RsZEUxbGNtZGxaRlpoYkhWbEtHTnZibVpwWnpGYmNISnZjRjBzSUdOdmJtWnBaekpiY0hKdmNGMHBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9jSEp2Y0NCcGJpQmpiMjVtYVdjeEtTQjdYRzRnSUNBZ0lDQmpiMjVtYVdkYmNISnZjRjBnUFNCblpYUk5aWEpuWldSV1lXeDFaU2gxYm1SbFptbHVaV1FzSUdOdmJtWnBaekZiY0hKdmNGMHBPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNWNiaUFnZG1GeUlHRjRhVzl6UzJWNWN5QTlJSFpoYkhWbFJuSnZiVU52Ym1acFp6SkxaWGx6WEc0Z0lDQWdMbU52Ym1OaGRDaHRaWEpuWlVSbFpYQlFjbTl3WlhKMGFXVnpTMlY1Y3lsY2JpQWdJQ0F1WTI5dVkyRjBLR1JsWm1GMWJIUlViME52Ym1acFp6SkxaWGx6S1Z4dUlDQWdJQzVqYjI1allYUW9aR2x5WldOMFRXVnlaMlZMWlhsektUdGNibHh1SUNCMllYSWdiM1JvWlhKTFpYbHpJRDBnVDJKcVpXTjBYRzRnSUNBZ0xtdGxlWE1vWTI5dVptbG5NU2xjYmlBZ0lDQXVZMjl1WTJGMEtFOWlhbVZqZEM1clpYbHpLR052Ym1acFp6SXBLVnh1SUNBZ0lDNW1hV3gwWlhJb1puVnVZM1JwYjI0Z1ptbHNkR1Z5UVhocGIzTkxaWGx6S0d0bGVTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHRjRhVzl6UzJWNWN5NXBibVJsZUU5bUtHdGxlU2tnUFQwOUlDMHhPMXh1SUNBZ0lIMHBPMXh1WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvYjNSb1pYSkxaWGx6TENCdFpYSm5aVVJsWlhCUWNtOXdaWEowYVdWektUdGNibHh1SUNCeVpYUjFjbTRnWTI5dVptbG5PMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdOeVpXRjBaVVZ5Y205eUlEMGdjbVZ4ZFdseVpTZ25MaTlqY21WaGRHVkZjbkp2Y2ljcE8xeHVYRzR2S2lwY2JpQXFJRkpsYzI5c2RtVWdiM0lnY21WcVpXTjBJR0VnVUhKdmJXbHpaU0JpWVhObFpDQnZiaUJ5WlhOd2IyNXpaU0J6ZEdGMGRYTXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdjbVZ6YjJ4MlpTQkJJR1oxYm1OMGFXOXVJSFJvWVhRZ2NtVnpiMngyWlhNZ2RHaGxJSEJ5YjIxcGMyVXVYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCeVpXcGxZM1FnUVNCbWRXNWpkR2x2YmlCMGFHRjBJSEpsYW1WamRITWdkR2hsSUhCeWIyMXBjMlV1WEc0Z0tpQkFjR0Z5WVcwZ2UyOWlhbVZqZEgwZ2NtVnpjRzl1YzJVZ1ZHaGxJSEpsYzNCdmJuTmxMbHh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlITmxkSFJzWlNoeVpYTnZiSFpsTENCeVpXcGxZM1FzSUhKbGMzQnZibk5sS1NCN1hHNGdJSFpoY2lCMllXeHBaR0YwWlZOMFlYUjFjeUE5SUhKbGMzQnZibk5sTG1OdmJtWnBaeTUyWVd4cFpHRjBaVk4wWVhSMWN6dGNiaUFnYVdZZ0tDRnlaWE53YjI1elpTNXpkR0YwZFhNZ2ZId2dJWFpoYkdsa1lYUmxVM1JoZEhWeklIeDhJSFpoYkdsa1lYUmxVM1JoZEhWektISmxjM0J2Ym5ObExuTjBZWFIxY3lrcElIdGNiaUFnSUNCeVpYTnZiSFpsS0hKbGMzQnZibk5sS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCeVpXcGxZM1FvWTNKbFlYUmxSWEp5YjNJb1hHNGdJQ0FnSUNBblVtVnhkV1Z6ZENCbVlXbHNaV1FnZDJsMGFDQnpkR0YwZFhNZ1kyOWtaU0FuSUNzZ2NtVnpjRzl1YzJVdWMzUmhkSFZ6TEZ4dUlDQWdJQ0FnY21WemNHOXVjMlV1WTI5dVptbG5MRnh1SUNBZ0lDQWdiblZzYkN4Y2JpQWdJQ0FnSUhKbGMzQnZibk5sTG5KbGNYVmxjM1FzWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaVnh1SUNBZ0lDa3BPMXh1SUNCOVhHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDNWMGFXeHpKeWs3WEc1Y2JpOHFLbHh1SUNvZ1ZISmhibk5tYjNKdElIUm9aU0JrWVhSaElHWnZjaUJoSUhKbGNYVmxjM1FnYjNJZ1lTQnlaWE53YjI1elpWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZkZOMGNtbHVaMzBnWkdGMFlTQlVhR1VnWkdGMFlTQjBieUJpWlNCMGNtRnVjMlp2Y20xbFpGeHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdhR1ZoWkdWeWN5QlVhR1VnYUdWaFpHVnljeUJtYjNJZ2RHaGxJSEpsY1hWbGMzUWdiM0lnY21WemNHOXVjMlZjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGw4Um5WdVkzUnBiMjU5SUdadWN5QkJJSE5wYm1kc1pTQm1kVzVqZEdsdmJpQnZjaUJCY25KaGVTQnZaaUJtZFc1amRHbHZibk5jYmlBcUlFQnlaWFIxY201eklIc3FmU0JVYUdVZ2NtVnpkV3gwYVc1bklIUnlZVzV6Wm05eWJXVmtJR1JoZEdGY2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUIwY21GdWMyWnZjbTFFWVhSaEtHUmhkR0VzSUdobFlXUmxjbk1zSUdadWN5a2dlMXh1SUNBdkttVnpiR2x1ZENCdWJ5MXdZWEpoYlMxeVpXRnpjMmxuYmpvd0tpOWNiaUFnZFhScGJITXVabTl5UldGamFDaG1ibk1zSUdaMWJtTjBhVzl1SUhSeVlXNXpabTl5YlNobWJpa2dlMXh1SUNBZ0lHUmhkR0VnUFNCbWJpaGtZWFJoTENCb1pXRmtaWEp6S1R0Y2JpQWdmU2s3WEc1Y2JpQWdjbVYwZFhKdUlHUmhkR0U3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUwzVjBhV3h6SnlrN1hHNTJZWElnYm05eWJXRnNhWHBsU0dWaFpHVnlUbUZ0WlNBOUlISmxjWFZwY21Vb0p5NHZhR1ZzY0dWeWN5OXViM0p0WVd4cGVtVklaV0ZrWlhKT1lXMWxKeWs3WEc1Y2JuWmhjaUJFUlVaQlZVeFVYME5QVGxSRlRsUmZWRmxRUlNBOUlIdGNiaUFnSjBOdmJuUmxiblF0Vkhsd1pTYzZJQ2RoY0hCc2FXTmhkR2x2Ymk5NExYZDNkeTFtYjNKdExYVnliR1Z1WTI5a1pXUW5YRzU5TzF4dVhHNW1kVzVqZEdsdmJpQnpaWFJEYjI1MFpXNTBWSGx3WlVsbVZXNXpaWFFvYUdWaFpHVnljeXdnZG1Gc2RXVXBJSHRjYmlBZ2FXWWdLQ0YxZEdsc2N5NXBjMVZ1WkdWbWFXNWxaQ2hvWldGa1pYSnpLU0FtSmlCMWRHbHNjeTVwYzFWdVpHVm1hVzVsWkNob1pXRmtaWEp6V3lkRGIyNTBaVzUwTFZSNWNHVW5YU2twSUh0Y2JpQWdJQ0JvWldGa1pYSnpXeWREYjI1MFpXNTBMVlI1Y0dVblhTQTlJSFpoYkhWbE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFJCWkdGd2RHVnlLQ2tnZTF4dUlDQjJZWElnWVdSaGNIUmxjanRjYmlBZ2FXWWdLSFI1Y0dWdlppQllUVXhJZEhSd1VtVnhkV1Z6ZENBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUh0Y2JpQWdJQ0F2THlCR2IzSWdZbkp2ZDNObGNuTWdkWE5sSUZoSVVpQmhaR0Z3ZEdWeVhHNGdJQ0FnWVdSaGNIUmxjaUE5SUhKbGNYVnBjbVVvSnk0dllXUmhjSFJsY25NdmVHaHlKeWs3WEc0Z0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlIQnliMk5sYzNNZ0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jdVkyRnNiQ2h3Y205alpYTnpLU0E5UFQwZ0oxdHZZbXBsWTNRZ2NISnZZMlZ6YzEwbktTQjdYRzRnSUNBZ0x5OGdSbTl5SUc1dlpHVWdkWE5sSUVoVVZGQWdZV1JoY0hSbGNseHVJQ0FnSUdGa1lYQjBaWElnUFNCeVpYRjFhWEpsS0NjdUwyRmtZWEIwWlhKekwyaDBkSEFuS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWVdSaGNIUmxjanRjYm4xY2JseHVkbUZ5SUdSbFptRjFiSFJ6SUQwZ2UxeHVJQ0JoWkdGd2RHVnlPaUJuWlhSRVpXWmhkV3gwUVdSaGNIUmxjaWdwTEZ4dVhHNGdJSFJ5WVc1elptOXliVkpsY1hWbGMzUTZJRnRtZFc1amRHbHZiaUIwY21GdWMyWnZjbTFTWlhGMVpYTjBLR1JoZEdFc0lHaGxZV1JsY25NcElIdGNiaUFnSUNCdWIzSnRZV3hwZW1WSVpXRmtaWEpPWVcxbEtHaGxZV1JsY25Nc0lDZEJZMk5sY0hRbktUdGNiaUFnSUNCdWIzSnRZV3hwZW1WSVpXRmtaWEpPWVcxbEtHaGxZV1JsY25Nc0lDZERiMjUwWlc1MExWUjVjR1VuS1R0Y2JpQWdJQ0JwWmlBb2RYUnBiSE11YVhOR2IzSnRSR0YwWVNoa1lYUmhLU0I4ZkZ4dUlDQWdJQ0FnZFhScGJITXVhWE5CY25KaGVVSjFabVpsY2loa1lYUmhLU0I4ZkZ4dUlDQWdJQ0FnZFhScGJITXVhWE5DZFdabVpYSW9aR0YwWVNrZ2ZIeGNiaUFnSUNBZ0lIVjBhV3h6TG1selUzUnlaV0Z0S0dSaGRHRXBJSHg4WEc0Z0lDQWdJQ0IxZEdsc2N5NXBjMFpwYkdVb1pHRjBZU2tnZkh4Y2JpQWdJQ0FnSUhWMGFXeHpMbWx6UW14dllpaGtZWFJoS1Z4dUlDQWdJQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1JoZEdFN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNoMWRHbHNjeTVwYzBGeWNtRjVRblZtWm1WeVZtbGxkeWhrWVhSaEtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHUmhkR0V1WW5WbVptVnlPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kWFJwYkhNdWFYTlZVa3hUWldGeVkyaFFZWEpoYlhNb1pHRjBZU2twSUh0Y2JpQWdJQ0FnSUhObGRFTnZiblJsYm5SVWVYQmxTV1pWYm5ObGRDaG9aV0ZrWlhKekxDQW5ZWEJ3YkdsallYUnBiMjR2ZUMxM2QzY3RabTl5YlMxMWNteGxibU52WkdWa08yTm9ZWEp6WlhROWRYUm1MVGduS1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUJrWVhSaExuUnZVM1J5YVc1bktDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaDFkR2xzY3k1cGMwOWlhbVZqZENoa1lYUmhLU2tnZTF4dUlDQWdJQ0FnYzJWMFEyOXVkR1Z1ZEZSNWNHVkpabFZ1YzJWMEtHaGxZV1JsY25Nc0lDZGhjSEJzYVdOaGRHbHZiaTlxYzI5dU8yTm9ZWEp6WlhROWRYUm1MVGduS1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUJLVTA5T0xuTjBjbWx1WjJsbWVTaGtZWFJoS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHUmhkR0U3WEc0Z0lIMWRMRnh1WEc0Z0lIUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObE9pQmJablZ1WTNScGIyNGdkSEpoYm5ObWIzSnRVbVZ6Y0c5dWMyVW9aR0YwWVNrZ2UxeHVJQ0FnSUM4cVpYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2pBcUwxeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFQwZ0ozTjBjbWx1WnljcElIdGNiaUFnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUdSaGRHRWdQU0JLVTA5T0xuQmhjbk5sS0dSaGRHRXBPMXh1SUNBZ0lDQWdmU0JqWVhSamFDQW9aU2tnZXlBdktpQkpaMjV2Y21VZ0tpOGdmVnh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWkdGMFlUdGNiaUFnZlYwc1hHNWNiaUFnTHlvcVhHNGdJQ0FxSUVFZ2RHbHRaVzkxZENCcGJpQnRhV3hzYVhObFkyOXVaSE1nZEc4Z1lXSnZjblFnWVNCeVpYRjFaWE4wTGlCSlppQnpaWFFnZEc4Z01DQW9aR1ZtWVhWc2RDa2dZVnh1SUNBZ0tpQjBhVzFsYjNWMElHbHpJRzV2ZENCamNtVmhkR1ZrTGx4dUlDQWdLaTljYmlBZ2RHbHRaVzkxZERvZ01DeGNibHh1SUNCNGMzSm1RMjl2YTJsbFRtRnRaVG9nSjFoVFVrWXRWRTlMUlU0bkxGeHVJQ0I0YzNKbVNHVmhaR1Z5VG1GdFpUb2dKMWd0V0ZOU1JpMVVUMHRGVGljc1hHNWNiaUFnYldGNFEyOXVkR1Z1ZEV4bGJtZDBhRG9nTFRFc1hHNGdJRzFoZUVKdlpIbE1aVzVuZEdnNklDMHhMRnh1WEc0Z0lIWmhiR2xrWVhSbFUzUmhkSFZ6T2lCbWRXNWpkR2x2YmlCMllXeHBaR0YwWlZOMFlYUjFjeWh6ZEdGMGRYTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2MzUmhkSFZ6SUQ0OUlESXdNQ0FtSmlCemRHRjBkWE1nUENBek1EQTdYRzRnSUgxY2JuMDdYRzVjYm1SbFptRjFiSFJ6TG1obFlXUmxjbk1nUFNCN1hHNGdJR052YlcxdmJqb2dlMXh1SUNBZ0lDZEJZMk5sY0hRbk9pQW5ZWEJ3YkdsallYUnBiMjR2YW5OdmJpd2dkR1Y0ZEM5d2JHRnBiaXdnS2k4cUoxeHVJQ0I5WEc1OU8xeHVYRzUxZEdsc2N5NW1iM0pGWVdOb0tGc25aR1ZzWlhSbEp5d2dKMmRsZENjc0lDZG9aV0ZrSjEwc0lHWjFibU4wYVc5dUlHWnZja1ZoWTJoTlpYUm9iMlJPYjBSaGRHRW9iV1YwYUc5a0tTQjdYRzRnSUdSbFptRjFiSFJ6TG1obFlXUmxjbk5iYldWMGFHOWtYU0E5SUh0OU8xeHVmU2s3WEc1Y2JuVjBhV3h6TG1admNrVmhZMmdvV3lkd2IzTjBKeXdnSjNCMWRDY3NJQ2R3WVhSamFDZGRMQ0JtZFc1amRHbHZiaUJtYjNKRllXTm9UV1YwYUc5a1YybDBhRVJoZEdFb2JXVjBhRzlrS1NCN1hHNGdJR1JsWm1GMWJIUnpMbWhsWVdSbGNuTmJiV1YwYUc5a1hTQTlJSFYwYVd4ekxtMWxjbWRsS0VSRlJrRlZURlJmUTA5T1ZFVk9WRjlVV1ZCRktUdGNibjBwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHUmxabUYxYkhSek8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJR0pwYm1Rb1ptNHNJSFJvYVhOQmNtY3BJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUhkeVlYQW9LU0I3WEc0Z0lDQWdkbUZ5SUdGeVozTWdQU0J1WlhjZ1FYSnlZWGtvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ2s3WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JoY21kekxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0JoY21kelcybGRJRDBnWVhKbmRXMWxiblJ6VzJsZE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdabTR1WVhCd2JIa29kR2hwYzBGeVp5d2dZWEpuY3lrN1hHNGdJSDA3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYm1aMWJtTjBhVzl1SUdWdVkyOWtaU2gyWVd3cElIdGNiaUFnY21WMGRYSnVJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gyWVd3cExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVelFTOW5hU3dnSnpvbktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE1qUXZaeXdnSnlRbktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE1rTXZaMmtzSUNjc0p5a3VYRzRnSUNBZ2NtVndiR0ZqWlNndkpUSXdMMmNzSUNjckp5a3VYRzRnSUNBZ2NtVndiR0ZqWlNndkpUVkNMMmRwTENBbld5Y3BMbHh1SUNBZ0lISmxjR3hoWTJVb0x5VTFSQzluYVN3Z0oxMG5LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkNkV2xzWkNCaElGVlNUQ0JpZVNCaGNIQmxibVJwYm1jZ2NHRnlZVzF6SUhSdklIUm9aU0JsYm1SY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnZFhKc0lGUm9aU0JpWVhObElHOW1JSFJvWlNCMWNtd2dLR1V1Wnk0c0lHaDBkSEE2THk5M2QzY3VaMjl2WjJ4bExtTnZiU2xjYmlBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCYmNHRnlZVzF6WFNCVWFHVWdjR0Z5WVcxeklIUnZJR0psSUdGd2NHVnVaR1ZrWEc0Z0tpQkFjbVYwZFhKdWN5QjdjM1J5YVc1bmZTQlVhR1VnWm05eWJXRjBkR1ZrSUhWeWJGeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdKMWFXeGtWVkpNS0hWeWJDd2djR0Z5WVcxekxDQndZWEpoYlhOVFpYSnBZV3hwZW1WeUtTQjdYRzRnSUM4cVpYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2pBcUwxeHVJQ0JwWmlBb0lYQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUIxY213N1hHNGdJSDFjYmx4dUlDQjJZWElnYzJWeWFXRnNhWHBsWkZCaGNtRnRjenRjYmlBZ2FXWWdLSEJoY21GdGMxTmxjbWxoYkdsNlpYSXBJSHRjYmlBZ0lDQnpaWEpwWVd4cGVtVmtVR0Z5WVcxeklEMGdjR0Z5WVcxelUyVnlhV0ZzYVhwbGNpaHdZWEpoYlhNcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0hWMGFXeHpMbWx6VlZKTVUyVmhjbU5vVUdGeVlXMXpLSEJoY21GdGN5a3BJSHRjYmlBZ0lDQnpaWEpwWVd4cGVtVmtVR0Z5WVcxeklEMGdjR0Z5WVcxekxuUnZVM1J5YVc1bktDazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdkbUZ5SUhCaGNuUnpJRDBnVzEwN1hHNWNiaUFnSUNCMWRHbHNjeTVtYjNKRllXTm9LSEJoY21GdGN5d2dablZ1WTNScGIyNGdjMlZ5YVdGc2FYcGxLSFpoYkN3Z2EyVjVLU0I3WEc0Z0lDQWdJQ0JwWmlBb2RtRnNJRDA5UFNCdWRXeHNJSHg4SUhSNWNHVnZaaUIyWVd3Z1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpRWEp5WVhrb2RtRnNLU2tnZTF4dUlDQWdJQ0FnSUNCclpYa2dQU0JyWlhrZ0t5QW5XMTBuTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZG1Gc0lEMGdXM1poYkYwN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lIVjBhV3h6TG1admNrVmhZMmdvZG1Gc0xDQm1kVzVqZEdsdmJpQndZWEp6WlZaaGJIVmxLSFlwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpSR0YwWlNoMktTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhZZ1BTQjJMblJ2U1ZOUFUzUnlhVzVuS0NrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kWFJwYkhNdWFYTlBZbXBsWTNRb2Rpa3BJSHRjYmlBZ0lDQWdJQ0FnSUNCMklEMGdTbE5QVGk1emRISnBibWRwWm5rb2RpazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY0dGeWRITXVjSFZ6YUNobGJtTnZaR1VvYTJWNUtTQXJJQ2M5SnlBcklHVnVZMjlrWlNoMktTazdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSE5sY21saGJHbDZaV1JRWVhKaGJYTWdQU0J3WVhKMGN5NXFiMmx1S0NjbUp5azdYRzRnSUgxY2JseHVJQ0JwWmlBb2MyVnlhV0ZzYVhwbFpGQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUhaaGNpQm9ZWE5vYldGeWEwbHVaR1Y0SUQwZ2RYSnNMbWx1WkdWNFQyWW9KeU1uS1R0Y2JpQWdJQ0JwWmlBb2FHRnphRzFoY210SmJtUmxlQ0FoUFQwZ0xURXBJSHRjYmlBZ0lDQWdJSFZ5YkNBOUlIVnliQzV6YkdsalpTZ3dMQ0JvWVhOb2JXRnlhMGx1WkdWNEtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCMWNtd2dLejBnS0hWeWJDNXBibVJsZUU5bUtDYy9KeWtnUFQwOUlDMHhJRDhnSno4bklEb2dKeVluS1NBcklITmxjbWxoYkdsNlpXUlFZWEpoYlhNN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2RYSnNPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRWdibVYzSUZWU1RDQmllU0JqYjIxaWFXNXBibWNnZEdobElITndaV05wWm1sbFpDQlZVa3h6WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR0poYzJWVlVrd2dWR2hsSUdKaGMyVWdWVkpNWEc0Z0tpQkFjR0Z5WVcwZ2UzTjBjbWx1WjMwZ2NtVnNZWFJwZG1WVlVrd2dWR2hsSUhKbGJHRjBhWFpsSUZWU1RGeHVJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzBnVkdobElHTnZiV0pwYm1Wa0lGVlNURnh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHTnZiV0pwYm1WVlVreHpLR0poYzJWVlVrd3NJSEpsYkdGMGFYWmxWVkpNS1NCN1hHNGdJSEpsZEhWeWJpQnlaV3hoZEdsMlpWVlNURnh1SUNBZ0lEOGdZbUZ6WlZWU1RDNXlaWEJzWVdObEtDOWNYQzhySkM4c0lDY25LU0FySUNjdkp5QXJJSEpsYkdGMGFYWmxWVkpNTG5KbGNHeGhZMlVvTDE1Y1hDOHJMeXdnSnljcFhHNGdJQ0FnT2lCaVlYTmxWVkpNTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTkxZEdsc2N5Y3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUNoY2JpQWdkWFJwYkhNdWFYTlRkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWW9LU0EvWEc1Y2JpQWdMeThnVTNSaGJtUmhjbVFnWW5KdmQzTmxjaUJsYm5aeklITjFjSEJ2Y25RZ1pHOWpkVzFsYm5RdVkyOXZhMmxsWEc0Z0lDQWdLR1oxYm1OMGFXOXVJSE4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUhkeWFYUmxPaUJtZFc1amRHbHZiaUIzY21sMFpTaHVZVzFsTENCMllXeDFaU3dnWlhod2FYSmxjeXdnY0dGMGFDd2daRzl0WVdsdUxDQnpaV04xY21VcElIdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ1kyOXZhMmxsSUQwZ1cxMDdYRzRnSUNBZ0lDQWdJQ0FnWTI5dmEybGxMbkIxYzJnb2JtRnRaU0FySUNjOUp5QXJJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gyWVd4MVpTa3BPMXh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpUblZ0WW1WeUtHVjRjR2x5WlhNcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyOXJhV1V1Y0hWemFDZ25aWGh3YVhKbGN6MG5JQ3NnYm1WM0lFUmhkR1VvWlhod2FYSmxjeWt1ZEc5SFRWUlRkSEpwYm1jb0tTazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hWMGFXeHpMbWx6VTNSeWFXNW5LSEJoZEdncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyOXJhV1V1Y0hWemFDZ25jR0YwYUQwbklDc2djR0YwYUNrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpVM1J5YVc1bktHUnZiV0ZwYmlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmIydHBaUzV3ZFhOb0tDZGtiMjFoYVc0OUp5QXJJR1J2YldGcGJpazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hObFkzVnlaU0E5UFQwZ2RISjFaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl2YTJsbExuQjFjMmdvSjNObFkzVnlaU2NwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG1OdmIydHBaU0E5SUdOdmIydHBaUzVxYjJsdUtDYzdJQ2NwTzF4dUlDQWdJQ0FnSUNCOUxGeHVYRzRnSUNBZ0lDQWdJSEpsWVdRNklHWjFibU4wYVc5dUlISmxZV1FvYm1GdFpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhaaGNpQnRZWFJqYUNBOUlHUnZZM1Z0Wlc1MExtTnZiMnRwWlM1dFlYUmphQ2h1WlhjZ1VtVm5SWGh3S0Njb1hudzdYRnhjWEhNcUtTZ25JQ3NnYm1GdFpTQXJJQ2NwUFNoYlhqdGRLaWtuS1NrN1hHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDaHRZWFJqYUNBL0lHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHRZWFJqYUZzelhTa2dPaUJ1ZFd4c0tUdGNiaUFnSUNBZ0lDQWdmU3hjYmx4dUlDQWdJQ0FnSUNCeVpXMXZkbVU2SUdaMWJtTjBhVzl1SUhKbGJXOTJaU2h1WVcxbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NTNjbWwwWlNodVlXMWxMQ0FuSnl3Z1JHRjBaUzV1YjNjb0tTQXRJRGcyTkRBd01EQXdLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0I5S1NncElEcGNibHh1SUNBdkx5Qk9iMjRnYzNSaGJtUmhjbVFnWW5KdmQzTmxjaUJsYm5ZZ0tIZGxZaUIzYjNKclpYSnpMQ0J5WldGamRDMXVZWFJwZG1VcElHeGhZMnNnYm1WbFpHVmtJSE4xY0hCdmNuUXVYRzRnSUNBZ0tHWjFibU4wYVc5dUlHNXZibE4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUhkeWFYUmxPaUJtZFc1amRHbHZiaUIzY21sMFpTZ3BJSHQ5TEZ4dUlDQWdJQ0FnSUNCeVpXRmtPaUJtZFc1amRHbHZiaUJ5WldGa0tDa2dleUJ5WlhSMWNtNGdiblZzYkRzZ2ZTeGNiaUFnSUNBZ0lDQWdjbVZ0YjNabE9pQm1kVzVqZEdsdmJpQnlaVzF2ZG1Vb0tTQjdmVnh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlLU2dwWEc0cE8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaWE1nZDJobGRHaGxjaUIwYUdVZ2MzQmxZMmxtYVdWa0lGVlNUQ0JwY3lCaFluTnZiSFYwWlZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0IxY213Z1ZHaGxJRlZTVENCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjBhR1VnYzNCbFkybG1hV1ZrSUZWU1RDQnBjeUJoWW5OdmJIVjBaU3dnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2FYTkJZbk52YkhWMFpWVlNUQ2gxY213cElIdGNiaUFnTHk4Z1FTQlZVa3dnYVhNZ1kyOXVjMmxrWlhKbFpDQmhZbk52YkhWMFpTQnBaaUJwZENCaVpXZHBibk1nZDJsMGFDQmNJanh6WTJobGJXVStPaTh2WENJZ2IzSWdYQ0l2TDF3aUlDaHdjbTkwYjJOdmJDMXlaV3hoZEdsMlpTQlZVa3dwTGx4dUlDQXZMeUJTUmtNZ016azROaUJrWldacGJtVnpJSE5qYUdWdFpTQnVZVzFsSUdGeklHRWdjMlZ4ZFdWdVkyVWdiMllnWTJoaGNtRmpkR1Z5Y3lCaVpXZHBibTVwYm1jZ2QybDBhQ0JoSUd4bGRIUmxjaUJoYm1RZ1ptOXNiRzkzWldSY2JpQWdMeThnWW5rZ1lXNTVJR052YldKcGJtRjBhVzl1SUc5bUlHeGxkSFJsY25Nc0lHUnBaMmwwY3l3Z2NHeDFjeXdnY0dWeWFXOWtMQ0J2Y2lCb2VYQm9aVzR1WEc0Z0lISmxkSFZ5YmlBdlhpaGJZUzE2WFZ0aExYcGNYR1JjWEN0Y1hDMWNYQzVkS2pvcFAxeGNMMXhjTHk5cExuUmxjM1FvZFhKc0tUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQW9YRzRnSUhWMGFXeHpMbWx6VTNSaGJtUmhjbVJDY205M2MyVnlSVzUyS0NrZ1AxeHVYRzRnSUM4dklGTjBZVzVrWVhKa0lHSnliM2R6WlhJZ1pXNTJjeUJvWVhabElHWjFiR3dnYzNWd2NHOXlkQ0J2WmlCMGFHVWdRVkJKY3lCdVpXVmtaV1FnZEc4Z2RHVnpkRnh1SUNBdkx5QjNhR1YwYUdWeUlIUm9aU0J5WlhGMVpYTjBJRlZTVENCcGN5QnZaaUIwYUdVZ2MyRnRaU0J2Y21sbmFXNGdZWE1nWTNWeWNtVnVkQ0JzYjJOaGRHbHZiaTVjYmlBZ0lDQW9ablZ1WTNScGIyNGdjM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2tnZTF4dUlDQWdJQ0FnZG1GeUlHMXphV1VnUFNBdktHMXphV1Y4ZEhKcFpHVnVkQ2t2YVM1MFpYTjBLRzVoZG1sbllYUnZjaTUxYzJWeVFXZGxiblFwTzF4dUlDQWdJQ0FnZG1GeUlIVnliRkJoY25OcGJtZE9iMlJsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWVNjcE8xeHVJQ0FnSUNBZ2RtRnlJRzl5YVdkcGJsVlNURHRjYmx4dUlDQWdJQ0FnTHlvcVhHNGdJQ0FnS2lCUVlYSnpaU0JoSUZWU1RDQjBieUJrYVhOamIzWmxjaUJwZENkeklHTnZiWEJ2Ym1WdWRITmNiaUFnSUNBcVhHNGdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnZFhKc0lGUm9aU0JWVWt3Z2RHOGdZbVVnY0dGeWMyVmtYRzRnSUNBZ0tpQkFjbVYwZFhKdWN5QjdUMkpxWldOMGZWeHVJQ0FnSUNvdlhHNGdJQ0FnSUNCbWRXNWpkR2x2YmlCeVpYTnZiSFpsVlZKTUtIVnliQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdhSEpsWmlBOUlIVnliRHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9iWE5wWlNrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJKUlNCdVpXVmtjeUJoZEhSeWFXSjFkR1VnYzJWMElIUjNhV05sSUhSdklHNXZjbTFoYkdsNlpTQndjbTl3WlhKMGFXVnpYRzRnSUNBZ0lDQWdJQ0FnZFhKc1VHRnljMmx1WjA1dlpHVXVjMlYwUVhSMGNtbGlkWFJsS0Nkb2NtVm1KeXdnYUhKbFppazdYRzRnSUNBZ0lDQWdJQ0FnYUhKbFppQTlJSFZ5YkZCaGNuTnBibWRPYjJSbExtaHlaV1k3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQjFjbXhRWVhKemFXNW5UbTlrWlM1elpYUkJkSFJ5YVdKMWRHVW9KMmh5WldZbkxDQm9jbVZtS1R0Y2JseHVJQ0FnSUNBZ0lDQXZMeUIxY214UVlYSnphVzVuVG05a1pTQndjbTkyYVdSbGN5QjBhR1VnVlhKc1ZYUnBiSE1nYVc1MFpYSm1ZV05sSUMwZ2FIUjBjRG92TDNWeWJDNXpjR1ZqTG5kb1lYUjNaeTV2Y21jdkkzVnliSFYwYVd4elhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNBZ0lDQWdhSEpsWmpvZ2RYSnNVR0Z5YzJsdVowNXZaR1V1YUhKbFppeGNiaUFnSUNBZ0lDQWdJQ0J3Y205MGIyTnZiRG9nZFhKc1VHRnljMmx1WjA1dlpHVXVjSEp2ZEc5amIyd2dQeUIxY214UVlYSnphVzVuVG05a1pTNXdjbTkwYjJOdmJDNXlaWEJzWVdObEtDODZKQzhzSUNjbktTQTZJQ2NuTEZ4dUlDQWdJQ0FnSUNBZ0lHaHZjM1E2SUhWeWJGQmhjbk5wYm1kT2IyUmxMbWh2YzNRc1hHNGdJQ0FnSUNBZ0lDQWdjMlZoY21Ob09pQjFjbXhRWVhKemFXNW5UbTlrWlM1elpXRnlZMmdnUHlCMWNteFFZWEp6YVc1blRtOWtaUzV6WldGeVkyZ3VjbVZ3YkdGalpTZ3ZYbHhjUHk4c0lDY25LU0E2SUNjbkxGeHVJQ0FnSUNBZ0lDQWdJR2hoYzJnNklIVnliRkJoY25OcGJtZE9iMlJsTG1oaGMyZ2dQeUIxY214UVlYSnphVzVuVG05a1pTNW9ZWE5vTG5KbGNHeGhZMlVvTDE0akx5d2dKeWNwSURvZ0p5Y3NYRzRnSUNBZ0lDQWdJQ0FnYUc5emRHNWhiV1U2SUhWeWJGQmhjbk5wYm1kT2IyUmxMbWh2YzNSdVlXMWxMRnh1SUNBZ0lDQWdJQ0FnSUhCdmNuUTZJSFZ5YkZCaGNuTnBibWRPYjJSbExuQnZjblFzWEc0Z0lDQWdJQ0FnSUNBZ2NHRjBhRzVoYldVNklDaDFjbXhRWVhKemFXNW5UbTlrWlM1d1lYUm9ibUZ0WlM1amFHRnlRWFFvTUNrZ1BUMDlJQ2N2SnlrZ1AxeHVJQ0FnSUNBZ0lDQWdJQ0FnZFhKc1VHRnljMmx1WjA1dlpHVXVjR0YwYUc1aGJXVWdPbHh1SUNBZ0lDQWdJQ0FnSUNBZ0p5OG5JQ3NnZFhKc1VHRnljMmx1WjA1dlpHVXVjR0YwYUc1aGJXVmNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYjNKcFoybHVWVkpNSUQwZ2NtVnpiMngyWlZWU1RDaDNhVzVrYjNjdWJHOWpZWFJwYjI0dWFISmxaaWs3WEc1Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnVlZKTUlITm9ZWEpsY3lCMGFHVWdjMkZ0WlNCdmNtbG5hVzRnWVhNZ2RHaGxJR04xY25KbGJuUWdiRzlqWVhScGIyNWNiaUFnSUNBcVhHNGdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnY21WeGRXVnpkRlZTVENCVWFHVWdWVkpNSUhSdklIUmxjM1JjYmlBZ0lDQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JRlZTVENCemFHRnlaWE1nZEdobElITmhiV1VnYjNKcFoybHVMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFnSUNBcUwxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUdselZWSk1VMkZ0WlU5eWFXZHBiaWh5WlhGMVpYTjBWVkpNS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ3WVhKelpXUWdQU0FvZFhScGJITXVhWE5UZEhKcGJtY29jbVZ4ZFdWemRGVlNUQ2twSUQ4Z2NtVnpiMngyWlZWU1RDaHlaWEYxWlhOMFZWSk1LU0E2SUhKbGNYVmxjM1JWVWt3N1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlBb2NHRnljMlZrTG5CeWIzUnZZMjlzSUQwOVBTQnZjbWxuYVc1VlVrd3VjSEp2ZEc5amIyd2dKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lIQmhjbk5sWkM1b2IzTjBJRDA5UFNCdmNtbG5hVzVWVWt3dWFHOXpkQ2s3WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJSDBwS0NrZ09seHVYRzRnSUM4dklFNXZiaUJ6ZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZG5NZ0tIZGxZaUIzYjNKclpYSnpMQ0J5WldGamRDMXVZWFJwZG1VcElHeGhZMnNnYm1WbFpHVmtJSE4xY0hCdmNuUXVYRzRnSUNBZ0tHWjFibU4wYVc5dUlHNXZibE4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtZFc1amRHbHZiaUJwYzFWU1RGTmhiV1ZQY21sbmFXNG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOUtTZ3BYRzRwTzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1TGk5MWRHbHNjeWNwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHNXZjbTFoYkdsNlpVaGxZV1JsY2s1aGJXVW9hR1ZoWkdWeWN5d2dibTl5YldGc2FYcGxaRTVoYldVcElIdGNiaUFnZFhScGJITXVabTl5UldGamFDaG9aV0ZrWlhKekxDQm1kVzVqZEdsdmJpQndjbTlqWlhOelNHVmhaR1Z5S0haaGJIVmxMQ0J1WVcxbEtTQjdYRzRnSUNBZ2FXWWdLRzVoYldVZ0lUMDlJRzV2Y20xaGJHbDZaV1JPWVcxbElDWW1JRzVoYldVdWRHOVZjSEJsY2tOaGMyVW9LU0E5UFQwZ2JtOXliV0ZzYVhwbFpFNWhiV1V1ZEc5VmNIQmxja05oYzJVb0tTa2dlMXh1SUNBZ0lDQWdhR1ZoWkdWeWMxdHViM0p0WVd4cGVtVmtUbUZ0WlYwZ1BTQjJZV3gxWlR0Y2JpQWdJQ0FnSUdSbGJHVjBaU0JvWldGa1pYSnpXMjVoYldWZE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYmk4dklFaGxZV1JsY25NZ2QyaHZjMlVnWkhWd2JHbGpZWFJsY3lCaGNtVWdhV2R1YjNKbFpDQmllU0J1YjJSbFhHNHZMeUJqTG1ZdUlHaDBkSEJ6T2k4dmJtOWtaV3B6TG05eVp5OWhjR2t2YUhSMGNDNW9kRzFzSTJoMGRIQmZiV1Z6YzJGblpWOW9aV0ZrWlhKelhHNTJZWElnYVdkdWIzSmxSSFZ3YkdsallYUmxUMllnUFNCYlhHNGdJQ2RoWjJVbkxDQW5ZWFYwYUc5eWFYcGhkR2x2Ymljc0lDZGpiMjUwWlc1MExXeGxibWQwYUNjc0lDZGpiMjUwWlc1MExYUjVjR1VuTENBblpYUmhaeWNzWEc0Z0lDZGxlSEJwY21Wekp5d2dKMlp5YjIwbkxDQW5hRzl6ZENjc0lDZHBaaTF0YjJScFptbGxaQzF6YVc1alpTY3NJQ2RwWmkxMWJtMXZaR2xtYVdWa0xYTnBibU5sSnl4Y2JpQWdKMnhoYzNRdGJXOWthV1pwWldRbkxDQW5iRzlqWVhScGIyNG5MQ0FuYldGNExXWnZjbmRoY21Sekp5d2dKM0J5YjNoNUxXRjFkR2h2Y21sNllYUnBiMjRuTEZ4dUlDQW5jbVZtWlhKbGNpY3NJQ2R5WlhSeWVTMWhablJsY2ljc0lDZDFjMlZ5TFdGblpXNTBKMXh1WFR0Y2JseHVMeW9xWEc0Z0tpQlFZWEp6WlNCb1pXRmtaWEp6SUdsdWRHOGdZVzRnYjJKcVpXTjBYRzRnS2x4dUlDb2dZR0JnWEc0Z0tpQkVZWFJsT2lCWFpXUXNJREkzSUVGMVp5QXlNREUwSURBNE9qVTRPalE1SUVkTlZGeHVJQ29nUTI5dWRHVnVkQzFVZVhCbE9pQmhjSEJzYVdOaGRHbHZiaTlxYzI5dVhHNGdLaUJEYjI1dVpXTjBhVzl1T2lCclpXVndMV0ZzYVhabFhHNGdLaUJVY21GdWMyWmxjaTFGYm1OdlpHbHVaem9nWTJoMWJtdGxaRnh1SUNvZ1lHQmdYRzRnS2x4dUlDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHaGxZV1JsY25NZ1NHVmhaR1Z5Y3lCdVpXVmthVzVuSUhSdklHSmxJSEJoY25ObFpGeHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnU0dWaFpHVnljeUJ3WVhKelpXUWdhVzUwYnlCaGJpQnZZbXBsWTNSY2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJ3WVhKelpVaGxZV1JsY25Nb2FHVmhaR1Z5Y3lrZ2UxeHVJQ0IyWVhJZ2NHRnljMlZrSUQwZ2UzMDdYRzRnSUhaaGNpQnJaWGs3WEc0Z0lIWmhjaUIyWVd3N1hHNGdJSFpoY2lCcE8xeHVYRzRnSUdsbUlDZ2hhR1ZoWkdWeWN5a2dleUJ5WlhSMWNtNGdjR0Z5YzJWa095QjlYRzVjYmlBZ2RYUnBiSE11Wm05eVJXRmphQ2hvWldGa1pYSnpMbk53YkdsMEtDZGNYRzRuS1N3Z1puVnVZM1JwYjI0Z2NHRnljMlZ5S0d4cGJtVXBJSHRjYmlBZ0lDQnBJRDBnYkdsdVpTNXBibVJsZUU5bUtDYzZKeWs3WEc0Z0lDQWdhMlY1SUQwZ2RYUnBiSE11ZEhKcGJTaHNhVzVsTG5OMVluTjBjaWd3TENCcEtTa3VkRzlNYjNkbGNrTmhjMlVvS1R0Y2JpQWdJQ0IyWVd3Z1BTQjFkR2xzY3k1MGNtbHRLR3hwYm1VdWMzVmljM1J5S0drZ0t5QXhLU2s3WEc1Y2JpQWdJQ0JwWmlBb2EyVjVLU0I3WEc0Z0lDQWdJQ0JwWmlBb2NHRnljMlZrVzJ0bGVWMGdKaVlnYVdkdWIzSmxSSFZ3YkdsallYUmxUMll1YVc1a1pYaFBaaWhyWlhrcElENDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnYVdZZ0tHdGxlU0E5UFQwZ0ozTmxkQzFqYjI5cmFXVW5LU0I3WEc0Z0lDQWdJQ0FnSUhCaGNuTmxaRnRyWlhsZElEMGdLSEJoY25ObFpGdHJaWGxkSUQ4Z2NHRnljMlZrVzJ0bGVWMGdPaUJiWFNrdVkyOXVZMkYwS0Z0MllXeGRLVHRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJSEJoY25ObFpGdHJaWGxkSUQwZ2NHRnljMlZrVzJ0bGVWMGdQeUJ3WVhKelpXUmJhMlY1WFNBcklDY3NJQ2NnS3lCMllXd2dPaUIyWVd3N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlLVHRjYmx4dUlDQnlaWFIxY200Z2NHRnljMlZrTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1THlvcVhHNGdLaUJUZVc1MFlXTjBhV01nYzNWbllYSWdabTl5SUdsdWRtOXJhVzVuSUdFZ1puVnVZM1JwYjI0Z1lXNWtJR1Y0Y0dGdVpHbHVaeUJoYmlCaGNuSmhlU0JtYjNJZ1lYSm5kVzFsYm5SekxseHVJQ3BjYmlBcUlFTnZiVzF2YmlCMWMyVWdZMkZ6WlNCM2IzVnNaQ0JpWlNCMGJ5QjFjMlVnWUVaMWJtTjBhVzl1TG5CeWIzUnZkSGx3WlM1aGNIQnNlV0F1WEc0Z0tseHVJQ29nSUdCZ1lHcHpYRzRnS2lBZ1puVnVZM1JwYjI0Z1ppaDRMQ0I1TENCNktTQjdmVnh1SUNvZ0lIWmhjaUJoY21keklEMGdXekVzSURJc0lETmRPMXh1SUNvZ0lHWXVZWEJ3Ykhrb2JuVnNiQ3dnWVhKbmN5azdYRzRnS2lBZ1lHQmdYRzRnS2x4dUlDb2dWMmwwYUNCZ2MzQnlaV0ZrWUNCMGFHbHpJR1Y0WVcxd2JHVWdZMkZ1SUdKbElISmxMWGR5YVhSMFpXNHVYRzRnS2x4dUlDb2dJR0JnWUdwelhHNGdLaUFnYzNCeVpXRmtLR1oxYm1OMGFXOXVLSGdzSUhrc0lIb3BJSHQ5S1NoYk1Td2dNaXdnTTEwcE8xeHVJQ29nSUdCZ1lGeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHTmhiR3hpWVdOclhHNGdLaUJBY21WMGRYSnVjeUI3Um5WdVkzUnBiMjU5WEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdjM0J5WldGa0tHTmhiR3hpWVdOcktTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaUIzY21Gd0tHRnljaWtnZTF4dUlDQWdJSEpsZEhWeWJpQmpZV3hzWW1GamF5NWhjSEJzZVNodWRXeHNMQ0JoY25JcE8xeHVJQ0I5TzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlHSnBibVFnUFNCeVpYRjFhWEpsS0NjdUwyaGxiSEJsY25NdlltbHVaQ2NwTzF4dVhHNHZLbWRzYjJKaGJDQjBiMU4wY21sdVp6cDBjblZsS2k5Y2JseHVMeThnZFhScGJITWdhWE1nWVNCc2FXSnlZWEo1SUc5bUlHZGxibVZ5YVdNZ2FHVnNjR1Z5SUdaMWJtTjBhVzl1Y3lCdWIyNHRjM0JsWTJsbWFXTWdkRzhnWVhocGIzTmNibHh1ZG1GeUlIUnZVM1J5YVc1bklEMGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp6dGNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhiaUJCY25KaGVWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdGdUlFRnljbUY1TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5CY25KaGVTaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQTlQVDBnSjF0dlltcGxZM1FnUVhKeVlYbGRKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCMWJtUmxabWx1WldSY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIwYUdVZ2RtRnNkV1VnYVhNZ2RXNWtaV1pwYm1Wa0xDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOVmJtUmxabWx1WldRb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnZG1Gc0lEMDlQU0FuZFc1a1pXWnBibVZrSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRUoxWm1abGNseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1FuVm1abVZ5TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5DZFdabVpYSW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjJZV3dnSVQwOUlHNTFiR3dnSmlZZ0lXbHpWVzVrWldacGJtVmtLSFpoYkNrZ0ppWWdkbUZzTG1OdmJuTjBjblZqZEc5eUlDRTlQU0J1ZFd4c0lDWW1JQ0ZwYzFWdVpHVm1hVzVsWkNoMllXd3VZMjl1YzNSeWRXTjBiM0lwWEc0Z0lDQWdKaVlnZEhsd1pXOW1JSFpoYkM1amIyNXpkSEoxWTNSdmNpNXBjMEoxWm1abGNpQTlQVDBnSjJaMWJtTjBhVzl1SnlBbUppQjJZV3d1WTI5dWMzUnlkV04wYjNJdWFYTkNkV1ptWlhJb2RtRnNLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaGJpQkJjbkpoZVVKMVptWmxjbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRnVJRUZ5Y21GNVFuVm1abVZ5TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5CY25KaGVVSjFabVpsY2loMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzS1NBOVBUMGdKMXR2WW1wbFkzUWdRWEp5WVhsQ2RXWm1aWEpkSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRVp2Y20xRVlYUmhYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lXNGdSbTl5YlVSaGRHRXNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMwWnZjbTFFWVhSaEtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z0tIUjVjR1Z2WmlCR2IzSnRSR0YwWVNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUNZbUlDaDJZV3dnYVc1emRHRnVZMlZ2WmlCR2IzSnRSR0YwWVNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdkbUZzZFdVZ2FYTWdZU0IyYVdWM0lHOXVJR0Z1SUVGeWNtRjVRblZtWm1WeVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCMmFXVjNJRzl1SUdGdUlFRnljbUY1UW5WbVptVnlMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVVKMVptWmxjbFpwWlhjb2RtRnNLU0I3WEc0Z0lIWmhjaUJ5WlhOMWJIUTdYRzRnSUdsbUlDZ29kSGx3Wlc5bUlFRnljbUY1UW5WbVptVnlJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dKaVlnS0VGeWNtRjVRblZtWm1WeUxtbHpWbWxsZHlrcElIdGNiaUFnSUNCeVpYTjFiSFFnUFNCQmNuSmhlVUoxWm1abGNpNXBjMVpwWlhjb2RtRnNLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J5WlhOMWJIUWdQU0FvZG1Gc0tTQW1KaUFvZG1Gc0xtSjFabVpsY2lrZ0ppWWdLSFpoYkM1aWRXWm1aWElnYVc1emRHRnVZMlZ2WmlCQmNuSmhlVUoxWm1abGNpazdYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRk4wY21sdVoxeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1UzUnlhVzVuTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5UZEhKcGJtY29kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmMzUnlhVzVuSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRTUxYldKbGNseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1RuVnRZbVZ5TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5PZFcxaVpYSW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmJuVnRZbVZ5Snp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhiaUJQWW1wbFkzUmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2RtRnNJRlJvWlNCMllXeDFaU0IwYnlCMFpYTjBYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCMllXeDFaU0JwY3lCaGJpQlBZbXBsWTNRc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzA5aWFtVmpkQ2gyWVd3cElIdGNiaUFnY21WMGRYSnVJSFpoYkNBaFBUMGdiblZzYkNBbUppQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmIySnFaV04wSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJSEJzWVdsdUlFOWlhbVZqZEZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNGdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0J3YkdGcGJpQlBZbXBsWTNRc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzFCc1lXbHVUMkpxWldOMEtIWmhiQ2tnZTF4dUlDQnBaaUFvZEc5VGRISnBibWN1WTJGc2JDaDJZV3dwSUNFOVBTQW5XMjlpYW1WamRDQlBZbXBsWTNSZEp5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVYRzRnSUhaaGNpQndjbTkwYjNSNWNHVWdQU0JQWW1wbFkzUXVaMlYwVUhKdmRHOTBlWEJsVDJZb2RtRnNLVHRjYmlBZ2NtVjBkWEp1SUhCeWIzUnZkSGx3WlNBOVBUMGdiblZzYkNCOGZDQndjbTkwYjNSNWNHVWdQVDA5SUU5aWFtVmpkQzV3Y205MGIzUjVjR1U3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkVZWFJsWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JFWVhSbExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhORVlYUmxLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCRVlYUmxYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkdhV3hsWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JHYVd4bExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOR2FXeGxLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCR2FXeGxYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkNiRzlpWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JDYkc5aUxDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOQ2JHOWlLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCQ2JHOWlYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkdkVzVqZEdsdmJseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1JuVnVZM1JwYjI0c0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBaMWJtTjBhVzl1S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEc5VGRISnBibWN1WTJGc2JDaDJZV3dwSUQwOVBTQW5XMjlpYW1WamRDQkdkVzVqZEdsdmJsMG5PMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1UzUnlaV0Z0WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JUZEhKbFlXMHNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMxTjBjbVZoYlNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUdselQySnFaV04wS0haaGJDa2dKaVlnYVhOR2RXNWpkR2x2YmloMllXd3VjR2x3WlNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdkbUZzZFdVZ2FYTWdZU0JWVWt4VFpXRnlZMmhRWVhKaGJYTWdiMkpxWldOMFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCVlVreFRaV0Z5WTJoUVlYSmhiWE1nYjJKcVpXTjBMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTlZVa3hUWldGeVkyaFFZWEpoYlhNb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnVlZKTVUyVmhjbU5vVUdGeVlXMXpJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUIyWVd3Z2FXNXpkR0Z1WTJWdlppQlZVa3hUWldGeVkyaFFZWEpoYlhNN1hHNTlYRzVjYmk4cUtseHVJQ29nVkhKcGJTQmxlR05sYzNNZ2QyaHBkR1Z6Y0dGalpTQnZabVlnZEdobElHSmxaMmx1Ym1sdVp5QmhibVFnWlc1a0lHOW1JR0VnYzNSeWFXNW5YRzRnS2x4dUlDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITjBjaUJVYUdVZ1UzUnlhVzVuSUhSdklIUnlhVzFjYmlBcUlFQnlaWFIxY201eklIdFRkSEpwYm1kOUlGUm9aU0JUZEhKcGJtY2dabkpsWldRZ2IyWWdaWGhqWlhOeklIZG9hWFJsYzNCaFkyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2RISnBiU2h6ZEhJcElIdGNiaUFnY21WMGRYSnVJSE4wY2k1eVpYQnNZV05sS0M5ZVhGeHpLaThzSUNjbktTNXlaWEJzWVdObEtDOWNYSE1xSkM4c0lDY25LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnZDJVbmNtVWdjblZ1Ym1sdVp5QnBiaUJoSUhOMFlXNWtZWEprSUdKeWIzZHpaWElnWlc1MmFYSnZibTFsYm5SY2JpQXFYRzRnS2lCVWFHbHpJR0ZzYkc5M2N5QmhlR2x2Y3lCMGJ5QnlkVzRnYVc0Z1lTQjNaV0lnZDI5eWEyVnlMQ0JoYm1RZ2NtVmhZM1F0Ym1GMGFYWmxMbHh1SUNvZ1FtOTBhQ0JsYm5acGNtOXViV1Z1ZEhNZ2MzVndjRzl5ZENCWVRVeElkSFJ3VW1WeGRXVnpkQ3dnWW5WMElHNXZkQ0JtZFd4c2VTQnpkR0Z1WkdGeVpDQm5iRzlpWVd4ekxseHVJQ3BjYmlBcUlIZGxZaUIzYjNKclpYSnpPbHh1SUNvZ0lIUjVjR1Z2WmlCM2FXNWtiM2NnTFQ0Z2RXNWtaV1pwYm1Wa1hHNGdLaUFnZEhsd1pXOW1JR1J2WTNWdFpXNTBJQzArSUhWdVpHVm1hVzVsWkZ4dUlDcGNiaUFxSUhKbFlXTjBMVzVoZEdsMlpUcGNiaUFxSUNCdVlYWnBaMkYwYjNJdWNISnZaSFZqZENBdFBpQW5VbVZoWTNST1lYUnBkbVVuWEc0Z0tpQnVZWFJwZG1WelkzSnBjSFJjYmlBcUlDQnVZWFpwWjJGMGIzSXVjSEp2WkhWamRDQXRQaUFuVG1GMGFYWmxVMk55YVhCMEp5QnZjaUFuVGxNblhHNGdLaTljYm1aMWJtTjBhVzl1SUdselUzUmhibVJoY21SQ2NtOTNjMlZ5Ulc1MktDa2dlMXh1SUNCcFppQW9kSGx3Wlc5bUlHNWhkbWxuWVhSdmNpQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdLRzVoZG1sbllYUnZjaTV3Y205a2RXTjBJRDA5UFNBblVtVmhZM1JPWVhScGRtVW5JSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYm1GMmFXZGhkRzl5TG5CeWIyUjFZM1FnUFQwOUlDZE9ZWFJwZG1WVFkzSnBjSFFuSUh4OFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JtRjJhV2RoZEc5eUxuQnliMlIxWTNRZ1BUMDlJQ2RPVXljcEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQW9YRzRnSUNBZ2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVpjYmlBZ0lDQjBlWEJsYjJZZ1pHOWpkVzFsYm5RZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1NYUmxjbUYwWlNCdmRtVnlJR0Z1SUVGeWNtRjVJRzl5SUdGdUlFOWlhbVZqZENCcGJuWnZhMmx1WnlCaElHWjFibU4wYVc5dUlHWnZjaUJsWVdOb0lHbDBaVzB1WEc0Z0tseHVJQ29nU1dZZ1lHOWlhbUFnYVhNZ1lXNGdRWEp5WVhrZ1kyRnNiR0poWTJzZ2QybHNiQ0JpWlNCallXeHNaV1FnY0dGemMybHVaMXh1SUNvZ2RHaGxJSFpoYkhWbExDQnBibVJsZUN3Z1lXNWtJR052YlhCc1pYUmxJR0Z5Y21GNUlHWnZjaUJsWVdOb0lHbDBaVzB1WEc0Z0tseHVJQ29nU1dZZ0oyOWlhaWNnYVhNZ1lXNGdUMkpxWldOMElHTmhiR3hpWVdOcklIZHBiR3dnWW1VZ1kyRnNiR1ZrSUhCaGMzTnBibWRjYmlBcUlIUm9aU0IyWVd4MVpTd2dhMlY1TENCaGJtUWdZMjl0Y0d4bGRHVWdiMkpxWldOMElHWnZjaUJsWVdOb0lIQnliM0JsY25SNUxseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZkVGeWNtRjVmU0J2WW1vZ1ZHaGxJRzlpYW1WamRDQjBieUJwZEdWeVlYUmxYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWJpQlVhR1VnWTJGc2JHSmhZMnNnZEc4Z2FXNTJiMnRsSUdadmNpQmxZV05vSUdsMFpXMWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ptOXlSV0ZqYUNodlltb3NJR1p1S1NCN1hHNGdJQzh2SUVSdmJpZDBJR0p2ZEdobGNpQnBaaUJ1YnlCMllXeDFaU0J3Y205MmFXUmxaRnh1SUNCcFppQW9iMkpxSUQwOVBTQnVkV3hzSUh4OElIUjVjR1Z2WmlCdlltb2dQVDA5SUNkMWJtUmxabWx1WldRbktTQjdYRzRnSUNBZ2NtVjBkWEp1TzF4dUlDQjlYRzVjYmlBZ0x5OGdSbTl5WTJVZ1lXNGdZWEp5WVhrZ2FXWWdibTkwSUdGc2NtVmhaSGtnYzI5dFpYUm9hVzVuSUdsMFpYSmhZbXhsWEc0Z0lHbG1JQ2gwZVhCbGIyWWdiMkpxSUNFOVBTQW5iMkpxWldOMEp5a2dlMXh1SUNBZ0lDOHFaWE5zYVc1MElHNXZMWEJoY21GdExYSmxZWE56YVdkdU9qQXFMMXh1SUNBZ0lHOWlhaUE5SUZ0dlltcGRPMXh1SUNCOVhHNWNiaUFnYVdZZ0tHbHpRWEp5WVhrb2IySnFLU2tnZTF4dUlDQWdJQzh2SUVsMFpYSmhkR1VnYjNabGNpQmhjbkpoZVNCMllXeDFaWE5jYmlBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2JDQTlJRzlpYWk1c1pXNW5kR2c3SUdrZ1BDQnNPeUJwS3lzcElIdGNiaUFnSUNBZ0lHWnVMbU5oYkd3b2JuVnNiQ3dnYjJKcVcybGRMQ0JwTENCdlltb3BPMXh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQXZMeUJKZEdWeVlYUmxJRzkyWlhJZ2IySnFaV04wSUd0bGVYTmNiaUFnSUNCbWIzSWdLSFpoY2lCclpYa2dhVzRnYjJKcUtTQjdYRzRnSUNBZ0lDQnBaaUFvVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFpd2dhMlY1S1NrZ2UxeHVJQ0FnSUNBZ0lDQm1iaTVqWVd4c0tHNTFiR3dzSUc5aWFsdHJaWGxkTENCclpYa3NJRzlpYWlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FXTmpaWEIwY3lCMllYSmhjbWR6SUdWNGNHVmpkR2x1WnlCbFlXTm9JR0Z5WjNWdFpXNTBJSFJ2SUdKbElHRnVJRzlpYW1WamRDd2dkR2hsYmx4dUlDb2dhVzF0ZFhSaFlteDVJRzFsY21kbGN5QjBhR1VnY0hKdmNHVnlkR2xsY3lCdlppQmxZV05vSUc5aWFtVmpkQ0JoYm1RZ2NtVjBkWEp1Y3lCeVpYTjFiSFF1WEc0Z0tseHVJQ29nVjJobGJpQnRkV3gwYVhCc1pTQnZZbXBsWTNSeklHTnZiblJoYVc0Z2RHaGxJSE5oYldVZ2EyVjVJSFJvWlNCc1lYUmxjaUJ2WW1wbFkzUWdhVzVjYmlBcUlIUm9aU0JoY21kMWJXVnVkSE1nYkdsemRDQjNhV3hzSUhSaGEyVWdjSEpsWTJWa1pXNWpaUzVjYmlBcVhHNGdLaUJGZUdGdGNHeGxPbHh1SUNwY2JpQXFJR0JnWUdwelhHNGdLaUIyWVhJZ2NtVnpkV3gwSUQwZ2JXVnlaMlVvZTJadmJ6b2dNVEl6ZlN3Z2UyWnZiem9nTkRVMmZTazdYRzRnS2lCamIyNXpiMnhsTG14dlp5aHlaWE4xYkhRdVptOXZLVHNnTHk4Z2IzVjBjSFYwY3lBME5UWmNiaUFxSUdCZ1lGeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdlltb3hJRTlpYW1WamRDQjBieUJ0WlhKblpWeHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WemRXeDBJRzltSUdGc2JDQnRaWEpuWlNCd2NtOXdaWEowYVdWelhHNGdLaTljYm1aMWJtTjBhVzl1SUcxbGNtZGxLQzhxSUc5aWFqRXNJRzlpYWpJc0lHOWlhak1zSUM0dUxpQXFMeWtnZTF4dUlDQjJZWElnY21WemRXeDBJRDBnZTMwN1hHNGdJR1oxYm1OMGFXOXVJR0Z6YzJsbmJsWmhiSFZsS0haaGJDd2dhMlY1S1NCN1hHNGdJQ0FnYVdZZ0tHbHpVR3hoYVc1UFltcGxZM1FvY21WemRXeDBXMnRsZVYwcElDWW1JR2x6VUd4aGFXNVBZbXBsWTNRb2RtRnNLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBXMnRsZVYwZ1BTQnRaWEpuWlNoeVpYTjFiSFJiYTJWNVhTd2dkbUZzS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dselVHeGhhVzVQWW1wbFkzUW9kbUZzS1NrZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwVzJ0bGVWMGdQU0J0WlhKblpTaDdmU3dnZG1Gc0tUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHbHpRWEp5WVhrb2RtRnNLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBXMnRsZVYwZ1BTQjJZV3d1YzJ4cFkyVW9LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwVzJ0bGVWMGdQU0IyWVd3N1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUd3Z1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBJRHdnYkRzZ2FTc3JLU0I3WEc0Z0lDQWdabTl5UldGamFDaGhjbWQxYldWdWRITmJhVjBzSUdGemMybG5ibFpoYkhWbEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVY0ZEdWdVpITWdiMkpxWldOMElHRWdZbmtnYlhWMFlXSnNlU0JoWkdScGJtY2dkRzhnYVhRZ2RHaGxJSEJ5YjNCbGNuUnBaWE1nYjJZZ2IySnFaV04wSUdJdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdFZ1ZHaGxJRzlpYW1WamRDQjBieUJpWlNCbGVIUmxibVJsWkZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHSWdWR2hsSUc5aWFtVmpkQ0IwYnlCamIzQjVJSEJ5YjNCbGNuUnBaWE1nWm5KdmJWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFJvYVhOQmNtY2dWR2hsSUc5aWFtVmpkQ0IwYnlCaWFXNWtJR1oxYm1OMGFXOXVJSFJ2WEc0Z0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOUlGUm9aU0J5WlhOMWJIUnBibWNnZG1Gc2RXVWdiMllnYjJKcVpXTjBJR0ZjYmlBcUwxeHVablZ1WTNScGIyNGdaWGgwWlc1a0tHRXNJR0lzSUhSb2FYTkJjbWNwSUh0Y2JpQWdabTl5UldGamFDaGlMQ0JtZFc1amRHbHZiaUJoYzNOcFoyNVdZV3gxWlNoMllXd3NJR3RsZVNrZ2UxeHVJQ0FnSUdsbUlDaDBhR2x6UVhKbklDWW1JSFI1Y0dWdlppQjJZV3dnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJR0ZiYTJWNVhTQTlJR0pwYm1Rb2RtRnNMQ0IwYUdselFYSm5LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ1lWdHJaWGxkSUQwZ2RtRnNPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQmhPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGSmxiVzkyWlNCaWVYUmxJRzl5WkdWeUlHMWhjbXRsY2k0Z1ZHaHBjeUJqWVhSamFHVnpJRVZHSUVKQ0lFSkdJQ2gwYUdVZ1ZWUkdMVGdnUWs5TktWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCamIyNTBaVzUwSUhkcGRHZ2dRazlOWEc0Z0tpQkFjbVYwZFhKdUlIdHpkSEpwYm1kOUlHTnZiblJsYm5RZ2RtRnNkV1VnZDJsMGFHOTFkQ0JDVDAxY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYzNSeWFYQkNUMDBvWTI5dWRHVnVkQ2tnZTF4dUlDQnBaaUFvWTI5dWRHVnVkQzVqYUdGeVEyOWtaVUYwS0RBcElEMDlQU0F3ZUVaRlJrWXBJSHRjYmlBZ0lDQmpiMjUwWlc1MElEMGdZMjl1ZEdWdWRDNXpiR2xqWlNneEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1kyOXVkR1Z1ZER0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3WEc0Z0lHbHpRWEp5WVhrNklHbHpRWEp5WVhrc1hHNGdJR2x6UVhKeVlYbENkV1ptWlhJNklHbHpRWEp5WVhsQ2RXWm1aWElzWEc0Z0lHbHpRblZtWm1WeU9pQnBjMEoxWm1abGNpeGNiaUFnYVhOR2IzSnRSR0YwWVRvZ2FYTkdiM0p0UkdGMFlTeGNiaUFnYVhOQmNuSmhlVUoxWm1abGNsWnBaWGM2SUdselFYSnlZWGxDZFdabVpYSldhV1YzTEZ4dUlDQnBjMU4wY21sdVp6b2dhWE5UZEhKcGJtY3NYRzRnSUdselRuVnRZbVZ5T2lCcGMwNTFiV0psY2l4Y2JpQWdhWE5QWW1wbFkzUTZJR2x6VDJKcVpXTjBMRnh1SUNCcGMxQnNZV2x1VDJKcVpXTjBPaUJwYzFCc1lXbHVUMkpxWldOMExGeHVJQ0JwYzFWdVpHVm1hVzVsWkRvZ2FYTlZibVJsWm1sdVpXUXNYRzRnSUdselJHRjBaVG9nYVhORVlYUmxMRnh1SUNCcGMwWnBiR1U2SUdselJtbHNaU3hjYmlBZ2FYTkNiRzlpT2lCcGMwSnNiMklzWEc0Z0lHbHpSblZ1WTNScGIyNDZJR2x6Um5WdVkzUnBiMjRzWEc0Z0lHbHpVM1J5WldGdE9pQnBjMU4wY21WaGJTeGNiaUFnYVhOVlVreFRaV0Z5WTJoUVlYSmhiWE02SUdselZWSk1VMlZoY21Ob1VHRnlZVzF6TEZ4dUlDQnBjMU4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkam9nYVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zc1hHNGdJR1p2Y2tWaFkyZzZJR1p2Y2tWaFkyZ3NYRzRnSUcxbGNtZGxPaUJ0WlhKblpTeGNiaUFnWlhoMFpXNWtPaUJsZUhSbGJtUXNYRzRnSUhSeWFXMDZJSFJ5YVcwc1hHNGdJSE4wY21sd1FrOU5PaUJ6ZEhKcGNFSlBUVnh1ZlR0Y2JpSXNJaTh2SUhOb2FXMGdabTl5SUhWemFXNW5JSEJ5YjJObGMzTWdhVzRnWW5KdmQzTmxjbHh1ZG1GeUlIQnliMk5sYzNNZ1BTQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdDlPMXh1WEc0dkx5QmpZV05vWldRZ1puSnZiU0IzYUdGMFpYWmxjaUJuYkc5aVlXd2dhWE1nY0hKbGMyVnVkQ0J6YnlCMGFHRjBJSFJsYzNRZ2NuVnVibVZ5Y3lCMGFHRjBJSE4wZFdJZ2FYUmNiaTh2SUdSdmJpZDBJR0p5WldGcklIUm9hVzVuY3k0Z0lFSjFkQ0IzWlNCdVpXVmtJSFJ2SUhkeVlYQWdhWFFnYVc0Z1lTQjBjbmtnWTJGMFkyZ2dhVzRnWTJGelpTQnBkQ0JwYzF4dUx5OGdkM0poY0hCbFpDQnBiaUJ6ZEhKcFkzUWdiVzlrWlNCamIyUmxJSGRvYVdOb0lHUnZaWE51SjNRZ1pHVm1hVzVsSUdGdWVTQm5iRzlpWVd4ekxpQWdTWFFuY3lCcGJuTnBaR1VnWVZ4dUx5OGdablZ1WTNScGIyNGdZbVZqWVhWelpTQjBjbmt2WTJGMFkyaGxjeUJrWlc5d2RHbHRhWHBsSUdsdUlHTmxjblJoYVc0Z1pXNW5hVzVsY3k1Y2JseHVkbUZ5SUdOaFkyaGxaRk5sZEZScGJXVnZkWFE3WEc1MllYSWdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBPMXh1WEc1bWRXNWpkR2x2YmlCa1pXWmhkV3gwVTJWMFZHbHRiM1YwS0NrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduYzJWMFZHbHRaVzkxZENCb1lYTWdibTkwSUdKbFpXNGdaR1ZtYVc1bFpDY3BPMXh1ZlZ4dVpuVnVZM1JwYjI0Z1pHVm1ZWFZzZEVOc1pXRnlWR2x0Wlc5MWRDQW9LU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZGpiR1ZoY2xScGJXVnZkWFFnYUdGeklHNXZkQ0JpWldWdUlHUmxabWx1WldRbktUdGNibjFjYmlobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCelpYUlVhVzFsYjNWMElEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVdOb1pXUlRaWFJVYVcxbGIzVjBJRDBnYzJWMFZHbHRaVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oWTJobFpGTmxkRlJwYldWdmRYUWdQU0JrWldaaGRXeDBVMlYwVkdsdGIzVjBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJQ0FnSUNCallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwZ1pHVm1ZWFZzZEZObGRGUnBiVzkxZER0Y2JpQWdJQ0I5WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmpiR1ZoY2xScGJXVnZkWFFnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDQTlJR05zWldGeVZHbHRaVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5SUdSbFptRjFiSFJEYkdWaGNsUnBiV1Z2ZFhRN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQWdJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5SUdSbFptRjFiSFJEYkdWaGNsUnBiV1Z2ZFhRN1hHNGdJQ0FnZlZ4dWZTQW9LU2xjYm1aMWJtTjBhVzl1SUhKMWJsUnBiV1Z2ZFhRb1puVnVLU0I3WEc0Z0lDQWdhV1lnS0dOaFkyaGxaRk5sZEZScGJXVnZkWFFnUFQwOUlITmxkRlJwYldWdmRYUXBJSHRjYmlBZ0lDQWdJQ0FnTHk5dWIzSnRZV3dnWlc1MmFYSnZiV1Z1ZEhNZ2FXNGdjMkZ1WlNCemFYUjFZWFJwYjI1elhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCelpYUlVhVzFsYjNWMEtHWjFiaXdnTUNrN1hHNGdJQ0FnZlZ4dUlDQWdJQzh2SUdsbUlITmxkRlJwYldWdmRYUWdkMkZ6YmlkMElHRjJZV2xzWVdKc1pTQmlkWFFnZDJGeklHeGhkSFJsY2lCa1pXWnBibVZrWEc0Z0lDQWdhV1lnS0NoallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwOVBTQmtaV1poZFd4MFUyVjBWR2x0YjNWMElIeDhJQ0ZqWVdOb1pXUlRaWFJVYVcxbGIzVjBLU0FtSmlCelpYUlVhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJR05oWTJobFpGTmxkRlJwYldWdmRYUWdQU0J6WlhSVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYzJWMFZHbHRaVzkxZENobWRXNHNJREFwTzF4dUlDQWdJSDFjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNBdkx5QjNhR1Z1SUhkb1pXNGdjMjl0WldKdlpIa2dhR0Z6SUhOamNtVjNaV1FnZDJsMGFDQnpaWFJVYVcxbGIzVjBJR0oxZENCdWJ5QkpMa1V1SUcxaFpHUnVaWE56WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUlRaWFJVYVcxbGIzVjBLR1oxYml3Z01DazdYRzRnSUNBZ2ZTQmpZWFJqYUNobEtYdGNiaUFnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUZkb1pXNGdkMlVnWVhKbElHbHVJRWt1UlM0Z1luVjBJSFJvWlNCelkzSnBjSFFnYUdGeklHSmxaVzRnWlhaaGJHVmtJSE52SUVrdVJTNGdaRzlsYzI0bmRDQjBjblZ6ZENCMGFHVWdaMnh2WW1Gc0lHOWlhbVZqZENCM2FHVnVJR05oYkd4bFpDQnViM0p0WVd4c2VWeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpGTmxkRlJwYldWdmRYUXVZMkZzYkNodWRXeHNMQ0JtZFc0c0lEQXBPMXh1SUNBZ0lDQWdJQ0I5SUdOaGRHTm9LR1VwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYzJGdFpTQmhjeUJoWW05MlpTQmlkWFFnZDJobGJpQnBkQ2R6SUdFZ2RtVnljMmx2YmlCdlppQkpMa1V1SUhSb1lYUWdiWFZ6ZENCb1lYWmxJSFJvWlNCbmJHOWlZV3dnYjJKcVpXTjBJR1p2Y2lBbmRHaHBjeWNzSUdodmNHWjFiR3g1SUc5MWNpQmpiMjUwWlhoMElHTnZjbkpsWTNRZ2IzUm9aWEozYVhObElHbDBJSGRwYkd3Z2RHaHliM2NnWVNCbmJHOWlZV3dnWlhKeWIzSmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUlRaWFJVYVcxbGIzVjBMbU5oYkd3b2RHaHBjeXdnWm5WdUxDQXdLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dVhHNTlYRzVtZFc1amRHbHZiaUJ5ZFc1RGJHVmhjbFJwYldWdmRYUW9iV0Z5YTJWeUtTQjdYRzRnSUNBZ2FXWWdLR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5UFQwZ1kyeGxZWEpVYVcxbGIzVjBLU0I3WEc0Z0lDQWdJQ0FnSUM4dmJtOXliV0ZzSUdWdWRtbHliMjFsYm5SeklHbHVJSE5oYm1VZ2MybDBkV0YwYVc5dWMxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1kyeGxZWEpVYVcxbGIzVjBLRzFoY210bGNpazdYRzRnSUNBZ2ZWeHVJQ0FnSUM4dklHbG1JR05zWldGeVZHbHRaVzkxZENCM1lYTnVKM1FnWVhaaGFXeGhZbXhsSUdKMWRDQjNZWE1nYkdGMGRHVnlJR1JsWm1sdVpXUmNiaUFnSUNCcFppQW9LR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5UFQwZ1pHVm1ZWFZzZEVOc1pXRnlWR2x0Wlc5MWRDQjhmQ0FoWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwS1NBbUppQmpiR1ZoY2xScGJXVnZkWFFwSUh0Y2JpQWdJQ0FnSUNBZ1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMElEMGdZMnhsWVhKVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWTJ4bFlYSlVhVzFsYjNWMEtHMWhjbXRsY2lrN1hHNGdJQ0FnZlZ4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lDOHZJSGRvWlc0Z2QyaGxiaUJ6YjIxbFltOWtlU0JvWVhNZ2MyTnlaWGRsWkNCM2FYUm9JSE5sZEZScGJXVnZkWFFnWW5WMElHNXZJRWt1UlM0Z2JXRmtaRzVsYzNOY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZENodFlYSnJaWElwTzF4dUlDQWdJSDBnWTJGMFkyZ2dLR1VwZTF4dUlDQWdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdWMmhsYmlCM1pTQmhjbVVnYVc0Z1NTNUZMaUJpZFhRZ2RHaGxJSE5qY21sd2RDQm9ZWE1nWW1WbGJpQmxkbUZzWldRZ2MyOGdTUzVGTGlCa2IyVnpiaWQwSUNCMGNuVnpkQ0IwYUdVZ1oyeHZZbUZzSUc5aWFtVmpkQ0IzYUdWdUlHTmhiR3hsWkNCdWIzSnRZV3hzZVZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDNWpZV3hzS0c1MWJHd3NJRzFoY210bGNpazdYRzRnSUNBZ0lDQWdJSDBnWTJGMFkyZ2dLR1VwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYzJGdFpTQmhjeUJoWW05MlpTQmlkWFFnZDJobGJpQnBkQ2R6SUdFZ2RtVnljMmx2YmlCdlppQkpMa1V1SUhSb1lYUWdiWFZ6ZENCb1lYWmxJSFJvWlNCbmJHOWlZV3dnYjJKcVpXTjBJR1p2Y2lBbmRHaHBjeWNzSUdodmNHWjFiR3g1SUc5MWNpQmpiMjUwWlhoMElHTnZjbkpsWTNRZ2IzUm9aWEozYVhObElHbDBJSGRwYkd3Z2RHaHliM2NnWVNCbmJHOWlZV3dnWlhKeWIzSXVYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QlRiMjFsSUhabGNuTnBiMjV6SUc5bUlFa3VSUzRnYUdGMlpTQmthV1ptWlhKbGJuUWdjblZzWlhNZ1ptOXlJR05zWldGeVZHbHRaVzkxZENCMmN5QnpaWFJVYVcxbGIzVjBYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwTG1OaGJHd29kR2hwY3l3Z2JXRnlhMlZ5S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVYRzVjYm4xY2JuWmhjaUJ4ZFdWMVpTQTlJRnRkTzF4dWRtRnlJR1J5WVdsdWFXNW5JRDBnWm1Gc2MyVTdYRzUyWVhJZ1kzVnljbVZ1ZEZGMVpYVmxPMXh1ZG1GeUlIRjFaWFZsU1c1a1pYZ2dQU0F0TVR0Y2JseHVablZ1WTNScGIyNGdZMnhsWVc1VmNFNWxlSFJVYVdOcktDa2dlMXh1SUNBZ0lHbG1JQ2doWkhKaGFXNXBibWNnZkh3Z0lXTjFjbkpsYm5SUmRXVjFaU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHUnlZV2x1YVc1bklEMGdabUZzYzJVN1hHNGdJQ0FnYVdZZ0tHTjFjbkpsYm5SUmRXVjFaUzVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnY1hWbGRXVWdQU0JqZFhKeVpXNTBVWFZsZFdVdVkyOXVZMkYwS0hGMVpYVmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQnhkV1YxWlVsdVpHVjRJRDBnTFRFN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNoeGRXVjFaUzVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnWkhKaGFXNVJkV1YxWlNncE8xeHVJQ0FnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWkhKaGFXNVJkV1YxWlNncElIdGNiaUFnSUNCcFppQW9aSEpoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNiaUFnSUNCMllYSWdkR2x0Wlc5MWRDQTlJSEoxYmxScGJXVnZkWFFvWTJ4bFlXNVZjRTVsZUhSVWFXTnJLVHRjYmlBZ0lDQmtjbUZwYm1sdVp5QTlJSFJ5ZFdVN1hHNWNiaUFnSUNCMllYSWdiR1Z1SUQwZ2NYVmxkV1V1YkdWdVozUm9PMXh1SUNBZ0lIZG9hV3hsS0d4bGJpa2dlMXh1SUNBZ0lDQWdJQ0JqZFhKeVpXNTBVWFZsZFdVZ1BTQnhkV1YxWlR0Y2JpQWdJQ0FnSUNBZ2NYVmxkV1VnUFNCYlhUdGNiaUFnSUNBZ0lDQWdkMmhwYkdVZ0tDc3JjWFZsZFdWSmJtUmxlQ0E4SUd4bGJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUlJkV1YxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5SUmRXVjFaVnR4ZFdWMVpVbHVaR1Y0WFM1eWRXNG9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J4ZFdWMVpVbHVaR1Y0SUQwZ0xURTdYRzRnSUNBZ0lDQWdJR3hsYmlBOUlIRjFaWFZsTG14bGJtZDBhRHRjYmlBZ0lDQjlYRzRnSUNBZ1kzVnljbVZ1ZEZGMVpYVmxJRDBnYm5Wc2JEdGNiaUFnSUNCa2NtRnBibWx1WnlBOUlHWmhiSE5sTzF4dUlDQWdJSEoxYmtOc1pXRnlWR2x0Wlc5MWRDaDBhVzFsYjNWMEtUdGNibjFjYmx4dWNISnZZMlZ6Y3k1dVpYaDBWR2xqYXlBOUlHWjFibU4wYVc5dUlDaG1kVzRwSUh0Y2JpQWdJQ0IyWVhJZ1lYSm5jeUE5SUc1bGR5QkJjbkpoZVNoaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUMwZ01TazdYRzRnSUNBZ2FXWWdLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F4T3lCcElEd2dZWEpuZFcxbGJuUnpMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JoY21kelcya2dMU0F4WFNBOUlHRnlaM1Z0Wlc1MGMxdHBYVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnhkV1YxWlM1d2RYTm9LRzVsZHlCSmRHVnRLR1oxYml3Z1lYSm5jeWtwTzF4dUlDQWdJR2xtSUNoeGRXVjFaUzVzWlc1bmRHZ2dQVDA5SURFZ0ppWWdJV1J5WVdsdWFXNW5LU0I3WEc0Z0lDQWdJQ0FnSUhKMWJsUnBiV1Z2ZFhRb1pISmhhVzVSZFdWMVpTazdYRzRnSUNBZ2ZWeHVmVHRjYmx4dUx5OGdkamdnYkdsclpYTWdjSEpsWkdsamRHbGliR1VnYjJKcVpXTjBjMXh1Wm5WdVkzUnBiMjRnU1hSbGJTaG1kVzRzSUdGeWNtRjVLU0I3WEc0Z0lDQWdkR2hwY3k1bWRXNGdQU0JtZFc0N1hHNGdJQ0FnZEdocGN5NWhjbkpoZVNBOUlHRnljbUY1TzF4dWZWeHVTWFJsYlM1d2NtOTBiM1I1Y0dVdWNuVnVJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhSb2FYTXVablZ1TG1Gd2NHeDVLRzUxYkd3c0lIUm9hWE11WVhKeVlYa3BPMXh1ZlR0Y2JuQnliMk5sYzNNdWRHbDBiR1VnUFNBblluSnZkM05sY2ljN1hHNXdjbTlqWlhOekxtSnliM2R6WlhJZ1BTQjBjblZsTzF4dWNISnZZMlZ6Y3k1bGJuWWdQU0I3ZlR0Y2JuQnliMk5sYzNNdVlYSm5kaUE5SUZ0ZE8xeHVjSEp2WTJWemN5NTJaWEp6YVc5dUlEMGdKeWM3SUM4dklHVnRjSFI1SUhOMGNtbHVaeUIwYnlCaGRtOXBaQ0J5WldkbGVIQWdhWE56ZFdWelhHNXdjbTlqWlhOekxuWmxjbk5wYjI1eklEMGdlMzA3WEc1Y2JtWjFibU4wYVc5dUlHNXZiM0FvS1NCN2ZWeHVYRzV3Y205alpYTnpMbTl1SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011WVdSa1RHbHpkR1Z1WlhJZ1BTQnViMjl3TzF4dWNISnZZMlZ6Y3k1dmJtTmxJRDBnYm05dmNEdGNibkJ5YjJObGMzTXViMlptSUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y21WdGIzWmxUR2x6ZEdWdVpYSWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NXlaVzF2ZG1WQmJHeE1hWE4wWlc1bGNuTWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NWxiV2wwSUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y0hKbGNHVnVaRXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjSEpsY0dWdVpFOXVZMlZNYVhOMFpXNWxjaUE5SUc1dmIzQTdYRzVjYm5CeWIyTmxjM011YkdsemRHVnVaWEp6SUQwZ1puVnVZM1JwYjI0Z0tHNWhiV1VwSUhzZ2NtVjBkWEp1SUZ0ZElIMWNibHh1Y0hKdlkyVnpjeTVpYVc1a2FXNW5JRDBnWm5WdVkzUnBiMjRnS0c1aGJXVXBJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozQnliMk5sYzNNdVltbHVaR2x1WnlCcGN5QnViM1FnYzNWd2NHOXlkR1ZrSnlrN1hHNTlPMXh1WEc1d2NtOWpaWE56TG1OM1pDQTlJR1oxYm1OMGFXOXVJQ2dwSUhzZ2NtVjBkWEp1SUNjdkp5QjlPMXh1Y0hKdlkyVnpjeTVqYUdScGNpQTlJR1oxYm1OMGFXOXVJQ2hrYVhJcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNCeWIyTmxjM011WTJoa2FYSWdhWE1nYm05MElITjFjSEJ2Y25SbFpDY3BPMXh1ZlR0Y2JuQnliMk5sYzNNdWRXMWhjMnNnUFNCbWRXNWpkR2x2YmlncElIc2djbVYwZFhKdUlEQTdJSDA3WEc0aUxDSnBiWEJ2Y25RZ2V5QkRiMjF3YjI1bGJuUWdmU0JtY205dElDY3VMMjF2WkdWc2N5OURiMjF3YjI1bGJuUW5PMXh5WEc1cGJYQnZjblFnZXlCdWIyUmxUR2x6ZEN3Z1oyVjBVMlZqZEdsdmJuTXNJR2RsZEVOaGNtUnpMQ0JuWlhSTlpXNTFTWFJsYlhNc0lIMGdabkp2YlNBbkxpOTJhV1YzY3k5RVQwMUZiR1Z0Wlc1MGN5YzdYSEpjYm1sdGNHOXlkQ0I3SUdkbGRGTnJaV3hsZEc5dUxDQnlaVzVrWlhJZ2ZTQm1jbTl0SUNjdUwzWnBaWGR6TDNOclpXeGxkRzl1Snp0Y2NseHVhVzF3YjNKMElITmxjblpwWTJVZ1puSnZiU0FuTGk5elpYSjJhV05sY3k5eVpYTnZkWEpqWlhNbk8xeHlYRzVwYlhCdmNuUWdleUJvWVc1a2JHVlBkbVZ5YkdGNUxDQm9ZVzVrYkdWTlpXNTFJQ3dnYUdsa1pVMWxiblY5SUdaeWIyMGdKeTR2ZG1sbGQzTXZhR0Z1Wkd4bFRXVnVkU2M3WEhKY2JtbHRjRzl5ZENCN0lITmpjbTlzYkVoaGJtUnNaWElnZlNCbWNtOXRJQ2N1TDNacFpYZHpMM05qY205c2JGUnZKenRjY2x4dWFXMXdiM0owSUhzZ2NtVnphWHBsSUgwZ1puSnZiU0FuTGk5MmFXVjNjeTl5WlhOcGVtVW5PMXh5WEc1cGJYQnZjblFnZXlCemFHOTNVMnhwWkdWekxDQmhkWFJ2VTJodmQxTnNhV1JsY3l3Z2NHeDFjMU5zYVdSbGN5d2dZM1Z5Y21WdWRGTnNhV1JsSUgwZ1puSnZiU0FuTGk5MmFXVjNjeTl6Ykdsa1pYTW5PMXh5WEc1Y2NseHVZMjl1YzNRZ1lYQndJRDBnS0daMWJtTjBhVzl1SUNncElIdGNjbHh1SUNBdkwxeHlYRzRnSUM4dklGWmhjbWxoWW14bGMxeHlYRzRnSUM4dlhISmNiaUFnYkdWMElITmxkSFJwYm1kek8xeHlYRzRnSUZ4eVhHNGdJR052Ym5OMElIUm9ZWFFnUFNCN2ZUdGNjbHh1SUNCamIyNXpkQ0JrWldaaGRXeDBjeUE5SUh0Y2NseHVJQ0FnSUhObGJHVmpkRzl5Y3pvZ2UxeHlYRzRnSUNBZ0lDQnRaVzUxU1hSbGJYTkhjbTkxY0RvZ0p5TnNaV1owWDIxbGJuVmZhWFJsYlhNbkxGeHlYRzRnSUNBZ0lDQnpaV04wYVc5dWMwZHliM1Z3T2lBbkkzTmxZM1JwYjI1ZlozSnZkWEJ6Snl4Y2NseHVJQ0FnSUgwc1hISmNiaUFnSUNCamJHRnpjMlZ6T2lCN1hISmNiaUFnSUNBZ0lHVnVkR1Z5Ukc5dVpUb2dKMnhsWm5SZmJXVnVkVjl2ZG1WeWJHRjVJR3hsWm5SZmJXVnVkVjl2ZG1WeWJHRjVMV1Z1ZEdWeUxXUnZibVVuTEZ4eVhHNGdJQ0FnSUNCbGVHbDBSRzl1WlRvZ0oyeGxablJmYldWdWRWOXZkbVZ5YkdGNUlHeGxablJmYldWdWRWOXZkbVZ5YkdGNUxXVjRhWFF0Wkc5dVpTY3NYSEpjYmlBZ0lDQWdJR3hsWm5STlpXNTFVMmh2ZHpvZ0oyeGxablJmYldWdWRWOXphRzkzSnl4Y2NseHVJQ0FnSUNBZ2JHVm1kRTFsYm5WSWFXUmtaVzQ2SUNkc1pXWjBYMjFsYm5WZmFHbGtaR1Z1SjF4eVhHNGdJQ0FnZlN4Y2NseHVJQ0FnSUhKbGMyOTFjbU5sY3pvZ1cxMHNYSEpjYmlBZ0lDQmpZV3hzWW1GamF6b2dablZ1WTNScGIyNGdLR052Ym5SbGJuUXBJSHRjY2x4dUlDQWdJQ0FnY21WMGRYSnVJR052Ym5SbGJuUTdYSEpjYmlBZ0lDQjlMRnh5WEc0Z0lIMDdYSEpjYmx4eVhHNGdJQzh2WEhKY2JpQWdMeThnVFdWMGFHOWtjMXh5WEc0Z0lDOHZYSEpjYmlBZ1hISmNiaUFnWTI5dWMzUWdkVzVwY1hWbFFYSnlZWGtnUFNCbWRXNWpkR2x2YmlBb1lYSnlLU0I3WEhKY2JpQWdJQ0J5WlhSMWNtNGdZWEp5TG1acGJIUmxjaWdvZG1Gc2RXVXNJR2x1WkdWNExDQnpaV3htS1NBOVBpQnpaV3htTG1sdVpHVjRUMllvZG1Gc2RXVXBJRDA5UFNCcGJtUmxlQ2s3WEhKY2JpQWdmVHRjY2x4dVhISmNiaUFnWTI5dWMzUWdkVzVwY1hWbFVtVnpiM1Z5WTJWeklEMGdablZ1WTNScGIyNGdLR05oZEdWbmIzSjVLU0I3WEhKY2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLSEpsYzI5MWNtTmxjeWtnZTF4eVhHNGdJQ0FnSUNCeVpYUjFjbTRnY21WemIzVnlZMlZ6TG1acGJIUmxjaWhjY2x4dUlDQWdJQ0FnSUNBb2NtVnpiM1Z5WTJVcElEMCtJSEpsYzI5MWNtTmxMbU5oZEdWbmIzSjVMblJ5YVcwb0tTQTlQVDBnWTJGMFpXZHZjbmxjY2x4dUlDQWdJQ0FnS1R0Y2NseHVJQ0FnSUgwN1hISmNiaUFnZlR0Y2NseHVYSEpjYmlBZ0x5b3FYSEpjYmlBZ0lDb2dYSEpjYmlBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITmxiR1ZqZEc5eUlGUm9aU0J6Wld4bFkzUnZjaUJtYjNJZ2RHaGxJR052Ym5SbGJuUWdjR0Z5Wlc1MElHVnNaVzFsYm5SY2NseHVJQ0FnS2lCQWNHRnlZVzBnZTBGeWNtRjVmU0J5WlhOdmRYSmpaWE1nVkdobElHUmhkR0VnWm05eUlIUm9aU0JqYjI1MFpXNTBJR2wwWlcxelhISmNiaUFnSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2RHVnRjR3hoZEdVZ1ZHaGxJR1oxYm1OMGFXOXVJSEpsYm1SbGNpQlZTVnh5WEc0Z0lDQXFMMXh5WEc0Z0lHTnZibk4wSUhKbGJtUmxja052Ym5SbGJuUWdQU0JtZFc1amRHbHZiaWh6Wld4bFkzUnZjaXdnY21WemIzVnlZMlZ6TENCMFpXMXdiR0YwWlNrZ2UxeHlYRzRnSUNBZ2NtVjBkWEp1SUc1bGR5QkRiMjF3YjI1bGJuUW9jMlZzWldOMGIzSXNJSHRjY2x4dUlDQWdJQ0FnY21WemIzVnlZMlZ6T2lCeVpYTnZkWEpqWlhNc1hISmNiaUFnSUNBZ0lIUmxiWEJzWVhSbE9pQjBaVzF3YkdGMFpTeGNjbHh1SUNBZ0lIMHBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdZMjl1YzNRZ1pHVnpkRzl5ZVNBOUlHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdMeThnVFdGclpTQnpkWEpsSUhSb1pTQndiSFZuYVc0Z2FHRnpJR0psWlc0Z2FXNXBkR2xoYkdsNlpXUmNjbHh1SUNBZ0lHbG1JQ2doYzJWMGRHbHVaM01wSUhKbGRIVnlianRjY2x4dVhISmNiaUFnSUNBdkx5QlNaVzF2ZG1VZ2RHaGxJSFJoWW14bElHOW1JR052Ym5SbGJuUnpYSEpjYmlBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXNaV1owVFdWdWRVbDBaVzF6TG1sdWJtVnlTRlJOVENBOUlDY25PMXh5WEc0Z0lDQWdjMlYwZEdsdVozTXVibTlrWlV4cGMzUXVjMlZqZEdsdmJuTkpkR1Z0Y3k1cGJtNWxja2hVVFV3Z1BTQW5KenRjY2x4dVhISmNiaUFnSUNBdkx5QlNaWE5sZENCMllYSnBZV0pzWlhOY2NseHVJQ0FnSUhObGRIUnBibWR6SUQwZ2JuVnNiRHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJR052Ym5OMElHbHVhWFFnUFNCbWRXNWpkR2x2YmlBb2IzQjBhVzl1Y3lrZ2UxeHlYRzRnSUNBZ0x5OGdSR1Z6ZEc5eWVTQjBhR1VnWTNWeWNtVnVkQ0JwYm1sMGFXRnNhWHBoZEdsdmJseHlYRzRnSUNBZ1pHVnpkRzl5ZVNncE8xeHlYRzVjY2x4dUlDQWdJRzl3ZEdsdmJuTWdQU0J2Y0hScGIyNXpJSHg4SUh0OU8xeHlYRzVjY2x4dUlDQWdJQzh2SUUxbGNtZGxJR0p2ZEdnZ2RYTmxjaUJrWldaaGRXeDBjeUJoYm1RZ2IzQjBhVzl1Y3k1Y2NseHVJQ0FnSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcE8xeHlYRzVjY2x4dUlDQWdJQzh2SUVkbGRDQmhiR3dnWTJGMFpXZHZjbWxsY3lCdlppQjBhR1VnY21WemIzVnlZMlZ6WEhKY2JpQWdJQ0JqYjI1emRDQmpZWFJsWjI5eWFXVnpJRDBnZFc1cGNYVmxRWEp5WVhrb1hISmNiaUFnSUNBZ0lITmxkSFJwYm1kekxuSmxjMjkxY21ObGN5NXRZWEFvS0hKbGMyOTFjbU5sS1NBOVBpQnlaWE52ZFhKalpTNWpZWFJsWjI5eWVTbGNjbHh1SUNBZ0lDazdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1IyVjBJR0ZzYkNCcGRHVnRjeUJ2WmlCc1pXWjBJRzFsYm5VZ2FYUmxiWE1nZEdobGJpQmhjSEJsYm1RZ2FYUWdkRzhnWkc5amRXMWxiblJjY2x4dUlDQWdJSEpsYm1SbGNrTnZiblJsYm5Rb2MyVjBkR2x1WjNNdWMyVnNaV04wYjNKekxtMWxiblZKZEdWdGMwZHliM1Z3TENCallYUmxaMjl5YVdWekxDQm5aWFJOWlc1MVNYUmxiWE1wTG5KbGJtUmxjaWdwTzF4eVhHNWNjbHh1SUNBZ0lDOHZJRWRsZENCaGJHd2djMlZqZEdsdmJuTWdiMllnYldGcGJpQmpiMjUwWlc1MFhISmNiaUFnSUNCeVpXNWtaWEpEYjI1MFpXNTBLSE5sZEhScGJtZHpMbk5sYkdWamRHOXljeTV6WldOMGFXOXVjMGR5YjNWd0xDQmpZWFJsWjI5eWFXVnpMQ0JuWlhSVFpXTjBhVzl1Y3lrdWNtVnVaR1Z5S0NrN1hISmNibHh5WEc0Z0lDQWdMeThnVW1WdVpHVnlJSFJvWlNCcGRHVnRjeUJwYm5SdklHRWdkVzVwY1hWbElITmxZM1JwYjI0Z2FXUmNjbHh1SUNBZ0lHTmhkR1ZuYjNKcFpYTXVabTl5UldGamFDZ29ZMkYwWldkdmNua3BJRDArSUh0Y2NseHVJQ0FnSUNBZ1kyOXVjM1FnYzJWc1pXTjBiM0lnUFNCZ0l5UjdZMkYwWldkdmNubDlJQzVuY205MWNGOXBkR1Z0YzJBN1hISmNibHh5WEc0Z0lDQWdJQ0F2THlCSFpYUWdjbVZ6YjNWeVkyVnpJRzltSUhSb1pTQnpZVzFsSUdOaGRHVm5iM0o1WEhKY2JpQWdJQ0FnSUM4dklFWnZjaUJsZUdGdGNHeGxPaUJJVkUxTTQ0Q0JTbUYyWVhOamNtbHdkT09BZ1ZSdmIyeHo0NENCY0c5a1kyRnpkRnh5WEc0Z0lDQWdJQ0JqYjI1emRDQnlaWE52ZFhKalpYTWdQU0IxYm1seGRXVlNaWE52ZFhKalpYTW9ZMkYwWldkdmNua3BLSE5sZEhScGJtZHpMbkpsYzI5MWNtTmxjeWs3WEhKY2JpQWdJQ0FnSUhKbGJtUmxja052Ym5SbGJuUW9jMlZzWldOMGIzSXNJSEpsYzI5MWNtTmxjeXdnWjJWMFEyRnlaSE1wTG5KbGJtUmxjaWdwTzF4eVhHNGdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdMeThnVTJOeWIyeHNJSFJ2SUhSb1pTQnpjR1ZqYVdacFpXUWdZMkYwWldkdmNua2dZbmtnWTJ4cFkydHBibWNnZEdobElHMWxiblZjY2x4dUlDQWdJR052Ym5OMElITmpjbTlzYkZSdklEMGdLR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXBJSHRjY2x4dUlDQWdJQ0FnWTI5dWMzUWdhWFJsYlhNZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDY3ViR1ZtZEY5dFpXNTFYMmwwWlcwbktWeHlYRzRnSUNBZ0lDQmpiMjV6ZENCc2FXNXJjeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1c1pXWjBYMjFsYm5WZmFYUmxiU0JoSnlrN1hISmNibHh5WEc0Z0lDQWdJQ0JtYjNJZ0tHeGxkQ0JzYVc1cklHOW1JR3hwYm10ektTQjdYSEpjYmlBZ0lDQWdJQ0FnYkdsdWF5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lITmpjbTlzYkVoaGJtUnNaWElvYjJabWMyVjBLU2s3WEhKY2JpQWdJQ0FnSUNBZ2JHbHVheTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJR1oxYm1OMGFXOXVLQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdXeTR1TG1sMFpXMXpYUzVtYjNKRllXTm9LR2wwWlcwZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvYVhSbGJTNWpiR0Z6YzB4cGMzUXVZMjl1ZEdGcGJuTW9KMk4xY25KbGJuUW5LU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdsMFpXMHVZMnhoYzNOTWFYTjBMbkpsYlc5MlpTZ25ZM1Z5Y21WdWRDY3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNCOUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUZ4eVhHNGdJQ0FnSUNBZ0lDQWdiR2x1YXk1d1lYSmxiblJGYkdWdFpXNTBMbU5zWVhOelRHbHpkQzVoWkdRb0oyTjFjbkpsYm5RbktUdGNjbHh1SUNBZ0lDQWdJQ0I5S1Z4eVhHNGdJQ0FnSUNCOVhISmNiaUFnSUNCOUtTZzNOaWs3WEhKY2JseHlYRzVjY2x4dUlDQWdJQzh2SUZ4eVhHNGdJQ0FnTHk4Z2FXNXBkQ0FtSUVWMlpXNTBjMXh5WEc0Z0lDQWdMeTljY2x4dVhISmNiaUFnSUNBdkx5QlRhRzkzSUc5eUlHaHBaR1VnZEdobElHeGxablFnYldWdWRTQmllU0J5WlhOcGVtbHVaeUIwYUdVZ2MybDZaU0J2WmlCa2IyTjFiV1Z1ZEM1a2IyTjFiV1Z1ZEVWc1pXMWxiblF1WTJ4cFpXNTBWMmxrZEdoY2NseHVJQ0FnSUdoaGJtUnNaVTFsYm5Vb2JtOWtaVXhwYzNRc0lITmxkSFJwYm1kekxtTnNZWE56WlhNcEtDazdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1VtVnphWHBsSUhSb1pTQjNhV1IwYUNCdlppQnNaV1owWDIxbGJuVWdZVzVrSUcxaGFXNWZZMjl1ZEdWdWRGeHlYRzRnSUNBZ2NtVnphWHBsTG1sdWFYUnBZV3hwZW1Vb2V5QnViMlJsVEdsemREb2dibTlrWlV4cGMzUWdmU2s3WEhKY2JpQWdJQ0JjY2x4dUlDQWdJQzh2SUdKaGJtNWxjaUJ6Ykdsa1pYTmNjbHh1SUNBZ0lHRjFkRzlUYUc5M1UyeHBaR1Z6S0NrN1hISmNiaUFnSUNCdWIyUmxUR2x6ZEM1d2NtVjJMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2djR3gxYzFOc2FXUmxjeWd0TVNrcE8xeHlYRzRnSUNBZ2JtOWtaVXhwYzNRdWJtVjRkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJSEJzZFhOVGJHbGtaWE1vTVNrcE8xeHlYRzRnSUNBZ2JtOWtaVXhwYzNRdVpHOTBWM0poY0hCbGNpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNiaUFnSUNBZ0lHbG1JQ2doWlhabGJuUXVkR0Z5WjJWMExtMWhkR05vWlhNb0p5TmtiM1FuS1NrZ2NtVjBkWEp1TzF4eVhHNGdJQ0FnSUNCamIyNXpkQ0J1ZFcxaVpYSWdQU0JPZFcxaVpYSW9aWFpsYm5RdWRHRnlaMlYwTG1SaGRHRnpaWFF1Wkc5MEtUdGNjbHh1SUNBZ0lDQWdZM1Z5Y21WdWRGTnNhV1JsS0c1MWJXSmxjaWs3WEhKY2JpQWdJQ0I5S1Z4eVhHNWNjbHh1SUNBZ0lHNXZaR1ZNYVhOMExteGxablJEYjI1MGNtOXNUV1Z1ZFM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdoaGJtUnNaVTkyWlhKc1lYa29ibTlrWlV4cGMzUXNJSE5sZEhScGJtZHpMbU5zWVhOelpYTXBLVHRjY2x4dUlDQWdJRzV2WkdWTWFYTjBMbXhsWm5STlpXNTFUM1psY214aGVTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lHaGhibVJzWlU5MlpYSnNZWGtvYm05a1pVeHBjM1FzSUhObGRIUnBibWR6TG1Oc1lYTnpaWE1wS1R0Y2NseHVJQ0FnSUZ4eVhHNGdJQ0FnYm05a1pVeHBjM1F1YkdWbWRFMWxiblV1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYlc5MWMyVmtiM2R1Snl3Z1puVnVZM1JwYjI0Z0tHVjJaVzUwS1NCN1hISmNiaUFnSUNBZ0lHVjJaVzUwTG5CeVpYWmxiblJFWldaaGRXeDBLQ2s3WEhKY2JpQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNjbHh1SUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUM4dklFaHBaR1VnYkdWbWRDQnRaVzUxSUc1aGRtbG5ZWFJwYjI0Z2QyaGxiaUIxYzJWeUlHTnNhV05ySUdFZ2JXVnVkU0JwYmlCdGIySnBiR1VnWkdWMmFXTmxjMXh5WEc0Z0lDQWdibTlrWlV4cGMzUXViR1ZtZEUxbGJuVkpkR1Z0Y3k1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdaMWJtTjBhVzl1S0NrZ2UxeHlYRzRnSUNBZ0lDQnBaaUFvYm05a1pVeHBjM1F1YUhSdGJDNWpiR2xsYm5SWGFXUjBhQ0E4SURjMU1Da2dlMXh5WEc0Z0lDQWdJQ0FnSUdocFpHVk5aVzUxS0c1dlpHVk1hWE4wTENCelpYUjBhVzVuY3k1amJHRnpjMlZ6S1R0Y2NseHVJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJSDA3WEhKY2JseHlYRzRnSUM4dlhISmNiaUFnTHk4Z1NXNXBkSE1nSmlCRmRtVnVkSE5jY2x4dUlDQXZMMXh5WEc1Y2NseHVJQ0F2THlCU1pXNWtaWElnZEdobElITnJaV3hsZEc5dUlITmpjbVZsYmlCaVpXWnZjbVVnWjJWMGRHbHVaeUIwYUdVZ2NtVnpiM1Z5WTJWeklHWnliMjBnYzJWeWRtVnlYSEpjYmlBZ2NtVnVaR1Z5S0dSbFptRjFiSFJ6TG5ObGJHVmpkRzl5Y3k1elpXTjBhVzl1YzBkeWIzVndMQ0JuWlhSVGEyVnNaWFJ2YmlrN1hISmNibHh5WEc0Z0lDOHZJR0poYm01bGNpQnpiR2xrWlhNZ1NXNXBkR2xoYkNCY2NseHVJQ0J6YUc5M1UyeHBaR1Z6S0NrN1hISmNibHh5WEc0Z0lDOHZJRWRsZENCeVpYTnZkWEpqWlhNZ1puSnZiU0IwYUdVZ2MyVnlkbWxqWlNCemFXUmxYSEpjYmlBZ2MyVnlkbWxqWlM1blpYUkJiR3dvS1M1MGFHVnVLQ2h5WlhOdmRYSmpaWE1wSUQwK0lIdGNjbHh1SUNBZ0lHbHVhWFFvY21WemIzVnlZMlZ6S1R0Y2NseHVJQ0I5S1R0Y2NseHVYSEpjYmlBZ2RHaGhkQzVwYm1sMElEMGdhVzVwZER0Y2NseHVJQ0IwYUdGMExtUmxjM1J2Y25rZ1BTQmtaWE4wYjNKNU8xeHlYRzRnSUZ4eVhHNGdJSEpsZEhWeWJpQjBhR0YwTzF4eVhHNTlLU2dwTzF4eVhHNGlMQ0pHZFc1amRHbHZiaTV3Y205MGIzUjVjR1V1YldWMGFHOWtJRDBnWm5WdVkzUnBiMjRvYm1GdFpTd2dablZ1WXlrZ2UxeHlYRzRnSUdsbUlDaDBhR2x6TG5CeWIzUnZkSGx3WlZ0dVlXMWxYU2tnY21WMGRYSnVPMXh5WEc0Z0lIUm9hWE11Y0hKdmRHOTBlWEJsVzI1aGJXVmRJRDBnWm5WdVl6dGNjbHh1SUNCeVpYUjFjbTRnZEdocGN6dGNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR052Ym5OMElFTnZiWEJ2Ym1WdWRDQTlJQ2htZFc1amRHbHZiaWdwSUh0Y2NseHVYSEpjYmlBZ0x5b3FYSEpjYmlBZ0lDb2dYSEpjYmlBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITmxiR1ZqZEc5eUlGUm9aU0J6Wld4bFkzUnZjaUJtYjNJZ2RHaGxJSFJoWW14bElHOW1JR052Ym5SbGJuUnpJSFJoY21kbGRGeHlYRzRnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdmNIUnBiMjV6SUZWelpYSWdiM0IwYVc5dWN5QmNjbHh1SUNBZ0tpOWNjbHh1SUNCMllYSWdRMjl1YzNSeWRXTjBiM0lnUFNCbWRXNWpkR2x2YmloelpXeGxZM1J2Y2l3Z2IzQjBhVzl1Y3lrZ2UxeHlYRzRnSUNBZ2RHaHBjeTV6Wld4bFkzUnZjaUE5SUhObGJHVmpkRzl5TzF4eVhHNGdJQ0FnZEdocGN5NXlaWE52ZFhKalpYTWdQU0J2Y0hScGIyNXpMbkpsYzI5MWNtTmxjenRjY2x4dUlDQWdJSFJvYVhNdWRHVnRjR3hoZEdVZ1BTQnZjSFJwYjI1ekxuUmxiWEJzWVhSbE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ1EyOXVjM1J5ZFdOMGIzSXViV1YwYUc5a0tDZHlaVzVrWlhJbkxDQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dUlDQWdJR052Ym5OMElIUmhjbWRsZENBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvZEdocGN5NXpaV3hsWTNSdmNpazdYSEpjYmlBZ0lDQnBaaUFvSVhSaGNtZGxkQ2tnY21WMGRYSnVPMXh5WEc0Z0lDQWdkR0Z5WjJWMExtbHVibVZ5U0ZSTlRDQTlJSFJvYVhNdWFHRnVaR3hsVkdWdGNHeGhkR1VvZEdocGN5NXlaWE52ZFhKalpYTXBPMXh5WEc0Z0lIMHBYSEpjYmx4eVhHNGdJRU52Ym5OMGNuVmpkRzl5TG0xbGRHaHZaQ2duYUdGdVpHeGxWR1Z0Y0d4aGRHVW5MQ0JtZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0FnSUdsbUlDaDBhR2x6TG5KbGMyOTFjbU5sY3k1c1pXNW5kR2dnUENBeEtTQnlaWFIxY200N1hISmNibHh5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Y21WemIzVnlZMlZ6WEhKY2JpQWdJQ0FnSUM1dFlYQW9jbVZ6YjNWeVkyVWdQVDRnZEdocGN5NTBaVzF3YkdGMFpTaHlaWE52ZFhKalpTa3BYSEpjYmlBZ0lDQWdJQzVxYjJsdUtDY25LVnh5WEc0Z0lIMHBYSEpjYmx4eVhHNGdJRU52Ym5OMGNuVmpkRzl5TG0xbGRHaHZaQ2duYzJWMFJHRjBZU2NzSUdaMWJtTjBhVzl1S0c5aWFpa2dlMXh5WEc0Z0lDQWdabTl5SUNoc1pYUWdhMlY1SUdsdUlHOWlhaWtnZTF4eVhHNGdJQ0FnSUNCcFppQW9iMkpxTG1oaGMwOTNibEJ5YjNCbGNuUnBaWE1vYTJWNUtTa2dlMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ6YjNWeVkyVnpJRDBnYjJKcVcydGxlVjA3WEhKY2JpQWdJQ0FnSUgxY2NseHVJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQjBhR2x6TG5KbGJtUmxjaWdwTzF4eVhHNGdJSDBwWEhKY2JseHlYRzRnSUVOdmJuTjBjblZqZEc5eUxtMWxkR2h2WkNnbloyVjBSR0YwWVNjc0lHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdjbVYwZFhKdUlFOWlhbVZqZEM1d1lYSnpaU2hQWW1wbFkzUXVjM1J5YVc1bmFXWjVLSFJvYVhNdWNtVnpiM1Z5WTJWektTazdYSEpjYmlBZ2ZTbGNjbHh1WEhKY2JpQWdjbVYwZFhKdUlFTnZibk4wY25WamRHOXlPMXh5WEc1OUtTZ3BPeUlzSW1sdGNHOXlkQ0JoZUdsdmN5Qm1jbTl0SUNkaGVHbHZjeWM3WEhKY2JtTnZibk4wSUdKaGMyVlZjbXdnUFNBbkx5NXVaWFJzYVdaNUwyWjFibU4wYVc5dWN5OWhjR2t2Y21WemIzVnlZMlZ6Snp0Y2NseHVYSEpjYm1OdmJuTjBJR2RsZEVGc2JDQTlJR1oxYm1OMGFXOXVLQ2tnZTF4eVhHNGdJR052Ym5OMElISmxjWFZsYzNRZ1BTQmhlR2x2Y3k1blpYUW9ZbUZ6WlZWeWJDazdYSEpjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1F1ZEdobGJpaHlaWE53YjI1elpTQTlQaUJ5WlhOd2IyNXpaUzVrWVhSaEtUdGNjbHh1ZlZ4eVhHNWNjbHh1WTI5dWMzUWdZM0psWVhSbElEMGdablZ1WTNScGIyNG9ibVYzVDJKcVpXTjBLU0I3WEhKY2JpQWdZMjl1YzNRZ2NtVnhkV1Z6ZENBOUlHRjRhVzl6TG5CdmMzUW9ZbUZ6WlZWeWJDd2dibVYzVDJKcVpXTjBLVHRjY2x4dUlDQnlaWFIxY200Z2NtVnhkV1Z6ZEM1MGFHVnVLSEpsYzNCdmJuTmxJRDArSUhKbGMzQnZibk5sTG1SaGRHRXBPMXh5WEc1OVhISmNibHh5WEc1amIyNXpkQ0IxY0dSaGRHVWdQU0JtZFc1amRHbHZiaWhwWkN3Z2JtVjNUMkpxWldOMEtTQjdYSEpjYmlBZ1kyOXVjM1FnY21WeGRXVnpkQ0E5SUdGNGFXOXpMbkIxZENoZ0pIdGlZWE5sVlhKc2ZTOGtlMmxrZldBc0lHNWxkMDlpYW1WamRDazdYSEpjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1F1ZEdobGJpaHlaWE53YjI1elpTQTlQaUJ5WlhOd2IyNXpaUzVrWVhSaEtUdGNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdleUJuWlhSQmJHd3NJR055WldGMFpTd2dkWEJrWVhSbElIMDdYSEpjYmlJc0ltVjRjRzl5ZENCamIyNXpkQ0J1YjJSbFRHbHpkQ0E5SUh0Y2NseHVJQ0JzWldaMFEyOXVkSEp2YkUxbGJuVTZJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXNaV1owWDJOdmJuUnliMnhmYldWdWRTY3BMRnh5WEc0Z0lHeGxablJOWlc1MVQzWmxjbXhoZVRvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG14bFpuUmZiV1Z1ZFY5dmRtVnliR0Y1Snlrc1hISmNiaUFnYzJWamRHbHZia2wwWlcxek9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjamMyVmpkR2x2Ymw5bmNtOTFjSE1uS1N4Y2NseHVJQ0JzWldaMFRXVnVkVWwwWlcxek9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjamJHVm1kRjl0Wlc1MVgybDBaVzF6Snlrc1hISmNiaUFnYUhSdGJEb2daRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExGeHlYRzRnSUdKdlpIazZJR1J2WTNWdFpXNTBMbUp2Wkhrc1hISmNiaUFnYkdWbWRFMWxiblU2SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVzWldaMFgyMWxiblVuS1N4Y2NseHVJQ0J5WlhOcGVtVklZVzVrYkdVNklHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1eVpYTnBlbVZmYUdGdVpHeGxKeWtzWEhKY2JpQWdiV0ZwYmtOdmJuUmxiblE2SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV0WVdsdVgyTnZiblJsYm5RbktTeGNjbHh1SUNCd2NtVjJPaUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY2pjSEpsZGljcExGeHlYRzRnSUc1bGVIUTZJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5TnVaWGgwSnlrc1hISmNiaUFnWkc5MFYzSmhjSEJsY2pvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1SdmRDMTNjbUZ3Y0dWeUp5bGNjbHh1ZlZ4eVhHNWNjbHh1SUNBdkx5QkhaVzVsY21GMFpTQmhJR2wwWlcwZ2IyWWdkR2hsSUc1aGRtbG5ZWFJwYjI1Y2NseHVaWGh3YjNKMElHTnZibk4wSUdkbGRFMWxiblZKZEdWdGN5QTlJR05oZEdWbmIzSjVJRDArSUdCY2NseHVJQ0E4YkdrZ1kyeGhjM005WENKc1pXWjBYMjFsYm5WZmFYUmxiVndpUGx4eVhHNGdJQ0FnUEdFZ2FISmxaajFjSWlNa2UyTmhkR1ZuYjNKNWZWd2lQaUJjY2x4dUlDQWdJQ0FnUEdsdFp5QmpiR0Z6Y3oxY0ltMWxiblZmYVhSbGJWOXBZMjl1WENJZ2MzSmpQVndpTGk5emRtY3ZKSHRqWVhSbFoyOXllWDB1YzNablhDSWdZV3gwUFZ3aVZHaHBjeUJwY3lCaElDUjdZMkYwWldkdmNubDlJR05oZEdWbmIzSjVYQ0krUEM5cGJXYytYSEpjYmlBZ0lDQWdJRHh6Y0dGdUlHTnNZWE56UFZ3aWJXVnVkVjlwZEdWdFgyTnZiblJsYm5SY0lqNGtlMk5oZEdWbmIzSjVmVHd2YzNCaGJqNWNjbHh1SUNBZ0lEd3ZZVDVjY2x4dUlDQThMMnhwUGx4eVhHNWdPMXh5WEc1Y2NseHVJQ0F2THlCSFpXNWxjbUYwWlNCaElITmxZM1JwYjI0Z2IyWWdkR2hsSUcxaGFXNGdZMjl1ZEdWdWRGeHlYRzVsZUhCdmNuUWdZMjl1YzNRZ1oyVjBVMlZqZEdsdmJuTWdQU0JqWVhSbFoyOXllU0E5UGlCZ1hISmNiaUFnUEhObFkzUnBiMjRnYVdROVhDSWtlMk5oZEdWbmIzSjVmVndpSUdOc1lYTnpQVndpWjNKdmRYQmNJaUErWEhKY2JpQWdJQ0E4YURJZ1kyeGhjM005WENKbmNtOTFjRjkwYVhSc1pWd2lQaVI3WTJGMFpXZHZjbmw5UEM5b01qNWNjbHh1SUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0puY205MWNGOWpiMjUwWlc1MFhDSStYSEpjYmlBZ0lDQWdJRHgxYkNCamJHRnpjejFjSW5KdmR5Qm5jbTkxY0Y5cGRHVnRjMXdpUGp3dmRXdytYSEpjYmlBZ0lDQThMMlJwZGo1Y2NseHVJQ0E4TDNObFkzUnBiMjQrSUNCY2NseHVZRHRjY2x4dVhISmNiaUFnTHk4Z1IyVnVaWEpoZEdVZ1lTQnNhWE4wSUc5bUlIUm9aU0J6WldOMGFXOXVJRnh5WEc1bGVIQnZjblFnWTI5dWMzUWdaMlYwUTJGeVpITWdQU0J5WlhOdmRYSmpaU0E5UGlCZ1hISmNiaUFnUEd4cElHTnNZWE56UFZ3aVozSnZkWEJmYVhSbGJTQmpiMnd6WENJK1hISmNiaUFnSUNBOFlTQmpiR0Z6Y3oxY0ltZHliM1Z3WDJsMFpXMWZiR2x1YTF3aUlHaHlaV1k5WENJa2UzSmxjMjkxY21ObExtaHlaV1o5WENJK1hISmNiaUFnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqWVhKa1hDSStYSEpjYmlBZ0lDQWdJQ0FnUEdsdFp5QmpiR0Z6Y3oxY0ltTmhjbVJmYVdOdmJsd2lJSE55WXoxY0lpUjdjbVZ6YjNWeVkyVXVjM0pqZlZ3aUlHRnNkRDFjSWlSN2NtVnpiM1Z5WTJVdWMzSmpMbkpsY0d4aFkyVW9MMXhjTGx4Y0wybHRaMXhjTHk5bkxDQW5KeWw5WENJK1hISmNiaUFnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OaGNtUmZZbTlrZVZ3aVBseHlYRzRnSUNBZ0lDQWdJQ0FnUEdneklHTnNZWE56UFZ3aVkyRnlaRjkwYVhSc1pWd2lQaVI3Y21WemIzVnlZMlV1ZEdsMGJHVjlQQzlvTXo1Y2NseHVJQ0FnSUNBZ0lDQWdJRHh3SUdOc1lYTnpQVndpWTJGeVpGOTBaWGgwWENJK0pIdHlaWE52ZFhKalpTNWpiMjUwWlc1MGZUd3ZjRDVjY2x4dUlDQWdJQ0FnSUNBOEwyUnBkajVjY2x4dUlDQWdJQ0FnUEM5a2FYWStYSEpjYmlBZ0lDQThMMkUrWEhKY2JpQWdQQzlzYVQ1Y2NseHVZRHNpTENJdkx5QlNaWEJ5WlhObGJuUWdkR2hsSUd4bFpuUWdiV1Z1ZFNCdmNHVnVhVzVuSUc5eUlHTnNiM05wYm1kY2NseHVMeThnVkhKMVpTQnRaV0Z1Y3lCcGRDZHpJRzl3Wlc1cGJtZGNjbHh1YkdWMElHbHpRV04wYVhabElEMGdabUZzYzJVN1hISmNibHh5WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnYUdsa1pVMWxiblVvYm05a1pXeHBjM1FzSUdOc1lYTnpaWE1wSUh0Y2NseHVJQ0J1YjJSbGJHbHpkQzVvZEcxc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXViR1ZtZEUxbGJuVklhV1JrWlc0N1hISmNiaUFnYm05a1pXeHBjM1F1YkdWbWRFMWxiblZQZG1WeWJHRjVMbU5zWVhOelRtRnRaU0E5SUdOc1lYTnpaWE11WlhocGRFUnZibVU3WEhKY2JpQWdhWE5CWTNScGRtVWdQU0IwY25WbE8xeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdhR0Z1Wkd4bFQzWmxjbXhoZVNBb2JtOWtaV3hwYzNRc0lHTnNZWE56WlhNcElIdGNjbHh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0NrZ2UxeHlYRzRnSUNBZ2FXWWdLR2x6UVdOMGFYWmxLU0I3WEhKY2JpQWdJQ0FnSUc1dlpHVnNhWE4wTG1oMGJXd3VZMnhoYzNOT1lXMWxJRDBnWTJ4aGMzTmxjeTVzWldaMFRXVnVkVk5vYjNjN1hISmNiaUFnSUNBZ0lHNXZaR1ZzYVhOMExteGxablJOWlc1MVQzWmxjbXhoZVM1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzJWekxtVnVkR1Z5Ukc5dVpUdGNjbHh1SUNBZ0lIMGdaV3h6WlNCN1hISmNiaUFnSUNBZ0lHNXZaR1ZzYVhOMExtaDBiV3d1WTJ4aGMzTk9ZVzFsSUQwZ1kyeGhjM05sY3k1c1pXWjBUV1Z1ZFVocFpHUmxianRjY2x4dUlDQWdJQ0FnYm05a1pXeHBjM1F1YkdWbWRFMWxiblZQZG1WeWJHRjVMbU5zWVhOelRtRnRaU0E5SUdOc1lYTnpaWE11WlhocGRFUnZibVU3WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ2FYTkJZM1JwZG1VZ1BTQWhhWE5CWTNScGRtVTdYSEpjYmlBZ2ZWeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdhR0Z1Wkd4bFRXVnVkU2h1YjJSbGJHbHpkQ3dnWTJ4aGMzTmxjeWtnZTF4eVhHNGdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dUlDQWdJR2xtSUNodWIyUmxiR2x6ZEM1b2RHMXNMbU5zYVdWdWRGZHBaSFJvSUR3Z056VXdLU0I3WEhKY2JpQWdJQ0FnSUdocFpHVk5aVzUxS0c1dlpHVnNhWE4wTENCamJHRnpjMlZ6S1R0Y2NseHVJQ0FnSUgwZ1pXeHpaU0I3WEhKY2JpQWdJQ0FnSUc1dlpHVnNhWE4wTG1oMGJXd3VZMnhoYzNOT1lXMWxJRDBnWTJ4aGMzTmxjeTVzWldaMFRXVnVkVk5vYjNjN1hISmNiaUFnSUNBZ0lHNXZaR1ZzYVhOMExteGxablJOWlc1MVQzWmxjbXhoZVM1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzJWekxtVnVkR1Z5Ukc5dVpUdGNjbHh1SUNBZ0lDQWdhWE5CWTNScGRtVWdQU0JtWVd4elpUdGNjbHh1SUNBZ0lIMWNjbHh1SUNCOVhISmNibjFjY2x4dUlpd2laWGh3YjNKMElHTnZibk4wSUhKbGMybDZaU0E5SUNobWRXNWpkR2x2YmlncElIdGNjbHh1SUNCc1pYUWdjMlYwZEdsdVozTTdYSEpjYmx4eVhHNGdJR052Ym5OMElIUm9ZWFFnUFNCN2ZUc2dYSEpjYmlBZ1kyOXVjM1FnWkdWbVlYVnNkSE1nUFNCN1hISmNiaUFnSUNCemFYcGxjem9nZTF4eVhHNGdJQ0FnSUNCdFlYaFhhV1IwYURvZ05ESTFMRnh5WEc0Z0lDQWdJQ0J0YVc1WGFXUjBhRG9nTWpBd0xGeHlYRzRnSUNBZ0lDQjRPaUF5TlRCY2NseHVJQ0FnSUgwc1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNBdkx5QkpibWwwY3lCaGJtUWdSWFpsYm5SelhISmNiaUFnWTI5dWMzUWdhVzVwZEdsaGJHbDZaU0E5SUdaMWJtTjBhVzl1S0c5d2RHbHZibk1wSUh0Y2NseHVJQ0FnSUc5d2RHbHZibk1nUFNCdmNIUnBiMjV6SUh4OElIdDlJRnh5WEc0Z0lDQWdjMlYwZEdsdVozTWdQU0JQWW1wbFkzUXVZWE56YVdkdUtIdDlMQ0JrWldaaGRXeDBjeXdnYjNCMGFXOXVjeWs3WEhKY2JseHlYRzRnSUNBZ0x5OGdiV1YwYUc5a2MxeHlYRzRnSUNBZ1kyOXVjM1FnYlc5MlpVRjBJRDBnWm5WdVkzUnBiMjRvZUNrZ2UxeHlYRzRnSUNBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXNaV1owVFdWdWRTNXpkSGxzWlM1M2FXUjBhQ0E5SUhnZ0t5QW5jSGduTzF4eVhHNGdJQ0FnSUNCelpYUjBhVzVuY3k1dWIyUmxUR2x6ZEM1eVpYTnBlbVZJWVc1a2JHVXVjM1I1YkdVdWJHVm1kQ0E5SUhnZ0t5QW5jSGduTzF4eVhHNGdJQ0FnSUNCelpYUjBhVzVuY3k1dWIyUmxUR2x6ZEM1dFlXbHVRMjl1ZEdWdWRDNXpkSGxzWlM1dFlYSm5hVzVNWldaMElEMGdlQ0FySUNkd2VDYzdYSEpjYmlBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnWTI5dWMzUWdiMjVOYjNWelpWVndJRDBnWm5WdVkzUnBiMjRnWm5WdVl5Z3BJSHRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1YkdWbWRFMWxiblV1WTJ4aGMzTk1hWE4wTG5KbGJXOTJaU2duZEhKaGJuTnBkR2x2Ymw5dWIyNWxKeWs3WEhKY2JpQWdJQ0FnSUhObGRIUnBibWR6TG01dlpHVk1hWE4wTG0xaGFXNURiMjUwWlc1MExtTnNZWE56VEdsemRDNXlaVzF2ZG1Vb0ozUnlZVzV6YVhScGIyNWZibTl1WlNjcE8xeHlYRzRnSUNBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNWliMlI1TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjI1dlgzVnpaWEpmYzJWc1pXTjBhVzl1SnlrN1hISmNiaUFnSUNBZ0lHUnZZM1Z0Wlc1MExuSmxiVzkyWlVWMlpXNTBUR2x6ZEdWdVpYSW9KMjF2ZFhObGJXOTJaU2NzSUc5dVRXOTFjMlZOYjNabEtUdGNjbHh1SUNBZ0lDQWdkR2hwY3k1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtDZHRiM1Z6WlhWd0p5d2dablZ1WXlrN1hISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdZMjl1YzNRZ2IyNU5iM1Z6WlUxdmRtVWdQU0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh5WEc0Z0lDQWdJQ0JqYjI1emRDQnNaV1owVFdWdWRWZHBaSFJvSUQwZ2NHRnljMlZKYm5Rb2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdWJHVm1kRTFsYm5VdWMzUjViR1V1ZDJsa2RHZ3NJREV3S1R0Y2NseHVJQ0FnSUNBZ2FXWWdLR3hsWm5STlpXNTFWMmxrZEdnZ1BpQnpaWFIwYVc1bmN5NXphWHBsY3k1dFlYaFhhV1IwYUNCOGZDQnNaV1owVFdWdWRWZHBaSFJvSUR3Z2MyVjBkR2x1WjNNdWMybDZaWE11YldsdVYybGtkR2dwSUh0Y2NseHVJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNXlaVzF2ZG1WRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpXMXZkbVVuTENCdmJrMXZkWE5sVFc5MlpTazdYSEpjYmlBZ0lDQWdJSDBnWld4elpTQnBaaUFvYkdWbWRFMWxiblZYYVdSMGFDQThQU0J6WlhSMGFXNW5jeTV6YVhwbGN5NXRZWGhYYVdSMGFDQW1KaUJzWldaMFRXVnVkVmRwWkhSb0lENDlJSE5sZEhScGJtZHpMbk5wZW1WekxtMXBibGRwWkhSb0tTQjdYSEpjYmlBZ0lDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1YkdWbWRFMWxiblV1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25kSEpoYm5OcGRHbHZibDl1YjI1bEp5azdYSEpjYmlBZ0lDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1YldGcGJrTnZiblJsYm5RdVkyeGhjM05NYVhOMExtRmtaQ2duZEhKaGJuTnBkR2x2Ymw5dWIyNWxKeWs3WEhKY2JpQWdJQ0FnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdVltOWtlUzVqYkdGemMweHBjM1F1WVdSa0tDZHViMTkxYzJWeVgzTmxiR1ZqZEdsdmJpY3BPMXh5WEc0Z0lDQWdJQ0FnSUcxdmRtVkJkQ2hsZG1WdWRDNXdZV2RsV0NrN1hISmNiaUFnSUNBZ0lIMWNjbHh1SUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0J6WlhSMGFXNW5jeTV1YjJSbFRHbHpkQzV5WlhOcGVtVklZVzVrYkdVdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmJXOTFjMlZrYjNkdUp5d2dablZ1WTNScGIyNG9aWFpsYm5RcElIdGNjbHh1SUNBZ0lDQWdaRzlqZFcxbGJuUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25iVzkxYzJWdGIzWmxKeXdnYjI1TmIzVnpaVTF2ZG1VcE8xeHlYRzRnSUNBZ0lDQjBhR2x6TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxdmRYTmxkWEFuTENCdmJrMXZkWE5sVlhBcE8xeHlYRzVjY2x4dUlDQWdJQ0FnZEdocGN5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGtjbUZuYzNSaGNuUW5MQ0JtZFc1amRHbHZiaWhsZG1WdWRDa2dlMXh5WEc0Z0lDQWdJQ0FnSUdWMlpXNTBMbkJ5WlhabGJuUkVaV1poZFd4ME8xeHlYRzRnSUNBZ0lDQjlLVHRjY2x4dVhISmNiaUFnSUNCOUtWeHlYRzVjY2x4dUlDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbkpsYzJsNlpVaGhibVJzWlM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Nka1lteGpiR2xqYXljc0lHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdJQ0J0YjNabFFYUW9jMlYwZEdsdVozTXVjMmw2WlhNdWVDazdYSEpjYmlBZ0lDQjlLVHRjY2x4dVhISmNiaUFnSUNBdkx5QkpibWwwYVdGc0lGeHlYRzRnSUNBZ2JXOTJaVUYwS0hObGRIUnBibWR6TG5OcGVtVnpMbmdwTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnZEdoaGRDNXBibWwwYVdGc2FYcGxJRDBnYVc1cGRHbGhiR2w2WlR0Y2NseHVYSEpjYmlBZ2NtVjBkWEp1SUhSb1lYUTdYSEpjYm4wcEtDazdJaXdpTHlvcVhISmNiaUFxSUZ4eVhHNGdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdiMlptYzJWMFZHaGxJR2hsYVdkb2RDQnZaaUJpYjNSb0lIUnZjR0poY2lCaGJtUWdaM0p2ZFhBZ1pXeGxiV1Z1ZEZ4eVhHNGdLaTljY2x4dVpYaHdiM0owSUdOdmJuTjBJSE5qY205c2JFaGhibVJzWlhJZ1BTQm1kVzVqZEdsdmJpaHZabVp6WlhRcElIdGNjbHh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRvWlhabGJuUXBJSHRjY2x4dUlDQWdJR1YyWlc1MExuQnlaWFpsYm5SRVpXWmhkV3gwS0NrN1hISmNiaUFnSUNCamIyNXpkQ0JvY21WbUlEMGdkR2hwY3k1blpYUkJkSFJ5YVdKMWRHVW9KMmh5WldZbktUdGNjbHh1SUNBZ0lHTnZibk4wSUc5bVpuTmxkRlJ2Y0NBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWUNSN2FISmxabjFnS1M1dlptWnpaWFJVYjNBN1hISmNiaUFnSUNCelkzSnZiR3dvZTF4eVhHNGdJQ0FnSUNCMGIzQTZJRzltWm5ObGRGUnZjQ0F0SUc5bVpuTmxkQ3hjY2x4dUlDQWdJQ0FnWW1Wb1lYWnBiM0k2SUNkemJXOXZkR2duWEhKY2JpQWdJQ0I5S1Z4eVhHNGdJSDFjY2x4dWZTSXNJbU52Ym5OMElHMWhhMlZKZEdWdGN5QTlJQ2dwSUQwK0lIdGNjbHh1SUNCc1pYUWdhWFJsYlhNZ1BTQW5KenRjY2x4dVhISmNiaUFnWm05eUlDaHNaWFFnYVNBOUlEQTdJR2tnUENBeU1Ec2dhU3NyS1NCN1hISmNiaUFnSUNCcGRHVnRjeUFyUFNCZ1hISmNiaUFnSUNBZ0lEeHNhU0JqYkdGemN6MWNJbWR5YjNWd1gybDBaVzBnWTI5c00xd2lQbHh5WEc0Z0lDQWdJQ0FnSUR4aElHTnNZWE56UFZ3aVozSnZkWEJmYVhSbGJWOXNhVzVyWENJK1hISmNiaUFnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyRnlaRndpUGx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyRnlaRjlwWTI5dUlHeHZZV1JwYm1kY0lqNDhMMlJwZGo1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltTmhjbVJmWW05a2VWd2lQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRHhvTkNCamJHRnpjejFjSW1OaGNtUmZkR2wwYkdVZ2JHOWhaR2x1WjF3aVBqd3ZhRFErWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnUEhBZ1kyeGhjM005WENKallYSmtYM1JsZUhRZ2JHOWhaR2x1WjF3aVBqd3ZjRDVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lDQWdJQ0E4TDJScGRqNWNjbHh1SUNBZ0lDQWdJQ0E4TDJFK1hISmNiaUFnSUNBZ0lEd3ZiR2srWEhKY2JpQWdJQ0JnTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WMGRYSnVJR2wwWlcxek8xeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdZMjl1YzNRZ1oyVjBVMnRsYkdWMGIyNGdQU0FvS1NBOVBpQmdYSEpjYmlBZ1BITmxZM1JwYjI0Z1kyeGhjM005WENKbmNtOTFjRndpSUQ1Y2NseHVJQ0FnSUR4b015QmpiR0Z6Y3oxY0ltZHliM1Z3WDNScGRHeGxJR3h2WVdScGJtZGNJajQ4TDJnelBseHlYRzRnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbWR5YjNWd1gyTnZiblJsYm5SY0lqNWNjbHh1SUNBZ0lDQWdQSFZzSUdOc1lYTnpQVndpY205M0lHZHliM1Z3WDJsMFpXMXpYQ0krWEhKY2JpQWdJQ0FnSUNBZ0pIdHRZV3RsU1hSbGJYTW9LWDFjY2x4dUlDQWdJQ0FnUEM5MWJENWNjbHh1SUNBZ0lEd3ZaR2wyUGx4eVhHNGdJRHd2YzJWamRHbHZiajVjY2x4dVlEdGNjbHh1WEhKY2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCeVpXNWtaWElvYzJWc1pXTjBiM0lzSUhSbGJYQnNZWFJsS1NCN1hISmNiaUFnWTI5dWMzUWdkR0Z5WjJWMElEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loelpXeGxZM1J2Y2lrN1hISmNiaUFnYVdZZ0tDRjBZWEpuWlhRcElISmxkSFZ5Ymp0Y2NseHVJQ0IwWVhKblpYUXVhVzV1WlhKSVZFMU1JRDBnZEdWdGNHeGhkR1VvS1R0Y2NseHVmU0lzSW14bGRDQnphRzkzYkdsa1pVbHVaR1Y0SUQwZ01UdGNjbHh1WEhKY2JtTnZibk4wSUdoaGJtUnNaVUpoYm01bGNpQTlJR1oxYm1OMGFXOXVLR05oYkd4aVlXTnJLU0I3WEhKY2JpQWdZMjl1YzNRZ2MyeHBaR1Z6SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNnbkxuTnNhV1JsY3ljcE8xeHlYRzRnSUdOdmJuTjBJR1J2ZEhNZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDY3VaRzkwSnlrN1hISmNibHh5WEc0Z0lHbG1JQ2doYzJ4cFpHVnpLU0J5WlhSMWNtNDdYSEpjYmlBZ2FXWW9JV1J2ZEhNcElISmxkSFZ5Ymp0Y2NseHVYSEpjYmlBZ1kyOXVjM1FnYkdWdUlEMGdjMnhwWkdWekxteGxibWQwYUR0Y2NseHVJQ0JjY2x4dUlDQmpZV3hzWW1GamF5aHNaVzRwTzF4eVhHNWNjbHh1SUNCbWIzSW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2JHVnVPeUJwS3lzcElIdGNjbHh1SUNBZ0lITnNhV1JsYzF0cFhTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4eVhHNGdJQ0FnWkc5MGMxdHBYUzVqYkdGemMweHBjM1F1Y21WdGIzWmxLQ2RoWTNScGRtVW5LVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSE5zYVdSbGMxdHphRzkzYkdsa1pVbHVaR1Y0SUMwZ01WMHVjM1I1YkdVdVpHbHpjR3hoZVNBOUlDZGliRzlqYXljN1hISmNiaUFnWkc5MGMxdHphRzkzYkdsa1pVbHVaR1Y0SUMwZ01WMHVZMnhoYzNOTWFYTjBMbUZrWkNnbllXTjBhWFpsSnlrN1hISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQnphRzkzVTJ4cFpHVnpLRzRnUFNBeEtTQjdYSEpjYmlBZ2NtVjBkWEp1SUdoaGJtUnNaVUpoYm01bGNpaG1kVzVqZEdsdmJpaHNaVzRwSUh0Y2NseHVJQ0FnSUhOb2IzZHNhV1JsU1c1a1pYZ2dQU0J1SUQ0Z2JHVnVJRDhnTVNBNklHNGdQQ0F4SUQ4Z2JHVnVJRG9nYzJodmQyeHBaR1ZKYm1SbGVEdGNjbHh1SUNCOUtUdGNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR0YxZEc5VGFHOTNVMnhwWkdWektDa2dlMXh5WEc0Z0lHaGhibVJzWlVKaGJtNWxjaWhtZFc1amRHbHZiaWhzWlc0cElIdGNjbHh1SUNBZ0lITm9iM2RzYVdSbFNXNWtaWGdnUFNCemFHOTNiR2xrWlVsdVpHVjRJRDRnYkdWdUlEOGdNU0E2SUhOb2IzZHNhV1JsU1c1a1pYZzdYSEpjYmlBZ2ZTazdYSEpjYmx4eVhHNGdJSE5sZEZScGJXVnZkWFFvWVhWMGIxTm9iM2RUYkdsa1pYTXNJRFF3TURBcE8xeHlYRzRnSUhOb2IzZHNhV1JsU1c1a1pYZ3JLenRjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUhCc2RYTlRiR2xrWlhNb2Jpa2dlMXh5WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlncElIdGNjbHh1SUNBZ0lITm9iM2RUYkdsa1pYTW9jMmh2ZDJ4cFpHVkpibVJsZUNBclBTQnVLVHRjY2x4dUlDQjlYSEpjYm4xY2NseHVYSEpjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJqZFhKeVpXNTBVMnhwWkdVb2Jpa2dlMXh5WEc0Z0lITm9iM2RUYkdsa1pYTW9jMmh2ZDJ4cFpHVkpibVJsZUNBOUlHNHBPMXh5WEc1OUlsMHNJbk52ZFhKalpWSnZiM1FpT2lJaWZRPT0ifQ==
