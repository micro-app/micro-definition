Define('mod-b', ['mod-c'], function ( c ) {
    console.log('i am mod-b');
    return 'mod-b,' + c;
});
