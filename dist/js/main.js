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

    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftControlMenu.addEventListener('click', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleOverlay"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenuOverlay.addEventListener('click', Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["handleOverlay"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes));
    
    _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenu.addEventListener('mousedown', function (event) {
      event.preventDefault();
      return false;
    });
  };

  // Hide left menu navigation when user click a menu in mobile devices
  _views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].leftMenuItems.addEventListener('click', function() {
    if (_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"].html.clientWidth < 750) {
      Object(_views_handleMenu__WEBPACK_IMPORTED_MODULE_4__["hideMenu"])(_views_DOMElements__WEBPACK_IMPORTED_MODULE_1__["nodeList"], settings.classes);
    }
  });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kZWxzL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcmVzb3VyY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvaGFuZGxlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvcmVzaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3cy9zY3JvbGxUby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3Mvc2tlbGV0b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjtBQUN2QyxjQUFjLG1CQUFPLENBQUMseUVBQXNCO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXVCO0FBQ25ELG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjtBQUN0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUErQztBQUNzQztBQUM5QjtBQUNaO0FBQzhCO0FBQ3hCO0FBQ1Q7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbENBO0FBQUE7QUFBTztBQUNQOztBQUVBLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsMkI7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPOztBQUVQLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQyxJOzs7Ozs7Ozs7Ozs7QUNqRUQ7QUFBQTtBQUFBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxLQUFLO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2RBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vbW9kZWxzL0NvbXBvbmVudCc7XHJcbmltcG9ydCB7IG5vZGVMaXN0LCBnZXRTZWN0aW9ucywgZ2V0Q2FyZHMsIGdldE1lbnVJdGVtcywgfSBmcm9tICcuL3ZpZXdzL0RPTUVsZW1lbnRzJztcclxuaW1wb3J0IHsgZ2V0U2tlbGV0b24sIHJlbmRlciB9IGZyb20gJy4vdmlld3Mvc2tlbGV0b24nO1xyXG5pbXBvcnQgc2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3Jlc291cmNlcyc7XHJcbmltcG9ydCB7IGhhbmRsZU92ZXJsYXksIGhhbmRsZU1lbnUgLCBoaWRlTWVudX0gZnJvbSAnLi92aWV3cy9oYW5kbGVNZW51JztcclxuaW1wb3J0IHsgc2Nyb2xsSGFuZGxlciB9IGZyb20gJy4vdmlld3Mvc2Nyb2xsVG8nO1xyXG5pbXBvcnQgeyByZXNpemUgfSBmcm9tICcuL3ZpZXdzL3Jlc2l6ZSc7XHJcblxyXG5jb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIC8vXHJcbiAgLy8gVmFyaWFibGVzXHJcbiAgLy9cclxuICBsZXQgc2V0dGluZ3M7XHJcbiAgXHJcbiAgY29uc3QgdGhhdCA9IHt9O1xyXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xyXG4gICAgc2VsZWN0b3JzOiB7XHJcbiAgICAgIG1lbnVJdGVtc0dyb3VwOiAnI2xlZnRfbWVudV9pdGVtcycsXHJcbiAgICAgIHNlY3Rpb25zR3JvdXA6ICcjc2VjdGlvbl9ncm91cHMnLFxyXG4gICAgfSxcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgZW50ZXJEb25lOiAnbGVmdF9tZW51X292ZXJsYXkgbGVmdF9tZW51X292ZXJsYXktZW50ZXItZG9uZScsXHJcbiAgICAgIGV4aXREb25lOiAnbGVmdF9tZW51X292ZXJsYXkgbGVmdF9tZW51X292ZXJsYXktZXhpdC1kb25lJyxcclxuICAgICAgbGVmdE1lbnVTaG93OiAnbGVmdF9tZW51X3Nob3cnLFxyXG4gICAgICBsZWZ0TWVudUhpZGRlbjogJ2xlZnRfbWVudV9oaWRkZW4nXHJcbiAgICB9LFxyXG4gICAgcmVzb3VyY2VzOiBbXSxcclxuICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoY29udGVudCkge1xyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgLy9cclxuICAvLyBNZXRob2RzXHJcbiAgLy9cclxuICBcclxuICBjb25zdCB1bmlxdWVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIHJldHVybiBhcnIuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBjb25zdCB1bmlxdWVSZXNvdXJjZXMgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmVzb3VyY2VzKSB7XHJcbiAgICAgIHJldHVybiByZXNvdXJjZXMuZmlsdGVyKFxyXG4gICAgICAgIChyZXNvdXJjZSkgPT4gcmVzb3VyY2UuY2F0ZWdvcnkudHJpbSgpID09PSBjYXRlZ29yeVxyXG4gICAgICApO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGhlIHNlbGVjdG9yIGZvciB0aGUgY29udGVudCBwYXJlbnQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IHJlc291cmNlcyBUaGUgZGF0YSBmb3IgdGhlIGNvbnRlbnQgaXRlbXNcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0ZW1wbGF0ZSBUaGUgZnVuY3Rpb24gcmVuZGVyIFVJXHJcbiAgICovXHJcbiAgY29uc3QgcmVuZGVyQ29udGVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCByZXNvdXJjZXMsIHRlbXBsYXRlKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbXBvbmVudChzZWxlY3Rvciwge1xyXG4gICAgICByZXNvdXJjZXM6IHJlc291cmNlcyxcclxuICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZXN0b3J5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHBsdWdpbiBoYXMgYmVlbiBpbml0aWFsaXplZFxyXG4gICAgaWYgKCFzZXR0aW5ncykgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgdGFibGUgb2YgY29udGVudHNcclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LmxlZnRNZW51SXRlbXMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBzZXR0aW5ncy5ub2RlTGlzdC5zZWN0aW9uc0l0ZW1zLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIC8vIFJlc2V0IHZhcmlhYmxlc1xyXG4gICAgc2V0dGluZ3MgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAvLyBEZXN0b3J5IHRoZSBjdXJyZW50IGluaXRpYWxpemF0aW9uXHJcbiAgICBkZXN0b3J5KCk7XHJcblxyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gTWVyZ2UgYm90aCB1c2VyIGRlZmF1bHRzIGFuZCBvcHRpb25zLlxyXG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gR2V0IGFsbCBjYXRlZ29yaWVzIG9mIHRoZSByZXNvdXJjZXNcclxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB1bmlxdWVBcnJheShcclxuICAgICAgc2V0dGluZ3MucmVzb3VyY2VzLm1hcCgocmVzb3VyY2UpID0+IHJlc291cmNlLmNhdGVnb3J5KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBHZXQgYWxsIGl0ZW1zIG9mIGxlZnQgbWVudSBpdGVtcyB0aGVuIGFwcGVuZCBpdCB0byBkb2N1bWVudFxyXG4gICAgcmVuZGVyQ29udGVudChzZXR0aW5ncy5zZWxlY3RvcnMubWVudUl0ZW1zR3JvdXAsIGNhdGVnb3JpZXMsIGdldE1lbnVJdGVtcykucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gR2V0IGFsbCBzZWN0aW9ucyBvZiBtYWluIGNvbnRlbnRcclxuICAgIHJlbmRlckNvbnRlbnQoc2V0dGluZ3Muc2VsZWN0b3JzLnNlY3Rpb25zR3JvdXAsIGNhdGVnb3JpZXMsIGdldFNlY3Rpb25zKS5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBSZW5kZXIgdGhlIGl0ZW1zIGludG8gYSB1bmlxdWUgc2VjdGlvbiBpZFxyXG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICBjb25zdCBzZWxlY3RvciA9IGAjJHtjYXRlZ29yeX0gLmdyb3VwX2l0ZW1zYDtcclxuXHJcbiAgICAgIC8vIEdldCByZXNvdXJjZXMgb2YgdGhlIHNhbWUgY2F0ZWdvcnlcclxuICAgICAgLy8gRm9yIGV4YW1wbGU6IEhUTUzjgIFKYXZhc2NyaXB044CBVG9vbHPjgIFwb2RjYXN0XHJcbiAgICAgIGNvbnN0IHJlc291cmNlcyA9IHVuaXF1ZVJlc291cmNlcyhjYXRlZ29yeSkoc2V0dGluZ3MucmVzb3VyY2VzKTtcclxuICAgICAgcmVuZGVyQ29udGVudChzZWxlY3RvciwgcmVzb3VyY2VzLCBnZXRDYXJkcykucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gdGhlIHNwZWNpZmllZCBjYXRlZ29yeSBieSBjbGlja2luZyB0aGUgbWVudVxyXG4gICAgY29uc3Qgc2Nyb2xsVG8gPSAoZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZWZ0X21lbnVfaXRlbScpXHJcbiAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxlZnRfbWVudV9pdGVtIGEnKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGxpbmsgb2YgbGlua3MpIHtcclxuXHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbEhhbmRsZXIob2Zmc2V0KSk7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgWy4uLml0ZW1zXS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KSg3Nik7XHJcblxyXG5cclxuICAgIC8vIFNob3cgb3IgaGlkZSB0aGUgbGVmdCBtZW51IGJ5IHJlc2l6aW5nIHRoZSBzaXplIG9mIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgaGFuZGxlTWVudShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3NlcykoKTtcclxuXHJcbiAgICAvLyBSZXNpemUgdGhlIHdpZHRoIG9mIGxlZnRfbWVudSBhbmQgbWFpbl9jb250ZW50XHJcbiAgICByZXNpemUuaW5pdGlhbGl6ZSh7IG5vZGVMaXN0OiBub2RlTGlzdCB9KTtcclxuXHJcbiAgICBub2RlTGlzdC5sZWZ0Q29udHJvbE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdmVybGF5KG5vZGVMaXN0LCBzZXR0aW5ncy5jbGFzc2VzKSk7XHJcbiAgICBub2RlTGlzdC5sZWZ0TWVudU92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdmVybGF5KG5vZGVMaXN0LCBzZXR0aW5ncy5jbGFzc2VzKSk7XHJcbiAgICBcclxuICAgIG5vZGVMaXN0LmxlZnRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBIaWRlIGxlZnQgbWVudSBuYXZpZ2F0aW9uIHdoZW4gdXNlciBjbGljayBhIG1lbnUgaW4gbW9iaWxlIGRldmljZXNcclxuICBub2RlTGlzdC5sZWZ0TWVudUl0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAobm9kZUxpc3QuaHRtbC5jbGllbnRXaWR0aCA8IDc1MCkge1xyXG4gICAgICBoaWRlTWVudShub2RlTGlzdCwgc2V0dGluZ3MuY2xhc3Nlcyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vXHJcbiAgLy8gSW5pdHMgJiBFdmVudHNcclxuICAvL1xyXG5cclxuICAvLyBSZW5kZXIgdGhlIHNrZWxldG9uIHNjcmVlbiBiZWZvcmUgZ2V0dGluZyB0aGUgcmVzb3VyY2VzIGZyb20gc2VydmVyXHJcbiAgcmVuZGVyKGRlZmF1bHRzLnNlbGVjdG9ycy5zZWN0aW9uc0dyb3VwLCBnZXRTa2VsZXRvbik7XHJcblxyXG4gIC8vIEdldCByZXNvdXJjZXMgZnJvbSB0aGUgc2VydmljZSBzaWRlXHJcbiAgc2VydmljZS5nZXRBbGwoKS50aGVuKChyZXNvdXJjZXMpID0+IHtcclxuICAgIGluaXQocmVzb3VyY2VzKTtcclxuICB9KTtcclxuXHJcbiAgdGhhdC5pbml0ID0gaW5pdDtcclxuICB0aGF0LmRlc3RvcnkgPSBkZXN0b3J5O1xyXG4gIFxyXG4gIHJldHVybiB0aGF0O1xyXG59KSgpO1xyXG4iLCJGdW5jdGlvbi5wcm90b3R5cGUubWV0aG9kID0gZnVuY3Rpb24obmFtZSwgZnVuYykge1xyXG4gIGlmICh0aGlzLnByb3RvdHlwZVtuYW1lXSkgcmV0dXJuO1xyXG4gIHRoaXMucHJvdG90eXBlW25hbWVdID0gZnVuYztcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IENvbXBvbmVudCA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIFRoZSBzZWxlY3RvciBmb3IgdGhlIHRhYmxlIG9mIGNvbnRlbnRzIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFVzZXIgb3B0aW9ucyBcclxuICAgKi9cclxuICB2YXIgQ29uc3RydWN0b3IgPSBmdW5jdGlvbihzZWxlY3Rvciwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgdGhpcy5yZXNvdXJjZXMgPSBvcHRpb25zLnJlc291cmNlcztcclxuICAgIHRoaXMudGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgQ29uc3RydWN0b3IubWV0aG9kKCdyZW5kZXInLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3Rvcik7XHJcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG4gICAgdGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuaGFuZGxlVGVtcGxhdGUodGhpcy5yZXNvdXJjZXMpO1xyXG4gIH0pXHJcblxyXG4gIENvbnN0cnVjdG9yLm1ldGhvZCgnaGFuZGxlVGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLnJlc291cmNlcy5sZW5ndGggPCAxKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucmVzb3VyY2VzXHJcbiAgICAgIC5tYXAocmVzb3VyY2UgPT4gdGhpcy50ZW1wbGF0ZShyZXNvdXJjZSkpXHJcbiAgICAgIC5qb2luKCcnKVxyXG4gIH0pXHJcblxyXG4gIENvbnN0cnVjdG9yLm1ldGhvZCgnc2V0RGF0YScsIGZ1bmN0aW9uKG9iaikge1xyXG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnRpZXMoa2V5KSkge1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0gb2JqW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH0pXHJcblxyXG4gIENvbnN0cnVjdG9yLm1ldGhvZCgnZ2V0RGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wYXJzZShPYmplY3Quc3RyaW5naWZ5KHRoaXMucmVzb3VyY2VzKSk7XHJcbiAgfSlcclxuXHJcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xyXG59KSgpOyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmNvbnN0IGJhc2VVcmwgPSAnLy5uZXRsaWZ5L2Z1bmN0aW9ucy9hcGkvcmVzb3VyY2VzJztcclxuXHJcbmNvbnN0IGdldEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHJlcXVlc3QgPSBheGlvcy5nZXQoYmFzZVVybCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlID0gZnVuY3Rpb24obmV3T2JqZWN0KSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLnBvc3QoYmFzZVVybCwgbmV3T2JqZWN0KTtcclxuICByZXR1cm4gcmVxdWVzdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmRhdGEpO1xyXG59XHJcblxyXG5jb25zdCB1cGRhdGUgPSBmdW5jdGlvbihpZCwgbmV3T2JqZWN0KSB7XHJcbiAgY29uc3QgcmVxdWVzdCA9IGF4aW9zLnB1dChgJHtiYXNlVXJsfS8ke2lkfWAsIG5ld09iamVjdCk7XHJcbiAgcmV0dXJuIHJlcXVlc3QudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5kYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBnZXRBbGwsIGNyZWF0ZSwgdXBkYXRlIH07XHJcbiIsImV4cG9ydCBjb25zdCBub2RlTGlzdCA9IHtcclxuICBsZWZ0Q29udHJvbE1lbnU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X2NvbnRyb2xfbWVudScpLFxyXG4gIGxlZnRNZW51T3ZlcmxheTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnRfbWVudV9vdmVybGF5JyksXHJcbiAgc2VjdGlvbkl0ZW1zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VjdGlvbl9ncm91cHMnKSxcclxuICBsZWZ0TWVudUl0ZW1zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGVmdF9tZW51X2l0ZW1zJyksXHJcbiAgaHRtbDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gIGJvZHk6IGRvY3VtZW50LmJvZHksXHJcbiAgbGVmdE1lbnU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0X21lbnUnKSxcclxuICByZXNpemVIYW5kbGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemVfaGFuZGxlJyksXHJcbiAgbWFpbkNvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluX2NvbnRlbnQnKSxcclxufVxyXG5cclxuICAvLyBHZW5lcmF0ZSBhIGl0ZW0gb2YgdGhlIG5hdmlnYXRpb25cclxuZXhwb3J0IGNvbnN0IGdldE1lbnVJdGVtcyA9IGNhdGVnb3J5ID0+IGBcclxuICA8bGkgY2xhc3M9XCJsZWZ0X21lbnVfaXRlbVwiPlxyXG4gICAgPGEgaHJlZj1cIiMke2NhdGVnb3J5fVwiPiBcclxuICAgICAgPGltZyBjbGFzcz1cIm1lbnVfaXRlbV9pY29uXCIgc3JjPVwiLi9zdmcvJHtjYXRlZ29yeX0uc3ZnXCIgYWx0PVwiVGhpcyBpcyBhICR7Y2F0ZWdvcnl9IGNhdGVnb3J5XCI+PC9pbWc+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVudV9pdGVtX2NvbnRlbnRcIj4ke2NhdGVnb3J5fTwvc3Bhbj5cclxuICAgIDwvYT5cclxuICA8L2xpPlxyXG5gO1xyXG5cclxuICAvLyBHZW5lcmF0ZSBhIHNlY3Rpb24gb2YgdGhlIG1haW4gY29udGVudFxyXG5leHBvcnQgY29uc3QgZ2V0U2VjdGlvbnMgPSBjYXRlZ29yeSA9PiBgXHJcbiAgPHNlY3Rpb24gaWQ9XCIke2NhdGVnb3J5fVwiIGNsYXNzPVwiZ3JvdXBcIiA+XHJcbiAgICA8aDIgY2xhc3M9XCJncm91cF90aXRsZVwiPiR7Y2F0ZWdvcnl9PC9oMj5cclxuICAgIDxkaXYgY2xhc3M9XCJncm91cF9jb250ZW50XCI+XHJcbiAgICAgIDx1bCBjbGFzcz1cInJvdyBncm91cF9pdGVtc1wiPjwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICA8L3NlY3Rpb24+ICBcclxuYDtcclxuXHJcbiAgLy8gR2VuZXJhdGUgYSBsaXN0IG9mIHRoZSBzZWN0aW9uIFxyXG5leHBvcnQgY29uc3QgZ2V0Q2FyZHMgPSByZXNvdXJjZSA9PiBgXHJcbiAgPGxpIGNsYXNzPVwiZ3JvdXBfaXRlbSBjb2wzXCI+XHJcbiAgICA8YSBjbGFzcz1cImdyb3VwX2l0ZW1fbGlua1wiIGhyZWY9XCIke3Jlc291cmNlLmhyZWZ9XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XHJcbiAgICAgICAgPGltZyBjbGFzcz1cImNhcmRfaWNvblwiIHNyYz1cIiR7cmVzb3VyY2Uuc3JjfVwiIGFsdD1cIiR7cmVzb3VyY2Uuc3JjLnJlcGxhY2UoL1xcLlxcL2ltZ1xcLy9nLCAnJyl9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfYm9keVwiPlxyXG4gICAgICAgICAgPGgzIGNsYXNzPVwiY2FyZF90aXRsZVwiPiR7cmVzb3VyY2UudGl0bGV9PC9oMz5cclxuICAgICAgICAgIDxwIGNsYXNzPVwiY2FyZF90ZXh0XCI+JHtyZXNvdXJjZS5jb250ZW50fTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2E+XHJcbiAgPC9saT5cclxuYDsiLCIvLyBSZXByZXNlbnQgdGhlIGxlZnQgbWVudSBvcGVuaW5nIG9yIGNsb3NpbmdcclxuLy8gVHJ1ZSBtZWFucyBpdCdzIG9wZW5pbmdcclxubGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZU1lbnUobm9kZWxpc3QsIGNsYXNzZXMpIHtcclxuICBub2RlbGlzdC5odG1sLmNsYXNzTmFtZSA9IGNsYXNzZXMubGVmdE1lbnVIaWRkZW47XHJcbiAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZXhpdERvbmU7XHJcbiAgaXNBY3RpdmUgPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlT3ZlcmxheSAobm9kZWxpc3QsIGNsYXNzZXMpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudVNob3c7XHJcbiAgICAgIG5vZGVsaXN0LmxlZnRNZW51T3ZlcmxheS5jbGFzc05hbWUgPSBjbGFzc2VzLmVudGVyRG9uZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudUhpZGRlbjtcclxuICAgICAgbm9kZWxpc3QubGVmdE1lbnVPdmVybGF5LmNsYXNzTmFtZSA9IGNsYXNzZXMuZXhpdERvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBY3RpdmUgPSAhaXNBY3RpdmU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWVudShub2RlbGlzdCwgY2xhc3Nlcykge1xyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIGlmIChub2RlbGlzdC5odG1sLmNsaWVudFdpZHRoIDwgNzUwKSB7XHJcbiAgICAgIGhpZGVNZW51KG5vZGVsaXN0LCBjbGFzc2VzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGVsaXN0Lmh0bWwuY2xhc3NOYW1lID0gY2xhc3Nlcy5sZWZ0TWVudVNob3c7XHJcbiAgICAgIG5vZGVsaXN0LmxlZnRNZW51T3ZlcmxheS5jbGFzc05hbWUgPSBjbGFzc2VzLmVudGVyRG9uZTtcclxuICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IHJlc2l6ZSA9IChmdW5jdGlvbigpIHtcclxuICBsZXQgc2V0dGluZ3M7XHJcblxyXG4gIGNvbnN0IHRoYXQgPSB7fTsgXHJcbiAgY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgICBzaXplczoge1xyXG4gICAgICBtYXhXaWR0aDogNDI1LFxyXG4gICAgICBtaW5XaWR0aDogMjAwLFxyXG4gICAgICB4OiAyNTBcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICAvLyBJbml0cyBhbmQgRXZlbnRzXHJcbiAgY29uc3QgaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9IFxyXG4gICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gbWV0aG9kc1xyXG4gICAgY29uc3QgbW92ZUF0ID0gZnVuY3Rpb24oeCkge1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5sZWZ0TWVudS5zdHlsZS53aWR0aCA9IHggKyAncHgnO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5yZXNpemVIYW5kbGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5tYWluQ29udGVudC5zdHlsZS5tYXJnaW5MZWZ0ID0geCArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gZnVuY3Rpb24gZnVuYygpIHtcclxuICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgIHNldHRpbmdzLm5vZGVMaXN0Lm1haW5Db250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb25fbm9uZScpO1xyXG4gICAgICBzZXR0aW5ncy5ub2RlTGlzdC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vX3VzZXJfc2VsZWN0aW9uJyk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBjb25zdCBsZWZ0TWVudVdpZHRoID0gcGFyc2VJbnQoc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuc3R5bGUud2lkdGgsIDEwKTtcclxuICAgICAgaWYgKGxlZnRNZW51V2lkdGggPiBzZXR0aW5ncy5zaXplcy5tYXhXaWR0aCB8fCBsZWZ0TWVudVdpZHRoIDwgc2V0dGluZ3Muc2l6ZXMubWluV2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAobGVmdE1lbnVXaWR0aCA8PSBzZXR0aW5ncy5zaXplcy5tYXhXaWR0aCAmJiBsZWZ0TWVudVdpZHRoID49IHNldHRpbmdzLnNpemVzLm1pbldpZHRoKSB7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubGVmdE1lbnUuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QubWFpbkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbl9ub25lJyk7XHJcbiAgICAgICAgc2V0dGluZ3Mubm9kZUxpc3QuYm9keS5jbGFzc0xpc3QuYWRkKCdub191c2VyX3NlbGVjdGlvbicpO1xyXG4gICAgICAgIG1vdmVBdChldmVudC5wYWdlWCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXR0aW5ncy5ub2RlTGlzdC5yZXNpemVIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cclxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNldHRpbmdzLm5vZGVMaXN0LnJlc2l6ZUhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBtb3ZlQXQoc2V0dGluZ3Muc2l6ZXMueCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJbml0aWFsIFxyXG4gICAgbW92ZUF0KHNldHRpbmdzLnNpemVzLngpO1xyXG4gIH1cclxuXHJcbiAgdGhhdC5pbml0aWFsaXplID0gaW5pdGlhbGl6ZTtcclxuXHJcbiAgcmV0dXJuIHRoYXQ7XHJcbn0pKCk7IiwiLyoqXHJcbiAqIFxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0VGhlIGhlaWdodCBvZiBib3RoIHRvcGJhciBhbmQgZ3JvdXAgZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbihvZmZzZXQpIHtcclxuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGNvbnN0IG9mZnNldFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7aHJlZn1gKS5vZmZzZXRUb3A7XHJcbiAgICBzY3JvbGwoe1xyXG4gICAgICB0b3A6IG9mZnNldFRvcCAtIG9mZnNldCxcclxuICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICB9KVxyXG4gIH1cclxufSIsImNvbnN0IG1ha2VJdGVtcyA9ICgpID0+IHtcclxuICBsZXQgaXRlbXMgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICBpdGVtcyArPSBgXHJcbiAgICAgIDxsaSBjbGFzcz1cImdyb3VwX2l0ZW0gY29sM1wiPlxyXG4gICAgICAgIDxhIGNsYXNzPVwiZ3JvdXBfaXRlbV9saW5rXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9pY29uIGxvYWRpbmdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRfYm9keVwiPlxyXG4gICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhcmRfdGl0bGUgbG9hZGluZ1wiPjwvaDQ+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkX3RleHQgbG9hZGluZ1wiPjwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICBgO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGl0ZW1zO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2tlbGV0b24gPSAoKSA9PiBgXHJcbiAgPHNlY3Rpb24gY2xhc3M9XCJncm91cFwiID5cclxuICAgIDxoMyBjbGFzcz1cImdyb3VwX3RpdGxlIGxvYWRpbmdcIj48L2gzPlxyXG4gICAgPGRpdiBjbGFzcz1cImdyb3VwX2NvbnRlbnRcIj5cclxuICAgICAgPHVsIGNsYXNzPVwicm93IGdyb3VwX2l0ZW1zXCI+XHJcbiAgICAgICAgJHttYWtlSXRlbXMoKX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvc2VjdGlvbj5cclxuYDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoc2VsZWN0b3IsIHRlbXBsYXRlKSB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICB0YXJnZXQuaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcclxufSJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFpTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMmx1WkdWNExtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVdSaGNIUmxjbk12ZUdoeUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WVhocGIzTXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5allXNWpaV3d2UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyRnVZMlZzTDBOaGJtTmxiRlJ2YTJWdUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTJGdVkyVnNMMmx6UTJGdVkyVnNMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlCZUdsdmN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXViMlJsWDIxdlpIVnNaWE12WVhocGIzTXZiR2xpTDJOdmNtVXZTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlpZFdsc1pFWjFiR3hRWVhSb0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2WTI5eVpTOWpjbVZoZEdWRmNuSnZjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyTnZjbVV2WkdsemNHRjBZMmhTWlhGMVpYTjBMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzlsYm1oaGJtTmxSWEp5YjNJdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlqYjNKbEwyMWxjbWRsUTI5dVptbG5MbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMMjV2WkdWZmJXOWtkV3hsY3k5aGVHbHZjeTlzYVdJdlkyOXlaUzl6WlhSMGJHVXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5amIzSmxMM1J5WVc1elptOXliVVJoZEdFdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlrWldaaGRXeDBjeTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlltbHVaQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl1YjJSbFgyMXZaSFZzWlhNdllYaHBiM012YkdsaUwyaGxiSEJsY25NdlluVnBiR1JWVWt3dWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMMk52YldKcGJtVlZVa3h6TG1weklpd2lkMlZpY0dGamF6b3ZMeTh1TDI1dlpHVmZiVzlrZFd4bGN5OWhlR2x2Y3k5c2FXSXZhR1ZzY0dWeWN5OWpiMjlyYVdWekxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzBGaWMyOXNkWFJsVlZKTUxtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2YUdWc2NHVnljeTlwYzFWU1RGTmhiV1ZQY21sbmFXNHVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDJGNGFXOXpMMnhwWWk5b1pXeHdaWEp6TDI1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVdWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dmJtOWtaVjl0YjJSMWJHVnpMMkY0YVc5ekwyeHBZaTlvWld4d1pYSnpMM0JoY25ObFNHVmhaR1Z5Y3k1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5dWIyUmxYMjF2WkhWc1pYTXZZWGhwYjNNdmJHbGlMMmhsYkhCbGNuTXZjM0J5WldGa0xtcHpJaXdpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTloZUdsdmN5OXNhV0l2ZFhScGJITXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDNCeWIyTmxjM012WW5KdmQzTmxjaTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZiV0ZwYmk1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12Ylc5a1pXeHpMME52YlhCdmJtVnVkQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZjMlZ5ZG1salpYTXZjbVZ6YjNWeVkyVnpMbXB6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM055WXk5cWN5OTJhV1YzY3k5RVQwMUZiR1Z0Wlc1MGN5NXFjeUlzSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YW5NdmRtbGxkM012YUdGdVpHeGxUV1Z1ZFM1cWN5SXNJbmRsWW5CaFkyczZMeTh2TGk5emNtTXZhbk12ZG1sbGQzTXZjbVZ6YVhwbExtcHpJaXdpZDJWaWNHRmphem92THk4dUwzTnlZeTlxY3k5MmFXVjNjeTl6WTNKdmJHeFVieTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl6Y21NdmFuTXZkbWxsZDNNdmMydGxiR1YwYjI0dWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdFJRVUZCTzFGQlEwRTdPMUZCUlVFN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUczdVVUZGUVR0UlFVTkJPenRSUVVWQk8xRkJRMEU3TzFGQlJVRTdVVUZEUVR0UlFVTkJPenM3VVVGSFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFN08xRkJSVUU3VVVGRFFUdFJRVU5CTzFGQlEwRXNNRU5CUVRCRExHZERRVUZuUXp0UlFVTXhSVHRSUVVOQk96dFJRVVZCTzFGQlEwRTdVVUZEUVR0UlFVTkJMSGRFUVVGM1JDeHJRa0ZCYTBJN1VVRkRNVVU3VVVGRFFTeHBSRUZCYVVRc1kwRkJZenRSUVVNdlJEczdVVUZGUVR0UlFVTkJPMUZCUTBFN1VVRkRRVHRSUVVOQk8xRkJRMEU3VVVGRFFUdFJRVU5CTzFGQlEwRTdVVUZEUVR0UlFVTkJPMUZCUTBFc2VVTkJRWGxETEdsRFFVRnBRenRSUVVNeFJTeG5TRUZCWjBnc2JVSkJRVzFDTEVWQlFVVTdVVUZEY2trN1VVRkRRVHM3VVVGRlFUdFJRVU5CTzFGQlEwRTdVVUZEUVN3eVFrRkJNa0lzTUVKQlFUQkNMRVZCUVVVN1VVRkRka1FzYVVOQlFXbERMR1ZCUVdVN1VVRkRhRVE3VVVGRFFUdFJRVU5CT3p0UlFVVkJPMUZCUTBFc2MwUkJRWE5FTEN0RVFVRXJSRHM3VVVGRmNrZzdVVUZEUVRzN08xRkJSMEU3VVVGRFFUczdPenM3T3pzN096czdPMEZEYkVaQkxHbENRVUZwUWl4dFFrRkJUeXhEUVVGRExITkVRVUZoTEVVN096czdPenM3T3pzN096dEJRMEY2UWpzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN1FVRkRhRU1zWVVGQllTeHRRa0ZCVHl4RFFVRkRMR2xGUVVGclFqdEJRVU4yUXl4alFVRmpMRzFDUVVGUExFTkJRVU1zZVVWQlFYTkNPMEZCUXpWRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl3eVJVRkJkVUk3UVVGRE9VTXNiMEpCUVc5Q0xHMUNRVUZQTEVOQlFVTXNOa1ZCUVhWQ08wRkJRMjVFTEcxQ1FVRnRRaXh0UWtGQlR5eERRVUZETEcxR1FVRXlRanRCUVVOMFJDeHpRa0ZCYzBJc2JVSkJRVThzUTBGQlF5eDVSa0ZCT0VJN1FVRkROVVFzYTBKQlFXdENMRzFDUVVGUExFTkJRVU1zZVVWQlFYRkNPenRCUVVVdlF6dEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxEUkRRVUUwUXp0QlFVTTFRenM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VFFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEVzVDBGQlR6dEJRVU5RT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTlCUVU4N1FVRkRVRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEczdPenM3T3pzN096czdPenRCUTJ4TVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zYTBSQlFWTTdRVUZETjBJc1YwRkJWeXh0UWtGQlR5eERRVUZETEdkRlFVRm5RanRCUVVOdVF5eFpRVUZaTEcxQ1FVRlBMRU5CUVVNc05FUkJRV003UVVGRGJFTXNhMEpCUVd0Q0xHMUNRVUZQTEVOQlFVTXNkMFZCUVc5Q08wRkJRemxETEdWQlFXVXNiVUpCUVU4c1EwRkJReXgzUkVGQldUczdRVUZGYmtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMRmxCUVZrc1RVRkJUVHRCUVVOc1FqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hsUVVGbExHMUNRVUZQTEVOQlFVTXNhMFZCUVdsQ08wRkJRM2hETEc5Q1FVRnZRaXh0UWtGQlR5eERRVUZETERSRlFVRnpRanRCUVVOc1JDeHBRa0ZCYVVJc2JVSkJRVThzUTBGQlF5eHpSVUZCYlVJN08wRkJSVFZETzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1pVRkJaU3h0UWtGQlR5eERRVUZETEc5RlFVRnJRanM3UVVGRmVrTTdPMEZCUlVFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzQkVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1VVRkJVVHRCUVVOdVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN096czdPenM3T3pzN096czdRVU5zUW1FN08wRkJSV0lzWVVGQllTeHRRa0ZCVHl4RFFVRkRMREpFUVVGVk96dEJRVVV2UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN096czdPenM3T3pzN096czdRVU40UkdFN08wRkJSV0k3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRTbUU3TzBGQlJXSXNXVUZCV1N4dFFrRkJUeXhEUVVGRExIRkVRVUZaTzBGQlEyaERMR1ZCUVdVc2JVSkJRVThzUTBGQlF5eDVSVUZCY1VJN1FVRkROVU1zZVVKQlFYbENMRzFDUVVGUExFTkJRVU1zYVVaQlFYTkNPMEZCUTNaRUxITkNRVUZ6UWl4dFFrRkJUeXhEUVVGRExESkZRVUZ0UWp0QlFVTnFSQ3hyUWtGQmEwSXNiVUpCUVU4c1EwRkJReXh0UlVGQlpUczdRVUZGZWtNN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenRCUVVOSU8wRkJRMEVzUjBGQlJ6dEJRVU5JTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFTeEhRVUZIT3p0QlFVVklPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1owUkJRV2RFTzBGQlEyaEVPMEZCUTBFN1FVRkRRU3g1UWtGQmVVSTdRVUZEZWtJc1MwRkJTenRCUVVOTU8wRkJRMEVzUTBGQlF6czdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRU3huUkVGQlowUTdRVUZEYUVRN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRXNRMEZCUXpzN1FVRkZSRHM3T3pzN096czdPenM3T3p0QlF6bEdZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2NVUkJRVms3TzBGQlJXaERPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFRRVUZUTzBGQlEzQkNPMEZCUTBFc1dVRkJXU3hQUVVGUE8wRkJRMjVDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPMEZCUlVFN096czdPenM3T3pzN096czdRVU51UkdFN08wRkJSV0lzYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zYlVaQlFUQkNPMEZCUTNSRUxHdENRVUZyUWl4dFFrRkJUeXhEUVVGRExDdEZRVUYzUWpzN1FVRkZiRVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEYmtKaE96dEJRVVZpTEcxQ1FVRnRRaXh0UWtGQlR5eERRVUZETEhGRlFVRm5RanM3UVVGRk0wTTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTFCUVUwN1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMnBDWVRzN1FVRkZZaXhaUVVGWkxHMUNRVUZQTEVOQlFVTXNjVVJCUVZrN1FVRkRhRU1zYjBKQlFXOUNMRzFDUVVGUExFTkJRVU1zZFVWQlFXbENPMEZCUXpkRExHVkJRV1VzYlVKQlFVOHNRMEZCUXl4MVJVRkJiMEk3UVVGRE0wTXNaVUZCWlN4dFFrRkJUeXhEUVVGRExIbEVRVUZoT3p0QlFVVndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN3clFrRkJLMEk3UVVGREwwSXNkVU5CUVhWRE8wRkJRM1pETzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnp0QlFVTklPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnp0QlFVTklPenM3T3pzN096czdPenM3TzBGRE9VVmhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUVUZCVFR0QlFVTnFRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeE5RVUZOTzBGQlEyNUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTNwRFlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zYlVSQlFWVTdPMEZCUlRsQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRTlCUVU4N1FVRkRjRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3c01rSkJRVEpDTzBGQlF6TkNMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0RzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU96dEJRVVZCTzBGQlEwRTdPenM3T3pzN096czdPenM3UVVOMFJtRTdPMEZCUldJc2EwSkJRV3RDTEcxQ1FVRlBMRU5CUVVNc2JVVkJRV1U3TzBGQlJYcERPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVTBGQlV6dEJRVU53UWl4WFFVRlhMRk5CUVZNN1FVRkRjRUlzVjBGQlZ5eFBRVUZQTzBGQlEyeENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN08wRkRlRUpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4alFVRmpPMEZCUTNwQ0xGZEJRVmNzVFVGQlRUdEJRVU5xUWl4WFFVRlhMR1ZCUVdVN1FVRkRNVUlzWVVGQllTeEZRVUZGTzBGQlEyWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVRzN096czdPenM3T3pzN096dEJRMjVDUVN3clEwRkJZVHM3UVVGRllpeFpRVUZaTEcxQ1FVRlBMRU5CUVVNc2EwUkJRVk03UVVGRE4wSXNNRUpCUVRCQ0xHMUNRVUZQTEVOQlFVTXNPRVpCUVN0Q096dEJRVVZxUlR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNiVUpCUVU4c1EwRkJReXhuUlVGQlowSTdRVUZEZEVNc1IwRkJSenRCUVVOSU8wRkJRMEVzWTBGQll5eHRRa0ZCVHl4RFFVRkRMR2xGUVVGcFFqdEJRVU4yUXp0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEhkRlFVRjNSVHRCUVVONFJUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVJFRkJkVVE3UVVGRGRrUTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUeXhaUVVGWk8wRkJRMjVDTzBGQlEwRTdRVUZEUVN4SFFVRkhPenRCUVVWSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEVOQlFVTTdPMEZCUlVRN1FVRkRRVHRCUVVOQkxFTkJRVU03TzBGQlJVUTdPenM3T3pzN096czdPenM3TzBGRGFrZGhPenRCUVVWaU8wRkJRMEU3UVVGRFFUdEJRVU5CTEcxQ1FVRnRRaXhwUWtGQmFVSTdRVUZEY0VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUTFaaE96dEJRVVZpTEZsQlFWa3NiVUpCUVU4c1EwRkJReXh4UkVGQldUczdRVUZGYUVNN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdRVUZEUVN4SFFVRkhPMEZCUTBnN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVN4UFFVRlBPMEZCUTFBc1MwRkJTenM3UVVGRlREdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEY2tWaE96dEJRVVZpTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEySmhPenRCUVVWaUxGbEJRVmtzYlVKQlFVOHNRMEZCUXl4eFJFRkJXVHM3UVVGRmFFTTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQkxEQkRRVUV3UXp0QlFVTXhReXhUUVVGVE96dEJRVVZVTzBGQlEwRXNORVJCUVRSRUxIZENRVUYzUWp0QlFVTndSanRCUVVOQkxGTkJRVk03TzBGQlJWUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE96dEJRVVZNTzBGQlEwRTdRVUZEUVR0QlFVTkJMR3REUVVGclF6dEJRVU5zUXl3clFrRkJLMElzWVVGQllTeEZRVUZGTzBGQlF6bERPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3T3pzN096czdPenM3T3pzN1FVTndSR0U3TzBGQlJXSTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096dEJRMkpoT3p0QlFVVmlMRmxCUVZrc2JVSkJRVThzUTBGQlF5eHhSRUZCV1RzN1FVRkZhRU03UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1kwRkJZeXhQUVVGUE8wRkJRM0pDTEdkQ1FVRm5RanRCUVVOb1FqdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXTXNUMEZCVHp0QlFVTnlRaXhuUWtGQlowSXNVVUZCVVR0QlFVTjRRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPenRCUVVWTU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N096czdPenM3T3pzN096czdRVU51UldFN08wRkJSV0lzV1VGQldTeHRRa0ZCVHl4RFFVRkRMRzFFUVVGVk96dEJRVVU1UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeEhRVUZITzBGQlEwZzdPenM3T3pzN096czdPenM3UVVOWVlUczdRVUZGWWl4WlFVRlpMRzFDUVVGUExFTkJRVU1zY1VSQlFWazdPMEZCUldoRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hQUVVGUE8wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFTeHBRa0ZCYVVJc1pVRkJaVHM3UVVGRmFFTTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1QwRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTEVkQlFVYzdPMEZCUlVnN1FVRkRRVHM3T3pzN096czdPenM3T3p0QlEzQkVZVHM3UVVGRllqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc0swSkJRU3RDTzBGQlF5OUNPMEZCUTBFN1FVRkRRU3hYUVVGWExGTkJRVk03UVVGRGNFSXNZVUZCWVR0QlFVTmlPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenRCUXpGQ1lUczdRVUZGWWl4WFFVRlhMRzFDUVVGUExFTkJRVU1zWjBWQlFXZENPenRCUVVWdVF6czdRVUZGUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4aFFVRmhMRkZCUVZFN1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGSE8wRkJRMGc3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVjBGQlZ5eFBRVUZQTzBGQlEyeENMR0ZCUVdFc1VVRkJVVHRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xGbEJRVmtzVVVGQlVUdEJRVU53UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJc1lVRkJZU3hSUVVGUk8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhoUVVGaExGRkJRVkU3UVVGRGNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnl4UFFVRlBPMEZCUTJ4Q0xHRkJRV0VzVVVGQlVUdEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4WFFVRlhMRTlCUVU4N1FVRkRiRUlzWVVGQllTeFJRVUZSTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmRCUVZjc1QwRkJUenRCUVVOc1FpeGhRVUZoTEZGQlFWRTdRVUZEY2tJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNVVUZCVVR0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hYUVVGWExFOUJRVTg3UVVGRGJFSXNZVUZCWVN4UFFVRlBPMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhoUVVGaE8wRkJRM2hDTEZkQlFWY3NVMEZCVXp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2JVTkJRVzFETEU5QlFVODdRVUZETVVNN1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNkVUpCUVhWQ0xGTkJRVk1zUjBGQlJ5eFRRVUZUTzBGQlF6VkRMREpDUVVFeVFqdEJRVU16UWp0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEdGQlFXRXNUMEZCVHp0QlFVTndRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3c05FSkJRVFJDTzBGQlF6VkNMRXRCUVVzN1FVRkRURHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFc2RVTkJRWFZETEU5QlFVODdRVUZET1VNN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1YwRkJWeXhQUVVGUE8wRkJRMnhDTEZkQlFWY3NUMEZCVHp0QlFVTnNRaXhYUVVGWExFOUJRVTg3UVVGRGJFSXNXVUZCV1N4UFFVRlBPMEZCUTI1Q08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQkxFZEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGZEJRVmNzVDBGQlR6dEJRVU5zUWl4WlFVRlpMRTlCUVU4N1FVRkRia0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3UVVNNVZrRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVTBGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZOQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFTeERRVUZETzBGQlEwUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hMUVVGTE8wRkJRMHc3UVVGRFFUdEJRVU5CTzBGQlEwRXNVMEZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVR0QlFVTkJMRk5CUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN08wRkJTVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxIVkNRVUYxUWl4elFrRkJjMEk3UVVGRE4wTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3h4UWtGQmNVSTdRVUZEY2tJN08wRkJSVUU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJMSEZEUVVGeFF6czdRVUZGY2tNN1FVRkRRVHRCUVVOQk96dEJRVVZCTERKQ1FVRXlRanRCUVVNelFqdEJRVU5CTzBGQlEwRTdRVUZEUVN3MFFrRkJORUlzVlVGQlZUczdPenM3T3pzN096czdPenRCUTNaTWRFTTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUVyUXp0QlFVTnpRenRCUVVNNVFqdEJRVU5hTzBGQlF6aENPMEZCUTNoQ08wRkJRMVE3TzBGQlJYaERPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1MwRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUdEJRVU5CTEV0QlFVczdRVUZEVERzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeGhRVUZoTEU5QlFVODdRVUZEY0VJc1lVRkJZU3hOUVVGTk8wRkJRMjVDTEdGQlFXRXNVMEZCVXp0QlFVTjBRanRCUVVOQk8wRkJRMEVzWlVGQlpTd3lSRUZCVXp0QlFVTjRRanRCUVVOQk8wRkJRMEVzUzBGQlN6dEJRVU5NT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTEN0Q1FVRXJRanM3UVVGRkwwSTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFTeHBSVUZCYVVVc0swUkJRVms3TzBGQlJUZEZPMEZCUTBFc1owVkJRV2RGTERoRVFVRlhPenRCUVVVelJUdEJRVU5CTzBGQlEwRXNNa0pCUVRKQ0xGTkJRVk03TzBGQlJYQkRPMEZCUTBFN1FVRkRRVHRCUVVOQkxIbERRVUY1UXl3eVJFRkJVVHRCUVVOcVJDeExRVUZMT3p0QlFVVk1PMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJMSFZEUVVGMVF5eHhSVUZCWVR0QlFVTndSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWMEZCVnpzN1FVRkZXRHRCUVVOQkxGTkJRVk03UVVGRFZEdEJRVU5CTEV0QlFVczdPenRCUVVkTU8wRkJRMEVzU1VGQlNTeHZSVUZCVlN4RFFVRkRMREpFUVVGUk96dEJRVVYyUWp0QlFVTkJMRWxCUVVrc2IwUkJRVTBzWVVGQllTeFhRVUZYTERKRVFVRlJMRVZCUVVVN08wRkJSVFZETEVsQlFVa3NNa1JCUVZFc01rTkJRVEpETEhWRlFVRmhMRU5CUVVNc01rUkJRVkU3UVVGRE4wVXNTVUZCU1N3eVJFRkJVU3d5UTBGQk1rTXNkVVZCUVdFc1EwRkJReXd5UkVGQlVUczdRVUZGTjBVc1NVRkJTU3d5UkVGQlVUdEJRVU5hTzBGQlEwRTdRVUZEUVN4TFFVRkxPMEZCUTB3N08wRkJSVUU3UVVGRFFTeEZRVUZGTERKRVFVRlJPMEZCUTFZc1VVRkJVU3d5UkVGQlVUdEJRVU5vUWl4TlFVRk5MR3RGUVVGUkxFTkJRVU1zTWtSQlFWRTdRVUZEZGtJN1FVRkRRU3hIUVVGSE96dEJRVVZJTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQkxFVkJRVVVzT0VSQlFVMHNiVU5CUVcxRExESkVRVUZYT3p0QlFVVjBSRHRCUVVOQkxFVkJRVVVzTWtSQlFVODdRVUZEVkR0QlFVTkJMRWRCUVVjN08wRkJSVWc3UVVGRFFUczdRVUZGUVR0QlFVTkJMRU5CUVVNN096czdPenM3T3pzN096czdRVU5zUzBRN1FVRkJRVHRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlU4N08wRkJSVkE3UVVGRFFUdEJRVU5CTEdGQlFXRXNUMEZCVHp0QlFVTndRaXhoUVVGaExFOUJRVTg3UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1IwRkJSenM3UVVGRlNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVWM3TzBGQlJVZzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSMEZCUnpzN1FVRkZTRHRCUVVOQk8wRkJRMEVzUjBGQlJ6czdRVUZGU0R0QlFVTkJMRU5CUVVNc1NUczdPenM3T3pzN096czdPMEZEYUVSRU8wRkJRVUU3UVVGQlFUdEJRVUV3UWp0QlFVTXhRanM3UVVGRlFUdEJRVU5CTEd0Q1FVRnJRaXcwUTBGQlN6dEJRVU4yUWp0QlFVTkJPenRCUVVWQk8wRkJRMEVzYTBKQlFXdENMRFJEUVVGTE8wRkJRM1pDTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hyUWtGQmEwSXNORU5CUVVzc1VVRkJVU3hSUVVGUkxFZEJRVWNzUjBGQlJ6dEJRVU0zUXp0QlFVTkJPenRCUVVWbExHZEZRVUZETEhsQ1FVRjVRaXhGUVVGRE96czdPenM3T3pzN096czdPMEZEYkVJeFF6dEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5QTzBGQlExQTdRVUZEUVN4blFrRkJaMElzVTBGQlV6dEJRVU42UWl3clEwRkJLME1zVTBGQlV5eDFRa0ZCZFVJc1UwRkJVenRCUVVONFJpeDNRMEZCZDBNc1UwRkJVenRCUVVOcVJEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRUenRCUVVOUUxHbENRVUZwUWl4VFFVRlRPMEZCUXpGQ0xEaENRVUU0UWl4VFFVRlRPMEZCUTNaRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRUenRCUVVOUU8wRkJRMEVzZFVOQlFYVkRMR05CUVdNN1FVRkRja1E3UVVGRFFTeHpRMEZCYzBNc1lVRkJZU3hUUVVGVExIVkRRVUYxUXp0QlFVTnVSenRCUVVOQkxHMURRVUZ0UXl4bFFVRmxPMEZCUTJ4RUxHbERRVUZwUXl4cFFrRkJhVUk3UVVGRGJFUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hGT3pzN096czdPenM3T3pzN1FVTTNRMEU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVTkJPMEZCUTBFN08wRkJSVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNTMEZCU3p0QlFVTk1PMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlU4N1FVRkRVRHRCUVVOQk8wRkJRMEU3UVVGRFFTeExRVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3T3pzN096czdPMEZEYkVOQk8wRkJRVUU3UVVGQlR6dEJRVU5RT3p0QlFVVkJMR3RDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFdEJRVXM3UVVGRFREczdRVUZGUVR0QlFVTkJPMEZCUTBFc01rSTdRVUZEUVN3clFrRkJLMEk3TzBGQlJTOUNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFOUJRVTg3UVVGRFVEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hQUVVGUE96dEJRVVZRTEV0QlFVczdPMEZCUlV3N1FVRkRRVHRCUVVOQkxFdEJRVXM3TzBGQlJVdzdRVUZEUVR0QlFVTkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRXNRMEZCUXl4Sk96czdPenM3T3pzN096czdRVU5xUlVRN1FVRkJRVHRCUVVGQk8wRkJRMEU3UVVGRFFTeFhRVUZYTEU5QlFVODdRVUZEYkVJN1FVRkRUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTEdkRVFVRm5SQ3hMUVVGTE8wRkJRM0pFTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVzN1FVRkRURHRCUVVOQkxFTTdPenM3T3pzN096czdPenRCUTJSQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlEwRTdPMEZCUlVFc2FVSkJRV2xDTEZGQlFWRTdRVUZEZWtJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlZPMEZCUTFZN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRU3hESWl3aVptbHNaU0k2SW1ObU5ETTVZVFl6WWpFMU5HVTNaVGRsWlRJM0xtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSUZ4MEx5OGdWR2hsSUcxdlpIVnNaU0JqWVdOb1pWeHVJRngwZG1GeUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhNZ1BTQjdmVHRjYmx4dUlGeDBMeThnVkdobElISmxjWFZwY21VZ1puVnVZM1JwYjI1Y2JpQmNkR1oxYm1OMGFXOXVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvYlc5a2RXeGxTV1FwSUh0Y2JseHVJRngwWEhRdkx5QkRhR1ZqYXlCcFppQnRiMlIxYkdVZ2FYTWdhVzRnWTJGamFHVmNiaUJjZEZ4MGFXWW9hVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHBJSHRjYmlCY2RGeDBYSFJ5WlhSMWNtNGdhVzV6ZEdGc2JHVmtUVzlrZFd4bGMxdHRiMlIxYkdWSlpGMHVaWGh3YjNKMGN6dGNiaUJjZEZ4MGZWeHVJRngwWEhRdkx5QkRjbVZoZEdVZ1lTQnVaWGNnYlc5a2RXeGxJQ2hoYm1RZ2NIVjBJR2wwSUdsdWRHOGdkR2hsSUdOaFkyaGxLVnh1SUZ4MFhIUjJZWElnYlc5a2RXeGxJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBnUFNCN1hHNGdYSFJjZEZ4MGFUb2diVzlrZFd4bFNXUXNYRzRnWEhSY2RGeDBiRG9nWm1Gc2MyVXNYRzRnWEhSY2RGeDBaWGh3YjNKMGN6b2dlMzFjYmlCY2RGeDBmVHRjYmx4dUlGeDBYSFF2THlCRmVHVmpkWFJsSUhSb1pTQnRiMlIxYkdVZ1puVnVZM1JwYjI1Y2JpQmNkRngwYlc5a2RXeGxjMXR0YjJSMWJHVkpaRjB1WTJGc2JDaHRiMlIxYkdVdVpYaHdiM0owY3l3Z2JXOWtkV3hsTENCdGIyUjFiR1V1Wlhod2IzSjBjeXdnWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHlrN1hHNWNiaUJjZEZ4MEx5OGdSbXhoWnlCMGFHVWdiVzlrZFd4bElHRnpJR3h2WVdSbFpGeHVJRngwWEhSdGIyUjFiR1V1YkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1pHVm1hVzVsSUdkbGRIUmxjaUJtZFc1amRHbHZiaUJtYjNJZ2FHRnliVzl1ZVNCbGVIQnZjblJ6WEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFnUFNCbWRXNWpkR2x2YmlobGVIQnZjblJ6TENCdVlXMWxMQ0JuWlhSMFpYSXBJSHRjYmlCY2RGeDBhV1lvSVY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJ5aGxlSEJ2Y25SekxDQnVZVzFsS1NrZ2UxeHVJRngwWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0J1WVcxbExDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJR2RsZERvZ1oyVjBkR1Z5SUgwcE8xeHVJRngwWEhSOVhHNGdYSFI5TzF4dVhHNGdYSFF2THlCa1pXWnBibVVnWDE5bGMwMXZaSFZzWlNCdmJpQmxlSEJ2Y25SelhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5JZ1BTQm1kVzVqZEdsdmJpaGxlSEJ2Y25SektTQjdYRzRnWEhSY2RHbG1LSFI1Y0dWdlppQlRlVzFpYjJ3Z0lUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlGTjViV0p2YkM1MGIxTjBjbWx1WjFSaFp5a2dlMXh1SUZ4MFhIUmNkRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNobGVIQnZjblJ6TENCVGVXMWliMnd1ZEc5VGRISnBibWRVWVdjc0lIc2dkbUZzZFdVNklDZE5iMlIxYkdVbklIMHBPMXh1SUZ4MFhIUjlYRzRnWEhSY2RFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hsZUhCdmNuUnpMQ0FuWDE5bGMwMXZaSFZzWlNjc0lIc2dkbUZzZFdVNklIUnlkV1VnZlNrN1hHNGdYSFI5TzF4dVhHNGdYSFF2THlCamNtVmhkR1VnWVNCbVlXdGxJRzVoYldWemNHRmpaU0J2WW1wbFkzUmNiaUJjZEM4dklHMXZaR1VnSmlBeE9pQjJZV3gxWlNCcGN5QmhJRzF2WkhWc1pTQnBaQ3dnY21WeGRXbHlaU0JwZEZ4dUlGeDBMeThnYlc5a1pTQW1JREk2SUcxbGNtZGxJR0ZzYkNCd2NtOXdaWEowYVdWeklHOW1JSFpoYkhWbElHbHVkRzhnZEdobElHNXpYRzRnWEhRdkx5QnRiMlJsSUNZZ05Eb2djbVYwZFhKdUlIWmhiSFZsSUhkb1pXNGdZV3h5WldGa2VTQnVjeUJ2WW1wbFkzUmNiaUJjZEM4dklHMXZaR1VnSmlBNGZERTZJR0psYUdGMlpTQnNhV3RsSUhKbGNYVnBjbVZjYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVkQ0E5SUdaMWJtTjBhVzl1S0haaGJIVmxMQ0J0YjJSbEtTQjdYRzRnWEhSY2RHbG1LRzF2WkdVZ0ppQXhLU0IyWVd4MVpTQTlJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvZG1Gc2RXVXBPMXh1SUZ4MFhIUnBaaWh0YjJSbElDWWdPQ2tnY21WMGRYSnVJSFpoYkhWbE8xeHVJRngwWEhScFppZ29iVzlrWlNBbUlEUXBJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI5aWFtVmpkQ2NnSmlZZ2RtRnNkV1VnSmlZZ2RtRnNkV1V1WDE5bGMwMXZaSFZzWlNrZ2NtVjBkWEp1SUhaaGJIVmxPMXh1SUZ4MFhIUjJZWElnYm5NZ1BTQlBZbXBsWTNRdVkzSmxZWFJsS0c1MWJHd3BPMXh1SUZ4MFhIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbklvYm5NcE8xeHVJRngwWEhSUFltcGxZM1F1WkdWbWFXNWxVSEp2Y0dWeWRIa29ibk1zSUNka1pXWmhkV3gwSnl3Z2V5QmxiblZ0WlhKaFlteGxPaUIwY25WbExDQjJZV3gxWlRvZ2RtRnNkV1VnZlNrN1hHNGdYSFJjZEdsbUtHMXZaR1VnSmlBeUlDWW1JSFI1Y0dWdlppQjJZV3gxWlNBaFBTQW5jM1J5YVc1bkp5a2dabTl5S0haaGNpQnJaWGtnYVc0Z2RtRnNkV1VwSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVpDaHVjeXdnYTJWNUxDQm1kVzVqZEdsdmJpaHJaWGtwSUhzZ2NtVjBkWEp1SUhaaGJIVmxXMnRsZVYwN0lIMHVZbWx1WkNodWRXeHNMQ0JyWlhrcEtUdGNiaUJjZEZ4MGNtVjBkWEp1SUc1ek8xeHVJRngwZlR0Y2JseHVJRngwTHk4Z1oyVjBSR1ZtWVhWc2RFVjRjRzl5ZENCbWRXNWpkR2x2YmlCbWIzSWdZMjl0Y0dGMGFXSnBiR2wwZVNCM2FYUm9JRzV2Ymkxb1lYSnRiMjU1SUcxdlpIVnNaWE5jYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHViaUE5SUdaMWJtTjBhVzl1S0cxdlpIVnNaU2tnZTF4dUlGeDBYSFIyWVhJZ1oyVjBkR1Z5SUQwZ2JXOWtkV3hsSUNZbUlHMXZaSFZzWlM1ZlgyVnpUVzlrZFd4bElEOWNiaUJjZEZ4MFhIUm1kVzVqZEdsdmJpQm5aWFJFWldaaGRXeDBLQ2tnZXlCeVpYUjFjbTRnYlc5a2RXeGxXeWRrWldaaGRXeDBKMTA3SUgwZ09seHVJRngwWEhSY2RHWjFibU4wYVc5dUlHZGxkRTF2WkhWc1pVVjRjRzl5ZEhNb0tTQjdJSEpsZEhWeWJpQnRiMlIxYkdVN0lIMDdYRzRnWEhSY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2huWlhSMFpYSXNJQ2RoSnl3Z1oyVjBkR1Z5S1R0Y2JpQmNkRngwY21WMGRYSnVJR2RsZEhSbGNqdGNiaUJjZEgwN1hHNWNiaUJjZEM4dklFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JGeHVJRngwWDE5M1pXSndZV05yWDNKbGNYVnBjbVZmWHk1dklEMGdablZ1WTNScGIyNG9iMkpxWldOMExDQndjbTl3WlhKMGVTa2dleUJ5WlhSMWNtNGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRzlpYW1WamRDd2djSEp2Y0dWeWRIa3BPeUI5TzF4dVhHNGdYSFF2THlCZlgzZGxZbkJoWTJ0ZmNIVmliR2xqWDNCaGRHaGZYMXh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXdJRDBnWENKY0lqdGNibHh1WEc0Z1hIUXZMeUJNYjJGa0lHVnVkSEo1SUcxdlpIVnNaU0JoYm1RZ2NtVjBkWEp1SUdWNGNHOXlkSE5jYmlCY2RISmxkSFZ5YmlCZlgzZGxZbkJoWTJ0ZmNtVnhkV2x5WlY5ZktGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjeUE5SURBcE8xeHVJaXdpYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TDJ4cFlpOWhlR2x2Y3ljcE95SXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk4dUxpOTFkR2xzY3ljcE8xeHVkbUZ5SUhObGRIUnNaU0E5SUhKbGNYVnBjbVVvSnk0dkxpNHZZMjl5WlM5elpYUjBiR1VuS1R0Y2JuWmhjaUJqYjI5cmFXVnpJRDBnY21WeGRXbHlaU2duTGk4dUxpOW9aV3h3WlhKekwyTnZiMnRwWlhNbktUdGNiblpoY2lCaWRXbHNaRlZTVENBOUlISmxjWFZwY21Vb0p5NHZMaTR2YUdWc2NHVnljeTlpZFdsc1pGVlNUQ2NwTzF4dWRtRnlJR0oxYVd4a1JuVnNiRkJoZEdnZ1BTQnlaWEYxYVhKbEtDY3VMaTlqYjNKbEwySjFhV3hrUm5Wc2JGQmhkR2duS1R0Y2JuWmhjaUJ3WVhKelpVaGxZV1JsY25NZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDJobGJIQmxjbk12Y0dGeWMyVklaV0ZrWlhKekp5azdYRzUyWVhJZ2FYTlZVa3hUWVcxbFQzSnBaMmx1SUQwZ2NtVnhkV2x5WlNnbkxpOHVMaTlvWld4d1pYSnpMMmx6VlZKTVUyRnRaVTl5YVdkcGJpY3BPMXh1ZG1GeUlHTnlaV0YwWlVWeWNtOXlJRDBnY21WeGRXbHlaU2duTGk0dlkyOXlaUzlqY21WaGRHVkZjbkp2Y2ljcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJSGhvY2tGa1lYQjBaWElvWTI5dVptbG5LU0I3WEc0Z0lISmxkSFZ5YmlCdVpYY2dVSEp2YldselpTaG1kVzVqZEdsdmJpQmthWE53WVhSamFGaG9jbEpsY1hWbGMzUW9jbVZ6YjJ4MlpTd2djbVZxWldOMEtTQjdYRzRnSUNBZ2RtRnlJSEpsY1hWbGMzUkVZWFJoSUQwZ1kyOXVabWxuTG1SaGRHRTdYRzRnSUNBZ2RtRnlJSEpsY1hWbGMzUklaV0ZrWlhKeklEMGdZMjl1Wm1sbkxtaGxZV1JsY25NN1hHNWNiaUFnSUNCcFppQW9kWFJwYkhNdWFYTkdiM0p0UkdGMFlTaHlaWEYxWlhOMFJHRjBZU2twSUh0Y2JpQWdJQ0FnSUdSbGJHVjBaU0J5WlhGMVpYTjBTR1ZoWkdWeWMxc25RMjl1ZEdWdWRDMVVlWEJsSjEwN0lDOHZJRXhsZENCMGFHVWdZbkp2ZDNObGNpQnpaWFFnYVhSY2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWVhJZ2NtVnhkV1Z6ZENBOUlHNWxkeUJZVFV4SWRIUndVbVZ4ZFdWemRDZ3BPMXh1WEc0Z0lDQWdMeThnU0ZSVVVDQmlZWE5wWXlCaGRYUm9aVzUwYVdOaGRHbHZibHh1SUNBZ0lHbG1JQ2hqYjI1bWFXY3VZWFYwYUNrZ2UxeHVJQ0FnSUNBZ2RtRnlJSFZ6WlhKdVlXMWxJRDBnWTI5dVptbG5MbUYxZEdndWRYTmxjbTVoYldVZ2ZId2dKeWM3WEc0Z0lDQWdJQ0IyWVhJZ2NHRnpjM2R2Y21RZ1BTQmpiMjVtYVdjdVlYVjBhQzV3WVhOemQyOXlaQ0EvSUhWdVpYTmpZWEJsS0dWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoamIyNW1hV2N1WVhWMGFDNXdZWE56ZDI5eVpDa3BJRG9nSnljN1hHNGdJQ0FnSUNCeVpYRjFaWE4wU0dWaFpHVnljeTVCZFhSb2IzSnBlbUYwYVc5dUlEMGdKMEpoYzJsaklDY2dLeUJpZEc5aEtIVnpaWEp1WVcxbElDc2dKem9uSUNzZ2NHRnpjM2R2Y21RcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhaaGNpQm1kV3hzVUdGMGFDQTlJR0oxYVd4a1JuVnNiRkJoZEdnb1kyOXVabWxuTG1KaGMyVlZVa3dzSUdOdmJtWnBaeTUxY213cE8xeHVJQ0FnSUhKbGNYVmxjM1F1YjNCbGJpaGpiMjVtYVdjdWJXVjBhRzlrTG5SdlZYQndaWEpEWVhObEtDa3NJR0oxYVd4a1ZWSk1LR1oxYkd4UVlYUm9MQ0JqYjI1bWFXY3VjR0Z5WVcxekxDQmpiMjVtYVdjdWNHRnlZVzF6VTJWeWFXRnNhWHBsY2lrc0lIUnlkV1VwTzF4dVhHNGdJQ0FnTHk4Z1UyVjBJSFJvWlNCeVpYRjFaWE4wSUhScGJXVnZkWFFnYVc0Z1RWTmNiaUFnSUNCeVpYRjFaWE4wTG5ScGJXVnZkWFFnUFNCamIyNW1hV2N1ZEdsdFpXOTFkRHRjYmx4dUlDQWdJQzh2SUV4cGMzUmxiaUJtYjNJZ2NtVmhaSGtnYzNSaGRHVmNiaUFnSUNCeVpYRjFaWE4wTG05dWNtVmhaSGx6ZEdGMFpXTm9ZVzVuWlNBOUlHWjFibU4wYVc5dUlHaGhibVJzWlV4dllXUW9LU0I3WEc0Z0lDQWdJQ0JwWmlBb0lYSmxjWFZsYzNRZ2ZId2djbVZ4ZFdWemRDNXlaV0ZrZVZOMFlYUmxJQ0U5UFNBMEtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdMeThnVkdobElISmxjWFZsYzNRZ1pYSnliM0psWkNCdmRYUWdZVzVrSUhkbElHUnBaRzRuZENCblpYUWdZU0J5WlhOd2IyNXpaU3dnZEdocGN5QjNhV3hzSUdKbFhHNGdJQ0FnSUNBdkx5Qm9ZVzVrYkdWa0lHSjVJRzl1WlhKeWIzSWdhVzV6ZEdWaFpGeHVJQ0FnSUNBZ0x5OGdWMmwwYUNCdmJtVWdaWGhqWlhCMGFXOXVPaUJ5WlhGMVpYTjBJSFJvWVhRZ2RYTnBibWNnWm1sc1pUb2djSEp2ZEc5amIyd3NJRzF2YzNRZ1luSnZkM05sY25OY2JpQWdJQ0FnSUM4dklIZHBiR3dnY21WMGRYSnVJSE4wWVhSMWN5QmhjeUF3SUdWMlpXNGdkR2h2ZFdkb0lHbDBKM01nWVNCemRXTmpaWE56Wm5Wc0lISmxjWFZsYzNSY2JpQWdJQ0FnSUdsbUlDaHlaWEYxWlhOMExuTjBZWFIxY3lBOVBUMGdNQ0FtSmlBaEtISmxjWFZsYzNRdWNtVnpjRzl1YzJWVlVrd2dKaVlnY21WeGRXVnpkQzV5WlhOd2IyNXpaVlZTVEM1cGJtUmxlRTltS0NkbWFXeGxPaWNwSUQwOVBTQXdLU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUM4dklGQnlaWEJoY21VZ2RHaGxJSEpsYzNCdmJuTmxYRzRnSUNBZ0lDQjJZWElnY21WemNHOXVjMlZJWldGa1pYSnpJRDBnSjJkbGRFRnNiRkpsYzNCdmJuTmxTR1ZoWkdWeWN5Y2dhVzRnY21WeGRXVnpkQ0EvSUhCaGNuTmxTR1ZoWkdWeWN5aHlaWEYxWlhOMExtZGxkRUZzYkZKbGMzQnZibk5sU0dWaFpHVnljeWdwS1NBNklHNTFiR3c3WEc0Z0lDQWdJQ0IyWVhJZ2NtVnpjRzl1YzJWRVlYUmhJRDBnSVdOdmJtWnBaeTV5WlhOd2IyNXpaVlI1Y0dVZ2ZId2dZMjl1Wm1sbkxuSmxjM0J2Ym5ObFZIbHdaU0E5UFQwZ0ozUmxlSFFuSUQ4Z2NtVnhkV1Z6ZEM1eVpYTndiMjV6WlZSbGVIUWdPaUJ5WlhGMVpYTjBMbkpsYzNCdmJuTmxPMXh1SUNBZ0lDQWdkbUZ5SUhKbGMzQnZibk5sSUQwZ2UxeHVJQ0FnSUNBZ0lDQmtZWFJoT2lCeVpYTndiMjV6WlVSaGRHRXNYRzRnSUNBZ0lDQWdJSE4wWVhSMWN6b2djbVZ4ZFdWemRDNXpkR0YwZFhNc1hHNGdJQ0FnSUNBZ0lITjBZWFIxYzFSbGVIUTZJSEpsY1hWbGMzUXVjM1JoZEhWelZHVjRkQ3hjYmlBZ0lDQWdJQ0FnYUdWaFpHVnljem9nY21WemNHOXVjMlZJWldGa1pYSnpMRnh1SUNBZ0lDQWdJQ0JqYjI1bWFXYzZJR052Ym1acFp5eGNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemREb2djbVZ4ZFdWemRGeHVJQ0FnSUNBZ2ZUdGNibHh1SUNBZ0lDQWdjMlYwZEd4bEtISmxjMjlzZG1Vc0lISmxhbVZqZEN3Z2NtVnpjRzl1YzJVcE8xeHVYRzRnSUNBZ0lDQXZMeUJEYkdWaGJpQjFjQ0J5WlhGMVpYTjBYRzRnSUNBZ0lDQnlaWEYxWlhOMElEMGdiblZzYkR0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnTHk4Z1NHRnVaR3hsSUdKeWIzZHpaWElnY21WeGRXVnpkQ0JqWVc1alpXeHNZWFJwYjI0Z0tHRnpJRzl3Y0c5elpXUWdkRzhnWVNCdFlXNTFZV3dnWTJGdVkyVnNiR0YwYVc5dUtWeHVJQ0FnSUhKbGNYVmxjM1F1YjI1aFltOXlkQ0E5SUdaMWJtTjBhVzl1SUdoaGJtUnNaVUZpYjNKMEtDa2dlMXh1SUNBZ0lDQWdhV1lnS0NGeVpYRjFaWE4wS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVnFaV04wS0dOeVpXRjBaVVZ5Y205eUtDZFNaWEYxWlhOMElHRmliM0owWldRbkxDQmpiMjVtYVdjc0lDZEZRMDlPVGtGQ1QxSlVSVVFuTENCeVpYRjFaWE4wS1NrN1hHNWNiaUFnSUNBZ0lDOHZJRU5zWldGdUlIVndJSEpsY1hWbGMzUmNiaUFnSUNBZ0lISmxjWFZsYzNRZ1BTQnVkV3hzTzF4dUlDQWdJSDA3WEc1Y2JpQWdJQ0F2THlCSVlXNWtiR1VnYkc5M0lHeGxkbVZzSUc1bGRIZHZjbXNnWlhKeWIzSnpYRzRnSUNBZ2NtVnhkV1Z6ZEM1dmJtVnljbTl5SUQwZ1puVnVZM1JwYjI0Z2FHRnVaR3hsUlhKeWIzSW9LU0I3WEc0Z0lDQWdJQ0F2THlCU1pXRnNJR1Z5Y205eWN5QmhjbVVnYUdsa1pHVnVJR1p5YjIwZ2RYTWdZbmtnZEdobElHSnliM2R6WlhKY2JpQWdJQ0FnSUM4dklHOXVaWEp5YjNJZ2MyaHZkV3hrSUc5dWJIa2dabWx5WlNCcFppQnBkQ2R6SUdFZ2JtVjBkMjl5YXlCbGNuSnZjbHh1SUNBZ0lDQWdjbVZxWldOMEtHTnlaV0YwWlVWeWNtOXlLQ2RPWlhSM2IzSnJJRVZ5Y205eUp5d2dZMjl1Wm1sbkxDQnVkV3hzTENCeVpYRjFaWE4wS1NrN1hHNWNiaUFnSUNBZ0lDOHZJRU5zWldGdUlIVndJSEpsY1hWbGMzUmNiaUFnSUNBZ0lISmxjWFZsYzNRZ1BTQnVkV3hzTzF4dUlDQWdJSDA3WEc1Y2JpQWdJQ0F2THlCSVlXNWtiR1VnZEdsdFpXOTFkRnh1SUNBZ0lISmxjWFZsYzNRdWIyNTBhVzFsYjNWMElEMGdablZ1WTNScGIyNGdhR0Z1Wkd4bFZHbHRaVzkxZENncElIdGNiaUFnSUNBZ0lIWmhjaUIwYVcxbGIzVjBSWEp5YjNKTlpYTnpZV2RsSUQwZ0ozUnBiV1Z2ZFhRZ2IyWWdKeUFySUdOdmJtWnBaeTUwYVcxbGIzVjBJQ3NnSjIxeklHVjRZMlZsWkdWa0p6dGNiaUFnSUNBZ0lHbG1JQ2hqYjI1bWFXY3VkR2x0Wlc5MWRFVnljbTl5VFdWemMyRm5aU2tnZTF4dUlDQWdJQ0FnSUNCMGFXMWxiM1YwUlhKeWIzSk5aWE56WVdkbElEMGdZMjl1Wm1sbkxuUnBiV1Z2ZFhSRmNuSnZjazFsYzNOaFoyVTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnlaV3BsWTNRb1kzSmxZWFJsUlhKeWIzSW9kR2x0Wlc5MWRFVnljbTl5VFdWemMyRm5aU3dnWTI5dVptbG5MQ0FuUlVOUFRrNUJRazlTVkVWRUp5eGNiaUFnSUNBZ0lDQWdjbVZ4ZFdWemRDa3BPMXh1WEc0Z0lDQWdJQ0F2THlCRGJHVmhiaUIxY0NCeVpYRjFaWE4wWEc0Z0lDQWdJQ0J5WlhGMVpYTjBJRDBnYm5Wc2JEdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ0x5OGdRV1JrSUhoemNtWWdhR1ZoWkdWeVhHNGdJQ0FnTHk4Z1ZHaHBjeUJwY3lCdmJteDVJR1J2Ym1VZ2FXWWdjblZ1Ym1sdVp5QnBiaUJoSUhOMFlXNWtZWEprSUdKeWIzZHpaWElnWlc1MmFYSnZibTFsYm5RdVhHNGdJQ0FnTHk4Z1UzQmxZMmxtYVdOaGJHeDVJRzV2ZENCcFppQjNaU2R5WlNCcGJpQmhJSGRsWWlCM2IzSnJaWElzSUc5eUlISmxZV04wTFc1aGRHbDJaUzVjYmlBZ0lDQnBaaUFvZFhScGJITXVhWE5UZEdGdVpHRnlaRUp5YjNkelpYSkZibllvS1NrZ2UxeHVJQ0FnSUNBZ0x5OGdRV1JrSUhoemNtWWdhR1ZoWkdWeVhHNGdJQ0FnSUNCMllYSWdlSE55WmxaaGJIVmxJRDBnS0dOdmJtWnBaeTUzYVhSb1EzSmxaR1Z1ZEdsaGJITWdmSHdnYVhOVlVreFRZVzFsVDNKcFoybHVLR1oxYkd4UVlYUm9LU2tnSmlZZ1kyOXVabWxuTG5oemNtWkRiMjlyYVdWT1lXMWxJRDljYmlBZ0lDQWdJQ0FnWTI5dmEybGxjeTV5WldGa0tHTnZibVpwWnk1NGMzSm1RMjl2YTJsbFRtRnRaU2tnT2x4dUlDQWdJQ0FnSUNCMWJtUmxabWx1WldRN1hHNWNiaUFnSUNBZ0lHbG1JQ2g0YzNKbVZtRnNkV1VwSUh0Y2JpQWdJQ0FnSUNBZ2NtVnhkV1Z6ZEVobFlXUmxjbk5iWTI5dVptbG5Mbmh6Y21aSVpXRmtaWEpPWVcxbFhTQTlJSGh6Y21aV1lXeDFaVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJCWkdRZ2FHVmhaR1Z5Y3lCMGJ5QjBhR1VnY21WeGRXVnpkRnh1SUNBZ0lHbG1JQ2duYzJWMFVtVnhkV1Z6ZEVobFlXUmxjaWNnYVc0Z2NtVnhkV1Z6ZENrZ2UxeHVJQ0FnSUNBZ2RYUnBiSE11Wm05eVJXRmphQ2h5WlhGMVpYTjBTR1ZoWkdWeWN5d2dablZ1WTNScGIyNGdjMlYwVW1WeGRXVnpkRWhsWVdSbGNpaDJZV3dzSUd0bGVTa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUhKbGNYVmxjM1JFWVhSaElEMDlQU0FuZFc1a1pXWnBibVZrSnlBbUppQnJaWGt1ZEc5TWIzZGxja05oYzJVb0tTQTlQVDBnSjJOdmJuUmxiblF0ZEhsd1pTY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBdkx5QlNaVzF2ZG1VZ1EyOXVkR1Z1ZEMxVWVYQmxJR2xtSUdSaGRHRWdhWE1nZFc1a1pXWnBibVZrWEc0Z0lDQWdJQ0FnSUNBZ1pHVnNaWFJsSUhKbGNYVmxjM1JJWldGa1pYSnpXMnRsZVYwN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdMeThnVDNSb1pYSjNhWE5sSUdGa1pDQm9aV0ZrWlhJZ2RHOGdkR2hsSUhKbGNYVmxjM1JjYmlBZ0lDQWdJQ0FnSUNCeVpYRjFaWE4wTG5ObGRGSmxjWFZsYzNSSVpXRmtaWElvYTJWNUxDQjJZV3dwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QkJaR1FnZDJsMGFFTnlaV1JsYm5ScFlXeHpJSFJ2SUhKbGNYVmxjM1FnYVdZZ2JtVmxaR1ZrWEc0Z0lDQWdhV1lnS0NGMWRHbHNjeTVwYzFWdVpHVm1hVzVsWkNoamIyNW1hV2N1ZDJsMGFFTnlaV1JsYm5ScFlXeHpLU2tnZTF4dUlDQWdJQ0FnY21WeGRXVnpkQzUzYVhSb1EzSmxaR1Z1ZEdsaGJITWdQU0FoSVdOdmJtWnBaeTUzYVhSb1EzSmxaR1Z1ZEdsaGJITTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdRV1JrSUhKbGMzQnZibk5sVkhsd1pTQjBieUJ5WlhGMVpYTjBJR2xtSUc1bFpXUmxaRnh1SUNBZ0lHbG1JQ2hqYjI1bWFXY3VjbVZ6Y0c5dWMyVlVlWEJsS1NCN1hHNGdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0J5WlhGMVpYTjBMbkpsYzNCdmJuTmxWSGx3WlNBOUlHTnZibVpwWnk1eVpYTndiMjV6WlZSNWNHVTdYRzRnSUNBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0FnSUM4dklFVjRjR1ZqZEdWa0lFUlBUVVY0WTJWd2RHbHZiaUIwYUhKdmQyNGdZbmtnWW5KdmQzTmxjbk1nYm05MElHTnZiWEJoZEdsaWJHVWdXRTFNU0hSMGNGSmxjWFZsYzNRZ1RHVjJaV3dnTWk1Y2JpQWdJQ0FnSUNBZ0x5OGdRblYwTENCMGFHbHpJR05oYmlCaVpTQnpkWEJ3Y21WemMyVmtJR1p2Y2lBbmFuTnZiaWNnZEhsd1pTQmhjeUJwZENCallXNGdZbVVnY0dGeWMyVmtJR0o1SUdSbFptRjFiSFFnSjNSeVlXNXpabTl5YlZKbGMzQnZibk5sSnlCbWRXNWpkR2x2Ymk1Y2JpQWdJQ0FnSUNBZ2FXWWdLR052Ym1acFp5NXlaWE53YjI1elpWUjVjR1VnSVQwOUlDZHFjMjl1SnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvY205M0lHVTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJJWVc1a2JHVWdjSEp2WjNKbGMzTWdhV1lnYm1WbFpHVmtYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQmpiMjVtYVdjdWIyNUViM2R1Ykc5aFpGQnliMmR5WlhOeklEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCeVpYRjFaWE4wTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjNCeWIyZHlaWE56Snl3Z1kyOXVabWxuTG05dVJHOTNibXh2WVdSUWNtOW5jbVZ6Y3lrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1RtOTBJR0ZzYkNCaWNtOTNjMlZ5Y3lCemRYQndiM0owSUhWd2JHOWhaQ0JsZG1WdWRITmNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHTnZibVpwWnk1dmJsVndiRzloWkZCeWIyZHlaWE56SUQwOVBTQW5ablZ1WTNScGIyNG5JQ1ltSUhKbGNYVmxjM1F1ZFhCc2IyRmtLU0I3WEc0Z0lDQWdJQ0J5WlhGMVpYTjBMblZ3Ykc5aFpDNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHdjbTluY21WemN5Y3NJR052Ym1acFp5NXZibFZ3Ykc5aFpGQnliMmR5WlhOektUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9ZMjl1Wm1sbkxtTmhibU5sYkZSdmEyVnVLU0I3WEc0Z0lDQWdJQ0F2THlCSVlXNWtiR1VnWTJGdVkyVnNiR0YwYVc5dVhHNGdJQ0FnSUNCamIyNW1hV2N1WTJGdVkyVnNWRzlyWlc0dWNISnZiV2x6WlM1MGFHVnVLR1oxYm1OMGFXOXVJRzl1UTJGdVkyVnNaV1FvWTJGdVkyVnNLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDZ2hjbVZ4ZFdWemRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lISmxjWFZsYzNRdVlXSnZjblFvS1R0Y2JpQWdJQ0FnSUNBZ2NtVnFaV04wS0dOaGJtTmxiQ2s3WEc0Z0lDQWdJQ0FnSUM4dklFTnNaV0Z1SUhWd0lISmxjWFZsYzNSY2JpQWdJQ0FnSUNBZ2NtVnhkV1Z6ZENBOUlHNTFiR3c3WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb0lYSmxjWFZsYzNSRVlYUmhLU0I3WEc0Z0lDQWdJQ0J5WlhGMVpYTjBSR0YwWVNBOUlHNTFiR3c3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnVTJWdVpDQjBhR1VnY21WeGRXVnpkRnh1SUNBZ0lISmxjWFZsYzNRdWMyVnVaQ2h5WlhGMVpYTjBSR0YwWVNrN1hHNGdJSDBwTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1ZG1GeUlIVjBhV3h6SUQwZ2NtVnhkV2x5WlNnbkxpOTFkR2xzY3ljcE8xeHVkbUZ5SUdKcGJtUWdQU0J5WlhGMWFYSmxLQ2N1TDJobGJIQmxjbk12WW1sdVpDY3BPMXh1ZG1GeUlFRjRhVzl6SUQwZ2NtVnhkV2x5WlNnbkxpOWpiM0psTDBGNGFXOXpKeWs3WEc1MllYSWdiV1Z5WjJWRGIyNW1hV2NnUFNCeVpYRjFhWEpsS0NjdUwyTnZjbVV2YldWeVoyVkRiMjVtYVdjbktUdGNiblpoY2lCa1pXWmhkV3gwY3lBOUlISmxjWFZwY21Vb0p5NHZaR1ZtWVhWc2RITW5LVHRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1VnWVc0Z2FXNXpkR0Z1WTJVZ2IyWWdRWGhwYjNOY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWkdWbVlYVnNkRU52Ym1acFp5QlVhR1VnWkdWbVlYVnNkQ0JqYjI1bWFXY2dabTl5SUhSb1pTQnBibk4wWVc1alpWeHVJQ29nUUhKbGRIVnliaUI3UVhocGIzTjlJRUVnYm1WM0lHbHVjM1JoYm1ObElHOW1JRUY0YVc5elhHNGdLaTljYm1aMWJtTjBhVzl1SUdOeVpXRjBaVWx1YzNSaGJtTmxLR1JsWm1GMWJIUkRiMjVtYVdjcElIdGNiaUFnZG1GeUlHTnZiblJsZUhRZ1BTQnVaWGNnUVhocGIzTW9aR1ZtWVhWc2RFTnZibVpwWnlrN1hHNGdJSFpoY2lCcGJuTjBZVzVqWlNBOUlHSnBibVFvUVhocGIzTXVjSEp2ZEc5MGVYQmxMbkpsY1hWbGMzUXNJR052Ym5SbGVIUXBPMXh1WEc0Z0lDOHZJRU52Y0hrZ1lYaHBiM011Y0hKdmRHOTBlWEJsSUhSdklHbHVjM1JoYm1ObFhHNGdJSFYwYVd4ekxtVjRkR1Z1WkNocGJuTjBZVzVqWlN3Z1FYaHBiM011Y0hKdmRHOTBlWEJsTENCamIyNTBaWGgwS1R0Y2JseHVJQ0F2THlCRGIzQjVJR052Ym5SbGVIUWdkRzhnYVc1emRHRnVZMlZjYmlBZ2RYUnBiSE11WlhoMFpXNWtLR2x1YzNSaGJtTmxMQ0JqYjI1MFpYaDBLVHRjYmx4dUlDQnlaWFIxY200Z2FXNXpkR0Z1WTJVN1hHNTlYRzVjYmk4dklFTnlaV0YwWlNCMGFHVWdaR1ZtWVhWc2RDQnBibk4wWVc1alpTQjBieUJpWlNCbGVIQnZjblJsWkZ4dWRtRnlJR0Y0YVc5eklEMGdZM0psWVhSbFNXNXpkR0Z1WTJVb1pHVm1ZWFZzZEhNcE8xeHVYRzR2THlCRmVIQnZjMlVnUVhocGIzTWdZMnhoYzNNZ2RHOGdZV3hzYjNjZ1kyeGhjM01nYVc1b1pYSnBkR0Z1WTJWY2JtRjRhVzl6TGtGNGFXOXpJRDBnUVhocGIzTTdYRzVjYmk4dklFWmhZM1J2Y25rZ1ptOXlJR055WldGMGFXNW5JRzVsZHlCcGJuTjBZVzVqWlhOY2JtRjRhVzl6TG1OeVpXRjBaU0E5SUdaMWJtTjBhVzl1SUdOeVpXRjBaU2hwYm5OMFlXNWpaVU52Ym1acFp5a2dlMXh1SUNCeVpYUjFjbTRnWTNKbFlYUmxTVzV6ZEdGdVkyVW9iV1Z5WjJWRGIyNW1hV2NvWVhocGIzTXVaR1ZtWVhWc2RITXNJR2x1YzNSaGJtTmxRMjl1Wm1sbktTazdYRzU5TzF4dVhHNHZMeUJGZUhCdmMyVWdRMkZ1WTJWc0lDWWdRMkZ1WTJWc1ZHOXJaVzVjYm1GNGFXOXpMa05oYm1ObGJDQTlJSEpsY1hWcGNtVW9KeTR2WTJGdVkyVnNMME5oYm1ObGJDY3BPMXh1WVhocGIzTXVRMkZ1WTJWc1ZHOXJaVzRnUFNCeVpYRjFhWEpsS0NjdUwyTmhibU5sYkM5RFlXNWpaV3hVYjJ0bGJpY3BPMXh1WVhocGIzTXVhWE5EWVc1alpXd2dQU0J5WlhGMWFYSmxLQ2N1TDJOaGJtTmxiQzlwYzBOaGJtTmxiQ2NwTzF4dVhHNHZMeUJGZUhCdmMyVWdZV3hzTDNOd2NtVmhaRnh1WVhocGIzTXVZV3hzSUQwZ1puVnVZM1JwYjI0Z1lXeHNLSEJ5YjIxcGMyVnpLU0I3WEc0Z0lISmxkSFZ5YmlCUWNtOXRhWE5sTG1Gc2JDaHdjbTl0YVhObGN5azdYRzU5TzF4dVlYaHBiM011YzNCeVpXRmtJRDBnY21WeGRXbHlaU2duTGk5b1pXeHdaWEp6TDNOd2NtVmhaQ2NwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHRjRhVzl6TzF4dVhHNHZMeUJCYkd4dmR5QjFjMlVnYjJZZ1pHVm1ZWFZzZENCcGJYQnZjblFnYzNsdWRHRjRJR2x1SUZSNWNHVlRZM0pwY0hSY2JtMXZaSFZzWlM1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCaGVHbHZjenRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCQklHQkRZVzVqWld4Z0lHbHpJR0Z1SUc5aWFtVmpkQ0IwYUdGMElHbHpJSFJvY205M2JpQjNhR1Z1SUdGdUlHOXdaWEpoZEdsdmJpQnBjeUJqWVc1alpXeGxaQzVjYmlBcVhHNGdLaUJBWTJ4aGMzTmNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5QWDBnYldWemMyRm5aU0JVYUdVZ2JXVnpjMkZuWlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnUTJGdVkyVnNLRzFsYzNOaFoyVXBJSHRjYmlBZ2RHaHBjeTV0WlhOellXZGxJRDBnYldWemMyRm5aVHRjYm4xY2JseHVRMkZ1WTJWc0xuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp5QTlJR1oxYm1OMGFXOXVJSFJ2VTNSeWFXNW5LQ2tnZTF4dUlDQnlaWFIxY200Z0owTmhibU5sYkNjZ0t5QW9kR2hwY3k1dFpYTnpZV2RsSUQ4Z0p6b2dKeUFySUhSb2FYTXViV1Z6YzJGblpTQTZJQ2NuS1R0Y2JuMDdYRzVjYmtOaGJtTmxiQzV3Y205MGIzUjVjR1V1WDE5RFFVNURSVXhmWHlBOUlIUnlkV1U3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1EyRnVZMlZzTzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnUTJGdVkyVnNJRDBnY21WeGRXbHlaU2duTGk5RFlXNWpaV3duS1R0Y2JseHVMeW9xWEc0Z0tpQkJJR0JEWVc1alpXeFViMnRsYm1BZ2FYTWdZVzRnYjJKcVpXTjBJSFJvWVhRZ1kyRnVJR0psSUhWelpXUWdkRzhnY21WeGRXVnpkQ0JqWVc1alpXeHNZWFJwYjI0Z2IyWWdZVzRnYjNCbGNtRjBhVzl1TGx4dUlDcGNiaUFxSUVCamJHRnpjMXh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1pYaGxZM1YwYjNJZ1ZHaGxJR1Y0WldOMWRHOXlJR1oxYm1OMGFXOXVMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQkRZVzVqWld4VWIydGxiaWhsZUdWamRYUnZjaWtnZTF4dUlDQnBaaUFvZEhsd1pXOW1JR1Y0WldOMWRHOXlJQ0U5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpZ25aWGhsWTNWMGIzSWdiWFZ6ZENCaVpTQmhJR1oxYm1OMGFXOXVMaWNwTzF4dUlDQjlYRzVjYmlBZ2RtRnlJSEpsYzI5c2RtVlFjbTl0YVhObE8xeHVJQ0IwYUdsekxuQnliMjFwYzJVZ1BTQnVaWGNnVUhKdmJXbHpaU2htZFc1amRHbHZiaUJ3Y205dGFYTmxSWGhsWTNWMGIzSW9jbVZ6YjJ4MlpTa2dlMXh1SUNBZ0lISmxjMjlzZG1WUWNtOXRhWE5sSUQwZ2NtVnpiMngyWlR0Y2JpQWdmU2s3WEc1Y2JpQWdkbUZ5SUhSdmEyVnVJRDBnZEdocGN6dGNiaUFnWlhobFkzVjBiM0lvWm5WdVkzUnBiMjRnWTJGdVkyVnNLRzFsYzNOaFoyVXBJSHRjYmlBZ0lDQnBaaUFvZEc5clpXNHVjbVZoYzI5dUtTQjdYRzRnSUNBZ0lDQXZMeUJEWVc1alpXeHNZWFJwYjI0Z2FHRnpJR0ZzY21WaFpIa2dZbVZsYmlCeVpYRjFaWE4wWldSY2JpQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjBiMnRsYmk1eVpXRnpiMjRnUFNCdVpYY2dRMkZ1WTJWc0tHMWxjM05oWjJVcE8xeHVJQ0FnSUhKbGMyOXNkbVZRY205dGFYTmxLSFJ2YTJWdUxuSmxZWE52YmlrN1hHNGdJSDBwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRlJvY205M2N5QmhJR0JEWVc1alpXeGdJR2xtSUdOaGJtTmxiR3hoZEdsdmJpQm9ZWE1nWW1WbGJpQnlaWEYxWlhOMFpXUXVYRzRnS2k5Y2JrTmhibU5sYkZSdmEyVnVMbkJ5YjNSdmRIbHdaUzUwYUhKdmQwbG1VbVZ4ZFdWemRHVmtJRDBnWm5WdVkzUnBiMjRnZEdoeWIzZEpabEpsY1hWbGMzUmxaQ2dwSUh0Y2JpQWdhV1lnS0hSb2FYTXVjbVZoYzI5dUtTQjdYRzRnSUNBZ2RHaHliM2NnZEdocGN5NXlaV0Z6YjI0N1hHNGdJSDFjYm4wN1hHNWNiaThxS2x4dUlDb2dVbVYwZFhKdWN5QmhiaUJ2WW1wbFkzUWdkR2hoZENCamIyNTBZV2x1Y3lCaElHNWxkeUJnUTJGdVkyVnNWRzlyWlc1Z0lHRnVaQ0JoSUdaMWJtTjBhVzl1SUhSb1lYUXNJSGRvWlc0Z1kyRnNiR1ZrTEZ4dUlDb2dZMkZ1WTJWc2N5QjBhR1VnWUVOaGJtTmxiRlJ2YTJWdVlDNWNiaUFxTDF4dVEyRnVZMlZzVkc5clpXNHVjMjkxY21ObElEMGdablZ1WTNScGIyNGdjMjkxY21ObEtDa2dlMXh1SUNCMllYSWdZMkZ1WTJWc08xeHVJQ0IyWVhJZ2RHOXJaVzRnUFNCdVpYY2dRMkZ1WTJWc1ZHOXJaVzRvWm5WdVkzUnBiMjRnWlhobFkzVjBiM0lvWXlrZ2UxeHVJQ0FnSUdOaGJtTmxiQ0E5SUdNN1hHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUhSdmEyVnVPaUIwYjJ0bGJpeGNiaUFnSUNCallXNWpaV3c2SUdOaGJtTmxiRnh1SUNCOU8xeHVmVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCRFlXNWpaV3hVYjJ0bGJqdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJwYzBOaGJtTmxiQ2gyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnSVNFb2RtRnNkV1VnSmlZZ2RtRnNkV1V1WDE5RFFVNURSVXhmWHlrN1hHNTlPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMeTR1TDNWMGFXeHpKeWs3WEc1MllYSWdZblZwYkdSVlVrd2dQU0J5WlhGMWFYSmxLQ2N1TGk5b1pXeHdaWEp6TDJKMWFXeGtWVkpNSnlrN1hHNTJZWElnU1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5SUQwZ2NtVnhkV2x5WlNnbkxpOUpiblJsY21ObGNIUnZjazFoYm1GblpYSW5LVHRjYm5aaGNpQmthWE53WVhSamFGSmxjWFZsYzNRZ1BTQnlaWEYxYVhKbEtDY3VMMlJwYzNCaGRHTm9VbVZ4ZFdWemRDY3BPMXh1ZG1GeUlHMWxjbWRsUTI5dVptbG5JRDBnY21WeGRXbHlaU2duTGk5dFpYSm5aVU52Ym1acFp5Y3BPMXh1WEc0dktpcGNiaUFxSUVOeVpXRjBaU0JoSUc1bGR5QnBibk4wWVc1alpTQnZaaUJCZUdsdmMxeHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCcGJuTjBZVzVqWlVOdmJtWnBaeUJVYUdVZ1pHVm1ZWFZzZENCamIyNW1hV2NnWm05eUlIUm9aU0JwYm5OMFlXNWpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQkJlR2x2Y3locGJuTjBZVzVqWlVOdmJtWnBaeWtnZTF4dUlDQjBhR2x6TG1SbFptRjFiSFJ6SUQwZ2FXNXpkR0Z1WTJWRGIyNW1hV2M3WEc0Z0lIUm9hWE11YVc1MFpYSmpaWEIwYjNKeklEMGdlMXh1SUNBZ0lISmxjWFZsYzNRNklHNWxkeUJKYm5SbGNtTmxjSFJ2Y2sxaGJtRm5aWElvS1N4Y2JpQWdJQ0J5WlhOd2IyNXpaVG9nYm1WM0lFbHVkR1Z5WTJWd2RHOXlUV0Z1WVdkbGNpZ3BYRzRnSUgwN1hHNTlYRzVjYmk4cUtseHVJQ29nUkdsemNHRjBZMmdnWVNCeVpYRjFaWE4wWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR052Ym1acFp5QlVhR1VnWTI5dVptbG5JSE53WldOcFptbGpJR1p2Y2lCMGFHbHpJSEpsY1hWbGMzUWdLRzFsY21kbFpDQjNhWFJvSUhSb2FYTXVaR1ZtWVhWc2RITXBYRzRnS2k5Y2JrRjRhVzl6TG5CeWIzUnZkSGx3WlM1eVpYRjFaWE4wSUQwZ1puVnVZM1JwYjI0Z2NtVnhkV1Z6ZENoamIyNW1hV2NwSUh0Y2JpQWdMeXBsYzJ4cGJuUWdibTh0Y0dGeVlXMHRjbVZoYzNOcFoyNDZNQ292WEc0Z0lDOHZJRUZzYkc5M0lHWnZjaUJoZUdsdmN5Z25aWGhoYlhCc1pTOTFjbXduV3l3Z1kyOXVabWxuWFNrZ1lTQnNZU0JtWlhSamFDQkJVRWxjYmlBZ2FXWWdLSFI1Y0dWdlppQmpiMjVtYVdjZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdZMjl1Wm1sbklEMGdZWEpuZFcxbGJuUnpXekZkSUh4OElIdDlPMXh1SUNBZ0lHTnZibVpwWnk1MWNtd2dQU0JoY21kMWJXVnVkSE5iTUYwN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1kyOXVabWxuSUQwZ1kyOXVabWxuSUh4OElIdDlPMXh1SUNCOVhHNWNiaUFnWTI5dVptbG5JRDBnYldWeVoyVkRiMjVtYVdjb2RHaHBjeTVrWldaaGRXeDBjeXdnWTI5dVptbG5LVHRjYmx4dUlDQXZMeUJUWlhRZ1kyOXVabWxuTG0xbGRHaHZaRnh1SUNCcFppQW9ZMjl1Wm1sbkxtMWxkR2h2WkNrZ2UxeHVJQ0FnSUdOdmJtWnBaeTV0WlhSb2IyUWdQU0JqYjI1bWFXY3ViV1YwYUc5a0xuUnZURzkzWlhKRFlYTmxLQ2s3WEc0Z0lIMGdaV3h6WlNCcFppQW9kR2hwY3k1a1pXWmhkV3gwY3k1dFpYUm9iMlFwSUh0Y2JpQWdJQ0JqYjI1bWFXY3ViV1YwYUc5a0lEMGdkR2hwY3k1a1pXWmhkV3gwY3k1dFpYUm9iMlF1ZEc5TWIzZGxja05oYzJVb0tUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmpiMjVtYVdjdWJXVjBhRzlrSUQwZ0oyZGxkQ2M3WEc0Z0lIMWNibHh1SUNBdkx5QkliMjlySUhWd0lHbHVkR1Z5WTJWd2RHOXljeUJ0YVdSa2JHVjNZWEpsWEc0Z0lIWmhjaUJqYUdGcGJpQTlJRnRrYVhOd1lYUmphRkpsY1hWbGMzUXNJSFZ1WkdWbWFXNWxaRjA3WEc0Z0lIWmhjaUJ3Y205dGFYTmxJRDBnVUhKdmJXbHpaUzV5WlhOdmJIWmxLR052Ym1acFp5azdYRzVjYmlBZ2RHaHBjeTVwYm5SbGNtTmxjSFJ2Y25NdWNtVnhkV1Z6ZEM1bWIzSkZZV05vS0daMWJtTjBhVzl1SUhWdWMyaHBablJTWlhGMVpYTjBTVzUwWlhKalpYQjBiM0p6S0dsdWRHVnlZMlZ3ZEc5eUtTQjdYRzRnSUNBZ1kyaGhhVzR1ZFc1emFHbG1kQ2hwYm5SbGNtTmxjSFJ2Y2k1bWRXeG1hV3hzWldRc0lHbHVkR1Z5WTJWd2RHOXlMbkpsYW1WamRHVmtLVHRjYmlBZ2ZTazdYRzVjYmlBZ2RHaHBjeTVwYm5SbGNtTmxjSFJ2Y25NdWNtVnpjRzl1YzJVdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlCd2RYTm9VbVZ6Y0c5dWMyVkpiblJsY21ObGNIUnZjbk1vYVc1MFpYSmpaWEIwYjNJcElIdGNiaUFnSUNCamFHRnBiaTV3ZFhOb0tHbHVkR1Z5WTJWd2RHOXlMbVoxYkdacGJHeGxaQ3dnYVc1MFpYSmpaWEIwYjNJdWNtVnFaV04wWldRcE8xeHVJQ0I5S1R0Y2JseHVJQ0IzYUdsc1pTQW9ZMmhoYVc0dWJHVnVaM1JvS1NCN1hHNGdJQ0FnY0hKdmJXbHpaU0E5SUhCeWIyMXBjMlV1ZEdobGJpaGphR0ZwYmk1emFHbG1kQ2dwTENCamFHRnBiaTV6YUdsbWRDZ3BLVHRjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJ3Y205dGFYTmxPMXh1ZlR0Y2JseHVRWGhwYjNNdWNISnZkRzkwZVhCbExtZGxkRlZ5YVNBOUlHWjFibU4wYVc5dUlHZGxkRlZ5YVNoamIyNW1hV2NwSUh0Y2JpQWdZMjl1Wm1sbklEMGdiV1Z5WjJWRGIyNW1hV2NvZEdocGN5NWtaV1poZFd4MGN5d2dZMjl1Wm1sbktUdGNiaUFnY21WMGRYSnVJR0oxYVd4a1ZWSk1LR052Ym1acFp5NTFjbXdzSUdOdmJtWnBaeTV3WVhKaGJYTXNJR052Ym1acFp5NXdZWEpoYlhOVFpYSnBZV3hwZW1WeUtTNXlaWEJzWVdObEtDOWVYRncvTHl3Z0p5Y3BPMXh1ZlR0Y2JseHVMeThnVUhKdmRtbGtaU0JoYkdsaGMyVnpJR1p2Y2lCemRYQndiM0owWldRZ2NtVnhkV1Z6ZENCdFpYUm9iMlJ6WEc1MWRHbHNjeTVtYjNKRllXTm9LRnNuWkdWc1pYUmxKeXdnSjJkbGRDY3NJQ2RvWldGa0p5d2dKMjl3ZEdsdmJuTW5YU3dnWm5WdVkzUnBiMjRnWm05eVJXRmphRTFsZEdodlpFNXZSR0YwWVNodFpYUm9iMlFwSUh0Y2JpQWdMeXBsYzJ4cGJuUWdablZ1WXkxdVlXMWxjem93S2k5Y2JpQWdRWGhwYjNNdWNISnZkRzkwZVhCbFcyMWxkR2h2WkYwZ1BTQm1kVzVqZEdsdmJpaDFjbXdzSUdOdmJtWnBaeWtnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TG5KbGNYVmxjM1FvYldWeVoyVkRiMjVtYVdjb1kyOXVabWxuSUh4OElIdDlMQ0I3WEc0Z0lDQWdJQ0J0WlhSb2IyUTZJRzFsZEdodlpDeGNiaUFnSUNBZ0lIVnliRG9nZFhKc0xGeHVJQ0FnSUNBZ1pHRjBZVG9nS0dOdmJtWnBaeUI4ZkNCN2ZTa3VaR0YwWVZ4dUlDQWdJSDBwS1R0Y2JpQWdmVHRjYm4wcE8xeHVYRzUxZEdsc2N5NW1iM0pGWVdOb0tGc25jRzl6ZENjc0lDZHdkWFFuTENBbmNHRjBZMmduWFN3Z1puVnVZM1JwYjI0Z1ptOXlSV0ZqYUUxbGRHaHZaRmRwZEdoRVlYUmhLRzFsZEdodlpDa2dlMXh1SUNBdkttVnpiR2x1ZENCbWRXNWpMVzVoYldWek9qQXFMMXh1SUNCQmVHbHZjeTV3Y205MGIzUjVjR1ZiYldWMGFHOWtYU0E5SUdaMWJtTjBhVzl1S0hWeWJDd2daR0YwWVN3Z1kyOXVabWxuS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdWNtVnhkV1Z6ZENodFpYSm5aVU52Ym1acFp5aGpiMjVtYVdjZ2ZId2dlMzBzSUh0Y2JpQWdJQ0FnSUcxbGRHaHZaRG9nYldWMGFHOWtMRnh1SUNBZ0lDQWdkWEpzT2lCMWNtd3NYRzRnSUNBZ0lDQmtZWFJoT2lCa1lYUmhYRzRnSUNBZ2ZTa3BPMXh1SUNCOU8xeHVmU2s3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1FYaHBiM003WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUIxZEdsc2N5QTlJSEpsY1hWcGNtVW9KeTR2TGk0dmRYUnBiSE1uS1R0Y2JseHVablZ1WTNScGIyNGdTVzUwWlhKalpYQjBiM0pOWVc1aFoyVnlLQ2tnZTF4dUlDQjBhR2x6TG1oaGJtUnNaWEp6SUQwZ1cxMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FXUmtJR0VnYm1WM0lHbHVkR1Z5WTJWd2RHOXlJSFJ2SUhSb1pTQnpkR0ZqYTF4dUlDcGNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdaMWJHWnBiR3hsWkNCVWFHVWdablZ1WTNScGIyNGdkRzhnYUdGdVpHeGxJR0IwYUdWdVlDQm1iM0lnWVNCZ1VISnZiV2x6WldCY2JpQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJSEpsYW1WamRHVmtJRlJvWlNCbWRXNWpkR2x2YmlCMGJ5Qm9ZVzVrYkdVZ1lISmxhbVZqZEdBZ1ptOXlJR0VnWUZCeWIyMXBjMlZnWEc0Z0tseHVJQ29nUUhKbGRIVnliaUI3VG5WdFltVnlmU0JCYmlCSlJDQjFjMlZrSUhSdklISmxiVzkyWlNCcGJuUmxjbU5sY0hSdmNpQnNZWFJsY2x4dUlDb3ZYRzVKYm5SbGNtTmxjSFJ2Y2sxaGJtRm5aWEl1Y0hKdmRHOTBlWEJsTG5WelpTQTlJR1oxYm1OMGFXOXVJSFZ6WlNobWRXeG1hV3hzWldRc0lISmxhbVZqZEdWa0tTQjdYRzRnSUhSb2FYTXVhR0Z1Wkd4bGNuTXVjSFZ6YUNoN1hHNGdJQ0FnWm5Wc1ptbHNiR1ZrT2lCbWRXeG1hV3hzWldRc1hHNGdJQ0FnY21WcVpXTjBaV1E2SUhKbGFtVmpkR1ZrWEc0Z0lIMHBPMXh1SUNCeVpYUjFjbTRnZEdocGN5NW9ZVzVrYkdWeWN5NXNaVzVuZEdnZ0xTQXhPMXh1ZlR0Y2JseHVMeW9xWEc0Z0tpQlNaVzF2ZG1VZ1lXNGdhVzUwWlhKalpYQjBiM0lnWm5KdmJTQjBhR1VnYzNSaFkydGNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2FXUWdWR2hsSUVsRUlIUm9ZWFFnZDJGeklISmxkSFZ5Ym1Wa0lHSjVJR0IxYzJWZ1hHNGdLaTljYmtsdWRHVnlZMlZ3ZEc5eVRXRnVZV2RsY2k1d2NtOTBiM1I1Y0dVdVpXcGxZM1FnUFNCbWRXNWpkR2x2YmlCbGFtVmpkQ2hwWkNrZ2UxeHVJQ0JwWmlBb2RHaHBjeTVvWVc1a2JHVnljMXRwWkYwcElIdGNiaUFnSUNCMGFHbHpMbWhoYm1Sc1pYSnpXMmxrWFNBOUlHNTFiR3c3WEc0Z0lIMWNibjA3WEc1Y2JpOHFLbHh1SUNvZ1NYUmxjbUYwWlNCdmRtVnlJR0ZzYkNCMGFHVWdjbVZuYVhOMFpYSmxaQ0JwYm5SbGNtTmxjSFJ2Y25OY2JpQXFYRzRnS2lCVWFHbHpJRzFsZEdodlpDQnBjeUJ3WVhKMGFXTjFiR0Z5YkhrZ2RYTmxablZzSUdadmNpQnphMmx3Y0dsdVp5QnZkbVZ5SUdGdWVWeHVJQ29nYVc1MFpYSmpaWEIwYjNKeklIUm9ZWFFnYldGNUlHaGhkbVVnWW1WamIyMWxJR0J1ZFd4c1lDQmpZV3hzYVc1bklHQmxhbVZqZEdBdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1ptNGdWR2hsSUdaMWJtTjBhVzl1SUhSdklHTmhiR3dnWm05eUlHVmhZMmdnYVc1MFpYSmpaWEIwYjNKY2JpQXFMMXh1U1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5TG5CeWIzUnZkSGx3WlM1bWIzSkZZV05vSUQwZ1puVnVZM1JwYjI0Z1ptOXlSV0ZqYUNobWJpa2dlMXh1SUNCMWRHbHNjeTVtYjNKRllXTm9LSFJvYVhNdWFHRnVaR3hsY25Nc0lHWjFibU4wYVc5dUlHWnZja1ZoWTJoSVlXNWtiR1Z5S0dncElIdGNiaUFnSUNCcFppQW9hQ0FoUFQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnWm00b2FDazdYRzRnSUNBZ2ZWeHVJQ0I5S1R0Y2JuMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnU1c1MFpYSmpaWEIwYjNKTllXNWhaMlZ5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnYVhOQlluTnZiSFYwWlZWU1RDQTlJSEpsY1hWcGNtVW9KeTR1TDJobGJIQmxjbk12YVhOQlluTnZiSFYwWlZWU1RDY3BPMXh1ZG1GeUlHTnZiV0pwYm1WVlVreHpJRDBnY21WeGRXbHlaU2duTGk0dmFHVnNjR1Z5Y3k5amIyMWlhVzVsVlZKTWN5Y3BPMXh1WEc0dktpcGNiaUFxSUVOeVpXRjBaWE1nWVNCdVpYY2dWVkpNSUdKNUlHTnZiV0pwYm1sdVp5QjBhR1VnWW1GelpWVlNUQ0IzYVhSb0lIUm9aU0J5WlhGMVpYTjBaV1JWVWt3c1hHNGdLaUJ2Ym14NUlIZG9aVzRnZEdobElISmxjWFZsYzNSbFpGVlNUQ0JwY3lCdWIzUWdZV3h5WldGa2VTQmhiaUJoWW5OdmJIVjBaU0JWVWt3dVhHNGdLaUJKWmlCMGFHVWdjbVZ4ZFdWemRGVlNUQ0JwY3lCaFluTnZiSFYwWlN3Z2RHaHBjeUJtZFc1amRHbHZiaUJ5WlhSMWNtNXpJSFJvWlNCeVpYRjFaWE4wWldSVlVrd2dkVzUwYjNWamFHVmtMbHh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQmlZWE5sVlZKTUlGUm9aU0JpWVhObElGVlNURnh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUhKbGNYVmxjM1JsWkZWU1RDQkJZbk52YkhWMFpTQnZjaUJ5Wld4aGRHbDJaU0JWVWt3Z2RHOGdZMjl0WW1sdVpWeHVJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzBnVkdobElHTnZiV0pwYm1Wa0lHWjFiR3dnY0dGMGFGeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdKMWFXeGtSblZzYkZCaGRHZ29ZbUZ6WlZWU1RDd2djbVZ4ZFdWemRHVmtWVkpNS1NCN1hHNGdJR2xtSUNoaVlYTmxWVkpNSUNZbUlDRnBjMEZpYzI5c2RYUmxWVkpNS0hKbGNYVmxjM1JsWkZWU1RDa3BJSHRjYmlBZ0lDQnlaWFIxY200Z1kyOXRZbWx1WlZWU1RITW9ZbUZ6WlZWU1RDd2djbVZ4ZFdWemRHVmtWVkpNS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WeGRXVnpkR1ZrVlZKTU8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR1Z1YUdGdVkyVkZjbkp2Y2lBOUlISmxjWFZwY21Vb0p5NHZaVzVvWVc1alpVVnljbTl5SnlrN1hHNWNiaThxS2x4dUlDb2dRM0psWVhSbElHRnVJRVZ5Y205eUlIZHBkR2dnZEdobElITndaV05wWm1sbFpDQnRaWE56WVdkbExDQmpiMjVtYVdjc0lHVnljbTl5SUdOdlpHVXNJSEpsY1hWbGMzUWdZVzVrSUhKbGMzQnZibk5sTGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0J0WlhOellXZGxJRlJvWlNCbGNuSnZjaUJ0WlhOellXZGxMbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOdmJtWnBaeUJVYUdVZ1kyOXVabWxuTGx4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlGdGpiMlJsWFNCVWFHVWdaWEp5YjNJZ1kyOWtaU0FvWm05eUlHVjRZVzF3YkdVc0lDZEZRMDlPVGtGQ1QxSlVSVVFuS1M1Y2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmJjbVZ4ZFdWemRGMGdWR2hsSUhKbGNYVmxjM1F1WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1czSmxjM0J2Ym5ObFhTQlVhR1VnY21WemNHOXVjMlV1WEc0Z0tpQkFjbVYwZFhKdWN5QjdSWEp5YjNKOUlGUm9aU0JqY21WaGRHVmtJR1Z5Y205eUxseHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdOeVpXRjBaVVZ5Y205eUtHMWxjM05oWjJVc0lHTnZibVpwWnl3Z1kyOWtaU3dnY21WeGRXVnpkQ3dnY21WemNHOXVjMlVwSUh0Y2JpQWdkbUZ5SUdWeWNtOXlJRDBnYm1WM0lFVnljbTl5S0cxbGMzTmhaMlVwTzF4dUlDQnlaWFIxY200Z1pXNW9ZVzVqWlVWeWNtOXlLR1Z5Y205eUxDQmpiMjVtYVdjc0lHTnZaR1VzSUhKbGNYVmxjM1FzSUhKbGMzQnZibk5sS1R0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQjFkR2xzY3lBOUlISmxjWFZwY21Vb0p5NHZMaTR2ZFhScGJITW5LVHRjYm5aaGNpQjBjbUZ1YzJadmNtMUVZWFJoSUQwZ2NtVnhkV2x5WlNnbkxpOTBjbUZ1YzJadmNtMUVZWFJoSnlrN1hHNTJZWElnYVhORFlXNWpaV3dnUFNCeVpYRjFhWEpsS0NjdUxpOWpZVzVqWld3dmFYTkRZVzVqWld3bktUdGNiblpoY2lCa1pXWmhkV3gwY3lBOUlISmxjWFZwY21Vb0p5NHVMMlJsWm1GMWJIUnpKeWs3WEc1Y2JpOHFLbHh1SUNvZ1ZHaHliM2R6SUdFZ1lFTmhibU5sYkdBZ2FXWWdZMkZ1WTJWc2JHRjBhVzl1SUdoaGN5QmlaV1Z1SUhKbGNYVmxjM1JsWkM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnZEdoeWIzZEpaa05oYm1ObGJHeGhkR2x2YmxKbGNYVmxjM1JsWkNoamIyNW1hV2NwSUh0Y2JpQWdhV1lnS0dOdmJtWnBaeTVqWVc1alpXeFViMnRsYmlrZ2UxeHVJQ0FnSUdOdmJtWnBaeTVqWVc1alpXeFViMnRsYmk1MGFISnZkMGxtVW1WeGRXVnpkR1ZrS0NrN1hHNGdJSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkVhWE53WVhSamFDQmhJSEpsY1hWbGMzUWdkRzhnZEdobElITmxjblpsY2lCMWMybHVaeUIwYUdVZ1kyOXVabWxuZFhKbFpDQmhaR0Z3ZEdWeUxseHVJQ3BjYmlBcUlFQndZWEpoYlNCN2IySnFaV04wZlNCamIyNW1hV2NnVkdobElHTnZibVpwWnlCMGFHRjBJR2x6SUhSdklHSmxJSFZ6WldRZ1ptOXlJSFJvWlNCeVpYRjFaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdVSEp2YldselpYMGdWR2hsSUZCeWIyMXBjMlVnZEc4Z1ltVWdablZzWm1sc2JHVmtYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z1pHbHpjR0YwWTJoU1pYRjFaWE4wS0dOdmJtWnBaeWtnZTF4dUlDQjBhSEp2ZDBsbVEyRnVZMlZzYkdGMGFXOXVVbVZ4ZFdWemRHVmtLR052Ym1acFp5azdYRzVjYmlBZ0x5OGdSVzV6ZFhKbElHaGxZV1JsY25NZ1pYaHBjM1JjYmlBZ1kyOXVabWxuTG1obFlXUmxjbk1nUFNCamIyNW1hV2N1YUdWaFpHVnljeUI4ZkNCN2ZUdGNibHh1SUNBdkx5QlVjbUZ1YzJadmNtMGdjbVZ4ZFdWemRDQmtZWFJoWEc0Z0lHTnZibVpwWnk1a1lYUmhJRDBnZEhKaGJuTm1iM0p0UkdGMFlTaGNiaUFnSUNCamIyNW1hV2N1WkdGMFlTeGNiaUFnSUNCamIyNW1hV2N1YUdWaFpHVnljeXhjYmlBZ0lDQmpiMjVtYVdjdWRISmhibk5tYjNKdFVtVnhkV1Z6ZEZ4dUlDQXBPMXh1WEc0Z0lDOHZJRVpzWVhSMFpXNGdhR1ZoWkdWeWMxeHVJQ0JqYjI1bWFXY3VhR1ZoWkdWeWN5QTlJSFYwYVd4ekxtMWxjbWRsS0Z4dUlDQWdJR052Ym1acFp5NW9aV0ZrWlhKekxtTnZiVzF2YmlCOGZDQjdmU3hjYmlBZ0lDQmpiMjVtYVdjdWFHVmhaR1Z5YzF0amIyNW1hV2N1YldWMGFHOWtYU0I4ZkNCN2ZTeGNiaUFnSUNCamIyNW1hV2N1YUdWaFpHVnljMXh1SUNBcE8xeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29YRzRnSUNBZ1d5ZGtaV3hsZEdVbkxDQW5aMlYwSnl3Z0oyaGxZV1FuTENBbmNHOXpkQ2NzSUNkd2RYUW5MQ0FuY0dGMFkyZ25MQ0FuWTI5dGJXOXVKMTBzWEc0Z0lDQWdablZ1WTNScGIyNGdZMnhsWVc1SVpXRmtaWEpEYjI1bWFXY29iV1YwYUc5a0tTQjdYRzRnSUNBZ0lDQmtaV3hsZEdVZ1kyOXVabWxuTG1obFlXUmxjbk5iYldWMGFHOWtYVHRjYmlBZ0lDQjlYRzRnSUNrN1hHNWNiaUFnZG1GeUlHRmtZWEIwWlhJZ1BTQmpiMjVtYVdjdVlXUmhjSFJsY2lCOGZDQmtaV1poZFd4MGN5NWhaR0Z3ZEdWeU8xeHVYRzRnSUhKbGRIVnliaUJoWkdGd2RHVnlLR052Ym1acFp5a3VkR2hsYmlobWRXNWpkR2x2YmlCdmJrRmtZWEIwWlhKU1pYTnZiSFYwYVc5dUtISmxjM0J2Ym5ObEtTQjdYRzRnSUNBZ2RHaHliM2RKWmtOaGJtTmxiR3hoZEdsdmJsSmxjWFZsYzNSbFpDaGpiMjVtYVdjcE8xeHVYRzRnSUNBZ0x5OGdWSEpoYm5ObWIzSnRJSEpsYzNCdmJuTmxJR1JoZEdGY2JpQWdJQ0J5WlhOd2IyNXpaUzVrWVhSaElEMGdkSEpoYm5ObWIzSnRSR0YwWVNoY2JpQWdJQ0FnSUhKbGMzQnZibk5sTG1SaGRHRXNYRzRnSUNBZ0lDQnlaWE53YjI1elpTNW9aV0ZrWlhKekxGeHVJQ0FnSUNBZ1kyOXVabWxuTG5SeVlXNXpabTl5YlZKbGMzQnZibk5sWEc0Z0lDQWdLVHRjYmx4dUlDQWdJSEpsZEhWeWJpQnlaWE53YjI1elpUdGNiaUFnZlN3Z1puVnVZM1JwYjI0Z2IyNUJaR0Z3ZEdWeVVtVnFaV04wYVc5dUtISmxZWE52YmlrZ2UxeHVJQ0FnSUdsbUlDZ2hhWE5EWVc1alpXd29jbVZoYzI5dUtTa2dlMXh1SUNBZ0lDQWdkR2h5YjNkSlprTmhibU5sYkd4aGRHbHZibEpsY1hWbGMzUmxaQ2hqYjI1bWFXY3BPMXh1WEc0Z0lDQWdJQ0F2THlCVWNtRnVjMlp2Y20wZ2NtVnpjRzl1YzJVZ1pHRjBZVnh1SUNBZ0lDQWdhV1lnS0hKbFlYTnZiaUFtSmlCeVpXRnpiMjR1Y21WemNHOXVjMlVwSUh0Y2JpQWdJQ0FnSUNBZ2NtVmhjMjl1TG5KbGMzQnZibk5sTG1SaGRHRWdQU0IwY21GdWMyWnZjbTFFWVhSaEtGeHVJQ0FnSUNBZ0lDQWdJSEpsWVhOdmJpNXlaWE53YjI1elpTNWtZWFJoTEZ4dUlDQWdJQ0FnSUNBZ0lISmxZWE52Ymk1eVpYTndiMjV6WlM1b1pXRmtaWEp6TEZ4dUlDQWdJQ0FnSUNBZ0lHTnZibVpwWnk1MGNtRnVjMlp2Y20xU1pYTndiMjV6WlZ4dUlDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUJRY205dGFYTmxMbkpsYW1WamRDaHlaV0Z6YjI0cE8xeHVJQ0I5S1R0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYmk4cUtseHVJQ29nVlhCa1lYUmxJR0Z1SUVWeWNtOXlJSGRwZEdnZ2RHaGxJSE53WldOcFptbGxaQ0JqYjI1bWFXY3NJR1Z5Y205eUlHTnZaR1VzSUdGdVpDQnlaWE53YjI1elpTNWNiaUFxWEc0Z0tpQkFjR0Z5WVcwZ2UwVnljbTl5ZlNCbGNuSnZjaUJVYUdVZ1pYSnliM0lnZEc4Z2RYQmtZWFJsTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHTnZibVpwWnlCVWFHVWdZMjl1Wm1sbkxseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJRnRqYjJSbFhTQlVhR1VnWlhKeWIzSWdZMjlrWlNBb1ptOXlJR1Y0WVcxd2JHVXNJQ2RGUTA5T1RrRkNUMUpVUlVRbktTNWNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JiY21WeGRXVnpkRjBnVkdobElISmxjWFZsYzNRdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM0psYzNCdmJuTmxYU0JVYUdVZ2NtVnpjRzl1YzJVdVhHNGdLaUJBY21WMGRYSnVjeUI3UlhKeWIzSjlJRlJvWlNCbGNuSnZjaTVjYmlBcUwxeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQmxibWhoYm1ObFJYSnliM0lvWlhKeWIzSXNJR052Ym1acFp5d2dZMjlrWlN3Z2NtVnhkV1Z6ZEN3Z2NtVnpjRzl1YzJVcElIdGNiaUFnWlhKeWIzSXVZMjl1Wm1sbklEMGdZMjl1Wm1sbk8xeHVJQ0JwWmlBb1kyOWtaU2tnZTF4dUlDQWdJR1Z5Y205eUxtTnZaR1VnUFNCamIyUmxPMXh1SUNCOVhHNWNiaUFnWlhKeWIzSXVjbVZ4ZFdWemRDQTlJSEpsY1hWbGMzUTdYRzRnSUdWeWNtOXlMbkpsYzNCdmJuTmxJRDBnY21WemNHOXVjMlU3WEc0Z0lHVnljbTl5TG1selFYaHBiM05GY25KdmNpQTlJSFJ5ZFdVN1hHNWNiaUFnWlhKeWIzSXVkRzlLVTA5T0lEMGdablZ1WTNScGIyNGdkRzlLVTA5T0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNBdkx5QlRkR0Z1WkdGeVpGeHVJQ0FnSUNBZ2JXVnpjMkZuWlRvZ2RHaHBjeTV0WlhOellXZGxMRnh1SUNBZ0lDQWdibUZ0WlRvZ2RHaHBjeTV1WVcxbExGeHVJQ0FnSUNBZ0x5OGdUV2xqY205emIyWjBYRzRnSUNBZ0lDQmtaWE5qY21sd2RHbHZiam9nZEdocGN5NWtaWE5qY21sd2RHbHZiaXhjYmlBZ0lDQWdJRzUxYldKbGNqb2dkR2hwY3k1dWRXMWlaWElzWEc0Z0lDQWdJQ0F2THlCTmIzcHBiR3hoWEc0Z0lDQWdJQ0JtYVd4bFRtRnRaVG9nZEdocGN5NW1hV3hsVG1GdFpTeGNiaUFnSUNBZ0lHeHBibVZPZFcxaVpYSTZJSFJvYVhNdWJHbHVaVTUxYldKbGNpeGNiaUFnSUNBZ0lHTnZiSFZ0Yms1MWJXSmxjam9nZEdocGN5NWpiMngxYlc1T2RXMWlaWElzWEc0Z0lDQWdJQ0J6ZEdGamF6b2dkR2hwY3k1emRHRmpheXhjYmlBZ0lDQWdJQzh2SUVGNGFXOXpYRzRnSUNBZ0lDQmpiMjVtYVdjNklIUm9hWE11WTI5dVptbG5MRnh1SUNBZ0lDQWdZMjlrWlRvZ2RHaHBjeTVqYjJSbFhHNGdJQ0FnZlR0Y2JpQWdmVHRjYmlBZ2NtVjBkWEp1SUdWeWNtOXlPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk0dmRYUnBiSE1uS1R0Y2JseHVMeW9xWEc0Z0tpQkRiMjVtYVdjdGMzQmxZMmxtYVdNZ2JXVnlaMlV0Wm5WdVkzUnBiMjRnZDJocFkyZ2dZM0psWVhSbGN5QmhJRzVsZHlCamIyNW1hV2N0YjJKcVpXTjBYRzRnS2lCaWVTQnRaWEpuYVc1bklIUjNieUJqYjI1bWFXZDFjbUYwYVc5dUlHOWlhbVZqZEhNZ2RHOW5aWFJvWlhJdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOdmJtWnBaekZjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCamIyNW1hV2N5WEc0Z0tpQkFjbVYwZFhKdWN5QjdUMkpxWldOMGZTQk9aWGNnYjJKcVpXTjBJSEpsYzNWc2RHbHVaeUJtY205dElHMWxjbWRwYm1jZ1kyOXVabWxuTWlCMGJ5QmpiMjVtYVdjeFhHNGdLaTljYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnYldWeVoyVkRiMjVtYVdjb1kyOXVabWxuTVN3Z1kyOXVabWxuTWlrZ2UxeHVJQ0F2THlCbGMyeHBiblF0WkdsellXSnNaUzF1WlhoMExXeHBibVVnYm04dGNHRnlZVzB0Y21WaGMzTnBaMjVjYmlBZ1kyOXVabWxuTWlBOUlHTnZibVpwWnpJZ2ZId2dlMzA3WEc0Z0lIWmhjaUJqYjI1bWFXY2dQU0I3ZlR0Y2JseHVJQ0IyWVhJZ2RtRnNkV1ZHY205dFEyOXVabWxuTWt0bGVYTWdQU0JiSjNWeWJDY3NJQ2R0WlhSb2IyUW5MQ0FuWkdGMFlTZGRPMXh1SUNCMllYSWdiV1Z5WjJWRVpXVndVSEp2Y0dWeWRHbGxjMHRsZVhNZ1BTQmJKMmhsWVdSbGNuTW5MQ0FuWVhWMGFDY3NJQ2R3Y205NGVTY3NJQ2R3WVhKaGJYTW5YVHRjYmlBZ2RtRnlJR1JsWm1GMWJIUlViME52Ym1acFp6SkxaWGx6SUQwZ1cxeHVJQ0FnSUNkaVlYTmxWVkpNSnl3Z0ozUnlZVzV6Wm05eWJWSmxjWFZsYzNRbkxDQW5kSEpoYm5ObWIzSnRVbVZ6Y0c5dWMyVW5MQ0FuY0dGeVlXMXpVMlZ5YVdGc2FYcGxjaWNzWEc0Z0lDQWdKM1JwYldWdmRYUW5MQ0FuZEdsdFpXOTFkRTFsYzNOaFoyVW5MQ0FuZDJsMGFFTnlaV1JsYm5ScFlXeHpKeXdnSjJGa1lYQjBaWEluTENBbmNtVnpjRzl1YzJWVWVYQmxKeXdnSjNoemNtWkRiMjlyYVdWT1lXMWxKeXhjYmlBZ0lDQW5lSE55WmtobFlXUmxjazVoYldVbkxDQW5iMjVWY0d4dllXUlFjbTluY21WemN5Y3NJQ2R2YmtSdmQyNXNiMkZrVUhKdlozSmxjM01uTENBblpHVmpiMjF3Y21WemN5Y3NYRzRnSUNBZ0oyMWhlRU52Ym5SbGJuUk1aVzVuZEdnbkxDQW5iV0Y0UW05a2VVeGxibWQwYUNjc0lDZHRZWGhTWldScGNtVmpkSE1uTENBbmRISmhibk53YjNKMEp5d2dKMmgwZEhCQloyVnVkQ2NzWEc0Z0lDQWdKMmgwZEhCelFXZGxiblFuTENBblkyRnVZMlZzVkc5clpXNG5MQ0FuYzI5amEyVjBVR0YwYUNjc0lDZHlaWE53YjI1elpVVnVZMjlrYVc1bkoxeHVJQ0JkTzF4dUlDQjJZWElnWkdseVpXTjBUV1Z5WjJWTFpYbHpJRDBnV3lkMllXeHBaR0YwWlZOMFlYUjFjeWRkTzF4dVhHNGdJR1oxYm1OMGFXOXVJR2RsZEUxbGNtZGxaRlpoYkhWbEtIUmhjbWRsZEN3Z2MyOTFjbU5sS1NCN1hHNGdJQ0FnYVdZZ0tIVjBhV3h6TG1selVHeGhhVzVQWW1wbFkzUW9kR0Z5WjJWMEtTQW1KaUIxZEdsc2N5NXBjMUJzWVdsdVQySnFaV04wS0hOdmRYSmpaU2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUIxZEdsc2N5NXRaWEpuWlNoMFlYSm5aWFFzSUhOdmRYSmpaU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2gxZEdsc2N5NXBjMUJzWVdsdVQySnFaV04wS0hOdmRYSmpaU2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUIxZEdsc2N5NXRaWEpuWlNoN2ZTd2djMjkxY21ObEtUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tIVjBhV3h6TG1selFYSnlZWGtvYzI5MWNtTmxLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSE52ZFhKalpTNXpiR2xqWlNncE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdjMjkxY21ObE8xeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdiV1Z5WjJWRVpXVndVSEp2Y0dWeWRHbGxjeWh3Y205d0tTQjdYRzRnSUNBZ2FXWWdLQ0YxZEdsc2N5NXBjMVZ1WkdWbWFXNWxaQ2hqYjI1bWFXY3lXM0J5YjNCZEtTa2dlMXh1SUNBZ0lDQWdZMjl1Wm1sblczQnliM0JkSUQwZ1oyVjBUV1Z5WjJWa1ZtRnNkV1VvWTI5dVptbG5NVnR3Y205d1hTd2dZMjl1Wm1sbk1sdHdjbTl3WFNrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNnaGRYUnBiSE11YVhOVmJtUmxabWx1WldRb1kyOXVabWxuTVZ0d2NtOXdYU2twSUh0Y2JpQWdJQ0FnSUdOdmJtWnBaMXR3Y205d1hTQTlJR2RsZEUxbGNtZGxaRlpoYkhWbEtIVnVaR1ZtYVc1bFpDd2dZMjl1Wm1sbk1WdHdjbTl3WFNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2RYUnBiSE11Wm05eVJXRmphQ2gyWVd4MVpVWnliMjFEYjI1bWFXY3lTMlY1Y3l3Z1puVnVZM1JwYjI0Z2RtRnNkV1ZHY205dFEyOXVabWxuTWlod2NtOXdLU0I3WEc0Z0lDQWdhV1lnS0NGMWRHbHNjeTVwYzFWdVpHVm1hVzVsWkNoamIyNW1hV2N5VzNCeWIzQmRLU2tnZTF4dUlDQWdJQ0FnWTI5dVptbG5XM0J5YjNCZElEMGdaMlYwVFdWeVoyVmtWbUZzZFdVb2RXNWtaV1pwYm1Wa0xDQmpiMjVtYVdjeVczQnliM0JkS1R0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1WEc0Z0lIVjBhV3h6TG1admNrVmhZMmdvYldWeVoyVkVaV1Z3VUhKdmNHVnlkR2xsYzB0bGVYTXNJRzFsY21kbFJHVmxjRkJ5YjNCbGNuUnBaWE1wTzF4dVhHNGdJSFYwYVd4ekxtWnZja1ZoWTJnb1pHVm1ZWFZzZEZSdlEyOXVabWxuTWt0bGVYTXNJR1oxYm1OMGFXOXVJR1JsWm1GMWJIUlViME52Ym1acFp6SW9jSEp2Y0NrZ2UxeHVJQ0FnSUdsbUlDZ2hkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9ZMjl1Wm1sbk1sdHdjbTl3WFNrcElIdGNiaUFnSUNBZ0lHTnZibVpwWjF0d2NtOXdYU0E5SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFZ1WkdWbWFXNWxaQ3dnWTI5dVptbG5NbHR3Y205d1hTazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDZ2hkWFJwYkhNdWFYTlZibVJsWm1sdVpXUW9ZMjl1Wm1sbk1WdHdjbTl3WFNrcElIdGNiaUFnSUNBZ0lHTnZibVpwWjF0d2NtOXdYU0E5SUdkbGRFMWxjbWRsWkZaaGJIVmxLSFZ1WkdWbWFXNWxaQ3dnWTI5dVptbG5NVnR3Y205d1hTazdYRzRnSUNBZ2ZWeHVJQ0I5S1R0Y2JseHVJQ0IxZEdsc2N5NW1iM0pGWVdOb0tHUnBjbVZqZEUxbGNtZGxTMlY1Y3l3Z1puVnVZM1JwYjI0Z2JXVnlaMlVvY0hKdmNDa2dlMXh1SUNBZ0lHbG1JQ2h3Y205d0lHbHVJR052Ym1acFp6SXBJSHRjYmlBZ0lDQWdJR052Ym1acFoxdHdjbTl3WFNBOUlHZGxkRTFsY21kbFpGWmhiSFZsS0dOdmJtWnBaekZiY0hKdmNGMHNJR052Ym1acFp6SmJjSEp2Y0YwcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2NISnZjQ0JwYmlCamIyNW1hV2N4S1NCN1hHNGdJQ0FnSUNCamIyNW1hV2RiY0hKdmNGMGdQU0JuWlhSTlpYSm5aV1JXWVd4MVpTaDFibVJsWm1sdVpXUXNJR052Ym1acFp6RmJjSEp2Y0YwcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1Y2JpQWdkbUZ5SUdGNGFXOXpTMlY1Y3lBOUlIWmhiSFZsUm5KdmJVTnZibVpwWnpKTFpYbHpYRzRnSUNBZ0xtTnZibU5oZENodFpYSm5aVVJsWlhCUWNtOXdaWEowYVdWelMyVjVjeWxjYmlBZ0lDQXVZMjl1WTJGMEtHUmxabUYxYkhSVWIwTnZibVpwWnpKTFpYbHpLVnh1SUNBZ0lDNWpiMjVqWVhRb1pHbHlaV04wVFdWeVoyVkxaWGx6S1R0Y2JseHVJQ0IyWVhJZ2IzUm9aWEpMWlhseklEMGdUMkpxWldOMFhHNGdJQ0FnTG10bGVYTW9ZMjl1Wm1sbk1TbGNiaUFnSUNBdVkyOXVZMkYwS0U5aWFtVmpkQzVyWlhsektHTnZibVpwWnpJcEtWeHVJQ0FnSUM1bWFXeDBaWElvWm5WdVkzUnBiMjRnWm1sc2RHVnlRWGhwYjNOTFpYbHpLR3RsZVNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdGNGFXOXpTMlY1Y3k1cGJtUmxlRTltS0d0bGVTa2dQVDA5SUMweE8xeHVJQ0FnSUgwcE8xeHVYRzRnSUhWMGFXeHpMbVp2Y2tWaFkyZ29iM1JvWlhKTFpYbHpMQ0J0WlhKblpVUmxaWEJRY205d1pYSjBhV1Z6S1R0Y2JseHVJQ0J5WlhSMWNtNGdZMjl1Wm1sbk8xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJR055WldGMFpVVnljbTl5SUQwZ2NtVnhkV2x5WlNnbkxpOWpjbVZoZEdWRmNuSnZjaWNwTzF4dVhHNHZLaXBjYmlBcUlGSmxjMjlzZG1VZ2IzSWdjbVZxWldOMElHRWdVSEp2YldselpTQmlZWE5sWkNCdmJpQnlaWE53YjI1elpTQnpkR0YwZFhNdVhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2NtVnpiMngyWlNCQklHWjFibU4wYVc5dUlIUm9ZWFFnY21WemIyeDJaWE1nZEdobElIQnliMjFwYzJVdVhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0J5WldwbFkzUWdRU0JtZFc1amRHbHZiaUIwYUdGMElISmxhbVZqZEhNZ2RHaGxJSEJ5YjIxcGMyVXVYRzRnS2lCQWNHRnlZVzBnZTI5aWFtVmpkSDBnY21WemNHOXVjMlVnVkdobElISmxjM0J2Ym5ObExseHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUhObGRIUnNaU2h5WlhOdmJIWmxMQ0J5WldwbFkzUXNJSEpsYzNCdmJuTmxLU0I3WEc0Z0lIWmhjaUIyWVd4cFpHRjBaVk4wWVhSMWN5QTlJSEpsYzNCdmJuTmxMbU52Ym1acFp5NTJZV3hwWkdGMFpWTjBZWFIxY3p0Y2JpQWdhV1lnS0NGeVpYTndiMjV6WlM1emRHRjBkWE1nZkh3Z0lYWmhiR2xrWVhSbFUzUmhkSFZ6SUh4OElIWmhiR2xrWVhSbFUzUmhkSFZ6S0hKbGMzQnZibk5sTG5OMFlYUjFjeWtwSUh0Y2JpQWdJQ0J5WlhOdmJIWmxLSEpsYzNCdmJuTmxLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J5WldwbFkzUW9ZM0psWVhSbFJYSnliM0lvWEc0Z0lDQWdJQ0FuVW1WeGRXVnpkQ0JtWVdsc1pXUWdkMmwwYUNCemRHRjBkWE1nWTI5a1pTQW5JQ3NnY21WemNHOXVjMlV1YzNSaGRIVnpMRnh1SUNBZ0lDQWdjbVZ6Y0c5dWMyVXVZMjl1Wm1sbkxGeHVJQ0FnSUNBZ2JuVnNiQ3hjYmlBZ0lDQWdJSEpsYzNCdmJuTmxMbkpsY1hWbGMzUXNYRzRnSUNBZ0lDQnlaWE53YjI1elpWeHVJQ0FnSUNrcE8xeHVJQ0I5WEc1OU8xeHVJaXdpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzUyWVhJZ2RYUnBiSE1nUFNCeVpYRjFhWEpsS0NjdUx5NHVMM1YwYVd4ekp5azdYRzVjYmk4cUtseHVJQ29nVkhKaGJuTm1iM0p0SUhSb1pTQmtZWFJoSUdadmNpQmhJSEpsY1hWbGMzUWdiM0lnWVNCeVpYTndiMjV6WlZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmRk4wY21sdVozMGdaR0YwWVNCVWFHVWdaR0YwWVNCMGJ5QmlaU0IwY21GdWMyWnZjbTFsWkZ4dUlDb2dRSEJoY21GdElIdEJjbkpoZVgwZ2FHVmhaR1Z5Y3lCVWFHVWdhR1ZoWkdWeWN5Qm1iM0lnZEdobElISmxjWFZsYzNRZ2IzSWdjbVZ6Y0c5dWMyVmNiaUFxSUVCd1lYSmhiU0I3UVhKeVlYbDhSblZ1WTNScGIyNTlJR1p1Y3lCQklITnBibWRzWlNCbWRXNWpkR2x2YmlCdmNpQkJjbkpoZVNCdlppQm1kVzVqZEdsdmJuTmNiaUFxSUVCeVpYUjFjbTV6SUhzcWZTQlVhR1VnY21WemRXeDBhVzVuSUhSeVlXNXpabTl5YldWa0lHUmhkR0ZjYmlBcUwxeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQjBjbUZ1YzJadmNtMUVZWFJoS0dSaGRHRXNJR2hsWVdSbGNuTXNJR1p1Y3lrZ2UxeHVJQ0F2S21WemJHbHVkQ0J1Ynkxd1lYSmhiUzF5WldGemMybG5iam93S2k5Y2JpQWdkWFJwYkhNdVptOXlSV0ZqYUNobWJuTXNJR1oxYm1OMGFXOXVJSFJ5WVc1elptOXliU2htYmlrZ2UxeHVJQ0FnSUdSaGRHRWdQU0JtYmloa1lYUmhMQ0JvWldGa1pYSnpLVHRjYmlBZ2ZTazdYRzVjYmlBZ2NtVjBkWEp1SUdSaGRHRTdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1TDNWMGFXeHpKeWs3WEc1MllYSWdibTl5YldGc2FYcGxTR1ZoWkdWeVRtRnRaU0E5SUhKbGNYVnBjbVVvSnk0dmFHVnNjR1Z5Y3k5dWIzSnRZV3hwZW1WSVpXRmtaWEpPWVcxbEp5azdYRzVjYm5aaGNpQkVSVVpCVlV4VVgwTlBUbFJGVGxSZlZGbFFSU0E5SUh0Y2JpQWdKME52Ym5SbGJuUXRWSGx3WlNjNklDZGhjSEJzYVdOaGRHbHZiaTk0TFhkM2R5MW1iM0p0TFhWeWJHVnVZMjlrWldRblhHNTlPMXh1WEc1bWRXNWpkR2x2YmlCelpYUkRiMjUwWlc1MFZIbHdaVWxtVlc1elpYUW9hR1ZoWkdWeWN5d2dkbUZzZFdVcElIdGNiaUFnYVdZZ0tDRjFkR2xzY3k1cGMxVnVaR1ZtYVc1bFpDaG9aV0ZrWlhKektTQW1KaUIxZEdsc2N5NXBjMVZ1WkdWbWFXNWxaQ2hvWldGa1pYSnpXeWREYjI1MFpXNTBMVlI1Y0dVblhTa3BJSHRjYmlBZ0lDQm9aV0ZrWlhKeld5ZERiMjUwWlc1MExWUjVjR1VuWFNBOUlIWmhiSFZsTzF4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlHZGxkRVJsWm1GMWJIUkJaR0Z3ZEdWeUtDa2dlMXh1SUNCMllYSWdZV1JoY0hSbGNqdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCWVRVeElkSFJ3VW1WeGRXVnpkQ0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJSHRjYmlBZ0lDQXZMeUJHYjNJZ1luSnZkM05sY25NZ2RYTmxJRmhJVWlCaFpHRndkR1Z5WEc0Z0lDQWdZV1JoY0hSbGNpQTlJSEpsY1hWcGNtVW9KeTR2WVdSaGNIUmxjbk12ZUdoeUp5azdYRzRnSUgwZ1pXeHpaU0JwWmlBb2RIbHdaVzltSUhCeWIyTmxjM01nSVQwOUlDZDFibVJsWm1sdVpXUW5JQ1ltSUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWN1WTJGc2JDaHdjbTlqWlhOektTQTlQVDBnSjF0dlltcGxZM1FnY0hKdlkyVnpjMTBuS1NCN1hHNGdJQ0FnTHk4Z1JtOXlJRzV2WkdVZ2RYTmxJRWhVVkZBZ1lXUmhjSFJsY2x4dUlDQWdJR0ZrWVhCMFpYSWdQU0J5WlhGMWFYSmxLQ2N1TDJGa1lYQjBaWEp6TDJoMGRIQW5LVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdZV1JoY0hSbGNqdGNibjFjYmx4dWRtRnlJR1JsWm1GMWJIUnpJRDBnZTF4dUlDQmhaR0Z3ZEdWeU9pQm5aWFJFWldaaGRXeDBRV1JoY0hSbGNpZ3BMRnh1WEc0Z0lIUnlZVzV6Wm05eWJWSmxjWFZsYzNRNklGdG1kVzVqZEdsdmJpQjBjbUZ1YzJadmNtMVNaWEYxWlhOMEtHUmhkR0VzSUdobFlXUmxjbk1wSUh0Y2JpQWdJQ0J1YjNKdFlXeHBlbVZJWldGa1pYSk9ZVzFsS0dobFlXUmxjbk1zSUNkQlkyTmxjSFFuS1R0Y2JpQWdJQ0J1YjNKdFlXeHBlbVZJWldGa1pYSk9ZVzFsS0dobFlXUmxjbk1zSUNkRGIyNTBaVzUwTFZSNWNHVW5LVHRjYmlBZ0lDQnBaaUFvZFhScGJITXVhWE5HYjNKdFJHRjBZU2hrWVhSaEtTQjhmRnh1SUNBZ0lDQWdkWFJwYkhNdWFYTkJjbkpoZVVKMVptWmxjaWhrWVhSaEtTQjhmRnh1SUNBZ0lDQWdkWFJwYkhNdWFYTkNkV1ptWlhJb1pHRjBZU2tnZkh4Y2JpQWdJQ0FnSUhWMGFXeHpMbWx6VTNSeVpXRnRLR1JoZEdFcElIeDhYRzRnSUNBZ0lDQjFkR2xzY3k1cGMwWnBiR1VvWkdGMFlTa2dmSHhjYmlBZ0lDQWdJSFYwYVd4ekxtbHpRbXh2WWloa1lYUmhLVnh1SUNBZ0lDa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHUmhkR0U3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2gxZEdsc2N5NXBjMEZ5Y21GNVFuVm1abVZ5Vm1sbGR5aGtZWFJoS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdSaGRHRXVZblZtWm1WeU8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RYUnBiSE11YVhOVlVreFRaV0Z5WTJoUVlYSmhiWE1vWkdGMFlTa3BJSHRjYmlBZ0lDQWdJSE5sZEVOdmJuUmxiblJVZVhCbFNXWlZibk5sZENob1pXRmtaWEp6TENBbllYQndiR2xqWVhScGIyNHZlQzEzZDNjdFptOXliUzExY214bGJtTnZaR1ZrTzJOb1lYSnpaWFE5ZFhSbUxUZ25LVHRjYmlBZ0lDQWdJSEpsZEhWeWJpQmtZWFJoTG5SdlUzUnlhVzVuS0NrN1hHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNoMWRHbHNjeTVwYzA5aWFtVmpkQ2hrWVhSaEtTa2dlMXh1SUNBZ0lDQWdjMlYwUTI5dWRHVnVkRlI1Y0dWSlpsVnVjMlYwS0dobFlXUmxjbk1zSUNkaGNIQnNhV05oZEdsdmJpOXFjMjl1TzJOb1lYSnpaWFE5ZFhSbUxUZ25LVHRjYmlBZ0lDQWdJSEpsZEhWeWJpQktVMDlPTG5OMGNtbHVaMmxtZVNoa1lYUmhLVHRjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUdSaGRHRTdYRzRnSUgxZExGeHVYRzRnSUhSeVlXNXpabTl5YlZKbGMzQnZibk5sT2lCYlpuVnVZM1JwYjI0Z2RISmhibk5tYjNKdFVtVnpjRzl1YzJVb1pHRjBZU2tnZTF4dUlDQWdJQzhxWlhOc2FXNTBJRzV2TFhCaGNtRnRMWEpsWVhOemFXZHVPakFxTDF4dUlDQWdJR2xtSUNoMGVYQmxiMllnWkdGMFlTQTlQVDBnSjNOMGNtbHVaeWNwSUh0Y2JpQWdJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJR1JoZEdFZ1BTQktVMDlPTG5CaGNuTmxLR1JoZEdFcE8xeHVJQ0FnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dleUF2S2lCSloyNXZjbVVnS2k4Z2ZWeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdaR0YwWVR0Y2JpQWdmVjBzWEc1Y2JpQWdMeW9xWEc0Z0lDQXFJRUVnZEdsdFpXOTFkQ0JwYmlCdGFXeHNhWE5sWTI5dVpITWdkRzhnWVdKdmNuUWdZU0J5WlhGMVpYTjBMaUJKWmlCelpYUWdkRzhnTUNBb1pHVm1ZWFZzZENrZ1lWeHVJQ0FnS2lCMGFXMWxiM1YwSUdseklHNXZkQ0JqY21WaGRHVmtMbHh1SUNBZ0tpOWNiaUFnZEdsdFpXOTFkRG9nTUN4Y2JseHVJQ0I0YzNKbVEyOXZhMmxsVG1GdFpUb2dKMWhUVWtZdFZFOUxSVTRuTEZ4dUlDQjRjM0ptU0dWaFpHVnlUbUZ0WlRvZ0oxZ3RXRk5TUmkxVVQwdEZUaWNzWEc1Y2JpQWdiV0Y0UTI5dWRHVnVkRXhsYm1kMGFEb2dMVEVzWEc0Z0lHMWhlRUp2WkhsTVpXNW5kR2c2SUMweExGeHVYRzRnSUhaaGJHbGtZWFJsVTNSaGRIVnpPaUJtZFc1amRHbHZiaUIyWVd4cFpHRjBaVk4wWVhSMWN5aHpkR0YwZFhNcElIdGNiaUFnSUNCeVpYUjFjbTRnYzNSaGRIVnpJRDQ5SURJd01DQW1KaUJ6ZEdGMGRYTWdQQ0F6TURBN1hHNGdJSDFjYm4wN1hHNWNibVJsWm1GMWJIUnpMbWhsWVdSbGNuTWdQU0I3WEc0Z0lHTnZiVzF2YmpvZ2UxeHVJQ0FnSUNkQlkyTmxjSFFuT2lBbllYQndiR2xqWVhScGIyNHZhbk52Yml3Z2RHVjRkQzl3YkdGcGJpd2dLaThxSjF4dUlDQjlYRzU5TzF4dVhHNTFkR2xzY3k1bWIzSkZZV05vS0ZzblpHVnNaWFJsSnl3Z0oyZGxkQ2NzSUNkb1pXRmtKMTBzSUdaMWJtTjBhVzl1SUdadmNrVmhZMmhOWlhSb2IyUk9iMFJoZEdFb2JXVjBhRzlrS1NCN1hHNGdJR1JsWm1GMWJIUnpMbWhsWVdSbGNuTmJiV1YwYUc5a1hTQTlJSHQ5TzF4dWZTazdYRzVjYm5WMGFXeHpMbVp2Y2tWaFkyZ29XeWR3YjNOMEp5d2dKM0IxZENjc0lDZHdZWFJqYUNkZExDQm1kVzVqZEdsdmJpQm1iM0pGWVdOb1RXVjBhRzlrVjJsMGFFUmhkR0VvYldWMGFHOWtLU0I3WEc0Z0lHUmxabUYxYkhSekxtaGxZV1JsY25OYmJXVjBhRzlrWFNBOUlIVjBhV3h6TG0xbGNtZGxLRVJGUmtGVlRGUmZRMDlPVkVWT1ZGOVVXVkJGS1R0Y2JuMHBPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdSbFptRjFiSFJ6TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlHSnBibVFvWm00c0lIUm9hWE5CY21jcElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJSGR5WVhBb0tTQjdYRzRnSUNBZ2RtRnlJR0Z5WjNNZ1BTQnVaWGNnUVhKeVlYa29ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDazdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQmhjbWR6TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQmhjbWR6VzJsZElEMGdZWEpuZFcxbGJuUnpXMmxkTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1ptNHVZWEJ3Ykhrb2RHaHBjMEZ5Wnl3Z1lYSm5jeWs3WEc0Z0lIMDdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwzVjBhV3h6SnlrN1hHNWNibVoxYm1OMGFXOXVJR1Z1WTI5a1pTaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaDJZV3dwTGx4dUlDQWdJSEpsY0d4aFkyVW9MeVV6UVM5bmFTd2dKem9uS1M1Y2JpQWdJQ0J5WlhCc1lXTmxLQzhsTWpRdlp5d2dKeVFuS1M1Y2JpQWdJQ0J5WlhCc1lXTmxLQzhsTWtNdloya3NJQ2NzSnlrdVhHNGdJQ0FnY21Wd2JHRmpaU2d2SlRJd0wyY3NJQ2NySnlrdVhHNGdJQ0FnY21Wd2JHRmpaU2d2SlRWQ0wyZHBMQ0FuV3ljcExseHVJQ0FnSUhKbGNHeGhZMlVvTHlVMVJDOW5hU3dnSjEwbktUdGNibjFjYmx4dUx5b3FYRzRnS2lCQ2RXbHNaQ0JoSUZWU1RDQmllU0JoY0hCbGJtUnBibWNnY0dGeVlXMXpJSFJ2SUhSb1pTQmxibVJjYmlBcVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdkWEpzSUZSb1pTQmlZWE5sSUc5bUlIUm9aU0IxY213Z0tHVXVaeTRzSUdoMGRIQTZMeTkzZDNjdVoyOXZaMnhsTG1OdmJTbGNiaUFxSUVCd1lYSmhiU0I3YjJKcVpXTjBmU0JiY0dGeVlXMXpYU0JVYUdVZ2NHRnlZVzF6SUhSdklHSmxJR0Z3Y0dWdVpHVmtYRzRnS2lCQWNtVjBkWEp1Y3lCN2MzUnlhVzVuZlNCVWFHVWdabTl5YldGMGRHVmtJSFZ5YkZ4dUlDb3ZYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJR0oxYVd4a1ZWSk1LSFZ5YkN3Z2NHRnlZVzF6TENCd1lYSmhiWE5UWlhKcFlXeHBlbVZ5S1NCN1hHNGdJQzhxWlhOc2FXNTBJRzV2TFhCaGNtRnRMWEpsWVhOemFXZHVPakFxTDF4dUlDQnBaaUFvSVhCaGNtRnRjeWtnZTF4dUlDQWdJSEpsZEhWeWJpQjFjbXc3WEc0Z0lIMWNibHh1SUNCMllYSWdjMlZ5YVdGc2FYcGxaRkJoY21GdGN6dGNiaUFnYVdZZ0tIQmhjbUZ0YzFObGNtbGhiR2w2WlhJcElIdGNiaUFnSUNCelpYSnBZV3hwZW1Wa1VHRnlZVzF6SUQwZ2NHRnlZVzF6VTJWeWFXRnNhWHBsY2lod1lYSmhiWE1wTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLSFYwYVd4ekxtbHpWVkpNVTJWaGNtTm9VR0Z5WVcxektIQmhjbUZ0Y3lrcElIdGNiaUFnSUNCelpYSnBZV3hwZW1Wa1VHRnlZVzF6SUQwZ2NHRnlZVzF6TG5SdlUzUnlhVzVuS0NrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2RtRnlJSEJoY25SeklEMGdXMTA3WEc1Y2JpQWdJQ0IxZEdsc2N5NW1iM0pGWVdOb0tIQmhjbUZ0Y3l3Z1puVnVZM1JwYjI0Z2MyVnlhV0ZzYVhwbEtIWmhiQ3dnYTJWNUtTQjdYRzRnSUNBZ0lDQnBaaUFvZG1Gc0lEMDlQU0J1ZFd4c0lIeDhJSFI1Y0dWdlppQjJZV3dnUFQwOUlDZDFibVJsWm1sdVpXUW5LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYVdZZ0tIVjBhV3h6TG1selFYSnlZWGtvZG1Gc0tTa2dlMXh1SUNBZ0lDQWdJQ0JyWlhrZ1BTQnJaWGtnS3lBblcxMG5PMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdkbUZzSUQwZ1czWmhiRjA3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhWMGFXeHpMbVp2Y2tWaFkyZ29kbUZzTENCbWRXNWpkR2x2YmlCd1lYSnpaVlpoYkhWbEtIWXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIVjBhV3h6TG1selJHRjBaU2gyS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFlnUFNCMkxuUnZTVk5QVTNSeWFXNW5LQ2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RYUnBiSE11YVhOUFltcGxZM1FvZGlrcElIdGNiaUFnSUNBZ0lDQWdJQ0IySUQwZ1NsTlBUaTV6ZEhKcGJtZHBabmtvZGlrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdjR0Z5ZEhNdWNIVnphQ2hsYm1OdlpHVW9hMlY1S1NBcklDYzlKeUFySUdWdVkyOWtaU2gyS1NrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOUtUdGNibHh1SUNBZ0lITmxjbWxoYkdsNlpXUlFZWEpoYlhNZ1BTQndZWEowY3k1cWIybHVLQ2NtSnlrN1hHNGdJSDFjYmx4dUlDQnBaaUFvYzJWeWFXRnNhWHBsWkZCaGNtRnRjeWtnZTF4dUlDQWdJSFpoY2lCb1lYTm9iV0Z5YTBsdVpHVjRJRDBnZFhKc0xtbHVaR1Y0VDJZb0p5TW5LVHRjYmlBZ0lDQnBaaUFvYUdGemFHMWhjbXRKYm1SbGVDQWhQVDBnTFRFcElIdGNiaUFnSUNBZ0lIVnliQ0E5SUhWeWJDNXpiR2xqWlNnd0xDQm9ZWE5vYldGeWEwbHVaR1Y0S1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IxY213Z0t6MGdLSFZ5YkM1cGJtUmxlRTltS0NjL0p5a2dQVDA5SUMweElEOGdKejhuSURvZ0p5WW5LU0FySUhObGNtbGhiR2w2WldSUVlYSmhiWE03WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnZFhKc08xeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1Z6SUdFZ2JtVjNJRlZTVENCaWVTQmpiMjFpYVc1cGJtY2dkR2hsSUhOd1pXTnBabWxsWkNCVlVreHpYRzRnS2x4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHSmhjMlZWVWt3Z1ZHaGxJR0poYzJVZ1ZWSk1YRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnY21Wc1lYUnBkbVZWVWt3Z1ZHaGxJSEpsYkdGMGFYWmxJRlZTVEZ4dUlDb2dRSEpsZEhWeWJuTWdlM04wY21sdVozMGdWR2hsSUdOdmJXSnBibVZrSUZWU1RGeHVJQ292WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUdOdmJXSnBibVZWVWt4ektHSmhjMlZWVWt3c0lISmxiR0YwYVhabFZWSk1LU0I3WEc0Z0lISmxkSFZ5YmlCeVpXeGhkR2wyWlZWU1RGeHVJQ0FnSUQ4Z1ltRnpaVlZTVEM1eVpYQnNZV05sS0M5Y1hDOHJKQzhzSUNjbktTQXJJQ2N2SnlBcklISmxiR0YwYVhabFZWSk1MbkpsY0d4aFkyVW9MMTVjWEM4ckx5d2dKeWNwWEc0Z0lDQWdPaUJpWVhObFZWSk1PMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhWMGFXeHpJRDBnY21WeGRXbHlaU2duTGk4dUxpOTFkR2xzY3ljcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJQ2hjYmlBZ2RYUnBiSE11YVhOVGRHRnVaR0Z5WkVKeWIzZHpaWEpGYm5Zb0tTQS9YRzVjYmlBZ0x5OGdVM1JoYm1SaGNtUWdZbkp2ZDNObGNpQmxiblp6SUhOMWNIQnZjblFnWkc5amRXMWxiblF1WTI5dmEybGxYRzRnSUNBZ0tHWjFibU4wYVc5dUlITjBZVzVrWVhKa1FuSnZkM05sY2tWdWRpZ3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQWdJSGR5YVhSbE9pQm1kVzVqZEdsdmJpQjNjbWwwWlNodVlXMWxMQ0IyWVd4MVpTd2daWGh3YVhKbGN5d2djR0YwYUN3Z1pHOXRZV2x1TENCelpXTjFjbVVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjJZWElnWTI5dmEybGxJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lDQWdZMjl2YTJsbExuQjFjMmdvYm1GdFpTQXJJQ2M5SnlBcklHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaDJZV3gxWlNrcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tIVjBhV3h6TG1selRuVnRZbVZ5S0dWNGNHbHlaWE1wS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI5cmFXVXVjSFZ6YUNnblpYaHdhWEpsY3owbklDc2dibVYzSUVSaGRHVW9aWGh3YVhKbGN5a3VkRzlIVFZSVGRISnBibWNvS1NrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSFYwYVd4ekxtbHpVM1J5YVc1bktIQmhkR2dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI5cmFXVXVjSFZ6YUNnbmNHRjBhRDBuSUNzZ2NHRjBhQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tIVjBhV3h6TG1selUzUnlhVzVuS0dSdmJXRnBiaWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052YjJ0cFpTNXdkWE5vS0Nka2IyMWhhVzQ5SnlBcklHUnZiV0ZwYmlrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLSE5sWTNWeVpTQTlQVDBnZEhKMVpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXZhMmxsTG5CMWMyZ29KM05sWTNWeVpTY3BPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJR1J2WTNWdFpXNTBMbU52YjJ0cFpTQTlJR052YjJ0cFpTNXFiMmx1S0NjN0lDY3BPMXh1SUNBZ0lDQWdJQ0I5TEZ4dVhHNGdJQ0FnSUNBZ0lISmxZV1E2SUdaMWJtTjBhVzl1SUhKbFlXUW9ibUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCdFlYUmphQ0E5SUdSdlkzVnRaVzUwTG1OdmIydHBaUzV0WVhSamFDaHVaWGNnVW1WblJYaHdLQ2NvWG53N1hGeGNYSE1xS1NnbklDc2dibUZ0WlNBcklDY3BQU2hiWGp0ZEtpa25LU2s3WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUNodFlYUmphQ0EvSUdSbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENodFlYUmphRnN6WFNrZ09pQnVkV3hzS1R0Y2JpQWdJQ0FnSUNBZ2ZTeGNibHh1SUNBZ0lDQWdJQ0J5WlcxdmRtVTZJR1oxYm1OMGFXOXVJSEpsYlc5MlpTaHVZVzFsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1M2NtbDBaU2h1WVcxbExDQW5KeXdnUkdGMFpTNXViM2NvS1NBdElEZzJOREF3TURBd0tUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlLU2dwSURwY2JseHVJQ0F2THlCT2IyNGdjM1JoYm1SaGNtUWdZbkp2ZDNObGNpQmxibllnS0hkbFlpQjNiM0pyWlhKekxDQnlaV0ZqZEMxdVlYUnBkbVVwSUd4aFkyc2dibVZsWkdWa0lITjFjSEJ2Y25RdVhHNGdJQ0FnS0daMWJtTjBhVzl1SUc1dmJsTjBZVzVrWVhKa1FuSnZkM05sY2tWdWRpZ3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQWdJSGR5YVhSbE9pQm1kVzVqZEdsdmJpQjNjbWwwWlNncElIdDlMRnh1SUNBZ0lDQWdJQ0J5WldGa09pQm1kVzVqZEdsdmJpQnlaV0ZrS0NrZ2V5QnlaWFIxY200Z2JuVnNiRHNnZlN4Y2JpQWdJQ0FnSUNBZ2NtVnRiM1psT2lCbWRXNWpkR2x2YmlCeVpXMXZkbVVvS1NCN2ZWeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOUtTZ3BYRzRwTzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNHZLaXBjYmlBcUlFUmxkR1Z5YldsdVpYTWdkMmhsZEdobGNpQjBhR1VnYzNCbFkybG1hV1ZrSUZWU1RDQnBjeUJoWW5OdmJIVjBaVnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQjFjbXdnVkdobElGVlNUQ0IwYnlCMFpYTjBYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCMGFHVWdjM0JsWTJsbWFXVmtJRlZTVENCcGN5QmhZbk52YkhWMFpTd2diM1JvWlhKM2FYTmxJR1poYkhObFhHNGdLaTljYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnYVhOQlluTnZiSFYwWlZWU1RDaDFjbXdwSUh0Y2JpQWdMeThnUVNCVlVrd2dhWE1nWTI5dWMybGtaWEpsWkNCaFluTnZiSFYwWlNCcFppQnBkQ0JpWldkcGJuTWdkMmwwYUNCY0lqeHpZMmhsYldVK09pOHZYQ0lnYjNJZ1hDSXZMMXdpSUNod2NtOTBiMk52YkMxeVpXeGhkR2wyWlNCVlVrd3BMbHh1SUNBdkx5QlNSa01nTXprNE5pQmtaV1pwYm1WeklITmphR1Z0WlNCdVlXMWxJR0Z6SUdFZ2MyVnhkV1Z1WTJVZ2IyWWdZMmhoY21GamRHVnljeUJpWldkcGJtNXBibWNnZDJsMGFDQmhJR3hsZEhSbGNpQmhibVFnWm05c2JHOTNaV1JjYmlBZ0x5OGdZbmtnWVc1NUlHTnZiV0pwYm1GMGFXOXVJRzltSUd4bGRIUmxjbk1zSUdScFoybDBjeXdnY0d4MWN5d2djR1Z5YVc5a0xDQnZjaUJvZVhCb1pXNHVYRzRnSUhKbGRIVnliaUF2WGloYllTMTZYVnRoTFhwY1hHUmNYQ3RjWEMxY1hDNWRLam9wUDF4Y0wxeGNMeTlwTG5SbGMzUW9kWEpzS1R0Y2JuMDdYRzRpTENJbmRYTmxJSE4wY21samRDYzdYRzVjYm5aaGNpQjFkR2xzY3lBOUlISmxjWFZwY21Vb0p5NHZMaTR2ZFhScGJITW5LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNBb1hHNGdJSFYwYVd4ekxtbHpVM1JoYm1SaGNtUkNjbTkzYzJWeVJXNTJLQ2tnUDF4dVhHNGdJQzh2SUZOMFlXNWtZWEprSUdKeWIzZHpaWElnWlc1MmN5Qm9ZWFpsSUdaMWJHd2djM1Z3Y0c5eWRDQnZaaUIwYUdVZ1FWQkpjeUJ1WldWa1pXUWdkRzhnZEdWemRGeHVJQ0F2THlCM2FHVjBhR1Z5SUhSb1pTQnlaWEYxWlhOMElGVlNUQ0JwY3lCdlppQjBhR1VnYzJGdFpTQnZjbWxuYVc0Z1lYTWdZM1Z5Y21WdWRDQnNiMk5oZEdsdmJpNWNiaUFnSUNBb1puVnVZM1JwYjI0Z2MzUmhibVJoY21SQ2NtOTNjMlZ5Ulc1MktDa2dlMXh1SUNBZ0lDQWdkbUZ5SUcxemFXVWdQU0F2S0cxemFXVjhkSEpwWkdWdWRDa3ZhUzUwWlhOMEtHNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBPMXh1SUNBZ0lDQWdkbUZ5SUhWeWJGQmhjbk5wYm1kT2IyUmxJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25ZU2NwTzF4dUlDQWdJQ0FnZG1GeUlHOXlhV2RwYmxWU1REdGNibHh1SUNBZ0lDQWdMeW9xWEc0Z0lDQWdLaUJRWVhKelpTQmhJRlZTVENCMGJ5QmthWE5qYjNabGNpQnBkQ2R6SUdOdmJYQnZibVZ1ZEhOY2JpQWdJQ0FxWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdkWEpzSUZSb1pTQlZVa3dnZEc4Z1ltVWdjR0Z5YzJWa1hHNGdJQ0FnS2lCQWNtVjBkWEp1Y3lCN1QySnFaV04wZlZ4dUlDQWdJQ292WEc0Z0lDQWdJQ0JtZFc1amRHbHZiaUJ5WlhOdmJIWmxWVkpNS0hWeWJDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2FISmxaaUE5SUhWeWJEdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb2JYTnBaU2tnZTF4dUlDQWdJQ0FnSUNBdkx5QkpSU0J1WldWa2N5QmhkSFJ5YVdKMWRHVWdjMlYwSUhSM2FXTmxJSFJ2SUc1dmNtMWhiR2w2WlNCd2NtOXdaWEowYVdWelhHNGdJQ0FnSUNBZ0lDQWdkWEpzVUdGeWMybHVaMDV2WkdVdWMyVjBRWFIwY21saWRYUmxLQ2RvY21WbUp5d2dhSEpsWmlrN1hHNGdJQ0FnSUNBZ0lDQWdhSEpsWmlBOUlIVnliRkJoY25OcGJtZE9iMlJsTG1oeVpXWTdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCMWNteFFZWEp6YVc1blRtOWtaUzV6WlhSQmRIUnlhV0oxZEdVb0oyaHlaV1luTENCb2NtVm1LVHRjYmx4dUlDQWdJQ0FnSUNBdkx5QjFjbXhRWVhKemFXNW5UbTlrWlNCd2NtOTJhV1JsY3lCMGFHVWdWWEpzVlhScGJITWdhVzUwWlhKbVlXTmxJQzBnYUhSMGNEb3ZMM1Z5YkM1emNHVmpMbmRvWVhSM1p5NXZjbWN2STNWeWJIVjBhV3h6WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ2FISmxaam9nZFhKc1VHRnljMmx1WjA1dlpHVXVhSEpsWml4Y2JpQWdJQ0FnSUNBZ0lDQndjbTkwYjJOdmJEb2dkWEpzVUdGeWMybHVaMDV2WkdVdWNISnZkRzlqYjJ3Z1B5QjFjbXhRWVhKemFXNW5UbTlrWlM1d2NtOTBiMk52YkM1eVpYQnNZV05sS0M4NkpDOHNJQ2NuS1NBNklDY25MRnh1SUNBZ0lDQWdJQ0FnSUdodmMzUTZJSFZ5YkZCaGNuTnBibWRPYjJSbExtaHZjM1FzWEc0Z0lDQWdJQ0FnSUNBZ2MyVmhjbU5vT2lCMWNteFFZWEp6YVc1blRtOWtaUzV6WldGeVkyZ2dQeUIxY214UVlYSnphVzVuVG05a1pTNXpaV0Z5WTJndWNtVndiR0ZqWlNndlhseGNQeThzSUNjbktTQTZJQ2NuTEZ4dUlDQWdJQ0FnSUNBZ0lHaGhjMmc2SUhWeWJGQmhjbk5wYm1kT2IyUmxMbWhoYzJnZ1B5QjFjbXhRWVhKemFXNW5UbTlrWlM1b1lYTm9MbkpsY0d4aFkyVW9MMTRqTHl3Z0p5Y3BJRG9nSnljc1hHNGdJQ0FnSUNBZ0lDQWdhRzl6ZEc1aGJXVTZJSFZ5YkZCaGNuTnBibWRPYjJSbExtaHZjM1J1WVcxbExGeHVJQ0FnSUNBZ0lDQWdJSEJ2Y25RNklIVnliRkJoY25OcGJtZE9iMlJsTG5CdmNuUXNYRzRnSUNBZ0lDQWdJQ0FnY0dGMGFHNWhiV1U2SUNoMWNteFFZWEp6YVc1blRtOWtaUzV3WVhSb2JtRnRaUzVqYUdGeVFYUW9NQ2tnUFQwOUlDY3ZKeWtnUDF4dUlDQWdJQ0FnSUNBZ0lDQWdkWEpzVUdGeWMybHVaMDV2WkdVdWNHRjBhRzVoYldVZ09seHVJQ0FnSUNBZ0lDQWdJQ0FnSnk4bklDc2dkWEpzVUdGeWMybHVaMDV2WkdVdWNHRjBhRzVoYldWY2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdiM0pwWjJsdVZWSk1JRDBnY21WemIyeDJaVlZTVENoM2FXNWtiM2N1Ykc5allYUnBiMjR1YUhKbFppazdYRzVjYmlBZ0lDQWdJQzhxS2x4dUlDQWdJQ29nUkdWMFpYSnRhVzVsSUdsbUlHRWdWVkpNSUhOb1lYSmxjeUIwYUdVZ2MyRnRaU0J2Y21sbmFXNGdZWE1nZEdobElHTjFjbkpsYm5RZ2JHOWpZWFJwYjI1Y2JpQWdJQ0FxWEc0Z0lDQWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdjbVZ4ZFdWemRGVlNUQ0JVYUdVZ1ZWSk1JSFJ2SUhSbGMzUmNiaUFnSUNBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlVjblZsSUdsbUlGVlNUQ0J6YUdGeVpYTWdkR2hsSUhOaGJXVWdiM0pwWjJsdUxDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQWdJQ0FxTDF4dUlDQWdJQ0FnY21WMGRYSnVJR1oxYm1OMGFXOXVJR2x6VlZKTVUyRnRaVTl5YVdkcGJpaHlaWEYxWlhOMFZWSk1LU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQndZWEp6WldRZ1BTQW9kWFJwYkhNdWFYTlRkSEpwYm1jb2NtVnhkV1Z6ZEZWU1RDa3BJRDhnY21WemIyeDJaVlZTVENoeVpYRjFaWE4wVlZKTUtTQTZJSEpsY1hWbGMzUlZVa3c3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUFvY0dGeWMyVmtMbkJ5YjNSdlkyOXNJRDA5UFNCdmNtbG5hVzVWVWt3dWNISnZkRzlqYjJ3Z0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUhCaGNuTmxaQzVvYjNOMElEMDlQU0J2Y21sbmFXNVZVa3d1YUc5emRDazdYRzRnSUNBZ0lDQjlPMXh1SUNBZ0lIMHBLQ2tnT2x4dVhHNGdJQzh2SUU1dmJpQnpkR0Z1WkdGeVpDQmljbTkzYzJWeUlHVnVkbk1nS0hkbFlpQjNiM0pyWlhKekxDQnlaV0ZqZEMxdVlYUnBkbVVwSUd4aFkyc2dibVZsWkdWa0lITjFjSEJ2Y25RdVhHNGdJQ0FnS0daMWJtTjBhVzl1SUc1dmJsTjBZVzVrWVhKa1FuSnZkM05sY2tWdWRpZ3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQnBjMVZTVEZOaGJXVlBjbWxuYVc0b0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0I5S1NncFhHNHBPMXh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1MllYSWdkWFJwYkhNZ1BTQnlaWEYxYVhKbEtDY3VMaTkxZEdsc2N5Y3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUc1dmNtMWhiR2w2WlVobFlXUmxjazVoYldVb2FHVmhaR1Z5Y3l3Z2JtOXliV0ZzYVhwbFpFNWhiV1VwSUh0Y2JpQWdkWFJwYkhNdVptOXlSV0ZqYUNob1pXRmtaWEp6TENCbWRXNWpkR2x2YmlCd2NtOWpaWE56U0dWaFpHVnlLSFpoYkhWbExDQnVZVzFsS1NCN1hHNGdJQ0FnYVdZZ0tHNWhiV1VnSVQwOUlHNXZjbTFoYkdsNlpXUk9ZVzFsSUNZbUlHNWhiV1V1ZEc5VmNIQmxja05oYzJVb0tTQTlQVDBnYm05eWJXRnNhWHBsWkU1aGJXVXVkRzlWY0hCbGNrTmhjMlVvS1NrZ2UxeHVJQ0FnSUNBZ2FHVmhaR1Z5YzF0dWIzSnRZV3hwZW1Wa1RtRnRaVjBnUFNCMllXeDFaVHRjYmlBZ0lDQWdJR1JsYkdWMFpTQm9aV0ZrWlhKelcyNWhiV1ZkTzF4dUlDQWdJSDFjYmlBZ2ZTazdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNTJZWElnZFhScGJITWdQU0J5WlhGMWFYSmxLQ2N1THk0dUwzVjBhV3h6SnlrN1hHNWNiaTh2SUVobFlXUmxjbk1nZDJodmMyVWdaSFZ3YkdsallYUmxjeUJoY21VZ2FXZHViM0psWkNCaWVTQnViMlJsWEc0dkx5QmpMbVl1SUdoMGRIQnpPaTh2Ym05a1pXcHpMbTl5Wnk5aGNHa3ZhSFIwY0M1b2RHMXNJMmgwZEhCZmJXVnpjMkZuWlY5b1pXRmtaWEp6WEc1MllYSWdhV2R1YjNKbFJIVndiR2xqWVhSbFQyWWdQU0JiWEc0Z0lDZGhaMlVuTENBbllYVjBhRzl5YVhwaGRHbHZiaWNzSUNkamIyNTBaVzUwTFd4bGJtZDBhQ2NzSUNkamIyNTBaVzUwTFhSNWNHVW5MQ0FuWlhSaFp5Y3NYRzRnSUNkbGVIQnBjbVZ6Snl3Z0oyWnliMjBuTENBbmFHOXpkQ2NzSUNkcFppMXRiMlJwWm1sbFpDMXphVzVqWlNjc0lDZHBaaTExYm0xdlpHbG1hV1ZrTFhOcGJtTmxKeXhjYmlBZ0oyeGhjM1F0Ylc5a2FXWnBaV1FuTENBbmJHOWpZWFJwYjI0bkxDQW5iV0Y0TFdadmNuZGhjbVJ6Snl3Z0ozQnliM2g1TFdGMWRHaHZjbWw2WVhScGIyNG5MRnh1SUNBbmNtVm1aWEpsY2ljc0lDZHlaWFJ5ZVMxaFpuUmxjaWNzSUNkMWMyVnlMV0ZuWlc1MEoxeHVYVHRjYmx4dUx5b3FYRzRnS2lCUVlYSnpaU0JvWldGa1pYSnpJR2x1ZEc4Z1lXNGdiMkpxWldOMFhHNGdLbHh1SUNvZ1lHQmdYRzRnS2lCRVlYUmxPaUJYWldRc0lESTNJRUYxWnlBeU1ERTBJREE0T2pVNE9qUTVJRWROVkZ4dUlDb2dRMjl1ZEdWdWRDMVVlWEJsT2lCaGNIQnNhV05oZEdsdmJpOXFjMjl1WEc0Z0tpQkRiMjV1WldOMGFXOXVPaUJyWldWd0xXRnNhWFpsWEc0Z0tpQlVjbUZ1YzJabGNpMUZibU52WkdsdVp6b2dZMmgxYm10bFpGeHVJQ29nWUdCZ1hHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUdobFlXUmxjbk1nU0dWaFpHVnljeUJ1WldWa2FXNW5JSFJ2SUdKbElIQmhjbk5sWkZ4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdTR1ZoWkdWeWN5QndZWEp6WldRZ2FXNTBieUJoYmlCdlltcGxZM1JjYmlBcUwxeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQndZWEp6WlVobFlXUmxjbk1vYUdWaFpHVnljeWtnZTF4dUlDQjJZWElnY0dGeWMyVmtJRDBnZTMwN1hHNGdJSFpoY2lCclpYazdYRzRnSUhaaGNpQjJZV3c3WEc0Z0lIWmhjaUJwTzF4dVhHNGdJR2xtSUNnaGFHVmhaR1Z5Y3lrZ2V5QnlaWFIxY200Z2NHRnljMlZrT3lCOVhHNWNiaUFnZFhScGJITXVabTl5UldGamFDaG9aV0ZrWlhKekxuTndiR2wwS0NkY1hHNG5LU3dnWm5WdVkzUnBiMjRnY0dGeWMyVnlLR3hwYm1VcElIdGNiaUFnSUNCcElEMGdiR2x1WlM1cGJtUmxlRTltS0NjNkp5azdYRzRnSUNBZ2EyVjVJRDBnZFhScGJITXVkSEpwYlNoc2FXNWxMbk4xWW5OMGNpZ3dMQ0JwS1NrdWRHOU1iM2RsY2tOaGMyVW9LVHRjYmlBZ0lDQjJZV3dnUFNCMWRHbHNjeTUwY21sdEtHeHBibVV1YzNWaWMzUnlLR2tnS3lBeEtTazdYRzVjYmlBZ0lDQnBaaUFvYTJWNUtTQjdYRzRnSUNBZ0lDQnBaaUFvY0dGeWMyVmtXMnRsZVYwZ0ppWWdhV2R1YjNKbFJIVndiR2xqWVhSbFQyWXVhVzVrWlhoUFppaHJaWGtwSUQ0OUlEQXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdhV1lnS0d0bGVTQTlQVDBnSjNObGRDMWpiMjlyYVdVbktTQjdYRzRnSUNBZ0lDQWdJSEJoY25ObFpGdHJaWGxkSUQwZ0tIQmhjbk5sWkZ0clpYbGRJRDhnY0dGeWMyVmtXMnRsZVYwZ09pQmJYU2t1WTI5dVkyRjBLRnQyWVd4ZEtUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lIQmhjbk5sWkZ0clpYbGRJRDBnY0dGeWMyVmtXMnRsZVYwZ1B5QndZWEp6WldSYmEyVjVYU0FySUNjc0lDY2dLeUIyWVd3Z09pQjJZV3c3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNCOUtUdGNibHh1SUNCeVpYUjFjbTRnY0dGeWMyVmtPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQlRlVzUwWVdOMGFXTWdjM1ZuWVhJZ1ptOXlJR2x1ZG05cmFXNW5JR0VnWm5WdVkzUnBiMjRnWVc1a0lHVjRjR0Z1WkdsdVp5QmhiaUJoY25KaGVTQm1iM0lnWVhKbmRXMWxiblJ6TGx4dUlDcGNiaUFxSUVOdmJXMXZiaUIxYzJVZ1kyRnpaU0IzYjNWc1pDQmlaU0IwYnlCMWMyVWdZRVoxYm1OMGFXOXVMbkJ5YjNSdmRIbHdaUzVoY0hCc2VXQXVYRzRnS2x4dUlDb2dJR0JnWUdwelhHNGdLaUFnWm5WdVkzUnBiMjRnWmloNExDQjVMQ0I2S1NCN2ZWeHVJQ29nSUhaaGNpQmhjbWR6SUQwZ1d6RXNJRElzSUROZE8xeHVJQ29nSUdZdVlYQndiSGtvYm5Wc2JDd2dZWEpuY3lrN1hHNGdLaUFnWUdCZ1hHNGdLbHh1SUNvZ1YybDBhQ0JnYzNCeVpXRmtZQ0IwYUdseklHVjRZVzF3YkdVZ1kyRnVJR0psSUhKbExYZHlhWFIwWlc0dVhHNGdLbHh1SUNvZ0lHQmdZR3B6WEc0Z0tpQWdjM0J5WldGa0tHWjFibU4wYVc5dUtIZ3NJSGtzSUhvcElIdDlLU2hiTVN3Z01pd2dNMTBwTzF4dUlDb2dJR0JnWUZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdOaGJHeGlZV05yWEc0Z0tpQkFjbVYwZFhKdWN5QjdSblZ1WTNScGIyNTlYRzRnS2k5Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z2MzQnlaV0ZrS0dOaGJHeGlZV05yS1NCN1hHNGdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQjNjbUZ3S0dGeWNpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCallXeHNZbUZqYXk1aGNIQnNlU2h1ZFd4c0xDQmhjbklwTzF4dUlDQjlPMXh1ZlR0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUdKcGJtUWdQU0J5WlhGMWFYSmxLQ2N1TDJobGJIQmxjbk12WW1sdVpDY3BPMXh1WEc0dkttZHNiMkpoYkNCMGIxTjBjbWx1WnpwMGNuVmxLaTljYmx4dUx5OGdkWFJwYkhNZ2FYTWdZU0JzYVdKeVlYSjVJRzltSUdkbGJtVnlhV01nYUdWc2NHVnlJR1oxYm1OMGFXOXVjeUJ1YjI0dGMzQmxZMmxtYVdNZ2RHOGdZWGhwYjNOY2JseHVkbUZ5SUhSdlUzUnlhVzVuSUQwZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnp0Y2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaGJpQkJjbkpoZVZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0Z1SUVGeWNtRjVMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVNoMllXd3BJSHRjYmlBZ2NtVjBkWEp1SUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzS1NBOVBUMGdKMXR2WW1wbFkzUWdRWEp5WVhsZEp6dGNibjFjYmx4dUx5b3FYRzRnS2lCRVpYUmxjbTFwYm1VZ2FXWWdZU0IyWVd4MVpTQnBjeUIxYm1SbFptbHVaV1JjYmlBcVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdkbUZzSUZSb1pTQjJZV3gxWlNCMGJ5QjBaWE4wWEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdWSEoxWlNCcFppQjBhR1VnZG1Gc2RXVWdhWE1nZFc1a1pXWnBibVZrTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5WYm1SbFptbHVaV1FvZG1Gc0tTQjdYRzRnSUhKbGRIVnliaUIwZVhCbGIyWWdkbUZzSUQwOVBTQW5kVzVrWldacGJtVmtKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFSjFabVpsY2x4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0VnUW5WbVptVnlMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkNkV1ptWlhJb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMllXd2dJVDA5SUc1MWJHd2dKaVlnSVdselZXNWtaV1pwYm1Wa0tIWmhiQ2tnSmlZZ2RtRnNMbU52Ym5OMGNuVmpkRzl5SUNFOVBTQnVkV3hzSUNZbUlDRnBjMVZ1WkdWbWFXNWxaQ2gyWVd3dVkyOXVjM1J5ZFdOMGIzSXBYRzRnSUNBZ0ppWWdkSGx3Wlc5bUlIWmhiQzVqYjI1emRISjFZM1J2Y2k1cGMwSjFabVpsY2lBOVBUMGdKMloxYm1OMGFXOXVKeUFtSmlCMllXd3VZMjl1YzNSeWRXTjBiM0l1YVhOQ2RXWm1aWElvZG1Gc0tUdGNibjFjYmx4dUx5b3FYRzRnS2lCRVpYUmxjbTFwYm1VZ2FXWWdZU0IyWVd4MVpTQnBjeUJoYmlCQmNuSmhlVUoxWm1abGNseHVJQ3BjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCMllXd2dWR2hsSUhaaGJIVmxJSFJ2SUhSbGMzUmNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCVWNuVmxJR2xtSUhaaGJIVmxJR2x6SUdGdUlFRnljbUY1UW5WbVptVnlMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVVKMVptWmxjaWgyWVd3cElIdGNiaUFnY21WMGRYSnVJSFJ2VTNSeWFXNW5MbU5oYkd3b2RtRnNLU0E5UFQwZ0oxdHZZbXBsWTNRZ1FYSnlZWGxDZFdabVpYSmRKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFWnZjbTFFWVhSaFhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhaaGJDQlVhR1VnZG1Gc2RXVWdkRzhnZEdWemRGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZG1Gc2RXVWdhWE1nWVc0Z1JtOXliVVJoZEdFc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBadmNtMUVZWFJoS0haaGJDa2dlMXh1SUNCeVpYUjFjbTRnS0hSNWNHVnZaaUJHYjNKdFJHRjBZU0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJQ1ltSUNoMllXd2dhVzV6ZEdGdVkyVnZaaUJHYjNKdFJHRjBZU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQjJhV1YzSUc5dUlHRnVJRUZ5Y21GNVFuVm1abVZ5WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0IyYVdWM0lHOXVJR0Z1SUVGeWNtRjVRblZtWm1WeUxDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOQmNuSmhlVUoxWm1abGNsWnBaWGNvZG1Gc0tTQjdYRzRnSUhaaGNpQnlaWE4xYkhRN1hHNGdJR2xtSUNnb2RIbHdaVzltSUVGeWNtRjVRblZtWm1WeUlDRTlQU0FuZFc1a1pXWnBibVZrSnlrZ0ppWWdLRUZ5Y21GNVFuVm1abVZ5TG1selZtbGxkeWtwSUh0Y2JpQWdJQ0J5WlhOMWJIUWdQU0JCY25KaGVVSjFabVpsY2k1cGMxWnBaWGNvZG1Gc0tUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWE4xYkhRZ1BTQW9kbUZzS1NBbUppQW9kbUZzTG1KMVptWmxjaWtnSmlZZ0tIWmhiQzVpZFdabVpYSWdhVzV6ZEdGdVkyVnZaaUJCY25KaGVVSjFabVpsY2lrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElGTjBjbWx1WjF4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0VnVTNSeWFXNW5MQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTlRkSEpwYm1jb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnZG1Gc0lEMDlQU0FuYzNSeWFXNW5KenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElFNTFiV0psY2x4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0VnVG5WdFltVnlMQ0J2ZEdobGNuZHBjMlVnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTk9kVzFpWlhJb2RtRnNLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnZG1Gc0lEMDlQU0FuYm5WdFltVnlKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaGJpQlBZbXBsWTNSY2JpQXFYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnZG1Gc0lGUm9aU0IyWVd4MVpTQjBieUIwWlhOMFhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVkhKMVpTQnBaaUIyWVd4MVpTQnBjeUJoYmlCUFltcGxZM1FzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMDlpYW1WamRDaDJZV3dwSUh0Y2JpQWdjbVYwZFhKdUlIWmhiQ0FoUFQwZ2JuVnNiQ0FtSmlCMGVYQmxiMllnZG1Gc0lEMDlQU0FuYjJKcVpXTjBKenRjYm4xY2JseHVMeW9xWEc0Z0tpQkVaWFJsY20xcGJtVWdhV1lnWVNCMllXeDFaU0JwY3lCaElIQnNZV2x1SUU5aWFtVmpkRnh1SUNwY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQjJZV3dnVkdobElIWmhiSFZsSUhSdklIUmxjM1JjYmlBcUlFQnlaWFIxY200Z2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lTQndiR0ZwYmlCUFltcGxZM1FzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMUJzWVdsdVQySnFaV04wS0haaGJDa2dlMXh1SUNCcFppQW9kRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJQ0U5UFNBblcyOWlhbVZqZENCUFltcGxZM1JkSnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dVhHNGdJSFpoY2lCd2NtOTBiM1I1Y0dVZ1BTQlBZbXBsWTNRdVoyVjBVSEp2ZEc5MGVYQmxUMllvZG1Gc0tUdGNiaUFnY21WMGRYSnVJSEJ5YjNSdmRIbHdaU0E5UFQwZ2JuVnNiQ0I4ZkNCd2NtOTBiM1I1Y0dVZ1BUMDlJRTlpYW1WamRDNXdjbTkwYjNSNWNHVTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCRVlYUmxYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lTQkVZWFJsTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5FWVhSbEtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RHOVRkSEpwYm1jdVkyRnNiQ2gyWVd3cElEMDlQU0FuVzI5aWFtVmpkQ0JFWVhSbFhTYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCR2FXeGxYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lTQkdhV3hsTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5HYVd4bEtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RHOVRkSEpwYm1jdVkyRnNiQ2gyWVd3cElEMDlQU0FuVzI5aWFtVmpkQ0JHYVd4bFhTYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCQ2JHOWlYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lTQkNiRzlpTENCdmRHaGxjbmRwYzJVZ1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5DYkc5aUtIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z2RHOVRkSEpwYm1jdVkyRnNiQ2gyWVd3cElEMDlQU0FuVzI5aWFtVmpkQ0JDYkc5aVhTYzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1JHVjBaWEp0YVc1bElHbG1JR0VnZG1Gc2RXVWdhWE1nWVNCR2RXNWpkR2x2Ymx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0IyWVd3Z1ZHaGxJSFpoYkhWbElIUnZJSFJsYzNSY2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JVY25WbElHbG1JSFpoYkhWbElHbHpJR0VnUm5WdVkzUnBiMjRzSUc5MGFHVnlkMmx6WlNCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMFoxYm1OMGFXOXVLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BJRDA5UFNBblcyOWlhbVZqZENCR2RXNWpkR2x2Ymwwbk8xeHVmVnh1WEc0dktpcGNiaUFxSUVSbGRHVnliV2x1WlNCcFppQmhJSFpoYkhWbElHbHpJR0VnVTNSeVpXRnRYRzRnS2x4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIWmhiQ0JVYUdVZ2RtRnNkV1VnZEc4Z2RHVnpkRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RtRnNkV1VnYVhNZ1lTQlRkSEpsWVcwc0lHOTBhR1Z5ZDJselpTQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzFOMGNtVmhiU2gyWVd3cElIdGNiaUFnY21WMGRYSnVJR2x6VDJKcVpXTjBLSFpoYkNrZ0ppWWdhWE5HZFc1amRHbHZiaWgyWVd3dWNHbHdaU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dSR1YwWlhKdGFXNWxJR2xtSUdFZ2RtRnNkV1VnYVhNZ1lTQlZVa3hUWldGeVkyaFFZWEpoYlhNZ2IySnFaV04wWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFpoYkNCVWFHVWdkbUZzZFdVZ2RHOGdkR1Z6ZEZ4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRlJ5ZFdVZ2FXWWdkbUZzZFdVZ2FYTWdZU0JWVWt4VFpXRnlZMmhRWVhKaGJYTWdiMkpxWldOMExDQnZkR2hsY25kcGMyVWdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOVlVreFRaV0Z5WTJoUVlYSmhiWE1vZG1Gc0tTQjdYRzRnSUhKbGRIVnliaUIwZVhCbGIyWWdWVkpNVTJWaGNtTm9VR0Z5WVcxeklDRTlQU0FuZFc1a1pXWnBibVZrSnlBbUppQjJZV3dnYVc1emRHRnVZMlZ2WmlCVlVreFRaV0Z5WTJoUVlYSmhiWE03WEc1OVhHNWNiaThxS2x4dUlDb2dWSEpwYlNCbGVHTmxjM01nZDJocGRHVnpjR0ZqWlNCdlptWWdkR2hsSUdKbFoybHVibWx1WnlCaGJtUWdaVzVrSUc5bUlHRWdjM1J5YVc1blhHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhOMGNpQlVhR1VnVTNSeWFXNW5JSFJ2SUhSeWFXMWNiaUFxSUVCeVpYUjFjbTV6SUh0VGRISnBibWQ5SUZSb1pTQlRkSEpwYm1jZ1puSmxaV1FnYjJZZ1pYaGpaWE56SUhkb2FYUmxjM0JoWTJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnZEhKcGJTaHpkSElwSUh0Y2JpQWdjbVYwZFhKdUlITjBjaTV5WlhCc1lXTmxLQzllWEZ4ektpOHNJQ2NuS1M1eVpYQnNZV05sS0M5Y1hITXFKQzhzSUNjbktUdGNibjFjYmx4dUx5b3FYRzRnS2lCRVpYUmxjbTFwYm1VZ2FXWWdkMlVuY21VZ2NuVnVibWx1WnlCcGJpQmhJSE4wWVc1a1lYSmtJR0p5YjNkelpYSWdaVzUyYVhKdmJtMWxiblJjYmlBcVhHNGdLaUJVYUdseklHRnNiRzkzY3lCaGVHbHZjeUIwYnlCeWRXNGdhVzRnWVNCM1pXSWdkMjl5YTJWeUxDQmhibVFnY21WaFkzUXRibUYwYVhabExseHVJQ29nUW05MGFDQmxiblpwY205dWJXVnVkSE1nYzNWd2NHOXlkQ0JZVFV4SWRIUndVbVZ4ZFdWemRDd2dZblYwSUc1dmRDQm1kV3hzZVNCemRHRnVaR0Z5WkNCbmJHOWlZV3h6TGx4dUlDcGNiaUFxSUhkbFlpQjNiM0pyWlhKek9seHVJQ29nSUhSNWNHVnZaaUIzYVc1a2IzY2dMVDRnZFc1a1pXWnBibVZrWEc0Z0tpQWdkSGx3Wlc5bUlHUnZZM1Z0Wlc1MElDMCtJSFZ1WkdWbWFXNWxaRnh1SUNwY2JpQXFJSEpsWVdOMExXNWhkR2wyWlRwY2JpQXFJQ0J1WVhacFoyRjBiM0l1Y0hKdlpIVmpkQ0F0UGlBblVtVmhZM1JPWVhScGRtVW5YRzRnS2lCdVlYUnBkbVZ6WTNKcGNIUmNiaUFxSUNCdVlYWnBaMkYwYjNJdWNISnZaSFZqZENBdFBpQW5UbUYwYVhabFUyTnlhWEIwSnlCdmNpQW5UbE1uWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6VTNSaGJtUmhjbVJDY205M2MyVnlSVzUyS0NrZ2UxeHVJQ0JwWmlBb2RIbHdaVzltSUc1aGRtbG5ZWFJ2Y2lBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ0tHNWhkbWxuWVhSdmNpNXdjbTlrZFdOMElEMDlQU0FuVW1WaFkzUk9ZWFJwZG1VbklIeDhYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdibUYyYVdkaGRHOXlMbkJ5YjJSMVkzUWdQVDA5SUNkT1lYUnBkbVZUWTNKcGNIUW5JSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYm1GMmFXZGhkRzl5TG5CeWIyUjFZM1FnUFQwOUlDZE9VeWNwS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlBb1hHNGdJQ0FnZEhsd1pXOW1JSGRwYm1SdmR5QWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWmNiaUFnSUNCMGVYQmxiMllnWkc5amRXMWxiblFnSVQwOUlDZDFibVJsWm1sdVpXUW5YRzRnSUNrN1hHNTlYRzVjYmk4cUtseHVJQ29nU1hSbGNtRjBaU0J2ZG1WeUlHRnVJRUZ5Y21GNUlHOXlJR0Z1SUU5aWFtVmpkQ0JwYm5admEybHVaeUJoSUdaMWJtTjBhVzl1SUdadmNpQmxZV05vSUdsMFpXMHVYRzRnS2x4dUlDb2dTV1lnWUc5aWFtQWdhWE1nWVc0Z1FYSnlZWGtnWTJGc2JHSmhZMnNnZDJsc2JDQmlaU0JqWVd4c1pXUWdjR0Z6YzJsdVoxeHVJQ29nZEdobElIWmhiSFZsTENCcGJtUmxlQ3dnWVc1a0lHTnZiWEJzWlhSbElHRnljbUY1SUdadmNpQmxZV05vSUdsMFpXMHVYRzRnS2x4dUlDb2dTV1lnSjI5aWFpY2dhWE1nWVc0Z1QySnFaV04wSUdOaGJHeGlZV05ySUhkcGJHd2dZbVVnWTJGc2JHVmtJSEJoYzNOcGJtZGNiaUFxSUhSb1pTQjJZV3gxWlN3Z2EyVjVMQ0JoYm1RZ1kyOXRjR3hsZEdVZ2IySnFaV04wSUdadmNpQmxZV05vSUhCeWIzQmxjblI1TGx4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmRUZ5Y21GNWZTQnZZbW9nVkdobElHOWlhbVZqZENCMGJ5QnBkR1Z5WVhSbFhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JtYmlCVWFHVWdZMkZzYkdKaFkyc2dkRzhnYVc1MmIydGxJR1p2Y2lCbFlXTm9JR2wwWlcxY2JpQXFMMXh1Wm5WdVkzUnBiMjRnWm05eVJXRmphQ2h2WW1vc0lHWnVLU0I3WEc0Z0lDOHZJRVJ2YmlkMElHSnZkR2hsY2lCcFppQnVieUIyWVd4MVpTQndjbTkyYVdSbFpGeHVJQ0JwWmlBb2IySnFJRDA5UFNCdWRXeHNJSHg4SUhSNWNHVnZaaUJ2WW1vZ1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCN1hHNGdJQ0FnY21WMGRYSnVPMXh1SUNCOVhHNWNiaUFnTHk4Z1JtOXlZMlVnWVc0Z1lYSnlZWGtnYVdZZ2JtOTBJR0ZzY21WaFpIa2djMjl0WlhSb2FXNW5JR2wwWlhKaFlteGxYRzRnSUdsbUlDaDBlWEJsYjJZZ2IySnFJQ0U5UFNBbmIySnFaV04wSnlrZ2UxeHVJQ0FnSUM4cVpYTnNhVzUwSUc1dkxYQmhjbUZ0TFhKbFlYTnphV2R1T2pBcUwxeHVJQ0FnSUc5aWFpQTlJRnR2WW1wZE8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0dselFYSnlZWGtvYjJKcUtTa2dlMXh1SUNBZ0lDOHZJRWwwWlhKaGRHVWdiM1psY2lCaGNuSmhlU0IyWVd4MVpYTmNiaUFnSUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkNBOUlHOWlhaTVzWlc1bmRHZzdJR2tnUENCc095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdadUxtTmhiR3dvYm5Wc2JDd2diMkpxVzJsZExDQnBMQ0J2WW1vcE8xeHVJQ0FnSUgxY2JpQWdmU0JsYkhObElIdGNiaUFnSUNBdkx5QkpkR1Z5WVhSbElHOTJaWElnYjJKcVpXTjBJR3RsZVhOY2JpQWdJQ0JtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdiMkpxS1NCN1hHNGdJQ0FnSUNCcFppQW9UMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRzlpYWl3Z2EyVjVLU2tnZTF4dUlDQWdJQ0FnSUNCbWJpNWpZV3hzS0c1MWJHd3NJRzlpYWx0clpYbGRMQ0JyWlhrc0lHOWlhaWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNCOVhHNTlYRzVjYmk4cUtseHVJQ29nUVdOalpYQjBjeUIyWVhKaGNtZHpJR1Y0Y0dWamRHbHVaeUJsWVdOb0lHRnlaM1Z0Wlc1MElIUnZJR0psSUdGdUlHOWlhbVZqZEN3Z2RHaGxibHh1SUNvZ2FXMXRkWFJoWW14NUlHMWxjbWRsY3lCMGFHVWdjSEp2Y0dWeWRHbGxjeUJ2WmlCbFlXTm9JRzlpYW1WamRDQmhibVFnY21WMGRYSnVjeUJ5WlhOMWJIUXVYRzRnS2x4dUlDb2dWMmhsYmlCdGRXeDBhWEJzWlNCdlltcGxZM1J6SUdOdmJuUmhhVzRnZEdobElITmhiV1VnYTJWNUlIUm9aU0JzWVhSbGNpQnZZbXBsWTNRZ2FXNWNiaUFxSUhSb1pTQmhjbWQxYldWdWRITWdiR2x6ZENCM2FXeHNJSFJoYTJVZ2NISmxZMlZrWlc1alpTNWNiaUFxWEc0Z0tpQkZlR0Z0Y0d4bE9seHVJQ3BjYmlBcUlHQmdZR3B6WEc0Z0tpQjJZWElnY21WemRXeDBJRDBnYldWeVoyVW9lMlp2YnpvZ01USXpmU3dnZTJadmJ6b2dORFUyZlNrN1hHNGdLaUJqYjI1emIyeGxMbXh2WnloeVpYTjFiSFF1Wm05dktUc2dMeThnYjNWMGNIVjBjeUEwTlRaY2JpQXFJR0JnWUZ4dUlDcGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J2WW1veElFOWlhbVZqZENCMGJ5QnRaWEpuWlZ4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdVbVZ6ZFd4MElHOW1JR0ZzYkNCdFpYSm5aU0J3Y205d1pYSjBhV1Z6WEc0Z0tpOWNibVoxYm1OMGFXOXVJRzFsY21kbEtDOHFJRzlpYWpFc0lHOWlhaklzSUc5aWFqTXNJQzR1TGlBcUx5a2dlMXh1SUNCMllYSWdjbVZ6ZFd4MElEMGdlMzA3WEc0Z0lHWjFibU4wYVc5dUlHRnpjMmxuYmxaaGJIVmxLSFpoYkN3Z2EyVjVLU0I3WEc0Z0lDQWdhV1lnS0dselVHeGhhVzVQWW1wbFkzUW9jbVZ6ZFd4MFcydGxlVjBwSUNZbUlHbHpVR3hoYVc1UFltcGxZM1FvZG1Gc0tTa2dlMXh1SUNBZ0lDQWdjbVZ6ZFd4MFcydGxlVjBnUFNCdFpYSm5aU2h5WlhOMWJIUmJhMlY1WFN3Z2RtRnNLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR2x6VUd4aGFXNVBZbXBsWTNRb2RtRnNLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBXMnRsZVYwZ1BTQnRaWEpuWlNoN2ZTd2dkbUZzS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dselFYSnlZWGtvZG1Gc0tTa2dlMXh1SUNBZ0lDQWdjbVZ6ZFd4MFcydGxlVjBnUFNCMllXd3VjMnhwWTJVb0tUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnY21WemRXeDBXMnRsZVYwZ1BTQjJZV3c3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlEQXNJR3dnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvT3lCcElEd2diRHNnYVNzcktTQjdYRzRnSUNBZ1ptOXlSV0ZqYUNoaGNtZDFiV1Z1ZEhOYmFWMHNJR0Z6YzJsbmJsWmhiSFZsS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFVjRkR1Z1WkhNZ2IySnFaV04wSUdFZ1lua2diWFYwWVdKc2VTQmhaR1JwYm1jZ2RHOGdhWFFnZEdobElIQnliM0JsY25ScFpYTWdiMllnYjJKcVpXTjBJR0l1WEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR0VnVkdobElHOWlhbVZqZENCMGJ5QmlaU0JsZUhSbGJtUmxaRnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdJZ1ZHaGxJRzlpYW1WamRDQjBieUJqYjNCNUlIQnliM0JsY25ScFpYTWdabkp2YlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIUm9hWE5CY21jZ1ZHaGxJRzlpYW1WamRDQjBieUJpYVc1a0lHWjFibU4wYVc5dUlIUnZYRzRnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUZSb1pTQnlaWE4xYkhScGJtY2dkbUZzZFdVZ2IyWWdiMkpxWldOMElHRmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1pYaDBaVzVrS0dFc0lHSXNJSFJvYVhOQmNtY3BJSHRjYmlBZ1ptOXlSV0ZqYUNoaUxDQm1kVzVqZEdsdmJpQmhjM05wWjI1V1lXeDFaU2gyWVd3c0lHdGxlU2tnZTF4dUlDQWdJR2xtSUNoMGFHbHpRWEpuSUNZbUlIUjVjR1Z2WmlCMllXd2dQVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNBZ0lHRmJhMlY1WFNBOUlHSnBibVFvZG1Gc0xDQjBhR2x6UVhKbktUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnWVZ0clpYbGRJRDBnZG1Gc08xeHVJQ0FnSUgxY2JpQWdmU2s3WEc0Z0lISmxkSFZ5YmlCaE8xeHVmVnh1WEc0dktpcGNiaUFxSUZKbGJXOTJaU0JpZVhSbElHOXlaR1Z5SUcxaGNtdGxjaTRnVkdocGN5QmpZWFJqYUdWeklFVkdJRUpDSUVKR0lDaDBhR1VnVlZSR0xUZ2dRazlOS1Z4dUlDcGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JqYjI1MFpXNTBJSGRwZEdnZ1FrOU5YRzRnS2lCQWNtVjBkWEp1SUh0emRISnBibWQ5SUdOdmJuUmxiblFnZG1Gc2RXVWdkMmwwYUc5MWRDQkNUMDFjYmlBcUwxeHVablZ1WTNScGIyNGdjM1J5YVhCQ1QwMG9ZMjl1ZEdWdWRDa2dlMXh1SUNCcFppQW9ZMjl1ZEdWdWRDNWphR0Z5UTI5a1pVRjBLREFwSUQwOVBTQXdlRVpGUmtZcElIdGNiaUFnSUNCamIyNTBaVzUwSUQwZ1kyOXVkR1Z1ZEM1emJHbGpaU2d4S1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnWTI5dWRHVnVkRHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdYRzRnSUdselFYSnlZWGs2SUdselFYSnlZWGtzWEc0Z0lHbHpRWEp5WVhsQ2RXWm1aWEk2SUdselFYSnlZWGxDZFdabVpYSXNYRzRnSUdselFuVm1abVZ5T2lCcGMwSjFabVpsY2l4Y2JpQWdhWE5HYjNKdFJHRjBZVG9nYVhOR2IzSnRSR0YwWVN4Y2JpQWdhWE5CY25KaGVVSjFabVpsY2xacFpYYzZJR2x6UVhKeVlYbENkV1ptWlhKV2FXVjNMRnh1SUNCcGMxTjBjbWx1WnpvZ2FYTlRkSEpwYm1jc1hHNGdJR2x6VG5WdFltVnlPaUJwYzA1MWJXSmxjaXhjYmlBZ2FYTlBZbXBsWTNRNklHbHpUMkpxWldOMExGeHVJQ0JwYzFCc1lXbHVUMkpxWldOME9pQnBjMUJzWVdsdVQySnFaV04wTEZ4dUlDQnBjMVZ1WkdWbWFXNWxaRG9nYVhOVmJtUmxabWx1WldRc1hHNGdJR2x6UkdGMFpUb2dhWE5FWVhSbExGeHVJQ0JwYzBacGJHVTZJR2x6Um1sc1pTeGNiaUFnYVhOQ2JHOWlPaUJwYzBKc2IySXNYRzRnSUdselJuVnVZM1JwYjI0NklHbHpSblZ1WTNScGIyNHNYRzRnSUdselUzUnlaV0Z0T2lCcGMxTjBjbVZoYlN4Y2JpQWdhWE5WVWt4VFpXRnlZMmhRWVhKaGJYTTZJR2x6VlZKTVUyVmhjbU5vVUdGeVlXMXpMRnh1SUNCcGMxTjBZVzVrWVhKa1FuSnZkM05sY2tWdWRqb2dhWE5UZEdGdVpHRnlaRUp5YjNkelpYSkZibllzWEc0Z0lHWnZja1ZoWTJnNklHWnZja1ZoWTJnc1hHNGdJRzFsY21kbE9pQnRaWEpuWlN4Y2JpQWdaWGgwWlc1a09pQmxlSFJsYm1Rc1hHNGdJSFJ5YVcwNklIUnlhVzBzWEc0Z0lITjBjbWx3UWs5Tk9pQnpkSEpwY0VKUFRWeHVmVHRjYmlJc0lpOHZJSE5vYVcwZ1ptOXlJSFZ6YVc1bklIQnliMk5sYzNNZ2FXNGdZbkp2ZDNObGNseHVkbUZ5SUhCeWIyTmxjM01nUFNCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUh0OU8xeHVYRzR2THlCallXTm9aV1FnWm5KdmJTQjNhR0YwWlhabGNpQm5iRzlpWVd3Z2FYTWdjSEpsYzJWdWRDQnpieUIwYUdGMElIUmxjM1FnY25WdWJtVnljeUIwYUdGMElITjBkV0lnYVhSY2JpOHZJR1J2YmlkMElHSnlaV0ZySUhSb2FXNW5jeTRnSUVKMWRDQjNaU0J1WldWa0lIUnZJSGR5WVhBZ2FYUWdhVzRnWVNCMGNua2dZMkYwWTJnZ2FXNGdZMkZ6WlNCcGRDQnBjMXh1THk4Z2QzSmhjSEJsWkNCcGJpQnpkSEpwWTNRZ2JXOWtaU0JqYjJSbElIZG9hV05vSUdSdlpYTnVKM1FnWkdWbWFXNWxJR0Z1ZVNCbmJHOWlZV3h6TGlBZ1NYUW5jeUJwYm5OcFpHVWdZVnh1THk4Z1puVnVZM1JwYjI0Z1ltVmpZWFZ6WlNCMGNua3ZZMkYwWTJobGN5QmtaVzl3ZEdsdGFYcGxJR2x1SUdObGNuUmhhVzRnWlc1bmFXNWxjeTVjYmx4dWRtRnlJR05oWTJobFpGTmxkRlJwYldWdmRYUTdYRzUyWVhJZ1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWME8xeHVYRzVtZFc1amRHbHZiaUJrWldaaGRXeDBVMlYwVkdsdGIzVjBLQ2tnZTF4dUlDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25jMlYwVkdsdFpXOTFkQ0JvWVhNZ2JtOTBJR0psWlc0Z1pHVm1hVzVsWkNjcE8xeHVmVnh1Wm5WdVkzUnBiMjRnWkdWbVlYVnNkRU5zWldGeVZHbHRaVzkxZENBb0tTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkamJHVmhjbFJwYldWdmRYUWdhR0Z6SUc1dmRDQmlaV1Z1SUdSbFptbHVaV1FuS1R0Y2JuMWNiaWhtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJ6WlhSVWFXMWxiM1YwSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpZV05vWldSVFpYUlVhVzFsYjNWMElEMGdjMlYwVkdsdFpXOTFkRHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhZMmhsWkZObGRGUnBiV1Z2ZFhRZ1BTQmtaV1poZFd4MFUyVjBWR2x0YjNWME8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lDQWdJQ0JqWVdOb1pXUlRaWFJVYVcxbGIzVjBJRDBnWkdWbVlYVnNkRk5sZEZScGJXOTFkRHRjYmlBZ0lDQjlYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCamJHVmhjbFJwYldWdmRYUWdQVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZENBOUlHTnNaV0Z5VkdsdFpXOTFkRHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDQTlJR1JsWm1GMWJIUkRiR1ZoY2xScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN1hHNGdJQ0FnSUNBZ0lHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDQTlJR1JsWm1GMWJIUkRiR1ZoY2xScGJXVnZkWFE3WEc0Z0lDQWdmVnh1ZlNBb0tTbGNibVoxYm1OMGFXOXVJSEoxYmxScGJXVnZkWFFvWm5WdUtTQjdYRzRnSUNBZ2FXWWdLR05oWTJobFpGTmxkRlJwYldWdmRYUWdQVDA5SUhObGRGUnBiV1Z2ZFhRcElIdGNiaUFnSUNBZ0lDQWdMeTl1YjNKdFlXd2daVzUyYVhKdmJXVnVkSE1nYVc0Z2MyRnVaU0J6YVhSMVlYUnBiMjV6WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ6WlhSVWFXMWxiM1YwS0daMWJpd2dNQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lDOHZJR2xtSUhObGRGUnBiV1Z2ZFhRZ2QyRnpiaWQwSUdGMllXbHNZV0pzWlNCaWRYUWdkMkZ6SUd4aGRIUmxjaUJrWldacGJtVmtYRzRnSUNBZ2FXWWdLQ2hqWVdOb1pXUlRaWFJVYVcxbGIzVjBJRDA5UFNCa1pXWmhkV3gwVTJWMFZHbHRiM1YwSUh4OElDRmpZV05vWldSVFpYUlVhVzFsYjNWMEtTQW1KaUJ6WlhSVWFXMWxiM1YwS1NCN1hHNGdJQ0FnSUNBZ0lHTmhZMmhsWkZObGRGUnBiV1Z2ZFhRZ1BTQnpaWFJVYVcxbGIzVjBPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdjMlYwVkdsdFpXOTFkQ2htZFc0c0lEQXBPMXh1SUNBZ0lIMWNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0F2THlCM2FHVnVJSGRvWlc0Z2MyOXRaV0p2WkhrZ2FHRnpJSE5qY21WM1pXUWdkMmwwYUNCelpYUlVhVzFsYjNWMElHSjFkQ0J1YnlCSkxrVXVJRzFoWkdSdVpYTnpYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmpZV05vWldSVFpYUlVhVzFsYjNWMEtHWjFiaXdnTUNrN1hHNGdJQ0FnZlNCallYUmphQ2hsS1h0Y2JpQWdJQ0FnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRmRvWlc0Z2QyVWdZWEpsSUdsdUlFa3VSUzRnWW5WMElIUm9aU0J6WTNKcGNIUWdhR0Z6SUdKbFpXNGdaWFpoYkdWa0lITnZJRWt1UlM0Z1pHOWxjMjRuZENCMGNuVnpkQ0IwYUdVZ1oyeHZZbUZzSUc5aWFtVmpkQ0IzYUdWdUlHTmhiR3hsWkNCdWIzSnRZV3hzZVZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTmhZMmhsWkZObGRGUnBiV1Z2ZFhRdVkyRnNiQ2h1ZFd4c0xDQm1kVzRzSURBcE8xeHVJQ0FnSUNBZ0lDQjlJR05oZEdOb0tHVXBlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdjMkZ0WlNCaGN5QmhZbTkyWlNCaWRYUWdkMmhsYmlCcGRDZHpJR0VnZG1WeWMybHZiaUJ2WmlCSkxrVXVJSFJvWVhRZ2JYVnpkQ0JvWVhabElIUm9aU0JuYkc5aVlXd2diMkpxWldOMElHWnZjaUFuZEdocGN5Y3NJR2h2Y0daMWJHeDVJRzkxY2lCamIyNTBaWGgwSUdOdmNuSmxZM1FnYjNSb1pYSjNhWE5sSUdsMElIZHBiR3dnZEdoeWIzY2dZU0JuYkc5aVlXd2daWEp5YjNKY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmpZV05vWldSVFpYUlVhVzFsYjNWMExtTmhiR3dvZEdocGN5d2dablZ1TENBd0tUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1WEc1OVhHNW1kVzVqZEdsdmJpQnlkVzVEYkdWaGNsUnBiV1Z2ZFhRb2JXRnlhMlZ5S1NCN1hHNGdJQ0FnYVdZZ0tHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDQTlQVDBnWTJ4bFlYSlVhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJQzh2Ym05eWJXRnNJR1Z1ZG1seWIyMWxiblJ6SUdsdUlITmhibVVnYzJsMGRXRjBhVzl1YzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWTJ4bFlYSlVhVzFsYjNWMEtHMWhjbXRsY2lrN1hHNGdJQ0FnZlZ4dUlDQWdJQzh2SUdsbUlHTnNaV0Z5VkdsdFpXOTFkQ0IzWVhOdUozUWdZWFpoYVd4aFlteGxJR0oxZENCM1lYTWdiR0YwZEdWeUlHUmxabWx1WldSY2JpQWdJQ0JwWmlBb0tHTmhZMmhsWkVOc1pXRnlWR2x0Wlc5MWRDQTlQVDBnWkdWbVlYVnNkRU5zWldGeVZHbHRaVzkxZENCOGZDQWhZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBLU0FtSmlCamJHVmhjbFJwYldWdmRYUXBJSHRjYmlBZ0lDQWdJQ0FnWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwSUQwZ1kyeGxZWEpVYVcxbGIzVjBPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdZMnhsWVhKVWFXMWxiM1YwS0cxaGNtdGxjaWs3WEc0Z0lDQWdmVnh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUM4dklIZG9aVzRnZDJobGJpQnpiMjFsWW05a2VTQm9ZWE1nYzJOeVpYZGxaQ0IzYVhSb0lITmxkRlJwYldWdmRYUWdZblYwSUc1dklFa3VSUzRnYldGa1pHNWxjM05jYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpFTnNaV0Z5VkdsdFpXOTFkQ2h0WVhKclpYSXBPMXh1SUNBZ0lIMGdZMkYwWTJnZ0tHVXBlMXh1SUNBZ0lDQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1YyaGxiaUIzWlNCaGNtVWdhVzRnU1M1RkxpQmlkWFFnZEdobElITmpjbWx3ZENCb1lYTWdZbVZsYmlCbGRtRnNaV1FnYzI4Z1NTNUZMaUJrYjJWemJpZDBJQ0IwY25WemRDQjBhR1VnWjJ4dlltRnNJRzlpYW1WamRDQjNhR1Z1SUdOaGJHeGxaQ0J1YjNKdFlXeHNlVnh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdOaFkyaGxaRU5zWldGeVZHbHRaVzkxZEM1allXeHNLRzUxYkd3c0lHMWhjbXRsY2lrN1hHNGdJQ0FnSUNBZ0lIMGdZMkYwWTJnZ0tHVXBlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdjMkZ0WlNCaGN5QmhZbTkyWlNCaWRYUWdkMmhsYmlCcGRDZHpJR0VnZG1WeWMybHZiaUJ2WmlCSkxrVXVJSFJvWVhRZ2JYVnpkQ0JvWVhabElIUm9aU0JuYkc5aVlXd2diMkpxWldOMElHWnZjaUFuZEdocGN5Y3NJR2h2Y0daMWJHeDVJRzkxY2lCamIyNTBaWGgwSUdOdmNuSmxZM1FnYjNSb1pYSjNhWE5sSUdsMElIZHBiR3dnZEdoeWIzY2dZU0JuYkc5aVlXd2daWEp5YjNJdVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCVGIyMWxJSFpsY25OcGIyNXpJRzltSUVrdVJTNGdhR0YyWlNCa2FXWm1aWEpsYm5RZ2NuVnNaWE1nWm05eUlHTnNaV0Z5VkdsdFpXOTFkQ0IyY3lCelpYUlVhVzFsYjNWMFhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBMbU5oYkd3b2RHaHBjeXdnYldGeWEyVnlLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dVhHNWNibjFjYm5aaGNpQnhkV1YxWlNBOUlGdGRPMXh1ZG1GeUlHUnlZV2x1YVc1bklEMGdabUZzYzJVN1hHNTJZWElnWTNWeWNtVnVkRkYxWlhWbE8xeHVkbUZ5SUhGMVpYVmxTVzVrWlhnZ1BTQXRNVHRjYmx4dVpuVnVZM1JwYjI0Z1kyeGxZVzVWY0U1bGVIUlVhV05yS0NrZ2UxeHVJQ0FnSUdsbUlDZ2haSEpoYVc1cGJtY2dmSHdnSVdOMWNuSmxiblJSZFdWMVpTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVJQ0FnSUdSeVlXbHVhVzVuSUQwZ1ptRnNjMlU3WEc0Z0lDQWdhV1lnS0dOMWNuSmxiblJSZFdWMVpTNXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdjWFZsZFdVZ1BTQmpkWEp5Wlc1MFVYVmxkV1V1WTI5dVkyRjBLSEYxWlhWbEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCeGRXVjFaVWx1WkdWNElEMGdMVEU3WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2h4ZFdWMVpTNXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdaSEpoYVc1UmRXVjFaU2dwTzF4dUlDQWdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdaSEpoYVc1UmRXVjFaU2dwSUh0Y2JpQWdJQ0JwWmlBb1pISmhhVzVwYm1jcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVJQ0FnSUgxY2JpQWdJQ0IyWVhJZ2RHbHRaVzkxZENBOUlISjFibFJwYldWdmRYUW9ZMnhsWVc1VmNFNWxlSFJVYVdOcktUdGNiaUFnSUNCa2NtRnBibWx1WnlBOUlIUnlkV1U3WEc1Y2JpQWdJQ0IyWVhJZ2JHVnVJRDBnY1hWbGRXVXViR1Z1WjNSb08xeHVJQ0FnSUhkb2FXeGxLR3hsYmlrZ2UxeHVJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFVYVmxkV1VnUFNCeGRXVjFaVHRjYmlBZ0lDQWdJQ0FnY1hWbGRXVWdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2QyaHBiR1VnS0NzcmNYVmxkV1ZKYm1SbGVDQThJR3hsYmlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHTjFjbkpsYm5SUmRXVjFaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOMWNuSmxiblJSZFdWMVpWdHhkV1YxWlVsdVpHVjRYUzV5ZFc0b0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQnhkV1YxWlVsdVpHVjRJRDBnTFRFN1hHNGdJQ0FnSUNBZ0lHeGxiaUE5SUhGMVpYVmxMbXhsYm1kMGFEdGNiaUFnSUNCOVhHNGdJQ0FnWTNWeWNtVnVkRkYxWlhWbElEMGdiblZzYkR0Y2JpQWdJQ0JrY21GcGJtbHVaeUE5SUdaaGJITmxPMXh1SUNBZ0lISjFia05zWldGeVZHbHRaVzkxZENoMGFXMWxiM1YwS1R0Y2JuMWNibHh1Y0hKdlkyVnpjeTV1WlhoMFZHbGpheUE5SUdaMWJtTjBhVzl1SUNobWRXNHBJSHRjYmlBZ0lDQjJZWElnWVhKbmN5QTlJRzVsZHlCQmNuSmhlU2hoY21kMWJXVnVkSE11YkdWdVozUm9JQzBnTVNrN1hHNGdJQ0FnYVdZZ0tHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXhLU0I3WEc0Z0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXhPeUJwSUR3Z1lYSm5kVzFsYm5SekxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmhjbWR6VzJrZ0xTQXhYU0E5SUdGeVozVnRaVzUwYzF0cFhUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCeGRXVjFaUzV3ZFhOb0tHNWxkeUJKZEdWdEtHWjFiaXdnWVhKbmN5a3BPMXh1SUNBZ0lHbG1JQ2h4ZFdWMVpTNXNaVzVuZEdnZ1BUMDlJREVnSmlZZ0lXUnlZV2x1YVc1bktTQjdYRzRnSUNBZ0lDQWdJSEoxYmxScGJXVnZkWFFvWkhKaGFXNVJkV1YxWlNrN1hHNGdJQ0FnZlZ4dWZUdGNibHh1THk4Z2RqZ2diR2xyWlhNZ2NISmxaR2xqZEdsaWJHVWdiMkpxWldOMGMxeHVablZ1WTNScGIyNGdTWFJsYlNobWRXNHNJR0Z5Y21GNUtTQjdYRzRnSUNBZ2RHaHBjeTVtZFc0Z1BTQm1kVzQ3WEc0Z0lDQWdkR2hwY3k1aGNuSmhlU0E5SUdGeWNtRjVPMXh1ZlZ4dVNYUmxiUzV3Y205MGIzUjVjR1V1Y25WdUlEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJSFJvYVhNdVpuVnVMbUZ3Y0d4NUtHNTFiR3dzSUhSb2FYTXVZWEp5WVhrcE8xeHVmVHRjYm5CeWIyTmxjM011ZEdsMGJHVWdQU0FuWW5KdmQzTmxjaWM3WEc1d2NtOWpaWE56TG1KeWIzZHpaWElnUFNCMGNuVmxPMXh1Y0hKdlkyVnpjeTVsYm5ZZ1BTQjdmVHRjYm5CeWIyTmxjM011WVhKbmRpQTlJRnRkTzF4dWNISnZZMlZ6Y3k1MlpYSnphVzl1SUQwZ0p5YzdJQzh2SUdWdGNIUjVJSE4wY21sdVp5QjBieUJoZG05cFpDQnlaV2RsZUhBZ2FYTnpkV1Z6WEc1d2NtOWpaWE56TG5abGNuTnBiMjV6SUQwZ2UzMDdYRzVjYm1aMWJtTjBhVzl1SUc1dmIzQW9LU0I3ZlZ4dVhHNXdjbTlqWlhOekxtOXVJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVZV1JrVEdsemRHVnVaWElnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTV2Ym1ObElEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWIyWm1JRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjbVZ0YjNabFRHbHpkR1Z1WlhJZ1BTQnViMjl3TzF4dWNISnZZMlZ6Y3k1eVpXMXZkbVZCYkd4TWFYTjBaVzVsY25NZ1BTQnViMjl3TzF4dWNISnZZMlZ6Y3k1bGJXbDBJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjSEpsY0dWdVpFeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWNISmxjR1Z1WkU5dVkyVk1hWE4wWlc1bGNpQTlJRzV2YjNBN1hHNWNibkJ5YjJObGMzTXViR2x6ZEdWdVpYSnpJRDBnWm5WdVkzUnBiMjRnS0c1aGJXVXBJSHNnY21WMGRYSnVJRnRkSUgxY2JseHVjSEp2WTJWemN5NWlhVzVrYVc1bklEMGdablZ1WTNScGIyNGdLRzVoYldVcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNCeWIyTmxjM011WW1sdVpHbHVaeUJwY3lCdWIzUWdjM1Z3Y0c5eWRHVmtKeWs3WEc1OU8xeHVYRzV3Y205alpYTnpMbU4zWkNBOUlHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJQ2N2SnlCOU8xeHVjSEp2WTJWemN5NWphR1JwY2lBOUlHWjFibU4wYVc5dUlDaGthWElwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM0J5YjJObGMzTXVZMmhrYVhJZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNjcE8xeHVmVHRjYm5CeWIyTmxjM011ZFcxaGMyc2dQU0JtZFc1amRHbHZiaWdwSUhzZ2NtVjBkWEp1SURBN0lIMDdYRzRpTENKcGJYQnZjblFnZXlCRGIyMXdiMjVsYm5RZ2ZTQm1jbTl0SUNjdUwyMXZaR1ZzY3k5RGIyMXdiMjVsYm5Rbk8xeHlYRzVwYlhCdmNuUWdleUJ1YjJSbFRHbHpkQ3dnWjJWMFUyVmpkR2x2Ym5Nc0lHZGxkRU5oY21SekxDQm5aWFJOWlc1MVNYUmxiWE1zSUgwZ1puSnZiU0FuTGk5MmFXVjNjeTlFVDAxRmJHVnRaVzUwY3ljN1hISmNibWx0Y0c5eWRDQjdJR2RsZEZOclpXeGxkRzl1TENCeVpXNWtaWElnZlNCbWNtOXRJQ2N1TDNacFpYZHpMM05yWld4bGRHOXVKenRjY2x4dWFXMXdiM0owSUhObGNuWnBZMlVnWm5KdmJTQW5MaTl6WlhKMmFXTmxjeTl5WlhOdmRYSmpaWE1uTzF4eVhHNXBiWEJ2Y25RZ2V5Qm9ZVzVrYkdWUGRtVnliR0Y1TENCb1lXNWtiR1ZOWlc1MUlDd2dhR2xrWlUxbGJuVjlJR1p5YjIwZ0p5NHZkbWxsZDNNdmFHRnVaR3hsVFdWdWRTYzdYSEpjYm1sdGNHOXlkQ0I3SUhOamNtOXNiRWhoYm1Sc1pYSWdmU0JtY205dElDY3VMM1pwWlhkekwzTmpjbTlzYkZSdkp6dGNjbHh1YVcxd2IzSjBJSHNnY21WemFYcGxJSDBnWm5KdmJTQW5MaTkyYVdWM2N5OXlaWE5wZW1Vbk8xeHlYRzVjY2x4dVkyOXVjM1FnWVhCd0lEMGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2NseHVJQ0F2TDF4eVhHNGdJQzh2SUZaaGNtbGhZbXhsYzF4eVhHNGdJQzh2WEhKY2JpQWdiR1YwSUhObGRIUnBibWR6TzF4eVhHNGdJRnh5WEc0Z0lHTnZibk4wSUhSb1lYUWdQU0I3ZlR0Y2NseHVJQ0JqYjI1emRDQmtaV1poZFd4MGN5QTlJSHRjY2x4dUlDQWdJSE5sYkdWamRHOXljem9nZTF4eVhHNGdJQ0FnSUNCdFpXNTFTWFJsYlhOSGNtOTFjRG9nSnlOc1pXWjBYMjFsYm5WZmFYUmxiWE1uTEZ4eVhHNGdJQ0FnSUNCelpXTjBhVzl1YzBkeWIzVndPaUFuSTNObFkzUnBiMjVmWjNKdmRYQnpKeXhjY2x4dUlDQWdJSDBzWEhKY2JpQWdJQ0JqYkdGemMyVnpPaUI3WEhKY2JpQWdJQ0FnSUdWdWRHVnlSRzl1WlRvZ0oyeGxablJmYldWdWRWOXZkbVZ5YkdGNUlHeGxablJmYldWdWRWOXZkbVZ5YkdGNUxXVnVkR1Z5TFdSdmJtVW5MRnh5WEc0Z0lDQWdJQ0JsZUdsMFJHOXVaVG9nSjJ4bFpuUmZiV1Z1ZFY5dmRtVnliR0Y1SUd4bFpuUmZiV1Z1ZFY5dmRtVnliR0Y1TFdWNGFYUXRaRzl1WlNjc1hISmNiaUFnSUNBZ0lHeGxablJOWlc1MVUyaHZkem9nSjJ4bFpuUmZiV1Z1ZFY5emFHOTNKeXhjY2x4dUlDQWdJQ0FnYkdWbWRFMWxiblZJYVdSa1pXNDZJQ2RzWldaMFgyMWxiblZmYUdsa1pHVnVKMXh5WEc0Z0lDQWdmU3hjY2x4dUlDQWdJSEpsYzI5MWNtTmxjem9nVzEwc1hISmNiaUFnSUNCallXeHNZbUZqYXpvZ1puVnVZM1JwYjI0Z0tHTnZiblJsYm5RcElIdGNjbHh1SUNBZ0lDQWdjbVYwZFhKdUlHTnZiblJsYm5RN1hISmNiaUFnSUNCOUxGeHlYRzRnSUgwN1hISmNibHh5WEc0Z0lDOHZYSEpjYmlBZ0x5OGdUV1YwYUc5a2MxeHlYRzRnSUM4dlhISmNiaUFnWEhKY2JpQWdZMjl1YzNRZ2RXNXBjWFZsUVhKeVlYa2dQU0JtZFc1amRHbHZiaUFvWVhKeUtTQjdYSEpjYmlBZ0lDQnlaWFIxY200Z1lYSnlMbVpwYkhSbGNpZ29kbUZzZFdVc0lHbHVaR1Y0TENCelpXeG1LU0E5UGlCelpXeG1MbWx1WkdWNFQyWW9kbUZzZFdVcElEMDlQU0JwYm1SbGVDazdYSEpjYmlBZ2ZUdGNjbHh1WEhKY2JpQWdZMjl1YzNRZ2RXNXBjWFZsVW1WemIzVnlZMlZ6SUQwZ1puVnVZM1JwYjI0Z0tHTmhkR1ZuYjNKNUtTQjdYSEpjYmlBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tISmxjMjkxY21ObGN5a2dlMXh5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjbVZ6YjNWeVkyVnpMbVpwYkhSbGNpaGNjbHh1SUNBZ0lDQWdJQ0FvY21WemIzVnlZMlVwSUQwK0lISmxjMjkxY21ObExtTmhkR1ZuYjNKNUxuUnlhVzBvS1NBOVBUMGdZMkYwWldkdmNubGNjbHh1SUNBZ0lDQWdLVHRjY2x4dUlDQWdJSDA3WEhKY2JpQWdmVHRjY2x4dVhISmNiaUFnTHlvcVhISmNiaUFnSUNvZ1hISmNiaUFnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhObGJHVmpkRzl5SUZSb1pTQnpaV3hsWTNSdmNpQm1iM0lnZEdobElHTnZiblJsYm5RZ2NHRnlaVzUwSUdWc1pXMWxiblJjY2x4dUlDQWdLaUJBY0dGeVlXMGdlMEZ5Y21GNWZTQnlaWE52ZFhKalpYTWdWR2hsSUdSaGRHRWdabTl5SUhSb1pTQmpiMjUwWlc1MElHbDBaVzF6WEhKY2JpQWdJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnZEdWdGNHeGhkR1VnVkdobElHWjFibU4wYVc5dUlISmxibVJsY2lCVlNWeHlYRzRnSUNBcUwxeHlYRzRnSUdOdmJuTjBJSEpsYm1SbGNrTnZiblJsYm5RZ1BTQm1kVzVqZEdsdmJpaHpaV3hsWTNSdmNpd2djbVZ6YjNWeVkyVnpMQ0IwWlcxd2JHRjBaU2tnZTF4eVhHNGdJQ0FnY21WMGRYSnVJRzVsZHlCRGIyMXdiMjVsYm5Rb2MyVnNaV04wYjNJc0lIdGNjbHh1SUNBZ0lDQWdjbVZ6YjNWeVkyVnpPaUJ5WlhOdmRYSmpaWE1zWEhKY2JpQWdJQ0FnSUhSbGJYQnNZWFJsT2lCMFpXMXdiR0YwWlN4Y2NseHVJQ0FnSUgwcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ1kyOXVjM1FnWkdWemRHOXllU0E5SUdaMWJtTjBhVzl1S0NrZ2UxeHlYRzRnSUNBZ0x5OGdUV0ZyWlNCemRYSmxJSFJvWlNCd2JIVm5hVzRnYUdGeklHSmxaVzRnYVc1cGRHbGhiR2w2WldSY2NseHVJQ0FnSUdsbUlDZ2hjMlYwZEdsdVozTXBJSEpsZEhWeWJqdGNjbHh1WEhKY2JpQWdJQ0F2THlCU1pXMXZkbVVnZEdobElIUmhZbXhsSUc5bUlHTnZiblJsYm5SelhISmNiaUFnSUNCelpYUjBhVzVuY3k1dWIyUmxUR2x6ZEM1c1pXWjBUV1Z1ZFVsMFpXMXpMbWx1Ym1WeVNGUk5UQ0E5SUNjbk8xeHlYRzRnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdWMyVmpkR2x2Ym5OSmRHVnRjeTVwYm01bGNraFVUVXdnUFNBbkp6dGNjbHh1WEhKY2JpQWdJQ0F2THlCU1pYTmxkQ0IyWVhKcFlXSnNaWE5jY2x4dUlDQWdJSE5sZEhScGJtZHpJRDBnYm5Wc2JEdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHTnZibk4wSUdsdWFYUWdQU0JtZFc1amRHbHZiaUFvYjNCMGFXOXVjeWtnZTF4eVhHNGdJQ0FnTHk4Z1JHVnpkRzl5ZVNCMGFHVWdZM1Z5Y21WdWRDQnBibWwwYVdGc2FYcGhkR2x2Ymx4eVhHNGdJQ0FnWkdWemRHOXllU2dwTzF4eVhHNWNjbHh1SUNBZ0lHOXdkR2x2Ym5NZ1BTQnZjSFJwYjI1eklIeDhJSHQ5TzF4eVhHNWNjbHh1SUNBZ0lDOHZJRTFsY21kbElHSnZkR2dnZFhObGNpQmtaV1poZFd4MGN5QmhibVFnYjNCMGFXOXVjeTVjY2x4dUlDQWdJSE5sZEhScGJtZHpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnWkdWbVlYVnNkSE1zSUc5d2RHbHZibk1wTzF4eVhHNWNjbHh1SUNBZ0lDOHZJRWRsZENCaGJHd2dZMkYwWldkdmNtbGxjeUJ2WmlCMGFHVWdjbVZ6YjNWeVkyVnpYSEpjYmlBZ0lDQmpiMjV6ZENCallYUmxaMjl5YVdWeklEMGdkVzVwY1hWbFFYSnlZWGtvWEhKY2JpQWdJQ0FnSUhObGRIUnBibWR6TG5KbGMyOTFjbU5sY3k1dFlYQW9LSEpsYzI5MWNtTmxLU0E5UGlCeVpYTnZkWEpqWlM1allYUmxaMjl5ZVNsY2NseHVJQ0FnSUNrN1hISmNibHh5WEc0Z0lDQWdMeThnUjJWMElHRnNiQ0JwZEdWdGN5QnZaaUJzWldaMElHMWxiblVnYVhSbGJYTWdkR2hsYmlCaGNIQmxibVFnYVhRZ2RHOGdaRzlqZFcxbGJuUmNjbHh1SUNBZ0lISmxibVJsY2tOdmJuUmxiblFvYzJWMGRHbHVaM011YzJWc1pXTjBiM0p6TG0xbGJuVkpkR1Z0YzBkeWIzVndMQ0JqWVhSbFoyOXlhV1Z6TENCblpYUk5aVzUxU1hSbGJYTXBMbkpsYm1SbGNpZ3BPMXh5WEc1Y2NseHVJQ0FnSUM4dklFZGxkQ0JoYkd3Z2MyVmpkR2x2Ym5NZ2IyWWdiV0ZwYmlCamIyNTBaVzUwWEhKY2JpQWdJQ0J5Wlc1a1pYSkRiMjUwWlc1MEtITmxkSFJwYm1kekxuTmxiR1ZqZEc5eWN5NXpaV04wYVc5dWMwZHliM1Z3TENCallYUmxaMjl5YVdWekxDQm5aWFJUWldOMGFXOXVjeWt1Y21WdVpHVnlLQ2s3WEhKY2JseHlYRzRnSUNBZ0x5OGdVbVZ1WkdWeUlIUm9aU0JwZEdWdGN5QnBiblJ2SUdFZ2RXNXBjWFZsSUhObFkzUnBiMjRnYVdSY2NseHVJQ0FnSUdOaGRHVm5iM0pwWlhNdVptOXlSV0ZqYUNnb1kyRjBaV2R2Y25rcElEMCtJSHRjY2x4dUlDQWdJQ0FnWTI5dWMzUWdjMlZzWldOMGIzSWdQU0JnSXlSN1kyRjBaV2R2Y25sOUlDNW5jbTkxY0Y5cGRHVnRjMkE3WEhKY2JseHlYRzRnSUNBZ0lDQXZMeUJIWlhRZ2NtVnpiM1Z5WTJWeklHOW1JSFJvWlNCellXMWxJR05oZEdWbmIzSjVYSEpjYmlBZ0lDQWdJQzh2SUVadmNpQmxlR0Z0Y0d4bE9pQklWRTFNNDRDQlNtRjJZWE5qY21sd2RPT0FnVlJ2YjJ4ejQ0Q0JjRzlrWTJGemRGeHlYRzRnSUNBZ0lDQmpiMjV6ZENCeVpYTnZkWEpqWlhNZ1BTQjFibWx4ZFdWU1pYTnZkWEpqWlhNb1kyRjBaV2R2Y25rcEtITmxkSFJwYm1kekxuSmxjMjkxY21ObGN5azdYSEpjYmlBZ0lDQWdJSEpsYm1SbGNrTnZiblJsYm5Rb2MyVnNaV04wYjNJc0lISmxjMjkxY21ObGN5d2daMlYwUTJGeVpITXBMbkpsYm1SbGNpZ3BPMXh5WEc0Z0lDQWdmU2s3WEhKY2JseHlYRzRnSUNBZ0x5OGdVMk55YjJ4c0lIUnZJSFJvWlNCemNHVmphV1pwWldRZ1kyRjBaV2R2Y25rZ1lua2dZMnhwWTJ0cGJtY2dkR2hsSUcxbGJuVmNjbHh1SUNBZ0lHTnZibk4wSUhOamNtOXNiRlJ2SUQwZ0tHWjFibU4wYVc5dUlDaHZabVp6WlhRcElIdGNjbHh1SUNBZ0lDQWdZMjl1YzNRZ2FYUmxiWE1nUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlRV3hzS0NjdWJHVm1kRjl0Wlc1MVgybDBaVzBuS1Z4eVhHNGdJQ0FnSUNCamIyNXpkQ0JzYVc1cmN5QTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29KeTVzWldaMFgyMWxiblZmYVhSbGJTQmhKeWs3WEhKY2JseHlYRzRnSUNBZ0lDQm1iM0lnS0d4bGRDQnNhVzVySUc5bUlHeHBibXR6S1NCN1hISmNibHh5WEc0Z0lDQWdJQ0FnSUd4cGJtc3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQnpZM0p2Ykd4SVlXNWtiR1Z5S0c5bVpuTmxkQ2twTzF4eVhHNGdJQ0FnSUNBZ0lHeHBibXN1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0JtZFc1amRHbHZiaWdwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJRnN1TGk1cGRHVnRjMTB1Wm05eVJXRmphQ2hwZEdWdElEMCtJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dsMFpXMHVZMnhoYzNOTWFYTjBMbU52Ym5SaGFXNXpLQ2RqZFhKeVpXNTBKeWtwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCcGRHVnRMbU5zWVhOelRHbHpkQzV5WlcxdmRtVW9KMk4xY25KbGJuUW5LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUNBZ2ZTazdYSEpjYmlBZ0lDQWdJQ0FnSUNCY2NseHVJQ0FnSUNBZ0lDQWdJR3hwYm1zdWNHRnlaVzUwUld4bGJXVnVkQzVqYkdGemMweHBjM1F1WVdSa0tDZGpkWEp5Wlc1MEp5azdYSEpjYmlBZ0lDQWdJQ0FnZlNsY2NseHVJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ2ZTa29OellwTzF4eVhHNWNjbHh1WEhKY2JpQWdJQ0F2THlCVGFHOTNJRzl5SUdocFpHVWdkR2hsSUd4bFpuUWdiV1Z1ZFNCaWVTQnlaWE5wZW1sdVp5QjBhR1VnYzJsNlpTQnZaaUJrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUXVZMnhwWlc1MFYybGtkR2hjY2x4dUlDQWdJR2hoYm1Sc1pVMWxiblVvYm05a1pVeHBjM1FzSUhObGRIUnBibWR6TG1Oc1lYTnpaWE1wS0NrN1hISmNibHh5WEc0Z0lDQWdMeThnVW1WemFYcGxJSFJvWlNCM2FXUjBhQ0J2WmlCc1pXWjBYMjFsYm5VZ1lXNWtJRzFoYVc1ZlkyOXVkR1Z1ZEZ4eVhHNGdJQ0FnY21WemFYcGxMbWx1YVhScFlXeHBlbVVvZXlCdWIyUmxUR2x6ZERvZ2JtOWtaVXhwYzNRZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnYm05a1pVeHBjM1F1YkdWbWRFTnZiblJ5YjJ4TlpXNTFMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2dhR0Z1Wkd4bFQzWmxjbXhoZVNodWIyUmxUR2x6ZEN3Z2MyVjBkR2x1WjNNdVkyeGhjM05sY3lrcE8xeHlYRzRnSUNBZ2JtOWtaVXhwYzNRdWJHVm1kRTFsYm5WUGRtVnliR0Y1TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJOc2FXTnJKeXdnYUdGdVpHeGxUM1psY214aGVTaHViMlJsVEdsemRDd2djMlYwZEdsdVozTXVZMnhoYzNObGN5a3BPMXh5WEc0Z0lDQWdYSEpjYmlBZ0lDQnViMlJsVEdsemRDNXNaV1owVFdWdWRTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZHRiM1Z6WldSdmQyNG5MQ0JtZFc1amRHbHZiaUFvWlhabGJuUXBJSHRjY2x4dUlDQWdJQ0FnWlhabGJuUXVjSEpsZG1WdWRFUmxabUYxYkhRb0tUdGNjbHh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4eVhHNGdJQ0FnZlNrN1hISmNiaUFnZlR0Y2NseHVYSEpjYmlBZ0x5OGdTR2xrWlNCc1pXWjBJRzFsYm5VZ2JtRjJhV2RoZEdsdmJpQjNhR1Z1SUhWelpYSWdZMnhwWTJzZ1lTQnRaVzUxSUdsdUlHMXZZbWxzWlNCa1pYWnBZMlZ6WEhKY2JpQWdibTlrWlV4cGMzUXViR1ZtZEUxbGJuVkpkR1Z0Y3k1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdaMWJtTjBhVzl1S0NrZ2UxeHlYRzRnSUNBZ2FXWWdLRzV2WkdWTWFYTjBMbWgwYld3dVkyeHBaVzUwVjJsa2RHZ2dQQ0EzTlRBcElIdGNjbHh1SUNBZ0lDQWdhR2xrWlUxbGJuVW9ibTlrWlV4cGMzUXNJSE5sZEhScGJtZHpMbU5zWVhOelpYTXBPMXh5WEc0Z0lDQWdmVnh5WEc0Z0lIMHBPMXh5WEc1Y2NseHVJQ0F2TDF4eVhHNGdJQzh2SUVsdWFYUnpJQ1lnUlhabGJuUnpYSEpjYmlBZ0x5OWNjbHh1WEhKY2JpQWdMeThnVW1WdVpHVnlJSFJvWlNCemEyVnNaWFJ2YmlCelkzSmxaVzRnWW1WbWIzSmxJR2RsZEhScGJtY2dkR2hsSUhKbGMyOTFjbU5sY3lCbWNtOXRJSE5sY25abGNseHlYRzRnSUhKbGJtUmxjaWhrWldaaGRXeDBjeTV6Wld4bFkzUnZjbk11YzJWamRHbHZibk5IY205MWNDd2daMlYwVTJ0bGJHVjBiMjRwTzF4eVhHNWNjbHh1SUNBdkx5QkhaWFFnY21WemIzVnlZMlZ6SUdaeWIyMGdkR2hsSUhObGNuWnBZMlVnYzJsa1pWeHlYRzRnSUhObGNuWnBZMlV1WjJWMFFXeHNLQ2t1ZEdobGJpZ29jbVZ6YjNWeVkyVnpLU0E5UGlCN1hISmNiaUFnSUNCcGJtbDBLSEpsYzI5MWNtTmxjeWs3WEhKY2JpQWdmU2s3WEhKY2JseHlYRzRnSUhSb1lYUXVhVzVwZENBOUlHbHVhWFE3WEhKY2JpQWdkR2hoZEM1a1pYTjBiM0o1SUQwZ1pHVnpkRzl5ZVR0Y2NseHVJQ0JjY2x4dUlDQnlaWFIxY200Z2RHaGhkRHRjY2x4dWZTa29LVHRjY2x4dUlpd2lSblZ1WTNScGIyNHVjSEp2ZEc5MGVYQmxMbTFsZEdodlpDQTlJR1oxYm1OMGFXOXVLRzVoYldVc0lHWjFibU1wSUh0Y2NseHVJQ0JwWmlBb2RHaHBjeTV3Y205MGIzUjVjR1ZiYm1GdFpWMHBJSEpsZEhWeWJqdGNjbHh1SUNCMGFHbHpMbkJ5YjNSdmRIbHdaVnR1WVcxbFhTQTlJR1oxYm1NN1hISmNiaUFnY21WMGRYSnVJSFJvYVhNN1hISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQmpiMjV6ZENCRGIyMXdiMjVsYm5RZ1BTQW9ablZ1WTNScGIyNG9LU0I3WEhKY2JseHlYRzRnSUM4cUtseHlYRzRnSUNBcUlGeHlYRzRnSUNBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCelpXeGxZM1J2Y2lCVWFHVWdjMlZzWldOMGIzSWdabTl5SUhSb1pTQjBZV0pzWlNCdlppQmpiMjUwWlc1MGN5QjBZWEpuWlhSY2NseHVJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjNCMGFXOXVjeUJWYzJWeUlHOXdkR2x2Ym5NZ1hISmNiaUFnSUNvdlhISmNiaUFnZG1GeUlFTnZibk4wY25WamRHOXlJRDBnWm5WdVkzUnBiMjRvYzJWc1pXTjBiM0lzSUc5d2RHbHZibk1wSUh0Y2NseHVJQ0FnSUhSb2FYTXVjMlZzWldOMGIzSWdQU0J6Wld4bFkzUnZjanRjY2x4dUlDQWdJSFJvYVhNdWNtVnpiM1Z5WTJWeklEMGdiM0IwYVc5dWN5NXlaWE52ZFhKalpYTTdYSEpjYmlBZ0lDQjBhR2x6TG5SbGJYQnNZWFJsSUQwZ2IzQjBhVzl1Y3k1MFpXMXdiR0YwWlR0Y2NseHVJQ0I5WEhKY2JseHlYRzRnSUVOdmJuTjBjblZqZEc5eUxtMWxkR2h2WkNnbmNtVnVaR1Z5Snl3Z1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ0lDQmpiMjV6ZENCMFlYSm5aWFFnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLSFJvYVhNdWMyVnNaV04wYjNJcE8xeHlYRzRnSUNBZ2FXWWdLQ0YwWVhKblpYUXBJSEpsZEhWeWJqdGNjbHh1SUNBZ0lIUmhjbWRsZEM1cGJtNWxja2hVVFV3Z1BTQjBhR2x6TG1oaGJtUnNaVlJsYlhCc1lYUmxLSFJvYVhNdWNtVnpiM1Z5WTJWektUdGNjbHh1SUNCOUtWeHlYRzVjY2x4dUlDQkRiMjV6ZEhKMVkzUnZjaTV0WlhSb2IyUW9KMmhoYm1Sc1pWUmxiWEJzWVhSbEp5d2dablZ1WTNScGIyNG9LU0I3WEhKY2JpQWdJQ0JwWmlBb2RHaHBjeTV5WlhOdmRYSmpaWE11YkdWdVozUm9JRHdnTVNrZ2NtVjBkWEp1TzF4eVhHNWNjbHh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbkpsYzI5MWNtTmxjMXh5WEc0Z0lDQWdJQ0F1YldGd0tISmxjMjkxY21ObElEMCtJSFJvYVhNdWRHVnRjR3hoZEdVb2NtVnpiM1Z5WTJVcEtWeHlYRzRnSUNBZ0lDQXVhbTlwYmlnbkp5bGNjbHh1SUNCOUtWeHlYRzVjY2x4dUlDQkRiMjV6ZEhKMVkzUnZjaTV0WlhSb2IyUW9KM05sZEVSaGRHRW5MQ0JtZFc1amRHbHZiaWh2WW1vcElIdGNjbHh1SUNBZ0lHWnZjaUFvYkdWMElHdGxlU0JwYmlCdlltb3BJSHRjY2x4dUlDQWdJQ0FnYVdZZ0tHOWlhaTVvWVhOUGQyNVFjbTl3WlhKMGFXVnpLR3RsZVNrcElIdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuSmxjMjkxY21ObGN5QTlJRzlpYWx0clpYbGRPMXh5WEc0Z0lDQWdJQ0I5WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTV5Wlc1a1pYSW9LVHRjY2x4dUlDQjlLVnh5WEc1Y2NseHVJQ0JEYjI1emRISjFZM1J2Y2k1dFpYUm9iMlFvSjJkbGRFUmhkR0VuTENCbWRXNWpkR2x2YmlncElIdGNjbHh1SUNBZ0lISmxkSFZ5YmlCUFltcGxZM1F1Y0dGeWMyVW9UMkpxWldOMExuTjBjbWx1WjJsbWVTaDBhR2x6TG5KbGMyOTFjbU5sY3lrcE8xeHlYRzRnSUgwcFhISmNibHh5WEc0Z0lISmxkSFZ5YmlCRGIyNXpkSEoxWTNSdmNqdGNjbHh1ZlNrb0tUc2lMQ0pwYlhCdmNuUWdZWGhwYjNNZ1puSnZiU0FuWVhocGIzTW5PMXh5WEc1amIyNXpkQ0JpWVhObFZYSnNJRDBnSnk4dWJtVjBiR2xtZVM5bWRXNWpkR2x2Ym5NdllYQnBMM0psYzI5MWNtTmxjeWM3WEhKY2JseHlYRzVqYjI1emRDQm5aWFJCYkd3Z1BTQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dUlDQmpiMjV6ZENCeVpYRjFaWE4wSUQwZ1lYaHBiM011WjJWMEtHSmhjMlZWY213cE8xeHlYRzRnSUhKbGRIVnliaUJ5WlhGMVpYTjBMblJvWlc0b2NtVnpjRzl1YzJVZ1BUNGdjbVZ6Y0c5dWMyVXVaR0YwWVNrN1hISmNibjFjY2x4dVhISmNibU52Ym5OMElHTnlaV0YwWlNBOUlHWjFibU4wYVc5dUtHNWxkMDlpYW1WamRDa2dlMXh5WEc0Z0lHTnZibk4wSUhKbGNYVmxjM1FnUFNCaGVHbHZjeTV3YjNOMEtHSmhjMlZWY213c0lHNWxkMDlpYW1WamRDazdYSEpjYmlBZ2NtVjBkWEp1SUhKbGNYVmxjM1F1ZEdobGJpaHlaWE53YjI1elpTQTlQaUJ5WlhOd2IyNXpaUzVrWVhSaEtUdGNjbHh1ZlZ4eVhHNWNjbHh1WTI5dWMzUWdkWEJrWVhSbElEMGdablZ1WTNScGIyNG9hV1FzSUc1bGQwOWlhbVZqZENrZ2UxeHlYRzRnSUdOdmJuTjBJSEpsY1hWbGMzUWdQU0JoZUdsdmN5NXdkWFFvWUNSN1ltRnpaVlZ5YkgwdkpIdHBaSDFnTENCdVpYZFBZbXBsWTNRcE8xeHlYRzRnSUhKbGRIVnliaUJ5WlhGMVpYTjBMblJvWlc0b2NtVnpjRzl1YzJVZ1BUNGdjbVZ6Y0c5dWMyVXVaR0YwWVNrN1hISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElIc2daMlYwUVd4c0xDQmpjbVZoZEdVc0lIVndaR0YwWlNCOU8xeHlYRzRpTENKbGVIQnZjblFnWTI5dWMzUWdibTlrWlV4cGMzUWdQU0I3WEhKY2JpQWdiR1ZtZEVOdmJuUnliMnhOWlc1MU9pQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJHVm1kRjlqYjI1MGNtOXNYMjFsYm5VbktTeGNjbHh1SUNCc1pXWjBUV1Z1ZFU5MlpYSnNZWGs2SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVzWldaMFgyMWxiblZmYjNabGNteGhlU2NwTEZ4eVhHNGdJSE5sWTNScGIyNUpkR1Z0Y3pvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduSTNObFkzUnBiMjVmWjNKdmRYQnpKeWtzWEhKY2JpQWdiR1ZtZEUxbGJuVkpkR1Z0Y3pvZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduSTJ4bFpuUmZiV1Z1ZFY5cGRHVnRjeWNwTEZ4eVhHNGdJR2gwYld3NklHUnZZM1Z0Wlc1MExtUnZZM1Z0Wlc1MFJXeGxiV1Z1ZEN4Y2NseHVJQ0JpYjJSNU9pQmtiMk4xYldWdWRDNWliMlI1TEZ4eVhHNGdJR3hsWm5STlpXNTFPaUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViR1ZtZEY5dFpXNTFKeWtzWEhKY2JpQWdjbVZ6YVhwbFNHRnVaR3hsT2lCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1Y21WemFYcGxYMmhoYm1Sc1pTY3BMRnh5WEc0Z0lHMWhhVzVEYjI1MFpXNTBPaUJrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViV0ZwYmw5amIyNTBaVzUwSnlrc1hISmNibjFjY2x4dVhISmNiaUFnTHk4Z1IyVnVaWEpoZEdVZ1lTQnBkR1Z0SUc5bUlIUm9aU0J1WVhacFoyRjBhVzl1WEhKY2JtVjRjRzl5ZENCamIyNXpkQ0JuWlhSTlpXNTFTWFJsYlhNZ1BTQmpZWFJsWjI5eWVTQTlQaUJnWEhKY2JpQWdQR3hwSUdOc1lYTnpQVndpYkdWbWRGOXRaVzUxWDJsMFpXMWNJajVjY2x4dUlDQWdJRHhoSUdoeVpXWTlYQ0lqSkh0allYUmxaMjl5ZVgxY0lqNGdYSEpjYmlBZ0lDQWdJRHhwYldjZ1kyeGhjM005WENKdFpXNTFYMmwwWlcxZmFXTnZibHdpSUhOeVl6MWNJaTR2YzNabkx5UjdZMkYwWldkdmNubDlMbk4yWjF3aUlHRnNkRDFjSWxSb2FYTWdhWE1nWVNBa2UyTmhkR1ZuYjNKNWZTQmpZWFJsWjI5eWVWd2lQand2YVcxblBseHlYRzRnSUNBZ0lDQThjM0JoYmlCamJHRnpjejFjSW0xbGJuVmZhWFJsYlY5amIyNTBaVzUwWENJK0pIdGpZWFJsWjI5eWVYMDhMM053WVc0K1hISmNiaUFnSUNBOEwyRStYSEpjYmlBZ1BDOXNhVDVjY2x4dVlEdGNjbHh1WEhKY2JpQWdMeThnUjJWdVpYSmhkR1VnWVNCelpXTjBhVzl1SUc5bUlIUm9aU0J0WVdsdUlHTnZiblJsYm5SY2NseHVaWGh3YjNKMElHTnZibk4wSUdkbGRGTmxZM1JwYjI1eklEMGdZMkYwWldkdmNua2dQVDRnWUZ4eVhHNGdJRHh6WldOMGFXOXVJR2xrUFZ3aUpIdGpZWFJsWjI5eWVYMWNJaUJqYkdGemN6MWNJbWR5YjNWd1hDSWdQbHh5WEc0Z0lDQWdQR2d5SUdOc1lYTnpQVndpWjNKdmRYQmZkR2wwYkdWY0lqNGtlMk5oZEdWbmIzSjVmVHd2YURJK1hISmNiaUFnSUNBOFpHbDJJR05zWVhOelBWd2laM0p2ZFhCZlkyOXVkR1Z1ZEZ3aVBseHlYRzRnSUNBZ0lDQThkV3dnWTJ4aGMzTTlYQ0p5YjNjZ1ozSnZkWEJmYVhSbGJYTmNJajQ4TDNWc1BseHlYRzRnSUNBZ1BDOWthWFkrWEhKY2JpQWdQQzl6WldOMGFXOXVQaUFnWEhKY2JtQTdYSEpjYmx4eVhHNGdJQzh2SUVkbGJtVnlZWFJsSUdFZ2JHbHpkQ0J2WmlCMGFHVWdjMlZqZEdsdmJpQmNjbHh1Wlhod2IzSjBJR052Ym5OMElHZGxkRU5oY21SeklEMGdjbVZ6YjNWeVkyVWdQVDRnWUZ4eVhHNGdJRHhzYVNCamJHRnpjejFjSW1keWIzVndYMmwwWlcwZ1kyOXNNMXdpUGx4eVhHNGdJQ0FnUEdFZ1kyeGhjM005WENKbmNtOTFjRjlwZEdWdFgyeHBibXRjSWlCb2NtVm1QVndpSkh0eVpYTnZkWEpqWlM1b2NtVm1mVndpUGx4eVhHNGdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2lZMkZ5WkZ3aVBseHlYRzRnSUNBZ0lDQWdJRHhwYldjZ1kyeGhjM005WENKallYSmtYMmxqYjI1Y0lpQnpjbU05WENJa2UzSmxjMjkxY21ObExuTnlZMzFjSWlCaGJIUTlYQ0lrZTNKbGMyOTFjbU5sTG5OeVl5NXlaWEJzWVdObEtDOWNYQzVjWEM5cGJXZGNYQzh2Wnl3Z0p5Y3BmVndpUGx4eVhHNGdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqWVhKa1gySnZaSGxjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJRHhvTXlCamJHRnpjejFjSW1OaGNtUmZkR2wwYkdWY0lqNGtlM0psYzI5MWNtTmxMblJwZEd4bGZUd3ZhRE0rWEhKY2JpQWdJQ0FnSUNBZ0lDQThjQ0JqYkdGemN6MWNJbU5oY21SZmRHVjRkRndpUGlSN2NtVnpiM1Z5WTJVdVkyOXVkR1Z1ZEgwOEwzQStYSEpjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYSEpjYmlBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ1BDOWhQbHh5WEc0Z0lEd3ZiR2srWEhKY2JtQTdJaXdpTHk4Z1VtVndjbVZ6Wlc1MElIUm9aU0JzWldaMElHMWxiblVnYjNCbGJtbHVaeUJ2Y2lCamJHOXphVzVuWEhKY2JpOHZJRlJ5ZFdVZ2JXVmhibk1nYVhRbmN5QnZjR1Z1YVc1blhISmNibXhsZENCcGMwRmpkR2wyWlNBOUlHWmhiSE5sTzF4eVhHNWNjbHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR2hwWkdWTlpXNTFLRzV2WkdWc2FYTjBMQ0JqYkdGemMyVnpLU0I3WEhKY2JpQWdibTlrWld4cGMzUXVhSFJ0YkM1amJHRnpjMDVoYldVZ1BTQmpiR0Z6YzJWekxteGxablJOWlc1MVNHbGtaR1Z1TzF4eVhHNGdJRzV2WkdWc2FYTjBMbXhsWm5STlpXNTFUM1psY214aGVTNWpiR0Z6YzA1aGJXVWdQU0JqYkdGemMyVnpMbVY0YVhSRWIyNWxPMXh5WEc0Z0lHbHpRV04wYVhabElEMGdkSEoxWlR0Y2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHaGhibVJzWlU5MlpYSnNZWGtnS0c1dlpHVnNhWE4wTENCamJHRnpjMlZ6S1NCN1hISmNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2dwSUh0Y2NseHVJQ0FnSUdsbUlDaHBjMEZqZEdsMlpTa2dlMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVvZEcxc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXViR1ZtZEUxbGJuVlRhRzkzTzF4eVhHNGdJQ0FnSUNCdWIyUmxiR2x6ZEM1c1pXWjBUV1Z1ZFU5MlpYSnNZWGt1WTJ4aGMzTk9ZVzFsSUQwZ1kyeGhjM05sY3k1bGJuUmxja1J2Ym1VN1hISmNiaUFnSUNCOUlHVnNjMlVnZTF4eVhHNGdJQ0FnSUNCdWIyUmxiR2x6ZEM1b2RHMXNMbU5zWVhOelRtRnRaU0E5SUdOc1lYTnpaWE11YkdWbWRFMWxiblZJYVdSa1pXNDdYSEpjYmlBZ0lDQWdJRzV2WkdWc2FYTjBMbXhsWm5STlpXNTFUM1psY214aGVTNWpiR0Z6YzA1aGJXVWdQU0JqYkdGemMyVnpMbVY0YVhSRWIyNWxPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUdselFXTjBhWFpsSUQwZ0lXbHpRV04wYVhabE8xeHlYRzRnSUgxY2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHaGhibVJzWlUxbGJuVW9ibTlrWld4cGMzUXNJR05zWVhOelpYTXBJSHRjY2x4dUlDQnlaWFIxY200Z1puVnVZM1JwYjI0b0tTQjdYSEpjYmlBZ0lDQnBaaUFvYm05a1pXeHBjM1F1YUhSdGJDNWpiR2xsYm5SWGFXUjBhQ0E4SURjMU1Da2dlMXh5WEc0Z0lDQWdJQ0JvYVdSbFRXVnVkU2h1YjJSbGJHbHpkQ3dnWTJ4aGMzTmxjeWs3WEhKY2JpQWdJQ0I5SUdWc2MyVWdlMXh5WEc0Z0lDQWdJQ0J1YjJSbGJHbHpkQzVvZEcxc0xtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXViR1ZtZEUxbGJuVlRhRzkzTzF4eVhHNGdJQ0FnSUNCdWIyUmxiR2x6ZEM1c1pXWjBUV1Z1ZFU5MlpYSnNZWGt1WTJ4aGMzTk9ZVzFsSUQwZ1kyeGhjM05sY3k1bGJuUmxja1J2Ym1VN1hISmNiaUFnSUNBZ0lHbHpRV04wYVhabElEMGdabUZzYzJVN1hISmNiaUFnSUNCOVhISmNiaUFnZlZ4eVhHNTlYSEpjYmlJc0ltVjRjRzl5ZENCamIyNXpkQ0J5WlhOcGVtVWdQU0FvWm5WdVkzUnBiMjRvS1NCN1hISmNiaUFnYkdWMElITmxkSFJwYm1kek8xeHlYRzVjY2x4dUlDQmpiMjV6ZENCMGFHRjBJRDBnZTMwN0lGeHlYRzRnSUdOdmJuTjBJR1JsWm1GMWJIUnpJRDBnZTF4eVhHNGdJQ0FnYzJsNlpYTTZJSHRjY2x4dUlDQWdJQ0FnYldGNFYybGtkR2c2SURReU5TeGNjbHh1SUNBZ0lDQWdiV2x1VjJsa2RHZzZJREl3TUN4Y2NseHVJQ0FnSUNBZ2VEb2dNalV3WEhKY2JpQWdJQ0I5TEZ4eVhHNGdJSDFjY2x4dVhISmNiaUFnTHk4Z1NXNXBkSE1nWVc1a0lFVjJaVzUwYzF4eVhHNGdJR052Ym5OMElHbHVhWFJwWVd4cGVtVWdQU0JtZFc1amRHbHZiaWh2Y0hScGIyNXpLU0I3WEhKY2JpQWdJQ0J2Y0hScGIyNXpJRDBnYjNCMGFXOXVjeUI4ZkNCN2ZTQmNjbHh1SUNBZ0lITmxkSFJwYm1keklEMGdUMkpxWldOMExtRnpjMmxuYmloN2ZTd2daR1ZtWVhWc2RITXNJRzl3ZEdsdmJuTXBPMXh5WEc1Y2NseHVJQ0FnSUM4dklHMWxkR2h2WkhOY2NseHVJQ0FnSUdOdmJuTjBJRzF2ZG1WQmRDQTlJR1oxYm1OMGFXOXVLSGdwSUh0Y2NseHVJQ0FnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdWJHVm1kRTFsYm5VdWMzUjViR1V1ZDJsa2RHZ2dQU0I0SUNzZ0ozQjRKenRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1Y21WemFYcGxTR0Z1Wkd4bExuTjBlV3hsTG14bFpuUWdQU0I0SUNzZ0ozQjRKenRjY2x4dUlDQWdJQ0FnYzJWMGRHbHVaM011Ym05a1pVeHBjM1F1YldGcGJrTnZiblJsYm5RdWMzUjViR1V1YldGeVoybHVUR1ZtZENBOUlIZ2dLeUFuY0hnbk8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHOXVUVzkxYzJWVmNDQTlJR1oxYm1OMGFXOXVJR1oxYm1Nb0tTQjdYSEpjYmlBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbXhsWm5STlpXNTFMbU5zWVhOelRHbHpkQzV5WlcxdmRtVW9KM1J5WVc1emFYUnBiMjVmYm05dVpTY3BPMXh5WEc0Z0lDQWdJQ0J6WlhSMGFXNW5jeTV1YjJSbFRHbHpkQzV0WVdsdVEyOXVkR1Z1ZEM1amJHRnpjMHhwYzNRdWNtVnRiM1psS0NkMGNtRnVjMmwwYVc5dVgyNXZibVVuS1R0Y2NseHVJQ0FnSUNBZ2MyVjBkR2x1WjNNdWJtOWtaVXhwYzNRdVltOWtlUzVqYkdGemMweHBjM1F1Y21WdGIzWmxLQ2R1YjE5MWMyVnlYM05sYkdWamRHbHZiaWNwTzF4eVhHNGdJQ0FnSUNCa2IyTjFiV1Z1ZEM1eVpXMXZkbVZGZG1WdWRFeHBjM1JsYm1WeUtDZHRiM1Z6WlcxdmRtVW5MQ0J2YmsxdmRYTmxUVzkyWlNrN1hISmNiaUFnSUNBZ0lIUm9hWE11Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2lnbmJXOTFjMlYxY0Njc0lHWjFibU1wTzF4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lHTnZibk4wSUc5dVRXOTFjMlZOYjNabElEMGdablZ1WTNScGIyNG9aWFpsYm5RcElIdGNjbHh1SUNBZ0lDQWdZMjl1YzNRZ2JHVm1kRTFsYm5WWGFXUjBhQ0E5SUhCaGNuTmxTVzUwS0hObGRIUnBibWR6TG01dlpHVk1hWE4wTG14bFpuUk5aVzUxTG5OMGVXeGxMbmRwWkhSb0xDQXhNQ2s3WEhKY2JpQWdJQ0FnSUdsbUlDaHNaV1owVFdWdWRWZHBaSFJvSUQ0Z2MyVjBkR2x1WjNNdWMybDZaWE11YldGNFYybGtkR2dnZkh3Z2JHVm1kRTFsYm5WWGFXUjBhQ0E4SUhObGRIUnBibWR6TG5OcGVtVnpMbTFwYmxkcFpIUm9LU0I3WEhKY2JpQWdJQ0FnSUNBZ1pHOWpkVzFsYm5RdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpZ25iVzkxYzJWdGIzWmxKeXdnYjI1TmIzVnpaVTF2ZG1VcE8xeHlYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLR3hsWm5STlpXNTFWMmxrZEdnZ1BEMGdjMlYwZEdsdVozTXVjMmw2WlhNdWJXRjRWMmxrZEdnZ0ppWWdiR1ZtZEUxbGJuVlhhV1IwYUNBK1BTQnpaWFIwYVc1bmN5NXphWHBsY3k1dGFXNVhhV1IwYUNrZ2UxeHlYRzRnSUNBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbXhsWm5STlpXNTFMbU5zWVhOelRHbHpkQzVoWkdRb0ozUnlZVzV6YVhScGIyNWZibTl1WlNjcE8xeHlYRzRnSUNBZ0lDQWdJSE5sZEhScGJtZHpMbTV2WkdWTWFYTjBMbTFoYVc1RGIyNTBaVzUwTG1Oc1lYTnpUR2x6ZEM1aFpHUW9KM1J5WVc1emFYUnBiMjVmYm05dVpTY3BPMXh5WEc0Z0lDQWdJQ0FnSUhObGRIUnBibWR6TG01dlpHVk1hWE4wTG1KdlpIa3VZMnhoYzNOTWFYTjBMbUZrWkNnbmJtOWZkWE5sY2w5elpXeGxZM1JwYjI0bktUdGNjbHh1SUNBZ0lDQWdJQ0J0YjNabFFYUW9aWFpsYm5RdWNHRm5aVmdwTzF4eVhHNGdJQ0FnSUNCOVhISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdjMlYwZEdsdVozTXVibTlrWlV4cGMzUXVjbVZ6YVhwbFNHRnVaR3hsTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxdmRYTmxaRzkzYmljc0lHWjFibU4wYVc5dUtHVjJaVzUwS1NCN1hISmNiaUFnSUNBZ0lHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyMXZkWE5sYlc5MlpTY3NJRzl1VFc5MWMyVk5iM1psS1R0Y2NseHVJQ0FnSUNBZ2RHaHBjeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2R0YjNWelpYVndKeXdnYjI1TmIzVnpaVlZ3S1R0Y2NseHVYSEpjYmlBZ0lDQWdJSFJvYVhNdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblpISmhaM04wWVhKMEp5d2dablZ1WTNScGIyNG9aWFpsYm5RcElIdGNjbHh1SUNBZ0lDQWdJQ0JsZG1WdWRDNXdjbVYyWlc1MFJHVm1ZWFZzZER0Y2NseHVJQ0FnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnZlNsY2NseHVYSEpjYmlBZ0lDQnpaWFIwYVc1bmN5NXViMlJsVEdsemRDNXlaWE5wZW1WSVlXNWtiR1V1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWkdKc1kyeHBZMnNuTENCbWRXNWpkR2x2YmlncElIdGNjbHh1SUNBZ0lDQWdiVzkyWlVGMEtITmxkSFJwYm1kekxuTnBlbVZ6TG5ncE8xeHlYRzRnSUNBZ2ZTazdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1NXNXBkR2xoYkNCY2NseHVJQ0FnSUcxdmRtVkJkQ2h6WlhSMGFXNW5jeTV6YVhwbGN5NTRLVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSFJvWVhRdWFXNXBkR2xoYkdsNlpTQTlJR2x1YVhScFlXeHBlbVU3WEhKY2JseHlYRzRnSUhKbGRIVnliaUIwYUdGME8xeHlYRzU5S1NncE95SXNJaThxS2x4eVhHNGdLaUJjY2x4dUlDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHOW1abk5sZEZSb1pTQm9aV2xuYUhRZ2IyWWdZbTkwYUNCMGIzQmlZWElnWVc1a0lHZHliM1Z3SUdWc1pXMWxiblJjY2x4dUlDb3ZYSEpjYm1WNGNHOXlkQ0JqYjI1emRDQnpZM0p2Ykd4SVlXNWtiR1Z5SUQwZ1puVnVZM1JwYjI0b2IyWm1jMlYwS1NCN1hISmNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVLR1YyWlc1MEtTQjdYSEpjYmlBZ0lDQmxkbVZ1ZEM1d2NtVjJaVzUwUkdWbVlYVnNkQ2dwTzF4eVhHNGdJQ0FnWTI5dWMzUWdhSEpsWmlBOUlIUm9hWE11WjJWMFFYUjBjbWxpZFhSbEtDZG9jbVZtSnlrN1hISmNiaUFnSUNCamIyNXpkQ0J2Wm1aelpYUlViM0FnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLR0FrZTJoeVpXWjlZQ2t1YjJabWMyVjBWRzl3TzF4eVhHNGdJQ0FnYzJOeWIyeHNLSHRjY2x4dUlDQWdJQ0FnZEc5d09pQnZabVp6WlhSVWIzQWdMU0J2Wm1aelpYUXNYSEpjYmlBZ0lDQWdJR0psYUdGMmFXOXlPaUFuYzIxdmIzUm9KMXh5WEc0Z0lDQWdmU2xjY2x4dUlDQjlYSEpjYm4waUxDSmpiMjV6ZENCdFlXdGxTWFJsYlhNZ1BTQW9LU0E5UGlCN1hISmNiaUFnYkdWMElHbDBaVzF6SUQwZ0p5YzdYSEpjYmx4eVhHNGdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnTWpBN0lHa3JLeWtnZTF4eVhHNGdJQ0FnYVhSbGJYTWdLejBnWUZ4eVhHNGdJQ0FnSUNBOGJHa2dZMnhoYzNNOVhDSm5jbTkxY0Y5cGRHVnRJR052YkROY0lqNWNjbHh1SUNBZ0lDQWdJQ0E4WVNCamJHRnpjejFjSW1keWIzVndYMmwwWlcxZmJHbHVhMXdpUGx4eVhHNGdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OaGNtUmNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OaGNtUmZhV052YmlCc2IyRmthVzVuWENJK1BDOWthWFkrWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKallYSmtYMkp2WkhsY0lqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQThhRFFnWTJ4aGMzTTlYQ0pqWVhKa1gzUnBkR3hsSUd4dllXUnBibWRjSWo0OEwyZzBQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJRHh3SUdOc1lYTnpQVndpWTJGeVpGOTBaWGgwSUd4dllXUnBibWRjSWo0OEwzQStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEd3ZaR2wyUGx4eVhHNGdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lDQWdQQzloUGx4eVhHNGdJQ0FnSUNBOEwyeHBQbHh5WEc0Z0lDQWdZRHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSEpsZEhWeWJpQnBkR1Z0Y3p0Y2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHTnZibk4wSUdkbGRGTnJaV3hsZEc5dUlEMGdLQ2tnUFQ0Z1lGeHlYRzRnSUR4elpXTjBhVzl1SUdOc1lYTnpQVndpWjNKdmRYQmNJaUErWEhKY2JpQWdJQ0E4YURNZ1kyeGhjM005WENKbmNtOTFjRjkwYVhSc1pTQnNiMkZrYVc1blhDSStQQzlvTXo1Y2NseHVJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSm5jbTkxY0Y5amIyNTBaVzUwWENJK1hISmNiaUFnSUNBZ0lEeDFiQ0JqYkdGemN6MWNJbkp2ZHlCbmNtOTFjRjlwZEdWdGMxd2lQbHh5WEc0Z0lDQWdJQ0FnSUNSN2JXRnJaVWwwWlcxektDbDlYSEpjYmlBZ0lDQWdJRHd2ZFd3K1hISmNiaUFnSUNBOEwyUnBkajVjY2x4dUlDQThMM05sWTNScGIyNCtYSEpjYm1BN1hISmNibHh5WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnY21WdVpHVnlLSE5sYkdWamRHOXlMQ0IwWlcxd2JHRjBaU2tnZTF4eVhHNGdJR052Ym5OMElIUmhjbWRsZENBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvYzJWc1pXTjBiM0lwTzF4eVhHNGdJR2xtSUNnaGRHRnlaMlYwS1NCeVpYUjFjbTQ3WEhKY2JpQWdkR0Z5WjJWMExtbHVibVZ5U0ZSTlRDQTlJSFJsYlhCc1lYUmxLQ2s3WEhKY2JuMGlYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjkifQ==
