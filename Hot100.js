/**
 * No.49
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (const str of strs) {
        const sortedStr = str.split('').sort().join('');
        if (!map.has(sortedStr)) {
            map.set(sortedStr, []);
        }
        map.get(sortedStr).push(str);
    }
    return Array.from(map.values());
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

/**
 * No.128
 * @param {number[]} nums
 * @return {number}
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 */
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    const numSet = new Set(nums);
    let longestStreak = 0;
    for (const num of numSet) {
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }
    return longestStreak;
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));

/**
 * No.283
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 */
var moveZeroes = function(nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[index++] = nums[i];
        }
    }
    for (let i = index; i < nums.length; i++) {
        nums[i] = 0;
    }
    return nums;
};

/**
 * No.160
 * @param {ListNode} headA
 * @param {ListNode} headB
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
 * 图见：https://assets.leetcode.com/uploads/2018/12/13/160_statement.png
 */
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let pA = headA;
    let pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
};
