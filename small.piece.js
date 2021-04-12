// 判断是否是一个非重复的数组
alllUnique = (arr) => {
  // boolean
  return arr.length === new Set(arr).size
}

// compose
const compose = (...fn) => {
  return fn.reduce((oldFn, newFn) => {
    return function(...args) {
      oldFn(newFn(...args))
    }
  })
}

// 提一嘴reduce
// 第一次使用 方法的参数， left/right
// 之后进入 last return & new 的模式
// 计算就需要初始值，如果初始值由方法带来，则可以没有初始。
// 如果一开始就一个元素，不执行