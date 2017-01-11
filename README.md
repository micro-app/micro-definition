[![npm](https://img.shields.io/npm/l/micro-definition.svg?style=flat-square)](https://www.npmjs.org/package/micro-definition)
[![npm](https://img.shields.io/npm/v/micro-definition.svg?style=flat-square)](https://www.npmjs.org/package/micro-definition)
[![npm](https://img.shields.io/npm/dm/micro-definition.svg?style=flat-square)](https://www.npmjs.org/package/micro-definition)
[![bitHound Code](https://www.bithound.io/github/micro-app/micro-definition/badges/code.svg)](https://www.bithound.io/github/micro-app/micro-definition)

# micro-definition
> (<2kb) A lite module loader and cache module in localStorage.

## Try it now

* [Live Demo](https://lixinliang.github.io/live-demo/micro-definition/)

## Getting started
```
$ npm install --save-dev micro-definition
```

## Dependency

* [micro-storage](https://github.com/micro-app/micro-storage)

## How to use

#### #Define a module
> Define( id : String, method : Function )

```js
Define('mod', function () {
    // some code;
    return value;
});
```

#### #Define a module with dependencies
> Define( id : String, dependency : Array, method : Function )

```js
Define('mod-a', ['mod-b', 'mod-c'], function ( b, c ) {
    // some code;
    return value;
});
```

#### #Require modules
> Define( dependency : Array, callback : Function )

```js
Define(['jQuery', 'lodash'], function ( $, _ ) {
    // some code;
});
```

#### #Config of alias
> Define.alias( alias : Object )

```js
Define.alias({
    'mod-a' : 'a.js',
    'mod-b' : 'b.js',
});
```

#### #Show all defined modules
More `Define.storage` api see [micro-storage](https://github.com/micro-app/micro-storage).

```js
Define.storage.list();
```

#### #Remove a defined module
More `Define.storage` api see [micro-storage](https://github.com/micro-app/micro-storage).

```js
Define.storage.remove('mod-a');
```

## License

MIT
