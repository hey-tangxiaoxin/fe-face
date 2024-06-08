class LazyClass {
  tasks: Array<Function>
  constructor(name) {
    console.log(`i am ${name}`);
    this.tasks = [];
    setTimeout(() => {
      this.next()
    }, 0)
  }
  private asyncTask(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }
  do(name) {
    const fn = () => {
      console.log(`i am do ${name}`);
      this.next()
    }
    this.tasks.push(fn)
    return this
  }
  sleep(time) {
    const task = this.asyncTask(time)
    const fn = () => task.then(() => {
      console.log(`after sleep ${time}`);
      this.next()
    })
    this.tasks.push(fn)
    return this
  }
  sleepFirst(time) {
    const task = this.asyncTask(time)
    const fn = () => task.then(() => {
      console.log(`first sleep ${time}`)
      this.next()
    })
    this.tasks.unshift(fn)
    return this
  }
  next() {
    const fn = this.tasks.shift()
    fn && fn()
  }
}

function lazyMan(name) {
  return new LazyClass(name)
}

lazyMan('tangxiaoxin').do('eat').sleep(2000).do('lunch').sleepFirst(4000)