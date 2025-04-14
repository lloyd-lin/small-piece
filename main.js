// const testCase = [4,1,3,4,8]
// //                0       4
// function swap(arr, i, j) {
//   arr[i] = arr[i] ^ arr[j]
//   arr[j] = arr[i] ^ arr[j]
//   arr[i] = arr[i] ^ arr[j]
// }
// function bubble(arr) {
//   const length = arr.length;
//   for (let i = 0; i < arr.length -1; i ++) {
//     for (let j = i + 1; j < arr.length -1; j++) {
//       if (arr[i] > arr[j]) {
//         swap(arr, i, j)
//       }
//     }
//   }
//   return arr;
// }
// console.log(bubble(testCase))

// (push)

// const MyArray = Object.create(Array.getPrototypeOf())
const originPush = Array.prototype.push;
const MyArray = Object.create(Array.prototype)

Object.defineProperty(Array.prototype, 'myPush', {
  get: function() {
    console.log('111')
    return originPush
  },
})
const testArr = [];
testArr.myPush('6')
console.log(testArr)


