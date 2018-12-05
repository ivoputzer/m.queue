m.queue
===
**[m(icro)](https://github.com/ivoputzer/m.cro#readme)[queue](https://github.com/ivoputzer/m.queue) is a lightweight es6+ library that exports an asynchronous function queue with adjustable concurrency.**

[![travis](https://img.shields.io/travis/ivoputzer/m.queue.svg?style=for-the-badge)](https://travis-ci.org/ivoputzer/m.queue)
[![dependencies](https://img.shields.io/badge/dependencies-none-blue.svg?style=for-the-badge&colorB=44CC11)](package.json)
[![coverage status](https://img.shields.io/coveralls/ivoputzer/m.queue.svg?style=for-the-badge)](https://coveralls.io/github/ivoputzer/m.queue?branch=master)
[![linter](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=for-the-badge)](http://standardjs.com/)

[![node](https://img.shields.io/badge/node-6%2B-blue.svg?style=for-the-badge)](https://nodejs.org/docs/v6.0.0/api)
[![version](https://img.shields.io/npm/v/m.queue.svg?style=for-the-badge&colorB=007EC6)](https://www.npmjs.com/package/m.queue)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&colorB=007EC6)](https://spdx.org/licenses/MIT)
[![minzip](https://img.shields.io/bundlephobia/minzip/m.queue.svg?style=for-the-badge)](https://bundlephobia.com/scan-results?packages=m.queue)
[![downloads](https://img.shields.io/npm/dt/m.queue.svg?style=for-the-badge&colorB=007EC6)](https://www.npmjs.com/package/m.queue)

## .async
creates a `queue` object with the specified `concurrency`. tasks added to the queue are processed in parallel (up to the concurrency limit). if all `workers` are in progress, the task is queued until one becomes available. once a `worker` completes a task, that task's callback is called.

```javascript
const {async} = require('m.queue')

const queue = async(function worker (arg0, arg1, callback) {
  if (err) {
    callback(err)
    return
  }
  callback(null, arg0, arg1)
}, 10)
```

## .sequence
creates a `queue` object. tasks added to the queue are processed sequentially. while the `worker` is executing tasks will be queued. once a `worker` completes a task, that task's callback is called.

```javascript
const {sequence} = require('m.queue')

const queue = sequence(function worker (arg0, arg1, callback) {
  if (err) {
    callback(err)
    return
  }
  callback(null, arg0, arg1)
})
```

---

### queue.resume()
resumes worker execution

### queue.pause()
pauses worker execution

### queue.drain([callback])
sets concurrency to infinite and notifies when idle

### queue.unshift([...args, callback]])
unshifts task to queue

### queue.push([..args, callback])
pushes task to queue

### queue.length
inherited from array, returns the queue length

### queue.shift()
inherited from array

### queue.pop()
inherited from array
