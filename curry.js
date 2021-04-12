/**
 * 经典的add场景
 * add本身 a+ b
 */

function add(a,b) {
  return a + b;
}

// 分析， 绑定后返回一个方法，每次接收一个参数，累加
// fn.length获取到需要的参数数量

function curry(fn, arity = fn.length, ...args) {
  return arity <= args.length ? 
    fn(...args) : curry.bind(null, fn, arity, ...args);
}