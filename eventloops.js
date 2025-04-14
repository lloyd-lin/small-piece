const eventloop = {
  queue: [],
  init() {
    this.queue.length = 0;
    this.loop();
  },
  loop() {
    while (this.queue.length) {
      const callback = this.queue.shift();
      callback();
    }
    setTimeout(this.loop.bind(this), 50); // core
  },
  add(callback) {
    this.queue.push(callback)
  }
}

eventloop.init();
setInterval(
  () => {
    eventloop.add(() => {
      console.log('callback')
    })
  }, 2000
)

// 2333 最遥远的距离就是函数和setTimeout里面的函数哈哈哈， 一个在自身函数调用栈，另一个在node底层调用栈
// async 和 await又将这个最遥远的距离拉近了， 可以try catch