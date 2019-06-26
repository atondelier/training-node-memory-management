# Node memory management


## Goals

This training aims at learning 3 things:
 - identifying the main reasons for a having memory leaks in a JS application
 - inspecting an application with the dev tools to search for the leaks
 - monitoring an application to avoid surprises!


## Prerequisites

 - **node**: >= 10, preferably through nvm
 - **chrome**: a recent version (>= 62 is fine)


## How to


### Install

Install the application

```
nvm i && npm i
```


## Exercises

Each exercise has its own README.
Click on the each title to open it.


### [Exercise 1](./src/exercise-1)

This exercise makes you experiment the DevTools memory features.
You will learn how to find a memory leak.
You will also learn a tricky cause of leak with the V8 engine.


### [Exercise 2](./src/exercise-2)

This exercise makes you play with references.
You will learn that references are not of one single type!


### [Exercise 3](./src/exercise-3)

This exercise makes you play with prometheus metrics about memory.
You will learn that references are not of one single type!
