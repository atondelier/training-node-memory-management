'use strict';


const { createObject } = require('./library');
const { wrapFunction } = require('./wrapper');


const wrappedCreateObject = wrapFunction(createObject);


wrappedCreateObject.logRetainedResults('BEFORE call\n');

let result = wrappedCreateObject();

wrappedCreateObject.logRetainedResults('AFTER call + result assigned\n');

gc();

wrappedCreateObject.logRetainedResults('AFTER garbage collector request\n');

result = null;

wrappedCreateObject.logRetainedResults('AFTER nullifying result\n');

gc();

wrappedCreateObject.logRetainedResults('AFTER garbage collector request\n');
