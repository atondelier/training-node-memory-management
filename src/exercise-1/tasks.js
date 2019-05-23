'use strict';

const { EventEmitter } = require('events');

class Task extends EventEmitter {
  constructor({ name = 'noname' } = {}) {
    super();
    this.name = name;

    this.payload = {
      content: new Array(3e5).join('x'),
    };
  }

  execute() {
    this.emit('done');
  }

  destroy() {
    this.emit('destroyed');
  }
}

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.lastExecutedTask = null;
  }

  add(task) {
    this.list.push(task);
  }

  execute() {
    while (this.list.length > 0) {
      const previousTask = this.lastExecutedTask;

      if (previousTask) {
        previousTask.on('destroyed', () => {
          this.emit('task-destroyed', previousTask);
        });
        previousTask.destroy();
      }

      const task = this.list.shift();

      task.on('done', () => {
        this.emit('task-done', task);
      });
      task.execute();

      this.lastExecutedTask = task;
    }
  }
}


module.exports = { Task, TaskQueue };
