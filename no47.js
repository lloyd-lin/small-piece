// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

//  

// 示例 1：

// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// 示例 2：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//  

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const resultArr = [];
  // 构建过程， 取一个数， 剩下的数字可以继续走构建，直到没有内容可以取为止
  // parentNodesArr 还未添加当前元素的内容
  // 与46不同的是， 可以剪枝
  function buildTree(arr, parentNodesArr = []) {
    const cacheNums = []
    arr.forEach((element, index) => {
      if (cacheNums.includes(element)) return 
      cacheNums.push(element)
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

console.log(permuteUnique([1,2,2]))