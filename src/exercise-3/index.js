'use strict';

const prometheus = require('prom-client');
const gcStats = require('./prometheus-gc-stats-proxy');
const { app } = require('../exercise-1');


const prometheusRegistry = new prometheus.Registry();
prometheus.collectDefaultMetrics({ register: prometheusRegistry });
gcStats(prometheusRegistry)();

app.use('/metrics', (req, res) => {
  res.end(prometheusRegistry.metrics());
});
