# Exercise 2


## Introduction

Tracking memory leaks is something you should do very rarely.
To not say never.

One could build a library which can wrap functions
to keep track of all what this function has returned.



## Proceed


### Start

Using Node 10 or higher, run the exercise code

```
npm run start-exercise-2
```

Have a look at the [exercise code](./index.js).

For now, the instrumentation of the [library](./library.js)
is just a `Proxy` to its `createObject` function.

The instrumentation is done by [wrapper](./wrapper.js)'s
`wrapFunction` function.


### Simple retainer


Using an `Array`, add options to the `Proxy` constructor to make it store the returned values
in a way the exposed `logRetainedResults` method actually logs them.

Don't hesitate to have a look at the documentation of [Proxy][].

Also think about editing `logRetainedResults`!

<details>
<summary>Solution</summary>
<p>

```javascript
const returnValues = [];

const proxy = new Proxy(func, {
  apply(target, thisArg, argumentsList) {
    const returnValue = target.apply(thisArg, argumentsList);
    returnValues.push(returnValue);
    return returnValue;
  },
});
```

</p>
</details>

Re-execute the code, and comment the leak.


### Too strong!

Edit your last changes to remove the leak.

You may need to change how it logs retained values.
Have a look at what is already available in [log](./log.js) helper.

<details>
<summary>Solution</summary>
<p>

```javascript
const returnValues = new WeakSet();

const proxy = new Proxy(func, {
  apply(target, thisArg, argumentsList) {
    const returnValue = target.apply(thisArg, argumentsList);
    returnValues.add(returnValue);
    return returnValue;
  },
});
```

</p>
</details>  


[Proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
