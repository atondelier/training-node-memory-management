'use strict';

const chalk = require('chalk');
const http = require('http');
const connect = require('connect');
const { Task, TaskQueue } = require('./tasks');


const taskQueue = new TaskQueue();

const app = connect();

app.use('/add-task', (req, res) => {
  taskQueue.add(new Task());
  console.log(chalk.yellow('one task queued'));
  res.end('done');
});

app.use('/execute-tasks', (req, res) => {
  taskQueue.execute();
  console.log(chalk.blue('tasks executed'));
  res.end('done');
});

app.use('/last-task', (req, res) => {
  res.end(JSON.stringify(taskQueue.lastExecutedTask));
});

const server = http.createServer(app);

server.listen(3000);


module.exports = {
  taskQueue,
  server,
};
