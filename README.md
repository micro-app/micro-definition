# micro-definition
> (<2kb) A lite module definition tool.

## Try it now

* [Live Demo](https://lixinliang.github.io/live-demo/micro-definition/)

## Getting started
```
$ npm install micro-definition
```

## How to use

#### Define a module
define(String: id, Function: method);
```
define('mod', function () {
    // some code;
    return value;
});
```

#### Define a module with dependencies
define(String: id, Array: Dependency, Function: method);
```
define('mod-a', ['mod-b', 'mod-c'], function ( b, c ) {
    // some code;
    return value;
});
```

#### Use modules
define(Array: Dependency, Function: method);
````
define(['jQuery', 'lodash'], function ( $, _ ) {
    // some code;
});
````

#### Config of alias
````
define.alias({
    'mod-a' : 'a.js',
    'mod-b' : 'b.js',
});
````

#### Show definitional modules
````
define.storage.list();
````

#### Remove a definitional module
````
define.storage.remove('mod-a');
````

## License

MIT
