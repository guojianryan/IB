export const topic = {
  id: "B2.4",
  title: "Programming algorithms",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "An algorithm is a precise method for a job. This page measures how the work grows as the data grows, then builds a linear search, a binary search, a bubble sort and a selection sort. Recursion is HL only. The examples are Python 3.",
  chips: ["B2.4", "SL and HL", "Python 3", "Recursion is HL"],
  mapTitle: "The statements in B2.4",
  mapLede: "The first three statements are for SL and HL. B2.4.4 and B2.4.5 are HL only. The programming you must be able to trace for recursion is the simple, non-branching form.",
  map: [
    ["#efficiency", "B2.4.1", "Efficiency and Big O", "Time and space as the input grows, and choosing an algorithm because of that growth."],
    ["#search", "B2.4.2", "Linear and binary search", "Find a value by checking each item, or by halving a sorted list."],
    ["#sort", "B2.4.3", "Bubble sort and selection sort", "Bubble sort stops when a pass swaps nothing. Selection sort always finishes its passes."],
    ["#recursion", "B2.4.4 · HL", "Recursion", "A base case, a smaller call, and CompSimu for factorial and Fibonacci."],
    ["#trace", "B2.4.5 · HL", "Trace a recursive algorithm", "Simple algorithms with one recursive call, traced call by call. Factorial on CompSimu."],
  ],
  sections: [
    {
      id: "efficiency",
      nav: "Efficiency",
      kicker: "B2.4.1 · Describe efficiency by calculating Big O",
      title: "How the work grows when the data grows",
      lede: "Big O describes the shape of the cost as the number of items, n, becomes large. It is used for time, how many steps the algorithm takes, and for space, how much extra memory it needs.",
      blocks: [
        {
          type: "pair",
          able: [
            "Classify a short algorithm as O(1), O(log n), O(n) or O(n²).",
            "Separate the time cost from the extra memory.",
            "Choose between two algorithms when n is small and when n is large.",
          ],
          notes: [
            "Constants and lower terms are dropped. 3n + 5 is O(n).",
            "A loop inside a loop over the same data is the usual source of O(n²).",
            "Halving the remaining data on each step is the usual source of O(log n).",
          ],
        },
        { type: "p", text: "Count the steps that depend on n, then keep the term that grows fastest. A fixed number of steps, such as reading `items[0]`, does not depend on n, so it is O(1). One pass through the items is O(n). A pass inside a pass, each of them running about n times, is O(n²). If each step throws away half of the remaining items, the number of steps is the number of times n can be halved, which is O(log n)." },
        {
          type: "table",
          title: "Growth worth recognising",
          head: ["Big O", "The pattern", "An example on this page"],
          rows: [
            ["O(1)", "A fixed amount of work", "Reading one index. peek on a stack"],
            ["O(log n)", "The remaining problem is halved", "Binary search on a sorted list"],
            ["O(n)", "One pass through the items", "Linear search. Bubble sort, when a pass makes no swap and it stops"],
            ["O(n²)", "A loop nested inside a loop over the items", "Selection sort. Bubble sort, when later passes still have swaps"],
          ],
        },
        { type: "p", text: "Space is counted the same way, for the extra memory beyond the input itself. A handful of index variables is O(1) extra space. A second list that holds a copy of every item is O(n) extra space. The sorts on this page rearrange the list they are given, so their extra space is O(1). The searches only remember a few indexes, so their extra space is also O(1)." },
        { type: "p", text: "The choice depends on n and on what the data allows. For 20 names, a simple O(n²) sort is clear and fast enough. For a million names, that same shape of growth dominates, and an algorithm with a slower-growing cost is worth the extra care. A binary search is only available when the list is sorted. If it is not, the linear search is the method that still works." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "State the Big O and the reason in one sentence: \"one loop from 0 to n − 1, so O(n)\" or \"a loop inside a loop, so O(n²)\". Dropping the reason and writing only the notation does not show the calculation." },
      ],
    },
    {
      id: "search",
      nav: "Search",
      kicker: "B2.4.2 · Construct and trace linear search and binary search",
      title: "Look at every item, or halve the sorted list",
      lede: "A linear search checks items one by one until it finds the target or runs out of items. A binary search is only correct on a sorted list. It compares the target with the middle item and discards half of what remains.",
      blocks: [
        {
          type: "pair",
          able: [
            "Write and trace both searches, including a search that fails.",
            "Give the time and space cost of each.",
            "Choose one from a description of the data.",
          ],
          notes: [
            "Linear search does not need the list to be sorted.",
            "Binary search gives a wrong answer on an unsorted list. It does not raise an error.",
            "Both versions here return the index, or −1 when the target is absent.",
          ],
        },
        {
          type: "code",
          title: "Linear search",
          source: `def linear_search(items, target):
    for index in range(len(items)):
        if items[index] == target:
            return index
    return -1

names = ["Noor", "Mei", "Ali", "Sam"]
print(linear_search(names, "Ali"))  # 2
print(linear_search(names, "Jo"))   # -1`,
          caption: "The loop looks at index 0, then 1, then 2. Ali matches at index 2, so the function returns immediately. Jo matches nothing, so the function returns −1 after the loop. Time is O(n). Extra space is O(1).",
        },
        { type: "p", text: "The simulation scans the list one item at a time. You can step forward and back, and watch the comparison that accepts or rejects each item." },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/linear-search/index.html", label: "Linear search on CompSimu" },
        { type: "p", text: "Binary search keeps a low index and a high index. The range still to be searched runs from low to high inclusive. The middle index is `(low + high) // 2`. Integer division is required: the index has to be a whole number. If the middle item is too small, the target can only be to the right, so low becomes mid + 1. If the middle item is too large, high becomes mid − 1. If low passes high, the target is not in the list." },
        {
          type: "code",
          title: "Binary search on a sorted list",
          source: `def binary_search(items, target):
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

values = [2, 5, 8, 12, 16, 23, 38]
print(binary_search(values, 16))  # 4
print(binary_search(values, 7))   # -1`,
          caption: "The list must be sorted. Each pass discards half of the remaining range, so the time is O(log n). The only extra memory is low, high and mid, so the extra space is O(1).",
        },
        {
          type: "table",
          title: "Trace of binary_search(values, 16)",
          head: ["low", "high", "mid", "values[mid]", "Decision"],
          rows: [
            ["0", "6", "3", "12", "12 < 16, so low becomes 4"],
            ["4", "6", "5", "23", "23 > 16, so high becomes 4"],
            ["4", "4", "4", "16", "Equal, so return 4"],
          ],
        },
        { type: "p", text: "The simulation moves low, mid and high in the same way as the trace table." },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/binary-search/index.html", label: "Binary search on CompSimu" },
        { type: "p", text: "Use a linear search when the data is unsorted, or when n is so small that the simpler loop is the clearer program. Use a binary search when the data is kept sorted and n is large enough for halving to matter. A directory of names, kept in order, is a binary search if you have the name and want the phone number. Searching that same directory by the phone number is a linear search, unless a second structure is sorted by number. Running binary search on the unsorted number order can return −1 for a number that is present, or return the wrong index. The algorithm assumes the order. It does not check it." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Say sorted or unsorted before you name the search. A trace of binary search needs a row for low, high and mid. The answer is the index, unless the question asks for the value. −1 means not found. It is not a position in the list." },
      ],
    },
    {
      id: "sort",
      nav: "Sort",
      kicker: "B2.4.3 · Construct and trace bubble sort and selection sort",
      title: "Two ways to put a list in order",
      lede: "Bubble sort swaps neighbours that are out of order, and stops when a pass makes no swap. Selection sort finds the smallest remaining item and places it in its final position. Both use O(1) extra space. Selection sort takes O(n²) time. Bubble sort takes O(n²) time in the worst case, and O(n) time when it finds the list already sorted.",
      blocks: [
        {
          type: "pair",
          able: [
            "Trace one pass of each sort and the list after that pass.",
            "State the time and extra space of each.",
            "Compare the number of swaps the two algorithms do.",
          ],
          notes: [
            "These versions rearrange the list they are given.",
            "Bubble sort swaps neighbours, and stops when a pass swaps nothing.",
            "Neither needs the list to be sorted already. Both leave it sorted.",
          ],
        },
        { type: "p", text: "Bubble sort walks along the list comparing each pair of neighbours. When a pair is out of order, the two items are swapped. After the first pass, the largest item has bubbled to the end, so the next pass can stop one item earlier. A flag records whether the current pass swapped anything. If the flag is still false at the end of a pass, the list is sorted, and the algorithm stops. It does not run the remaining passes." },
        { type: "p", text: "On a reversed list the flag stays true for many passes, and the time is O(n²). On a list that is already sorted, the first pass makes no swap and the sort stops after that one pass. That best case is O(n). The same stop happens in the middle of a sort: once any pass swaps nothing, the items that remain are in order." },
        {
          type: "code",
          title: "Bubble sort stops when a pass swaps nothing",
          source: `def bubble_sort(items):
    n = len(items)
    passes = 0
    for pass_num in range(n - 1):
        swapped = False
        passes = passes + 1
        for i in range(n - 1 - pass_num):
            if items[i] > items[i + 1]:
                items[i], items[i + 1] = items[i + 1], items[i]
                swapped = True
        if not swapped:
            break
    return items, passes

print(bubble_sort([4, 2, 5, 1]))  # ([1, 2, 4, 5], 3)
print(bubble_sort([2, 1, 3, 4]))  # ([1, 2, 3, 4], 2)
print(bubble_sort([1, 2, 4, 5]))  # ([1, 2, 4, 5], 1)`,
          caption: "The second value is the number of passes. [4, 2, 5, 1] swaps on every pass, so it uses all three. [2, 1, 3, 4] is sorted after the first pass, so the second pass swaps nothing and the sort stops. [1, 2, 4, 5] stops after one pass. Extra space is still O(1).",
        },
        {
          type: "table",
          title: "Bubble sort of [4, 2, 5, 1]",
          head: ["After this pass", "List", "What the pass did"],
          rows: [
            ["Start", "4, 2, 5, 1", ""],
            ["Pass 1", "2, 4, 1, 5", "5 bubbled to the end"],
            ["Pass 2", "2, 1, 4, 5", "4 moved into place"],
            ["Pass 3", "1, 2, 4, 5", "2 and 1 swapped"],
          ],
        },
        { type: "p", text: "Every pass in that trace swapped, so the flag did not stop it early. The second and third calls in the listing stop before the last possible pass." },
        { type: "p", text: "The simulation uses the same swapped flag, and it stops when a pass changes nothing." },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/bubble-sort/index.html", label: "Bubble sort on CompSimu" },
        { type: "p", text: "Selection sort also uses a loop inside a loop, so its time is O(n²), including when the list is already sorted. It has no flag that can end the sort early. The inner loop only searches. It remembers the index of the smallest item from the unsorted part. The outer loop then swaps that item into position i, at most once per pass. The extra space is O(1)." },
        {
          type: "code",
          title: "Selection sort",
          source: `def selection_sort(items):
    n = len(items)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if items[j] < items[min_index]:
                min_index = j
        items[i], items[min_index] = items[min_index], items[i]
    return items

data = [4, 2, 5, 1]
print(selection_sort(data))  # [1, 2, 4, 5]`,
          caption: "The inner loop does not swap. It only updates min_index. One swap at the end of the pass puts the smallest remaining item into place.",
        },
        {
          type: "table",
          title: "Selection sort of [4, 2, 5, 1]",
          head: ["i", "min_index found", "List after the swap"],
          rows: [
            ["0", "3, the value 1", "1, 2, 5, 4"],
            ["1", "1, the value 2", "1, 2, 5, 4"],
            ["2", "3, the value 4", "1, 2, 4, 5"],
          ],
        },
        { type: "p", text: "The simulation finds the minimum of the unsorted part, then swaps it into place on the left." },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/selection-sort/index.html", label: "Selection sort on CompSimu" },
        { type: "p", text: "The practical difference is the swaps, and bubble sort's early stop. Bubble sort can swap on every comparison, so a reversed list swaps a lot and still takes O(n²) time. Selection sort swaps at most once per pass, which matters if writing an item is expensive, and it still scans every remaining item when the list is sorted. Bubble sort is the easier one to trace, because each change is a neighbour swap. For a large list that is not already sorted, both lose to an algorithm whose time grows more slowly. Quicksort, in the HL section, is one of those." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Selection sort stays O(n²) even on a sorted list, because the shorter passes still add up to a multiple of n². Bubble sort is O(n²) in the worst case. It is O(n) only when a pass makes no swap and the sort stops. Extra space is O(1) for these in-place versions. A version that first copies the list into a new list spends O(n) extra space on that copy." },
      ],
    },
    {
      id: "recursion",
      nav: "Recursion",
      kicker: "B2.4.4 · HL · Explain recursion and where it is used",
      title: "A function that calls itself on a smaller problem",
      lede: "Recursion solves a problem by solving a smaller version of the same problem. The function must have a base case that stops the calls, and a recursive case that moves toward that base case. This statement is HL only.",
      blocks: [
        {
          type: "pair",
          able: [
            "Identify the base case and the recursive case.",
            "Give one advantage and one limit of recursion.",
            "Explain why quicksort is a recursive algorithm.",
          ],
          notes: [
            "Each call waits while the smaller call runs.",
            "The calls are stored on a stack. That stack is extra memory.",
            "B2.4.5 asks you to write the simple form, with one recursive call.",
          ],
        },
        { type: "p", text: "Open the CompSimu simulations first. Factorial shows the call stack for one recursive call. Fibonacci shows a branching call tree that repeats work." },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/recursive-factorial/index.html", label: "Recursive factorial on CompSimu" },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/recursive-fibonacci/index.html", label: "Recursive Fibonacci on CompSimu" },
        { type: "p", text: "The base case is a problem small enough to answer directly. For a factorial, that is 0, and the answer is 1. The recursive case writes the original problem using a smaller one: n! is n times (n − 1)!. Each call reduces n, so the calls reach 0. Without a base case, or if the smaller problem does not get closer to it, the calls never stop. Python then raises RecursionError, because the call stack has a limit." },
        { type: "p", text: "The advantage is fit. Some problems are already described as a smaller copy of themselves: the folders inside a folder, the left and right sides of a range, a picture made of smaller copies of the same picture. A recursive function can follow that description directly. Traversing a binary tree, drawing a fractal, and a sort that splits the data are the situations the syllabus names." },
        { type: "p", text: "The limits are memory and the ease of getting the cost wrong. Every unfinished call keeps its own variables until the smaller call returns. A chain of n calls uses O(n) stack space, even when the final answer is a single number. A recursive idea can also do far more work than it looks. A function that computes a term by calling itself twice, once for each previous term, repeats a huge amount of work. The call tree grows much faster than n. Recursive Fibonacci is that branching pattern." },
        { type: "p", text: "Quicksort is the standard recursive sort. Choose a pivot. Partition the other items into those less than or equal to the pivot and those greater than it. Those two parts are smaller versions of the same sorting problem, so the function calls itself on each part, then joins the sorted lower part, the pivot, and the sorted upper part. The two calls make it a branching recursion. The version below also builds new lists, so it uses O(n) extra space, unlike the in-place bubble and selection sorts. On typical data the depth of the calls is much smaller than n² comparisons. The worst case, where the pivot is always the smallest or largest item, degrades toward O(n²) time and a deep stack." },
        {
          type: "code",
          title: "Quicksort, a branching recursion",
          source: `def quicksort(items):
    if len(items) <= 1:
        return items
    pivot = items[0]
    below = [item for item in items[1:] if item <= pivot]
    above = [item for item in items[1:] if item > pivot]
    return quicksort(below) + [pivot] + quicksort(above)

print(quicksort([4, 2, 5, 1]))  # [1, 2, 4, 5]`,
          caption: "The base case is a list of length 0 or 1. Each call sorts two smaller lists. For [4, 2, 5, 1] the pivot is 4, below is [2, 1] and above is [5]. This is the idea of quicksort. The algorithms to construct and trace in B2.4.5 have only one recursive call.",
        },
        { type: "callout", kind: "note", label: "HL", text: "SL answers do not need this section. HL answers should name the base case, say how each call gets smaller, and mention the stack as the memory cost." },
      ],
    },
    {
      id: "trace",
      nav: "Tracing",
      kicker: "B2.4.5 · HL · Construct and trace simple recursive algorithms",
      title: "One recursive call, traced until the base case",
      lede: "The programming requirement is a simple, non-branching recursion: each call makes at most one recursive call. Factorial and the sum of a list are that form. This statement is HL only.",
      blocks: [
        {
          type: "pair",
          able: [
            "Write a non-branching recursive function with a base case.",
            "Trace the calls down to the base case and the returns back up.",
            "Say what happens when the base case is missing.",
          ],
          notes: [
            "Going down, each call waits.",
            "Coming back, each waiting call finishes its arithmetic.",
            "Quicksort does not belong in this exercise. It makes two calls.",
          ],
        },
        { type: "p", text: "Use the factorial simulation while you read the trace. It pushes each call onto the stack, hits the base case, then unwinds with the return values." },
        { type: "more", prominent: true, external: true, href: "https://guojianryan.github.io/CompSimu/simulations/recursive-factorial/index.html", label: "Recursive factorial on CompSimu" },
        {
          type: "code",
          title: "Factorial with one recursive call",
          source: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(4))  # 24`,
          caption: "factorial(4) waits for factorial(3), which waits for factorial(2), then 1, then 0. factorial(0) returns 1. The waiting calls then multiply, and the result is 24.",
        },
        {
          type: "table",
          title: "Trace of factorial(4)",
          head: ["Call", "Waiting to compute", "Returns"],
          rows: [
            ["factorial(4)", "4 * factorial(3)", "24"],
            ["factorial(3)", "3 * factorial(2)", "6"],
            ["factorial(2)", "2 * factorial(1)", "2"],
            ["factorial(1)", "1 * factorial(0)", "1"],
            ["factorial(0)", "base case", "1"],
          ],
        },
        { type: "p", text: "Read the trace downwards for the calls and upwards for the arithmetic. Nothing multiplies until factorial(0) has returned. That is why a missing base case never produces a partial answer. The calls keep going until the stack runs out." },
        {
          type: "code",
          title: "The sum of a list, again with one recursive call",
          source: `def sum_list(items):
    if items == []:
        return 0
    return items[0] + sum_list(items[1:])

print(sum_list([3, 1, 4]))  # 8

def never_stops(n):
    return never_stops(n - 1)

try:
    never_stops(3)
except RecursionError:
    print("RecursionError")`,
          caption: "sum_list([3, 1, 4]) is 3 plus the sum of [1, 4]. The empty list returns 0, and the additions on the way back make 8. never_stops has no base case, so the calls do not end and Python raises RecursionError.",
        },
        { type: "p", text: "These two functions are the pattern to construct. The argument gets smaller in a way you can point at: n becomes n − 1, or the list loses its first item. There is one recursive call. The base case returns a value that needs no further call. A trace lists every call until that base case, then the value each call returns." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "A trace that only writes the final 24 has skipped the marks for the calls. Show the chain down to the base case and at least one multiplication on the way back. If the question says simple or non-branching, do not answer with quicksort." },
        { type: "more", href: "b2-5-file-processing.html", label: "B2.5 File processing" },
      ],
    },
  ],
  mcqs: [
    {
      q: "A function has a loop, and inside that loop another loop runs once for each of the n items. What is the time complexity?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 3,
      why: "A loop inside a loop over the same collection does about n times n steps. O(n) would be a single pass. The nested structure is the part that makes it O(n²).",
    },
    {
      q: "A list of names is unsorted. Which search is the one that is guaranteed to find a name that is present?",
      options: [
        "Binary search, because it is faster",
        "Linear search, because it checks every item and does not assume an order",
        "Either, because both return −1 only when the name is absent",
        "Binary search after you reverse the list",
      ],
      answer: 1,
      why: "Binary search discards half of the list on the assumption that everything on one side of the middle is too small or too large. That assumption is false when the list is unsorted, so it can miss a name that is present. Reversing an unsorted list does not sort it.",
    },
    {
      q: "During one pass of selection sort, how many swaps place the next item into its position?",
      options: [
        "One swap after the smallest remaining item has been found",
        "A swap for every comparison, as in bubble sort",
        "No swaps. The list is copied to a new list",
        "n swaps, one for each item in the list",
      ],
      answer: 0,
      why: "The inner loop only remembers the index of the smallest remaining item. The outer loop swaps once. Bubble sort is the algorithm that swaps neighbours during the comparisons. The tempting second option describes bubble sort.",
    },
    {
      q: "factorial(n) returns n * factorial(n - 1), and factorial(0) returns 1. Which statement describes the trace of factorial(4)?",
      options: [
        "It makes two recursive calls, like quicksort",
        "It calls down to factorial(0), then multiplies on the way back, and the result is 24",
        "It multiplies 4 * 3 * 2 * 1 before any call returns",
        "It never reaches a base case",
      ],
      answer: 1,
      why: "There is one recursive call, so this is the non-branching form. The multiplications happen as the calls return, starting from factorial(0) returning 1. They do not happen before the base case is reached.",
    },
  ],
  checks: [
    "Calculate a Big O for a single loop and for a nested loop, and say what was dropped.",
    "State the time and extra space of linear search and of binary search.",
    "Trace a binary search, with low, high and mid, including a target that is absent.",
    "Explain when a phone-number lookup is linear and when a name lookup can be binary.",
    "Trace one pass of bubble sort and one pass of selection sort on the same list.",
    "Compare the two sorts on time, extra space, and how often they swap.",
    "HL: identify the base case and the recursive case, and describe the stack cost.",
    "HL: trace a non-branching recursive function down to the base case and back.",
  ],
};
