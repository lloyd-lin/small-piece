// 插入排序
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// 快速排序 (原始版本，非最优)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 快速排序 (Quick Sort - 优化后的原地排序版本)
function quickSortOptimized(arr) {
  // 调用递归辅助函数
  quickSortHelper(arr, 0, arr.length - 1);
  return arr; // 返回已排序的数组
}

// Quick Sort 的递归辅助函数
function quickSortHelper(arr, low, high) {
  // 基本情况：如果段只有 0 或 1 个元素，则它已经排序
  if (low < high) {
    // 对数组进行分区并获取枢轴索引
    const pivotIndex = partition(arr, low, high);

    // 递归地对枢轴之前的元素进行排序
    quickSortHelper(arr, low, pivotIndex - 1);
    // 递归地对枢轴之后的元素进行排序
    quickSortHelper(arr, pivotIndex + 1, high);
  }
}

// Lomuto 分区方案
// 围绕枢轴重新排列子数组 arr[low...high]
// 返回枢轴元素的最终索引
function partition(arr, low, high) {
  // 选择最后一个元素作为枢轴
  const pivot = arr[high];
  // 较小元素的索引
  let i = low - 1;

  // 遍历子数组（不包括枢轴）
  for (let j = low; j < high; j++) {
    // 如果当前元素小于或等于枢轴
    if (arr[j] <= pivot) {
      i++; // 增加较小元素的索引
      // 交换 arr[i] 和 arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 将枢轴元素 (arr[high]) 与 arr[i + 1] 处的元素交换
  // 这会将枢轴放置在其正确的排序位置
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  // 返回枢轴最终所在的索引
  return i + 1;
}

// 归并排序 (Merge Sort)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // 按顺序将值连接到 resultArray 中
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // 移动左数组游标
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // 移动右数组游标
    }
  }

  // 连接剩余的元素
  // (如果左/右数组仍有剩余元素)
  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}

// 堆排序 (Heap Sort)
function heapSort(arr) {
  let n = arr.length;

  // Build max heap (rearrange array)
  // Start from the last non-leaf node and heapify down
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root (max element) to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  return arr;
}

// To heapify a subtree rooted with node i which is an index in arr[]
// n is size of heap
function heapify(arr, n, i) {
  let largest = i; // 初始化 largest 作为根
  let left = 2 * i + 1; // 左子节点 = 2*i + 1
  let right = 2 * i + 2; // 右子节点 = 2*i + 2

  // 如果左子节点大于根
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // 如果右子节点大于目前为止最大的元素
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // 如果最大值不是根
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // 交换

    // 递归地堆化受影响的子树
    heapify(arr, n, largest);
  }
}

// 冒泡排序 (Bubble Sort - 优化版)
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    // 遍历数组，比较相邻元素
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // 如果元素顺序错误则交换
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true; // 标记发生了交换
      }
    }
    // 优化：如果在内层循环中没有元素被交换，
    // 则数组已经排序，可以提前退出。
    // 此外，每次遍历后最后一个元素保证在其正确位置，
    // 所以我们减少 n。
    n--;
  } while (swapped); // 只要发生交换就继续循环
  return arr;
}

// 选择排序 (Selection Sort)
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    // 假设未排序部分的第一个元素是最小值
    let minIndex = i;
    // 遍历未排序部分以找到真正的最小值
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 更新最小元素的索引
      }
    }
    // 将找到的最小元素与未排序部分的第一个元素交换
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}