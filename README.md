[![npm](https://img.shields.io/npm/l/micro-definition.svg?style=flat-square)](https://www.npmjs.org/package/micro-definition)
[![npm](https://img.shields.io/npm/v/micro-definition.svg?style=flat-square)](https://www.npmjs.org/package/micro-definition)
[![npm](https://img.shields.io/npm/dm/micro-definition.svg?style=flat-square)](https://www.npmjs.org/package/micro-definition)

# micro-definition
> (<2kb) A lite module loader and cache module in localStorage.

## Try it now

* [Live Demo](https://lixinliang.github.io/live-demo/micro-definition/)

## Getting started
```
$ npm install micro-definition
```

## Dependency

* [micro-storage](https://github.com/micro-app/micro-storage)

## How to use

#### Define a module
define(String: id, Function: method);
```javascript
define('mod', function () {
    // some code;
    return value;
});
```

#### Define a module with dependencies
define(String: id, Array: Dependency, Function: method);
```javascript
define('mod-a', ['mod-b', 'mod-c'], function ( b, c ) {
    // some code;
    return value;
});
```

#### Use modules
define(Array: Dependency, Function: method);
````javascript
define(['jQuery', 'lodash'], function ( $, _ ) {
    // some code;
});
````

#### Config of alias
````javascript
define.alias({
    'mod-a' : 'a.js',
    'mod-b' : 'b.js',
});
````

#### Show all defined modules
````javascript
define.storage.list();
````

#### Remove a defined module
````javascript
define.storage.remove('mod-a');
````

## License

MIT
