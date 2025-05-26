
/**
 * No.LCR84
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 * 
 * @param {*} nums 
 * @returns 
 */
var permuteUnique = function(nums) {
    const result = [];
    const flags = Array(nums.length).fill(0);
    const dfs = (nums, path) => {
        const set = new Set();
        if (path.length === nums.length) {
            result.push(path);
            return;
        }
        for (let i = 0; i< nums.length; i++) {
            if (flags[i] || set.has(nums[i])) continue;
            set.add(nums[i])
            const newPath = [...path, nums[i]]
            flags[i] = 1;
            dfs(nums, newPath);
            flags[i] = 0;
        }
    }
    dfs(nums, []);
    return result
};