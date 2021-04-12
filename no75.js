/**
 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

 

示例 1：

输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
示例 2：

输入：nums = [2,0,1]
输出：[0,1,2]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-colors
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。} nums 
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 三路快排
var sortColors = function(nums) {
  const threeArr = [0, 0, 0]
  const len = nums.length;
  // 统计
  for (let i = 0; i< len; i++) {
    if (nums[i] === 0) {
      threeArr[0]++
    } else if (nums[i] === 1) {
      threeArr[1]++
    } else if (nums[i] === 2) {
      threeArr[2]++
    }
  }
  // 修改
  for (let i = 0; i < len; i++) {
    if (i < threeArr[0]) {
      nums[i] = 0;
    } else if (i < threeArr[0] + threeArr[1]) {
      nums[i] = 1;
    } else {
      nums[i] = 2;
    }
  }
};