# m.queue
[![travis](https://img.shields.io/travis/ivoputzer/m.queue.svg?style=flat-square)](https://travis-ci.org/ivoputzer/m.queue) [![npm-dependencies](https://img.shields.io/badge/dependencies-none-blue.svg?style=flat-square&colorB=44CC11)](package.json) [![standard-js](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![coverage](https://coveralls.io/repos/github/ivoputzer/m.queue/badge.svg?branch=master)](https://coveralls.io/github/ivoputzer/m.queue?branch=master) [![npm-package-quality](http://npm.packagequality.com/shield/m.queue.svg?style=flat-square&colorB=44CC11)](http://packagequality.com/#?package=m.queue) [![npm-node-version](https://img.shields.io/badge/node-6%2B-blue.svg?style=flat-square)](https://nodejs.org/docs/v6.0.0/api) [![npm-version](https://img.shields.io/npm/v/m.queue.svg?style=flat-square&colorB=007EC6)](https://www.npmjs.com/package/m.queue) [![npm-license](https://img.shields.io/npm/l/m.queue.svg?style=flat-square&colorB=007EC6)](https://spdx.org/licenses/MIT)

**[m(icro)](https://github.com/ivoputzer/m.cro#readme)[queue](https://github.com/ivoputzer/m.queue)** is a lightweight es6+ library that exports an asynchronous function queue with adjustable concurrency.

## .async
creates a `queue` object with the specified `concurrency`. tasks added to the queue are processed in parallel (up to the concurrency limit). if all `workers` are in progress, the task is queued until one becomes available. once a `worker` completes a task, that task's callback is called.

```javascript
const {async} = require('m.queue')

const queue = async(function worker (arg0, arg1, callback) {
  if (err) {
    done(err)
    return
  }
  callback([err], arg0, arg1)
}, 10)
```

### queue.resume()
### queue.pause()
### queue.drain([callback]) // set concurrency to infinite and notify when idle again
### queue.unshift([...args, callback]])
### queue.push([..args, callback])

### queue.length()
### queue.shift()
### queue.pop()



