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
/* harmony import */ var _views_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/ui */ "./src/js/views/ui.js");
/* harmony import */ var _views_skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/skeleton */ "./src/js/views/skeleton.js");
/* harmony import */ var _views_toggleMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/toggleMenu */ "./src/js/views/toggleMenu.js");





const app = (function() {
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

  // Methods
  const uniqueArray = function (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  };

  const appendMakeup = function(selector, makeup) {
    if (!document.querySelector(selector)) return;
    document.querySelector(selector).innerHTML = makeup;
  }

  const renderCards = function(category, resources) {
    const selector = `#${category} .group_items`;
    const uniqueResources = resources.filter(
      resource => resource.category.trim() === category
    );

    const makeup = Object(_views_ui__WEBPACK_IMPORTED_MODULE_1__["render"])(uniqueResources, _views_ui__WEBPACK_IMPORTED_MODULE_1__["getCards"]);

    appendMakeup(selector, makeup);
  }

  // Init events
  const init = function (options) {
    options = options || {};
    // Merge both user defaults and options.
    const settings = Object.assign({}, defaults, options);
    // Get all categories of resources
    const categories = uniqueArray(
      settings.resources.map(resource => resource.category)
    );

    // Get all items of left menu items then append it to document
    const menuItems =  Object(_views_ui__WEBPACK_IMPORTED_MODULE_1__["render"])(categories, _views_ui__WEBPACK_IMPORTED_MODULE_1__["getMenuItems"]);
    appendMakeup(settings.navItemContainer, menuItems);

    // Get all sections of main content
    const groups = Object(_views_ui__WEBPACK_IMPORTED_MODULE_1__["render"])(categories, _views_ui__WEBPACK_IMPORTED_MODULE_1__["getSections"]);
    appendMakeup(settings.sectionsContainer, groups);

    // Render sections items on document
    categories.forEach(category => {          
      renderCards(category, settings.resources)
    })

    // Event 
      Object(_views_toggleMenu__WEBPACK_IMPORTED_MODULE_3__["changeOverlayStatus"])();
      Object(_views_toggleMenu__WEBPACK_IMPORTED_MODULE_3__["closeMenu"])();
  };


  // Render the skeleton screen before getting the resources from server
  appendMakeup(defaults.sectionsContainer, Object(_views_skeleton__WEBPACK_IMPORTED_MODULE_2__["default"])());

    // Get resources from the service side
  _services_resources__WEBPACK_IMPORTED_MODULE_0__["default"]
  .getAll()
  .then(resources => {
    init(resources);
  });


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

/***/ "./src/js/views/skeleton.js":
/*!**********************************!*\
  !*** ./src/js/views/skeleton.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getSkeletonScreen; });
function getSkeletonScreen() {
  let items = '';

  const item = `
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

  for(let i = 0; i < 20; i++) {
    items += item;
  }

  return `
    <section class="group" >
      <h3 class="group_title loading"></h3>
      <div class="group_content">
        <ul class="row group_items">
          ${items}
        </ul>
      </div>
    </section>
  `;
}



/***/ }),

/***/ "./src/js/views/toggleMenu.js":
/*!************************************!*\
  !*** ./src/js/views/toggleMenu.js ***!
  \************************************/
/*! exports provided: changeOverlayStatus, closeMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeOverlayStatus", function() { return changeOverlayStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeMenu", function() { return closeMenu; });
const selector = {
  leftControlMenu: document.querySelector('.left_control_menu'),
  leftMenuOverlay: document.querySelector('.left_menu_overlay'),
  contentWrapper: document.querySelector('.content_wrapper')
}

const classNames = {
  enterDone: 'left_menu_overlay left_menu_overlay-enter-done',
  exitDone: 'left_menu_overlay left_menu_overlay-exit-done'
}

// Represent the left menu opening or closing
// True means it's opening
let isActive = true;

const handleOverlay = function (classNames) {
  return function () {
    if (isActive) {
      selector.contentWrapper.classList.remove('is-closed');
      selector.leftMenuOverlay.className = classNames.enterDone;
    } else {
      selector.leftMenuOverlay.className = classNames.exitDone;
      selector.contentWrapper.classList.add('is-closed');
    }

    isActive = !isActive;
  }
}

function changeOverlayStatus () {
  selector.leftControlMenu.addEventListener('click', handleOverlay(classNames));
}

function closeMenu() {
  selector.leftMenuOverlay.addEventListener('click', handleOverlay(classNames));
}


/***/ }),

/***/ "./src/js/views/ui.js":
/*!****************************!*\
  !*** ./src/js/views/ui.js ***!
  \****************************/
/*! exports provided: getMenuItems, getSections, getCards, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMenuItems", function() { return getMenuItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSections", function() { return getSections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCards", function() { return getCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
  // Generate a item of the navigation
const getMenuItems = category => `
    <li class="left_menu_item">
      <img class="menu_item_icon" src="./svg/example.svg"></img>
      <span class="menu_item_content">${category}</span>
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

const render = function(array, func) {
    const makeup = array
      .map(item => func(item))
      .join('')
    return makeup;
  }



/***/ }),

