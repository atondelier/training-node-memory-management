'use strict';

const { inspect } = require('util');


const logHidden = (arg) => console.log(inspect(arg, { showHidden: true }));


module.exports = {
  logHidden,
};
