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
Define(String: id, Function: method);
```javascript
Define('mod', function () {
    // some code;
    return value;
});
```

#### Define a module with dependencies
Define(String: id, Array: Dependency, Function: method);
```javascript
Define('mod-a', ['mod-b', 'mod-c'], function ( b, c ) {
    // some code;
    return value;
});
```

#### Use modules
Define(Array: Dependency, Function: method);
````javascript
Define(['jQuery', 'lodash'], function ( $, _ ) {
    // some code;
});
````

#### Config of alias
````javascript
Define.alias({
    'mod-a' : 'a.js',
    'mod-b' : 'b.js',
});
````

#### Show all defined modules
````javascript
Define.storage.list();
````

#### Remove a defined module
````javascript
Define.storage.remove('mod-a');
````

## License

MIT
