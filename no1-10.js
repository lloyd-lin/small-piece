/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 链表节点的构造函数
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // 创建一个虚拟头节点
    let dummyHead = new ListNode(0);
    let current = dummyHead;
    let carry = 0; // 进位

    // 当l1或l2还有节点，或者还有进位时，继续循环
    while (l1 !== null || l2 !== null || carry !== 0) {
        // 获取l1和l2当前节点的值，如果节点为空则值为0
        const x = l1 ? l1.val : 0;
        const y = l2 ? l2.val : 0;
        
        // 计算当前位的和（包括进位）
        const sum = x + y + carry;
        
        // 计算新的进位
        carry = Math.floor(sum / 10);
        
        // 创建新节点，值为sum的个位数
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        // 移动l1和l2的指针
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummyHead.next;
};

// 测试用例
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function printLinkedList(head) {
    let values = [];
    while (head !== null) {
        values.push(head.val);
        head = head.next;
    }
    console.log(values.join(' -> '));
}

// 测试代码
const l1 = createLinkedList([2, 4, 3]);
const l2 = createLinkedList([5, 6, 4]);
console.log("Input:");
console.log("l1 = ");
printLinkedList(l1);
console.log("l2 = ");
printLinkedList(l2);
console.log("Output:");
const result = addTwoNumbers(l1, l2);
printLinkedList(result);

/**
 * LeetCode 3. Longest Substring Without Repeating Characters
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 使用滑动窗口和哈希集合来跟踪字符
    let maxLength = 0;
    let left = 0;
    let charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        // 如果当前字符已经在集合中，移动左指针直到移除重复字符
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        // 添加当前字符到集合
        charSet.add(s[right]);
        
        // 更新最大长度
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
};

// 测试用例
console.log("\nLeetCode 3. Longest Substring Without Repeating Characters");
console.log("Test Case 1: 'abcabcbb'");
console.log("Expected: 3, Actual:", lengthOfLongestSubstring('abcabcbb'));

console.log("Test Case 2: 'bbbbb'");
console.log("Expected: 1, Actual:", lengthOfLongestSubstring('bbbbb'));

console.log("Test Case 3: 'pwwkew'");
console.log("Expected: 3, Actual:", lengthOfLongestSubstring('pwwkew'));

console.log("Test Case 4: ''");
console.log("Expected: 0, Actual:", lengthOfLongestSubstring(''));

console.log("Test Case 5: 'dvdf'");
console.log("Expected: 3, Actual:", lengthOfLongestSubstring('dvdf')); 

// ... existing code ...

/**
 * LeetCode 4. Median of Two Sorted Arrays
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // 确保nums1是较短的数组
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    const half = Math.floor((total + 1) / 2);
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const i = Math.floor((left + right) / 2);
        const j = half - i;
        
        const left1 = i === 0 ? -Infinity : nums1[i - 1];
        const right1 = i === m ? Infinity : nums1[i];
        const left2 = j === 0 ? -Infinity : nums2[j - 1];
        const right2 = j === n ? Infinity : nums2[j];
        
        if (left1 <= right2 && left2 <= right1) {
            if (total % 2 === 0) {
                return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
            } else {
                return Math.max(left1, left2);
            }
        } else if (left1 > right2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    
    return 0;
};

/**
 * LeetCode 5. Longest Palindromic Substring
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let start = 0;
    let maxLength = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const currentLength = right - left + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                start = left;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // 奇数长度
        expandAroundCenter(i, i + 1); // 偶数长度
    }
    
    return s.substring(start, start + maxLength);
};

/**
 * LeetCode 6. Zigzag Conversion
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) return s;
    
    const rows = new Array(numRows).fill('');
    let currentRow = 0;
    let goingDown = false;
    
    for (const char of s) {
        rows[currentRow] += char;
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }
        currentRow += goingDown ? 1 : -1;
    }
    
    return rows.join('');
};

/**
 * LeetCode 7. Reverse Integer
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const isNegative = x < 0;
    x = Math.abs(x);
    let reversed = 0;
    
    while (x > 0) {
        const digit = x % 10;
        reversed = reversed * 10 + digit;
        x = Math.floor(x / 10);
    }
    
    if (reversed > Math.pow(2, 31) - 1) return 0;
    return isNegative ? -reversed : reversed;
};

/**
 * LeetCode 8. String to Integer (atoi)
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    s = s.trim();
    if (!s) return 0;
    
    let sign = 1;
    let i = 0;
    let result = 0;
    
    if (s[i] === '+' || s[i] === '-') {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    
    while (i < s.length && /^\d$/.test(s[i])) {
        result = result * 10 + parseInt(s[i]);
        i++;
    }
    
    result *= sign;
    result = Math.max(Math.min(result, Math.pow(2, 31) - 1), -Math.pow(2, 31));
    return result;
};

/**
 * LeetCode 9. Palindrome Number
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) return false;
    if (x < 10) return true;
    
    let original = x;
    let reversed = 0;
    
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    return original === reversed;
};

/**
 * LeetCode 10. Regular Expression Matching
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    dp[0][0] = true;
    
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }
    
    return dp[m][n];
};

// 测试用例
console.log("\nLeetCode 4. Median of Two Sorted Arrays");
console.log("Test Case 1: [1,3], [2]");
console.log("Expected: 2, Actual:", findMedianSortedArrays([1,3], [2]));

console.log("\nLeetCode 5. Longest Palindromic Substring");
console.log("Test Case 1: 'babad'");
console.log("Expected: 'bab' or 'aba', Actual:", longestPalindrome('babad'));

console.log("\nLeetCode 6. Zigzag Conversion");
console.log("Test Case 1: 'PAYPALISHIRING', 3");
console.log("Expected: 'PAHNAPLSIIGYIR', Actual:", convert('PAYPALISHIRING', 3));

console.log("\nLeetCode 7. Reverse Integer");
console.log("Test Case 1: 123");
console.log("Expected: 321, Actual:", reverse(123));

console.log("\nLeetCode 8. String to Integer (atoi)");
console.log("Test Case 1: '42'");
console.log("Expected: 42, Actual:", myAtoi('42'));

console.log("\nLeetCode 9. Palindrome Number");
console.log("Test Case 1: 121");
console.log("Expected: true, Actual:", isPalindrome(121));

console.log("\nLeetCode 10. Regular Expression Matching");
console.log("Test Case 1: 'aa', 'a*'");
console.log("Expected: true, Actual:", isMatch('aa', 'a*'));