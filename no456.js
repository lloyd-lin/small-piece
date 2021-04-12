/*
给你一个整数数组 nums ，数组中共有 n 个整数。
132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，
并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。
如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

进阶：很容易想到时间复杂度为 O(n^2) 的解决方案，
你可以设计一个时间复杂度为 O(n logn) 或 O(n) 的解决方案吗？

示例 1：

输入：nums = [1,2,3,4]
输出：false
解释：序列中不存在 132 模式的子序列。
示例 2：

输入：nums = [3,1,4,2]
输出：true
解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
示例 3：

输入：nums = [-1,3,2,0]
输出：true
解释：序列中有 3 个 132 模式的的子序列：
[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/132-pattern
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


var find132pattern = function(nums) {
  if (nums.length < 3) {
    return false
  }
  const decreaseStack = [Number.NEGATIVE_INFINITY];
  // 单调递增栈
  for (let i = nums.length-1; i > 0; i-- ) {
    let k;
    if (nums[i] > decreaseStack[decreaseStack.length-1]) {
      while(decreaseStack.length > 0) {
        let top = decreaseStack.pop();
        if (top > nums[i]) {
          decreaseStack.push(top, nums[i])      
          break;
        }
        k = top;
        decreaseStack.push()
      }
      decreaseStack.push(nums[i])
    }
  }
};

// 单调栈
function sequenceStack(nums, increaseOrDecrease) {
  // NEGATIVE_INFINITY  递减，越底部越大
  const stack = [Number.NEGATIVE_INFINITY];
  for (let i = nums.length - 1; i > 0 ; i--) {
    let out = [];
    let top = stack.pop();
    out.push(top);
    while (nums[i] > top && stack.length > 0) { // 所有小于当前元素都要出栈
      top = stack.pop();
      out.push(top);  
    }
    if (top > nums[i]) {
      out.pop();
      stack.push(top, nums[i]);
    } else {
      stack.push(nums[i]);
    }
    console.log('out:', out.reverse());
    console.log('stack:', stack);
  }
}
sequenceStack([1,10,3,4,5,12,-234,1,65,47,38,55])


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
  // NEGATIVE_INFINITY  递减，越底部越大
  const stack = [Number.NEGATIVE_INFINITY];
  let k;
  for (let i = nums.length - 1; i > 0 ; i--) {
    // 出栈的元素
    let out = [];
    let top = stack.pop();
    k = i - 1;
    out.push(top);
    while (nums[i] > top && stack.length > 0) { // 所有小于当前元素都要出栈
      top = stack.pop();
      out.push(top);  
    }
    if (top >= nums[i]) {
      out.pop();
      stack.push(top, nums[i]);
    } else {
      stack.push(nums[i]);
    }
    // out最后一个是出栈的最大元素
    while (nums[k] !== undefined) {
      if (nums[k] < out[out.length-1]) {
        return true;
      }
      k--
    }
  }
  return false;
};

var find132pattern = function(nums) {
  const stack = [];
  const n = nums.length;
  let k = Number.NEGATIVE_INFINITY;

  for (let i=n-1; i>=0; --i) {
      if (nums[i] < k) {
          return true;
      }
      while (stack && stack[stack.length-1] < nums[i]) {
          k = Math.max(k, stack.pop());
      }
      stack.push(nums[i]);
  }

  return false;
};