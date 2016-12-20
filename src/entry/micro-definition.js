/**
 * @webpack
 * @library
 * @libraryTarget var
 */

/**
 * Dependency microStorage @see https://www.npmjs.com/package/micro-storage
 * @type {Object} storage
 */
let storage = microStorage(process.env.NAME);

let alias = {};
let cache = {};
let loading = {};

/**
 * Throw error
 * @param {String} message throw error
 */
function throwError ( message ) {
    throw new TypeError(`${ process.env.NAME }: ${ message }`);
}

/**
 * noop
 */
function noop () {}

/**
 * Resolve the dependency of module
 * @param {Array} dependency dependency of module
 * @param {Function} method content of module
 * @param {Function} callback pass the return value of the method
 */
function resolve ( dependency, method, callback ) {
    let length = dependency.length;
    if (length) {
        let args = [];
        function done () {
            length--;
            if (!length) {
                callback(method.apply(window, args));
            }
        }
        function loadModule ( result, id, index, callback ) {
            if (result) {
                let { dependency, content } = result;
                let method = new Function('return ' + content)();
                resolve(dependency, method, function ( value ) {
                    cache[id] = args[index] = value;
                    done();
                    callback();
                });
            } else {
                cache[id] = args[index] = new SyntaxError(`${ process.env.NAME }: "${ id }" is not defined`);
                done();
                callback();
            }
        }
        dependency.forEach(function ( id, index ) {
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
                let result = storage(id);
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
                            loading[id] = [];
                            let script = document.createElement('script');
                            script.src = alias[id];
                            script.onload = function () {
                                document.head.removeChild(script);
                                let result = storage(id);
                                loadModule(result, id, index, function () {
                                    loading[id].forEach(function ( callback ) {
                                        callback();
                                    });
                                });
                            };
                            document.head.appendChild(script);
                        }
                    } else {
                        // not exist then skip
                        args[index] = cache[id] = void 0;
                        done();
                    }
                }
            }
        });
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
function Define ( id, dependency, method ) {
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
            dependency,
            timestamp : +new Date,
            content : method.toString(),
        });
    } else {
        resolve(dependency, method, noop);
    }
}

/**
 * Set alias to each module
 * @param {Object} config module-id : module-path
 */
Define.alias = function ( config ) {
    for (let id in config) {
        alias[id] = config[id];
    }
};

Define.version = process.env.VERSION;
Define.storage = storage;

window.Define = Define;
