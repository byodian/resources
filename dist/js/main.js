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

  const scrollTo = function (elems, offset) {
    for (let elem of elems) {
      elem.addEventListener('click', Object(_views_scrollTo__WEBPACK_IMPORTED_MODULE_5__["scrollHandler"])(offset));
    }

    return false;
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
    scrollTo(document.querySelectorAll('.left_menu_item a'), 76);

    // Show or hide the left menu by resizing the size of document.documentElement.clientWidth
    Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleMenu"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes)();

    // Resize the width of left_menu and main_content
    _views_resize__WEBPACK_IMPORTED_MODULE_6__["resize"].initialize({ nodeList: _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"] });

    window.addEventListener('resize', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleMenu"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftControlMenu.addEventListener('click', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleOverlay"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenuOverlay.addEventListener('click', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleOverlay"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));

    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenu.addEventListener('click', function() {
      if (_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].html.clientWidth < 750) {
        Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["hideMenu"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes);
      }
    });
    
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenu.addEventListener('mousedown', function (event) {
      event.preventDefault();
      return false;
    });
  };

  //
  // Inits & Events
  //

  // Render the skeleton screen before getting the resources from server
  Object(_views_skeleton__WEBPACK_IMPORTED_MODULE_2__["render"])(defaults.selectors.sectionsGroup, _views_skeleton__WEBPACK_IMPORTED_MODULE_2__["getSkeleton"]);

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
}

  // Generate a item of the navigation
const getMenuItems = category => `
  <li class="left_menu_item">
    <a href="#${category}"> 
      <img class="menu_item_icon" src="./svg/${category}.svg"></img>
      <span class="menu_item_content">${category}</span>
    </a>
  </li>
`;

  // Generate a section of the main content
const getSections = category => `
  <section id="${category}" class="group" >
    <h3 class="group_title">${category}</h3>
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
        <img class="card_icon" src="${resource.src}">
        <div class="card_body">
          <h4 class="card_title">${resource.title}</h4>
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

/***/ 0:
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/models/Component.js ./src/js/views/DOMElements.js ./src/js/views/handleMenu.js ./src/js/views/resize.js ./src/js/views/scrollTo.js ./src/js/views/skeleton.js ./src/js/services/resources.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\models\Component.js */"./src/js/models/Component.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\DOMElements.js */"./src/js/views/DOMElements.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\handleMenu.js */"./src/js/views/handleMenu.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\resize.js */"./src/js/views/resize.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\scrollTo.js */"./src/js/views/scrollTo.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\skeleton.js */"./src/js/views/skeleton.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\services\resources.js */"./src/js/services/resources.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kZWxzL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvaGFuZGxlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvcmVzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9zY3JvbGxUby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3Mvc2tlbGV0b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjtBQUN2QyxjQUFjLG1CQUFPLENBQUMseUVBQXNCO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXVCO0FBQ25ELG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjtBQUN0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMseUVBQXFCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ2xMYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQVM7QUFDN0IsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjtBQUNuQyxZQUFZLG1CQUFPLENBQUMsNERBQWM7QUFDbEMsa0JBQWtCLG1CQUFPLENBQUMsd0VBQW9CO0FBQzlDLGVBQWUsbUJBQU8sQ0FBQyx3REFBWTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFPLENBQUMsa0VBQWlCO0FBQ3hDLG9CQUFvQixtQkFBTyxDQUFDLDRFQUFzQjtBQUNsRCxpQkFBaUIsbUJBQU8sQ0FBQyxzRUFBbUI7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLG9FQUFrQjs7QUFFekM7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNsQmE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLDJEQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUN4RGE7O0FBRWI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZO0FBQ2hDLGVBQWUsbUJBQU8sQ0FBQyx5RUFBcUI7QUFDNUMseUJBQXlCLG1CQUFPLENBQUMsaUZBQXNCO0FBQ3ZELHNCQUFzQixtQkFBTyxDQUFDLDJFQUFtQjtBQUNqRCxrQkFBa0IsbUJBQU8sQ0FBQyxtRUFBZTs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7OztBQzlGYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNuRGE7O0FBRWIsb0JBQW9CLG1CQUFPLENBQUMsbUZBQTBCO0FBQ3RELGtCQUFrQixtQkFBTyxDQUFDLCtFQUF3Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLHFFQUFnQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsb0JBQW9CLG1CQUFPLENBQUMsdUVBQWlCO0FBQzdDLGVBQWUsbUJBQU8sQ0FBQyx1RUFBb0I7QUFDM0MsZUFBZSxtQkFBTyxDQUFDLHlEQUFhOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7O0FDOUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pDYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVU7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsMkJBQTJCO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0RmE7O0FBRWIsa0JBQWtCLG1CQUFPLENBQUMsbUVBQWU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeEJhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsTUFBTTtBQUNqQixXQUFXLGVBQWU7QUFDMUIsYUFBYSxFQUFFO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25CQSwrQ0FBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQVM7QUFDN0IsMEJBQTBCLG1CQUFPLENBQUMsOEZBQStCOztBQUVqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdEMsR0FBRztBQUNIO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGlFQUFpQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0FDakdhOztBQUViO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1ZhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBDQUEwQztBQUMxQyxTQUFTOztBQUVUO0FBQ0EsNERBQTRELHdCQUF3QjtBQUNwRjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQywrQkFBK0IsYUFBYSxFQUFFO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUNwRGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUNuRWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLG1EQUFVOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsZUFBZTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzFCYTs7QUFFYixXQUFXLG1CQUFPLENBQUMsZ0VBQWdCOztBQUVuQzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNEJBQTRCO0FBQzVCLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5VkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQztBQU1sQjtBQUMwQjtBQUNaO0FBQzhCO0FBQ3hCO0FBQ1Q7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUFBO0FBQU87QUFDUDs7QUFFQSxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLDJCO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUMsSTs7Ozs7Ozs7Ozs7O0FDakVEO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxLQUFLO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vbW9kZWxzL0NvbXBvbmVudCc7XHJcbmltcG9ydCB7XHJcbiAgbm9kZUxpc3QsXHJcbiAgZ2V0U2VjdGlvbnMsXHJcbiAgZ2V0Q2FyZHMsXHJcbiAgZ2V0TWVudUl0ZW1zLFxyXG59IGZyb20gJy4vdmlld3MvRE9NRWxlbWVudHMnO1xyXG5pbXBvcnQgeyBnZXRTa2VsZXRvbiwgcmVuZGVyIH0gZnJvbSAnLi92aWV3cy9za2VsZXRvbic7XHJcbmltcG9ydCBzZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvcmVzb3VyY2VzJztcclxuaW1wb3J0IHsgaGFuZGxlT3ZlcmxheSwgaGFuZGxlTWVudSAsIGhpZGVNZW51fSBmcm9tICcuL3ZpZXdzL2hhbmRsZU1lbnUnO1xyXG5pbXBvcnQgeyBzY3JvbGxIYW5kbGVyIH0gZnJvbSAnLi92aWV3cy9zY3JvbGxUbyc7XHJcbmltcG9ydCB7IHJlc2l6ZSB9IGZyb20gJy4vdmlld3MvcmVzaXplJztcclxuXHJcbmNvbnN0IGFwcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgLy9cclxuICAvLyBWYXJpYWJsZXNcclxuICAvL1xyXG4gIGxldCBzZXR0aW5ncztcclxuICBcclxuICBjb25zdCB0aGF0ID0ge307XHJcbiAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICBzZWxlY3RvcnM6IHtcclxuICAgICAgbWVudUl0ZW1zR3JvdXA6ICcjbGVmdF9tZW51X2l0ZW1zJyxcclxuICAgICAgc2VjdGlvbnNHcm91cDogJyNzZWN0aW9uX2dyb3VwcycsXHJcbiAgICB9LFxyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBlbnRlckRvbmU6ICdsZWZ0X21lbnVfb3ZlcmxheSBsZWZ0X21lbnVfb3ZlcmxheS1lbnRlci1kb25lJyxcclxuICAgICAgZXhpdERvbmU6ICdsZWZ0X21lbnVfb3ZlcmxheSBsZWZ0X21lbnVfb3ZlcmxheS1leGl0LWRvbmUnLFxyXG4gICAgICBsZWZ0TWVudVNob3c6ICdsZWZ0X21lbnVfc2hvdycsXHJcbiAgICAgIGxlZnRNZW51SGlkZGVuOiAnbGVmdF9tZW51X2hpZGRlbidcclxuICAgIH0sXHJcbiAgICByZXNvdXJjZXM6IFtdLFxyXG4gICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICAvL1xyXG4gIC8vIE1ldGhvZHNcclxuICAvL1xyXG4gIFxyXG4gIGNvbnN0IHVuaXF1ZUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgcmV0dXJuIGFyci5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHVuaXF1ZVJlc291cmNlcyA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvdXJjZXMpIHtcclxuICAgICAgcmV0dXJuIHJlc291cmNlcy5maWx0ZXIoXHJcbiAgICAgICAgKHJlc291cmNlKSA9PiByZXNvdXJjZS5jYXRlZ29yeS50cmltKCkgPT09IGNhdGVnb3J5XHJcbiAgICAgICk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNjcm9sbFRvID0gZnVuY3Rpb24gKGVsZW1zLCBvZmZzZXQpIHtcclxuICAgIGZvciAobGV0IGVsZW0gb2YgZWxlbXMpIHtcclxuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbEhhbmRsZXIob2Zmc2V0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciBUaGUgc2VsZWN0b3IgZm9yIHRoZSBjb250ZW50IHBhcmVudCBlbGVtZW50XHJcbiAgICogQHBhcmFtIHtBcnJheX0gcmVzb3VyY2VzIFRoZSBkYXRhIGZvciB0aGUgY29udGVudCBpdGVtc1xyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRlbXBsYXRlIFRoZSBmdW5jdGlvbiByZW5kZXIgVUlcclxuICAgKi9cclxuICBjb25zdCByZW5kZXJDb250ZW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIHJlc291cmNlcywgdGVtcGxhdGUpIHtcclxuICAgIHJldHVybiBuZXcgQ29tcG9uZW50KHNlbGVjdG9yLCB7XHJcbiAgICAgIHJlc291cmNlczogcmVzb3VyY2VzLFxyXG4gICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRlc3RvcnkgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgcGx1Z2luIGhhcyBiZWVuIGluaXRpYWxpemVkXHJcbiAgICBpZiAoIXNldHRpbmdzKSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRoZSB0YWJsZSBvZiBjb250ZW50c1xyXG4gICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnVJdGVtcy5pbm5lckhUTUwgPSAnJztcclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LnNlY3Rpb25zSXRlbXMuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgLy8gUmVzZXQgdmFyaWFibGVzXHJcbiAgICBzZXR0aW5ncyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIC8vIERlc3RvcnkgdGhlIGN1cnJlbnQgaW5pdGlhbGl6YXRpb25cclxuICAgIGRlc3RvcnkoKTtcclxuXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAvLyBNZXJnZSBib3RoIHVzZXIgZGVmYXVsdHMgYW5kIG9wdGlvbnMuXHJcbiAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIGNhdGVnb3JpZXMgb2YgdGhlIHJlc291cmNlc1xyXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IHVuaXF1ZUFycmF5KFxyXG4gICAgICBzZXR0aW5ncy5yZXNvdXJjZXMubWFwKChyZXNvdXJjZSkgPT4gcmVzb3VyY2UuY2F0ZWdvcnkpXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEdldCBhbGwgaXRlbXMgb2YgbGVmdCBtZW51IGl0ZW1zIHRoZW4gYXBwZW5kIGl0IHRvIGRvY3VtZW50XHJcbiAgICByZW5kZXJDb250ZW50KHNldHRpbmdzLnNlbGVjdG9ycy5tZW51SXRlbXNHcm91cCwgY2F0ZWdvcmllcywgZ2V0TWVudUl0ZW1zKS5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIHNlY3Rpb25zIG9mIG1haW4gY29udGVudFxyXG4gICAgcmVuZGVyQ29udGVudChzZXR0aW5ncy5zZWxlY3RvcnMuc2VjdGlvbnNHcm91cCwgY2F0ZWdvcmllcywgZ2V0U2VjdGlvbnMpLnJlbmRlcigpO1xyXG5cclxuICAgIC8vIFJlbmRlciB0aGUgaXRlbXMgaW50byBhIHVuaXF1ZSBzZWN0aW9uIGlkXHJcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gYCMke2NhdGVnb3J5fSAuZ3JvdXBfaXRlbXNgO1xyXG5cclxuICAgICAgLy8gR2V0IHJlc291cmNlcyBvZiB0aGUgc2FtZSBjYXRlZ29yeVxyXG4gICAgICAvLyBGb3IgZXhhbXBsZTogSFRNTOOAgUphdmFzY3JpcHTjgIFUb29sc+OAgXBvZGNhc3RcclxuICAgICAgY29uc3QgcmVzb3VyY2VzID0gdW5pcXVlUmVzb3VyY2VzKGNhdGVnb3J5KShzZXR0aW5ncy5yZXNvdXJjZXMpO1xyXG4gICAgICByZW5kZXJDb250ZW50KHNlbGVjdG9yLCByZXNvdXJjZXMsIGdldENhcmRzKS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNjcm9sbCB0byB0aGUgc3BlY2lmaWVkIGNhdGVnb3J5IGJ5IGNsaWNraW5nIHRoZSBtZW51XHJcbiAgICBzY3JvbGxUbyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGVmdF9tZW51X2l0ZW0gYScpLCA3Nik7XHJcblxyXG4gICAgLy8gU2hvdyBvciBoaWRlIHRoZSBsZWZ0IG1lbnUgYnkgcmVzaXppbmcgdGhlIHNpemUgb2YgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbiAgICBoYW5kbGVNZW51KG5vZGVMaXN0LCBzZXR0aW5ncy5jbGFzc2VzKSgpO1xyXG5cclxuICAgIC8vIFJlc2l6ZSB0aGUgd2lkdGggb2YgbGVmdF9tZW51IGFuZCBtYWluX2NvbnRlbnRcclxuICAgIHJlc2l6ZS5pbml0aWFsaXplKHsgbm9kZUxpc3Q6IG5vZGVMaXN0IH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVNZW51KG5vZGVMaXN0LCBzZXR0aW5ncy5jbGFzc2VzKSk7XHJcbiAgICBub2RlTGlzdC5sZWZ0Q29udHJvbE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdmVybGF5KG5vZGVMaXN0LCBzZXR0aW5ncy5jbGFzc2VzKSk7XHJcbiAgICBub2RlTGlzdC5sZWZ0TWVudU92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdmVybGF5KG5vZGVMaXN0LCBzZXR0aW5ncy5jbGFzc2VzKSk7XHJcblxyXG4gICAgbm9kZUxpc3QubGVmdE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKG5vZGVMaXN0Lmh0bWwuY2xpZW50V2lkdGggPCA3NTApIHtcclxuICAgICAgICBoaWRlTWVudShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3Nlcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBub2RlTGlzdC5sZWZ0TWVudS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy9cclxuICAvLyBJbml0cyAmIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIC8vIFJlbmRlciB0aGUgc2tlbGV0b24gc2NyZWVuIGJlZm9yZSBnZXR0aW5nIHRoZSByZXNvdXJjZXMgZnJvbSBzZXJ2ZXJcclxuICByZW5kZXIoZGVmYXVsdHMuc2VsZWN0b3JzLnNlY3Rpb25zR3JvdXAsIGdldFNrZWxldG9uKTtcclxuXHJcbiAgLy8gR2V0IHJlc291cmNlcyBmcm9tIHRoZSBzZXJ2aWNlIHNpZGVcclxuICBzZXJ2aWNlLmdldEFsbCgpLnRoZW4oKHJlc291cmNlcykgPT4ge1xyXG4gICAgaW5pdChyZXNvdXJjZXMpO1xyXG4gIH0pO1xyXG5cclxuICB0aGF0LmluaXQgPSBpbml0O1xyXG4gIHRoYXQuZGVzdG9yeSA9IGRlc3Rvcnk7XHJcbiAgXHJcbiAgcmV0dXJuIHRoYXQ7XHJcbn0pKCk7XHJcbiIsIkZ1bmN0aW9uLnByb3RvdHlwZS5tZXRob2QgPSBmdW5jdGlvbihuYW1lLCBmdW5jKSB7XHJcbiAgaWYgKHRoaXMucHJvdG90eXBlW25hbWVdKSByZXR1cm47XHJcbiAgdGhpcy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ29tcG9uZW50ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgdGFibGUgb2YgY29udGVudHMgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVXNlciBvcHRpb25zIFxyXG4gICAqL1xyXG4gIHZhciBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnJlc291cmNlcyA9IG9wdGlvbnMucmVzb3VyY2VzO1xyXG4gICAgdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBDb25zdHJ1Y3Rvci5tZXRob2QoJ3JlbmRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcclxuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XHJcbiAgICB0YXJnZXQuaW5uZXJIVE1MID0gdGhpcy5oYW5kbGVUZW1wbGF0ZSh0aGlzLnJlc291cmNlcyk7XHJcbiAgfSlcclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdoYW5kbGVUZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5yZXNvdXJjZXNcclxuICAgICAgLm1hcChyZXNvdXJjZSA9PiB0aGlzLnRlbXBsYXRlKHJlc291cmNlKSlcclxuICAgICAgLmpvaW4oJycpXHJcbiAgfSlcclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdzZXREYXRhJywgZnVuY3Rpb24ob2JqKSB7XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydGllcyhrZXkpKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSBvYmpba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfSlcclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdnZXREYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LnBhcnNlKE9iamVjdC5zdHJpbmdpZnkodGhpcy5yZXNvdXJjZXMpKTtcclxuICB9KVxyXG5cclxuICByZXR1cm4gQ29uc3RydWN0b3I7XHJcbn0pKCk7IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuY29uc3QgYmFzZVVybCA9ICcvLm5ldGxpZnkvZnVuY3Rpb25zL2FwaS9yZXNvdXJjZXMnO1xyXG5cclxuY29uc3QgZ2V0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLmdldChiYXNlVXJsKTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGUgPSBmdW5jdGlvbihuZXdPYmplY3QpIHtcclxuICBjb25zdCByZXF1ZXN0ID0gYXhpb3MucG9zdChiYXNlVXJsLCBuZXdPYmplY3QpO1xyXG4gIHJldHVybiByZXF1ZXN0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuZGF0YSk7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKGlkLCBuZXdPYmplY3QpIHtcclxuICBjb25zdCByZXF1ZXN0ID0gYXhpb3MucHV0KGAke2Jhc2VVcmx9LyR7aWR9YCwgbmV3T2JqZWN0KTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGdldEFsbCwgY3JlYXRlLCB1cGRhdGUgfTtcclxuIiwiZXhwb3J0IGNvbnN0IG5vZGVMaXN0ID0ge1xyXG4gIGxlZnRDb250cm9sTWVudTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfY29udHJvbF9tZW51JyksXHJcbiAgbGVmdE1lbnVPdmVybGF5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdF9tZW51X292ZXJsYXknKSxcclxuICBzZWN0aW9uSXRlbXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWN0aW9uX2dyb3VwcycpLFxyXG4gIGxlZnRNZW51SXRlbXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsZWZ0X21lbnVfaXRlbXMnKSxcclxuICBodG1sOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXHJcbiAgYm9keTogZG9jdW1lbnQuYm9keSxcclxuICBsZWZ0TWVudTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfbWVudScpLFxyXG4gIHJlc2l6ZUhhbmRsZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2l6ZV9oYW5kbGUnKSxcclxuICBtYWluQ29udGVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fY29udGVudCcpLFxyXG59XHJcblxyXG4gIC8vIEdlbmVyYXRlIGEgaXRlbSBvZiB0aGUgbmF2aWdhdGlvblxyXG5leHBvcnQgY29uc3QgZ2V0TWVudUl0ZW1zID0gY2F0ZWdvcnkgPT4gYFxyXG4gIDxsaSBjbGFzcz1cImxlZnRfbWVudV9pdGVtXCI+XHJcbiAgICA8YSBocmVmPVwiIyR7Y2F0ZWdvcnl9XCI+IFxyXG4gICAgICA8aW1nIGNsYXNzPVwibWVudV9pdGVtX2ljb25cIiBzcmM9XCIuL3N2Zy8ke2NhdGVnb3J5fS5zdmdcIj48L2ltZz5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW51X2l0ZW1fY29udGVudFwiPiR7Y2F0ZWdvcnl9PC9zcGFuPlxyXG4gICAgPC9hPlxyXG4gIDwvbGk+XHJcbmA7XHJcblxyXG4gIC8vIEdlbmVyYXRlIGEgc2VjdGlvbiBvZiB0aGUgbWFpbiBjb250ZW50XHJcbmV4cG9ydCBjb25zdCBnZXRTZWN0aW9ucyA9IGNhdGVnb3J5ID0+IGBcclxuICA8c2VjdGlvbiBpZD1cIiR7Y2F0ZWdvcnl9XCIgY2xhc3M9XCJncm91cFwiID5cclxuICAgIDxoMyBjbGFzcz1cImdyb3VwX3RpdGxlXCI+JHtjYXRlZ29yeX08L2gzPlxyXG4gICAgPGRpdiBjbGFzcz1cImdyb3VwX2NvbnRlbnRcIj5cclxuICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+PC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj4gIFxyXG5gO1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhIGxpc3Qgb2YgdGhlIHNlY3Rpb24gXHJcbmV4cG9ydCBjb25zdCBnZXRDYXJkcyA9IHJlc291cmNlID0+IGBcclxuICA8bGkgY2xhc3M9XCJncm91cF9pdGVtIGNvbDNcIj5cclxuICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCIgaHJlZj1cIiR7cmVzb3VyY2UuaHJlZn1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZF9pY29uXCIgc3JjPVwiJHtyZXNvdXJjZS5zcmN9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfYm9keVwiPlxyXG4gICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF90aXRsZVwiPiR7cmVzb3VyY2UudGl0bGV9PC9oND5cclxuICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF90ZXh0XCI+JHtyZXNvdXJjZS5jb250ZW50fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2E+XHJcbiAgPC9saT5cclxuYDsiLCIvLyBSZXByZXNlbnQgdGhlIGxlZnQgbWVudSBvcGVuaW5nIG9yIGNsb3NpbmdcclxuLy8gVHJ1ZSBtZWFucyBpdCdzIG9wZW5pbmdcclxubGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU1lbnUobm9kZWxpc3QsIGNsYXNzZXMpIHtcclxuICBub2RlbGlzdC5odG1sLmNsYXNzTmFtZSA9IGNsYXNzZXMubGVmdE1lbnVIaWRkZW47XHJcbiAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZXhpdERvbmU7XHJcbiAgaXNBY3RpdmUgPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlT3ZlcmxheSAobm9kZWxpc3QsIGNsYXNzZXMpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudVNob3c7XHJcbiAgICAgIG5vZGVsaXN0LmxlZnRNZW51T3ZlcmxheS5jbGFzc05hbWUgPSBjbGFzc2VzLmVudGVyRG9uZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudUhpZGRlbjtcclxuICAgICAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZXhpdERvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBY3RpdmUgPSAhaXNBY3RpdmU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWVudShub2RlbGlzdCwgY2xhc3Nlcykge1xyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIGlmIChub2RlbGlzdC5odG1sLmNsaWVudFdpZHRoIDwgNzUwKSB7XHJcbiAgICAgIGhpZGVNZW51KG5vZGVsaXN0LCBjbGFzc2VzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudVNob3c7XHJcbiAgICAgIG5vZGVsaXN0LmxlZnRNZW51T3ZlcmxheS5jbGFzc05hbWUgPSBjbGFzc2VzLmVudGVyRG9uZTtcclxuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IHJlc2l6ZSA9IChmdW5jdGlvbigpIHtcclxuICBsZXQgc2V0dGluZ3M7XHJcblxyXG4gIGNvbnN0IHRoYXQgPSB7fTsgXHJcbiAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICBzaXplczoge1xyXG4gICAgICBtYXhXaWR0aDogNDI1LFxyXG4gICAgICBtaW5XaWR0aDogMjAwLFxyXG4gICAgICB4OiAyNTBcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICAvLyBJbml0cyBhbmQgRXZlbnRzXHJcbiAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9IFxyXG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgY29uc3QgbW92ZUF0ID0gZnVuY3Rpb24oeCkge1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5sZWZ0TWVudS5zdHlsZS53aWR0aCA9IHggKyAncHgnO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5yZXNpemVIYW5kbGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5tYWluQ29udGVudC5zdHlsZS5tYXJnaW5MZWZ0ID0geCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gZnVuY3Rpb24gZnVuYygpIHtcclxuICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0Lm1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb25fbm9uZScpO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vX3VzZXJfc2VsZWN0aW9uJyk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCBsZWZ0TWVudVdpZHRoID0gcGFyc2VJbnQoc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuc3R5bGUud2lkdGgsIDEwKTtcclxuICAgICAgaWYgKGxlZnRNZW51V2lkdGggPiBzZXR0aW5ncy5zaXplcy5tYXhXaWR0aCB8fCBsZWZ0TWVudVdpZHRoIDwgc2V0dGluZ3Muc2l6ZXMubWluV2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGVmdE1lbnVXaWR0aCA8PSBzZXR0aW5ncy5zaXplcy5tYXhXaWR0aCAmJiBsZWZ0TWVudVdpZHRoID49IHNldHRpbmdzLnNpemVzLm1pbldpZHRoKSB7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QuYm9keS5jbGFzc0xpc3QuYWRkKCdub191c2VyX3NlbGVjdGlvbicpO1xyXG4gICAgICAgIG1vdmVBdChldmVudC5wYWdlWCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXR0aW5ncy5ub2RlTGlzdC5yZXNpemVIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cclxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LnJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBtb3ZlQXQoc2V0dGluZ3Muc2l6ZXMueCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJbml0aWFsIFxyXG4gICAgbW92ZUF0KHNldHRpbmdzLnNpemVzLngpO1xyXG4gIH1cclxuXHJcbiAgdGhhdC5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcclxuXHJcbiAgcmV0dXJuIHRoYXQ7XHJcbn0pKCk7IiwiZXhwb3J0IGNvbnN0IHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGNvbnN0IG9mZnNldFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7aHJlZn1gKS5vZmZzZXRUb3A7XHJcbiAgICBzY3JvbGwoe1xyXG4gICAgICB0b3A6IG9mZnNldFRvcCAtIG9mZnNldCxcclxuICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImNvbnN0IG1ha2VJdGVtcyA9ICgpID0+IHtcclxuICBsZXQgaXRlbXMgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICBpdGVtcyArPSBgXHJcbiAgICAgIDxsaSBjbGFzcz1cImdyb3VwX2l0ZW0gY29sM1wiPlxyXG4gICAgICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9pY29uIGxvYWRpbmdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfYm9keVwiPlxyXG4gICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmRfdGl0bGUgbG9hZGluZ1wiPjwvaDQ+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHQgbG9hZGluZ1wiPjwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGl0ZW1zO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2tlbGV0b24gPSAoKSA9PiBgXHJcbiAgPHNlY3Rpb24gY2xhc3M9XCJncm91cFwiID5cclxuICAgIDxoMyBjbGFzcz1cImdyb3VwX3RpdGxlIGxvYWRpbmdcIj48L2gzPlxyXG4gICAgPGRpdiBjbGFzcz1cImdyb3VwX2NvbnRlbnRcIj5cclxuICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+XHJcbiAgICAgICAgJHttYWtlSXRlbXMoKX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuYDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoc2VsZWN0b3IsIHRlbXBsYXRlKSB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICB0YXJnZXQuaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcclxufSJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMmx1WkdWNExtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVdSaGNIUmxjbk12ZUdoeUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVhocGIzTXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5allXNWpaV3d2UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyRnVZMlZzTDBOaGJtTmxiRlJ2YTJWdUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTJGdVkyVnNMMmx6UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlCZUdsdmN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJOdmNtVXZTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlpZFdsc1pFWjFiR3hRWVhSb0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOWpjbVZoZEdWRmNuSnZjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyTnZjbVV2WkdsemNHRjBZMmhTWlhGMVpYTjBMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlsYm1oaGJtTmxSWEp5YjNJdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlqYjNKbEwyMWxjbWRsUTI5dVptbG5MbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzl6WlhSMGJHVXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5amIzSmxMM1J5WVc1elptOXliVVJoZEdFdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlrWldaaGRXeDBjeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlltbHVaQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlluVnBiR1JWVWt3dWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMMk52YldKcGJtVlZVa3h6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZhR1ZzY0dWeWN5OWpiMjlyYVdWekxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzBGaWMyOXNkWFJsVlZKTUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzFWU1RGTmhiV1ZQY21sbmFXNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5b1pXeHdaWEp6TDI1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMM0JoY25ObFNHVmhaR1Z5Y3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMmhsYkhCbGNuTXZjM0J5WldGa0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2ZFhScGJITXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDNCeWIyTmxjM012WW5KdmQzTmxjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZiV0ZwYmk1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12Ylc5a1pXeHpMME52YlhCdmJtVnVkQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZjMlZ5ZG1salpYTXZjbVZ6YjNWeVkyVnpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OTJhV1YzY3k5RVQwMUZiR1Z0Wlc1MGN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmRtbGxkM012YUdGdVpHeGxUV1Z1ZFM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12ZG1sbGQzTXZjbVZ6YVhwbExtcHpJaXdpZDJWaWNHRmphem92THk4dUwzTnlZeTlxY3k5MmFXVjNjeTl6WTNKdmJHeFVieTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZkbWxsZDNNdmMydGxiR1YwYjI0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQkxHbENRVUZwUWl4dFFrRkJUeXhEUVVGRExITkVRVUZoTEVVN096czdPenM3T3pzN096dEJRMEY2UWpzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN1FVRkRhRU1zWVVGQllTeHRRa0ZCVHl4RFFVRkRMR2xGUVVGclFqdEJRVU4yUXl4alFVRmpMRzFDUVVGUExFTkJRVU1zZVVWQlFYTkNPMEZCUXpWRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl3eVJVRkJkVUk3UVVGRE9VTXNiMEpCUVc5Q0xHMUNRVUZQTEVOQlFVTXNOa1ZCUVhWQ08wRkJRMjVFTEcxQ1FVRnRRaXh0UWtGQlR5eERRVUZETEcxR1FVRXlRanRCUVVOMFJDeHpRa0ZCYzBJc2JVSkJRVThzUTBGQlF5eDVSa0ZCT0VJN1FVRkROVVFzYTBKQlFXdENMRzFDUVVGUExFTkJRVU1zZVVWQlFYRkNPenRCUVVVdlF6dEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxEUkRRVUUwUXp0QlFVTTFRenM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdPenM3T3pzN096czdPenRCUTJ4TVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zYTBSQlFWTTdRVUZETjBJc1YwRkJWeXh0UWtGQlR5eERRVUZETEdkRlFVRm5RanRCUVVOdVF5eFpRVUZaTEcxQ1FVRlBMRU5CUVVNc05FUkJRV003UVVGRGJFTXNhMEpCUVd0Q0xHMUNRVUZQTEVOQlFVTXNkMFZCUVc5Q08wRkJRemxETEdWQlFXVXNiVUpCUVU4c1EwRkJReXgzUkVGQldUczdRVUZGYmtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmxCUVZrc1RVRkJUVHRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hsUVVGbExHMUNRVUZQTEVOQlFVTXNhMFZCUVdsQ08wRkJRM2hETEc5Q1FVRnZRaXh0UWtGQlR5eERRVUZETERSRlFVRnpRanRCUVVOc1JDeHBRa0ZCYVVJc2JVSkJRVThzUTBGQlF5eHpSVUZCYlVJN08wRkJSVFZETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1pVRkJaU3h0UWtGQlR5eERRVUZETEc5RlFVRnJRanM3UVVGRmVrTTdPMEZCUlVFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzQkVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1VVRkJVVHRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN096czdPenM3T3pzN096czdRVU5zUW1FN08wRkJSV0lzWVVGQllTeHRRa0ZCVHl4RFFVRkRMREpFUVVGVk96dEJRVVV2UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN096czdPenM3T3pzN096czdRVU40UkdFN08wRkJSV0k3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRTbUU3TzBGQlJXSXNXVUZCV1N4dFFrRkJUeXhEUVVGRExIRkVRVUZaTzBGQlEyaERMR1ZCUVdVc2JVSkJRVThzUTBGQlF5eDVSVUZCY1VJN1FVRkROVU1zZVVKQlFYbENMRzFDUVVGUExFTkJRVU1zYVVaQlFYTkNPMEZCUTNaRUxITkNRVUZ6UWl4dFFrRkJUeXhEUVVGRExESkZRVUZ0UWp0QlFVTnFSQ3hyUWtGQmEwSXNiVUpCUVU4c1EwRkJReXh0UlVGQlpUczdRVUZGZWtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1owUkJRV2RFTzBGQlEyaEVPMEZCUTBFN1FVRkRRU3g1UWtGQmVVSTdRVUZEZWtJc1MwRkJTenRCUVVOTU8wRkJRMEVzUTBGQlF6czdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRU3huUkVGQlowUTdRVUZEYUVRN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRXNRMEZCUXpzN1FVRkZSRHM3T3pzN096czdPenM3T3p0QlF6bEdZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVms3TzBGQlJXaERPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFRRVUZUTzBGQlEzQkNPMEZCUTBFc1dVRkJXU3hQUVVGUE8wRkJRMjVDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN096czdPenM3T3pzN096czdRVU51UkdFN08wRkJSV0lzYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zYlVaQlFUQkNPMEZCUTNSRUxHdENRVUZyUWl4dFFrRkJUeXhEUVVGRExDdEZRVUYzUWpzN1FVRkZiRVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEYmtKaE96dEJRVVZpTEcxQ1FVRnRRaXh0UWtGQlR5eERRVUZETEhGRlFVRm5RanM3UVVGRk0wTTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTFCUVUwN1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMnBDWVRzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN1FVRkRhRU1zYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zZFVWQlFXbENPMEZCUXpkRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl4MVJVRkJiMEk3UVVGRE0wTXNaVUZCWlN4dFFrRkJUeXhEUVVGRExIbEVRVUZoT3p0QlFVVndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN3clFrRkJLMEk3UVVGREwwSXNkVU5CUVhWRE8wRkJRM1pETzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnp0QlFVTklPenM3T3pzN096czdPenM3TzBGRE9VVmhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUVUZCVFR0QlFVTnFRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeE5RVUZOTzBGQlEyNUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTNwRFlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zYlVSQlFWVTdPMEZCUlRsQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTlCUVU4N1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3c01rSkJRVEpDTzBGQlF6TkNMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU96dEJRVVZCTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOMFJtRTdPMEZCUldJc2EwSkJRV3RDTEcxQ1FVRlBMRU5CUVVNc2JVVkJRV1U3TzBGQlJYcERPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWl4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRlRUpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4alFVRmpPMEZCUTNwQ0xGZEJRVmNzVFVGQlRUdEJRVU5xUWl4WFFVRlhMR1ZCUVdVN1FVRkRNVUlzWVVGQllTeEZRVUZGTzBGQlEyWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVRzN096czdPenM3T3pzN096dEJRMjVDUVN3clEwRkJZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2EwUkJRVk03UVVGRE4wSXNNRUpCUVRCQ0xHMUNRVUZQTEVOQlFVTXNPRVpCUVN0Q096dEJRVVZxUlR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNiVUpCUVU4c1EwRkJReXhuUlVGQlowSTdRVUZEZEVNc1IwRkJSenRCUVVOSU8wRkJRMEVzWTBGQll5eHRRa0ZCVHl4RFFVRkRMR2xGUVVGcFFqdEJRVU4yUXp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEhkRlFVRjNSVHRCUVVONFJUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVJFRkJkVVE3UVVGRGRrUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUeXhaUVVGWk8wRkJRMjVDTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEVOQlFVTTdPMEZCUlVRN1FVRkRRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdPenM3T3pzN096czdPenM3TzBGRGFrZGhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxQ1FVRnRRaXhwUWtGQmFVSTdRVUZEY0VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTFaaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXh4UkVGQldUczdRVUZGYUVNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVN4SFFVRkhPMEZCUTBnN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBc1MwRkJTenM3UVVGRlREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEY2tWaE96dEJRVVZpTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEySmhPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHM3UVVGRmFFTTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQkxEQkRRVUV3UXp0QlFVTXhReXhUUVVGVE96dEJRVVZVTzBGQlEwRXNORVJCUVRSRUxIZENRVUYzUWp0QlFVTndSanRCUVVOQkxGTkJRVk03TzBGQlJWUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJMR3REUVVGclF6dEJRVU5zUXl3clFrRkJLMElzWVVGQllTeEZRVUZGTzBGQlF6bERPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3T3pzN096czdPenM3T3pzN1FVTndSR0U3TzBGQlJXSTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMkpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1kwRkJZeXhQUVVGUE8wRkJRM0pDTEdkQ1FVRm5RanRCUVVOb1FqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNUMEZCVHp0QlFVTnlRaXhuUWtGQlowSXNVVUZCVVR0QlFVTjRRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N096czdPenM3T3pzN096czdRVU51UldFN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMRzFFUVVGVk96dEJRVVU1UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPenM3T3pzN096czdPenM3UVVOWVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdPMEZCUldoRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFTeHBRa0ZCYVVJc1pVRkJaVHM3UVVGRmFFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzQkVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc0swSkJRU3RDTzBGQlF5OUNPMEZCUTBFN1FVRkRRU3hYUVVGWExGTkJRVk03UVVGRGNFSXNZVUZCWVR0QlFVTmlPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUXpGQ1lUczdRVUZGWWl4WFFVRlhMRzFDUVVGUExFTkJRVU1zWjBWQlFXZENPenRCUVVWdVF6czdRVUZGUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGbEJRVmtzVVVGQlVUdEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhoUVVGaE8wRkJRM2hDTEZkQlFWY3NVMEZCVXp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2JVTkJRVzFETEU5QlFVODdRVUZETVVNN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNkVUpCUVhWQ0xGTkJRVk1zUjBGQlJ5eFRRVUZUTzBGQlF6VkRMREpDUVVFeVFqdEJRVU16UWp0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3c05FSkJRVFJDTzBGQlF6VkNMRXRCUVVzN1FVRkRURHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFc2RVTkJRWFZETEU5QlFVODdRVUZET1VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNXVUZCV1N4UFFVRlBPMEZCUTI1Q08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WlFVRlpMRTlCUVU4N1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3UVVNNVZrRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZOQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFTeERRVUZETzBGQlEwUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CTzBGQlEwRXNVMEZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN08wRkJTVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIVkNRVUYxUWl4elFrRkJjMEk3UVVGRE4wTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h4UWtGQmNVSTdRVUZEY2tJN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMSEZEUVVGeFF6czdRVUZGY2tNN1FVRkRRVHRCUVVOQk96dEJRVVZCTERKQ1FVRXlRanRCUVVNelFqdEJRVU5CTzBGQlEwRTdRVUZEUVN3MFFrRkJORUlzVlVGQlZUczdPenM3T3pzN096czdPenRCUTNaTWRFTTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUVyUXp0QlFVMXNRanRCUVVNd1FqdEJRVU5hTzBGQlF6aENPMEZCUTNoQ08wRkJRMVE3TzBGQlJYaERPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVERzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeHhRMEZCY1VNc2NVVkJRV0U3UVVGRGJFUTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNZVUZCWVN4UFFVRlBPMEZCUTNCQ0xHRkJRV0VzVFVGQlRUdEJRVU51UWl4aFFVRmhMRk5CUVZNN1FVRkRkRUk3UVVGRFFUdEJRVU5CTEdWQlFXVXNNa1JCUVZNN1FVRkRlRUk3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVERzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVN3clFrRkJLMEk3TzBGQlJTOUNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNhVVZCUVdsRkxDdEVRVUZaT3p0QlFVVTNSVHRCUVVOQkxHZEZRVUZuUlN3NFJFRkJWenM3UVVGRk0wVTdRVUZEUVR0QlFVTkJMREpDUVVFeVFpeFRRVUZUT3p0QlFVVndRenRCUVVOQk8wRkJRMEU3UVVGRFFTeDVRMEZCZVVNc01rUkJRVkU3UVVGRGFrUXNTMEZCU3pzN1FVRkZURHRCUVVOQk96dEJRVVZCTzBGQlEwRXNTVUZCU1N4dlJVRkJWU3hEUVVGRExESkVRVUZST3p0QlFVVjJRanRCUVVOQkxFbEJRVWtzYjBSQlFVMHNZVUZCWVN4WFFVRlhMREpFUVVGUkxFVkJRVVU3TzBGQlJUVkRMSE5EUVVGelF5eHZSVUZCVlN4RFFVRkRMREpFUVVGUk8wRkJRM3BFTEVsQlFVa3NNa1JCUVZFc01rTkJRVEpETEhWRlFVRmhMRU5CUVVNc01rUkJRVkU3UVVGRE4wVXNTVUZCU1N3eVJFRkJVU3d5UTBGQk1rTXNkVVZCUVdFc1EwRkJReXd5UkVGQlVUczdRVUZGTjBVc1NVRkJTU3d5UkVGQlVUdEJRVU5hTEZWQlFWVXNNa1JCUVZFN1FVRkRiRUlzVVVGQlVTeHJSVUZCVVN4RFFVRkRMREpFUVVGUk8wRkJRM3BDTzBGQlEwRXNTMEZCU3pzN1FVRkZUQ3hKUVVGSkxESkVRVUZSTzBGQlExbzdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hGUVVGRkxEaEVRVUZOTEcxRFFVRnRReXd5UkVGQlZ6czdRVUZGZEVRN1FVRkRRU3hGUVVGRkxESkVRVUZQTzBGQlExUTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RFFVRkRPenM3T3pzN096czdPenM3TzBGRE4wcEVPMEZCUVVFN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVlBPenRCUVVWUU8wRkJRMEU3UVVGRFFTeGhRVUZoTEU5QlFVODdRVUZEY0VJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVN4RFFVRkRMRWs3T3pzN096czdPenM3T3p0QlEyaEVSRHRCUVVGQk8wRkJRVUU3UVVGQk1FSTdRVUZETVVJN08wRkJSVUU3UVVGRFFTeHJRa0ZCYTBJc05FTkJRVXM3UVVGRGRrSTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxHdENRVUZyUWl3MFEwRkJTenRCUVVOMlFqdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2EwSkJRV3RDTERSRFFVRkxMRkZCUVZFc1VVRkJVU3hIUVVGSExFZEJRVWM3UVVGRE4wTTdRVUZEUVRzN1FVRkZaU3huUlVGQlF5eDVRa0ZCZVVJc1JVRkJRenM3T3pzN096czdPenM3T3p0QlEyeENNVU03UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFR6dEJRVU5RTzBGQlEwRXNaMEpCUVdkQ0xGTkJRVk03UVVGRGVrSXNLME5CUVN0RExGTkJRVk03UVVGRGVFUXNkME5CUVhkRExGTkJRVk03UVVGRGFrUTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMDg3UVVGRFVDeHBRa0ZCYVVJc1UwRkJVenRCUVVNeFFpdzRRa0ZCT0VJc1UwRkJVenRCUVVOMlF6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMDg3UVVGRFVEdEJRVU5CTEhWRFFVRjFReXhqUVVGak8wRkJRM0pFTzBGQlEwRXNjME5CUVhORExHRkJRV0U3UVVGRGJrUTdRVUZEUVN4dFEwRkJiVU1zWlVGQlpUdEJRVU5zUkN4cFEwRkJhVU1zYVVKQlFXbENPMEZCUTJ4RU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSVHM3T3pzN096czdPenM3TzBGRE4wTkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGRFFUdEJRVU5CT3p0QlFVVlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMnhEUVR0QlFVRkJPMEZCUVU4N1FVRkRVRHM3UVVGRlFTeHJRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N08wRkJSVUU3UVVGRFFUdEJRVU5CTERKQ08wRkJRMEVzSzBKQlFTdENPenRCUVVVdlFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVQ3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQkxFTkJRVU1zU1RzN096czdPenM3T3pzN08wRkRha1ZFTzBGQlFVRTdRVUZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQkxHZEVRVUZuUkN4TFFVRkxPMEZCUTNKRU8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJMRU03T3pzN096czdPenM3T3p0QlExWkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRMEU3TzBGQlJVRXNhVUpCUVdsQ0xGRkJRVkU3UVVGRGVrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFZRVUZWTzBGQlExWTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVN4RElpd2labWxzWlNJNklqSTNaVFk1TldKbE1tUmlNVFkxWWpWa09XWXlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwSUh0Y2JpQmNkRngwWEhSeVpYUjFjbTRnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1Wlhod2IzSjBjenRjYmlCY2RGeDBmVnh1SUZ4MFhIUXZMeUJEY21WaGRHVWdZU0J1WlhjZ2JXOWtkV3hsSUNoaGJtUWdjSFYwSUdsMElHbHVkRzhnZEdobElHTmhZMmhsS1Z4dUlGeDBYSFIyWVhJZ2JXOWtkV3hsSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwZ1BTQjdYRzRnWEhSY2RGeDBhVG9nYlc5a2RXeGxTV1FzWEc0Z1hIUmNkRngwYkRvZ1ptRnNjMlVzWEc0Z1hIUmNkRngwWlhod2IzSjBjem9nZTMxY2JpQmNkRngwZlR0Y2JseHVJRngwWEhRdkx5QkZlR1ZqZFhSbElIUm9aU0J0YjJSMWJHVWdablZ1WTNScGIyNWNiaUJjZEZ4MGJXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwdVkyRnNiQ2h0YjJSMWJHVXVaWGh3YjNKMGN5d2diVzlrZFd4bExDQnRiMlIxYkdVdVpYaHdiM0owY3l3Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5azdYRzVjYmlCY2RGeDBMeThnUm14aFp5QjBhR1VnYlc5a2RXeGxJR0Z6SUd4dllXUmxaRnh1SUZ4MFhIUnRiMlIxYkdVdWJDQTlJSFJ5ZFdVN1hHNWNiaUJjZEZ4MEx5OGdVbVYwZFhKdUlIUm9aU0JsZUhCdmNuUnpJRzltSUhSb1pTQnRiMlIxYkdWY2JpQmNkRngwY21WMGRYSnVJRzF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVJRngwZlZ4dVhHNWNiaUJjZEM4dklHVjRjRzl6WlNCMGFHVWdiVzlrZFd4bGN5QnZZbXBsWTNRZ0tGOWZkMlZpY0dGamExOXRiMlIxYkdWelgxOHBYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtMGdQU0J0YjJSMWJHVnpPMXh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1aklEMGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaR1ZtYVc1bElHZGxkSFJsY2lCbWRXNWpkR2x2YmlCbWIzSWdhR0Z5Ylc5dWVTQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1RZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SekxDQnVZVzFsTENCblpYUjBaWElwSUh0Y2JpQmNkRngwYVdZb0lWOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieWhsZUhCdmNuUnpMQ0J1WVcxbEtTa2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCdVlXMWxMQ0I3SUdWdWRXMWxjbUZpYkdVNklIUnlkV1VzSUdkbGREb2daMlYwZEdWeUlIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1gxOWxjMDF2WkhWc1pTQnZiaUJsZUhCdmNuUnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuSWdQU0JtZFc1amRHbHZiaWhsZUhCdmNuUnpLU0I3WEc0Z1hIUmNkR2xtS0hSNWNHVnZaaUJUZVcxaWIyd2dJVDA5SUNkMWJtUmxabWx1WldRbklDWW1JRk41YldKdmJDNTBiMU4wY21sdVoxUmhaeWtnZTF4dUlGeDBYSFJjZEU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTaGxlSEJ2Y25SekxDQlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY3NJSHNnZG1Gc2RXVTZJQ2ROYjJSMWJHVW5JSDBwTzF4dUlGeDBYSFI5WEc0Z1hIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENBblgxOWxjMDF2WkhWc1pTY3NJSHNnZG1Gc2RXVTZJSFJ5ZFdVZ2ZTazdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QmpjbVZoZEdVZ1lTQm1ZV3RsSUc1aGJXVnpjR0ZqWlNCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQXhPaUIyWVd4MVpTQnBjeUJoSUcxdlpIVnNaU0JwWkN3Z2NtVnhkV2x5WlNCcGRGeHVJRngwTHk4Z2JXOWtaU0FtSURJNklHMWxjbWRsSUdGc2JDQndjbTl3WlhKMGFXVnpJRzltSUhaaGJIVmxJR2x1ZEc4Z2RHaGxJRzV6WEc0Z1hIUXZMeUJ0YjJSbElDWWdORG9nY21WMGRYSnVJSFpoYkhWbElIZG9aVzRnWVd4eVpXRmtlU0J1Y3lCdlltcGxZM1JjYmlCY2RDOHZJRzF2WkdVZ0ppQTRmREU2SUdKbGFHRjJaU0JzYVd0bElISmxjWFZwY21WY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1ZENBOUlHWjFibU4wYVc5dUtIWmhiSFZsTENCdGIyUmxLU0I3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUF4S1NCMllXeDFaU0E5SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2RtRnNkV1VwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnT0NrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUnBaaWdvYlc5a1pTQW1JRFFwSUNZbUlIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkbUZzZFdVZ0ppWWdkbUZzZFdVdVgxOWxjMDF2WkhWc1pTa2djbVYwZFhKdUlIWmhiSFZsTzF4dUlGeDBYSFIyWVhJZ2JuTWdQU0JQWW1wbFkzUXVZM0psWVhSbEtHNTFiR3dwTzF4dUlGeDBYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5Jb2JuTXBPMXh1SUZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvYm5Nc0lDZGtaV1poZFd4MEp5d2dleUJsYm5WdFpYSmhZbXhsT2lCMGNuVmxMQ0IyWVd4MVpUb2dkbUZzZFdVZ2ZTazdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXlJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQWhQU0FuYzNSeWFXNW5KeWtnWm05eUtIWmhjaUJyWlhrZ2FXNGdkbUZzZFdVcElGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2h1Y3l3Z2EyVjVMQ0JtZFc1amRHbHZiaWhyWlhrcElIc2djbVYwZFhKdUlIWmhiSFZsVzJ0bGVWMDdJSDB1WW1sdVpDaHVkV3hzTENCclpYa3BLVHRjYmlCY2RGeDBjbVYwZFhKdUlHNXpPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdaMlYwUkdWbVlYVnNkRVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm1iM0lnWTI5dGNHRjBhV0pwYkdsMGVTQjNhWFJvSUc1dmJpMW9ZWEp0YjI1NUlHMXZaSFZzWlhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YmlBOUlHWjFibU4wYVc5dUtHMXZaSFZzWlNrZ2UxeHVJRngwWEhSMllYSWdaMlYwZEdWeUlEMGdiVzlrZFd4bElDWW1JRzF2WkhWc1pTNWZYMlZ6VFc5a2RXeGxJRDljYmlCY2RGeDBYSFJtZFc1amRHbHZiaUJuWlhSRVpXWmhkV3gwS0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsV3lka1pXWmhkV3gwSjEwN0lIMGdPbHh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEUxdlpIVnNaVVY0Y0c5eWRITW9LU0I3SUhKbGRIVnliaUJ0YjJSMWJHVTdJSDA3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNoblpYUjBaWElzSUNkaEp5d2daMlYwZEdWeUtUdGNiaUJjZEZ4MGNtVjBkWEp1SUdkbGRIUmxjanRjYmlCY2RIMDdYRzVjYmlCY2RDOHZJRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiRnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZJRDBnWm5WdVkzUnBiMjRvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2tnZXlCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFtVmpkQ3dnY0hKdmNHVnlkSGtwT3lCOU8xeHVYRzRnWEhRdkx5QmZYM2RsWW5CaFkydGZjSFZpYkdsalgzQmhkR2hmWDF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV3SUQwZ1hDSmNJanRjYmx4dVhHNGdYSFF2THlCTWIyRmtJR1Z1ZEhKNUlHMXZaSFZzWlNCaGJtUWdjbVYwZFhKdUlHVjRjRzl5ZEhOY2JpQmNkSEpsZEhWeWJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y3lBOUlEQXBPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCeVpYRjFhWEpsS0NjdUwyeHBZaTloZUdsdmN5Y3BPeUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTkxZEdsc2N5Y3BPMXh1ZG1GeUlITmxkSFJzWlNBOUlISmxjWFZwY21Vb0p5NHZMaTR2WTI5eVpTOXpaWFIwYkdVbktUdGNiblpoY2lCamIyOXJhV1Z6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTlvWld4d1pYSnpMMk52YjJ0cFpYTW5LVHRjYm5aaGNpQmlkV2xzWkZWU1RDQTlJSEpsY1hWcGNtVW9KeTR2TGk0dmFHVnNjR1Z5Y3k5aWRXbHNaRlZTVENjcE8xeHVkbUZ5SUdKMWFXeGtSblZzYkZCaGRHZ2dQU0J5WlhGMWFYSmxLQ2N1TGk5amIzSmxMMkoxYVd4a1JuVnNiRkJoZEdnbktUdGNiblpoY2lCd1lYSnpaVWhsWVdSbGNuTWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwyaGxiSEJsY25NdmNHRnljMlZJWldGa1pYSnpKeWs3WEc1MllYSWdhWE5WVWt4VFlXMWxUM0pwWjJsdUlEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5b1pXeHdaWEp6TDJselZWSk1VMkZ0WlU5eWFXZHBiaWNwTzF4dWRtRnlJR055WldGMFpVVnljbTl5SUQwZ2NtVnhkV2x5WlNnbkxpNHZZMjl5WlM5amNtVmhkR1ZGY25KdmNpY3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUhob2NrRmtZWEIwWlhJb1kyOXVabWxuS1NCN1hHNGdJSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2htZFc1amRHbHZiaUJrYVhOd1lYUmphRmhvY2xKbGNYVmxjM1FvY21WemIyeDJaU3dnY21WcVpXTjBLU0I3WEc0Z0lDQWdkbUZ5SUhKbGNYVmxjM1JFWVhSaElEMGdZMjl1Wm1sbkxtUmhkR0U3WEc0Z0lDQWdkbUZ5SUhKbGNYVmxjM1JJWldGa1pYSnpJRDBnWTI5dVptbG5MbWhsWVdSbGNuTTdYRzVjYmlBZ0lDQnBaaUFvZFhScGJITXVhWE5HYjNKdFJHRjBZU2h5WlhGMVpYTjBSR0YwWVNrcElIdGNiaUFnSUNBZ0lHUmxiR1YwWlNCeVpYRjFaWE4wU0dWaFpHVnljMXNuUTI5dWRHVnVkQzFVZVhCbEoxMDdJQzh2SUV4bGRDQjBhR1VnWW5KdmQzTmxjaUJ6WlhRZ2FYUmNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdjbVZ4ZFdWemRDQTlJRzVsZHlCWVRVeElkSFJ3VW1WeGRXVnpkQ2dwTzF4dVhHNGdJQ0FnTHk4Z1NGUlVVQ0JpWVhOcFl5QmhkWFJvWlc1MGFXTmhkR2x2Ymx4dUlDQWdJR2xtSUNoamIyNW1hV2N1WVhWMGFDa2dlMXh1SUNBZ0lDQWdkbUZ5SUhWelpYSnVZVzFsSUQwZ1kyOXVabWxuTG1GMWRHZ3VkWE5sY201aGJXVWdmSHdnSnljN1hHNGdJQ0FnSUNCMllYSWdjR0Z6YzNkdmNtUWdQU0JqYjI1bWFXY3VZWFYwYUM1d1lYTnpkMjl5WkNBL0lIVnVaWE5qWVhCbEtHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaGpiMjVtYVdjdVlYVjBhQzV3WVhOemQyOXlaQ2twSURvZ0p5YzdYRzRnSUNBZ0lDQnlaWEYxWlhOMFNHVmhaR1Z5Y3k1QmRYUm9iM0pwZW1GMGFXOXVJRDBnSjBKaGMybGpJQ2NnS3lCaWRHOWhLSFZ6WlhKdVlXMWxJQ3NnSnpvbklDc2djR0Z6YzNkdmNtUXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lIWmhjaUJtZFd4c1VHRjBhQ0E5SUdKMWFXeGtSblZzYkZCaGRHZ29ZMjl1Wm1sbkxtSmhjMlZWVWt3c0lHTnZibVpwWnk1MWNtd3BPMXh1SUNBZ0lISmxjWFZsYzNRdWIzQmxiaWhqYjI1bWFXY3ViV1YwYUc5a0xuUnZWWEJ3WlhKRFlYTmxLQ2tzSUdKMWFXeGtWVkpNS0daMWJHeFFZWFJvTENCamIyNW1hV2N1Y0dGeVlXMXpMQ0JqYjI1bWFXY3VjR0Z5WVcxelUyVnlhV0ZzYVhwbGNpa3NJSFJ5ZFdVcE8xeHVYRzRnSUNBZ0x5OGdVMlYwSUhSb1pTQnlaWEYxWlhOMElIUnBiV1Z2ZFhRZ2FXNGdUVk5jYmlBZ0lDQnlaWEYxWlhOMExuUnBiV1Z2ZFhRZ1BTQmpiMjVtYVdjdWRHbHRaVzkxZER0Y2JseHVJQ0FnSUM4dklFeHBjM1JsYmlCbWIzSWdjbVZoWkhrZ2MzUmhkR1ZjYmlBZ0lDQnlaWEYxWlhOMExtOXVjbVZoWkhsemRHRjBaV05vWVc1blpTQTlJR1oxYm1OMGFXOXVJR2hoYm1Sc1pVeHZZV1FvS1NCN1hHNGdJQ0FnSUNCcFppQW9JWEpsY1hWbGMzUWdmSHdnY21WeGRXVnpkQzV5WldGa2VWTjBZWFJsSUNFOVBTQTBLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnTHk4Z1ZHaGxJSEpsY1hWbGMzUWdaWEp5YjNKbFpDQnZkWFFnWVc1a0lIZGxJR1JwWkc0bmRDQm5aWFFnWVNCeVpYTndiMjV6WlN3Z2RHaHBjeUIzYVd4c0lHSmxYRzRnSUNBZ0lDQXZMeUJvWVc1a2JHVmtJR0o1SUc5dVpYSnliM0lnYVc1emRHVmhaRnh1SUNBZ0lDQWdMeThnVjJsMGFDQnZibVVnWlhoalpYQjBhVzl1T2lCeVpYRjFaWE4wSUhSb1lYUWdkWE5wYm1jZ1ptbHNaVG9nY0hKdmRHOWpiMndzSUcxdmMzUWdZbkp2ZDNObGNuTmNiaUFnSUNBZ0lDOHZJSGRwYkd3Z2NtVjBkWEp1SUhOMFlYUjFjeUJoY3lBd0lHVjJaVzRnZEdodmRXZG9JR2wwSjNNZ1lTQnpkV05qWlhOelpuVnNJSEpsY1hWbGMzUmNiaUFnSUNBZ0lHbG1JQ2h5WlhGMVpYTjBMbk4wWVhSMWN5QTlQVDBnTUNBbUppQWhLSEpsY1hWbGMzUXVjbVZ6Y0c5dWMyVlZVa3dnSmlZZ2NtVnhkV1Z6ZEM1eVpYTndiMjV6WlZWU1RDNXBibVJsZUU5bUtDZG1hV3hsT2ljcElEMDlQU0F3S1NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDOHZJRkJ5WlhCaGNtVWdkR2hsSUhKbGMzQnZibk5sWEc0Z0lDQWdJQ0IyWVhJZ2NtVnpjRzl1YzJWSVpXRmtaWEp6SUQwZ0oyZGxkRUZzYkZKbGMzQnZibk5sU0dWaFpHVnljeWNnYVc0Z2NtVnhkV1Z6ZENBL0lIQmhjbk5sU0dWaFpHVnljeWh5WlhGMVpYTjBMbWRsZEVGc2JGSmxjM0J2Ym5ObFNHVmhaR1Z5Y3lncEtTQTZJRzUxYkd3N1hHNGdJQ0FnSUNCMllYSWdjbVZ6Y0c5dWMyVkVZWFJoSUQwZ0lXTnZibVpwWnk1eVpYTndiMjV6WlZSNWNHVWdmSHdnWTI5dVptbG5MbkpsYzNCdmJuTmxWSGx3WlNBOVBUMGdKM1JsZUhRbklEOGdjbVZ4ZFdWemRDNXlaWE53YjI1elpWUmxlSFFnT2lCeVpYRjFaWE4wTG5KbGMzQnZibk5sTzF4dUlDQWdJQ0FnZG1GeUlISmxjM0J2Ym5ObElEMGdlMXh1SUNBZ0lDQWdJQ0JrWVhSaE9pQnlaWE53YjI1elpVUmhkR0VzWEc0Z0lDQWdJQ0FnSUhOMFlYUjFjem9nY21WeGRXVnpkQzV6ZEdGMGRYTXNYRzRnSUNBZ0lDQWdJSE4wWVhSMWMxUmxlSFE2SUhKbGNYVmxjM1F1YzNSaGRIVnpWR1Y0ZEN4Y2JpQWdJQ0FnSUNBZ2FHVmhaR1Z5Y3pvZ2NtVnpjRzl1YzJWSVpXRmtaWEp6TEZ4dUlDQWdJQ0FnSUNCamIyNW1hV2M2SUdOdmJtWnBaeXhjYmlBZ0lDQWdJQ0FnY21WeGRXVnpkRG9nY21WeGRXVnpkRnh1SUNBZ0lDQWdmVHRjYmx4dUlDQWdJQ0FnYzJWMGRHeGxLSEpsYzI5c2RtVXNJSEpsYW1WamRDd2djbVZ6Y0c5dWMyVXBPMXh1WEc0Z0lDQWdJQ0F2THlCRGJHVmhiaUIxY0NCeVpYRjFaWE4wWEc0Z0lDQWdJQ0J5WlhGMVpYTjBJRDBnYm5Wc2JEdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ0x5OGdTR0Z1Wkd4bElHSnliM2R6WlhJZ2NtVnhkV1Z6ZENCallXNWpaV3hzWVhScGIyNGdLR0Z6SUc5d2NHOXpaV1FnZEc4Z1lTQnRZVzUxWVd3Z1kyRnVZMlZzYkdGMGFXOXVLVnh1SUNBZ0lISmxjWFZsYzNRdWIyNWhZbTl5ZENBOUlHWjFibU4wYVc5dUlHaGhibVJzWlVGaWIzSjBLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRnlaWEYxWlhOMEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVZxWldOMEtHTnlaV0YwWlVWeWNtOXlLQ2RTWlhGMVpYTjBJR0ZpYjNKMFpXUW5MQ0JqYjI1bWFXY3NJQ2RGUTA5T1RrRkNUMUpVUlVRbkxDQnlaWEYxWlhOMEtTazdYRzVjYmlBZ0lDQWdJQzh2SUVOc1pXRnVJSFZ3SUhKbGNYVmxjM1JjYmlBZ0lDQWdJSEpsY1hWbGMzUWdQU0J1ZFd4c08xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdkx5QklZVzVrYkdVZ2JHOTNJR3hsZG1Wc0lHNWxkSGR2Y21zZ1pYSnliM0p6WEc0Z0lDQWdjbVZ4ZFdWemRDNXZibVZ5Y205eUlEMGdablZ1WTNScGIyNGdhR0Z1Wkd4bFJYSnliM0lvS1NCN1hHNGdJQ0FnSUNBdkx5QlNaV0ZzSUdWeWNtOXljeUJoY21VZ2FHbGtaR1Z1SUdaeWIyMGdkWE1nWW5rZ2RHaGxJR0p5YjNkelpYSmNiaUFnSUNBZ0lDOHZJRzl1WlhKeWIzSWdjMmh2ZFd4a0lHOXViSGtnWm1seVpTQnBaaUJwZENkeklHRWdibVYwZDI5eWF5Qmxjbkp2Y2x4dUlDQWdJQ0FnY21WcVpXTjBLR055WldGMFpVVnljbTl5S0NkT1pYUjNiM0pySUVWeWNtOXlKeXdnWTI5dVptbG5MQ0J1ZFd4c0xDQnlaWEYxWlhOMEtTazdYRzVjYmlBZ0lDQWdJQzh2SUVOc1pXRnVJSFZ3SUhKbGNYVmxjM1JjYmlBZ0lDQWdJSEpsY1hWbGMzUWdQU0J1ZFd4c08xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdkx5QklZVzVrYkdVZ2RHbHRaVzkxZEZ4dUlDQWdJSEpsY1hWbGMzUXViMjUwYVcxbGIzVjBJRDBnWm5WdVkzUnBiMjRnYUdGdVpHeGxWR2x0Wlc5MWRDZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCMGFXMWxiM1YwUlhKeWIzSk5aWE56WVdkbElEMGdKM1JwYldWdmRYUWdiMllnSnlBcklHTnZibVpwWnk1MGFXMWxiM1YwSUNzZ0oyMXpJR1Y0WTJWbFpHVmtKenRjYmlBZ0lDQWdJR2xtSUNoamIyNW1hV2N1ZEdsdFpXOTFkRVZ5Y205eVRXVnpjMkZuWlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhVzFsYjNWMFJYSnliM0pOWlhOellXZGxJRDBnWTI5dVptbG5MblJwYldWdmRYUkZjbkp2Y2sxbGMzTmhaMlU3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WldwbFkzUW9ZM0psWVhSbFJYSnliM0lvZEdsdFpXOTFkRVZ5Y205eVRXVnpjMkZuWlN3Z1kyOXVabWxuTENBblJVTlBUazVCUWs5U1ZFVkVKeXhjYmlBZ0lDQWdJQ0FnY21WeGRXVnpkQ2twTzF4dVhHNGdJQ0FnSUNBdkx5QkRiR1ZoYmlCMWNDQnlaWEYxWlhOMFhHNGdJQ0FnSUNCeVpYRjFaWE4wSUQwZ2JuVnNiRHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeThnUVdSa0lIaHpjbVlnYUdWaFpHVnlYRzRnSUNBZ0x5OGdWR2hwY3lCcGN5QnZibXg1SUdSdmJtVWdhV1lnY25WdWJtbHVaeUJwYmlCaElITjBZVzVrWVhKa0lHSnliM2R6WlhJZ1pXNTJhWEp2Ym0xbGJuUXVYRzRnSUNBZ0x5OGdVM0JsWTJsbWFXTmhiR3g1SUc1dmRDQnBaaUIzWlNkeVpTQnBiaUJoSUhkbFlpQjNiM0pyWlhJc0lHOXlJSEpsWVdOMExXNWhkR2wyWlM1Y2JpQWdJQ0JwWmlBb2RYUnBiSE11YVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTa2dlMXh1SUNBZ0lDQWdMeThnUVdSa0lIaHpjbVlnYUdWaFpHVnlYRzRnSUNBZ0lDQjJZWElnZUhOeVpsWmhiSFZsSUQwZ0tHTnZibVpwWnk1M2FYUm9RM0psWkdWdWRHbGhiSE1nZkh3Z2FYTlZVa3hUWVcxbFQzSnBaMmx1S0daMWJHeFFZWFJvS1NrZ0ppWWdZMjl1Wm1sbkxuaHpjbVpEYjI5cmFXVk9ZVzFsSUQ5Y2JpQWdJQ0FnSUNBZ1kyOXZhMmxsY3k1eVpXRmtLR052Ym1acFp5NTRjM0ptUTI5dmEybGxUbUZ0WlNrZ09seHVJQ0FnSUNBZ0lDQjFibVJsWm1sdVpXUTdYRzVjYmlBZ0lDQWdJR2xtSUNoNGMzSm1WbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRFaGxZV1JsY25OYlkyOXVabWxuTG5oemNtWklaV0ZrWlhKT1lXMWxYU0E5SUhoemNtWldZV3gxWlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCQlpHUWdhR1ZoWkdWeWN5QjBieUIwYUdVZ2NtVnhkV1Z6ZEZ4dUlDQWdJR2xtSUNnbmMyVjBVbVZ4ZFdWemRFaGxZV1JsY2ljZ2FXNGdjbVZ4ZFdWemRDa2dlMXh1SUNBZ0lDQWdkWFJwYkhNdVptOXlSV0ZqYUNoeVpYRjFaWE4wU0dWaFpHVnljeXdnWm5WdVkzUnBiMjRnYzJWMFVtVnhkV1Z6ZEVobFlXUmxjaWgyWVd3c0lHdGxlU2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlISmxjWFZsYzNSRVlYUmhJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJyWlhrdWRHOU1iM2RsY2tOaGMyVW9LU0E5UFQwZ0oyTnZiblJsYm5RdGRIbHdaU2NwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJTWlcxdmRtVWdRMjl1ZEdWdWRDMVVlWEJsSUdsbUlHUmhkR0VnYVhNZ2RXNWtaV1pwYm1Wa1hHNGdJQ0FnSUNBZ0lDQWdaR1ZzWlhSbElISmxjWFZsYzNSSVpXRmtaWEp6VzJ0bGVWMDdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1QzUm9aWEozYVhObElHRmtaQ0JvWldGa1pYSWdkRzhnZEdobElISmxjWFZsYzNSY2JpQWdJQ0FnSUNBZ0lDQnlaWEYxWlhOMExuTmxkRkpsY1hWbGMzUklaV0ZrWlhJb2EyVjVMQ0IyWVd3cE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJCWkdRZ2QybDBhRU55WldSbGJuUnBZV3h6SUhSdklISmxjWFZsYzNRZ2FXWWdibVZsWkdWa1hHNGdJQ0FnYVdZZ0tDRjFkR2xzY3k1cGMxVnVaR1ZtYVc1bFpDaGpiMjVtYVdjdWQybDBhRU55WldSbGJuUnBZV3h6S1NrZ2UxeHVJQ0FnSUNBZ2NtVnhkV1Z6ZEM1M2FYUm9RM0psWkdWdWRHbGhiSE1nUFNBaElXTnZibVpwWnk1M2FYUm9RM0psWkdWdWRHbGhiSE03WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnUVdSa0lISmxjM0J2Ym5ObFZIbHdaU0IwYnlCeVpYRjFaWE4wSUdsbUlHNWxaV1JsWkZ4dUlDQWdJR2xtSUNoamIyNW1hV2N1Y21WemNHOXVjMlZVZVhCbEtTQjdYRzRnSUNBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNCeVpYRjFaWE4wTG5KbGMzQnZibk5sVkhsd1pTQTlJR052Ym1acFp5NXlaWE53YjI1elpWUjVjR1U3WEc0Z0lDQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRVY0Y0dWamRHVmtJRVJQVFVWNFkyVndkR2x2YmlCMGFISnZkMjRnWW5rZ1luSnZkM05sY25NZ2JtOTBJR052YlhCaGRHbGliR1VnV0UxTVNIUjBjRkpsY1hWbGMzUWdUR1YyWld3Z01pNWNiaUFnSUNBZ0lDQWdMeThnUW5WMExDQjBhR2x6SUdOaGJpQmlaU0J6ZFhCd2NtVnpjMlZrSUdadmNpQW5hbk52YmljZ2RIbHdaU0JoY3lCcGRDQmpZVzRnWW1VZ2NHRnljMlZrSUdKNUlHUmxabUYxYkhRZ0ozUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObEp5Qm1kVzVqZEdsdmJpNWNiaUFnSUNBZ0lDQWdhV1lnS0dOdmJtWnBaeTV5WlhOd2IyNXpaVlI1Y0dVZ0lUMDlJQ2RxYzI5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUhSb2NtOTNJR1U3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCSVlXNWtiR1VnY0hKdlozSmxjM01nYVdZZ2JtVmxaR1ZrWEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJqYjI1bWFXY3ViMjVFYjNkdWJHOWhaRkJ5YjJkeVpYTnpJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQnlaWEYxWlhOMExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0ozQnliMmR5WlhOekp5d2dZMjl1Wm1sbkxtOXVSRzkzYm14dllXUlFjbTluY21WemN5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdUbTkwSUdGc2JDQmljbTkzYzJWeWN5QnpkWEJ3YjNKMElIVndiRzloWkNCbGRtVnVkSE5jYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR052Ym1acFp5NXZibFZ3Ykc5aFpGQnliMmR5WlhOeklEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlISmxjWFZsYzNRdWRYQnNiMkZrS1NCN1hHNGdJQ0FnSUNCeVpYRjFaWE4wTG5Wd2JHOWhaQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R3Y205bmNtVnpjeWNzSUdOdmJtWnBaeTV2YmxWd2JHOWhaRkJ5YjJkeVpYTnpLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvWTI5dVptbG5MbU5oYm1ObGJGUnZhMlZ1S1NCN1hHNGdJQ0FnSUNBdkx5QklZVzVrYkdVZ1kyRnVZMlZzYkdGMGFXOXVYRzRnSUNBZ0lDQmpiMjVtYVdjdVkyRnVZMlZzVkc5clpXNHVjSEp2YldselpTNTBhR1Z1S0daMWJtTjBhVzl1SUc5dVEyRnVZMlZzWldRb1kyRnVZMlZzS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doY21WeGRXVnpkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSEpsY1hWbGMzUXVZV0p2Y25Rb0tUdGNiaUFnSUNBZ0lDQWdjbVZxWldOMEtHTmhibU5sYkNrN1hHNGdJQ0FnSUNBZ0lDOHZJRU5zWldGdUlIVndJSEpsY1hWbGMzUmNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRDQTlJRzUxYkd3N1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9JWEpsY1hWbGMzUkVZWFJoS1NCN1hHNGdJQ0FnSUNCeVpYRjFaWE4wUkdGMFlTQTlJRzUxYkd3N1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1UyVnVaQ0IwYUdVZ2NtVnhkV1Z6ZEZ4dUlDQWdJSEpsY1hWbGMzUXVjMlZ1WkNoeVpYRjFaWE4wUkdGMFlTazdYRzRnSUgwcE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTkxZEdsc2N5Y3BPMXh1ZG1GeUlHSnBibVFnUFNCeVpYRjFhWEpsS0NjdUwyaGxiSEJsY25NdlltbHVaQ2NwTzF4dWRtRnlJRUY0YVc5eklEMGdjbVZ4ZFdseVpTZ25MaTlqYjNKbEwwRjRhVzl6SnlrN1hHNTJZWElnYldWeVoyVkRiMjVtYVdjZ1BTQnlaWEYxYVhKbEtDY3VMMk52Y21VdmJXVnlaMlZEYjI1bWFXY25LVHRjYm5aaGNpQmtaV1poZFd4MGN5QTlJSEpsY1hWcGNtVW9KeTR2WkdWbVlYVnNkSE1uS1R0Y2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdVZ1lXNGdhVzV6ZEdGdVkyVWdiMllnUVhocGIzTmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1pHVm1ZWFZzZEVOdmJtWnBaeUJVYUdVZ1pHVm1ZWFZzZENCamIyNW1hV2NnWm05eUlIUm9aU0JwYm5OMFlXNWpaVnh1SUNvZ1FISmxkSFZ5YmlCN1FYaHBiM045SUVFZ2JtVjNJR2x1YzNSaGJtTmxJRzltSUVGNGFXOXpYRzRnS2k5Y2JtWjFibU4wYVc5dUlHTnlaV0YwWlVsdWMzUmhibU5sS0dSbFptRjFiSFJEYjI1bWFXY3BJSHRjYmlBZ2RtRnlJR052Ym5SbGVIUWdQU0J1WlhjZ1FYaHBiM01vWkdWbVlYVnNkRU52Ym1acFp5azdYRzRnSUhaaGNpQnBibk4wWVc1alpTQTlJR0pwYm1Rb1FYaHBiM011Y0hKdmRHOTBlWEJsTG5KbGNYVmxjM1FzSUdOdmJuUmxlSFFwTzF4dVhHNGdJQzh2SUVOdmNIa2dZWGhwYjNNdWNISnZkRzkwZVhCbElIUnZJR2x1YzNSaGJtTmxYRzRnSUhWMGFXeHpMbVY0ZEdWdVpDaHBibk4wWVc1alpTd2dRWGhwYjNNdWNISnZkRzkwZVhCbExDQmpiMjUwWlhoMEtUdGNibHh1SUNBdkx5QkRiM0I1SUdOdmJuUmxlSFFnZEc4Z2FXNXpkR0Z1WTJWY2JpQWdkWFJwYkhNdVpYaDBaVzVrS0dsdWMzUmhibU5sTENCamIyNTBaWGgwS1R0Y2JseHVJQ0J5WlhSMWNtNGdhVzV6ZEdGdVkyVTdYRzU5WEc1Y2JpOHZJRU55WldGMFpTQjBhR1VnWkdWbVlYVnNkQ0JwYm5OMFlXNWpaU0IwYnlCaVpTQmxlSEJ2Y25SbFpGeHVkbUZ5SUdGNGFXOXpJRDBnWTNKbFlYUmxTVzV6ZEdGdVkyVW9aR1ZtWVhWc2RITXBPMXh1WEc0dkx5QkZlSEJ2YzJVZ1FYaHBiM01nWTJ4aGMzTWdkRzhnWVd4c2IzY2dZMnhoYzNNZ2FXNW9aWEpwZEdGdVkyVmNibUY0YVc5ekxrRjRhVzl6SUQwZ1FYaHBiM003WEc1Y2JpOHZJRVpoWTNSdmNua2dabTl5SUdOeVpXRjBhVzVuSUc1bGR5QnBibk4wWVc1alpYTmNibUY0YVc5ekxtTnlaV0YwWlNBOUlHWjFibU4wYVc5dUlHTnlaV0YwWlNocGJuTjBZVzVqWlVOdmJtWnBaeWtnZTF4dUlDQnlaWFIxY200Z1kzSmxZWFJsU1c1emRHRnVZMlVvYldWeVoyVkRiMjVtYVdjb1lYaHBiM011WkdWbVlYVnNkSE1zSUdsdWMzUmhibU5sUTI5dVptbG5LU2s3WEc1OU8xeHVYRzR2THlCRmVIQnZjMlVnUTJGdVkyVnNJQ1lnUTJGdVkyVnNWRzlyWlc1Y2JtRjRhVzl6TGtOaGJtTmxiQ0E5SUhKbGNYVnBjbVVvSnk0dlkyRnVZMlZzTDBOaGJtTmxiQ2NwTzF4dVlYaHBiM011UTJGdVkyVnNWRzlyWlc0Z1BTQnlaWEYxYVhKbEtDY3VMMk5oYm1ObGJDOURZVzVqWld4VWIydGxiaWNwTzF4dVlYaHBiM011YVhORFlXNWpaV3dnUFNCeVpYRjFhWEpsS0NjdUwyTmhibU5sYkM5cGMwTmhibU5sYkNjcE8xeHVYRzR2THlCRmVIQnZjMlVnWVd4c0wzTndjbVZoWkZ4dVlYaHBiM011WVd4c0lEMGdablZ1WTNScGIyNGdZV3hzS0hCeWIyMXBjMlZ6S1NCN1hHNGdJSEpsZEhWeWJpQlFjbTl0YVhObExtRnNiQ2h3Y205dGFYTmxjeWs3WEc1OU8xeHVZWGhwYjNNdWMzQnlaV0ZrSUQwZ2NtVnhkV2x5WlNnbkxpOW9aV3h3WlhKekwzTndjbVZoWkNjcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR0Y0YVc5ek8xeHVYRzR2THlCQmJHeHZkeUIxYzJVZ2IyWWdaR1ZtWVhWc2RDQnBiWEJ2Y25RZ2MzbHVkR0Y0SUdsdUlGUjVjR1ZUWTNKcGNIUmNibTF2WkhWc1pTNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQmhlR2x2Y3p0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkJJR0JEWVc1alpXeGdJR2x6SUdGdUlHOWlhbVZqZENCMGFHRjBJR2x6SUhSb2NtOTNiaUIzYUdWdUlHRnVJRzl3WlhKaGRHbHZiaUJwY3lCallXNWpaV3hsWkM1Y2JpQXFYRzRnS2lCQVkyeGhjM05jYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuUFgwZ2JXVnpjMkZuWlNCVWFHVWdiV1Z6YzJGblpTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1EyRnVZMlZzS0cxbGMzTmhaMlVwSUh0Y2JpQWdkR2hwY3k1dFpYTnpZV2RsSUQwZ2JXVnpjMkZuWlR0Y2JuMWNibHh1UTJGdVkyVnNMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeUE5SUdaMWJtTjBhVzl1SUhSdlUzUnlhVzVuS0NrZ2UxeHVJQ0J5WlhSMWNtNGdKME5oYm1ObGJDY2dLeUFvZEdocGN5NXRaWE56WVdkbElEOGdKem9nSnlBcklIUm9hWE11YldWemMyRm5aU0E2SUNjbktUdGNibjA3WEc1Y2JrTmhibU5sYkM1d2NtOTBiM1I1Y0dVdVgxOURRVTVEUlV4Zlh5QTlJSFJ5ZFdVN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdRMkZ1WTJWc08xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1EyRnVZMlZzSUQwZ2NtVnhkV2x5WlNnbkxpOURZVzVqWld3bktUdGNibHh1THlvcVhHNGdLaUJCSUdCRFlXNWpaV3hVYjJ0bGJtQWdhWE1nWVc0Z2IySnFaV04wSUhSb1lYUWdZMkZ1SUdKbElIVnpaV1FnZEc4Z2NtVnhkV1Z6ZENCallXNWpaV3hzWVhScGIyNGdiMllnWVc0Z2IzQmxjbUYwYVc5dUxseHVJQ3BjYmlBcUlFQmpiR0Z6YzF4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdaWGhsWTNWMGIzSWdWR2hsSUdWNFpXTjFkRzl5SUdaMWJtTjBhVzl1TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJEWVc1alpXeFViMnRsYmlobGVHVmpkWFJ2Y2lrZ2UxeHVJQ0JwWmlBb2RIbHdaVzltSUdWNFpXTjFkRzl5SUNFOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWduWlhobFkzVjBiM0lnYlhWemRDQmlaU0JoSUdaMWJtTjBhVzl1TGljcE8xeHVJQ0I5WEc1Y2JpQWdkbUZ5SUhKbGMyOXNkbVZRY205dGFYTmxPMXh1SUNCMGFHbHpMbkJ5YjIxcGMyVWdQU0J1WlhjZ1VISnZiV2x6WlNobWRXNWpkR2x2YmlCd2NtOXRhWE5sUlhobFkzVjBiM0lvY21WemIyeDJaU2tnZTF4dUlDQWdJSEpsYzI5c2RtVlFjbTl0YVhObElEMGdjbVZ6YjJ4MlpUdGNiaUFnZlNrN1hHNWNiaUFnZG1GeUlIUnZhMlZ1SUQwZ2RHaHBjenRjYmlBZ1pYaGxZM1YwYjNJb1puVnVZM1JwYjI0Z1kyRnVZMlZzS0cxbGMzTmhaMlVwSUh0Y2JpQWdJQ0JwWmlBb2RHOXJaVzR1Y21WaGMyOXVLU0I3WEc0Z0lDQWdJQ0F2THlCRFlXNWpaV3hzWVhScGIyNGdhR0Z6SUdGc2NtVmhaSGtnWW1WbGJpQnlaWEYxWlhOMFpXUmNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IwYjJ0bGJpNXlaV0Z6YjI0Z1BTQnVaWGNnUTJGdVkyVnNLRzFsYzNOaFoyVXBPMXh1SUNBZ0lISmxjMjlzZG1WUWNtOXRhWE5sS0hSdmEyVnVMbkpsWVhOdmJpazdYRzRnSUgwcE8xeHVmVnh1WEc0dktpcGNiaUFxSUZSb2NtOTNjeUJoSUdCRFlXNWpaV3hnSUdsbUlHTmhibU5sYkd4aGRHbHZiaUJvWVhNZ1ltVmxiaUJ5WlhGMVpYTjBaV1F1WEc0Z0tpOWNia05oYm1ObGJGUnZhMlZ1TG5CeWIzUnZkSGx3WlM1MGFISnZkMGxtVW1WeGRXVnpkR1ZrSUQwZ1puVnVZM1JwYjI0Z2RHaHliM2RKWmxKbGNYVmxjM1JsWkNncElIdGNiaUFnYVdZZ0tIUm9hWE11Y21WaGMyOXVLU0I3WEc0Z0lDQWdkR2h5YjNjZ2RHaHBjeTV5WldGemIyNDdYRzRnSUgxY2JuMDdYRzVjYmk4cUtseHVJQ29nVW1WMGRYSnVjeUJoYmlCdlltcGxZM1FnZEdoaGRDQmpiMjUwWVdsdWN5QmhJRzVsZHlCZ1EyRnVZMlZzVkc5clpXNWdJR0Z1WkNCaElHWjFibU4wYVc5dUlIUm9ZWFFzSUhkb1pXNGdZMkZzYkdWa0xGeHVJQ29nWTJGdVkyVnNjeUIwYUdVZ1lFTmhibU5sYkZSdmEyVnVZQzVjYmlBcUwxeHVRMkZ1WTJWc1ZHOXJaVzR1YzI5MWNtTmxJRDBnWm5WdVkzUnBiMjRnYzI5MWNtTmxLQ2tnZTF4dUlDQjJZWElnWTJGdVkyVnNPMXh1SUNCMllYSWdkRzlyWlc0Z1BTQnVaWGNnUTJGdVkyVnNWRzlyWlc0b1puVnVZM1JwYjI0Z1pYaGxZM1YwYjNJb1l5a2dlMXh1SUNBZ0lHTmhibU5sYkNBOUlHTTdYRzRnSUgwcE8xeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lIUnZhMlZ1T2lCMGIydGxiaXhjYmlBZ0lDQmpZVzVqWld3NklHTmhibU5sYkZ4dUlDQjlPMXh1ZlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQkRZVzVqWld4VWIydGxianRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCcGMwTmhibU5sYkNoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z0lTRW9kbUZzZFdVZ0ppWWdkbUZzZFdVdVgxOURRVTVEUlV4Zlh5azdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwzVjBhV3h6SnlrN1hHNTJZWElnWW5WcGJHUlZVa3dnUFNCeVpYRjFhWEpsS0NjdUxpOW9aV3h3WlhKekwySjFhV3hrVlZKTUp5azdYRzUyWVhJZ1NXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUlEMGdjbVZ4ZFdseVpTZ25MaTlKYm5SbGNtTmxjSFJ2Y2sxaGJtRm5aWEluS1R0Y2JuWmhjaUJrYVhOd1lYUmphRkpsY1hWbGMzUWdQU0J5WlhGMWFYSmxLQ2N1TDJScGMzQmhkR05vVW1WeGRXVnpkQ2NwTzF4dWRtRnlJRzFsY21kbFEyOXVabWxuSUQwZ2NtVnhkV2x5WlNnbkxpOXRaWEpuWlVOdmJtWnBaeWNwTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlNCaElHNWxkeUJwYm5OMFlXNWpaU0J2WmlCQmVHbHZjMXh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnBibk4wWVc1alpVTnZibVpwWnlCVWFHVWdaR1ZtWVhWc2RDQmpiMjVtYVdjZ1ptOXlJSFJvWlNCcGJuTjBZVzVqWlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJCZUdsdmN5aHBibk4wWVc1alpVTnZibVpwWnlrZ2UxeHVJQ0IwYUdsekxtUmxabUYxYkhSeklEMGdhVzV6ZEdGdVkyVkRiMjVtYVdjN1hHNGdJSFJvYVhNdWFXNTBaWEpqWlhCMGIzSnpJRDBnZTF4dUlDQWdJSEpsY1hWbGMzUTZJRzVsZHlCSmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJb0tTeGNiaUFnSUNCeVpYTndiMjV6WlRvZ2JtVjNJRWx1ZEdWeVkyVndkRzl5VFdGdVlXZGxjaWdwWEc0Z0lIMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHbHpjR0YwWTJnZ1lTQnlaWEYxWlhOMFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOdmJtWnBaeUJVYUdVZ1kyOXVabWxuSUhOd1pXTnBabWxqSUdadmNpQjBhR2x6SUhKbGNYVmxjM1FnS0cxbGNtZGxaQ0IzYVhSb0lIUm9hWE11WkdWbVlYVnNkSE1wWEc0Z0tpOWNia0Y0YVc5ekxuQnliM1J2ZEhsd1pTNXlaWEYxWlhOMElEMGdablZ1WTNScGIyNGdjbVZ4ZFdWemRDaGpiMjVtYVdjcElIdGNiaUFnTHlwbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2TUNvdlhHNGdJQzh2SUVGc2JHOTNJR1p2Y2lCaGVHbHZjeWduWlhoaGJYQnNaUzkxY213bld5d2dZMjl1Wm1sblhTa2dZU0JzWVNCbVpYUmphQ0JCVUVsY2JpQWdhV1lnS0hSNWNHVnZaaUJqYjI1bWFXY2dQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnWTI5dVptbG5JRDBnWVhKbmRXMWxiblJ6V3pGZElIeDhJSHQ5TzF4dUlDQWdJR052Ym1acFp5NTFjbXdnUFNCaGNtZDFiV1Z1ZEhOYk1GMDdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdZMjl1Wm1sbklEMGdZMjl1Wm1sbklIeDhJSHQ5TzF4dUlDQjlYRzVjYmlBZ1kyOXVabWxuSUQwZ2JXVnlaMlZEYjI1bWFXY29kR2hwY3k1a1pXWmhkV3gwY3l3Z1kyOXVabWxuS1R0Y2JseHVJQ0F2THlCVFpYUWdZMjl1Wm1sbkxtMWxkR2h2WkZ4dUlDQnBaaUFvWTI5dVptbG5MbTFsZEdodlpDa2dlMXh1SUNBZ0lHTnZibVpwWnk1dFpYUm9iMlFnUFNCamIyNW1hV2N1YldWMGFHOWtMblJ2VEc5M1pYSkRZWE5sS0NrN1hHNGdJSDBnWld4elpTQnBaaUFvZEdocGN5NWtaV1poZFd4MGN5NXRaWFJvYjJRcElIdGNiaUFnSUNCamIyNW1hV2N1YldWMGFHOWtJRDBnZEdocGN5NWtaV1poZFd4MGN5NXRaWFJvYjJRdWRHOU1iM2RsY2tOaGMyVW9LVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JqYjI1bWFXY3ViV1YwYUc5a0lEMGdKMmRsZENjN1hHNGdJSDFjYmx4dUlDQXZMeUJJYjI5cklIVndJR2x1ZEdWeVkyVndkRzl5Y3lCdGFXUmtiR1YzWVhKbFhHNGdJSFpoY2lCamFHRnBiaUE5SUZ0a2FYTndZWFJqYUZKbGNYVmxjM1FzSUhWdVpHVm1hVzVsWkYwN1hHNGdJSFpoY2lCd2NtOXRhWE5sSUQwZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0dOdmJtWnBaeWs3WEc1Y2JpQWdkR2hwY3k1cGJuUmxjbU5sY0hSdmNuTXVjbVZ4ZFdWemRDNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlIVnVjMmhwWm5SU1pYRjFaWE4wU1c1MFpYSmpaWEIwYjNKektHbHVkR1Z5WTJWd2RHOXlLU0I3WEc0Z0lDQWdZMmhoYVc0dWRXNXphR2xtZENocGJuUmxjbU5sY0hSdmNpNW1kV3htYVd4c1pXUXNJR2x1ZEdWeVkyVndkRzl5TG5KbGFtVmpkR1ZrS1R0Y2JpQWdmU2s3WEc1Y2JpQWdkR2hwY3k1cGJuUmxjbU5sY0hSdmNuTXVjbVZ6Y0c5dWMyVXVabTl5UldGamFDaG1kVzVqZEdsdmJpQndkWE5vVW1WemNHOXVjMlZKYm5SbGNtTmxjSFJ2Y25Nb2FXNTBaWEpqWlhCMGIzSXBJSHRjYmlBZ0lDQmphR0ZwYmk1d2RYTm9LR2x1ZEdWeVkyVndkRzl5TG1aMWJHWnBiR3hsWkN3Z2FXNTBaWEpqWlhCMGIzSXVjbVZxWldOMFpXUXBPMXh1SUNCOUtUdGNibHh1SUNCM2FHbHNaU0FvWTJoaGFXNHViR1Z1WjNSb0tTQjdYRzRnSUNBZ2NISnZiV2x6WlNBOUlIQnliMjFwYzJVdWRHaGxiaWhqYUdGcGJpNXphR2xtZENncExDQmphR0ZwYmk1emFHbG1kQ2dwS1R0Y2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCd2NtOXRhWE5sTzF4dWZUdGNibHh1UVhocGIzTXVjSEp2ZEc5MGVYQmxMbWRsZEZWeWFTQTlJR1oxYm1OMGFXOXVJR2RsZEZWeWFTaGpiMjVtYVdjcElIdGNiaUFnWTI5dVptbG5JRDBnYldWeVoyVkRiMjVtYVdjb2RHaHBjeTVrWldaaGRXeDBjeXdnWTI5dVptbG5LVHRjYmlBZ2NtVjBkWEp1SUdKMWFXeGtWVkpNS0dOdmJtWnBaeTUxY213c0lHTnZibVpwWnk1d1lYSmhiWE1zSUdOdmJtWnBaeTV3WVhKaGJYTlRaWEpwWVd4cGVtVnlLUzV5WlhCc1lXTmxLQzllWEZ3L0x5d2dKeWNwTzF4dWZUdGNibHh1THk4Z1VISnZkbWxrWlNCaGJHbGhjMlZ6SUdadmNpQnpkWEJ3YjNKMFpXUWdjbVZ4ZFdWemRDQnRaWFJvYjJSelhHNTFkR2xzY3k1bWIzSkZZV05vS0ZzblpHVnNaWFJsSnl3Z0oyZGxkQ2NzSUNkb1pXRmtKeXdnSjI5d2RHbHZibk1uWFN3Z1puVnVZM1JwYjI0Z1ptOXlSV0ZqYUUxbGRHaHZaRTV2UkdGMFlTaHRaWFJvYjJRcElIdGNiaUFnTHlwbGMyeHBiblFnWm5WdVl5MXVZVzFsY3pvd0tpOWNiaUFnUVhocGIzTXVjSEp2ZEc5MGVYQmxXMjFsZEdodlpGMGdQU0JtZFc1amRHbHZiaWgxY213c0lHTnZibVpwWnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuSmxjWFZsYzNRb2JXVnlaMlZEYjI1bWFXY29ZMjl1Wm1sbklIeDhJSHQ5TENCN1hHNGdJQ0FnSUNCdFpYUm9iMlE2SUcxbGRHaHZaQ3hjYmlBZ0lDQWdJSFZ5YkRvZ2RYSnNMRnh1SUNBZ0lDQWdaR0YwWVRvZ0tHTnZibVpwWnlCOGZDQjdmU2t1WkdGMFlWeHVJQ0FnSUgwcEtUdGNiaUFnZlR0Y2JuMHBPMXh1WEc1MWRHbHNjeTVtYjNKRllXTm9LRnNuY0c5emRDY3NJQ2R3ZFhRbkxDQW5jR0YwWTJnblhTd2dablZ1WTNScGIyNGdabTl5UldGamFFMWxkR2h2WkZkcGRHaEVZWFJoS0cxbGRHaHZaQ2tnZTF4dUlDQXZLbVZ6YkdsdWRDQm1kVzVqTFc1aGJXVnpPakFxTDF4dUlDQkJlR2x2Y3k1d2NtOTBiM1I1Y0dWYmJXVjBhRzlrWFNBOUlHWjFibU4wYVc5dUtIVnliQ3dnWkdGMFlTd2dZMjl1Wm1sbktTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjbVZ4ZFdWemRDaHRaWEpuWlVOdmJtWnBaeWhqYjI1bWFXY2dmSHdnZTMwc0lIdGNiaUFnSUNBZ0lHMWxkR2h2WkRvZ2JXVjBhRzlrTEZ4dUlDQWdJQ0FnZFhKc09pQjFjbXdzWEc0Z0lDQWdJQ0JrWVhSaE9pQmtZWFJoWEc0Z0lDQWdmU2twTzF4dUlDQjlPMXh1ZlNrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdRWGhwYjNNN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZkWFJwYkhNbktUdGNibHh1Wm5WdVkzUnBiMjRnU1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5S0NrZ2UxeHVJQ0IwYUdsekxtaGhibVJzWlhKeklEMGdXMTA3WEc1OVhHNWNiaThxS2x4dUlDb2dRV1JrSUdFZ2JtVjNJR2x1ZEdWeVkyVndkRzl5SUhSdklIUm9aU0J6ZEdGamExeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWjFiR1pwYkd4bFpDQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z2FHRnVaR3hsSUdCMGFHVnVZQ0JtYjNJZ1lTQmdVSEp2YldselpXQmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUhKbGFtVmpkR1ZrSUZSb1pTQm1kVzVqZEdsdmJpQjBieUJvWVc1a2JHVWdZSEpsYW1WamRHQWdabTl5SUdFZ1lGQnliMjFwYzJWZ1hHNGdLbHh1SUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlNCQmJpQkpSQ0IxYzJWa0lIUnZJSEpsYlc5MlpTQnBiblJsY21ObGNIUnZjaUJzWVhSbGNseHVJQ292WEc1SmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJdWNISnZkRzkwZVhCbExuVnpaU0E5SUdaMWJtTjBhVzl1SUhWelpTaG1kV3htYVd4c1pXUXNJSEpsYW1WamRHVmtLU0I3WEc0Z0lIUm9hWE11YUdGdVpHeGxjbk11Y0hWemFDaDdYRzRnSUNBZ1puVnNabWxzYkdWa09pQm1kV3htYVd4c1pXUXNYRzRnSUNBZ2NtVnFaV04wWldRNklISmxhbVZqZEdWa1hHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2RHaHBjeTVvWVc1a2JHVnljeTVzWlc1bmRHZ2dMU0F4TzF4dWZUdGNibHh1THlvcVhHNGdLaUJTWlcxdmRtVWdZVzRnYVc1MFpYSmpaWEIwYjNJZ1puSnZiU0IwYUdVZ2MzUmhZMnRjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdhV1FnVkdobElFbEVJSFJvWVhRZ2QyRnpJSEpsZEhWeWJtVmtJR0o1SUdCMWMyVmdYRzRnS2k5Y2JrbHVkR1Z5WTJWd2RHOXlUV0Z1WVdkbGNpNXdjbTkwYjNSNWNHVXVaV3BsWTNRZ1BTQm1kVzVqZEdsdmJpQmxhbVZqZENocFpDa2dlMXh1SUNCcFppQW9kR2hwY3k1b1lXNWtiR1Z5YzF0cFpGMHBJSHRjYmlBZ0lDQjBhR2x6TG1oaGJtUnNaWEp6VzJsa1hTQTlJRzUxYkd3N1hHNGdJSDFjYm4wN1hHNWNiaThxS2x4dUlDb2dTWFJsY21GMFpTQnZkbVZ5SUdGc2JDQjBhR1VnY21WbmFYTjBaWEpsWkNCcGJuUmxjbU5sY0hSdmNuTmNiaUFxWEc0Z0tpQlVhR2x6SUcxbGRHaHZaQ0JwY3lCd1lYSjBhV04xYkdGeWJIa2dkWE5sWm5Wc0lHWnZjaUJ6YTJsd2NHbHVaeUJ2ZG1WeUlHRnVlVnh1SUNvZ2FXNTBaWEpqWlhCMGIzSnpJSFJvWVhRZ2JXRjVJR2hoZG1VZ1ltVmpiMjFsSUdCdWRXeHNZQ0JqWVd4c2FXNW5JR0JsYW1WamRHQXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdabTRnVkdobElHWjFibU4wYVc5dUlIUnZJR05oYkd3Z1ptOXlJR1ZoWTJnZ2FXNTBaWEpqWlhCMGIzSmNiaUFxTDF4dVNXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUxuQnliM1J2ZEhsd1pTNW1iM0pGWVdOb0lEMGdablZ1WTNScGIyNGdabTl5UldGamFDaG1iaWtnZTF4dUlDQjFkR2xzY3k1bWIzSkZZV05vS0hSb2FYTXVhR0Z1Wkd4bGNuTXNJR1oxYm1OMGFXOXVJR1p2Y2tWaFkyaElZVzVrYkdWeUtHZ3BJSHRjYmlBZ0lDQnBaaUFvYUNBaFBUMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ1ptNG9hQ2s3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibjA3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1NXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2FYTkJZbk52YkhWMFpWVlNUQ0E5SUhKbGNYVnBjbVVvSnk0dUwyaGxiSEJsY25NdmFYTkJZbk52YkhWMFpWVlNUQ2NwTzF4dWRtRnlJR052YldKcGJtVlZVa3h6SUQwZ2NtVnhkV2x5WlNnbkxpNHZhR1ZzY0dWeWN5OWpiMjFpYVc1bFZWSk1jeWNwTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlhNZ1lTQnVaWGNnVlZKTUlHSjVJR052YldKcGJtbHVaeUIwYUdVZ1ltRnpaVlZTVENCM2FYUm9JSFJvWlNCeVpYRjFaWE4wWldSVlVrd3NYRzRnS2lCdmJteDVJSGRvWlc0Z2RHaGxJSEpsY1hWbGMzUmxaRlZTVENCcGN5QnViM1FnWVd4eVpXRmtlU0JoYmlCaFluTnZiSFYwWlNCVlVrd3VYRzRnS2lCSlppQjBhR1VnY21WeGRXVnpkRlZTVENCcGN5QmhZbk52YkhWMFpTd2dkR2hwY3lCbWRXNWpkR2x2YmlCeVpYUjFjbTV6SUhSb1pTQnlaWEYxWlhOMFpXUlZVa3dnZFc1MGIzVmphR1ZrTGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JpWVhObFZWSk1JRlJvWlNCaVlYTmxJRlZTVEZ4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlISmxjWFZsYzNSbFpGVlNUQ0JCWW5OdmJIVjBaU0J2Y2lCeVpXeGhkR2wyWlNCVlVrd2dkRzhnWTI5dFltbHVaVnh1SUNvZ1FISmxkSFZ5Ym5NZ2UzTjBjbWx1WjMwZ1ZHaGxJR052YldKcGJtVmtJR1oxYkd3Z2NHRjBhRnh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHSjFhV3hrUm5Wc2JGQmhkR2dvWW1GelpWVlNUQ3dnY21WeGRXVnpkR1ZrVlZKTUtTQjdYRzRnSUdsbUlDaGlZWE5sVlZKTUlDWW1JQ0ZwYzBGaWMyOXNkWFJsVlZKTUtISmxjWFZsYzNSbFpGVlNUQ2twSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZMjl0WW1sdVpWVlNUSE1vWW1GelpWVlNUQ3dnY21WeGRXVnpkR1ZrVlZKTUtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnhkV1Z6ZEdWa1ZWSk1PMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdWdWFHRnVZMlZGY25KdmNpQTlJSEpsY1hWcGNtVW9KeTR2Wlc1b1lXNWpaVVZ5Y205eUp5azdYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxJR0Z1SUVWeWNtOXlJSGRwZEdnZ2RHaGxJSE53WldOcFptbGxaQ0J0WlhOellXZGxMQ0JqYjI1bWFXY3NJR1Z5Y205eUlHTnZaR1VzSUhKbGNYVmxjM1FnWVc1a0lISmxjM0J2Ym5ObExseHVJQ3BjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCdFpYTnpZV2RsSUZSb1pTQmxjbkp2Y2lCdFpYTnpZV2RsTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTnZibVpwWnlCVWFHVWdZMjl1Wm1sbkxseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJRnRqYjJSbFhTQlVhR1VnWlhKeWIzSWdZMjlrWlNBb1ptOXlJR1Y0WVcxd2JHVXNJQ2RGUTA5T1RrRkNUMUpVUlVRbktTNWNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JiY21WeGRXVnpkRjBnVkdobElISmxjWFZsYzNRdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM0psYzNCdmJuTmxYU0JVYUdVZ2NtVnpjRzl1YzJVdVhHNGdLaUJBY21WMGRYSnVjeUI3UlhKeWIzSjlJRlJvWlNCamNtVmhkR1ZrSUdWeWNtOXlMbHh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHTnlaV0YwWlVWeWNtOXlLRzFsYzNOaFoyVXNJR052Ym1acFp5d2dZMjlrWlN3Z2NtVnhkV1Z6ZEN3Z2NtVnpjRzl1YzJVcElIdGNiaUFnZG1GeUlHVnljbTl5SUQwZ2JtVjNJRVZ5Y205eUtHMWxjM05oWjJVcE8xeHVJQ0J5WlhSMWNtNGdaVzVvWVc1alpVVnljbTl5S0dWeWNtOXlMQ0JqYjI1bWFXY3NJR052WkdVc0lISmxjWFZsYzNRc0lISmxjM0J2Ym5ObEtUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JuWmhjaUIwY21GdWMyWnZjbTFFWVhSaElEMGdjbVZ4ZFdseVpTZ25MaTkwY21GdWMyWnZjbTFFWVhSaEp5azdYRzUyWVhJZ2FYTkRZVzVqWld3Z1BTQnlaWEYxYVhKbEtDY3VMaTlqWVc1alpXd3ZhWE5EWVc1alpXd25LVHRjYm5aaGNpQmtaV1poZFd4MGN5QTlJSEpsY1hWcGNtVW9KeTR1TDJSbFptRjFiSFJ6SnlrN1hHNWNiaThxS2x4dUlDb2dWR2h5YjNkeklHRWdZRU5oYm1ObGJHQWdhV1lnWTJGdVkyVnNiR0YwYVc5dUlHaGhjeUJpWldWdUlISmxjWFZsYzNSbFpDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2RHaHliM2RKWmtOaGJtTmxiR3hoZEdsdmJsSmxjWFZsYzNSbFpDaGpiMjVtYVdjcElIdGNiaUFnYVdZZ0tHTnZibVpwWnk1allXNWpaV3hVYjJ0bGJpa2dlMXh1SUNBZ0lHTnZibVpwWnk1allXNWpaV3hVYjJ0bGJpNTBhSEp2ZDBsbVVtVnhkV1Z6ZEdWa0tDazdYRzRnSUgxY2JuMWNibHh1THlvcVhHNGdLaUJFYVhOd1lYUmphQ0JoSUhKbGNYVmxjM1FnZEc4Z2RHaGxJSE5sY25abGNpQjFjMmx1WnlCMGFHVWdZMjl1Wm1sbmRYSmxaQ0JoWkdGd2RHVnlMbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdiMkpxWldOMGZTQmpiMjVtYVdjZ1ZHaGxJR052Ym1acFp5QjBhR0YwSUdseklIUnZJR0psSUhWelpXUWdabTl5SUhSb1pTQnlaWEYxWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3VUhKdmJXbHpaWDBnVkdobElGQnliMjFwYzJVZ2RHOGdZbVVnWm5Wc1ptbHNiR1ZrWEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdaR2x6Y0dGMFkyaFNaWEYxWlhOMEtHTnZibVpwWnlrZ2UxeHVJQ0IwYUhKdmQwbG1RMkZ1WTJWc2JHRjBhVzl1VW1WeGRXVnpkR1ZrS0dOdmJtWnBaeWs3WEc1Y2JpQWdMeThnUlc1emRYSmxJR2hsWVdSbGNuTWdaWGhwYzNSY2JpQWdZMjl1Wm1sbkxtaGxZV1JsY25NZ1BTQmpiMjVtYVdjdWFHVmhaR1Z5Y3lCOGZDQjdmVHRjYmx4dUlDQXZMeUJVY21GdWMyWnZjbTBnY21WeGRXVnpkQ0JrWVhSaFhHNGdJR052Ym1acFp5NWtZWFJoSUQwZ2RISmhibk5tYjNKdFJHRjBZU2hjYmlBZ0lDQmpiMjVtYVdjdVpHRjBZU3hjYmlBZ0lDQmpiMjVtYVdjdWFHVmhaR1Z5Y3l4Y2JpQWdJQ0JqYjI1bWFXY3VkSEpoYm5ObWIzSnRVbVZ4ZFdWemRGeHVJQ0FwTzF4dVhHNGdJQzh2SUVac1lYUjBaVzRnYUdWaFpHVnljMXh1SUNCamIyNW1hV2N1YUdWaFpHVnljeUE5SUhWMGFXeHpMbTFsY21kbEtGeHVJQ0FnSUdOdmJtWnBaeTVvWldGa1pYSnpMbU52YlcxdmJpQjhmQ0I3ZlN4Y2JpQWdJQ0JqYjI1bWFXY3VhR1ZoWkdWeWMxdGpiMjVtYVdjdWJXVjBhRzlrWFNCOGZDQjdmU3hjYmlBZ0lDQmpiMjVtYVdjdWFHVmhaR1Z5YzF4dUlDQXBPMXh1WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvWEc0Z0lDQWdXeWRrWld4bGRHVW5MQ0FuWjJWMEp5d2dKMmhsWVdRbkxDQW5jRzl6ZENjc0lDZHdkWFFuTENBbmNHRjBZMmduTENBblkyOXRiVzl1SjEwc1hHNGdJQ0FnWm5WdVkzUnBiMjRnWTJ4bFlXNUlaV0ZrWlhKRGIyNW1hV2NvYldWMGFHOWtLU0I3WEc0Z0lDQWdJQ0JrWld4bGRHVWdZMjl1Wm1sbkxtaGxZV1JsY25OYmJXVjBhRzlrWFR0Y2JpQWdJQ0I5WEc0Z0lDazdYRzVjYmlBZ2RtRnlJR0ZrWVhCMFpYSWdQU0JqYjI1bWFXY3VZV1JoY0hSbGNpQjhmQ0JrWldaaGRXeDBjeTVoWkdGd2RHVnlPMXh1WEc0Z0lISmxkSFZ5YmlCaFpHRndkR1Z5S0dOdmJtWnBaeWt1ZEdobGJpaG1kVzVqZEdsdmJpQnZia0ZrWVhCMFpYSlNaWE52YkhWMGFXOXVLSEpsYzNCdmJuTmxLU0I3WEc0Z0lDQWdkR2h5YjNkSlprTmhibU5sYkd4aGRHbHZibEpsY1hWbGMzUmxaQ2hqYjI1bWFXY3BPMXh1WEc0Z0lDQWdMeThnVkhKaGJuTm1iM0p0SUhKbGMzQnZibk5sSUdSaGRHRmNiaUFnSUNCeVpYTndiMjV6WlM1a1lYUmhJRDBnZEhKaGJuTm1iM0p0UkdGMFlTaGNiaUFnSUNBZ0lISmxjM0J2Ym5ObExtUmhkR0VzWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaUzVvWldGa1pYSnpMRnh1SUNBZ0lDQWdZMjl1Wm1sbkxuUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObFhHNGdJQ0FnS1R0Y2JseHVJQ0FnSUhKbGRIVnliaUJ5WlhOd2IyNXpaVHRjYmlBZ2ZTd2dablZ1WTNScGIyNGdiMjVCWkdGd2RHVnlVbVZxWldOMGFXOXVLSEpsWVhOdmJpa2dlMXh1SUNBZ0lHbG1JQ2doYVhORFlXNWpaV3dvY21WaGMyOXVLU2tnZTF4dUlDQWdJQ0FnZEdoeWIzZEpaa05oYm1ObGJHeGhkR2x2YmxKbGNYVmxjM1JsWkNoamIyNW1hV2NwTzF4dVhHNGdJQ0FnSUNBdkx5QlVjbUZ1YzJadmNtMGdjbVZ6Y0c5dWMyVWdaR0YwWVZ4dUlDQWdJQ0FnYVdZZ0tISmxZWE52YmlBbUppQnlaV0Z6YjI0dWNtVnpjRzl1YzJVcElIdGNiaUFnSUNBZ0lDQWdjbVZoYzI5dUxuSmxjM0J2Ym5ObExtUmhkR0VnUFNCMGNtRnVjMlp2Y20xRVlYUmhLRnh1SUNBZ0lDQWdJQ0FnSUhKbFlYTnZiaTV5WlhOd2IyNXpaUzVrWVhSaExGeHVJQ0FnSUNBZ0lDQWdJSEpsWVhOdmJpNXlaWE53YjI1elpTNW9aV0ZrWlhKekxGeHVJQ0FnSUNBZ0lDQWdJR052Ym1acFp5NTBjbUZ1YzJadmNtMVNaWE53YjI1elpWeHVJQ0FnSUNBZ0lDQXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCUWNtOXRhWE5sTG5KbGFtVmpkQ2h5WldGemIyNHBPMXh1SUNCOUtUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1ZYQmtZWFJsSUdGdUlFVnljbTl5SUhkcGRHZ2dkR2hsSUhOd1pXTnBabWxsWkNCamIyNW1hV2NzSUdWeWNtOXlJR052WkdVc0lHRnVaQ0J5WlhOd2IyNXpaUzVjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMFZ5Y205eWZTQmxjbkp2Y2lCVWFHVWdaWEp5YjNJZ2RHOGdkWEJrWVhSbExseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR052Ym1acFp5QlVhR1VnWTI5dVptbG5MbHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUZ0amIyUmxYU0JVYUdVZ1pYSnliM0lnWTI5a1pTQW9abTl5SUdWNFlXMXdiR1VzSUNkRlEwOU9Ua0ZDVDFKVVJVUW5LUzVjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCYmNtVnhkV1Z6ZEYwZ1ZHaGxJSEpsY1hWbGMzUXVYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnVzNKbGMzQnZibk5sWFNCVWFHVWdjbVZ6Y0c5dWMyVXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1JYSnliM0o5SUZSb1pTQmxjbkp2Y2k1Y2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJsYm1oaGJtTmxSWEp5YjNJb1pYSnliM0lzSUdOdmJtWnBaeXdnWTI5a1pTd2djbVZ4ZFdWemRDd2djbVZ6Y0c5dWMyVXBJSHRjYmlBZ1pYSnliM0l1WTI5dVptbG5JRDBnWTI5dVptbG5PMXh1SUNCcFppQW9ZMjlrWlNrZ2UxeHVJQ0FnSUdWeWNtOXlMbU52WkdVZ1BTQmpiMlJsTzF4dUlDQjlYRzVjYmlBZ1pYSnliM0l1Y21WeGRXVnpkQ0E5SUhKbGNYVmxjM1E3WEc0Z0lHVnljbTl5TG5KbGMzQnZibk5sSUQwZ2NtVnpjRzl1YzJVN1hHNGdJR1Z5Y205eUxtbHpRWGhwYjNORmNuSnZjaUE5SUhSeWRXVTdYRzVjYmlBZ1pYSnliM0l1ZEc5S1UwOU9JRDBnWm5WdVkzUnBiMjRnZEc5S1UwOU9LQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQXZMeUJUZEdGdVpHRnlaRnh1SUNBZ0lDQWdiV1Z6YzJGblpUb2dkR2hwY3k1dFpYTnpZV2RsTEZ4dUlDQWdJQ0FnYm1GdFpUb2dkR2hwY3k1dVlXMWxMRnh1SUNBZ0lDQWdMeThnVFdsamNtOXpiMlowWEc0Z0lDQWdJQ0JrWlhOamNtbHdkR2x2YmpvZ2RHaHBjeTVrWlhOamNtbHdkR2x2Yml4Y2JpQWdJQ0FnSUc1MWJXSmxjam9nZEdocGN5NXVkVzFpWlhJc1hHNGdJQ0FnSUNBdkx5Qk5iM3BwYkd4aFhHNGdJQ0FnSUNCbWFXeGxUbUZ0WlRvZ2RHaHBjeTVtYVd4bFRtRnRaU3hjYmlBZ0lDQWdJR3hwYm1WT2RXMWlaWEk2SUhSb2FYTXViR2x1WlU1MWJXSmxjaXhjYmlBZ0lDQWdJR052YkhWdGJrNTFiV0psY2pvZ2RHaHBjeTVqYjJ4MWJXNU9kVzFpWlhJc1hHNGdJQ0FnSUNCemRHRmphem9nZEdocGN5NXpkR0ZqYXl4Y2JpQWdJQ0FnSUM4dklFRjRhVzl6WEc0Z0lDQWdJQ0JqYjI1bWFXYzZJSFJvYVhNdVkyOXVabWxuTEZ4dUlDQWdJQ0FnWTI5a1pUb2dkR2hwY3k1amIyUmxYRzRnSUNBZ2ZUdGNiaUFnZlR0Y2JpQWdjbVYwZFhKdUlHVnljbTl5TzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpNHZkWFJwYkhNbktUdGNibHh1THlvcVhHNGdLaUJEYjI1bWFXY3RjM0JsWTJsbWFXTWdiV1Z5WjJVdFpuVnVZM1JwYjI0Z2QyaHBZMmdnWTNKbFlYUmxjeUJoSUc1bGR5QmpiMjVtYVdjdGIySnFaV04wWEc0Z0tpQmllU0J0WlhKbmFXNW5JSFIzYnlCamIyNW1hV2QxY21GMGFXOXVJRzlpYW1WamRITWdkRzluWlhSb1pYSXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTnZibVpwWnpGY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmpiMjVtYVdjeVhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JPWlhjZ2IySnFaV04wSUhKbGMzVnNkR2x1WnlCbWNtOXRJRzFsY21kcGJtY2dZMjl1Wm1sbk1pQjBieUJqYjI1bWFXY3hYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2JXVnlaMlZEYjI1bWFXY29ZMjl1Wm1sbk1Td2dZMjl1Wm1sbk1pa2dlMXh1SUNBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxdVpYaDBMV3hwYm1VZ2JtOHRjR0Z5WVcwdGNtVmhjM05wWjI1Y2JpQWdZMjl1Wm1sbk1pQTlJR052Ym1acFp6SWdmSHdnZTMwN1hHNGdJSFpoY2lCamIyNW1hV2NnUFNCN2ZUdGNibHh1SUNCMllYSWdkbUZzZFdWR2NtOXRRMjl1Wm1sbk1rdGxlWE1nUFNCYkozVnliQ2NzSUNkdFpYUm9iMlFuTENBblpHRjBZU2RkTzF4dUlDQjJZWElnYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsYzB0bGVYTWdQU0JiSjJobFlXUmxjbk1uTENBbllYVjBhQ2NzSUNkd2NtOTRlU2NzSUNkd1lYSmhiWE1uWFR0Y2JpQWdkbUZ5SUdSbFptRjFiSFJVYjBOdmJtWnBaekpMWlhseklEMGdXMXh1SUNBZ0lDZGlZWE5sVlZKTUp5d2dKM1J5WVc1elptOXliVkpsY1hWbGMzUW5MQ0FuZEhKaGJuTm1iM0p0VW1WemNHOXVjMlVuTENBbmNHRnlZVzF6VTJWeWFXRnNhWHBsY2ljc1hHNGdJQ0FnSjNScGJXVnZkWFFuTENBbmRHbHRaVzkxZEUxbGMzTmhaMlVuTENBbmQybDBhRU55WldSbGJuUnBZV3h6Snl3Z0oyRmtZWEIwWlhJbkxDQW5jbVZ6Y0c5dWMyVlVlWEJsSnl3Z0ozaHpjbVpEYjI5cmFXVk9ZVzFsSnl4Y2JpQWdJQ0FuZUhOeVpraGxZV1JsY2s1aGJXVW5MQ0FuYjI1VmNHeHZZV1JRY205bmNtVnpjeWNzSUNkdmJrUnZkMjVzYjJGa1VISnZaM0psYzNNbkxDQW5aR1ZqYjIxd2NtVnpjeWNzWEc0Z0lDQWdKMjFoZUVOdmJuUmxiblJNWlc1bmRHZ25MQ0FuYldGNFFtOWtlVXhsYm1kMGFDY3NJQ2R0WVhoU1pXUnBjbVZqZEhNbkxDQW5kSEpoYm5Od2IzSjBKeXdnSjJoMGRIQkJaMlZ1ZENjc1hHNGdJQ0FnSjJoMGRIQnpRV2RsYm5RbkxDQW5ZMkZ1WTJWc1ZHOXJaVzRuTENBbmMyOWphMlYwVUdGMGFDY3NJQ2R5WlhOd2IyNXpaVVZ1WTI5a2FXNW5KMXh1SUNCZE8xeHVJQ0IyWVhJZ1pHbHlaV04wVFdWeVoyVkxaWGx6SUQwZ1d5ZDJZV3hwWkdGMFpWTjBZWFIxY3lkZE8xeHVYRzRnSUdaMWJtTjBhVzl1SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFJoY21kbGRDd2djMjkxY21ObEtTQjdYRzRnSUNBZ2FXWWdLSFYwYVd4ekxtbHpVR3hoYVc1UFltcGxZM1FvZEdGeVoyVjBLU0FtSmlCMWRHbHNjeTVwYzFCc1lXbHVUMkpxWldOMEtITnZkWEpqWlNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMWRHbHNjeTV0WlhKblpTaDBZWEpuWlhRc0lITnZkWEpqWlNrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNoMWRHbHNjeTVwYzFCc1lXbHVUMkpxWldOMEtITnZkWEpqWlNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMWRHbHNjeTV0WlhKblpTaDdmU3dnYzI5MWNtTmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFYwYVd4ekxtbHpRWEp5WVhrb2MyOTFjbU5sS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhOdmRYSmpaUzV6YkdsalpTZ3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnYzI5MWNtTmxPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsY3lod2NtOXdLU0I3WEc0Z0lDQWdhV1lnS0NGMWRHbHNjeTVwYzFWdVpHVm1hVzVsWkNoamIyNW1hV2N5VzNCeWIzQmRLU2tnZTF4dUlDQWdJQ0FnWTI5dVptbG5XM0J5YjNCZElEMGdaMlYwVFdWeVoyVmtWbUZzZFdVb1kyOXVabWxuTVZ0d2NtOXdYU3dnWTI5dVptbG5NbHR3Y205d1hTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDZ2hkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9ZMjl1Wm1sbk1WdHdjbTl3WFNrcElIdGNiaUFnSUNBZ0lHTnZibVpwWjF0d2NtOXdYU0E5SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFZ1WkdWbWFXNWxaQ3dnWTI5dVptbG5NVnR3Y205d1hTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdkWFJwYkhNdVptOXlSV0ZqYUNoMllXeDFaVVp5YjIxRGIyNW1hV2N5UzJWNWN5d2dablZ1WTNScGIyNGdkbUZzZFdWR2NtOXRRMjl1Wm1sbk1paHdjbTl3S1NCN1hHNGdJQ0FnYVdZZ0tDRjFkR2xzY3k1cGMxVnVaR1ZtYVc1bFpDaGpiMjVtYVdjeVczQnliM0JkS1NrZ2UxeHVJQ0FnSUNBZ1kyOXVabWxuVzNCeWIzQmRJRDBnWjJWMFRXVnlaMlZrVm1Gc2RXVW9kVzVrWldacGJtVmtMQ0JqYjI1bWFXY3lXM0J5YjNCZEtUdGNiaUFnSUNCOVhHNGdJSDBwTzF4dVhHNGdJSFYwYVd4ekxtWnZja1ZoWTJnb2JXVnlaMlZFWldWd1VISnZjR1Z5ZEdsbGMwdGxlWE1zSUcxbGNtZGxSR1ZsY0ZCeWIzQmxjblJwWlhNcE8xeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29aR1ZtWVhWc2RGUnZRMjl1Wm1sbk1rdGxlWE1zSUdaMWJtTjBhVzl1SUdSbFptRjFiSFJVYjBOdmJtWnBaeklvY0hKdmNDa2dlMXh1SUNBZ0lHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5NbHR3Y205d1hTa3BJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0hWdVpHVm1hVzVsWkN3Z1kyOXVabWxuTWx0d2NtOXdYU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5NVnR3Y205d1hTa3BJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0hWdVpHVm1hVzVsWkN3Z1kyOXVabWxuTVZ0d2NtOXdYU2s3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibHh1SUNCMWRHbHNjeTVtYjNKRllXTm9LR1JwY21WamRFMWxjbWRsUzJWNWN5d2dablZ1WTNScGIyNGdiV1Z5WjJVb2NISnZjQ2tnZTF4dUlDQWdJR2xtSUNod2NtOXdJR2x1SUdOdmJtWnBaeklwSUh0Y2JpQWdJQ0FnSUdOdmJtWnBaMXR3Y205d1hTQTlJR2RsZEUxbGNtZGxaRlpoYkhWbEtHTnZibVpwWnpGYmNISnZjRjBzSUdOdmJtWnBaekpiY0hKdmNGMHBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9jSEp2Y0NCcGJpQmpiMjVtYVdjeEtTQjdYRzRnSUNBZ0lDQmpiMjVtYVdkYmNISnZjRjBnUFNCblpYUk5aWEpuWldSV1lXeDFaU2gxYm1SbFptbHVaV1FzSUdOdmJtWnBaekZiY0hKdmNGMHBPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNWNiaUFnZG1GeUlHRjRhVzl6UzJWNWN5QTlJSFpoYkhWbFJuSnZiVU52Ym1acFp6SkxaWGx6WEc0Z0lDQWdMbU52Ym1OaGRDaHRaWEpuWlVSbFpYQlFjbTl3WlhKMGFXVnpTMlY1Y3lsY2JpQWdJQ0F1WTI5dVkyRjBLR1JsWm1GMWJIUlViME52Ym1acFp6SkxaWGx6S1Z4dUlDQWdJQzVqYjI1allYUW9aR2x5WldOMFRXVnlaMlZMWlhsektUdGNibHh1SUNCMllYSWdiM1JvWlhKTFpYbHpJRDBnVDJKcVpXTjBYRzRnSUNBZ0xtdGxlWE1vWTI5dVptbG5NU2xjYmlBZ0lDQXVZMjl1WTJGMEtFOWlhbVZqZEM1clpYbHpLR052Ym1acFp6SXBLVnh1SUNBZ0lDNW1hV3gwWlhJb1puVnVZM1JwYjI0Z1ptbHNkR1Z5UVhocGIzTkxaWGx6S0d0bGVTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHRjRhVzl6UzJWNWN5NXBibVJsZUU5bUtHdGxlU2tnUFQwOUlDMHhPMXh1SUNBZ0lIMHBPMXh1WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvYjNSb1pYSkxaWGx6TENCdFpYSm5aVVJsWlhCUWNtOXdaWEowYVdWektUdGNibHh1SUNCeVpYUjFjbTRnWTI5dVptbG5PMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdOeVpXRjBaVVZ5Y205eUlEMGdjbVZ4ZFdseVpTZ25MaTlqY21WaGRHVkZjbkp2Y2ljcE8xeHVYRzR2S2lwY2JpQXFJRkpsYzI5c2RtVWdiM0lnY21WcVpXTjBJR0VnVUhKdmJXbHpaU0JpWVhObFpDQnZiaUJ5WlhOd2IyNXpaU0J6ZEdGMGRYTXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdjbVZ6YjJ4MlpTQkJJR1oxYm1OMGFXOXVJSFJvWVhRZ2NtVnpiMngyWlhNZ2RHaGxJSEJ5YjIxcGMyVXVYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCeVpXcGxZM1FnUVNCbWRXNWpkR2x2YmlCMGFHRjBJSEpsYW1WamRITWdkR2hsSUhCeWIyMXBjMlV1WEc0Z0tpQkFjR0Z5WVcwZ2UyOWlhbVZqZEgwZ2NtVnpjRzl1YzJVZ1ZHaGxJSEpsYzNCdmJuTmxMbHh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlITmxkSFJzWlNoeVpYTnZiSFpsTENCeVpXcGxZM1FzSUhKbGMzQnZibk5sS1NCN1hHNGdJSFpoY2lCMllXeHBaR0YwWlZOMFlYUjFjeUE5SUhKbGMzQnZibk5sTG1OdmJtWnBaeTUyWVd4cFpHRjBaVk4wWVhSMWN6dGNiaUFnYVdZZ0tDRnlaWE53YjI1elpTNXpkR0YwZFhNZ2ZId2dJWFpoYkdsa1lYUmxVM1JoZEhWeklIeDhJSFpoYkdsa1lYUmxVM1JoZEhWektISmxjM0J2Ym5ObExuTjBZWFIxY3lrcElIdGNiaUFnSUNCeVpYTnZiSFpsS0hKbGMzQnZibk5sS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCeVpXcGxZM1FvWTNKbFlYUmxSWEp5YjNJb1hHNGdJQ0FnSUNBblVtVnhkV1Z6ZENCbVlXbHNaV1FnZDJsMGFDQnpkR0YwZFhNZ1kyOWtaU0FuSUNzZ2NtVnpjRzl1YzJVdWMzUmhkSFZ6TEZ4dUlDQWdJQ0FnY21WemNHOXVjMlV1WTI5dVptbG5MRnh1SUNBZ0lDQWdiblZzYkN4Y2JpQWdJQ0FnSUhKbGMzQnZibk5sTG5KbGNYVmxjM1FzWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaVnh1SUNBZ0lDa3BPMXh1SUNCOVhHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDNWMGFXeHpKeWs3WEc1Y2JpOHFLbHh1SUNvZ1ZISmhibk5tYjNKdElIUm9aU0JrWVhSaElHWnZjaUJoSUhKbGNYVmxjM1FnYjNJZ1lTQnlaWE53YjI1elpWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZkZOMGNtbHVaMzBnWkdGMFlTQlVhR1VnWkdGMFlTQjBieUJpWlNCMGNtRnVjMlp2Y20xbFpGeHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdhR1ZoWkdWeWN5QlVhR1VnYUdWaFpHVnljeUJtYjNJZ2RHaGxJSEpsY1hWbGMzUWdiM0lnY21WemNHOXVjMlZjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGw4Um5WdVkzUnBiMjU5SUdadWN5QkJJSE5wYm1kc1pTQm1kVzVqZEdsdmJpQnZjaUJCY25KaGVTQnZaaUJtZFc1amRHbHZibk5jYmlBcUlFQnlaWFIxY201eklIc3FmU0JVYUdVZ2NtVnpkV3gwYVc1bklIUnlZVzV6Wm05eWJXVmtJR1JoZEdGY2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUIwY21GdWMyWnZjbTFFWVhSaEtHUmhkR0VzSUdobFlXUmxjbk1zSUdadWN5a2dlMXh1SUNBdkttVnpiR2x1ZENCdWJ5MXdZWEpoYlMxeVpXRnpjMmxuYmpvd0tpOWNiaUFnZFhScGJITXVabTl5UldGamFDaG1ibk1zSUdaMWJtTjBhVzl1SUhSeVlXNXpabTl5YlNobWJpa2dlMXh1SUNBZ0lHUmhkR0VnUFNCbWJpaGtZWFJoTENCb1pXRmtaWEp6S1R0Y2JpQWdmU2s3WEc1Y2JpQWdjbVYwZFhKdUlHUmhkR0U3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUwzVjBhV3h6SnlrN1hHNTJZWElnYm05eWJXRnNhWHBsU0dWaFpHVnlUbUZ0WlNBOUlISmxjWFZwY21Vb0p5NHZhR1ZzY0dWeWN5OXViM0p0WVd4cGVtVklaV0ZrWlhKT1lXMWxKeWs3WEc1Y2JuWmhjaUJFUlVaQlZVeFVYME5QVGxSRlRsUmZWRmxRUlNBOUlIdGNiaUFnSjBOdmJuUmxiblF0Vkhsd1pTYzZJQ2RoY0hCc2FXTmhkR2x2Ymk5NExYZDNkeTFtYjNKdExYVnliR1Z1WTI5a1pXUW5YRzU5TzF4dVhHNW1kVzVqZEdsdmJpQnpaWFJEYjI1MFpXNTBWSGx3WlVsbVZXNXpaWFFvYUdWaFpHVnljeXdnZG1Gc2RXVXBJSHRjYmlBZ2FXWWdLQ0YxZEdsc2N5NXBjMVZ1WkdWbWFXNWxaQ2hvWldGa1pYSnpLU0FtSmlCMWRHbHNjeTVwYzFWdVpHVm1hVzVsWkNob1pXRmtaWEp6V3lkRGIyNTBaVzUwTFZSNWNHVW5YU2twSUh0Y2JpQWdJQ0JvWldGa1pYSnpXeWREYjI1MFpXNTBMVlI1Y0dVblhTQTlJSFpoYkhWbE8xeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFJCWkdGd2RHVnlLQ2tnZTF4dUlDQjJZWElnWVdSaGNIUmxjanRjYmlBZ2FXWWdLSFI1Y0dWdlppQllUVXhJZEhSd1VtVnhkV1Z6ZENBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUh0Y2JpQWdJQ0F2THlCR2IzSWdZbkp2ZDNObGNuTWdkWE5sSUZoSVVpQmhaR0Z3ZEdWeVhHNGdJQ0FnWVdSaGNIUmxjaUE5SUhKbGNYVnBjbVVvSnk0dllXUmhjSFJsY25NdmVHaHlKeWs3WEc0Z0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlIQnliMk5sYzNNZ0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jdVkyRnNiQ2h3Y205alpYTnpLU0E5UFQwZ0oxdHZZbXBsWTNRZ2NISnZZMlZ6YzEwbktTQjdYRzRnSUNBZ0x5OGdSbTl5SUc1dlpHVWdkWE5sSUVoVVZGQWdZV1JoY0hSbGNseHVJQ0FnSUdGa1lYQjBaWElnUFNCeVpYRjFhWEpsS0NjdUwyRmtZWEIwWlhKekwyaDBkSEFuS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWVdSaGNIUmxjanRjYm4xY2JseHVkbUZ5SUdSbFptRjFiSFJ6SUQwZ2UxeHVJQ0JoWkdGd2RHVnlPaUJuWlhSRVpXWmhkV3gwUVdSaGNIUmxjaWdwTEZ4dVhHNGdJSFJ5WVc1elptOXliVkpsY1hWbGMzUTZJRnRtZFc1amRHbHZiaUIwY21GdWMyWnZjbTFTWlhGMVpYTjBLR1JoZEdFc0lHaGxZV1JsY25NcElIdGNiaUFnSUNCdWIzSnRZV3hwZW1WSVpXRmtaWEpPWVcxbEtHaGxZV1JsY25Nc0lDZEJZMk5sY0hRbktUdGNiaUFnSUNCdWIzSnRZV3hwZW1WSVpXRmtaWEpPWVcxbEtHaGxZV1JsY25Nc0lDZERiMjUwWlc1MExWUjVjR1VuS1R0Y2JpQWdJQ0JwWmlBb2RYUnBiSE11YVhOR2IzSnRSR0YwWVNoa1lYUmhLU0I4ZkZ4dUlDQWdJQ0FnZFhScGJITXVhWE5CY25KaGVVSjFabVpsY2loa1lYUmhLU0I4ZkZ4dUlDQWdJQ0FnZFhScGJITXVhWE5DZFdabVpYSW9aR0YwWVNrZ2ZIeGNiaUFnSUNBZ0lIVjBhV3h6TG1selUzUnlaV0Z0S0dSaGRHRXBJSHg4WEc0Z0lDQWdJQ0IxZEdsc2N5NXBjMFpwYkdVb1pHRjBZU2tnZkh4Y2JpQWdJQ0FnSUhWMGFXeHpMbWx6UW14dllpaGtZWFJoS1Z4dUlDQWdJQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1JoZEdFN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNoMWRHbHNjeTVwYzBGeWNtRjVRblZtWm1WeVZtbGxkeWhrWVhSaEtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHUmhkR0V1WW5WbVptVnlPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kWFJwYkhNdWFYTlZVa3hUWldGeVkyaFFZWEpoYlhNb1pHRjBZU2twSUh0Y2JpQWdJQ0FnSUhObGRFTnZiblJsYm5SVWVYQmxTV1pWYm5ObGRDaG9aV0ZrWlhKekxDQW5ZWEJ3YkdsallYUnBiMjR2ZUMxM2QzY3RabTl5YlMxMWNteGxibU52WkdWa08yTm9ZWEp6WlhROWRYUm1MVGduS1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUJrWVhSaExuUnZVM1J5YVc1bktDazdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaDFkR2xzY3k1cGMwOWlhbVZqZENoa1lYUmhLU2tnZTF4dUlDQWdJQ0FnYzJWMFEyOXVkR1Z1ZEZSNWNHVkpabFZ1YzJWMEtHaGxZV1JsY25Nc0lDZGhjSEJzYVdOaGRHbHZiaTlxYzI5dU8yTm9ZWEp6WlhROWRYUm1MVGduS1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUJLVTA5T0xuTjBjbWx1WjJsbWVTaGtZWFJoS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHUmhkR0U3WEc0Z0lIMWRMRnh1WEc0Z0lIUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObE9pQmJablZ1WTNScGIyNGdkSEpoYm5ObWIzSnRVbVZ6Y0c5dWMyVW9aR0YwWVNrZ2UxeHVJQ0FnSUM4cVpYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2pBcUwxeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ1pHRjBZU0E5UFQwZ0ozTjBjbWx1WnljcElIdGNiaUFnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUdSaGRHRWdQU0JLVTA5T0xuQmhjbk5sS0dSaGRHRXBPMXh1SUNBZ0lDQWdmU0JqWVhSamFDQW9aU2tnZXlBdktpQkpaMjV2Y21VZ0tpOGdmVnh1SUNBZ0lIMWNiaUFnSUNCeVpYUjFjbTRnWkdGMFlUdGNiaUFnZlYwc1hHNWNiaUFnTHlvcVhHNGdJQ0FxSUVFZ2RHbHRaVzkxZENCcGJpQnRhV3hzYVhObFkyOXVaSE1nZEc4Z1lXSnZjblFnWVNCeVpYRjFaWE4wTGlCSlppQnpaWFFnZEc4Z01DQW9aR1ZtWVhWc2RDa2dZVnh1SUNBZ0tpQjBhVzFsYjNWMElHbHpJRzV2ZENCamNtVmhkR1ZrTGx4dUlDQWdLaTljYmlBZ2RHbHRaVzkxZERvZ01DeGNibHh1SUNCNGMzSm1RMjl2YTJsbFRtRnRaVG9nSjFoVFVrWXRWRTlMUlU0bkxGeHVJQ0I0YzNKbVNHVmhaR1Z5VG1GdFpUb2dKMWd0V0ZOU1JpMVVUMHRGVGljc1hHNWNiaUFnYldGNFEyOXVkR1Z1ZEV4bGJtZDBhRG9nTFRFc1hHNGdJRzFoZUVKdlpIbE1aVzVuZEdnNklDMHhMRnh1WEc0Z0lIWmhiR2xrWVhSbFUzUmhkSFZ6T2lCbWRXNWpkR2x2YmlCMllXeHBaR0YwWlZOMFlYUjFjeWh6ZEdGMGRYTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2MzUmhkSFZ6SUQ0OUlESXdNQ0FtSmlCemRHRjBkWE1nUENBek1EQTdYRzRnSUgxY2JuMDdYRzVjYm1SbFptRjFiSFJ6TG1obFlXUmxjbk1nUFNCN1hHNGdJR052YlcxdmJqb2dlMXh1SUNBZ0lDZEJZMk5sY0hRbk9pQW5ZWEJ3YkdsallYUnBiMjR2YW5OdmJpd2dkR1Y0ZEM5d2JHRnBiaXdnS2k4cUoxeHVJQ0I5WEc1OU8xeHVYRzUxZEdsc2N5NW1iM0pGWVdOb0tGc25aR1ZzWlhSbEp5d2dKMmRsZENjc0lDZG9aV0ZrSjEwc0lHWjFibU4wYVc5dUlHWnZja1ZoWTJoTlpYUm9iMlJPYjBSaGRHRW9iV1YwYUc5a0tTQjdYRzRnSUdSbFptRjFiSFJ6TG1obFlXUmxjbk5iYldWMGFHOWtYU0E5SUh0OU8xeHVmU2s3WEc1Y2JuVjBhV3h6TG1admNrVmhZMmdvV3lkd2IzTjBKeXdnSjNCMWRDY3NJQ2R3WVhSamFDZGRMQ0JtZFc1amRHbHZiaUJtYjNKRllXTm9UV1YwYUc5a1YybDBhRVJoZEdFb2JXVjBhRzlrS1NCN1hHNGdJR1JsWm1GMWJIUnpMbWhsWVdSbGNuTmJiV1YwYUc5a1hTQTlJSFYwYVd4ekxtMWxjbWRsS0VSRlJrRlZURlJmUTA5T1ZFVk9WRjlVV1ZCRktUdGNibjBwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHUmxabUYxYkhSek8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJR0pwYm1Rb1ptNHNJSFJvYVhOQmNtY3BJSHRjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUhkeVlYQW9LU0I3WEc0Z0lDQWdkbUZ5SUdGeVozTWdQU0J1WlhjZ1FYSnlZWGtvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ2s3WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JoY21kekxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0JoY21kelcybGRJRDBnWVhKbmRXMWxiblJ6VzJsZE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdabTR1WVhCd2JIa29kR2hwYzBGeVp5d2dZWEpuY3lrN1hHNGdJSDA3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYm1aMWJtTjBhVzl1SUdWdVkyOWtaU2gyWVd3cElIdGNiaUFnY21WMGRYSnVJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gyWVd3cExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVelFTOW5hU3dnSnpvbktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE1qUXZaeXdnSnlRbktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE1rTXZaMmtzSUNjc0p5a3VYRzRnSUNBZ2NtVndiR0ZqWlNndkpUSXdMMmNzSUNjckp5a3VYRzRnSUNBZ2NtVndiR0ZqWlNndkpUVkNMMmRwTENBbld5Y3BMbHh1SUNBZ0lISmxjR3hoWTJVb0x5VTFSQzluYVN3Z0oxMG5LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkNkV2xzWkNCaElGVlNUQ0JpZVNCaGNIQmxibVJwYm1jZ2NHRnlZVzF6SUhSdklIUm9aU0JsYm1SY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnZFhKc0lGUm9aU0JpWVhObElHOW1JSFJvWlNCMWNtd2dLR1V1Wnk0c0lHaDBkSEE2THk5M2QzY3VaMjl2WjJ4bExtTnZiU2xjYmlBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCYmNHRnlZVzF6WFNCVWFHVWdjR0Z5WVcxeklIUnZJR0psSUdGd2NHVnVaR1ZrWEc0Z0tpQkFjbVYwZFhKdWN5QjdjM1J5YVc1bmZTQlVhR1VnWm05eWJXRjBkR1ZrSUhWeWJGeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdKMWFXeGtWVkpNS0hWeWJDd2djR0Z5WVcxekxDQndZWEpoYlhOVFpYSnBZV3hwZW1WeUtTQjdYRzRnSUM4cVpYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2pBcUwxeHVJQ0JwWmlBb0lYQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUIxY213N1hHNGdJSDFjYmx4dUlDQjJZWElnYzJWeWFXRnNhWHBsWkZCaGNtRnRjenRjYmlBZ2FXWWdLSEJoY21GdGMxTmxjbWxoYkdsNlpYSXBJSHRjYmlBZ0lDQnpaWEpwWVd4cGVtVmtVR0Z5WVcxeklEMGdjR0Z5WVcxelUyVnlhV0ZzYVhwbGNpaHdZWEpoYlhNcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0hWMGFXeHpMbWx6VlZKTVUyVmhjbU5vVUdGeVlXMXpLSEJoY21GdGN5a3BJSHRjYmlBZ0lDQnpaWEpwWVd4cGVtVmtVR0Z5WVcxeklEMGdjR0Z5WVcxekxuUnZVM1J5YVc1bktDazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdkbUZ5SUhCaGNuUnpJRDBnVzEwN1hHNWNiaUFnSUNCMWRHbHNjeTVtYjNKRllXTm9LSEJoY21GdGN5d2dablZ1WTNScGIyNGdjMlZ5YVdGc2FYcGxLSFpoYkN3Z2EyVjVLU0I3WEc0Z0lDQWdJQ0JwWmlBb2RtRnNJRDA5UFNCdWRXeHNJSHg4SUhSNWNHVnZaaUIyWVd3Z1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpRWEp5WVhrb2RtRnNLU2tnZTF4dUlDQWdJQ0FnSUNCclpYa2dQU0JyWlhrZ0t5QW5XMTBuTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZG1Gc0lEMGdXM1poYkYwN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lIVjBhV3h6TG1admNrVmhZMmdvZG1Gc0xDQm1kVzVqZEdsdmJpQndZWEp6WlZaaGJIVmxLSFlwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpSR0YwWlNoMktTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhZZ1BTQjJMblJ2U1ZOUFUzUnlhVzVuS0NrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kWFJwYkhNdWFYTlBZbXBsWTNRb2Rpa3BJSHRjYmlBZ0lDQWdJQ0FnSUNCMklEMGdTbE5QVGk1emRISnBibWRwWm5rb2RpazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY0dGeWRITXVjSFZ6YUNobGJtTnZaR1VvYTJWNUtTQXJJQ2M5SnlBcklHVnVZMjlrWlNoMktTazdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJSE5sY21saGJHbDZaV1JRWVhKaGJYTWdQU0J3WVhKMGN5NXFiMmx1S0NjbUp5azdYRzRnSUgxY2JseHVJQ0JwWmlBb2MyVnlhV0ZzYVhwbFpGQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUhaaGNpQm9ZWE5vYldGeWEwbHVaR1Y0SUQwZ2RYSnNMbWx1WkdWNFQyWW9KeU1uS1R0Y2JpQWdJQ0JwWmlBb2FHRnphRzFoY210SmJtUmxlQ0FoUFQwZ0xURXBJSHRjYmlBZ0lDQWdJSFZ5YkNBOUlIVnliQzV6YkdsalpTZ3dMQ0JvWVhOb2JXRnlhMGx1WkdWNEtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCMWNtd2dLejBnS0hWeWJDNXBibVJsZUU5bUtDYy9KeWtnUFQwOUlDMHhJRDhnSno4bklEb2dKeVluS1NBcklITmxjbWxoYkdsNlpXUlFZWEpoYlhNN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2RYSnNPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRWdibVYzSUZWU1RDQmllU0JqYjIxaWFXNXBibWNnZEdobElITndaV05wWm1sbFpDQlZVa3h6WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR0poYzJWVlVrd2dWR2hsSUdKaGMyVWdWVkpNWEc0Z0tpQkFjR0Z5WVcwZ2UzTjBjbWx1WjMwZ2NtVnNZWFJwZG1WVlVrd2dWR2hsSUhKbGJHRjBhWFpsSUZWU1RGeHVJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzBnVkdobElHTnZiV0pwYm1Wa0lGVlNURnh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHTnZiV0pwYm1WVlVreHpLR0poYzJWVlVrd3NJSEpsYkdGMGFYWmxWVkpNS1NCN1hHNGdJSEpsZEhWeWJpQnlaV3hoZEdsMlpWVlNURnh1SUNBZ0lEOGdZbUZ6WlZWU1RDNXlaWEJzWVdObEtDOWNYQzhySkM4c0lDY25LU0FySUNjdkp5QXJJSEpsYkdGMGFYWmxWVkpNTG5KbGNHeGhZMlVvTDE1Y1hDOHJMeXdnSnljcFhHNGdJQ0FnT2lCaVlYTmxWVkpNTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTkxZEdsc2N5Y3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUNoY2JpQWdkWFJwYkhNdWFYTlRkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWW9LU0EvWEc1Y2JpQWdMeThnVTNSaGJtUmhjbVFnWW5KdmQzTmxjaUJsYm5aeklITjFjSEJ2Y25RZ1pHOWpkVzFsYm5RdVkyOXZhMmxsWEc0Z0lDQWdLR1oxYm1OMGFXOXVJSE4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUhkeWFYUmxPaUJtZFc1amRHbHZiaUIzY21sMFpTaHVZVzFsTENCMllXeDFaU3dnWlhod2FYSmxjeXdnY0dGMGFDd2daRzl0WVdsdUxDQnpaV04xY21VcElIdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ1kyOXZhMmxsSUQwZ1cxMDdYRzRnSUNBZ0lDQWdJQ0FnWTI5dmEybGxMbkIxYzJnb2JtRnRaU0FySUNjOUp5QXJJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gyWVd4MVpTa3BPMXh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpUblZ0WW1WeUtHVjRjR2x5WlhNcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyOXJhV1V1Y0hWemFDZ25aWGh3YVhKbGN6MG5JQ3NnYm1WM0lFUmhkR1VvWlhod2FYSmxjeWt1ZEc5SFRWUlRkSEpwYm1jb0tTazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hWMGFXeHpMbWx6VTNSeWFXNW5LSEJoZEdncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyOXJhV1V1Y0hWemFDZ25jR0YwYUQwbklDc2djR0YwYUNrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpVM1J5YVc1bktHUnZiV0ZwYmlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmIydHBaUzV3ZFhOb0tDZGtiMjFoYVc0OUp5QXJJR1J2YldGcGJpazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hObFkzVnlaU0E5UFQwZ2RISjFaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl2YTJsbExuQjFjMmdvSjNObFkzVnlaU2NwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUdSdlkzVnRaVzUwTG1OdmIydHBaU0E5SUdOdmIydHBaUzVxYjJsdUtDYzdJQ2NwTzF4dUlDQWdJQ0FnSUNCOUxGeHVYRzRnSUNBZ0lDQWdJSEpsWVdRNklHWjFibU4wYVc5dUlISmxZV1FvYm1GdFpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhaaGNpQnRZWFJqYUNBOUlHUnZZM1Z0Wlc1MExtTnZiMnRwWlM1dFlYUmphQ2h1WlhjZ1VtVm5SWGh3S0Njb1hudzdYRnhjWEhNcUtTZ25JQ3NnYm1GdFpTQXJJQ2NwUFNoYlhqdGRLaWtuS1NrN1hHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDaHRZWFJqYUNBL0lHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHRZWFJqYUZzelhTa2dPaUJ1ZFd4c0tUdGNiaUFnSUNBZ0lDQWdmU3hjYmx4dUlDQWdJQ0FnSUNCeVpXMXZkbVU2SUdaMWJtTjBhVzl1SUhKbGJXOTJaU2h1WVcxbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NTNjbWwwWlNodVlXMWxMQ0FuSnl3Z1JHRjBaUzV1YjNjb0tTQXRJRGcyTkRBd01EQXdLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0I5S1NncElEcGNibHh1SUNBdkx5Qk9iMjRnYzNSaGJtUmhjbVFnWW5KdmQzTmxjaUJsYm5ZZ0tIZGxZaUIzYjNKclpYSnpMQ0J5WldGamRDMXVZWFJwZG1VcElHeGhZMnNnYm1WbFpHVmtJSE4xY0hCdmNuUXVYRzRnSUNBZ0tHWjFibU4wYVc5dUlHNXZibE4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUhkeWFYUmxPaUJtZFc1amRHbHZiaUIzY21sMFpTZ3BJSHQ5TEZ4dUlDQWdJQ0FnSUNCeVpXRmtPaUJtZFc1amRHbHZiaUJ5WldGa0tDa2dleUJ5WlhSMWNtNGdiblZzYkRzZ2ZTeGNiaUFnSUNBZ0lDQWdjbVZ0YjNabE9pQm1kVzVqZEdsdmJpQnlaVzF2ZG1Vb0tTQjdmVnh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlLU2dwWEc0cE8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaWE1nZDJobGRHaGxjaUIwYUdVZ2MzQmxZMmxtYVdWa0lGVlNUQ0JwY3lCaFluTnZiSFYwWlZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0IxY213Z1ZHaGxJRlZTVENCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjBhR1VnYzNCbFkybG1hV1ZrSUZWU1RDQnBjeUJoWW5OdmJIVjBaU3dnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2FYTkJZbk52YkhWMFpWVlNUQ2gxY213cElIdGNiaUFnTHk4Z1FTQlZVa3dnYVhNZ1kyOXVjMmxrWlhKbFpDQmhZbk52YkhWMFpTQnBaaUJwZENCaVpXZHBibk1nZDJsMGFDQmNJanh6WTJobGJXVStPaTh2WENJZ2IzSWdYQ0l2TDF3aUlDaHdjbTkwYjJOdmJDMXlaV3hoZEdsMlpTQlZVa3dwTGx4dUlDQXZMeUJTUmtNZ016azROaUJrWldacGJtVnpJSE5qYUdWdFpTQnVZVzFsSUdGeklHRWdjMlZ4ZFdWdVkyVWdiMllnWTJoaGNtRmpkR1Z5Y3lCaVpXZHBibTVwYm1jZ2QybDBhQ0JoSUd4bGRIUmxjaUJoYm1RZ1ptOXNiRzkzWldSY2JpQWdMeThnWW5rZ1lXNTVJR052YldKcGJtRjBhVzl1SUc5bUlHeGxkSFJsY25Nc0lHUnBaMmwwY3l3Z2NHeDFjeXdnY0dWeWFXOWtMQ0J2Y2lCb2VYQm9aVzR1WEc0Z0lISmxkSFZ5YmlBdlhpaGJZUzE2WFZ0aExYcGNYR1JjWEN0Y1hDMWNYQzVkS2pvcFAxeGNMMXhjTHk5cExuUmxjM1FvZFhKc0tUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQW9YRzRnSUhWMGFXeHpMbWx6VTNSaGJtUmhjbVJDY205M2MyVnlSVzUyS0NrZ1AxeHVYRzRnSUM4dklGTjBZVzVrWVhKa0lHSnliM2R6WlhJZ1pXNTJjeUJvWVhabElHWjFiR3dnYzNWd2NHOXlkQ0J2WmlCMGFHVWdRVkJKY3lCdVpXVmtaV1FnZEc4Z2RHVnpkRnh1SUNBdkx5QjNhR1YwYUdWeUlIUm9aU0J5WlhGMVpYTjBJRlZTVENCcGN5QnZaaUIwYUdVZ2MyRnRaU0J2Y21sbmFXNGdZWE1nWTNWeWNtVnVkQ0JzYjJOaGRHbHZiaTVjYmlBZ0lDQW9ablZ1WTNScGIyNGdjM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2tnZTF4dUlDQWdJQ0FnZG1GeUlHMXphV1VnUFNBdktHMXphV1Y4ZEhKcFpHVnVkQ2t2YVM1MFpYTjBLRzVoZG1sbllYUnZjaTUxYzJWeVFXZGxiblFwTzF4dUlDQWdJQ0FnZG1GeUlIVnliRkJoY25OcGJtZE9iMlJsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWVNjcE8xeHVJQ0FnSUNBZ2RtRnlJRzl5YVdkcGJsVlNURHRjYmx4dUlDQWdJQ0FnTHlvcVhHNGdJQ0FnS2lCUVlYSnpaU0JoSUZWU1RDQjBieUJrYVhOamIzWmxjaUJwZENkeklHTnZiWEJ2Ym1WdWRITmNiaUFnSUNBcVhHNGdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnZFhKc0lGUm9aU0JWVWt3Z2RHOGdZbVVnY0dGeWMyVmtYRzRnSUNBZ0tpQkFjbVYwZFhKdWN5QjdUMkpxWldOMGZWeHVJQ0FnSUNvdlhHNGdJQ0FnSUNCbWRXNWpkR2x2YmlCeVpYTnZiSFpsVlZKTUtIVnliQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdhSEpsWmlBOUlIVnliRHRjYmx4dUlDQWdJQ0FnSUNCcFppQW9iWE5wWlNrZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJKUlNCdVpXVmtjeUJoZEhSeWFXSjFkR1VnYzJWMElIUjNhV05sSUhSdklHNXZjbTFoYkdsNlpTQndjbTl3WlhKMGFXVnpYRzRnSUNBZ0lDQWdJQ0FnZFhKc1VHRnljMmx1WjA1dlpHVXVjMlYwUVhSMGNtbGlkWFJsS0Nkb2NtVm1KeXdnYUhKbFppazdYRzRnSUNBZ0lDQWdJQ0FnYUhKbFppQTlJSFZ5YkZCaGNuTnBibWRPYjJSbExtaHlaV1k3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQjFjbXhRWVhKemFXNW5UbTlrWlM1elpYUkJkSFJ5YVdKMWRHVW9KMmh5WldZbkxDQm9jbVZtS1R0Y2JseHVJQ0FnSUNBZ0lDQXZMeUIxY214UVlYSnphVzVuVG05a1pTQndjbTkyYVdSbGN5QjBhR1VnVlhKc1ZYUnBiSE1nYVc1MFpYSm1ZV05sSUMwZ2FIUjBjRG92TDNWeWJDNXpjR1ZqTG5kb1lYUjNaeTV2Y21jdkkzVnliSFYwYVd4elhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNBZ0lDQWdhSEpsWmpvZ2RYSnNVR0Z5YzJsdVowNXZaR1V1YUhKbFppeGNiaUFnSUNBZ0lDQWdJQ0J3Y205MGIyTnZiRG9nZFhKc1VHRnljMmx1WjA1dlpHVXVjSEp2ZEc5amIyd2dQeUIxY214UVlYSnphVzVuVG05a1pTNXdjbTkwYjJOdmJDNXlaWEJzWVdObEtDODZKQzhzSUNjbktTQTZJQ2NuTEZ4dUlDQWdJQ0FnSUNBZ0lHaHZjM1E2SUhWeWJGQmhjbk5wYm1kT2IyUmxMbWh2YzNRc1hHNGdJQ0FnSUNBZ0lDQWdjMlZoY21Ob09pQjFjbXhRWVhKemFXNW5UbTlrWlM1elpXRnlZMmdnUHlCMWNteFFZWEp6YVc1blRtOWtaUzV6WldGeVkyZ3VjbVZ3YkdGalpTZ3ZYbHhjUHk4c0lDY25LU0E2SUNjbkxGeHVJQ0FnSUNBZ0lDQWdJR2hoYzJnNklIVnliRkJoY25OcGJtZE9iMlJsTG1oaGMyZ2dQeUIxY214UVlYSnphVzVuVG05a1pTNW9ZWE5vTG5KbGNHeGhZMlVvTDE0akx5d2dKeWNwSURvZ0p5Y3NYRzRnSUNBZ0lDQWdJQ0FnYUc5emRHNWhiV1U2SUhWeWJGQmhjbk5wYm1kT2IyUmxMbWh2YzNSdVlXMWxMRnh1SUNBZ0lDQWdJQ0FnSUhCdmNuUTZJSFZ5YkZCaGNuTnBibWRPYjJSbExuQnZjblFzWEc0Z0lDQWdJQ0FnSUNBZ2NHRjBhRzVoYldVNklDaDFjbXhRWVhKemFXNW5UbTlrWlM1d1lYUm9ibUZ0WlM1amFHRnlRWFFvTUNrZ1BUMDlJQ2N2SnlrZ1AxeHVJQ0FnSUNBZ0lDQWdJQ0FnZFhKc1VHRnljMmx1WjA1dlpHVXVjR0YwYUc1aGJXVWdPbHh1SUNBZ0lDQWdJQ0FnSUNBZ0p5OG5JQ3NnZFhKc1VHRnljMmx1WjA1dlpHVXVjR0YwYUc1aGJXVmNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYjNKcFoybHVWVkpNSUQwZ2NtVnpiMngyWlZWU1RDaDNhVzVrYjNjdWJHOWpZWFJwYjI0dWFISmxaaWs3WEc1Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnVlZKTUlITm9ZWEpsY3lCMGFHVWdjMkZ0WlNCdmNtbG5hVzRnWVhNZ2RHaGxJR04xY25KbGJuUWdiRzlqWVhScGIyNWNiaUFnSUNBcVhHNGdJQ0FnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnY21WeGRXVnpkRlZTVENCVWFHVWdWVkpNSUhSdklIUmxjM1JjYmlBZ0lDQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JRlZTVENCemFHRnlaWE1nZEdobElITmhiV1VnYjNKcFoybHVMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFnSUNBcUwxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUdselZWSk1VMkZ0WlU5eWFXZHBiaWh5WlhGMVpYTjBWVkpNS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ3WVhKelpXUWdQU0FvZFhScGJITXVhWE5UZEhKcGJtY29jbVZ4ZFdWemRGVlNUQ2twSUQ4Z2NtVnpiMngyWlZWU1RDaHlaWEYxWlhOMFZWSk1LU0E2SUhKbGNYVmxjM1JWVWt3N1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlBb2NHRnljMlZrTG5CeWIzUnZZMjlzSUQwOVBTQnZjbWxuYVc1VlVrd3VjSEp2ZEc5amIyd2dKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lIQmhjbk5sWkM1b2IzTjBJRDA5UFNCdmNtbG5hVzVWVWt3dWFHOXpkQ2s3WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJSDBwS0NrZ09seHVYRzRnSUM4dklFNXZiaUJ6ZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZG5NZ0tIZGxZaUIzYjNKclpYSnpMQ0J5WldGamRDMXVZWFJwZG1VcElHeGhZMnNnYm1WbFpHVmtJSE4xY0hCdmNuUXVYRzRnSUNBZ0tHWjFibU4wYVc5dUlHNXZibE4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtZFc1amRHbHZiaUJwYzFWU1RGTmhiV1ZQY21sbmFXNG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOUtTZ3BYRzRwTzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1TGk5MWRHbHNjeWNwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHNXZjbTFoYkdsNlpVaGxZV1JsY2s1aGJXVW9hR1ZoWkdWeWN5d2dibTl5YldGc2FYcGxaRTVoYldVcElIdGNiaUFnZFhScGJITXVabTl5UldGamFDaG9aV0ZrWlhKekxDQm1kVzVqZEdsdmJpQndjbTlqWlhOelNHVmhaR1Z5S0haaGJIVmxMQ0J1WVcxbEtTQjdYRzRnSUNBZ2FXWWdLRzVoYldVZ0lUMDlJRzV2Y20xaGJHbDZaV1JPWVcxbElDWW1JRzVoYldVdWRHOVZjSEJsY2tOaGMyVW9LU0E5UFQwZ2JtOXliV0ZzYVhwbFpFNWhiV1V1ZEc5VmNIQmxja05oYzJVb0tTa2dlMXh1SUNBZ0lDQWdhR1ZoWkdWeWMxdHViM0p0WVd4cGVtVmtUbUZ0WlYwZ1BTQjJZV3gxWlR0Y2JpQWdJQ0FnSUdSbGJHVjBaU0JvWldGa1pYSnpXMjVoYldWZE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYmk4dklFaGxZV1JsY25NZ2QyaHZjMlVnWkhWd2JHbGpZWFJsY3lCaGNtVWdhV2R1YjNKbFpDQmllU0J1YjJSbFhHNHZMeUJqTG1ZdUlHaDBkSEJ6T2k4dmJtOWtaV3B6TG05eVp5OWhjR2t2YUhSMGNDNW9kRzFzSTJoMGRIQmZiV1Z6YzJGblpWOW9aV0ZrWlhKelhHNTJZWElnYVdkdWIzSmxSSFZ3YkdsallYUmxUMllnUFNCYlhHNGdJQ2RoWjJVbkxDQW5ZWFYwYUc5eWFYcGhkR2x2Ymljc0lDZGpiMjUwWlc1MExXeGxibWQwYUNjc0lDZGpiMjUwWlc1MExYUjVjR1VuTENBblpYUmhaeWNzWEc0Z0lDZGxlSEJwY21Wekp5d2dKMlp5YjIwbkxDQW5hRzl6ZENjc0lDZHBaaTF0YjJScFptbGxaQzF6YVc1alpTY3NJQ2RwWmkxMWJtMXZaR2xtYVdWa0xYTnBibU5sSnl4Y2JpQWdKMnhoYzNRdGJXOWthV1pwWldRbkxDQW5iRzlqWVhScGIyNG5MQ0FuYldGNExXWnZjbmRoY21Sekp5d2dKM0J5YjNoNUxXRjFkR2h2Y21sNllYUnBiMjRuTEZ4dUlDQW5jbVZtWlhKbGNpY3NJQ2R5WlhSeWVTMWhablJsY2ljc0lDZDFjMlZ5TFdGblpXNTBKMXh1WFR0Y2JseHVMeW9xWEc0Z0tpQlFZWEp6WlNCb1pXRmtaWEp6SUdsdWRHOGdZVzRnYjJKcVpXTjBYRzRnS2x4dUlDb2dZR0JnWEc0Z0tpQkVZWFJsT2lCWFpXUXNJREkzSUVGMVp5QXlNREUwSURBNE9qVTRPalE1SUVkTlZGeHVJQ29nUTI5dWRHVnVkQzFVZVhCbE9pQmhjSEJzYVdOaGRHbHZiaTlxYzI5dVhHNGdLaUJEYjI1dVpXTjBhVzl1T2lCclpXVndMV0ZzYVhabFhHNGdLaUJVY21GdWMyWmxjaTFGYm1OdlpHbHVaem9nWTJoMWJtdGxaRnh1SUNvZ1lHQmdYRzRnS2x4dUlDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHaGxZV1JsY25NZ1NHVmhaR1Z5Y3lCdVpXVmthVzVuSUhSdklHSmxJSEJoY25ObFpGeHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnU0dWaFpHVnljeUJ3WVhKelpXUWdhVzUwYnlCaGJpQnZZbXBsWTNSY2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJ3WVhKelpVaGxZV1JsY25Nb2FHVmhaR1Z5Y3lrZ2UxeHVJQ0IyWVhJZ2NHRnljMlZrSUQwZ2UzMDdYRzRnSUhaaGNpQnJaWGs3WEc0Z0lIWmhjaUIyWVd3N1hHNGdJSFpoY2lCcE8xeHVYRzRnSUdsbUlDZ2hhR1ZoWkdWeWN5a2dleUJ5WlhSMWNtNGdjR0Z5YzJWa095QjlYRzVjYmlBZ2RYUnBiSE11Wm05eVJXRmphQ2hvWldGa1pYSnpMbk53YkdsMEtDZGNYRzRuS1N3Z1puVnVZM1JwYjI0Z2NHRnljMlZ5S0d4cGJtVXBJSHRjYmlBZ0lDQnBJRDBnYkdsdVpTNXBibVJsZUU5bUtDYzZKeWs3WEc0Z0lDQWdhMlY1SUQwZ2RYUnBiSE11ZEhKcGJTaHNhVzVsTG5OMVluTjBjaWd3TENCcEtTa3VkRzlNYjNkbGNrTmhjMlVvS1R0Y2JpQWdJQ0IyWVd3Z1BTQjFkR2xzY3k1MGNtbHRLR3hwYm1VdWMzVmljM1J5S0drZ0t5QXhLU2s3WEc1Y2JpQWdJQ0JwWmlBb2EyVjVLU0I3WEc0Z0lDQWdJQ0JwWmlBb2NHRnljMlZrVzJ0bGVWMGdKaVlnYVdkdWIzSmxSSFZ3YkdsallYUmxUMll1YVc1a1pYaFBaaWhyWlhrcElENDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnYVdZZ0tHdGxlU0E5UFQwZ0ozTmxkQzFqYjI5cmFXVW5LU0I3WEc0Z0lDQWdJQ0FnSUhCaGNuTmxaRnRyWlhsZElEMGdLSEJoY25ObFpGdHJaWGxkSUQ4Z2NHRnljMlZrVzJ0bGVWMGdPaUJiWFNrdVkyOXVZMkYwS0Z0MllXeGRLVHRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJSEJoY25ObFpGdHJaWGxkSUQwZ2NHRnljMlZrVzJ0bGVWMGdQeUJ3WVhKelpXUmJhMlY1WFNBcklDY3NJQ2NnS3lCMllXd2dPaUIyWVd3N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlLVHRjYmx4dUlDQnlaWFIxY200Z2NHRnljMlZrTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1THlvcVhHNGdLaUJUZVc1MFlXTjBhV01nYzNWbllYSWdabTl5SUdsdWRtOXJhVzVuSUdFZ1puVnVZM1JwYjI0Z1lXNWtJR1Y0Y0dGdVpHbHVaeUJoYmlCaGNuSmhlU0JtYjNJZ1lYSm5kVzFsYm5SekxseHVJQ3BjYmlBcUlFTnZiVzF2YmlCMWMyVWdZMkZ6WlNCM2IzVnNaQ0JpWlNCMGJ5QjFjMlVnWUVaMWJtTjBhVzl1TG5CeWIzUnZkSGx3WlM1aGNIQnNlV0F1WEc0Z0tseHVJQ29nSUdCZ1lHcHpYRzRnS2lBZ1puVnVZM1JwYjI0Z1ppaDRMQ0I1TENCNktTQjdmVnh1SUNvZ0lIWmhjaUJoY21keklEMGdXekVzSURJc0lETmRPMXh1SUNvZ0lHWXVZWEJ3Ykhrb2JuVnNiQ3dnWVhKbmN5azdYRzRnS2lBZ1lHQmdYRzRnS2x4dUlDb2dWMmwwYUNCZ2MzQnlaV0ZrWUNCMGFHbHpJR1Y0WVcxd2JHVWdZMkZ1SUdKbElISmxMWGR5YVhSMFpXNHVYRzRnS2x4dUlDb2dJR0JnWUdwelhHNGdLaUFnYzNCeVpXRmtLR1oxYm1OMGFXOXVLSGdzSUhrc0lIb3BJSHQ5S1NoYk1Td2dNaXdnTTEwcE8xeHVJQ29nSUdCZ1lGeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHTmhiR3hpWVdOclhHNGdLaUJBY21WMGRYSnVjeUI3Um5WdVkzUnBiMjU5WEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdjM0J5WldGa0tHTmhiR3hpWVdOcktTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaUIzY21Gd0tHRnljaWtnZTF4dUlDQWdJSEpsZEhWeWJpQmpZV3hzWW1GamF5NWhjSEJzZVNodWRXeHNMQ0JoY25JcE8xeHVJQ0I5TzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlHSnBibVFnUFNCeVpYRjFhWEpsS0NjdUwyaGxiSEJsY25NdlltbHVaQ2NwTzF4dVhHNHZLbWRzYjJKaGJDQjBiMU4wY21sdVp6cDBjblZsS2k5Y2JseHVMeThnZFhScGJITWdhWE1nWVNCc2FXSnlZWEo1SUc5bUlHZGxibVZ5YVdNZ2FHVnNjR1Z5SUdaMWJtTjBhVzl1Y3lCdWIyNHRjM0JsWTJsbWFXTWdkRzhnWVhocGIzTmNibHh1ZG1GeUlIUnZVM1J5YVc1bklEMGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp6dGNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhiaUJCY25KaGVWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdGdUlFRnljbUY1TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5CY25KaGVTaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQTlQVDBnSjF0dlltcGxZM1FnUVhKeVlYbGRKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCMWJtUmxabWx1WldSY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIwYUdVZ2RtRnNkV1VnYVhNZ2RXNWtaV1pwYm1Wa0xDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOVmJtUmxabWx1WldRb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnZG1Gc0lEMDlQU0FuZFc1a1pXWnBibVZrSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRUoxWm1abGNseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1FuVm1abVZ5TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5DZFdabVpYSW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjJZV3dnSVQwOUlHNTFiR3dnSmlZZ0lXbHpWVzVrWldacGJtVmtLSFpoYkNrZ0ppWWdkbUZzTG1OdmJuTjBjblZqZEc5eUlDRTlQU0J1ZFd4c0lDWW1JQ0ZwYzFWdVpHVm1hVzVsWkNoMllXd3VZMjl1YzNSeWRXTjBiM0lwWEc0Z0lDQWdKaVlnZEhsd1pXOW1JSFpoYkM1amIyNXpkSEoxWTNSdmNpNXBjMEoxWm1abGNpQTlQVDBnSjJaMWJtTjBhVzl1SnlBbUppQjJZV3d1WTI5dWMzUnlkV04wYjNJdWFYTkNkV1ptWlhJb2RtRnNLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaGJpQkJjbkpoZVVKMVptWmxjbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRnVJRUZ5Y21GNVFuVm1abVZ5TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5CY25KaGVVSjFabVpsY2loMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzS1NBOVBUMGdKMXR2WW1wbFkzUWdRWEp5WVhsQ2RXWm1aWEpkSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRVp2Y20xRVlYUmhYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lXNGdSbTl5YlVSaGRHRXNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMwWnZjbTFFWVhSaEtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z0tIUjVjR1Z2WmlCR2IzSnRSR0YwWVNBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUNZbUlDaDJZV3dnYVc1emRHRnVZMlZ2WmlCR2IzSnRSR0YwWVNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdkbUZzZFdVZ2FYTWdZU0IyYVdWM0lHOXVJR0Z1SUVGeWNtRjVRblZtWm1WeVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCMmFXVjNJRzl1SUdGdUlFRnljbUY1UW5WbVptVnlMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVVKMVptWmxjbFpwWlhjb2RtRnNLU0I3WEc0Z0lIWmhjaUJ5WlhOMWJIUTdYRzRnSUdsbUlDZ29kSGx3Wlc5bUlFRnljbUY1UW5WbVptVnlJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dKaVlnS0VGeWNtRjVRblZtWm1WeUxtbHpWbWxsZHlrcElIdGNiaUFnSUNCeVpYTjFiSFFnUFNCQmNuSmhlVUoxWm1abGNpNXBjMVpwWlhjb2RtRnNLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J5WlhOMWJIUWdQU0FvZG1Gc0tTQW1KaUFvZG1Gc0xtSjFabVpsY2lrZ0ppWWdLSFpoYkM1aWRXWm1aWElnYVc1emRHRnVZMlZ2WmlCQmNuSmhlVUoxWm1abGNpazdYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRk4wY21sdVoxeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1UzUnlhVzVuTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5UZEhKcGJtY29kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmMzUnlhVzVuSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRTUxYldKbGNseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1RuVnRZbVZ5TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5PZFcxaVpYSW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmJuVnRZbVZ5Snp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhiaUJQWW1wbFkzUmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2RtRnNJRlJvWlNCMllXeDFaU0IwYnlCMFpYTjBYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCMllXeDFaU0JwY3lCaGJpQlBZbXBsWTNRc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzA5aWFtVmpkQ2gyWVd3cElIdGNiaUFnY21WMGRYSnVJSFpoYkNBaFBUMGdiblZzYkNBbUppQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmIySnFaV04wSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJSEJzWVdsdUlFOWlhbVZqZEZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNGdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0J3YkdGcGJpQlBZbXBsWTNRc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzFCc1lXbHVUMkpxWldOMEtIWmhiQ2tnZTF4dUlDQnBaaUFvZEc5VGRISnBibWN1WTJGc2JDaDJZV3dwSUNFOVBTQW5XMjlpYW1WamRDQlBZbXBsWTNSZEp5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVYRzRnSUhaaGNpQndjbTkwYjNSNWNHVWdQU0JQWW1wbFkzUXVaMlYwVUhKdmRHOTBlWEJsVDJZb2RtRnNLVHRjYmlBZ2NtVjBkWEp1SUhCeWIzUnZkSGx3WlNBOVBUMGdiblZzYkNCOGZDQndjbTkwYjNSNWNHVWdQVDA5SUU5aWFtVmpkQzV3Y205MGIzUjVjR1U3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkVZWFJsWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JFWVhSbExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhORVlYUmxLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCRVlYUmxYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkdhV3hsWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JHYVd4bExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOR2FXeGxLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCR2FXeGxYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkNiRzlpWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JDYkc5aUxDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOQ2JHOWlLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCQ2JHOWlYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkdkVzVqZEdsdmJseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1JuVnVZM1JwYjI0c0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBaMWJtTjBhVzl1S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEc5VGRISnBibWN1WTJGc2JDaDJZV3dwSUQwOVBTQW5XMjlpYW1WamRDQkdkVzVqZEdsdmJsMG5PMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1UzUnlaV0Z0WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JUZEhKbFlXMHNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMxTjBjbVZoYlNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUdselQySnFaV04wS0haaGJDa2dKaVlnYVhOR2RXNWpkR2x2YmloMllXd3VjR2x3WlNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdkbUZzZFdVZ2FYTWdZU0JWVWt4VFpXRnlZMmhRWVhKaGJYTWdiMkpxWldOMFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCVlVreFRaV0Z5WTJoUVlYSmhiWE1nYjJKcVpXTjBMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTlZVa3hUWldGeVkyaFFZWEpoYlhNb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnVlZKTVUyVmhjbU5vVUdGeVlXMXpJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUIyWVd3Z2FXNXpkR0Z1WTJWdlppQlZVa3hUWldGeVkyaFFZWEpoYlhNN1hHNTlYRzVjYmk4cUtseHVJQ29nVkhKcGJTQmxlR05sYzNNZ2QyaHBkR1Z6Y0dGalpTQnZabVlnZEdobElHSmxaMmx1Ym1sdVp5QmhibVFnWlc1a0lHOW1JR0VnYzNSeWFXNW5YRzRnS2x4dUlDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITjBjaUJVYUdVZ1UzUnlhVzVuSUhSdklIUnlhVzFjYmlBcUlFQnlaWFIxY201eklIdFRkSEpwYm1kOUlGUm9aU0JUZEhKcGJtY2dabkpsWldRZ2IyWWdaWGhqWlhOeklIZG9hWFJsYzNCaFkyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2RISnBiU2h6ZEhJcElIdGNiaUFnY21WMGRYSnVJSE4wY2k1eVpYQnNZV05sS0M5ZVhGeHpLaThzSUNjbktTNXlaWEJzWVdObEtDOWNYSE1xSkM4c0lDY25LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnZDJVbmNtVWdjblZ1Ym1sdVp5QnBiaUJoSUhOMFlXNWtZWEprSUdKeWIzZHpaWElnWlc1MmFYSnZibTFsYm5SY2JpQXFYRzRnS2lCVWFHbHpJR0ZzYkc5M2N5QmhlR2x2Y3lCMGJ5QnlkVzRnYVc0Z1lTQjNaV0lnZDI5eWEyVnlMQ0JoYm1RZ2NtVmhZM1F0Ym1GMGFYWmxMbHh1SUNvZ1FtOTBhQ0JsYm5acGNtOXViV1Z1ZEhNZ2MzVndjRzl5ZENCWVRVeElkSFJ3VW1WeGRXVnpkQ3dnWW5WMElHNXZkQ0JtZFd4c2VTQnpkR0Z1WkdGeVpDQm5iRzlpWVd4ekxseHVJQ3BjYmlBcUlIZGxZaUIzYjNKclpYSnpPbHh1SUNvZ0lIUjVjR1Z2WmlCM2FXNWtiM2NnTFQ0Z2RXNWtaV1pwYm1Wa1hHNGdLaUFnZEhsd1pXOW1JR1J2WTNWdFpXNTBJQzArSUhWdVpHVm1hVzVsWkZ4dUlDcGNiaUFxSUhKbFlXTjBMVzVoZEdsMlpUcGNiaUFxSUNCdVlYWnBaMkYwYjNJdWNISnZaSFZqZENBdFBpQW5VbVZoWTNST1lYUnBkbVVuWEc0Z0tpQnVZWFJwZG1WelkzSnBjSFJjYmlBcUlDQnVZWFpwWjJGMGIzSXVjSEp2WkhWamRDQXRQaUFuVG1GMGFYWmxVMk55YVhCMEp5QnZjaUFuVGxNblhHNGdLaTljYm1aMWJtTjBhVzl1SUdselUzUmhibVJoY21SQ2NtOTNjMlZ5Ulc1MktDa2dlMXh1SUNCcFppQW9kSGx3Wlc5bUlHNWhkbWxuWVhSdmNpQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdLRzVoZG1sbllYUnZjaTV3Y205a2RXTjBJRDA5UFNBblVtVmhZM1JPWVhScGRtVW5JSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYm1GMmFXZGhkRzl5TG5CeWIyUjFZM1FnUFQwOUlDZE9ZWFJwZG1WVFkzSnBjSFFuSUh4OFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JtRjJhV2RoZEc5eUxuQnliMlIxWTNRZ1BUMDlJQ2RPVXljcEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQW9YRzRnSUNBZ2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVpjYmlBZ0lDQjBlWEJsYjJZZ1pHOWpkVzFsYm5RZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1NYUmxjbUYwWlNCdmRtVnlJR0Z1SUVGeWNtRjVJRzl5SUdGdUlFOWlhbVZqZENCcGJuWnZhMmx1WnlCaElHWjFibU4wYVc5dUlHWnZjaUJsWVdOb0lHbDBaVzB1WEc0Z0tseHVJQ29nU1dZZ1lHOWlhbUFnYVhNZ1lXNGdRWEp5WVhrZ1kyRnNiR0poWTJzZ2QybHNiQ0JpWlNCallXeHNaV1FnY0dGemMybHVaMXh1SUNvZ2RHaGxJSFpoYkhWbExDQnBibVJsZUN3Z1lXNWtJR052YlhCc1pYUmxJR0Z5Y21GNUlHWnZjaUJsWVdOb0lHbDBaVzB1WEc0Z0tseHVJQ29nU1dZZ0oyOWlhaWNnYVhNZ1lXNGdUMkpxWldOMElHTmhiR3hpWVdOcklIZHBiR3dnWW1VZ1kyRnNiR1ZrSUhCaGMzTnBibWRjYmlBcUlIUm9aU0IyWVd4MVpTd2dhMlY1TENCaGJtUWdZMjl0Y0d4bGRHVWdiMkpxWldOMElHWnZjaUJsWVdOb0lIQnliM0JsY25SNUxseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZkVGeWNtRjVmU0J2WW1vZ1ZHaGxJRzlpYW1WamRDQjBieUJwZEdWeVlYUmxYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWJpQlVhR1VnWTJGc2JHSmhZMnNnZEc4Z2FXNTJiMnRsSUdadmNpQmxZV05vSUdsMFpXMWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ptOXlSV0ZqYUNodlltb3NJR1p1S1NCN1hHNGdJQzh2SUVSdmJpZDBJR0p2ZEdobGNpQnBaaUJ1YnlCMllXeDFaU0J3Y205MmFXUmxaRnh1SUNCcFppQW9iMkpxSUQwOVBTQnVkV3hzSUh4OElIUjVjR1Z2WmlCdlltb2dQVDA5SUNkMWJtUmxabWx1WldRbktTQjdYRzRnSUNBZ2NtVjBkWEp1TzF4dUlDQjlYRzVjYmlBZ0x5OGdSbTl5WTJVZ1lXNGdZWEp5WVhrZ2FXWWdibTkwSUdGc2NtVmhaSGtnYzI5dFpYUm9hVzVuSUdsMFpYSmhZbXhsWEc0Z0lHbG1JQ2gwZVhCbGIyWWdiMkpxSUNFOVBTQW5iMkpxWldOMEp5a2dlMXh1SUNBZ0lDOHFaWE5zYVc1MElHNXZMWEJoY21GdExYSmxZWE56YVdkdU9qQXFMMXh1SUNBZ0lHOWlhaUE5SUZ0dlltcGRPMXh1SUNCOVhHNWNiaUFnYVdZZ0tHbHpRWEp5WVhrb2IySnFLU2tnZTF4dUlDQWdJQzh2SUVsMFpYSmhkR1VnYjNabGNpQmhjbkpoZVNCMllXeDFaWE5jYmlBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2JDQTlJRzlpYWk1c1pXNW5kR2c3SUdrZ1BDQnNPeUJwS3lzcElIdGNiaUFnSUNBZ0lHWnVMbU5oYkd3b2JuVnNiQ3dnYjJKcVcybGRMQ0JwTENCdlltb3BPMXh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQXZMeUJKZEdWeVlYUmxJRzkyWlhJZ2IySnFaV04wSUd0bGVYTmNiaUFnSUNCbWIzSWdLSFpoY2lCclpYa2dhVzRnYjJKcUtTQjdYRzRnSUNBZ0lDQnBaaUFvVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzVvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0c5aWFpd2dhMlY1S1NrZ2UxeHVJQ0FnSUNBZ0lDQm1iaTVqWVd4c0tHNTFiR3dzSUc5aWFsdHJaWGxkTENCclpYa3NJRzlpYWlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FXTmpaWEIwY3lCMllYSmhjbWR6SUdWNGNHVmpkR2x1WnlCbFlXTm9JR0Z5WjNWdFpXNTBJSFJ2SUdKbElHRnVJRzlpYW1WamRDd2dkR2hsYmx4dUlDb2dhVzF0ZFhSaFlteDVJRzFsY21kbGN5QjBhR1VnY0hKdmNHVnlkR2xsY3lCdlppQmxZV05vSUc5aWFtVmpkQ0JoYm1RZ2NtVjBkWEp1Y3lCeVpYTjFiSFF1WEc0Z0tseHVJQ29nVjJobGJpQnRkV3gwYVhCc1pTQnZZbXBsWTNSeklHTnZiblJoYVc0Z2RHaGxJSE5oYldVZ2EyVjVJSFJvWlNCc1lYUmxjaUJ2WW1wbFkzUWdhVzVjYmlBcUlIUm9aU0JoY21kMWJXVnVkSE1nYkdsemRDQjNhV3hzSUhSaGEyVWdjSEpsWTJWa1pXNWpaUzVjYmlBcVhHNGdLaUJGZUdGdGNHeGxPbHh1SUNwY2JpQXFJR0JnWUdwelhHNGdLaUIyWVhJZ2NtVnpkV3gwSUQwZ2JXVnlaMlVvZTJadmJ6b2dNVEl6ZlN3Z2UyWnZiem9nTkRVMmZTazdYRzRnS2lCamIyNXpiMnhsTG14dlp5aHlaWE4xYkhRdVptOXZLVHNnTHk4Z2IzVjBjSFYwY3lBME5UWmNiaUFxSUdCZ1lGeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdlltb3hJRTlpYW1WamRDQjBieUJ0WlhKblpWeHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WemRXeDBJRzltSUdGc2JDQnRaWEpuWlNCd2NtOXdaWEowYVdWelhHNGdLaTljYm1aMWJtTjBhVzl1SUcxbGNtZGxLQzhxSUc5aWFqRXNJRzlpYWpJc0lHOWlhak1zSUM0dUxpQXFMeWtnZTF4dUlDQjJZWElnY21WemRXeDBJRDBnZTMwN1hHNGdJR1oxYm1OMGFXOXVJR0Z6YzJsbmJsWmhiSFZsS0haaGJDd2dhMlY1S1NCN1hHNGdJQ0FnYVdZZ0tHbHpVR3hoYVc1UFltcGxZM1FvY21WemRXeDBXMnRsZVYwcElDWW1JR2x6VUd4aGFXNVBZbXBsWTNRb2RtRnNLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBXMnRsZVYwZ1BTQnRaWEpuWlNoeVpYTjFiSFJiYTJWNVhTd2dkbUZzS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dselVHeGhhVzVQWW1wbFkzUW9kbUZzS1NrZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwVzJ0bGVWMGdQU0J0WlhKblpTaDdmU3dnZG1Gc0tUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHbHpRWEp5WVhrb2RtRnNLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBXMnRsZVYwZ1BTQjJZV3d1YzJ4cFkyVW9LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwVzJ0bGVWMGdQU0IyWVd3N1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUd3Z1BTQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBJRHdnYkRzZ2FTc3JLU0I3WEc0Z0lDQWdabTl5UldGamFDaGhjbWQxYldWdWRITmJhVjBzSUdGemMybG5ibFpoYkhWbEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVY0ZEdWdVpITWdiMkpxWldOMElHRWdZbmtnYlhWMFlXSnNlU0JoWkdScGJtY2dkRzhnYVhRZ2RHaGxJSEJ5YjNCbGNuUnBaWE1nYjJZZ2IySnFaV04wSUdJdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdFZ1ZHaGxJRzlpYW1WamRDQjBieUJpWlNCbGVIUmxibVJsWkZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHSWdWR2hsSUc5aWFtVmpkQ0IwYnlCamIzQjVJSEJ5YjNCbGNuUnBaWE1nWm5KdmJWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFJvYVhOQmNtY2dWR2hsSUc5aWFtVmpkQ0IwYnlCaWFXNWtJR1oxYm1OMGFXOXVJSFJ2WEc0Z0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOUlGUm9aU0J5WlhOMWJIUnBibWNnZG1Gc2RXVWdiMllnYjJKcVpXTjBJR0ZjYmlBcUwxeHVablZ1WTNScGIyNGdaWGgwWlc1a0tHRXNJR0lzSUhSb2FYTkJjbWNwSUh0Y2JpQWdabTl5UldGamFDaGlMQ0JtZFc1amRHbHZiaUJoYzNOcFoyNVdZV3gxWlNoMllXd3NJR3RsZVNrZ2UxeHVJQ0FnSUdsbUlDaDBhR2x6UVhKbklDWW1JSFI1Y0dWdlppQjJZV3dnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJR0ZiYTJWNVhTQTlJR0pwYm1Rb2RtRnNMQ0IwYUdselFYSm5LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ1lWdHJaWGxkSUQwZ2RtRnNPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQmhPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGSmxiVzkyWlNCaWVYUmxJRzl5WkdWeUlHMWhjbXRsY2k0Z1ZHaHBjeUJqWVhSamFHVnpJRVZHSUVKQ0lFSkdJQ2gwYUdVZ1ZWUkdMVGdnUWs5TktWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCamIyNTBaVzUwSUhkcGRHZ2dRazlOWEc0Z0tpQkFjbVYwZFhKdUlIdHpkSEpwYm1kOUlHTnZiblJsYm5RZ2RtRnNkV1VnZDJsMGFHOTFkQ0JDVDAxY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYzNSeWFYQkNUMDBvWTI5dWRHVnVkQ2tnZTF4dUlDQnBaaUFvWTI5dWRHVnVkQzVqYUdGeVEyOWtaVUYwS0RBcElEMDlQU0F3ZUVaRlJrWXBJSHRjYmlBZ0lDQmpiMjUwWlc1MElEMGdZMjl1ZEdWdWRDNXpiR2xqWlNneEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1kyOXVkR1Z1ZER0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3WEc0Z0lHbHpRWEp5WVhrNklHbHpRWEp5WVhrc1hHNGdJR2x6UVhKeVlYbENkV1ptWlhJNklHbHpRWEp5WVhsQ2RXWm1aWElzWEc0Z0lHbHpRblZtWm1WeU9pQnBjMEoxWm1abGNpeGNiaUFnYVhOR2IzSnRSR0YwWVRvZ2FYTkdiM0p0UkdGMFlTeGNiaUFnYVhOQmNuSmhlVUoxWm1abGNsWnBaWGM2SUdselFYSnlZWGxDZFdabVpYSldhV1YzTEZ4dUlDQnBjMU4wY21sdVp6b2dhWE5UZEhKcGJtY3NYRzRnSUdselRuVnRZbVZ5T2lCcGMwNTFiV0psY2l4Y2JpQWdhWE5QWW1wbFkzUTZJR2x6VDJKcVpXTjBMRnh1SUNCcGMxQnNZV2x1VDJKcVpXTjBPaUJwYzFCc1lXbHVUMkpxWldOMExGeHVJQ0JwYzFWdVpHVm1hVzVsWkRvZ2FYTlZibVJsWm1sdVpXUXNYRzRnSUdselJHRjBaVG9nYVhORVlYUmxMRnh1SUNCcGMwWnBiR1U2SUdselJtbHNaU3hjYmlBZ2FYTkNiRzlpT2lCcGMwSnNiMklzWEc0Z0lHbHpSblZ1WTNScGIyNDZJR2x6Um5WdVkzUnBiMjRzWEc0Z0lHbHpVM1J5WldGdE9pQnBjMU4wY21WaGJTeGNiaUFnYVhOVlVreFRaV0Z5WTJoUVlYSmhiWE02SUdselZWSk1VMlZoY21Ob1VHRnlZVzF6TEZ4dUlDQnBjMU4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkam9nYVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zc1hHNGdJR1p2Y2tWaFkyZzZJR1p2Y2tWaFkyZ3NYRzRnSUcxbGNtZGxPaUJ0WlhKblpTeGNiaUFnWlhoMFpXNWtPaUJsZUhSbGJtUXNYRzRnSUhSeWFXMDZJSFJ5YVcwc1hHNGdJSE4wY21sd1FrOU5PaUJ6ZEhKcGNFSlBUVnh1ZlR0Y2JpSXNJaTh2SUhOb2FXMGdabTl5SUhWemFXNW5JSEJ5YjJObGMzTWdhVzRnWW5KdmQzTmxjbHh1ZG1GeUlIQnliMk5sYzNNZ1BTQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdDlPMXh1WEc0dkx5QmpZV05vWldRZ1puSnZiU0IzYUdGMFpYWmxjaUJuYkc5aVlXd2dhWE1nY0hKbGMyVnVkQ0J6YnlCMGFHRjBJSFJsYzNRZ2NuVnVibVZ5Y3lCMGFHRjBJSE4wZFdJZ2FYUmNiaTh2SUdSdmJpZDBJR0p5WldGcklIUm9hVzVuY3k0Z0lFSjFkQ0IzWlNCdVpXVmtJSFJ2SUhkeVlYQWdhWFFnYVc0Z1lTQjBjbmtnWTJGMFkyZ2dhVzRnWTJGelpTQnBkQ0JwYzF4dUx5OGdkM0poY0hCbFpDQnBiaUJ6ZEhKcFkzUWdiVzlrWlNCamIyUmxJSGRvYVdOb0lHUnZaWE51SjNRZ1pHVm1hVzVsSUdGdWVTQm5iRzlpWVd4ekxpQWdTWFFuY3lCcGJuTnBaR1VnWVZ4dUx5OGdablZ1WTNScGIyNGdZbVZqWVhWelpTQjBjbmt2WTJGMFkyaGxjeUJrWlc5d2RHbHRhWHBsSUdsdUlHTmxjblJoYVc0Z1pXNW5hVzVsY3k1Y2JseHVkbUZ5SUdOaFkyaGxaRk5sZEZScGJXVnZkWFE3WEc1MllYSWdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBPMXh1WEc1bWRXNWpkR2x2YmlCa1pXWmhkV3gwVTJWMFZHbHRiM1YwS0NrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduYzJWMFZHbHRaVzkxZENCb1lYTWdibTkwSUdKbFpXNGdaR1ZtYVc1bFpDY3BPMXh1ZlZ4dVpuVnVZM1JwYjI0Z1pHVm1ZWFZzZEVOc1pXRnlWR2x0Wlc5MWRDQW9LU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZGpiR1ZoY2xScGJXVnZkWFFnYUdGeklHNXZkQ0JpWldWdUlHUmxabWx1WldRbktUdGNibjFjYmlobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCelpYUlVhVzFsYjNWMElEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVdOb1pXUlRaWFJVYVcxbGIzVjBJRDBnYzJWMFZHbHRaVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oWTJobFpGTmxkRlJwYldWdmRYUWdQU0JrWldaaGRXeDBVMlYwVkdsdGIzVjBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJQ0FnSUNCallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwZ1pHVm1ZWFZzZEZObGRGUnBiVzkxZER0Y2JpQWdJQ0I5WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmpiR1ZoY2xScGJXVnZkWFFnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDQTlJR05zWldGeVZHbHRaVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5SUdSbFptRjFiSFJEYkdWaGNsUnBiV1Z2ZFhRN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQWdJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5SUdSbFptRjFiSFJEYkdWaGNsUnBiV1Z2ZFhRN1hHNGdJQ0FnZlZ4dWZTQW9LU2xjYm1aMWJtTjBhVzl1SUhKMWJsUnBiV1Z2ZFhRb1puVnVLU0I3WEc0Z0lDQWdhV1lnS0dOaFkyaGxaRk5sZEZScGJXVnZkWFFnUFQwOUlITmxkRlJwYldWdmRYUXBJSHRjYmlBZ0lDQWdJQ0FnTHk5dWIzSnRZV3dnWlc1MmFYSnZiV1Z1ZEhNZ2FXNGdjMkZ1WlNCemFYUjFZWFJwYjI1elhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCelpYUlVhVzFsYjNWMEtHWjFiaXdnTUNrN1hHNGdJQ0FnZlZ4dUlDQWdJQzh2SUdsbUlITmxkRlJwYldWdmRYUWdkMkZ6YmlkMElHRjJZV2xzWVdKc1pTQmlkWFFnZDJGeklHeGhkSFJsY2lCa1pXWnBibVZrWEc0Z0lDQWdhV1lnS0NoallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwOVBTQmtaV1poZFd4MFUyVjBWR2x0YjNWMElIeDhJQ0ZqWVdOb1pXUlRaWFJVYVcxbGIzVjBLU0FtSmlCelpYUlVhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJR05oWTJobFpGTmxkRlJwYldWdmRYUWdQU0J6WlhSVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYzJWMFZHbHRaVzkxZENobWRXNHNJREFwTzF4dUlDQWdJSDFjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNBdkx5QjNhR1Z1SUhkb1pXNGdjMjl0WldKdlpIa2dhR0Z6SUhOamNtVjNaV1FnZDJsMGFDQnpaWFJVYVcxbGIzVjBJR0oxZENCdWJ5QkpMa1V1SUcxaFpHUnVaWE56WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUlRaWFJVYVcxbGIzVjBLR1oxYml3Z01DazdYRzRnSUNBZ2ZTQmpZWFJqYUNobEtYdGNiaUFnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUZkb1pXNGdkMlVnWVhKbElHbHVJRWt1UlM0Z1luVjBJSFJvWlNCelkzSnBjSFFnYUdGeklHSmxaVzRnWlhaaGJHVmtJSE52SUVrdVJTNGdaRzlsYzI0bmRDQjBjblZ6ZENCMGFHVWdaMnh2WW1Gc0lHOWlhbVZqZENCM2FHVnVJR05oYkd4bFpDQnViM0p0WVd4c2VWeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpGTmxkRlJwYldWdmRYUXVZMkZzYkNodWRXeHNMQ0JtZFc0c0lEQXBPMXh1SUNBZ0lDQWdJQ0I5SUdOaGRHTm9LR1VwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYzJGdFpTQmhjeUJoWW05MlpTQmlkWFFnZDJobGJpQnBkQ2R6SUdFZ2RtVnljMmx2YmlCdlppQkpMa1V1SUhSb1lYUWdiWFZ6ZENCb1lYWmxJSFJvWlNCbmJHOWlZV3dnYjJKcVpXTjBJR1p2Y2lBbmRHaHBjeWNzSUdodmNHWjFiR3g1SUc5MWNpQmpiMjUwWlhoMElHTnZjbkpsWTNRZ2IzUm9aWEozYVhObElHbDBJSGRwYkd3Z2RHaHliM2NnWVNCbmJHOWlZV3dnWlhKeWIzSmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUlRaWFJVYVcxbGIzVjBMbU5oYkd3b2RHaHBjeXdnWm5WdUxDQXdLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dVhHNTlYRzVtZFc1amRHbHZiaUJ5ZFc1RGJHVmhjbFJwYldWdmRYUW9iV0Z5YTJWeUtTQjdYRzRnSUNBZ2FXWWdLR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5UFQwZ1kyeGxZWEpVYVcxbGIzVjBLU0I3WEc0Z0lDQWdJQ0FnSUM4dmJtOXliV0ZzSUdWdWRtbHliMjFsYm5SeklHbHVJSE5oYm1VZ2MybDBkV0YwYVc5dWMxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1kyeGxZWEpVYVcxbGIzVjBLRzFoY210bGNpazdYRzRnSUNBZ2ZWeHVJQ0FnSUM4dklHbG1JR05zWldGeVZHbHRaVzkxZENCM1lYTnVKM1FnWVhaaGFXeGhZbXhsSUdKMWRDQjNZWE1nYkdGMGRHVnlJR1JsWm1sdVpXUmNiaUFnSUNCcFppQW9LR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5UFQwZ1pHVm1ZWFZzZEVOc1pXRnlWR2x0Wlc5MWRDQjhmQ0FoWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwS1NBbUppQmpiR1ZoY2xScGJXVnZkWFFwSUh0Y2JpQWdJQ0FnSUNBZ1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMElEMGdZMnhsWVhKVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWTJ4bFlYSlVhVzFsYjNWMEtHMWhjbXRsY2lrN1hHNGdJQ0FnZlZ4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lDOHZJSGRvWlc0Z2QyaGxiaUJ6YjIxbFltOWtlU0JvWVhNZ2MyTnlaWGRsWkNCM2FYUm9JSE5sZEZScGJXVnZkWFFnWW5WMElHNXZJRWt1UlM0Z2JXRmtaRzVsYzNOY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZENodFlYSnJaWElwTzF4dUlDQWdJSDBnWTJGMFkyZ2dLR1VwZTF4dUlDQWdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdWMmhsYmlCM1pTQmhjbVVnYVc0Z1NTNUZMaUJpZFhRZ2RHaGxJSE5qY21sd2RDQm9ZWE1nWW1WbGJpQmxkbUZzWldRZ2MyOGdTUzVGTGlCa2IyVnpiaWQwSUNCMGNuVnpkQ0IwYUdVZ1oyeHZZbUZzSUc5aWFtVmpkQ0IzYUdWdUlHTmhiR3hsWkNCdWIzSnRZV3hzZVZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDNWpZV3hzS0c1MWJHd3NJRzFoY210bGNpazdYRzRnSUNBZ0lDQWdJSDBnWTJGMFkyZ2dLR1VwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnYzJGdFpTQmhjeUJoWW05MlpTQmlkWFFnZDJobGJpQnBkQ2R6SUdFZ2RtVnljMmx2YmlCdlppQkpMa1V1SUhSb1lYUWdiWFZ6ZENCb1lYWmxJSFJvWlNCbmJHOWlZV3dnYjJKcVpXTjBJR1p2Y2lBbmRHaHBjeWNzSUdodmNHWjFiR3g1SUc5MWNpQmpiMjUwWlhoMElHTnZjbkpsWTNRZ2IzUm9aWEozYVhObElHbDBJSGRwYkd3Z2RHaHliM2NnWVNCbmJHOWlZV3dnWlhKeWIzSXVYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QlRiMjFsSUhabGNuTnBiMjV6SUc5bUlFa3VSUzRnYUdGMlpTQmthV1ptWlhKbGJuUWdjblZzWlhNZ1ptOXlJR05zWldGeVZHbHRaVzkxZENCMmN5QnpaWFJVYVcxbGIzVjBYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwTG1OaGJHd29kR2hwY3l3Z2JXRnlhMlZ5S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVYRzVjYm4xY2JuWmhjaUJ4ZFdWMVpTQTlJRnRkTzF4dWRtRnlJR1J5WVdsdWFXNW5JRDBnWm1Gc2MyVTdYRzUyWVhJZ1kzVnljbVZ1ZEZGMVpYVmxPMXh1ZG1GeUlIRjFaWFZsU1c1a1pYZ2dQU0F0TVR0Y2JseHVablZ1WTNScGIyNGdZMnhsWVc1VmNFNWxlSFJVYVdOcktDa2dlMXh1SUNBZ0lHbG1JQ2doWkhKaGFXNXBibWNnZkh3Z0lXTjFjbkpsYm5SUmRXVjFaU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHUnlZV2x1YVc1bklEMGdabUZzYzJVN1hHNGdJQ0FnYVdZZ0tHTjFjbkpsYm5SUmRXVjFaUzVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnY1hWbGRXVWdQU0JqZFhKeVpXNTBVWFZsZFdVdVkyOXVZMkYwS0hGMVpYVmxLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQnhkV1YxWlVsdVpHVjRJRDBnTFRFN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNoeGRXVjFaUzVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnWkhKaGFXNVJkV1YxWlNncE8xeHVJQ0FnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWkhKaGFXNVJkV1YxWlNncElIdGNiaUFnSUNCcFppQW9aSEpoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNiaUFnSUNCMllYSWdkR2x0Wlc5MWRDQTlJSEoxYmxScGJXVnZkWFFvWTJ4bFlXNVZjRTVsZUhSVWFXTnJLVHRjYmlBZ0lDQmtjbUZwYm1sdVp5QTlJSFJ5ZFdVN1hHNWNiaUFnSUNCMllYSWdiR1Z1SUQwZ2NYVmxkV1V1YkdWdVozUm9PMXh1SUNBZ0lIZG9hV3hsS0d4bGJpa2dlMXh1SUNBZ0lDQWdJQ0JqZFhKeVpXNTBVWFZsZFdVZ1BTQnhkV1YxWlR0Y2JpQWdJQ0FnSUNBZ2NYVmxkV1VnUFNCYlhUdGNiaUFnSUNBZ0lDQWdkMmhwYkdVZ0tDc3JjWFZsZFdWSmJtUmxlQ0E4SUd4bGJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUlJkV1YxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5SUmRXVjFaVnR4ZFdWMVpVbHVaR1Y0WFM1eWRXNG9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J4ZFdWMVpVbHVaR1Y0SUQwZ0xURTdYRzRnSUNBZ0lDQWdJR3hsYmlBOUlIRjFaWFZsTG14bGJtZDBhRHRjYmlBZ0lDQjlYRzRnSUNBZ1kzVnljbVZ1ZEZGMVpYVmxJRDBnYm5Wc2JEdGNiaUFnSUNCa2NtRnBibWx1WnlBOUlHWmhiSE5sTzF4dUlDQWdJSEoxYmtOc1pXRnlWR2x0Wlc5MWRDaDBhVzFsYjNWMEtUdGNibjFjYmx4dWNISnZZMlZ6Y3k1dVpYaDBWR2xqYXlBOUlHWjFibU4wYVc5dUlDaG1kVzRwSUh0Y2JpQWdJQ0IyWVhJZ1lYSm5jeUE5SUc1bGR5QkJjbkpoZVNoaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUMwZ01TazdYRzRnSUNBZ2FXWWdLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F4T3lCcElEd2dZWEpuZFcxbGJuUnpMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JoY21kelcya2dMU0F4WFNBOUlHRnlaM1Z0Wlc1MGMxdHBYVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnhkV1YxWlM1d2RYTm9LRzVsZHlCSmRHVnRLR1oxYml3Z1lYSm5jeWtwTzF4dUlDQWdJR2xtSUNoeGRXVjFaUzVzWlc1bmRHZ2dQVDA5SURFZ0ppWWdJV1J5WVdsdWFXNW5LU0I3WEc0Z0lDQWdJQ0FnSUhKMWJsUnBiV1Z2ZFhRb1pISmhhVzVSZFdWMVpTazdYRzRnSUNBZ2ZWeHVmVHRjYmx4dUx5OGdkamdnYkdsclpYTWdjSEpsWkdsamRHbGliR1VnYjJKcVpXTjBjMXh1Wm5WdVkzUnBiMjRnU1hSbGJTaG1kVzRzSUdGeWNtRjVLU0I3WEc0Z0lDQWdkR2hwY3k1bWRXNGdQU0JtZFc0N1hHNGdJQ0FnZEdocGN5NWhjbkpoZVNBOUlHRnljbUY1TzF4dWZWeHVTWFJsYlM1d2NtOTBiM1I1Y0dVdWNuVnVJRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhSb2FYTXVablZ1TG1Gd2NHeDVLRzUxYkd3c0lIUm9hWE11WVhKeVlYa3BPMXh1ZlR0Y2JuQnliMk5sYzNNdWRHbDBiR1VnUFNBblluSnZkM05sY2ljN1hHNXdjbTlqWlhOekxtSnliM2R6WlhJZ1BTQjBjblZsTzF4dWNISnZZMlZ6Y3k1bGJuWWdQU0I3ZlR0Y2JuQnliMk5sYzNNdVlYSm5kaUE5SUZ0ZE8xeHVjSEp2WTJWemN5NTJaWEp6YVc5dUlEMGdKeWM3SUM4dklHVnRjSFI1SUhOMGNtbHVaeUIwYnlCaGRtOXBaQ0J5WldkbGVIQWdhWE56ZFdWelhHNXdjbTlqWlhOekxuWmxjbk5wYjI1eklEMGdlMzA3WEc1Y2JtWjFibU4wYVc5dUlHNXZiM0FvS1NCN2ZWeHVYRzV3Y205alpYTnpMbTl1SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011WVdSa1RHbHpkR1Z1WlhJZ1BTQnViMjl3TzF4dWNISnZZMlZ6Y3k1dmJtTmxJRDBnYm05dmNEdGNibkJ5YjJObGMzTXViMlptSUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y21WdGIzWmxUR2x6ZEdWdVpYSWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NXlaVzF2ZG1WQmJHeE1hWE4wWlc1bGNuTWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NWxiV2wwSUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y0hKbGNHVnVaRXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjSEpsY0dWdVpFOXVZMlZNYVhOMFpXNWxjaUE5SUc1dmIzQTdYRzVjYm5CeWIyTmxjM011YkdsemRHVnVaWEp6SUQwZ1puVnVZM1JwYjI0Z0tHNWhiV1VwSUhzZ2NtVjBkWEp1SUZ0ZElIMWNibHh1Y0hKdlkyVnpjeTVpYVc1a2FXNW5JRDBnWm5WdVkzUnBiMjRnS0c1aGJXVXBJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozQnliMk5sYzNNdVltbHVaR2x1WnlCcGN5QnViM1FnYzNWd2NHOXlkR1ZrSnlrN1hHNTlPMXh1WEc1d2NtOWpaWE56TG1OM1pDQTlJR1oxYm1OMGFXOXVJQ2dwSUhzZ2NtVjBkWEp1SUNjdkp5QjlPMXh1Y0hKdlkyVnpjeTVqYUdScGNpQTlJR1oxYm1OMGFXOXVJQ2hrYVhJcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNCeWIyTmxjM011WTJoa2FYSWdhWE1nYm05MElITjFjSEJ2Y25SbFpDY3BPMXh1ZlR0Y2JuQnliMk5sYzNNdWRXMWhjMnNnUFNCbWRXNWpkR2x2YmlncElIc2djbVYwZFhKdUlEQTdJSDA3WEc0aUxDSnBiWEJ2Y25RZ2V5QkRiMjF3YjI1bGJuUWdmU0JtY205dElDY3VMMjF2WkdWc2N5OURiMjF3YjI1bGJuUW5PMXh5WEc1cGJYQnZjblFnZTF4eVhHNGdJRzV2WkdWTWFYTjBMRnh5WEc0Z0lHZGxkRk5sWTNScGIyNXpMRnh5WEc0Z0lHZGxkRU5oY21SekxGeHlYRzRnSUdkbGRFMWxiblZKZEdWdGN5eGNjbHh1ZlNCbWNtOXRJQ2N1TDNacFpYZHpMMFJQVFVWc1pXMWxiblJ6Snp0Y2NseHVhVzF3YjNKMElIc2daMlYwVTJ0bGJHVjBiMjRzSUhKbGJtUmxjaUI5SUdaeWIyMGdKeTR2ZG1sbGQzTXZjMnRsYkdWMGIyNG5PMXh5WEc1cGJYQnZjblFnYzJWeWRtbGpaU0JtY205dElDY3VMM05sY25acFkyVnpMM0psYzI5MWNtTmxjeWM3WEhKY2JtbHRjRzl5ZENCN0lHaGhibVJzWlU5MlpYSnNZWGtzSUdoaGJtUnNaVTFsYm5VZ0xDQm9hV1JsVFdWdWRYMGdabkp2YlNBbkxpOTJhV1YzY3k5b1lXNWtiR1ZOWlc1MUp6dGNjbHh1YVcxd2IzSjBJSHNnYzJOeWIyeHNTR0Z1Wkd4bGNpQjlJR1p5YjIwZ0p5NHZkbWxsZDNNdmMyTnliMnhzVkc4bk8xeHlYRzVwYlhCdmNuUWdleUJ5WlhOcGVtVWdmU0JtY205dElDY3VMM1pwWlhkekwzSmxjMmw2WlNjN1hISmNibHh5WEc1amIyNXpkQ0JoY0hBZ1BTQW9ablZ1WTNScGIyNGdLQ2tnZTF4eVhHNGdJQzh2WEhKY2JpQWdMeThnVm1GeWFXRmliR1Z6WEhKY2JpQWdMeTljY2x4dUlDQnNaWFFnYzJWMGRHbHVaM003WEhKY2JpQWdYSEpjYmlBZ1kyOXVjM1FnZEdoaGRDQTlJSHQ5TzF4eVhHNGdJR052Ym5OMElHUmxabUYxYkhSeklEMGdlMXh5WEc0Z0lDQWdjMlZzWldOMGIzSnpPaUI3WEhKY2JpQWdJQ0FnSUcxbGJuVkpkR1Z0YzBkeWIzVndPaUFuSTJ4bFpuUmZiV1Z1ZFY5cGRHVnRjeWNzWEhKY2JpQWdJQ0FnSUhObFkzUnBiMjV6UjNKdmRYQTZJQ2NqYzJWamRHbHZibDluY205MWNITW5MRnh5WEc0Z0lDQWdmU3hjY2x4dUlDQWdJR05zWVhOelpYTTZJSHRjY2x4dUlDQWdJQ0FnWlc1MFpYSkViMjVsT2lBbmJHVm1kRjl0Wlc1MVgyOTJaWEpzWVhrZ2JHVm1kRjl0Wlc1MVgyOTJaWEpzWVhrdFpXNTBaWEl0Wkc5dVpTY3NYSEpjYmlBZ0lDQWdJR1Y0YVhSRWIyNWxPaUFuYkdWbWRGOXRaVzUxWDI5MlpYSnNZWGtnYkdWbWRGOXRaVzUxWDI5MlpYSnNZWGt0WlhocGRDMWtiMjVsSnl4Y2NseHVJQ0FnSUNBZ2JHVm1kRTFsYm5WVGFHOTNPaUFuYkdWbWRGOXRaVzUxWDNOb2IzY25MRnh5WEc0Z0lDQWdJQ0JzWldaMFRXVnVkVWhwWkdSbGJqb2dKMnhsWm5SZmJXVnVkVjlvYVdSa1pXNG5YSEpjYmlBZ0lDQjlMRnh5WEc0Z0lDQWdjbVZ6YjNWeVkyVnpPaUJiWFN4Y2NseHVJQ0FnSUdOaGJHeGlZV05yT2lCbWRXNWpkR2x2YmlBb1kyOXVkR1Z1ZENrZ2UxeHlYRzRnSUNBZ0lDQnlaWFIxY200Z1kyOXVkR1Z1ZER0Y2NseHVJQ0FnSUgwc1hISmNiaUFnZlR0Y2NseHVYSEpjYmlBZ0x5OWNjbHh1SUNBdkx5Qk5aWFJvYjJSelhISmNiaUFnTHk5Y2NseHVJQ0JjY2x4dUlDQmpiMjV6ZENCMWJtbHhkV1ZCY25KaGVTQTlJR1oxYm1OMGFXOXVJQ2hoY25JcElIdGNjbHh1SUNBZ0lISmxkSFZ5YmlCaGNuSXVabWxzZEdWeUtDaDJZV3gxWlN3Z2FXNWtaWGdzSUhObGJHWXBJRDArSUhObGJHWXVhVzVrWlhoUFppaDJZV3gxWlNrZ1BUMDlJR2x1WkdWNEtUdGNjbHh1SUNCOU8xeHlYRzVjY2x4dUlDQmpiMjV6ZENCMWJtbHhkV1ZTWlhOdmRYSmpaWE1nUFNCbWRXNWpkR2x2YmlBb1kyRjBaV2R2Y25rcElIdGNjbHh1SUNBZ0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb2NtVnpiM1Z5WTJWektTQjdYSEpjYmlBZ0lDQWdJSEpsZEhWeWJpQnlaWE52ZFhKalpYTXVabWxzZEdWeUtGeHlYRzRnSUNBZ0lDQWdJQ2h5WlhOdmRYSmpaU2tnUFQ0Z2NtVnpiM1Z5WTJVdVkyRjBaV2R2Y25rdWRISnBiU2dwSUQwOVBTQmpZWFJsWjI5eWVWeHlYRzRnSUNBZ0lDQXBPMXh5WEc0Z0lDQWdmVHRjY2x4dUlDQjlPMXh5WEc1Y2NseHVJQ0JqYjI1emRDQnpZM0p2Ykd4VWJ5QTlJR1oxYm1OMGFXOXVJQ2hsYkdWdGN5d2diMlptYzJWMEtTQjdYSEpjYmlBZ0lDQm1iM0lnS0d4bGRDQmxiR1Z0SUc5bUlHVnNaVzF6S1NCN1hISmNiaUFnSUNBZ0lHVnNaVzB1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0J6WTNKdmJHeElZVzVrYkdWeUtHOW1abk5sZENrcE8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2NseHVJQ0I5TzF4eVhHNWNjbHh1SUNBdktpcGNjbHh1SUNBZ0tpQmNjbHh1SUNBZ0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2MyVnNaV04wYjNJZ1ZHaGxJSE5sYkdWamRHOXlJR1p2Y2lCMGFHVWdZMjl1ZEdWdWRDQndZWEpsYm5RZ1pXeGxiV1Z1ZEZ4eVhHNGdJQ0FxSUVCd1lYSmhiU0I3UVhKeVlYbDlJSEpsYzI5MWNtTmxjeUJVYUdVZ1pHRjBZU0JtYjNJZ2RHaGxJR052Ym5SbGJuUWdhWFJsYlhOY2NseHVJQ0FnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCMFpXMXdiR0YwWlNCVWFHVWdablZ1WTNScGIyNGdjbVZ1WkdWeUlGVkpYSEpjYmlBZ0lDb3ZYSEpjYmlBZ1kyOXVjM1FnY21WdVpHVnlRMjl1ZEdWdWRDQTlJR1oxYm1OMGFXOXVLSE5sYkdWamRHOXlMQ0J5WlhOdmRYSmpaWE1zSUhSbGJYQnNZWFJsS1NCN1hISmNiaUFnSUNCeVpYUjFjbTRnYm1WM0lFTnZiWEJ2Ym1WdWRDaHpaV3hsWTNSdmNpd2dlMXh5WEc0Z0lDQWdJQ0J5WlhOdmRYSmpaWE02SUhKbGMyOTFjbU5sY3l4Y2NseHVJQ0FnSUNBZ2RHVnRjR3hoZEdVNklIUmxiWEJzWVhSbExGeHlYRzRnSUNBZ2ZTazdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQmpiMjV6ZENCa1pYTjBiM0o1SUQwZ1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ0lDQXZMeUJOWVd0bElITjFjbVVnZEdobElIQnNkV2RwYmlCb1lYTWdZbVZsYmlCcGJtbDBhV0ZzYVhwbFpGeHlYRzRnSUNBZ2FXWWdLQ0Z6WlhSMGFXNW5jeWtnY21WMGRYSnVPMXh5WEc1Y2NseHVJQ0FnSUM4dklGSmxiVzkyWlNCMGFHVWdkR0ZpYkdVZ2IyWWdZMjl1ZEdWdWRITmNjbHh1SUNBZ0lITmxkSFJwYm1kekxtNXZaR1ZNYVhOMExteGxablJOWlc1MVNYUmxiWE11YVc1dVpYSklWRTFNSUQwZ0p5YzdYSEpjYmlBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXpaV04wYVc5dWMwbDBaVzF6TG1sdWJtVnlTRlJOVENBOUlDY25PMXh5WEc1Y2NseHVJQ0FnSUM4dklGSmxjMlYwSUhaaGNtbGhZbXhsYzF4eVhHNGdJQ0FnYzJWMGRHbHVaM01nUFNCdWRXeHNPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdZMjl1YzNRZ2FXNXBkQ0E5SUdaMWJtTjBhVzl1SUNodmNIUnBiMjV6S1NCN1hISmNiaUFnSUNBdkx5QkVaWE4wYjNKNUlIUm9aU0JqZFhKeVpXNTBJR2x1YVhScFlXeHBlbUYwYVc5dVhISmNiaUFnSUNCa1pYTjBiM0o1S0NrN1hISmNibHh5WEc0Z0lDQWdiM0IwYVc5dWN5QTlJRzl3ZEdsdmJuTWdmSHdnZTMwN1hISmNibHh5WEc0Z0lDQWdMeThnVFdWeVoyVWdZbTkwYUNCMWMyVnlJR1JsWm1GMWJIUnpJR0Z1WkNCdmNIUnBiMjV6TGx4eVhHNGdJQ0FnYzJWMGRHbHVaM01nUFNCUFltcGxZM1F1WVhOemFXZHVLSHQ5TENCa1pXWmhkV3gwY3l3Z2IzQjBhVzl1Y3lrN1hISmNibHh5WEc0Z0lDQWdMeThnUjJWMElHRnNiQ0JqWVhSbFoyOXlhV1Z6SUc5bUlIUm9aU0J5WlhOdmRYSmpaWE5jY2x4dUlDQWdJR052Ym5OMElHTmhkR1ZuYjNKcFpYTWdQU0IxYm1seGRXVkJjbkpoZVNoY2NseHVJQ0FnSUNBZ2MyVjBkR2x1WjNNdWNtVnpiM1Z5WTJWekxtMWhjQ2dvY21WemIzVnlZMlVwSUQwK0lISmxjMjkxY21ObExtTmhkR1ZuYjNKNUtWeHlYRzRnSUNBZ0tUdGNjbHh1WEhKY2JpQWdJQ0F2THlCSFpYUWdZV3hzSUdsMFpXMXpJRzltSUd4bFpuUWdiV1Z1ZFNCcGRHVnRjeUIwYUdWdUlHRndjR1Z1WkNCcGRDQjBieUJrYjJOMWJXVnVkRnh5WEc0Z0lDQWdjbVZ1WkdWeVEyOXVkR1Z1ZENoelpYUjBhVzVuY3k1elpXeGxZM1J2Y25NdWJXVnVkVWwwWlcxelIzSnZkWEFzSUdOaGRHVm5iM0pwWlhNc0lHZGxkRTFsYm5WSmRHVnRjeWt1Y21WdVpHVnlLQ2s3WEhKY2JseHlYRzRnSUNBZ0x5OGdSMlYwSUdGc2JDQnpaV04wYVc5dWN5QnZaaUJ0WVdsdUlHTnZiblJsYm5SY2NseHVJQ0FnSUhKbGJtUmxja052Ym5SbGJuUW9jMlYwZEdsdVozTXVjMlZzWldOMGIzSnpMbk5sWTNScGIyNXpSM0p2ZFhBc0lHTmhkR1ZuYjNKcFpYTXNJR2RsZEZObFkzUnBiMjV6S1M1eVpXNWtaWElvS1R0Y2NseHVYSEpjYmlBZ0lDQXZMeUJTWlc1a1pYSWdkR2hsSUdsMFpXMXpJR2x1ZEc4Z1lTQjFibWx4ZFdVZ2MyVmpkR2x2YmlCcFpGeHlYRzRnSUNBZ1kyRjBaV2R2Y21sbGN5NW1iM0pGWVdOb0tDaGpZWFJsWjI5eWVTa2dQVDRnZTF4eVhHNGdJQ0FnSUNCamIyNXpkQ0J6Wld4bFkzUnZjaUE5SUdBakpIdGpZWFJsWjI5eWVYMGdMbWR5YjNWd1gybDBaVzF6WUR0Y2NseHVYSEpjYmlBZ0lDQWdJQzh2SUVkbGRDQnlaWE52ZFhKalpYTWdiMllnZEdobElITmhiV1VnWTJGMFpXZHZjbmxjY2x4dUlDQWdJQ0FnTHk4Z1JtOXlJR1Y0WVcxd2JHVTZJRWhVVFV6amdJRktZWFpoYzJOeWFYQjA0NENCVkc5dmJIUGpnSUZ3YjJSallYTjBYSEpjYmlBZ0lDQWdJR052Ym5OMElISmxjMjkxY21ObGN5QTlJSFZ1YVhGMVpWSmxjMjkxY21ObGN5aGpZWFJsWjI5eWVTa29jMlYwZEdsdVozTXVjbVZ6YjNWeVkyVnpLVHRjY2x4dUlDQWdJQ0FnY21WdVpHVnlRMjl1ZEdWdWRDaHpaV3hsWTNSdmNpd2djbVZ6YjNWeVkyVnpMQ0JuWlhSRFlYSmtjeWt1Y21WdVpHVnlLQ2s3WEhKY2JpQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQXZMeUJUWTNKdmJHd2dkRzhnZEdobElITndaV05wWm1sbFpDQmpZWFJsWjI5eWVTQmllU0JqYkdsamEybHVaeUIwYUdVZ2JXVnVkVnh5WEc0Z0lDQWdjMk55YjJ4c1ZHOG9aRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2tGc2JDZ25MbXhsWm5SZmJXVnVkVjlwZEdWdElHRW5LU3dnTnpZcE8xeHlYRzVjY2x4dUlDQWdJQzh2SUZOb2IzY2diM0lnYUdsa1pTQjBhR1VnYkdWbWRDQnRaVzUxSUdKNUlISmxjMmw2YVc1bklIUm9aU0J6YVhwbElHOW1JR1J2WTNWdFpXNTBMbVJ2WTNWdFpXNTBSV3hsYldWdWRDNWpiR2xsYm5SWGFXUjBhRnh5WEc0Z0lDQWdhR0Z1Wkd4bFRXVnVkU2h1YjJSbFRHbHpkQ3dnYzJWMGRHbHVaM011WTJ4aGMzTmxjeWtvS1R0Y2NseHVYSEpjYmlBZ0lDQXZMeUJTWlhOcGVtVWdkR2hsSUhkcFpIUm9JRzltSUd4bFpuUmZiV1Z1ZFNCaGJtUWdiV0ZwYmw5amIyNTBaVzUwWEhKY2JpQWdJQ0J5WlhOcGVtVXVhVzVwZEdsaGJHbDZaU2g3SUc1dlpHVk1hWE4wT2lCdWIyUmxUR2x6ZENCOUtUdGNjbHh1WEhKY2JpQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jbVZ6YVhwbEp5d2dhR0Z1Wkd4bFRXVnVkU2h1YjJSbFRHbHpkQ3dnYzJWMGRHbHVaM011WTJ4aGMzTmxjeWtwTzF4eVhHNGdJQ0FnYm05a1pVeHBjM1F1YkdWbWRFTnZiblJ5YjJ4TlpXNTFMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2dhR0Z1Wkd4bFQzWmxjbXhoZVNodWIyUmxUR2x6ZEN3Z2MyVjBkR2x1WjNNdVkyeGhjM05sY3lrcE8xeHlYRzRnSUNBZ2JtOWtaVXhwYzNRdWJHVm1kRTFsYm5WUGRtVnliR0Y1TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJOc2FXTnJKeXdnYUdGdVpHeGxUM1psY214aGVTaHViMlJsVEdsemRDd2djMlYwZEdsdVozTXVZMnhoYzNObGN5a3BPMXh5WEc1Y2NseHVJQ0FnSUc1dlpHVk1hWE4wTG14bFpuUk5aVzUxTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJOc2FXTnJKeXdnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNBZ0lHbG1JQ2h1YjJSbFRHbHpkQzVvZEcxc0xtTnNhV1Z1ZEZkcFpIUm9JRHdnTnpVd0tTQjdYSEpjYmlBZ0lDQWdJQ0FnYUdsa1pVMWxiblVvYm05a1pVeHBjM1FzSUhObGRIUnBibWR6TG1Oc1lYTnpaWE1wTzF4eVhHNGdJQ0FnSUNCOVhISmNiaUFnSUNCOUtUdGNjbHh1SUNBZ0lGeHlYRzRnSUNBZ2JtOWtaVXhwYzNRdWJHVm1kRTFsYm5VdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmJXOTFjMlZrYjNkdUp5d2dablZ1WTNScGIyNGdLR1YyWlc1MEtTQjdYSEpjYmlBZ0lDQWdJR1YyWlc1MExuQnlaWFpsYm5SRVpXWmhkV3gwS0NrN1hISmNiaUFnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjY2x4dUlDQWdJSDBwTzF4eVhHNGdJSDA3WEhKY2JseHlYRzRnSUM4dlhISmNiaUFnTHk4Z1NXNXBkSE1nSmlCRmRtVnVkSE5jY2x4dUlDQXZMMXh5WEc1Y2NseHVJQ0F2THlCU1pXNWtaWElnZEdobElITnJaV3hsZEc5dUlITmpjbVZsYmlCaVpXWnZjbVVnWjJWMGRHbHVaeUIwYUdVZ2NtVnpiM1Z5WTJWeklHWnliMjBnYzJWeWRtVnlYSEpjYmlBZ2NtVnVaR1Z5S0dSbFptRjFiSFJ6TG5ObGJHVmpkRzl5Y3k1elpXTjBhVzl1YzBkeWIzVndMQ0JuWlhSVGEyVnNaWFJ2YmlrN1hISmNibHh5WEc0Z0lDOHZJRWRsZENCeVpYTnZkWEpqWlhNZ1puSnZiU0IwYUdVZ2MyVnlkbWxqWlNCemFXUmxYSEpjYmlBZ2MyVnlkbWxqWlM1blpYUkJiR3dvS1M1MGFHVnVLQ2h5WlhOdmRYSmpaWE1wSUQwK0lIdGNjbHh1SUNBZ0lHbHVhWFFvY21WemIzVnlZMlZ6S1R0Y2NseHVJQ0I5S1R0Y2NseHVYSEpjYmlBZ2RHaGhkQzVwYm1sMElEMGdhVzVwZER0Y2NseHVJQ0IwYUdGMExtUmxjM1J2Y25rZ1BTQmtaWE4wYjNKNU8xeHlYRzRnSUZ4eVhHNGdJSEpsZEhWeWJpQjBhR0YwTzF4eVhHNTlLU2dwTzF4eVhHNGlMQ0pHZFc1amRHbHZiaTV3Y205MGIzUjVjR1V1YldWMGFHOWtJRDBnWm5WdVkzUnBiMjRvYm1GdFpTd2dablZ1WXlrZ2UxeHlYRzRnSUdsbUlDaDBhR2x6TG5CeWIzUnZkSGx3WlZ0dVlXMWxYU2tnY21WMGRYSnVPMXh5WEc0Z0lIUm9hWE11Y0hKdmRHOTBlWEJsVzI1aGJXVmRJRDBnWm5WdVl6dGNjbHh1SUNCeVpYUjFjbTRnZEdocGN6dGNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR052Ym5OMElFTnZiWEJ2Ym1WdWRDQTlJQ2htZFc1amRHbHZiaWdwSUh0Y2NseHVYSEpjYmlBZ0x5b3FYSEpjYmlBZ0lDb2dYSEpjYmlBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITmxiR1ZqZEc5eUlGUm9aU0J6Wld4bFkzUnZjaUJtYjNJZ2RHaGxJSFJoWW14bElHOW1JR052Ym5SbGJuUnpJSFJoY21kbGRGeHlYRzRnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdmNIUnBiMjV6SUZWelpYSWdiM0IwYVc5dWN5QmNjbHh1SUNBZ0tpOWNjbHh1SUNCMllYSWdRMjl1YzNSeWRXTjBiM0lnUFNCbWRXNWpkR2x2YmloelpXeGxZM1J2Y2l3Z2IzQjBhVzl1Y3lrZ2UxeHlYRzRnSUNBZ2RHaHBjeTV6Wld4bFkzUnZjaUE5SUhObGJHVmpkRzl5TzF4eVhHNGdJQ0FnZEdocGN5NXlaWE52ZFhKalpYTWdQU0J2Y0hScGIyNXpMbkpsYzI5MWNtTmxjenRjY2x4dUlDQWdJSFJvYVhNdWRHVnRjR3hoZEdVZ1BTQnZjSFJwYjI1ekxuUmxiWEJzWVhSbE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ1EyOXVjM1J5ZFdOMGIzSXViV1YwYUc5a0tDZHlaVzVrWlhJbkxDQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dUlDQWdJR052Ym5OMElIUmhjbWRsZENBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvZEdocGN5NXpaV3hsWTNSdmNpazdYSEpjYmlBZ0lDQnBaaUFvSVhSaGNtZGxkQ2tnY21WMGRYSnVPMXh5WEc0Z0lDQWdkR0Z5WjJWMExtbHVibVZ5U0ZSTlRDQTlJSFJvYVhNdWFHRnVaR3hsVkdWdGNHeGhkR1VvZEdocGN5NXlaWE52ZFhKalpYTXBPMXh5WEc0Z0lIMHBYSEpjYmx4eVhHNGdJRU52Ym5OMGNuVmpkRzl5TG0xbGRHaHZaQ2duYUdGdVpHeGxWR1Z0Y0d4aGRHVW5MQ0JtZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0FnSUdsbUlDaDBhR2x6TG5KbGMyOTFjbU5sY3k1c1pXNW5kR2dnUENBeEtTQnlaWFIxY200N1hISmNibHh5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Y21WemIzVnlZMlZ6WEhKY2JpQWdJQ0FnSUM1dFlYQW9jbVZ6YjNWeVkyVWdQVDRnZEdocGN5NTBaVzF3YkdGMFpTaHlaWE52ZFhKalpTa3BYSEpjYmlBZ0lDQWdJQzVxYjJsdUtDY25LVnh5WEc0Z0lIMHBYSEpjYmx4eVhHNGdJRU52Ym5OMGNuVmpkRzl5TG0xbGRHaHZaQ2duYzJWMFJHRjBZU2NzSUdaMWJtTjBhVzl1S0c5aWFpa2dlMXh5WEc0Z0lDQWdabTl5SUNoc1pYUWdhMlY1SUdsdUlHOWlhaWtnZTF4eVhHNGdJQ0FnSUNCcFppQW9iMkpxTG1oaGMwOTNibEJ5YjNCbGNuUnBaWE1vYTJWNUtTa2dlMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZ6YjNWeVkyVnpJRDBnYjJKcVcydGxlVjA3WEhKY2JpQWdJQ0FnSUgxY2NseHVJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQjBhR2x6TG5KbGJtUmxjaWdwTzF4eVhHNGdJSDBwWEhKY2JseHlYRzRnSUVOdmJuTjBjblZqZEc5eUxtMWxkR2h2WkNnbloyVjBSR0YwWVNjc0lHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdjbVYwZFhKdUlFOWlhbVZqZEM1d1lYSnpaU2hQWW1wbFkzUXVjM1J5YVc1bmFXWjVLSFJvYVhNdWNtVnpiM1Z5WTJWektTazdYSEpjYmlBZ2ZTbGNjbHh1WEhKY2JpQWdjbVYwZFhKdUlFTnZibk4wY25WamRHOXlPMXh5WEc1OUtTZ3BPeUlzSW1sdGNHOXlkQ0JoZUdsdmN5Qm1jbTl0SUNkaGVHbHZjeWM3WEhKY2JtTnZibk4wSUdKaGMyVlZjbXdnUFNBbkx5NXVaWFJzYVdaNUwyWjFibU4wYVc5dWN5OWhjR2t2Y21WemIzVnlZMlZ6Snp0Y2NseHVYSEpjYm1OdmJuTjBJR2RsZEVGc2JDQTlJR1oxYm1OMGFXOXVLQ2tnZTF4eVhHNGdJR052Ym5OMElISmxjWFZsYzNRZ1BTQmhlR2x2Y3k1blpYUW9ZbUZ6WlZWeWJDazdYSEpjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1F1ZEdobGJpaHlaWE53YjI1elpTQTlQaUJ5WlhOd2IyNXpaUzVrWVhSaEtUdGNjbHh1ZlZ4eVhHNWNjbHh1WTI5dWMzUWdZM0psWVhSbElEMGdablZ1WTNScGIyNG9ibVYzVDJKcVpXTjBLU0I3WEhKY2JpQWdZMjl1YzNRZ2NtVnhkV1Z6ZENBOUlHRjRhVzl6TG5CdmMzUW9ZbUZ6WlZWeWJDd2dibVYzVDJKcVpXTjBLVHRjY2x4dUlDQnlaWFIxY200Z2NtVnhkV1Z6ZEM1MGFHVnVLSEpsYzNCdmJuTmxJRDArSUhKbGMzQnZibk5sTG1SaGRHRXBPMXh5WEc1OVhISmNibHh5WEc1amIyNXpkQ0IxY0dSaGRHVWdQU0JtZFc1amRHbHZiaWhwWkN3Z2JtVjNUMkpxWldOMEtTQjdYSEpjYmlBZ1kyOXVjM1FnY21WeGRXVnpkQ0E5SUdGNGFXOXpMbkIxZENoZ0pIdGlZWE5sVlhKc2ZTOGtlMmxrZldBc0lHNWxkMDlpYW1WamRDazdYSEpjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1F1ZEdobGJpaHlaWE53YjI1elpTQTlQaUJ5WlhOd2IyNXpaUzVrWVhSaEtUdGNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdleUJuWlhSQmJHd3NJR055WldGMFpTd2dkWEJrWVhSbElIMDdYSEpjYmlJc0ltVjRjRzl5ZENCamIyNXpkQ0J1YjJSbFRHbHpkQ0E5SUh0Y2NseHVJQ0JzWldaMFEyOXVkSEp2YkUxbGJuVTZJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXNaV1owWDJOdmJuUnliMnhmYldWdWRTY3BMRnh5WEc0Z0lHeGxablJOWlc1MVQzWmxjbXhoZVRvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG14bFpuUmZiV1Z1ZFY5dmRtVnliR0Y1Snlrc1hISmNiaUFnYzJWamRHbHZia2wwWlcxek9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjamMyVmpkR2x2Ymw5bmNtOTFjSE1uS1N4Y2NseHVJQ0JzWldaMFRXVnVkVWwwWlcxek9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjamJHVm1kRjl0Wlc1MVgybDBaVzF6Snlrc1hISmNiaUFnYUhSdGJEb2daRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExGeHlYRzRnSUdKdlpIazZJR1J2WTNWdFpXNTBMbUp2Wkhrc1hISmNiaUFnYkdWbWRFMWxiblU2SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVzWldaMFgyMWxiblVuS1N4Y2NseHVJQ0J5WlhOcGVtVklZVzVrYkdVNklHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1eVpYTnBlbVZmYUdGdVpHeGxKeWtzWEhKY2JpQWdiV0ZwYmtOdmJuUmxiblE2SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV0WVdsdVgyTnZiblJsYm5RbktTeGNjbHh1ZlZ4eVhHNWNjbHh1SUNBdkx5QkhaVzVsY21GMFpTQmhJR2wwWlcwZ2IyWWdkR2hsSUc1aGRtbG5ZWFJwYjI1Y2NseHVaWGh3YjNKMElHTnZibk4wSUdkbGRFMWxiblZKZEdWdGN5QTlJR05oZEdWbmIzSjVJRDArSUdCY2NseHVJQ0E4YkdrZ1kyeGhjM005WENKc1pXWjBYMjFsYm5WZmFYUmxiVndpUGx4eVhHNGdJQ0FnUEdFZ2FISmxaajFjSWlNa2UyTmhkR1ZuYjNKNWZWd2lQaUJjY2x4dUlDQWdJQ0FnUEdsdFp5QmpiR0Z6Y3oxY0ltMWxiblZmYVhSbGJWOXBZMjl1WENJZ2MzSmpQVndpTGk5emRtY3ZKSHRqWVhSbFoyOXllWDB1YzNablhDSStQQzlwYldjK1hISmNiaUFnSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQVndpYldWdWRWOXBkR1Z0WDJOdmJuUmxiblJjSWo0a2UyTmhkR1ZuYjNKNWZUd3ZjM0JoYmo1Y2NseHVJQ0FnSUR3dllUNWNjbHh1SUNBOEwyeHBQbHh5WEc1Z08xeHlYRzVjY2x4dUlDQXZMeUJIWlc1bGNtRjBaU0JoSUhObFkzUnBiMjRnYjJZZ2RHaGxJRzFoYVc0Z1kyOXVkR1Z1ZEZ4eVhHNWxlSEJ2Y25RZ1kyOXVjM1FnWjJWMFUyVmpkR2x2Ym5NZ1BTQmpZWFJsWjI5eWVTQTlQaUJnWEhKY2JpQWdQSE5sWTNScGIyNGdhV1E5WENJa2UyTmhkR1ZuYjNKNWZWd2lJR05zWVhOelBWd2laM0p2ZFhCY0lpQStYSEpjYmlBZ0lDQThhRE1nWTJ4aGMzTTlYQ0puY205MWNGOTBhWFJzWlZ3aVBpUjdZMkYwWldkdmNubDlQQzlvTXo1Y2NseHVJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSm5jbTkxY0Y5amIyNTBaVzUwWENJK1hISmNiaUFnSUNBZ0lEeDFiQ0JqYkdGemN6MWNJbkp2ZHlCbmNtOTFjRjlwZEdWdGMxd2lQand2ZFd3K1hISmNiaUFnSUNBOEwyUnBkajVjY2x4dUlDQThMM05sWTNScGIyNCtJQ0JjY2x4dVlEdGNjbHh1WEhKY2JpQWdMeThnUjJWdVpYSmhkR1VnWVNCc2FYTjBJRzltSUhSb1pTQnpaV04wYVc5dUlGeHlYRzVsZUhCdmNuUWdZMjl1YzNRZ1oyVjBRMkZ5WkhNZ1BTQnlaWE52ZFhKalpTQTlQaUJnWEhKY2JpQWdQR3hwSUdOc1lYTnpQVndpWjNKdmRYQmZhWFJsYlNCamIyd3pYQ0krWEhKY2JpQWdJQ0E4WVNCamJHRnpjejFjSW1keWIzVndYMmwwWlcxZmJHbHVhMXdpSUdoeVpXWTlYQ0lrZTNKbGMyOTFjbU5sTG1oeVpXWjlYQ0krWEhKY2JpQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmpZWEprWENJK1hISmNiaUFnSUNBZ0lDQWdQR2x0WnlCamJHRnpjejFjSW1OaGNtUmZhV052Ymx3aUlITnlZejFjSWlSN2NtVnpiM1Z5WTJVdWMzSmpmVndpUGx4eVhHNGdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqWVhKa1gySnZaSGxjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJRHhvTkNCamJHRnpjejFjSW1OaGNtUmZkR2wwYkdWY0lqNGtlM0psYzI5MWNtTmxMblJwZEd4bGZUd3ZhRFErWEhKY2JpQWdJQ0FnSUNBZ0lDQThjQ0JqYkdGemN6MWNJbU5oY21SZmRHVjRkRndpUGlSN2NtVnpiM1Z5WTJVdVkyOXVkR1Z1ZEgwOEwzQStYSEpjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYSEpjYmlBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ1BDOWhQbHh5WEc0Z0lEd3ZiR2srWEhKY2JtQTdJaXdpTHk4Z1VtVndjbVZ6Wlc1MElIUm9aU0JzWldaMElHMWxiblVnYjNCbGJtbHVaeUJ2Y2lCamJHOXphVzVuWEhKY2JpOHZJRlJ5ZFdVZ2JXVmhibk1nYVhRbmN5QnZjR1Z1YVc1blhISmNibXhsZENCcGMwRmpkR2wyWlNBOUlHWmhiSE5sTzF4eVhHNWNjbHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR2hwWkdWTlpXNTFLRzV2WkdWc2FYTjBMQ0JqYkdGemMyVnpLU0I3WEhKY2JpQWdibTlrWld4cGMzUXVhSFJ0YkM1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzJWekxteGxablJOWlc1MVNHbGtaR1Z1TzF4eVhHNGdJRzV2WkdWc2FYTjBMbXhsWm5STlpXNTFUM1psY214aGVTNWpiR0Z6YzA1aGJXVWdQU0JqYkdGemMyVnpMbVY0YVhSRWIyNWxPMXh5WEc0Z0lHbHpRV04wYVhabElEMGdkSEoxWlR0Y2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHaGhibVJzWlU5MlpYSnNZWGtnS0c1dlpHVnNhWE4wTENCamJHRnpjMlZ6S1NCN1hISmNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2dwSUh0Y2NseHVJQ0FnSUdsbUlDaHBjMEZqZEdsMlpTa2dlMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVvZEcxc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXViR1ZtZEUxbGJuVlRhRzkzTzF4eVhHNGdJQ0FnSUNCdWIyUmxiR2x6ZEM1c1pXWjBUV1Z1ZFU5MlpYSnNZWGt1WTJ4aGMzTk9ZVzFsSUQwZ1kyeGhjM05sY3k1bGJuUmxja1J2Ym1VN1hISmNiaUFnSUNCOUlHVnNjMlVnZTF4eVhHNGdJQ0FnSUNCdWIyUmxiR2x6ZEM1b2RHMXNMbU5zWVhOelRtRnRaU0E5SUdOc1lYTnpaWE11YkdWbWRFMWxiblZJYVdSa1pXNDdYSEpjYmlBZ0lDQWdJRzV2WkdWc2FYTjBMbXhsWm5STlpXNTFUM1psY214aGVTNWpiR0Z6YzA1aGJXVWdQU0JqYkdGemMyVnpMbVY0YVhSRWIyNWxPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUdselFXTjBhWFpsSUQwZ0lXbHpRV04wYVhabE8xeHlYRzRnSUgxY2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHaGhibVJzWlUxbGJuVW9ibTlrWld4cGMzUXNJR05zWVhOelpYTXBJSHRjY2x4dUlDQnlaWFIxY200Z1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ0lDQnBaaUFvYm05a1pXeHBjM1F1YUhSdGJDNWpiR2xsYm5SWGFXUjBhQ0E4SURjMU1Da2dlMXh5WEc0Z0lDQWdJQ0JvYVdSbFRXVnVkU2h1YjJSbGJHbHpkQ3dnWTJ4aGMzTmxjeWs3WEhKY2JpQWdJQ0I5SUdWc2MyVWdlMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVvZEcxc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXViR1ZtZEUxbGJuVlRhRzkzTzF4eVhHNGdJQ0FnSUNCdWIyUmxiR2x6ZEM1c1pXWjBUV1Z1ZFU5MlpYSnNZWGt1WTJ4aGMzTk9ZVzFsSUQwZ1kyeGhjM05sY3k1bGJuUmxja1J2Ym1VN1hISmNiaUFnSUNBZ0lHbHpRV04wYVhabElEMGdabUZzYzJVN1hISmNiaUFnSUNCOVhISmNiaUFnZlZ4eVhHNTlYSEpjYmlJc0ltVjRjRzl5ZENCamIyNXpkQ0J5WlhOcGVtVWdQU0FvWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnYkdWMElITmxkSFJwYm1kek8xeHlYRzVjY2x4dUlDQmpiMjV6ZENCMGFHRjBJRDBnZTMwN0lGeHlYRzRnSUdOdmJuTjBJR1JsWm1GMWJIUnpJRDBnZTF4eVhHNGdJQ0FnYzJsNlpYTTZJSHRjY2x4dUlDQWdJQ0FnYldGNFYybGtkR2c2SURReU5TeGNjbHh1SUNBZ0lDQWdiV2x1VjJsa2RHZzZJREl3TUN4Y2NseHVJQ0FnSUNBZ2VEb2dNalV3WEhKY2JpQWdJQ0I5TEZ4eVhHNGdJSDFjY2x4dVhISmNiaUFnTHk4Z1NXNXBkSE1nWVc1a0lFVjJaVzUwYzF4eVhHNGdJR052Ym5OMElHbHVhWFJwWVd4cGVtVWdQU0JtZFc1amRHbHZiaWh2Y0hScGIyNXpLU0I3WEhKY2JpQWdJQ0J2Y0hScGIyNXpJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZTQmNjbHh1SUNBZ0lITmxkSFJwYm1keklEMGdUMkpxWldOMExtRnpjMmxuYmloN2ZTd2daR1ZtWVhWc2RITXNJRzl3ZEdsdmJuTXBPMXh5WEc1Y2NseHVJQ0FnSUM4dklHMWxkR2h2WkhOY2NseHVJQ0FnSUdOdmJuTjBJRzF2ZG1WQmRDQTlJR1oxYm1OMGFXOXVLSGdwSUh0Y2NseHVJQ0FnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdWJHVm1kRTFsYm5VdWMzUjViR1V1ZDJsa2RHZ2dQU0I0SUNzZ0ozQjRKenRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1Y21WemFYcGxTR0Z1Wkd4bExuTjBlV3hsTG14bFpuUWdQU0I0SUNzZ0ozQjRKenRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1YldGcGJrTnZiblJsYm5RdWMzUjViR1V1YldGeVoybHVUR1ZtZENBOUlIZ2dLeUFuY0hnbk8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHOXVUVzkxYzJWVmNDQTlJR1oxYm1OMGFXOXVJR1oxYm1Nb0tTQjdYSEpjYmlBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbXhsWm5STlpXNTFMbU5zWVhOelRHbHpkQzV5WlcxdmRtVW9KM1J5WVc1emFYUnBiMjVmYm05dVpTY3BPMXh5WEc0Z0lDQWdJQ0J6WlhSMGFXNW5jeTV1YjJSbFRHbHpkQzV0WVdsdVEyOXVkR1Z1ZEM1amJHRnpjMHhwYzNRdWNtVnRiM1psS0NkMGNtRnVjMmwwYVc5dVgyNXZibVVuS1R0Y2NseHVJQ0FnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdVltOWtlUzVqYkdGemMweHBjM1F1Y21WdGIzWmxLQ2R1YjE5MWMyVnlYM05sYkdWamRHbHZiaWNwTzF4eVhHNGdJQ0FnSUNCa2IyTjFiV1Z1ZEM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtDZHRiM1Z6WlcxdmRtVW5MQ0J2YmsxdmRYTmxUVzkyWlNrN1hISmNiaUFnSUNBZ0lIUm9hWE11Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2lnbmJXOTFjMlYxY0Njc0lHWjFibU1wTzF4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lHTnZibk4wSUc5dVRXOTFjMlZOYjNabElEMGdablZ1WTNScGIyNG9aWFpsYm5RcElIdGNjbHh1SUNBZ0lDQWdZMjl1YzNRZ2JHVm1kRTFsYm5WWGFXUjBhQ0E5SUhCaGNuTmxTVzUwS0hObGRIUnBibWR6TG01dlpHVk1hWE4wTG14bFpuUk5aVzUxTG5OMGVXeGxMbmRwWkhSb0xDQXhNQ2s3WEhKY2JpQWdJQ0FnSUdsbUlDaHNaV1owVFdWdWRWZHBaSFJvSUQ0Z2MyVjBkR2x1WjNNdWMybDZaWE11YldGNFYybGtkR2dnZkh3Z2JHVm1kRTFsYm5WWGFXUjBhQ0E4SUhObGRIUnBibWR6TG5OcGVtVnpMbTFwYmxkcFpIUm9LU0I3WEhKY2JpQWdJQ0FnSUNBZ1pHOWpkVzFsYm5RdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpZ25iVzkxYzJWdGIzWmxKeXdnYjI1TmIzVnpaVTF2ZG1VcE8xeHlYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLR3hsWm5STlpXNTFWMmxrZEdnZ1BEMGdjMlYwZEdsdVozTXVjMmw2WlhNdWJXRjRWMmxrZEdnZ0ppWWdiR1ZtZEUxbGJuVlhhV1IwYUNBK1BTQnpaWFIwYVc1bmN5NXphWHBsY3k1dGFXNVhhV1IwYUNrZ2UxeHlYRzRnSUNBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbXhsWm5STlpXNTFMbU5zWVhOelRHbHpkQzVoWkdRb0ozUnlZVzV6YVhScGIyNWZibTl1WlNjcE8xeHlYRzRnSUNBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbTFoYVc1RGIyNTBaVzUwTG1Oc1lYTnpUR2x6ZEM1aFpHUW9KM1J5WVc1emFYUnBiMjVmYm05dVpTY3BPMXh5WEc0Z0lDQWdJQ0FnSUhObGRIUnBibWR6TG01dlpHVk1hWE4wTG1KdlpIa3VZMnhoYzNOTWFYTjBMbUZrWkNnbmJtOWZkWE5sY2w5elpXeGxZM1JwYjI0bktUdGNjbHh1SUNBZ0lDQWdJQ0J0YjNabFFYUW9aWFpsYm5RdWNHRm5aVmdwTzF4eVhHNGdJQ0FnSUNCOVhISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdjMlYwZEdsdVozTXVibTlrWlV4cGMzUXVjbVZ6YVhwbFNHRnVaR3hsTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxdmRYTmxaRzkzYmljc0lHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNiaUFnSUNBZ0lHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyMXZkWE5sYlc5MlpTY3NJRzl1VFc5MWMyVk5iM1psS1R0Y2NseHVJQ0FnSUNBZ2RHaHBjeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpYVndKeXdnYjI1TmIzVnpaVlZ3S1R0Y2NseHVYSEpjYmlBZ0lDQWdJSFJvYVhNdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblpISmhaM04wWVhKMEp5d2dablZ1WTNScGIyNG9aWFpsYm5RcElIdGNjbHh1SUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZER0Y2NseHVJQ0FnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnZlNsY2NseHVYSEpjYmlBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXlaWE5wZW1WSVlXNWtiR1V1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWkdKc1kyeHBZMnNuTENCbWRXNWpkR2x2YmlncElIdGNjbHh1SUNBZ0lDQWdiVzkyWlVGMEtITmxkSFJwYm1kekxuTnBlbVZ6TG5ncE8xeHlYRzRnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1NXNXBkR2xoYkNCY2NseHVJQ0FnSUcxdmRtVkJkQ2h6WlhSMGFXNW5jeTV6YVhwbGN5NTRLVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSFJvWVhRdWFXNXBkR2xoYkdsNlpTQTlJR2x1YVhScFlXeHBlbVU3WEhKY2JseHlYRzRnSUhKbGRIVnliaUIwYUdGME8xeHlYRzU5S1NncE95SXNJbVY0Y0c5eWRDQmpiMjV6ZENCelkzSnZiR3hJWVc1a2JHVnlJRDBnWm5WdVkzUnBiMjRvYjJabWMyVjBLU0I3WEhKY2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNiaUFnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc0Z0lDQWdZMjl1YzNRZ2FISmxaaUE5SUhSb2FYTXVaMlYwUVhSMGNtbGlkWFJsS0Nkb2NtVm1KeWs3WEhKY2JpQWdJQ0JqYjI1emRDQnZabVp6WlhSVWIzQWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtHQWtlMmh5WldaOVlDa3ViMlptYzJWMFZHOXdPMXh5WEc0Z0lDQWdjMk55YjJ4c0tIdGNjbHh1SUNBZ0lDQWdkRzl3T2lCdlptWnpaWFJVYjNBZ0xTQnZabVp6WlhRc1hISmNiaUFnSUNBZ0lHSmxhR0YyYVc5eU9pQW5jMjF2YjNSb0oxeHlYRzRnSUNBZ2ZTbGNjbHh1SUNCOVhISmNibjBpTENKamIyNXpkQ0J0WVd0bFNYUmxiWE1nUFNBb0tTQTlQaUI3WEhKY2JpQWdiR1YwSUdsMFpXMXpJRDBnSnljN1hISmNibHh5WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dNakE3SUdrckt5a2dlMXh5WEc0Z0lDQWdhWFJsYlhNZ0t6MGdZRnh5WEc0Z0lDQWdJQ0E4YkdrZ1kyeGhjM005WENKbmNtOTFjRjlwZEdWdElHTnZiRE5jSWo1Y2NseHVJQ0FnSUNBZ0lDQThZU0JqYkdGemN6MWNJbWR5YjNWd1gybDBaVzFmYkdsdWExd2lQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbU5oY21SY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbU5oY21SZmFXTnZiaUJzYjJGa2FXNW5YQ0krUEM5a2FYWStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqWVhKa1gySnZaSGxjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGFEUWdZMnhoYzNNOVhDSmpZWEprWDNScGRHeGxJR3h2WVdScGJtZGNJajQ4TDJnMFBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdJR05zWVhOelBWd2lZMkZ5WkY5MFpYaDBJR3h2WVdScGJtZGNJajQ4TDNBK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEhKY2JpQWdJQ0FnSUNBZ1BDOWhQbHh5WEc0Z0lDQWdJQ0E4TDJ4cFBseHlYRzRnSUNBZ1lEdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lISmxkSFZ5YmlCcGRHVnRjenRjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdOdmJuTjBJR2RsZEZOclpXeGxkRzl1SUQwZ0tDa2dQVDRnWUZ4eVhHNGdJRHh6WldOMGFXOXVJR05zWVhOelBWd2laM0p2ZFhCY0lpQStYSEpjYmlBZ0lDQThhRE1nWTJ4aGMzTTlYQ0puY205MWNGOTBhWFJzWlNCc2IyRmthVzVuWENJK1BDOW9NejVjY2x4dUlDQWdJRHhrYVhZZ1kyeGhjM005WENKbmNtOTFjRjlqYjI1MFpXNTBYQ0krWEhKY2JpQWdJQ0FnSUR4MWJDQmpiR0Z6Y3oxY0luSnZkeUJuY205MWNGOXBkR1Z0YzF3aVBseHlYRzRnSUNBZ0lDQWdJQ1I3YldGclpVbDBaVzF6S0NsOVhISmNiaUFnSUNBZ0lEd3ZkV3crWEhKY2JpQWdJQ0E4TDJScGRqNWNjbHh1SUNBOEwzTmxZM1JwYjI0K1hISmNibUE3WEhKY2JseHlYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdjbVZ1WkdWeUtITmxiR1ZqZEc5eUxDQjBaVzF3YkdGMFpTa2dlMXh5WEc0Z0lHTnZibk4wSUhSaGNtZGxkQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9jMlZzWldOMGIzSXBPMXh5WEc0Z0lHbG1JQ2doZEdGeVoyVjBLU0J5WlhSMWNtNDdYSEpjYmlBZ2RHRnlaMlYwTG1sdWJtVnlTRlJOVENBOUlIUmxiWEJzWVhSbEtDazdYSEpjYm4waVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSJ9
