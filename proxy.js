let fleet1 = {
  name: "Musaxi",
  type: "battle ship",
  weapon: ['46mm']
}
let superHandle = {
  /**
   * get(target, propKey, receiver) 
   * target：目标对象
   * propKey：属性名
   * receiver（可选）：proxy 实例本身（严格地说，是操作行为所针对的对象）
   *  */ 
  get: (target, propKey, receiver) => {
    if (propKey === 'name')
      return `舰名：${target[propKey]}`
    return target[propKey]
  },
  /**
   * set(target, propKey, value, receiver)
   * 用于拦截某个属性的赋值操作，可以接受四个参数：
   * target：目标对象
   * propKey：属性名
   * value：属性值
   * receiver（可选）：Proxy 实例本身
   */
  set: (target, propKey, value, receiver) => {
    console.log(`设置属性${propKey}`)
    target[propKey] = value;
    return true;
  }
}

let superFleet = new Proxy(fleet1, superHandle);

console.log(superFleet)
console.log(superFleet.name)
console.log(superFleet.type)
superFleet.type = "BB"
console.log(superFleet.type)
console.log('-------')
/* let a = {
  name: '123',
  b() {
    console.log(this)
  },
  c: () => {
    console.log(this)
  }
} */
// 题外话
// a.b()
// a.c()
let linkNodes = [{ val:7, next: { val:6}}, { val:17, next: { val:16}}]
let linkHandler = {
  get: (target, propKey) => {
    return propKey in target ? target[propKey].val || target[propKey]: undefined
  },
  set: (target, propKey, value) => {
    if ((Reflect.hasOwnProperty.call(target, propKey) || propKey === '' + target.length) && propKey !== 'length') {
      Reflect.set(target, propKey, {val: value, next: null})
    } else {
      Reflect.set(target, propKey, value)
    }
    return true
  },
}
let newLinkNodes = new Proxy(linkNodes, linkHandler)
// linkNodes[0].val = 8
// console.log(newLinkNodes[0])
newLinkNodes.push(6)
console.log(newLinkNodes)
console.log(linkNodes)