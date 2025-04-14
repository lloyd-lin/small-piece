// 全排列
// leetcode 46. 全排列

// 给定一个没有重复数字的序列，返回其所有可能的全排列。

// 示例:

// 输入: [1,2,3]

// 输出:

// [[1,2,3], [1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 分析，从中获取一个数字，然后开始构建一棵树，每次从生下的数字里构建新的子树

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const resultArr = [];
  
  // 构建过程， 取一个数， 剩下的数字可以继续走构建，直到没有内容可以取为止
  // parentNodesArr 还未添加当前元素的内容
  function buildTree(arr, parentNodesArr = []) {
    arr.forEach((element, index) => {
      const parentNodesArrClone = [...parentNodesArr];
      const cloneArr = [...arr]
      cloneArr.splice(index, 1);
      parentNodesArrClone.push(element)
      // 递归结束 
      if (cloneArr.length === 0) {
        resultArr.push(parentNodesArrClone)
      } else {
        buildTree(cloneArr, parentNodesArrClone)
      }
    });
  }
  buildTree(nums)
  return resultArr
};

console.log(permute([1,2,3]))