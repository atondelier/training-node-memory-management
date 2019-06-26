# Exercise 1


## Introduction

This application manages a task queue
and exposes endpoints to
 - add a new task to the queue
 - and execute queued tasks

It has a bug that makes it crash very soon while using it.
Some could count on a daemon to restart it,
but you are not one of them.


## Proceed


### Start

Run the exercise application

```
npm run start-exercise-1
```

It starts a server on http://localhost:3000.

You can call http://localhost:3000/add-task
to create a task to the queue.

You can call http://localhost:3000/execute-tasks
to execute queued tasks.

Make it crash by just calling it and try to guess a possible reason.


### Node options


#### Is it memory related?

Add a few options to `start-exercise-1` script
to reveal it's related to memory and how the garbage collector
is managing that.

<details>
<summary>Solution</summary>
<p>

```
// in package.json
"start-exercise-1": "node --trace-gc --trace-gc-ignore-scavenger --max-old-space-size=60 src/exercise-1"
```

</p>
</details>


#### What is filling memory space?


##### Connect the inspector

Add another option to `start-exercise-1` script
to be able to inspect it with the DevTools.

<details>
<summary>Solution</summary>
<p>

```
// in package.json
"start-exercise-1": "node --inspect-brk --trace-gc --trace-gc-ignore-scavenger --max-old-space-size=60 src/exercise-1"
```

</p>

On Chrome, open chrome://inspect and find the correct target.
</details>


##### Heap snapshot

Now, replay the scenario which led to the crash, and before it crashes,
take a heap snapshot.

From there, determine which objects are actually filling memory space.


##### The 3 snapshot technique

Apply the 3 snapshot technique to this case.

<details>
<summary>Solution</summary>
Proceed as follows:

1) add some tasks, execute them
2) redo step 1, request garbage collection and take a heap snapshot
3) redo step 2 twice (you should then have 3 snapshots)
4) from snapshot 3, look at objects allocated between snapshot 1 and snapshot 2

</details>

Note which objects seem to leak.


##### Allocation timeline

Though very relevant and helpful,
the technique above is heavy to carry out.

It's so relevant that Chrome DevTools has a feature
for recording the allocation timeline.
You can look at objects allocated in a time range,
and which were not collected at the moment you stopped the record.

However, the allocation timeline is much more expensive
and you may not want to be running it while real requests
are reaching your servers, preferring heap snapshots on idle periods.

Take advantage of this feature to get to the same conclusion
as with the previous technique.


##### Allocation profile

Record the allocation profile to determine in which function
so much memory is allocated.

Compare the size of the retained objects you got from the heap snapshots,
and what you get with the allocation profile.

What can you say from that comparison?


#### Why is it not garbage collected?


##### Retaining tree

Now that you have access to all this knowledge,
you could start looking at the code and correlating it
with what you've just learned.

But, let's proceed as if you had no access to the code.
Go back to the allocation timeline or heap snapshot,
to have a look at the retaining trees.

Explore the retaining tree of the leaking objects.

How does it correlate with what you learned
from studying the allocation profile?

