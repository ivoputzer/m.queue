/* global test, afterEach */

const {ok, equal, deepEqual} = require('assert')
const {async, sequence} = require('..')

test('exports.sequence', function () {
  test('is callable', function () {
    ok(sequence instanceof Function)
  })

  test('behaves like async with concurrency bound to 1', function () {
    deepEqual(sequence(), async())
  })
})

test('exports.async', function () {
  test('is callable', function () {
    ok(async instanceof Function)
  })

  test('unqueue must invoke callback', function (done) {
    async(function unqueue (callback) {
      callback()
    }).push(done)
  })

  test('callback takes optional arguments', function (done) {
    async(function unqueue (callback) {
      callback(null, 'arg0', 'arg1')
    }).push((err, arg0, arg1) => {
      if (err) done(err)
      equal(arg0, 'arg0')
      equal(arg1, 'arg1')
      done()
    })
  })

  test('unqueue takes arguments within queue', function (done) {
    async(function unqueue (arg0, arg1, callback) {
      equal(arg0, 'arg0')
      equal(arg1, 'arg1')
      callback()
    }).push('arg0', 'arg1', done)
  })

  test('returns', function () {
    const queue = async(function unqueue (callback) {
      callback()
    })

    test('is array', function () {
      ok(queue instanceof Array)
    })

    test('.jobs', function () {
      test('has property', function () {
        ok(queue.hasOwnProperty('jobs'))
      })

      test('defaults to `0`', function () {
        equal(queue.jobs, 0)
      })
    })

    test('.idle', function () {
      test('has property', function () {
        ok(queue.hasOwnProperty('idle'))
      })

      test('defaults to `true`', function () {
        equal(queue.idle, true)
      })
    })

    test('.concurrency', function () {
      test('has property', function () {
        ok(queue.hasOwnProperty('concurrency'))
      })

      test('defaults to `1`', function () {
        equal(queue.concurrency, 1)
      })
    })

    test('.shift', function () {
      test('is callable', function () {
        ok(queue.shift instanceof Function)
      })
      test('is inherited from array', function () {
        equal(queue.shift, Array.prototype.shift)
      })
    })

    test('.pop', function () {
      test('is callable', function () {
        ok(queue.pop instanceof Function)
      })

      test('is inherited from array', function () {
        equal(queue.pop, Array.prototype.pop)
      })
    })

    test('.push', function () {
      test('is callable', function () {
        ok(queue.push instanceof Function)
      })

      test('returns instance of itself', function (done) {
        equal(queue.push(done), queue)
      })

      test('pushes args and notifies unqueue completion', function (done) {
        equal(queue.push(done).length, 1)
      })

      test('pushes args without notifying unqueue completion', function (done) {
        async(function unqueue (arg0, arg1, callback) {
          callback(null)
        })
        .push('arg0', 'arg1')
        .push('arg0', 'arg1', done)
      })
    })

    test('.unshift', function () {
      test('is callable', function () {
        ok(queue.unshift instanceof Function)
      })

      test('returns instance of itself', function (done) {
        equal(queue.unshift(done), queue)
      })

      test('unshifts args and notifies unqueue completion', function (done) {
        equal(queue.unshift(done).length, 1)
      })

      test('unshifts args without notifying unqueue completion', function (done) {
        async(function unqueue (arg0, arg1, callback) {
          callback(null)
        })
        .push('arg0', 'arg1')
        .push('arg0', 'arg1', done)
      })
    })

    test('.pause', function () {
      test('is callable', function () {
        ok(queue.pause instanceof Function)
      })

      test('returns instance of itself', function () {
        equal(queue.pause(), queue)
      })

      test('pauses unqueue execution', function (done) {
        const once = onceFor(done)
        queue.pause()
        queue.push(once.bind(null, new Error('execution not paused')))
        setImmediate(once)
      })
    })

    test('.resume', function () {
      test('is callable', function () {
        ok(queue.resume instanceof Function)
      })

      test('returns instance of itself', function () {
        equal(queue.resume(), queue)
      })

      test('resumes unqueue execution', function (done) {
        const once = onceFor(done)
        queue.pause()
        queue.push(once)
        queue.resume()
        setImmediate(once.bind(null, new Error('execution not resumed')))
      })

      afterEach(function reset () {
        queue.length = 0
        queue.paused = false
      })
    })

    function onceFor (done) {
      let called = false
      return function (err) {
        if (called) return
        done(err)
        called = true
      }
    }
  })
})
