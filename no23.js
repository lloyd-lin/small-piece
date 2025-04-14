// 23. 合并K个升序链表
// 给你一个链表数组，每个链表都已经按升序排列。

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。
// 示例 1：

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
//每次取出一层，需要临时记录一下下个链表头部，然后对这一层进行排序
var mergeKLists = function(lists) {
  // array - minHeap
  const minHeap = new Heap();
  const tempPtrArr = []
  const k = lists.length;
  // 遍历所有链表，将其中头指针放入堆中进行排序，每次取出第一个最小元素，如果该元素有next，将该元素next放入堆中，
  // 如果取出的元素已经没有next，则跳过这个环节，每次出去后，cur指针的next为出去的元素，直到取出元素next为空，
  // 整个堆也为空，则完成，返回头部。
  lists.forEach(head => {
    
  })
};

class Heap {
  constructor(arr = [], options = {
    minHeap = true,
    handle = {}
  }) {
    this.heapArr = arr
    this.minHeap = minHeap
    this.heapArr = arr
  }
  swap(l, r) {
    this.heapArr[l] = this.heapArr[l] ^ this.heapArr[r]
    this.heapArr[r] = this.heapArr[l] ^ this.heapArr[r]
    this.heapArr[l] = this.heapArr[l] ^ this.heapArr[r]
  }
  add(number) {
    this.heapArr.push(number)
    // 开始倒排
    if (this.minHeap) {
      let lastIndex = this.heapArr.length - 1;
      console.log(lastIndex)
      while (lastIndex > 0) {
        const now = lastIndex;
        const parent = Math.floor((lastIndex - 1) / 2)
        console.log(parent)
        if (this.heapArr[now] < this.heapArr[parent]) {
          this.swap(now, parent)
        }
        lastIndex = parent
      }
    } else {
      let lastIndex = this.heapArr.length - 1;
      while (lastIndex > 0) {
        const now = lastIndex;
        const parent = Math.floor((lastIndex - 1) / 2)
        if (this.heapArr[now] > this.heapArr[parent]) {
          this.swap(now, parent)
        }
        lastIndex = parent
      }
    }
    return this;
  }
  getTop() {
    const top = this.heapArr[0]
    // rebase
    this.swap(0, this.heapArr.length - 1)
    this.heapArr.length = this.heapArr.length - 1
    // 从头往下走，直到超出length
    if (this.minHeap) { // 选左右孩子较小的更换
      let lastIndex = 0;
      const maxLength = this.heapArr.length;
      while (lastIndex < maxLength) {
        const left = lastIndex * 2 + 1;
        const right = lastIndex * 2 + 2;
        if (this.heapArr[left] >= this.heapArr[right] &&
          this.heapArr[lastIndex] > this.heapArr[right]) {
            this.swap(right, lastIndex)
            lastIndex = right;
        } else if (this.heapArr[left] <= this.heapArr[right] &&
          this.heapArr[lastIndex] > this.heapArr[left]) {
            this.swap(left, lastIndex)
            lastIndex = left;
        } else {
          break;
        }
      }
    } else {
      let lastIndex = 0;
      const maxLength = this.heapArr.length;
      while (lastIndex < maxLength) {
        const left = lastIndex * 2 + 1;
        const right = lastIndex * 2 + 2;
        if (this.heapArr[left] >= this.heapArr[right] &&
          this.heapArr[left] > this.heapArr[lastIndex]) {
            this.swap(left, lastIndex)
            lastIndex = left;
        } else if (this.heapArr[left] <= this.heapArr[right] &&
          this.heapArr[lastIndex] < this.heapArr[right]) {
            this.swap(right, lastIndex)
            lastIndex = right;
        } else {
          break;
        }
      }
    }
    return top
  }
  get() {
    return this.heapArr;
  }
}
/**
 *     1
 *    / \
 *   4   7
 *  / \ / \
 * 5  9 15 |20|
 */
//[1,4,7,5,9,15,|20|]
// 0 1 2 3 4 5  6

/**
 *      5
 *     1, 1
 *  -1 
 */