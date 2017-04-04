exports.async = exports.Queue = Queue

function Queue (consumer, concurrency = 1) {
  return Object.create(Array.prototype, {
    concurrency: {
      value: concurrency,
      writable: false
    },
    jobs: {
      value: 0,
      writable: true
    },
    idle: {
      get () {
        return this.length + this.jobs === 0
      }
    },
    push: {
      value (...args) {
        Array.prototype.push.call(this, args)
        setImmediate(tick, this)
        return this
      }
    },
    unshift: {
      value (...args) {
        Array.prototype.unshift.call(this, args)
        setImmediate(tick, this)
        return this
      }
    },
    pause: {
      value (args) {
        this.paused = true
        return this
      }
    },
    resume: {
      value () {
        if (!this.paused) return this
        this.paused = false
        setImmediate(tick, this)
        return this
      }
    }
  })
  function tick (queue) {
    while (!queue.paused && queue.jobs < concurrency && queue.length) {
      const [args, callback] = next(queue.shift())

      consumer(...args, (...callbackArgs) => {
        queue.jobs--
        tick(queue)
        callback(...callbackArgs)
      })
      queue.jobs++
    }
    function next (args) {
      return args[args.length - 1] instanceof Function
        ? [args, args.pop()]
        : [args, Function.prototype]
    }
  }
}
