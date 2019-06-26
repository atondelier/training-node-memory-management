"use strict";

let gcStats;

try {
  gcStats = require("prometheus-gc-stats");
} catch (exception) {
  gcStats = () => () => ({
    stop: () => {},
  });
}

module.exports = gcStats;
