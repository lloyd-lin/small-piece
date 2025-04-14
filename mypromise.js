
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

    fn(resovle.bind(this), this.reject.bind(this))
  }

  resovle(result) {
    if (this.status === 'PENDING') {
      this.status = 'Fulfilled'
      for (let i=0; i< promiseResolveQueue.length; i++) {
        res = await element(result)
      }
    }
  }
  reject(err) {
    if (this.status === 'PENDING') {
      this.status = 'Rejected'
      promiseRejectQueue.forEach(element => {
        element(err)
      });
    }
  }
  then(resFn, rejFn) {
    if (this.status === 'PENDING') {
      promiseResolveQueue.push(resfn);
      promiseRejectQueue.push(rejFn);
    }
    return this;
  }
}