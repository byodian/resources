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
/* harmony import */ var _services_resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/resources */ "./src/js/services/resources.js");


const render = (function() {
  // Variables
  const that = {};
  const defaults = {
    navItemContainer: '.left_menu_items',
    sectionsContainer: '#section_groups',
    resources: [],
    callback: function (content) {
      return content;
    },
  };

  // Generate a item of the navigation
  const generateNavItem = category => `
    <li class="left_menu_item">
      <img class="menu_item_icon" src="./svg/example.svg"></img>
      <span class="menu_item_content">${category}</span>
    </li>
  `;

  // Generate a section of the main content
  const generateSection = category => `
    <section id="${category}" class="group" >
      <h3 class="group_title">${category}</h3>
      <div class="group_content">
        <ul class="row group_items"></ul>
      </div>
    </section>  
  `;

  // Generate a list of the section 
  const generateListOfSection = resource => `
    <li class="group_item col3">
      <a class="group_item_link" href="${resource.linkHref}">
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

  // Methods
  // Remove duplicate values from an array
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const toggleNav = function() {
    document.querySelector('#content_wrapper').classList.toggle('is-closed');
  }

  // Insert left navigation items into document
  const renderNavItems = function (selector, categories) {
    // Check the selector  for validity
    if(!document.querySelector(selector)) return;

    const items = categories
      .map(category => generateNavItem(category))
      .join('')
    document.querySelector(selector).innerHTML = items;
  };

  // Render section groups to document
  const renderSectionGroups = function(selector, categories) {
    // Check the selector for vaidity
    if (!document.querySelector(selector)) return;
    if (typeof categories !== 'object') return;
    
    // Get section items
    const groups = categories
      .map(category => generateSection(category))
      .join('');
    document.querySelector(selector).innerHTML = groups;
  }

  // Get section items
  const renderSectionItmes = function(id, resources) {
    if (typeof resources !== 'object') return;
    if (!document.querySelector(`#${id} .group_items`)) return;

    const makeup = resources
      .filter(resource => resource.category.trim() === id)
      .map(resource => generateListOfSection(resource))
      .join('')

    document.querySelector(`#${id} .group_items`).innerHTML = makeup;
  }

  //

  // Init events
  const init = function (options) {
    options = options || {};

    // Merge both user defaults and options.
    const settings = Object.assign({}, defaults, options);

    // Get all categories of resources
    const categories = uniqueArray(settings.resources.map(resource => resource.category));

    renderNavItems(settings.navItemContainer, categories);
    renderSectionGroups(settings.sectionsContainer, categories);

    // Render sections items on document
    categories.forEach(category => {          
      renderSectionItmes(category, settings.resources)
    })

    // Event
    document.querySelector('.top_bar_btn').addEventListener('click', toggleNav, false);
  };

    // Update the content 
  const update = function(data) {
    defaults.resources = defaults.resources.concat(data);
    init(defaults.resources);
  }

  // Get resources from the service side
  _services_resources__WEBPACK_IMPORTED_MODULE_0__["default"]
    .getAll()
    .then(data => {
      update(data);
    });

  // resourcesService
  //   .create({
  //     "title": "Happy Birthday",
  //     "content": "聚集地",
  //     "src": "./img/file-app.png",
  //     "linkHref": "https://eleduck.com/",
  //     "category": "blog",
  //   })
  //   .then(data => {
  //     update(data)
  //   })

// Inits & Events
  that.init = init;

  return that;
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

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/services/resources.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\services\resources.js */"./src/js/services/resources.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcmVzb3VyY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FB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LCtCQUErQixHQUFHO0FBQ2xDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQzs7QUFFckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0M7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDJEQUFnQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLEk7Ozs7Ozs7Ozs7OztBQ25KRDtBQUFBO0FBQUE7QUFBMEI7QUFDMUI7O0FBRUE7QUFDQSxrQkFBa0IsNENBQUs7QUFDdkI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQiw0Q0FBSztBQUN2QjtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLDRDQUFLLFFBQVEsUUFBUSxHQUFHLEdBQUc7QUFDN0M7QUFDQTs7QUFFZSxnRUFBQyx5QkFBeUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSA6ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFyZXF1ZXN0RGF0YSkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT01cbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaW1wb3J0IHJlc291cmNlc1NlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9yZXNvdXJjZXMnO1xyXG5cclxuY29uc3QgcmVuZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIGNvbnN0IHRoYXQgPSB7fTtcclxuICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgIG5hdkl0ZW1Db250YWluZXI6ICcubGVmdF9tZW51X2l0ZW1zJyxcclxuICAgIHNlY3Rpb25zQ29udGFpbmVyOiAnI3NlY3Rpb25fZ3JvdXBzJyxcclxuICAgIHJlc291cmNlczogW10sXHJcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIC8vIEdlbmVyYXRlIGEgaXRlbSBvZiB0aGUgbmF2aWdhdGlvblxyXG4gIGNvbnN0IGdlbmVyYXRlTmF2SXRlbSA9IGNhdGVnb3J5ID0+IGBcclxuICAgIDxsaSBjbGFzcz1cImxlZnRfbWVudV9pdGVtXCI+XHJcbiAgICAgIDxpbWcgY2xhc3M9XCJtZW51X2l0ZW1faWNvblwiIHNyYz1cIi4vc3ZnL2V4YW1wbGUuc3ZnXCI+PC9pbWc+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVudV9pdGVtX2NvbnRlbnRcIj4ke2NhdGVnb3J5fTwvc3Bhbj5cclxuICAgIDwvbGk+XHJcbiAgYDtcclxuXHJcbiAgLy8gR2VuZXJhdGUgYSBzZWN0aW9uIG9mIHRoZSBtYWluIGNvbnRlbnRcclxuICBjb25zdCBnZW5lcmF0ZVNlY3Rpb24gPSBjYXRlZ29yeSA9PiBgXHJcbiAgICA8c2VjdGlvbiBpZD1cIiR7Y2F0ZWdvcnl9XCIgY2xhc3M9XCJncm91cFwiID5cclxuICAgICAgPGgzIGNsYXNzPVwiZ3JvdXBfdGl0bGVcIj4ke2NhdGVnb3J5fTwvaDM+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJncm91cF9jb250ZW50XCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+PC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+ICBcclxuICBgO1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhIGxpc3Qgb2YgdGhlIHNlY3Rpb24gXHJcbiAgY29uc3QgZ2VuZXJhdGVMaXN0T2ZTZWN0aW9uID0gcmVzb3VyY2UgPT4gYFxyXG4gICAgPGxpIGNsYXNzPVwiZ3JvdXBfaXRlbSBjb2wzXCI+XHJcbiAgICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCIgaHJlZj1cIiR7cmVzb3VyY2UubGlua0hyZWZ9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJjYXJkX2ljb25cIiBzcmM9XCIke3Jlc291cmNlLnNyY31cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkX2JvZHlcIj5cclxuICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2FyZF90aXRsZVwiPiR7cmVzb3VyY2UudGl0bGV9PC9oND5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHRcIj4ke3Jlc291cmNlLmNvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYT5cclxuICAgIDwvbGk+XHJcbiAgYDtcclxuXHJcbiAgLy8gTWV0aG9kc1xyXG4gIC8vIFJlbW92ZSBkdXBsaWNhdGUgdmFsdWVzIGZyb20gYW4gYXJyYXlcclxuICBjb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIHJldHVybiBhcnIuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0b2dnbGVOYXYgPSBmdW5jdGlvbigpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50X3dyYXBwZXInKS5jbGFzc0xpc3QudG9nZ2xlKCdpcy1jbG9zZWQnKTtcclxuICB9XHJcblxyXG4gIC8vIEluc2VydCBsZWZ0IG5hdmlnYXRpb24gaXRlbXMgaW50byBkb2N1bWVudFxyXG4gIGNvbnN0IHJlbmRlck5hdkl0ZW1zID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjYXRlZ29yaWVzKSB7XHJcbiAgICAvLyBDaGVjayB0aGUgc2VsZWN0b3IgIGZvciB2YWxpZGl0eVxyXG4gICAgaWYoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaXRlbXMgPSBjYXRlZ29yaWVzXHJcbiAgICAgIC5tYXAoY2F0ZWdvcnkgPT4gZ2VuZXJhdGVOYXZJdGVtKGNhdGVnb3J5KSlcclxuICAgICAgLmpvaW4oJycpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5pbm5lckhUTUwgPSBpdGVtcztcclxuICB9O1xyXG5cclxuICAvLyBSZW5kZXIgc2VjdGlvbiBncm91cHMgdG8gZG9jdW1lbnRcclxuICBjb25zdCByZW5kZXJTZWN0aW9uR3JvdXBzID0gZnVuY3Rpb24oc2VsZWN0b3IsIGNhdGVnb3JpZXMpIHtcclxuICAgIC8vIENoZWNrIHRoZSBzZWxlY3RvciBmb3IgdmFpZGl0eVxyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSkgcmV0dXJuO1xyXG4gICAgaWYgKHR5cGVvZiBjYXRlZ29yaWVzICE9PSAnb2JqZWN0JykgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAvLyBHZXQgc2VjdGlvbiBpdGVtc1xyXG4gICAgY29uc3QgZ3JvdXBzID0gY2F0ZWdvcmllc1xyXG4gICAgICAubWFwKGNhdGVnb3J5ID0+IGdlbmVyYXRlU2VjdGlvbihjYXRlZ29yeSkpXHJcbiAgICAgIC5qb2luKCcnKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLmlubmVySFRNTCA9IGdyb3VwcztcclxuICB9XHJcblxyXG4gIC8vIEdldCBzZWN0aW9uIGl0ZW1zXHJcbiAgY29uc3QgcmVuZGVyU2VjdGlvbkl0bWVzID0gZnVuY3Rpb24oaWQsIHJlc291cmNlcykge1xyXG4gICAgaWYgKHR5cGVvZiByZXNvdXJjZXMgIT09ICdvYmplY3QnKSByZXR1cm47XHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfSAuZ3JvdXBfaXRlbXNgKSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1ha2V1cCA9IHJlc291cmNlc1xyXG4gICAgICAuZmlsdGVyKHJlc291cmNlID0+IHJlc291cmNlLmNhdGVnb3J5LnRyaW0oKSA9PT0gaWQpXHJcbiAgICAgIC5tYXAocmVzb3VyY2UgPT4gZ2VuZXJhdGVMaXN0T2ZTZWN0aW9uKHJlc291cmNlKSlcclxuICAgICAgLmpvaW4oJycpXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9IC5ncm91cF9pdGVtc2ApLmlubmVySFRNTCA9IG1ha2V1cDtcclxuICB9XHJcblxyXG4gIC8vXHJcblxyXG4gIC8vIEluaXQgZXZlbnRzXHJcbiAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAvLyBNZXJnZSBib3RoIHVzZXIgZGVmYXVsdHMgYW5kIG9wdGlvbnMuXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIGNhdGVnb3JpZXMgb2YgcmVzb3VyY2VzXHJcbiAgICBjb25zdCBjYXRlZ29yaWVzID0gdW5pcXVlQXJyYXkoc2V0dGluZ3MucmVzb3VyY2VzLm1hcChyZXNvdXJjZSA9PiByZXNvdXJjZS5jYXRlZ29yeSkpO1xyXG5cclxuICAgIHJlbmRlck5hdkl0ZW1zKHNldHRpbmdzLm5hdkl0ZW1Db250YWluZXIsIGNhdGVnb3JpZXMpO1xyXG4gICAgcmVuZGVyU2VjdGlvbkdyb3VwcyhzZXR0aW5ncy5zZWN0aW9uc0NvbnRhaW5lciwgY2F0ZWdvcmllcyk7XHJcblxyXG4gICAgLy8gUmVuZGVyIHNlY3Rpb25zIGl0ZW1zIG9uIGRvY3VtZW50XHJcbiAgICBjYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4geyAgICAgICAgICBcclxuICAgICAgcmVuZGVyU2VjdGlvbkl0bWVzKGNhdGVnb3J5LCBzZXR0aW5ncy5yZXNvdXJjZXMpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEV2ZW50XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9wX2Jhcl9idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZU5hdiwgZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gICAgLy8gVXBkYXRlIHRoZSBjb250ZW50IFxyXG4gIGNvbnN0IHVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIGRlZmF1bHRzLnJlc291cmNlcyA9IGRlZmF1bHRzLnJlc291cmNlcy5jb25jYXQoZGF0YSk7XHJcbiAgICBpbml0KGRlZmF1bHRzLnJlc291cmNlcyk7XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgcmVzb3VyY2VzIGZyb20gdGhlIHNlcnZpY2Ugc2lkZVxyXG4gIHJlc291cmNlc1NlcnZpY2VcclxuICAgIC5nZXRBbGwoKVxyXG4gICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIHVwZGF0ZShkYXRhKTtcclxuICAgIH0pO1xyXG5cclxuICAvLyByZXNvdXJjZXNTZXJ2aWNlXHJcbiAgLy8gICAuY3JlYXRlKHtcclxuICAvLyAgICAgXCJ0aXRsZVwiOiBcIkhhcHB5IEJpcnRoZGF5XCIsXHJcbiAgLy8gICAgIFwiY29udGVudFwiOiBcIuiBmumbhuWcsFwiLFxyXG4gIC8vICAgICBcInNyY1wiOiBcIi4vaW1nL2ZpbGUtYXBwLnBuZ1wiLFxyXG4gIC8vICAgICBcImxpbmtIcmVmXCI6IFwiaHR0cHM6Ly9lbGVkdWNrLmNvbS9cIixcclxuICAvLyAgICAgXCJjYXRlZ29yeVwiOiBcImJsb2dcIixcclxuICAvLyAgIH0pXHJcbiAgLy8gICAudGhlbihkYXRhID0+IHtcclxuICAvLyAgICAgdXBkYXRlKGRhdGEpXHJcbiAgLy8gICB9KVxyXG5cclxuLy8gSW5pdHMgJiBFdmVudHNcclxuICB0aGF0LmluaXQgPSBpbml0O1xyXG5cclxuICByZXR1cm4gdGhhdDtcclxufSkoKTsiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5jb25zdCBiYXNlVXJsID0gJy8ubmV0bGlmeS9mdW5jdGlvbnMvYXBpL3Jlc291cmNlcyc7XHJcblxyXG5jb25zdCBnZXRBbGwgPSBmdW5jdGlvbigpIHtcclxuICBjb25zdCByZXF1ZXN0ID0gYXhpb3MuZ2V0KGJhc2VVcmwpO1xyXG4gIHJldHVybiByZXF1ZXN0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuZGF0YSk7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKG5ld09iamVjdCkge1xyXG4gIGNvbnN0IHJlcXVlc3QgPSBheGlvcy5wb3N0KGJhc2VVcmwsIG5ld09iamVjdCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuY29uc3QgdXBkYXRlID0gZnVuY3Rpb24oaWQsIG5ld09iamVjdCkge1xyXG4gIGNvbnN0IHJlcXVlc3QgPSBheGlvcy5wdXQoYCR7YmFzZVVybH0vJHtpZH1gLCBuZXdPYmplY3QpO1xyXG4gIHJldHVybiByZXF1ZXN0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgZ2V0QWxsLCBjcmVhdGUsIHVwZGF0ZSB9XHJcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMmx1WkdWNExtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVdSaGNIUmxjbk12ZUdoeUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVhocGIzTXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5allXNWpaV3d2UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyRnVZMlZzTDBOaGJtTmxiRlJ2YTJWdUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTJGdVkyVnNMMmx6UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlCZUdsdmN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJOdmNtVXZTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlpZFdsc1pFWjFiR3hRWVhSb0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOWpjbVZoZEdWRmNuSnZjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyTnZjbVV2WkdsemNHRjBZMmhTWlhGMVpYTjBMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlsYm1oaGJtTmxSWEp5YjNJdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlqYjNKbEwyMWxjbWRsUTI5dVptbG5MbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzl6WlhSMGJHVXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5amIzSmxMM1J5WVc1elptOXliVVJoZEdFdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlrWldaaGRXeDBjeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlltbHVaQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlluVnBiR1JWVWt3dWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMMk52YldKcGJtVlZVa3h6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZhR1ZzY0dWeWN5OWpiMjlyYVdWekxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzBGaWMyOXNkWFJsVlZKTUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzFWU1RGTmhiV1ZQY21sbmFXNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5b1pXeHdaWEp6TDI1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMM0JoY25ObFNHVmhaR1Z5Y3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMmhsYkhCbGNuTXZjM0J5WldGa0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2ZFhScGJITXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDNCeWIyTmxjM012WW5KdmQzTmxjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZiV0ZwYmk1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12YzJWeWRtbGpaWE12Y21WemIzVnlZMlZ6TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1VVRkJRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUczdPMUZCUjBFN1VVRkRRVHM3VVVGRlFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN1VVRkRRVHRSUVVOQkxEQkRRVUV3UXl4blEwRkJaME03VVVGRE1VVTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTeDNSRUZCZDBRc2EwSkJRV3RDTzFGQlF6RkZPMUZCUTBFc2FVUkJRV2xFTEdOQlFXTTdVVUZETDBRN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTEhsRFFVRjVReXhwUTBGQmFVTTdVVUZETVVVc1owaEJRV2RJTEcxQ1FVRnRRaXhGUVVGRk8xRkJRM0pKTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk8xRkJRMEVzTWtKQlFUSkNMREJDUVVFd1FpeEZRVUZGTzFGQlEzWkVMR2xEUVVGcFF5eGxRVUZsTzFGQlEyaEVPMUZCUTBFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTEhORVFVRnpSQ3dyUkVGQkswUTdPMUZCUlhKSU8xRkJRMEU3T3p0UlFVZEJPMUZCUTBFN096czdPenM3T3pzN096dEJRMnhHUVN4cFFrRkJhVUlzYlVKQlFVOHNRMEZCUXl4elJFRkJZU3hGT3pzN096czdPenM3T3pzN1FVTkJla0k3TzBGQlJXSXNXVUZCV1N4dFFrRkJUeXhEUVVGRExIRkVRVUZaTzBGQlEyaERMR0ZCUVdFc2JVSkJRVThzUTBGQlF5eHBSVUZCYTBJN1FVRkRka01zWTBGQll5eHRRa0ZCVHl4RFFVRkRMSGxGUVVGelFqdEJRVU0xUXl4bFFVRmxMRzFDUVVGUExFTkJRVU1zTWtWQlFYVkNPMEZCUXpsRExHOUNRVUZ2UWl4dFFrRkJUeXhEUVVGRExEWkZRVUYxUWp0QlFVTnVSQ3h0UWtGQmJVSXNiVUpCUVU4c1EwRkJReXh0UmtGQk1rSTdRVUZEZEVRc2MwSkJRWE5DTEcxQ1FVRlBMRU5CUVVNc2VVWkJRVGhDTzBGQlF6VkVMR3RDUVVGclFpeHRRa0ZCVHl4RFFVRkRMSGxGUVVGeFFqczdRVUZGTDBNN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN3MFEwRkJORU03UVVGRE5VTTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN096czdPenM3T3pzN096czdRVU5zVEdFN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMR3RFUVVGVE8wRkJRemRDTEZkQlFWY3NiVUpCUVU4c1EwRkJReXhuUlVGQlowSTdRVUZEYmtNc1dVRkJXU3h0UWtGQlR5eERRVUZETERSRVFVRmpPMEZCUTJ4RExHdENRVUZyUWl4dFFrRkJUeXhEUVVGRExIZEZRVUZ2UWp0QlFVTTVReXhsUVVGbExHMUNRVUZQTEVOQlFVTXNkMFJCUVZrN08wRkJSVzVETzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFpRVUZaTEUxQlFVMDdRVUZEYkVJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNaVUZCWlN4dFFrRkJUeXhEUVVGRExHdEZRVUZwUWp0QlFVTjRReXh2UWtGQmIwSXNiVUpCUVU4c1EwRkJReXcwUlVGQmMwSTdRVUZEYkVRc2FVSkJRV2xDTEcxQ1FVRlBMRU5CUVVNc2MwVkJRVzFDT3p0QlFVVTFRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdWQlFXVXNiVUpCUVU4c1EwRkJReXh2UlVGQmEwSTdPMEZCUlhwRE96dEJRVVZCTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOd1JHRTdPMEZCUldJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEZGQlFWRTdRVUZEYmtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCT3pzN096czdPenM3T3pzN08wRkRiRUpoT3p0QlFVVmlMR0ZCUVdFc2JVSkJRVThzUTBGQlF5d3lSRUZCVlRzN1FVRkZMMEk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0R0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3pzN096czdPenM3T3pzN08wRkRlRVJoT3p0QlFVVmlPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEwcGhPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHRCUVVOb1F5eGxRVUZsTEcxQ1FVRlBMRU5CUVVNc2VVVkJRWEZDTzBGQlF6VkRMSGxDUVVGNVFpeHRRa0ZCVHl4RFFVRkRMR2xHUVVGelFqdEJRVU4yUkN4elFrRkJjMElzYlVKQlFVOHNRMEZCUXl3eVJVRkJiVUk3UVVGRGFrUXNhMEpCUVd0Q0xHMUNRVUZQTEVOQlFVTXNiVVZCUVdVN08wRkJSWHBETzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdRVUZEU0R0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0R0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdkRVFVRm5SRHRCUVVOb1JEdEJRVU5CTzBGQlEwRXNlVUpCUVhsQ08wRkJRM3BDTEV0QlFVczdRVUZEVER0QlFVTkJMRU5CUVVNN08wRkJSVVE3UVVGRFFUdEJRVU5CTzBGQlEwRXNaMFJCUVdkRU8wRkJRMmhFTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQkxFTkJRVU03TzBGQlJVUTdPenM3T3pzN096czdPenM3UVVNNVJtRTdPMEZCUldJc1dVRkJXU3h0UWtGQlR5eERRVUZETEhGRVFVRlpPenRCUVVWb1F6dEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFRRVUZUTzBGQlEzQkNMRmRCUVZjc1UwRkJVenRCUVVOd1FqdEJRVU5CTEZsQlFWa3NUMEZCVHp0QlFVTnVRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU96dEJRVVZCT3pzN096czdPenM3T3pzN08wRkRia1JoT3p0QlFVVmlMRzlDUVVGdlFpeHRRa0ZCVHl4RFFVRkRMRzFHUVVFd1FqdEJRVU4wUkN4clFrRkJhMElzYlVKQlFVOHNRMEZCUXl3clJVRkJkMEk3TzBGQlJXeEVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMjVDWVRzN1FVRkZZaXh0UWtGQmJVSXNiVUpCUVU4c1EwRkJReXh4UlVGQlowSTdPMEZCUlRORE8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeE5RVUZOTzBGQlEyNUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTnFRbUU3TzBGQlJXSXNXVUZCV1N4dFFrRkJUeXhEUVVGRExIRkVRVUZaTzBGQlEyaERMRzlDUVVGdlFpeHRRa0ZCVHl4RFFVRkRMSFZGUVVGcFFqdEJRVU0zUXl4bFFVRmxMRzFDUVVGUExFTkJRVU1zZFVWQlFXOUNPMEZCUXpORExHVkJRV1VzYlVKQlFVOHNRMEZCUXl4NVJFRkJZVHM3UVVGRmNFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzSzBKQlFTdENPMEZCUXk5Q0xIVkRRVUYxUXp0QlFVTjJRenRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdPenM3T3pzN096czdPenRCUXpsRllUczdRVUZGWWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFMUJRVTA3UVVGRGFrSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1RVRkJUVHRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096czdPenM3T3pzN096czdRVU42UTJFN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMRzFFUVVGVk96dEJRVVU1UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFBRVUZQTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTERKQ1FVRXlRanRCUVVNelFpeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRXNSMEZCUnpzN1FVRkZTRHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVERzN1FVRkZRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEZEVaaE96dEJRVVZpTEd0Q1FVRnJRaXh0UWtGQlR5eERRVUZETEcxRlFVRmxPenRCUVVWNlF6dEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFRRVUZUTzBGQlEzQkNMRmRCUVZjc1QwRkJUenRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzaENZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVms3TzBGQlJXaERPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzWTBGQll6dEJRVU42UWl4WFFVRlhMRTFCUVUwN1FVRkRha0lzVjBGQlZ5eGxRVUZsTzBGQlF6RkNMR0ZCUVdFc1JVRkJSVHRCUVVObU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTnVRa0VzSzBOQlFXRTdPMEZCUldJc1dVRkJXU3h0UWtGQlR5eERRVUZETEd0RVFVRlRPMEZCUXpkQ0xEQkNRVUV3UWl4dFFrRkJUeXhEUVVGRExEaEdRVUVyUWpzN1FVRkZha1U3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hqUVVGakxHMUNRVUZQTEVOQlFVTXNaMFZCUVdkQ08wRkJRM1JETEVkQlFVYzdRVUZEU0R0QlFVTkJMR05CUVdNc2JVSkJRVThzUTBGQlF5eHBSVUZCYVVJN1FVRkRka003UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3gzUlVGQmQwVTdRVUZEZUVVN1FVRkRRVHRCUVVOQk8wRkJRMEVzZFVSQlFYVkVPMEZCUTNaRU8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVOHNXVUZCV1R0QlFVTnVRanRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0R0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hEUVVGRE96dEJRVVZFTzBGQlEwRTdRVUZEUVN4RFFVRkRPenRCUVVWRU96czdPenM3T3pzN096czdPenRCUTJwSFlUczdRVUZGWWp0QlFVTkJPMEZCUTBFN1FVRkRRU3h0UWtGQmJVSXNhVUpCUVdsQ08wRkJRM0JETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096czdPenM3T3pzN096czdRVU5XWVRzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN08wRkJSV2hETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVDBGQlR6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEVzUjBGQlJ6dEJRVU5JT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RTEV0QlFVczdPMEZCUlV3N1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRM0pGWVRzN1FVRkZZanRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOaVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdPMEZCUldoRE8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVN3d1EwRkJNRU03UVVGRE1VTXNVMEZCVXpzN1FVRkZWRHRCUVVOQkxEUkVRVUUwUkN4M1FrRkJkMEk3UVVGRGNFWTdRVUZEUVN4VFFVRlRPenRCUVVWVU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3pzN1FVRkZURHRCUVVOQk8wRkJRMEU3UVVGRFFTeHJRMEZCYTBNN1FVRkRiRU1zSzBKQlFTdENMR0ZCUVdFc1JVRkJSVHRCUVVNNVF6dEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PenM3T3pzN096czdPenM3TzBGRGNFUmhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTmlZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVms3TzBGQlJXaERPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNUMEZCVHp0QlFVTnlRaXhuUWtGQlowSTdRVUZEYUVJN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hqUVVGakxFOUJRVTg3UVVGRGNrSXNaMEpCUVdkQ0xGRkJRVkU3UVVGRGVFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6czdRVUZGVER0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NT3pzN096czdPenM3T3pzN08wRkRia1ZoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHRSRUZCVlRzN1FVRkZPVUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU96czdPenM3T3pzN096czdPMEZEV0dFN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMSEZFUVVGWk96dEJRVVZvUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFc2FVSkJRV2xDTEdWQlFXVTdPMEZCUldoRE8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOd1JHRTdPMEZCUldJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEN0Q1FVRXJRanRCUVVNdlFqdEJRVU5CTzBGQlEwRXNWMEZCVnl4VFFVRlRPMEZCUTNCQ0xHRkJRV0U3UVVGRFlqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096czdPenM3T3pzN096czdRVU14UW1FN08wRkJSV0lzVjBGQlZ5eHRRa0ZCVHl4RFFVRkRMR2RGUVVGblFqczdRVUZGYmtNN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WlFVRlpMRkZCUVZFN1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVDBGQlR6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NZVUZCWVR0QlFVTjRRaXhYUVVGWExGTkJRVk03UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEcxRFFVRnRReXhQUVVGUE8wRkJRekZETzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIVkNRVUYxUWl4VFFVRlRMRWRCUVVjc1UwRkJVenRCUVVNMVF5d3lRa0ZCTWtJN1FVRkRNMEk3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExFOUJRVTg3UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTERSQ1FVRTBRanRCUVVNMVFpeExRVUZMTzBGQlEwdzdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk96dEJRVVZCTEhWRFFVRjFReXhQUVVGUE8wRkJRemxETzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGbEJRVmtzVDBGQlR6dEJRVU51UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzV1VGQldTeFBRVUZQTzBGQlEyNUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPMEZET1ZaQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hUUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJPMEZCUTBFc1EwRkJRenRCUVVORU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRVHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVRzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFTeFRRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3p0QlFVbEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVFrRkJkVUlzYzBKQlFYTkNPMEZCUXpkRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNjVUpCUVhGQ08wRkJRM0pDT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFTeHhRMEZCY1VNN08wRkJSWEpETzBGQlEwRTdRVUZEUVRzN1FVRkZRU3d5UWtGQk1rSTdRVUZETTBJN1FVRkRRVHRCUVVOQk8wRkJRMEVzTkVKQlFUUkNMRlZCUVZVN096czdPenM3T3pzN096czdRVU4yVEhSRE8wRkJRVUU3UVVGQmIwUTdPMEZCUlhCRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIZERRVUYzUXl4VFFVRlRPMEZCUTJwRU8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRzFDUVVGdFFpeFRRVUZUTzBGQlF6VkNMR2REUVVGblF5eFRRVUZUTzBGQlEzcERPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2VVTkJRWGxETEd0Q1FVRnJRanRCUVVNelJEdEJRVU5CTEhkRFFVRjNReXhoUVVGaE8wRkJRM0pFTzBGQlEwRXNjVU5CUVhGRExHVkJRV1U3UVVGRGNFUXNiVU5CUVcxRExHbENRVUZwUWp0QlFVTndSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNiME5CUVc5RExFZEJRVWM3TzBGQlJYWkRPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTEN0Q1FVRXJRaXhIUVVGSE8wRkJRMnhET3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMSEZEUVVGeFF6czdRVUZGY2tNN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2IwTTdRVUZEUVR0QlFVTkJMRXRCUVVzN08wRkJSVXc3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RlFVRkZMREpFUVVGblFqdEJRVU5zUWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVVVGQlVUdEJRVU5TTzBGQlEwRTdRVUZEUVN4UlFVRlJPenRCUVVWU08wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RFFVRkRMRWs3T3pzN096czdPenM3T3p0QlEyNUtSRHRCUVVGQk8wRkJRVUU3UVVGQk1FSTdRVUZETVVJN08wRkJSVUU3UVVGRFFTeHJRa0ZCYTBJc05FTkJRVXM3UVVGRGRrSTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxHdENRVUZyUWl3MFEwRkJTenRCUVVOMlFqdEJRVU5CT3p0QlFVVkJPMEZCUTBFc2EwSkJRV3RDTERSRFFVRkxMRkZCUVZFc1VVRkJVU3hIUVVGSExFZEJRVWM3UVVGRE4wTTdRVUZEUVRzN1FVRkZaU3huUlVGQlF5eDVRa0ZCZVVJaUxDSm1hV3hsSWpvaU56RmpNemxsTVdKa01XWXdOMkkxTlRSaU9ERXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJZ1hIUXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzRnWEhSMllYSWdhVzV6ZEdGc2JHVmtUVzlrZFd4bGN5QTlJSHQ5TzF4dVhHNGdYSFF2THlCVWFHVWdjbVZ4ZFdseVpTQm1kVzVqZEdsdmJseHVJRngwWm5WdVkzUnBiMjRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlodGIyUjFiR1ZKWkNrZ2UxeHVYRzRnWEhSY2RDOHZJRU5vWldOcklHbG1JRzF2WkhWc1pTQnBjeUJwYmlCallXTm9aVnh1SUZ4MFhIUnBaaWhwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYU2tnZTF4dUlGeDBYSFJjZEhKbGRIVnliaUJwYm5OMFlXeHNaV1JOYjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVsZUhCdmNuUnpPMXh1SUZ4MFhIUjlYRzRnWEhSY2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc0Z1hIUmNkSFpoY2lCdGIyUjFiR1VnUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNBOUlIdGNiaUJjZEZ4MFhIUnBPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzT2lCbVlXeHpaU3hjYmlCY2RGeDBYSFJsZUhCdmNuUnpPaUI3ZlZ4dUlGeDBYSFI5TzF4dVhHNGdYSFJjZEM4dklFVjRaV04xZEdVZ2RHaGxJRzF2WkhWc1pTQm1kVzVqZEdsdmJseHVJRngwWEhSdGIyUjFiR1Z6VzIxdlpIVnNaVWxrWFM1allXeHNLRzF2WkhWc1pTNWxlSEJ2Y25SekxDQnRiMlIxYkdVc0lHMXZaSFZzWlM1bGVIQnZjblJ6TENCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktUdGNibHh1SUZ4MFhIUXZMeUJHYkdGbklIUm9aU0J0YjJSMWJHVWdZWE1nYkc5aFpHVmtYRzRnWEhSY2RHMXZaSFZzWlM1c0lEMGdkSEoxWlR0Y2JseHVJRngwWEhRdkx5QlNaWFIxY200Z2RHaGxJR1Y0Y0c5eWRITWdiMllnZEdobElHMXZaSFZzWlZ4dUlGeDBYSFJ5WlhSMWNtNGdiVzlrZFd4bExtVjRjRzl5ZEhNN1hHNGdYSFI5WEc1Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdWeklHOWlhbVZqZENBb1gxOTNaV0p3WVdOclgyMXZaSFZzWlhOZlh5bGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJTQTlJRzF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxJR05oWTJobFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1NZ1BTQnBibk4wWVd4c1pXUk5iMlIxYkdWek8xeHVYRzRnWEhRdkx5QmtaV1pwYm1VZ1oyVjBkR1Z5SUdaMWJtTjBhVzl1SUdadmNpQm9ZWEp0YjI1NUlHVjRjRzl5ZEhOY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WkNBOUlHWjFibU4wYVc5dUtHVjRjRzl5ZEhNc0lHNWhiV1VzSUdkbGRIUmxjaWtnZTF4dUlGeDBYSFJwWmlnaFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXZLR1Y0Y0c5eWRITXNJRzVoYldVcEtTQjdYRzRnWEhSY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUc1aGJXVXNJSHNnWlc1MWJXVnlZV0pzWlRvZ2RISjFaU3dnWjJWME9pQm5aWFIwWlhJZ2ZTazdYRzRnWEhSY2RIMWNiaUJjZEgwN1hHNWNiaUJjZEM4dklHUmxabWx1WlNCZlgyVnpUVzlrZFd4bElHOXVJR1Y0Y0c5eWRITmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNpQTlJR1oxYm1OMGFXOXVLR1Y0Y0c5eWRITXBJSHRjYmlCY2RGeDBhV1lvZEhsd1pXOW1JRk41YldKdmJDQWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdVM2x0WW05c0xuUnZVM1J5YVc1blZHRm5LU0I3WEc0Z1hIUmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHVjRjRzl5ZEhNc0lGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5d2dleUIyWVd4MVpUb2dKMDF2WkhWc1pTY2dmU2s3WEc0Z1hIUmNkSDFjYmlCY2RGeDBUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0dWNGNHOXlkSE1zSUNkZlgyVnpUVzlrZFd4bEp5d2dleUIyWVd4MVpUb2dkSEoxWlNCOUtUdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklHTnlaV0YwWlNCaElHWmhhMlVnYm1GdFpYTndZV05sSUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlERTZJSFpoYkhWbElHbHpJR0VnYlc5a2RXeGxJR2xrTENCeVpYRjFhWEpsSUdsMFhHNGdYSFF2THlCdGIyUmxJQ1lnTWpvZ2JXVnlaMlVnWVd4c0lIQnliM0JsY25ScFpYTWdiMllnZG1Gc2RXVWdhVzUwYnlCMGFHVWdibk5jYmlCY2RDOHZJRzF2WkdVZ0ppQTBPaUJ5WlhSMWNtNGdkbUZzZFdVZ2QyaGxiaUJoYkhKbFlXUjVJRzV6SUc5aWFtVmpkRnh1SUZ4MEx5OGdiVzlrWlNBbUlEaDhNVG9nWW1Wb1lYWmxJR3hwYTJVZ2NtVnhkV2x5WlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTUwSUQwZ1puVnVZM1JwYjI0b2RtRnNkV1VzSUcxdlpHVXBJSHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JREVwSUhaaGJIVmxJRDBnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloMllXeDFaU2s3WEc0Z1hIUmNkR2xtS0cxdlpHVWdKaUE0S1NCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnWEhSY2RHbG1LQ2h0YjJSbElDWWdOQ2tnSmlZZ2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmIySnFaV04wSnlBbUppQjJZV3gxWlNBbUppQjJZV3gxWlM1ZlgyVnpUVzlrZFd4bEtTQnlaWFIxY200Z2RtRnNkV1U3WEc0Z1hIUmNkSFpoY2lCdWN5QTlJRTlpYW1WamRDNWpjbVZoZEdVb2JuVnNiQ2s3WEc0Z1hIUmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1Y2lodWN5azdYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2h1Y3l3Z0oyUmxabUYxYkhRbkxDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJSFpoYkhWbE9pQjJZV3gxWlNCOUtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlESWdKaVlnZEhsd1pXOW1JSFpoYkhWbElDRTlJQ2R6ZEhKcGJtY25LU0JtYjNJb2RtRnlJR3RsZVNCcGJpQjJZV3gxWlNrZ1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtLRzV6TENCclpYa3NJR1oxYm1OMGFXOXVLR3RsZVNrZ2V5QnlaWFIxY200Z2RtRnNkV1ZiYTJWNVhUc2dmUzVpYVc1a0tHNTFiR3dzSUd0bGVTa3BPMXh1SUZ4MFhIUnlaWFIxY200Z2JuTTdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5Qm5aWFJFWldaaGRXeDBSWGh3YjNKMElHWjFibU4wYVc5dUlHWnZjaUJqYjIxd1lYUnBZbWxzYVhSNUlIZHBkR2dnYm05dUxXaGhjbTF2Ym5rZ2JXOWtkV3hsYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV1SUQwZ1puVnVZM1JwYjI0b2JXOWtkV3hsS1NCN1hHNGdYSFJjZEhaaGNpQm5aWFIwWlhJZ1BTQnRiMlIxYkdVZ0ppWWdiVzlrZFd4bExsOWZaWE5OYjJSMWJHVWdQMXh1SUZ4MFhIUmNkR1oxYm1OMGFXOXVJR2RsZEVSbFptRjFiSFFvS1NCN0lISmxkSFZ5YmlCdGIyUjFiR1ZiSjJSbFptRjFiSFFuWFRzZ2ZTQTZYRzRnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwVFc5a2RXeGxSWGh3YjNKMGN5Z3BJSHNnY21WMGRYSnVJRzF2WkhWc1pUc2dmVHRjYmlCY2RGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrS0dkbGRIUmxjaXdnSjJFbkxDQm5aWFIwWlhJcE8xeHVJRngwWEhSeVpYUjFjbTRnWjJWMGRHVnlPMXh1SUZ4MGZUdGNibHh1SUZ4MEx5OGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtOGdQU0JtZFc1amRHbHZiaWh2WW1wbFkzUXNJSEJ5YjNCbGNuUjVLU0I3SUhKbGRIVnliaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0J3Y205d1pYSjBlU2s3SUgwN1hHNWNiaUJjZEM4dklGOWZkMlZpY0dGamExOXdkV0pzYVdOZmNHRjBhRjlmWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbkFnUFNCY0lsd2lPMXh1WEc1Y2JpQmNkQzh2SUV4dllXUWdaVzUwY25rZ2JXOWtkV3hsSUdGdVpDQnlaWFIxY200Z1pYaHdiM0owYzF4dUlGeDBjbVYwZFhKdUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV6SUQwZ01DazdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhKbGNYVnBjbVVvSnk0dmJHbGlMMkY0YVc5ekp5azdJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzUyWVhJZ2MyVjBkR3hsSUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTlqYjNKbEwzTmxkSFJzWlNjcE8xeHVkbUZ5SUdOdmIydHBaWE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMMmhsYkhCbGNuTXZZMjl2YTJsbGN5Y3BPMXh1ZG1GeUlHSjFhV3hrVlZKTUlEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5b1pXeHdaWEp6TDJKMWFXeGtWVkpNSnlrN1hHNTJZWElnWW5WcGJHUkdkV3hzVUdGMGFDQTlJSEpsY1hWcGNtVW9KeTR1TDJOdmNtVXZZblZwYkdSR2RXeHNVR0YwYUNjcE8xeHVkbUZ5SUhCaGNuTmxTR1ZoWkdWeWN5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmFHVnNjR1Z5Y3k5d1lYSnpaVWhsWVdSbGNuTW5LVHRjYm5aaGNpQnBjMVZTVEZOaGJXVlBjbWxuYVc0Z1BTQnlaWEYxYVhKbEtDY3VMeTR1TDJobGJIQmxjbk12YVhOVlVreFRZVzFsVDNKcFoybHVKeWs3WEc1MllYSWdZM0psWVhSbFJYSnliM0lnUFNCeVpYRjFhWEpsS0NjdUxpOWpiM0psTDJOeVpXRjBaVVZ5Y205eUp5azdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnZUdoeVFXUmhjSFJsY2loamIyNW1hV2NwSUh0Y2JpQWdjbVYwZFhKdUlHNWxkeUJRY205dGFYTmxLR1oxYm1OMGFXOXVJR1JwYzNCaGRHTm9XR2h5VW1WeGRXVnpkQ2h5WlhOdmJIWmxMQ0J5WldwbFkzUXBJSHRjYmlBZ0lDQjJZWElnY21WeGRXVnpkRVJoZEdFZ1BTQmpiMjVtYVdjdVpHRjBZVHRjYmlBZ0lDQjJZWElnY21WeGRXVnpkRWhsWVdSbGNuTWdQU0JqYjI1bWFXY3VhR1ZoWkdWeWN6dGNibHh1SUNBZ0lHbG1JQ2gxZEdsc2N5NXBjMFp2Y20xRVlYUmhLSEpsY1hWbGMzUkVZWFJoS1NrZ2UxeHVJQ0FnSUNBZ1pHVnNaWFJsSUhKbGNYVmxjM1JJWldGa1pYSnpXeWREYjI1MFpXNTBMVlI1Y0dVblhUc2dMeThnVEdWMElIUm9aU0JpY205M2MyVnlJSE5sZENCcGRGeHVJQ0FnSUgxY2JseHVJQ0FnSUhaaGNpQnlaWEYxWlhOMElEMGdibVYzSUZoTlRFaDBkSEJTWlhGMVpYTjBLQ2s3WEc1Y2JpQWdJQ0F2THlCSVZGUlFJR0poYzJsaklHRjFkR2hsYm5ScFkyRjBhVzl1WEc0Z0lDQWdhV1lnS0dOdmJtWnBaeTVoZFhSb0tTQjdYRzRnSUNBZ0lDQjJZWElnZFhObGNtNWhiV1VnUFNCamIyNW1hV2N1WVhWMGFDNTFjMlZ5Ym1GdFpTQjhmQ0FuSnp0Y2JpQWdJQ0FnSUhaaGNpQndZWE56ZDI5eVpDQTlJR052Ym1acFp5NWhkWFJvTG5CaGMzTjNiM0prSUQ4Z2RXNWxjMk5oY0dVb1pXNWpiMlJsVlZKSlEyOXRjRzl1Wlc1MEtHTnZibVpwWnk1aGRYUm9MbkJoYzNOM2IzSmtLU2tnT2lBbkp6dGNiaUFnSUNBZ0lISmxjWFZsYzNSSVpXRmtaWEp6TGtGMWRHaHZjbWw2WVhScGIyNGdQU0FuUW1GemFXTWdKeUFySUdKMGIyRW9kWE5sY201aGJXVWdLeUFuT2ljZ0t5QndZWE56ZDI5eVpDazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RtRnlJR1oxYkd4UVlYUm9JRDBnWW5WcGJHUkdkV3hzVUdGMGFDaGpiMjVtYVdjdVltRnpaVlZTVEN3Z1kyOXVabWxuTG5WeWJDazdYRzRnSUNBZ2NtVnhkV1Z6ZEM1dmNHVnVLR052Ym1acFp5NXRaWFJvYjJRdWRHOVZjSEJsY2tOaGMyVW9LU3dnWW5WcGJHUlZVa3dvWm5Wc2JGQmhkR2dzSUdOdmJtWnBaeTV3WVhKaGJYTXNJR052Ym1acFp5NXdZWEpoYlhOVFpYSnBZV3hwZW1WeUtTd2dkSEoxWlNrN1hHNWNiaUFnSUNBdkx5QlRaWFFnZEdobElISmxjWFZsYzNRZ2RHbHRaVzkxZENCcGJpQk5VMXh1SUNBZ0lISmxjWFZsYzNRdWRHbHRaVzkxZENBOUlHTnZibVpwWnk1MGFXMWxiM1YwTzF4dVhHNGdJQ0FnTHk4Z1RHbHpkR1Z1SUdadmNpQnlaV0ZrZVNCemRHRjBaVnh1SUNBZ0lISmxjWFZsYzNRdWIyNXlaV0ZrZVhOMFlYUmxZMmhoYm1kbElEMGdablZ1WTNScGIyNGdhR0Z1Wkd4bFRHOWhaQ2dwSUh0Y2JpQWdJQ0FnSUdsbUlDZ2hjbVZ4ZFdWemRDQjhmQ0J5WlhGMVpYTjBMbkpsWVdSNVUzUmhkR1VnSVQwOUlEUXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0F2THlCVWFHVWdjbVZ4ZFdWemRDQmxjbkp2Y21Wa0lHOTFkQ0JoYm1RZ2QyVWdaR2xrYmlkMElHZGxkQ0JoSUhKbGMzQnZibk5sTENCMGFHbHpJSGRwYkd3Z1ltVmNiaUFnSUNBZ0lDOHZJR2hoYm1Sc1pXUWdZbmtnYjI1bGNuSnZjaUJwYm5OMFpXRmtYRzRnSUNBZ0lDQXZMeUJYYVhSb0lHOXVaU0JsZUdObGNIUnBiMjQ2SUhKbGNYVmxjM1FnZEdoaGRDQjFjMmx1WnlCbWFXeGxPaUJ3Y205MGIyTnZiQ3dnYlc5emRDQmljbTkzYzJWeWMxeHVJQ0FnSUNBZ0x5OGdkMmxzYkNCeVpYUjFjbTRnYzNSaGRIVnpJR0Z6SURBZ1pYWmxiaUIwYUc5MVoyZ2dhWFFuY3lCaElITjFZMk5sYzNObWRXd2djbVZ4ZFdWemRGeHVJQ0FnSUNBZ2FXWWdLSEpsY1hWbGMzUXVjM1JoZEhWeklEMDlQU0F3SUNZbUlDRW9jbVZ4ZFdWemRDNXlaWE53YjI1elpWVlNUQ0FtSmlCeVpYRjFaWE4wTG5KbGMzQnZibk5sVlZKTUxtbHVaR1Y0VDJZb0oyWnBiR1U2SnlrZ1BUMDlJREFwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0x5OGdVSEpsY0dGeVpTQjBhR1VnY21WemNHOXVjMlZjYmlBZ0lDQWdJSFpoY2lCeVpYTndiMjV6WlVobFlXUmxjbk1nUFNBbloyVjBRV3hzVW1WemNHOXVjMlZJWldGa1pYSnpKeUJwYmlCeVpYRjFaWE4wSUQ4Z2NHRnljMlZJWldGa1pYSnpLSEpsY1hWbGMzUXVaMlYwUVd4c1VtVnpjRzl1YzJWSVpXRmtaWEp6S0NrcElEb2diblZzYkR0Y2JpQWdJQ0FnSUhaaGNpQnlaWE53YjI1elpVUmhkR0VnUFNBaFkyOXVabWxuTG5KbGMzQnZibk5sVkhsd1pTQjhmQ0JqYjI1bWFXY3VjbVZ6Y0c5dWMyVlVlWEJsSUQwOVBTQW5kR1Y0ZENjZ1B5QnlaWEYxWlhOMExuSmxjM0J2Ym5ObFZHVjRkQ0E2SUhKbGNYVmxjM1F1Y21WemNHOXVjMlU3WEc0Z0lDQWdJQ0IyWVhJZ2NtVnpjRzl1YzJVZ1BTQjdYRzRnSUNBZ0lDQWdJR1JoZEdFNklISmxjM0J2Ym5ObFJHRjBZU3hjYmlBZ0lDQWdJQ0FnYzNSaGRIVnpPaUJ5WlhGMVpYTjBMbk4wWVhSMWN5eGNiaUFnSUNBZ0lDQWdjM1JoZEhWelZHVjRkRG9nY21WeGRXVnpkQzV6ZEdGMGRYTlVaWGgwTEZ4dUlDQWdJQ0FnSUNCb1pXRmtaWEp6T2lCeVpYTndiMjV6WlVobFlXUmxjbk1zWEc0Z0lDQWdJQ0FnSUdOdmJtWnBaem9nWTI5dVptbG5MRnh1SUNBZ0lDQWdJQ0J5WlhGMVpYTjBPaUJ5WlhGMVpYTjBYRzRnSUNBZ0lDQjlPMXh1WEc0Z0lDQWdJQ0J6WlhSMGJHVW9jbVZ6YjJ4MlpTd2djbVZxWldOMExDQnlaWE53YjI1elpTazdYRzVjYmlBZ0lDQWdJQzh2SUVOc1pXRnVJSFZ3SUhKbGNYVmxjM1JjYmlBZ0lDQWdJSEpsY1hWbGMzUWdQU0J1ZFd4c08xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdkx5QklZVzVrYkdVZ1luSnZkM05sY2lCeVpYRjFaWE4wSUdOaGJtTmxiR3hoZEdsdmJpQW9ZWE1nYjNCd2IzTmxaQ0IwYnlCaElHMWhiblZoYkNCallXNWpaV3hzWVhScGIyNHBYRzRnSUNBZ2NtVnhkV1Z6ZEM1dmJtRmliM0owSUQwZ1puVnVZM1JwYjI0Z2FHRnVaR3hsUVdKdmNuUW9LU0I3WEc0Z0lDQWdJQ0JwWmlBb0lYSmxjWFZsYzNRcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnlaV3BsWTNRb1kzSmxZWFJsUlhKeWIzSW9KMUpsY1hWbGMzUWdZV0p2Y25SbFpDY3NJR052Ym1acFp5d2dKMFZEVDA1T1FVSlBVbFJGUkNjc0lISmxjWFZsYzNRcEtUdGNibHh1SUNBZ0lDQWdMeThnUTJ4bFlXNGdkWEFnY21WeGRXVnpkRnh1SUNBZ0lDQWdjbVZ4ZFdWemRDQTlJRzUxYkd3N1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4dklFaGhibVJzWlNCc2IzY2diR1YyWld3Z2JtVjBkMjl5YXlCbGNuSnZjbk5jYmlBZ0lDQnlaWEYxWlhOMExtOXVaWEp5YjNJZ1BTQm1kVzVqZEdsdmJpQm9ZVzVrYkdWRmNuSnZjaWdwSUh0Y2JpQWdJQ0FnSUM4dklGSmxZV3dnWlhKeWIzSnpJR0Z5WlNCb2FXUmtaVzRnWm5KdmJTQjFjeUJpZVNCMGFHVWdZbkp2ZDNObGNseHVJQ0FnSUNBZ0x5OGdiMjVsY25KdmNpQnphRzkxYkdRZ2IyNXNlU0JtYVhKbElHbG1JR2wwSjNNZ1lTQnVaWFIzYjNKcklHVnljbTl5WEc0Z0lDQWdJQ0J5WldwbFkzUW9ZM0psWVhSbFJYSnliM0lvSjA1bGRIZHZjbXNnUlhKeWIzSW5MQ0JqYjI1bWFXY3NJRzUxYkd3c0lISmxjWFZsYzNRcEtUdGNibHh1SUNBZ0lDQWdMeThnUTJ4bFlXNGdkWEFnY21WeGRXVnpkRnh1SUNBZ0lDQWdjbVZ4ZFdWemRDQTlJRzUxYkd3N1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4dklFaGhibVJzWlNCMGFXMWxiM1YwWEc0Z0lDQWdjbVZ4ZFdWemRDNXZiblJwYldWdmRYUWdQU0JtZFc1amRHbHZiaUJvWVc1a2JHVlVhVzFsYjNWMEtDa2dlMXh1SUNBZ0lDQWdkbUZ5SUhScGJXVnZkWFJGY25KdmNrMWxjM05oWjJVZ1BTQW5kR2x0Wlc5MWRDQnZaaUFuSUNzZ1kyOXVabWxuTG5ScGJXVnZkWFFnS3lBbmJYTWdaWGhqWldWa1pXUW5PMXh1SUNBZ0lDQWdhV1lnS0dOdmJtWnBaeTUwYVcxbGIzVjBSWEp5YjNKTlpYTnpZV2RsS1NCN1hHNGdJQ0FnSUNBZ0lIUnBiV1Z2ZFhSRmNuSnZjazFsYzNOaFoyVWdQU0JqYjI1bWFXY3VkR2x0Wlc5MWRFVnljbTl5VFdWemMyRm5aVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSEpsYW1WamRDaGpjbVZoZEdWRmNuSnZjaWgwYVcxbGIzVjBSWEp5YjNKTlpYTnpZV2RsTENCamIyNW1hV2NzSUNkRlEwOU9Ua0ZDVDFKVVJVUW5MRnh1SUNBZ0lDQWdJQ0J5WlhGMVpYTjBLU2s3WEc1Y2JpQWdJQ0FnSUM4dklFTnNaV0Z1SUhWd0lISmxjWFZsYzNSY2JpQWdJQ0FnSUhKbGNYVmxjM1FnUFNCdWRXeHNPMXh1SUNBZ0lIMDdYRzVjYmlBZ0lDQXZMeUJCWkdRZ2VITnlaaUJvWldGa1pYSmNiaUFnSUNBdkx5QlVhR2x6SUdseklHOXViSGtnWkc5dVpTQnBaaUJ5ZFc1dWFXNW5JR2x1SUdFZ2MzUmhibVJoY21RZ1luSnZkM05sY2lCbGJuWnBjbTl1YldWdWRDNWNiaUFnSUNBdkx5QlRjR1ZqYVdacFkyRnNiSGtnYm05MElHbG1JSGRsSjNKbElHbHVJR0VnZDJWaUlIZHZjbXRsY2l3Z2IzSWdjbVZoWTNRdGJtRjBhWFpsTGx4dUlDQWdJR2xtSUNoMWRHbHNjeTVwYzFOMFlXNWtZWEprUW5KdmQzTmxja1Z1ZGlncEtTQjdYRzRnSUNBZ0lDQXZMeUJCWkdRZ2VITnlaaUJvWldGa1pYSmNiaUFnSUNBZ0lIWmhjaUI0YzNKbVZtRnNkV1VnUFNBb1kyOXVabWxuTG5kcGRHaERjbVZrWlc1MGFXRnNjeUI4ZkNCcGMxVlNURk5oYldWUGNtbG5hVzRvWm5Wc2JGQmhkR2dwS1NBbUppQmpiMjVtYVdjdWVITnlaa052YjJ0cFpVNWhiV1VnUDF4dUlDQWdJQ0FnSUNCamIyOXJhV1Z6TG5KbFlXUW9ZMjl1Wm1sbkxuaHpjbVpEYjI5cmFXVk9ZVzFsS1NBNlhHNGdJQ0FnSUNBZ0lIVnVaR1ZtYVc1bFpEdGNibHh1SUNBZ0lDQWdhV1lnS0hoemNtWldZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWEYxWlhOMFNHVmhaR1Z5YzF0amIyNW1hV2N1ZUhOeVpraGxZV1JsY2s1aGJXVmRJRDBnZUhOeVpsWmhiSFZsTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUVGa1pDQm9aV0ZrWlhKeklIUnZJSFJvWlNCeVpYRjFaWE4wWEc0Z0lDQWdhV1lnS0NkelpYUlNaWEYxWlhOMFNHVmhaR1Z5SnlCcGJpQnlaWEYxWlhOMEtTQjdYRzRnSUNBZ0lDQjFkR2xzY3k1bWIzSkZZV05vS0hKbGNYVmxjM1JJWldGa1pYSnpMQ0JtZFc1amRHbHZiaUJ6WlhSU1pYRjFaWE4wU0dWaFpHVnlLSFpoYkN3Z2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2NtVnhkV1Z6ZEVSaGRHRWdQVDA5SUNkMWJtUmxabWx1WldRbklDWW1JR3RsZVM1MGIweHZkMlZ5UTJGelpTZ3BJRDA5UFNBblkyOXVkR1Z1ZEMxMGVYQmxKeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDOHZJRkpsYlc5MlpTQkRiMjUwWlc1MExWUjVjR1VnYVdZZ1pHRjBZU0JwY3lCMWJtUmxabWx1WldSY2JpQWdJQ0FnSUNBZ0lDQmtaV3hsZEdVZ2NtVnhkV1Z6ZEVobFlXUmxjbk5iYTJWNVhUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0F2THlCUGRHaGxjbmRwYzJVZ1lXUmtJR2hsWVdSbGNpQjBieUIwYUdVZ2NtVnhkV1Z6ZEZ4dUlDQWdJQ0FnSUNBZ0lISmxjWFZsYzNRdWMyVjBVbVZ4ZFdWemRFaGxZV1JsY2loclpYa3NJSFpoYkNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRUZrWkNCM2FYUm9RM0psWkdWdWRHbGhiSE1nZEc4Z2NtVnhkV1Z6ZENCcFppQnVaV1ZrWldSY2JpQWdJQ0JwWmlBb0lYVjBhV3h6TG1selZXNWtaV1pwYm1Wa0tHTnZibVpwWnk1M2FYUm9RM0psWkdWdWRHbGhiSE1wS1NCN1hHNGdJQ0FnSUNCeVpYRjFaWE4wTG5kcGRHaERjbVZrWlc1MGFXRnNjeUE5SUNFaFkyOXVabWxuTG5kcGRHaERjbVZrWlc1MGFXRnNjenRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJCWkdRZ2NtVnpjRzl1YzJWVWVYQmxJSFJ2SUhKbGNYVmxjM1FnYVdZZ2JtVmxaR1ZrWEc0Z0lDQWdhV1lnS0dOdmJtWnBaeTV5WlhOd2IyNXpaVlI1Y0dVcElIdGNiaUFnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUhKbGNYVmxjM1F1Y21WemNHOXVjMlZVZVhCbElEMGdZMjl1Wm1sbkxuSmxjM0J2Ym5ObFZIbHdaVHRjYmlBZ0lDQWdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0FnSUNBZ0x5OGdSWGh3WldOMFpXUWdSRTlOUlhoalpYQjBhVzl1SUhSb2NtOTNiaUJpZVNCaWNtOTNjMlZ5Y3lCdWIzUWdZMjl0Y0dGMGFXSnNaU0JZVFV4SWRIUndVbVZ4ZFdWemRDQk1aWFpsYkNBeUxseHVJQ0FnSUNBZ0lDQXZMeUJDZFhRc0lIUm9hWE1nWTJGdUlHSmxJSE4xY0hCeVpYTnpaV1FnWm05eUlDZHFjMjl1SnlCMGVYQmxJR0Z6SUdsMElHTmhiaUJpWlNCd1lYSnpaV1FnWW5rZ1pHVm1ZWFZzZENBbmRISmhibk5tYjNKdFVtVnpjRzl1YzJVbklHWjFibU4wYVc5dUxseHVJQ0FnSUNBZ0lDQnBaaUFvWTI5dVptbG5MbkpsYzNCdmJuTmxWSGx3WlNBaFBUMGdKMnB6YjI0bktTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdoeWIzY2daVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUVoaGJtUnNaU0J3Y205bmNtVnpjeUJwWmlCdVpXVmtaV1JjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR052Ym1acFp5NXZia1J2ZDI1c2IyRmtVSEp2WjNKbGMzTWdQVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNBZ0lISmxjWFZsYzNRdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmNISnZaM0psYzNNbkxDQmpiMjVtYVdjdWIyNUViM2R1Ykc5aFpGQnliMmR5WlhOektUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5Qk9iM1FnWVd4c0lHSnliM2R6WlhKeklITjFjSEJ2Y25RZ2RYQnNiMkZrSUdWMlpXNTBjMXh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdZMjl1Wm1sbkxtOXVWWEJzYjJGa1VISnZaM0psYzNNZ1BUMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ2NtVnhkV1Z6ZEM1MWNHeHZZV1FwSUh0Y2JpQWdJQ0FnSUhKbGNYVmxjM1F1ZFhCc2IyRmtMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KM0J5YjJkeVpYTnpKeXdnWTI5dVptbG5MbTl1VlhCc2IyRmtVSEp2WjNKbGMzTXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2hqYjI1bWFXY3VZMkZ1WTJWc1ZHOXJaVzRwSUh0Y2JpQWdJQ0FnSUM4dklFaGhibVJzWlNCallXNWpaV3hzWVhScGIyNWNiaUFnSUNBZ0lHTnZibVpwWnk1allXNWpaV3hVYjJ0bGJpNXdjbTl0YVhObExuUm9aVzRvWm5WdVkzUnBiMjRnYjI1RFlXNWpaV3hsWkNoallXNWpaV3dwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0Z5WlhGMVpYTjBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRDNWhZbTl5ZENncE8xeHVJQ0FnSUNBZ0lDQnlaV3BsWTNRb1kyRnVZMlZzS1R0Y2JpQWdJQ0FnSUNBZ0x5OGdRMnhsWVc0Z2RYQWdjbVZ4ZFdWemRGeHVJQ0FnSUNBZ0lDQnlaWEYxWlhOMElEMGdiblZzYkR0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDZ2hjbVZ4ZFdWemRFUmhkR0VwSUh0Y2JpQWdJQ0FnSUhKbGNYVmxjM1JFWVhSaElEMGdiblZzYkR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCVFpXNWtJSFJvWlNCeVpYRjFaWE4wWEc0Z0lDQWdjbVZ4ZFdWemRDNXpaVzVrS0hKbGNYVmxjM1JFWVhSaEtUdGNiaUFnZlNrN1hHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMM1YwYVd4ekp5azdYRzUyWVhJZ1ltbHVaQ0E5SUhKbGNYVnBjbVVvSnk0dmFHVnNjR1Z5Y3k5aWFXNWtKeWs3WEc1MllYSWdRWGhwYjNNZ1BTQnlaWEYxYVhKbEtDY3VMMk52Y21VdlFYaHBiM01uS1R0Y2JuWmhjaUJ0WlhKblpVTnZibVpwWnlBOUlISmxjWFZwY21Vb0p5NHZZMjl5WlM5dFpYSm5aVU52Ym1acFp5Y3BPMXh1ZG1GeUlHUmxabUYxYkhSeklEMGdjbVZ4ZFdseVpTZ25MaTlrWldaaGRXeDBjeWNwTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlNCaGJpQnBibk4wWVc1alpTQnZaaUJCZUdsdmMxeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCa1pXWmhkV3gwUTI5dVptbG5JRlJvWlNCa1pXWmhkV3gwSUdOdmJtWnBaeUJtYjNJZ2RHaGxJR2x1YzNSaGJtTmxYRzRnS2lCQWNtVjBkWEp1SUh0QmVHbHZjMzBnUVNCdVpYY2dhVzV6ZEdGdVkyVWdiMllnUVhocGIzTmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kzSmxZWFJsU1c1emRHRnVZMlVvWkdWbVlYVnNkRU52Ym1acFp5a2dlMXh1SUNCMllYSWdZMjl1ZEdWNGRDQTlJRzVsZHlCQmVHbHZjeWhrWldaaGRXeDBRMjl1Wm1sbktUdGNiaUFnZG1GeUlHbHVjM1JoYm1ObElEMGdZbWx1WkNoQmVHbHZjeTV3Y205MGIzUjVjR1V1Y21WeGRXVnpkQ3dnWTI5dWRHVjRkQ2s3WEc1Y2JpQWdMeThnUTI5d2VTQmhlR2x2Y3k1d2NtOTBiM1I1Y0dVZ2RHOGdhVzV6ZEdGdVkyVmNiaUFnZFhScGJITXVaWGgwWlc1a0tHbHVjM1JoYm1ObExDQkJlR2x2Y3k1d2NtOTBiM1I1Y0dVc0lHTnZiblJsZUhRcE8xeHVYRzRnSUM4dklFTnZjSGtnWTI5dWRHVjRkQ0IwYnlCcGJuTjBZVzVqWlZ4dUlDQjFkR2xzY3k1bGVIUmxibVFvYVc1emRHRnVZMlVzSUdOdmJuUmxlSFFwTzF4dVhHNGdJSEpsZEhWeWJpQnBibk4wWVc1alpUdGNibjFjYmx4dUx5OGdRM0psWVhSbElIUm9aU0JrWldaaGRXeDBJR2x1YzNSaGJtTmxJSFJ2SUdKbElHVjRjRzl5ZEdWa1hHNTJZWElnWVhocGIzTWdQU0JqY21WaGRHVkpibk4wWVc1alpTaGtaV1poZFd4MGN5azdYRzVjYmk4dklFVjRjRzl6WlNCQmVHbHZjeUJqYkdGemN5QjBieUJoYkd4dmR5QmpiR0Z6Y3lCcGJtaGxjbWwwWVc1alpWeHVZWGhwYjNNdVFYaHBiM01nUFNCQmVHbHZjenRjYmx4dUx5OGdSbUZqZEc5eWVTQm1iM0lnWTNKbFlYUnBibWNnYm1WM0lHbHVjM1JoYm1ObGMxeHVZWGhwYjNNdVkzSmxZWFJsSUQwZ1puVnVZM1JwYjI0Z1kzSmxZWFJsS0dsdWMzUmhibU5sUTI5dVptbG5LU0I3WEc0Z0lISmxkSFZ5YmlCamNtVmhkR1ZKYm5OMFlXNWpaU2h0WlhKblpVTnZibVpwWnloaGVHbHZjeTVrWldaaGRXeDBjeXdnYVc1emRHRnVZMlZEYjI1bWFXY3BLVHRjYm4wN1hHNWNiaTh2SUVWNGNHOXpaU0JEWVc1alpXd2dKaUJEWVc1alpXeFViMnRsYmx4dVlYaHBiM011UTJGdVkyVnNJRDBnY21WeGRXbHlaU2duTGk5allXNWpaV3d2UTJGdVkyVnNKeWs3WEc1aGVHbHZjeTVEWVc1alpXeFViMnRsYmlBOUlISmxjWFZwY21Vb0p5NHZZMkZ1WTJWc0wwTmhibU5sYkZSdmEyVnVKeWs3WEc1aGVHbHZjeTVwYzBOaGJtTmxiQ0E5SUhKbGNYVnBjbVVvSnk0dlkyRnVZMlZzTDJselEyRnVZMlZzSnlrN1hHNWNiaTh2SUVWNGNHOXpaU0JoYkd3dmMzQnlaV0ZrWEc1aGVHbHZjeTVoYkd3Z1BTQm1kVzVqZEdsdmJpQmhiR3dvY0hKdmJXbHpaWE1wSUh0Y2JpQWdjbVYwZFhKdUlGQnliMjFwYzJVdVlXeHNLSEJ5YjIxcGMyVnpLVHRjYm4wN1hHNWhlR2x2Y3k1emNISmxZV1FnUFNCeVpYRjFhWEpsS0NjdUwyaGxiSEJsY25NdmMzQnlaV0ZrSnlrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdZWGhwYjNNN1hHNWNiaTh2SUVGc2JHOTNJSFZ6WlNCdlppQmtaV1poZFd4MElHbHRjRzl5ZENCemVXNTBZWGdnYVc0Z1ZIbHdaVk5qY21sd2RGeHViVzlrZFd4bExtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlHRjRhVzl6TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNHZLaXBjYmlBcUlFRWdZRU5oYm1ObGJHQWdhWE1nWVc0Z2IySnFaV04wSUhSb1lYUWdhWE1nZEdoeWIzZHVJSGRvWlc0Z1lXNGdiM0JsY21GMGFXOXVJR2x6SUdOaGJtTmxiR1ZrTGx4dUlDcGNiaUFxSUVCamJHRnpjMXh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWM5ZlNCdFpYTnpZV2RsSUZSb1pTQnRaWE56WVdkbExseHVJQ292WEc1bWRXNWpkR2x2YmlCRFlXNWpaV3dvYldWemMyRm5aU2tnZTF4dUlDQjBhR2x6TG0xbGMzTmhaMlVnUFNCdFpYTnpZV2RsTzF4dWZWeHVYRzVEWVc1alpXd3VjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5JRDBnWm5WdVkzUnBiMjRnZEc5VGRISnBibWNvS1NCN1hHNGdJSEpsZEhWeWJpQW5RMkZ1WTJWc0p5QXJJQ2gwYUdsekxtMWxjM05oWjJVZ1B5QW5PaUFuSUNzZ2RHaHBjeTV0WlhOellXZGxJRG9nSnljcE8xeHVmVHRjYmx4dVEyRnVZMlZzTG5CeWIzUnZkSGx3WlM1ZlgwTkJUa05GVEY5ZklEMGdkSEoxWlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQkRZVzVqWld3N1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCRFlXNWpaV3dnUFNCeVpYRjFhWEpsS0NjdUwwTmhibU5sYkNjcE8xeHVYRzR2S2lwY2JpQXFJRUVnWUVOaGJtTmxiRlJ2YTJWdVlDQnBjeUJoYmlCdlltcGxZM1FnZEdoaGRDQmpZVzRnWW1VZ2RYTmxaQ0IwYnlCeVpYRjFaWE4wSUdOaGJtTmxiR3hoZEdsdmJpQnZaaUJoYmlCdmNHVnlZWFJwYjI0dVhHNGdLbHh1SUNvZ1FHTnNZWE56WEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQmxlR1ZqZFhSdmNpQlVhR1VnWlhobFkzVjBiM0lnWm5WdVkzUnBiMjR1WEc0Z0tpOWNibVoxYm1OMGFXOXVJRU5oYm1ObGJGUnZhMlZ1S0dWNFpXTjFkRzl5S1NCN1hHNGdJR2xtSUNoMGVYQmxiMllnWlhobFkzVjBiM0lnSVQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2RsZUdWamRYUnZjaUJ0ZFhOMElHSmxJR0VnWm5WdVkzUnBiMjR1SnlrN1hHNGdJSDFjYmx4dUlDQjJZWElnY21WemIyeDJaVkJ5YjIxcGMyVTdYRzRnSUhSb2FYTXVjSEp2YldselpTQTlJRzVsZHlCUWNtOXRhWE5sS0daMWJtTjBhVzl1SUhCeWIyMXBjMlZGZUdWamRYUnZjaWh5WlhOdmJIWmxLU0I3WEc0Z0lDQWdjbVZ6YjJ4MlpWQnliMjFwYzJVZ1BTQnlaWE52YkhabE8xeHVJQ0I5S1R0Y2JseHVJQ0IyWVhJZ2RHOXJaVzRnUFNCMGFHbHpPMXh1SUNCbGVHVmpkWFJ2Y2lobWRXNWpkR2x2YmlCallXNWpaV3dvYldWemMyRm5aU2tnZTF4dUlDQWdJR2xtSUNoMGIydGxiaTV5WldGemIyNHBJSHRjYmlBZ0lDQWdJQzh2SUVOaGJtTmxiR3hoZEdsdmJpQm9ZWE1nWVd4eVpXRmtlU0JpWldWdUlISmxjWFZsYzNSbFpGeHVJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJSDFjYmx4dUlDQWdJSFJ2YTJWdUxuSmxZWE52YmlBOUlHNWxkeUJEWVc1alpXd29iV1Z6YzJGblpTazdYRzRnSUNBZ2NtVnpiMngyWlZCeWIyMXBjMlVvZEc5clpXNHVjbVZoYzI5dUtUdGNiaUFnZlNrN1hHNTlYRzVjYmk4cUtseHVJQ29nVkdoeWIzZHpJR0VnWUVOaGJtTmxiR0FnYVdZZ1kyRnVZMlZzYkdGMGFXOXVJR2hoY3lCaVpXVnVJSEpsY1hWbGMzUmxaQzVjYmlBcUwxeHVRMkZ1WTJWc1ZHOXJaVzR1Y0hKdmRHOTBlWEJsTG5Sb2NtOTNTV1pTWlhGMVpYTjBaV1FnUFNCbWRXNWpkR2x2YmlCMGFISnZkMGxtVW1WeGRXVnpkR1ZrS0NrZ2UxeHVJQ0JwWmlBb2RHaHBjeTV5WldGemIyNHBJSHRjYmlBZ0lDQjBhSEp2ZHlCMGFHbHpMbkpsWVhOdmJqdGNiaUFnZlZ4dWZUdGNibHh1THlvcVhHNGdLaUJTWlhSMWNtNXpJR0Z1SUc5aWFtVmpkQ0IwYUdGMElHTnZiblJoYVc1eklHRWdibVYzSUdCRFlXNWpaV3hVYjJ0bGJtQWdZVzVrSUdFZ1puVnVZM1JwYjI0Z2RHaGhkQ3dnZDJobGJpQmpZV3hzWldRc1hHNGdLaUJqWVc1alpXeHpJSFJvWlNCZ1EyRnVZMlZzVkc5clpXNWdMbHh1SUNvdlhHNURZVzVqWld4VWIydGxiaTV6YjNWeVkyVWdQU0JtZFc1amRHbHZiaUJ6YjNWeVkyVW9LU0I3WEc0Z0lIWmhjaUJqWVc1alpXdzdYRzRnSUhaaGNpQjBiMnRsYmlBOUlHNWxkeUJEWVc1alpXeFViMnRsYmlobWRXNWpkR2x2YmlCbGVHVmpkWFJ2Y2loaktTQjdYRzRnSUNBZ1kyRnVZMlZzSUQwZ1l6dGNiaUFnZlNrN1hHNGdJSEpsZEhWeWJpQjdYRzRnSUNBZ2RHOXJaVzQ2SUhSdmEyVnVMRnh1SUNBZ0lHTmhibU5sYkRvZ1kyRnVZMlZzWEc0Z0lIMDdYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFTmhibU5sYkZSdmEyVnVPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdselEyRnVZMlZzS0haaGJIVmxLU0I3WEc0Z0lISmxkSFZ5YmlBaElTaDJZV3gxWlNBbUppQjJZV3gxWlM1ZlgwTkJUa05GVEY5ZktUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JuWmhjaUJpZFdsc1pGVlNUQ0E5SUhKbGNYVnBjbVVvSnk0dUwyaGxiSEJsY25NdlluVnBiR1JWVWt3bktUdGNiblpoY2lCSmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMGx1ZEdWeVkyVndkRzl5VFdGdVlXZGxjaWNwTzF4dWRtRnlJR1JwYzNCaGRHTm9VbVZ4ZFdWemRDQTlJSEpsY1hWcGNtVW9KeTR2WkdsemNHRjBZMmhTWlhGMVpYTjBKeWs3WEc1MllYSWdiV1Z5WjJWRGIyNW1hV2NnUFNCeVpYRjFhWEpsS0NjdUwyMWxjbWRsUTI5dVptbG5KeWs3WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsSUdFZ2JtVjNJR2x1YzNSaGJtTmxJRzltSUVGNGFXOXpYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHbHVjM1JoYm1ObFEyOXVabWxuSUZSb1pTQmtaV1poZFd4MElHTnZibVpwWnlCbWIzSWdkR2hsSUdsdWMzUmhibU5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJRUY0YVc5ektHbHVjM1JoYm1ObFEyOXVabWxuS1NCN1hHNGdJSFJvYVhNdVpHVm1ZWFZzZEhNZ1BTQnBibk4wWVc1alpVTnZibVpwWnp0Y2JpQWdkR2hwY3k1cGJuUmxjbU5sY0hSdmNuTWdQU0I3WEc0Z0lDQWdjbVZ4ZFdWemREb2dibVYzSUVsdWRHVnlZMlZ3ZEc5eVRXRnVZV2RsY2lncExGeHVJQ0FnSUhKbGMzQnZibk5sT2lCdVpYY2dTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlLQ2xjYmlBZ2ZUdGNibjFjYmx4dUx5b3FYRzRnS2lCRWFYTndZWFJqYUNCaElISmxjWFZsYzNSY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWTI5dVptbG5JRlJvWlNCamIyNW1hV2NnYzNCbFkybG1hV01nWm05eUlIUm9hWE1nY21WeGRXVnpkQ0FvYldWeVoyVmtJSGRwZEdnZ2RHaHBjeTVrWldaaGRXeDBjeWxjYmlBcUwxeHVRWGhwYjNNdWNISnZkRzkwZVhCbExuSmxjWFZsYzNRZ1BTQm1kVzVqZEdsdmJpQnlaWEYxWlhOMEtHTnZibVpwWnlrZ2UxeHVJQ0F2S21WemJHbHVkQ0J1Ynkxd1lYSmhiUzF5WldGemMybG5iam93S2k5Y2JpQWdMeThnUVd4c2IzY2dabTl5SUdGNGFXOXpLQ2RsZUdGdGNHeGxMM1Z5YkNkYkxDQmpiMjVtYVdkZEtTQmhJR3hoSUdabGRHTm9JRUZRU1Z4dUlDQnBaaUFvZEhsd1pXOW1JR052Ym1acFp5QTlQVDBnSjNOMGNtbHVaeWNwSUh0Y2JpQWdJQ0JqYjI1bWFXY2dQU0JoY21kMWJXVnVkSE5iTVYwZ2ZId2dlMzA3WEc0Z0lDQWdZMjl1Wm1sbkxuVnliQ0E5SUdGeVozVnRaVzUwYzFzd1hUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmpiMjVtYVdjZ1BTQmpiMjVtYVdjZ2ZId2dlMzA3WEc0Z0lIMWNibHh1SUNCamIyNW1hV2NnUFNCdFpYSm5aVU52Ym1acFp5aDBhR2x6TG1SbFptRjFiSFJ6TENCamIyNW1hV2NwTzF4dVhHNGdJQzh2SUZObGRDQmpiMjVtYVdjdWJXVjBhRzlrWEc0Z0lHbG1JQ2hqYjI1bWFXY3ViV1YwYUc5a0tTQjdYRzRnSUNBZ1kyOXVabWxuTG0xbGRHaHZaQ0E5SUdOdmJtWnBaeTV0WlhSb2IyUXVkRzlNYjNkbGNrTmhjMlVvS1R0Y2JpQWdmU0JsYkhObElHbG1JQ2gwYUdsekxtUmxabUYxYkhSekxtMWxkR2h2WkNrZ2UxeHVJQ0FnSUdOdmJtWnBaeTV0WlhSb2IyUWdQU0IwYUdsekxtUmxabUYxYkhSekxtMWxkR2h2WkM1MGIweHZkMlZ5UTJGelpTZ3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR052Ym1acFp5NXRaWFJvYjJRZ1BTQW5aMlYwSnp0Y2JpQWdmVnh1WEc0Z0lDOHZJRWh2YjJzZ2RYQWdhVzUwWlhKalpYQjBiM0p6SUcxcFpHUnNaWGRoY21WY2JpQWdkbUZ5SUdOb1lXbHVJRDBnVzJScGMzQmhkR05vVW1WeGRXVnpkQ3dnZFc1a1pXWnBibVZrWFR0Y2JpQWdkbUZ5SUhCeWIyMXBjMlVnUFNCUWNtOXRhWE5sTG5KbGMyOXNkbVVvWTI5dVptbG5LVHRjYmx4dUlDQjBhR2x6TG1sdWRHVnlZMlZ3ZEc5eWN5NXlaWEYxWlhOMExtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z2RXNXphR2xtZEZKbGNYVmxjM1JKYm5SbGNtTmxjSFJ2Y25Nb2FXNTBaWEpqWlhCMGIzSXBJSHRjYmlBZ0lDQmphR0ZwYmk1MWJuTm9hV1owS0dsdWRHVnlZMlZ3ZEc5eUxtWjFiR1pwYkd4bFpDd2dhVzUwWlhKalpYQjBiM0l1Y21WcVpXTjBaV1FwTzF4dUlDQjlLVHRjYmx4dUlDQjBhR2x6TG1sdWRHVnlZMlZ3ZEc5eWN5NXlaWE53YjI1elpTNW1iM0pGWVdOb0tHWjFibU4wYVc5dUlIQjFjMmhTWlhOd2IyNXpaVWx1ZEdWeVkyVndkRzl5Y3locGJuUmxjbU5sY0hSdmNpa2dlMXh1SUNBZ0lHTm9ZV2x1TG5CMWMyZ29hVzUwWlhKalpYQjBiM0l1Wm5Wc1ptbHNiR1ZrTENCcGJuUmxjbU5sY0hSdmNpNXlaV3BsWTNSbFpDazdYRzRnSUgwcE8xeHVYRzRnSUhkb2FXeGxJQ2hqYUdGcGJpNXNaVzVuZEdncElIdGNiaUFnSUNCd2NtOXRhWE5sSUQwZ2NISnZiV2x6WlM1MGFHVnVLR05vWVdsdUxuTm9hV1owS0Nrc0lHTm9ZV2x1TG5Ob2FXWjBLQ2twTzF4dUlDQjlYRzVjYmlBZ2NtVjBkWEp1SUhCeWIyMXBjMlU3WEc1OU8xeHVYRzVCZUdsdmN5NXdjbTkwYjNSNWNHVXVaMlYwVlhKcElEMGdablZ1WTNScGIyNGdaMlYwVlhKcEtHTnZibVpwWnlrZ2UxeHVJQ0JqYjI1bWFXY2dQU0J0WlhKblpVTnZibVpwWnloMGFHbHpMbVJsWm1GMWJIUnpMQ0JqYjI1bWFXY3BPMXh1SUNCeVpYUjFjbTRnWW5WcGJHUlZVa3dvWTI5dVptbG5MblZ5YkN3Z1kyOXVabWxuTG5CaGNtRnRjeXdnWTI5dVptbG5MbkJoY21GdGMxTmxjbWxoYkdsNlpYSXBMbkpsY0d4aFkyVW9MMTVjWEQ4dkxDQW5KeWs3WEc1OU8xeHVYRzR2THlCUWNtOTJhV1JsSUdGc2FXRnpaWE1nWm05eUlITjFjSEJ2Y25SbFpDQnlaWEYxWlhOMElHMWxkR2h2WkhOY2JuVjBhV3h6TG1admNrVmhZMmdvV3lka1pXeGxkR1VuTENBbloyVjBKeXdnSjJobFlXUW5MQ0FuYjNCMGFXOXVjeWRkTENCbWRXNWpkR2x2YmlCbWIzSkZZV05vVFdWMGFHOWtUbTlFWVhSaEtHMWxkR2h2WkNrZ2UxeHVJQ0F2S21WemJHbHVkQ0JtZFc1akxXNWhiV1Z6T2pBcUwxeHVJQ0JCZUdsdmN5NXdjbTkwYjNSNWNHVmJiV1YwYUc5a1hTQTlJR1oxYm1OMGFXOXVLSFZ5YkN3Z1kyOXVabWxuS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdWNtVnhkV1Z6ZENodFpYSm5aVU52Ym1acFp5aGpiMjVtYVdjZ2ZId2dlMzBzSUh0Y2JpQWdJQ0FnSUcxbGRHaHZaRG9nYldWMGFHOWtMRnh1SUNBZ0lDQWdkWEpzT2lCMWNtd3NYRzRnSUNBZ0lDQmtZWFJoT2lBb1kyOXVabWxuSUh4OElIdDlLUzVrWVhSaFhHNGdJQ0FnZlNrcE8xeHVJQ0I5TzF4dWZTazdYRzVjYm5WMGFXeHpMbVp2Y2tWaFkyZ29XeWR3YjNOMEp5d2dKM0IxZENjc0lDZHdZWFJqYUNkZExDQm1kVzVqZEdsdmJpQm1iM0pGWVdOb1RXVjBhRzlrVjJsMGFFUmhkR0VvYldWMGFHOWtLU0I3WEc0Z0lDOHFaWE5zYVc1MElHWjFibU10Ym1GdFpYTTZNQ292WEc0Z0lFRjRhVzl6TG5CeWIzUnZkSGx3WlZ0dFpYUm9iMlJkSUQwZ1puVnVZM1JwYjI0b2RYSnNMQ0JrWVhSaExDQmpiMjVtYVdjcElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NXlaWEYxWlhOMEtHMWxjbWRsUTI5dVptbG5LR052Ym1acFp5QjhmQ0I3ZlN3Z2UxeHVJQ0FnSUNBZ2JXVjBhRzlrT2lCdFpYUm9iMlFzWEc0Z0lDQWdJQ0IxY213NklIVnliQ3hjYmlBZ0lDQWdJR1JoZEdFNklHUmhkR0ZjYmlBZ0lDQjlLU2s3WEc0Z0lIMDdYRzU5S1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQkJlR2x2Y3p0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk4dUxpOTFkR2xzY3ljcE8xeHVYRzVtZFc1amRHbHZiaUJKYm5SbGNtTmxjSFJ2Y2sxaGJtRm5aWElvS1NCN1hHNGdJSFJvYVhNdWFHRnVaR3hsY25NZ1BTQmJYVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkJaR1FnWVNCdVpYY2dhVzUwWlhKalpYQjBiM0lnZEc4Z2RHaGxJSE4wWVdOclhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1puVnNabWxzYkdWa0lGUm9aU0JtZFc1amRHbHZiaUIwYnlCb1lXNWtiR1VnWUhSb1pXNWdJR1p2Y2lCaElHQlFjbTl0YVhObFlGeHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnY21WcVpXTjBaV1FnVkdobElHWjFibU4wYVc5dUlIUnZJR2hoYm1Sc1pTQmdjbVZxWldOMFlDQm1iM0lnWVNCZ1VISnZiV2x6WldCY2JpQXFYRzRnS2lCQWNtVjBkWEp1SUh0T2RXMWlaWEo5SUVGdUlFbEVJSFZ6WldRZ2RHOGdjbVZ0YjNabElHbHVkR1Z5WTJWd2RHOXlJR3hoZEdWeVhHNGdLaTljYmtsdWRHVnlZMlZ3ZEc5eVRXRnVZV2RsY2k1d2NtOTBiM1I1Y0dVdWRYTmxJRDBnWm5WdVkzUnBiMjRnZFhObEtHWjFiR1pwYkd4bFpDd2djbVZxWldOMFpXUXBJSHRjYmlBZ2RHaHBjeTVvWVc1a2JHVnljeTV3ZFhOb0tIdGNiaUFnSUNCbWRXeG1hV3hzWldRNklHWjFiR1pwYkd4bFpDeGNiaUFnSUNCeVpXcGxZM1JsWkRvZ2NtVnFaV04wWldSY2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCMGFHbHpMbWhoYm1Sc1pYSnpMbXhsYm1kMGFDQXRJREU3WEc1OU8xeHVYRzR2S2lwY2JpQXFJRkpsYlc5MlpTQmhiaUJwYm5SbGNtTmxjSFJ2Y2lCbWNtOXRJSFJvWlNCemRHRmphMXh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQnBaQ0JVYUdVZ1NVUWdkR2hoZENCM1lYTWdjbVYwZFhKdVpXUWdZbmtnWUhWelpXQmNiaUFxTDF4dVNXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUxuQnliM1J2ZEhsd1pTNWxhbVZqZENBOUlHWjFibU4wYVc5dUlHVnFaV04wS0dsa0tTQjdYRzRnSUdsbUlDaDBhR2x6TG1oaGJtUnNaWEp6VzJsa1hTa2dlMXh1SUNBZ0lIUm9hWE11YUdGdVpHeGxjbk5iYVdSZElEMGdiblZzYkR0Y2JpQWdmVnh1ZlR0Y2JseHVMeW9xWEc0Z0tpQkpkR1Z5WVhSbElHOTJaWElnWVd4c0lIUm9aU0J5WldkcGMzUmxjbVZrSUdsdWRHVnlZMlZ3ZEc5eWMxeHVJQ3BjYmlBcUlGUm9hWE1nYldWMGFHOWtJR2x6SUhCaGNuUnBZM1ZzWVhKc2VTQjFjMlZtZFd3Z1ptOXlJSE5yYVhCd2FXNW5JRzkyWlhJZ1lXNTVYRzRnS2lCcGJuUmxjbU5sY0hSdmNuTWdkR2hoZENCdFlYa2dhR0YyWlNCaVpXTnZiV1VnWUc1MWJHeGdJR05oYkd4cGJtY2dZR1ZxWldOMFlDNWNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQm1iaUJVYUdVZ1puVnVZM1JwYjI0Z2RHOGdZMkZzYkNCbWIzSWdaV0ZqYUNCcGJuUmxjbU5sY0hSdmNseHVJQ292WEc1SmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJdWNISnZkRzkwZVhCbExtWnZja1ZoWTJnZ1BTQm1kVzVqZEdsdmJpQm1iM0pGWVdOb0tHWnVLU0I3WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvZEdocGN5NW9ZVzVrYkdWeWN5d2dablZ1WTNScGIyNGdabTl5UldGamFFaGhibVJzWlhJb2FDa2dlMXh1SUNBZ0lHbG1JQ2hvSUNFOVBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCbWJpaG9LVHRjYmlBZ0lDQjlYRzRnSUgwcE8xeHVmVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCSmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCcGMwRmljMjlzZFhSbFZWSk1JRDBnY21WeGRXbHlaU2duTGk0dmFHVnNjR1Z5Y3k5cGMwRmljMjlzZFhSbFZWSk1KeWs3WEc1MllYSWdZMjl0WW1sdVpWVlNUSE1nUFNCeVpYRjFhWEpsS0NjdUxpOW9aV3h3WlhKekwyTnZiV0pwYm1WVlVreHpKeWs3WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHNWxkeUJWVWt3Z1lua2dZMjl0WW1sdWFXNW5JSFJvWlNCaVlYTmxWVkpNSUhkcGRHZ2dkR2hsSUhKbGNYVmxjM1JsWkZWU1RDeGNiaUFxSUc5dWJIa2dkMmhsYmlCMGFHVWdjbVZ4ZFdWemRHVmtWVkpNSUdseklHNXZkQ0JoYkhKbFlXUjVJR0Z1SUdGaWMyOXNkWFJsSUZWU1RDNWNiaUFxSUVsbUlIUm9aU0J5WlhGMVpYTjBWVkpNSUdseklHRmljMjlzZFhSbExDQjBhR2x6SUdaMWJtTjBhVzl1SUhKbGRIVnlibk1nZEdobElISmxjWFZsYzNSbFpGVlNUQ0IxYm5SdmRXTm9aV1F1WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR0poYzJWVlVrd2dWR2hsSUdKaGMyVWdWVkpNWEc0Z0tpQkFjR0Z5WVcwZ2UzTjBjbWx1WjMwZ2NtVnhkV1Z6ZEdWa1ZWSk1JRUZpYzI5c2RYUmxJRzl5SUhKbGJHRjBhWFpsSUZWU1RDQjBieUJqYjIxaWFXNWxYRzRnS2lCQWNtVjBkWEp1Y3lCN2MzUnlhVzVuZlNCVWFHVWdZMjl0WW1sdVpXUWdablZzYkNCd1lYUm9YRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z1luVnBiR1JHZFd4c1VHRjBhQ2hpWVhObFZWSk1MQ0J5WlhGMVpYTjBaV1JWVWt3cElIdGNiaUFnYVdZZ0tHSmhjMlZWVWt3Z0ppWWdJV2x6UVdKemIyeDFkR1ZWVWt3b2NtVnhkV1Z6ZEdWa1ZWSk1LU2tnZTF4dUlDQWdJSEpsZEhWeWJpQmpiMjFpYVc1bFZWSk1jeWhpWVhObFZWSk1MQ0J5WlhGMVpYTjBaV1JWVWt3cE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYRjFaWE4wWldSVlVrdzdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWlc1b1lXNWpaVVZ5Y205eUlEMGdjbVZ4ZFdseVpTZ25MaTlsYm1oaGJtTmxSWEp5YjNJbktUdGNibHh1THlvcVhHNGdLaUJEY21WaGRHVWdZVzRnUlhKeWIzSWdkMmwwYUNCMGFHVWdjM0JsWTJsbWFXVmtJRzFsYzNOaFoyVXNJR052Ym1acFp5d2daWEp5YjNJZ1kyOWtaU3dnY21WeGRXVnpkQ0JoYm1RZ2NtVnpjRzl1YzJVdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUcxbGMzTmhaMlVnVkdobElHVnljbTl5SUcxbGMzTmhaMlV1WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1kyOXVabWxuSUZSb1pTQmpiMjVtYVdjdVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdXMk52WkdWZElGUm9aU0JsY25KdmNpQmpiMlJsSUNobWIzSWdaWGhoYlhCc1pTd2dKMFZEVDA1T1FVSlBVbFJGUkNjcExseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRnR5WlhGMVpYTjBYU0JVYUdVZ2NtVnhkV1Z6ZEM1Y2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmJjbVZ6Y0c5dWMyVmRJRlJvWlNCeVpYTndiMjV6WlM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRGY25KdmNuMGdWR2hsSUdOeVpXRjBaV1FnWlhKeWIzSXVYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z1kzSmxZWFJsUlhKeWIzSW9iV1Z6YzJGblpTd2dZMjl1Wm1sbkxDQmpiMlJsTENCeVpYRjFaWE4wTENCeVpYTndiMjV6WlNrZ2UxeHVJQ0IyWVhJZ1pYSnliM0lnUFNCdVpYY2dSWEp5YjNJb2JXVnpjMkZuWlNrN1hHNGdJSEpsZEhWeWJpQmxibWhoYm1ObFJYSnliM0lvWlhKeWIzSXNJR052Ym1acFp5d2dZMjlrWlN3Z2NtVnhkV1Z6ZEN3Z2NtVnpjRzl1YzJVcE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5MWRHbHNjeWNwTzF4dWRtRnlJSFJ5WVc1elptOXliVVJoZEdFZ1BTQnlaWEYxYVhKbEtDY3VMM1J5WVc1elptOXliVVJoZEdFbktUdGNiblpoY2lCcGMwTmhibU5sYkNBOUlISmxjWFZwY21Vb0p5NHVMMk5oYm1ObGJDOXBjME5oYm1ObGJDY3BPMXh1ZG1GeUlHUmxabUYxYkhSeklEMGdjbVZ4ZFdseVpTZ25MaTR2WkdWbVlYVnNkSE1uS1R0Y2JseHVMeW9xWEc0Z0tpQlVhSEp2ZDNNZ1lTQmdRMkZ1WTJWc1lDQnBaaUJqWVc1alpXeHNZWFJwYjI0Z2FHRnpJR0psWlc0Z2NtVnhkV1Z6ZEdWa0xseHVJQ292WEc1bWRXNWpkR2x2YmlCMGFISnZkMGxtUTJGdVkyVnNiR0YwYVc5dVVtVnhkV1Z6ZEdWa0tHTnZibVpwWnlrZ2UxeHVJQ0JwWmlBb1kyOXVabWxuTG1OaGJtTmxiRlJ2YTJWdUtTQjdYRzRnSUNBZ1kyOXVabWxuTG1OaGJtTmxiRlJ2YTJWdUxuUm9jbTkzU1daU1pYRjFaWE4wWldRb0tUdGNiaUFnZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRVJwYzNCaGRHTm9JR0VnY21WeGRXVnpkQ0IwYnlCMGFHVWdjMlZ5ZG1WeUlIVnphVzVuSUhSb1pTQmpiMjVtYVdkMWNtVmtJR0ZrWVhCMFpYSXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdHZZbXBsWTNSOUlHTnZibVpwWnlCVWFHVWdZMjl1Wm1sbklIUm9ZWFFnYVhNZ2RHOGdZbVVnZFhObFpDQm1iM0lnZEdobElISmxjWFZsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRRY205dGFYTmxmU0JVYUdVZ1VISnZiV2x6WlNCMGJ5QmlaU0JtZFd4bWFXeHNaV1JjYmlBcUwxeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQmthWE53WVhSamFGSmxjWFZsYzNRb1kyOXVabWxuS1NCN1hHNGdJSFJvY205M1NXWkRZVzVqWld4c1lYUnBiMjVTWlhGMVpYTjBaV1FvWTI5dVptbG5LVHRjYmx4dUlDQXZMeUJGYm5OMWNtVWdhR1ZoWkdWeWN5QmxlR2x6ZEZ4dUlDQmpiMjVtYVdjdWFHVmhaR1Z5Y3lBOUlHTnZibVpwWnk1b1pXRmtaWEp6SUh4OElIdDlPMXh1WEc0Z0lDOHZJRlJ5WVc1elptOXliU0J5WlhGMVpYTjBJR1JoZEdGY2JpQWdZMjl1Wm1sbkxtUmhkR0VnUFNCMGNtRnVjMlp2Y20xRVlYUmhLRnh1SUNBZ0lHTnZibVpwWnk1a1lYUmhMRnh1SUNBZ0lHTnZibVpwWnk1b1pXRmtaWEp6TEZ4dUlDQWdJR052Ym1acFp5NTBjbUZ1YzJadmNtMVNaWEYxWlhOMFhHNGdJQ2s3WEc1Y2JpQWdMeThnUm14aGRIUmxiaUJvWldGa1pYSnpYRzRnSUdOdmJtWnBaeTVvWldGa1pYSnpJRDBnZFhScGJITXViV1Z5WjJVb1hHNGdJQ0FnWTI5dVptbG5MbWhsWVdSbGNuTXVZMjl0Ylc5dUlIeDhJSHQ5TEZ4dUlDQWdJR052Ym1acFp5NW9aV0ZrWlhKelcyTnZibVpwWnk1dFpYUm9iMlJkSUh4OElIdDlMRnh1SUNBZ0lHTnZibVpwWnk1b1pXRmtaWEp6WEc0Z0lDazdYRzVjYmlBZ2RYUnBiSE11Wm05eVJXRmphQ2hjYmlBZ0lDQmJKMlJsYkdWMFpTY3NJQ2RuWlhRbkxDQW5hR1ZoWkNjc0lDZHdiM04wSnl3Z0ozQjFkQ2NzSUNkd1lYUmphQ2NzSUNkamIyMXRiMjRuWFN4Y2JpQWdJQ0JtZFc1amRHbHZiaUJqYkdWaGJraGxZV1JsY2tOdmJtWnBaeWh0WlhSb2IyUXBJSHRjYmlBZ0lDQWdJR1JsYkdWMFpTQmpiMjVtYVdjdWFHVmhaR1Z5YzF0dFpYUm9iMlJkTzF4dUlDQWdJSDFjYmlBZ0tUdGNibHh1SUNCMllYSWdZV1JoY0hSbGNpQTlJR052Ym1acFp5NWhaR0Z3ZEdWeUlIeDhJR1JsWm1GMWJIUnpMbUZrWVhCMFpYSTdYRzVjYmlBZ2NtVjBkWEp1SUdGa1lYQjBaWElvWTI5dVptbG5LUzUwYUdWdUtHWjFibU4wYVc5dUlHOXVRV1JoY0hSbGNsSmxjMjlzZFhScGIyNG9jbVZ6Y0c5dWMyVXBJSHRjYmlBZ0lDQjBhSEp2ZDBsbVEyRnVZMlZzYkdGMGFXOXVVbVZ4ZFdWemRHVmtLR052Ym1acFp5azdYRzVjYmlBZ0lDQXZMeUJVY21GdWMyWnZjbTBnY21WemNHOXVjMlVnWkdGMFlWeHVJQ0FnSUhKbGMzQnZibk5sTG1SaGRHRWdQU0IwY21GdWMyWnZjbTFFWVhSaEtGeHVJQ0FnSUNBZ2NtVnpjRzl1YzJVdVpHRjBZU3hjYmlBZ0lDQWdJSEpsYzNCdmJuTmxMbWhsWVdSbGNuTXNYRzRnSUNBZ0lDQmpiMjVtYVdjdWRISmhibk5tYjNKdFVtVnpjRzl1YzJWY2JpQWdJQ0FwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSEpsYzNCdmJuTmxPMXh1SUNCOUxDQm1kVzVqZEdsdmJpQnZia0ZrWVhCMFpYSlNaV3BsWTNScGIyNG9jbVZoYzI5dUtTQjdYRzRnSUNBZ2FXWWdLQ0ZwYzBOaGJtTmxiQ2h5WldGemIyNHBLU0I3WEc0Z0lDQWdJQ0IwYUhKdmQwbG1RMkZ1WTJWc2JHRjBhVzl1VW1WeGRXVnpkR1ZrS0dOdmJtWnBaeWs3WEc1Y2JpQWdJQ0FnSUM4dklGUnlZVzV6Wm05eWJTQnlaWE53YjI1elpTQmtZWFJoWEc0Z0lDQWdJQ0JwWmlBb2NtVmhjMjl1SUNZbUlISmxZWE52Ymk1eVpYTndiMjV6WlNrZ2UxeHVJQ0FnSUNBZ0lDQnlaV0Z6YjI0dWNtVnpjRzl1YzJVdVpHRjBZU0E5SUhSeVlXNXpabTl5YlVSaGRHRW9YRzRnSUNBZ0lDQWdJQ0FnY21WaGMyOXVMbkpsYzNCdmJuTmxMbVJoZEdFc1hHNGdJQ0FnSUNBZ0lDQWdjbVZoYzI5dUxuSmxjM0J2Ym5ObExtaGxZV1JsY25Nc1hHNGdJQ0FnSUNBZ0lDQWdZMjl1Wm1sbkxuUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObFhHNGdJQ0FnSUNBZ0lDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUZCeWIyMXBjMlV1Y21WcVpXTjBLSEpsWVhOdmJpazdYRzRnSUgwcE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCVmNHUmhkR1VnWVc0Z1JYSnliM0lnZDJsMGFDQjBhR1VnYzNCbFkybG1hV1ZrSUdOdmJtWnBaeXdnWlhKeWIzSWdZMjlrWlN3Z1lXNWtJSEpsYzNCdmJuTmxMbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdSWEp5YjNKOUlHVnljbTl5SUZSb1pTQmxjbkp2Y2lCMGJ5QjFjR1JoZEdVdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdZMjl1Wm1sbklGUm9aU0JqYjI1bWFXY3VYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnVzJOdlpHVmRJRlJvWlNCbGNuSnZjaUJqYjJSbElDaG1iM0lnWlhoaGJYQnNaU3dnSjBWRFQwNU9RVUpQVWxSRlJDY3BMbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUZ0eVpYRjFaWE4wWFNCVWFHVWdjbVZ4ZFdWemRDNWNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JiY21WemNHOXVjMlZkSUZSb1pTQnlaWE53YjI1elpTNWNiaUFxSUVCeVpYUjFjbTV6SUh0RmNuSnZjbjBnVkdobElHVnljbTl5TGx4dUlDb3ZYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJR1Z1YUdGdVkyVkZjbkp2Y2lobGNuSnZjaXdnWTI5dVptbG5MQ0JqYjJSbExDQnlaWEYxWlhOMExDQnlaWE53YjI1elpTa2dlMXh1SUNCbGNuSnZjaTVqYjI1bWFXY2dQU0JqYjI1bWFXYzdYRzRnSUdsbUlDaGpiMlJsS1NCN1hHNGdJQ0FnWlhKeWIzSXVZMjlrWlNBOUlHTnZaR1U3WEc0Z0lIMWNibHh1SUNCbGNuSnZjaTV5WlhGMVpYTjBJRDBnY21WeGRXVnpkRHRjYmlBZ1pYSnliM0l1Y21WemNHOXVjMlVnUFNCeVpYTndiMjV6WlR0Y2JpQWdaWEp5YjNJdWFYTkJlR2x2YzBWeWNtOXlJRDBnZEhKMVpUdGNibHh1SUNCbGNuSnZjaTUwYjBwVFQwNGdQU0JtZFc1amRHbHZiaUIwYjBwVFQwNG9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDOHZJRk4wWVc1a1lYSmtYRzRnSUNBZ0lDQnRaWE56WVdkbE9pQjBhR2x6TG0xbGMzTmhaMlVzWEc0Z0lDQWdJQ0J1WVcxbE9pQjBhR2x6TG01aGJXVXNYRzRnSUNBZ0lDQXZMeUJOYVdOeWIzTnZablJjYmlBZ0lDQWdJR1JsYzJOeWFYQjBhVzl1T2lCMGFHbHpMbVJsYzJOeWFYQjBhVzl1TEZ4dUlDQWdJQ0FnYm5WdFltVnlPaUIwYUdsekxtNTFiV0psY2l4Y2JpQWdJQ0FnSUM4dklFMXZlbWxzYkdGY2JpQWdJQ0FnSUdacGJHVk9ZVzFsT2lCMGFHbHpMbVpwYkdWT1lXMWxMRnh1SUNBZ0lDQWdiR2x1WlU1MWJXSmxjam9nZEdocGN5NXNhVzVsVG5WdFltVnlMRnh1SUNBZ0lDQWdZMjlzZFcxdVRuVnRZbVZ5T2lCMGFHbHpMbU52YkhWdGJrNTFiV0psY2l4Y2JpQWdJQ0FnSUhOMFlXTnJPaUIwYUdsekxuTjBZV05yTEZ4dUlDQWdJQ0FnTHk4Z1FYaHBiM05jYmlBZ0lDQWdJR052Ym1acFp6b2dkR2hwY3k1amIyNW1hV2NzWEc0Z0lDQWdJQ0JqYjJSbE9pQjBhR2x6TG1OdlpHVmNiaUFnSUNCOU8xeHVJQ0I5TzF4dUlDQnlaWFIxY200Z1pYSnliM0k3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUxpOTFkR2xzY3ljcE8xeHVYRzR2S2lwY2JpQXFJRU52Ym1acFp5MXpjR1ZqYVdacFl5QnRaWEpuWlMxbWRXNWpkR2x2YmlCM2FHbGphQ0JqY21WaGRHVnpJR0VnYm1WM0lHTnZibVpwWnkxdlltcGxZM1JjYmlBcUlHSjVJRzFsY21kcGJtY2dkSGR2SUdOdmJtWnBaM1Z5WVhScGIyNGdiMkpxWldOMGN5QjBiMmRsZEdobGNpNWNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1kyOXVabWxuTVZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTnZibVpwWnpKY2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRTVsZHlCdlltcGxZM1FnY21WemRXeDBhVzVuSUdaeWIyMGdiV1Z5WjJsdVp5QmpiMjVtYVdjeUlIUnZJR052Ym1acFp6RmNiaUFxTDF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCdFpYSm5aVU52Ym1acFp5aGpiMjVtYVdjeExDQmpiMjVtYVdjeUtTQjdYRzRnSUM4dklHVnpiR2x1ZEMxa2FYTmhZbXhsTFc1bGVIUXRiR2x1WlNCdWJ5MXdZWEpoYlMxeVpXRnpjMmxuYmx4dUlDQmpiMjVtYVdjeUlEMGdZMjl1Wm1sbk1pQjhmQ0I3ZlR0Y2JpQWdkbUZ5SUdOdmJtWnBaeUE5SUh0OU8xeHVYRzRnSUhaaGNpQjJZV3gxWlVaeWIyMURiMjVtYVdjeVMyVjVjeUE5SUZzbmRYSnNKeXdnSjIxbGRHaHZaQ2NzSUNka1lYUmhKMTA3WEc0Z0lIWmhjaUJ0WlhKblpVUmxaWEJRY205d1pYSjBhV1Z6UzJWNWN5QTlJRnNuYUdWaFpHVnljeWNzSUNkaGRYUm9KeXdnSjNCeWIzaDVKeXdnSjNCaGNtRnRjeWRkTzF4dUlDQjJZWElnWkdWbVlYVnNkRlJ2UTI5dVptbG5Na3RsZVhNZ1BTQmJYRzRnSUNBZ0oySmhjMlZWVWt3bkxDQW5kSEpoYm5ObWIzSnRVbVZ4ZFdWemRDY3NJQ2QwY21GdWMyWnZjbTFTWlhOd2IyNXpaU2NzSUNkd1lYSmhiWE5UWlhKcFlXeHBlbVZ5Snl4Y2JpQWdJQ0FuZEdsdFpXOTFkQ2NzSUNkMGFXMWxiM1YwVFdWemMyRm5aU2NzSUNkM2FYUm9RM0psWkdWdWRHbGhiSE1uTENBbllXUmhjSFJsY2ljc0lDZHlaWE53YjI1elpWUjVjR1VuTENBbmVITnlaa052YjJ0cFpVNWhiV1VuTEZ4dUlDQWdJQ2Q0YzNKbVNHVmhaR1Z5VG1GdFpTY3NJQ2R2YmxWd2JHOWhaRkJ5YjJkeVpYTnpKeXdnSjI5dVJHOTNibXh2WVdSUWNtOW5jbVZ6Y3ljc0lDZGtaV052YlhCeVpYTnpKeXhjYmlBZ0lDQW5iV0Y0UTI5dWRHVnVkRXhsYm1kMGFDY3NJQ2R0WVhoQ2IyUjVUR1Z1WjNSb0p5d2dKMjFoZUZKbFpHbHlaV04wY3ljc0lDZDBjbUZ1YzNCdmNuUW5MQ0FuYUhSMGNFRm5aVzUwSnl4Y2JpQWdJQ0FuYUhSMGNITkJaMlZ1ZENjc0lDZGpZVzVqWld4VWIydGxiaWNzSUNkemIyTnJaWFJRWVhSb0p5d2dKM0psYzNCdmJuTmxSVzVqYjJScGJtY25YRzRnSUYwN1hHNGdJSFpoY2lCa2FYSmxZM1JOWlhKblpVdGxlWE1nUFNCYkozWmhiR2xrWVhSbFUzUmhkSFZ6SjEwN1hHNWNiaUFnWm5WdVkzUnBiMjRnWjJWMFRXVnlaMlZrVm1Gc2RXVW9kR0Z5WjJWMExDQnpiM1Z5WTJVcElIdGNiaUFnSUNCcFppQW9kWFJwYkhNdWFYTlFiR0ZwYms5aWFtVmpkQ2gwWVhKblpYUXBJQ1ltSUhWMGFXeHpMbWx6VUd4aGFXNVBZbXBsWTNRb2MyOTFjbU5sS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhWMGFXeHpMbTFsY21kbEtIUmhjbWRsZEN3Z2MyOTFjbU5sS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0hWMGFXeHpMbWx6VUd4aGFXNVBZbXBsWTNRb2MyOTFjbU5sS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhWMGFXeHpMbTFsY21kbEtIdDlMQ0J6YjNWeVkyVXBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9kWFJwYkhNdWFYTkJjbkpoZVNoemIzVnlZMlVwS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYzI5MWNtTmxMbk5zYVdObEtDazdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUJ6YjNWeVkyVTdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ0WlhKblpVUmxaWEJRY205d1pYSjBhV1Z6S0hCeWIzQXBJSHRjYmlBZ0lDQnBaaUFvSVhWMGFXeHpMbWx6Vlc1a1pXWnBibVZrS0dOdmJtWnBaekpiY0hKdmNGMHBLU0I3WEc0Z0lDQWdJQ0JqYjI1bWFXZGJjSEp2Y0YwZ1BTQm5aWFJOWlhKblpXUldZV3gxWlNoamIyNW1hV2N4VzNCeWIzQmRMQ0JqYjI1bWFXY3lXM0J5YjNCZEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tDRjFkR2xzY3k1cGMxVnVaR1ZtYVc1bFpDaGpiMjVtYVdjeFczQnliM0JkS1NrZ2UxeHVJQ0FnSUNBZ1kyOXVabWxuVzNCeWIzQmRJRDBnWjJWMFRXVnlaMlZrVm1Gc2RXVW9kVzVrWldacGJtVmtMQ0JqYjI1bWFXY3hXM0J5YjNCZEtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQjFkR2xzY3k1bWIzSkZZV05vS0haaGJIVmxSbkp2YlVOdmJtWnBaekpMWlhsekxDQm1kVzVqZEdsdmJpQjJZV3gxWlVaeWIyMURiMjVtYVdjeUtIQnliM0FwSUh0Y2JpQWdJQ0JwWmlBb0lYVjBhV3h6TG1selZXNWtaV1pwYm1Wa0tHTnZibVpwWnpKYmNISnZjRjBwS1NCN1hHNGdJQ0FnSUNCamIyNW1hV2RiY0hKdmNGMGdQU0JuWlhSTlpYSm5aV1JXWVd4MVpTaDFibVJsWm1sdVpXUXNJR052Ym1acFp6SmJjSEp2Y0YwcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1Y2JpQWdkWFJwYkhNdVptOXlSV0ZqYUNodFpYSm5aVVJsWlhCUWNtOXdaWEowYVdWelMyVjVjeXdnYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsY3lrN1hHNWNiaUFnZFhScGJITXVabTl5UldGamFDaGtaV1poZFd4MFZHOURiMjVtYVdjeVMyVjVjeXdnWm5WdVkzUnBiMjRnWkdWbVlYVnNkRlJ2UTI5dVptbG5NaWh3Y205d0tTQjdYRzRnSUNBZ2FXWWdLQ0YxZEdsc2N5NXBjMVZ1WkdWbWFXNWxaQ2hqYjI1bWFXY3lXM0J5YjNCZEtTa2dlMXh1SUNBZ0lDQWdZMjl1Wm1sblczQnliM0JkSUQwZ1oyVjBUV1Z5WjJWa1ZtRnNkV1VvZFc1a1pXWnBibVZrTENCamIyNW1hV2N5VzNCeWIzQmRLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLQ0YxZEdsc2N5NXBjMVZ1WkdWbWFXNWxaQ2hqYjI1bWFXY3hXM0J5YjNCZEtTa2dlMXh1SUNBZ0lDQWdZMjl1Wm1sblczQnliM0JkSUQwZ1oyVjBUV1Z5WjJWa1ZtRnNkV1VvZFc1a1pXWnBibVZrTENCamIyNW1hV2N4VzNCeWIzQmRLVHRjYmlBZ0lDQjlYRzRnSUgwcE8xeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29aR2x5WldOMFRXVnlaMlZMWlhsekxDQm1kVzVqZEdsdmJpQnRaWEpuWlNod2NtOXdLU0I3WEc0Z0lDQWdhV1lnS0hCeWIzQWdhVzRnWTI5dVptbG5NaWtnZTF4dUlDQWdJQ0FnWTI5dVptbG5XM0J5YjNCZElEMGdaMlYwVFdWeVoyVmtWbUZzZFdVb1kyOXVabWxuTVZ0d2NtOXdYU3dnWTI5dVptbG5NbHR3Y205d1hTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaHdjbTl3SUdsdUlHTnZibVpwWnpFcElIdGNiaUFnSUNBZ0lHTnZibVpwWjF0d2NtOXdYU0E5SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFZ1WkdWbWFXNWxaQ3dnWTI5dVptbG5NVnR3Y205d1hTazdYRzRnSUNBZ2ZWeHVJQ0I5S1R0Y2JseHVJQ0IyWVhJZ1lYaHBiM05MWlhseklEMGdkbUZzZFdWR2NtOXRRMjl1Wm1sbk1rdGxlWE5jYmlBZ0lDQXVZMjl1WTJGMEtHMWxjbWRsUkdWbGNGQnliM0JsY25ScFpYTkxaWGx6S1Z4dUlDQWdJQzVqYjI1allYUW9aR1ZtWVhWc2RGUnZRMjl1Wm1sbk1rdGxlWE1wWEc0Z0lDQWdMbU52Ym1OaGRDaGthWEpsWTNSTlpYSm5aVXRsZVhNcE8xeHVYRzRnSUhaaGNpQnZkR2hsY2t0bGVYTWdQU0JQWW1wbFkzUmNiaUFnSUNBdWEyVjVjeWhqYjI1bWFXY3hLVnh1SUNBZ0lDNWpiMjVqWVhRb1QySnFaV04wTG10bGVYTW9ZMjl1Wm1sbk1pa3BYRzRnSUNBZ0xtWnBiSFJsY2lobWRXNWpkR2x2YmlCbWFXeDBaWEpCZUdsdmMwdGxlWE1vYTJWNUtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1lYaHBiM05MWlhsekxtbHVaR1Y0VDJZb2EyVjVLU0E5UFQwZ0xURTdYRzRnSUNBZ2ZTazdYRzVjYmlBZ2RYUnBiSE11Wm05eVJXRmphQ2h2ZEdobGNrdGxlWE1zSUcxbGNtZGxSR1ZsY0ZCeWIzQmxjblJwWlhNcE8xeHVYRzRnSUhKbGRIVnliaUJqYjI1bWFXYzdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnWTNKbFlYUmxSWEp5YjNJZ1BTQnlaWEYxYVhKbEtDY3VMMk55WldGMFpVVnljbTl5SnlrN1hHNWNiaThxS2x4dUlDb2dVbVZ6YjJ4MlpTQnZjaUJ5WldwbFkzUWdZU0JRY205dGFYTmxJR0poYzJWa0lHOXVJSEpsYzNCdmJuTmxJSE4wWVhSMWN5NWNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQnlaWE52YkhabElFRWdablZ1WTNScGIyNGdkR2hoZENCeVpYTnZiSFpsY3lCMGFHVWdjSEp2YldselpTNWNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUhKbGFtVmpkQ0JCSUdaMWJtTjBhVzl1SUhSb1lYUWdjbVZxWldOMGN5QjBhR1VnY0hKdmJXbHpaUzVjYmlBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCeVpYTndiMjV6WlNCVWFHVWdjbVZ6Y0c5dWMyVXVYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2MyVjBkR3hsS0hKbGMyOXNkbVVzSUhKbGFtVmpkQ3dnY21WemNHOXVjMlVwSUh0Y2JpQWdkbUZ5SUhaaGJHbGtZWFJsVTNSaGRIVnpJRDBnY21WemNHOXVjMlV1WTI5dVptbG5MblpoYkdsa1lYUmxVM1JoZEhWek8xeHVJQ0JwWmlBb0lYSmxjM0J2Ym5ObExuTjBZWFIxY3lCOGZDQWhkbUZzYVdSaGRHVlRkR0YwZFhNZ2ZId2dkbUZzYVdSaGRHVlRkR0YwZFhNb2NtVnpjRzl1YzJVdWMzUmhkSFZ6S1NrZ2UxeHVJQ0FnSUhKbGMyOXNkbVVvY21WemNHOXVjMlVwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGFtVmpkQ2hqY21WaGRHVkZjbkp2Y2loY2JpQWdJQ0FnSUNkU1pYRjFaWE4wSUdaaGFXeGxaQ0IzYVhSb0lITjBZWFIxY3lCamIyUmxJQ2NnS3lCeVpYTndiMjV6WlM1emRHRjBkWE1zWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaUzVqYjI1bWFXY3NYRzRnSUNBZ0lDQnVkV3hzTEZ4dUlDQWdJQ0FnY21WemNHOXVjMlV1Y21WeGRXVnpkQ3hjYmlBZ0lDQWdJSEpsYzNCdmJuTmxYRzRnSUNBZ0tTazdYRzRnSUgxY2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQjFkR2xzY3lBOUlISmxjWFZwY21Vb0p5NHZMaTR2ZFhScGJITW5LVHRjYmx4dUx5b3FYRzRnS2lCVWNtRnVjMlp2Y20wZ2RHaGxJR1JoZEdFZ1ptOXlJR0VnY21WeGRXVnpkQ0J2Y2lCaElISmxjM0J2Ym5ObFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I4VTNSeWFXNW5mU0JrWVhSaElGUm9aU0JrWVhSaElIUnZJR0psSUhSeVlXNXpabTl5YldWa1hHNGdLaUJBY0dGeVlXMGdlMEZ5Y21GNWZTQm9aV0ZrWlhKeklGUm9aU0JvWldGa1pYSnpJR1p2Y2lCMGFHVWdjbVZ4ZFdWemRDQnZjaUJ5WlhOd2IyNXpaVnh1SUNvZ1FIQmhjbUZ0SUh0QmNuSmhlWHhHZFc1amRHbHZibjBnWm01eklFRWdjMmx1WjJ4bElHWjFibU4wYVc5dUlHOXlJRUZ5Y21GNUlHOW1JR1oxYm1OMGFXOXVjMXh1SUNvZ1FISmxkSFZ5Ym5NZ2V5cDlJRlJvWlNCeVpYTjFiSFJwYm1jZ2RISmhibk5tYjNKdFpXUWdaR0YwWVZ4dUlDb3ZYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJSFJ5WVc1elptOXliVVJoZEdFb1pHRjBZU3dnYUdWaFpHVnljeXdnWm01ektTQjdYRzRnSUM4cVpYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2pBcUwxeHVJQ0IxZEdsc2N5NW1iM0pGWVdOb0tHWnVjeXdnWm5WdVkzUnBiMjRnZEhKaGJuTm1iM0p0S0dadUtTQjdYRzRnSUNBZ1pHRjBZU0E5SUdadUtHUmhkR0VzSUdobFlXUmxjbk1wTzF4dUlDQjlLVHRjYmx4dUlDQnlaWFIxY200Z1pHRjBZVHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dmRYUnBiSE1uS1R0Y2JuWmhjaUJ1YjNKdFlXeHBlbVZJWldGa1pYSk9ZVzFsSUQwZ2NtVnhkV2x5WlNnbkxpOW9aV3h3WlhKekwyNXZjbTFoYkdsNlpVaGxZV1JsY2s1aGJXVW5LVHRjYmx4dWRtRnlJRVJGUmtGVlRGUmZRMDlPVkVWT1ZGOVVXVkJGSUQwZ2UxeHVJQ0FuUTI5dWRHVnVkQzFVZVhCbEp6b2dKMkZ3Y0d4cFkyRjBhVzl1TDNndGQzZDNMV1p2Y20wdGRYSnNaVzVqYjJSbFpDZGNibjA3WEc1Y2JtWjFibU4wYVc5dUlITmxkRU52Ym5SbGJuUlVlWEJsU1daVmJuTmxkQ2hvWldGa1pYSnpMQ0IyWVd4MVpTa2dlMXh1SUNCcFppQW9JWFYwYVd4ekxtbHpWVzVrWldacGJtVmtLR2hsWVdSbGNuTXBJQ1ltSUhWMGFXeHpMbWx6Vlc1a1pXWnBibVZrS0dobFlXUmxjbk5iSjBOdmJuUmxiblF0Vkhsd1pTZGRLU2tnZTF4dUlDQWdJR2hsWVdSbGNuTmJKME52Ym5SbGJuUXRWSGx3WlNkZElEMGdkbUZzZFdVN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwUkdWbVlYVnNkRUZrWVhCMFpYSW9LU0I3WEc0Z0lIWmhjaUJoWkdGd2RHVnlPMXh1SUNCcFppQW9kSGx3Wlc5bUlGaE5URWgwZEhCU1pYRjFaWE4wSUNFOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQzh2SUVadmNpQmljbTkzYzJWeWN5QjFjMlVnV0VoU0lHRmtZWEIwWlhKY2JpQWdJQ0JoWkdGd2RHVnlJRDBnY21WeGRXbHlaU2duTGk5aFpHRndkR1Z5Y3k5NGFISW5LVHRjYmlBZ2ZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ2NISnZZMlZ6Y3lBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnk1allXeHNLSEJ5YjJObGMzTXBJRDA5UFNBblcyOWlhbVZqZENCd2NtOWpaWE56WFNjcElIdGNiaUFnSUNBdkx5QkdiM0lnYm05a1pTQjFjMlVnU0ZSVVVDQmhaR0Z3ZEdWeVhHNGdJQ0FnWVdSaGNIUmxjaUE5SUhKbGNYVnBjbVVvSnk0dllXUmhjSFJsY25NdmFIUjBjQ2NwTzF4dUlDQjlYRzRnSUhKbGRIVnliaUJoWkdGd2RHVnlPMXh1ZlZ4dVhHNTJZWElnWkdWbVlYVnNkSE1nUFNCN1hHNGdJR0ZrWVhCMFpYSTZJR2RsZEVSbFptRjFiSFJCWkdGd2RHVnlLQ2tzWEc1Y2JpQWdkSEpoYm5ObWIzSnRVbVZ4ZFdWemREb2dXMloxYm1OMGFXOXVJSFJ5WVc1elptOXliVkpsY1hWbGMzUW9aR0YwWVN3Z2FHVmhaR1Z5Y3lrZ2UxeHVJQ0FnSUc1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVb2FHVmhaR1Z5Y3l3Z0owRmpZMlZ3ZENjcE8xeHVJQ0FnSUc1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVb2FHVmhaR1Z5Y3l3Z0owTnZiblJsYm5RdFZIbHdaU2NwTzF4dUlDQWdJR2xtSUNoMWRHbHNjeTVwYzBadmNtMUVZWFJoS0dSaGRHRXBJSHg4WEc0Z0lDQWdJQ0IxZEdsc2N5NXBjMEZ5Y21GNVFuVm1abVZ5S0dSaGRHRXBJSHg4WEc0Z0lDQWdJQ0IxZEdsc2N5NXBjMEoxWm1abGNpaGtZWFJoS1NCOGZGeHVJQ0FnSUNBZ2RYUnBiSE11YVhOVGRISmxZVzBvWkdGMFlTa2dmSHhjYmlBZ0lDQWdJSFYwYVd4ekxtbHpSbWxzWlNoa1lYUmhLU0I4ZkZ4dUlDQWdJQ0FnZFhScGJITXVhWE5DYkc5aUtHUmhkR0VwWEc0Z0lDQWdLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdaR0YwWVR0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hWMGFXeHpMbWx6UVhKeVlYbENkV1ptWlhKV2FXVjNLR1JoZEdFcEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1pHRjBZUzVpZFdabVpYSTdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaDFkR2xzY3k1cGMxVlNURk5sWVhKamFGQmhjbUZ0Y3loa1lYUmhLU2tnZTF4dUlDQWdJQ0FnYzJWMFEyOXVkR1Z1ZEZSNWNHVkpabFZ1YzJWMEtHaGxZV1JsY25Nc0lDZGhjSEJzYVdOaGRHbHZiaTk0TFhkM2R5MW1iM0p0TFhWeWJHVnVZMjlrWldRN1kyaGhjbk5sZEQxMWRHWXRPQ2NwTzF4dUlDQWdJQ0FnY21WMGRYSnVJR1JoZEdFdWRHOVRkSEpwYm1jb0tUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tIVjBhV3h6TG1selQySnFaV04wS0dSaGRHRXBLU0I3WEc0Z0lDQWdJQ0J6WlhSRGIyNTBaVzUwVkhsd1pVbG1WVzV6WlhRb2FHVmhaR1Z5Y3l3Z0oyRndjR3hwWTJGMGFXOXVMMnB6YjI0N1kyaGhjbk5sZEQxMWRHWXRPQ2NwTzF4dUlDQWdJQ0FnY21WMGRYSnVJRXBUVDA0dWMzUnlhVzVuYVdaNUtHUmhkR0VwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pHRjBZVHRjYmlBZ2ZWMHNYRzVjYmlBZ2RISmhibk5tYjNKdFVtVnpjRzl1YzJVNklGdG1kVzVqZEdsdmJpQjBjbUZ1YzJadmNtMVNaWE53YjI1elpTaGtZWFJoS1NCN1hHNGdJQ0FnTHlwbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2TUNvdlhHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCa1lYUmhJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnWkdGMFlTQTlJRXBUVDA0dWNHRnljMlVvWkdGMFlTazdYRzRnSUNBZ0lDQjlJR05oZEdOb0lDaGxLU0I3SUM4cUlFbG5ibTl5WlNBcUx5QjlYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUJrWVhSaE8xeHVJQ0I5WFN4Y2JseHVJQ0F2S2lwY2JpQWdJQ29nUVNCMGFXMWxiM1YwSUdsdUlHMXBiR3hwYzJWamIyNWtjeUIwYnlCaFltOXlkQ0JoSUhKbGNYVmxjM1F1SUVsbUlITmxkQ0IwYnlBd0lDaGtaV1poZFd4MEtTQmhYRzRnSUNBcUlIUnBiV1Z2ZFhRZ2FYTWdibTkwSUdOeVpXRjBaV1F1WEc0Z0lDQXFMMXh1SUNCMGFXMWxiM1YwT2lBd0xGeHVYRzRnSUhoemNtWkRiMjlyYVdWT1lXMWxPaUFuV0ZOU1JpMVVUMHRGVGljc1hHNGdJSGh6Y21aSVpXRmtaWEpPWVcxbE9pQW5XQzFZVTFKR0xWUlBTMFZPSnl4Y2JseHVJQ0J0WVhoRGIyNTBaVzUwVEdWdVozUm9PaUF0TVN4Y2JpQWdiV0Y0UW05a2VVeGxibWQwYURvZ0xURXNYRzVjYmlBZ2RtRnNhV1JoZEdWVGRHRjBkWE02SUdaMWJtTjBhVzl1SUhaaGJHbGtZWFJsVTNSaGRIVnpLSE4wWVhSMWN5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCemRHRjBkWE1nUGowZ01qQXdJQ1ltSUhOMFlYUjFjeUE4SURNd01EdGNiaUFnZlZ4dWZUdGNibHh1WkdWbVlYVnNkSE11YUdWaFpHVnljeUE5SUh0Y2JpQWdZMjl0Ylc5dU9pQjdYRzRnSUNBZ0owRmpZMlZ3ZENjNklDZGhjSEJzYVdOaGRHbHZiaTlxYzI5dUxDQjBaWGgwTDNCc1lXbHVMQ0FxTHlvblhHNGdJSDFjYm4wN1hHNWNiblYwYVd4ekxtWnZja1ZoWTJnb1d5ZGtaV3hsZEdVbkxDQW5aMlYwSnl3Z0oyaGxZV1FuWFN3Z1puVnVZM1JwYjI0Z1ptOXlSV0ZqYUUxbGRHaHZaRTV2UkdGMFlTaHRaWFJvYjJRcElIdGNiaUFnWkdWbVlYVnNkSE11YUdWaFpHVnljMXR0WlhSb2IyUmRJRDBnZTMwN1hHNTlLVHRjYmx4dWRYUnBiSE11Wm05eVJXRmphQ2hiSjNCdmMzUW5MQ0FuY0hWMEp5d2dKM0JoZEdOb0oxMHNJR1oxYm1OMGFXOXVJR1p2Y2tWaFkyaE5aWFJvYjJSWGFYUm9SR0YwWVNodFpYUm9iMlFwSUh0Y2JpQWdaR1ZtWVhWc2RITXVhR1ZoWkdWeWMxdHRaWFJvYjJSZElEMGdkWFJwYkhNdWJXVnlaMlVvUkVWR1FWVk1WRjlEVDA1VVJVNVVYMVJaVUVVcE8xeHVmU2s3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1pHVm1ZWFZzZEhNN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdZbWx1WkNobWJpd2dkR2hwYzBGeVp5a2dlMXh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnZDNKaGNDZ3BJSHRjYmlBZ0lDQjJZWElnWVhKbmN5QTlJRzVsZHlCQmNuSmhlU2hoY21kMWJXVnVkSE11YkdWdVozUm9LVHRjYmlBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR0Z5WjNNdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJR0Z5WjNOYmFWMGdQU0JoY21kMWJXVnVkSE5iYVYwN1hHNGdJQ0FnZlZ4dUlDQWdJSEpsZEhWeWJpQm1iaTVoY0hCc2VTaDBhR2x6UVhKbkxDQmhjbWR6S1R0Y2JpQWdmVHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZkWFJwYkhNbktUdGNibHh1Wm5WdVkzUnBiMjRnWlc1amIyUmxLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdaVzVqYjJSbFZWSkpRMjl0Y0c5dVpXNTBLSFpoYkNrdVhHNGdJQ0FnY21Wd2JHRmpaU2d2SlROQkwyZHBMQ0FuT2ljcExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVeU5DOW5MQ0FuSkNjcExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVeVF5OW5hU3dnSnl3bktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE1qQXZaeXdnSnlzbktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE5VSXZaMmtzSUNkYkp5a3VYRzRnSUNBZ2NtVndiR0ZqWlNndkpUVkVMMmRwTENBblhTY3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFSjFhV3hrSUdFZ1ZWSk1JR0o1SUdGd2NHVnVaR2x1WnlCd1lYSmhiWE1nZEc4Z2RHaGxJR1Z1WkZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0IxY213Z1ZHaGxJR0poYzJVZ2IyWWdkR2hsSUhWeWJDQW9aUzVuTGl3Z2FIUjBjRG92TDNkM2R5NW5iMjluYkdVdVkyOXRLVnh1SUNvZ1FIQmhjbUZ0SUh0dlltcGxZM1I5SUZ0d1lYSmhiWE5kSUZSb1pTQndZWEpoYlhNZ2RHOGdZbVVnWVhCd1pXNWtaV1JjYmlBcUlFQnlaWFIxY201eklIdHpkSEpwYm1kOUlGUm9aU0JtYjNKdFlYUjBaV1FnZFhKc1hHNGdLaTljYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnWW5WcGJHUlZVa3dvZFhKc0xDQndZWEpoYlhNc0lIQmhjbUZ0YzFObGNtbGhiR2w2WlhJcElIdGNiaUFnTHlwbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2TUNvdlhHNGdJR2xtSUNnaGNHRnlZVzF6S1NCN1hHNGdJQ0FnY21WMGRYSnVJSFZ5YkR0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJ6WlhKcFlXeHBlbVZrVUdGeVlXMXpPMXh1SUNCcFppQW9jR0Z5WVcxelUyVnlhV0ZzYVhwbGNpa2dlMXh1SUNBZ0lITmxjbWxoYkdsNlpXUlFZWEpoYlhNZ1BTQndZWEpoYlhOVFpYSnBZV3hwZW1WeUtIQmhjbUZ0Y3lrN1hHNGdJSDBnWld4elpTQnBaaUFvZFhScGJITXVhWE5WVWt4VFpXRnlZMmhRWVhKaGJYTW9jR0Z5WVcxektTa2dlMXh1SUNBZ0lITmxjbWxoYkdsNlpXUlFZWEpoYlhNZ1BTQndZWEpoYlhNdWRHOVRkSEpwYm1jb0tUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZWElnY0dGeWRITWdQU0JiWFR0Y2JseHVJQ0FnSUhWMGFXeHpMbVp2Y2tWaFkyZ29jR0Z5WVcxekxDQm1kVzVqZEdsdmJpQnpaWEpwWVd4cGVtVW9kbUZzTENCclpYa3BJSHRjYmlBZ0lDQWdJR2xtSUNoMllXd2dQVDA5SUc1MWJHd2dmSHdnZEhsd1pXOW1JSFpoYkNBOVBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9kWFJwYkhNdWFYTkJjbkpoZVNoMllXd3BLU0I3WEc0Z0lDQWdJQ0FnSUd0bGVTQTlJR3RsZVNBcklDZGJYU2M3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IyWVd3Z1BTQmJkbUZzWFR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2RYUnBiSE11Wm05eVJXRmphQ2gyWVd3c0lHWjFibU4wYVc5dUlIQmhjbk5sVm1Gc2RXVW9kaWtnZTF4dUlDQWdJQ0FnSUNCcFppQW9kWFJwYkhNdWFYTkVZWFJsS0hZcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZGlBOUlIWXVkRzlKVTA5VGRISnBibWNvS1R0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaDFkR2xzY3k1cGMwOWlhbVZqZENoMktTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhZZ1BTQktVMDlPTG5OMGNtbHVaMmxtZVNoMktUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J3WVhKMGN5NXdkWE5vS0dWdVkyOWtaU2hyWlhrcElDc2dKejBuSUNzZ1pXNWpiMlJsS0hZcEtUdGNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMHBPMXh1WEc0Z0lDQWdjMlZ5YVdGc2FYcGxaRkJoY21GdGN5QTlJSEJoY25SekxtcHZhVzRvSnlZbktUdGNiaUFnZlZ4dVhHNGdJR2xtSUNoelpYSnBZV3hwZW1Wa1VHRnlZVzF6S1NCN1hHNGdJQ0FnZG1GeUlHaGhjMmh0WVhKclNXNWtaWGdnUFNCMWNtd3VhVzVrWlhoUFppZ25JeWNwTzF4dUlDQWdJR2xtSUNob1lYTm9iV0Z5YTBsdVpHVjRJQ0U5UFNBdE1Ta2dlMXh1SUNBZ0lDQWdkWEpzSUQwZ2RYSnNMbk5zYVdObEtEQXNJR2hoYzJodFlYSnJTVzVrWlhncE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhWeWJDQXJQU0FvZFhKc0xtbHVaR1Y0VDJZb0p6OG5LU0E5UFQwZ0xURWdQeUFuUHljZ09pQW5KaWNwSUNzZ2MyVnlhV0ZzYVhwbFpGQmhjbUZ0Y3p0Y2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCMWNtdzdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlhNZ1lTQnVaWGNnVlZKTUlHSjVJR052YldKcGJtbHVaeUIwYUdVZ2MzQmxZMmxtYVdWa0lGVlNUSE5jYmlBcVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdZbUZ6WlZWU1RDQlVhR1VnWW1GelpTQlZVa3hjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCeVpXeGhkR2wyWlZWU1RDQlVhR1VnY21Wc1lYUnBkbVVnVlZKTVhHNGdLaUJBY21WMGRYSnVjeUI3YzNSeWFXNW5mU0JVYUdVZ1kyOXRZbWx1WldRZ1ZWSk1YRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z1kyOXRZbWx1WlZWU1RITW9ZbUZ6WlZWU1RDd2djbVZzWVhScGRtVlZVa3dwSUh0Y2JpQWdjbVYwZFhKdUlISmxiR0YwYVhabFZWSk1YRzRnSUNBZ1B5QmlZWE5sVlZKTUxuSmxjR3hoWTJVb0wxeGNMeXNrTHl3Z0p5Y3BJQ3NnSnk4bklDc2djbVZzWVhScGRtVlZVa3d1Y21Wd2JHRmpaU2d2WGx4Y0x5c3ZMQ0FuSnlsY2JpQWdJQ0E2SUdKaGMyVlZVa3c3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnS0Z4dUlDQjFkR2xzY3k1cGMxTjBZVzVrWVhKa1FuSnZkM05sY2tWdWRpZ3BJRDljYmx4dUlDQXZMeUJUZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZG5NZ2MzVndjRzl5ZENCa2IyTjFiV1Z1ZEM1amIyOXJhV1ZjYmlBZ0lDQW9ablZ1WTNScGIyNGdjM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnZDNKcGRHVTZJR1oxYm1OMGFXOXVJSGR5YVhSbEtHNWhiV1VzSUhaaGJIVmxMQ0JsZUhCcGNtVnpMQ0J3WVhSb0xDQmtiMjFoYVc0c0lITmxZM1Z5WlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCamIyOXJhV1VnUFNCYlhUdGNiaUFnSUNBZ0lDQWdJQ0JqYjI5cmFXVXVjSFZ6YUNodVlXMWxJQ3NnSnowbklDc2daVzVqYjJSbFZWSkpRMjl0Y0c5dVpXNTBLSFpoYkhWbEtTazdYRzVjYmlBZ0lDQWdJQ0FnSUNCcFppQW9kWFJwYkhNdWFYTk9kVzFpWlhJb1pYaHdhWEpsY3lrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmIydHBaUzV3ZFhOb0tDZGxlSEJwY21WelBTY2dLeUJ1WlhjZ1JHRjBaU2hsZUhCcGNtVnpLUzUwYjBkTlZGTjBjbWx1WnlncEtUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvZFhScGJITXVhWE5UZEhKcGJtY29jR0YwYUNrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmIydHBaUzV3ZFhOb0tDZHdZWFJvUFNjZ0t5QndZWFJvS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNCcFppQW9kWFJwYkhNdWFYTlRkSEpwYm1jb1pHOXRZV2x1S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dmEybGxMbkIxYzJnb0oyUnZiV0ZwYmowbklDc2daRzl0WVdsdUtUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvYzJWamRYSmxJRDA5UFNCMGNuVmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjlyYVdVdWNIVnphQ2duYzJWamRYSmxKeWs3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnWkc5amRXMWxiblF1WTI5dmEybGxJRDBnWTI5dmEybGxMbXB2YVc0b0p6c2dKeWs3WEc0Z0lDQWdJQ0FnSUgwc1hHNWNiaUFnSUNBZ0lDQWdjbVZoWkRvZ1puVnVZM1JwYjI0Z2NtVmhaQ2h1WVcxbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlHMWhkR05vSUQwZ1pHOWpkVzFsYm5RdVkyOXZhMmxsTG0xaGRHTm9LRzVsZHlCU1pXZEZlSEFvSnloZWZEdGNYRnhjY3lvcEtDY2dLeUJ1WVcxbElDc2dKeWs5S0Z0ZU8xMHFLU2NwS1R0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z0tHMWhkR05vSUQ4Z1pHVmpiMlJsVlZKSlEyOXRjRzl1Wlc1MEtHMWhkR05vV3pOZEtTQTZJRzUxYkd3cE8xeHVJQ0FnSUNBZ0lDQjlMRnh1WEc0Z0lDQWdJQ0FnSUhKbGJXOTJaVG9nWm5WdVkzUnBiMjRnY21WdGIzWmxLRzVoYldVcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxuZHlhWFJsS0c1aGJXVXNJQ2NuTENCRVlYUmxMbTV2ZHlncElDMGdPRFkwTURBd01EQXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJSDBwS0NrZ09seHVYRzRnSUM4dklFNXZiaUJ6ZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZGlBb2QyVmlJSGR2Y210bGNuTXNJSEpsWVdOMExXNWhkR2wyWlNrZ2JHRmpheUJ1WldWa1pXUWdjM1Z3Y0c5eWRDNWNiaUFnSUNBb1puVnVZM1JwYjI0Z2JtOXVVM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnZDNKcGRHVTZJR1oxYm1OMGFXOXVJSGR5YVhSbEtDa2dlMzBzWEc0Z0lDQWdJQ0FnSUhKbFlXUTZJR1oxYm1OMGFXOXVJSEpsWVdRb0tTQjdJSEpsZEhWeWJpQnVkV3hzT3lCOUxGeHVJQ0FnSUNBZ0lDQnlaVzF2ZG1VNklHWjFibU4wYVc5dUlISmxiVzkyWlNncElIdDlYRzRnSUNBZ0lDQjlPMXh1SUNBZ0lIMHBLQ2xjYmlrN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxjeUIzYUdWMGFHVnlJSFJvWlNCemNHVmphV1pwWldRZ1ZWSk1JR2x6SUdGaWMyOXNkWFJsWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJSFZ5YkNCVWFHVWdWVkpNSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIUm9aU0J6Y0dWamFXWnBaV1FnVlZKTUlHbHpJR0ZpYzI5c2RYUmxMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCcGMwRmljMjlzZFhSbFZWSk1LSFZ5YkNrZ2UxeHVJQ0F2THlCQklGVlNUQ0JwY3lCamIyNXphV1JsY21Wa0lHRmljMjlzZFhSbElHbG1JR2wwSUdKbFoybHVjeUIzYVhSb0lGd2lQSE5qYUdWdFpUNDZMeTljSWlCdmNpQmNJaTh2WENJZ0tIQnliM1J2WTI5c0xYSmxiR0YwYVhabElGVlNUQ2t1WEc0Z0lDOHZJRkpHUXlBek9UZzJJR1JsWm1sdVpYTWdjMk5vWlcxbElHNWhiV1VnWVhNZ1lTQnpaWEYxWlc1alpTQnZaaUJqYUdGeVlXTjBaWEp6SUdKbFoybHVibWx1WnlCM2FYUm9JR0VnYkdWMGRHVnlJR0Z1WkNCbWIyeHNiM2RsWkZ4dUlDQXZMeUJpZVNCaGJua2dZMjl0WW1sdVlYUnBiMjRnYjJZZ2JHVjBkR1Z5Y3l3Z1pHbG5hWFJ6TENCd2JIVnpMQ0J3WlhKcGIyUXNJRzl5SUdoNWNHaGxiaTVjYmlBZ2NtVjBkWEp1SUM5ZUtGdGhMWHBkVzJFdGVseGNaRnhjSzF4Y0xWeGNMbDBxT2lrL1hGd3ZYRnd2TDJrdWRHVnpkQ2gxY213cE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5MWRHbHNjeWNwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlDaGNiaUFnZFhScGJITXVhWE5UZEdGdVpHRnlaRUp5YjNkelpYSkZibllvS1NBL1hHNWNiaUFnTHk4Z1UzUmhibVJoY21RZ1luSnZkM05sY2lCbGJuWnpJR2hoZG1VZ1puVnNiQ0J6ZFhCd2IzSjBJRzltSUhSb1pTQkJVRWx6SUc1bFpXUmxaQ0IwYnlCMFpYTjBYRzRnSUM4dklIZG9aWFJvWlhJZ2RHaGxJSEpsY1hWbGMzUWdWVkpNSUdseklHOW1JSFJvWlNCellXMWxJRzl5YVdkcGJpQmhjeUJqZFhKeVpXNTBJR3h2WTJGMGFXOXVMbHh1SUNBZ0lDaG1kVzVqZEdsdmJpQnpkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWW9LU0I3WEc0Z0lDQWdJQ0IyWVhJZ2JYTnBaU0E5SUM4b2JYTnBaWHgwY21sa1pXNTBLUzlwTG5SbGMzUW9ibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQ2s3WEc0Z0lDQWdJQ0IyWVhJZ2RYSnNVR0Z5YzJsdVowNXZaR1VnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RoSnlrN1hHNGdJQ0FnSUNCMllYSWdiM0pwWjJsdVZWSk1PMXh1WEc0Z0lDQWdJQ0F2S2lwY2JpQWdJQ0FxSUZCaGNuTmxJR0VnVlZKTUlIUnZJR1JwYzJOdmRtVnlJR2wwSjNNZ1kyOXRjRzl1Wlc1MGMxeHVJQ0FnSUNwY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0IxY213Z1ZHaGxJRlZTVENCMGJ5QmlaU0J3WVhKelpXUmNiaUFnSUNBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOVhHNGdJQ0FnS2k5Y2JpQWdJQ0FnSUdaMWJtTjBhVzl1SUhKbGMyOXNkbVZWVWt3b2RYSnNLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQm9jbVZtSUQwZ2RYSnNPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaHRjMmxsS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRWxGSUc1bFpXUnpJR0YwZEhKcFluVjBaU0J6WlhRZ2RIZHBZMlVnZEc4Z2JtOXliV0ZzYVhwbElIQnliM0JsY25ScFpYTmNiaUFnSUNBZ0lDQWdJQ0IxY214UVlYSnphVzVuVG05a1pTNXpaWFJCZEhSeWFXSjFkR1VvSjJoeVpXWW5MQ0JvY21WbUtUdGNiaUFnSUNBZ0lDQWdJQ0JvY21WbUlEMGdkWEpzVUdGeWMybHVaMDV2WkdVdWFISmxaanRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lIVnliRkJoY25OcGJtZE9iMlJsTG5ObGRFRjBkSEpwWW5WMFpTZ25hSEpsWmljc0lHaHlaV1lwTzF4dVhHNGdJQ0FnSUNBZ0lDOHZJSFZ5YkZCaGNuTnBibWRPYjJSbElIQnliM1pwWkdWeklIUm9aU0JWY214VmRHbHNjeUJwYm5SbGNtWmhZMlVnTFNCb2RIUndPaTh2ZFhKc0xuTndaV011ZDJoaGRIZG5MbTl5Wnk4amRYSnNkWFJwYkhOY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUNBZ0lDQm9jbVZtT2lCMWNteFFZWEp6YVc1blRtOWtaUzVvY21WbUxGeHVJQ0FnSUNBZ0lDQWdJSEJ5YjNSdlkyOXNPaUIxY214UVlYSnphVzVuVG05a1pTNXdjbTkwYjJOdmJDQS9JSFZ5YkZCaGNuTnBibWRPYjJSbExuQnliM1J2WTI5c0xuSmxjR3hoWTJVb0x6b2tMeXdnSnljcElEb2dKeWNzWEc0Z0lDQWdJQ0FnSUNBZ2FHOXpkRG9nZFhKc1VHRnljMmx1WjA1dlpHVXVhRzl6ZEN4Y2JpQWdJQ0FnSUNBZ0lDQnpaV0Z5WTJnNklIVnliRkJoY25OcGJtZE9iMlJsTG5ObFlYSmphQ0EvSUhWeWJGQmhjbk5wYm1kT2IyUmxMbk5sWVhKamFDNXlaWEJzWVdObEtDOWVYRncvTHl3Z0p5Y3BJRG9nSnljc1hHNGdJQ0FnSUNBZ0lDQWdhR0Z6YURvZ2RYSnNVR0Z5YzJsdVowNXZaR1V1YUdGemFDQS9JSFZ5YkZCaGNuTnBibWRPYjJSbExtaGhjMmd1Y21Wd2JHRmpaU2d2WGlNdkxDQW5KeWtnT2lBbkp5eGNiaUFnSUNBZ0lDQWdJQ0JvYjNOMGJtRnRaVG9nZFhKc1VHRnljMmx1WjA1dlpHVXVhRzl6ZEc1aGJXVXNYRzRnSUNBZ0lDQWdJQ0FnY0c5eWREb2dkWEpzVUdGeWMybHVaMDV2WkdVdWNHOXlkQ3hjYmlBZ0lDQWdJQ0FnSUNCd1lYUm9ibUZ0WlRvZ0tIVnliRkJoY25OcGJtZE9iMlJsTG5CaGRHaHVZVzFsTG1Ob1lYSkJkQ2d3S1NBOVBUMGdKeThuS1NBL1hHNGdJQ0FnSUNBZ0lDQWdJQ0IxY214UVlYSnphVzVuVG05a1pTNXdZWFJvYm1GdFpTQTZYRzRnSUNBZ0lDQWdJQ0FnSUNBbkx5Y2dLeUIxY214UVlYSnphVzVuVG05a1pTNXdZWFJvYm1GdFpWeHVJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0J2Y21sbmFXNVZVa3dnUFNCeVpYTnZiSFpsVlZKTUtIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1b2NtVm1LVHRjYmx4dUlDQWdJQ0FnTHlvcVhHNGdJQ0FnS2lCRVpYUmxjbTFwYm1VZ2FXWWdZU0JWVWt3Z2MyaGhjbVZ6SUhSb1pTQnpZVzFsSUc5eWFXZHBiaUJoY3lCMGFHVWdZM1Z5Y21WdWRDQnNiMk5oZEdsdmJseHVJQ0FnSUNwY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0J5WlhGMVpYTjBWVkpNSUZSb1pTQlZVa3dnZEc4Z2RHVnpkRnh1SUNBZ0lDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdWVkpNSUhOb1lYSmxjeUIwYUdVZ2MyRnRaU0J2Y21sbmFXNHNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ0FnSUNvdlhHNGdJQ0FnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYVhOVlVreFRZVzFsVDNKcFoybHVLSEpsY1hWbGMzUlZVa3dwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJSEJoY25ObFpDQTlJQ2gxZEdsc2N5NXBjMU4wY21sdVp5aHlaWEYxWlhOMFZWSk1LU2tnUHlCeVpYTnZiSFpsVlZKTUtISmxjWFZsYzNSVlVrd3BJRG9nY21WeGRXVnpkRlZTVER0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUNod1lYSnpaV1F1Y0hKdmRHOWpiMndnUFQwOUlHOXlhV2RwYmxWU1RDNXdjbTkwYjJOdmJDQW1KbHh1SUNBZ0lDQWdJQ0FnSUNBZ2NHRnljMlZrTG1odmMzUWdQVDA5SUc5eWFXZHBibFZTVEM1b2IzTjBLVHRjYmlBZ0lDQWdJSDA3WEc0Z0lDQWdmU2tvS1NBNlhHNWNiaUFnTHk4Z1RtOXVJSE4wWVc1a1lYSmtJR0p5YjNkelpYSWdaVzUyY3lBb2QyVmlJSGR2Y210bGNuTXNJSEpsWVdOMExXNWhkR2wyWlNrZ2JHRmpheUJ1WldWa1pXUWdjM1Z3Y0c5eWRDNWNiaUFnSUNBb1puVnVZM1JwYjI0Z2JtOXVVM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1oxYm1OMGFXOXVJR2x6VlZKTVUyRnRaVTl5YVdkcGJpZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUgwcEtDbGNiaWs3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR1TDNWMGFXeHpKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2JtOXliV0ZzYVhwbFNHVmhaR1Z5VG1GdFpTaG9aV0ZrWlhKekxDQnViM0p0WVd4cGVtVmtUbUZ0WlNrZ2UxeHVJQ0IxZEdsc2N5NW1iM0pGWVdOb0tHaGxZV1JsY25Nc0lHWjFibU4wYVc5dUlIQnliMk5sYzNOSVpXRmtaWElvZG1Gc2RXVXNJRzVoYldVcElIdGNiaUFnSUNCcFppQW9ibUZ0WlNBaFBUMGdibTl5YldGc2FYcGxaRTVoYldVZ0ppWWdibUZ0WlM1MGIxVndjR1Z5UTJGelpTZ3BJRDA5UFNCdWIzSnRZV3hwZW1Wa1RtRnRaUzUwYjFWd2NHVnlRMkZ6WlNncEtTQjdYRzRnSUNBZ0lDQm9aV0ZrWlhKelcyNXZjbTFoYkdsNlpXUk9ZVzFsWFNBOUlIWmhiSFZsTzF4dUlDQWdJQ0FnWkdWc1pYUmxJR2hsWVdSbGNuTmJibUZ0WlYwN1hHNGdJQ0FnZlZ4dUlDQjlLVHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZkWFJwYkhNbktUdGNibHh1THk4Z1NHVmhaR1Z5Y3lCM2FHOXpaU0JrZFhCc2FXTmhkR1Z6SUdGeVpTQnBaMjV2Y21Wa0lHSjVJRzV2WkdWY2JpOHZJR011Wmk0Z2FIUjBjSE02THk5dWIyUmxhbk11YjNKbkwyRndhUzlvZEhSd0xtaDBiV3dqYUhSMGNGOXRaWE56WVdkbFgyaGxZV1JsY25OY2JuWmhjaUJwWjI1dmNtVkVkWEJzYVdOaGRHVlBaaUE5SUZ0Y2JpQWdKMkZuWlNjc0lDZGhkWFJvYjNKcGVtRjBhVzl1Snl3Z0oyTnZiblJsYm5RdGJHVnVaM1JvSnl3Z0oyTnZiblJsYm5RdGRIbHdaU2NzSUNkbGRHRm5KeXhjYmlBZ0oyVjRjR2x5WlhNbkxDQW5abkp2YlNjc0lDZG9iM04wSnl3Z0oybG1MVzF2WkdsbWFXVmtMWE5wYm1ObEp5d2dKMmxtTFhWdWJXOWthV1pwWldRdGMybHVZMlVuTEZ4dUlDQW5iR0Z6ZEMxdGIyUnBabWxsWkNjc0lDZHNiMk5oZEdsdmJpY3NJQ2R0WVhndFptOXlkMkZ5WkhNbkxDQW5jSEp2ZUhrdFlYVjBhRzl5YVhwaGRHbHZiaWNzWEc0Z0lDZHlaV1psY21WeUp5d2dKM0psZEhKNUxXRm1kR1Z5Snl3Z0ozVnpaWEl0WVdkbGJuUW5YRzVkTzF4dVhHNHZLaXBjYmlBcUlGQmhjbk5sSUdobFlXUmxjbk1nYVc1MGJ5QmhiaUJ2WW1wbFkzUmNiaUFxWEc0Z0tpQmdZR0JjYmlBcUlFUmhkR1U2SUZkbFpDd2dNamNnUVhWbklESXdNVFFnTURnNk5UZzZORGtnUjAxVVhHNGdLaUJEYjI1MFpXNTBMVlI1Y0dVNklHRndjR3hwWTJGMGFXOXVMMnB6YjI1Y2JpQXFJRU52Ym01bFkzUnBiMjQ2SUd0bFpYQXRZV3hwZG1WY2JpQXFJRlJ5WVc1elptVnlMVVZ1WTI5a2FXNW5PaUJqYUhWdWEyVmtYRzRnS2lCZ1lHQmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2FHVmhaR1Z5Y3lCSVpXRmtaWEp6SUc1bFpXUnBibWNnZEc4Z1ltVWdjR0Z5YzJWa1hHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JJWldGa1pYSnpJSEJoY25ObFpDQnBiblJ2SUdGdUlHOWlhbVZqZEZ4dUlDb3ZYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJSEJoY25ObFNHVmhaR1Z5Y3lob1pXRmtaWEp6S1NCN1hHNGdJSFpoY2lCd1lYSnpaV1FnUFNCN2ZUdGNiaUFnZG1GeUlHdGxlVHRjYmlBZ2RtRnlJSFpoYkR0Y2JpQWdkbUZ5SUdrN1hHNWNiaUFnYVdZZ0tDRm9aV0ZrWlhKektTQjdJSEpsZEhWeWJpQndZWEp6WldRN0lIMWNibHh1SUNCMWRHbHNjeTVtYjNKRllXTm9LR2hsWVdSbGNuTXVjM0JzYVhRb0oxeGNiaWNwTENCbWRXNWpkR2x2YmlCd1lYSnpaWElvYkdsdVpTa2dlMXh1SUNBZ0lHa2dQU0JzYVc1bExtbHVaR1Y0VDJZb0p6b25LVHRjYmlBZ0lDQnJaWGtnUFNCMWRHbHNjeTUwY21sdEtHeHBibVV1YzNWaWMzUnlLREFzSUdrcEtTNTBiMHh2ZDJWeVEyRnpaU2dwTzF4dUlDQWdJSFpoYkNBOUlIVjBhV3h6TG5SeWFXMG9iR2x1WlM1emRXSnpkSElvYVNBcklERXBLVHRjYmx4dUlDQWdJR2xtSUNoclpYa3BJSHRjYmlBZ0lDQWdJR2xtSUNod1lYSnpaV1JiYTJWNVhTQW1KaUJwWjI1dmNtVkVkWEJzYVdOaGRHVlBaaTVwYm1SbGVFOW1LR3RsZVNrZ1BqMGdNQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb2EyVjVJRDA5UFNBbmMyVjBMV052YjJ0cFpTY3BJSHRjYmlBZ0lDQWdJQ0FnY0dGeWMyVmtXMnRsZVYwZ1BTQW9jR0Z5YzJWa1cydGxlVjBnUHlCd1lYSnpaV1JiYTJWNVhTQTZJRnRkS1M1amIyNWpZWFFvVzNaaGJGMHBPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdjR0Z5YzJWa1cydGxlVjBnUFNCd1lYSnpaV1JiYTJWNVhTQS9JSEJoY25ObFpGdHJaWGxkSUNzZ0p5d2dKeUFySUhaaGJDQTZJSFpoYkR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMHBPMXh1WEc0Z0lISmxkSFZ5YmlCd1lYSnpaV1E3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzR2S2lwY2JpQXFJRk41Ym5SaFkzUnBZeUJ6ZFdkaGNpQm1iM0lnYVc1MmIydHBibWNnWVNCbWRXNWpkR2x2YmlCaGJtUWdaWGh3WVc1a2FXNW5JR0Z1SUdGeWNtRjVJR1p2Y2lCaGNtZDFiV1Z1ZEhNdVhHNGdLbHh1SUNvZ1EyOXRiVzl1SUhWelpTQmpZWE5sSUhkdmRXeGtJR0psSUhSdklIVnpaU0JnUm5WdVkzUnBiMjR1Y0hKdmRHOTBlWEJsTG1Gd2NHeDVZQzVjYmlBcVhHNGdLaUFnWUdCZ2FuTmNiaUFxSUNCbWRXNWpkR2x2YmlCbUtIZ3NJSGtzSUhvcElIdDlYRzRnS2lBZ2RtRnlJR0Z5WjNNZ1BTQmJNU3dnTWl3Z00xMDdYRzRnS2lBZ1ppNWhjSEJzZVNodWRXeHNMQ0JoY21kektUdGNiaUFxSUNCZ1lHQmNiaUFxWEc0Z0tpQlhhWFJvSUdCemNISmxZV1JnSUhSb2FYTWdaWGhoYlhCc1pTQmpZVzRnWW1VZ2NtVXRkM0pwZEhSbGJpNWNiaUFxWEc0Z0tpQWdZR0JnYW5OY2JpQXFJQ0J6Y0hKbFlXUW9ablZ1WTNScGIyNG9lQ3dnZVN3Z2Vpa2dlMzBwS0ZzeExDQXlMQ0F6WFNrN1hHNGdLaUFnWUdCZ1hHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1kyRnNiR0poWTJ0Y2JpQXFJRUJ5WlhSMWNtNXpJSHRHZFc1amRHbHZibjFjYmlBcUwxeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQnpjSEpsWVdRb1kyRnNiR0poWTJzcElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhBb1lYSnlLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHTmhiR3hpWVdOckxtRndjR3g1S0c1MWJHd3NJR0Z5Y2lrN1hHNGdJSDA3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ1ltbHVaQ0E5SUhKbGNYVnBjbVVvSnk0dmFHVnNjR1Z5Y3k5aWFXNWtKeWs3WEc1Y2JpOHFaMnh2WW1Gc0lIUnZVM1J5YVc1bk9uUnlkV1VxTDF4dVhHNHZMeUIxZEdsc2N5QnBjeUJoSUd4cFluSmhjbmtnYjJZZ1oyVnVaWEpwWXlCb1pXeHdaWElnWm5WdVkzUnBiMjV6SUc1dmJpMXpjR1ZqYVdacFl5QjBieUJoZUdsdmMxeHVYRzUyWVhJZ2RHOVRkSEpwYm1jZ1BTQlBZbXBsWTNRdWNISnZkRzkwZVhCbExuUnZVM1J5YVc1bk8xeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRnVJRUZ5Y21GNVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVc0Z1FYSnlZWGtzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMEZ5Y21GNUtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RHOVRkSEpwYm1jdVkyRnNiQ2gyWVd3cElEMDlQU0FuVzI5aWFtVmpkQ0JCY25KaGVWMG5PMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUhWdVpHVm1hVzVsWkZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFJvWlNCMllXeDFaU0JwY3lCMWJtUmxabWx1WldRc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzFWdVpHVm1hVzVsWkNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUIyWVd3Z1BUMDlJQ2QxYm1SbFptbHVaV1FuTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdRblZtWm1WeVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCQ2RXWm1aWElzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMEoxWm1abGNpaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIWmhiQ0FoUFQwZ2JuVnNiQ0FtSmlBaGFYTlZibVJsWm1sdVpXUW9kbUZzS1NBbUppQjJZV3d1WTI5dWMzUnlkV04wYjNJZ0lUMDlJRzUxYkd3Z0ppWWdJV2x6Vlc1a1pXWnBibVZrS0haaGJDNWpiMjV6ZEhKMVkzUnZjaWxjYmlBZ0lDQW1KaUIwZVhCbGIyWWdkbUZzTG1OdmJuTjBjblZqZEc5eUxtbHpRblZtWm1WeUlEMDlQU0FuWm5WdVkzUnBiMjRuSUNZbUlIWmhiQzVqYjI1emRISjFZM1J2Y2k1cGMwSjFabVpsY2loMllXd3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdGdUlFRnljbUY1UW5WbVptVnlYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lXNGdRWEp5WVhsQ2RXWm1aWElzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMEZ5Y21GNVFuVm1abVZ5S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEc5VGRISnBibWN1WTJGc2JDaDJZV3dwSUQwOVBTQW5XMjlpYW1WamRDQkJjbkpoZVVKMVptWmxjbDBuTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdSbTl5YlVSaGRHRmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2RtRnNJRlJvWlNCMllXeDFaU0IwYnlCMFpYTjBYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCMllXeDFaU0JwY3lCaGJpQkdiM0p0UkdGMFlTd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselJtOXliVVJoZEdFb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlBb2RIbHdaVzltSUVadmNtMUVZWFJoSUNFOVBTQW5kVzVrWldacGJtVmtKeWtnSmlZZ0tIWmhiQ0JwYm5OMFlXNWpaVzltSUVadmNtMUVZWFJoS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJSFpwWlhjZ2IyNGdZVzRnUVhKeVlYbENkV1ptWlhKY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoSUhacFpYY2diMjRnWVc0Z1FYSnlZWGxDZFdabVpYSXNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMwRnljbUY1UW5WbVptVnlWbWxsZHloMllXd3BJSHRjYmlBZ2RtRnlJSEpsYzNWc2REdGNiaUFnYVdZZ0tDaDBlWEJsYjJZZ1FYSnlZWGxDZFdabVpYSWdJVDA5SUNkMWJtUmxabWx1WldRbktTQW1KaUFvUVhKeVlYbENkV1ptWlhJdWFYTldhV1YzS1NrZ2UxeHVJQ0FnSUhKbGMzVnNkQ0E5SUVGeWNtRjVRblZtWm1WeUxtbHpWbWxsZHloMllXd3BPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsYzNWc2RDQTlJQ2gyWVd3cElDWW1JQ2gyWVd3dVluVm1abVZ5S1NBbUppQW9kbUZzTG1KMVptWmxjaUJwYm5OMFlXNWpaVzltSUVGeWNtRjVRblZtWm1WeUtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdVM1J5YVc1blhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCVGRISnBibWNzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMU4wY21sdVp5aDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUjVjR1Z2WmlCMllXd2dQVDA5SUNkemRISnBibWNuTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdUblZ0WW1WeVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCT2RXMWlaWElzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMDUxYldKbGNpaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUjVjR1Z2WmlCMllXd2dQVDA5SUNkdWRXMWlaWEluTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRnVJRTlpYW1WamRGeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdGdUlFOWlhbVZqZEN3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6VDJKcVpXTjBLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkbUZzSUNFOVBTQnVkV3hzSUNZbUlIUjVjR1Z2WmlCMllXd2dQVDA5SUNkdlltcGxZM1FuTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdjR3hoYVc0Z1QySnFaV04wWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJpQjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJSEJzWVdsdUlFOWlhbVZqZEN3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6VUd4aGFXNVBZbXBsWTNRb2RtRnNLU0I3WEc0Z0lHbG1JQ2gwYjFOMGNtbHVaeTVqWVd4c0tIWmhiQ2tnSVQwOUlDZGJiMkpxWldOMElFOWlhbVZqZEYwbktTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNWNiaUFnZG1GeUlIQnliM1J2ZEhsd1pTQTlJRTlpYW1WamRDNW5aWFJRY205MGIzUjVjR1ZQWmloMllXd3BPMXh1SUNCeVpYUjFjbTRnY0hKdmRHOTBlWEJsSUQwOVBTQnVkV3hzSUh4OElIQnliM1J2ZEhsd1pTQTlQVDBnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFUmhkR1ZjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRVJoZEdVc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBSaGRHVW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBiMU4wY21sdVp5NWpZV3hzS0haaGJDa2dQVDA5SUNkYmIySnFaV04wSUVSaGRHVmRKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFWnBiR1ZjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRVpwYkdVc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBacGJHVW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBiMU4wY21sdVp5NWpZV3hzS0haaGJDa2dQVDA5SUNkYmIySnFaV04wSUVacGJHVmRKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFSnNiMkpjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRUpzYjJJc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBKc2IySW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBiMU4wY21sdVp5NWpZV3hzS0haaGJDa2dQVDA5SUNkYmIySnFaV04wSUVKc2IySmRKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFWjFibU4wYVc5dVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVNCR2RXNWpkR2x2Yml3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6Um5WdVkzUnBiMjRvZG1Gc0tTQjdYRzRnSUhKbGRIVnliaUIwYjFOMGNtbHVaeTVqWVd4c0tIWmhiQ2tnUFQwOUlDZGJiMkpxWldOMElFWjFibU4wYVc5dVhTYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCVGRISmxZVzFjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRk4wY21WaGJTd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselUzUnlaV0Z0S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnYVhOUFltcGxZM1FvZG1Gc0tTQW1KaUJwYzBaMWJtTjBhVzl1S0haaGJDNXdhWEJsS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRlZTVEZObFlYSmphRkJoY21GdGN5QnZZbXBsWTNSY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoSUZWU1RGTmxZWEpqYUZCaGNtRnRjeUJ2WW1wbFkzUXNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMxVlNURk5sWVhKamFGQmhjbUZ0Y3loMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJWVWt4VFpXRnlZMmhRWVhKaGJYTWdJVDA5SUNkMWJtUmxabWx1WldRbklDWW1JSFpoYkNCcGJuTjBZVzVqWlc5bUlGVlNURk5sWVhKamFGQmhjbUZ0Y3p0Y2JuMWNibHh1THlvcVhHNGdLaUJVY21sdElHVjRZMlZ6Y3lCM2FHbDBaWE53WVdObElHOW1aaUIwYUdVZ1ltVm5hVzV1YVc1bklHRnVaQ0JsYm1RZ2IyWWdZU0J6ZEhKcGJtZGNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UxTjBjbWx1WjMwZ2MzUnlJRlJvWlNCVGRISnBibWNnZEc4Z2RISnBiVnh1SUNvZ1FISmxkSFZ5Ym5NZ2UxTjBjbWx1WjMwZ1ZHaGxJRk4wY21sdVp5Qm1jbVZsWkNCdlppQmxlR05sYzNNZ2QyaHBkR1Z6Y0dGalpWeHVJQ292WEc1bWRXNWpkR2x2YmlCMGNtbHRLSE4wY2lrZ2UxeHVJQ0J5WlhSMWNtNGdjM1J5TG5KbGNHeGhZMlVvTDE1Y1hITXFMeXdnSnljcExuSmxjR3hoWTJVb0wxeGNjeW9rTHl3Z0p5Y3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUIzWlNkeVpTQnlkVzV1YVc1bklHbHVJR0VnYzNSaGJtUmhjbVFnWW5KdmQzTmxjaUJsYm5acGNtOXViV1Z1ZEZ4dUlDcGNiaUFxSUZSb2FYTWdZV3hzYjNkeklHRjRhVzl6SUhSdklISjFiaUJwYmlCaElIZGxZaUIzYjNKclpYSXNJR0Z1WkNCeVpXRmpkQzF1WVhScGRtVXVYRzRnS2lCQ2IzUm9JR1Z1ZG1seWIyNXRaVzUwY3lCemRYQndiM0owSUZoTlRFaDBkSEJTWlhGMVpYTjBMQ0JpZFhRZ2JtOTBJR1oxYkd4NUlITjBZVzVrWVhKa0lHZHNiMkpoYkhNdVhHNGdLbHh1SUNvZ2QyVmlJSGR2Y210bGNuTTZYRzRnS2lBZ2RIbHdaVzltSUhkcGJtUnZkeUF0UGlCMWJtUmxabWx1WldSY2JpQXFJQ0IwZVhCbGIyWWdaRzlqZFcxbGJuUWdMVDRnZFc1a1pXWnBibVZrWEc0Z0tseHVJQ29nY21WaFkzUXRibUYwYVhabE9seHVJQ29nSUc1aGRtbG5ZWFJ2Y2k1d2NtOWtkV04wSUMwK0lDZFNaV0ZqZEU1aGRHbDJaU2RjYmlBcUlHNWhkR2wyWlhOamNtbHdkRnh1SUNvZ0lHNWhkbWxuWVhSdmNpNXdjbTlrZFdOMElDMCtJQ2RPWVhScGRtVlRZM0pwY0hRbklHOXlJQ2RPVXlkY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2JtRjJhV2RoZEc5eUlDRTlQU0FuZFc1a1pXWnBibVZrSnlBbUppQW9ibUYyYVdkaGRHOXlMbkJ5YjJSMVkzUWdQVDA5SUNkU1pXRmpkRTVoZEdsMlpTY2dmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J1WVhacFoyRjBiM0l1Y0hKdlpIVmpkQ0E5UFQwZ0owNWhkR2wyWlZOamNtbHdkQ2NnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdVlYWnBaMkYwYjNJdWNISnZaSFZqZENBOVBUMGdKMDVUSnlrcElIdGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUgxY2JpQWdjbVYwZFhKdUlDaGNiaUFnSUNCMGVYQmxiMllnZDJsdVpHOTNJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KbHh1SUNBZ0lIUjVjR1Z2WmlCa2IyTjFiV1Z1ZENBaFBUMGdKM1Z1WkdWbWFXNWxaQ2RjYmlBZ0tUdGNibjFjYmx4dUx5b3FYRzRnS2lCSmRHVnlZWFJsSUc5MlpYSWdZVzRnUVhKeVlYa2diM0lnWVc0Z1QySnFaV04wSUdsdWRtOXJhVzVuSUdFZ1puVnVZM1JwYjI0Z1ptOXlJR1ZoWTJnZ2FYUmxiUzVjYmlBcVhHNGdLaUJKWmlCZ2IySnFZQ0JwY3lCaGJpQkJjbkpoZVNCallXeHNZbUZqYXlCM2FXeHNJR0psSUdOaGJHeGxaQ0J3WVhOemFXNW5YRzRnS2lCMGFHVWdkbUZzZFdVc0lHbHVaR1Y0TENCaGJtUWdZMjl0Y0d4bGRHVWdZWEp5WVhrZ1ptOXlJR1ZoWTJnZ2FYUmxiUzVjYmlBcVhHNGdLaUJKWmlBbmIySnFKeUJwY3lCaGJpQlBZbXBsWTNRZ1kyRnNiR0poWTJzZ2QybHNiQ0JpWlNCallXeHNaV1FnY0dGemMybHVaMXh1SUNvZ2RHaGxJSFpoYkhWbExDQnJaWGtzSUdGdVpDQmpiMjF3YkdWMFpTQnZZbXBsWTNRZ1ptOXlJR1ZoWTJnZ2NISnZjR1Z5ZEhrdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I4UVhKeVlYbDlJRzlpYWlCVWFHVWdiMkpxWldOMElIUnZJR2wwWlhKaGRHVmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdadUlGUm9aU0JqWVd4c1ltRmpheUIwYnlCcGJuWnZhMlVnWm05eUlHVmhZMmdnYVhSbGJWeHVJQ292WEc1bWRXNWpkR2x2YmlCbWIzSkZZV05vS0c5aWFpd2dabTRwSUh0Y2JpQWdMeThnUkc5dUozUWdZbTkwYUdWeUlHbG1JRzV2SUhaaGJIVmxJSEJ5YjNacFpHVmtYRzRnSUdsbUlDaHZZbW9nUFQwOUlHNTFiR3dnZkh3Z2RIbHdaVzltSUc5aWFpQTlQVDBnSjNWdVpHVm1hVzVsWkNjcElIdGNiaUFnSUNCeVpYUjFjbTQ3WEc0Z0lIMWNibHh1SUNBdkx5QkdiM0pqWlNCaGJpQmhjbkpoZVNCcFppQnViM1FnWVd4eVpXRmtlU0J6YjIxbGRHaHBibWNnYVhSbGNtRmliR1ZjYmlBZ2FXWWdLSFI1Y0dWdlppQnZZbW9nSVQwOUlDZHZZbXBsWTNRbktTQjdYRzRnSUNBZ0x5cGxjMnhwYm5RZ2JtOHRjR0Z5WVcwdGNtVmhjM05wWjI0Nk1Db3ZYRzRnSUNBZ2IySnFJRDBnVzI5aWFsMDdYRzRnSUgxY2JseHVJQ0JwWmlBb2FYTkJjbkpoZVNodlltb3BLU0I3WEc0Z0lDQWdMeThnU1hSbGNtRjBaU0J2ZG1WeUlHRnljbUY1SUhaaGJIVmxjMXh1SUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCc0lEMGdiMkpxTG14bGJtZDBhRHNnYVNBOElHdzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ1ptNHVZMkZzYkNodWRXeHNMQ0J2WW1wYmFWMHNJR2tzSUc5aWFpazdYRzRnSUNBZ2ZWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDOHZJRWwwWlhKaGRHVWdiM1psY2lCdlltcGxZM1FnYTJWNWMxeHVJQ0FnSUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJ2WW1vcElIdGNiaUFnSUNBZ0lHbG1JQ2hQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcUxDQnJaWGtwS1NCN1hHNGdJQ0FnSUNBZ0lHWnVMbU5oYkd3b2JuVnNiQ3dnYjJKcVcydGxlVjBzSUd0bGVTd2diMkpxS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMWNibjFjYmx4dUx5b3FYRzRnS2lCQlkyTmxjSFJ6SUhaaGNtRnlaM01nWlhod1pXTjBhVzVuSUdWaFkyZ2dZWEpuZFcxbGJuUWdkRzhnWW1VZ1lXNGdiMkpxWldOMExDQjBhR1Z1WEc0Z0tpQnBiVzExZEdGaWJIa2diV1Z5WjJWeklIUm9aU0J3Y205d1pYSjBhV1Z6SUc5bUlHVmhZMmdnYjJKcVpXTjBJR0Z1WkNCeVpYUjFjbTV6SUhKbGMzVnNkQzVjYmlBcVhHNGdLaUJYYUdWdUlHMTFiSFJwY0d4bElHOWlhbVZqZEhNZ1kyOXVkR0ZwYmlCMGFHVWdjMkZ0WlNCclpYa2dkR2hsSUd4aGRHVnlJRzlpYW1WamRDQnBibHh1SUNvZ2RHaGxJR0Z5WjNWdFpXNTBjeUJzYVhOMElIZHBiR3dnZEdGclpTQndjbVZqWldSbGJtTmxMbHh1SUNwY2JpQXFJRVY0WVcxd2JHVTZYRzRnS2x4dUlDb2dZR0JnYW5OY2JpQXFJSFpoY2lCeVpYTjFiSFFnUFNCdFpYSm5aU2g3Wm05dk9pQXhNak45TENCN1ptOXZPaUEwTlRaOUtUdGNiaUFxSUdOdmJuTnZiR1V1Ykc5bktISmxjM1ZzZEM1bWIyOHBPeUF2THlCdmRYUndkWFJ6SURRMU5seHVJQ29nWUdCZ1hHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFqRWdUMkpxWldOMElIUnZJRzFsY21kbFhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JTWlhOMWJIUWdiMllnWVd4c0lHMWxjbWRsSUhCeWIzQmxjblJwWlhOY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYldWeVoyVW9MeW9nYjJKcU1Td2diMkpxTWl3Z2IySnFNeXdnTGk0dUlDb3ZLU0I3WEc0Z0lIWmhjaUJ5WlhOMWJIUWdQU0I3ZlR0Y2JpQWdablZ1WTNScGIyNGdZWE56YVdkdVZtRnNkV1VvZG1Gc0xDQnJaWGtwSUh0Y2JpQWdJQ0JwWmlBb2FYTlFiR0ZwYms5aWFtVmpkQ2h5WlhOMWJIUmJhMlY1WFNrZ0ppWWdhWE5RYkdGcGJrOWlhbVZqZENoMllXd3BLU0I3WEc0Z0lDQWdJQ0J5WlhOMWJIUmJhMlY1WFNBOUlHMWxjbWRsS0hKbGMzVnNkRnRyWlhsZExDQjJZV3dwTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvYVhOUWJHRnBiazlpYW1WamRDaDJZV3dwS1NCN1hHNGdJQ0FnSUNCeVpYTjFiSFJiYTJWNVhTQTlJRzFsY21kbEtIdDlMQ0IyWVd3cE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2FYTkJjbkpoZVNoMllXd3BLU0I3WEc0Z0lDQWdJQ0J5WlhOMWJIUmJhMlY1WFNBOUlIWmhiQzV6YkdsalpTZ3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCeVpYTjFiSFJiYTJWNVhTQTlJSFpoYkR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkNBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnN0lHa2dQQ0JzT3lCcEt5c3BJSHRjYmlBZ0lDQm1iM0pGWVdOb0tHRnlaM1Z0Wlc1MGMxdHBYU3dnWVhOemFXZHVWbUZzZFdVcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc1OVhHNWNiaThxS2x4dUlDb2dSWGgwWlc1a2N5QnZZbXBsWTNRZ1lTQmllU0J0ZFhSaFlteDVJR0ZrWkdsdVp5QjBieUJwZENCMGFHVWdjSEp2Y0dWeWRHbGxjeUJ2WmlCdlltcGxZM1FnWWk1Y2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWVNCVWFHVWdiMkpxWldOMElIUnZJR0psSUdWNGRHVnVaR1ZrWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1lpQlVhR1VnYjJKcVpXTjBJSFJ2SUdOdmNIa2djSEp2Y0dWeWRHbGxjeUJtY205dFhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkR2hwYzBGeVp5QlVhR1VnYjJKcVpXTjBJSFJ2SUdKcGJtUWdablZ1WTNScGIyNGdkRzljYmlBcUlFQnlaWFIxY200Z2UwOWlhbVZqZEgwZ1ZHaGxJSEpsYzNWc2RHbHVaeUIyWVd4MVpTQnZaaUJ2WW1wbFkzUWdZVnh1SUNvdlhHNW1kVzVqZEdsdmJpQmxlSFJsYm1Rb1lTd2dZaXdnZEdocGMwRnlaeWtnZTF4dUlDQm1iM0pGWVdOb0tHSXNJR1oxYm1OMGFXOXVJR0Z6YzJsbmJsWmhiSFZsS0haaGJDd2dhMlY1S1NCN1hHNGdJQ0FnYVdZZ0tIUm9hWE5CY21jZ0ppWWdkSGx3Wlc5bUlIWmhiQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdZVnRyWlhsZElEMGdZbWx1WkNoMllXd3NJSFJvYVhOQmNtY3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCaFcydGxlVjBnUFNCMllXdzdYRzRnSUNBZ2ZWeHVJQ0I5S1R0Y2JpQWdjbVYwZFhKdUlHRTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1VtVnRiM1psSUdKNWRHVWdiM0prWlhJZ2JXRnlhMlZ5TGlCVWFHbHpJR05oZEdOb1pYTWdSVVlnUWtJZ1FrWWdLSFJvWlNCVlZFWXRPQ0JDVDAwcFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUdOdmJuUmxiblFnZDJsMGFDQkNUMDFjYmlBcUlFQnlaWFIxY200Z2UzTjBjbWx1WjMwZ1kyOXVkR1Z1ZENCMllXeDFaU0IzYVhSb2IzVjBJRUpQVFZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJ6ZEhKcGNFSlBUU2hqYjI1MFpXNTBLU0I3WEc0Z0lHbG1JQ2hqYjI1MFpXNTBMbU5vWVhKRGIyUmxRWFFvTUNrZ1BUMDlJREI0UmtWR1Jpa2dlMXh1SUNBZ0lHTnZiblJsYm5RZ1BTQmpiMjUwWlc1MExuTnNhV05sS0RFcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCamIyNTBaVzUwTzF4dWZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHRjYmlBZ2FYTkJjbkpoZVRvZ2FYTkJjbkpoZVN4Y2JpQWdhWE5CY25KaGVVSjFabVpsY2pvZ2FYTkJjbkpoZVVKMVptWmxjaXhjYmlBZ2FYTkNkV1ptWlhJNklHbHpRblZtWm1WeUxGeHVJQ0JwYzBadmNtMUVZWFJoT2lCcGMwWnZjbTFFWVhSaExGeHVJQ0JwYzBGeWNtRjVRblZtWm1WeVZtbGxkem9nYVhOQmNuSmhlVUoxWm1abGNsWnBaWGNzWEc0Z0lHbHpVM1J5YVc1bk9pQnBjMU4wY21sdVp5eGNiaUFnYVhOT2RXMWlaWEk2SUdselRuVnRZbVZ5TEZ4dUlDQnBjMDlpYW1WamREb2dhWE5QWW1wbFkzUXNYRzRnSUdselVHeGhhVzVQWW1wbFkzUTZJR2x6VUd4aGFXNVBZbXBsWTNRc1hHNGdJR2x6Vlc1a1pXWnBibVZrT2lCcGMxVnVaR1ZtYVc1bFpDeGNiaUFnYVhORVlYUmxPaUJwYzBSaGRHVXNYRzRnSUdselJtbHNaVG9nYVhOR2FXeGxMRnh1SUNCcGMwSnNiMkk2SUdselFteHZZaXhjYmlBZ2FYTkdkVzVqZEdsdmJqb2dhWE5HZFc1amRHbHZiaXhjYmlBZ2FYTlRkSEpsWVcwNklHbHpVM1J5WldGdExGeHVJQ0JwYzFWU1RGTmxZWEpqYUZCaGNtRnRjem9nYVhOVlVreFRaV0Z5WTJoUVlYSmhiWE1zWEc0Z0lHbHpVM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJPaUJwYzFOMFlXNWtZWEprUW5KdmQzTmxja1Z1ZGl4Y2JpQWdabTl5UldGamFEb2dabTl5UldGamFDeGNiaUFnYldWeVoyVTZJRzFsY21kbExGeHVJQ0JsZUhSbGJtUTZJR1Y0ZEdWdVpDeGNiaUFnZEhKcGJUb2dkSEpwYlN4Y2JpQWdjM1J5YVhCQ1QwMDZJSE4wY21sd1FrOU5YRzU5TzF4dUlpd2lMeThnYzJocGJTQm1iM0lnZFhOcGJtY2djSEp2WTJWemN5QnBiaUJpY205M2MyVnlYRzUyWVhJZ2NISnZZMlZ6Y3lBOUlHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2UzMDdYRzVjYmk4dklHTmhZMmhsWkNCbWNtOXRJSGRvWVhSbGRtVnlJR2RzYjJKaGJDQnBjeUJ3Y21WelpXNTBJSE52SUhSb1lYUWdkR1Z6ZENCeWRXNXVaWEp6SUhSb1lYUWdjM1IxWWlCcGRGeHVMeThnWkc5dUozUWdZbkpsWVdzZ2RHaHBibWR6TGlBZ1FuVjBJSGRsSUc1bFpXUWdkRzhnZDNKaGNDQnBkQ0JwYmlCaElIUnllU0JqWVhSamFDQnBiaUJqWVhObElHbDBJR2x6WEc0dkx5QjNjbUZ3Y0dWa0lHbHVJSE4wY21samRDQnRiMlJsSUdOdlpHVWdkMmhwWTJnZ1pHOWxjMjRuZENCa1pXWnBibVVnWVc1NUlHZHNiMkpoYkhNdUlDQkpkQ2R6SUdsdWMybGtaU0JoWEc0dkx5Qm1kVzVqZEdsdmJpQmlaV05oZFhObElIUnllUzlqWVhSamFHVnpJR1JsYjNCMGFXMXBlbVVnYVc0Z1kyVnlkR0ZwYmlCbGJtZHBibVZ6TGx4dVhHNTJZWElnWTJGamFHVmtVMlYwVkdsdFpXOTFkRHRjYm5aaGNpQmpZV05vWldSRGJHVmhjbFJwYldWdmRYUTdYRzVjYm1aMWJtTjBhVzl1SUdSbFptRjFiSFJUWlhSVWFXMXZkWFFvS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R6WlhSVWFXMWxiM1YwSUdoaGN5QnViM1FnWW1WbGJpQmtaV1pwYm1Wa0p5azdYRzU5WEc1bWRXNWpkR2x2YmlCa1pXWmhkV3gwUTJ4bFlYSlVhVzFsYjNWMElDZ3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyTnNaV0Z5VkdsdFpXOTFkQ0JvWVhNZ2JtOTBJR0psWlc0Z1pHVm1hVzVsWkNjcE8xeHVmVnh1S0daMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUhObGRGUnBiV1Z2ZFhRZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oWTJobFpGTmxkRlJwYldWdmRYUWdQU0J6WlhSVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlJR1JsWm1GMWJIUlRaWFJVYVcxdmRYUTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0FnSUdOaFkyaGxaRk5sZEZScGJXVnZkWFFnUFNCa1pXWmhkV3gwVTJWMFZHbHRiM1YwTzF4dUlDQWdJSDFjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHTnNaV0Z5VkdsdFpXOTFkQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMElEMGdZMnhsWVhKVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDBnWkdWbVlYVnNkRU5zWldGeVZHbHRaVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDBnWkdWbVlYVnNkRU5zWldGeVZHbHRaVzkxZER0Y2JpQWdJQ0I5WEc1OUlDZ3BLVnh1Wm5WdVkzUnBiMjRnY25WdVZHbHRaVzkxZENobWRXNHBJSHRjYmlBZ0lDQnBaaUFvWTJGamFHVmtVMlYwVkdsdFpXOTFkQ0E5UFQwZ2MyVjBWR2x0Wlc5MWRDa2dlMXh1SUNBZ0lDQWdJQ0F2TDI1dmNtMWhiQ0JsYm5acGNtOXRaVzUwY3lCcGJpQnpZVzVsSUhOcGRIVmhkR2x2Ym5OY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhObGRGUnBiV1Z2ZFhRb1puVnVMQ0F3S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdMeThnYVdZZ2MyVjBWR2x0Wlc5MWRDQjNZWE51SjNRZ1lYWmhhV3hoWW14bElHSjFkQ0IzWVhNZ2JHRjBkR1Z5SUdSbFptbHVaV1JjYmlBZ0lDQnBaaUFvS0dOaFkyaGxaRk5sZEZScGJXVnZkWFFnUFQwOUlHUmxabUYxYkhSVFpYUlVhVzF2ZFhRZ2ZId2dJV05oWTJobFpGTmxkRlJwYldWdmRYUXBJQ1ltSUhObGRGUnBiV1Z2ZFhRcElIdGNiaUFnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlJSE5sZEZScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ6WlhSVWFXMWxiM1YwS0daMWJpd2dNQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUM4dklIZG9aVzRnZDJobGJpQnpiMjFsWW05a2VTQm9ZWE1nYzJOeVpYZGxaQ0IzYVhSb0lITmxkRlJwYldWdmRYUWdZblYwSUc1dklFa3VSUzRnYldGa1pHNWxjM05jYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpGTmxkRlJwYldWdmRYUW9ablZ1TENBd0tUdGNiaUFnSUNCOUlHTmhkR05vS0dVcGUxeHVJQ0FnSUNBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVjJobGJpQjNaU0JoY21VZ2FXNGdTUzVGTGlCaWRYUWdkR2hsSUhOamNtbHdkQ0JvWVhNZ1ltVmxiaUJsZG1Gc1pXUWdjMjhnU1M1RkxpQmtiMlZ6YmlkMElIUnlkWE4wSUhSb1pTQm5iRzlpWVd3Z2IySnFaV04wSUhkb1pXNGdZMkZzYkdWa0lHNXZjbTFoYkd4NVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDNWpZV3hzS0c1MWJHd3NJR1oxYml3Z01DazdYRzRnSUNBZ0lDQWdJSDBnWTJGMFkyZ29aU2w3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ6WVcxbElHRnpJR0ZpYjNabElHSjFkQ0IzYUdWdUlHbDBKM01nWVNCMlpYSnphVzl1SUc5bUlFa3VSUzRnZEdoaGRDQnRkWE4wSUdoaGRtVWdkR2hsSUdkc2IySmhiQ0J2WW1wbFkzUWdabTl5SUNkMGFHbHpKeXdnYUc5d1puVnNiSGtnYjNWeUlHTnZiblJsZUhRZ1kyOXljbVZqZENCdmRHaGxjbmRwYzJVZ2FYUWdkMmxzYkNCMGFISnZkeUJoSUdkc2IySmhiQ0JsY25KdmNseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpGTmxkRlJwYldWdmRYUXVZMkZzYkNoMGFHbHpMQ0JtZFc0c0lEQXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc1Y2JuMWNibVoxYm1OMGFXOXVJSEoxYmtOc1pXRnlWR2x0Wlc5MWRDaHRZWEpyWlhJcElIdGNiaUFnSUNCcFppQW9ZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDA5UFNCamJHVmhjbFJwYldWdmRYUXBJSHRjYmlBZ0lDQWdJQ0FnTHk5dWIzSnRZV3dnWlc1MmFYSnZiV1Z1ZEhNZ2FXNGdjMkZ1WlNCemFYUjFZWFJwYjI1elhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCamJHVmhjbFJwYldWdmRYUW9iV0Z5YTJWeUtUdGNiaUFnSUNCOVhHNGdJQ0FnTHk4Z2FXWWdZMnhsWVhKVWFXMWxiM1YwSUhkaGMyNG5kQ0JoZG1GcGJHRmliR1VnWW5WMElIZGhjeUJzWVhSMFpYSWdaR1ZtYVc1bFpGeHVJQ0FnSUdsbUlDZ29ZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDA5UFNCa1pXWmhkV3gwUTJ4bFlYSlVhVzFsYjNWMElIeDhJQ0ZqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFFwSUNZbUlHTnNaV0Z5VkdsdFpXOTFkQ2tnZTF4dUlDQWdJQ0FnSUNCallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BTQmpiR1ZoY2xScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqYkdWaGNsUnBiV1Z2ZFhRb2JXRnlhMlZ5S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0x5OGdkMmhsYmlCM2FHVnVJSE52YldWaWIyUjVJR2hoY3lCelkzSmxkMlZrSUhkcGRHZ2djMlYwVkdsdFpXOTFkQ0JpZFhRZ2JtOGdTUzVGTGlCdFlXUmtibVZ6YzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwS0cxaGNtdGxjaWs3WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2w3WEc0Z0lDQWdJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QlhhR1Z1SUhkbElHRnlaU0JwYmlCSkxrVXVJR0oxZENCMGFHVWdjMk55YVhCMElHaGhjeUJpWldWdUlHVjJZV3hsWkNCemJ5QkpMa1V1SUdSdlpYTnVKM1FnSUhSeWRYTjBJSFJvWlNCbmJHOWlZV3dnYjJKcVpXTjBJSGRvWlc0Z1kyRnNiR1ZrSUc1dmNtMWhiR3g1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMExtTmhiR3dvYm5Wc2JDd2diV0Z5YTJWeUtUdGNiaUFnSUNBZ0lDQWdmU0JqWVhSamFDQW9aU2w3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ6WVcxbElHRnpJR0ZpYjNabElHSjFkQ0IzYUdWdUlHbDBKM01nWVNCMlpYSnphVzl1SUc5bUlFa3VSUzRnZEdoaGRDQnRkWE4wSUdoaGRtVWdkR2hsSUdkc2IySmhiQ0J2WW1wbFkzUWdabTl5SUNkMGFHbHpKeXdnYUc5d1puVnNiSGtnYjNWeUlHTnZiblJsZUhRZ1kyOXljbVZqZENCdmRHaGxjbmRwYzJVZ2FYUWdkMmxzYkNCMGFISnZkeUJoSUdkc2IySmhiQ0JsY25KdmNpNWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklGTnZiV1VnZG1WeWMybHZibk1nYjJZZ1NTNUZMaUJvWVhabElHUnBabVpsY21WdWRDQnlkV3hsY3lCbWIzSWdZMnhsWVhKVWFXMWxiM1YwSUhaeklITmxkRlJwYldWdmRYUmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFF1WTJGc2JDaDBhR2x6TENCdFlYSnJaWElwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNWNibHh1ZlZ4dWRtRnlJSEYxWlhWbElEMGdXMTA3WEc1MllYSWdaSEpoYVc1cGJtY2dQU0JtWVd4elpUdGNiblpoY2lCamRYSnlaVzUwVVhWbGRXVTdYRzUyWVhJZ2NYVmxkV1ZKYm1SbGVDQTlJQzB4TzF4dVhHNW1kVzVqZEdsdmJpQmpiR1ZoYmxWd1RtVjRkRlJwWTJzb0tTQjdYRzRnSUNBZ2FXWWdLQ0ZrY21GcGJtbHVaeUI4ZkNBaFkzVnljbVZ1ZEZGMVpYVmxLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ1pISmhhVzVwYm1jZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0JwWmlBb1kzVnljbVZ1ZEZGMVpYVmxMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0J4ZFdWMVpTQTlJR04xY25KbGJuUlJkV1YxWlM1amIyNWpZWFFvY1hWbGRXVXBPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lIRjFaWFZsU1c1a1pYZ2dQU0F0TVR0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hGMVpYVmxMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0JrY21GcGJsRjFaWFZsS0NrN1hHNGdJQ0FnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJrY21GcGJsRjFaWFZsS0NrZ2UxeHVJQ0FnSUdsbUlDaGtjbUZwYm1sdVp5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQjBhVzFsYjNWMElEMGdjblZ1VkdsdFpXOTFkQ2hqYkdWaGJsVndUbVY0ZEZScFkyc3BPMXh1SUNBZ0lHUnlZV2x1YVc1bklEMGdkSEoxWlR0Y2JseHVJQ0FnSUhaaGNpQnNaVzRnUFNCeGRXVjFaUzVzWlc1bmRHZzdYRzRnSUNBZ2QyaHBiR1VvYkdWdUtTQjdYRzRnSUNBZ0lDQWdJR04xY25KbGJuUlJkV1YxWlNBOUlIRjFaWFZsTzF4dUlDQWdJQ0FnSUNCeGRXVjFaU0E5SUZ0ZE8xeHVJQ0FnSUNBZ0lDQjNhR2xzWlNBb0t5dHhkV1YxWlVsdVpHVjRJRHdnYkdWdUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRGRjFaWFZsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kzVnljbVZ1ZEZGMVpYVmxXM0YxWlhWbFNXNWtaWGhkTG5KMWJpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEYxWlhWbFNXNWtaWGdnUFNBdE1UdGNiaUFnSUNBZ0lDQWdiR1Z1SUQwZ2NYVmxkV1V1YkdWdVozUm9PMXh1SUNBZ0lIMWNiaUFnSUNCamRYSnlaVzUwVVhWbGRXVWdQU0J1ZFd4c08xeHVJQ0FnSUdSeVlXbHVhVzVuSUQwZ1ptRnNjMlU3WEc0Z0lDQWdjblZ1UTJ4bFlYSlVhVzFsYjNWMEtIUnBiV1Z2ZFhRcE8xeHVmVnh1WEc1d2NtOWpaWE56TG01bGVIUlVhV05ySUQwZ1puVnVZM1JwYjI0Z0tHWjFiaWtnZTF4dUlDQWdJSFpoY2lCaGNtZHpJRDBnYm1WM0lFRnljbUY1S0dGeVozVnRaVzUwY3k1c1pXNW5kR2dnTFNBeEtUdGNiaUFnSUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJREVwSUh0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREU3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR0Z5WjNOYmFTQXRJREZkSUQwZ1lYSm5kVzFsYm5SelcybGRPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNBZ0lIRjFaWFZsTG5CMWMyZ29ibVYzSUVsMFpXMG9ablZ1TENCaGNtZHpLU2s3WEc0Z0lDQWdhV1lnS0hGMVpYVmxMbXhsYm1kMGFDQTlQVDBnTVNBbUppQWhaSEpoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJQ0FnY25WdVZHbHRaVzkxZENoa2NtRnBibEYxWlhWbEtUdGNiaUFnSUNCOVhHNTlPMXh1WEc0dkx5QjJPQ0JzYVd0bGN5QndjbVZrYVdOMGFXSnNaU0J2WW1wbFkzUnpYRzVtZFc1amRHbHZiaUJKZEdWdEtHWjFiaXdnWVhKeVlYa3BJSHRjYmlBZ0lDQjBhR2x6TG1aMWJpQTlJR1oxYmp0Y2JpQWdJQ0IwYUdsekxtRnljbUY1SUQwZ1lYSnlZWGs3WEc1OVhHNUpkR1Z0TG5CeWIzUnZkSGx3WlM1eWRXNGdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZEdocGN5NW1kVzR1WVhCd2JIa29iblZzYkN3Z2RHaHBjeTVoY25KaGVTazdYRzU5TzF4dWNISnZZMlZ6Y3k1MGFYUnNaU0E5SUNkaWNtOTNjMlZ5Snp0Y2JuQnliMk5sYzNNdVluSnZkM05sY2lBOUlIUnlkV1U3WEc1d2NtOWpaWE56TG1WdWRpQTlJSHQ5TzF4dWNISnZZMlZ6Y3k1aGNtZDJJRDBnVzEwN1hHNXdjbTlqWlhOekxuWmxjbk5wYjI0Z1BTQW5KenNnTHk4Z1pXMXdkSGtnYzNSeWFXNW5JSFJ2SUdGMmIybGtJSEpsWjJWNGNDQnBjM04xWlhOY2JuQnliMk5sYzNNdWRtVnljMmx2Ym5NZ1BTQjdmVHRjYmx4dVpuVnVZM1JwYjI0Z2JtOXZjQ2dwSUh0OVhHNWNibkJ5YjJObGMzTXViMjRnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTVoWkdSTWFYTjBaVzVsY2lBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG05dVkyVWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NXZabVlnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTV5WlcxdmRtVk1hWE4wWlc1bGNpQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuSmxiVzkyWlVGc2JFeHBjM1JsYm1WeWN5QTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtVnRhWFFnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTV3Y21Wd1pXNWtUR2x6ZEdWdVpYSWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NXdjbVZ3Wlc1a1QyNWpaVXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibHh1Y0hKdlkyVnpjeTVzYVhOMFpXNWxjbk1nUFNCbWRXNWpkR2x2YmlBb2JtRnRaU2tnZXlCeVpYUjFjbTRnVzEwZ2ZWeHVYRzV3Y205alpYTnpMbUpwYm1ScGJtY2dQU0JtZFc1amRHbHZiaUFvYm1GdFpTa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbmNISnZZMlZ6Y3k1aWFXNWthVzVuSUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FuS1R0Y2JuMDdYRzVjYm5CeWIyTmxjM011WTNka0lEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnSnk4bklIMDdYRzV3Y205alpYTnpMbU5vWkdseUlEMGdablZ1WTNScGIyNGdLR1JwY2lrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduY0hKdlkyVnpjeTVqYUdScGNpQnBjeUJ1YjNRZ2MzVndjRzl5ZEdWa0p5azdYRzU5TzF4dWNISnZZMlZ6Y3k1MWJXRnpheUE5SUdaMWJtTjBhVzl1S0NrZ2V5QnlaWFIxY200Z01Ec2dmVHRjYmlJc0ltbHRjRzl5ZENCeVpYTnZkWEpqWlhOVFpYSjJhV05sSUdaeWIyMGdKeTR2YzJWeWRtbGpaWE12Y21WemIzVnlZMlZ6Snp0Y2NseHVYSEpjYm1OdmJuTjBJSEpsYm1SbGNpQTlJQ2htZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0F2THlCV1lYSnBZV0pzWlhOY2NseHVJQ0JqYjI1emRDQjBhR0YwSUQwZ2UzMDdYSEpjYmlBZ1kyOXVjM1FnWkdWbVlYVnNkSE1nUFNCN1hISmNiaUFnSUNCdVlYWkpkR1Z0UTI5dWRHRnBibVZ5T2lBbkxteGxablJmYldWdWRWOXBkR1Z0Y3ljc1hISmNiaUFnSUNCelpXTjBhVzl1YzBOdmJuUmhhVzVsY2pvZ0p5TnpaV04wYVc5dVgyZHliM1Z3Y3ljc1hISmNiaUFnSUNCeVpYTnZkWEpqWlhNNklGdGRMRnh5WEc0Z0lDQWdZMkZzYkdKaFkyczZJR1oxYm1OMGFXOXVJQ2hqYjI1MFpXNTBLU0I3WEhKY2JpQWdJQ0FnSUhKbGRIVnliaUJqYjI1MFpXNTBPMXh5WEc0Z0lDQWdmU3hjY2x4dUlDQjlPMXh5WEc1Y2NseHVJQ0F2THlCSFpXNWxjbUYwWlNCaElHbDBaVzBnYjJZZ2RHaGxJRzVoZG1sbllYUnBiMjVjY2x4dUlDQmpiMjV6ZENCblpXNWxjbUYwWlU1aGRrbDBaVzBnUFNCallYUmxaMjl5ZVNBOVBpQmdYSEpjYmlBZ0lDQThiR2tnWTJ4aGMzTTlYQ0pzWldaMFgyMWxiblZmYVhSbGJWd2lQbHh5WEc0Z0lDQWdJQ0E4YVcxbklHTnNZWE56UFZ3aWJXVnVkVjlwZEdWdFgybGpiMjVjSWlCemNtTTlYQ0l1TDNOMlp5OWxlR0Z0Y0d4bExuTjJaMXdpUGp3dmFXMW5QbHh5WEc0Z0lDQWdJQ0E4YzNCaGJpQmpiR0Z6Y3oxY0ltMWxiblZmYVhSbGJWOWpiMjUwWlc1MFhDSStKSHRqWVhSbFoyOXllWDA4TDNOd1lXNCtYSEpjYmlBZ0lDQThMMnhwUGx4eVhHNGdJR0E3WEhKY2JseHlYRzRnSUM4dklFZGxibVZ5WVhSbElHRWdjMlZqZEdsdmJpQnZaaUIwYUdVZ2JXRnBiaUJqYjI1MFpXNTBYSEpjYmlBZ1kyOXVjM1FnWjJWdVpYSmhkR1ZUWldOMGFXOXVJRDBnWTJGMFpXZHZjbmtnUFQ0Z1lGeHlYRzRnSUNBZ1BITmxZM1JwYjI0Z2FXUTlYQ0lrZTJOaGRHVm5iM0o1ZlZ3aUlHTnNZWE56UFZ3aVozSnZkWEJjSWlBK1hISmNiaUFnSUNBZ0lEeG9NeUJqYkdGemN6MWNJbWR5YjNWd1gzUnBkR3hsWENJK0pIdGpZWFJsWjI5eWVYMDhMMmd6UGx4eVhHNGdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2laM0p2ZFhCZlkyOXVkR1Z1ZEZ3aVBseHlYRzRnSUNBZ0lDQWdJRHgxYkNCamJHRnpjejFjSW5KdmR5Qm5jbTkxY0Y5cGRHVnRjMXdpUGp3dmRXdytYSEpjYmlBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ1BDOXpaV04wYVc5dVBpQWdYSEpjYmlBZ1lEdGNjbHh1WEhKY2JpQWdMeThnUjJWdVpYSmhkR1VnWVNCc2FYTjBJRzltSUhSb1pTQnpaV04wYVc5dUlGeHlYRzRnSUdOdmJuTjBJR2RsYm1WeVlYUmxUR2x6ZEU5bVUyVmpkR2x2YmlBOUlISmxjMjkxY21ObElEMCtJR0JjY2x4dUlDQWdJRHhzYVNCamJHRnpjejFjSW1keWIzVndYMmwwWlcwZ1kyOXNNMXdpUGx4eVhHNGdJQ0FnSUNBOFlTQmpiR0Z6Y3oxY0ltZHliM1Z3WDJsMFpXMWZiR2x1YTF3aUlHaHlaV1k5WENJa2UzSmxjMjkxY21ObExteHBibXRJY21WbWZWd2lQbHh5WEc0Z0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmpZWEprWENJK1hISmNiaUFnSUNBZ0lDQWdJQ0E4YVcxbklHTnNZWE56UFZ3aVkyRnlaRjlwWTI5dVhDSWdjM0pqUFZ3aUpIdHlaWE52ZFhKalpTNXpjbU45WENJK1hISmNiaUFnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyRnlaRjlpYjJSNVhDSStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeG9OQ0JqYkdGemN6MWNJbU5oY21SZmRHbDBiR1ZjSWo0a2UzSmxjMjkxY21ObExuUnBkR3hsZlR3dmFEUStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeHdJR05zWVhOelBWd2lZMkZ5WkY5MFpYaDBYQ0krSkh0eVpYTnZkWEpqWlM1amIyNTBaVzUwZlR3dmNENWNjbHh1SUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0E4TDJFK1hISmNiaUFnSUNBOEwyeHBQbHh5WEc0Z0lHQTdYSEpjYmx4eVhHNGdJQzh2SUUxbGRHaHZaSE5jY2x4dUlDQXZMeUJTWlcxdmRtVWdaSFZ3YkdsallYUmxJSFpoYkhWbGN5Qm1jbTl0SUdGdUlHRnljbUY1WEhKY2JpQWdZMjl1YzNRZ2RXNXBjWFZsUVhKeVlYa2dQU0JtZFc1amRHbHZiaUFvWVhKeUtTQjdYSEpjYmlBZ0lDQnlaWFIxY200Z1lYSnlMbVpwYkhSbGNpZ29kbUZzZFdVc0lHbHVaR1Y0TENCelpXeG1LU0E5UGlCelpXeG1MbWx1WkdWNFQyWW9kbUZzZFdVcElEMDlQU0JwYm1SbGVDazdYSEpjYmlBZ2ZUdGNjbHh1WEhKY2JpQWdZMjl1YzNRZ2RHOW5aMnhsVG1GMklEMGdablZ1WTNScGIyNG9LU0I3WEhKY2JpQWdJQ0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY2pZMjl1ZEdWdWRGOTNjbUZ3Y0dWeUp5a3VZMnhoYzNOTWFYTjBMblJ2WjJkc1pTZ25hWE10WTJ4dmMyVmtKeWs3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0F2THlCSmJuTmxjblFnYkdWbWRDQnVZWFpwWjJGMGFXOXVJR2wwWlcxeklHbHVkRzhnWkc5amRXMWxiblJjY2x4dUlDQmpiMjV6ZENCeVpXNWtaWEpPWVhaSmRHVnRjeUE5SUdaMWJtTjBhVzl1SUNoelpXeGxZM1J2Y2l3Z1kyRjBaV2R2Y21sbGN5a2dlMXh5WEc0Z0lDQWdMeThnUTJobFkyc2dkR2hsSUhObGJHVmpkRzl5SUNCbWIzSWdkbUZzYVdScGRIbGNjbHh1SUNBZ0lHbG1LQ0ZrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtITmxiR1ZqZEc5eUtTa2djbVYwZFhKdU8xeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHbDBaVzF6SUQwZ1kyRjBaV2R2Y21sbGMxeHlYRzRnSUNBZ0lDQXViV0Z3S0dOaGRHVm5iM0o1SUQwK0lHZGxibVZ5WVhSbFRtRjJTWFJsYlNoallYUmxaMjl5ZVNrcFhISmNiaUFnSUNBZ0lDNXFiMmx1S0NjbktWeHlYRzRnSUNBZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWh6Wld4bFkzUnZjaWt1YVc1dVpYSklWRTFNSUQwZ2FYUmxiWE03WEhKY2JpQWdmVHRjY2x4dVhISmNiaUFnTHk4Z1VtVnVaR1Z5SUhObFkzUnBiMjRnWjNKdmRYQnpJSFJ2SUdSdlkzVnRaVzUwWEhKY2JpQWdZMjl1YzNRZ2NtVnVaR1Z5VTJWamRHbHZia2R5YjNWd2N5QTlJR1oxYm1OMGFXOXVLSE5sYkdWamRHOXlMQ0JqWVhSbFoyOXlhV1Z6S1NCN1hISmNiaUFnSUNBdkx5QkRhR1ZqYXlCMGFHVWdjMlZzWldOMGIzSWdabTl5SUhaaGFXUnBkSGxjY2x4dUlDQWdJR2xtSUNnaFpHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWh6Wld4bFkzUnZjaWtwSUhKbGRIVnlianRjY2x4dUlDQWdJR2xtSUNoMGVYQmxiMllnWTJGMFpXZHZjbWxsY3lBaFBUMGdKMjlpYW1WamRDY3BJSEpsZEhWeWJqdGNjbHh1SUNBZ0lGeHlYRzRnSUNBZ0x5OGdSMlYwSUhObFkzUnBiMjRnYVhSbGJYTmNjbHh1SUNBZ0lHTnZibk4wSUdkeWIzVndjeUE5SUdOaGRHVm5iM0pwWlhOY2NseHVJQ0FnSUNBZ0xtMWhjQ2hqWVhSbFoyOXllU0E5UGlCblpXNWxjbUYwWlZObFkzUnBiMjRvWTJGMFpXZHZjbmtwS1Z4eVhHNGdJQ0FnSUNBdWFtOXBiaWduSnlrN1hISmNiaUFnSUNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLSE5sYkdWamRHOXlLUzVwYm01bGNraFVUVXdnUFNCbmNtOTFjSE03WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0F2THlCSFpYUWdjMlZqZEdsdmJpQnBkR1Z0YzF4eVhHNGdJR052Ym5OMElISmxibVJsY2xObFkzUnBiMjVKZEcxbGN5QTlJR1oxYm1OMGFXOXVLR2xrTENCeVpYTnZkWEpqWlhNcElIdGNjbHh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdjbVZ6YjNWeVkyVnpJQ0U5UFNBbmIySnFaV04wSnlrZ2NtVjBkWEp1TzF4eVhHNGdJQ0FnYVdZZ0tDRmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0dBakpIdHBaSDBnTG1keWIzVndYMmwwWlcxellDa3BJSEpsZEhWeWJqdGNjbHh1WEhKY2JpQWdJQ0JqYjI1emRDQnRZV3RsZFhBZ1BTQnlaWE52ZFhKalpYTmNjbHh1SUNBZ0lDQWdMbVpwYkhSbGNpaHlaWE52ZFhKalpTQTlQaUJ5WlhOdmRYSmpaUzVqWVhSbFoyOXllUzUwY21sdEtDa2dQVDA5SUdsa0tWeHlYRzRnSUNBZ0lDQXViV0Z3S0hKbGMyOTFjbU5sSUQwK0lHZGxibVZ5WVhSbFRHbHpkRTltVTJWamRHbHZiaWh5WlhOdmRYSmpaU2twWEhKY2JpQWdJQ0FnSUM1cWIybHVLQ2NuS1Z4eVhHNWNjbHh1SUNBZ0lHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWUNNa2UybGtmU0F1WjNKdmRYQmZhWFJsYlhOZ0tTNXBibTVsY2toVVRVd2dQU0J0WVd0bGRYQTdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQXZMMXh5WEc1Y2NseHVJQ0F2THlCSmJtbDBJR1YyWlc1MGMxeHlYRzRnSUdOdmJuTjBJR2x1YVhRZ1BTQm1kVzVqZEdsdmJpQW9iM0IwYVc5dWN5a2dlMXh5WEc0Z0lDQWdiM0IwYVc5dWN5QTlJRzl3ZEdsdmJuTWdmSHdnZTMwN1hISmNibHh5WEc0Z0lDQWdMeThnVFdWeVoyVWdZbTkwYUNCMWMyVnlJR1JsWm1GMWJIUnpJR0Z1WkNCdmNIUnBiMjV6TGx4eVhHNGdJQ0FnWTI5dWMzUWdjMlYwZEdsdVozTWdQU0JQWW1wbFkzUXVZWE56YVdkdUtIdDlMQ0JrWldaaGRXeDBjeXdnYjNCMGFXOXVjeWs3WEhKY2JseHlYRzRnSUNBZ0x5OGdSMlYwSUdGc2JDQmpZWFJsWjI5eWFXVnpJRzltSUhKbGMyOTFjbU5sYzF4eVhHNGdJQ0FnWTI5dWMzUWdZMkYwWldkdmNtbGxjeUE5SUhWdWFYRjFaVUZ5Y21GNUtITmxkSFJwYm1kekxuSmxjMjkxY21ObGN5NXRZWEFvY21WemIzVnlZMlVnUFQ0Z2NtVnpiM1Z5WTJVdVkyRjBaV2R2Y25rcEtUdGNjbHh1WEhKY2JpQWdJQ0J5Wlc1a1pYSk9ZWFpKZEdWdGN5aHpaWFIwYVc1bmN5NXVZWFpKZEdWdFEyOXVkR0ZwYm1WeUxDQmpZWFJsWjI5eWFXVnpLVHRjY2x4dUlDQWdJSEpsYm1SbGNsTmxZM1JwYjI1SGNtOTFjSE1vYzJWMGRHbHVaM011YzJWamRHbHZibk5EYjI1MFlXbHVaWElzSUdOaGRHVm5iM0pwWlhNcE8xeHlYRzVjY2x4dUlDQWdJQzh2SUZKbGJtUmxjaUJ6WldOMGFXOXVjeUJwZEdWdGN5QnZiaUJrYjJOMWJXVnVkRnh5WEc0Z0lDQWdZMkYwWldkdmNtbGxjeTVtYjNKRllXTm9LR05oZEdWbmIzSjVJRDArSUhzZ0lDQWdJQ0FnSUNBZ1hISmNiaUFnSUNBZ0lISmxibVJsY2xObFkzUnBiMjVKZEcxbGN5aGpZWFJsWjI5eWVTd2djMlYwZEdsdVozTXVjbVZ6YjNWeVkyVnpLVnh5WEc0Z0lDQWdmU2xjY2x4dVhISmNiaUFnSUNBdkx5QkZkbVZ1ZEZ4eVhHNGdJQ0FnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MblJ2Y0Y5aVlYSmZZblJ1SnlrdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblkyeHBZMnNuTENCMGIyZG5iR1ZPWVhZc0lHWmhiSE5sS1R0Y2NseHVJQ0I5TzF4eVhHNWNjbHh1SUNBZ0lDOHZJRlZ3WkdGMFpTQjBhR1VnWTI5dWRHVnVkQ0JjY2x4dUlDQmpiMjV6ZENCMWNHUmhkR1VnUFNCbWRXNWpkR2x2Ymloa1lYUmhLU0I3WEhKY2JpQWdJQ0JrWldaaGRXeDBjeTV5WlhOdmRYSmpaWE1nUFNCa1pXWmhkV3gwY3k1eVpYTnZkWEpqWlhNdVkyOXVZMkYwS0dSaGRHRXBPMXh5WEc0Z0lDQWdhVzVwZENoa1pXWmhkV3gwY3k1eVpYTnZkWEpqWlhNcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ0x5OGdSMlYwSUhKbGMyOTFjbU5sY3lCbWNtOXRJSFJvWlNCelpYSjJhV05sSUhOcFpHVmNjbHh1SUNCeVpYTnZkWEpqWlhOVFpYSjJhV05sWEhKY2JpQWdJQ0F1WjJWMFFXeHNLQ2xjY2x4dUlDQWdJQzUwYUdWdUtHUmhkR0VnUFQ0Z2UxeHlYRzRnSUNBZ0lDQjFjR1JoZEdVb1pHRjBZU2s3WEhKY2JpQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0x5OGdjbVZ6YjNWeVkyVnpVMlZ5ZG1salpWeHlYRzRnSUM4dklDQWdMbU55WldGMFpTaDdYSEpjYmlBZ0x5OGdJQ0FnSUZ3aWRHbDBiR1ZjSWpvZ1hDSklZWEJ3ZVNCQ2FYSjBhR1JoZVZ3aUxGeHlYRzRnSUM4dklDQWdJQ0JjSW1OdmJuUmxiblJjSWpvZ1hDTG9nWnJwbTRibG5MQmNJaXhjY2x4dUlDQXZMeUFnSUNBZ1hDSnpjbU5jSWpvZ1hDSXVMMmx0Wnk5bWFXeGxMV0Z3Y0M1d2JtZGNJaXhjY2x4dUlDQXZMeUFnSUNBZ1hDSnNhVzVyU0hKbFpsd2lPaUJjSW1oMGRIQnpPaTh2Wld4bFpIVmpheTVqYjIwdlhDSXNYSEpjYmlBZ0x5OGdJQ0FnSUZ3aVkyRjBaV2R2Y25sY0lqb2dYQ0ppYkc5blhDSXNYSEpjYmlBZ0x5OGdJQ0I5S1Z4eVhHNGdJQzh2SUNBZ0xuUm9aVzRvWkdGMFlTQTlQaUI3WEhKY2JpQWdMeThnSUNBZ0lIVndaR0YwWlNoa1lYUmhLVnh5WEc0Z0lDOHZJQ0FnZlNsY2NseHVYSEpjYmk4dklFbHVhWFJ6SUNZZ1JYWmxiblJ6WEhKY2JpQWdkR2hoZEM1cGJtbDBJRDBnYVc1cGREdGNjbHh1WEhKY2JpQWdjbVYwZFhKdUlIUm9ZWFE3WEhKY2JuMHBLQ2s3SWl3aWFXMXdiM0owSUdGNGFXOXpJR1p5YjIwZ0oyRjRhVzl6Snp0Y2NseHVZMjl1YzNRZ1ltRnpaVlZ5YkNBOUlDY3ZMbTVsZEd4cFpua3ZablZ1WTNScGIyNXpMMkZ3YVM5eVpYTnZkWEpqWlhNbk8xeHlYRzVjY2x4dVkyOXVjM1FnWjJWMFFXeHNJRDBnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnWTI5dWMzUWdjbVZ4ZFdWemRDQTlJR0Y0YVc5ekxtZGxkQ2hpWVhObFZYSnNLVHRjY2x4dUlDQnlaWFIxY200Z2NtVnhkV1Z6ZEM1MGFHVnVLSEpsYzNCdmJuTmxJRDArSUhKbGMzQnZibk5sTG1SaGRHRXBPMXh5WEc1OVhISmNibHh5WEc1amIyNXpkQ0JqY21WaGRHVWdQU0JtZFc1amRHbHZiaWh1WlhkUFltcGxZM1FwSUh0Y2NseHVJQ0JqYjI1emRDQnlaWEYxWlhOMElEMGdZWGhwYjNNdWNHOXpkQ2hpWVhObFZYSnNMQ0J1WlhkUFltcGxZM1FwTzF4eVhHNGdJSEpsZEhWeWJpQnlaWEYxWlhOMExuUm9aVzRvY21WemNHOXVjMlVnUFQ0Z2NtVnpjRzl1YzJVdVpHRjBZU2s3WEhKY2JuMWNjbHh1WEhKY2JtTnZibk4wSUhWd1pHRjBaU0E5SUdaMWJtTjBhVzl1S0dsa0xDQnVaWGRQWW1wbFkzUXBJSHRjY2x4dUlDQmpiMjV6ZENCeVpYRjFaWE4wSUQwZ1lYaHBiM011Y0hWMEtHQWtlMkpoYzJWVmNteDlMeVI3YVdSOVlDd2dibVYzVDJKcVpXTjBLVHRjY2x4dUlDQnlaWFIxY200Z2NtVnhkV1Z6ZEM1MGFHVnVLSEpsYzNCdmJuTmxJRDArSUhKbGMzQnZibk5sTG1SaGRHRXBPMXh5WEc1OVhISmNibHh5WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0I3SUdkbGRFRnNiQ3dnWTNKbFlYUmxMQ0IxY0dSaGRHVWdmVnh5WEc0aVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSJ9
