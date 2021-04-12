//debounce
// 将多个连续操作合并为一个
// 使用场景 ， resize结束查看最终值， 连续输入等待最终结果再调用远端接口
// 也有场景需要在开始就触发一次
// throttle
// 在x的时间内最多触发一次
// 无限滑动的时候，快接近底部进行一次请求，保证不会过于频繁
// 类似requestAnimationFrame
// 不支持IE9以下，不支持node， 但是对于浏览器更顺滑

// 支持前置
const debounce = (func, timeout, isLead = false) => {
  // 不是方法则退出
  // 内部id
  let timer;
  return function(...args) {
    if (isLead && !timer) {
      func(...args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (isLead) {
        timer = undefined;
      } else {
        func(...args);
      }
    }, timeout)
  }
}

const throttle = (func, frequency) => {
  let start = new Date();
  let isFirst = true;
  return function(...args) {
    let now = new Date();
    if (now - start >= frequency || isFirst === true) {
      func(...args);
      isFirst = false;
      start = new Date();
    }
  }
}