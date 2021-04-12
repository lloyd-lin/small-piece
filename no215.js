/*
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 经典的分治
const swap =(arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
var findKthLargest = function(nums, k) {
  const len = nums.length;
  // 直到pivot = k
  function partition(arr, l, r) {
    let pivot = l; // 默认用第一个数字来做判断
    let moveIndex = pivot + 1;
    for (let i = moveIndex; i <= r; i++) {
      if (arr[i] < arr[pivot]) {
        swap(arr, moveIndex++, i)
      }
    }
    swap(arr, pivot, moveIndex-1)
    return moveIndex - 1
  }
  function quickSort(arr, l = 0, r = arr.length -1) {
    // 添加随机
    let partitionIndex;
    if (l < r) {
      swap(arr, l, Math.floor(l + (r-l)/2))
      partitionIndex = partition(arr, l, r);
      quickSort(arr, l, partitionIndex-1);
      quickSort(arr, partitionIndex + 1, r);
    }
    return arr;
  }
  quickSort(nums)
  return nums[len - k]
};

console.log(findKthLargest([1,3,4,5,6,-6,0],2))
