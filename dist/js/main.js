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

/***/ 0:
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/js/main.js ./src/js/models/Component.js ./src/js/services/resources.js ./src/js/views/DOMElements.js ./src/js/views/handleMenu.js ./src/js/views/resize.js ./src/js/views/scrollTo.js ./src/js/views/skeleton.js ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\main.js */"./src/js/main.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\models\Component.js */"./src/js/models/Component.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\services\resources.js */"./src/js/services/resources.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\DOMElements.js */"./src/js/views/DOMElements.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\handleMenu.js */"./src/js/views/handleMenu.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\resize.js */"./src/js/views/resize.js");
__webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\scrollTo.js */"./src/js/views/scrollTo.js");
module.exports = __webpack_require__(/*! D:\projects\front_end_projects\resourcesWebsite\src\js\views\skeleton.js */"./src/js/views/skeleton.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kZWxzL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvaGFuZGxlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvcmVzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9zY3JvbGxUby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3Mvc2tlbGV0b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjtBQUN2QyxjQUFjLG1CQUFPLENBQUMseUVBQXNCO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXVCO0FBQ25ELG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjtBQUN0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQztBQU1sQjtBQUMwQjtBQUNaO0FBQzhCO0FBQ3hCO0FBQ1Q7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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YWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eScsICdwYXJhbXMnXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAndGltZW91dE1lc3NhZ2UnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnZGVjb21wcmVzcycsXG4gICAgJ21heENvbnRlbnRMZW5ndGgnLCAnbWF4Qm9keUxlbmd0aCcsICdtYXhSZWRpcmVjdHMnLCAndHJhbnNwb3J0JywgJ2h0dHBBZ2VudCcsXG4gICAgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCcsICdyZXNwb25zZUVuY29kaW5nJ1xuICBdO1xuICB2YXIgZGlyZWN0TWVyZ2VLZXlzID0gWyd2YWxpZGF0ZVN0YXR1cyddO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKGRpcmVjdE1lcmdlS2V5cywgZnVuY3Rpb24gbWVyZ2UocHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzXG4gICAgLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cylcbiAgICAuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKVxuICAgIC5jb25jYXQoZGlyZWN0TWVyZ2VLZXlzKTtcblxuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0XG4gICAgLmtleXMoY29uZmlnMSlcbiAgICAuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICAgIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAodG9TdHJpbmcuY2FsbCh2YWwpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTVxufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL21vZGVscy9Db21wb25lbnQnO1xyXG5pbXBvcnQge1xyXG4gIG5vZGVMaXN0LFxyXG4gIGdldFNlY3Rpb25zLFxyXG4gIGdldENhcmRzLFxyXG4gIGdldE1lbnVJdGVtcyxcclxufSBmcm9tICcuL3ZpZXdzL0RPTUVsZW1lbnRzJztcclxuaW1wb3J0IHsgZ2V0U2tlbGV0b24sIHJlbmRlciB9IGZyb20gJy4vdmlld3Mvc2tlbGV0b24nO1xyXG5pbXBvcnQgc2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3Jlc291cmNlcyc7XHJcbmltcG9ydCB7IGhhbmRsZU92ZXJsYXksIGhhbmRsZU1lbnUgLCBoaWRlTWVudX0gZnJvbSAnLi92aWV3cy9oYW5kbGVNZW51JztcclxuaW1wb3J0IHsgc2Nyb2xsSGFuZGxlciB9IGZyb20gJy4vdmlld3Mvc2Nyb2xsVG8nO1xyXG5pbXBvcnQgeyByZXNpemUgfSBmcm9tICcuL3ZpZXdzL3Jlc2l6ZSc7XHJcblxyXG5jb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIC8vXHJcbiAgLy8gVmFyaWFibGVzXHJcbiAgLy9cclxuICBsZXQgc2V0dGluZ3M7XHJcbiAgXHJcbiAgY29uc3QgdGhhdCA9IHt9O1xyXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xyXG4gICAgc2VsZWN0b3JzOiB7XHJcbiAgICAgIG1lbnVJdGVtc0dyb3VwOiAnI2xlZnRfbWVudV9pdGVtcycsXHJcbiAgICAgIHNlY3Rpb25zR3JvdXA6ICcjc2VjdGlvbl9ncm91cHMnLFxyXG4gICAgfSxcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgZW50ZXJEb25lOiAnbGVmdF9tZW51X292ZXJsYXkgbGVmdF9tZW51X292ZXJsYXktZW50ZXItZG9uZScsXHJcbiAgICAgIGV4aXREb25lOiAnbGVmdF9tZW51X292ZXJsYXkgbGVmdF9tZW51X292ZXJsYXktZXhpdC1kb25lJyxcclxuICAgICAgbGVmdE1lbnVTaG93OiAnbGVmdF9tZW51X3Nob3cnLFxyXG4gICAgICBsZWZ0TWVudUhpZGRlbjogJ2xlZnRfbWVudV9oaWRkZW4nXHJcbiAgICB9LFxyXG4gICAgcmVzb3VyY2VzOiBbXSxcclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy9cclxuICAvLyBNZXRob2RzXHJcbiAgLy9cclxuICBcclxuICBjb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIHJldHVybiBhcnIuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBjb25zdCB1bmlxdWVSZXNvdXJjZXMgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmVzb3VyY2VzKSB7XHJcbiAgICAgIHJldHVybiByZXNvdXJjZXMuZmlsdGVyKFxyXG4gICAgICAgIChyZXNvdXJjZSkgPT4gcmVzb3VyY2UuY2F0ZWdvcnkudHJpbSgpID09PSBjYXRlZ29yeVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgY29udGVudCBwYXJlbnQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IHJlc291cmNlcyBUaGUgZGF0YSBmb3IgdGhlIGNvbnRlbnQgaXRlbXNcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZW1wbGF0ZSBUaGUgZnVuY3Rpb24gcmVuZGVyIFVJXHJcbiAgICovXHJcbiAgY29uc3QgcmVuZGVyQ29udGVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCByZXNvdXJjZXMsIHRlbXBsYXRlKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbXBvbmVudChzZWxlY3Rvciwge1xyXG4gICAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZXN0b3J5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHBsdWdpbiBoYXMgYmVlbiBpbml0aWFsaXplZFxyXG4gICAgaWYgKCFzZXR0aW5ncykgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgdGFibGUgb2YgY29udGVudHNcclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LmxlZnRNZW51SXRlbXMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBzZXR0aW5ncy5ub2RlTGlzdC5zZWN0aW9uc0l0ZW1zLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vIFJlc2V0IHZhcmlhYmxlc1xyXG4gICAgc2V0dGluZ3MgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAvLyBEZXN0b3J5IHRoZSBjdXJyZW50IGluaXRpYWxpemF0aW9uXHJcbiAgICBkZXN0b3J5KCk7XHJcblxyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gTWVyZ2UgYm90aCB1c2VyIGRlZmF1bHRzIGFuZCBvcHRpb25zLlxyXG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gR2V0IGFsbCBjYXRlZ29yaWVzIG9mIHRoZSByZXNvdXJjZXNcclxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB1bmlxdWVBcnJheShcclxuICAgICAgc2V0dGluZ3MucmVzb3VyY2VzLm1hcCgocmVzb3VyY2UpID0+IHJlc291cmNlLmNhdGVnb3J5KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIGl0ZW1zIG9mIGxlZnQgbWVudSBpdGVtcyB0aGVuIGFwcGVuZCBpdCB0byBkb2N1bWVudFxyXG4gICAgcmVuZGVyQ29udGVudChzZXR0aW5ncy5zZWxlY3RvcnMubWVudUl0ZW1zR3JvdXAsIGNhdGVnb3JpZXMsIGdldE1lbnVJdGVtcykucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gR2V0IGFsbCBzZWN0aW9ucyBvZiBtYWluIGNvbnRlbnRcclxuICAgIHJlbmRlckNvbnRlbnQoc2V0dGluZ3Muc2VsZWN0b3JzLnNlY3Rpb25zR3JvdXAsIGNhdGVnb3JpZXMsIGdldFNlY3Rpb25zKS5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBSZW5kZXIgdGhlIGl0ZW1zIGludG8gYSB1bmlxdWUgc2VjdGlvbiBpZFxyXG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICBjb25zdCBzZWxlY3RvciA9IGAjJHtjYXRlZ29yeX0gLmdyb3VwX2l0ZW1zYDtcclxuXHJcbiAgICAgIC8vIEdldCByZXNvdXJjZXMgb2YgdGhlIHNhbWUgY2F0ZWdvcnlcclxuICAgICAgLy8gRm9yIGV4YW1wbGU6IEhUTUzjgIFKYXZhc2NyaXB044CBVG9vbHPjgIFwb2RjYXN0XHJcbiAgICAgIGNvbnN0IHJlc291cmNlcyA9IHVuaXF1ZVJlc291cmNlcyhjYXRlZ29yeSkoc2V0dGluZ3MucmVzb3VyY2VzKTtcclxuICAgICAgcmVuZGVyQ29udGVudChzZWxlY3RvciwgcmVzb3VyY2VzLCBnZXRDYXJkcykucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gdGhlIHNwZWNpZmllZCBjYXRlZ29yeSBieSBjbGlja2luZyB0aGUgbWVudVxyXG4gICAgY29uc3Qgc2Nyb2xsVG8gPSAoZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZWZ0X21lbnVfaXRlbScpXHJcbiAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxlZnRfbWVudV9pdGVtIGEnKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGxpbmsgb2YgbGlua3MpIHtcclxuXHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbEhhbmRsZXIob2Zmc2V0KSk7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KSg3Nik7XHJcblxyXG5cclxuICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgbGVmdCBtZW51IGJ5IHJlc2l6aW5nIHRoZSBzaXplIG9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgaGFuZGxlTWVudShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykoKTtcclxuXHJcbiAgICAvLyBSZXNpemUgdGhlIHdpZHRoIG9mIGxlZnRfbWVudSBhbmQgbWFpbl9jb250ZW50XHJcbiAgICByZXNpemUuaW5pdGlhbGl6ZSh7IG5vZGVMaXN0OiBub2RlTGlzdCB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlTWVudShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykpO1xyXG4gICAgbm9kZUxpc3QubGVmdENvbnRyb2xNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3ZlcmxheShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykpO1xyXG4gICAgbm9kZUxpc3QubGVmdE1lbnVPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3ZlcmxheShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykpO1xyXG5cclxuICAgIG5vZGVMaXN0LmxlZnRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChub2RlTGlzdC5odG1sLmNsaWVudFdpZHRoIDwgNzUwKSB7XHJcbiAgICAgICAgaGlkZU1lbnUobm9kZUxpc3QsIHNldHRpbmdzLmNsYXNzZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbm9kZUxpc3QubGVmdE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vXHJcbiAgLy8gSW5pdHMgJiBFdmVudHNcclxuICAvL1xyXG5cclxuICAvLyBSZW5kZXIgdGhlIHNrZWxldG9uIHNjcmVlbiBiZWZvcmUgZ2V0dGluZyB0aGUgcmVzb3VyY2VzIGZyb20gc2VydmVyXHJcbiAgcmVuZGVyKGRlZmF1bHRzLnNlbGVjdG9ycy5zZWN0aW9uc0dyb3VwLCBnZXRTa2VsZXRvbik7XHJcblxyXG4gIC8vIEdldCByZXNvdXJjZXMgZnJvbSB0aGUgc2VydmljZSBzaWRlXHJcbiAgc2VydmljZS5nZXRBbGwoKS50aGVuKChyZXNvdXJjZXMpID0+IHtcclxuICAgIGluaXQocmVzb3VyY2VzKTtcclxuICB9KTtcclxuXHJcbiAgdGhhdC5pbml0ID0gaW5pdDtcclxuICB0aGF0LmRlc3RvcnkgPSBkZXN0b3J5O1xyXG4gIFxyXG4gIHJldHVybiB0aGF0O1xyXG59KSgpO1xyXG4iLCJGdW5jdGlvbi5wcm90b3R5cGUubWV0aG9kID0gZnVuY3Rpb24obmFtZSwgZnVuYykge1xyXG4gIGlmICh0aGlzLnByb3RvdHlwZVtuYW1lXSkgcmV0dXJuO1xyXG4gIHRoaXMucHJvdG90eXBlW25hbWVdID0gZnVuYztcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IENvbXBvbmVudCA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIHRhYmxlIG9mIGNvbnRlbnRzIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFVzZXIgb3B0aW9ucyBcclxuICAgKi9cclxuICB2YXIgQ29uc3RydWN0b3IgPSBmdW5jdGlvbihzZWxlY3Rvciwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgdGhpcy5yZXNvdXJjZXMgPSBvcHRpb25zLnJlc291cmNlcztcclxuICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdyZW5kZXInLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3Rvcik7XHJcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gICAgdGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuaGFuZGxlVGVtcGxhdGUodGhpcy5yZXNvdXJjZXMpO1xyXG4gIH0pXHJcblxyXG4gIENvbnN0cnVjdG9yLm1ldGhvZCgnaGFuZGxlVGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLnJlc291cmNlcy5sZW5ndGggPCAxKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVzb3VyY2VzXHJcbiAgICAgIC5tYXAocmVzb3VyY2UgPT4gdGhpcy50ZW1wbGF0ZShyZXNvdXJjZSkpXHJcbiAgICAgIC5qb2luKCcnKVxyXG4gIH0pXHJcblxyXG4gIENvbnN0cnVjdG9yLm1ldGhvZCgnc2V0RGF0YScsIGZ1bmN0aW9uKG9iaikge1xyXG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnRpZXMoa2V5KSkge1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0gb2JqW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH0pXHJcblxyXG4gIENvbnN0cnVjdG9yLm1ldGhvZCgnZ2V0RGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wYXJzZShPYmplY3Quc3RyaW5naWZ5KHRoaXMucmVzb3VyY2VzKSk7XHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xyXG59KSgpOyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmNvbnN0IGJhc2VVcmwgPSAnLy5uZXRsaWZ5L2Z1bmN0aW9ucy9hcGkvcmVzb3VyY2VzJztcclxuXHJcbmNvbnN0IGdldEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHJlcXVlc3QgPSBheGlvcy5nZXQoYmFzZVVybCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlID0gZnVuY3Rpb24obmV3T2JqZWN0KSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLnBvc3QoYmFzZVVybCwgbmV3T2JqZWN0KTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSBmdW5jdGlvbihpZCwgbmV3T2JqZWN0KSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLnB1dChgJHtiYXNlVXJsfS8ke2lkfWAsIG5ld09iamVjdCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXRBbGwsIGNyZWF0ZSwgdXBkYXRlIH07XHJcbiIsImV4cG9ydCBjb25zdCBub2RlTGlzdCA9IHtcclxuICBsZWZ0Q29udHJvbE1lbnU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X2NvbnRyb2xfbWVudScpLFxyXG4gIGxlZnRNZW51T3ZlcmxheTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfbWVudV9vdmVybGF5JyksXHJcbiAgc2VjdGlvbkl0ZW1zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VjdGlvbl9ncm91cHMnKSxcclxuICBsZWZ0TWVudUl0ZW1zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGVmdF9tZW51X2l0ZW1zJyksXHJcbiAgaHRtbDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gIGJvZHk6IGRvY3VtZW50LmJvZHksXHJcbiAgbGVmdE1lbnU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X21lbnUnKSxcclxuICByZXNpemVIYW5kbGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemVfaGFuZGxlJyksXHJcbiAgbWFpbkNvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX2NvbnRlbnQnKSxcclxufVxyXG5cclxuICAvLyBHZW5lcmF0ZSBhIGl0ZW0gb2YgdGhlIG5hdmlnYXRpb25cclxuZXhwb3J0IGNvbnN0IGdldE1lbnVJdGVtcyA9IGNhdGVnb3J5ID0+IGBcclxuICA8bGkgY2xhc3M9XCJsZWZ0X21lbnVfaXRlbVwiPlxyXG4gICAgPGEgaHJlZj1cIiMke2NhdGVnb3J5fVwiPiBcclxuICAgICAgPGltZyBjbGFzcz1cIm1lbnVfaXRlbV9pY29uXCIgc3JjPVwiLi9zdmcvJHtjYXRlZ29yeX0uc3ZnXCIgYWx0PVwiVGhpcyBpcyBhICR7Y2F0ZWdvcnl9IGNhdGVnb3J5XCI+PC9pbWc+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVudV9pdGVtX2NvbnRlbnRcIj4ke2NhdGVnb3J5fTwvc3Bhbj5cclxuICAgIDwvYT5cclxuICA8L2xpPlxyXG5gO1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhIHNlY3Rpb24gb2YgdGhlIG1haW4gY29udGVudFxyXG5leHBvcnQgY29uc3QgZ2V0U2VjdGlvbnMgPSBjYXRlZ29yeSA9PiBgXHJcbiAgPHNlY3Rpb24gaWQ9XCIke2NhdGVnb3J5fVwiIGNsYXNzPVwiZ3JvdXBcIiA+XHJcbiAgICA8aDIgY2xhc3M9XCJncm91cF90aXRsZVwiPiR7Y2F0ZWdvcnl9PC9oMj5cclxuICAgIDxkaXYgY2xhc3M9XCJncm91cF9jb250ZW50XCI+XHJcbiAgICAgIDx1bCBjbGFzcz1cInJvdyBncm91cF9pdGVtc1wiPjwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICA8L3NlY3Rpb24+ICBcclxuYDtcclxuXHJcbiAgLy8gR2VuZXJhdGUgYSBsaXN0IG9mIHRoZSBzZWN0aW9uIFxyXG5leHBvcnQgY29uc3QgZ2V0Q2FyZHMgPSByZXNvdXJjZSA9PiBgXHJcbiAgPGxpIGNsYXNzPVwiZ3JvdXBfaXRlbSBjb2wzXCI+XHJcbiAgICA8YSBjbGFzcz1cImdyb3VwX2l0ZW1fbGlua1wiIGhyZWY9XCIke3Jlc291cmNlLmhyZWZ9XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgPGltZyBjbGFzcz1cImNhcmRfaWNvblwiIHNyYz1cIiR7cmVzb3VyY2Uuc3JjfVwiIGFsdD1cIiR7cmVzb3VyY2Uuc3JjLnJlcGxhY2UoL1xcLlxcL2ltZ1xcLy9nLCAnJyl9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfYm9keVwiPlxyXG4gICAgICAgICAgPGgzIGNsYXNzPVwiY2FyZF90aXRsZVwiPiR7cmVzb3VyY2UudGl0bGV9PC9oMz5cclxuICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF90ZXh0XCI+JHtyZXNvdXJjZS5jb250ZW50fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2E+XHJcbiAgPC9saT5cclxuYDsiLCIvLyBSZXByZXNlbnQgdGhlIGxlZnQgbWVudSBvcGVuaW5nIG9yIGNsb3NpbmdcclxuLy8gVHJ1ZSBtZWFucyBpdCdzIG9wZW5pbmdcclxubGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU1lbnUobm9kZWxpc3QsIGNsYXNzZXMpIHtcclxuICBub2RlbGlzdC5odG1sLmNsYXNzTmFtZSA9IGNsYXNzZXMubGVmdE1lbnVIaWRkZW47XHJcbiAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZXhpdERvbmU7XHJcbiAgaXNBY3RpdmUgPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlT3ZlcmxheSAobm9kZWxpc3QsIGNsYXNzZXMpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudVNob3c7XHJcbiAgICAgIG5vZGVsaXN0LmxlZnRNZW51T3ZlcmxheS5jbGFzc05hbWUgPSBjbGFzc2VzLmVudGVyRG9uZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudUhpZGRlbjtcclxuICAgICAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZXhpdERvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBY3RpdmUgPSAhaXNBY3RpdmU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWVudShub2RlbGlzdCwgY2xhc3Nlcykge1xyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIGlmIChub2RlbGlzdC5odG1sLmNsaWVudFdpZHRoIDwgNzUwKSB7XHJcbiAgICAgIGhpZGVNZW51KG5vZGVsaXN0LCBjbGFzc2VzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudVNob3c7XHJcbiAgICAgIG5vZGVsaXN0LmxlZnRNZW51T3ZlcmxheS5jbGFzc05hbWUgPSBjbGFzc2VzLmVudGVyRG9uZTtcclxuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IHJlc2l6ZSA9IChmdW5jdGlvbigpIHtcclxuICBsZXQgc2V0dGluZ3M7XHJcblxyXG4gIGNvbnN0IHRoYXQgPSB7fTsgXHJcbiAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICBzaXplczoge1xyXG4gICAgICBtYXhXaWR0aDogNDI1LFxyXG4gICAgICBtaW5XaWR0aDogMjAwLFxyXG4gICAgICB4OiAyNTBcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICAvLyBJbml0cyBhbmQgRXZlbnRzXHJcbiAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9IFxyXG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgY29uc3QgbW92ZUF0ID0gZnVuY3Rpb24oeCkge1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5sZWZ0TWVudS5zdHlsZS53aWR0aCA9IHggKyAncHgnO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5yZXNpemVIYW5kbGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5tYWluQ29udGVudC5zdHlsZS5tYXJnaW5MZWZ0ID0geCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gZnVuY3Rpb24gZnVuYygpIHtcclxuICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0Lm1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb25fbm9uZScpO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vX3VzZXJfc2VsZWN0aW9uJyk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCBsZWZ0TWVudVdpZHRoID0gcGFyc2VJbnQoc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuc3R5bGUud2lkdGgsIDEwKTtcclxuICAgICAgaWYgKGxlZnRNZW51V2lkdGggPiBzZXR0aW5ncy5zaXplcy5tYXhXaWR0aCB8fCBsZWZ0TWVudVdpZHRoIDwgc2V0dGluZ3Muc2l6ZXMubWluV2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGVmdE1lbnVXaWR0aCA8PSBzZXR0aW5ncy5zaXplcy5tYXhXaWR0aCAmJiBsZWZ0TWVudVdpZHRoID49IHNldHRpbmdzLnNpemVzLm1pbldpZHRoKSB7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QuYm9keS5jbGFzc0xpc3QuYWRkKCdub191c2VyX3NlbGVjdGlvbicpO1xyXG4gICAgICAgIG1vdmVBdChldmVudC5wYWdlWCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXR0aW5ncy5ub2RlTGlzdC5yZXNpemVIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cclxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LnJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBtb3ZlQXQoc2V0dGluZ3Muc2l6ZXMueCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJbml0aWFsIFxyXG4gICAgbW92ZUF0KHNldHRpbmdzLnNpemVzLngpO1xyXG4gIH1cclxuXHJcbiAgdGhhdC5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcclxuXHJcbiAgcmV0dXJuIHRoYXQ7XHJcbn0pKCk7IiwiLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0VGhlIGhlaWdodCBvZiBib3RoIHRvcGJhciBhbmQgZ3JvdXAgZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGNvbnN0IG9mZnNldFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7aHJlZn1gKS5vZmZzZXRUb3A7XHJcbiAgICBzY3JvbGwoe1xyXG4gICAgICB0b3A6IG9mZnNldFRvcCAtIG9mZnNldCxcclxuICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImNvbnN0IG1ha2VJdGVtcyA9ICgpID0+IHtcclxuICBsZXQgaXRlbXMgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICBpdGVtcyArPSBgXHJcbiAgICAgIDxsaSBjbGFzcz1cImdyb3VwX2l0ZW0gY29sM1wiPlxyXG4gICAgICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9pY29uIGxvYWRpbmdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfYm9keVwiPlxyXG4gICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmRfdGl0bGUgbG9hZGluZ1wiPjwvaDQ+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHQgbG9hZGluZ1wiPjwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGl0ZW1zO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2tlbGV0b24gPSAoKSA9PiBgXHJcbiAgPHNlY3Rpb24gY2xhc3M9XCJncm91cFwiID5cclxuICAgIDxoMyBjbGFzcz1cImdyb3VwX3RpdGxlIGxvYWRpbmdcIj48L2gzPlxyXG4gICAgPGRpdiBjbGFzcz1cImdyb3VwX2NvbnRlbnRcIj5cclxuICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+XHJcbiAgICAgICAgJHttYWtlSXRlbXMoKX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuYDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoc2VsZWN0b3IsIHRlbXBsYXRlKSB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICB0YXJnZXQuaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcclxufSJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMmx1WkdWNExtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVdSaGNIUmxjbk12ZUdoeUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVhocGIzTXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5allXNWpaV3d2UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyRnVZMlZzTDBOaGJtTmxiRlJ2YTJWdUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTJGdVkyVnNMMmx6UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlCZUdsdmN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJOdmNtVXZTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlpZFdsc1pFWjFiR3hRWVhSb0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOWpjbVZoZEdWRmNuSnZjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyTnZjbVV2WkdsemNHRjBZMmhTWlhGMVpYTjBMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlsYm1oaGJtTmxSWEp5YjNJdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlqYjNKbEwyMWxjbWRsUTI5dVptbG5MbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzl6WlhSMGJHVXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5amIzSmxMM1J5WVc1elptOXliVVJoZEdFdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlrWldaaGRXeDBjeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlltbHVaQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlluVnBiR1JWVWt3dWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMMk52YldKcGJtVlZVa3h6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZhR1ZzY0dWeWN5OWpiMjlyYVdWekxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzBGaWMyOXNkWFJsVlZKTUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzFWU1RGTmhiV1ZQY21sbmFXNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5b1pXeHdaWEp6TDI1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMM0JoY25ObFNHVmhaR1Z5Y3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMmhsYkhCbGNuTXZjM0J5WldGa0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2ZFhScGJITXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDNCeWIyTmxjM012WW5KdmQzTmxjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZiV0ZwYmk1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12Ylc5a1pXeHpMME52YlhCdmJtVnVkQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZjMlZ5ZG1salpYTXZjbVZ6YjNWeVkyVnpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OTJhV1YzY3k5RVQwMUZiR1Z0Wlc1MGN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmRtbGxkM012YUdGdVpHeGxUV1Z1ZFM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12ZG1sbGQzTXZjbVZ6YVhwbExtcHpJaXdpZDJWaWNHRmphem92THk4dUwzTnlZeTlxY3k5MmFXVjNjeTl6WTNKdmJHeFVieTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZkbWxsZDNNdmMydGxiR1YwYjI0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQkxHbENRVUZwUWl4dFFrRkJUeXhEUVVGRExITkVRVUZoTEVVN096czdPenM3T3pzN096dEJRMEY2UWpzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN1FVRkRhRU1zWVVGQllTeHRRa0ZCVHl4RFFVRkRMR2xGUVVGclFqdEJRVU4yUXl4alFVRmpMRzFDUVVGUExFTkJRVU1zZVVWQlFYTkNPMEZCUXpWRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl3eVJVRkJkVUk3UVVGRE9VTXNiMEpCUVc5Q0xHMUNRVUZQTEVOQlFVTXNOa1ZCUVhWQ08wRkJRMjVFTEcxQ1FVRnRRaXh0UWtGQlR5eERRVUZETEcxR1FVRXlRanRCUVVOMFJDeHpRa0ZCYzBJc2JVSkJRVThzUTBGQlF5eDVSa0ZCT0VJN1FVRkROVVFzYTBKQlFXdENMRzFDUVVGUExFTkJRVU1zZVVWQlFYRkNPenRCUVVVdlF6dEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxEUkRRVUUwUXp0QlFVTTFRenM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdPenM3T3pzN096czdPenRCUTJ4TVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zYTBSQlFWTTdRVUZETjBJc1YwRkJWeXh0UWtGQlR5eERRVUZETEdkRlFVRm5RanRCUVVOdVF5eFpRVUZaTEcxQ1FVRlBMRU5CUVVNc05FUkJRV003UVVGRGJFTXNhMEpCUVd0Q0xHMUNRVUZQTEVOQlFVTXNkMFZCUVc5Q08wRkJRemxETEdWQlFXVXNiVUpCUVU4c1EwRkJReXgzUkVGQldUczdRVUZGYmtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmxCUVZrc1RVRkJUVHRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hsUVVGbExHMUNRVUZQTEVOQlFVTXNhMFZCUVdsQ08wRkJRM2hETEc5Q1FVRnZRaXh0UWtGQlR5eERRVUZETERSRlFVRnpRanRCUVVOc1JDeHBRa0ZCYVVJc2JVSkJRVThzUTBGQlF5eHpSVUZCYlVJN08wRkJSVFZETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1pVRkJaU3h0UWtGQlR5eERRVUZETEc5RlFVRnJRanM3UVVGRmVrTTdPMEZCUlVFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzQkVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1VVRkJVVHRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN096czdPenM3T3pzN096czdRVU5zUW1FN08wRkJSV0lzWVVGQllTeHRRa0ZCVHl4RFFVRkRMREpFUVVGVk96dEJRVVV2UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN096czdPenM3T3pzN096czdRVU40UkdFN08wRkJSV0k3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRTbUU3TzBGQlJXSXNXVUZCV1N4dFFrRkJUeXhEUVVGRExIRkVRVUZaTzBGQlEyaERMR1ZCUVdVc2JVSkJRVThzUTBGQlF5eDVSVUZCY1VJN1FVRkROVU1zZVVKQlFYbENMRzFDUVVGUExFTkJRVU1zYVVaQlFYTkNPMEZCUTNaRUxITkNRVUZ6UWl4dFFrRkJUeXhEUVVGRExESkZRVUZ0UWp0QlFVTnFSQ3hyUWtGQmEwSXNiVUpCUVU4c1EwRkJReXh0UlVGQlpUczdRVUZGZWtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1owUkJRV2RFTzBGQlEyaEVPMEZCUTBFN1FVRkRRU3g1UWtGQmVVSTdRVUZEZWtJc1MwRkJTenRCUVVOTU8wRkJRMEVzUTBGQlF6czdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRU3huUkVGQlowUTdRVUZEYUVRN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRXNRMEZCUXpzN1FVRkZSRHM3T3pzN096czdPenM3T3p0QlF6bEdZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVms3TzBGQlJXaERPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFRRVUZUTzBGQlEzQkNPMEZCUTBFc1dVRkJXU3hQUVVGUE8wRkJRMjVDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN096czdPenM3T3pzN096czdRVU51UkdFN08wRkJSV0lzYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zYlVaQlFUQkNPMEZCUTNSRUxHdENRVUZyUWl4dFFrRkJUeXhEUVVGRExDdEZRVUYzUWpzN1FVRkZiRVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEYmtKaE96dEJRVVZpTEcxQ1FVRnRRaXh0UWtGQlR5eERRVUZETEhGRlFVRm5RanM3UVVGRk0wTTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTFCUVUwN1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMnBDWVRzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN1FVRkRhRU1zYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zZFVWQlFXbENPMEZCUXpkRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl4MVJVRkJiMEk3UVVGRE0wTXNaVUZCWlN4dFFrRkJUeXhEUVVGRExIbEVRVUZoT3p0QlFVVndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN3clFrRkJLMEk3UVVGREwwSXNkVU5CUVhWRE8wRkJRM1pETzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnp0QlFVTklPenM3T3pzN096czdPenM3TzBGRE9VVmhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUVUZCVFR0QlFVTnFRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeE5RVUZOTzBGQlEyNUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTNwRFlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zYlVSQlFWVTdPMEZCUlRsQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTlCUVU4N1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3c01rSkJRVEpDTzBGQlF6TkNMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU96dEJRVVZCTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOMFJtRTdPMEZCUldJc2EwSkJRV3RDTEcxQ1FVRlBMRU5CUVVNc2JVVkJRV1U3TzBGQlJYcERPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWl4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRlRUpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4alFVRmpPMEZCUTNwQ0xGZEJRVmNzVFVGQlRUdEJRVU5xUWl4WFFVRlhMR1ZCUVdVN1FVRkRNVUlzWVVGQllTeEZRVUZGTzBGQlEyWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVRzN096czdPenM3T3pzN096dEJRMjVDUVN3clEwRkJZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2EwUkJRVk03UVVGRE4wSXNNRUpCUVRCQ0xHMUNRVUZQTEVOQlFVTXNPRVpCUVN0Q096dEJRVVZxUlR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNiVUpCUVU4c1EwRkJReXhuUlVGQlowSTdRVUZEZEVNc1IwRkJSenRCUVVOSU8wRkJRMEVzWTBGQll5eHRRa0ZCVHl4RFFVRkRMR2xGUVVGcFFqdEJRVU4yUXp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEhkRlFVRjNSVHRCUVVONFJUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVJFRkJkVVE3UVVGRGRrUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUeXhaUVVGWk8wRkJRMjVDTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEVOQlFVTTdPMEZCUlVRN1FVRkRRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdPenM3T3pzN096czdPenM3TzBGRGFrZGhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxQ1FVRnRRaXhwUWtGQmFVSTdRVUZEY0VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTFaaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXh4UkVGQldUczdRVUZGYUVNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVN4SFFVRkhPMEZCUTBnN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBc1MwRkJTenM3UVVGRlREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEY2tWaE96dEJRVVZpTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEySmhPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHM3UVVGRmFFTTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQkxEQkRRVUV3UXp0QlFVTXhReXhUUVVGVE96dEJRVVZVTzBGQlEwRXNORVJCUVRSRUxIZENRVUYzUWp0QlFVTndSanRCUVVOQkxGTkJRVk03TzBGQlJWUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJMR3REUVVGclF6dEJRVU5zUXl3clFrRkJLMElzWVVGQllTeEZRVUZGTzBGQlF6bERPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3T3pzN096czdPenM3T3pzN1FVTndSR0U3TzBGQlJXSTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMkpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1kwRkJZeXhQUVVGUE8wRkJRM0pDTEdkQ1FVRm5RanRCUVVOb1FqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNUMEZCVHp0QlFVTnlRaXhuUWtGQlowSXNVVUZCVVR0QlFVTjRRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N096czdPenM3T3pzN096czdRVU51UldFN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMRzFFUVVGVk96dEJRVVU1UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPenM3T3pzN096czdPenM3UVVOWVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdPMEZCUldoRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFTeHBRa0ZCYVVJc1pVRkJaVHM3UVVGRmFFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzQkVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc0swSkJRU3RDTzBGQlF5OUNPMEZCUTBFN1FVRkRRU3hYUVVGWExGTkJRVk03UVVGRGNFSXNZVUZCWVR0QlFVTmlPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUXpGQ1lUczdRVUZGWWl4WFFVRlhMRzFDUVVGUExFTkJRVU1zWjBWQlFXZENPenRCUVVWdVF6czdRVUZGUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGbEJRVmtzVVVGQlVUdEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhoUVVGaE8wRkJRM2hDTEZkQlFWY3NVMEZCVXp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2JVTkJRVzFETEU5QlFVODdRVUZETVVNN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNkVUpCUVhWQ0xGTkJRVk1zUjBGQlJ5eFRRVUZUTzBGQlF6VkRMREpDUVVFeVFqdEJRVU16UWp0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3c05FSkJRVFJDTzBGQlF6VkNMRXRCUVVzN1FVRkRURHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFc2RVTkJRWFZETEU5QlFVODdRVUZET1VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNXVUZCV1N4UFFVRlBPMEZCUTI1Q08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WlFVRlpMRTlCUVU4N1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3UVVNNVZrRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZOQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFTeERRVUZETzBGQlEwUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CTzBGQlEwRXNVMEZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN08wRkJTVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIVkNRVUYxUWl4elFrRkJjMEk3UVVGRE4wTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h4UWtGQmNVSTdRVUZEY2tJN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMSEZEUVVGeFF6czdRVUZGY2tNN1FVRkRRVHRCUVVOQk96dEJRVVZCTERKQ1FVRXlRanRCUVVNelFqdEJRVU5CTzBGQlEwRTdRVUZEUVN3MFFrRkJORUlzVlVGQlZUczdPenM3T3pzN096czdPenRCUTNaTWRFTTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUVyUXp0QlFVMXNRanRCUVVNd1FqdEJRVU5hTzBGQlF6aENPMEZCUTNoQ08wRkJRMVE3TzBGQlJYaERPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVERzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeGhRVUZoTEU5QlFVODdRVUZEY0VJc1lVRkJZU3hOUVVGTk8wRkJRMjVDTEdGQlFXRXNVMEZCVXp0QlFVTjBRanRCUVVOQk8wRkJRMEVzWlVGQlpTd3lSRUZCVXp0QlFVTjRRanRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTEN0Q1FVRXJRanM3UVVGRkwwSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFTeHBSVUZCYVVVc0swUkJRVms3TzBGQlJUZEZPMEZCUTBFc1owVkJRV2RGTERoRVFVRlhPenRCUVVVelJUdEJRVU5CTzBGQlEwRXNNa0pCUVRKQ0xGTkJRVk03TzBGQlJYQkRPMEZCUTBFN1FVRkRRVHRCUVVOQkxIbERRVUY1UXl3eVJFRkJVVHRCUVVOcVJDeExRVUZMT3p0QlFVVk1PMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJMSFZEUVVGMVF5eHhSVUZCWVR0QlFVTndSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnpzN1FVRkZXRHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTEV0QlFVczdPenRCUVVkTU8wRkJRMEVzU1VGQlNTeHZSVUZCVlN4RFFVRkRMREpFUVVGUk96dEJRVVYyUWp0QlFVTkJMRWxCUVVrc2IwUkJRVTBzWVVGQllTeFhRVUZYTERKRVFVRlJMRVZCUVVVN08wRkJSVFZETEhORFFVRnpReXh2UlVGQlZTeERRVUZETERKRVFVRlJPMEZCUTNwRUxFbEJRVWtzTWtSQlFWRXNNa05CUVRKRExIVkZRVUZoTEVOQlFVTXNNa1JCUVZFN1FVRkROMFVzU1VGQlNTd3lSRUZCVVN3eVEwRkJNa01zZFVWQlFXRXNRMEZCUXl3eVJFRkJVVHM3UVVGRk4wVXNTVUZCU1N3eVJFRkJVVHRCUVVOYUxGVkJRVlVzTWtSQlFWRTdRVUZEYkVJc1VVRkJVU3hyUlVGQlVTeERRVUZETERKRVFVRlJPMEZCUTNwQ08wRkJRMEVzUzBGQlN6czdRVUZGVEN4SlFVRkpMREpFUVVGUk8wRkJRMW83UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVERzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RlFVRkZMRGhFUVVGTkxHMURRVUZ0UXl3eVJFRkJWenM3UVVGRmRFUTdRVUZEUVN4RlFVRkZMREpFUVVGUE8wRkJRMVE3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN08wRkJSVUU3UVVGRFFTeERRVUZET3pzN096czdPenM3T3pzN08wRkRka3RFTzBGQlFVRTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZQT3p0QlFVVlFPMEZCUTBFN1FVRkRRU3hoUVVGaExFOUJRVTg3UVVGRGNFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFTeERRVUZETEVrN096czdPenM3T3pzN096dEJRMmhFUkR0QlFVRkJPMEZCUVVFN1FVRkJNRUk3UVVGRE1VSTdPMEZCUlVFN1FVRkRRU3hyUWtGQmEwSXNORU5CUVVzN1FVRkRka0k3UVVGRFFUczdRVUZGUVR0QlFVTkJMR3RDUVVGclFpdzBRMEZCU3p0QlFVTjJRanRCUVVOQk96dEJRVVZCTzBGQlEwRXNhMEpCUVd0Q0xEUkRRVUZMTEZGQlFWRXNVVUZCVVN4SFFVRkhMRWRCUVVjN1FVRkROME03UVVGRFFUczdRVUZGWlN4blJVRkJReXg1UWtGQmVVSXNSVUZCUXpzN096czdPenM3T3pzN096dEJRMnhDTVVNN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRUenRCUVVOUU8wRkJRMEVzWjBKQlFXZENMRk5CUVZNN1FVRkRla0lzSzBOQlFTdERMRk5CUVZNc2RVSkJRWFZDTEZOQlFWTTdRVUZEZUVZc2QwTkJRWGRETEZOQlFWTTdRVUZEYWtRN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwODdRVUZEVUN4cFFrRkJhVUlzVTBGQlV6dEJRVU14UWl3NFFrRkJPRUlzVTBGQlV6dEJRVU4yUXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwODdRVUZEVUR0QlFVTkJMSFZEUVVGMVF5eGpRVUZqTzBGQlEzSkVPMEZCUTBFc2MwTkJRWE5ETEdGQlFXRXNVMEZCVXl4MVEwRkJkVU03UVVGRGJrYzdRVUZEUVN4dFEwRkJiVU1zWlVGQlpUdEJRVU5zUkN4cFEwRkJhVU1zYVVKQlFXbENPMEZCUTJ4RU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSVHM3T3pzN096czdPenM3TzBGRE4wTkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGRFFUdEJRVU5CT3p0QlFVVlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMnhEUVR0QlFVRkJPMEZCUVU4N1FVRkRVRHM3UVVGRlFTeHJRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N08wRkJSVUU3UVVGRFFUdEJRVU5CTERKQ08wRkJRMEVzSzBKQlFTdENPenRCUVVVdlFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNUMEZCVHpzN1FVRkZVQ3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQkxFTkJRVU1zU1RzN096czdPenM3T3pzN08wRkRha1ZFTzBGQlFVRTdRVUZCUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTzBGQlEwODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRU3huUkVGQlowUXNTMEZCU3p0QlFVTnlSRHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVN4RE96czdPenM3T3pzN096czdRVU5rUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVOQk96dEJRVVZCTEdsQ1FVRnBRaXhSUVVGUk8wRkJRM3BDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlZUdEJRVU5XTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRXNReUlzSW1acGJHVWlPaUpsWkdFMk9HVTFNekl4TkRZeU1tSTBOVGcxTmk1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaUJjZEM4dklGUm9aU0J0YjJSMWJHVWdZMkZqYUdWY2JpQmNkSFpoY2lCcGJuTjBZV3hzWldSTmIyUjFiR1Z6SUQwZ2UzMDdYRzVjYmlCY2RDOHZJRlJvWlNCeVpYRjFhWEpsSUdaMWJtTjBhVzl1WEc0Z1hIUm1kVzVqZEdsdmJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLRzF2WkhWc1pVbGtLU0I3WEc1Y2JpQmNkRngwTHk4Z1EyaGxZMnNnYVdZZ2JXOWtkV3hsSUdseklHbHVJR05oWTJobFhHNGdYSFJjZEdsbUtHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZEtTQjdYRzRnWEhSY2RGeDBjbVYwZFhKdUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtVjRjRzl5ZEhNN1hHNGdYSFJjZEgxY2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdrNklHMXZaSFZzWlVsa0xGeHVJRngwWEhSY2RHdzZJR1poYkhObExGeHVJRngwWEhSY2RHVjRjRzl5ZEhNNklIdDlYRzRnWEhSY2RIMDdYRzVjYmlCY2RGeDBMeThnUlhobFkzVjBaU0IwYUdVZ2JXOWtkV3hsSUdaMWJtTjBhVzl1WEc0Z1hIUmNkRzF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbU5oYkd3b2JXOWtkV3hsTG1WNGNHOXlkSE1zSUcxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNGdYSFJjZEM4dklFWnNZV2NnZEdobElHMXZaSFZzWlNCaGN5QnNiMkZrWldSY2JpQmNkRngwYlc5a2RXeGxMbXdnUFNCMGNuVmxPMXh1WEc0Z1hIUmNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzRnWEhSY2RISmxkSFZ5YmlCdGIyUjFiR1V1Wlhod2IzSjBjenRjYmlCY2RIMWNibHh1WEc0Z1hIUXZMeUJsZUhCdmMyVWdkR2hsSUcxdlpIVnNaWE1nYjJKcVpXTjBJQ2hmWDNkbFluQmhZMnRmYlc5a2RXeGxjMTlmS1Z4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV0SUQwZ2JXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pYaHdiM05sSUhSb1pTQnRiMlIxYkdVZ1kyRmphR1ZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVZeUE5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE03WEc1Y2JpQmNkQzh2SUdSbFptbHVaU0JuWlhSMFpYSWdablZ1WTNScGIyNGdabTl5SUdoaGNtMXZibmtnWlhod2IzSjBjMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWtJRDBnWm5WdVkzUnBiMjRvWlhod2IzSjBjeXdnYm1GdFpTd2daMlYwZEdWeUtTQjdYRzRnWEhSY2RHbG1LQ0ZmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG04b1pYaHdiM0owY3l3Z2JtRnRaU2twSUh0Y2JpQmNkRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dibUZ0WlN3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQm5aWFE2SUdkbGRIUmxjaUI5S1R0Y2JpQmNkRngwZlZ4dUlGeDBmVHRjYmx4dUlGeDBMeThnWkdWbWFXNWxJRjlmWlhOTmIyUjFiR1VnYjI0Z1pYaHdiM0owYzF4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV5SUQwZ1puVnVZM1JwYjI0b1pYaHdiM0owY3lrZ2UxeHVJRngwWEhScFppaDBlWEJsYjJZZ1UzbHRZbTlzSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjcElIdGNiaUJjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuTENCN0lIWmhiSFZsT2lBblRXOWtkV3hsSnlCOUtUdGNiaUJjZEZ4MGZWeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29aWGh3YjNKMGN5d2dKMTlmWlhOTmIyUjFiR1VuTENCN0lIWmhiSFZsT2lCMGNuVmxJSDBwTzF4dUlGeDBmVHRjYmx4dUlGeDBMeThnWTNKbFlYUmxJR0VnWm1GclpTQnVZVzFsYzNCaFkyVWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnTVRvZ2RtRnNkV1VnYVhNZ1lTQnRiMlIxYkdVZ2FXUXNJSEpsY1hWcGNtVWdhWFJjYmlCY2RDOHZJRzF2WkdVZ0ppQXlPaUJ0WlhKblpTQmhiR3dnY0hKdmNHVnlkR2xsY3lCdlppQjJZV3gxWlNCcGJuUnZJSFJvWlNCdWMxeHVJRngwTHk4Z2JXOWtaU0FtSURRNklISmxkSFZ5YmlCMllXeDFaU0IzYUdWdUlHRnNjbVZoWkhrZ2JuTWdiMkpxWldOMFhHNGdYSFF2THlCdGIyUmxJQ1lnT0h3eE9pQmlaV2hoZG1VZ2JHbHJaU0J5WlhGMWFYSmxYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuUWdQU0JtZFc1amRHbHZiaWgyWVd4MVpTd2diVzlrWlNrZ2UxeHVJRngwWEhScFppaHRiMlJsSUNZZ01Ta2dkbUZzZFdVZ1BTQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLSFpoYkhWbEtUdGNiaUJjZEZ4MGFXWW9iVzlrWlNBbUlEZ3BJSEpsZEhWeWJpQjJZV3gxWlR0Y2JpQmNkRngwYVdZb0tHMXZaR1VnSmlBMEtTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhaaGJIVmxJQ1ltSUhaaGJIVmxMbDlmWlhOTmIyUjFiR1VwSUhKbGRIVnliaUIyWVd4MVpUdGNiaUJjZEZ4MGRtRnlJRzV6SUQwZ1QySnFaV04wTG1OeVpXRjBaU2h1ZFd4c0tUdGNiaUJjZEZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXlLRzV6S1R0Y2JpQmNkRngwVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtHNXpMQ0FuWkdWbVlYVnNkQ2NzSUhzZ1pXNTFiV1Z5WVdKc1pUb2dkSEoxWlN3Z2RtRnNkV1U2SUhaaGJIVmxJSDBwTzF4dUlGeDBYSFJwWmlodGIyUmxJQ1lnTWlBbUppQjBlWEJsYjJZZ2RtRnNkV1VnSVQwZ0ozTjBjbWx1WnljcElHWnZjaWgyWVhJZ2EyVjVJR2x1SUhaaGJIVmxLU0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG1Rb2JuTXNJR3RsZVN3Z1puVnVZM1JwYjI0b2EyVjVLU0I3SUhKbGRIVnliaUIyWVd4MVpWdHJaWGxkT3lCOUxtSnBibVFvYm5Wc2JDd2dhMlY1S1NrN1hHNGdYSFJjZEhKbGRIVnliaUJ1Y3p0Y2JpQmNkSDA3WEc1Y2JpQmNkQzh2SUdkbGRFUmxabUYxYkhSRmVIQnZjblFnWm5WdVkzUnBiMjRnWm05eUlHTnZiWEJoZEdsaWFXeHBkSGtnZDJsMGFDQnViMjR0YUdGeWJXOXVlU0J0YjJSMWJHVnpYRzRnWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtNGdQU0JtZFc1amRHbHZiaWh0YjJSMWJHVXBJSHRjYmlCY2RGeDBkbUZ5SUdkbGRIUmxjaUE5SUcxdlpIVnNaU0FtSmlCdGIyUjFiR1V1WDE5bGMwMXZaSFZzWlNBL1hHNGdYSFJjZEZ4MFpuVnVZM1JwYjI0Z1oyVjBSR1ZtWVhWc2RDZ3BJSHNnY21WMGRYSnVJRzF2WkhWc1pWc25aR1ZtWVhWc2RDZGRPeUI5SURwY2JpQmNkRngwWEhSbWRXNWpkR2x2YmlCblpYUk5iMlIxYkdWRmVIQnZjblJ6S0NrZ2V5QnlaWFIxY200Z2JXOWtkV3hsT3lCOU8xeHVJRngwWEhSZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxtUW9aMlYwZEdWeUxDQW5ZU2NzSUdkbGRIUmxjaWs3WEc0Z1hIUmNkSEpsZEhWeWJpQm5aWFIwWlhJN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd4Y2JpQmNkRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YnlBOUlHWjFibU4wYVc5dUtHOWlhbVZqZEN3Z2NISnZjR1Z5ZEhrcElIc2djbVYwZFhKdUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lIQnliM0JsY25SNUtUc2dmVHRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNibHh1SUZ4MEx5OGdURzloWkNCbGJuUnllU0J0YjJSMWJHVWdZVzVrSUhKbGRIVnliaUJsZUhCdmNuUnpYRzRnWEhSeVpYUjFjbTRnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHloZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZkxuTWdQU0F3S1R0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbVZ4ZFdseVpTZ25MaTlzYVdJdllYaHBiM01uS1RzaUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JuWmhjaUJ6WlhSMGJHVWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwyTnZjbVV2YzJWMGRHeGxKeWs3WEc1MllYSWdZMjl2YTJsbGN5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmFHVnNjR1Z5Y3k5amIyOXJhV1Z6SnlrN1hHNTJZWElnWW5WcGJHUlZVa3dnUFNCeVpYRjFhWEpsS0NjdUx5NHVMMmhsYkhCbGNuTXZZblZwYkdSVlVrd25LVHRjYm5aaGNpQmlkV2xzWkVaMWJHeFFZWFJvSUQwZ2NtVnhkV2x5WlNnbkxpNHZZMjl5WlM5aWRXbHNaRVoxYkd4UVlYUm9KeWs3WEc1MllYSWdjR0Z5YzJWSVpXRmtaWEp6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTlvWld4d1pYSnpMM0JoY25ObFNHVmhaR1Z5Y3ljcE8xeHVkbUZ5SUdselZWSk1VMkZ0WlU5eWFXZHBiaUE5SUhKbGNYVnBjbVVvSnk0dkxpNHZhR1ZzY0dWeWN5OXBjMVZTVEZOaGJXVlBjbWxuYVc0bktUdGNiblpoY2lCamNtVmhkR1ZGY25KdmNpQTlJSEpsY1hWcGNtVW9KeTR1TDJOdmNtVXZZM0psWVhSbFJYSnliM0luS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQjRhSEpCWkdGd2RHVnlLR052Ym1acFp5a2dlMXh1SUNCeVpYUjFjbTRnYm1WM0lGQnliMjFwYzJVb1puVnVZM1JwYjI0Z1pHbHpjR0YwWTJoWWFISlNaWEYxWlhOMEtISmxjMjlzZG1Vc0lISmxhbVZqZENrZ2UxeHVJQ0FnSUhaaGNpQnlaWEYxWlhOMFJHRjBZU0E5SUdOdmJtWnBaeTVrWVhSaE8xeHVJQ0FnSUhaaGNpQnlaWEYxWlhOMFNHVmhaR1Z5Y3lBOUlHTnZibVpwWnk1b1pXRmtaWEp6TzF4dVhHNGdJQ0FnYVdZZ0tIVjBhV3h6TG1selJtOXliVVJoZEdFb2NtVnhkV1Z6ZEVSaGRHRXBLU0I3WEc0Z0lDQWdJQ0JrWld4bGRHVWdjbVZ4ZFdWemRFaGxZV1JsY25OYkowTnZiblJsYm5RdFZIbHdaU2RkT3lBdkx5Qk1aWFFnZEdobElHSnliM2R6WlhJZ2MyVjBJR2wwWEc0Z0lDQWdmVnh1WEc0Z0lDQWdkbUZ5SUhKbGNYVmxjM1FnUFNCdVpYY2dXRTFNU0hSMGNGSmxjWFZsYzNRb0tUdGNibHh1SUNBZ0lDOHZJRWhVVkZBZ1ltRnphV01nWVhWMGFHVnVkR2xqWVhScGIyNWNiaUFnSUNCcFppQW9ZMjl1Wm1sbkxtRjFkR2dwSUh0Y2JpQWdJQ0FnSUhaaGNpQjFjMlZ5Ym1GdFpTQTlJR052Ym1acFp5NWhkWFJvTG5WelpYSnVZVzFsSUh4OElDY25PMXh1SUNBZ0lDQWdkbUZ5SUhCaGMzTjNiM0prSUQwZ1kyOXVabWxuTG1GMWRHZ3VjR0Z6YzNkdmNtUWdQeUIxYm1WelkyRndaU2hsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvWTI5dVptbG5MbUYxZEdndWNHRnpjM2R2Y21RcEtTQTZJQ2NuTzF4dUlDQWdJQ0FnY21WeGRXVnpkRWhsWVdSbGNuTXVRWFYwYUc5eWFYcGhkR2x2YmlBOUlDZENZWE5wWXlBbklDc2dZblJ2WVNoMWMyVnlibUZ0WlNBcklDYzZKeUFySUhCaGMzTjNiM0prS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWVhJZ1puVnNiRkJoZEdnZ1BTQmlkV2xzWkVaMWJHeFFZWFJvS0dOdmJtWnBaeTVpWVhObFZWSk1MQ0JqYjI1bWFXY3VkWEpzS1R0Y2JpQWdJQ0J5WlhGMVpYTjBMbTl3Wlc0b1kyOXVabWxuTG0xbGRHaHZaQzUwYjFWd2NHVnlRMkZ6WlNncExDQmlkV2xzWkZWU1RDaG1kV3hzVUdGMGFDd2dZMjl1Wm1sbkxuQmhjbUZ0Y3l3Z1kyOXVabWxuTG5CaGNtRnRjMU5sY21saGJHbDZaWElwTENCMGNuVmxLVHRjYmx4dUlDQWdJQzh2SUZObGRDQjBhR1VnY21WeGRXVnpkQ0IwYVcxbGIzVjBJR2x1SUUxVFhHNGdJQ0FnY21WeGRXVnpkQzUwYVcxbGIzVjBJRDBnWTI5dVptbG5MblJwYldWdmRYUTdYRzVjYmlBZ0lDQXZMeUJNYVhOMFpXNGdabTl5SUhKbFlXUjVJSE4wWVhSbFhHNGdJQ0FnY21WeGRXVnpkQzV2Ym5KbFlXUjVjM1JoZEdWamFHRnVaMlVnUFNCbWRXNWpkR2x2YmlCb1lXNWtiR1ZNYjJGa0tDa2dlMXh1SUNBZ0lDQWdhV1lnS0NGeVpYRjFaWE4wSUh4OElISmxjWFZsYzNRdWNtVmhaSGxUZEdGMFpTQWhQVDBnTkNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDOHZJRlJvWlNCeVpYRjFaWE4wSUdWeWNtOXlaV1FnYjNWMElHRnVaQ0IzWlNCa2FXUnVKM1FnWjJWMElHRWdjbVZ6Y0c5dWMyVXNJSFJvYVhNZ2QybHNiQ0JpWlZ4dUlDQWdJQ0FnTHk4Z2FHRnVaR3hsWkNCaWVTQnZibVZ5Y205eUlHbHVjM1JsWVdSY2JpQWdJQ0FnSUM4dklGZHBkR2dnYjI1bElHVjRZMlZ3ZEdsdmJqb2djbVZ4ZFdWemRDQjBhR0YwSUhWemFXNW5JR1pwYkdVNklIQnliM1J2WTI5c0xDQnRiM04wSUdKeWIzZHpaWEp6WEc0Z0lDQWdJQ0F2THlCM2FXeHNJSEpsZEhWeWJpQnpkR0YwZFhNZ1lYTWdNQ0JsZG1WdUlIUm9iM1ZuYUNCcGRDZHpJR0VnYzNWalkyVnpjMloxYkNCeVpYRjFaWE4wWEc0Z0lDQWdJQ0JwWmlBb2NtVnhkV1Z6ZEM1emRHRjBkWE1nUFQwOUlEQWdKaVlnSVNoeVpYRjFaWE4wTG5KbGMzQnZibk5sVlZKTUlDWW1JSEpsY1hWbGMzUXVjbVZ6Y0c5dWMyVlZVa3d1YVc1a1pYaFBaaWduWm1sc1pUb25LU0E5UFQwZ01Da3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0F2THlCUWNtVndZWEpsSUhSb1pTQnlaWE53YjI1elpWeHVJQ0FnSUNBZ2RtRnlJSEpsYzNCdmJuTmxTR1ZoWkdWeWN5QTlJQ2RuWlhSQmJHeFNaWE53YjI1elpVaGxZV1JsY25NbklHbHVJSEpsY1hWbGMzUWdQeUJ3WVhKelpVaGxZV1JsY25Nb2NtVnhkV1Z6ZEM1blpYUkJiR3hTWlhOd2IyNXpaVWhsWVdSbGNuTW9LU2tnT2lCdWRXeHNPMXh1SUNBZ0lDQWdkbUZ5SUhKbGMzQnZibk5sUkdGMFlTQTlJQ0ZqYjI1bWFXY3VjbVZ6Y0c5dWMyVlVlWEJsSUh4OElHTnZibVpwWnk1eVpYTndiMjV6WlZSNWNHVWdQVDA5SUNkMFpYaDBKeUEvSUhKbGNYVmxjM1F1Y21WemNHOXVjMlZVWlhoMElEb2djbVZ4ZFdWemRDNXlaWE53YjI1elpUdGNiaUFnSUNBZ0lIWmhjaUJ5WlhOd2IyNXpaU0E5SUh0Y2JpQWdJQ0FnSUNBZ1pHRjBZVG9nY21WemNHOXVjMlZFWVhSaExGeHVJQ0FnSUNBZ0lDQnpkR0YwZFhNNklISmxjWFZsYzNRdWMzUmhkSFZ6TEZ4dUlDQWdJQ0FnSUNCemRHRjBkWE5VWlhoME9pQnlaWEYxWlhOMExuTjBZWFIxYzFSbGVIUXNYRzRnSUNBZ0lDQWdJR2hsWVdSbGNuTTZJSEpsYzNCdmJuTmxTR1ZoWkdWeWN5eGNiaUFnSUNBZ0lDQWdZMjl1Wm1sbk9pQmpiMjVtYVdjc1hHNGdJQ0FnSUNBZ0lISmxjWFZsYzNRNklISmxjWFZsYzNSY2JpQWdJQ0FnSUgwN1hHNWNiaUFnSUNBZ0lITmxkSFJzWlNoeVpYTnZiSFpsTENCeVpXcGxZM1FzSUhKbGMzQnZibk5sS1R0Y2JseHVJQ0FnSUNBZ0x5OGdRMnhsWVc0Z2RYQWdjbVZ4ZFdWemRGeHVJQ0FnSUNBZ2NtVnhkV1Z6ZENBOUlHNTFiR3c3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzh2SUVoaGJtUnNaU0JpY205M2MyVnlJSEpsY1hWbGMzUWdZMkZ1WTJWc2JHRjBhVzl1SUNoaGN5QnZjSEJ2YzJWa0lIUnZJR0VnYldGdWRXRnNJR05oYm1ObGJHeGhkR2x2YmlsY2JpQWdJQ0J5WlhGMVpYTjBMbTl1WVdKdmNuUWdQU0JtZFc1amRHbHZiaUJvWVc1a2JHVkJZbTl5ZENncElIdGNiaUFnSUNBZ0lHbG1JQ2doY21WeGRXVnpkQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhKbGFtVmpkQ2hqY21WaGRHVkZjbkp2Y2lnblVtVnhkV1Z6ZENCaFltOXlkR1ZrSnl3Z1kyOXVabWxuTENBblJVTlBUazVCUWs5U1ZFVkVKeXdnY21WeGRXVnpkQ2twTzF4dVhHNGdJQ0FnSUNBdkx5QkRiR1ZoYmlCMWNDQnlaWEYxWlhOMFhHNGdJQ0FnSUNCeVpYRjFaWE4wSUQwZ2JuVnNiRHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeThnU0dGdVpHeGxJR3h2ZHlCc1pYWmxiQ0J1WlhSM2IzSnJJR1Z5Y205eWMxeHVJQ0FnSUhKbGNYVmxjM1F1YjI1bGNuSnZjaUE5SUdaMWJtTjBhVzl1SUdoaGJtUnNaVVZ5Y205eUtDa2dlMXh1SUNBZ0lDQWdMeThnVW1WaGJDQmxjbkp2Y25NZ1lYSmxJR2hwWkdSbGJpQm1jbTl0SUhWeklHSjVJSFJvWlNCaWNtOTNjMlZ5WEc0Z0lDQWdJQ0F2THlCdmJtVnljbTl5SUhOb2IzVnNaQ0J2Ym14NUlHWnBjbVVnYVdZZ2FYUW5jeUJoSUc1bGRIZHZjbXNnWlhKeWIzSmNiaUFnSUNBZ0lISmxhbVZqZENoamNtVmhkR1ZGY25KdmNpZ25UbVYwZDI5eWF5QkZjbkp2Y2ljc0lHTnZibVpwWnl3Z2JuVnNiQ3dnY21WeGRXVnpkQ2twTzF4dVhHNGdJQ0FnSUNBdkx5QkRiR1ZoYmlCMWNDQnlaWEYxWlhOMFhHNGdJQ0FnSUNCeVpYRjFaWE4wSUQwZ2JuVnNiRHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeThnU0dGdVpHeGxJSFJwYldWdmRYUmNiaUFnSUNCeVpYRjFaWE4wTG05dWRHbHRaVzkxZENBOUlHWjFibU4wYVc5dUlHaGhibVJzWlZScGJXVnZkWFFvS1NCN1hHNGdJQ0FnSUNCMllYSWdkR2x0Wlc5MWRFVnljbTl5VFdWemMyRm5aU0E5SUNkMGFXMWxiM1YwSUc5bUlDY2dLeUJqYjI1bWFXY3VkR2x0Wlc5MWRDQXJJQ2R0Y3lCbGVHTmxaV1JsWkNjN1hHNGdJQ0FnSUNCcFppQW9ZMjl1Wm1sbkxuUnBiV1Z2ZFhSRmNuSnZjazFsYzNOaFoyVXBJSHRjYmlBZ0lDQWdJQ0FnZEdsdFpXOTFkRVZ5Y205eVRXVnpjMkZuWlNBOUlHTnZibVpwWnk1MGFXMWxiM1YwUlhKeWIzSk5aWE56WVdkbE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2NtVnFaV04wS0dOeVpXRjBaVVZ5Y205eUtIUnBiV1Z2ZFhSRmNuSnZjazFsYzNOaFoyVXNJR052Ym1acFp5d2dKMFZEVDA1T1FVSlBVbFJGUkNjc1hHNGdJQ0FnSUNBZ0lISmxjWFZsYzNRcEtUdGNibHh1SUNBZ0lDQWdMeThnUTJ4bFlXNGdkWEFnY21WeGRXVnpkRnh1SUNBZ0lDQWdjbVZ4ZFdWemRDQTlJRzUxYkd3N1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4dklFRmtaQ0I0YzNKbUlHaGxZV1JsY2x4dUlDQWdJQzh2SUZSb2FYTWdhWE1nYjI1c2VTQmtiMjVsSUdsbUlISjFibTVwYm1jZ2FXNGdZU0J6ZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZG1seWIyNXRaVzUwTGx4dUlDQWdJQzh2SUZOd1pXTnBabWxqWVd4c2VTQnViM1FnYVdZZ2QyVW5jbVVnYVc0Z1lTQjNaV0lnZDI5eWEyVnlMQ0J2Y2lCeVpXRmpkQzF1WVhScGRtVXVYRzRnSUNBZ2FXWWdLSFYwYVd4ekxtbHpVM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2twSUh0Y2JpQWdJQ0FnSUM4dklFRmtaQ0I0YzNKbUlHaGxZV1JsY2x4dUlDQWdJQ0FnZG1GeUlIaHpjbVpXWVd4MVpTQTlJQ2hqYjI1bWFXY3VkMmwwYUVOeVpXUmxiblJwWVd4eklIeDhJR2x6VlZKTVUyRnRaVTl5YVdkcGJpaG1kV3hzVUdGMGFDa3BJQ1ltSUdOdmJtWnBaeTU0YzNKbVEyOXZhMmxsVG1GdFpTQS9YRzRnSUNBZ0lDQWdJR052YjJ0cFpYTXVjbVZoWkNoamIyNW1hV2N1ZUhOeVprTnZiMnRwWlU1aGJXVXBJRHBjYmlBZ0lDQWdJQ0FnZFc1a1pXWnBibVZrTzF4dVhHNGdJQ0FnSUNCcFppQW9lSE55WmxaaGJIVmxLU0I3WEc0Z0lDQWdJQ0FnSUhKbGNYVmxjM1JJWldGa1pYSnpXMk52Ym1acFp5NTRjM0ptU0dWaFpHVnlUbUZ0WlYwZ1BTQjRjM0ptVm1Gc2RXVTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdRV1JrSUdobFlXUmxjbk1nZEc4Z2RHaGxJSEpsY1hWbGMzUmNiaUFnSUNCcFppQW9KM05sZEZKbGNYVmxjM1JJWldGa1pYSW5JR2x1SUhKbGNYVmxjM1FwSUh0Y2JpQWdJQ0FnSUhWMGFXeHpMbVp2Y2tWaFkyZ29jbVZ4ZFdWemRFaGxZV1JsY25Nc0lHWjFibU4wYVc5dUlITmxkRkpsY1hWbGMzUklaV0ZrWlhJb2RtRnNMQ0JyWlhrcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJ5WlhGMVpYTjBSR0YwWVNBOVBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2EyVjVMblJ2VEc5M1pYSkRZWE5sS0NrZ1BUMDlJQ2RqYjI1MFpXNTBMWFI1Y0dVbktTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1VtVnRiM1psSUVOdmJuUmxiblF0Vkhsd1pTQnBaaUJrWVhSaElHbHpJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lDQWdJQ0FnSUdSbGJHVjBaU0J5WlhGMVpYTjBTR1ZoWkdWeWMxdHJaWGxkTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDOHZJRTkwYUdWeWQybHpaU0JoWkdRZ2FHVmhaR1Z5SUhSdklIUm9aU0J5WlhGMVpYTjBYRzRnSUNBZ0lDQWdJQ0FnY21WeGRXVnpkQzV6WlhSU1pYRjFaWE4wU0dWaFpHVnlLR3RsZVN3Z2RtRnNLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1FXUmtJSGRwZEdoRGNtVmtaVzUwYVdGc2N5QjBieUJ5WlhGMVpYTjBJR2xtSUc1bFpXUmxaRnh1SUNBZ0lHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5MbmRwZEdoRGNtVmtaVzUwYVdGc2N5a3BJSHRjYmlBZ0lDQWdJSEpsY1hWbGMzUXVkMmwwYUVOeVpXUmxiblJwWVd4eklEMGdJU0ZqYjI1bWFXY3VkMmwwYUVOeVpXUmxiblJwWVd4ek8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklFRmtaQ0J5WlhOd2IyNXpaVlI1Y0dVZ2RHOGdjbVZ4ZFdWemRDQnBaaUJ1WldWa1pXUmNiaUFnSUNCcFppQW9ZMjl1Wm1sbkxuSmxjM0J2Ym5ObFZIbHdaU2tnZTF4dUlDQWdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRDNXlaWE53YjI1elpWUjVjR1VnUFNCamIyNW1hV2N1Y21WemNHOXVjMlZVZVhCbE8xeHVJQ0FnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lDQWdJQ0F2THlCRmVIQmxZM1JsWkNCRVQwMUZlR05sY0hScGIyNGdkR2h5YjNkdUlHSjVJR0p5YjNkelpYSnpJRzV2ZENCamIyMXdZWFJwWW14bElGaE5URWgwZEhCU1pYRjFaWE4wSUV4bGRtVnNJREl1WEc0Z0lDQWdJQ0FnSUM4dklFSjFkQ3dnZEdocGN5QmpZVzRnWW1VZ2MzVndjSEpsYzNObFpDQm1iM0lnSjJwemIyNG5JSFI1Y0dVZ1lYTWdhWFFnWTJGdUlHSmxJSEJoY25ObFpDQmllU0JrWldaaGRXeDBJQ2QwY21GdWMyWnZjbTFTWlhOd2IyNXpaU2NnWm5WdVkzUnBiMjR1WEc0Z0lDQWdJQ0FnSUdsbUlDaGpiMjVtYVdjdWNtVnpjRzl1YzJWVWVYQmxJQ0U5UFNBbmFuTnZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCbE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdTR0Z1Wkd4bElIQnliMmR5WlhOeklHbG1JRzVsWldSbFpGeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ1kyOXVabWxuTG05dVJHOTNibXh2WVdSUWNtOW5jbVZ6Y3lBOVBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJQ0FnY21WeGRXVnpkQzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R3Y205bmNtVnpjeWNzSUdOdmJtWnBaeTV2YmtSdmQyNXNiMkZrVUhKdlozSmxjM01wTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUU1dmRDQmhiR3dnWW5KdmQzTmxjbk1nYzNWd2NHOXlkQ0IxY0d4dllXUWdaWFpsYm5SelhHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCamIyNW1hV2N1YjI1VmNHeHZZV1JRY205bmNtVnpjeUE5UFQwZ0oyWjFibU4wYVc5dUp5QW1KaUJ5WlhGMVpYTjBMblZ3Ykc5aFpDa2dlMXh1SUNBZ0lDQWdjbVZ4ZFdWemRDNTFjR3h2WVdRdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnbmNISnZaM0psYzNNbkxDQmpiMjVtYVdjdWIyNVZjR3h2WVdSUWNtOW5jbVZ6Y3lrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHTnZibVpwWnk1allXNWpaV3hVYjJ0bGJpa2dlMXh1SUNBZ0lDQWdMeThnU0dGdVpHeGxJR05oYm1ObGJHeGhkR2x2Ymx4dUlDQWdJQ0FnWTI5dVptbG5MbU5oYm1ObGJGUnZhMlZ1TG5CeWIyMXBjMlV1ZEdobGJpaG1kVzVqZEdsdmJpQnZia05oYm1ObGJHVmtLR05oYm1ObGJDa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb0lYSmxjWFZsYzNRcElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCeVpYRjFaWE4wTG1GaWIzSjBLQ2s3WEc0Z0lDQWdJQ0FnSUhKbGFtVmpkQ2hqWVc1alpXd3BPMXh1SUNBZ0lDQWdJQ0F2THlCRGJHVmhiaUIxY0NCeVpYRjFaWE4wWEc0Z0lDQWdJQ0FnSUhKbGNYVmxjM1FnUFNCdWRXeHNPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0NGeVpYRjFaWE4wUkdGMFlTa2dlMXh1SUNBZ0lDQWdjbVZ4ZFdWemRFUmhkR0VnUFNCdWRXeHNPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRk5sYm1RZ2RHaGxJSEpsY1hWbGMzUmNiaUFnSUNCeVpYRjFaWE4wTG5ObGJtUW9jbVZ4ZFdWemRFUmhkR0VwTzF4dUlDQjlLVHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNiblpoY2lCMWRHbHNjeUE5SUhKbGNYVnBjbVVvSnk0dmRYUnBiSE1uS1R0Y2JuWmhjaUJpYVc1a0lEMGdjbVZ4ZFdseVpTZ25MaTlvWld4d1pYSnpMMkpwYm1RbktUdGNiblpoY2lCQmVHbHZjeUE5SUhKbGNYVnBjbVVvSnk0dlkyOXlaUzlCZUdsdmN5Y3BPMXh1ZG1GeUlHMWxjbWRsUTI5dVptbG5JRDBnY21WeGRXbHlaU2duTGk5amIzSmxMMjFsY21kbFEyOXVabWxuSnlrN1hHNTJZWElnWkdWbVlYVnNkSE1nUFNCeVpYRjFhWEpsS0NjdUwyUmxabUYxYkhSekp5azdYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxJR0Z1SUdsdWMzUmhibU5sSUc5bUlFRjRhVzl6WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR1JsWm1GMWJIUkRiMjVtYVdjZ1ZHaGxJR1JsWm1GMWJIUWdZMjl1Wm1sbklHWnZjaUIwYUdVZ2FXNXpkR0Z1WTJWY2JpQXFJRUJ5WlhSMWNtNGdlMEY0YVc5emZTQkJJRzVsZHlCcGJuTjBZVzVqWlNCdlppQkJlR2x2YzF4dUlDb3ZYRzVtZFc1amRHbHZiaUJqY21WaGRHVkpibk4wWVc1alpTaGtaV1poZFd4MFEyOXVabWxuS1NCN1hHNGdJSFpoY2lCamIyNTBaWGgwSUQwZ2JtVjNJRUY0YVc5ektHUmxabUYxYkhSRGIyNW1hV2NwTzF4dUlDQjJZWElnYVc1emRHRnVZMlVnUFNCaWFXNWtLRUY0YVc5ekxuQnliM1J2ZEhsd1pTNXlaWEYxWlhOMExDQmpiMjUwWlhoMEtUdGNibHh1SUNBdkx5QkRiM0I1SUdGNGFXOXpMbkJ5YjNSdmRIbHdaU0IwYnlCcGJuTjBZVzVqWlZ4dUlDQjFkR2xzY3k1bGVIUmxibVFvYVc1emRHRnVZMlVzSUVGNGFXOXpMbkJ5YjNSdmRIbHdaU3dnWTI5dWRHVjRkQ2s3WEc1Y2JpQWdMeThnUTI5d2VTQmpiMjUwWlhoMElIUnZJR2x1YzNSaGJtTmxYRzRnSUhWMGFXeHpMbVY0ZEdWdVpDaHBibk4wWVc1alpTd2dZMjl1ZEdWNGRDazdYRzVjYmlBZ2NtVjBkWEp1SUdsdWMzUmhibU5sTzF4dWZWeHVYRzR2THlCRGNtVmhkR1VnZEdobElHUmxabUYxYkhRZ2FXNXpkR0Z1WTJVZ2RHOGdZbVVnWlhod2IzSjBaV1JjYm5aaGNpQmhlR2x2Y3lBOUlHTnlaV0YwWlVsdWMzUmhibU5sS0dSbFptRjFiSFJ6S1R0Y2JseHVMeThnUlhod2IzTmxJRUY0YVc5eklHTnNZWE56SUhSdklHRnNiRzkzSUdOc1lYTnpJR2x1YUdWeWFYUmhibU5sWEc1aGVHbHZjeTVCZUdsdmN5QTlJRUY0YVc5ek8xeHVYRzR2THlCR1lXTjBiM0o1SUdadmNpQmpjbVZoZEdsdVp5QnVaWGNnYVc1emRHRnVZMlZ6WEc1aGVHbHZjeTVqY21WaGRHVWdQU0JtZFc1amRHbHZiaUJqY21WaGRHVW9hVzV6ZEdGdVkyVkRiMjVtYVdjcElIdGNiaUFnY21WMGRYSnVJR055WldGMFpVbHVjM1JoYm1ObEtHMWxjbWRsUTI5dVptbG5LR0Y0YVc5ekxtUmxabUYxYkhSekxDQnBibk4wWVc1alpVTnZibVpwWnlrcE8xeHVmVHRjYmx4dUx5OGdSWGh3YjNObElFTmhibU5sYkNBbUlFTmhibU5sYkZSdmEyVnVYRzVoZUdsdmN5NURZVzVqWld3Z1BTQnlaWEYxYVhKbEtDY3VMMk5oYm1ObGJDOURZVzVqWld3bktUdGNibUY0YVc5ekxrTmhibU5sYkZSdmEyVnVJRDBnY21WeGRXbHlaU2duTGk5allXNWpaV3d2UTJGdVkyVnNWRzlyWlc0bktUdGNibUY0YVc5ekxtbHpRMkZ1WTJWc0lEMGdjbVZ4ZFdseVpTZ25MaTlqWVc1alpXd3ZhWE5EWVc1alpXd25LVHRjYmx4dUx5OGdSWGh3YjNObElHRnNiQzl6Y0hKbFlXUmNibUY0YVc5ekxtRnNiQ0E5SUdaMWJtTjBhVzl1SUdGc2JDaHdjbTl0YVhObGN5a2dlMXh1SUNCeVpYUjFjbTRnVUhKdmJXbHpaUzVoYkd3b2NISnZiV2x6WlhNcE8xeHVmVHRjYm1GNGFXOXpMbk53Y21WaFpDQTlJSEpsY1hWcGNtVW9KeTR2YUdWc2NHVnljeTl6Y0hKbFlXUW5LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCaGVHbHZjenRjYmx4dUx5OGdRV3hzYjNjZ2RYTmxJRzltSUdSbFptRjFiSFFnYVcxd2IzSjBJSE41Ym5SaGVDQnBiaUJVZVhCbFUyTnlhWEIwWEc1dGIyUjFiR1V1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnWVhocGIzTTdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYmk4cUtseHVJQ29nUVNCZ1EyRnVZMlZzWUNCcGN5QmhiaUJ2WW1wbFkzUWdkR2hoZENCcGN5QjBhSEp2ZDI0Z2QyaGxiaUJoYmlCdmNHVnlZWFJwYjI0Z2FYTWdZMkZ1WTJWc1pXUXVYRzRnS2x4dUlDb2dRR05zWVhOelhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVp6MTlJRzFsYzNOaFoyVWdWR2hsSUcxbGMzTmhaMlV1WEc0Z0tpOWNibVoxYm1OMGFXOXVJRU5oYm1ObGJDaHRaWE56WVdkbEtTQjdYRzRnSUhSb2FYTXViV1Z6YzJGblpTQTlJRzFsYzNOaFoyVTdYRzU5WEc1Y2JrTmhibU5sYkM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jZ1BTQm1kVzVqZEdsdmJpQjBiMU4wY21sdVp5Z3BJSHRjYmlBZ2NtVjBkWEp1SUNkRFlXNWpaV3duSUNzZ0tIUm9hWE11YldWemMyRm5aU0EvSUNjNklDY2dLeUIwYUdsekxtMWxjM05oWjJVZ09pQW5KeWs3WEc1OU8xeHVYRzVEWVc1alpXd3VjSEp2ZEc5MGVYQmxMbDlmUTBGT1EwVk1YMThnUFNCMGNuVmxPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVOaGJtTmxiRHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJRU5oYm1ObGJDQTlJSEpsY1hWcGNtVW9KeTR2UTJGdVkyVnNKeWs3WEc1Y2JpOHFLbHh1SUNvZ1FTQmdRMkZ1WTJWc1ZHOXJaVzVnSUdseklHRnVJRzlpYW1WamRDQjBhR0YwSUdOaGJpQmlaU0IxYzJWa0lIUnZJSEpsY1hWbGMzUWdZMkZ1WTJWc2JHRjBhVzl1SUc5bUlHRnVJRzl3WlhKaGRHbHZiaTVjYmlBcVhHNGdLaUJBWTJ4aGMzTmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdWNFpXTjFkRzl5SUZSb1pTQmxlR1ZqZFhSdmNpQm1kVzVqZEdsdmJpNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1EyRnVZMlZzVkc5clpXNG9aWGhsWTNWMGIzSXBJSHRjYmlBZ2FXWWdLSFI1Y0dWdlppQmxlR1ZqZFhSdmNpQWhQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0oyVjRaV04xZEc5eUlHMTFjM1FnWW1VZ1lTQm1kVzVqZEdsdmJpNG5LVHRjYmlBZ2ZWeHVYRzRnSUhaaGNpQnlaWE52YkhabFVISnZiV2x6WlR0Y2JpQWdkR2hwY3k1d2NtOXRhWE5sSUQwZ2JtVjNJRkJ5YjIxcGMyVW9ablZ1WTNScGIyNGdjSEp2YldselpVVjRaV04xZEc5eUtISmxjMjlzZG1VcElIdGNiaUFnSUNCeVpYTnZiSFpsVUhKdmJXbHpaU0E5SUhKbGMyOXNkbVU3WEc0Z0lIMHBPMXh1WEc0Z0lIWmhjaUIwYjJ0bGJpQTlJSFJvYVhNN1hHNGdJR1Y0WldOMWRHOXlLR1oxYm1OMGFXOXVJR05oYm1ObGJDaHRaWE56WVdkbEtTQjdYRzRnSUNBZ2FXWWdLSFJ2YTJWdUxuSmxZWE52YmlrZ2UxeHVJQ0FnSUNBZ0x5OGdRMkZ1WTJWc2JHRjBhVzl1SUdoaGN5QmhiSEpsWVdSNUlHSmxaVzRnY21WeGRXVnpkR1ZrWEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RHOXJaVzR1Y21WaGMyOXVJRDBnYm1WM0lFTmhibU5sYkNodFpYTnpZV2RsS1R0Y2JpQWdJQ0J5WlhOdmJIWmxVSEp2YldselpTaDBiMnRsYmk1eVpXRnpiMjRwTzF4dUlDQjlLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhSEp2ZDNNZ1lTQmdRMkZ1WTJWc1lDQnBaaUJqWVc1alpXeHNZWFJwYjI0Z2FHRnpJR0psWlc0Z2NtVnhkV1Z6ZEdWa0xseHVJQ292WEc1RFlXNWpaV3hVYjJ0bGJpNXdjbTkwYjNSNWNHVXVkR2h5YjNkSlpsSmxjWFZsYzNSbFpDQTlJR1oxYm1OMGFXOXVJSFJvY205M1NXWlNaWEYxWlhOMFpXUW9LU0I3WEc0Z0lHbG1JQ2gwYUdsekxuSmxZWE52YmlrZ2UxeHVJQ0FnSUhSb2NtOTNJSFJvYVhNdWNtVmhjMjl1TzF4dUlDQjlYRzU5TzF4dVhHNHZLaXBjYmlBcUlGSmxkSFZ5Ym5NZ1lXNGdiMkpxWldOMElIUm9ZWFFnWTI5dWRHRnBibk1nWVNCdVpYY2dZRU5oYm1ObGJGUnZhMlZ1WUNCaGJtUWdZU0JtZFc1amRHbHZiaUIwYUdGMExDQjNhR1Z1SUdOaGJHeGxaQ3hjYmlBcUlHTmhibU5sYkhNZ2RHaGxJR0JEWVc1alpXeFViMnRsYm1BdVhHNGdLaTljYmtOaGJtTmxiRlJ2YTJWdUxuTnZkWEpqWlNBOUlHWjFibU4wYVc5dUlITnZkWEpqWlNncElIdGNiaUFnZG1GeUlHTmhibU5sYkR0Y2JpQWdkbUZ5SUhSdmEyVnVJRDBnYm1WM0lFTmhibU5sYkZSdmEyVnVLR1oxYm1OMGFXOXVJR1Y0WldOMWRHOXlLR01wSUh0Y2JpQWdJQ0JqWVc1alpXd2dQU0JqTzF4dUlDQjlLVHRjYmlBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0IwYjJ0bGJqb2dkRzlyWlc0c1hHNGdJQ0FnWTJGdVkyVnNPaUJqWVc1alpXeGNiaUFnZlR0Y2JuMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnUTJGdVkyVnNWRzlyWlc0N1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdhWE5EWVc1alpXd29kbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJQ0VoS0haaGJIVmxJQ1ltSUhaaGJIVmxMbDlmUTBGT1EwVk1YMThwTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTkxZEdsc2N5Y3BPMXh1ZG1GeUlHSjFhV3hrVlZKTUlEMGdjbVZ4ZFdseVpTZ25MaTR2YUdWc2NHVnljeTlpZFdsc1pGVlNUQ2NwTzF4dWRtRnlJRWx1ZEdWeVkyVndkRzl5VFdGdVlXZGxjaUE5SUhKbGNYVnBjbVVvSnk0dlNXNTBaWEpqWlhCMGIzSk5ZVzVoWjJWeUp5azdYRzUyWVhJZ1pHbHpjR0YwWTJoU1pYRjFaWE4wSUQwZ2NtVnhkV2x5WlNnbkxpOWthWE53WVhSamFGSmxjWFZsYzNRbktUdGNiblpoY2lCdFpYSm5aVU52Ym1acFp5QTlJSEpsY1hWcGNtVW9KeTR2YldWeVoyVkRiMjVtYVdjbktUdGNibHh1THlvcVhHNGdLaUJEY21WaGRHVWdZU0J1WlhjZ2FXNXpkR0Z1WTJVZ2IyWWdRWGhwYjNOY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYVc1emRHRnVZMlZEYjI1bWFXY2dWR2hsSUdSbFptRjFiSFFnWTI5dVptbG5JR1p2Y2lCMGFHVWdhVzV6ZEdGdVkyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1FYaHBiM01vYVc1emRHRnVZMlZEYjI1bWFXY3BJSHRjYmlBZ2RHaHBjeTVrWldaaGRXeDBjeUE5SUdsdWMzUmhibU5sUTI5dVptbG5PMXh1SUNCMGFHbHpMbWx1ZEdWeVkyVndkRzl5Y3lBOUlIdGNiaUFnSUNCeVpYRjFaWE4wT2lCdVpYY2dTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlLQ2tzWEc0Z0lDQWdjbVZ6Y0c5dWMyVTZJRzVsZHlCSmJuUmxjbU5sY0hSdmNrMWhibUZuWlhJb0tWeHVJQ0I5TzF4dWZWeHVYRzR2S2lwY2JpQXFJRVJwYzNCaGRHTm9JR0VnY21WeGRXVnpkRnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmpiMjVtYVdjZ1ZHaGxJR052Ym1acFp5QnpjR1ZqYVdacFl5Qm1iM0lnZEdocGN5QnlaWEYxWlhOMElDaHRaWEpuWldRZ2QybDBhQ0IwYUdsekxtUmxabUYxYkhSektWeHVJQ292WEc1QmVHbHZjeTV3Y205MGIzUjVjR1V1Y21WeGRXVnpkQ0E5SUdaMWJtTjBhVzl1SUhKbGNYVmxjM1FvWTI5dVptbG5LU0I3WEc0Z0lDOHFaWE5zYVc1MElHNXZMWEJoY21GdExYSmxZWE56YVdkdU9qQXFMMXh1SUNBdkx5QkJiR3h2ZHlCbWIzSWdZWGhwYjNNb0oyVjRZVzF3YkdVdmRYSnNKMXNzSUdOdmJtWnBaMTBwSUdFZ2JHRWdabVYwWTJnZ1FWQkpYRzRnSUdsbUlDaDBlWEJsYjJZZ1kyOXVabWxuSUQwOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lHTnZibVpwWnlBOUlHRnlaM1Z0Wlc1MGMxc3hYU0I4ZkNCN2ZUdGNiaUFnSUNCamIyNW1hV2N1ZFhKc0lEMGdZWEpuZFcxbGJuUnpXekJkTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdOdmJtWnBaeUE5SUdOdmJtWnBaeUI4ZkNCN2ZUdGNiaUFnZlZ4dVhHNGdJR052Ym1acFp5QTlJRzFsY21kbFEyOXVabWxuS0hSb2FYTXVaR1ZtWVhWc2RITXNJR052Ym1acFp5azdYRzVjYmlBZ0x5OGdVMlYwSUdOdmJtWnBaeTV0WlhSb2IyUmNiaUFnYVdZZ0tHTnZibVpwWnk1dFpYUm9iMlFwSUh0Y2JpQWdJQ0JqYjI1bWFXY3ViV1YwYUc5a0lEMGdZMjl1Wm1sbkxtMWxkR2h2WkM1MGIweHZkMlZ5UTJGelpTZ3BPMXh1SUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11WkdWbVlYVnNkSE11YldWMGFHOWtLU0I3WEc0Z0lDQWdZMjl1Wm1sbkxtMWxkR2h2WkNBOUlIUm9hWE11WkdWbVlYVnNkSE11YldWMGFHOWtMblJ2VEc5M1pYSkRZWE5sS0NrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1kyOXVabWxuTG0xbGRHaHZaQ0E5SUNkblpYUW5PMXh1SUNCOVhHNWNiaUFnTHk4Z1NHOXZheUIxY0NCcGJuUmxjbU5sY0hSdmNuTWdiV2xrWkd4bGQyRnlaVnh1SUNCMllYSWdZMmhoYVc0Z1BTQmJaR2x6Y0dGMFkyaFNaWEYxWlhOMExDQjFibVJsWm1sdVpXUmRPMXh1SUNCMllYSWdjSEp2YldselpTQTlJRkJ5YjIxcGMyVXVjbVZ6YjJ4MlpTaGpiMjVtYVdjcE8xeHVYRzRnSUhSb2FYTXVhVzUwWlhKalpYQjBiM0p6TG5KbGNYVmxjM1F1Wm05eVJXRmphQ2htZFc1amRHbHZiaUIxYm5Ob2FXWjBVbVZ4ZFdWemRFbHVkR1Z5WTJWd2RHOXljeWhwYm5SbGNtTmxjSFJ2Y2lrZ2UxeHVJQ0FnSUdOb1lXbHVMblZ1YzJocFpuUW9hVzUwWlhKalpYQjBiM0l1Wm5Wc1ptbHNiR1ZrTENCcGJuUmxjbU5sY0hSdmNpNXlaV3BsWTNSbFpDazdYRzRnSUgwcE8xeHVYRzRnSUhSb2FYTXVhVzUwWlhKalpYQjBiM0p6TG5KbGMzQnZibk5sTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnY0hWemFGSmxjM0J2Ym5ObFNXNTBaWEpqWlhCMGIzSnpLR2x1ZEdWeVkyVndkRzl5S1NCN1hHNGdJQ0FnWTJoaGFXNHVjSFZ6YUNocGJuUmxjbU5sY0hSdmNpNW1kV3htYVd4c1pXUXNJR2x1ZEdWeVkyVndkRzl5TG5KbGFtVmpkR1ZrS1R0Y2JpQWdmU2s3WEc1Y2JpQWdkMmhwYkdVZ0tHTm9ZV2x1TG14bGJtZDBhQ2tnZTF4dUlDQWdJSEJ5YjIxcGMyVWdQU0J3Y205dGFYTmxMblJvWlc0b1kyaGhhVzR1YzJocFpuUW9LU3dnWTJoaGFXNHVjMmhwWm5Rb0tTazdYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdjSEp2YldselpUdGNibjA3WEc1Y2JrRjRhVzl6TG5CeWIzUnZkSGx3WlM1blpYUlZjbWtnUFNCbWRXNWpkR2x2YmlCblpYUlZjbWtvWTI5dVptbG5LU0I3WEc0Z0lHTnZibVpwWnlBOUlHMWxjbWRsUTI5dVptbG5LSFJvYVhNdVpHVm1ZWFZzZEhNc0lHTnZibVpwWnlrN1hHNGdJSEpsZEhWeWJpQmlkV2xzWkZWU1RDaGpiMjVtYVdjdWRYSnNMQ0JqYjI1bWFXY3VjR0Z5WVcxekxDQmpiMjVtYVdjdWNHRnlZVzF6VTJWeWFXRnNhWHBsY2lrdWNtVndiR0ZqWlNndlhseGNQeThzSUNjbktUdGNibjA3WEc1Y2JpOHZJRkJ5YjNacFpHVWdZV3hwWVhObGN5Qm1iM0lnYzNWd2NHOXlkR1ZrSUhKbGNYVmxjM1FnYldWMGFHOWtjMXh1ZFhScGJITXVabTl5UldGamFDaGJKMlJsYkdWMFpTY3NJQ2RuWlhRbkxDQW5hR1ZoWkNjc0lDZHZjSFJwYjI1ekoxMHNJR1oxYm1OMGFXOXVJR1p2Y2tWaFkyaE5aWFJvYjJST2IwUmhkR0VvYldWMGFHOWtLU0I3WEc0Z0lDOHFaWE5zYVc1MElHWjFibU10Ym1GdFpYTTZNQ292WEc0Z0lFRjRhVzl6TG5CeWIzUnZkSGx3WlZ0dFpYUm9iMlJkSUQwZ1puVnVZM1JwYjI0b2RYSnNMQ0JqYjI1bWFXY3BJSHRjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTV5WlhGMVpYTjBLRzFsY21kbFEyOXVabWxuS0dOdmJtWnBaeUI4ZkNCN2ZTd2dlMXh1SUNBZ0lDQWdiV1YwYUc5a09pQnRaWFJvYjJRc1hHNGdJQ0FnSUNCMWNtdzZJSFZ5YkN4Y2JpQWdJQ0FnSUdSaGRHRTZJQ2hqYjI1bWFXY2dmSHdnZTMwcExtUmhkR0ZjYmlBZ0lDQjlLU2s3WEc0Z0lIMDdYRzU5S1R0Y2JseHVkWFJwYkhNdVptOXlSV0ZqYUNoYkozQnZjM1FuTENBbmNIVjBKeXdnSjNCaGRHTm9KMTBzSUdaMWJtTjBhVzl1SUdadmNrVmhZMmhOWlhSb2IyUlhhWFJvUkdGMFlTaHRaWFJvYjJRcElIdGNiaUFnTHlwbGMyeHBiblFnWm5WdVl5MXVZVzFsY3pvd0tpOWNiaUFnUVhocGIzTXVjSEp2ZEc5MGVYQmxXMjFsZEdodlpGMGdQU0JtZFc1amRHbHZiaWgxY213c0lHUmhkR0VzSUdOdmJtWnBaeWtnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG5KbGNYVmxjM1FvYldWeVoyVkRiMjVtYVdjb1kyOXVabWxuSUh4OElIdDlMQ0I3WEc0Z0lDQWdJQ0J0WlhSb2IyUTZJRzFsZEdodlpDeGNiaUFnSUNBZ0lIVnliRG9nZFhKc0xGeHVJQ0FnSUNBZ1pHRjBZVG9nWkdGMFlWeHVJQ0FnSUgwcEtUdGNiaUFnZlR0Y2JuMHBPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUVGNGFXOXpPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDNWMGFXeHpKeWs3WEc1Y2JtWjFibU4wYVc5dUlFbHVkR1Z5WTJWd2RHOXlUV0Z1WVdkbGNpZ3BJSHRjYmlBZ2RHaHBjeTVvWVc1a2JHVnljeUE5SUZ0ZE8xeHVmVnh1WEc0dktpcGNiaUFxSUVGa1pDQmhJRzVsZHlCcGJuUmxjbU5sY0hSdmNpQjBieUIwYUdVZ2MzUmhZMnRjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JtZFd4bWFXeHNaV1FnVkdobElHWjFibU4wYVc5dUlIUnZJR2hoYm1Sc1pTQmdkR2hsYm1BZ1ptOXlJR0VnWUZCeWIyMXBjMlZnWEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQnlaV3BsWTNSbFpDQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z2FHRnVaR3hsSUdCeVpXcGxZM1JnSUdadmNpQmhJR0JRY205dGFYTmxZRnh1SUNwY2JpQXFJRUJ5WlhSMWNtNGdlMDUxYldKbGNuMGdRVzRnU1VRZ2RYTmxaQ0IwYnlCeVpXMXZkbVVnYVc1MFpYSmpaWEIwYjNJZ2JHRjBaWEpjYmlBcUwxeHVTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlMbkJ5YjNSdmRIbHdaUzUxYzJVZ1BTQm1kVzVqZEdsdmJpQjFjMlVvWm5Wc1ptbHNiR1ZrTENCeVpXcGxZM1JsWkNrZ2UxeHVJQ0IwYUdsekxtaGhibVJzWlhKekxuQjFjMmdvZTF4dUlDQWdJR1oxYkdacGJHeGxaRG9nWm5Wc1ptbHNiR1ZrTEZ4dUlDQWdJSEpsYW1WamRHVmtPaUJ5WldwbFkzUmxaRnh1SUNCOUtUdGNiaUFnY21WMGRYSnVJSFJvYVhNdWFHRnVaR3hsY25NdWJHVnVaM1JvSUMwZ01UdGNibjA3WEc1Y2JpOHFLbHh1SUNvZ1VtVnRiM1psSUdGdUlHbHVkR1Z5WTJWd2RHOXlJR1p5YjIwZ2RHaGxJSE4wWVdOclhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdsa0lGUm9aU0JKUkNCMGFHRjBJSGRoY3lCeVpYUjFjbTVsWkNCaWVTQmdkWE5sWUZ4dUlDb3ZYRzVKYm5SbGNtTmxjSFJ2Y2sxaGJtRm5aWEl1Y0hKdmRHOTBlWEJsTG1WcVpXTjBJRDBnWm5WdVkzUnBiMjRnWldwbFkzUW9hV1FwSUh0Y2JpQWdhV1lnS0hSb2FYTXVhR0Z1Wkd4bGNuTmJhV1JkS1NCN1hHNGdJQ0FnZEdocGN5NW9ZVzVrYkdWeWMxdHBaRjBnUFNCdWRXeHNPMXh1SUNCOVhHNTlPMXh1WEc0dktpcGNiaUFxSUVsMFpYSmhkR1VnYjNabGNpQmhiR3dnZEdobElISmxaMmx6ZEdWeVpXUWdhVzUwWlhKalpYQjBiM0p6WEc0Z0tseHVJQ29nVkdocGN5QnRaWFJvYjJRZ2FYTWdjR0Z5ZEdsamRXeGhjbXg1SUhWelpXWjFiQ0JtYjNJZ2MydHBjSEJwYm1jZ2IzWmxjaUJoYm5sY2JpQXFJR2x1ZEdWeVkyVndkRzl5Y3lCMGFHRjBJRzFoZVNCb1lYWmxJR0psWTI5dFpTQmdiblZzYkdBZ1kyRnNiR2x1WnlCZ1pXcGxZM1JnTGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdadUlGUm9aU0JtZFc1amRHbHZiaUIwYnlCallXeHNJR1p2Y2lCbFlXTm9JR2x1ZEdWeVkyVndkRzl5WEc0Z0tpOWNia2x1ZEdWeVkyVndkRzl5VFdGdVlXZGxjaTV3Y205MGIzUjVjR1V1Wm05eVJXRmphQ0E5SUdaMWJtTjBhVzl1SUdadmNrVmhZMmdvWm00cElIdGNiaUFnZFhScGJITXVabTl5UldGamFDaDBhR2x6TG1oaGJtUnNaWEp6TENCbWRXNWpkR2x2YmlCbWIzSkZZV05vU0dGdVpHeGxjaWhvS1NCN1hHNGdJQ0FnYVdZZ0tHZ2dJVDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJR1p1S0dncE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRWx1ZEdWeVkyVndkRzl5VFdGdVlXZGxjanRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR2x6UVdKemIyeDFkR1ZWVWt3Z1BTQnlaWEYxYVhKbEtDY3VMaTlvWld4d1pYSnpMMmx6UVdKemIyeDFkR1ZWVWt3bktUdGNiblpoY2lCamIyMWlhVzVsVlZKTWN5QTlJSEpsY1hWcGNtVW9KeTR1TDJobGJIQmxjbk12WTI5dFltbHVaVlZTVEhNbktUdGNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0VnYm1WM0lGVlNUQ0JpZVNCamIyMWlhVzVwYm1jZ2RHaGxJR0poYzJWVlVrd2dkMmwwYUNCMGFHVWdjbVZ4ZFdWemRHVmtWVkpNTEZ4dUlDb2diMjVzZVNCM2FHVnVJSFJvWlNCeVpYRjFaWE4wWldSVlVrd2dhWE1nYm05MElHRnNjbVZoWkhrZ1lXNGdZV0p6YjJ4MWRHVWdWVkpNTGx4dUlDb2dTV1lnZEdobElISmxjWFZsYzNSVlVrd2dhWE1nWVdKemIyeDFkR1VzSUhSb2FYTWdablZ1WTNScGIyNGdjbVYwZFhKdWN5QjBhR1VnY21WeGRXVnpkR1ZrVlZKTUlIVnVkRzkxWTJobFpDNWNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UzTjBjbWx1WjMwZ1ltRnpaVlZTVENCVWFHVWdZbUZ6WlNCVlVreGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0J5WlhGMVpYTjBaV1JWVWt3Z1FXSnpiMngxZEdVZ2IzSWdjbVZzWVhScGRtVWdWVkpNSUhSdklHTnZiV0pwYm1WY2JpQXFJRUJ5WlhSMWNtNXpJSHR6ZEhKcGJtZDlJRlJvWlNCamIyMWlhVzVsWkNCbWRXeHNJSEJoZEdoY2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJpZFdsc1pFWjFiR3hRWVhSb0tHSmhjMlZWVWt3c0lISmxjWFZsYzNSbFpGVlNUQ2tnZTF4dUlDQnBaaUFvWW1GelpWVlNUQ0FtSmlBaGFYTkJZbk52YkhWMFpWVlNUQ2h5WlhGMVpYTjBaV1JWVWt3cEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdOdmJXSnBibVZWVWt4ektHSmhjMlZWVWt3c0lISmxjWFZsYzNSbFpGVlNUQ2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJSEpsY1hWbGMzUmxaRlZTVER0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmxibWhoYm1ObFJYSnliM0lnUFNCeVpYRjFhWEpsS0NjdUwyVnVhR0Z1WTJWRmNuSnZjaWNwTzF4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlNCaGJpQkZjbkp2Y2lCM2FYUm9JSFJvWlNCemNHVmphV1pwWldRZ2JXVnpjMkZuWlN3Z1kyOXVabWxuTENCbGNuSnZjaUJqYjJSbExDQnlaWEYxWlhOMElHRnVaQ0J5WlhOd2IyNXpaUzVjYmlBcVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdiV1Z6YzJGblpTQlVhR1VnWlhKeWIzSWdiV1Z6YzJGblpTNWNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JqYjI1bWFXY2dWR2hsSUdOdmJtWnBaeTVjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCYlkyOWtaVjBnVkdobElHVnljbTl5SUdOdlpHVWdLR1p2Y2lCbGVHRnRjR3hsTENBblJVTlBUazVCUWs5U1ZFVkVKeWt1WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1czSmxjWFZsYzNSZElGUm9aU0J5WlhGMVpYTjBMbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUZ0eVpYTndiMjV6WlYwZ1ZHaGxJSEpsYzNCdmJuTmxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwVnljbTl5ZlNCVWFHVWdZM0psWVhSbFpDQmxjbkp2Y2k1Y2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJqY21WaGRHVkZjbkp2Y2lodFpYTnpZV2RsTENCamIyNW1hV2NzSUdOdlpHVXNJSEpsY1hWbGMzUXNJSEpsYzNCdmJuTmxLU0I3WEc0Z0lIWmhjaUJsY25KdmNpQTlJRzVsZHlCRmNuSnZjaWh0WlhOellXZGxLVHRjYmlBZ2NtVjBkWEp1SUdWdWFHRnVZMlZGY25KdmNpaGxjbkp2Y2l3Z1kyOXVabWxuTENCamIyUmxMQ0J5WlhGMVpYTjBMQ0J5WlhOd2IyNXpaU2s3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzUyWVhJZ2RISmhibk5tYjNKdFJHRjBZU0E5SUhKbGNYVnBjbVVvSnk0dmRISmhibk5tYjNKdFJHRjBZU2NwTzF4dWRtRnlJR2x6UTJGdVkyVnNJRDBnY21WeGRXbHlaU2duTGk0dlkyRnVZMlZzTDJselEyRnVZMlZzSnlrN1hHNTJZWElnWkdWbVlYVnNkSE1nUFNCeVpYRjFhWEpsS0NjdUxpOWtaV1poZFd4MGN5Y3BPMXh1WEc0dktpcGNiaUFxSUZSb2NtOTNjeUJoSUdCRFlXNWpaV3hnSUdsbUlHTmhibU5sYkd4aGRHbHZiaUJvWVhNZ1ltVmxiaUJ5WlhGMVpYTjBaV1F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJSFJvY205M1NXWkRZVzVqWld4c1lYUnBiMjVTWlhGMVpYTjBaV1FvWTI5dVptbG5LU0I3WEc0Z0lHbG1JQ2hqYjI1bWFXY3VZMkZ1WTJWc1ZHOXJaVzRwSUh0Y2JpQWdJQ0JqYjI1bWFXY3VZMkZ1WTJWc1ZHOXJaVzR1ZEdoeWIzZEpabEpsY1hWbGMzUmxaQ2dwTzF4dUlDQjlYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHbHpjR0YwWTJnZ1lTQnlaWEYxWlhOMElIUnZJSFJvWlNCelpYSjJaWElnZFhOcGJtY2dkR2hsSUdOdmJtWnBaM1Z5WldRZ1lXUmhjSFJsY2k1Y2JpQXFYRzRnS2lCQWNHRnlZVzBnZTI5aWFtVmpkSDBnWTI5dVptbG5JRlJvWlNCamIyNW1hV2NnZEdoaGRDQnBjeUIwYnlCaVpTQjFjMlZrSUdadmNpQjBhR1VnY21WeGRXVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UxQnliMjFwYzJWOUlGUm9aU0JRY205dGFYTmxJSFJ2SUdKbElHWjFiR1pwYkd4bFpGeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdScGMzQmhkR05vVW1WeGRXVnpkQ2hqYjI1bWFXY3BJSHRjYmlBZ2RHaHliM2RKWmtOaGJtTmxiR3hoZEdsdmJsSmxjWFZsYzNSbFpDaGpiMjVtYVdjcE8xeHVYRzRnSUM4dklFVnVjM1Z5WlNCb1pXRmtaWEp6SUdWNGFYTjBYRzRnSUdOdmJtWnBaeTVvWldGa1pYSnpJRDBnWTI5dVptbG5MbWhsWVdSbGNuTWdmSHdnZTMwN1hHNWNiaUFnTHk4Z1ZISmhibk5tYjNKdElISmxjWFZsYzNRZ1pHRjBZVnh1SUNCamIyNW1hV2N1WkdGMFlTQTlJSFJ5WVc1elptOXliVVJoZEdFb1hHNGdJQ0FnWTI5dVptbG5MbVJoZEdFc1hHNGdJQ0FnWTI5dVptbG5MbWhsWVdSbGNuTXNYRzRnSUNBZ1kyOXVabWxuTG5SeVlXNXpabTl5YlZKbGNYVmxjM1JjYmlBZ0tUdGNibHh1SUNBdkx5QkdiR0YwZEdWdUlHaGxZV1JsY25OY2JpQWdZMjl1Wm1sbkxtaGxZV1JsY25NZ1BTQjFkR2xzY3k1dFpYSm5aU2hjYmlBZ0lDQmpiMjVtYVdjdWFHVmhaR1Z5Y3k1amIyMXRiMjRnZkh3Z2UzMHNYRzRnSUNBZ1kyOXVabWxuTG1obFlXUmxjbk5iWTI5dVptbG5MbTFsZEdodlpGMGdmSHdnZTMwc1hHNGdJQ0FnWTI5dVptbG5MbWhsWVdSbGNuTmNiaUFnS1R0Y2JseHVJQ0IxZEdsc2N5NW1iM0pGWVdOb0tGeHVJQ0FnSUZzblpHVnNaWFJsSnl3Z0oyZGxkQ2NzSUNkb1pXRmtKeXdnSjNCdmMzUW5MQ0FuY0hWMEp5d2dKM0JoZEdOb0p5d2dKMk52YlcxdmJpZGRMRnh1SUNBZ0lHWjFibU4wYVc5dUlHTnNaV0Z1U0dWaFpHVnlRMjl1Wm1sbktHMWxkR2h2WkNrZ2UxeHVJQ0FnSUNBZ1pHVnNaWFJsSUdOdmJtWnBaeTVvWldGa1pYSnpXMjFsZEdodlpGMDdYRzRnSUNBZ2ZWeHVJQ0FwTzF4dVhHNGdJSFpoY2lCaFpHRndkR1Z5SUQwZ1kyOXVabWxuTG1Ga1lYQjBaWElnZkh3Z1pHVm1ZWFZzZEhNdVlXUmhjSFJsY2p0Y2JseHVJQ0J5WlhSMWNtNGdZV1JoY0hSbGNpaGpiMjVtYVdjcExuUm9aVzRvWm5WdVkzUnBiMjRnYjI1QlpHRndkR1Z5VW1WemIyeDFkR2x2YmloeVpYTndiMjV6WlNrZ2UxeHVJQ0FnSUhSb2NtOTNTV1pEWVc1alpXeHNZWFJwYjI1U1pYRjFaWE4wWldRb1kyOXVabWxuS1R0Y2JseHVJQ0FnSUM4dklGUnlZVzV6Wm05eWJTQnlaWE53YjI1elpTQmtZWFJoWEc0Z0lDQWdjbVZ6Y0c5dWMyVXVaR0YwWVNBOUlIUnlZVzV6Wm05eWJVUmhkR0VvWEc0Z0lDQWdJQ0J5WlhOd2IyNXpaUzVrWVhSaExGeHVJQ0FnSUNBZ2NtVnpjRzl1YzJVdWFHVmhaR1Z5Y3l4Y2JpQWdJQ0FnSUdOdmJtWnBaeTUwY21GdWMyWnZjbTFTWlhOd2IyNXpaVnh1SUNBZ0lDazdYRzVjYmlBZ0lDQnlaWFIxY200Z2NtVnpjRzl1YzJVN1hHNGdJSDBzSUdaMWJtTjBhVzl1SUc5dVFXUmhjSFJsY2xKbGFtVmpkR2x2YmloeVpXRnpiMjRwSUh0Y2JpQWdJQ0JwWmlBb0lXbHpRMkZ1WTJWc0tISmxZWE52YmlrcElIdGNiaUFnSUNBZ0lIUm9jbTkzU1daRFlXNWpaV3hzWVhScGIyNVNaWEYxWlhOMFpXUW9ZMjl1Wm1sbktUdGNibHh1SUNBZ0lDQWdMeThnVkhKaGJuTm1iM0p0SUhKbGMzQnZibk5sSUdSaGRHRmNiaUFnSUNBZ0lHbG1JQ2h5WldGemIyNGdKaVlnY21WaGMyOXVMbkpsYzNCdmJuTmxLU0I3WEc0Z0lDQWdJQ0FnSUhKbFlYTnZiaTV5WlhOd2IyNXpaUzVrWVhSaElEMGdkSEpoYm5ObWIzSnRSR0YwWVNoY2JpQWdJQ0FnSUNBZ0lDQnlaV0Z6YjI0dWNtVnpjRzl1YzJVdVpHRjBZU3hjYmlBZ0lDQWdJQ0FnSUNCeVpXRnpiMjR1Y21WemNHOXVjMlV1YUdWaFpHVnljeXhjYmlBZ0lDQWdJQ0FnSUNCamIyNW1hV2N1ZEhKaGJuTm1iM0p0VW1WemNHOXVjMlZjYmlBZ0lDQWdJQ0FnS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdVSEp2YldselpTNXlaV3BsWTNRb2NtVmhjMjl1S1R0Y2JpQWdmU2s3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzR2S2lwY2JpQXFJRlZ3WkdGMFpTQmhiaUJGY25KdmNpQjNhWFJvSUhSb1pTQnpjR1ZqYVdacFpXUWdZMjl1Wm1sbkxDQmxjbkp2Y2lCamIyUmxMQ0JoYm1RZ2NtVnpjRzl1YzJVdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0RmNuSnZjbjBnWlhKeWIzSWdWR2hsSUdWeWNtOXlJSFJ2SUhWd1pHRjBaUzVjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamIyNW1hV2NnVkdobElHTnZibVpwWnk1Y2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQmJZMjlrWlYwZ1ZHaGxJR1Z5Y205eUlHTnZaR1VnS0dadmNpQmxlR0Z0Y0d4bExDQW5SVU5QVGs1QlFrOVNWRVZFSnlrdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM0psY1hWbGMzUmRJRlJvWlNCeVpYRjFaWE4wTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlGdHlaWE53YjI1elpWMGdWR2hsSUhKbGMzQnZibk5sTGx4dUlDb2dRSEpsZEhWeWJuTWdlMFZ5Y205eWZTQlVhR1VnWlhKeWIzSXVYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z1pXNW9ZVzVqWlVWeWNtOXlLR1Z5Y205eUxDQmpiMjVtYVdjc0lHTnZaR1VzSUhKbGNYVmxjM1FzSUhKbGMzQnZibk5sS1NCN1hHNGdJR1Z5Y205eUxtTnZibVpwWnlBOUlHTnZibVpwWnp0Y2JpQWdhV1lnS0dOdlpHVXBJSHRjYmlBZ0lDQmxjbkp2Y2k1amIyUmxJRDBnWTI5a1pUdGNiaUFnZlZ4dVhHNGdJR1Z5Y205eUxuSmxjWFZsYzNRZ1BTQnlaWEYxWlhOME8xeHVJQ0JsY25KdmNpNXlaWE53YjI1elpTQTlJSEpsYzNCdmJuTmxPMXh1SUNCbGNuSnZjaTVwYzBGNGFXOXpSWEp5YjNJZ1BTQjBjblZsTzF4dVhHNGdJR1Z5Y205eUxuUnZTbE5QVGlBOUlHWjFibU4wYVc5dUlIUnZTbE5QVGlncElIdGNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnTHk4Z1UzUmhibVJoY21SY2JpQWdJQ0FnSUcxbGMzTmhaMlU2SUhSb2FYTXViV1Z6YzJGblpTeGNiaUFnSUNBZ0lHNWhiV1U2SUhSb2FYTXVibUZ0WlN4Y2JpQWdJQ0FnSUM4dklFMXBZM0p2YzI5bWRGeHVJQ0FnSUNBZ1pHVnpZM0pwY0hScGIyNDZJSFJvYVhNdVpHVnpZM0pwY0hScGIyNHNYRzRnSUNBZ0lDQnVkVzFpWlhJNklIUm9hWE11Ym5WdFltVnlMRnh1SUNBZ0lDQWdMeThnVFc5NmFXeHNZVnh1SUNBZ0lDQWdabWxzWlU1aGJXVTZJSFJvYVhNdVptbHNaVTVoYldVc1hHNGdJQ0FnSUNCc2FXNWxUblZ0WW1WeU9pQjBhR2x6TG14cGJtVk9kVzFpWlhJc1hHNGdJQ0FnSUNCamIyeDFiVzVPZFcxaVpYSTZJSFJvYVhNdVkyOXNkVzF1VG5WdFltVnlMRnh1SUNBZ0lDQWdjM1JoWTJzNklIUm9hWE11YzNSaFkyc3NYRzRnSUNBZ0lDQXZMeUJCZUdsdmMxeHVJQ0FnSUNBZ1kyOXVabWxuT2lCMGFHbHpMbU52Ym1acFp5eGNiaUFnSUNBZ0lHTnZaR1U2SUhSb2FYTXVZMjlrWlZ4dUlDQWdJSDA3WEc0Z0lIMDdYRzRnSUhKbGRIVnliaUJsY25KdmNqdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR1TDNWMGFXeHpKeWs3WEc1Y2JpOHFLbHh1SUNvZ1EyOXVabWxuTFhOd1pXTnBabWxqSUcxbGNtZGxMV1oxYm1OMGFXOXVJSGRvYVdOb0lHTnlaV0YwWlhNZ1lTQnVaWGNnWTI5dVptbG5MVzlpYW1WamRGeHVJQ29nWW5rZ2JXVnlaMmx1WnlCMGQyOGdZMjl1Wm1sbmRYSmhkR2x2YmlCdlltcGxZM1J6SUhSdloyVjBhR1Z5TGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JqYjI1bWFXY3hYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWTI5dVptbG5NbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1RtVjNJRzlpYW1WamRDQnlaWE4xYkhScGJtY2dabkp2YlNCdFpYSm5hVzVuSUdOdmJtWnBaeklnZEc4Z1kyOXVabWxuTVZ4dUlDb3ZYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJRzFsY21kbFEyOXVabWxuS0dOdmJtWnBaekVzSUdOdmJtWnBaeklwSUh0Y2JpQWdMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRibVY0ZEMxc2FXNWxJRzV2TFhCaGNtRnRMWEpsWVhOemFXZHVYRzRnSUdOdmJtWnBaeklnUFNCamIyNW1hV2N5SUh4OElIdDlPMXh1SUNCMllYSWdZMjl1Wm1sbklEMGdlMzA3WEc1Y2JpQWdkbUZ5SUhaaGJIVmxSbkp2YlVOdmJtWnBaekpMWlhseklEMGdXeWQxY213bkxDQW5iV1YwYUc5a0p5d2dKMlJoZEdFblhUdGNiaUFnZG1GeUlHMWxjbWRsUkdWbGNGQnliM0JsY25ScFpYTkxaWGx6SUQwZ1d5ZG9aV0ZrWlhKekp5d2dKMkYxZEdnbkxDQW5jSEp2ZUhrbkxDQW5jR0Z5WVcxekoxMDdYRzRnSUhaaGNpQmtaV1poZFd4MFZHOURiMjVtYVdjeVMyVjVjeUE5SUZ0Y2JpQWdJQ0FuWW1GelpWVlNUQ2NzSUNkMGNtRnVjMlp2Y20xU1pYRjFaWE4wSnl3Z0ozUnlZVzV6Wm05eWJWSmxjM0J2Ym5ObEp5d2dKM0JoY21GdGMxTmxjbWxoYkdsNlpYSW5MRnh1SUNBZ0lDZDBhVzFsYjNWMEp5d2dKM1JwYldWdmRYUk5aWE56WVdkbEp5d2dKM2RwZEdoRGNtVmtaVzUwYVdGc2N5Y3NJQ2RoWkdGd2RHVnlKeXdnSjNKbGMzQnZibk5sVkhsd1pTY3NJQ2Q0YzNKbVEyOXZhMmxsVG1GdFpTY3NYRzRnSUNBZ0ozaHpjbVpJWldGa1pYSk9ZVzFsSnl3Z0oyOXVWWEJzYjJGa1VISnZaM0psYzNNbkxDQW5iMjVFYjNkdWJHOWhaRkJ5YjJkeVpYTnpKeXdnSjJSbFkyOXRjSEpsYzNNbkxGeHVJQ0FnSUNkdFlYaERiMjUwWlc1MFRHVnVaM1JvSnl3Z0oyMWhlRUp2WkhsTVpXNW5kR2duTENBbmJXRjRVbVZrYVhKbFkzUnpKeXdnSjNSeVlXNXpjRzl5ZENjc0lDZG9kSFJ3UVdkbGJuUW5MRnh1SUNBZ0lDZG9kSFJ3YzBGblpXNTBKeXdnSjJOaGJtTmxiRlJ2YTJWdUp5d2dKM052WTJ0bGRGQmhkR2duTENBbmNtVnpjRzl1YzJWRmJtTnZaR2x1WnlkY2JpQWdYVHRjYmlBZ2RtRnlJR1JwY21WamRFMWxjbWRsUzJWNWN5QTlJRnNuZG1Gc2FXUmhkR1ZUZEdGMGRYTW5YVHRjYmx4dUlDQm1kVzVqZEdsdmJpQm5aWFJOWlhKblpXUldZV3gxWlNoMFlYSm5aWFFzSUhOdmRYSmpaU2tnZTF4dUlDQWdJR2xtSUNoMWRHbHNjeTVwYzFCc1lXbHVUMkpxWldOMEtIUmhjbWRsZENrZ0ppWWdkWFJwYkhNdWFYTlFiR0ZwYms5aWFtVmpkQ2h6YjNWeVkyVXBLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkWFJwYkhNdWJXVnlaMlVvZEdGeVoyVjBMQ0J6YjNWeVkyVXBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9kWFJwYkhNdWFYTlFiR0ZwYms5aWFtVmpkQ2h6YjNWeVkyVXBLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkWFJwYkhNdWJXVnlaMlVvZTMwc0lITnZkWEpqWlNrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNoMWRHbHNjeTVwYzBGeWNtRjVLSE52ZFhKalpTa3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnpiM1Z5WTJVdWMyeHBZMlVvS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlITnZkWEpqWlR0Y2JpQWdmVnh1WEc0Z0lHWjFibU4wYVc5dUlHMWxjbWRsUkdWbGNGQnliM0JsY25ScFpYTW9jSEp2Y0NrZ2UxeHVJQ0FnSUdsbUlDZ2hkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9ZMjl1Wm1sbk1sdHdjbTl3WFNrcElIdGNiaUFnSUNBZ0lHTnZibVpwWjF0d2NtOXdYU0E5SUdkbGRFMWxjbWRsWkZaaGJIVmxLR052Ym1acFp6RmJjSEp2Y0Ywc0lHTnZibVpwWnpKYmNISnZjRjBwTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvSVhWMGFXeHpMbWx6Vlc1a1pXWnBibVZrS0dOdmJtWnBaekZiY0hKdmNGMHBLU0I3WEc0Z0lDQWdJQ0JqYjI1bWFXZGJjSEp2Y0YwZ1BTQm5aWFJOWlhKblpXUldZV3gxWlNoMWJtUmxabWx1WldRc0lHTnZibVpwWnpGYmNISnZjRjBwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29kbUZzZFdWR2NtOXRRMjl1Wm1sbk1rdGxlWE1zSUdaMWJtTjBhVzl1SUhaaGJIVmxSbkp2YlVOdmJtWnBaeklvY0hKdmNDa2dlMXh1SUNBZ0lHbG1JQ2doZFhScGJITXVhWE5WYm1SbFptbHVaV1FvWTI5dVptbG5NbHR3Y205d1hTa3BJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0hWdVpHVm1hVzVsWkN3Z1kyOXVabWxuTWx0d2NtOXdYU2s3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibHh1SUNCMWRHbHNjeTVtYjNKRllXTm9LRzFsY21kbFJHVmxjRkJ5YjNCbGNuUnBaWE5MWlhsekxDQnRaWEpuWlVSbFpYQlFjbTl3WlhKMGFXVnpLVHRjYmx4dUlDQjFkR2xzY3k1bWIzSkZZV05vS0dSbFptRjFiSFJVYjBOdmJtWnBaekpMWlhsekxDQm1kVzVqZEdsdmJpQmtaV1poZFd4MFZHOURiMjVtYVdjeUtIQnliM0FwSUh0Y2JpQWdJQ0JwWmlBb0lYVjBhV3h6TG1selZXNWtaV1pwYm1Wa0tHTnZibVpwWnpKYmNISnZjRjBwS1NCN1hHNGdJQ0FnSUNCamIyNW1hV2RiY0hKdmNGMGdQU0JuWlhSTlpYSm5aV1JXWVd4MVpTaDFibVJsWm1sdVpXUXNJR052Ym1acFp6SmJjSEp2Y0YwcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb0lYVjBhV3h6TG1selZXNWtaV1pwYm1Wa0tHTnZibVpwWnpGYmNISnZjRjBwS1NCN1hHNGdJQ0FnSUNCamIyNW1hV2RiY0hKdmNGMGdQU0JuWlhSTlpYSm5aV1JXWVd4MVpTaDFibVJsWm1sdVpXUXNJR052Ym1acFp6RmJjSEp2Y0YwcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1Y2JpQWdkWFJwYkhNdVptOXlSV0ZqYUNoa2FYSmxZM1JOWlhKblpVdGxlWE1zSUdaMWJtTjBhVzl1SUcxbGNtZGxLSEJ5YjNBcElIdGNiaUFnSUNCcFppQW9jSEp2Y0NCcGJpQmpiMjVtYVdjeUtTQjdYRzRnSUNBZ0lDQmpiMjVtYVdkYmNISnZjRjBnUFNCblpYUk5aWEpuWldSV1lXeDFaU2hqYjI1bWFXY3hXM0J5YjNCZExDQmpiMjVtYVdjeVczQnliM0JkS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0hCeWIzQWdhVzRnWTI5dVptbG5NU2tnZTF4dUlDQWdJQ0FnWTI5dVptbG5XM0J5YjNCZElEMGdaMlYwVFdWeVoyVmtWbUZzZFdVb2RXNWtaV1pwYm1Wa0xDQmpiMjVtYVdjeFczQnliM0JkS1R0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1WEc0Z0lIWmhjaUJoZUdsdmMwdGxlWE1nUFNCMllXeDFaVVp5YjIxRGIyNW1hV2N5UzJWNWMxeHVJQ0FnSUM1amIyNWpZWFFvYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsYzB0bGVYTXBYRzRnSUNBZ0xtTnZibU5oZENoa1pXWmhkV3gwVkc5RGIyNW1hV2N5UzJWNWN5bGNiaUFnSUNBdVkyOXVZMkYwS0dScGNtVmpkRTFsY21kbFMyVjVjeWs3WEc1Y2JpQWdkbUZ5SUc5MGFHVnlTMlY1Y3lBOUlFOWlhbVZqZEZ4dUlDQWdJQzVyWlhsektHTnZibVpwWnpFcFhHNGdJQ0FnTG1OdmJtTmhkQ2hQWW1wbFkzUXVhMlY1Y3loamIyNW1hV2N5S1NsY2JpQWdJQ0F1Wm1sc2RHVnlLR1oxYm1OMGFXOXVJR1pwYkhSbGNrRjRhVzl6UzJWNWN5aHJaWGtwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJoZUdsdmMwdGxlWE11YVc1a1pYaFBaaWhyWlhrcElEMDlQU0F0TVR0Y2JpQWdJQ0I5S1R0Y2JseHVJQ0IxZEdsc2N5NW1iM0pGWVdOb0tHOTBhR1Z5UzJWNWN5d2diV1Z5WjJWRVpXVndVSEp2Y0dWeWRHbGxjeWs3WEc1Y2JpQWdjbVYwZFhKdUlHTnZibVpwWnp0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQmpjbVZoZEdWRmNuSnZjaUE5SUhKbGNYVnBjbVVvSnk0dlkzSmxZWFJsUlhKeWIzSW5LVHRjYmx4dUx5b3FYRzRnS2lCU1pYTnZiSFpsSUc5eUlISmxhbVZqZENCaElGQnliMjFwYzJVZ1ltRnpaV1FnYjI0Z2NtVnpjRzl1YzJVZ2MzUmhkSFZ6TGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUhKbGMyOXNkbVVnUVNCbWRXNWpkR2x2YmlCMGFHRjBJSEpsYzI5c2RtVnpJSFJvWlNCd2NtOXRhWE5sTGx4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdjbVZxWldOMElFRWdablZ1WTNScGIyNGdkR2hoZENCeVpXcGxZM1J6SUhSb1pTQndjbTl0YVhObExseHVJQ29nUUhCaGNtRnRJSHR2WW1wbFkzUjlJSEpsYzNCdmJuTmxJRlJvWlNCeVpYTndiMjV6WlM1Y2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJ6WlhSMGJHVW9jbVZ6YjJ4MlpTd2djbVZxWldOMExDQnlaWE53YjI1elpTa2dlMXh1SUNCMllYSWdkbUZzYVdSaGRHVlRkR0YwZFhNZ1BTQnlaWE53YjI1elpTNWpiMjVtYVdjdWRtRnNhV1JoZEdWVGRHRjBkWE03WEc0Z0lHbG1JQ2doY21WemNHOXVjMlV1YzNSaGRIVnpJSHg4SUNGMllXeHBaR0YwWlZOMFlYUjFjeUI4ZkNCMllXeHBaR0YwWlZOMFlYUjFjeWh5WlhOd2IyNXpaUzV6ZEdGMGRYTXBLU0I3WEc0Z0lDQWdjbVZ6YjJ4MlpTaHlaWE53YjI1elpTazdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjbVZxWldOMEtHTnlaV0YwWlVWeWNtOXlLRnh1SUNBZ0lDQWdKMUpsY1hWbGMzUWdabUZwYkdWa0lIZHBkR2dnYzNSaGRIVnpJR052WkdVZ0p5QXJJSEpsYzNCdmJuTmxMbk4wWVhSMWN5eGNiaUFnSUNBZ0lISmxjM0J2Ym5ObExtTnZibVpwWnl4Y2JpQWdJQ0FnSUc1MWJHd3NYRzRnSUNBZ0lDQnlaWE53YjI1elpTNXlaWEYxWlhOMExGeHVJQ0FnSUNBZ2NtVnpjRzl1YzJWY2JpQWdJQ0FwS1R0Y2JpQWdmVnh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk4dUxpOTFkR2xzY3ljcE8xeHVYRzR2S2lwY2JpQXFJRlJ5WVc1elptOXliU0IwYUdVZ1pHRjBZU0JtYjNJZ1lTQnlaWEYxWlhOMElHOXlJR0VnY21WemNHOXVjMlZjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIeFRkSEpwYm1kOUlHUmhkR0VnVkdobElHUmhkR0VnZEc4Z1ltVWdkSEpoYm5ObWIzSnRaV1JjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGw5SUdobFlXUmxjbk1nVkdobElHaGxZV1JsY25NZ1ptOXlJSFJvWlNCeVpYRjFaWE4wSUc5eUlISmxjM0J2Ym5ObFhHNGdLaUJBY0dGeVlXMGdlMEZ5Y21GNWZFWjFibU4wYVc5dWZTQm1ibk1nUVNCemFXNW5iR1VnWm5WdVkzUnBiMjRnYjNJZ1FYSnlZWGtnYjJZZ1puVnVZM1JwYjI1elhHNGdLaUJBY21WMGRYSnVjeUI3S24wZ1ZHaGxJSEpsYzNWc2RHbHVaeUIwY21GdWMyWnZjbTFsWkNCa1lYUmhYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2RISmhibk5tYjNKdFJHRjBZU2hrWVhSaExDQm9aV0ZrWlhKekxDQm1ibk1wSUh0Y2JpQWdMeXBsYzJ4cGJuUWdibTh0Y0dGeVlXMHRjbVZoYzNOcFoyNDZNQ292WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvWm01ekxDQm1kVzVqZEdsdmJpQjBjbUZ1YzJadmNtMG9abTRwSUh0Y2JpQWdJQ0JrWVhSaElEMGdabTRvWkdGMFlTd2dhR1ZoWkdWeWN5azdYRzRnSUgwcE8xeHVYRzRnSUhKbGRIVnliaUJrWVhSaE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTkxZEdsc2N5Y3BPMXh1ZG1GeUlHNXZjbTFoYkdsNlpVaGxZV1JsY2s1aGJXVWdQU0J5WlhGMWFYSmxLQ2N1TDJobGJIQmxjbk12Ym05eWJXRnNhWHBsU0dWaFpHVnlUbUZ0WlNjcE8xeHVYRzUyWVhJZ1JFVkdRVlZNVkY5RFQwNVVSVTVVWDFSWlVFVWdQU0I3WEc0Z0lDZERiMjUwWlc1MExWUjVjR1VuT2lBbllYQndiR2xqWVhScGIyNHZlQzEzZDNjdFptOXliUzExY214bGJtTnZaR1ZrSjF4dWZUdGNibHh1Wm5WdVkzUnBiMjRnYzJWMFEyOXVkR1Z1ZEZSNWNHVkpabFZ1YzJWMEtHaGxZV1JsY25Nc0lIWmhiSFZsS1NCN1hHNGdJR2xtSUNnaGRYUnBiSE11YVhOVmJtUmxabWx1WldRb2FHVmhaR1Z5Y3lrZ0ppWWdkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9hR1ZoWkdWeWMxc25RMjl1ZEdWdWRDMVVlWEJsSjEwcEtTQjdYRzRnSUNBZ2FHVmhaR1Z5YzFzblEyOXVkR1Z1ZEMxVWVYQmxKMTBnUFNCMllXeDFaVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUkVaV1poZFd4MFFXUmhjSFJsY2lncElIdGNiaUFnZG1GeUlHRmtZWEIwWlhJN1hHNGdJR2xtSUNoMGVYQmxiMllnV0UxTVNIUjBjRkpsY1hWbGMzUWdJVDA5SUNkMWJtUmxabWx1WldRbktTQjdYRzRnSUNBZ0x5OGdSbTl5SUdKeWIzZHpaWEp6SUhWelpTQllTRklnWVdSaGNIUmxjbHh1SUNBZ0lHRmtZWEIwWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMkZrWVhCMFpYSnpMM2hvY2ljcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVnZaaUJ3Y205alpYTnpJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5MbU5oYkd3b2NISnZZMlZ6Y3lrZ1BUMDlJQ2RiYjJKcVpXTjBJSEJ5YjJObGMzTmRKeWtnZTF4dUlDQWdJQzh2SUVadmNpQnViMlJsSUhWelpTQklWRlJRSUdGa1lYQjBaWEpjYmlBZ0lDQmhaR0Z3ZEdWeUlEMGdjbVZ4ZFdseVpTZ25MaTloWkdGd2RHVnljeTlvZEhSd0p5azdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHRmtZWEIwWlhJN1hHNTlYRzVjYm5aaGNpQmtaV1poZFd4MGN5QTlJSHRjYmlBZ1lXUmhjSFJsY2pvZ1oyVjBSR1ZtWVhWc2RFRmtZWEIwWlhJb0tTeGNibHh1SUNCMGNtRnVjMlp2Y20xU1pYRjFaWE4wT2lCYlpuVnVZM1JwYjI0Z2RISmhibk5tYjNKdFVtVnhkV1Z6ZENoa1lYUmhMQ0JvWldGa1pYSnpLU0I3WEc0Z0lDQWdibTl5YldGc2FYcGxTR1ZoWkdWeVRtRnRaU2hvWldGa1pYSnpMQ0FuUVdOalpYQjBKeWs3WEc0Z0lDQWdibTl5YldGc2FYcGxTR1ZoWkdWeVRtRnRaU2hvWldGa1pYSnpMQ0FuUTI5dWRHVnVkQzFVZVhCbEp5azdYRzRnSUNBZ2FXWWdLSFYwYVd4ekxtbHpSbTl5YlVSaGRHRW9aR0YwWVNrZ2ZIeGNiaUFnSUNBZ0lIVjBhV3h6TG1selFYSnlZWGxDZFdabVpYSW9aR0YwWVNrZ2ZIeGNiaUFnSUNBZ0lIVjBhV3h6TG1selFuVm1abVZ5S0dSaGRHRXBJSHg4WEc0Z0lDQWdJQ0IxZEdsc2N5NXBjMU4wY21WaGJTaGtZWFJoS1NCOGZGeHVJQ0FnSUNBZ2RYUnBiSE11YVhOR2FXeGxLR1JoZEdFcElIeDhYRzRnSUNBZ0lDQjFkR2xzY3k1cGMwSnNiMklvWkdGMFlTbGNiaUFnSUNBcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCa1lYUmhPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kWFJwYkhNdWFYTkJjbkpoZVVKMVptWmxjbFpwWlhjb1pHRjBZU2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJrWVhSaExtSjFabVpsY2p0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hWMGFXeHpMbWx6VlZKTVUyVmhjbU5vVUdGeVlXMXpLR1JoZEdFcEtTQjdYRzRnSUNBZ0lDQnpaWFJEYjI1MFpXNTBWSGx3WlVsbVZXNXpaWFFvYUdWaFpHVnljeXdnSjJGd2NHeHBZMkYwYVc5dUwzZ3RkM2QzTFdadmNtMHRkWEpzWlc1amIyUmxaRHRqYUdGeWMyVjBQWFYwWmkwNEp5azdYRzRnSUNBZ0lDQnlaWFIxY200Z1pHRjBZUzUwYjFOMGNtbHVaeWdwTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZFhScGJITXVhWE5QWW1wbFkzUW9aR0YwWVNrcElIdGNiaUFnSUNBZ0lITmxkRU52Ym5SbGJuUlVlWEJsU1daVmJuTmxkQ2hvWldGa1pYSnpMQ0FuWVhCd2JHbGpZWFJwYjI0dmFuTnZianRqYUdGeWMyVjBQWFYwWmkwNEp5azdYRzRnSUNBZ0lDQnlaWFIxY200Z1NsTlBUaTV6ZEhKcGJtZHBabmtvWkdGMFlTazdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUJrWVhSaE8xeHVJQ0I5WFN4Y2JseHVJQ0IwY21GdWMyWnZjbTFTWlhOd2IyNXpaVG9nVzJaMWJtTjBhVzl1SUhSeVlXNXpabTl5YlZKbGMzQnZibk5sS0dSaGRHRXBJSHRjYmlBZ0lDQXZLbVZ6YkdsdWRDQnVieTF3WVhKaGJTMXlaV0Z6YzJsbmJqb3dLaTljYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR1JoZEdFZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0lDQmtZWFJoSUQwZ1NsTlBUaTV3WVhKelpTaGtZWFJoS1R0Y2JpQWdJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIc2dMeW9nU1dkdWIzSmxJQ292SUgxY2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHUmhkR0U3WEc0Z0lIMWRMRnh1WEc0Z0lDOHFLbHh1SUNBZ0tpQkJJSFJwYldWdmRYUWdhVzRnYldsc2JHbHpaV052Ym1SeklIUnZJR0ZpYjNKMElHRWdjbVZ4ZFdWemRDNGdTV1lnYzJWMElIUnZJREFnS0dSbFptRjFiSFFwSUdGY2JpQWdJQ29nZEdsdFpXOTFkQ0JwY3lCdWIzUWdZM0psWVhSbFpDNWNiaUFnSUNvdlhHNGdJSFJwYldWdmRYUTZJREFzWEc1Y2JpQWdlSE55WmtOdmIydHBaVTVoYldVNklDZFlVMUpHTFZSUFMwVk9KeXhjYmlBZ2VITnlaa2hsWVdSbGNrNWhiV1U2SUNkWUxWaFRVa1l0VkU5TFJVNG5MRnh1WEc0Z0lHMWhlRU52Ym5SbGJuUk1aVzVuZEdnNklDMHhMRnh1SUNCdFlYaENiMlI1VEdWdVozUm9PaUF0TVN4Y2JseHVJQ0IyWVd4cFpHRjBaVk4wWVhSMWN6b2dablZ1WTNScGIyNGdkbUZzYVdSaGRHVlRkR0YwZFhNb2MzUmhkSFZ6S1NCN1hHNGdJQ0FnY21WMGRYSnVJSE4wWVhSMWN5QStQU0F5TURBZ0ppWWdjM1JoZEhWeklEd2dNekF3TzF4dUlDQjlYRzU5TzF4dVhHNWtaV1poZFd4MGN5NW9aV0ZrWlhKeklEMGdlMXh1SUNCamIyMXRiMjQ2SUh0Y2JpQWdJQ0FuUVdOalpYQjBKem9nSjJGd2NHeHBZMkYwYVc5dUwycHpiMjRzSUhSbGVIUXZjR3hoYVc0c0lDb3ZLaWRjYmlBZ2ZWeHVmVHRjYmx4dWRYUnBiSE11Wm05eVJXRmphQ2hiSjJSbGJHVjBaU2NzSUNkblpYUW5MQ0FuYUdWaFpDZGRMQ0JtZFc1amRHbHZiaUJtYjNKRllXTm9UV1YwYUc5a1RtOUVZWFJoS0cxbGRHaHZaQ2tnZTF4dUlDQmtaV1poZFd4MGN5NW9aV0ZrWlhKelcyMWxkR2h2WkYwZ1BTQjdmVHRjYm4wcE8xeHVYRzUxZEdsc2N5NW1iM0pGWVdOb0tGc25jRzl6ZENjc0lDZHdkWFFuTENBbmNHRjBZMmduWFN3Z1puVnVZM1JwYjI0Z1ptOXlSV0ZqYUUxbGRHaHZaRmRwZEdoRVlYUmhLRzFsZEdodlpDa2dlMXh1SUNCa1pXWmhkV3gwY3k1b1pXRmtaWEp6VzIxbGRHaHZaRjBnUFNCMWRHbHNjeTV0WlhKblpTaEVSVVpCVlV4VVgwTlBUbFJGVGxSZlZGbFFSU2s3WEc1OUtUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JrWldaaGRXeDBjenRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCaWFXNWtLR1p1TENCMGFHbHpRWEpuS1NCN1hHNGdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQjNjbUZ3S0NrZ2UxeHVJQ0FnSUhaaGNpQmhjbWR6SUQwZ2JtVjNJRUZ5Y21GNUtHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdncE8xeHVJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1lYSm5jeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ1lYSm5jMXRwWFNBOUlHRnlaM1Z0Wlc1MGMxdHBYVHRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUdadUxtRndjR3g1S0hSb2FYTkJjbWNzSUdGeVozTXBPMXh1SUNCOU8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5MWRHbHNjeWNwTzF4dVhHNW1kVzVqZEdsdmJpQmxibU52WkdVb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCbGJtTnZaR1ZWVWtsRGIyMXdiMjVsYm5Rb2RtRnNLUzVjYmlBZ0lDQnlaWEJzWVdObEtDOGxNMEV2WjJrc0lDYzZKeWt1WEc0Z0lDQWdjbVZ3YkdGalpTZ3ZKVEkwTDJjc0lDY2tKeWt1WEc0Z0lDQWdjbVZ3YkdGalpTZ3ZKVEpETDJkcExDQW5MQ2NwTGx4dUlDQWdJSEpsY0d4aFkyVW9MeVV5TUM5bkxDQW5LeWNwTGx4dUlDQWdJSEpsY0d4aFkyVW9MeVUxUWk5bmFTd2dKMXNuS1M1Y2JpQWdJQ0J5WlhCc1lXTmxLQzhsTlVRdloya3NJQ2RkSnlrN1hHNTlYRzVjYmk4cUtseHVJQ29nUW5WcGJHUWdZU0JWVWt3Z1lua2dZWEJ3Wlc1a2FXNW5JSEJoY21GdGN5QjBieUIwYUdVZ1pXNWtYRzRnS2x4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlIVnliQ0JVYUdVZ1ltRnpaU0J2WmlCMGFHVWdkWEpzSUNobExtY3VMQ0JvZEhSd09pOHZkM2QzTG1kdmIyZHNaUzVqYjIwcFhHNGdLaUJBY0dGeVlXMGdlMjlpYW1WamRIMGdXM0JoY21GdGMxMGdWR2hsSUhCaGNtRnRjeUIwYnlCaVpTQmhjSEJsYm1SbFpGeHVJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzBnVkdobElHWnZjbTFoZEhSbFpDQjFjbXhjYmlBcUwxeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQmlkV2xzWkZWU1RDaDFjbXdzSUhCaGNtRnRjeXdnY0dGeVlXMXpVMlZ5YVdGc2FYcGxjaWtnZTF4dUlDQXZLbVZ6YkdsdWRDQnVieTF3WVhKaGJTMXlaV0Z6YzJsbmJqb3dLaTljYmlBZ2FXWWdLQ0Z3WVhKaGJYTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RYSnNPMXh1SUNCOVhHNWNiaUFnZG1GeUlITmxjbWxoYkdsNlpXUlFZWEpoYlhNN1hHNGdJR2xtSUNod1lYSmhiWE5UWlhKcFlXeHBlbVZ5S1NCN1hHNGdJQ0FnYzJWeWFXRnNhWHBsWkZCaGNtRnRjeUE5SUhCaGNtRnRjMU5sY21saGJHbDZaWElvY0dGeVlXMXpLVHRjYmlBZ2ZTQmxiSE5sSUdsbUlDaDFkR2xzY3k1cGMxVlNURk5sWVhKamFGQmhjbUZ0Y3lod1lYSmhiWE1wS1NCN1hHNGdJQ0FnYzJWeWFXRnNhWHBsWkZCaGNtRnRjeUE5SUhCaGNtRnRjeTUwYjFOMGNtbHVaeWdwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhaaGNpQndZWEowY3lBOUlGdGRPMXh1WEc0Z0lDQWdkWFJwYkhNdVptOXlSV0ZqYUNod1lYSmhiWE1zSUdaMWJtTjBhVzl1SUhObGNtbGhiR2w2WlNoMllXd3NJR3RsZVNrZ2UxeHVJQ0FnSUNBZ2FXWWdLSFpoYkNBOVBUMGdiblZzYkNCOGZDQjBlWEJsYjJZZ2RtRnNJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJR2xtSUNoMWRHbHNjeTVwYzBGeWNtRjVLSFpoYkNrcElIdGNiaUFnSUNBZ0lDQWdhMlY1SUQwZ2EyVjVJQ3NnSjF0ZEp6dGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lIWmhiQ0E5SUZ0MllXeGRPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IxZEdsc2N5NW1iM0pGWVdOb0tIWmhiQ3dnWm5WdVkzUnBiMjRnY0dGeWMyVldZV3gxWlNoMktTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMWRHbHNjeTVwYzBSaGRHVW9kaWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJJRDBnZGk1MGIwbFRUMU4wY21sdVp5Z3BPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hWMGFXeHpMbWx6VDJKcVpXTjBLSFlwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkaUE5SUVwVFQwNHVjM1J5YVc1bmFXWjVLSFlwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIQmhjblJ6TG5CMWMyZ29aVzVqYjJSbEtHdGxlU2tnS3lBblBTY2dLeUJsYm1OdlpHVW9kaWtwTzF4dUlDQWdJQ0FnZlNrN1hHNGdJQ0FnZlNrN1hHNWNiaUFnSUNCelpYSnBZV3hwZW1Wa1VHRnlZVzF6SUQwZ2NHRnlkSE11YW05cGJpZ25KaWNwTzF4dUlDQjlYRzVjYmlBZ2FXWWdLSE5sY21saGJHbDZaV1JRWVhKaGJYTXBJSHRjYmlBZ0lDQjJZWElnYUdGemFHMWhjbXRKYm1SbGVDQTlJSFZ5YkM1cGJtUmxlRTltS0Njakp5azdYRzRnSUNBZ2FXWWdLR2hoYzJodFlYSnJTVzVrWlhnZ0lUMDlJQzB4S1NCN1hHNGdJQ0FnSUNCMWNtd2dQU0IxY213dWMyeHBZMlVvTUN3Z2FHRnphRzFoY210SmJtUmxlQ2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdkWEpzSUNzOUlDaDFjbXd1YVc1a1pYaFBaaWduUHljcElEMDlQU0F0TVNBL0lDYy9KeUE2SUNjbUp5a2dLeUJ6WlhKcFlXeHBlbVZrVUdGeVlXMXpPMXh1SUNCOVhHNWNiaUFnY21WMGRYSnVJSFZ5YkR0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUc1bGR5QlZVa3dnWW5rZ1kyOXRZbWx1YVc1bklIUm9aU0J6Y0dWamFXWnBaV1FnVlZKTWMxeHVJQ3BjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCaVlYTmxWVkpNSUZSb1pTQmlZWE5sSUZWU1RGeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJSEpsYkdGMGFYWmxWVkpNSUZSb1pTQnlaV3hoZEdsMlpTQlZVa3hjYmlBcUlFQnlaWFIxY201eklIdHpkSEpwYm1kOUlGUm9aU0JqYjIxaWFXNWxaQ0JWVWt4Y2JpQXFMMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJqYjIxaWFXNWxWVkpNY3loaVlYTmxWVkpNTENCeVpXeGhkR2wyWlZWU1RDa2dlMXh1SUNCeVpYUjFjbTRnY21Wc1lYUnBkbVZWVWt4Y2JpQWdJQ0EvSUdKaGMyVlZVa3d1Y21Wd2JHRmpaU2d2WEZ3dkt5UXZMQ0FuSnlrZ0t5QW5MeWNnS3lCeVpXeGhkR2wyWlZWU1RDNXlaWEJzWVdObEtDOWVYRnd2S3k4c0lDY25LVnh1SUNBZ0lEb2dZbUZ6WlZWU1REdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQW9YRzRnSUhWMGFXeHpMbWx6VTNSaGJtUmhjbVJDY205M2MyVnlSVzUyS0NrZ1AxeHVYRzRnSUM4dklGTjBZVzVrWVhKa0lHSnliM2R6WlhJZ1pXNTJjeUJ6ZFhCd2IzSjBJR1J2WTNWdFpXNTBMbU52YjJ0cFpWeHVJQ0FnSUNobWRXNWpkR2x2YmlCemRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQjNjbWwwWlRvZ1puVnVZM1JwYjI0Z2QzSnBkR1VvYm1GdFpTd2dkbUZzZFdVc0lHVjRjR2x5WlhNc0lIQmhkR2dzSUdSdmJXRnBiaXdnYzJWamRYSmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJR052YjJ0cFpTQTlJRnRkTzF4dUlDQWdJQ0FnSUNBZ0lHTnZiMnRwWlM1d2RYTm9LRzVoYldVZ0t5QW5QU2NnS3lCbGJtTnZaR1ZWVWtsRGIyMXdiMjVsYm5Rb2RtRnNkV1VwS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJR2xtSUNoMWRHbHNjeTVwYzA1MWJXSmxjaWhsZUhCcGNtVnpLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl2YTJsbExuQjFjMmdvSjJWNGNHbHlaWE05SnlBcklHNWxkeUJFWVhSbEtHVjRjR2x5WlhNcExuUnZSMDFVVTNSeWFXNW5LQ2twTzF4dUlDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUdsbUlDaDFkR2xzY3k1cGMxTjBjbWx1Wnlod1lYUm9LU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl2YTJsbExuQjFjMmdvSjNCaGRHZzlKeUFySUhCaGRHZ3BPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJR2xtSUNoMWRHbHNjeTVwYzFOMGNtbHVaeWhrYjIxaGFXNHBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjlyYVdVdWNIVnphQ2duWkc5dFlXbHVQU2NnS3lCa2IyMWhhVzRwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHpaV04xY21VZ1BUMDlJSFJ5ZFdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmIydHBaUzV3ZFhOb0tDZHpaV04xY21VbktUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWpiMjlyYVdVZ1BTQmpiMjlyYVdVdWFtOXBiaWduT3lBbktUdGNiaUFnSUNBZ0lDQWdmU3hjYmx4dUlDQWdJQ0FnSUNCeVpXRmtPaUJtZFc1amRHbHZiaUJ5WldGa0tHNWhiV1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnYldGMFkyZ2dQU0JrYjJOMWJXVnVkQzVqYjI5cmFXVXViV0YwWTJnb2JtVjNJRkpsWjBWNGNDZ25LRjU4TzF4Y1hGeHpLaWtvSnlBcklHNWhiV1VnS3lBbktUMG9XMTQ3WFNvcEp5a3BPMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUFvYldGMFkyZ2dQeUJrWldOdlpHVlZVa2xEYjIxd2IyNWxiblFvYldGMFkyaGJNMTBwSURvZ2JuVnNiQ2s3WEc0Z0lDQWdJQ0FnSUgwc1hHNWNiaUFnSUNBZ0lDQWdjbVZ0YjNabE9pQm1kVzVqZEdsdmJpQnlaVzF2ZG1Vb2JtRnRaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11ZDNKcGRHVW9ibUZ0WlN3Z0p5Y3NJRVJoZEdVdWJtOTNLQ2tnTFNBNE5qUXdNREF3TUNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMDdYRzRnSUNBZ2ZTa29LU0E2WEc1Y2JpQWdMeThnVG05dUlITjBZVzVrWVhKa0lHSnliM2R6WlhJZ1pXNTJJQ2gzWldJZ2QyOXlhMlZ5Y3l3Z2NtVmhZM1F0Ym1GMGFYWmxLU0JzWVdOcklHNWxaV1JsWkNCemRYQndiM0owTGx4dUlDQWdJQ2htZFc1amRHbHZiaUJ1YjI1VGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQjNjbWwwWlRvZ1puVnVZM1JwYjI0Z2QzSnBkR1VvS1NCN2ZTeGNiaUFnSUNBZ0lDQWdjbVZoWkRvZ1puVnVZM1JwYjI0Z2NtVmhaQ2dwSUhzZ2NtVjBkWEp1SUc1MWJHdzdJSDBzWEc0Z0lDQWdJQ0FnSUhKbGJXOTJaVG9nWm5WdVkzUnBiMjRnY21WdGIzWmxLQ2tnZTMxY2JpQWdJQ0FnSUgwN1hHNGdJQ0FnZlNrb0tWeHVLVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCRVpYUmxjbTFwYm1WeklIZG9aWFJvWlhJZ2RHaGxJSE53WldOcFptbGxaQ0JWVWt3Z2FYTWdZV0p6YjJ4MWRHVmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UzTjBjbWx1WjMwZ2RYSnNJRlJvWlNCVlVrd2dkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZEdobElITndaV05wWm1sbFpDQlZVa3dnYVhNZ1lXSnpiMngxZEdVc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJR2x6UVdKemIyeDFkR1ZWVWt3b2RYSnNLU0I3WEc0Z0lDOHZJRUVnVlZKTUlHbHpJR052Ym5OcFpHVnlaV1FnWVdKemIyeDFkR1VnYVdZZ2FYUWdZbVZuYVc1eklIZHBkR2dnWENJOGMyTm9aVzFsUGpvdkwxd2lJRzl5SUZ3aUx5OWNJaUFvY0hKdmRHOWpiMnd0Y21Wc1lYUnBkbVVnVlZKTUtTNWNiaUFnTHk4Z1VrWkRJRE01T0RZZ1pHVm1hVzVsY3lCelkyaGxiV1VnYm1GdFpTQmhjeUJoSUhObGNYVmxibU5sSUc5bUlHTm9ZWEpoWTNSbGNuTWdZbVZuYVc1dWFXNW5JSGRwZEdnZ1lTQnNaWFIwWlhJZ1lXNWtJR1p2Ykd4dmQyVmtYRzRnSUM4dklHSjVJR0Z1ZVNCamIyMWlhVzVoZEdsdmJpQnZaaUJzWlhSMFpYSnpMQ0JrYVdkcGRITXNJSEJzZFhNc0lIQmxjbWx2WkN3Z2IzSWdhSGx3YUdWdUxseHVJQ0J5WlhSMWNtNGdMMTRvVzJFdGVsMWJZUzE2WEZ4a1hGd3JYRnd0WEZ3dVhTbzZLVDljWEM5Y1hDOHZhUzUwWlhOMEtIVnliQ2s3WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnS0Z4dUlDQjFkR2xzY3k1cGMxTjBZVzVrWVhKa1FuSnZkM05sY2tWdWRpZ3BJRDljYmx4dUlDQXZMeUJUZEdGdVpHRnlaQ0JpY205M2MyVnlJR1Z1ZG5NZ2FHRjJaU0JtZFd4c0lITjFjSEJ2Y25RZ2IyWWdkR2hsSUVGUVNYTWdibVZsWkdWa0lIUnZJSFJsYzNSY2JpQWdMeThnZDJobGRHaGxjaUIwYUdVZ2NtVnhkV1Z6ZENCVlVrd2dhWE1nYjJZZ2RHaGxJSE5oYldVZ2IzSnBaMmx1SUdGeklHTjFjbkpsYm5RZ2JHOWpZWFJwYjI0dVhHNGdJQ0FnS0daMWJtTjBhVzl1SUhOMFlXNWtZWEprUW5KdmQzTmxja1Z1ZGlncElIdGNiaUFnSUNBZ0lIWmhjaUJ0YzJsbElEMGdMeWh0YzJsbGZIUnlhV1JsYm5RcEwya3VkR1Z6ZENodVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MEtUdGNiaUFnSUNBZ0lIWmhjaUIxY214UVlYSnphVzVuVG05a1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oyRW5LVHRjYmlBZ0lDQWdJSFpoY2lCdmNtbG5hVzVWVWt3N1hHNWNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDb2dVR0Z5YzJVZ1lTQlZVa3dnZEc4Z1pHbHpZMjkyWlhJZ2FYUW5jeUJqYjIxd2IyNWxiblJ6WEc0Z0lDQWdLbHh1SUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlIVnliQ0JVYUdVZ1ZWSk1JSFJ2SUdKbElIQmhjbk5sWkZ4dUlDQWdJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDFjYmlBZ0lDQXFMMXh1SUNBZ0lDQWdablZ1WTNScGIyNGdjbVZ6YjJ4MlpWVlNUQ2gxY213cElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUdoeVpXWWdQU0IxY213N1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0cxemFXVXBJSHRjYmlBZ0lDQWdJQ0FnTHk4Z1NVVWdibVZsWkhNZ1lYUjBjbWxpZFhSbElITmxkQ0IwZDJsalpTQjBieUJ1YjNKdFlXeHBlbVVnY0hKdmNHVnlkR2xsYzF4dUlDQWdJQ0FnSUNBZ0lIVnliRkJoY25OcGJtZE9iMlJsTG5ObGRFRjBkSEpwWW5WMFpTZ25hSEpsWmljc0lHaHlaV1lwTzF4dUlDQWdJQ0FnSUNBZ0lHaHlaV1lnUFNCMWNteFFZWEp6YVc1blRtOWtaUzVvY21WbU8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnZFhKc1VHRnljMmx1WjA1dlpHVXVjMlYwUVhSMGNtbGlkWFJsS0Nkb2NtVm1KeXdnYUhKbFppazdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z2RYSnNVR0Z5YzJsdVowNXZaR1VnY0hKdmRtbGtaWE1nZEdobElGVnliRlYwYVd4eklHbHVkR1Z5Wm1GalpTQXRJR2gwZEhBNkx5OTFjbXd1YzNCbFl5NTNhR0YwZDJjdWIzSm5MeU4xY214MWRHbHNjMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUdoeVpXWTZJSFZ5YkZCaGNuTnBibWRPYjJSbExtaHlaV1lzWEc0Z0lDQWdJQ0FnSUNBZ2NISnZkRzlqYjJ3NklIVnliRkJoY25OcGJtZE9iMlJsTG5CeWIzUnZZMjlzSUQ4Z2RYSnNVR0Z5YzJsdVowNXZaR1V1Y0hKdmRHOWpiMnd1Y21Wd2JHRmpaU2d2T2lRdkxDQW5KeWtnT2lBbkp5eGNiaUFnSUNBZ0lDQWdJQ0JvYjNOME9pQjFjbXhRWVhKemFXNW5UbTlrWlM1b2IzTjBMRnh1SUNBZ0lDQWdJQ0FnSUhObFlYSmphRG9nZFhKc1VHRnljMmx1WjA1dlpHVXVjMlZoY21Ob0lEOGdkWEpzVUdGeWMybHVaMDV2WkdVdWMyVmhjbU5vTG5KbGNHeGhZMlVvTDE1Y1hEOHZMQ0FuSnlrZ09pQW5KeXhjYmlBZ0lDQWdJQ0FnSUNCb1lYTm9PaUIxY214UVlYSnphVzVuVG05a1pTNW9ZWE5vSUQ4Z2RYSnNVR0Z5YzJsdVowNXZaR1V1YUdGemFDNXlaWEJzWVdObEtDOWVJeThzSUNjbktTQTZJQ2NuTEZ4dUlDQWdJQ0FnSUNBZ0lHaHZjM1J1WVcxbE9pQjFjbXhRWVhKemFXNW5UbTlrWlM1b2IzTjBibUZ0WlN4Y2JpQWdJQ0FnSUNBZ0lDQndiM0owT2lCMWNteFFZWEp6YVc1blRtOWtaUzV3YjNKMExGeHVJQ0FnSUNBZ0lDQWdJSEJoZEdodVlXMWxPaUFvZFhKc1VHRnljMmx1WjA1dlpHVXVjR0YwYUc1aGJXVXVZMmhoY2tGMEtEQXBJRDA5UFNBbkx5Y3BJRDljYmlBZ0lDQWdJQ0FnSUNBZ0lIVnliRkJoY25OcGJtZE9iMlJsTG5CaGRHaHVZVzFsSURwY2JpQWdJQ0FnSUNBZ0lDQWdJQ2N2SnlBcklIVnliRkJoY25OcGJtZE9iMlJsTG5CaGRHaHVZVzFsWEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lHOXlhV2RwYmxWU1RDQTlJSEpsYzI5c2RtVlZVa3dvZDJsdVpHOTNMbXh2WTJGMGFXOXVMbWh5WldZcE8xeHVYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQXFJRVJsZEdWeWJXbHVaU0JwWmlCaElGVlNUQ0J6YUdGeVpYTWdkR2hsSUhOaGJXVWdiM0pwWjJsdUlHRnpJSFJvWlNCamRYSnlaVzUwSUd4dlkyRjBhVzl1WEc0Z0lDQWdLbHh1SUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlISmxjWFZsYzNSVlVrd2dWR2hsSUZWU1RDQjBieUIwWlhOMFhHNGdJQ0FnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCVlVrd2djMmhoY21WeklIUm9aU0J6WVcxbElHOXlhV2RwYml3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0lDQWdLaTljYmlBZ0lDQWdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQnBjMVZTVEZOaGJXVlBjbWxuYVc0b2NtVnhkV1Z6ZEZWU1RDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NHRnljMlZrSUQwZ0tIVjBhV3h6TG1selUzUnlhVzVuS0hKbGNYVmxjM1JWVWt3cEtTQS9JSEpsYzI5c2RtVlZVa3dvY21WeGRXVnpkRlZTVENrZ09pQnlaWEYxWlhOMFZWSk1PMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdLSEJoY25ObFpDNXdjbTkwYjJOdmJDQTlQVDBnYjNKcFoybHVWVkpNTG5CeWIzUnZZMjlzSUNZbVhHNGdJQ0FnSUNBZ0lDQWdJQ0J3WVhKelpXUXVhRzl6ZENBOVBUMGdiM0pwWjJsdVZWSk1MbWh2YzNRcE8xeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOUtTZ3BJRHBjYmx4dUlDQXZMeUJPYjI0Z2MzUmhibVJoY21RZ1luSnZkM05sY2lCbGJuWnpJQ2gzWldJZ2QyOXlhMlZ5Y3l3Z2NtVmhZM1F0Ym1GMGFYWmxLU0JzWVdOcklHNWxaV1JsWkNCemRYQndiM0owTGx4dUlDQWdJQ2htZFc1amRHbHZiaUJ1YjI1VGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z2FYTlZVa3hUWVcxbFQzSnBaMmx1S0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ0lDQWdJSDA3WEc0Z0lDQWdmU2tvS1Z4dUtUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpNHZkWFJwYkhNbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJ1YjNKdFlXeHBlbVZJWldGa1pYSk9ZVzFsS0dobFlXUmxjbk1zSUc1dmNtMWhiR2w2WldST1lXMWxLU0I3WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvYUdWaFpHVnljeXdnWm5WdVkzUnBiMjRnY0hKdlkyVnpjMGhsWVdSbGNpaDJZV3gxWlN3Z2JtRnRaU2tnZTF4dUlDQWdJR2xtSUNodVlXMWxJQ0U5UFNCdWIzSnRZV3hwZW1Wa1RtRnRaU0FtSmlCdVlXMWxMblJ2VlhCd1pYSkRZWE5sS0NrZ1BUMDlJRzV2Y20xaGJHbDZaV1JPWVcxbExuUnZWWEJ3WlhKRFlYTmxLQ2twSUh0Y2JpQWdJQ0FnSUdobFlXUmxjbk5iYm05eWJXRnNhWHBsWkU1aGJXVmRJRDBnZG1Gc2RXVTdYRzRnSUNBZ0lDQmtaV3hsZEdVZ2FHVmhaR1Z5YzF0dVlXMWxYVHRjYmlBZ0lDQjlYRzRnSUgwcE8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSFYwYVd4eklEMGdjbVZ4ZFdseVpTZ25MaTh1TGk5MWRHbHNjeWNwTzF4dVhHNHZMeUJJWldGa1pYSnpJSGRvYjNObElHUjFjR3hwWTJGMFpYTWdZWEpsSUdsbmJtOXlaV1FnWW5rZ2JtOWtaVnh1THk4Z1l5NW1MaUJvZEhSd2N6b3ZMMjV2WkdWcWN5NXZjbWN2WVhCcEwyaDBkSEF1YUhSdGJDTm9kSFJ3WDIxbGMzTmhaMlZmYUdWaFpHVnljMXh1ZG1GeUlHbG5ibTl5WlVSMWNHeHBZMkYwWlU5bUlEMGdXMXh1SUNBbllXZGxKeXdnSjJGMWRHaHZjbWw2WVhScGIyNG5MQ0FuWTI5dWRHVnVkQzFzWlc1bmRHZ25MQ0FuWTI5dWRHVnVkQzEwZVhCbEp5d2dKMlYwWVdjbkxGeHVJQ0FuWlhod2FYSmxjeWNzSUNkbWNtOXRKeXdnSjJodmMzUW5MQ0FuYVdZdGJXOWthV1pwWldRdGMybHVZMlVuTENBbmFXWXRkVzV0YjJScFptbGxaQzF6YVc1alpTY3NYRzRnSUNkc1lYTjBMVzF2WkdsbWFXVmtKeXdnSjJ4dlkyRjBhVzl1Snl3Z0oyMWhlQzFtYjNKM1lYSmtjeWNzSUNkd2NtOTRlUzFoZFhSb2IzSnBlbUYwYVc5dUp5eGNiaUFnSjNKbFptVnlaWEluTENBbmNtVjBjbmt0WVdaMFpYSW5MQ0FuZFhObGNpMWhaMlZ1ZENkY2JsMDdYRzVjYmk4cUtseHVJQ29nVUdGeWMyVWdhR1ZoWkdWeWN5QnBiblJ2SUdGdUlHOWlhbVZqZEZ4dUlDcGNiaUFxSUdCZ1lGeHVJQ29nUkdGMFpUb2dWMlZrTENBeU55QkJkV2NnTWpBeE5DQXdPRG8xT0RvME9TQkhUVlJjYmlBcUlFTnZiblJsYm5RdFZIbHdaVG9nWVhCd2JHbGpZWFJwYjI0dmFuTnZibHh1SUNvZ1EyOXVibVZqZEdsdmJqb2dhMlZsY0MxaGJHbDJaVnh1SUNvZ1ZISmhibk5tWlhJdFJXNWpiMlJwYm1jNklHTm9kVzVyWldSY2JpQXFJR0JnWUZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0JvWldGa1pYSnpJRWhsWVdSbGNuTWdibVZsWkdsdVp5QjBieUJpWlNCd1lYSnpaV1JjYmlBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOUlFaGxZV1JsY25NZ2NHRnljMlZrSUdsdWRHOGdZVzRnYjJKcVpXTjBYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2NHRnljMlZJWldGa1pYSnpLR2hsWVdSbGNuTXBJSHRjYmlBZ2RtRnlJSEJoY25ObFpDQTlJSHQ5TzF4dUlDQjJZWElnYTJWNU8xeHVJQ0IyWVhJZ2RtRnNPMXh1SUNCMllYSWdhVHRjYmx4dUlDQnBaaUFvSVdobFlXUmxjbk1wSUhzZ2NtVjBkWEp1SUhCaGNuTmxaRHNnZlZ4dVhHNGdJSFYwYVd4ekxtWnZja1ZoWTJnb2FHVmhaR1Z5Y3k1emNHeHBkQ2duWEZ4dUp5a3NJR1oxYm1OMGFXOXVJSEJoY25ObGNpaHNhVzVsS1NCN1hHNGdJQ0FnYVNBOUlHeHBibVV1YVc1a1pYaFBaaWduT2ljcE8xeHVJQ0FnSUd0bGVTQTlJSFYwYVd4ekxuUnlhVzBvYkdsdVpTNXpkV0p6ZEhJb01Dd2dhU2twTG5SdlRHOTNaWEpEWVhObEtDazdYRzRnSUNBZ2RtRnNJRDBnZFhScGJITXVkSEpwYlNoc2FXNWxMbk4xWW5OMGNpaHBJQ3NnTVNrcE8xeHVYRzRnSUNBZ2FXWWdLR3RsZVNrZ2UxeHVJQ0FnSUNBZ2FXWWdLSEJoY25ObFpGdHJaWGxkSUNZbUlHbG5ibTl5WlVSMWNHeHBZMkYwWlU5bUxtbHVaR1Y0VDJZb2EyVjVLU0ErUFNBd0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lHbG1JQ2hyWlhrZ1BUMDlJQ2R6WlhRdFkyOXZhMmxsSnlrZ2UxeHVJQ0FnSUNBZ0lDQndZWEp6WldSYmEyVjVYU0E5SUNod1lYSnpaV1JiYTJWNVhTQS9JSEJoY25ObFpGdHJaWGxkSURvZ1cxMHBMbU52Ym1OaGRDaGJkbUZzWFNrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCd1lYSnpaV1JiYTJWNVhTQTlJSEJoY25ObFpGdHJaWGxkSUQ4Z2NHRnljMlZrVzJ0bGVWMGdLeUFuTENBbklDc2dkbUZzSURvZ2RtRnNPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlNrN1hHNWNiaUFnY21WMGRYSnVJSEJoY25ObFpEdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1UzbHVkR0ZqZEdsaklITjFaMkZ5SUdadmNpQnBiblp2YTJsdVp5QmhJR1oxYm1OMGFXOXVJR0Z1WkNCbGVIQmhibVJwYm1jZ1lXNGdZWEp5WVhrZ1ptOXlJR0Z5WjNWdFpXNTBjeTVjYmlBcVhHNGdLaUJEYjIxdGIyNGdkWE5sSUdOaGMyVWdkMjkxYkdRZ1ltVWdkRzhnZFhObElHQkdkVzVqZEdsdmJpNXdjbTkwYjNSNWNHVXVZWEJ3YkhsZ0xseHVJQ3BjYmlBcUlDQmdZR0JxYzF4dUlDb2dJR1oxYm1OMGFXOXVJR1lvZUN3Z2VTd2dlaWtnZTMxY2JpQXFJQ0IyWVhJZ1lYSm5jeUE5SUZzeExDQXlMQ0F6WFR0Y2JpQXFJQ0JtTG1Gd2NHeDVLRzUxYkd3c0lHRnlaM01wTzF4dUlDb2dJR0JnWUZ4dUlDcGNiaUFxSUZkcGRHZ2dZSE53Y21WaFpHQWdkR2hwY3lCbGVHRnRjR3hsSUdOaGJpQmlaU0J5WlMxM2NtbDBkR1Z1TGx4dUlDcGNiaUFxSUNCZ1lHQnFjMXh1SUNvZ0lITndjbVZoWkNobWRXNWpkR2x2YmloNExDQjVMQ0I2S1NCN2ZTa29XekVzSURJc0lETmRLVHRjYmlBcUlDQmdZR0JjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JqWVd4c1ltRmphMXh1SUNvZ1FISmxkSFZ5Ym5NZ2UwWjFibU4wYVc5dWZWeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUhOd2NtVmhaQ2hqWVd4c1ltRmpheWtnZTF4dUlDQnlaWFIxY200Z1puVnVZM1JwYjI0Z2QzSmhjQ2hoY25JcElIdGNiaUFnSUNCeVpYUjFjbTRnWTJGc2JHSmhZMnN1WVhCd2JIa29iblZzYkN3Z1lYSnlLVHRjYmlBZ2ZUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJpYVc1a0lEMGdjbVZ4ZFdseVpTZ25MaTlvWld4d1pYSnpMMkpwYm1RbktUdGNibHh1THlwbmJHOWlZV3dnZEc5VGRISnBibWM2ZEhKMVpTb3ZYRzVjYmk4dklIVjBhV3h6SUdseklHRWdiR2xpY21GeWVTQnZaaUJuWlc1bGNtbGpJR2hsYkhCbGNpQm1kVzVqZEdsdmJuTWdibTl1TFhOd1pXTnBabWxqSUhSdklHRjRhVzl6WEc1Y2JuWmhjaUIwYjFOMGNtbHVaeUE5SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWM3WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVc0Z1FYSnlZWGxjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhiaUJCY25KaGVTd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselFYSnlZWGtvZG1Gc0tTQjdYRzRnSUhKbGRIVnliaUIwYjFOMGNtbHVaeTVqWVd4c0tIWmhiQ2tnUFQwOUlDZGJiMkpxWldOMElFRnljbUY1WFNjN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdkbUZzZFdVZ2FYTWdkVzVrWldacGJtVmtYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RHaGxJSFpoYkhWbElHbHpJSFZ1WkdWbWFXNWxaQ3dnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpWVzVrWldacGJtVmtLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkSGx3Wlc5bUlIWmhiQ0E5UFQwZ0ozVnVaR1ZtYVc1bFpDYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCQ2RXWm1aWEpjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRUoxWm1abGNpd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselFuVm1abVZ5S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZG1Gc0lDRTlQU0J1ZFd4c0lDWW1JQ0ZwYzFWdVpHVm1hVzVsWkNoMllXd3BJQ1ltSUhaaGJDNWpiMjV6ZEhKMVkzUnZjaUFoUFQwZ2JuVnNiQ0FtSmlBaGFYTlZibVJsWm1sdVpXUW9kbUZzTG1OdmJuTjBjblZqZEc5eUtWeHVJQ0FnSUNZbUlIUjVjR1Z2WmlCMllXd3VZMjl1YzNSeWRXTjBiM0l1YVhOQ2RXWm1aWElnUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnZG1Gc0xtTnZibk4wY25WamRHOXlMbWx6UW5WbVptVnlLSFpoYkNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdkbUZzZFdVZ2FYTWdZVzRnUVhKeVlYbENkV1ptWlhKY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoYmlCQmNuSmhlVUoxWm1abGNpd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselFYSnlZWGxDZFdabVpYSW9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQjBiMU4wY21sdVp5NWpZV3hzS0haaGJDa2dQVDA5SUNkYmIySnFaV04wSUVGeWNtRjVRblZtWm1WeVhTYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCR2IzSnRSR0YwWVZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0Z1SUVadmNtMUVZWFJoTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5HYjNKdFJHRjBZU2gyWVd3cElIdGNiaUFnY21WMGRYSnVJQ2gwZVhCbGIyWWdSbTl5YlVSaGRHRWdJVDA5SUNkMWJtUmxabWx1WldRbktTQW1KaUFvZG1Gc0lHbHVjM1JoYm1ObGIyWWdSbTl5YlVSaGRHRXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ2RtbGxkeUJ2YmlCaGJpQkJjbkpoZVVKMVptWmxjbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdkbWxsZHlCdmJpQmhiaUJCY25KaGVVSjFabVpsY2l3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6UVhKeVlYbENkV1ptWlhKV2FXVjNLSFpoYkNrZ2UxeHVJQ0IyWVhJZ2NtVnpkV3gwTzF4dUlDQnBaaUFvS0hSNWNHVnZaaUJCY25KaGVVSjFabVpsY2lBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NwSUNZbUlDaEJjbkpoZVVKMVptWmxjaTVwYzFacFpYY3BLU0I3WEc0Z0lDQWdjbVZ6ZFd4MElEMGdRWEp5WVhsQ2RXWm1aWEl1YVhOV2FXVjNLSFpoYkNrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2NtVnpkV3gwSUQwZ0tIWmhiQ2tnSmlZZ0tIWmhiQzVpZFdabVpYSXBJQ1ltSUNoMllXd3VZblZtWm1WeUlHbHVjM1JoYm1ObGIyWWdRWEp5WVhsQ2RXWm1aWElwTzF4dUlDQjlYRzRnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCVGRISnBibWRjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRk4wY21sdVp5d2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselUzUnlhVzVuS0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JSFpoYkNBOVBUMGdKM04wY21sdVp5YzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCT2RXMWlaWEpjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRTUxYldKbGNpd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm1aMWJtTjBhVzl1SUdselRuVnRZbVZ5S0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JSFpoYkNBOVBUMGdKMjUxYldKbGNpYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVc0Z1QySnFaV04wWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZVzRnVDJKcVpXTjBMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTlBZbXBsWTNRb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMllXd2dJVDA5SUc1MWJHd2dKaVlnZEhsd1pXOW1JSFpoYkNBOVBUMGdKMjlpYW1WamRDYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCd2JHRnBiaUJQWW1wbFkzUmNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2RtRnNJRlJvWlNCMllXeDFaU0IwYnlCMFpYTjBYRzRnS2lCQWNtVjBkWEp1SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ2NHeGhhVzRnVDJKcVpXTjBMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTlFiR0ZwYms5aWFtVmpkQ2gyWVd3cElIdGNiaUFnYVdZZ0tIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQWhQVDBnSjF0dlltcGxZM1FnVDJKcVpXTjBYU2NwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSDFjYmx4dUlDQjJZWElnY0hKdmRHOTBlWEJsSUQwZ1QySnFaV04wTG1kbGRGQnliM1J2ZEhsd1pVOW1LSFpoYkNrN1hHNGdJSEpsZEhWeWJpQndjbTkwYjNSNWNHVWdQVDA5SUc1MWJHd2dmSHdnY0hKdmRHOTBlWEJsSUQwOVBTQlBZbXBsWTNRdWNISnZkRzkwZVhCbE8xeHVmVnh1WEc0dktpcGNiaUFxSUVSbGRHVnliV2x1WlNCcFppQmhJSFpoYkhWbElHbHpJR0VnUkdGMFpWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1JHRjBaU3dnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpSR0YwWlNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzS1NBOVBUMGdKMXR2WW1wbFkzUWdSR0YwWlYwbk8xeHVmVnh1WEc0dktpcGNiaUFxSUVSbGRHVnliV2x1WlNCcFppQmhJSFpoYkhWbElHbHpJR0VnUm1sc1pWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1JtbHNaU3dnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpSbWxzWlNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzS1NBOVBUMGdKMXR2WW1wbFkzUWdSbWxzWlYwbk8xeHVmVnh1WEc0dktpcGNiaUFxSUVSbGRHVnliV2x1WlNCcFppQmhJSFpoYkhWbElHbHpJR0VnUW14dllseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1FteHZZaXdnYjNSb1pYSjNhWE5sSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpRbXh2WWloMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzS1NBOVBUMGdKMXR2WW1wbFkzUWdRbXh2WWwwbk8xeHVmVnh1WEc0dktpcGNiaUFxSUVSbGRHVnliV2x1WlNCcFppQmhJSFpoYkhWbElHbHpJR0VnUm5WdVkzUnBiMjVjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjJZV3gxWlNCcGN5QmhJRVoxYm1OMGFXOXVMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkdkVzVqZEdsdmJpaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIUnZVM1J5YVc1bkxtTmhiR3dvZG1Gc0tTQTlQVDBnSjF0dlltcGxZM1FnUm5WdVkzUnBiMjVkSnp0Y2JuMWNibHh1THlvcVhHNGdLaUJFWlhSbGNtMXBibVVnYVdZZ1lTQjJZV3gxWlNCcGN5QmhJRk4wY21WaGJWeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdFZ1UzUnlaV0Z0TENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5UZEhKbFlXMG9kbUZzS1NCN1hHNGdJSEpsZEhWeWJpQnBjMDlpYW1WamRDaDJZV3dwSUNZbUlHbHpSblZ1WTNScGIyNG9kbUZzTG5CcGNHVXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpTQnBaaUJoSUhaaGJIVmxJR2x6SUdFZ1ZWSk1VMlZoY21Ob1VHRnlZVzF6SUc5aWFtVmpkRnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlIWmhiSFZsSUdseklHRWdWVkpNVTJWaGNtTm9VR0Z5WVcxeklHOWlhbVZqZEN3Z2IzUm9aWEozYVhObElHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6VlZKTVUyVmhjbU5vVUdGeVlXMXpLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkSGx3Wlc5bUlGVlNURk5sWVhKamFGQmhjbUZ0Y3lBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2RtRnNJR2x1YzNSaGJtTmxiMllnVlZKTVUyVmhjbU5vVUdGeVlXMXpPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGUnlhVzBnWlhoalpYTnpJSGRvYVhSbGMzQmhZMlVnYjJabUlIUm9aU0JpWldkcGJtNXBibWNnWVc1a0lHVnVaQ0J2WmlCaElITjBjbWx1WjF4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0J6ZEhJZ1ZHaGxJRk4wY21sdVp5QjBieUIwY21sdFhHNGdLaUJBY21WMGRYSnVjeUI3VTNSeWFXNW5mU0JVYUdVZ1UzUnlhVzVuSUdaeVpXVmtJRzltSUdWNFkyVnpjeUIzYUdsMFpYTndZV05sWEc0Z0tpOWNibVoxYm1OMGFXOXVJSFJ5YVcwb2MzUnlLU0I3WEc0Z0lISmxkSFZ5YmlCemRISXVjbVZ3YkdGalpTZ3ZYbHhjY3lvdkxDQW5KeWt1Y21Wd2JHRmpaU2d2WEZ4ektpUXZMQ0FuSnlrN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdWMFpYSnRhVzVsSUdsbUlIZGxKM0psSUhKMWJtNXBibWNnYVc0Z1lTQnpkR0Z1WkdGeVpDQmljbTkzYzJWeUlHVnVkbWx5YjI1dFpXNTBYRzRnS2x4dUlDb2dWR2hwY3lCaGJHeHZkM01nWVhocGIzTWdkRzhnY25WdUlHbHVJR0VnZDJWaUlIZHZjbXRsY2l3Z1lXNWtJSEpsWVdOMExXNWhkR2wyWlM1Y2JpQXFJRUp2ZEdnZ1pXNTJhWEp2Ym0xbGJuUnpJSE4xY0hCdmNuUWdXRTFNU0hSMGNGSmxjWFZsYzNRc0lHSjFkQ0J1YjNRZ1puVnNiSGtnYzNSaGJtUmhjbVFnWjJ4dlltRnNjeTVjYmlBcVhHNGdLaUIzWldJZ2QyOXlhMlZ5Y3pwY2JpQXFJQ0IwZVhCbGIyWWdkMmx1Wkc5M0lDMCtJSFZ1WkdWbWFXNWxaRnh1SUNvZ0lIUjVjR1Z2WmlCa2IyTjFiV1Z1ZENBdFBpQjFibVJsWm1sdVpXUmNiaUFxWEc0Z0tpQnlaV0ZqZEMxdVlYUnBkbVU2WEc0Z0tpQWdibUYyYVdkaGRHOXlMbkJ5YjJSMVkzUWdMVDRnSjFKbFlXTjBUbUYwYVhabEoxeHVJQ29nYm1GMGFYWmxjMk55YVhCMFhHNGdLaUFnYm1GMmFXZGhkRzl5TG5CeWIyUjFZM1FnTFQ0Z0owNWhkR2wyWlZOamNtbHdkQ2NnYjNJZ0owNVRKMXh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMU4wWVc1a1lYSmtRbkp2ZDNObGNrVnVkaWdwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJ1WVhacFoyRjBiM0lnSVQwOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUNodVlYWnBaMkYwYjNJdWNISnZaSFZqZENBOVBUMGdKMUpsWVdOMFRtRjBhWFpsSnlCOGZGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHNWhkbWxuWVhSdmNpNXdjbTlrZFdOMElEMDlQU0FuVG1GMGFYWmxVMk55YVhCMEp5QjhmRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzVoZG1sbllYUnZjaTV3Y205a2RXTjBJRDA5UFNBblRsTW5LU2tnZTF4dUlDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnS0Z4dUlDQWdJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbVhHNGdJQ0FnZEhsd1pXOW1JR1J2WTNWdFpXNTBJQ0U5UFNBbmRXNWtaV1pwYm1Wa0oxeHVJQ0FwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRWwwWlhKaGRHVWdiM1psY2lCaGJpQkJjbkpoZVNCdmNpQmhiaUJQWW1wbFkzUWdhVzUyYjJ0cGJtY2dZU0JtZFc1amRHbHZiaUJtYjNJZ1pXRmphQ0JwZEdWdExseHVJQ3BjYmlBcUlFbG1JR0J2WW1wZ0lHbHpJR0Z1SUVGeWNtRjVJR05oYkd4aVlXTnJJSGRwYkd3Z1ltVWdZMkZzYkdWa0lIQmhjM05wYm1kY2JpQXFJSFJvWlNCMllXeDFaU3dnYVc1a1pYZ3NJR0Z1WkNCamIyMXdiR1YwWlNCaGNuSmhlU0JtYjNJZ1pXRmphQ0JwZEdWdExseHVJQ3BjYmlBcUlFbG1JQ2R2WW1vbklHbHpJR0Z1SUU5aWFtVmpkQ0JqWVd4c1ltRmpheUIzYVd4c0lHSmxJR05oYkd4bFpDQndZWE56YVc1blhHNGdLaUIwYUdVZ2RtRnNkV1VzSUd0bGVTd2dZVzVrSUdOdmJYQnNaWFJsSUc5aWFtVmpkQ0JtYjNJZ1pXRmphQ0J3Y205d1pYSjBlUzVjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIeEJjbkpoZVgwZ2IySnFJRlJvWlNCdlltcGxZM1FnZEc4Z2FYUmxjbUYwWlZ4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdabTRnVkdobElHTmhiR3hpWVdOcklIUnZJR2x1ZG05clpTQm1iM0lnWldGamFDQnBkR1Z0WEc0Z0tpOWNibVoxYm1OMGFXOXVJR1p2Y2tWaFkyZ29iMkpxTENCbWJpa2dlMXh1SUNBdkx5QkViMjRuZENCaWIzUm9aWElnYVdZZ2JtOGdkbUZzZFdVZ2NISnZkbWxrWldSY2JpQWdhV1lnS0c5aWFpQTlQVDBnYm5Wc2JDQjhmQ0IwZVhCbGIyWWdiMkpxSUQwOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJSEpsZEhWeWJqdGNiaUFnZlZ4dVhHNGdJQzh2SUVadmNtTmxJR0Z1SUdGeWNtRjVJR2xtSUc1dmRDQmhiSEpsWVdSNUlITnZiV1YwYUdsdVp5QnBkR1Z5WVdKc1pWeHVJQ0JwWmlBb2RIbHdaVzltSUc5aWFpQWhQVDBnSjI5aWFtVmpkQ2NwSUh0Y2JpQWdJQ0F2S21WemJHbHVkQ0J1Ynkxd1lYSmhiUzF5WldGemMybG5iam93S2k5Y2JpQWdJQ0J2WW1vZ1BTQmJiMkpxWFR0Y2JpQWdmVnh1WEc0Z0lHbG1JQ2hwYzBGeWNtRjVLRzlpYWlrcElIdGNiaUFnSUNBdkx5QkpkR1Z5WVhSbElHOTJaWElnWVhKeVlYa2dkbUZzZFdWelhHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQXNJR3dnUFNCdlltb3ViR1Z1WjNSb095QnBJRHdnYkRzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0JtYmk1allXeHNLRzUxYkd3c0lHOWlhbHRwWFN3Z2FTd2diMkpxS1R0Y2JpQWdJQ0I5WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnTHk4Z1NYUmxjbUYwWlNCdmRtVnlJRzlpYW1WamRDQnJaWGx6WEc0Z0lDQWdabTl5SUNoMllYSWdhMlY1SUdsdUlHOWlhaWtnZTF4dUlDQWdJQ0FnYVdZZ0tFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbW9zSUd0bGVTa3BJSHRjYmlBZ0lDQWdJQ0FnWm00dVkyRnNiQ2h1ZFd4c0xDQnZZbXBiYTJWNVhTd2dhMlY1TENCdlltb3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRUZqWTJWd2RITWdkbUZ5WVhKbmN5QmxlSEJsWTNScGJtY2daV0ZqYUNCaGNtZDFiV1Z1ZENCMGJ5QmlaU0JoYmlCdlltcGxZM1FzSUhSb1pXNWNiaUFxSUdsdGJYVjBZV0pzZVNCdFpYSm5aWE1nZEdobElIQnliM0JsY25ScFpYTWdiMllnWldGamFDQnZZbXBsWTNRZ1lXNWtJSEpsZEhWeWJuTWdjbVZ6ZFd4MExseHVJQ3BjYmlBcUlGZG9aVzRnYlhWc2RHbHdiR1VnYjJKcVpXTjBjeUJqYjI1MFlXbHVJSFJvWlNCellXMWxJR3RsZVNCMGFHVWdiR0YwWlhJZ2IySnFaV04wSUdsdVhHNGdLaUIwYUdVZ1lYSm5kVzFsYm5SeklHeHBjM1FnZDJsc2JDQjBZV3RsSUhCeVpXTmxaR1Z1WTJVdVhHNGdLbHh1SUNvZ1JYaGhiWEJzWlRwY2JpQXFYRzRnS2lCZ1lHQnFjMXh1SUNvZ2RtRnlJSEpsYzNWc2RDQTlJRzFsY21kbEtIdG1iMjg2SURFeU0zMHNJSHRtYjI4NklEUTFObjBwTzF4dUlDb2dZMjl1YzI5c1pTNXNiMmNvY21WemRXeDBMbVp2YnlrN0lDOHZJRzkxZEhCMWRITWdORFUyWEc0Z0tpQmdZR0JjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdiMkpxTVNCUFltcGxZM1FnZEc4Z2JXVnlaMlZjYmlBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOUlGSmxjM1ZzZENCdlppQmhiR3dnYldWeVoyVWdjSEp2Y0dWeWRHbGxjMXh1SUNvdlhHNW1kVzVqZEdsdmJpQnRaWEpuWlNndktpQnZZbW94TENCdlltb3lMQ0J2WW1vekxDQXVMaTRnS2k4cElIdGNiaUFnZG1GeUlISmxjM1ZzZENBOUlIdDlPMXh1SUNCbWRXNWpkR2x2YmlCaGMzTnBaMjVXWVd4MVpTaDJZV3dzSUd0bGVTa2dlMXh1SUNBZ0lHbG1JQ2hwYzFCc1lXbHVUMkpxWldOMEtISmxjM1ZzZEZ0clpYbGRLU0FtSmlCcGMxQnNZV2x1VDJKcVpXTjBLSFpoYkNrcElIdGNiaUFnSUNBZ0lISmxjM1ZzZEZ0clpYbGRJRDBnYldWeVoyVW9jbVZ6ZFd4MFcydGxlVjBzSUhaaGJDazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaHBjMUJzWVdsdVQySnFaV04wS0haaGJDa3BJSHRjYmlBZ0lDQWdJSEpsYzNWc2RGdHJaWGxkSUQwZ2JXVnlaMlVvZTMwc0lIWmhiQ2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hwYzBGeWNtRjVLSFpoYkNrcElIdGNiaUFnSUNBZ0lISmxjM1ZzZEZ0clpYbGRJRDBnZG1Gc0xuTnNhV05sS0NrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsYzNWc2RGdHJaWGxkSUQwZ2RtRnNPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd0xDQnNJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhRHNnYVNBOElHdzdJR2tyS3lrZ2UxeHVJQ0FnSUdadmNrVmhZMmdvWVhKbmRXMWxiblJ6VzJsZExDQmhjM05wWjI1V1lXeDFaU2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJSEpsYzNWc2REdGNibjFjYmx4dUx5b3FYRzRnS2lCRmVIUmxibVJ6SUc5aWFtVmpkQ0JoSUdKNUlHMTFkR0ZpYkhrZ1lXUmthVzVuSUhSdklHbDBJSFJvWlNCd2NtOXdaWEowYVdWeklHOW1JRzlpYW1WamRDQmlMbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmhJRlJvWlNCdlltcGxZM1FnZEc4Z1ltVWdaWGgwWlc1a1pXUmNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JpSUZSb1pTQnZZbXBsWTNRZ2RHOGdZMjl3ZVNCd2NtOXdaWEowYVdWeklHWnliMjFjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMGFHbHpRWEpuSUZSb1pTQnZZbXBsWTNRZ2RHOGdZbWx1WkNCbWRXNWpkR2x2YmlCMGIxeHVJQ29nUUhKbGRIVnliaUI3VDJKcVpXTjBmU0JVYUdVZ2NtVnpkV3gwYVc1bklIWmhiSFZsSUc5bUlHOWlhbVZqZENCaFhHNGdLaTljYm1aMWJtTjBhVzl1SUdWNGRHVnVaQ2hoTENCaUxDQjBhR2x6UVhKbktTQjdYRzRnSUdadmNrVmhZMmdvWWl3Z1puVnVZM1JwYjI0Z1lYTnphV2R1Vm1Gc2RXVW9kbUZzTENCclpYa3BJSHRjYmlBZ0lDQnBaaUFvZEdocGMwRnlaeUFtSmlCMGVYQmxiMllnZG1Gc0lEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCaFcydGxlVjBnUFNCaWFXNWtLSFpoYkN3Z2RHaHBjMEZ5WnlrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJR0ZiYTJWNVhTQTlJSFpoYkR0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1SUNCeVpYUjFjbTRnWVR0Y2JuMWNibHh1THlvcVhHNGdLaUJTWlcxdmRtVWdZbmwwWlNCdmNtUmxjaUJ0WVhKclpYSXVJRlJvYVhNZ1kyRjBZMmhsY3lCRlJpQkNRaUJDUmlBb2RHaGxJRlZVUmkwNElFSlBUU2xjYmlBcVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdZMjl1ZEdWdWRDQjNhWFJvSUVKUFRWeHVJQ29nUUhKbGRIVnliaUI3YzNSeWFXNW5mU0JqYjI1MFpXNTBJSFpoYkhWbElIZHBkR2h2ZFhRZ1FrOU5YRzRnS2k5Y2JtWjFibU4wYVc5dUlITjBjbWx3UWs5TktHTnZiblJsYm5RcElIdGNiaUFnYVdZZ0tHTnZiblJsYm5RdVkyaGhja052WkdWQmRDZ3dLU0E5UFQwZ01IaEdSVVpHS1NCN1hHNGdJQ0FnWTI5dWRHVnVkQ0E5SUdOdmJuUmxiblF1YzJ4cFkyVW9NU2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR052Ym5SbGJuUTdYRzU5WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2UxeHVJQ0JwYzBGeWNtRjVPaUJwYzBGeWNtRjVMRnh1SUNCcGMwRnljbUY1UW5WbVptVnlPaUJwYzBGeWNtRjVRblZtWm1WeUxGeHVJQ0JwYzBKMVptWmxjam9nYVhOQ2RXWm1aWElzWEc0Z0lHbHpSbTl5YlVSaGRHRTZJR2x6Um05eWJVUmhkR0VzWEc0Z0lHbHpRWEp5WVhsQ2RXWm1aWEpXYVdWM09pQnBjMEZ5Y21GNVFuVm1abVZ5Vm1sbGR5eGNiaUFnYVhOVGRISnBibWM2SUdselUzUnlhVzVuTEZ4dUlDQnBjMDUxYldKbGNqb2dhWE5PZFcxaVpYSXNYRzRnSUdselQySnFaV04wT2lCcGMwOWlhbVZqZEN4Y2JpQWdhWE5RYkdGcGJrOWlhbVZqZERvZ2FYTlFiR0ZwYms5aWFtVmpkQ3hjYmlBZ2FYTlZibVJsWm1sdVpXUTZJR2x6Vlc1a1pXWnBibVZrTEZ4dUlDQnBjMFJoZEdVNklHbHpSR0YwWlN4Y2JpQWdhWE5HYVd4bE9pQnBjMFpwYkdVc1hHNGdJR2x6UW14dllqb2dhWE5DYkc5aUxGeHVJQ0JwYzBaMWJtTjBhVzl1T2lCcGMwWjFibU4wYVc5dUxGeHVJQ0JwYzFOMGNtVmhiVG9nYVhOVGRISmxZVzBzWEc0Z0lHbHpWVkpNVTJWaGNtTm9VR0Z5WVcxek9pQnBjMVZTVEZObFlYSmphRkJoY21GdGN5eGNiaUFnYVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5ZNklHbHpVM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJMRnh1SUNCbWIzSkZZV05vT2lCbWIzSkZZV05vTEZ4dUlDQnRaWEpuWlRvZ2JXVnlaMlVzWEc0Z0lHVjRkR1Z1WkRvZ1pYaDBaVzVrTEZ4dUlDQjBjbWx0T2lCMGNtbHRMRnh1SUNCemRISnBjRUpQVFRvZ2MzUnlhWEJDVDAxY2JuMDdYRzRpTENJdkx5QnphR2x0SUdadmNpQjFjMmx1WnlCd2NtOWpaWE56SUdsdUlHSnliM2R6WlhKY2JuWmhjaUJ3Y205alpYTnpJRDBnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3ZlR0Y2JseHVMeThnWTJGamFHVmtJR1p5YjIwZ2QyaGhkR1YyWlhJZ1oyeHZZbUZzSUdseklIQnlaWE5sYm5RZ2MyOGdkR2hoZENCMFpYTjBJSEoxYm01bGNuTWdkR2hoZENCemRIVmlJR2wwWEc0dkx5QmtiMjRuZENCaWNtVmhheUIwYUdsdVozTXVJQ0JDZFhRZ2QyVWdibVZsWkNCMGJ5QjNjbUZ3SUdsMElHbHVJR0VnZEhKNUlHTmhkR05vSUdsdUlHTmhjMlVnYVhRZ2FYTmNiaTh2SUhkeVlYQndaV1FnYVc0Z2MzUnlhV04wSUcxdlpHVWdZMjlrWlNCM2FHbGphQ0JrYjJWemJpZDBJR1JsWm1sdVpTQmhibmtnWjJ4dlltRnNjeTRnSUVsMEozTWdhVzV6YVdSbElHRmNiaTh2SUdaMWJtTjBhVzl1SUdKbFkyRjFjMlVnZEhKNUwyTmhkR05vWlhNZ1pHVnZjSFJwYldsNlpTQnBiaUJqWlhKMFlXbHVJR1Z1WjJsdVpYTXVYRzVjYm5aaGNpQmpZV05vWldSVFpYUlVhVzFsYjNWME8xeHVkbUZ5SUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZER0Y2JseHVablZ1WTNScGIyNGdaR1ZtWVhWc2RGTmxkRlJwYlc5MWRDZ3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozTmxkRlJwYldWdmRYUWdhR0Z6SUc1dmRDQmlaV1Z1SUdSbFptbHVaV1FuS1R0Y2JuMWNibVoxYm1OMGFXOXVJR1JsWm1GMWJIUkRiR1ZoY2xScGJXVnZkWFFnS0NrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduWTJ4bFlYSlVhVzFsYjNWMElHaGhjeUJ1YjNRZ1ltVmxiaUJrWldacGJtVmtKeWs3WEc1OVhHNG9ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdjMlYwVkdsdFpXOTFkQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRmphR1ZrVTJWMFZHbHRaVzkxZENBOUlITmxkRlJwYldWdmRYUTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwZ1pHVm1ZWFZzZEZObGRGUnBiVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlJR1JsWm1GMWJIUlRaWFJVYVcxdmRYUTdYRzRnSUNBZ2ZWeHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnWTJ4bFlYSlVhVzFsYjNWMElEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFFnUFNCamJHVmhjbFJwYldWdmRYUTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BTQmtaV1poZFd4MFEyeGxZWEpVYVcxbGIzVjBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJQ0FnSUNCallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BTQmtaV1poZFd4MFEyeGxZWEpVYVcxbGIzVjBPMXh1SUNBZ0lIMWNibjBnS0NrcFhHNW1kVzVqZEdsdmJpQnlkVzVVYVcxbGIzVjBLR1oxYmlrZ2UxeHVJQ0FnSUdsbUlDaGpZV05vWldSVFpYUlVhVzFsYjNWMElEMDlQU0J6WlhSVWFXMWxiM1YwS1NCN1hHNGdJQ0FnSUNBZ0lDOHZibTl5YldGc0lHVnVkbWx5YjIxbGJuUnpJR2x1SUhOaGJtVWdjMmwwZFdGMGFXOXVjMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdjMlYwVkdsdFpXOTFkQ2htZFc0c0lEQXBPMXh1SUNBZ0lIMWNiaUFnSUNBdkx5QnBaaUJ6WlhSVWFXMWxiM1YwSUhkaGMyNG5kQ0JoZG1GcGJHRmliR1VnWW5WMElIZGhjeUJzWVhSMFpYSWdaR1ZtYVc1bFpGeHVJQ0FnSUdsbUlDZ29ZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlQVDBnWkdWbVlYVnNkRk5sZEZScGJXOTFkQ0I4ZkNBaFkyRmphR1ZrVTJWMFZHbHRaVzkxZENrZ0ppWWdjMlYwVkdsdFpXOTFkQ2tnZTF4dUlDQWdJQ0FnSUNCallXTm9aV1JUWlhSVWFXMWxiM1YwSUQwZ2MyVjBWR2x0Wlc5MWREdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlITmxkRlJwYldWdmRYUW9ablZ1TENBd0tUdGNiaUFnSUNCOVhHNGdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdMeThnZDJobGJpQjNhR1Z1SUhOdmJXVmliMlI1SUdoaGN5QnpZM0psZDJWa0lIZHBkR2dnYzJWMFZHbHRaVzkxZENCaWRYUWdibThnU1M1RkxpQnRZV1JrYm1WemMxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1kyRmphR1ZrVTJWMFZHbHRaVzkxZENobWRXNHNJREFwTzF4dUlDQWdJSDBnWTJGMFkyZ29aU2w3WEc0Z0lDQWdJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QlhhR1Z1SUhkbElHRnlaU0JwYmlCSkxrVXVJR0oxZENCMGFHVWdjMk55YVhCMElHaGhjeUJpWldWdUlHVjJZV3hsWkNCemJ5QkpMa1V1SUdSdlpYTnVKM1FnZEhKMWMzUWdkR2hsSUdkc2IySmhiQ0J2WW1wbFkzUWdkMmhsYmlCallXeHNaV1FnYm05eWJXRnNiSGxjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCallXTm9aV1JUWlhSVWFXMWxiM1YwTG1OaGJHd29iblZzYkN3Z1puVnVMQ0F3S1R0Y2JpQWdJQ0FnSUNBZ2ZTQmpZWFJqYUNobEtYdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklITmhiV1VnWVhNZ1lXSnZkbVVnWW5WMElIZG9aVzRnYVhRbmN5QmhJSFpsY25OcGIyNGdiMllnU1M1RkxpQjBhR0YwSUcxMWMzUWdhR0YyWlNCMGFHVWdaMnh2WW1Gc0lHOWlhbVZqZENCbWIzSWdKM1JvYVhNbkxDQm9iM0JtZFd4c2VTQnZkWElnWTI5dWRHVjRkQ0JqYjNKeVpXTjBJRzkwYUdWeWQybHpaU0JwZENCM2FXeHNJSFJvY205M0lHRWdaMnh2WW1Gc0lHVnljbTl5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1kyRmphR1ZrVTJWMFZHbHRaVzkxZEM1allXeHNLSFJvYVhNc0lHWjFiaXdnTUNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOVhHNWNibHh1ZlZ4dVpuVnVZM1JwYjI0Z2NuVnVRMnhsWVhKVWFXMWxiM1YwS0cxaGNtdGxjaWtnZTF4dUlDQWdJR2xtSUNoallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BUMDlJR05zWldGeVZHbHRaVzkxZENrZ2UxeHVJQ0FnSUNBZ0lDQXZMMjV2Y20xaGJDQmxiblpwY205dFpXNTBjeUJwYmlCellXNWxJSE5wZEhWaGRHbHZibk5jYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR05zWldGeVZHbHRaVzkxZENodFlYSnJaWElwTzF4dUlDQWdJSDFjYmlBZ0lDQXZMeUJwWmlCamJHVmhjbFJwYldWdmRYUWdkMkZ6YmlkMElHRjJZV2xzWVdKc1pTQmlkWFFnZDJGeklHeGhkSFJsY2lCa1pXWnBibVZrWEc0Z0lDQWdhV1lnS0NoallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BUMDlJR1JsWm1GMWJIUkRiR1ZoY2xScGJXVnZkWFFnZkh3Z0lXTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDa2dKaVlnWTJ4bFlYSlVhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ0E5SUdOc1pXRnlWR2x0Wlc5MWREdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHTnNaV0Z5VkdsdFpXOTFkQ2h0WVhKclpYSXBPMXh1SUNBZ0lIMWNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0F2THlCM2FHVnVJSGRvWlc0Z2MyOXRaV0p2WkhrZ2FHRnpJSE5qY21WM1pXUWdkMmwwYUNCelpYUlVhVzFsYjNWMElHSjFkQ0J1YnlCSkxrVXVJRzFoWkdSdVpYTnpYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmpZV05vWldSRGJHVmhjbFJwYldWdmRYUW9iV0Z5YTJWeUtUdGNiaUFnSUNCOUlHTmhkR05vSUNobEtYdGNiaUFnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUZkb1pXNGdkMlVnWVhKbElHbHVJRWt1UlM0Z1luVjBJSFJvWlNCelkzSnBjSFFnYUdGeklHSmxaVzRnWlhaaGJHVmtJSE52SUVrdVJTNGdaRzlsYzI0bmRDQWdkSEoxYzNRZ2RHaGxJR2RzYjJKaGJDQnZZbXBsWTNRZ2QyaGxiaUJqWVd4c1pXUWdibTl5YldGc2JIbGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFF1WTJGc2JDaHVkV3hzTENCdFlYSnJaWElwTzF4dUlDQWdJQ0FnSUNCOUlHTmhkR05vSUNobEtYdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklITmhiV1VnWVhNZ1lXSnZkbVVnWW5WMElIZG9aVzRnYVhRbmN5QmhJSFpsY25OcGIyNGdiMllnU1M1RkxpQjBhR0YwSUcxMWMzUWdhR0YyWlNCMGFHVWdaMnh2WW1Gc0lHOWlhbVZqZENCbWIzSWdKM1JvYVhNbkxDQm9iM0JtZFd4c2VTQnZkWElnWTI5dWRHVjRkQ0JqYjNKeVpXTjBJRzkwYUdWeWQybHpaU0JwZENCM2FXeHNJSFJvY205M0lHRWdaMnh2WW1Gc0lHVnljbTl5TGx4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVTI5dFpTQjJaWEp6YVc5dWN5QnZaaUJKTGtVdUlHaGhkbVVnWkdsbVptVnlaVzUwSUhKMWJHVnpJR1p2Y2lCamJHVmhjbFJwYldWdmRYUWdkbk1nYzJWMFZHbHRaVzkxZEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDNWpZV3hzS0hSb2FYTXNJRzFoY210bGNpazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmx4dVhHNTlYRzUyWVhJZ2NYVmxkV1VnUFNCYlhUdGNiblpoY2lCa2NtRnBibWx1WnlBOUlHWmhiSE5sTzF4dWRtRnlJR04xY25KbGJuUlJkV1YxWlR0Y2JuWmhjaUJ4ZFdWMVpVbHVaR1Y0SUQwZ0xURTdYRzVjYm1aMWJtTjBhVzl1SUdOc1pXRnVWWEJPWlhoMFZHbGpheWdwSUh0Y2JpQWdJQ0JwWmlBb0lXUnlZV2x1YVc1bklIeDhJQ0ZqZFhKeVpXNTBVWFZsZFdVcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0JrY21GcGJtbHVaeUE5SUdaaGJITmxPMXh1SUNBZ0lHbG1JQ2hqZFhKeVpXNTBVWFZsZFdVdWJHVnVaM1JvS1NCN1hHNGdJQ0FnSUNBZ0lIRjFaWFZsSUQwZ1kzVnljbVZ1ZEZGMVpYVmxMbU52Ym1OaGRDaHhkV1YxWlNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnY1hWbGRXVkpibVJsZUNBOUlDMHhPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9jWFZsZFdVdWJHVnVaM1JvS1NCN1hHNGdJQ0FnSUNBZ0lHUnlZV2x1VVhWbGRXVW9LVHRjYmlBZ0lDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlHUnlZV2x1VVhWbGRXVW9LU0I3WEc0Z0lDQWdhV1lnS0dSeVlXbHVhVzVuS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdkbUZ5SUhScGJXVnZkWFFnUFNCeWRXNVVhVzFsYjNWMEtHTnNaV0Z1VlhCT1pYaDBWR2xqYXlrN1hHNGdJQ0FnWkhKaGFXNXBibWNnUFNCMGNuVmxPMXh1WEc0Z0lDQWdkbUZ5SUd4bGJpQTlJSEYxWlhWbExteGxibWQwYUR0Y2JpQWdJQ0IzYUdsc1pTaHNaVzRwSUh0Y2JpQWdJQ0FnSUNBZ1kzVnljbVZ1ZEZGMVpYVmxJRDBnY1hWbGRXVTdYRzRnSUNBZ0lDQWdJSEYxWlhWbElEMGdXMTA3WEc0Z0lDQWdJQ0FnSUhkb2FXeGxJQ2dySzNGMVpYVmxTVzVrWlhnZ1BDQnNaVzRwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoamRYSnlaVzUwVVhWbGRXVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBVWFZsZFdWYmNYVmxkV1ZKYm1SbGVGMHVjblZ1S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2NYVmxkV1ZKYm1SbGVDQTlJQzB4TzF4dUlDQWdJQ0FnSUNCc1pXNGdQU0J4ZFdWMVpTNXNaVzVuZEdnN1hHNGdJQ0FnZlZ4dUlDQWdJR04xY25KbGJuUlJkV1YxWlNBOUlHNTFiR3c3WEc0Z0lDQWdaSEpoYVc1cGJtY2dQU0JtWVd4elpUdGNiaUFnSUNCeWRXNURiR1ZoY2xScGJXVnZkWFFvZEdsdFpXOTFkQ2s3WEc1OVhHNWNibkJ5YjJObGMzTXVibVY0ZEZScFkyc2dQU0JtZFc1amRHbHZiaUFvWm5WdUtTQjdYRzRnSUNBZ2RtRnlJR0Z5WjNNZ1BTQnVaWGNnUVhKeVlYa29ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQXRJREVwTzF4dUlDQWdJR2xtSUNoaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z01Ta2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Uc2dhU0E4SUdGeVozVnRaVzUwY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1lYSm5jMXRwSUMwZ01WMGdQU0JoY21kMWJXVnVkSE5iYVYwN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJQ0FnY1hWbGRXVXVjSFZ6YUNodVpYY2dTWFJsYlNobWRXNHNJR0Z5WjNNcEtUdGNiaUFnSUNCcFppQW9jWFZsZFdVdWJHVnVaM1JvSUQwOVBTQXhJQ1ltSUNGa2NtRnBibWx1WnlrZ2UxeHVJQ0FnSUNBZ0lDQnlkVzVVYVcxbGIzVjBLR1J5WVdsdVVYVmxkV1VwTzF4dUlDQWdJSDFjYm4wN1hHNWNiaTh2SUhZNElHeHBhMlZ6SUhCeVpXUnBZM1JwWW14bElHOWlhbVZqZEhOY2JtWjFibU4wYVc5dUlFbDBaVzBvWm5WdUxDQmhjbkpoZVNrZ2UxeHVJQ0FnSUhSb2FYTXVablZ1SUQwZ1puVnVPMXh1SUNBZ0lIUm9hWE11WVhKeVlYa2dQU0JoY25KaGVUdGNibjFjYmtsMFpXMHVjSEp2ZEc5MGVYQmxMbkoxYmlBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQjBhR2x6TG1aMWJpNWhjSEJzZVNodWRXeHNMQ0IwYUdsekxtRnljbUY1S1R0Y2JuMDdYRzV3Y205alpYTnpMblJwZEd4bElEMGdKMkp5YjNkelpYSW5PMXh1Y0hKdlkyVnpjeTVpY205M2MyVnlJRDBnZEhKMVpUdGNibkJ5YjJObGMzTXVaVzUySUQwZ2UzMDdYRzV3Y205alpYTnpMbUZ5WjNZZ1BTQmJYVHRjYm5CeWIyTmxjM011ZG1WeWMybHZiaUE5SUNjbk95QXZMeUJsYlhCMGVTQnpkSEpwYm1jZ2RHOGdZWFp2YVdRZ2NtVm5aWGh3SUdsemMzVmxjMXh1Y0hKdlkyVnpjeTUyWlhKemFXOXVjeUE5SUh0OU8xeHVYRzVtZFc1amRHbHZiaUJ1YjI5d0tDa2dlMzFjYmx4dWNISnZZMlZ6Y3k1dmJpQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtRmtaRXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXViMjVqWlNBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG05bVppQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuSmxiVzkyWlV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y21WdGIzWmxRV3hzVEdsemRHVnVaWEp6SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011WlcxcGRDQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuQnlaWEJsYm1STWFYTjBaVzVsY2lBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG5CeVpYQmxibVJQYm1ObFRHbHpkR1Z1WlhJZ1BTQnViMjl3TzF4dVhHNXdjbTlqWlhOekxteHBjM1JsYm1WeWN5QTlJR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdJSEpsZEhWeWJpQmJYU0I5WEc1Y2JuQnliMk5sYzNNdVltbHVaR2x1WnlBOUlHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbUpwYm1ScGJtY2dhWE1nYm05MElITjFjSEJ2Y25SbFpDY3BPMXh1ZlR0Y2JseHVjSEp2WTJWemN5NWpkMlFnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQW5MeWNnZlR0Y2JuQnliMk5sYzNNdVkyaGthWElnUFNCbWRXNWpkR2x2YmlBb1pHbHlLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtTm9aR2x5SUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FuS1R0Y2JuMDdYRzV3Y205alpYTnpMblZ0WVhOcklEMGdablZ1WTNScGIyNG9LU0I3SUhKbGRIVnliaUF3T3lCOU8xeHVJaXdpYVcxd2IzSjBJSHNnUTI5dGNHOXVaVzUwSUgwZ1puSnZiU0FuTGk5dGIyUmxiSE12UTI5dGNHOXVaVzUwSnp0Y2NseHVhVzF3YjNKMElIdGNjbHh1SUNCdWIyUmxUR2x6ZEN4Y2NseHVJQ0JuWlhSVFpXTjBhVzl1Y3l4Y2NseHVJQ0JuWlhSRFlYSmtjeXhjY2x4dUlDQm5aWFJOWlc1MVNYUmxiWE1zWEhKY2JuMGdabkp2YlNBbkxpOTJhV1YzY3k5RVQwMUZiR1Z0Wlc1MGN5YzdYSEpjYm1sdGNHOXlkQ0I3SUdkbGRGTnJaV3hsZEc5dUxDQnlaVzVrWlhJZ2ZTQm1jbTl0SUNjdUwzWnBaWGR6TDNOclpXeGxkRzl1Snp0Y2NseHVhVzF3YjNKMElITmxjblpwWTJVZ1puSnZiU0FuTGk5elpYSjJhV05sY3k5eVpYTnZkWEpqWlhNbk8xeHlYRzVwYlhCdmNuUWdleUJvWVc1a2JHVlBkbVZ5YkdGNUxDQm9ZVzVrYkdWTlpXNTFJQ3dnYUdsa1pVMWxiblY5SUdaeWIyMGdKeTR2ZG1sbGQzTXZhR0Z1Wkd4bFRXVnVkU2M3WEhKY2JtbHRjRzl5ZENCN0lITmpjbTlzYkVoaGJtUnNaWElnZlNCbWNtOXRJQ2N1TDNacFpYZHpMM05qY205c2JGUnZKenRjY2x4dWFXMXdiM0owSUhzZ2NtVnphWHBsSUgwZ1puSnZiU0FuTGk5MmFXVjNjeTl5WlhOcGVtVW5PMXh5WEc1Y2NseHVZMjl1YzNRZ1lYQndJRDBnS0daMWJtTjBhVzl1SUNncElIdGNjbHh1SUNBdkwxeHlYRzRnSUM4dklGWmhjbWxoWW14bGMxeHlYRzRnSUM4dlhISmNiaUFnYkdWMElITmxkSFJwYm1kek8xeHlYRzRnSUZ4eVhHNGdJR052Ym5OMElIUm9ZWFFnUFNCN2ZUdGNjbHh1SUNCamIyNXpkQ0JrWldaaGRXeDBjeUE5SUh0Y2NseHVJQ0FnSUhObGJHVmpkRzl5Y3pvZ2UxeHlYRzRnSUNBZ0lDQnRaVzUxU1hSbGJYTkhjbTkxY0RvZ0p5TnNaV1owWDIxbGJuVmZhWFJsYlhNbkxGeHlYRzRnSUNBZ0lDQnpaV04wYVc5dWMwZHliM1Z3T2lBbkkzTmxZM1JwYjI1ZlozSnZkWEJ6Snl4Y2NseHVJQ0FnSUgwc1hISmNiaUFnSUNCamJHRnpjMlZ6T2lCN1hISmNiaUFnSUNBZ0lHVnVkR1Z5Ukc5dVpUb2dKMnhsWm5SZmJXVnVkVjl2ZG1WeWJHRjVJR3hsWm5SZmJXVnVkVjl2ZG1WeWJHRjVMV1Z1ZEdWeUxXUnZibVVuTEZ4eVhHNGdJQ0FnSUNCbGVHbDBSRzl1WlRvZ0oyeGxablJmYldWdWRWOXZkbVZ5YkdGNUlHeGxablJmYldWdWRWOXZkbVZ5YkdGNUxXVjRhWFF0Wkc5dVpTY3NYSEpjYmlBZ0lDQWdJR3hsWm5STlpXNTFVMmh2ZHpvZ0oyeGxablJmYldWdWRWOXphRzkzSnl4Y2NseHVJQ0FnSUNBZ2JHVm1kRTFsYm5WSWFXUmtaVzQ2SUNkc1pXWjBYMjFsYm5WZmFHbGtaR1Z1SjF4eVhHNGdJQ0FnZlN4Y2NseHVJQ0FnSUhKbGMyOTFjbU5sY3pvZ1cxMHNYSEpjYmlBZ0lDQmpZV3hzWW1GamF6b2dablZ1WTNScGIyNGdLR052Ym5SbGJuUXBJSHRjY2x4dUlDQWdJQ0FnY21WMGRYSnVJR052Ym5SbGJuUTdYSEpjYmlBZ0lDQjlMRnh5WEc0Z0lIMDdYSEpjYmx4eVhHNGdJQzh2WEhKY2JpQWdMeThnVFdWMGFHOWtjMXh5WEc0Z0lDOHZYSEpjYmlBZ1hISmNiaUFnWTI5dWMzUWdkVzVwY1hWbFFYSnlZWGtnUFNCbWRXNWpkR2x2YmlBb1lYSnlLU0I3WEhKY2JpQWdJQ0J5WlhSMWNtNGdZWEp5TG1acGJIUmxjaWdvZG1Gc2RXVXNJR2x1WkdWNExDQnpaV3htS1NBOVBpQnpaV3htTG1sdVpHVjRUMllvZG1Gc2RXVXBJRDA5UFNCcGJtUmxlQ2s3WEhKY2JpQWdmVHRjY2x4dVhISmNiaUFnWTI5dWMzUWdkVzVwY1hWbFVtVnpiM1Z5WTJWeklEMGdablZ1WTNScGIyNGdLR05oZEdWbmIzSjVLU0I3WEhKY2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLSEpsYzI5MWNtTmxjeWtnZTF4eVhHNGdJQ0FnSUNCeVpYUjFjbTRnY21WemIzVnlZMlZ6TG1acGJIUmxjaWhjY2x4dUlDQWdJQ0FnSUNBb2NtVnpiM1Z5WTJVcElEMCtJSEpsYzI5MWNtTmxMbU5oZEdWbmIzSjVMblJ5YVcwb0tTQTlQVDBnWTJGMFpXZHZjbmxjY2x4dUlDQWdJQ0FnS1R0Y2NseHVJQ0FnSUgwN1hISmNiaUFnZlR0Y2NseHVYSEpjYmlBZ0x5b3FYSEpjYmlBZ0lDb2dYSEpjYmlBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITmxiR1ZqZEc5eUlGUm9aU0J6Wld4bFkzUnZjaUJtYjNJZ2RHaGxJR052Ym5SbGJuUWdjR0Z5Wlc1MElHVnNaVzFsYm5SY2NseHVJQ0FnS2lCQWNHRnlZVzBnZTBGeWNtRjVmU0J5WlhOdmRYSmpaWE1nVkdobElHUmhkR0VnWm05eUlIUm9aU0JqYjI1MFpXNTBJR2wwWlcxelhISmNiaUFnSUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2RHVnRjR3hoZEdVZ1ZHaGxJR1oxYm1OMGFXOXVJSEpsYm1SbGNpQlZTVnh5WEc0Z0lDQXFMMXh5WEc0Z0lHTnZibk4wSUhKbGJtUmxja052Ym5SbGJuUWdQU0JtZFc1amRHbHZiaWh6Wld4bFkzUnZjaXdnY21WemIzVnlZMlZ6TENCMFpXMXdiR0YwWlNrZ2UxeHlYRzRnSUNBZ2NtVjBkWEp1SUc1bGR5QkRiMjF3YjI1bGJuUW9jMlZzWldOMGIzSXNJSHRjY2x4dUlDQWdJQ0FnY21WemIzVnlZMlZ6T2lCeVpYTnZkWEpqWlhNc1hISmNiaUFnSUNBZ0lIUmxiWEJzWVhSbE9pQjBaVzF3YkdGMFpTeGNjbHh1SUNBZ0lIMHBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdZMjl1YzNRZ1pHVnpkRzl5ZVNBOUlHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdMeThnVFdGclpTQnpkWEpsSUhSb1pTQndiSFZuYVc0Z2FHRnpJR0psWlc0Z2FXNXBkR2xoYkdsNlpXUmNjbHh1SUNBZ0lHbG1JQ2doYzJWMGRHbHVaM01wSUhKbGRIVnlianRjY2x4dVhISmNiaUFnSUNBdkx5QlNaVzF2ZG1VZ2RHaGxJSFJoWW14bElHOW1JR052Ym5SbGJuUnpYSEpjYmlBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXNaV1owVFdWdWRVbDBaVzF6TG1sdWJtVnlTRlJOVENBOUlDY25PMXh5WEc0Z0lDQWdjMlYwZEdsdVozTXVibTlrWlV4cGMzUXVjMlZqZEdsdmJuTkpkR1Z0Y3k1cGJtNWxja2hVVFV3Z1BTQW5KenRjY2x4dVhISmNiaUFnSUNBdkx5QlNaWE5sZENCMllYSnBZV0pzWlhOY2NseHVJQ0FnSUhObGRIUnBibWR6SUQwZ2JuVnNiRHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJR052Ym5OMElHbHVhWFFnUFNCbWRXNWpkR2x2YmlBb2IzQjBhVzl1Y3lrZ2UxeHlYRzRnSUNBZ0x5OGdSR1Z6ZEc5eWVTQjBhR1VnWTNWeWNtVnVkQ0JwYm1sMGFXRnNhWHBoZEdsdmJseHlYRzRnSUNBZ1pHVnpkRzl5ZVNncE8xeHlYRzVjY2x4dUlDQWdJRzl3ZEdsdmJuTWdQU0J2Y0hScGIyNXpJSHg4SUh0OU8xeHlYRzVjY2x4dUlDQWdJQzh2SUUxbGNtZGxJR0p2ZEdnZ2RYTmxjaUJrWldaaGRXeDBjeUJoYm1RZ2IzQjBhVzl1Y3k1Y2NseHVJQ0FnSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcE8xeHlYRzVjY2x4dUlDQWdJQzh2SUVkbGRDQmhiR3dnWTJGMFpXZHZjbWxsY3lCdlppQjBhR1VnY21WemIzVnlZMlZ6WEhKY2JpQWdJQ0JqYjI1emRDQmpZWFJsWjI5eWFXVnpJRDBnZFc1cGNYVmxRWEp5WVhrb1hISmNiaUFnSUNBZ0lITmxkSFJwYm1kekxuSmxjMjkxY21ObGN5NXRZWEFvS0hKbGMyOTFjbU5sS1NBOVBpQnlaWE52ZFhKalpTNWpZWFJsWjI5eWVTbGNjbHh1SUNBZ0lDazdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1IyVjBJR0ZzYkNCcGRHVnRjeUJ2WmlCc1pXWjBJRzFsYm5VZ2FYUmxiWE1nZEdobGJpQmhjSEJsYm1RZ2FYUWdkRzhnWkc5amRXMWxiblJjY2x4dUlDQWdJSEpsYm1SbGNrTnZiblJsYm5Rb2MyVjBkR2x1WjNNdWMyVnNaV04wYjNKekxtMWxiblZKZEdWdGMwZHliM1Z3TENCallYUmxaMjl5YVdWekxDQm5aWFJOWlc1MVNYUmxiWE1wTG5KbGJtUmxjaWdwTzF4eVhHNWNjbHh1SUNBZ0lDOHZJRWRsZENCaGJHd2djMlZqZEdsdmJuTWdiMllnYldGcGJpQmpiMjUwWlc1MFhISmNiaUFnSUNCeVpXNWtaWEpEYjI1MFpXNTBLSE5sZEhScGJtZHpMbk5sYkdWamRHOXljeTV6WldOMGFXOXVjMGR5YjNWd0xDQmpZWFJsWjI5eWFXVnpMQ0JuWlhSVFpXTjBhVzl1Y3lrdWNtVnVaR1Z5S0NrN1hISmNibHh5WEc0Z0lDQWdMeThnVW1WdVpHVnlJSFJvWlNCcGRHVnRjeUJwYm5SdklHRWdkVzVwY1hWbElITmxZM1JwYjI0Z2FXUmNjbHh1SUNBZ0lHTmhkR1ZuYjNKcFpYTXVabTl5UldGamFDZ29ZMkYwWldkdmNua3BJRDArSUh0Y2NseHVJQ0FnSUNBZ1kyOXVjM1FnYzJWc1pXTjBiM0lnUFNCZ0l5UjdZMkYwWldkdmNubDlJQzVuY205MWNGOXBkR1Z0YzJBN1hISmNibHh5WEc0Z0lDQWdJQ0F2THlCSFpYUWdjbVZ6YjNWeVkyVnpJRzltSUhSb1pTQnpZVzFsSUdOaGRHVm5iM0o1WEhKY2JpQWdJQ0FnSUM4dklFWnZjaUJsZUdGdGNHeGxPaUJJVkUxTTQ0Q0JTbUYyWVhOamNtbHdkT09BZ1ZSdmIyeHo0NENCY0c5a1kyRnpkRnh5WEc0Z0lDQWdJQ0JqYjI1emRDQnlaWE52ZFhKalpYTWdQU0IxYm1seGRXVlNaWE52ZFhKalpYTW9ZMkYwWldkdmNua3BLSE5sZEhScGJtZHpMbkpsYzI5MWNtTmxjeWs3WEhKY2JpQWdJQ0FnSUhKbGJtUmxja052Ym5SbGJuUW9jMlZzWldOMGIzSXNJSEpsYzI5MWNtTmxjeXdnWjJWMFEyRnlaSE1wTG5KbGJtUmxjaWdwTzF4eVhHNGdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdMeThnVTJOeWIyeHNJSFJ2SUhSb1pTQnpjR1ZqYVdacFpXUWdZMkYwWldkdmNua2dZbmtnWTJ4cFkydHBibWNnZEdobElHMWxiblZjY2x4dUlDQWdJR052Ym5OMElITmpjbTlzYkZSdklEMGdLR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXBJSHRjY2x4dUlDQWdJQ0FnWTI5dWMzUWdhWFJsYlhNZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0tDY3ViR1ZtZEY5dFpXNTFYMmwwWlcwbktWeHlYRzRnSUNBZ0lDQmpiMjV6ZENCc2FXNXJjeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1c1pXWjBYMjFsYm5WZmFYUmxiU0JoSnlrN1hISmNibHh5WEc0Z0lDQWdJQ0JtYjNJZ0tHeGxkQ0JzYVc1cklHOW1JR3hwYm10ektTQjdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHeHBibXN1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0J6WTNKdmJHeElZVzVrYkdWeUtHOW1abk5sZENrcE8xeHlYRzRnSUNBZ0lDQWdJR3hwYm1zdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblkyeHBZMnNuTENCbWRXNWpkR2x2YmlncElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUZzdUxpNXBkR1Z0YzEwdVptOXlSV0ZqYUNocGRHVnRJRDArSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHbDBaVzB1WTJ4aGMzTk1hWE4wTG1OdmJuUmhhVzV6S0NkamRYSnlaVzUwSnlrcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQnBkR1Z0TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjJOMWNuSmxiblFuS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnSUNBZ0lDQWdmU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQmNjbHh1SUNBZ0lDQWdJQ0FnSUd4cGJtc3VjR0Z5Wlc1MFJXeGxiV1Z1ZEM1amJHRnpjMHhwYzNRdVlXUmtLQ2RqZFhKeVpXNTBKeWs3WEhKY2JpQWdJQ0FnSUNBZ2ZTbGNjbHh1SUNBZ0lDQWdmVnh5WEc0Z0lDQWdmU2tvTnpZcE8xeHlYRzVjY2x4dVhISmNiaUFnSUNBdkx5QlRhRzkzSUc5eUlHaHBaR1VnZEdobElHeGxablFnYldWdWRTQmllU0J5WlhOcGVtbHVaeUIwYUdVZ2MybDZaU0J2WmlCa2IyTjFiV1Z1ZEM1a2IyTjFiV1Z1ZEVWc1pXMWxiblF1WTJ4cFpXNTBWMmxrZEdoY2NseHVJQ0FnSUdoaGJtUnNaVTFsYm5Vb2JtOWtaVXhwYzNRc0lITmxkSFJwYm1kekxtTnNZWE56WlhNcEtDazdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1VtVnphWHBsSUhSb1pTQjNhV1IwYUNCdlppQnNaV1owWDIxbGJuVWdZVzVrSUcxaGFXNWZZMjl1ZEdWdWRGeHlYRzRnSUNBZ2NtVnphWHBsTG1sdWFYUnBZV3hwZW1Vb2V5QnViMlJsVEdsemREb2dibTlrWlV4cGMzUWdmU2s3WEhKY2JseHlYRzRnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjNKbGMybDZaU2NzSUdoaGJtUnNaVTFsYm5Vb2JtOWtaVXhwYzNRc0lITmxkSFJwYm1kekxtTnNZWE56WlhNcEtUdGNjbHh1SUNBZ0lHNXZaR1ZNYVhOMExteGxablJEYjI1MGNtOXNUV1Z1ZFM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdoaGJtUnNaVTkyWlhKc1lYa29ibTlrWlV4cGMzUXNJSE5sZEhScGJtZHpMbU5zWVhOelpYTXBLVHRjY2x4dUlDQWdJRzV2WkdWTWFYTjBMbXhsWm5STlpXNTFUM1psY214aGVTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lHaGhibVJzWlU5MlpYSnNZWGtvYm05a1pVeHBjM1FzSUhObGRIUnBibWR6TG1Oc1lYTnpaWE1wS1R0Y2NseHVYSEpjYmlBZ0lDQnViMlJsVEdsemRDNXNaV1owVFdWdWRTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lHWjFibU4wYVc5dUtDa2dlMXh5WEc0Z0lDQWdJQ0JwWmlBb2JtOWtaVXhwYzNRdWFIUnRiQzVqYkdsbGJuUlhhV1IwYUNBOElEYzFNQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lHaHBaR1ZOWlc1MUtHNXZaR1ZNYVhOMExDQnpaWFIwYVc1bmN5NWpiR0Z6YzJWektUdGNjbHh1SUNBZ0lDQWdmVnh5WEc0Z0lDQWdmU2s3WEhKY2JpQWdJQ0JjY2x4dUlDQWdJRzV2WkdWTWFYTjBMbXhsWm5STlpXNTFMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMjF2ZFhObFpHOTNiaWNzSUdaMWJtTjBhVzl1SUNobGRtVnVkQ2tnZTF4eVhHNGdJQ0FnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hISmNiaUFnSUNCOUtUdGNjbHh1SUNCOU8xeHlYRzVjY2x4dUlDQXZMMXh5WEc0Z0lDOHZJRWx1YVhSeklDWWdSWFpsYm5SelhISmNiaUFnTHk5Y2NseHVYSEpjYmlBZ0x5OGdVbVZ1WkdWeUlIUm9aU0J6YTJWc1pYUnZiaUJ6WTNKbFpXNGdZbVZtYjNKbElHZGxkSFJwYm1jZ2RHaGxJSEpsYzI5MWNtTmxjeUJtY205dElITmxjblpsY2x4eVhHNGdJSEpsYm1SbGNpaGtaV1poZFd4MGN5NXpaV3hsWTNSdmNuTXVjMlZqZEdsdmJuTkhjbTkxY0N3Z1oyVjBVMnRsYkdWMGIyNHBPMXh5WEc1Y2NseHVJQ0F2THlCSFpYUWdjbVZ6YjNWeVkyVnpJR1p5YjIwZ2RHaGxJSE5sY25acFkyVWdjMmxrWlZ4eVhHNGdJSE5sY25acFkyVXVaMlYwUVd4c0tDa3VkR2hsYmlnb2NtVnpiM1Z5WTJWektTQTlQaUI3WEhKY2JpQWdJQ0JwYm1sMEtISmxjMjkxY21ObGN5azdYSEpjYmlBZ2ZTazdYSEpjYmx4eVhHNGdJSFJvWVhRdWFXNXBkQ0E5SUdsdWFYUTdYSEpjYmlBZ2RHaGhkQzVrWlhOMGIzSjVJRDBnWkdWemRHOXllVHRjY2x4dUlDQmNjbHh1SUNCeVpYUjFjbTRnZEdoaGREdGNjbHh1ZlNrb0tUdGNjbHh1SWl3aVJuVnVZM1JwYjI0dWNISnZkRzkwZVhCbExtMWxkR2h2WkNBOUlHWjFibU4wYVc5dUtHNWhiV1VzSUdaMWJtTXBJSHRjY2x4dUlDQnBaaUFvZEdocGN5NXdjbTkwYjNSNWNHVmJibUZ0WlYwcElISmxkSFZ5Ymp0Y2NseHVJQ0IwYUdsekxuQnliM1J2ZEhsd1pWdHVZVzFsWFNBOUlHWjFibU03WEhKY2JpQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JuMWNjbHh1WEhKY2JtVjRjRzl5ZENCamIyNXpkQ0JEYjIxd2IyNWxiblFnUFNBb1puVnVZM1JwYjI0b0tTQjdYSEpjYmx4eVhHNGdJQzhxS2x4eVhHNGdJQ0FxSUZ4eVhHNGdJQ0FxSUVCd1lYSmhiU0I3VTNSeWFXNW5mU0J6Wld4bFkzUnZjaUJVYUdVZ2MyVnNaV04wYjNJZ1ptOXlJSFJvWlNCMFlXSnNaU0J2WmlCamIyNTBaVzUwY3lCMFlYSm5aWFJjY2x4dUlDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdiM0IwYVc5dWN5QlZjMlZ5SUc5d2RHbHZibk1nWEhKY2JpQWdJQ292WEhKY2JpQWdkbUZ5SUVOdmJuTjBjblZqZEc5eUlEMGdablZ1WTNScGIyNG9jMlZzWldOMGIzSXNJRzl3ZEdsdmJuTXBJSHRjY2x4dUlDQWdJSFJvYVhNdWMyVnNaV04wYjNJZ1BTQnpaV3hsWTNSdmNqdGNjbHh1SUNBZ0lIUm9hWE11Y21WemIzVnlZMlZ6SUQwZ2IzQjBhVzl1Y3k1eVpYTnZkWEpqWlhNN1hISmNiaUFnSUNCMGFHbHpMblJsYlhCc1lYUmxJRDBnYjNCMGFXOXVjeTUwWlcxd2JHRjBaVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJRU52Ym5OMGNuVmpkRzl5TG0xbGRHaHZaQ2duY21WdVpHVnlKeXdnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNCamIyNXpkQ0IwWVhKblpYUWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtIUm9hWE11YzJWc1pXTjBiM0lwTzF4eVhHNGdJQ0FnYVdZZ0tDRjBZWEpuWlhRcElISmxkSFZ5Ymp0Y2NseHVJQ0FnSUhSaGNtZGxkQzVwYm01bGNraFVUVXdnUFNCMGFHbHpMbWhoYm1Sc1pWUmxiWEJzWVhSbEtIUm9hWE11Y21WemIzVnlZMlZ6S1R0Y2NseHVJQ0I5S1Z4eVhHNWNjbHh1SUNCRGIyNXpkSEoxWTNSdmNpNXRaWFJvYjJRb0oyaGhibVJzWlZSbGJYQnNZWFJsSnl3Z1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ0lDQnBaaUFvZEdocGN5NXlaWE52ZFhKalpYTXViR1Z1WjNSb0lEd2dNU2tnY21WMGRYSnVPMXh5WEc1Y2NseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuSmxjMjkxY21ObGMxeHlYRzRnSUNBZ0lDQXViV0Z3S0hKbGMyOTFjbU5sSUQwK0lIUm9hWE11ZEdWdGNHeGhkR1VvY21WemIzVnlZMlVwS1Z4eVhHNGdJQ0FnSUNBdWFtOXBiaWduSnlsY2NseHVJQ0I5S1Z4eVhHNWNjbHh1SUNCRGIyNXpkSEoxWTNSdmNpNXRaWFJvYjJRb0ozTmxkRVJoZEdFbkxDQm1kVzVqZEdsdmJpaHZZbW9wSUh0Y2NseHVJQ0FnSUdadmNpQW9iR1YwSUd0bGVTQnBiaUJ2WW1vcElIdGNjbHh1SUNBZ0lDQWdhV1lnS0c5aWFpNW9ZWE5QZDI1UWNtOXdaWEowYVdWektHdGxlU2twSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGMyOTFjbU5sY3lBOUlHOWlhbHRyWlhsZE8xeHlYRzRnSUNBZ0lDQjlYSEpjYmlBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NXlaVzVrWlhJb0tUdGNjbHh1SUNCOUtWeHlYRzVjY2x4dUlDQkRiMjV6ZEhKMVkzUnZjaTV0WlhSb2IyUW9KMmRsZEVSaGRHRW5MQ0JtZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0FnSUhKbGRIVnliaUJQWW1wbFkzUXVjR0Z5YzJVb1QySnFaV04wTG5OMGNtbHVaMmxtZVNoMGFHbHpMbkpsYzI5MWNtTmxjeWtwTzF4eVhHNGdJSDBwWEhKY2JseHlYRzRnSUhKbGRIVnliaUJEYjI1emRISjFZM1J2Y2p0Y2NseHVmU2tvS1RzaUxDSnBiWEJ2Y25RZ1lYaHBiM01nWm5KdmJTQW5ZWGhwYjNNbk8xeHlYRzVqYjI1emRDQmlZWE5sVlhKc0lEMGdKeTh1Ym1WMGJHbG1lUzltZFc1amRHbHZibk12WVhCcEwzSmxjMjkxY21ObGN5YzdYSEpjYmx4eVhHNWpiMjV6ZENCblpYUkJiR3dnUFNCbWRXNWpkR2x2YmlncElIdGNjbHh1SUNCamIyNXpkQ0J5WlhGMVpYTjBJRDBnWVhocGIzTXVaMlYwS0dKaGMyVlZjbXdwTzF4eVhHNGdJSEpsZEhWeWJpQnlaWEYxWlhOMExuUm9aVzRvY21WemNHOXVjMlVnUFQ0Z2NtVnpjRzl1YzJVdVpHRjBZU2s3WEhKY2JuMWNjbHh1WEhKY2JtTnZibk4wSUdOeVpXRjBaU0E5SUdaMWJtTjBhVzl1S0c1bGQwOWlhbVZqZENrZ2UxeHlYRzRnSUdOdmJuTjBJSEpsY1hWbGMzUWdQU0JoZUdsdmN5NXdiM04wS0dKaGMyVlZjbXdzSUc1bGQwOWlhbVZqZENrN1hISmNiaUFnY21WMGRYSnVJSEpsY1hWbGMzUXVkR2hsYmloeVpYTndiMjV6WlNBOVBpQnlaWE53YjI1elpTNWtZWFJoS1R0Y2NseHVmVnh5WEc1Y2NseHVZMjl1YzNRZ2RYQmtZWFJsSUQwZ1puVnVZM1JwYjI0b2FXUXNJRzVsZDA5aWFtVmpkQ2tnZTF4eVhHNGdJR052Ym5OMElISmxjWFZsYzNRZ1BTQmhlR2x2Y3k1d2RYUW9ZQ1I3WW1GelpWVnliSDB2Skh0cFpIMWdMQ0J1WlhkUFltcGxZM1FwTzF4eVhHNGdJSEpsZEhWeWJpQnlaWEYxWlhOMExuUm9aVzRvY21WemNHOXVjMlVnUFQ0Z2NtVnpjRzl1YzJVdVpHRjBZU2s3WEhKY2JuMWNjbHh1WEhKY2JtVjRjRzl5ZENCa1pXWmhkV3gwSUhzZ1oyVjBRV3hzTENCamNtVmhkR1VzSUhWd1pHRjBaU0I5TzF4eVhHNGlMQ0psZUhCdmNuUWdZMjl1YzNRZ2JtOWtaVXhwYzNRZ1BTQjdYSEpjYmlBZ2JHVm1kRU52Ym5SeWIyeE5aVzUxT2lCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1YkdWbWRGOWpiMjUwY205c1gyMWxiblVuS1N4Y2NseHVJQ0JzWldaMFRXVnVkVTkyWlhKc1lYazZJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXNaV1owWDIxbGJuVmZiM1psY214aGVTY3BMRnh5WEc0Z0lITmxZM1JwYjI1SmRHVnRjem9nWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25JM05sWTNScGIyNWZaM0p2ZFhCekp5a3NYSEpjYmlBZ2JHVm1kRTFsYm5WSmRHVnRjem9nWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25JMnhsWm5SZmJXVnVkVjlwZEdWdGN5Y3BMRnh5WEc0Z0lHaDBiV3c2SUdSdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQ3hjY2x4dUlDQmliMlI1T2lCa2IyTjFiV1Z1ZEM1aWIyUjVMRnh5WEc0Z0lHeGxablJOWlc1MU9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJHVm1kRjl0Wlc1MUp5a3NYSEpjYmlBZ2NtVnphWHBsU0dGdVpHeGxPaUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VjbVZ6YVhwbFgyaGhibVJzWlNjcExGeHlYRzRnSUcxaGFXNURiMjUwWlc1ME9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJXRnBibDlqYjI1MFpXNTBKeWtzWEhKY2JuMWNjbHh1WEhKY2JpQWdMeThnUjJWdVpYSmhkR1VnWVNCcGRHVnRJRzltSUhSb1pTQnVZWFpwWjJGMGFXOXVYSEpjYm1WNGNHOXlkQ0JqYjI1emRDQm5aWFJOWlc1MVNYUmxiWE1nUFNCallYUmxaMjl5ZVNBOVBpQmdYSEpjYmlBZ1BHeHBJR05zWVhOelBWd2liR1ZtZEY5dFpXNTFYMmwwWlcxY0lqNWNjbHh1SUNBZ0lEeGhJR2h5WldZOVhDSWpKSHRqWVhSbFoyOXllWDFjSWo0Z1hISmNiaUFnSUNBZ0lEeHBiV2NnWTJ4aGMzTTlYQ0p0Wlc1MVgybDBaVzFmYVdOdmJsd2lJSE55WXoxY0lpNHZjM1puTHlSN1kyRjBaV2R2Y25sOUxuTjJaMXdpSUdGc2REMWNJbFJvYVhNZ2FYTWdZU0FrZTJOaGRHVm5iM0o1ZlNCallYUmxaMjl5ZVZ3aVBqd3ZhVzFuUGx4eVhHNGdJQ0FnSUNBOGMzQmhiaUJqYkdGemN6MWNJbTFsYm5WZmFYUmxiVjlqYjI1MFpXNTBYQ0krSkh0allYUmxaMjl5ZVgwOEwzTndZVzQrWEhKY2JpQWdJQ0E4TDJFK1hISmNiaUFnUEM5c2FUNWNjbHh1WUR0Y2NseHVYSEpjYmlBZ0x5OGdSMlZ1WlhKaGRHVWdZU0J6WldOMGFXOXVJRzltSUhSb1pTQnRZV2x1SUdOdmJuUmxiblJjY2x4dVpYaHdiM0owSUdOdmJuTjBJR2RsZEZObFkzUnBiMjV6SUQwZ1kyRjBaV2R2Y25rZ1BUNGdZRnh5WEc0Z0lEeHpaV04wYVc5dUlHbGtQVndpSkh0allYUmxaMjl5ZVgxY0lpQmpiR0Z6Y3oxY0ltZHliM1Z3WENJZ1BseHlYRzRnSUNBZ1BHZ3lJR05zWVhOelBWd2laM0p2ZFhCZmRHbDBiR1ZjSWo0a2UyTmhkR1ZuYjNKNWZUd3ZhREkrWEhKY2JpQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVozSnZkWEJmWTI5dWRHVnVkRndpUGx4eVhHNGdJQ0FnSUNBOGRXd2dZMnhoYzNNOVhDSnliM2NnWjNKdmRYQmZhWFJsYlhOY0lqNDhMM1ZzUGx4eVhHNGdJQ0FnUEM5a2FYWStYSEpjYmlBZ1BDOXpaV04wYVc5dVBpQWdYSEpjYm1BN1hISmNibHh5WEc0Z0lDOHZJRWRsYm1WeVlYUmxJR0VnYkdsemRDQnZaaUIwYUdVZ2MyVmpkR2x2YmlCY2NseHVaWGh3YjNKMElHTnZibk4wSUdkbGRFTmhjbVJ6SUQwZ2NtVnpiM1Z5WTJVZ1BUNGdZRnh5WEc0Z0lEeHNhU0JqYkdGemN6MWNJbWR5YjNWd1gybDBaVzBnWTI5c00xd2lQbHh5WEc0Z0lDQWdQR0VnWTJ4aGMzTTlYQ0puY205MWNGOXBkR1Z0WDJ4cGJtdGNJaUJvY21WbVBWd2lKSHR5WlhOdmRYSmpaUzVvY21WbWZWd2lQbHh5WEc0Z0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aVkyRnlaRndpUGx4eVhHNGdJQ0FnSUNBZ0lEeHBiV2NnWTJ4aGMzTTlYQ0pqWVhKa1gybGpiMjVjSWlCemNtTTlYQ0lrZTNKbGMyOTFjbU5sTG5OeVkzMWNJaUJoYkhROVhDSWtlM0psYzI5MWNtTmxMbk55WXk1eVpYQnNZV05sS0M5Y1hDNWNYQzlwYldkY1hDOHZaeXdnSnljcGZWd2lQbHh5WEc0Z0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmpZWEprWDJKdlpIbGNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lEeG9NeUJqYkdGemN6MWNJbU5oY21SZmRHbDBiR1ZjSWo0a2UzSmxjMjkxY21ObExuUnBkR3hsZlR3dmFETStYSEpjYmlBZ0lDQWdJQ0FnSUNBOGNDQmpiR0Z6Y3oxY0ltTmhjbVJmZEdWNGRGd2lQaVI3Y21WemIzVnlZMlV1WTI5dWRHVnVkSDA4TDNBK1hISmNiaUFnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lEd3ZaR2wyUGx4eVhHNGdJQ0FnUEM5aFBseHlYRzRnSUR3dmJHaytYSEpjYm1BN0lpd2lMeThnVW1Wd2NtVnpaVzUwSUhSb1pTQnNaV1owSUcxbGJuVWdiM0JsYm1sdVp5QnZjaUJqYkc5emFXNW5YSEpjYmk4dklGUnlkV1VnYldWaGJuTWdhWFFuY3lCdmNHVnVhVzVuWEhKY2JteGxkQ0JwYzBGamRHbDJaU0E5SUdaaGJITmxPMXh5WEc1Y2NseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHaHBaR1ZOWlc1MUtHNXZaR1ZzYVhOMExDQmpiR0Z6YzJWektTQjdYSEpjYmlBZ2JtOWtaV3hwYzNRdWFIUnRiQzVqYkdGemMwNWhiV1VnUFNCamJHRnpjMlZ6TG14bFpuUk5aVzUxU0dsa1pHVnVPMXh5WEc0Z0lHNXZaR1ZzYVhOMExteGxablJOWlc1MVQzWmxjbXhoZVM1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzJWekxtVjRhWFJFYjI1bE8xeHlYRzRnSUdselFXTjBhWFpsSUQwZ2RISjFaVHRjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdoaGJtUnNaVTkyWlhKc1lYa2dLRzV2WkdWc2FYTjBMQ0JqYkdGemMyVnpLU0I3WEhKY2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlDZ3BJSHRjY2x4dUlDQWdJR2xtSUNocGMwRmpkR2wyWlNrZ2UxeHlYRzRnSUNBZ0lDQnViMlJsYkdsemRDNW9kRzFzTG1Oc1lYTnpUbUZ0WlNBOUlHTnNZWE56WlhNdWJHVm1kRTFsYm5WVGFHOTNPMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVzWldaMFRXVnVkVTkyWlhKc1lYa3VZMnhoYzNOT1lXMWxJRDBnWTJ4aGMzTmxjeTVsYm5SbGNrUnZibVU3WEhKY2JpQWdJQ0I5SUdWc2MyVWdlMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVvZEcxc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXViR1ZtZEUxbGJuVklhV1JrWlc0N1hISmNiaUFnSUNBZ0lHNXZaR1ZzYVhOMExteGxablJOWlc1MVQzWmxjbXhoZVM1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzJWekxtVjRhWFJFYjI1bE8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJR2x6UVdOMGFYWmxJRDBnSVdselFXTjBhWFpsTzF4eVhHNGdJSDFjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdoaGJtUnNaVTFsYm5Vb2JtOWtaV3hwYzNRc0lHTnNZWE56WlhNcElIdGNjbHh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnSUNCcFppQW9ibTlrWld4cGMzUXVhSFJ0YkM1amJHbGxiblJYYVdSMGFDQThJRGMxTUNrZ2UxeHlYRzRnSUNBZ0lDQm9hV1JsVFdWdWRTaHViMlJsYkdsemRDd2dZMnhoYzNObGN5azdYSEpjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHlYRzRnSUNBZ0lDQnViMlJsYkdsemRDNW9kRzFzTG1Oc1lYTnpUbUZ0WlNBOUlHTnNZWE56WlhNdWJHVm1kRTFsYm5WVGFHOTNPMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVzWldaMFRXVnVkVTkyWlhKc1lYa3VZMnhoYzNOT1lXMWxJRDBnWTJ4aGMzTmxjeTVsYm5SbGNrUnZibVU3WEhKY2JpQWdJQ0FnSUdselFXTjBhWFpsSUQwZ1ptRnNjMlU3WEhKY2JpQWdJQ0I5WEhKY2JpQWdmVnh5WEc1OVhISmNiaUlzSW1WNGNHOXlkQ0JqYjI1emRDQnlaWE5wZW1VZ1BTQW9ablZ1WTNScGIyNG9LU0I3WEhKY2JpQWdiR1YwSUhObGRIUnBibWR6TzF4eVhHNWNjbHh1SUNCamIyNXpkQ0IwYUdGMElEMGdlMzA3SUZ4eVhHNGdJR052Ym5OMElHUmxabUYxYkhSeklEMGdlMXh5WEc0Z0lDQWdjMmw2WlhNNklIdGNjbHh1SUNBZ0lDQWdiV0Y0VjJsa2RHZzZJRFF5TlN4Y2NseHVJQ0FnSUNBZ2JXbHVWMmxrZEdnNklESXdNQ3hjY2x4dUlDQWdJQ0FnZURvZ01qVXdYSEpjYmlBZ0lDQjlMRnh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdMeThnU1c1cGRITWdZVzVrSUVWMlpXNTBjMXh5WEc0Z0lHTnZibk4wSUdsdWFYUnBZV3hwZW1VZ1BTQm1kVzVqZEdsdmJpaHZjSFJwYjI1ektTQjdYSEpjYmlBZ0lDQnZjSFJwYjI1eklEMGdiM0IwYVc5dWN5QjhmQ0I3ZlNCY2NseHVJQ0FnSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEhNc0lHOXdkR2x2Ym5NcE8xeHlYRzVjY2x4dUlDQWdJQzh2SUcxbGRHaHZaSE5jY2x4dUlDQWdJR052Ym5OMElHMXZkbVZCZENBOUlHWjFibU4wYVc5dUtIZ3BJSHRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1YkdWbWRFMWxiblV1YzNSNWJHVXVkMmxrZEdnZ1BTQjRJQ3NnSjNCNEp6dGNjbHh1SUNBZ0lDQWdjMlYwZEdsdVozTXVibTlrWlV4cGMzUXVjbVZ6YVhwbFNHRnVaR3hsTG5OMGVXeGxMbXhsWm5RZ1BTQjRJQ3NnSjNCNEp6dGNjbHh1SUNBZ0lDQWdjMlYwZEdsdVozTXVibTlrWlV4cGMzUXViV0ZwYmtOdmJuUmxiblF1YzNSNWJHVXViV0Z5WjJsdVRHVm1kQ0E5SUhnZ0t5QW5jSGduTzF4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lHTnZibk4wSUc5dVRXOTFjMlZWY0NBOUlHWjFibU4wYVc5dUlHWjFibU1vS1NCN1hISmNiaUFnSUNBZ0lITmxkSFJwYm1kekxtNXZaR1ZNYVhOMExteGxablJOWlc1MUxtTnNZWE56VEdsemRDNXlaVzF2ZG1Vb0ozUnlZVzV6YVhScGIyNWZibTl1WlNjcE8xeHlYRzRnSUNBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXRZV2x1UTI5dWRHVnVkQzVqYkdGemMweHBjM1F1Y21WdGIzWmxLQ2QwY21GdWMybDBhVzl1WDI1dmJtVW5LVHRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1WW05a2VTNWpiR0Z6YzB4cGMzUXVjbVZ0YjNabEtDZHViMTkxYzJWeVgzTmxiR1ZqZEdsdmJpY3BPMXh5WEc0Z0lDQWdJQ0JrYjJOMWJXVnVkQzV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0NkdGIzVnpaVzF2ZG1VbkxDQnZiazF2ZFhObFRXOTJaU2s3WEhKY2JpQWdJQ0FnSUhSb2FYTXVjbVZ0YjNabFJYWmxiblJNYVhOMFpXNWxjaWduYlc5MWMyVjFjQ2NzSUdaMWJtTXBPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUdOdmJuTjBJRzl1VFc5MWMyVk5iM1psSUQwZ1puVnVZM1JwYjI0b1pYWmxiblFwSUh0Y2NseHVJQ0FnSUNBZ1kyOXVjM1FnYkdWbWRFMWxiblZYYVdSMGFDQTlJSEJoY25ObFNXNTBLSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbXhsWm5STlpXNTFMbk4wZVd4bExuZHBaSFJvTENBeE1DazdYSEpjYmlBZ0lDQWdJR2xtSUNoc1pXWjBUV1Z1ZFZkcFpIUm9JRDRnYzJWMGRHbHVaM011YzJsNlpYTXViV0Y0VjJsa2RHZ2dmSHdnYkdWbWRFMWxiblZYYVdSMGFDQThJSE5sZEhScGJtZHpMbk5wZW1WekxtMXBibGRwWkhSb0tTQjdYSEpjYmlBZ0lDQWdJQ0FnWkc5amRXMWxiblF1Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2lnbmJXOTFjMlZ0YjNabEp5d2diMjVOYjNWelpVMXZkbVVwTzF4eVhHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHeGxablJOWlc1MVYybGtkR2dnUEQwZ2MyVjBkR2x1WjNNdWMybDZaWE11YldGNFYybGtkR2dnSmlZZ2JHVm1kRTFsYm5WWGFXUjBhQ0ErUFNCelpYUjBhVzVuY3k1emFYcGxjeTV0YVc1WGFXUjBhQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lITmxkSFJwYm1kekxtNXZaR1ZNYVhOMExteGxablJOWlc1MUxtTnNZWE56VEdsemRDNWhaR1FvSjNSeVlXNXphWFJwYjI1ZmJtOXVaU2NwTzF4eVhHNGdJQ0FnSUNBZ0lITmxkSFJwYm1kekxtNXZaR1ZNYVhOMExtMWhhVzVEYjI1MFpXNTBMbU5zWVhOelRHbHpkQzVoWkdRb0ozUnlZVzV6YVhScGIyNWZibTl1WlNjcE8xeHlYRzRnSUNBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbUp2WkhrdVkyeGhjM05NYVhOMExtRmtaQ2duYm05ZmRYTmxjbDl6Wld4bFkzUnBiMjRuS1R0Y2NseHVJQ0FnSUNBZ0lDQnRiM1psUVhRb1pYWmxiblF1Y0dGblpWZ3BPMXh5WEc0Z0lDQWdJQ0I5WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdWNtVnphWHBsU0dGdVpHeGxMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMjF2ZFhObFpHOTNiaWNzSUdaMWJtTjBhVzl1S0dWMlpXNTBLU0I3WEhKY2JpQWdJQ0FnSUdSdlkzVnRaVzUwTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxdmRYTmxiVzkyWlNjc0lHOXVUVzkxYzJWTmIzWmxLVHRjY2x4dUlDQWdJQ0FnZEdocGN5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHRiM1Z6WlhWd0p5d2diMjVOYjNWelpWVndLVHRjY2x4dVhISmNiaUFnSUNBZ0lIUm9hWE11WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWkhKaFozTjBZWEowSnl3Z1puVnVZM1JwYjI0b1pYWmxiblFwSUh0Y2NseHVJQ0FnSUNBZ0lDQmxkbVZ1ZEM1d2NtVjJaVzUwUkdWbVlYVnNkRHRjY2x4dUlDQWdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdmU2xjY2x4dVhISmNiaUFnSUNCelpYUjBhVzVuY3k1dWIyUmxUR2x6ZEM1eVpYTnBlbVZJWVc1a2JHVXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25aR0pzWTJ4cFkyc25MQ0JtZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0FnSUNBZ2JXOTJaVUYwS0hObGRIUnBibWR6TG5OcGVtVnpMbmdwTzF4eVhHNGdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdMeThnU1c1cGRHbGhiQ0JjY2x4dUlDQWdJRzF2ZG1WQmRDaHpaWFIwYVc1bmN5NXphWHBsY3k1NEtUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lIUm9ZWFF1YVc1cGRHbGhiR2w2WlNBOUlHbHVhWFJwWVd4cGVtVTdYSEpjYmx4eVhHNGdJSEpsZEhWeWJpQjBhR0YwTzF4eVhHNTlLU2dwT3lJc0lpOHFLbHh5WEc0Z0tpQmNjbHh1SUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUc5bVpuTmxkRlJvWlNCb1pXbG5hSFFnYjJZZ1ltOTBhQ0IwYjNCaVlYSWdZVzVrSUdkeWIzVndJR1ZzWlcxbGJuUmNjbHh1SUNvdlhISmNibVY0Y0c5eWRDQmpiMjV6ZENCelkzSnZiR3hJWVc1a2JHVnlJRDBnWm5WdVkzUnBiMjRvYjJabWMyVjBLU0I3WEhKY2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNiaUFnSUNCbGRtVnVkQzV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh5WEc0Z0lDQWdZMjl1YzNRZ2FISmxaaUE5SUhSb2FYTXVaMlYwUVhSMGNtbGlkWFJsS0Nkb2NtVm1KeWs3WEhKY2JpQWdJQ0JqYjI1emRDQnZabVp6WlhSVWIzQWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtHQWtlMmh5WldaOVlDa3ViMlptYzJWMFZHOXdPMXh5WEc0Z0lDQWdjMk55YjJ4c0tIdGNjbHh1SUNBZ0lDQWdkRzl3T2lCdlptWnpaWFJVYjNBZ0xTQnZabVp6WlhRc1hISmNiaUFnSUNBZ0lHSmxhR0YyYVc5eU9pQW5jMjF2YjNSb0oxeHlYRzRnSUNBZ2ZTbGNjbHh1SUNCOVhISmNibjBpTENKamIyNXpkQ0J0WVd0bFNYUmxiWE1nUFNBb0tTQTlQaUI3WEhKY2JpQWdiR1YwSUdsMFpXMXpJRDBnSnljN1hISmNibHh5WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dNakE3SUdrckt5a2dlMXh5WEc0Z0lDQWdhWFJsYlhNZ0t6MGdZRnh5WEc0Z0lDQWdJQ0E4YkdrZ1kyeGhjM005WENKbmNtOTFjRjlwZEdWdElHTnZiRE5jSWo1Y2NseHVJQ0FnSUNBZ0lDQThZU0JqYkdGemN6MWNJbWR5YjNWd1gybDBaVzFmYkdsdWExd2lQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbU5oY21SY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbU5oY21SZmFXTnZiaUJzYjJGa2FXNW5YQ0krUEM5a2FYWStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqWVhKa1gySnZaSGxjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGFEUWdZMnhoYzNNOVhDSmpZWEprWDNScGRHeGxJR3h2WVdScGJtZGNJajQ4TDJnMFBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHdJR05zWVhOelBWd2lZMkZ5WkY5MFpYaDBJR3h2WVdScGJtZGNJajQ4TDNBK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEhKY2JpQWdJQ0FnSUNBZ1BDOWhQbHh5WEc0Z0lDQWdJQ0E4TDJ4cFBseHlYRzRnSUNBZ1lEdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lISmxkSFZ5YmlCcGRHVnRjenRjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdOdmJuTjBJR2RsZEZOclpXeGxkRzl1SUQwZ0tDa2dQVDRnWUZ4eVhHNGdJRHh6WldOMGFXOXVJR05zWVhOelBWd2laM0p2ZFhCY0lpQStYSEpjYmlBZ0lDQThhRE1nWTJ4aGMzTTlYQ0puY205MWNGOTBhWFJzWlNCc2IyRmthVzVuWENJK1BDOW9NejVjY2x4dUlDQWdJRHhrYVhZZ1kyeGhjM005WENKbmNtOTFjRjlqYjI1MFpXNTBYQ0krWEhKY2JpQWdJQ0FnSUR4MWJDQmpiR0Z6Y3oxY0luSnZkeUJuY205MWNGOXBkR1Z0YzF3aVBseHlYRzRnSUNBZ0lDQWdJQ1I3YldGclpVbDBaVzF6S0NsOVhISmNiaUFnSUNBZ0lEd3ZkV3crWEhKY2JpQWdJQ0E4TDJScGRqNWNjbHh1SUNBOEwzTmxZM1JwYjI0K1hISmNibUE3WEhKY2JseHlYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdjbVZ1WkdWeUtITmxiR1ZqZEc5eUxDQjBaVzF3YkdGMFpTa2dlMXh5WEc0Z0lHTnZibk4wSUhSaGNtZGxkQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9jMlZzWldOMGIzSXBPMXh5WEc0Z0lHbG1JQ2doZEdGeVoyVjBLU0J5WlhSMWNtNDdYSEpjYmlBZ2RHRnlaMlYwTG1sdWJtVnlTRlJOVENBOUlIUmxiWEJzWVhSbEtDazdYSEpjYm4waVhTd2ljMjkxY21ObFVtOXZkQ0k2SWlKOSJ9
