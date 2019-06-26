'use strict';

const wrapFunction = (func) => {
  const proxy = new Proxy(func, {});

  proxy.logRetainedResults = (...args) => console.log(...args, '{  }');

  return proxy;
};


module.exports = {
  wrapFunction,
};
