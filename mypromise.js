
class MyPromise {
  /**
   * 
   * new Promise((resolve, reject) => {
   *  setTimeout(() => {
   *    resolve(resData)
   *  }, 2000)
   *  
   * }).then(data => {
   *  console.log(data)
   * })
   */
  constructor(fn) {
    this.promiseResolveQueue = [];
    this.promiseRejectQueue = [];
    this.status = 'PENDING'; // 'Fulfilled, Rejected'

    fn(this.resovle.bind(this), this.reject.bind(this))
  }

  resovle(result) {
    if (this.status === 'PENDING') {
      this.status = 'Fulfilled'
      for (let i=0; i< this.promiseResolveQueue.length; i++) {
        this.promiseResolveQueue[i](result)
      }
      this.promiseResolveQueue = [];
      this.promiseRejectQueue = [];
      return this;
    }
  }
  reject(err) {
    if (this.status === 'PENDING') {
      this.status = 'Rejected'
      promiseRejectQueue.forEach(element => {
        element(err)
      });
      this.promiseResolveQueue = [];
      this.promiseRejectQueue = [];
      return this;
    }
  }
  then(resFn = () => {}, rejFn = () => {}) {
    if (this.status === 'PENDING') {
      this.promiseResolveQueue.push(resFn);
      this.promiseRejectQueue.push(rejFn);
    }
    return this;
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('setTimeout')
    resolve('success')
  }, 2000)
})

p.then(data => {
  console.log(data)
})


