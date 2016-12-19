/*!
 * @ProjectName micro-definition
 * @Version 0.0.4
 * @Author lixinliang(https://github.com/lixinliang)
 * @Update 2016-12-19 10:34:15 am
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @webpack
	 * @library
	 * @libraryTarget var
	 */

	/**
	 * Dependency microStorage @see https://www.npmjs.com/package/micro-storage
	 * @type {Object} storage
	 */
	var storage = microStorage(("micro-definition"));

	var alias = {};
	var cache = {};
	var loading = {};

	/**
	 * Throw error
	 * @param {String} message throw error
	 */
	function throwError(message) {
	    throw new TypeError(("micro-definition") + ': ' + message);
	}

	/**
	 * noop
	 */
	function noop() {}

	/**
	 * Resolve the dependency of module
	 * @param {Array} dependency dependency of module
	 * @param {Function} method content of module
	 * @param {Function} callback pass the return value of the method
	 */
	function resolve(dependency, method, callback) {
	    var length = dependency.length;
	    if (length) {
	        (function () {
	            var done = function done() {
	                length--;
	                if (!length) {
	                    callback(method.apply(window, args));
	                }
	            };

	            var loadModule = function loadModule(result, id, index, callback) {
	                if (result) {
	                    var _dependency = result.dependency,
	                        content = result.content;

	                    var _method = new Function('return ' + content)();
	                    resolve(_dependency, _method, function (value) {
	                        cache[id] = args[index] = value;
	                        done();
	                        callback();
	                    });
	                } else {
	                    cache[id] = args[index] = new SyntaxError('@NAME: "' + id + '" is not defined');
	                    done();
	                    callback();
	                }
	            };

	            var args = [];

	            dependency.forEach(function (id, index) {
	                // alias redirect
	                if (typeof alias[id] == 'function') {
	                    id = alias[id].call(alias);
	                }
	                // get from cache
	                if (cache[id]) {
	                    args[index] = cache[id];
	                    done();
	                } else {
	                    // get from storage
	                    var result = storage(id);
	                    if (result) {
	                        loadModule(result, id, index, noop);
	                    } else {
	                        // get from network
	                        if (alias[id]) {
	                            if (loading[id]) {
	                                // push in queue when loading
	                                loading[id].push(function () {
	                                    args[index] = cache[id];
	                                    done();
	                                });
	                            } else {
	                                (function () {
	                                    loading[id] = [];
	                                    var script = document.createElement('script');
	                                    script.src = alias[id];
	                                    script.onload = function () {
	                                        document.head.removeChild(script);
	                                        var result = storage(id);
	                                        loadModule(result, id, index, function () {
	                                            loading[id].forEach(function (callback) {
	                                                callback();
	                                            });
	                                        });
	                                    };
	                                    document.head.appendChild(script);
	                                })();
	                            }
	                        } else {
	                            // not exist then skip
	                            args[index] = cache[id] = void 0;
	                            done();
	                        }
	                    }
	                }
	            });
	        })();
	    } else {
	        callback(method());
	    }
	}

	/**
	 * define a module by name or invoke an anonymous function and pass the dependency as arguments
	 * @param {String} id unique name of module
	 * @param {Array} dependency dependency of module
	 * @param {Function} method method
	 */
	function Define(id, dependency, method) {
	    if (arguments.length < 2) {
	        throwError('2 arguments required at least.');
	    }
	    if (typeof id != 'string') {
	        method = dependency;
	        dependency = id;
	        id = null;
	    } else {
	        if (!id) {
	            throwError('Module id can not be empty.');
	        }
	    }
	    if (!(dependency instanceof Array)) {
	        method = dependency;
	        dependency = [];
	    }
	    if (typeof method != 'function') {
	        throwError('Module should be a function.');
	    }
	    if (id) {
	        storage(id, {
	            dependency: dependency,
	            timestamp: +new Date(),
	            content: method.toString()
	        });
	    } else {
	        resolve(dependency, method, noop);
	    }
	}

	/**
	 * Set alias to each module
	 * @param {Object} config module-id : module-path
	 */
	Define.alias = function (config) {
	    for (var id in config) {
	        alias[id] = config[id];
	    }
	};

	Define.version = ("0.0.4");
	Define.storage = storage;

	window.Define = Define;

/***/ }
/******/ ]);