/***/ 0:
/*!******************************************************************************************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/views/skeleton.js ./src/js/views/toggleMenu.js ./src/js/views/ui.js ./src/js/services/resources.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\skeleton.js */"./src/js/views/skeleton.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\toggleMenu.js */"./src/js/views/toggleMenu.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\ui.js */"./src/js/views/ui.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\services\resources.js */"./src/js/services/resources.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9za2VsZXRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvdG9nZ2xlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6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LEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5VkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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LHdDQUF3QyxhQUFhO0FBQ3JEO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eScsICdwYXJhbXMnXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAndGltZW91dE1lc3NhZ2UnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnZGVjb21wcmVzcycsXG4gICAgJ21heENvbnRlbnRMZW5ndGgnLCAnbWF4Qm9keUxlbmd0aCcsICdtYXhSZWRpcmVjdHMnLCAndHJhbnNwb3J0JywgJ2h0dHBBZ2VudCcsXG4gICAgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCcsICdyZXNwb25zZUVuY29kaW5nJ1xuICBdO1xuICB2YXIgZGlyZWN0TWVyZ2VLZXlzID0gWyd2YWxpZGF0ZVN0YXR1cyddO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKGRpcmVjdE1lcmdlS2V5cywgZnVuY3Rpb24gbWVyZ2UocHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzXG4gICAgLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cylcbiAgICAuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKVxuICAgIC5jb25jYXQoZGlyZWN0TWVyZ2VLZXlzKTtcblxuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0XG4gICAgLmtleXMoY29uZmlnMSlcbiAgICAuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICAgIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAodG9TdHJpbmcuY2FsbCh2YWwpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTVxufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgcmVzb3VyY2VzU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3Jlc291cmNlcyc7XHJcbmltcG9ydCB7IGdldFNlY3Rpb25zLCBnZXRDYXJkcywgZ2V0TWVudUl0ZW1zLCByZW5kZXIgfSBmcm9tICcuL3ZpZXdzL3VpJztcclxuaW1wb3J0IHJlbmRlclNrZWxldG9uU2NyZWVuIGZyb20gJy4vdmlld3Mvc2tlbGV0b24nO1xyXG5pbXBvcnQgeyBjaGFuZ2VPdmVybGF5U3RhdHVzLCBjbG9zZU1lbnUgfSBmcm9tICcuL3ZpZXdzL3RvZ2dsZU1lbnUnO1xyXG5cclxuY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIGNvbnN0IHRoYXQgPSB7fTtcclxuICBjb25zdCBkZWZhdWx0cyA9IHtcclxuICAgIG5hdkl0ZW1Db250YWluZXI6ICcubGVmdF9tZW51X2l0ZW1zJyxcclxuICAgIHNlY3Rpb25zQ29udGFpbmVyOiAnI3NlY3Rpb25fZ3JvdXBzJyxcclxuICAgIHJlc291cmNlczogW10sXHJcbiAgICBjYWxsYmFjazogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIC8vIE1ldGhvZHNcclxuICBjb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIHJldHVybiBhcnIuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhcHBlbmRNYWtldXAgPSBmdW5jdGlvbihzZWxlY3RvciwgbWFrZXVwKSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSByZXR1cm47XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5pbm5lckhUTUwgPSBtYWtldXA7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZW5kZXJDYXJkcyA9IGZ1bmN0aW9uKGNhdGVnb3J5LCByZXNvdXJjZXMpIHtcclxuICAgIGNvbnN0IHNlbGVjdG9yID0gYCMke2NhdGVnb3J5fSAuZ3JvdXBfaXRlbXNgO1xyXG4gICAgY29uc3QgdW5pcXVlUmVzb3VyY2VzID0gcmVzb3VyY2VzLmZpbHRlcihcclxuICAgICAgcmVzb3VyY2UgPT4gcmVzb3VyY2UuY2F0ZWdvcnkudHJpbSgpID09PSBjYXRlZ29yeVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBtYWtldXAgPSByZW5kZXIodW5pcXVlUmVzb3VyY2VzLCBnZXRDYXJkcyk7XHJcblxyXG4gICAgYXBwZW5kTWFrZXVwKHNlbGVjdG9yLCBtYWtldXApO1xyXG4gIH1cclxuXHJcbiAgLy8gSW5pdCBldmVudHNcclxuICBjb25zdCBpbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgLy8gTWVyZ2UgYm90aCB1c2VyIGRlZmF1bHRzIGFuZCBvcHRpb25zLlxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICAvLyBHZXQgYWxsIGNhdGVnb3JpZXMgb2YgcmVzb3VyY2VzXHJcbiAgICBjb25zdCBjYXRlZ29yaWVzID0gdW5pcXVlQXJyYXkoXHJcbiAgICAgIHNldHRpbmdzLnJlc291cmNlcy5tYXAocmVzb3VyY2UgPT4gcmVzb3VyY2UuY2F0ZWdvcnkpXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEdldCBhbGwgaXRlbXMgb2YgbGVmdCBtZW51IGl0ZW1zIHRoZW4gYXBwZW5kIGl0IHRvIGRvY3VtZW50XHJcbiAgICBjb25zdCBtZW51SXRlbXMgPSAgcmVuZGVyKGNhdGVnb3JpZXMsIGdldE1lbnVJdGVtcyk7XHJcbiAgICBhcHBlbmRNYWtldXAoc2V0dGluZ3MubmF2SXRlbUNvbnRhaW5lciwgbWVudUl0ZW1zKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIHNlY3Rpb25zIG9mIG1haW4gY29udGVudFxyXG4gICAgY29uc3QgZ3JvdXBzID0gcmVuZGVyKGNhdGVnb3JpZXMsIGdldFNlY3Rpb25zKTtcclxuICAgIGFwcGVuZE1ha2V1cChzZXR0aW5ncy5zZWN0aW9uc0NvbnRhaW5lciwgZ3JvdXBzKTtcclxuXHJcbiAgICAvLyBSZW5kZXIgc2VjdGlvbnMgaXRlbXMgb24gZG9jdW1lbnRcclxuICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7ICAgICAgICAgIFxyXG4gICAgICByZW5kZXJDYXJkcyhjYXRlZ29yeSwgc2V0dGluZ3MucmVzb3VyY2VzKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBFdmVudCBcclxuICAgICAgY2hhbmdlT3ZlcmxheVN0YXR1cygpO1xyXG4gICAgICBjbG9zZU1lbnUoKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8gUmVuZGVyIHRoZSBza2VsZXRvbiBzY3JlZW4gYmVmb3JlIGdldHRpbmcgdGhlIHJlc291cmNlcyBmcm9tIHNlcnZlclxyXG4gIGFwcGVuZE1ha2V1cChkZWZhdWx0cy5zZWN0aW9uc0NvbnRhaW5lciwgcmVuZGVyU2tlbGV0b25TY3JlZW4oKSk7XHJcblxyXG4gICAgLy8gR2V0IHJlc291cmNlcyBmcm9tIHRoZSBzZXJ2aWNlIHNpZGVcclxuICByZXNvdXJjZXNTZXJ2aWNlXHJcbiAgLmdldEFsbCgpXHJcbiAgLnRoZW4ocmVzb3VyY2VzID0+IHtcclxuICAgIGluaXQocmVzb3VyY2VzKTtcclxuICB9KTtcclxuXHJcblxyXG4vLyBJbml0cyAmIEV2ZW50c1xyXG4gIHRoYXQuaW5pdCA9IGluaXQ7XHJcblxyXG4gIHJldHVybiB0aGF0O1xyXG59KSgpOyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmNvbnN0IGJhc2VVcmwgPSAnLy5uZXRsaWZ5L2Z1bmN0aW9ucy9hcGkvcmVzb3VyY2VzJztcclxuXHJcbmNvbnN0IGdldEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHJlcXVlc3QgPSBheGlvcy5nZXQoYmFzZVVybCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlID0gZnVuY3Rpb24obmV3T2JqZWN0KSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLnBvc3QoYmFzZVVybCwgbmV3T2JqZWN0KTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSBmdW5jdGlvbihpZCwgbmV3T2JqZWN0KSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLnB1dChgJHtiYXNlVXJsfS8ke2lkfWAsIG5ld09iamVjdCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXRBbGwsIGNyZWF0ZSwgdXBkYXRlIH1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2tlbGV0b25TY3JlZW4oKSB7XHJcbiAgbGV0IGl0ZW1zID0gJyc7XHJcblxyXG4gIGNvbnN0IGl0ZW0gPSBgXHJcbiAgICA8bGkgY2xhc3M9XCJncm91cF9pdGVtIGNvbDNcIj5cclxuICAgICAgPGEgY2xhc3M9XCJncm91cF9pdGVtX2xpbmtcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfaWNvbiBsb2FkaW5nXCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9ib2R5XCI+XHJcbiAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmRfdGl0bGUgbG9hZGluZ1wiPjwvaDQ+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF90ZXh0IGxvYWRpbmdcIj48L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9hPlxyXG4gICAgPC9saT5cclxuICBgO1xyXG5cclxuICBmb3IobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xyXG4gICAgaXRlbXMgKz0gaXRlbTtcclxuICB9XHJcblxyXG4gIHJldHVybiBgXHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cImdyb3VwXCIgPlxyXG4gICAgICA8aDMgY2xhc3M9XCJncm91cF90aXRsZSBsb2FkaW5nXCI+PC9oMz5cclxuICAgICAgPGRpdiBjbGFzcz1cImdyb3VwX2NvbnRlbnRcIj5cclxuICAgICAgICA8dWwgY2xhc3M9XCJyb3cgZ3JvdXBfaXRlbXNcIj5cclxuICAgICAgICAgICR7aXRlbXN9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgYDtcclxufVxyXG5cclxuIiwiY29uc3Qgc2VsZWN0b3IgPSB7XHJcbiAgbGVmdENvbnRyb2xNZW51OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdF9jb250cm9sX21lbnUnKSxcclxuICBsZWZ0TWVudU92ZXJsYXk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X21lbnVfb3ZlcmxheScpLFxyXG4gIGNvbnRlbnRXcmFwcGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudF93cmFwcGVyJylcclxufVxyXG5cclxuY29uc3QgY2xhc3NOYW1lcyA9IHtcclxuICBlbnRlckRvbmU6ICdsZWZ0X21lbnVfb3ZlcmxheSBsZWZ0X21lbnVfb3ZlcmxheS1lbnRlci1kb25lJyxcclxuICBleGl0RG9uZTogJ2xlZnRfbWVudV9vdmVybGF5IGxlZnRfbWVudV9vdmVybGF5LWV4aXQtZG9uZSdcclxufVxyXG5cclxuLy8gUmVwcmVzZW50IHRoZSBsZWZ0IG1lbnUgb3BlbmluZyBvciBjbG9zaW5nXHJcbi8vIFRydWUgbWVhbnMgaXQncyBvcGVuaW5nXHJcbmxldCBpc0FjdGl2ZSA9IHRydWU7XHJcblxyXG5jb25zdCBoYW5kbGVPdmVybGF5ID0gZnVuY3Rpb24gKGNsYXNzTmFtZXMpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgIHNlbGVjdG9yLmNvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWNsb3NlZCcpO1xyXG4gICAgICBzZWxlY3Rvci5sZWZ0TWVudU92ZXJsYXkuY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5lbnRlckRvbmU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWxlY3Rvci5sZWZ0TWVudU92ZXJsYXkuY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5leGl0RG9uZTtcclxuICAgICAgc2VsZWN0b3IuY29udGVudFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaXMtY2xvc2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBY3RpdmUgPSAhaXNBY3RpdmU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlT3ZlcmxheVN0YXR1cyAoKSB7XHJcbiAgc2VsZWN0b3IubGVmdENvbnRyb2xNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3ZlcmxheShjbGFzc05hbWVzKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XHJcbiAgc2VsZWN0b3IubGVmdE1lbnVPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3ZlcmxheShjbGFzc05hbWVzKSk7XHJcbn1cclxuIiwiICAvLyBHZW5lcmF0ZSBhIGl0ZW0gb2YgdGhlIG5hdmlnYXRpb25cclxuZXhwb3J0IGNvbnN0IGdldE1lbnVJdGVtcyA9IGNhdGVnb3J5ID0+IGBcclxuICAgIDxsaSBjbGFzcz1cImxlZnRfbWVudV9pdGVtXCI+XHJcbiAgICAgIDxpbWcgY2xhc3M9XCJtZW51X2l0ZW1faWNvblwiIHNyYz1cIi4vc3ZnL2V4YW1wbGUuc3ZnXCI+PC9pbWc+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVudV9pdGVtX2NvbnRlbnRcIj4ke2NhdGVnb3J5fTwvc3Bhbj5cclxuICAgIDwvbGk+XHJcbiAgYDtcclxuXHJcbiAgLy8gR2VuZXJhdGUgYSBzZWN0aW9uIG9mIHRoZSBtYWluIGNvbnRlbnRcclxuZXhwb3J0IGNvbnN0IGdldFNlY3Rpb25zID0gY2F0ZWdvcnkgPT4gYFxyXG4gICAgPHNlY3Rpb24gaWQ9XCIke2NhdGVnb3J5fVwiIGNsYXNzPVwiZ3JvdXBcIiA+XHJcbiAgICAgIDxoMyBjbGFzcz1cImdyb3VwX3RpdGxlXCI+JHtjYXRlZ29yeX08L2gzPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JvdXBfY29udGVudFwiPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cInJvdyBncm91cF9pdGVtc1wiPjwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPiAgXHJcbiAgYDtcclxuXHJcbiAgLy8gR2VuZXJhdGUgYSBsaXN0IG9mIHRoZSBzZWN0aW9uIFxyXG5leHBvcnQgY29uc3QgZ2V0Q2FyZHMgPSByZXNvdXJjZSA9PiBgXHJcbiAgICA8bGkgY2xhc3M9XCJncm91cF9pdGVtIGNvbDNcIj5cclxuICAgICAgPGEgY2xhc3M9XCJncm91cF9pdGVtX2xpbmtcIiBocmVmPVwiJHtyZXNvdXJjZS5ocmVmfVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZF9pY29uXCIgc3JjPVwiJHtyZXNvdXJjZS5zcmN9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9ib2R5XCI+XHJcbiAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmRfdGl0bGVcIj4ke3Jlc291cmNlLnRpdGxlfTwvaDQ+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF90ZXh0XCI+JHtyZXNvdXJjZS5jb250ZW50fTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2E+XHJcbiAgICA8L2xpPlxyXG4gIGA7XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyID0gZnVuY3Rpb24oYXJyYXksIGZ1bmMpIHtcclxuICAgIGNvbnN0IG1ha2V1cCA9IGFycmF5XHJcbiAgICAgIC5tYXAoaXRlbSA9PiBmdW5jKGl0ZW0pKVxyXG4gICAgICAuam9pbignJylcclxuICAgIHJldHVybiBtYWtldXA7XHJcbiAgfVxyXG5cclxuIl0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwybHVaR1Y0TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZV1JoY0hSbGNuTXZlR2h5TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZWGhwYjNNdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlqWVc1alpXd3ZRMkZ1WTJWc0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTJGdVkyVnNMME5oYm1ObGJGUnZhMlZ1TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMkZ1WTJWc0wybHpRMkZ1WTJWc0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOUJlR2x2Y3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMk52Y21VdlNXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOWlkV2xzWkVaMWJHeFFZWFJvTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZZMjl5WlM5amNtVmhkR1ZGY25KdmNpNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJOdmNtVXZaR2x6Y0dGMFkyaFNaWEYxWlhOMExtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOWxibWhoYm1ObFJYSnliM0l1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOWpiM0psTDIxbGNtZGxRMjl1Wm1sbkxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOXpaWFIwYkdVdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlqYjNKbEwzUnlZVzV6Wm05eWJVUmhkR0V1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOWtaV1poZFd4MGN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJobGJIQmxjbk12WW1sdVpDNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJobGJIQmxjbk12WW5WcGJHUlZVa3d1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOW9aV3h3WlhKekwyTnZiV0pwYm1WVlVreHpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdmFHVnNjR1Z5Y3k5amIyOXJhV1Z6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZhR1ZzY0dWeWN5OXBjMEZpYzI5c2RYUmxWVkpNTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZhR1ZzY0dWeWN5OXBjMVZTVEZOaGJXVlBjbWxuYVc0dWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMMjV2Y20xaGJHbDZaVWhsWVdSbGNrNWhiV1V1YW5NaUxDSjNaV0p3WVdOck9pOHZMeTR2Ym05a1pWOXRiMlIxYkdWekwyRjRhVzl6TDJ4cFlpOW9aV3h3WlhKekwzQmhjbk5sU0dWaFpHVnljeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdmMzQnlaV0ZrTG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZkWFJwYkhNdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMM0J5YjJObGMzTXZZbkp2ZDNObGNpNXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmJXRnBiaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZjMlZ5ZG1salpYTXZjbVZ6YjNWeVkyVnpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OTJhV1YzY3k5emEyVnNaWFJ2Ymk1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12ZG1sbGQzTXZkRzluWjJ4bFRXVnVkUzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZkbWxsZDNNdmRXa3Vhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRSUVVGQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHM3VVVGRlFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CT3pzN1VVRkhRVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHRSUVVOQk8xRkJRMEVzTUVOQlFUQkRMR2REUVVGblF6dFJRVU14UlR0UlFVTkJPenRSUVVWQk8xRkJRMEU3VVVGRFFUdFJRVU5CTEhkRVFVRjNSQ3hyUWtGQmEwSTdVVUZETVVVN1VVRkRRU3hwUkVGQmFVUXNZMEZCWXp0UlFVTXZSRHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRXNlVU5CUVhsRExHbERRVUZwUXp0UlFVTXhSU3huU0VGQlowZ3NiVUpCUVcxQ0xFVkJRVVU3VVVGRGNrazdVVUZEUVRzN1VVRkZRVHRSUVVOQk8xRkJRMEU3VVVGRFFTd3lRa0ZCTWtJc01FSkJRVEJDTEVWQlFVVTdVVUZEZGtRc2FVTkJRV2xETEdWQlFXVTdVVUZEYUVRN1VVRkRRVHRSUVVOQk96dFJRVVZCTzFGQlEwRXNjMFJCUVhORUxDdEVRVUVyUkRzN1VVRkZja2c3VVVGRFFUczdPMUZCUjBFN1VVRkRRVHM3T3pzN096czdPenM3TzBGRGJFWkJMR2xDUVVGcFFpeHRRa0ZCVHl4RFFVRkRMSE5FUVVGaExFVTdPenM3T3pzN096czdPenRCUTBGNlFqczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdRVUZEYUVNc1lVRkJZU3h0UWtGQlR5eERRVUZETEdsRlFVRnJRanRCUVVOMlF5eGpRVUZqTEcxQ1FVRlBMRU5CUVVNc2VVVkJRWE5DTzBGQlF6VkRMR1ZCUVdVc2JVSkJRVThzUTBGQlF5d3lSVUZCZFVJN1FVRkRPVU1zYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zTmtWQlFYVkNPMEZCUTI1RUxHMUNRVUZ0UWl4dFFrRkJUeXhEUVVGRExHMUdRVUV5UWp0QlFVTjBSQ3h6UWtGQmMwSXNiVUpCUVU4c1EwRkJReXg1UmtGQk9FSTdRVUZETlVRc2EwSkJRV3RDTEcxQ1FVRlBMRU5CUVVNc2VVVkJRWEZDT3p0QlFVVXZRenRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRFJEUVVFMFF6dEJRVU0xUXpzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFRRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEU5QlFVODdRVUZEVURzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHM3T3pzN096czdPenM3T3p0QlEyeE1ZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2EwUkJRVk03UVVGRE4wSXNWMEZCVnl4dFFrRkJUeXhEUVVGRExHZEZRVUZuUWp0QlFVTnVReXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNORVJCUVdNN1FVRkRiRU1zYTBKQlFXdENMRzFDUVVGUExFTkJRVU1zZDBWQlFXOUNPMEZCUXpsRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl4M1JFRkJXVHM3UVVGRmJrTTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZsQlFWa3NUVUZCVFR0QlFVTnNRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4bFFVRmxMRzFDUVVGUExFTkJRVU1zYTBWQlFXbENPMEZCUTNoRExHOUNRVUZ2UWl4dFFrRkJUeXhEUVVGRExEUkZRVUZ6UWp0QlFVTnNSQ3hwUWtGQmFVSXNiVUpCUVU4c1EwRkJReXh6UlVGQmJVSTdPMEZCUlRWRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNaVUZCWlN4dFFrRkJUeXhEUVVGRExHOUZRVUZyUWpzN1FVRkZla003TzBGQlJVRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRM0JFWVRzN1FVRkZZanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NVVUZCVVR0QlFVTnVRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdPenM3T3pzN096czdPenM3UVVOc1FtRTdPMEZCUldJc1lVRkJZU3h0UWtGQlR5eERRVUZETERKRVFVRlZPenRCUVVVdlFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1UwRkJVenRCUVVOd1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPenM3T3pzN096czdPenM3UVVONFJHRTdPMEZCUldJN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEU21FN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMSEZFUVVGWk8wRkJRMmhETEdWQlFXVXNiVUpCUVU4c1EwRkJReXg1UlVGQmNVSTdRVUZETlVNc2VVSkJRWGxDTEcxQ1FVRlBMRU5CUVVNc2FVWkJRWE5DTzBGQlEzWkVMSE5DUVVGelFpeHRRa0ZCVHl4RFFVRkRMREpGUVVGdFFqdEJRVU5xUkN4clFrRkJhMElzYlVKQlFVOHNRMEZCUXl4dFJVRkJaVHM3UVVGRmVrTTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNaMFJCUVdkRU8wRkJRMmhFTzBGQlEwRTdRVUZEUVN4NVFrRkJlVUk3UVVGRGVrSXNTMEZCU3p0QlFVTk1PMEZCUTBFc1EwRkJRenM3UVVGRlJEdEJRVU5CTzBGQlEwRTdRVUZEUVN4blJFRkJaMFE3UVVGRGFFUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEVzUTBGQlF6czdRVUZGUkRzN096czdPenM3T3pzN096dEJRemxHWVRzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN08wRkJSV2hETzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEZOQlFWTTdRVUZEY0VJc1YwRkJWeXhUUVVGVE8wRkJRM0JDTzBGQlEwRXNXVUZCV1N4UFFVRlBPMEZCUTI1Q08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1UwRkJVenRCUVVOd1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3TzBGQlJVRTdPenM3T3pzN096czdPenM3UVVOdVJHRTdPMEZCUldJc2IwSkJRVzlDTEcxQ1FVRlBMRU5CUVVNc2JVWkJRVEJDTzBGQlEzUkVMR3RDUVVGclFpeHRRa0ZCVHl4RFFVRkRMQ3RGUVVGM1FqczdRVUZGYkVRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3TzBGRGJrSmhPenRCUVVWaUxHMUNRVUZ0UWl4dFFrRkJUeXhEUVVGRExIRkZRVUZuUWpzN1FVRkZNME03UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEUxQlFVMDdRVUZEYmtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTJwQ1lUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdRVUZEYUVNc2IwSkJRVzlDTEcxQ1FVRlBMRU5CUVVNc2RVVkJRV2xDTzBGQlF6ZERMR1ZCUVdVc2JVSkJRVThzUTBGQlF5eDFSVUZCYjBJN1FVRkRNME1zWlVGQlpTeHRRa0ZCVHl4RFFVRkRMSGxFUVVGaE96dEJRVVZ3UXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTd3JRa0ZCSzBJN1FVRkRMMElzZFVOQlFYVkRPMEZCUTNaRE8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzUjBGQlJ6dEJRVU5JT3pzN096czdPenM3T3pzN08wRkRPVVZoT3p0QlFVVmlPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVFVGQlRUdEJRVU5xUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hOUVVGTk8wRkJRMjVDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzcERZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2JVUkJRVlU3TzBGQlJUbENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEU5QlFVODdRVUZEY0VJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwd3NNa0pCUVRKQ08wRkJRek5DTEV0QlFVczdRVUZEVER0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMT3p0QlFVVk1PenRCUVVWQk8wRkJRMEU3T3pzN096czdPenM3T3pzN1FVTjBSbUU3TzBGQlJXSXNhMEpCUVd0Q0xHMUNRVUZQTEVOQlFVTXNiVVZCUVdVN08wRkJSWHBETzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1UwRkJVenRCUVVOd1FpeFhRVUZYTEZOQlFWTTdRVUZEY0VJc1YwRkJWeXhQUVVGUE8wRkJRMnhDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEZUVKaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXh4UkVGQldUczdRVUZGYUVNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eGpRVUZqTzBGQlEzcENMRmRCUVZjc1RVRkJUVHRCUVVOcVFpeFhRVUZYTEdWQlFXVTdRVUZETVVJc1lVRkJZU3hGUVVGRk8wRkJRMlk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUczdPenM3T3pzN096czdPenRCUTI1Q1FTd3JRMEZCWVRzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNhMFJCUVZNN1FVRkROMElzTUVKQlFUQkNMRzFDUVVGUExFTkJRVU1zT0VaQlFTdENPenRCUVVWcVJUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHTkJRV01zYlVKQlFVOHNRMEZCUXl4blJVRkJaMEk3UVVGRGRFTXNSMEZCUnp0QlFVTklPMEZCUTBFc1kwRkJZeXh0UWtGQlR5eERRVUZETEdsRlFVRnBRanRCUVVOMlF6dEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIZEZRVUYzUlR0QlFVTjRSVHRCUVVOQk8wRkJRMEU3UVVGRFFTeDFSRUZCZFVRN1FVRkRka1E3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnpzN1FVRkZTRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHl4WlFVRlpPMEZCUTI1Q08wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJMRU5CUVVNN08wRkJSVVE3T3pzN096czdPenM3T3pzN08wRkRha2RoT3p0QlFVVmlPMEZCUTBFN1FVRkRRVHRCUVVOQkxHMUNRVUZ0UWl4cFFrRkJhVUk3UVVGRGNFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlExWmhPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHM3UVVGRmFFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFBRVUZQTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVUZQTzBGQlExQXNTMEZCU3pzN1FVRkZURHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenM3T3pzN096czdPenM3TzBGRGNrVmhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMkpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMREJEUVVFd1F6dEJRVU14UXl4VFFVRlRPenRCUVVWVU8wRkJRMEVzTkVSQlFUUkVMSGRDUVVGM1FqdEJRVU53Ump0QlFVTkJMRk5CUVZNN08wRkJSVlE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTEd0RFFVRnJRenRCUVVOc1F5d3JRa0ZCSzBJc1lVRkJZU3hGUVVGRk8wRkJRemxETzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N096czdPenM3T3pzN096czdRVU53UkdFN08wRkJSV0k3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTJKaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXh4UkVGQldUczdRVUZGYUVNN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNZMEZCWXl4UFFVRlBPMEZCUTNKQ0xHZENRVUZuUWp0QlFVTm9RanRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHTkJRV01zVDBGQlR6dEJRVU55UWl4blFrRkJaMElzVVVGQlVUdEJRVU40UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMT3p0QlFVVk1PMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdPenM3T3pzN096czdPenM3UVVOdVJXRTdPMEZCUldJc1dVRkJXU3h0UWtGQlR5eERRVUZETEcxRVFVRlZPenRCUVVVNVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3T3pzN096czdPenM3T3pzN1FVTllZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVms3TzBGQlJXaERPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRU3hwUWtGQmFVSXNaVUZCWlRzN1FVRkZhRU03UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUMEZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVRzN096czdPenM3T3pzN096dEJRM0JFWVRzN1FVRkZZanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNLMEpCUVN0Q08wRkJReTlDTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUlzWVVGQllUdEJRVU5pTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlF6RkNZVHM3UVVGRllpeFhRVUZYTEcxQ1FVRlBMRU5CUVVNc1owVkJRV2RDT3p0QlFVVnVRenM3UVVGRlFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmxCUVZrc1VVRkJVVHRCUVVOd1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UlFVRlJPMEZCUTNKQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFBRVUZQTzBGQlEzQkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4aFFVRmhPMEZCUTNoQ0xGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNiVU5CUVcxRExFOUJRVTg3UVVGRE1VTTdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzZFVKQlFYVkNMRk5CUVZNc1IwRkJSeXhUUVVGVE8wRkJRelZETERKQ1FVRXlRanRCUVVNelFqdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVDBGQlR6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwd3NORUpCUVRSQ08wRkJRelZDTEV0QlFVczdRVUZEVER0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3TzBGQlJVRXNkVU5CUVhWRExFOUJRVTg3UVVGRE9VTTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzV1VGQldTeFBRVUZQTzBGQlEyNUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJMRWRCUVVjN1FVRkRTRHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFpRVUZaTEU5QlFVODdRVUZEYmtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN1FVTTVWa0U3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1UwRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRU3hEUVVGRE8wRkJRMFE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3UVVGSFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTEZOQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPMEZCU1VFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVER0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMSFZDUVVGMVFpeHpRa0ZCYzBJN1FVRkROME03UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4eFFrRkJjVUk3UVVGRGNrSTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTEhGRFFVRnhRenM3UVVGRmNrTTdRVUZEUVR0QlFVTkJPenRCUVVWQkxESkNRVUV5UWp0QlFVTXpRanRCUVVOQk8wRkJRMEU3UVVGRFFTdzBRa0ZCTkVJc1ZVRkJWVHM3T3pzN096czdPenM3T3p0QlEzWk1kRU03UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRnZSRHRCUVVOeFFqdEJRVU55UWp0QlFVTm5RanM3UVVGRmNFVTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNlVUpCUVhsQ0xGTkJRVk03UVVGRGJFTTdRVUZEUVR0QlFVTkJPenRCUVVWQkxHMUNRVUZ0UWl4M1JFRkJUU3hyUWtGQmEwSXNhMFJCUVZFN08wRkJSVzVFTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHhRMEZCY1VNN1FVRkRja003UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3gxUWtGQmRVSXNkMFJCUVUwc1lVRkJZU3h6UkVGQldUdEJRVU4wUkRzN1FVRkZRVHRCUVVOQkxHMUNRVUZ0UWl4M1JFRkJUU3hoUVVGaExIRkVRVUZYTzBGQlEycEVPenRCUVVWQk8wRkJRMEVzYjBNN1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVN4TlFVRk5MRFpGUVVGdFFqdEJRVU42UWl4TlFVRk5MRzFGUVVGVE8wRkJRMlk3T3p0QlFVZEJPMEZCUTBFc01rTkJRVEpETEN0RVFVRnZRanM3UVVGRkwwUTdRVUZEUVN4RlFVRkZMREpFUVVGblFqdEJRVU5zUWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE96czdRVUZIU0R0QlFVTkJPenRCUVVWQk8wRkJRMEVzUTBGQlF5eEpPenM3T3pzN096czdPenM3UVVOc1JrUTdRVUZCUVR0QlFVRkJPMEZCUVRCQ08wRkJRekZDT3p0QlFVVkJPMEZCUTBFc2EwSkJRV3RDTERSRFFVRkxPMEZCUTNaQ08wRkJRMEU3TzBGQlJVRTdRVUZEUVN4clFrRkJhMElzTkVOQlFVczdRVUZEZGtJN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEd0Q1FVRnJRaXcwUTBGQlN5eFJRVUZSTEZGQlFWRXNSMEZCUnl4SFFVRkhPMEZCUXpkRE8wRkJRMEU3TzBGQlJXVXNaMFZCUVVNc2VVSkJRWGxDT3pzN096czdPenM3T3pzN08wRkRiRUo2UXp0QlFVRkJPMEZCUVdVN1FVRkRaanM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRU3huUWtGQlowSXNVVUZCVVR0QlFVTjRRanRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3haUVVGWk8wRkJRMW83UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096czdRVU12UWtFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWUE8wRkJRMUE3UVVGRFFUczdRVUZGVHp0QlFVTlFPMEZCUTBFN096czdPenM3T3pzN096czdRVU51UTBFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlEwODdRVUZEVUR0QlFVTkJPMEZCUTBFc2QwTkJRWGRETEZOQlFWTTdRVUZEYWtRN1FVRkRRVHM3UVVGRlFUdEJRVU5QTzBGQlExQXNiVUpCUVcxQ0xGTkJRVk03UVVGRE5VSXNaME5CUVdkRExGTkJRVk03UVVGRGVrTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5QTzBGQlExQTdRVUZEUVN4NVEwRkJlVU1zWTBGQll6dEJRVU4yUkR0QlFVTkJMSGREUVVGM1F5eGhRVUZoTzBGQlEzSkVPMEZCUTBFc2NVTkJRWEZETEdWQlFXVTdRVUZEY0VRc2JVTkJRVzFETEdsQ1FVRnBRanRCUVVOd1JEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKbE1qRTVaREptWVROaE0yVXhNVGMzWVRZNU15NXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlCY2RDOHZJRlJvWlNCdGIyUjFiR1VnWTJGamFHVmNiaUJjZEhaaGNpQnBibk4wWVd4c1pXUk5iMlIxYkdWeklEMGdlMzA3WEc1Y2JpQmNkQzh2SUZSb1pTQnlaWEYxYVhKbElHWjFibU4wYVc5dVhHNGdYSFJtZFc1amRHbHZiaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0cxdlpIVnNaVWxrS1NCN1hHNWNiaUJjZEZ4MEx5OGdRMmhsWTJzZ2FXWWdiVzlrZFd4bElHbHpJR2x1SUdOaFkyaGxYRzRnWEhSY2RHbG1LR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRLU0I3WEc0Z1hIUmNkRngwY21WMGRYSnVJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbVY0Y0c5eWRITTdYRzRnWEhSY2RIMWNiaUJjZEZ4MEx5OGdRM0psWVhSbElHRWdibVYzSUcxdlpIVnNaU0FvWVc1a0lIQjFkQ0JwZENCcGJuUnZJSFJvWlNCallXTm9aU2xjYmlCY2RGeDBkbUZ5SUcxdlpIVnNaU0E5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkSUQwZ2UxeHVJRngwWEhSY2RHazZJRzF2WkhWc1pVbGtMRnh1SUZ4MFhIUmNkR3c2SUdaaGJITmxMRnh1SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5WEc0Z1hIUmNkSDA3WEc1Y2JpQmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNGdYSFJjZEcxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1OaGJHd29iVzlrZFd4bExtVjRjRzl5ZEhNc0lHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzRnWEhSY2RDOHZJRVpzWVdjZ2RHaGxJRzF2WkhWc1pTQmhjeUJzYjJGa1pXUmNiaUJjZEZ4MGJXOWtkV3hsTG13Z1BTQjBjblZsTzF4dVhHNGdYSFJjZEM4dklGSmxkSFZ5YmlCMGFHVWdaWGh3YjNKMGN5QnZaaUIwYUdVZ2JXOWtkV3hsWEc0Z1hIUmNkSEpsZEhWeWJpQnRiMlIxYkdVdVpYaHdiM0owY3p0Y2JpQmNkSDFjYmx4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlhNZ2IySnFaV04wSUNoZlgzZGxZbkJoWTJ0ZmJXOWtkV3hsYzE5ZktWeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dElEMGdiVzlrZFd4bGN6dGNibHh1SUZ4MEx5OGdaWGh3YjNObElIUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1WXlBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNN1hHNWNiaUJjZEM4dklHUmxabWx1WlNCblpYUjBaWElnWm5WdVkzUnBiMjRnWm05eUlHaGhjbTF2Ym5rZ1pYaHdiM0owYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVrSUQwZ1puVnVZM1JwYjI0b1pYaHdiM0owY3l3Z2JtRnRaU3dnWjJWMGRHVnlLU0I3WEc0Z1hIUmNkR2xtS0NGZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtOG9aWGh3YjNKMGN5d2dibUZ0WlNrcElIdGNiaUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnYm1GdFpTd2dleUJsYm5WdFpYSmhZbXhsT2lCMGNuVmxMQ0JuWlhRNklHZGxkSFJsY2lCOUtUdGNiaUJjZEZ4MGZWeHVJRngwZlR0Y2JseHVJRngwTHk4Z1pHVm1hVzVsSUY5ZlpYTk5iMlIxYkdVZ2IyNGdaWGh3YjNKMGMxeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1eUlEMGdablZ1WTNScGIyNG9aWGh3YjNKMGN5a2dlMXh1SUZ4MFhIUnBaaWgwZVhCbGIyWWdVM2x0WW05c0lDRTlQU0FuZFc1a1pXWnBibVZrSnlBbUppQlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY3BJSHRjYmlCY2RGeDBYSFJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb1pYaHdiM0owY3l3Z1UzbHRZbTlzTG5SdlUzUnlhVzVuVkdGbkxDQjdJSFpoYkhWbE9pQW5UVzlrZFd4bEp5QjlLVHRjYmlCY2RGeDBmVnh1SUZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnSjE5ZlpYTk5iMlIxYkdVbkxDQjdJSFpoYkhWbE9pQjBjblZsSUgwcE8xeHVJRngwZlR0Y2JseHVJRngwTHk4Z1kzSmxZWFJsSUdFZ1ptRnJaU0J1WVcxbGMzQmhZMlVnYjJKcVpXTjBYRzRnWEhRdkx5QnRiMlJsSUNZZ01Ub2dkbUZzZFdVZ2FYTWdZU0J0YjJSMWJHVWdhV1FzSUhKbGNYVnBjbVVnYVhSY2JpQmNkQzh2SUcxdlpHVWdKaUF5T2lCdFpYSm5aU0JoYkd3Z2NISnZjR1Z5ZEdsbGN5QnZaaUIyWVd4MVpTQnBiblJ2SUhSb1pTQnVjMXh1SUZ4MEx5OGdiVzlrWlNBbUlEUTZJSEpsZEhWeWJpQjJZV3gxWlNCM2FHVnVJR0ZzY21WaFpIa2dibk1nYjJKcVpXTjBYRzRnWEhRdkx5QnRiMlJsSUNZZ09Id3hPaUJpWldoaGRtVWdiR2xyWlNCeVpYRjFhWEpsWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMblFnUFNCbWRXNWpkR2x2YmloMllXeDFaU3dnYlc5a1pTa2dlMXh1SUZ4MFhIUnBaaWh0YjJSbElDWWdNU2tnZG1Gc2RXVWdQU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0haaGJIVmxLVHRjYmlCY2RGeDBhV1lvYlc5a1pTQW1JRGdwSUhKbGRIVnliaUIyWVd4MVpUdGNiaUJjZEZ4MGFXWW9LRzF2WkdVZ0ppQTBLU0FtSmlCMGVYQmxiMllnZG1Gc2RXVWdQVDA5SUNkdlltcGxZM1FuSUNZbUlIWmhiSFZsSUNZbUlIWmhiSFZsTGw5ZlpYTk5iMlIxYkdVcElISmxkSFZ5YmlCMllXeDFaVHRjYmlCY2RGeDBkbUZ5SUc1eklEMGdUMkpxWldOMExtTnlaV0YwWlNodWRXeHNLVHRjYmlCY2RGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5S0c1ektUdGNiaUJjZEZ4MFQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLRzV6TENBblpHVm1ZWFZzZENjc0lIc2daVzUxYldWeVlXSnNaVG9nZEhKMVpTd2dkbUZzZFdVNklIWmhiSFZsSUgwcE8xeHVJRngwWEhScFppaHRiMlJsSUNZZ01pQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ0lUMGdKM04wY21sdVp5Y3BJR1p2Y2loMllYSWdhMlY1SUdsdUlIWmhiSFZsS1NCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9ibk1zSUd0bGVTd2dablZ1WTNScGIyNG9hMlY1S1NCN0lISmxkSFZ5YmlCMllXeDFaVnRyWlhsZE95QjlMbUpwYm1Rb2JuVnNiQ3dnYTJWNUtTazdYRzRnWEhSY2RISmxkSFZ5YmlCdWN6dGNiaUJjZEgwN1hHNWNiaUJjZEM4dklHZGxkRVJsWm1GMWJIUkZlSEJ2Y25RZ1puVnVZM1JwYjI0Z1ptOXlJR052YlhCaGRHbGlhV3hwZEhrZ2QybDBhQ0J1YjI0dGFHRnliVzl1ZVNCdGIyUjFiR1Z6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTRnUFNCbWRXNWpkR2x2YmlodGIyUjFiR1VwSUh0Y2JpQmNkRngwZG1GeUlHZGxkSFJsY2lBOUlHMXZaSFZzWlNBbUppQnRiMlIxYkdVdVgxOWxjMDF2WkhWc1pTQS9YRzRnWEhSY2RGeDBablZ1WTNScGIyNGdaMlYwUkdWbVlYVnNkQ2dwSUhzZ2NtVjBkWEp1SUcxdlpIVnNaVnNuWkdWbVlYVnNkQ2RkT3lCOUlEcGNiaUJjZEZ4MFhIUm1kVzVqZEdsdmJpQm5aWFJOYjJSMWJHVkZlSEJ2Y25SektDa2dleUJ5WlhSMWNtNGdiVzlrZFd4bE95QjlPMXh1SUZ4MFhIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFvWjJWMGRHVnlMQ0FuWVNjc0lHZGxkSFJsY2lrN1hHNGdYSFJjZEhKbGRIVnliaUJuWlhSMFpYSTdYRzRnWEhSOU8xeHVYRzRnWEhRdkx5QlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHeGNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJ5QTlJR1oxYm1OMGFXOXVLRzlpYW1WamRDd2djSEp2Y0dWeWRIa3BJSHNnY21WMGRYSnVJRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2h2WW1wbFkzUXNJSEJ5YjNCbGNuUjVLVHNnZlR0Y2JseHVJRngwTHk4Z1gxOTNaV0p3WVdOclgzQjFZbXhwWTE5d1lYUm9YMTljYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjQ0E5SUZ3aVhDSTdYRzVjYmx4dUlGeDBMeThnVEc5aFpDQmxiblJ5ZVNCdGIyUjFiR1VnWVc1a0lISmxkSFZ5YmlCbGVIQnZjblJ6WEc0Z1hIUnlaWFIxY200Z1gxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5aGZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbk1nUFNBd0tUdGNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk5c2FXSXZZWGhwYjNNbktUc2lMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZkWFJwYkhNbktUdGNiblpoY2lCelpYUjBiR1VnUFNCeVpYRjFhWEpsS0NjdUx5NHVMMk52Y21VdmMyVjBkR3hsSnlrN1hHNTJZWElnWTI5dmEybGxjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZhR1ZzY0dWeWN5OWpiMjlyYVdWekp5azdYRzUyWVhJZ1luVnBiR1JWVWt3Z1BTQnlaWEYxYVhKbEtDY3VMeTR1TDJobGJIQmxjbk12WW5WcGJHUlZVa3duS1R0Y2JuWmhjaUJpZFdsc1pFWjFiR3hRWVhSb0lEMGdjbVZ4ZFdseVpTZ25MaTR2WTI5eVpTOWlkV2xzWkVaMWJHeFFZWFJvSnlrN1hHNTJZWElnY0dGeWMyVklaV0ZrWlhKeklEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5b1pXeHdaWEp6TDNCaGNuTmxTR1ZoWkdWeWN5Y3BPMXh1ZG1GeUlHbHpWVkpNVTJGdFpVOXlhV2RwYmlBOUlISmxjWFZwY21Vb0p5NHZMaTR2YUdWc2NHVnljeTlwYzFWU1RGTmhiV1ZQY21sbmFXNG5LVHRjYm5aaGNpQmpjbVZoZEdWRmNuSnZjaUE5SUhKbGNYVnBjbVVvSnk0dUwyTnZjbVV2WTNKbFlYUmxSWEp5YjNJbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUI0YUhKQlpHRndkR1Z5S0dOdmJtWnBaeWtnZTF4dUlDQnlaWFIxY200Z2JtVjNJRkJ5YjIxcGMyVW9ablZ1WTNScGIyNGdaR2x6Y0dGMFkyaFlhSEpTWlhGMVpYTjBLSEpsYzI5c2RtVXNJSEpsYW1WamRDa2dlMXh1SUNBZ0lIWmhjaUJ5WlhGMVpYTjBSR0YwWVNBOUlHTnZibVpwWnk1a1lYUmhPMXh1SUNBZ0lIWmhjaUJ5WlhGMVpYTjBTR1ZoWkdWeWN5QTlJR052Ym1acFp5NW9aV0ZrWlhKek8xeHVYRzRnSUNBZ2FXWWdLSFYwYVd4ekxtbHpSbTl5YlVSaGRHRW9jbVZ4ZFdWemRFUmhkR0VwS1NCN1hHNGdJQ0FnSUNCa1pXeGxkR1VnY21WeGRXVnpkRWhsWVdSbGNuTmJKME52Ym5SbGJuUXRWSGx3WlNkZE95QXZMeUJNWlhRZ2RHaGxJR0p5YjNkelpYSWdjMlYwSUdsMFhHNGdJQ0FnZlZ4dVhHNGdJQ0FnZG1GeUlISmxjWFZsYzNRZ1BTQnVaWGNnV0UxTVNIUjBjRkpsY1hWbGMzUW9LVHRjYmx4dUlDQWdJQzh2SUVoVVZGQWdZbUZ6YVdNZ1lYVjBhR1Z1ZEdsallYUnBiMjVjYmlBZ0lDQnBaaUFvWTI5dVptbG5MbUYxZEdncElIdGNiaUFnSUNBZ0lIWmhjaUIxYzJWeWJtRnRaU0E5SUdOdmJtWnBaeTVoZFhSb0xuVnpaWEp1WVcxbElIeDhJQ2NuTzF4dUlDQWdJQ0FnZG1GeUlIQmhjM04zYjNKa0lEMGdZMjl1Wm1sbkxtRjFkR2d1Y0dGemMzZHZjbVFnUHlCMWJtVnpZMkZ3WlNobGJtTnZaR1ZWVWtsRGIyMXdiMjVsYm5Rb1kyOXVabWxuTG1GMWRHZ3VjR0Z6YzNkdmNtUXBLU0E2SUNjbk8xeHVJQ0FnSUNBZ2NtVnhkV1Z6ZEVobFlXUmxjbk11UVhWMGFHOXlhWHBoZEdsdmJpQTlJQ2RDWVhOcFl5QW5JQ3NnWW5SdllTaDFjMlZ5Ym1GdFpTQXJJQ2M2SnlBcklIQmhjM04zYjNKa0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdablZzYkZCaGRHZ2dQU0JpZFdsc1pFWjFiR3hRWVhSb0tHTnZibVpwWnk1aVlYTmxWVkpNTENCamIyNW1hV2N1ZFhKc0tUdGNiaUFnSUNCeVpYRjFaWE4wTG05d1pXNG9ZMjl1Wm1sbkxtMWxkR2h2WkM1MGIxVndjR1Z5UTJGelpTZ3BMQ0JpZFdsc1pGVlNUQ2htZFd4c1VHRjBhQ3dnWTI5dVptbG5MbkJoY21GdGN5d2dZMjl1Wm1sbkxuQmhjbUZ0YzFObGNtbGhiR2w2WlhJcExDQjBjblZsS1R0Y2JseHVJQ0FnSUM4dklGTmxkQ0IwYUdVZ2NtVnhkV1Z6ZENCMGFXMWxiM1YwSUdsdUlFMVRYRzRnSUNBZ2NtVnhkV1Z6ZEM1MGFXMWxiM1YwSUQwZ1kyOXVabWxuTG5ScGJXVnZkWFE3WEc1Y2JpQWdJQ0F2THlCTWFYTjBaVzRnWm05eUlISmxZV1I1SUhOMFlYUmxYRzRnSUNBZ2NtVnhkV1Z6ZEM1dmJuSmxZV1I1YzNSaGRHVmphR0Z1WjJVZ1BTQm1kVzVqZEdsdmJpQm9ZVzVrYkdWTWIyRmtLQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tDRnlaWEYxWlhOMElIeDhJSEpsY1hWbGMzUXVjbVZoWkhsVGRHRjBaU0FoUFQwZ05Da2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQzh2SUZSb1pTQnlaWEYxWlhOMElHVnljbTl5WldRZ2IzVjBJR0Z1WkNCM1pTQmthV1J1SjNRZ1oyVjBJR0VnY21WemNHOXVjMlVzSUhSb2FYTWdkMmxzYkNCaVpWeHVJQ0FnSUNBZ0x5OGdhR0Z1Wkd4bFpDQmllU0J2Ym1WeWNtOXlJR2x1YzNSbFlXUmNiaUFnSUNBZ0lDOHZJRmRwZEdnZ2IyNWxJR1Y0WTJWd2RHbHZiam9nY21WeGRXVnpkQ0IwYUdGMElIVnphVzVuSUdacGJHVTZJSEJ5YjNSdlkyOXNMQ0J0YjNOMElHSnliM2R6WlhKelhHNGdJQ0FnSUNBdkx5QjNhV3hzSUhKbGRIVnliaUJ6ZEdGMGRYTWdZWE1nTUNCbGRtVnVJSFJvYjNWbmFDQnBkQ2R6SUdFZ2MzVmpZMlZ6YzJaMWJDQnlaWEYxWlhOMFhHNGdJQ0FnSUNCcFppQW9jbVZ4ZFdWemRDNXpkR0YwZFhNZ1BUMDlJREFnSmlZZ0lTaHlaWEYxWlhOMExuSmxjM0J2Ym5ObFZWSk1JQ1ltSUhKbGNYVmxjM1F1Y21WemNHOXVjMlZWVWt3dWFXNWtaWGhQWmlnblptbHNaVG9uS1NBOVBUMGdNQ2twSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBdkx5QlFjbVZ3WVhKbElIUm9aU0J5WlhOd2IyNXpaVnh1SUNBZ0lDQWdkbUZ5SUhKbGMzQnZibk5sU0dWaFpHVnljeUE5SUNkblpYUkJiR3hTWlhOd2IyNXpaVWhsWVdSbGNuTW5JR2x1SUhKbGNYVmxjM1FnUHlCd1lYSnpaVWhsWVdSbGNuTW9jbVZ4ZFdWemRDNW5aWFJCYkd4U1pYTndiMjV6WlVobFlXUmxjbk1vS1NrZ09pQnVkV3hzTzF4dUlDQWdJQ0FnZG1GeUlISmxjM0J2Ym5ObFJHRjBZU0E5SUNGamIyNW1hV2N1Y21WemNHOXVjMlZVZVhCbElIeDhJR052Ym1acFp5NXlaWE53YjI1elpWUjVjR1VnUFQwOUlDZDBaWGgwSnlBL0lISmxjWFZsYzNRdWNtVnpjRzl1YzJWVVpYaDBJRG9nY21WeGRXVnpkQzV5WlhOd2IyNXpaVHRjYmlBZ0lDQWdJSFpoY2lCeVpYTndiMjV6WlNBOUlIdGNiaUFnSUNBZ0lDQWdaR0YwWVRvZ2NtVnpjRzl1YzJWRVlYUmhMRnh1SUNBZ0lDQWdJQ0J6ZEdGMGRYTTZJSEpsY1hWbGMzUXVjM1JoZEhWekxGeHVJQ0FnSUNBZ0lDQnpkR0YwZFhOVVpYaDBPaUJ5WlhGMVpYTjBMbk4wWVhSMWMxUmxlSFFzWEc0Z0lDQWdJQ0FnSUdobFlXUmxjbk02SUhKbGMzQnZibk5sU0dWaFpHVnljeXhjYmlBZ0lDQWdJQ0FnWTI5dVptbG5PaUJqYjI1bWFXY3NYRzRnSUNBZ0lDQWdJSEpsY1hWbGMzUTZJSEpsY1hWbGMzUmNiaUFnSUNBZ0lIMDdYRzVjYmlBZ0lDQWdJSE5sZEhSc1pTaHlaWE52YkhabExDQnlaV3BsWTNRc0lISmxjM0J2Ym5ObEtUdGNibHh1SUNBZ0lDQWdMeThnUTJ4bFlXNGdkWEFnY21WeGRXVnpkRnh1SUNBZ0lDQWdjbVZ4ZFdWemRDQTlJRzUxYkd3N1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4dklFaGhibVJzWlNCaWNtOTNjMlZ5SUhKbGNYVmxjM1FnWTJGdVkyVnNiR0YwYVc5dUlDaGhjeUJ2Y0hCdmMyVmtJSFJ2SUdFZ2JXRnVkV0ZzSUdOaGJtTmxiR3hoZEdsdmJpbGNiaUFnSUNCeVpYRjFaWE4wTG05dVlXSnZjblFnUFNCbWRXNWpkR2x2YmlCb1lXNWtiR1ZCWW05eWRDZ3BJSHRjYmlBZ0lDQWdJR2xtSUNnaGNtVnhkV1Z6ZENrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxhbVZqZENoamNtVmhkR1ZGY25KdmNpZ25VbVZ4ZFdWemRDQmhZbTl5ZEdWa0p5d2dZMjl1Wm1sbkxDQW5SVU5QVGs1QlFrOVNWRVZFSnl3Z2NtVnhkV1Z6ZENrcE8xeHVYRzRnSUNBZ0lDQXZMeUJEYkdWaGJpQjFjQ0J5WlhGMVpYTjBYRzRnSUNBZ0lDQnlaWEYxWlhOMElEMGdiblZzYkR0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnTHk4Z1NHRnVaR3hsSUd4dmR5QnNaWFpsYkNCdVpYUjNiM0pySUdWeWNtOXljMXh1SUNBZ0lISmxjWFZsYzNRdWIyNWxjbkp2Y2lBOUlHWjFibU4wYVc5dUlHaGhibVJzWlVWeWNtOXlLQ2tnZTF4dUlDQWdJQ0FnTHk4Z1VtVmhiQ0JsY25KdmNuTWdZWEpsSUdocFpHUmxiaUJtY205dElIVnpJR0o1SUhSb1pTQmljbTkzYzJWeVhHNGdJQ0FnSUNBdkx5QnZibVZ5Y205eUlITm9iM1ZzWkNCdmJteDVJR1pwY21VZ2FXWWdhWFFuY3lCaElHNWxkSGR2Y21zZ1pYSnliM0pjYmlBZ0lDQWdJSEpsYW1WamRDaGpjbVZoZEdWRmNuSnZjaWduVG1WMGQyOXlheUJGY25KdmNpY3NJR052Ym1acFp5d2diblZzYkN3Z2NtVnhkV1Z6ZENrcE8xeHVYRzRnSUNBZ0lDQXZMeUJEYkdWaGJpQjFjQ0J5WlhGMVpYTjBYRzRnSUNBZ0lDQnlaWEYxWlhOMElEMGdiblZzYkR0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnTHk4Z1NHRnVaR3hsSUhScGJXVnZkWFJjYmlBZ0lDQnlaWEYxWlhOMExtOXVkR2x0Wlc5MWRDQTlJR1oxYm1OMGFXOXVJR2hoYm1Sc1pWUnBiV1Z2ZFhRb0tTQjdYRzRnSUNBZ0lDQjJZWElnZEdsdFpXOTFkRVZ5Y205eVRXVnpjMkZuWlNBOUlDZDBhVzFsYjNWMElHOW1JQ2NnS3lCamIyNW1hV2N1ZEdsdFpXOTFkQ0FySUNkdGN5QmxlR05sWldSbFpDYzdYRzRnSUNBZ0lDQnBaaUFvWTI5dVptbG5MblJwYldWdmRYUkZjbkp2Y2sxbGMzTmhaMlVwSUh0Y2JpQWdJQ0FnSUNBZ2RHbHRaVzkxZEVWeWNtOXlUV1Z6YzJGblpTQTlJR052Ym1acFp5NTBhVzFsYjNWMFJYSnliM0pOWlhOellXZGxPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdjbVZxWldOMEtHTnlaV0YwWlVWeWNtOXlLSFJwYldWdmRYUkZjbkp2Y2sxbGMzTmhaMlVzSUdOdmJtWnBaeXdnSjBWRFQwNU9RVUpQVWxSRlJDY3NYRzRnSUNBZ0lDQWdJSEpsY1hWbGMzUXBLVHRjYmx4dUlDQWdJQ0FnTHk4Z1EyeGxZVzRnZFhBZ2NtVnhkV1Z6ZEZ4dUlDQWdJQ0FnY21WeGRXVnpkQ0E5SUc1MWJHdzdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHZJRUZrWkNCNGMzSm1JR2hsWVdSbGNseHVJQ0FnSUM4dklGUm9hWE1nYVhNZ2IyNXNlU0JrYjI1bElHbG1JSEoxYm01cGJtY2dhVzRnWVNCemRHRnVaR0Z5WkNCaWNtOTNjMlZ5SUdWdWRtbHliMjV0Wlc1MExseHVJQ0FnSUM4dklGTndaV05wWm1sallXeHNlU0J1YjNRZ2FXWWdkMlVuY21VZ2FXNGdZU0IzWldJZ2QyOXlhMlZ5TENCdmNpQnlaV0ZqZEMxdVlYUnBkbVV1WEc0Z0lDQWdhV1lnS0hWMGFXeHpMbWx6VTNSaGJtUmhjbVJDY205M2MyVnlSVzUyS0NrcElIdGNiaUFnSUNBZ0lDOHZJRUZrWkNCNGMzSm1JR2hsWVdSbGNseHVJQ0FnSUNBZ2RtRnlJSGh6Y21aV1lXeDFaU0E5SUNoamIyNW1hV2N1ZDJsMGFFTnlaV1JsYm5ScFlXeHpJSHg4SUdselZWSk1VMkZ0WlU5eWFXZHBiaWhtZFd4c1VHRjBhQ2twSUNZbUlHTnZibVpwWnk1NGMzSm1RMjl2YTJsbFRtRnRaU0EvWEc0Z0lDQWdJQ0FnSUdOdmIydHBaWE11Y21WaFpDaGpiMjVtYVdjdWVITnlaa052YjJ0cFpVNWhiV1VwSURwY2JpQWdJQ0FnSUNBZ2RXNWtaV1pwYm1Wa08xeHVYRzRnSUNBZ0lDQnBaaUFvZUhOeVpsWmhiSFZsS1NCN1hHNGdJQ0FnSUNBZ0lISmxjWFZsYzNSSVpXRmtaWEp6VzJOdmJtWnBaeTU0YzNKbVNHVmhaR1Z5VG1GdFpWMGdQU0I0YzNKbVZtRnNkV1U3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnUVdSa0lHaGxZV1JsY25NZ2RHOGdkR2hsSUhKbGNYVmxjM1JjYmlBZ0lDQnBaaUFvSjNObGRGSmxjWFZsYzNSSVpXRmtaWEluSUdsdUlISmxjWFZsYzNRcElIdGNiaUFnSUNBZ0lIVjBhV3h6TG1admNrVmhZMmdvY21WeGRXVnpkRWhsWVdSbGNuTXNJR1oxYm1OMGFXOXVJSE5sZEZKbGNYVmxjM1JJWldGa1pYSW9kbUZzTENCclpYa3BJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCeVpYRjFaWE4wUkdGMFlTQTlQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdhMlY1TG5SdlRHOTNaWEpEWVhObEtDa2dQVDA5SUNkamIyNTBaVzUwTFhSNWNHVW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdVbVZ0YjNabElFTnZiblJsYm5RdFZIbHdaU0JwWmlCa1lYUmhJR2x6SUhWdVpHVm1hVzVsWkZ4dUlDQWdJQ0FnSUNBZ0lHUmxiR1YwWlNCeVpYRjFaWE4wU0dWaFpHVnljMXRyWlhsZE8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQzh2SUU5MGFHVnlkMmx6WlNCaFpHUWdhR1ZoWkdWeUlIUnZJSFJvWlNCeVpYRjFaWE4wWEc0Z0lDQWdJQ0FnSUNBZ2NtVnhkV1Z6ZEM1elpYUlNaWEYxWlhOMFNHVmhaR1Z5S0d0bGVTd2dkbUZzS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdRV1JrSUhkcGRHaERjbVZrWlc1MGFXRnNjeUIwYnlCeVpYRjFaWE4wSUdsbUlHNWxaV1JsWkZ4dUlDQWdJR2xtSUNnaGRYUnBiSE11YVhOVmJtUmxabWx1WldRb1kyOXVabWxuTG5kcGRHaERjbVZrWlc1MGFXRnNjeWtwSUh0Y2JpQWdJQ0FnSUhKbGNYVmxjM1F1ZDJsMGFFTnlaV1JsYm5ScFlXeHpJRDBnSVNGamIyNW1hV2N1ZDJsMGFFTnlaV1JsYm5ScFlXeHpPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRUZrWkNCeVpYTndiMjV6WlZSNWNHVWdkRzhnY21WeGRXVnpkQ0JwWmlCdVpXVmtaV1JjYmlBZ0lDQnBaaUFvWTI5dVptbG5MbkpsYzNCdmJuTmxWSGx3WlNrZ2UxeHVJQ0FnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnY21WeGRXVnpkQzV5WlhOd2IyNXpaVlI1Y0dVZ1BTQmpiMjVtYVdjdWNtVnpjRzl1YzJWVWVYQmxPMXh1SUNBZ0lDQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJQ0FnSUNBdkx5QkZlSEJsWTNSbFpDQkVUMDFGZUdObGNIUnBiMjRnZEdoeWIzZHVJR0o1SUdKeWIzZHpaWEp6SUc1dmRDQmpiMjF3WVhScFlteGxJRmhOVEVoMGRIQlNaWEYxWlhOMElFeGxkbVZzSURJdVhHNGdJQ0FnSUNBZ0lDOHZJRUoxZEN3Z2RHaHBjeUJqWVc0Z1ltVWdjM1Z3Y0hKbGMzTmxaQ0JtYjNJZ0oycHpiMjRuSUhSNWNHVWdZWE1nYVhRZ1kyRnVJR0psSUhCaGNuTmxaQ0JpZVNCa1pXWmhkV3gwSUNkMGNtRnVjMlp2Y20xU1pYTndiMjV6WlNjZ1puVnVZM1JwYjI0dVhHNGdJQ0FnSUNBZ0lHbG1JQ2hqYjI1bWFXY3VjbVZ6Y0c5dWMyVlVlWEJsSUNFOVBTQW5hbk52YmljcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUhKdmR5QmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnU0dGdVpHeGxJSEJ5YjJkeVpYTnpJR2xtSUc1bFpXUmxaRnh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdZMjl1Wm1sbkxtOXVSRzkzYm14dllXUlFjbTluY21WemN5QTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2NtVnhkV1Z6ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0Nkd2NtOW5jbVZ6Y3ljc0lHTnZibVpwWnk1dmJrUnZkMjVzYjJGa1VISnZaM0psYzNNcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklFNXZkQ0JoYkd3Z1luSnZkM05sY25NZ2MzVndjRzl5ZENCMWNHeHZZV1FnWlhabGJuUnpYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQmpiMjVtYVdjdWIyNVZjR3h2WVdSUWNtOW5jbVZ6Y3lBOVBUMGdKMloxYm1OMGFXOXVKeUFtSmlCeVpYRjFaWE4wTG5Wd2JHOWhaQ2tnZTF4dUlDQWdJQ0FnY21WeGRXVnpkQzUxY0d4dllXUXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jSEp2WjNKbGMzTW5MQ0JqYjI1bWFXY3ViMjVWY0d4dllXUlFjbTluY21WemN5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR052Ym1acFp5NWpZVzVqWld4VWIydGxiaWtnZTF4dUlDQWdJQ0FnTHk4Z1NHRnVaR3hsSUdOaGJtTmxiR3hoZEdsdmJseHVJQ0FnSUNBZ1kyOXVabWxuTG1OaGJtTmxiRlJ2YTJWdUxuQnliMjFwYzJVdWRHaGxiaWhtZFc1amRHbHZiaUJ2YmtOaGJtTmxiR1ZrS0dOaGJtTmxiQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9JWEpsY1hWbGMzUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQnlaWEYxWlhOMExtRmliM0owS0NrN1hHNGdJQ0FnSUNBZ0lISmxhbVZqZENoallXNWpaV3dwTzF4dUlDQWdJQ0FnSUNBdkx5QkRiR1ZoYmlCMWNDQnlaWEYxWlhOMFhHNGdJQ0FnSUNBZ0lISmxjWFZsYzNRZ1BTQnVkV3hzTzF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tDRnlaWEYxWlhOMFJHRjBZU2tnZTF4dUlDQWdJQ0FnY21WeGRXVnpkRVJoZEdFZ1BTQnVkV3hzTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUZObGJtUWdkR2hsSUhKbGNYVmxjM1JjYmlBZ0lDQnlaWEYxWlhOMExuTmxibVFvY21WeGRXVnpkRVJoZEdFcE8xeHVJQ0I5S1R0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQjFkR2xzY3lBOUlISmxjWFZwY21Vb0p5NHZkWFJwYkhNbktUdGNiblpoY2lCaWFXNWtJRDBnY21WeGRXbHlaU2duTGk5b1pXeHdaWEp6TDJKcGJtUW5LVHRjYm5aaGNpQkJlR2x2Y3lBOUlISmxjWFZwY21Vb0p5NHZZMjl5WlM5QmVHbHZjeWNwTzF4dWRtRnlJRzFsY21kbFEyOXVabWxuSUQwZ2NtVnhkV2x5WlNnbkxpOWpiM0psTDIxbGNtZGxRMjl1Wm1sbkp5azdYRzUyWVhJZ1pHVm1ZWFZzZEhNZ1BTQnlaWEYxYVhKbEtDY3VMMlJsWm1GMWJIUnpKeWs3WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsSUdGdUlHbHVjM1JoYm1ObElHOW1JRUY0YVc5elhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdSbFptRjFiSFJEYjI1bWFXY2dWR2hsSUdSbFptRjFiSFFnWTI5dVptbG5JR1p2Y2lCMGFHVWdhVzV6ZEdGdVkyVmNiaUFxSUVCeVpYUjFjbTRnZTBGNGFXOXpmU0JCSUc1bGR5QnBibk4wWVc1alpTQnZaaUJCZUdsdmMxeHVJQ292WEc1bWRXNWpkR2x2YmlCamNtVmhkR1ZKYm5OMFlXNWpaU2hrWldaaGRXeDBRMjl1Wm1sbktTQjdYRzRnSUhaaGNpQmpiMjUwWlhoMElEMGdibVYzSUVGNGFXOXpLR1JsWm1GMWJIUkRiMjVtYVdjcE8xeHVJQ0IyWVhJZ2FXNXpkR0Z1WTJVZ1BTQmlhVzVrS0VGNGFXOXpMbkJ5YjNSdmRIbHdaUzV5WlhGMVpYTjBMQ0JqYjI1MFpYaDBLVHRjYmx4dUlDQXZMeUJEYjNCNUlHRjRhVzl6TG5CeWIzUnZkSGx3WlNCMGJ5QnBibk4wWVc1alpWeHVJQ0IxZEdsc2N5NWxlSFJsYm1Rb2FXNXpkR0Z1WTJVc0lFRjRhVzl6TG5CeWIzUnZkSGx3WlN3Z1kyOXVkR1Y0ZENrN1hHNWNiaUFnTHk4Z1EyOXdlU0JqYjI1MFpYaDBJSFJ2SUdsdWMzUmhibU5sWEc0Z0lIVjBhV3h6TG1WNGRHVnVaQ2hwYm5OMFlXNWpaU3dnWTI5dWRHVjRkQ2s3WEc1Y2JpQWdjbVYwZFhKdUlHbHVjM1JoYm1ObE8xeHVmVnh1WEc0dkx5QkRjbVZoZEdVZ2RHaGxJR1JsWm1GMWJIUWdhVzV6ZEdGdVkyVWdkRzhnWW1VZ1pYaHdiM0owWldSY2JuWmhjaUJoZUdsdmN5QTlJR055WldGMFpVbHVjM1JoYm1ObEtHUmxabUYxYkhSektUdGNibHh1THk4Z1JYaHdiM05sSUVGNGFXOXpJR05zWVhOeklIUnZJR0ZzYkc5M0lHTnNZWE56SUdsdWFHVnlhWFJoYm1ObFhHNWhlR2x2Y3k1QmVHbHZjeUE5SUVGNGFXOXpPMXh1WEc0dkx5QkdZV04wYjNKNUlHWnZjaUJqY21WaGRHbHVaeUJ1WlhjZ2FXNXpkR0Z1WTJWelhHNWhlR2x2Y3k1amNtVmhkR1VnUFNCbWRXNWpkR2x2YmlCamNtVmhkR1VvYVc1emRHRnVZMlZEYjI1bWFXY3BJSHRjYmlBZ2NtVjBkWEp1SUdOeVpXRjBaVWx1YzNSaGJtTmxLRzFsY21kbFEyOXVabWxuS0dGNGFXOXpMbVJsWm1GMWJIUnpMQ0JwYm5OMFlXNWpaVU52Ym1acFp5a3BPMXh1ZlR0Y2JseHVMeThnUlhod2IzTmxJRU5oYm1ObGJDQW1JRU5oYm1ObGJGUnZhMlZ1WEc1aGVHbHZjeTVEWVc1alpXd2dQU0J5WlhGMWFYSmxLQ2N1TDJOaGJtTmxiQzlEWVc1alpXd25LVHRjYm1GNGFXOXpMa05oYm1ObGJGUnZhMlZ1SUQwZ2NtVnhkV2x5WlNnbkxpOWpZVzVqWld3dlEyRnVZMlZzVkc5clpXNG5LVHRjYm1GNGFXOXpMbWx6UTJGdVkyVnNJRDBnY21WeGRXbHlaU2duTGk5allXNWpaV3d2YVhORFlXNWpaV3duS1R0Y2JseHVMeThnUlhod2IzTmxJR0ZzYkM5emNISmxZV1JjYm1GNGFXOXpMbUZzYkNBOUlHWjFibU4wYVc5dUlHRnNiQ2h3Y205dGFYTmxjeWtnZTF4dUlDQnlaWFIxY200Z1VISnZiV2x6WlM1aGJHd29jSEp2YldselpYTXBPMXh1ZlR0Y2JtRjRhVzl6TG5Od2NtVmhaQ0E5SUhKbGNYVnBjbVVvSnk0dmFHVnNjR1Z5Y3k5emNISmxZV1FuS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmhlR2x2Y3p0Y2JseHVMeThnUVd4c2IzY2dkWE5sSUc5bUlHUmxabUYxYkhRZ2FXMXdiM0owSUhONWJuUmhlQ0JwYmlCVWVYQmxVMk55YVhCMFhHNXRiMlIxYkdVdVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1lYaHBiM003WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1FTQmdRMkZ1WTJWc1lDQnBjeUJoYmlCdlltcGxZM1FnZEdoaGRDQnBjeUIwYUhKdmQyNGdkMmhsYmlCaGJpQnZjR1Z5WVhScGIyNGdhWE1nWTJGdVkyVnNaV1F1WEc0Z0tseHVJQ29nUUdOc1lYTnpYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaejE5SUcxbGMzTmhaMlVnVkdobElHMWxjM05oWjJVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUVOaGJtTmxiQ2h0WlhOellXZGxLU0I3WEc0Z0lIUm9hWE11YldWemMyRm5aU0E5SUcxbGMzTmhaMlU3WEc1OVhHNWNia05oYm1ObGJDNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY2dQU0JtZFc1amRHbHZiaUIwYjFOMGNtbHVaeWdwSUh0Y2JpQWdjbVYwZFhKdUlDZERZVzVqWld3bklDc2dLSFJvYVhNdWJXVnpjMkZuWlNBL0lDYzZJQ2NnS3lCMGFHbHpMbTFsYzNOaFoyVWdPaUFuSnlrN1hHNTlPMXh1WEc1RFlXNWpaV3d1Y0hKdmRHOTBlWEJsTGw5ZlEwRk9RMFZNWDE4Z1BTQjBjblZsTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFTmhibU5sYkR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUVOaGJtTmxiQ0E5SUhKbGNYVnBjbVVvSnk0dlEyRnVZMlZzSnlrN1hHNWNiaThxS2x4dUlDb2dRU0JnUTJGdVkyVnNWRzlyWlc1Z0lHbHpJR0Z1SUc5aWFtVmpkQ0IwYUdGMElHTmhiaUJpWlNCMWMyVmtJSFJ2SUhKbGNYVmxjM1FnWTJGdVkyVnNiR0YwYVc5dUlHOW1JR0Z1SUc5d1pYSmhkR2x2Ymk1Y2JpQXFYRzRnS2lCQVkyeGhjM05jYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHVjRaV04xZEc5eUlGUm9aU0JsZUdWamRYUnZjaUJtZFc1amRHbHZiaTVjYmlBcUwxeHVablZ1WTNScGIyNGdRMkZ1WTJWc1ZHOXJaVzRvWlhobFkzVjBiM0lwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJsZUdWamRYUnZjaUFoUFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMlY0WldOMWRHOXlJRzExYzNRZ1ltVWdZU0JtZFc1amRHbHZiaTRuS1R0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJ5WlhOdmJIWmxVSEp2YldselpUdGNiaUFnZEdocGN5NXdjbTl0YVhObElEMGdibVYzSUZCeWIyMXBjMlVvWm5WdVkzUnBiMjRnY0hKdmJXbHpaVVY0WldOMWRHOXlLSEpsYzI5c2RtVXBJSHRjYmlBZ0lDQnlaWE52YkhabFVISnZiV2x6WlNBOUlISmxjMjlzZG1VN1hHNGdJSDBwTzF4dVhHNGdJSFpoY2lCMGIydGxiaUE5SUhSb2FYTTdYRzRnSUdWNFpXTjFkRzl5S0daMWJtTjBhVzl1SUdOaGJtTmxiQ2h0WlhOellXZGxLU0I3WEc0Z0lDQWdhV1lnS0hSdmEyVnVMbkpsWVhOdmJpa2dlMXh1SUNBZ0lDQWdMeThnUTJGdVkyVnNiR0YwYVc5dUlHaGhjeUJoYkhKbFlXUjVJR0psWlc0Z2NtVnhkV1Z6ZEdWa1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkRzlyWlc0dWNtVmhjMjl1SUQwZ2JtVjNJRU5oYm1ObGJDaHRaWE56WVdkbEtUdGNiaUFnSUNCeVpYTnZiSFpsVUhKdmJXbHpaU2gwYjJ0bGJpNXlaV0Z6YjI0cE8xeHVJQ0I5S1R0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUhKdmQzTWdZU0JnUTJGdVkyVnNZQ0JwWmlCallXNWpaV3hzWVhScGIyNGdhR0Z6SUdKbFpXNGdjbVZ4ZFdWemRHVmtMbHh1SUNvdlhHNURZVzVqWld4VWIydGxiaTV3Y205MGIzUjVjR1V1ZEdoeWIzZEpabEpsY1hWbGMzUmxaQ0E5SUdaMWJtTjBhVzl1SUhSb2NtOTNTV1pTWlhGMVpYTjBaV1FvS1NCN1hHNGdJR2xtSUNoMGFHbHpMbkpsWVhOdmJpa2dlMXh1SUNBZ0lIUm9jbTkzSUhSb2FYTXVjbVZoYzI5dU8xeHVJQ0I5WEc1OU8xeHVYRzR2S2lwY2JpQXFJRkpsZEhWeWJuTWdZVzRnYjJKcVpXTjBJSFJvWVhRZ1kyOXVkR0ZwYm5NZ1lTQnVaWGNnWUVOaGJtTmxiRlJ2YTJWdVlDQmhibVFnWVNCbWRXNWpkR2x2YmlCMGFHRjBMQ0IzYUdWdUlHTmhiR3hsWkN4Y2JpQXFJR05oYm1ObGJITWdkR2hsSUdCRFlXNWpaV3hVYjJ0bGJtQXVYRzRnS2k5Y2JrTmhibU5sYkZSdmEyVnVMbk52ZFhKalpTQTlJR1oxYm1OMGFXOXVJSE52ZFhKalpTZ3BJSHRjYmlBZ2RtRnlJR05oYm1ObGJEdGNiaUFnZG1GeUlIUnZhMlZ1SUQwZ2JtVjNJRU5oYm1ObGJGUnZhMlZ1S0daMWJtTjBhVzl1SUdWNFpXTjFkRzl5S0dNcElIdGNiaUFnSUNCallXNWpaV3dnUFNCak8xeHVJQ0I5S1R0Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCMGIydGxiam9nZEc5clpXNHNYRzRnSUNBZ1kyRnVZMlZzT2lCallXNWpaV3hjYmlBZ2ZUdGNibjA3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1EyRnVZMlZzVkc5clpXNDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnYVhORFlXNWpaV3dvZG1Gc2RXVXBJSHRjYmlBZ2NtVjBkWEp1SUNFaEtIWmhiSFZsSUNZbUlIWmhiSFZsTGw5ZlEwRk9RMFZNWDE4cE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5MWRHbHNjeWNwTzF4dWRtRnlJR0oxYVd4a1ZWSk1JRDBnY21WeGRXbHlaU2duTGk0dmFHVnNjR1Z5Y3k5aWRXbHNaRlZTVENjcE8xeHVkbUZ5SUVsdWRHVnlZMlZ3ZEc5eVRXRnVZV2RsY2lBOUlISmxjWFZwY21Vb0p5NHZTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlKeWs3WEc1MllYSWdaR2x6Y0dGMFkyaFNaWEYxWlhOMElEMGdjbVZ4ZFdseVpTZ25MaTlrYVhOd1lYUmphRkpsY1hWbGMzUW5LVHRjYm5aaGNpQnRaWEpuWlVOdmJtWnBaeUE5SUhKbGNYVnBjbVVvSnk0dmJXVnlaMlZEYjI1bWFXY25LVHRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1VnWVNCdVpYY2dhVzV6ZEdGdVkyVWdiMllnUVhocGIzTmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2FXNXpkR0Z1WTJWRGIyNW1hV2NnVkdobElHUmxabUYxYkhRZ1kyOXVabWxuSUdadmNpQjBhR1VnYVc1emRHRnVZMlZjYmlBcUwxeHVablZ1WTNScGIyNGdRWGhwYjNNb2FXNXpkR0Z1WTJWRGIyNW1hV2NwSUh0Y2JpQWdkR2hwY3k1a1pXWmhkV3gwY3lBOUlHbHVjM1JoYm1ObFEyOXVabWxuTzF4dUlDQjBhR2x6TG1sdWRHVnlZMlZ3ZEc5eWN5QTlJSHRjYmlBZ0lDQnlaWEYxWlhOME9pQnVaWGNnU1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5S0Nrc1hHNGdJQ0FnY21WemNHOXVjMlU2SUc1bGR5QkpiblJsY21ObGNIUnZjazFoYm1GblpYSW9LVnh1SUNCOU8xeHVmVnh1WEc0dktpcGNiaUFxSUVScGMzQmhkR05vSUdFZ2NtVnhkV1Z6ZEZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JqYjI1bWFXY2dWR2hsSUdOdmJtWnBaeUJ6Y0dWamFXWnBZeUJtYjNJZ2RHaHBjeUJ5WlhGMVpYTjBJQ2h0WlhKblpXUWdkMmwwYUNCMGFHbHpMbVJsWm1GMWJIUnpLVnh1SUNvdlhHNUJlR2x2Y3k1d2NtOTBiM1I1Y0dVdWNtVnhkV1Z6ZENBOUlHWjFibU4wYVc5dUlISmxjWFZsYzNRb1kyOXVabWxuS1NCN1hHNGdJQzhxWlhOc2FXNTBJRzV2TFhCaGNtRnRMWEpsWVhOemFXZHVPakFxTDF4dUlDQXZMeUJCYkd4dmR5Qm1iM0lnWVhocGIzTW9KMlY0WVcxd2JHVXZkWEpzSjFzc0lHTnZibVpwWjEwcElHRWdiR0VnWm1WMFkyZ2dRVkJKWEc0Z0lHbG1JQ2gwZVhCbGIyWWdZMjl1Wm1sbklEMDlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJR052Ym1acFp5QTlJR0Z5WjNWdFpXNTBjMXN4WFNCOGZDQjdmVHRjYmlBZ0lDQmpiMjVtYVdjdWRYSnNJRDBnWVhKbmRXMWxiblJ6V3pCZE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHTnZibVpwWnlBOUlHTnZibVpwWnlCOGZDQjdmVHRjYmlBZ2ZWeHVYRzRnSUdOdmJtWnBaeUE5SUcxbGNtZGxRMjl1Wm1sbktIUm9hWE11WkdWbVlYVnNkSE1zSUdOdmJtWnBaeWs3WEc1Y2JpQWdMeThnVTJWMElHTnZibVpwWnk1dFpYUm9iMlJjYmlBZ2FXWWdLR052Ym1acFp5NXRaWFJvYjJRcElIdGNiaUFnSUNCamIyNW1hV2N1YldWMGFHOWtJRDBnWTI5dVptbG5MbTFsZEdodlpDNTBiMHh2ZDJWeVEyRnpaU2dwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLSFJvYVhNdVpHVm1ZWFZzZEhNdWJXVjBhRzlrS1NCN1hHNGdJQ0FnWTI5dVptbG5MbTFsZEdodlpDQTlJSFJvYVhNdVpHVm1ZWFZzZEhNdWJXVjBhRzlrTG5SdlRHOTNaWEpEWVhObEtDazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdZMjl1Wm1sbkxtMWxkR2h2WkNBOUlDZG5aWFFuTzF4dUlDQjlYRzVjYmlBZ0x5OGdTRzl2YXlCMWNDQnBiblJsY21ObGNIUnZjbk1nYldsa1pHeGxkMkZ5WlZ4dUlDQjJZWElnWTJoaGFXNGdQU0JiWkdsemNHRjBZMmhTWlhGMVpYTjBMQ0IxYm1SbFptbHVaV1JkTzF4dUlDQjJZWElnY0hKdmJXbHpaU0E5SUZCeWIyMXBjMlV1Y21WemIyeDJaU2hqYjI1bWFXY3BPMXh1WEc0Z0lIUm9hWE11YVc1MFpYSmpaWEIwYjNKekxuSmxjWFZsYzNRdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlCMWJuTm9hV1owVW1WeGRXVnpkRWx1ZEdWeVkyVndkRzl5Y3locGJuUmxjbU5sY0hSdmNpa2dlMXh1SUNBZ0lHTm9ZV2x1TG5WdWMyaHBablFvYVc1MFpYSmpaWEIwYjNJdVpuVnNabWxzYkdWa0xDQnBiblJsY21ObGNIUnZjaTV5WldwbFkzUmxaQ2s3WEc0Z0lIMHBPMXh1WEc0Z0lIUm9hWE11YVc1MFpYSmpaWEIwYjNKekxuSmxjM0J2Ym5ObExtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z2NIVnphRkpsYzNCdmJuTmxTVzUwWlhKalpYQjBiM0p6S0dsdWRHVnlZMlZ3ZEc5eUtTQjdYRzRnSUNBZ1kyaGhhVzR1Y0hWemFDaHBiblJsY21ObGNIUnZjaTVtZFd4bWFXeHNaV1FzSUdsdWRHVnlZMlZ3ZEc5eUxuSmxhbVZqZEdWa0tUdGNiaUFnZlNrN1hHNWNiaUFnZDJocGJHVWdLR05vWVdsdUxteGxibWQwYUNrZ2UxeHVJQ0FnSUhCeWIyMXBjMlVnUFNCd2NtOXRhWE5sTG5Sb1pXNG9ZMmhoYVc0dWMyaHBablFvS1N3Z1kyaGhhVzR1YzJocFpuUW9LU2s3WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnY0hKdmJXbHpaVHRjYm4wN1hHNWNia0Y0YVc5ekxuQnliM1J2ZEhsd1pTNW5aWFJWY21rZ1BTQm1kVzVqZEdsdmJpQm5aWFJWY21rb1kyOXVabWxuS1NCN1hHNGdJR052Ym1acFp5QTlJRzFsY21kbFEyOXVabWxuS0hSb2FYTXVaR1ZtWVhWc2RITXNJR052Ym1acFp5azdYRzRnSUhKbGRIVnliaUJpZFdsc1pGVlNUQ2hqYjI1bWFXY3VkWEpzTENCamIyNW1hV2N1Y0dGeVlXMXpMQ0JqYjI1bWFXY3VjR0Z5WVcxelUyVnlhV0ZzYVhwbGNpa3VjbVZ3YkdGalpTZ3ZYbHhjUHk4c0lDY25LVHRjYm4wN1hHNWNiaTh2SUZCeWIzWnBaR1VnWVd4cFlYTmxjeUJtYjNJZ2MzVndjRzl5ZEdWa0lISmxjWFZsYzNRZ2JXVjBhRzlrYzF4dWRYUnBiSE11Wm05eVJXRmphQ2hiSjJSbGJHVjBaU2NzSUNkblpYUW5MQ0FuYUdWaFpDY3NJQ2R2Y0hScGIyNXpKMTBzSUdaMWJtTjBhVzl1SUdadmNrVmhZMmhOWlhSb2IyUk9iMFJoZEdFb2JXVjBhRzlrS1NCN1hHNGdJQzhxWlhOc2FXNTBJR1oxYm1NdGJtRnRaWE02TUNvdlhHNGdJRUY0YVc5ekxuQnliM1J2ZEhsd1pWdHRaWFJvYjJSZElEMGdablZ1WTNScGIyNG9kWEpzTENCamIyNW1hV2NwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1eVpYRjFaWE4wS0cxbGNtZGxRMjl1Wm1sbktHTnZibVpwWnlCOGZDQjdmU3dnZTF4dUlDQWdJQ0FnYldWMGFHOWtPaUJ0WlhSb2IyUXNYRzRnSUNBZ0lDQjFjbXc2SUhWeWJDeGNiaUFnSUNBZ0lHUmhkR0U2SUNoamIyNW1hV2NnZkh3Z2UzMHBMbVJoZEdGY2JpQWdJQ0I5S1NrN1hHNGdJSDA3WEc1OUtUdGNibHh1ZFhScGJITXVabTl5UldGamFDaGJKM0J2YzNRbkxDQW5jSFYwSnl3Z0ozQmhkR05vSjEwc0lHWjFibU4wYVc5dUlHWnZja1ZoWTJoTlpYUm9iMlJYYVhSb1JHRjBZU2h0WlhSb2IyUXBJSHRjYmlBZ0x5cGxjMnhwYm5RZ1puVnVZeTF1WVcxbGN6b3dLaTljYmlBZ1FYaHBiM011Y0hKdmRHOTBlWEJsVzIxbGRHaHZaRjBnUFNCbWRXNWpkR2x2YmloMWNtd3NJR1JoZEdFc0lHTnZibVpwWnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuSmxjWFZsYzNRb2JXVnlaMlZEYjI1bWFXY29ZMjl1Wm1sbklIeDhJSHQ5TENCN1hHNGdJQ0FnSUNCdFpYUm9iMlE2SUcxbGRHaHZaQ3hjYmlBZ0lDQWdJSFZ5YkRvZ2RYSnNMRnh1SUNBZ0lDQWdaR0YwWVRvZ1pHRjBZVnh1SUNBZ0lIMHBLVHRjYmlBZ2ZUdGNibjBwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFRjRhVzl6TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwzVjBhV3h6SnlrN1hHNWNibVoxYm1OMGFXOXVJRWx1ZEdWeVkyVndkRzl5VFdGdVlXZGxjaWdwSUh0Y2JpQWdkR2hwY3k1b1lXNWtiR1Z5Y3lBOUlGdGRPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFRmtaQ0JoSUc1bGR5QnBiblJsY21ObGNIUnZjaUIwYnlCMGFHVWdjM1JoWTJ0Y2JpQXFYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWRXeG1hV3hzWldRZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUdoaGJtUnNaU0JnZEdobGJtQWdabTl5SUdFZ1lGQnliMjFwYzJWZ1hHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0J5WldwbFkzUmxaQ0JVYUdVZ1puVnVZM1JwYjI0Z2RHOGdhR0Z1Wkd4bElHQnlaV3BsWTNSZ0lHWnZjaUJoSUdCUWNtOXRhWE5sWUZ4dUlDcGNiaUFxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnUVc0Z1NVUWdkWE5sWkNCMGJ5QnlaVzF2ZG1VZ2FXNTBaWEpqWlhCMGIzSWdiR0YwWlhKY2JpQXFMMXh1U1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5TG5CeWIzUnZkSGx3WlM1MWMyVWdQU0JtZFc1amRHbHZiaUIxYzJVb1puVnNabWxzYkdWa0xDQnlaV3BsWTNSbFpDa2dlMXh1SUNCMGFHbHpMbWhoYm1Sc1pYSnpMbkIxYzJnb2UxeHVJQ0FnSUdaMWJHWnBiR3hsWkRvZ1puVnNabWxzYkdWa0xGeHVJQ0FnSUhKbGFtVmpkR1ZrT2lCeVpXcGxZM1JsWkZ4dUlDQjlLVHRjYmlBZ2NtVjBkWEp1SUhSb2FYTXVhR0Z1Wkd4bGNuTXViR1Z1WjNSb0lDMGdNVHRjYm4wN1hHNWNiaThxS2x4dUlDb2dVbVZ0YjNabElHRnVJR2x1ZEdWeVkyVndkRzl5SUdaeWIyMGdkR2hsSUhOMFlXTnJYRzRnS2x4dUlDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHbGtJRlJvWlNCSlJDQjBhR0YwSUhkaGN5QnlaWFIxY201bFpDQmllU0JnZFhObFlGeHVJQ292WEc1SmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJdWNISnZkRzkwZVhCbExtVnFaV04wSUQwZ1puVnVZM1JwYjI0Z1pXcGxZM1FvYVdRcElIdGNiaUFnYVdZZ0tIUm9hWE11YUdGdVpHeGxjbk5iYVdSZEtTQjdYRzRnSUNBZ2RHaHBjeTVvWVc1a2JHVnljMXRwWkYwZ1BTQnVkV3hzTzF4dUlDQjlYRzU5TzF4dVhHNHZLaXBjYmlBcUlFbDBaWEpoZEdVZ2IzWmxjaUJoYkd3Z2RHaGxJSEpsWjJsemRHVnlaV1FnYVc1MFpYSmpaWEIwYjNKelhHNGdLbHh1SUNvZ1ZHaHBjeUJ0WlhSb2IyUWdhWE1nY0dGeWRHbGpkV3hoY214NUlIVnpaV1oxYkNCbWIzSWdjMnRwY0hCcGJtY2diM1psY2lCaGJubGNiaUFxSUdsdWRHVnlZMlZ3ZEc5eWN5QjBhR0YwSUcxaGVTQm9ZWFpsSUdKbFkyOXRaU0JnYm5Wc2JHQWdZMkZzYkdsdVp5QmdaV3BsWTNSZ0xseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWnVJRlJvWlNCbWRXNWpkR2x2YmlCMGJ5QmpZV3hzSUdadmNpQmxZV05vSUdsdWRHVnlZMlZ3ZEc5eVhHNGdLaTljYmtsdWRHVnlZMlZ3ZEc5eVRXRnVZV2RsY2k1d2NtOTBiM1I1Y0dVdVptOXlSV0ZqYUNBOUlHWjFibU4wYVc5dUlHWnZja1ZoWTJnb1ptNHBJSHRjYmlBZ2RYUnBiSE11Wm05eVJXRmphQ2gwYUdsekxtaGhibVJzWlhKekxDQm1kVzVqZEdsdmJpQm1iM0pGWVdOb1NHRnVaR3hsY2lob0tTQjdYRzRnSUNBZ2FXWWdLR2dnSVQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUdadUtHZ3BPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNTlPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVsdWRHVnlZMlZ3ZEc5eVRXRnVZV2RsY2p0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdselFXSnpiMngxZEdWVlVrd2dQU0J5WlhGMWFYSmxLQ2N1TGk5b1pXeHdaWEp6TDJselFXSnpiMngxZEdWVlVrd25LVHRjYm5aaGNpQmpiMjFpYVc1bFZWSk1jeUE5SUhKbGNYVnBjbVVvSnk0dUwyaGxiSEJsY25NdlkyOXRZbWx1WlZWU1RITW5LVHRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1Z6SUdFZ2JtVjNJRlZTVENCaWVTQmpiMjFpYVc1cGJtY2dkR2hsSUdKaGMyVlZVa3dnZDJsMGFDQjBhR1VnY21WeGRXVnpkR1ZrVlZKTUxGeHVJQ29nYjI1c2VTQjNhR1Z1SUhSb1pTQnlaWEYxWlhOMFpXUlZVa3dnYVhNZ2JtOTBJR0ZzY21WaFpIa2dZVzRnWVdKemIyeDFkR1VnVlZKTUxseHVJQ29nU1dZZ2RHaGxJSEpsY1hWbGMzUlZVa3dnYVhNZ1lXSnpiMngxZEdVc0lIUm9hWE1nWm5WdVkzUnBiMjRnY21WMGRYSnVjeUIwYUdVZ2NtVnhkV1Z6ZEdWa1ZWSk1JSFZ1ZEc5MVkyaGxaQzVjYmlBcVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdZbUZ6WlZWU1RDQlVhR1VnWW1GelpTQlZVa3hjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCeVpYRjFaWE4wWldSVlVrd2dRV0p6YjJ4MWRHVWdiM0lnY21Wc1lYUnBkbVVnVlZKTUlIUnZJR052YldKcGJtVmNiaUFxSUVCeVpYUjFjbTV6SUh0emRISnBibWQ5SUZSb1pTQmpiMjFpYVc1bFpDQm1kV3hzSUhCaGRHaGNiaUFxTDF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCaWRXbHNaRVoxYkd4UVlYUm9LR0poYzJWVlVrd3NJSEpsY1hWbGMzUmxaRlZTVENrZ2UxeHVJQ0JwWmlBb1ltRnpaVlZTVENBbUppQWhhWE5CWW5OdmJIVjBaVlZTVENoeVpYRjFaWE4wWldSVlVrd3BLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHTnZiV0pwYm1WVlVreHpLR0poYzJWVlVrd3NJSEpsY1hWbGMzUmxaRlZTVENrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1JsWkZWU1REdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJsYm1oaGJtTmxSWEp5YjNJZ1BTQnlaWEYxYVhKbEtDY3VMMlZ1YUdGdVkyVkZjbkp2Y2ljcE8xeHVYRzR2S2lwY2JpQXFJRU55WldGMFpTQmhiaUJGY25KdmNpQjNhWFJvSUhSb1pTQnpjR1ZqYVdacFpXUWdiV1Z6YzJGblpTd2dZMjl1Wm1sbkxDQmxjbkp2Y2lCamIyUmxMQ0J5WlhGMVpYTjBJR0Z1WkNCeVpYTndiMjV6WlM1Y2JpQXFYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnYldWemMyRm5aU0JVYUdVZ1pYSnliM0lnYldWemMyRm5aUzVjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamIyNW1hV2NnVkdobElHTnZibVpwWnk1Y2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQmJZMjlrWlYwZ1ZHaGxJR1Z5Y205eUlHTnZaR1VnS0dadmNpQmxlR0Z0Y0d4bExDQW5SVU5QVGs1QlFrOVNWRVZFSnlrdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM0psY1hWbGMzUmRJRlJvWlNCeVpYRjFaWE4wTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlGdHlaWE53YjI1elpWMGdWR2hsSUhKbGMzQnZibk5sTGx4dUlDb2dRSEpsZEhWeWJuTWdlMFZ5Y205eWZTQlVhR1VnWTNKbFlYUmxaQ0JsY25KdmNpNWNiaUFxTDF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCamNtVmhkR1ZGY25KdmNpaHRaWE56WVdkbExDQmpiMjVtYVdjc0lHTnZaR1VzSUhKbGNYVmxjM1FzSUhKbGMzQnZibk5sS1NCN1hHNGdJSFpoY2lCbGNuSnZjaUE5SUc1bGR5QkZjbkp2Y2lodFpYTnpZV2RsS1R0Y2JpQWdjbVYwZFhKdUlHVnVhR0Z1WTJWRmNuSnZjaWhsY25KdmNpd2dZMjl1Wm1sbkxDQmpiMlJsTENCeVpYRjFaWE4wTENCeVpYTndiMjV6WlNrN1hHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDNWMGFXeHpKeWs3WEc1MllYSWdkSEpoYm5ObWIzSnRSR0YwWVNBOUlISmxjWFZwY21Vb0p5NHZkSEpoYm5ObWIzSnRSR0YwWVNjcE8xeHVkbUZ5SUdselEyRnVZMlZzSUQwZ2NtVnhkV2x5WlNnbkxpNHZZMkZ1WTJWc0wybHpRMkZ1WTJWc0p5azdYRzUyWVhJZ1pHVm1ZWFZzZEhNZ1BTQnlaWEYxYVhKbEtDY3VMaTlrWldaaGRXeDBjeWNwTzF4dVhHNHZLaXBjYmlBcUlGUm9jbTkzY3lCaElHQkRZVzVqWld4Z0lHbG1JR05oYm1ObGJHeGhkR2x2YmlCb1lYTWdZbVZsYmlCeVpYRjFaWE4wWldRdVhHNGdLaTljYm1aMWJtTjBhVzl1SUhSb2NtOTNTV1pEWVc1alpXeHNZWFJwYjI1U1pYRjFaWE4wWldRb1kyOXVabWxuS1NCN1hHNGdJR2xtSUNoamIyNW1hV2N1WTJGdVkyVnNWRzlyWlc0cElIdGNiaUFnSUNCamIyNW1hV2N1WTJGdVkyVnNWRzlyWlc0dWRHaHliM2RKWmxKbGNYVmxjM1JsWkNncE8xeHVJQ0I5WEc1OVhHNWNiaThxS2x4dUlDb2dSR2x6Y0dGMFkyZ2dZU0J5WlhGMVpYTjBJSFJ2SUhSb1pTQnpaWEoyWlhJZ2RYTnBibWNnZEdobElHTnZibVpwWjNWeVpXUWdZV1JoY0hSbGNpNWNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UyOWlhbVZqZEgwZ1kyOXVabWxuSUZSb1pTQmpiMjVtYVdjZ2RHaGhkQ0JwY3lCMGJ5QmlaU0IxYzJWa0lHWnZjaUIwYUdVZ2NtVnhkV1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMUJ5YjIxcGMyVjlJRlJvWlNCUWNtOXRhWE5sSUhSdklHSmxJR1oxYkdacGJHeGxaRnh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHUnBjM0JoZEdOb1VtVnhkV1Z6ZENoamIyNW1hV2NwSUh0Y2JpQWdkR2h5YjNkSlprTmhibU5sYkd4aGRHbHZibEpsY1hWbGMzUmxaQ2hqYjI1bWFXY3BPMXh1WEc0Z0lDOHZJRVZ1YzNWeVpTQm9aV0ZrWlhKeklHVjRhWE4wWEc0Z0lHTnZibVpwWnk1b1pXRmtaWEp6SUQwZ1kyOXVabWxuTG1obFlXUmxjbk1nZkh3Z2UzMDdYRzVjYmlBZ0x5OGdWSEpoYm5ObWIzSnRJSEpsY1hWbGMzUWdaR0YwWVZ4dUlDQmpiMjVtYVdjdVpHRjBZU0E5SUhSeVlXNXpabTl5YlVSaGRHRW9YRzRnSUNBZ1kyOXVabWxuTG1SaGRHRXNYRzRnSUNBZ1kyOXVabWxuTG1obFlXUmxjbk1zWEc0Z0lDQWdZMjl1Wm1sbkxuUnlZVzV6Wm05eWJWSmxjWFZsYzNSY2JpQWdLVHRjYmx4dUlDQXZMeUJHYkdGMGRHVnVJR2hsWVdSbGNuTmNiaUFnWTI5dVptbG5MbWhsWVdSbGNuTWdQU0IxZEdsc2N5NXRaWEpuWlNoY2JpQWdJQ0JqYjI1bWFXY3VhR1ZoWkdWeWN5NWpiMjF0YjI0Z2ZId2dlMzBzWEc0Z0lDQWdZMjl1Wm1sbkxtaGxZV1JsY25OYlkyOXVabWxuTG0xbGRHaHZaRjBnZkh3Z2UzMHNYRzRnSUNBZ1kyOXVabWxuTG1obFlXUmxjbk5jYmlBZ0tUdGNibHh1SUNCMWRHbHNjeTVtYjNKRllXTm9LRnh1SUNBZ0lGc25aR1ZzWlhSbEp5d2dKMmRsZENjc0lDZG9aV0ZrSnl3Z0ozQnZjM1FuTENBbmNIVjBKeXdnSjNCaGRHTm9KeXdnSjJOdmJXMXZiaWRkTEZ4dUlDQWdJR1oxYm1OMGFXOXVJR05zWldGdVNHVmhaR1Z5UTI5dVptbG5LRzFsZEdodlpDa2dlMXh1SUNBZ0lDQWdaR1ZzWlhSbElHTnZibVpwWnk1b1pXRmtaWEp6VzIxbGRHaHZaRjA3WEc0Z0lDQWdmVnh1SUNBcE8xeHVYRzRnSUhaaGNpQmhaR0Z3ZEdWeUlEMGdZMjl1Wm1sbkxtRmtZWEIwWlhJZ2ZId2daR1ZtWVhWc2RITXVZV1JoY0hSbGNqdGNibHh1SUNCeVpYUjFjbTRnWVdSaGNIUmxjaWhqYjI1bWFXY3BMblJvWlc0b1puVnVZM1JwYjI0Z2IyNUJaR0Z3ZEdWeVVtVnpiMngxZEdsdmJpaHlaWE53YjI1elpTa2dlMXh1SUNBZ0lIUm9jbTkzU1daRFlXNWpaV3hzWVhScGIyNVNaWEYxWlhOMFpXUW9ZMjl1Wm1sbktUdGNibHh1SUNBZ0lDOHZJRlJ5WVc1elptOXliU0J5WlhOd2IyNXpaU0JrWVhSaFhHNGdJQ0FnY21WemNHOXVjMlV1WkdGMFlTQTlJSFJ5WVc1elptOXliVVJoZEdFb1hHNGdJQ0FnSUNCeVpYTndiMjV6WlM1a1lYUmhMRnh1SUNBZ0lDQWdjbVZ6Y0c5dWMyVXVhR1ZoWkdWeWN5eGNiaUFnSUNBZ0lHTnZibVpwWnk1MGNtRnVjMlp2Y20xU1pYTndiMjV6WlZ4dUlDQWdJQ2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6Y0c5dWMyVTdYRzRnSUgwc0lHWjFibU4wYVc5dUlHOXVRV1JoY0hSbGNsSmxhbVZqZEdsdmJpaHlaV0Z6YjI0cElIdGNiaUFnSUNCcFppQW9JV2x6UTJGdVkyVnNLSEpsWVhOdmJpa3BJSHRjYmlBZ0lDQWdJSFJvY205M1NXWkRZVzVqWld4c1lYUnBiMjVTWlhGMVpYTjBaV1FvWTI5dVptbG5LVHRjYmx4dUlDQWdJQ0FnTHk4Z1ZISmhibk5tYjNKdElISmxjM0J2Ym5ObElHUmhkR0ZjYmlBZ0lDQWdJR2xtSUNoeVpXRnpiMjRnSmlZZ2NtVmhjMjl1TG5KbGMzQnZibk5sS1NCN1hHNGdJQ0FnSUNBZ0lISmxZWE52Ymk1eVpYTndiMjV6WlM1a1lYUmhJRDBnZEhKaGJuTm1iM0p0UkdGMFlTaGNiaUFnSUNBZ0lDQWdJQ0J5WldGemIyNHVjbVZ6Y0c5dWMyVXVaR0YwWVN4Y2JpQWdJQ0FnSUNBZ0lDQnlaV0Z6YjI0dWNtVnpjRzl1YzJVdWFHVmhaR1Z5Y3l4Y2JpQWdJQ0FnSUNBZ0lDQmpiMjVtYVdjdWRISmhibk5tYjNKdFVtVnpjRzl1YzJWY2JpQWdJQ0FnSUNBZ0tUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnVUhKdmJXbHpaUzV5WldwbFkzUW9jbVZoYzI5dUtUdGNiaUFnZlNrN1hHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0dktpcGNiaUFxSUZWd1pHRjBaU0JoYmlCRmNuSnZjaUIzYVhSb0lIUm9aU0J6Y0dWamFXWnBaV1FnWTI5dVptbG5MQ0JsY25KdmNpQmpiMlJsTENCaGJtUWdjbVZ6Y0c5dWMyVXVYRzRnS2x4dUlDb2dRSEJoY21GdElIdEZjbkp2Y24wZ1pYSnliM0lnVkdobElHVnljbTl5SUhSdklIVndaR0YwWlM1Y2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmpiMjVtYVdjZ1ZHaGxJR052Ym1acFp5NWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JiWTI5a1pWMGdWR2hsSUdWeWNtOXlJR052WkdVZ0tHWnZjaUJsZUdGdGNHeGxMQ0FuUlVOUFRrNUJRazlTVkVWRUp5a3VYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnVzNKbGNYVmxjM1JkSUZSb1pTQnlaWEYxWlhOMExseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRnR5WlhOd2IyNXpaVjBnVkdobElISmxjM0J2Ym5ObExseHVJQ29nUUhKbGRIVnlibk1nZTBWeWNtOXlmU0JVYUdVZ1pYSnliM0l1WEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdaVzVvWVc1alpVVnljbTl5S0dWeWNtOXlMQ0JqYjI1bWFXY3NJR052WkdVc0lISmxjWFZsYzNRc0lISmxjM0J2Ym5ObEtTQjdYRzRnSUdWeWNtOXlMbU52Ym1acFp5QTlJR052Ym1acFp6dGNiaUFnYVdZZ0tHTnZaR1VwSUh0Y2JpQWdJQ0JsY25KdmNpNWpiMlJsSUQwZ1kyOWtaVHRjYmlBZ2ZWeHVYRzRnSUdWeWNtOXlMbkpsY1hWbGMzUWdQU0J5WlhGMVpYTjBPMXh1SUNCbGNuSnZjaTV5WlhOd2IyNXpaU0E5SUhKbGMzQnZibk5sTzF4dUlDQmxjbkp2Y2k1cGMwRjRhVzl6UlhKeWIzSWdQU0IwY25WbE8xeHVYRzRnSUdWeWNtOXlMblJ2U2xOUFRpQTlJR1oxYm1OMGFXOXVJSFJ2U2xOUFRpZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0x5OGdVM1JoYm1SaGNtUmNiaUFnSUNBZ0lHMWxjM05oWjJVNklIUm9hWE11YldWemMyRm5aU3hjYmlBZ0lDQWdJRzVoYldVNklIUm9hWE11Ym1GdFpTeGNiaUFnSUNBZ0lDOHZJRTFwWTNKdmMyOW1kRnh1SUNBZ0lDQWdaR1Z6WTNKcGNIUnBiMjQ2SUhSb2FYTXVaR1Z6WTNKcGNIUnBiMjRzWEc0Z0lDQWdJQ0J1ZFcxaVpYSTZJSFJvYVhNdWJuVnRZbVZ5TEZ4dUlDQWdJQ0FnTHk4Z1RXOTZhV3hzWVZ4dUlDQWdJQ0FnWm1sc1pVNWhiV1U2SUhSb2FYTXVabWxzWlU1aGJXVXNYRzRnSUNBZ0lDQnNhVzVsVG5WdFltVnlPaUIwYUdsekxteHBibVZPZFcxaVpYSXNYRzRnSUNBZ0lDQmpiMngxYlc1T2RXMWlaWEk2SUhSb2FYTXVZMjlzZFcxdVRuVnRZbVZ5TEZ4dUlDQWdJQ0FnYzNSaFkyczZJSFJvYVhNdWMzUmhZMnNzWEc0Z0lDQWdJQ0F2THlCQmVHbHZjMXh1SUNBZ0lDQWdZMjl1Wm1sbk9pQjBhR2x6TG1OdmJtWnBaeXhjYmlBZ0lDQWdJR052WkdVNklIUm9hWE11WTI5a1pWeHVJQ0FnSUgwN1hHNGdJSDA3WEc0Z0lISmxkSFZ5YmlCbGNuSnZjanRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dUwzVjBhV3h6SnlrN1hHNWNiaThxS2x4dUlDb2dRMjl1Wm1sbkxYTndaV05wWm1saklHMWxjbWRsTFdaMWJtTjBhVzl1SUhkb2FXTm9JR055WldGMFpYTWdZU0J1WlhjZ1kyOXVabWxuTFc5aWFtVmpkRnh1SUNvZ1lua2diV1Z5WjJsdVp5QjBkMjhnWTI5dVptbG5kWEpoZEdsdmJpQnZZbXBsWTNSeklIUnZaMlYwYUdWeUxseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamIyNW1hV2N4WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1kyOXVabWxuTWx4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdUbVYzSUc5aWFtVmpkQ0J5WlhOMWJIUnBibWNnWm5KdmJTQnRaWEpuYVc1bklHTnZibVpwWnpJZ2RHOGdZMjl1Wm1sbk1WeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUcxbGNtZGxRMjl1Wm1sbktHTnZibVpwWnpFc0lHTnZibVpwWnpJcElIdGNiaUFnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1WEc0Z0lHTnZibVpwWnpJZ1BTQmpiMjVtYVdjeUlIeDhJSHQ5TzF4dUlDQjJZWElnWTI5dVptbG5JRDBnZTMwN1hHNWNiaUFnZG1GeUlIWmhiSFZsUm5KdmJVTnZibVpwWnpKTFpYbHpJRDBnV3lkMWNtd25MQ0FuYldWMGFHOWtKeXdnSjJSaGRHRW5YVHRjYmlBZ2RtRnlJRzFsY21kbFJHVmxjRkJ5YjNCbGNuUnBaWE5MWlhseklEMGdXeWRvWldGa1pYSnpKeXdnSjJGMWRHZ25MQ0FuY0hKdmVIa25MQ0FuY0dGeVlXMXpKMTA3WEc0Z0lIWmhjaUJrWldaaGRXeDBWRzlEYjI1bWFXY3lTMlY1Y3lBOUlGdGNiaUFnSUNBblltRnpaVlZTVENjc0lDZDBjbUZ1YzJadmNtMVNaWEYxWlhOMEp5d2dKM1J5WVc1elptOXliVkpsYzNCdmJuTmxKeXdnSjNCaGNtRnRjMU5sY21saGJHbDZaWEluTEZ4dUlDQWdJQ2QwYVcxbGIzVjBKeXdnSjNScGJXVnZkWFJOWlhOellXZGxKeXdnSjNkcGRHaERjbVZrWlc1MGFXRnNjeWNzSUNkaFpHRndkR1Z5Snl3Z0ozSmxjM0J2Ym5ObFZIbHdaU2NzSUNkNGMzSm1RMjl2YTJsbFRtRnRaU2NzWEc0Z0lDQWdKM2h6Y21aSVpXRmtaWEpPWVcxbEp5d2dKMjl1VlhCc2IyRmtVSEp2WjNKbGMzTW5MQ0FuYjI1RWIzZHViRzloWkZCeWIyZHlaWE56Snl3Z0oyUmxZMjl0Y0hKbGMzTW5MRnh1SUNBZ0lDZHRZWGhEYjI1MFpXNTBUR1Z1WjNSb0p5d2dKMjFoZUVKdlpIbE1aVzVuZEdnbkxDQW5iV0Y0VW1Wa2FYSmxZM1J6Snl3Z0ozUnlZVzV6Y0c5eWRDY3NJQ2RvZEhSd1FXZGxiblFuTEZ4dUlDQWdJQ2RvZEhSd2MwRm5aVzUwSnl3Z0oyTmhibU5sYkZSdmEyVnVKeXdnSjNOdlkydGxkRkJoZEdnbkxDQW5jbVZ6Y0c5dWMyVkZibU52WkdsdVp5ZGNiaUFnWFR0Y2JpQWdkbUZ5SUdScGNtVmpkRTFsY21kbFMyVjVjeUE5SUZzbmRtRnNhV1JoZEdWVGRHRjBkWE1uWFR0Y2JseHVJQ0JtZFc1amRHbHZiaUJuWlhSTlpYSm5aV1JXWVd4MVpTaDBZWEpuWlhRc0lITnZkWEpqWlNrZ2UxeHVJQ0FnSUdsbUlDaDFkR2xzY3k1cGMxQnNZV2x1VDJKcVpXTjBLSFJoY21kbGRDa2dKaVlnZFhScGJITXVhWE5RYkdGcGJrOWlhbVZqZENoemIzVnlZMlVwS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnZFhScGJITXViV1Z5WjJVb2RHRnlaMlYwTENCemIzVnlZMlVwTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvZFhScGJITXVhWE5RYkdGcGJrOWlhbVZqZENoemIzVnlZMlVwS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnZFhScGJITXViV1Z5WjJVb2UzMHNJSE52ZFhKalpTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaDFkR2xzY3k1cGMwRnljbUY1S0hOdmRYSmpaU2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ6YjNWeVkyVXVjMnhwWTJVb0tUdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSE52ZFhKalpUdGNiaUFnZlZ4dVhHNGdJR1oxYm1OMGFXOXVJRzFsY21kbFJHVmxjRkJ5YjNCbGNuUnBaWE1vY0hKdmNDa2dlMXh1SUNBZ0lHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5NbHR3Y205d1hTa3BJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0dOdmJtWnBaekZiY0hKdmNGMHNJR052Ym1acFp6SmJjSEp2Y0YwcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb0lYVjBhV3h6TG1selZXNWtaV1pwYm1Wa0tHTnZibVpwWnpGYmNISnZjRjBwS1NCN1hHNGdJQ0FnSUNCamIyNW1hV2RiY0hKdmNGMGdQU0JuWlhSTlpYSm5aV1JXWVd4MVpTaDFibVJsWm1sdVpXUXNJR052Ym1acFp6RmJjSEp2Y0YwcE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvZG1Gc2RXVkdjbTl0UTI5dVptbG5Na3RsZVhNc0lHWjFibU4wYVc5dUlIWmhiSFZsUm5KdmJVTnZibVpwWnpJb2NISnZjQ2tnZTF4dUlDQWdJR2xtSUNnaGRYUnBiSE11YVhOVmJtUmxabWx1WldRb1kyOXVabWxuTWx0d2NtOXdYU2twSUh0Y2JpQWdJQ0FnSUdOdmJtWnBaMXR3Y205d1hTQTlJR2RsZEUxbGNtZGxaRlpoYkhWbEtIVnVaR1ZtYVc1bFpDd2dZMjl1Wm1sbk1sdHdjbTl3WFNrN1hHNGdJQ0FnZlZ4dUlDQjlLVHRjYmx4dUlDQjFkR2xzY3k1bWIzSkZZV05vS0cxbGNtZGxSR1ZsY0ZCeWIzQmxjblJwWlhOTFpYbHpMQ0J0WlhKblpVUmxaWEJRY205d1pYSjBhV1Z6S1R0Y2JseHVJQ0IxZEdsc2N5NW1iM0pGWVdOb0tHUmxabUYxYkhSVWIwTnZibVpwWnpKTFpYbHpMQ0JtZFc1amRHbHZiaUJrWldaaGRXeDBWRzlEYjI1bWFXY3lLSEJ5YjNBcElIdGNiaUFnSUNCcFppQW9JWFYwYVd4ekxtbHpWVzVrWldacGJtVmtLR052Ym1acFp6SmJjSEp2Y0YwcEtTQjdYRzRnSUNBZ0lDQmpiMjVtYVdkYmNISnZjRjBnUFNCblpYUk5aWEpuWldSV1lXeDFaU2gxYm1SbFptbHVaV1FzSUdOdmJtWnBaekpiY0hKdmNGMHBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9JWFYwYVd4ekxtbHpWVzVrWldacGJtVmtLR052Ym1acFp6RmJjSEp2Y0YwcEtTQjdYRzRnSUNBZ0lDQmpiMjVtYVdkYmNISnZjRjBnUFNCblpYUk5aWEpuWldSV1lXeDFaU2gxYm1SbFptbHVaV1FzSUdOdmJtWnBaekZiY0hKdmNGMHBPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNWNiaUFnZFhScGJITXVabTl5UldGamFDaGthWEpsWTNSTlpYSm5aVXRsZVhNc0lHWjFibU4wYVc5dUlHMWxjbWRsS0hCeWIzQXBJSHRjYmlBZ0lDQnBaaUFvY0hKdmNDQnBiaUJqYjI1bWFXY3lLU0I3WEc0Z0lDQWdJQ0JqYjI1bWFXZGJjSEp2Y0YwZ1BTQm5aWFJOWlhKblpXUldZV3gxWlNoamIyNW1hV2N4VzNCeWIzQmRMQ0JqYjI1bWFXY3lXM0J5YjNCZEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tIQnliM0FnYVc0Z1kyOXVabWxuTVNrZ2UxeHVJQ0FnSUNBZ1kyOXVabWxuVzNCeWIzQmRJRDBnWjJWMFRXVnlaMlZrVm1Gc2RXVW9kVzVrWldacGJtVmtMQ0JqYjI1bWFXY3hXM0J5YjNCZEtUdGNiaUFnSUNCOVhHNGdJSDBwTzF4dVhHNGdJSFpoY2lCaGVHbHZjMHRsZVhNZ1BTQjJZV3gxWlVaeWIyMURiMjVtYVdjeVMyVjVjMXh1SUNBZ0lDNWpiMjVqWVhRb2JXVnlaMlZFWldWd1VISnZjR1Z5ZEdsbGMwdGxlWE1wWEc0Z0lDQWdMbU52Ym1OaGRDaGtaV1poZFd4MFZHOURiMjVtYVdjeVMyVjVjeWxjYmlBZ0lDQXVZMjl1WTJGMEtHUnBjbVZqZEUxbGNtZGxTMlY1Y3lrN1hHNWNiaUFnZG1GeUlHOTBhR1Z5UzJWNWN5QTlJRTlpYW1WamRGeHVJQ0FnSUM1clpYbHpLR052Ym1acFp6RXBYRzRnSUNBZ0xtTnZibU5oZENoUFltcGxZM1F1YTJWNWN5aGpiMjVtYVdjeUtTbGNiaUFnSUNBdVptbHNkR1Z5S0daMWJtTjBhVzl1SUdacGJIUmxja0Y0YVc5elMyVjVjeWhyWlhrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCaGVHbHZjMHRsZVhNdWFXNWtaWGhQWmloclpYa3BJRDA5UFNBdE1UdGNiaUFnSUNCOUtUdGNibHh1SUNCMWRHbHNjeTVtYjNKRllXTm9LRzkwYUdWeVMyVjVjeXdnYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsY3lrN1hHNWNiaUFnY21WMGRYSnVJR052Ym1acFp6dGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJqY21WaGRHVkZjbkp2Y2lBOUlISmxjWFZwY21Vb0p5NHZZM0psWVhSbFJYSnliM0luS1R0Y2JseHVMeW9xWEc0Z0tpQlNaWE52YkhabElHOXlJSEpsYW1WamRDQmhJRkJ5YjIxcGMyVWdZbUZ6WldRZ2IyNGdjbVZ6Y0c5dWMyVWdjM1JoZEhWekxseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlISmxjMjlzZG1VZ1FTQm1kVzVqZEdsdmJpQjBhR0YwSUhKbGMyOXNkbVZ6SUhSb1pTQndjbTl0YVhObExseHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnY21WcVpXTjBJRUVnWm5WdVkzUnBiMjRnZEdoaGRDQnlaV3BsWTNSeklIUm9aU0J3Y205dGFYTmxMbHh1SUNvZ1FIQmhjbUZ0SUh0dlltcGxZM1I5SUhKbGMzQnZibk5sSUZSb1pTQnlaWE53YjI1elpTNWNiaUFxTDF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCelpYUjBiR1VvY21WemIyeDJaU3dnY21WcVpXTjBMQ0J5WlhOd2IyNXpaU2tnZTF4dUlDQjJZWElnZG1Gc2FXUmhkR1ZUZEdGMGRYTWdQU0J5WlhOd2IyNXpaUzVqYjI1bWFXY3VkbUZzYVdSaGRHVlRkR0YwZFhNN1hHNGdJR2xtSUNnaGNtVnpjRzl1YzJVdWMzUmhkSFZ6SUh4OElDRjJZV3hwWkdGMFpWTjBZWFIxY3lCOGZDQjJZV3hwWkdGMFpWTjBZWFIxY3loeVpYTndiMjV6WlM1emRHRjBkWE1wS1NCN1hHNGdJQ0FnY21WemIyeDJaU2h5WlhOd2IyNXpaU2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnY21WcVpXTjBLR055WldGMFpVVnljbTl5S0Z4dUlDQWdJQ0FnSjFKbGNYVmxjM1FnWm1GcGJHVmtJSGRwZEdnZ2MzUmhkSFZ6SUdOdlpHVWdKeUFySUhKbGMzQnZibk5sTG5OMFlYUjFjeXhjYmlBZ0lDQWdJSEpsYzNCdmJuTmxMbU52Ym1acFp5eGNiaUFnSUNBZ0lHNTFiR3dzWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaUzV5WlhGMVpYTjBMRnh1SUNBZ0lDQWdjbVZ6Y0c5dWMyVmNiaUFnSUNBcEtUdGNiaUFnZlZ4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTkxZEdsc2N5Y3BPMXh1WEc0dktpcGNiaUFxSUZSeVlXNXpabTl5YlNCMGFHVWdaR0YwWVNCbWIzSWdZU0J5WlhGMVpYTjBJRzl5SUdFZ2NtVnpjRzl1YzJWY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSHhUZEhKcGJtZDlJR1JoZEdFZ1ZHaGxJR1JoZEdFZ2RHOGdZbVVnZEhKaGJuTm1iM0p0WldSY2JpQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlHaGxZV1JsY25NZ1ZHaGxJR2hsWVdSbGNuTWdabTl5SUhSb1pTQnlaWEYxWlhOMElHOXlJSEpsYzNCdmJuTmxYRzRnS2lCQWNHRnlZVzBnZTBGeWNtRjVmRVoxYm1OMGFXOXVmU0JtYm5NZ1FTQnphVzVuYkdVZ1puVnVZM1JwYjI0Z2IzSWdRWEp5WVhrZ2IyWWdablZ1WTNScGIyNXpYRzRnS2lCQWNtVjBkWEp1Y3lCN0tuMGdWR2hsSUhKbGMzVnNkR2x1WnlCMGNtRnVjMlp2Y20xbFpDQmtZWFJoWEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdkSEpoYm5ObWIzSnRSR0YwWVNoa1lYUmhMQ0JvWldGa1pYSnpMQ0JtYm5NcElIdGNiaUFnTHlwbGMyeHBiblFnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjQ2TUNvdlhHNGdJSFYwYVd4ekxtWnZja1ZoWTJnb1ptNXpMQ0JtZFc1amRHbHZiaUIwY21GdWMyWnZjbTBvWm00cElIdGNiaUFnSUNCa1lYUmhJRDBnWm00b1pHRjBZU3dnYUdWaFpHVnljeWs3WEc0Z0lIMHBPMXh1WEc0Z0lISmxkSFZ5YmlCa1lYUmhPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk5MWRHbHNjeWNwTzF4dWRtRnlJRzV2Y20xaGJHbDZaVWhsWVdSbGNrNWhiV1VnUFNCeVpYRjFhWEpsS0NjdUwyaGxiSEJsY25NdmJtOXliV0ZzYVhwbFNHVmhaR1Z5VG1GdFpTY3BPMXh1WEc1MllYSWdSRVZHUVZWTVZGOURUMDVVUlU1VVgxUlpVRVVnUFNCN1hHNGdJQ2REYjI1MFpXNTBMVlI1Y0dVbk9pQW5ZWEJ3YkdsallYUnBiMjR2ZUMxM2QzY3RabTl5YlMxMWNteGxibU52WkdWa0oxeHVmVHRjYmx4dVpuVnVZM1JwYjI0Z2MyVjBRMjl1ZEdWdWRGUjVjR1ZKWmxWdWMyVjBLR2hsWVdSbGNuTXNJSFpoYkhWbEtTQjdYRzRnSUdsbUlDZ2hkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9hR1ZoWkdWeWN5a2dKaVlnZFhScGJITXVhWE5WYm1SbFptbHVaV1FvYUdWaFpHVnljMXNuUTI5dWRHVnVkQzFVZVhCbEoxMHBLU0I3WEc0Z0lDQWdhR1ZoWkdWeWMxc25RMjl1ZEdWdWRDMVVlWEJsSjEwZ1BTQjJZV3gxWlR0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFJFWldaaGRXeDBRV1JoY0hSbGNpZ3BJSHRjYmlBZ2RtRnlJR0ZrWVhCMFpYSTdYRzRnSUdsbUlDaDBlWEJsYjJZZ1dFMU1TSFIwY0ZKbGNYVmxjM1FnSVQwOUlDZDFibVJsWm1sdVpXUW5LU0I3WEc0Z0lDQWdMeThnUm05eUlHSnliM2R6WlhKeklIVnpaU0JZU0ZJZ1lXUmhjSFJsY2x4dUlDQWdJR0ZrWVhCMFpYSWdQU0J5WlhGMWFYSmxLQ2N1TDJGa1lYQjBaWEp6TDNob2NpY3BPMXh1SUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCd2NtOWpaWE56SUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG5SdlUzUnlhVzVuTG1OaGJHd29jSEp2WTJWemN5a2dQVDA5SUNkYmIySnFaV04wSUhCeWIyTmxjM05kSnlrZ2UxeHVJQ0FnSUM4dklFWnZjaUJ1YjJSbElIVnpaU0JJVkZSUUlHRmtZWEIwWlhKY2JpQWdJQ0JoWkdGd2RHVnlJRDBnY21WeGRXbHlaU2duTGk5aFpHRndkR1Z5Y3k5b2RIUndKeWs3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR0ZrWVhCMFpYSTdYRzU5WEc1Y2JuWmhjaUJrWldaaGRXeDBjeUE5SUh0Y2JpQWdZV1JoY0hSbGNqb2daMlYwUkdWbVlYVnNkRUZrWVhCMFpYSW9LU3hjYmx4dUlDQjBjbUZ1YzJadmNtMVNaWEYxWlhOME9pQmJablZ1WTNScGIyNGdkSEpoYm5ObWIzSnRVbVZ4ZFdWemRDaGtZWFJoTENCb1pXRmtaWEp6S1NCN1hHNGdJQ0FnYm05eWJXRnNhWHBsU0dWaFpHVnlUbUZ0WlNob1pXRmtaWEp6TENBblFXTmpaWEIwSnlrN1hHNGdJQ0FnYm05eWJXRnNhWHBsU0dWaFpHVnlUbUZ0WlNob1pXRmtaWEp6TENBblEyOXVkR1Z1ZEMxVWVYQmxKeWs3WEc0Z0lDQWdhV1lnS0hWMGFXeHpMbWx6Um05eWJVUmhkR0VvWkdGMFlTa2dmSHhjYmlBZ0lDQWdJSFYwYVd4ekxtbHpRWEp5WVhsQ2RXWm1aWElvWkdGMFlTa2dmSHhjYmlBZ0lDQWdJSFYwYVd4ekxtbHpRblZtWm1WeUtHUmhkR0VwSUh4OFhHNGdJQ0FnSUNCMWRHbHNjeTVwYzFOMGNtVmhiU2hrWVhSaEtTQjhmRnh1SUNBZ0lDQWdkWFJwYkhNdWFYTkdhV3hsS0dSaGRHRXBJSHg4WEc0Z0lDQWdJQ0IxZEdsc2N5NXBjMEpzYjJJb1pHRjBZU2xjYmlBZ0lDQXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQmtZWFJoTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZFhScGJITXVhWE5CY25KaGVVSjFabVpsY2xacFpYY29aR0YwWVNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCa1lYUmhMbUoxWm1abGNqdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tIVjBhV3h6TG1selZWSk1VMlZoY21Ob1VHRnlZVzF6S0dSaGRHRXBLU0I3WEc0Z0lDQWdJQ0J6WlhSRGIyNTBaVzUwVkhsd1pVbG1WVzV6WlhRb2FHVmhaR1Z5Y3l3Z0oyRndjR3hwWTJGMGFXOXVMM2d0ZDNkM0xXWnZjbTB0ZFhKc1pXNWpiMlJsWkR0amFHRnljMlYwUFhWMFppMDRKeWs3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdaR0YwWVM1MGIxTjBjbWx1WnlncE8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RYUnBiSE11YVhOUFltcGxZM1FvWkdGMFlTa3BJSHRjYmlBZ0lDQWdJSE5sZEVOdmJuUmxiblJVZVhCbFNXWlZibk5sZENob1pXRmtaWEp6TENBbllYQndiR2xqWVhScGIyNHZhbk52Ymp0amFHRnljMlYwUFhWMFppMDRKeWs3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdTbE5QVGk1emRISnBibWRwWm5rb1pHRjBZU2s3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCa1lYUmhPMXh1SUNCOVhTeGNibHh1SUNCMGNtRnVjMlp2Y20xU1pYTndiMjV6WlRvZ1cyWjFibU4wYVc5dUlIUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObEtHUmhkR0VwSUh0Y2JpQWdJQ0F2S21WemJHbHVkQ0J1Ynkxd1lYSmhiUzF5WldGemMybG5iam93S2k5Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUdSaGRHRWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0JrWVhSaElEMGdTbE5QVGk1d1lYSnpaU2hrWVhSaEtUdGNiaUFnSUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHNnTHlvZ1NXZHViM0psSUNvdklIMWNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJR1JoZEdFN1hHNGdJSDFkTEZ4dVhHNGdJQzhxS2x4dUlDQWdLaUJCSUhScGJXVnZkWFFnYVc0Z2JXbHNiR2x6WldOdmJtUnpJSFJ2SUdGaWIzSjBJR0VnY21WeGRXVnpkQzRnU1dZZ2MyVjBJSFJ2SURBZ0tHUmxabUYxYkhRcElHRmNiaUFnSUNvZ2RHbHRaVzkxZENCcGN5QnViM1FnWTNKbFlYUmxaQzVjYmlBZ0lDb3ZYRzRnSUhScGJXVnZkWFE2SURBc1hHNWNiaUFnZUhOeVprTnZiMnRwWlU1aGJXVTZJQ2RZVTFKR0xWUlBTMFZPSnl4Y2JpQWdlSE55WmtobFlXUmxjazVoYldVNklDZFlMVmhUVWtZdFZFOUxSVTRuTEZ4dVhHNGdJRzFoZUVOdmJuUmxiblJNWlc1bmRHZzZJQzB4TEZ4dUlDQnRZWGhDYjJSNVRHVnVaM1JvT2lBdE1TeGNibHh1SUNCMllXeHBaR0YwWlZOMFlYUjFjem9nWm5WdVkzUnBiMjRnZG1Gc2FXUmhkR1ZUZEdGMGRYTW9jM1JoZEhWektTQjdYRzRnSUNBZ2NtVjBkWEp1SUhOMFlYUjFjeUErUFNBeU1EQWdKaVlnYzNSaGRIVnpJRHdnTXpBd08xeHVJQ0I5WEc1OU8xeHVYRzVrWldaaGRXeDBjeTVvWldGa1pYSnpJRDBnZTF4dUlDQmpiMjF0YjI0NklIdGNiaUFnSUNBblFXTmpaWEIwSnpvZ0oyRndjR3hwWTJGMGFXOXVMMnB6YjI0c0lIUmxlSFF2Y0d4aGFXNHNJQ292S2lkY2JpQWdmVnh1ZlR0Y2JseHVkWFJwYkhNdVptOXlSV0ZqYUNoYkoyUmxiR1YwWlNjc0lDZG5aWFFuTENBbmFHVmhaQ2RkTENCbWRXNWpkR2x2YmlCbWIzSkZZV05vVFdWMGFHOWtUbTlFWVhSaEtHMWxkR2h2WkNrZ2UxeHVJQ0JrWldaaGRXeDBjeTVvWldGa1pYSnpXMjFsZEdodlpGMGdQU0I3ZlR0Y2JuMHBPMXh1WEc1MWRHbHNjeTVtYjNKRllXTm9LRnNuY0c5emRDY3NJQ2R3ZFhRbkxDQW5jR0YwWTJnblhTd2dablZ1WTNScGIyNGdabTl5UldGamFFMWxkR2h2WkZkcGRHaEVZWFJoS0cxbGRHaHZaQ2tnZTF4dUlDQmtaV1poZFd4MGN5NW9aV0ZrWlhKelcyMWxkR2h2WkYwZ1BTQjFkR2xzY3k1dFpYSm5aU2hFUlVaQlZVeFVYME5QVGxSRlRsUmZWRmxRUlNrN1hHNTlLVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCa1pXWmhkV3gwY3p0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQmlhVzVrS0dadUxDQjBhR2x6UVhKbktTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaUIzY21Gd0tDa2dlMXh1SUNBZ0lIWmhjaUJoY21keklEMGdibVYzSUVGeWNtRjVLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ3BPMXh1SUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2dZWEpuY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lDQWdZWEpuYzF0cFhTQTlJR0Z5WjNWdFpXNTBjMXRwWFR0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHWnVMbUZ3Y0d4NUtIUm9hWE5CY21jc0lHRnlaM01wTzF4dUlDQjlPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk4dUxpOTFkR2xzY3ljcE8xeHVYRzVtZFc1amRHbHZiaUJsYm1OdlpHVW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQmxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9kbUZzS1M1Y2JpQWdJQ0J5WlhCc1lXTmxLQzhsTTBFdloya3NJQ2M2SnlrdVhHNGdJQ0FnY21Wd2JHRmpaU2d2SlRJMEwyY3NJQ2NrSnlrdVhHNGdJQ0FnY21Wd2JHRmpaU2d2SlRKREwyZHBMQ0FuTENjcExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVeU1DOW5MQ0FuS3ljcExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVMVFpOW5hU3dnSjFzbktTNWNiaUFnSUNCeVpYQnNZV05sS0M4bE5VUXZaMmtzSUNkZEp5azdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FuVnBiR1FnWVNCVlVrd2dZbmtnWVhCd1pXNWthVzVuSUhCaGNtRnRjeUIwYnlCMGFHVWdaVzVrWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJSFZ5YkNCVWFHVWdZbUZ6WlNCdlppQjBhR1VnZFhKc0lDaGxMbWN1TENCb2RIUndPaTh2ZDNkM0xtZHZiMmRzWlM1amIyMHBYRzRnS2lCQWNHRnlZVzBnZTI5aWFtVmpkSDBnVzNCaGNtRnRjMTBnVkdobElIQmhjbUZ0Y3lCMGJ5QmlaU0JoY0hCbGJtUmxaRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UzTjBjbWx1WjMwZ1ZHaGxJR1p2Y20xaGRIUmxaQ0IxY214Y2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJpZFdsc1pGVlNUQ2gxY213c0lIQmhjbUZ0Y3l3Z2NHRnlZVzF6VTJWeWFXRnNhWHBsY2lrZ2UxeHVJQ0F2S21WemJHbHVkQ0J1Ynkxd1lYSmhiUzF5WldGemMybG5iam93S2k5Y2JpQWdhV1lnS0NGd1lYSmhiWE1wSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkWEpzTzF4dUlDQjlYRzVjYmlBZ2RtRnlJSE5sY21saGJHbDZaV1JRWVhKaGJYTTdYRzRnSUdsbUlDaHdZWEpoYlhOVFpYSnBZV3hwZW1WeUtTQjdYRzRnSUNBZ2MyVnlhV0ZzYVhwbFpGQmhjbUZ0Y3lBOUlIQmhjbUZ0YzFObGNtbGhiR2w2WlhJb2NHRnlZVzF6S1R0Y2JpQWdmU0JsYkhObElHbG1JQ2gxZEdsc2N5NXBjMVZTVEZObFlYSmphRkJoY21GdGN5aHdZWEpoYlhNcEtTQjdYRzRnSUNBZ2MyVnlhV0ZzYVhwbFpGQmhjbUZ0Y3lBOUlIQmhjbUZ0Y3k1MGIxTjBjbWx1WnlncE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIWmhjaUJ3WVhKMGN5QTlJRnRkTzF4dVhHNGdJQ0FnZFhScGJITXVabTl5UldGamFDaHdZWEpoYlhNc0lHWjFibU4wYVc5dUlITmxjbWxoYkdsNlpTaDJZV3dzSUd0bGVTa2dlMXh1SUNBZ0lDQWdhV1lnS0haaGJDQTlQVDBnYm5Wc2JDQjhmQ0IwZVhCbGIyWWdkbUZzSUQwOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaDFkR2xzY3k1cGMwRnljbUY1S0haaGJDa3BJSHRjYmlBZ0lDQWdJQ0FnYTJWNUlEMGdhMlY1SUNzZ0oxdGRKenRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJSFpoYkNBOUlGdDJZV3hkTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMWRHbHNjeTVtYjNKRllXTm9LSFpoYkN3Z1puVnVZM1JwYjI0Z2NHRnljMlZXWVd4MVpTaDJLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDFkR2xzY3k1cGMwUmhkR1VvZGlrcElIdGNiaUFnSUNBZ0lDQWdJQ0IySUQwZ2RpNTBiMGxUVDFOMGNtbHVaeWdwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIVjBhV3h6TG1selQySnFaV04wS0hZcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZGlBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0hZcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEJoY25SekxuQjFjMmdvWlc1amIyUmxLR3RsZVNrZ0t5QW5QU2NnS3lCbGJtTnZaR1VvZGlrcE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZTazdYRzVjYmlBZ0lDQnpaWEpwWVd4cGVtVmtVR0Z5WVcxeklEMGdjR0Z5ZEhNdWFtOXBiaWduSmljcE8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0hObGNtbGhiR2w2WldSUVlYSmhiWE1wSUh0Y2JpQWdJQ0IyWVhJZ2FHRnphRzFoY210SmJtUmxlQ0E5SUhWeWJDNXBibVJsZUU5bUtDY2pKeWs3WEc0Z0lDQWdhV1lnS0doaGMyaHRZWEpyU1c1a1pYZ2dJVDA5SUMweEtTQjdYRzRnSUNBZ0lDQjFjbXdnUFNCMWNtd3VjMnhwWTJVb01Dd2dhR0Z6YUcxaGNtdEpibVJsZUNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZFhKc0lDczlJQ2gxY213dWFXNWtaWGhQWmlnblB5Y3BJRDA5UFNBdE1TQS9JQ2MvSnlBNklDY21KeWtnS3lCelpYSnBZV3hwZW1Wa1VHRnlZVzF6TzF4dUlDQjlYRzVjYmlBZ2NtVjBkWEp1SUhWeWJEdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHNWxkeUJWVWt3Z1lua2dZMjl0WW1sdWFXNW5JSFJvWlNCemNHVmphV1pwWldRZ1ZWSk1jMXh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQmlZWE5sVlZKTUlGUm9aU0JpWVhObElGVlNURnh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUhKbGJHRjBhWFpsVlZKTUlGUm9aU0J5Wld4aGRHbDJaU0JWVWt4Y2JpQXFJRUJ5WlhSMWNtNXpJSHR6ZEhKcGJtZDlJRlJvWlNCamIyMWlhVzVsWkNCVlVreGNiaUFxTDF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCamIyMWlhVzVsVlZKTWN5aGlZWE5sVlZKTUxDQnlaV3hoZEdsMlpWVlNUQ2tnZTF4dUlDQnlaWFIxY200Z2NtVnNZWFJwZG1WVlVreGNiaUFnSUNBL0lHSmhjMlZWVWt3dWNtVndiR0ZqWlNndlhGd3ZLeVF2TENBbkp5a2dLeUFuTHljZ0t5QnlaV3hoZEdsMlpWVlNUQzV5WlhCc1lXTmxLQzllWEZ3dkt5OHNJQ2NuS1Z4dUlDQWdJRG9nWW1GelpWVlNURHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZkWFJwYkhNbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0FvWEc0Z0lIVjBhV3h6TG1selUzUmhibVJoY21SQ2NtOTNjMlZ5Ulc1MktDa2dQMXh1WEc0Z0lDOHZJRk4wWVc1a1lYSmtJR0p5YjNkelpYSWdaVzUyY3lCemRYQndiM0owSUdSdlkzVnRaVzUwTG1OdmIydHBaVnh1SUNBZ0lDaG1kVzVqZEdsdmJpQnpkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0IzY21sMFpUb2dablZ1WTNScGIyNGdkM0pwZEdVb2JtRnRaU3dnZG1Gc2RXVXNJR1Y0Y0dseVpYTXNJSEJoZEdnc0lHUnZiV0ZwYml3Z2MyVmpkWEpsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUdOdmIydHBaU0E5SUZ0ZE8xeHVJQ0FnSUNBZ0lDQWdJR052YjJ0cFpTNXdkWE5vS0c1aGJXVWdLeUFuUFNjZ0t5QmxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9kbUZzZFdVcEtUdGNibHh1SUNBZ0lDQWdJQ0FnSUdsbUlDaDFkR2xzY3k1cGMwNTFiV0psY2lobGVIQnBjbVZ6S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dmEybGxMbkIxYzJnb0oyVjRjR2x5WlhNOUp5QXJJRzVsZHlCRVlYUmxLR1Y0Y0dseVpYTXBMblJ2UjAxVVUzUnlhVzVuS0NrcE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2gxZEdsc2N5NXBjMU4wY21sdVp5aHdZWFJvS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dmEybGxMbkIxYzJnb0ozQmhkR2c5SnlBcklIQmhkR2dwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUdsbUlDaDFkR2xzY3k1cGMxTjBjbWx1Wnloa2IyMWhhVzRwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI5cmFXVXVjSFZ6YUNnblpHOXRZV2x1UFNjZ0t5QmtiMjFoYVc0cE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2h6WldOMWNtVWdQVDA5SUhSeWRXVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZiMnRwWlM1d2RYTm9LQ2R6WldOMWNtVW5LVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0JrYjJOMWJXVnVkQzVqYjI5cmFXVWdQU0JqYjI5cmFXVXVhbTlwYmlnbk95QW5LVHRjYmlBZ0lDQWdJQ0FnZlN4Y2JseHVJQ0FnSUNBZ0lDQnlaV0ZrT2lCbWRXNWpkR2x2YmlCeVpXRmtLRzVoYldVcElIdGNiaUFnSUNBZ0lDQWdJQ0IyWVhJZ2JXRjBZMmdnUFNCa2IyTjFiV1Z1ZEM1amIyOXJhV1V1YldGMFkyZ29ibVYzSUZKbFowVjRjQ2duS0Y1OE8xeGNYRnh6S2lrb0p5QXJJRzVoYldVZ0t5QW5LVDBvVzE0N1hTb3BKeWtwTzF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlBb2JXRjBZMmdnUHlCa1pXTnZaR1ZWVWtsRGIyMXdiMjVsYm5Rb2JXRjBZMmhiTTEwcElEb2diblZzYkNrN1hHNGdJQ0FnSUNBZ0lIMHNYRzVjYmlBZ0lDQWdJQ0FnY21WdGIzWmxPaUJtZFc1amRHbHZiaUJ5WlcxdmRtVW9ibUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWQzSnBkR1VvYm1GdFpTd2dKeWNzSUVSaGRHVXVibTkzS0NrZ0xTQTROalF3TURBd01DazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDA3WEc0Z0lDQWdmU2tvS1NBNlhHNWNiaUFnTHk4Z1RtOXVJSE4wWVc1a1lYSmtJR0p5YjNkelpYSWdaVzUySUNoM1pXSWdkMjl5YTJWeWN5d2djbVZoWTNRdGJtRjBhWFpsS1NCc1lXTnJJRzVsWldSbFpDQnpkWEJ3YjNKMExseHVJQ0FnSUNobWRXNWpkR2x2YmlCdWIyNVRkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0IzY21sMFpUb2dablZ1WTNScGIyNGdkM0pwZEdVb0tTQjdmU3hjYmlBZ0lDQWdJQ0FnY21WaFpEb2dablZ1WTNScGIyNGdjbVZoWkNncElIc2djbVYwZFhKdUlHNTFiR3c3SUgwc1hHNGdJQ0FnSUNBZ0lISmxiVzkyWlRvZ1puVnVZM1JwYjI0Z2NtVnRiM1psS0NrZ2UzMWNiaUFnSUNBZ0lIMDdYRzRnSUNBZ2ZTa29LVnh1S1R0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVnpJSGRvWlhSb1pYSWdkR2hsSUhOd1pXTnBabWxsWkNCVlVrd2dhWE1nWVdKemIyeDFkR1ZjYmlBcVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdkWEpzSUZSb1pTQlZVa3dnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RHaGxJSE53WldOcFptbGxaQ0JWVWt3Z2FYTWdZV0p6YjJ4MWRHVXNJRzkwYUdWeWQybHpaU0JtWVd4elpWeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdselFXSnpiMngxZEdWVlVrd29kWEpzS1NCN1hHNGdJQzh2SUVFZ1ZWSk1JR2x6SUdOdmJuTnBaR1Z5WldRZ1lXSnpiMngxZEdVZ2FXWWdhWFFnWW1WbmFXNXpJSGRwZEdnZ1hDSThjMk5vWlcxbFBqb3ZMMXdpSUc5eUlGd2lMeTljSWlBb2NISnZkRzlqYjJ3dGNtVnNZWFJwZG1VZ1ZWSk1LUzVjYmlBZ0x5OGdVa1pESURNNU9EWWdaR1ZtYVc1bGN5QnpZMmhsYldVZ2JtRnRaU0JoY3lCaElITmxjWFZsYm1ObElHOW1JR05vWVhKaFkzUmxjbk1nWW1WbmFXNXVhVzVuSUhkcGRHZ2dZU0JzWlhSMFpYSWdZVzVrSUdadmJHeHZkMlZrWEc0Z0lDOHZJR0o1SUdGdWVTQmpiMjFpYVc1aGRHbHZiaUJ2WmlCc1pYUjBaWEp6TENCa2FXZHBkSE1zSUhCc2RYTXNJSEJsY21sdlpDd2diM0lnYUhsd2FHVnVMbHh1SUNCeVpYUjFjbTRnTDE0b1cyRXRlbDFiWVMxNlhGeGtYRndyWEZ3dFhGd3VYU282S1Q5Y1hDOWNYQzh2YVM1MFpYTjBLSFZ5YkNrN1hHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDNWMGFXeHpKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ0tGeHVJQ0IxZEdsc2N5NXBjMU4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUQ5Y2JseHVJQ0F2THlCVGRHRnVaR0Z5WkNCaWNtOTNjMlZ5SUdWdWRuTWdhR0YyWlNCbWRXeHNJSE4xY0hCdmNuUWdiMllnZEdobElFRlFTWE1nYm1WbFpHVmtJSFJ2SUhSbGMzUmNiaUFnTHk4Z2QyaGxkR2hsY2lCMGFHVWdjbVZ4ZFdWemRDQlZVa3dnYVhNZ2IyWWdkR2hsSUhOaGJXVWdiM0pwWjJsdUlHRnpJR04xY25KbGJuUWdiRzlqWVhScGIyNHVYRzRnSUNBZ0tHWjFibU4wYVc5dUlITjBZVzVrWVhKa1FuSnZkM05sY2tWdWRpZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCdGMybGxJRDBnTHlodGMybGxmSFJ5YVdSbGJuUXBMMmt1ZEdWemRDaHVZWFpwWjJGMGIzSXVkWE5sY2tGblpXNTBLVHRjYmlBZ0lDQWdJSFpoY2lCMWNteFFZWEp6YVc1blRtOWtaU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMkVuS1R0Y2JpQWdJQ0FnSUhaaGNpQnZjbWxuYVc1VlVrdzdYRzVjYmlBZ0lDQWdJQzhxS2x4dUlDQWdJQ29nVUdGeWMyVWdZU0JWVWt3Z2RHOGdaR2x6WTI5MlpYSWdhWFFuY3lCamIyMXdiMjVsYm5SelhHNGdJQ0FnS2x4dUlDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSFZ5YkNCVWFHVWdWVkpNSUhSdklHSmxJSEJoY25ObFpGeHVJQ0FnSUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgxY2JpQWdJQ0FxTDF4dUlDQWdJQ0FnWm5WdVkzUnBiMjRnY21WemIyeDJaVlZTVENoMWNtd3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHaHlaV1lnUFNCMWNtdzdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tHMXphV1VwSUh0Y2JpQWdJQ0FnSUNBZ0x5OGdTVVVnYm1WbFpITWdZWFIwY21saWRYUmxJSE5sZENCMGQybGpaU0IwYnlCdWIzSnRZV3hwZW1VZ2NISnZjR1Z5ZEdsbGMxeHVJQ0FnSUNBZ0lDQWdJSFZ5YkZCaGNuTnBibWRPYjJSbExuTmxkRUYwZEhKcFluVjBaU2duYUhKbFppY3NJR2h5WldZcE8xeHVJQ0FnSUNBZ0lDQWdJR2h5WldZZ1BTQjFjbXhRWVhKemFXNW5UbTlrWlM1b2NtVm1PMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2RYSnNVR0Z5YzJsdVowNXZaR1V1YzJWMFFYUjBjbWxpZFhSbEtDZG9jbVZtSnl3Z2FISmxaaWs3WEc1Y2JpQWdJQ0FnSUNBZ0x5OGdkWEpzVUdGeWMybHVaMDV2WkdVZ2NISnZkbWxrWlhNZ2RHaGxJRlZ5YkZWMGFXeHpJR2x1ZEdWeVptRmpaU0F0SUdoMGRIQTZMeTkxY213dWMzQmxZeTUzYUdGMGQyY3ViM0puTHlOMWNteDFkR2xzYzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lHaHlaV1k2SUhWeWJGQmhjbk5wYm1kT2IyUmxMbWh5WldZc1hHNGdJQ0FnSUNBZ0lDQWdjSEp2ZEc5amIydzZJSFZ5YkZCaGNuTnBibWRPYjJSbExuQnliM1J2WTI5c0lEOGdkWEpzVUdGeWMybHVaMDV2WkdVdWNISnZkRzlqYjJ3dWNtVndiR0ZqWlNndk9pUXZMQ0FuSnlrZ09pQW5KeXhjYmlBZ0lDQWdJQ0FnSUNCb2IzTjBPaUIxY214UVlYSnphVzVuVG05a1pTNW9iM04wTEZ4dUlDQWdJQ0FnSUNBZ0lITmxZWEpqYURvZ2RYSnNVR0Z5YzJsdVowNXZaR1V1YzJWaGNtTm9JRDhnZFhKc1VHRnljMmx1WjA1dlpHVXVjMlZoY21Ob0xuSmxjR3hoWTJVb0wxNWNYRDh2TENBbkp5a2dPaUFuSnl4Y2JpQWdJQ0FnSUNBZ0lDQm9ZWE5vT2lCMWNteFFZWEp6YVc1blRtOWtaUzVvWVhOb0lEOGdkWEpzVUdGeWMybHVaMDV2WkdVdWFHRnphQzV5WlhCc1lXTmxLQzllSXk4c0lDY25LU0E2SUNjbkxGeHVJQ0FnSUNBZ0lDQWdJR2h2YzNSdVlXMWxPaUIxY214UVlYSnphVzVuVG05a1pTNW9iM04wYm1GdFpTeGNiaUFnSUNBZ0lDQWdJQ0J3YjNKME9pQjFjbXhRWVhKemFXNW5UbTlrWlM1d2IzSjBMRnh1SUNBZ0lDQWdJQ0FnSUhCaGRHaHVZVzFsT2lBb2RYSnNVR0Z5YzJsdVowNXZaR1V1Y0dGMGFHNWhiV1V1WTJoaGNrRjBLREFwSUQwOVBTQW5MeWNwSUQ5Y2JpQWdJQ0FnSUNBZ0lDQWdJSFZ5YkZCaGNuTnBibWRPYjJSbExuQmhkR2h1WVcxbElEcGNiaUFnSUNBZ0lDQWdJQ0FnSUNjdkp5QXJJSFZ5YkZCaGNuTnBibWRPYjJSbExuQmhkR2h1WVcxbFhHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJRzl5YVdkcGJsVlNUQ0E5SUhKbGMyOXNkbVZWVWt3b2QybHVaRzkzTG14dlkyRjBhVzl1TG1oeVpXWXBPMXh1WEc0Z0lDQWdJQ0F2S2lwY2JpQWdJQ0FxSUVSbGRHVnliV2x1WlNCcFppQmhJRlZTVENCemFHRnlaWE1nZEdobElITmhiV1VnYjNKcFoybHVJR0Z6SUhSb1pTQmpkWEp5Wlc1MElHeHZZMkYwYVc5dVhHNGdJQ0FnS2x4dUlDQWdJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJSEpsY1hWbGMzUlZVa3dnVkdobElGVlNUQ0IwYnlCMFpYTjBYRzRnSUNBZ0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQlZVa3dnYzJoaGNtVnpJSFJvWlNCellXMWxJRzl5YVdkcGJpd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdJQ0FnS2k5Y2JpQWdJQ0FnSUhKbGRIVnliaUJtZFc1amRHbHZiaUJwYzFWU1RGTmhiV1ZQY21sbmFXNG9jbVZ4ZFdWemRGVlNUQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdjR0Z5YzJWa0lEMGdLSFYwYVd4ekxtbHpVM1J5YVc1bktISmxjWFZsYzNSVlVrd3BLU0EvSUhKbGMyOXNkbVZWVWt3b2NtVnhkV1Z6ZEZWU1RDa2dPaUJ5WlhGMVpYTjBWVkpNTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnS0hCaGNuTmxaQzV3Y205MGIyTnZiQ0E5UFQwZ2IzSnBaMmx1VlZKTUxuQnliM1J2WTI5c0lDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNCd1lYSnpaV1F1YUc5emRDQTlQVDBnYjNKcFoybHVWVkpNTG1odmMzUXBPMXh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlLU2dwSURwY2JseHVJQ0F2THlCT2IyNGdjM1JoYm1SaGNtUWdZbkp2ZDNObGNpQmxiblp6SUNoM1pXSWdkMjl5YTJWeWN5d2djbVZoWTNRdGJtRjBhWFpsS1NCc1lXTnJJRzVsWldSbFpDQnpkWEJ3YjNKMExseHVJQ0FnSUNobWRXNWpkR2x2YmlCdWIyNVRkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdhWE5WVWt4VFlXMWxUM0pwWjJsdUtDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdJQ0FnSUgwN1hHNGdJQ0FnZlNrb0tWeHVLVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTR2ZFhScGJITW5LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCdWIzSnRZV3hwZW1WSVpXRmtaWEpPWVcxbEtHaGxZV1JsY25Nc0lHNXZjbTFoYkdsNlpXUk9ZVzFsS1NCN1hHNGdJSFYwYVd4ekxtWnZja1ZoWTJnb2FHVmhaR1Z5Y3l3Z1puVnVZM1JwYjI0Z2NISnZZMlZ6YzBobFlXUmxjaWgyWVd4MVpTd2dibUZ0WlNrZ2UxeHVJQ0FnSUdsbUlDaHVZVzFsSUNFOVBTQnViM0p0WVd4cGVtVmtUbUZ0WlNBbUppQnVZVzFsTG5SdlZYQndaWEpEWVhObEtDa2dQVDA5SUc1dmNtMWhiR2w2WldST1lXMWxMblJ2VlhCd1pYSkRZWE5sS0NrcElIdGNiaUFnSUNBZ0lHaGxZV1JsY25OYmJtOXliV0ZzYVhwbFpFNWhiV1ZkSUQwZ2RtRnNkV1U3WEc0Z0lDQWdJQ0JrWld4bGRHVWdhR1ZoWkdWeWMxdHVZVzFsWFR0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk4dUxpOTFkR2xzY3ljcE8xeHVYRzR2THlCSVpXRmtaWEp6SUhkb2IzTmxJR1IxY0d4cFkyRjBaWE1nWVhKbElHbG5ibTl5WldRZ1lua2dibTlrWlZ4dUx5OGdZeTVtTGlCb2RIUndjem92TDI1dlpHVnFjeTV2Y21jdllYQnBMMmgwZEhBdWFIUnRiQ05vZEhSd1gyMWxjM05oWjJWZmFHVmhaR1Z5YzF4dWRtRnlJR2xuYm05eVpVUjFjR3hwWTJGMFpVOW1JRDBnVzF4dUlDQW5ZV2RsSnl3Z0oyRjFkR2h2Y21sNllYUnBiMjRuTENBblkyOXVkR1Z1ZEMxc1pXNW5kR2duTENBblkyOXVkR1Z1ZEMxMGVYQmxKeXdnSjJWMFlXY25MRnh1SUNBblpYaHdhWEpsY3ljc0lDZG1jbTl0Snl3Z0oyaHZjM1FuTENBbmFXWXRiVzlrYVdacFpXUXRjMmx1WTJVbkxDQW5hV1l0ZFc1dGIyUnBabWxsWkMxemFXNWpaU2NzWEc0Z0lDZHNZWE4wTFcxdlpHbG1hV1ZrSnl3Z0oyeHZZMkYwYVc5dUp5d2dKMjFoZUMxbWIzSjNZWEprY3ljc0lDZHdjbTk0ZVMxaGRYUm9iM0pwZW1GMGFXOXVKeXhjYmlBZ0ozSmxabVZ5WlhJbkxDQW5jbVYwY25rdFlXWjBaWEluTENBbmRYTmxjaTFoWjJWdWRDZGNibDA3WEc1Y2JpOHFLbHh1SUNvZ1VHRnljMlVnYUdWaFpHVnljeUJwYm5SdklHRnVJRzlpYW1WamRGeHVJQ3BjYmlBcUlHQmdZRnh1SUNvZ1JHRjBaVG9nVjJWa0xDQXlOeUJCZFdjZ01qQXhOQ0F3T0RvMU9EbzBPU0JIVFZSY2JpQXFJRU52Ym5SbGJuUXRWSGx3WlRvZ1lYQndiR2xqWVhScGIyNHZhbk52Ymx4dUlDb2dRMjl1Ym1WamRHbHZiam9nYTJWbGNDMWhiR2wyWlZ4dUlDb2dWSEpoYm5ObVpYSXRSVzVqYjJScGJtYzZJR05vZFc1clpXUmNiaUFxSUdCZ1lGeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCb1pXRmtaWEp6SUVobFlXUmxjbk1nYm1WbFpHbHVaeUIwYnlCaVpTQndZWEp6WldSY2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRWhsWVdSbGNuTWdjR0Z5YzJWa0lHbHVkRzhnWVc0Z2IySnFaV04wWEc0Z0tpOWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdjR0Z5YzJWSVpXRmtaWEp6S0dobFlXUmxjbk1wSUh0Y2JpQWdkbUZ5SUhCaGNuTmxaQ0E5SUh0OU8xeHVJQ0IyWVhJZ2EyVjVPMXh1SUNCMllYSWdkbUZzTzF4dUlDQjJZWElnYVR0Y2JseHVJQ0JwWmlBb0lXaGxZV1JsY25NcElIc2djbVYwZFhKdUlIQmhjbk5sWkRzZ2ZWeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29hR1ZoWkdWeWN5NXpjR3hwZENnblhGeHVKeWtzSUdaMWJtTjBhVzl1SUhCaGNuTmxjaWhzYVc1bEtTQjdYRzRnSUNBZ2FTQTlJR3hwYm1VdWFXNWtaWGhQWmlnbk9pY3BPMXh1SUNBZ0lHdGxlU0E5SUhWMGFXeHpMblJ5YVcwb2JHbHVaUzV6ZFdKemRISW9NQ3dnYVNrcExuUnZURzkzWlhKRFlYTmxLQ2s3WEc0Z0lDQWdkbUZzSUQwZ2RYUnBiSE11ZEhKcGJTaHNhVzVsTG5OMVluTjBjaWhwSUNzZ01Ta3BPMXh1WEc0Z0lDQWdhV1lnS0d0bGVTa2dlMXh1SUNBZ0lDQWdhV1lnS0hCaGNuTmxaRnRyWlhsZElDWW1JR2xuYm05eVpVUjFjR3hwWTJGMFpVOW1MbWx1WkdWNFQyWW9hMlY1S1NBK1BTQXdLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2xtSUNoclpYa2dQVDA5SUNkelpYUXRZMjl2YTJsbEp5a2dlMXh1SUNBZ0lDQWdJQ0J3WVhKelpXUmJhMlY1WFNBOUlDaHdZWEp6WldSYmEyVjVYU0EvSUhCaGNuTmxaRnRyWlhsZElEb2dXMTBwTG1OdmJtTmhkQ2hiZG1Gc1hTazdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQndZWEp6WldSYmEyVjVYU0E5SUhCaGNuTmxaRnRyWlhsZElEOGdjR0Z5YzJWa1cydGxlVjBnS3lBbkxDQW5JQ3NnZG1Gc0lEb2dkbUZzTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZTazdYRzVjYmlBZ2NtVjBkWEp1SUhCaGNuTmxaRHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiaThxS2x4dUlDb2dVM2x1ZEdGamRHbGpJSE4xWjJGeUlHWnZjaUJwYm5admEybHVaeUJoSUdaMWJtTjBhVzl1SUdGdVpDQmxlSEJoYm1ScGJtY2dZVzRnWVhKeVlYa2dabTl5SUdGeVozVnRaVzUwY3k1Y2JpQXFYRzRnS2lCRGIyMXRiMjRnZFhObElHTmhjMlVnZDI5MWJHUWdZbVVnZEc4Z2RYTmxJR0JHZFc1amRHbHZiaTV3Y205MGIzUjVjR1V1WVhCd2JIbGdMbHh1SUNwY2JpQXFJQ0JnWUdCcWMxeHVJQ29nSUdaMWJtTjBhVzl1SUdZb2VDd2dlU3dnZWlrZ2UzMWNiaUFxSUNCMllYSWdZWEpuY3lBOUlGc3hMQ0F5TENBelhUdGNiaUFxSUNCbUxtRndjR3g1S0c1MWJHd3NJR0Z5WjNNcE8xeHVJQ29nSUdCZ1lGeHVJQ3BjYmlBcUlGZHBkR2dnWUhOd2NtVmhaR0FnZEdocGN5QmxlR0Z0Y0d4bElHTmhiaUJpWlNCeVpTMTNjbWwwZEdWdUxseHVJQ3BjYmlBcUlDQmdZR0JxYzF4dUlDb2dJSE53Y21WaFpDaG1kVzVqZEdsdmJpaDRMQ0I1TENCNktTQjdmU2tvV3pFc0lESXNJRE5kS1R0Y2JpQXFJQ0JnWUdCY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCallXeHNZbUZqYTF4dUlDb2dRSEpsZEhWeWJuTWdlMFoxYm1OMGFXOXVmVnh1SUNvdlhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlITndjbVZoWkNoallXeHNZbUZqYXlrZ2UxeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdkM0poY0NoaGNuSXBJSHRjYmlBZ0lDQnlaWFIxY200Z1kyRnNiR0poWTJzdVlYQndiSGtvYm5Wc2JDd2dZWEp5S1R0Y2JpQWdmVHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCaWFXNWtJRDBnY21WeGRXbHlaU2duTGk5b1pXeHdaWEp6TDJKcGJtUW5LVHRjYmx4dUx5cG5iRzlpWVd3Z2RHOVRkSEpwYm1jNmRISjFaU292WEc1Y2JpOHZJSFYwYVd4eklHbHpJR0VnYkdsaWNtRnllU0J2WmlCblpXNWxjbWxqSUdobGJIQmxjaUJtZFc1amRHbHZibk1nYm05dUxYTndaV05wWm1saklIUnZJR0Y0YVc5elhHNWNiblpoY2lCMGIxTjBjbWx1WnlBOUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jN1hHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lXNGdRWEp5WVhsY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoYmlCQmNuSmhlU3dnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpRWEp5WVhrb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGIxTjBjbWx1Wnk1allXeHNLSFpoYkNrZ1BUMDlJQ2RiYjJKcVpXTjBJRUZ5Y21GNVhTYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nZFc1a1pXWnBibVZrWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkR2hsSUhaaGJIVmxJR2x6SUhWdVpHVm1hVzVsWkN3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6Vlc1a1pXWnBibVZrS0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JSFpoYkNBOVBUMGdKM1Z1WkdWbWFXNWxaQ2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkNkV1ptWlhKY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoSUVKMVptWmxjaXdnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpRblZtWm1WeUtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RtRnNJQ0U5UFNCdWRXeHNJQ1ltSUNGcGMxVnVaR1ZtYVc1bFpDaDJZV3dwSUNZbUlIWmhiQzVqYjI1emRISjFZM1J2Y2lBaFBUMGdiblZzYkNBbUppQWhhWE5WYm1SbFptbHVaV1FvZG1Gc0xtTnZibk4wY25WamRHOXlLVnh1SUNBZ0lDWW1JSFI1Y0dWdlppQjJZV3d1WTI5dWMzUnlkV04wYjNJdWFYTkNkV1ptWlhJZ1BUMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ2RtRnNMbU52Ym5OMGNuVmpkRzl5TG1selFuVm1abVZ5S0haaGJDazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVc0Z1FYSnlZWGxDZFdabVpYSmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2RtRnNJRlJvWlNCMllXeDFaU0IwYnlCMFpYTjBYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCMllXeDFaU0JwY3lCaGJpQkJjbkpoZVVKMVptWmxjaXdnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpRWEp5WVhsQ2RXWm1aWElvZG1Gc0tTQjdYRzRnSUhKbGRIVnliaUIwYjFOMGNtbHVaeTVqWVd4c0tIWmhiQ2tnUFQwOUlDZGJiMkpxWldOMElFRnljbUY1UW5WbVptVnlYU2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQkdiM0p0UkdGMFlWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdGdUlFWnZjbTFFWVhSaExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOR2IzSnRSR0YwWVNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUNoMGVYQmxiMllnUm05eWJVUmhkR0VnSVQwOUlDZDFibVJsWm1sdVpXUW5LU0FtSmlBb2RtRnNJR2x1YzNSaGJtTmxiMllnUm05eWJVUmhkR0VwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdkbWxsZHlCdmJpQmhiaUJCY25KaGVVSjFabVpsY2x4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0VnZG1sbGR5QnZiaUJoYmlCQmNuSmhlVUoxWm1abGNpd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselFYSnlZWGxDZFdabVpYSldhV1YzS0haaGJDa2dlMXh1SUNCMllYSWdjbVZ6ZFd4ME8xeHVJQ0JwWmlBb0tIUjVjR1Z2WmlCQmNuSmhlVUoxWm1abGNpQWhQVDBnSjNWdVpHVm1hVzVsWkNjcElDWW1JQ2hCY25KaGVVSjFabVpsY2k1cGMxWnBaWGNwS1NCN1hHNGdJQ0FnY21WemRXeDBJRDBnUVhKeVlYbENkV1ptWlhJdWFYTldhV1YzS0haaGJDazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjbVZ6ZFd4MElEMGdLSFpoYkNrZ0ppWWdLSFpoYkM1aWRXWm1aWElwSUNZbUlDaDJZV3d1WW5WbVptVnlJR2x1YzNSaGJtTmxiMllnUVhKeVlYbENkV1ptWlhJcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQlRkSEpwYm1kY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoSUZOMGNtbHVaeXdnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpVM1J5YVc1bktIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUhaaGJDQTlQVDBnSjNOMGNtbHVaeWM3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQk9kVzFpWlhKY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoSUU1MWJXSmxjaXdnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpUblZ0WW1WeUtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUhaaGJDQTlQVDBnSjI1MWJXSmxjaWM3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lXNGdUMkpxWldOMFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVc0Z1QySnFaV04wTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5QWW1wbFkzUW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjJZV3dnSVQwOUlHNTFiR3dnSmlZZ2RIbHdaVzltSUhaaGJDQTlQVDBnSjI5aWFtVmpkQ2M3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQndiR0ZwYmlCUFltcGxZM1JjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdUlIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdjR3hoYVc0Z1QySnFaV04wTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5RYkdGcGJrOWlhbVZqZENoMllXd3BJSHRjYmlBZ2FXWWdLSFJ2VTNSeWFXNW5MbU5oYkd3b2RtRnNLU0FoUFQwZ0oxdHZZbXBsWTNRZ1QySnFaV04wWFNjcElIdGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUgxY2JseHVJQ0IyWVhJZ2NISnZkRzkwZVhCbElEMGdUMkpxWldOMExtZGxkRkJ5YjNSdmRIbHdaVTltS0haaGJDazdYRzRnSUhKbGRIVnliaUJ3Y205MGIzUjVjR1VnUFQwOUlHNTFiR3dnZkh3Z2NISnZkRzkwZVhCbElEMDlQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1JHRjBaVnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdSR0YwWlN3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6UkdGMFpTaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQTlQVDBnSjF0dlltcGxZM1FnUkdGMFpWMG5PMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1JtbHNaVnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdSbWxzWlN3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6Um1sc1pTaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQTlQVDBnSjF0dlltcGxZM1FnUm1sc1pWMG5PMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1FteHZZbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdRbXh2WWl3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6UW14dllpaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQTlQVDBnSjF0dlltcGxZM1FnUW14dllsMG5PMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1JuVnVZM1JwYjI1Y2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoSUVaMWJtTjBhVzl1TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5HZFc1amRHbHZiaWgyWVd3cElIdGNiaUFnY21WMGRYSnVJSFJ2VTNSeWFXNW5MbU5oYkd3b2RtRnNLU0E5UFQwZ0oxdHZZbXBsWTNRZ1JuVnVZM1JwYjI1ZEp6dGNibjFjYmx4dUx5b3FYRzRnS2lCRVpYUmxjbTFwYm1VZ2FXWWdZU0IyWVd4MVpTQnBjeUJoSUZOMGNtVmhiVnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdVM1J5WldGdExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOVGRISmxZVzBvZG1Gc0tTQjdYRzRnSUhKbGRIVnliaUJwYzA5aWFtVmpkQ2gyWVd3cElDWW1JR2x6Um5WdVkzUnBiMjRvZG1Gc0xuQnBjR1VwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElIWmhiSFZsSUdseklHRWdWVkpNVTJWaGNtTm9VR0Z5WVcxeklHOWlhbVZqZEZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0VnVlZKTVUyVmhjbU5vVUdGeVlXMXpJRzlpYW1WamRDd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselZWSk1VMlZoY21Ob1VHRnlZVzF6S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JRlZTVEZObFlYSmphRkJoY21GdGN5QWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdkbUZzSUdsdWMzUmhibU5sYjJZZ1ZWSk1VMlZoY21Ob1VHRnlZVzF6TzF4dWZWeHVYRzR2S2lwY2JpQXFJRlJ5YVcwZ1pYaGpaWE56SUhkb2FYUmxjM0JoWTJVZ2IyWm1JSFJvWlNCaVpXZHBibTVwYm1jZ1lXNWtJR1Z1WkNCdlppQmhJSE4wY21sdVoxeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCemRISWdWR2hsSUZOMGNtbHVaeUIwYnlCMGNtbHRYRzRnS2lCQWNtVjBkWEp1Y3lCN1UzUnlhVzVuZlNCVWFHVWdVM1J5YVc1bklHWnlaV1ZrSUc5bUlHVjRZMlZ6Y3lCM2FHbDBaWE53WVdObFhHNGdLaTljYm1aMWJtTjBhVzl1SUhSeWFXMG9jM1J5S1NCN1hHNGdJSEpsZEhWeWJpQnpkSEl1Y21Wd2JHRmpaU2d2WGx4Y2N5b3ZMQ0FuSnlrdWNtVndiR0ZqWlNndlhGeHpLaVF2TENBbkp5azdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JSGRsSjNKbElISjFibTVwYm1jZ2FXNGdZU0J6ZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZG1seWIyNXRaVzUwWEc0Z0tseHVJQ29nVkdocGN5QmhiR3h2ZDNNZ1lYaHBiM01nZEc4Z2NuVnVJR2x1SUdFZ2QyVmlJSGR2Y210bGNpd2dZVzVrSUhKbFlXTjBMVzVoZEdsMlpTNWNiaUFxSUVKdmRHZ2daVzUyYVhKdmJtMWxiblJ6SUhOMWNIQnZjblFnV0UxTVNIUjBjRkpsY1hWbGMzUXNJR0oxZENCdWIzUWdablZzYkhrZ2MzUmhibVJoY21RZ1oyeHZZbUZzY3k1Y2JpQXFYRzRnS2lCM1pXSWdkMjl5YTJWeWN6cGNiaUFxSUNCMGVYQmxiMllnZDJsdVpHOTNJQzArSUhWdVpHVm1hVzVsWkZ4dUlDb2dJSFI1Y0dWdlppQmtiMk4xYldWdWRDQXRQaUIxYm1SbFptbHVaV1JjYmlBcVhHNGdLaUJ5WldGamRDMXVZWFJwZG1VNlhHNGdLaUFnYm1GMmFXZGhkRzl5TG5CeWIyUjFZM1FnTFQ0Z0oxSmxZV04wVG1GMGFYWmxKMXh1SUNvZ2JtRjBhWFpsYzJOeWFYQjBYRzRnS2lBZ2JtRjJhV2RoZEc5eUxuQnliMlIxWTNRZ0xUNGdKMDVoZEdsMlpWTmpjbWx3ZENjZ2IzSWdKMDVUSjF4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzFOMFlXNWtZWEprUW5KdmQzTmxja1Z1ZGlncElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCdVlYWnBaMkYwYjNJZ0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlDaHVZWFpwWjJGMGIzSXVjSEp2WkhWamRDQTlQVDBnSjFKbFlXTjBUbUYwYVhabEp5QjhmRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzVoZG1sbllYUnZjaTV3Y205a2RXTjBJRDA5UFNBblRtRjBhWFpsVTJOeWFYQjBKeUI4ZkZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUc1aGRtbG5ZWFJ2Y2k1d2NtOWtkV04wSUQwOVBTQW5UbE1uS1NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z0tGeHVJQ0FnSUhSNWNHVnZaaUIzYVc1a2IzY2dJVDA5SUNkMWJtUmxabWx1WldRbklDWW1YRzRnSUNBZ2RIbHdaVzltSUdSdlkzVnRaVzUwSUNFOVBTQW5kVzVrWldacGJtVmtKMXh1SUNBcE8xeHVmVnh1WEc0dktpcGNiaUFxSUVsMFpYSmhkR1VnYjNabGNpQmhiaUJCY25KaGVTQnZjaUJoYmlCUFltcGxZM1FnYVc1MmIydHBibWNnWVNCbWRXNWpkR2x2YmlCbWIzSWdaV0ZqYUNCcGRHVnRMbHh1SUNwY2JpQXFJRWxtSUdCdlltcGdJR2x6SUdGdUlFRnljbUY1SUdOaGJHeGlZV05ySUhkcGJHd2dZbVVnWTJGc2JHVmtJSEJoYzNOcGJtZGNiaUFxSUhSb1pTQjJZV3gxWlN3Z2FXNWtaWGdzSUdGdVpDQmpiMjF3YkdWMFpTQmhjbkpoZVNCbWIzSWdaV0ZqYUNCcGRHVnRMbHh1SUNwY2JpQXFJRWxtSUNkdlltb25JR2x6SUdGdUlFOWlhbVZqZENCallXeHNZbUZqYXlCM2FXeHNJR0psSUdOaGJHeGxaQ0J3WVhOemFXNW5YRzRnS2lCMGFHVWdkbUZzZFdVc0lHdGxlU3dnWVc1a0lHTnZiWEJzWlhSbElHOWlhbVZqZENCbWIzSWdaV0ZqYUNCd2NtOXdaWEowZVM1Y2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSHhCY25KaGVYMGdiMkpxSUZSb1pTQnZZbXBsWTNRZ2RHOGdhWFJsY21GMFpWeHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm00Z1ZHaGxJR05oYkd4aVlXTnJJSFJ2SUdsdWRtOXJaU0JtYjNJZ1pXRmphQ0JwZEdWdFhHNGdLaTljYm1aMWJtTjBhVzl1SUdadmNrVmhZMmdvYjJKcUxDQm1iaWtnZTF4dUlDQXZMeUJFYjI0bmRDQmliM1JvWlhJZ2FXWWdibThnZG1Gc2RXVWdjSEp2ZG1sa1pXUmNiaUFnYVdZZ0tHOWlhaUE5UFQwZ2JuVnNiQ0I4ZkNCMGVYQmxiMllnYjJKcUlEMDlQU0FuZFc1a1pXWnBibVZrSnlrZ2UxeHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVYRzRnSUM4dklFWnZjbU5sSUdGdUlHRnljbUY1SUdsbUlHNXZkQ0JoYkhKbFlXUjVJSE52YldWMGFHbHVaeUJwZEdWeVlXSnNaVnh1SUNCcFppQW9kSGx3Wlc5bUlHOWlhaUFoUFQwZ0oyOWlhbVZqZENjcElIdGNiaUFnSUNBdkttVnpiR2x1ZENCdWJ5MXdZWEpoYlMxeVpXRnpjMmxuYmpvd0tpOWNiaUFnSUNCdlltb2dQU0JiYjJKcVhUdGNiaUFnZlZ4dVhHNGdJR2xtSUNocGMwRnljbUY1S0c5aWFpa3BJSHRjYmlBZ0lDQXZMeUJKZEdWeVlYUmxJRzkyWlhJZ1lYSnlZWGtnZG1Gc2RXVnpYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUd3Z1BTQnZZbW91YkdWdVozUm9PeUJwSUR3Z2JEc2dhU3NyS1NCN1hHNGdJQ0FnSUNCbWJpNWpZV3hzS0c1MWJHd3NJRzlpYWx0cFhTd2dhU3dnYjJKcUtUdGNiaUFnSUNCOVhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ0x5OGdTWFJsY21GMFpTQnZkbVZ5SUc5aWFtVmpkQ0JyWlhselhHNGdJQ0FnWm05eUlDaDJZWElnYTJWNUlHbHVJRzlpYWlrZ2UxeHVJQ0FnSUNBZ2FXWWdLRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2h2WW1vc0lHdGxlU2twSUh0Y2JpQWdJQ0FnSUNBZ1ptNHVZMkZzYkNodWRXeHNMQ0J2WW1wYmEyVjVYU3dnYTJWNUxDQnZZbW9wTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxSUVGalkyVndkSE1nZG1GeVlYSm5jeUJsZUhCbFkzUnBibWNnWldGamFDQmhjbWQxYldWdWRDQjBieUJpWlNCaGJpQnZZbXBsWTNRc0lIUm9aVzVjYmlBcUlHbHRiWFYwWVdKc2VTQnRaWEpuWlhNZ2RHaGxJSEJ5YjNCbGNuUnBaWE1nYjJZZ1pXRmphQ0J2WW1wbFkzUWdZVzVrSUhKbGRIVnlibk1nY21WemRXeDBMbHh1SUNwY2JpQXFJRmRvWlc0Z2JYVnNkR2x3YkdVZ2IySnFaV04wY3lCamIyNTBZV2x1SUhSb1pTQnpZVzFsSUd0bGVTQjBhR1VnYkdGMFpYSWdiMkpxWldOMElHbHVYRzRnS2lCMGFHVWdZWEpuZFcxbGJuUnpJR3hwYzNRZ2QybHNiQ0IwWVd0bElIQnlaV05sWkdWdVkyVXVYRzRnS2x4dUlDb2dSWGhoYlhCc1pUcGNiaUFxWEc0Z0tpQmdZR0JxYzF4dUlDb2dkbUZ5SUhKbGMzVnNkQ0E5SUcxbGNtZGxLSHRtYjI4NklERXlNMzBzSUh0bWIyODZJRFExTm4wcE8xeHVJQ29nWTI5dWMyOXNaUzVzYjJjb2NtVnpkV3gwTG1admJ5azdJQzh2SUc5MWRIQjFkSE1nTkRVMlhHNGdLaUJnWUdCY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjJKcU1TQlBZbXBsWTNRZ2RHOGdiV1Z5WjJWY2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRkpsYzNWc2RDQnZaaUJoYkd3Z2JXVnlaMlVnY0hKdmNHVnlkR2xsYzF4dUlDb3ZYRzVtZFc1amRHbHZiaUJ0WlhKblpTZ3ZLaUJ2WW1veExDQnZZbW95TENCdlltb3pMQ0F1TGk0Z0tpOHBJSHRjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJSHQ5TzF4dUlDQm1kVzVqZEdsdmJpQmhjM05wWjI1V1lXeDFaU2gyWVd3c0lHdGxlU2tnZTF4dUlDQWdJR2xtSUNocGMxQnNZV2x1VDJKcVpXTjBLSEpsYzNWc2RGdHJaWGxkS1NBbUppQnBjMUJzWVdsdVQySnFaV04wS0haaGJDa3BJSHRjYmlBZ0lDQWdJSEpsYzNWc2RGdHJaWGxkSUQwZ2JXVnlaMlVvY21WemRXeDBXMnRsZVYwc0lIWmhiQ2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hwYzFCc1lXbHVUMkpxWldOMEtIWmhiQ2twSUh0Y2JpQWdJQ0FnSUhKbGMzVnNkRnRyWlhsZElEMGdiV1Z5WjJVb2UzMHNJSFpoYkNrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNocGMwRnljbUY1S0haaGJDa3BJSHRjYmlBZ0lDQWdJSEpsYzNWc2RGdHJaWGxkSUQwZ2RtRnNMbk5zYVdObEtDazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhKbGMzVnNkRnRyWlhsZElEMGdkbUZzTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzSUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYURzZ2FTQThJR3c3SUdrckt5a2dlMXh1SUNBZ0lHWnZja1ZoWTJnb1lYSm5kVzFsYm5SelcybGRMQ0JoYzNOcFoyNVdZV3gxWlNrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xWEc0Z0tpQkZlSFJsYm1SeklHOWlhbVZqZENCaElHSjVJRzExZEdGaWJIa2dZV1JrYVc1bklIUnZJR2wwSUhSb1pTQndjbTl3WlhKMGFXVnpJRzltSUc5aWFtVmpkQ0JpTGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JoSUZSb1pTQnZZbXBsWTNRZ2RHOGdZbVVnWlhoMFpXNWtaV1JjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCaUlGUm9aU0J2WW1wbFkzUWdkRzhnWTI5d2VTQndjbTl3WlhKMGFXVnpJR1p5YjIxY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjBhR2x6UVhKbklGUm9aU0J2WW1wbFkzUWdkRzhnWW1sdVpDQm1kVzVqZEdsdmJpQjBiMXh1SUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlNCVWFHVWdjbVZ6ZFd4MGFXNW5JSFpoYkhWbElHOW1JRzlpYW1WamRDQmhYRzRnS2k5Y2JtWjFibU4wYVc5dUlHVjRkR1Z1WkNoaExDQmlMQ0IwYUdselFYSm5LU0I3WEc0Z0lHWnZja1ZoWTJnb1lpd2dablZ1WTNScGIyNGdZWE56YVdkdVZtRnNkV1VvZG1Gc0xDQnJaWGtwSUh0Y2JpQWdJQ0JwWmlBb2RHaHBjMEZ5WnlBbUppQjBlWEJsYjJZZ2RtRnNJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQmhXMnRsZVYwZ1BTQmlhVzVrS0haaGJDd2dkR2hwYzBGeVp5azdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUdGYmEyVjVYU0E5SUhaaGJEdGNiaUFnSUNCOVhHNGdJSDBwTzF4dUlDQnlaWFIxY200Z1lUdGNibjFjYmx4dUx5b3FYRzRnS2lCU1pXMXZkbVVnWW5sMFpTQnZjbVJsY2lCdFlYSnJaWEl1SUZSb2FYTWdZMkYwWTJobGN5QkZSaUJDUWlCQ1JpQW9kR2hsSUZWVVJpMDRJRUpQVFNsY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnWTI5dWRHVnVkQ0IzYVhSb0lFSlBUVnh1SUNvZ1FISmxkSFZ5YmlCN2MzUnlhVzVuZlNCamIyNTBaVzUwSUhaaGJIVmxJSGRwZEdodmRYUWdRazlOWEc0Z0tpOWNibVoxYm1OMGFXOXVJSE4wY21sd1FrOU5LR052Ym5SbGJuUXBJSHRjYmlBZ2FXWWdLR052Ym5SbGJuUXVZMmhoY2tOdlpHVkJkQ2d3S1NBOVBUMGdNSGhHUlVaR0tTQjdYRzRnSUNBZ1kyOXVkR1Z1ZENBOUlHTnZiblJsYm5RdWMyeHBZMlVvTVNrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdOdmJuUmxiblE3WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdlMXh1SUNCcGMwRnljbUY1T2lCcGMwRnljbUY1TEZ4dUlDQnBjMEZ5Y21GNVFuVm1abVZ5T2lCcGMwRnljbUY1UW5WbVptVnlMRnh1SUNCcGMwSjFabVpsY2pvZ2FYTkNkV1ptWlhJc1hHNGdJR2x6Um05eWJVUmhkR0U2SUdselJtOXliVVJoZEdFc1hHNGdJR2x6UVhKeVlYbENkV1ptWlhKV2FXVjNPaUJwYzBGeWNtRjVRblZtWm1WeVZtbGxkeXhjYmlBZ2FYTlRkSEpwYm1jNklHbHpVM1J5YVc1bkxGeHVJQ0JwYzA1MWJXSmxjam9nYVhOT2RXMWlaWElzWEc0Z0lHbHpUMkpxWldOME9pQnBjMDlpYW1WamRDeGNiaUFnYVhOUWJHRnBiazlpYW1WamREb2dhWE5RYkdGcGJrOWlhbVZqZEN4Y2JpQWdhWE5WYm1SbFptbHVaV1E2SUdselZXNWtaV1pwYm1Wa0xGeHVJQ0JwYzBSaGRHVTZJR2x6UkdGMFpTeGNiaUFnYVhOR2FXeGxPaUJwYzBacGJHVXNYRzRnSUdselFteHZZam9nYVhOQ2JHOWlMRnh1SUNCcGMwWjFibU4wYVc5dU9pQnBjMFoxYm1OMGFXOXVMRnh1SUNCcGMxTjBjbVZoYlRvZ2FYTlRkSEpsWVcwc1hHNGdJR2x6VlZKTVUyVmhjbU5vVUdGeVlXMXpPaUJwYzFWU1RGTmxZWEpqYUZCaGNtRnRjeXhjYmlBZ2FYTlRkR0Z1WkdGeVpFSnliM2R6WlhKRmJuWTZJR2x6VTNSaGJtUmhjbVJDY205M2MyVnlSVzUyTEZ4dUlDQm1iM0pGWVdOb09pQm1iM0pGWVdOb0xGeHVJQ0J0WlhKblpUb2diV1Z5WjJVc1hHNGdJR1Y0ZEdWdVpEb2daWGgwWlc1a0xGeHVJQ0IwY21sdE9pQjBjbWx0TEZ4dUlDQnpkSEpwY0VKUFRUb2djM1J5YVhCQ1QwMWNibjA3WEc0aUxDSXZMeUJ6YUdsdElHWnZjaUIxYzJsdVp5QndjbTlqWlhOeklHbHVJR0p5YjNkelpYSmNiblpoY2lCd2NtOWpaWE56SUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN2ZUdGNibHh1THk4Z1kyRmphR1ZrSUdaeWIyMGdkMmhoZEdWMlpYSWdaMnh2WW1Gc0lHbHpJSEJ5WlhObGJuUWdjMjhnZEdoaGRDQjBaWE4wSUhKMWJtNWxjbk1nZEdoaGRDQnpkSFZpSUdsMFhHNHZMeUJrYjI0bmRDQmljbVZoYXlCMGFHbHVaM011SUNCQ2RYUWdkMlVnYm1WbFpDQjBieUIzY21Gd0lHbDBJR2x1SUdFZ2RISjVJR05oZEdOb0lHbHVJR05oYzJVZ2FYUWdhWE5jYmk4dklIZHlZWEJ3WldRZ2FXNGdjM1J5YVdOMElHMXZaR1VnWTI5a1pTQjNhR2xqYUNCa2IyVnpiaWQwSUdSbFptbHVaU0JoYm5rZ1oyeHZZbUZzY3k0Z0lFbDBKM01nYVc1emFXUmxJR0ZjYmk4dklHWjFibU4wYVc5dUlHSmxZMkYxYzJVZ2RISjVMMk5oZEdOb1pYTWdaR1Z2Y0hScGJXbDZaU0JwYmlCalpYSjBZV2x1SUdWdVoybHVaWE11WEc1Y2JuWmhjaUJqWVdOb1pXUlRaWFJVYVcxbGIzVjBPMXh1ZG1GeUlHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWREdGNibHh1Wm5WdVkzUnBiMjRnWkdWbVlYVnNkRk5sZEZScGJXOTFkQ2dwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM05sZEZScGJXVnZkWFFnYUdGeklHNXZkQ0JpWldWdUlHUmxabWx1WldRbktUdGNibjFjYm1aMWJtTjBhVzl1SUdSbFptRjFiSFJEYkdWaGNsUnBiV1Z2ZFhRZ0tDa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblkyeGxZWEpVYVcxbGIzVjBJR2hoY3lCdWIzUWdZbVZsYmlCa1pXWnBibVZrSnlrN1hHNTlYRzRvWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYzJWMFZHbHRaVzkxZENBOVBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlJSE5sZEZScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpZV05vWldSVFpYUlVhVzFsYjNWMElEMGdaR1ZtWVhWc2RGTmxkRlJwYlc5MWREdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQWdJQ0FnWTJGamFHVmtVMlYwVkdsdFpXOTFkQ0E5SUdSbFptRjFiSFJUWlhSVWFXMXZkWFE3WEc0Z0lDQWdmVnh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ1kyeGxZWEpVYVcxbGIzVjBJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BTQmpiR1ZoY2xScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpZV05vWldSRGJHVmhjbFJwYldWdmRYUWdQU0JrWldaaGRXeDBRMnhsWVhKVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUNBZ0lDQmpZV05vWldSRGJHVmhjbFJwYldWdmRYUWdQU0JrWldaaGRXeDBRMnhsWVhKVWFXMWxiM1YwTzF4dUlDQWdJSDFjYm4wZ0tDa3BYRzVtZFc1amRHbHZiaUJ5ZFc1VWFXMWxiM1YwS0daMWJpa2dlMXh1SUNBZ0lHbG1JQ2hqWVdOb1pXUlRaWFJVYVcxbGIzVjBJRDA5UFNCelpYUlVhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJQzh2Ym05eWJXRnNJR1Z1ZG1seWIyMWxiblJ6SUdsdUlITmhibVVnYzJsMGRXRjBhVzl1YzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYzJWMFZHbHRaVzkxZENobWRXNHNJREFwTzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUJwWmlCelpYUlVhVzFsYjNWMElIZGhjMjRuZENCaGRtRnBiR0ZpYkdVZ1luVjBJSGRoY3lCc1lYUjBaWElnWkdWbWFXNWxaRnh1SUNBZ0lHbG1JQ2dvWTJGamFHVmtVMlYwVkdsdFpXOTFkQ0E5UFQwZ1pHVm1ZWFZzZEZObGRGUnBiVzkxZENCOGZDQWhZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDa2dKaVlnYzJWMFZHbHRaVzkxZENrZ2UxeHVJQ0FnSUNBZ0lDQmpZV05vWldSVFpYUlVhVzFsYjNWMElEMGdjMlYwVkdsdFpXOTFkRHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSE5sZEZScGJXVnZkWFFvWm5WdUxDQXdLVHRjYmlBZ0lDQjlYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnTHk4Z2QyaGxiaUIzYUdWdUlITnZiV1ZpYjJSNUlHaGhjeUJ6WTNKbGQyVmtJSGRwZEdnZ2MyVjBWR2x0Wlc5MWRDQmlkWFFnYm04Z1NTNUZMaUJ0WVdSa2JtVnpjMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDaG1kVzRzSURBcE8xeHVJQ0FnSUgwZ1kyRjBZMmdvWlNsN1hHNGdJQ0FnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJYYUdWdUlIZGxJR0Z5WlNCcGJpQkpMa1V1SUdKMWRDQjBhR1VnYzJOeWFYQjBJR2hoY3lCaVpXVnVJR1YyWVd4bFpDQnpieUJKTGtVdUlHUnZaWE51SjNRZ2RISjFjM1FnZEdobElHZHNiMkpoYkNCdlltcGxZM1FnZDJobGJpQmpZV3hzWldRZ2JtOXliV0ZzYkhsY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmpZV05vWldSVFpYUlVhVzFsYjNWMExtTmhiR3dvYm5Wc2JDd2dablZ1TENBd0tUdGNiaUFnSUNBZ0lDQWdmU0JqWVhSamFDaGxLWHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJSE5oYldVZ1lYTWdZV0p2ZG1VZ1luVjBJSGRvWlc0Z2FYUW5jeUJoSUhabGNuTnBiMjRnYjJZZ1NTNUZMaUIwYUdGMElHMTFjM1FnYUdGMlpTQjBhR1VnWjJ4dlltRnNJRzlpYW1WamRDQm1iM0lnSjNSb2FYTW5MQ0JvYjNCbWRXeHNlU0J2ZFhJZ1kyOXVkR1Y0ZENCamIzSnlaV04wSUc5MGFHVnlkMmx6WlNCcGRDQjNhV3hzSUhSb2NtOTNJR0VnWjJ4dlltRnNJR1Z5Y205eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDNWpZV3hzS0hSb2FYTXNJR1oxYml3Z01DazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmx4dWZWeHVablZ1WTNScGIyNGdjblZ1UTJ4bFlYSlVhVzFsYjNWMEtHMWhjbXRsY2lrZ2UxeHVJQ0FnSUdsbUlDaGpZV05vWldSRGJHVmhjbFJwYldWdmRYUWdQVDA5SUdOc1pXRnlWR2x0Wlc5MWRDa2dlMXh1SUNBZ0lDQWdJQ0F2TDI1dmNtMWhiQ0JsYm5acGNtOXRaVzUwY3lCcGJpQnpZVzVsSUhOcGRIVmhkR2x2Ym5OY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdOc1pXRnlWR2x0Wlc5MWRDaHRZWEpyWlhJcE8xeHVJQ0FnSUgxY2JpQWdJQ0F2THlCcFppQmpiR1ZoY2xScGJXVnZkWFFnZDJGemJpZDBJR0YyWVdsc1lXSnNaU0JpZFhRZ2QyRnpJR3hoZEhSbGNpQmtaV1pwYm1Wa1hHNGdJQ0FnYVdZZ0tDaGpZV05vWldSRGJHVmhjbFJwYldWdmRYUWdQVDA5SUdSbFptRjFiSFJEYkdWaGNsUnBiV1Z2ZFhRZ2ZId2dJV05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ2tnSmlZZ1kyeGxZWEpVYVcxbGIzVjBLU0I3WEc0Z0lDQWdJQ0FnSUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZENBOUlHTnNaV0Z5VkdsdFpXOTFkRHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR05zWldGeVZHbHRaVzkxZENodFlYSnJaWElwTzF4dUlDQWdJSDFjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNBdkx5QjNhR1Z1SUhkb1pXNGdjMjl0WldKdlpIa2dhR0Z6SUhOamNtVjNaV1FnZDJsMGFDQnpaWFJVYVcxbGIzVjBJR0oxZENCdWJ5QkpMa1V1SUcxaFpHUnVaWE56WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFFvYldGeWEyVnlLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxLWHRjYmlBZ0lDQWdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklGZG9aVzRnZDJVZ1lYSmxJR2x1SUVrdVJTNGdZblYwSUhSb1pTQnpZM0pwY0hRZ2FHRnpJR0psWlc0Z1pYWmhiR1ZrSUhOdklFa3VSUzRnWkc5bGMyNG5kQ0FnZEhKMWMzUWdkR2hsSUdkc2IySmhiQ0J2WW1wbFkzUWdkMmhsYmlCallXeHNaV1FnYm05eWJXRnNiSGxjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRdVkyRnNiQ2h1ZFd4c0xDQnRZWEpyWlhJcE8xeHVJQ0FnSUNBZ0lDQjlJR05oZEdOb0lDaGxLWHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJSE5oYldVZ1lYTWdZV0p2ZG1VZ1luVjBJSGRvWlc0Z2FYUW5jeUJoSUhabGNuTnBiMjRnYjJZZ1NTNUZMaUIwYUdGMElHMTFjM1FnYUdGMlpTQjBhR1VnWjJ4dlltRnNJRzlpYW1WamRDQm1iM0lnSjNSb2FYTW5MQ0JvYjNCbWRXeHNlU0J2ZFhJZ1kyOXVkR1Y0ZENCamIzSnlaV04wSUc5MGFHVnlkMmx6WlNCcGRDQjNhV3hzSUhSb2NtOTNJR0VnWjJ4dlltRnNJR1Z5Y205eUxseHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1UyOXRaU0IyWlhKemFXOXVjeUJ2WmlCSkxrVXVJR2hoZG1VZ1pHbG1abVZ5Wlc1MElISjFiR1Z6SUdadmNpQmpiR1ZoY2xScGJXVnZkWFFnZG5NZ2MyVjBWR2x0Wlc5MWRGeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQzVqWVd4c0tIUm9hWE1zSUcxaGNtdGxjaWs3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JseHVYRzU5WEc1MllYSWdjWFZsZFdVZ1BTQmJYVHRjYm5aaGNpQmtjbUZwYm1sdVp5QTlJR1poYkhObE8xeHVkbUZ5SUdOMWNuSmxiblJSZFdWMVpUdGNiblpoY2lCeGRXVjFaVWx1WkdWNElEMGdMVEU3WEc1Y2JtWjFibU4wYVc5dUlHTnNaV0Z1VlhCT1pYaDBWR2xqYXlncElIdGNiaUFnSUNCcFppQW9JV1J5WVdsdWFXNW5JSHg4SUNGamRYSnlaVzUwVVhWbGRXVXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lIMWNiaUFnSUNCa2NtRnBibWx1WnlBOUlHWmhiSE5sTzF4dUlDQWdJR2xtSUNoamRYSnlaVzUwVVhWbGRXVXViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQWdJSEYxWlhWbElEMGdZM1Z5Y21WdWRGRjFaWFZsTG1OdmJtTmhkQ2h4ZFdWMVpTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2NYVmxkV1ZKYm1SbGVDQTlJQzB4TzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvY1hWbGRXVXViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQWdJR1J5WVdsdVVYVmxkV1VvS1R0Y2JpQWdJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJR1J5WVdsdVVYVmxkV1VvS1NCN1hHNGdJQ0FnYVdZZ0tHUnlZV2x1YVc1bktTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnZG1GeUlIUnBiV1Z2ZFhRZ1BTQnlkVzVVYVcxbGIzVjBLR05zWldGdVZYQk9aWGgwVkdsamF5azdYRzRnSUNBZ1pISmhhVzVwYm1jZ1BTQjBjblZsTzF4dVhHNGdJQ0FnZG1GeUlHeGxiaUE5SUhGMVpYVmxMbXhsYm1kMGFEdGNiaUFnSUNCM2FHbHNaU2hzWlc0cElIdGNiaUFnSUNBZ0lDQWdZM1Z5Y21WdWRGRjFaWFZsSUQwZ2NYVmxkV1U3WEc0Z0lDQWdJQ0FnSUhGMVpYVmxJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lIZG9hV3hsSUNnckszRjFaWFZsU1c1a1pYZ2dQQ0JzWlc0cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGpkWEp5Wlc1MFVYVmxkV1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVVhWbGRXVmJjWFZsZFdWSmJtUmxlRjB1Y25WdUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdjWFZsZFdWSmJtUmxlQ0E5SUMweE8xeHVJQ0FnSUNBZ0lDQnNaVzRnUFNCeGRXVjFaUzVzWlc1bmRHZzdYRzRnSUNBZ2ZWeHVJQ0FnSUdOMWNuSmxiblJSZFdWMVpTQTlJRzUxYkd3N1hHNGdJQ0FnWkhKaGFXNXBibWNnUFNCbVlXeHpaVHRjYmlBZ0lDQnlkVzVEYkdWaGNsUnBiV1Z2ZFhRb2RHbHRaVzkxZENrN1hHNTlYRzVjYm5CeWIyTmxjM011Ym1WNGRGUnBZMnNnUFNCbWRXNWpkR2x2YmlBb1puVnVLU0I3WEc0Z0lDQWdkbUZ5SUdGeVozTWdQU0J1WlhjZ1FYSnlZWGtvWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0F0SURFcE8xeHVJQ0FnSUdsbUlDaGhjbWQxYldWdWRITXViR1Z1WjNSb0lENGdNU2tnZTF4dUlDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNVHNnYVNBOElHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnN0lHa3JLeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZWEpuYzF0cElDMGdNVjBnUFNCaGNtZDFiV1Z1ZEhOYmFWMDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUNBZ2NYVmxkV1V1Y0hWemFDaHVaWGNnU1hSbGJTaG1kVzRzSUdGeVozTXBLVHRjYmlBZ0lDQnBaaUFvY1hWbGRXVXViR1Z1WjNSb0lEMDlQU0F4SUNZbUlDRmtjbUZwYm1sdVp5a2dlMXh1SUNBZ0lDQWdJQ0J5ZFc1VWFXMWxiM1YwS0dSeVlXbHVVWFZsZFdVcE8xeHVJQ0FnSUgxY2JuMDdYRzVjYmk4dklIWTRJR3hwYTJWeklIQnlaV1JwWTNScFlteGxJRzlpYW1WamRITmNibVoxYm1OMGFXOXVJRWwwWlcwb1puVnVMQ0JoY25KaGVTa2dlMXh1SUNBZ0lIUm9hWE11Wm5WdUlEMGdablZ1TzF4dUlDQWdJSFJvYVhNdVlYSnlZWGtnUFNCaGNuSmhlVHRjYm4xY2JrbDBaVzB1Y0hKdmRHOTBlWEJsTG5KMWJpQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0IwYUdsekxtWjFiaTVoY0hCc2VTaHVkV3hzTENCMGFHbHpMbUZ5Y21GNUtUdGNibjA3WEc1d2NtOWpaWE56TG5ScGRHeGxJRDBnSjJKeWIzZHpaWEluTzF4dWNISnZZMlZ6Y3k1aWNtOTNjMlZ5SUQwZ2RISjFaVHRjYm5CeWIyTmxjM011Wlc1MklEMGdlMzA3WEc1d2NtOWpaWE56TG1GeVozWWdQU0JiWFR0Y2JuQnliMk5sYzNNdWRtVnljMmx2YmlBOUlDY25PeUF2THlCbGJYQjBlU0J6ZEhKcGJtY2dkRzhnWVhadmFXUWdjbVZuWlhod0lHbHpjM1ZsYzF4dWNISnZZMlZ6Y3k1MlpYSnphVzl1Y3lBOUlIdDlPMXh1WEc1bWRXNWpkR2x2YmlCdWIyOXdLQ2tnZTMxY2JseHVjSEp2WTJWemN5NXZiaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbUZrWkV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011YjI1alpTQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtOW1aaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbkpsYlc5MlpVeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWNtVnRiM1psUVd4c1RHbHpkR1Z1WlhKeklEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdVpXMXBkQ0E5SUc1dmIzQTdYRzV3Y205alpYTnpMbkJ5WlhCbGJtUk1hWE4wWlc1bGNpQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuQnlaWEJsYm1SUGJtTmxUR2x6ZEdWdVpYSWdQU0J1YjI5d08xeHVYRzV3Y205alpYTnpMbXhwYzNSbGJtVnljeUE5SUdaMWJtTjBhVzl1SUNodVlXMWxLU0I3SUhKbGRIVnliaUJiWFNCOVhHNWNibkJ5YjJObGMzTXVZbWx1WkdsdVp5QTlJR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Nkd2NtOWpaWE56TG1KcGJtUnBibWNnYVhNZ2JtOTBJSE4xY0hCdmNuUmxaQ2NwTzF4dWZUdGNibHh1Y0hKdlkyVnpjeTVqZDJRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUFuTHljZ2ZUdGNibkJ5YjJObGMzTXVZMmhrYVhJZ1BTQm1kVzVqZEdsdmJpQW9aR2x5S1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbU5vWkdseUlHbHpJRzV2ZENCemRYQndiM0owWldRbktUdGNibjA3WEc1d2NtOWpaWE56TG5WdFlYTnJJRDBnWm5WdVkzUnBiMjRvS1NCN0lISmxkSFZ5YmlBd095QjlPMXh1SWl3aWFXMXdiM0owSUhKbGMyOTFjbU5sYzFObGNuWnBZMlVnWm5KdmJTQW5MaTl6WlhKMmFXTmxjeTl5WlhOdmRYSmpaWE1uTzF4eVhHNXBiWEJ2Y25RZ2V5Qm5aWFJUWldOMGFXOXVjeXdnWjJWMFEyRnlaSE1zSUdkbGRFMWxiblZKZEdWdGN5d2djbVZ1WkdWeUlIMGdabkp2YlNBbkxpOTJhV1YzY3k5MWFTYzdYSEpjYm1sdGNHOXlkQ0J5Wlc1a1pYSlRhMlZzWlhSdmJsTmpjbVZsYmlCbWNtOXRJQ2N1TDNacFpYZHpMM05yWld4bGRHOXVKenRjY2x4dWFXMXdiM0owSUhzZ1kyaGhibWRsVDNabGNteGhlVk4wWVhSMWN5d2dZMnh2YzJWTlpXNTFJSDBnWm5KdmJTQW5MaTkyYVdWM2N5OTBiMmRuYkdWTlpXNTFKenRjY2x4dVhISmNibU52Ym5OMElHRndjQ0E5SUNobWRXNWpkR2x2YmlncElIdGNjbHh1SUNBdkx5QldZWEpwWVdKc1pYTmNjbHh1SUNCamIyNXpkQ0IwYUdGMElEMGdlMzA3WEhKY2JpQWdZMjl1YzNRZ1pHVm1ZWFZzZEhNZ1BTQjdYSEpjYmlBZ0lDQnVZWFpKZEdWdFEyOXVkR0ZwYm1WeU9pQW5MbXhsWm5SZmJXVnVkVjlwZEdWdGN5Y3NYSEpjYmlBZ0lDQnpaV04wYVc5dWMwTnZiblJoYVc1bGNqb2dKeU56WldOMGFXOXVYMmR5YjNWd2N5Y3NYSEpjYmlBZ0lDQnlaWE52ZFhKalpYTTZJRnRkTEZ4eVhHNGdJQ0FnWTJGc2JHSmhZMnM2SUdaMWJtTjBhVzl1SUNoamIyNTBaVzUwS1NCN1hISmNiaUFnSUNBZ0lISmxkSFZ5YmlCamIyNTBaVzUwTzF4eVhHNGdJQ0FnZlN4Y2NseHVJQ0I5TzF4eVhHNWNjbHh1SUNBdkx5Qk5aWFJvYjJSelhISmNiaUFnWTI5dWMzUWdkVzVwY1hWbFFYSnlZWGtnUFNCbWRXNWpkR2x2YmlBb1lYSnlLU0I3WEhKY2JpQWdJQ0J5WlhSMWNtNGdZWEp5TG1acGJIUmxjaWdvZG1Gc2RXVXNJR2x1WkdWNExDQnpaV3htS1NBOVBpQnpaV3htTG1sdVpHVjRUMllvZG1Gc2RXVXBJRDA5UFNCcGJtUmxlQ2s3WEhKY2JpQWdmVHRjY2x4dVhISmNiaUFnWTI5dWMzUWdZWEJ3Wlc1a1RXRnJaWFZ3SUQwZ1puVnVZM1JwYjI0b2MyVnNaV04wYjNJc0lHMWhhMlYxY0NrZ2UxeHlYRzRnSUNBZ2FXWWdLQ0ZrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtITmxiR1ZqZEc5eUtTa2djbVYwZFhKdU8xeHlYRzRnSUNBZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWh6Wld4bFkzUnZjaWt1YVc1dVpYSklWRTFNSUQwZ2JXRnJaWFZ3TzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnWTI5dWMzUWdjbVZ1WkdWeVEyRnlaSE1nUFNCbWRXNWpkR2x2YmloallYUmxaMjl5ZVN3Z2NtVnpiM1Z5WTJWektTQjdYSEpjYmlBZ0lDQmpiMjV6ZENCelpXeGxZM1J2Y2lBOUlHQWpKSHRqWVhSbFoyOXllWDBnTG1keWIzVndYMmwwWlcxellEdGNjbHh1SUNBZ0lHTnZibk4wSUhWdWFYRjFaVkpsYzI5MWNtTmxjeUE5SUhKbGMyOTFjbU5sY3k1bWFXeDBaWElvWEhKY2JpQWdJQ0FnSUhKbGMyOTFjbU5sSUQwK0lISmxjMjkxY21ObExtTmhkR1ZuYjNKNUxuUnlhVzBvS1NBOVBUMGdZMkYwWldkdmNubGNjbHh1SUNBZ0lDazdYSEpjYmx4eVhHNGdJQ0FnWTI5dWMzUWdiV0ZyWlhWd0lEMGdjbVZ1WkdWeUtIVnVhWEYxWlZKbGMyOTFjbU5sY3l3Z1oyVjBRMkZ5WkhNcE8xeHlYRzVjY2x4dUlDQWdJR0Z3Y0dWdVpFMWhhMlYxY0NoelpXeGxZM1J2Y2l3Z2JXRnJaWFZ3S1R0Y2NseHVJQ0I5WEhKY2JseHlYRzRnSUM4dklFbHVhWFFnWlhabGJuUnpYSEpjYmlBZ1kyOXVjM1FnYVc1cGRDQTlJR1oxYm1OMGFXOXVJQ2h2Y0hScGIyNXpLU0I3WEhKY2JpQWdJQ0J2Y0hScGIyNXpJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZUdGNjbHh1SUNBZ0lDOHZJRTFsY21kbElHSnZkR2dnZFhObGNpQmtaV1poZFd4MGN5QmhibVFnYjNCMGFXOXVjeTVjY2x4dUlDQWdJR052Ym5OMElITmxkSFJwYm1keklEMGdUMkpxWldOMExtRnpjMmxuYmloN2ZTd2daR1ZtWVhWc2RITXNJRzl3ZEdsdmJuTXBPMXh5WEc0Z0lDQWdMeThnUjJWMElHRnNiQ0JqWVhSbFoyOXlhV1Z6SUc5bUlISmxjMjkxY21ObGMxeHlYRzRnSUNBZ1kyOXVjM1FnWTJGMFpXZHZjbWxsY3lBOUlIVnVhWEYxWlVGeWNtRjVLRnh5WEc0Z0lDQWdJQ0J6WlhSMGFXNW5jeTV5WlhOdmRYSmpaWE11YldGd0tISmxjMjkxY21ObElEMCtJSEpsYzI5MWNtTmxMbU5oZEdWbmIzSjVLVnh5WEc0Z0lDQWdLVHRjY2x4dVhISmNiaUFnSUNBdkx5QkhaWFFnWVd4c0lHbDBaVzF6SUc5bUlHeGxablFnYldWdWRTQnBkR1Z0Y3lCMGFHVnVJR0Z3Y0dWdVpDQnBkQ0IwYnlCa2IyTjFiV1Z1ZEZ4eVhHNGdJQ0FnWTI5dWMzUWdiV1Z1ZFVsMFpXMXpJRDBnSUhKbGJtUmxjaWhqWVhSbFoyOXlhV1Z6TENCblpYUk5aVzUxU1hSbGJYTXBPMXh5WEc0Z0lDQWdZWEJ3Wlc1a1RXRnJaWFZ3S0hObGRIUnBibWR6TG01aGRrbDBaVzFEYjI1MFlXbHVaWElzSUcxbGJuVkpkR1Z0Y3lrN1hISmNibHh5WEc0Z0lDQWdMeThnUjJWMElHRnNiQ0J6WldOMGFXOXVjeUJ2WmlCdFlXbHVJR052Ym5SbGJuUmNjbHh1SUNBZ0lHTnZibk4wSUdkeWIzVndjeUE5SUhKbGJtUmxjaWhqWVhSbFoyOXlhV1Z6TENCblpYUlRaV04wYVc5dWN5azdYSEpjYmlBZ0lDQmhjSEJsYm1STllXdGxkWEFvYzJWMGRHbHVaM011YzJWamRHbHZibk5EYjI1MFlXbHVaWElzSUdkeWIzVndjeWs3WEhKY2JseHlYRzRnSUNBZ0x5OGdVbVZ1WkdWeUlITmxZM1JwYjI1eklHbDBaVzF6SUc5dUlHUnZZM1Z0Wlc1MFhISmNiaUFnSUNCallYUmxaMjl5YVdWekxtWnZja1ZoWTJnb1kyRjBaV2R2Y25rZ1BUNGdleUFnSUNBZ0lDQWdJQ0JjY2x4dUlDQWdJQ0FnY21WdVpHVnlRMkZ5WkhNb1kyRjBaV2R2Y25rc0lITmxkSFJwYm1kekxuSmxjMjkxY21ObGN5bGNjbHh1SUNBZ0lIMHBYSEpjYmx4eVhHNGdJQ0FnTHk4Z1JYWmxiblFnWEhKY2JpQWdJQ0FnSUdOb1lXNW5aVTkyWlhKc1lYbFRkR0YwZFhNb0tUdGNjbHh1SUNBZ0lDQWdZMnh2YzJWTlpXNTFLQ2s3WEhKY2JpQWdmVHRjY2x4dVhISmNibHh5WEc0Z0lDOHZJRkpsYm1SbGNpQjBhR1VnYzJ0bGJHVjBiMjRnYzJOeVpXVnVJR0psWm05eVpTQm5aWFIwYVc1bklIUm9aU0J5WlhOdmRYSmpaWE1nWm5KdmJTQnpaWEoyWlhKY2NseHVJQ0JoY0hCbGJtUk5ZV3RsZFhBb1pHVm1ZWFZzZEhNdWMyVmpkR2x2Ym5ORGIyNTBZV2x1WlhJc0lISmxibVJsY2xOclpXeGxkRzl1VTJOeVpXVnVLQ2twTzF4eVhHNWNjbHh1SUNBZ0lDOHZJRWRsZENCeVpYTnZkWEpqWlhNZ1puSnZiU0IwYUdVZ2MyVnlkbWxqWlNCemFXUmxYSEpjYmlBZ2NtVnpiM1Z5WTJWelUyVnlkbWxqWlZ4eVhHNGdJQzVuWlhSQmJHd29LVnh5WEc0Z0lDNTBhR1Z1S0hKbGMyOTFjbU5sY3lBOVBpQjdYSEpjYmlBZ0lDQnBibWwwS0hKbGMyOTFjbU5sY3lrN1hISmNiaUFnZlNrN1hISmNibHh5WEc1Y2NseHVMeThnU1c1cGRITWdKaUJGZG1WdWRITmNjbHh1SUNCMGFHRjBMbWx1YVhRZ1BTQnBibWwwTzF4eVhHNWNjbHh1SUNCeVpYUjFjbTRnZEdoaGREdGNjbHh1ZlNrb0tUc2lMQ0pwYlhCdmNuUWdZWGhwYjNNZ1puSnZiU0FuWVhocGIzTW5PMXh5WEc1amIyNXpkQ0JpWVhObFZYSnNJRDBnSnk4dWJtVjBiR2xtZVM5bWRXNWpkR2x2Ym5NdllYQnBMM0psYzI5MWNtTmxjeWM3WEhKY2JseHlYRzVqYjI1emRDQm5aWFJCYkd3Z1BTQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dUlDQmpiMjV6ZENCeVpYRjFaWE4wSUQwZ1lYaHBiM011WjJWMEtHSmhjMlZWY213cE8xeHlYRzRnSUhKbGRIVnliaUJ5WlhGMVpYTjBMblJvWlc0b2NtVnpjRzl1YzJVZ1BUNGdjbVZ6Y0c5dWMyVXVaR0YwWVNrN1hISmNibjFjY2x4dVhISmNibU52Ym5OMElHTnlaV0YwWlNBOUlHWjFibU4wYVc5dUtHNWxkMDlpYW1WamRDa2dlMXh5WEc0Z0lHTnZibk4wSUhKbGNYVmxjM1FnUFNCaGVHbHZjeTV3YjNOMEtHSmhjMlZWY213c0lHNWxkMDlpYW1WamRDazdYSEpjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1F1ZEdobGJpaHlaWE53YjI1elpTQTlQaUJ5WlhOd2IyNXpaUzVrWVhSaEtUdGNjbHh1ZlZ4eVhHNWNjbHh1WTI5dWMzUWdkWEJrWVhSbElEMGdablZ1WTNScGIyNG9hV1FzSUc1bGQwOWlhbVZqZENrZ2UxeHlYRzRnSUdOdmJuTjBJSEpsY1hWbGMzUWdQU0JoZUdsdmN5NXdkWFFvWUNSN1ltRnpaVlZ5YkgwdkpIdHBaSDFnTENCdVpYZFBZbXBsWTNRcE8xeHlYRzRnSUhKbGRIVnliaUJ5WlhGMVpYTjBMblJvWlc0b2NtVnpjRzl1YzJVZ1BUNGdjbVZ6Y0c5dWMyVXVaR0YwWVNrN1hISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElIc2daMlYwUVd4c0xDQmpjbVZoZEdVc0lIVndaR0YwWlNCOVhISmNiaUlzSW1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVJR2RsZEZOclpXeGxkRzl1VTJOeVpXVnVLQ2tnZTF4eVhHNGdJR3hsZENCcGRHVnRjeUE5SUNjbk8xeHlYRzVjY2x4dUlDQmpiMjV6ZENCcGRHVnRJRDBnWUZ4eVhHNGdJQ0FnUEd4cElHTnNZWE56UFZ3aVozSnZkWEJmYVhSbGJTQmpiMnd6WENJK1hISmNiaUFnSUNBZ0lEeGhJR05zWVhOelBWd2laM0p2ZFhCZmFYUmxiVjlzYVc1clhDSStYSEpjYmlBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltTmhjbVJjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKallYSmtYMmxqYjI0Z2JHOWhaR2x1WjF3aVBqd3ZaR2wyUGx4eVhHNGdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OaGNtUmZZbTlrZVZ3aVBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOGFEUWdZMnhoYzNNOVhDSmpZWEprWDNScGRHeGxJR3h2WVdScGJtZGNJajQ4TDJnMFBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOGNDQmpiR0Z6Y3oxY0ltTmhjbVJmZEdWNGRDQnNiMkZrYVc1blhDSStQQzl3UGx4eVhHNGdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lEd3ZZVDVjY2x4dUlDQWdJRHd2YkdrK1hISmNiaUFnWUR0Y2NseHVYSEpjYmlBZ1ptOXlLR3hsZENCcElEMGdNRHNnYVNBOElESXdPeUJwS3lzcElIdGNjbHh1SUNBZ0lHbDBaVzF6SUNzOUlHbDBaVzA3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0J5WlhSMWNtNGdZRnh5WEc0Z0lDQWdQSE5sWTNScGIyNGdZMnhoYzNNOVhDSm5jbTkxY0Z3aUlENWNjbHh1SUNBZ0lDQWdQR2d6SUdOc1lYTnpQVndpWjNKdmRYQmZkR2wwYkdVZ2JHOWhaR2x1WjF3aVBqd3ZhRE0rWEhKY2JpQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSm5jbTkxY0Y5amIyNTBaVzUwWENJK1hISmNiaUFnSUNBZ0lDQWdQSFZzSUdOc1lYTnpQVndpY205M0lHZHliM1Z3WDJsMFpXMXpYQ0krWEhKY2JpQWdJQ0FnSUNBZ0lDQWtlMmwwWlcxemZWeHlYRzRnSUNBZ0lDQWdJRHd2ZFd3K1hISmNiaUFnSUNBZ0lEd3ZaR2wyUGx4eVhHNGdJQ0FnUEM5elpXTjBhVzl1UGx4eVhHNGdJR0E3WEhKY2JuMWNjbHh1WEhKY2JpSXNJbU52Ym5OMElITmxiR1ZqZEc5eUlEMGdlMXh5WEc0Z0lHeGxablJEYjI1MGNtOXNUV1Z1ZFRvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG14bFpuUmZZMjl1ZEhKdmJGOXRaVzUxSnlrc1hISmNiaUFnYkdWbWRFMWxiblZQZG1WeWJHRjVPaUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViR1ZtZEY5dFpXNTFYMjkyWlhKc1lYa25LU3hjY2x4dUlDQmpiMjUwWlc1MFYzSmhjSEJsY2pvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1OdmJuUmxiblJmZDNKaGNIQmxjaWNwWEhKY2JuMWNjbHh1WEhKY2JtTnZibk4wSUdOc1lYTnpUbUZ0WlhNZ1BTQjdYSEpjYmlBZ1pXNTBaWEpFYjI1bE9pQW5iR1ZtZEY5dFpXNTFYMjkyWlhKc1lYa2diR1ZtZEY5dFpXNTFYMjkyWlhKc1lYa3RaVzUwWlhJdFpHOXVaU2NzWEhKY2JpQWdaWGhwZEVSdmJtVTZJQ2RzWldaMFgyMWxiblZmYjNabGNteGhlU0JzWldaMFgyMWxiblZmYjNabGNteGhlUzFsZUdsMExXUnZibVVuWEhKY2JuMWNjbHh1WEhKY2JpOHZJRkpsY0hKbGMyVnVkQ0IwYUdVZ2JHVm1kQ0J0Wlc1MUlHOXdaVzVwYm1jZ2IzSWdZMnh2YzJsdVoxeHlYRzR2THlCVWNuVmxJRzFsWVc1eklHbDBKM01nYjNCbGJtbHVaMXh5WEc1c1pYUWdhWE5CWTNScGRtVWdQU0IwY25WbE8xeHlYRzVjY2x4dVkyOXVjM1FnYUdGdVpHeGxUM1psY214aGVTQTlJR1oxYm1OMGFXOXVJQ2hqYkdGemMwNWhiV1Z6S1NCN1hISmNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2dwSUh0Y2NseHVJQ0FnSUdsbUlDaHBjMEZqZEdsMlpTa2dlMXh5WEc0Z0lDQWdJQ0J6Wld4bFkzUnZjaTVqYjI1MFpXNTBWM0poY0hCbGNpNWpiR0Z6YzB4cGMzUXVjbVZ0YjNabEtDZHBjeTFqYkc5elpXUW5LVHRjY2x4dUlDQWdJQ0FnYzJWc1pXTjBiM0l1YkdWbWRFMWxiblZQZG1WeWJHRjVMbU5zWVhOelRtRnRaU0E5SUdOc1lYTnpUbUZ0WlhNdVpXNTBaWEpFYjI1bE8xeHlYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2NseHVJQ0FnSUNBZ2MyVnNaV04wYjNJdWJHVm1kRTFsYm5WUGRtVnliR0Y1TG1Oc1lYTnpUbUZ0WlNBOUlHTnNZWE56VG1GdFpYTXVaWGhwZEVSdmJtVTdYSEpjYmlBZ0lDQWdJSE5sYkdWamRHOXlMbU52Ym5SbGJuUlhjbUZ3Y0dWeUxtTnNZWE56VEdsemRDNWhaR1FvSjJsekxXTnNiM05sWkNjcE8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJR2x6UVdOMGFYWmxJRDBnSVdselFXTjBhWFpsTzF4eVhHNGdJSDFjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdOb1lXNW5aVTkyWlhKc1lYbFRkR0YwZFhNZ0tDa2dlMXh5WEc0Z0lITmxiR1ZqZEc5eUxteGxablJEYjI1MGNtOXNUV1Z1ZFM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdoaGJtUnNaVTkyWlhKc1lYa29ZMnhoYzNOT1lXMWxjeWtwTzF4eVhHNTlYSEpjYmx4eVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1kyeHZjMlZOWlc1MUtDa2dlMXh5WEc0Z0lITmxiR1ZqZEc5eUxteGxablJOWlc1MVQzWmxjbXhoZVM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdoaGJtUnNaVTkyWlhKc1lYa29ZMnhoYzNOT1lXMWxjeWtwTzF4eVhHNTlYSEpjYmlJc0lpQWdMeThnUjJWdVpYSmhkR1VnWVNCcGRHVnRJRzltSUhSb1pTQnVZWFpwWjJGMGFXOXVYSEpjYm1WNGNHOXlkQ0JqYjI1emRDQm5aWFJOWlc1MVNYUmxiWE1nUFNCallYUmxaMjl5ZVNBOVBpQmdYSEpjYmlBZ0lDQThiR2tnWTJ4aGMzTTlYQ0pzWldaMFgyMWxiblZmYVhSbGJWd2lQbHh5WEc0Z0lDQWdJQ0E4YVcxbklHTnNZWE56UFZ3aWJXVnVkVjlwZEdWdFgybGpiMjVjSWlCemNtTTlYQ0l1TDNOMlp5OWxlR0Z0Y0d4bExuTjJaMXdpUGp3dmFXMW5QbHh5WEc0Z0lDQWdJQ0E4YzNCaGJpQmpiR0Z6Y3oxY0ltMWxiblZmYVhSbGJWOWpiMjUwWlc1MFhDSStKSHRqWVhSbFoyOXllWDA4TDNOd1lXNCtYSEpjYmlBZ0lDQThMMnhwUGx4eVhHNGdJR0E3WEhKY2JseHlYRzRnSUM4dklFZGxibVZ5WVhSbElHRWdjMlZqZEdsdmJpQnZaaUIwYUdVZ2JXRnBiaUJqYjI1MFpXNTBYSEpjYm1WNGNHOXlkQ0JqYjI1emRDQm5aWFJUWldOMGFXOXVjeUE5SUdOaGRHVm5iM0o1SUQwK0lHQmNjbHh1SUNBZ0lEeHpaV04wYVc5dUlHbGtQVndpSkh0allYUmxaMjl5ZVgxY0lpQmpiR0Z6Y3oxY0ltZHliM1Z3WENJZ1BseHlYRzRnSUNBZ0lDQThhRE1nWTJ4aGMzTTlYQ0puY205MWNGOTBhWFJzWlZ3aVBpUjdZMkYwWldkdmNubDlQQzlvTXo1Y2NseHVJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbWR5YjNWd1gyTnZiblJsYm5SY0lqNWNjbHh1SUNBZ0lDQWdJQ0E4ZFd3Z1kyeGhjM005WENKeWIzY2daM0p2ZFhCZmFYUmxiWE5jSWo0OEwzVnNQbHh5WEc0Z0lDQWdJQ0E4TDJScGRqNWNjbHh1SUNBZ0lEd3ZjMlZqZEdsdmJqNGdJRnh5WEc0Z0lHQTdYSEpjYmx4eVhHNGdJQzh2SUVkbGJtVnlZWFJsSUdFZ2JHbHpkQ0J2WmlCMGFHVWdjMlZqZEdsdmJpQmNjbHh1Wlhod2IzSjBJR052Ym5OMElHZGxkRU5oY21SeklEMGdjbVZ6YjNWeVkyVWdQVDRnWUZ4eVhHNGdJQ0FnUEd4cElHTnNZWE56UFZ3aVozSnZkWEJmYVhSbGJTQmpiMnd6WENJK1hISmNiaUFnSUNBZ0lEeGhJR05zWVhOelBWd2laM0p2ZFhCZmFYUmxiVjlzYVc1clhDSWdhSEpsWmoxY0lpUjdjbVZ6YjNWeVkyVXVhSEpsWm4xY0lqNWNjbHh1SUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyRnlaRndpUGx4eVhHNGdJQ0FnSUNBZ0lDQWdQR2x0WnlCamJHRnpjejFjSW1OaGNtUmZhV052Ymx3aUlITnlZejFjSWlSN2NtVnpiM1Z5WTJVdWMzSmpmVndpUGx4eVhHNGdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OaGNtUmZZbTlrZVZ3aVBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOGFEUWdZMnhoYzNNOVhDSmpZWEprWDNScGRHeGxYQ0krSkh0eVpYTnZkWEpqWlM1MGFYUnNaWDA4TDJnMFBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOGNDQmpiR0Z6Y3oxY0ltTmhjbVJmZEdWNGRGd2lQaVI3Y21WemIzVnlZMlV1WTI5dWRHVnVkSDA4TDNBK1hISmNiaUFnSUNBZ0lDQWdJQ0E4TDJScGRqNWNjbHh1SUNBZ0lDQWdJQ0E4TDJScGRqNWNjbHh1SUNBZ0lDQWdQQzloUGx4eVhHNGdJQ0FnUEM5c2FUNWNjbHh1SUNCZ08xeHlYRzVjY2x4dVpYaHdiM0owSUdOdmJuTjBJSEpsYm1SbGNpQTlJR1oxYm1OMGFXOXVLR0Z5Y21GNUxDQm1kVzVqS1NCN1hISmNiaUFnSUNCamIyNXpkQ0J0WVd0bGRYQWdQU0JoY25KaGVWeHlYRzRnSUNBZ0lDQXViV0Z3S0dsMFpXMGdQVDRnWm5WdVl5aHBkR1Z0S1NsY2NseHVJQ0FnSUNBZ0xtcHZhVzRvSnljcFhISmNiaUFnSUNCeVpYUjFjbTRnYldGclpYVndPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpSmRMQ0p6YjNWeVkyVlNiMjkwSWpvaUluMD0ifQ==
