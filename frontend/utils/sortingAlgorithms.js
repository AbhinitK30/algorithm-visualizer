export const algorithms = [
    {
      value: "bubble",
      label: "Bubble Sort",
      description:
        "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      best: "O(n)",
      worst: "O(n²)",
    },
    {
      value: "selection",
      label: "Selection Sort",
      description:
        "Selection Sort repeatedly selects the minimum element from the unsorted part and moves it to the sorted part.",
      best: "O(n²)",
      worst: "O(n²)",
    },
    {
      value: "insertion",
      label: "Insertion Sort",
      description:
        "Insertion Sort builds the sorted array one item at a time by repeatedly inserting the next element into the correct position.",
      best: "O(n)",
      worst: "O(n²)",
    },
    {
      value: "quick",
      label: "Quick Sort",
      description: "Quick Sort picks a pivot and partitions the array into two subarrays, then recursively sorts them.",
      best: "O(n log n)",
      worst: "O(n²)",
    },
    {
      value: "merge",
      label: "Merge Sort",
      description: "Merge Sort divides the array into halves, sorts them recursively, and then merges the sorted halves.",
      best: "O(n log n)",
      worst: "O(n log n)",
    },
    {
      value: "heap",
      label: "Heap Sort",
      description:
        "Heap Sort builds a heap from the array and repeatedly extracts the maximum element to build the sorted array.",
      best: "O(n log n)",
      worst: "O(n log n)",
    },
    {
      value: "bucket",
      label: "Bucket Sort",
      description: "Bucket Sort distributes elements into buckets, sorts each bucket, and then concatenates them.",
      best: "O(n + k)",
      worst: "O(n²)",
    },
  ]
  
  function getBubbleSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    const n = a.length
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({ type: "compare", indices: [j, j + 1], array: a.slice() })
        if (a[j] > a[j + 1]) {
          ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
          steps.push({ type: "swap", indices: [j, j + 1], array: a.slice() })
        }
      }
    }
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  function getSelectionSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    const n = a.length
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      for (let j = i + 1; j < n; j++) {
        steps.push({ type: "compare", indices: [minIdx, j], array: a.slice() })
        if (a[j] < a[minIdx]) minIdx = j
      }
      if (minIdx !== i) {
        ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
        steps.push({ type: "swap", indices: [i, minIdx], array: a.slice() })
      }
    }
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  function getInsertionSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    const n = a.length
    for (let i = 1; i < n; i++) {
      let j = i
      while (j > 0) {
        steps.push({ type: "compare", indices: [j, j - 1], array: a.slice() })
        if (a[j] < a[j - 1]) {
          ;[a[j], a[j - 1]] = [a[j - 1], a[j]]
          steps.push({ type: "swap", indices: [j, j - 1], array: a.slice() })
          j--
        } else {
          break
        }
      }
    }
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  function getQuickSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    function quickSort(l, r) {
      if (l >= r) return
      const pivot = a[r]
      let i = l
      for (let j = l; j < r; j++) {
        steps.push({ type: "compare", indices: [j, r], array: a.slice() })
        if (a[j] < pivot) {
          ;[a[i], a[j]] = [a[j], a[i]]
          steps.push({ type: "swap", indices: [i, j], array: a.slice() })
          i++
        }
      }
      ;[a[i], a[r]] = [a[r], a[i]]
      steps.push({ type: "swap", indices: [i, r], array: a.slice() })
      quickSort(l, i - 1)
      quickSort(i + 1, r)
    }
    quickSort(0, a.length - 1)
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  function getMergeSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    function mergeSort(l, r) {
      if (l >= r) return
      const m = Math.floor((l + r) / 2)
      mergeSort(l, m)
      mergeSort(m + 1, r)
      const left = a.slice(l, m + 1)
      const right = a.slice(m + 1, r + 1)
      let i = 0,
        j = 0,
        k = l
      while (i < left.length && j < right.length) {
        steps.push({ type: "compare", indices: [l + i, m + 1 + j], array: a.slice() })
        if (left[i] <= right[j]) {
          a[k++] = left[i++]
        } else {
          a[k++] = right[j++]
        }
        steps.push({ type: "merge", indices: [k - 1], array: a.slice() })
      }
      while (i < left.length) {
        a[k++] = left[i++]
        steps.push({ type: "merge", indices: [k - 1], array: a.slice() })
      }
      while (j < right.length) {
        a[k++] = right[j++]
        steps.push({ type: "merge", indices: [k - 1], array: a.slice() })
      }
    }
    mergeSort(0, a.length - 1)
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  function getHeapSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    const n = a.length
    function heapify(n, i) {
      let largest = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < n) steps.push({ type: "compare", indices: [l, largest], array: a.slice() })
      if (l < n && a[l] > a[largest]) largest = l
      if (r < n) steps.push({ type: "compare", indices: [r, largest], array: a.slice() })
      if (r < n && a[r] > a[largest]) largest = r
      if (largest !== i) {
        ;[a[i], a[largest]] = [a[largest], a[i]]
        steps.push({ type: "swap", indices: [i, largest], array: a.slice() })
        heapify(n, largest)
      }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i)
    for (let i = n - 1; i > 0; i--) {
      ;[a[0], a[i]] = [a[i], a[0]]
      steps.push({ type: "swap", indices: [0, i], array: a.slice() })
      heapify(i, 0)
    }
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  function getBucketSortSteps(arr) {
    const steps = []
    const a = arr.slice()
    const n = a.length
    const max = Math.max(...a)
    const size = Math.floor(max / n) + 1
    const buckets = Array.from({ length: n }, () => [])
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(a[i] / size)
      buckets[idx].push(a[i])
      steps.push({ type: "bucket", indices: [i], array: a.slice(), bucket: idx })
    }
    let k = 0
    for (let b = 0; b < n; b++) {
      buckets[b].sort((x, y) => x - y)
      for (const v of buckets[b]) {
        a[k++] = v
        steps.push({ type: "collect", indices: [k - 1], array: a.slice(), bucket: b })
      }
    }
    steps.push({ type: "done", array: a.slice() })
    return steps
  }
  
  export function getSteps(algo, arr) {
    switch (algo) {
      case "bubble":
        return getBubbleSortSteps(arr)
      case "selection":
        return getSelectionSortSteps(arr)
      case "insertion":
        return getInsertionSortSteps(arr)
      case "quick":
        return getQuickSortSteps(arr)
      case "merge":
        return getMergeSortSteps(arr)
      case "heap":
        return getHeapSortSteps(arr)
      case "bucket":
        return getBucketSortSteps(arr)
      default:
        return getBubbleSortSteps(arr)
    }
  }
  