export const topic = {
  id: "B2.2",
  title: "Data structures",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "A data structure is a way of organising values so a program can store them and reach them. This page compares fixed and resizable storage, then builds lists, a stack and a queue. The examples are Python 3.",
  chips: ["B2.2", "SL and HL", "Python 3"],
  mapTitle: "The four statements in B2.2",
  mapLede: "All four statements are for SL and HL. Stacks and queues here are the programming idea. The abstract-data-type treatment of them is HL work in B4.",
  map: [
    ["#static", "B2.2.1", "Static and dynamic", "Fixed memory compared with storage that can grow, including speed, memory and flexibility."],
    ["#lists", "B2.2.2", "Arrays and lists", "One-dimensional and two-dimensional collections, and adding, removing and traversing elements."],
    ["#stacks", "B2.2.3", "Stacks", "Last in, first out: push, pop, peek and isEmpty."],
    ["#queues", "B2.2.4", "Queues", "First in, first out: enqueue, dequeue, front and isEmpty."],
  ],
  sections: [
    {
      id: "static",
      nav: "Static",
      kicker: "B2.2.1 · Compare static and dynamic data structures",
      title: "Fixed storage, or storage that can grow",
      lede: "A static data structure is given its size when it is created. A dynamic data structure can change size as items are added and removed. The difference is how memory is allocated.",
      blocks: [
        {
          type: "pair",
          able: [
            "Explain how a static structure and a dynamic structure get their memory.",
            "Compare them for speed of access, memory use and flexibility.",
            "Choose one of them for a described problem.",
          ],
          notes: [
            "A list can grow. Used as a fixed array, it only has its existing slots replaced.",
            "Index access is fast for both once the item is stored.",
            "Growing a dynamic structure sometimes means copying the items into a larger block.",
          ],
        },
        { type: "p", text: "When a static structure is created, the program asks for a block of memory big enough for the number of slots it declared. That number does not change. A slot can receive a new value, but the program cannot add a slot. If the problem needs more items than the declared size, the structure is full. If it needs fewer, some slots stay empty and the memory is still reserved." },
        { type: "p", text: "A dynamic structure starts with some capacity and can request a larger block when that capacity is used up. The items are copied into the new block, and the old block can be reused by the system. Removing items can later allow the capacity to shrink. The program does not have to know the final number of items when it starts." },
        {
          type: "table",
          title: "Static and dynamic structures",
          head: ["", "Static", "Dynamic"],
          rows: [
            ["Size", "Fixed when it is created", "Can grow and shrink"],
            ["Memory", "Allocated once, including unused slots", "Allocated as the data grows, with some spare capacity"],
            ["Access by index", "Direct, and fast", "Direct, and fast, in an array-backed list"],
            ["Adding an item past the end", "Not possible without a new, larger structure", "Possible. Occasionally the items are copied to a larger block"],
            ["Best fit", "The number of items is known and stable", "The number of items changes, or is not known in advance"],
          ],
        },
        { type: "p", text: "Speed is not a single winner. Reading or replacing item i is fast in both, because the program can compute the address of that slot. The dynamic structure pays an extra cost on the occasional resize, when every item is copied. Across many additions that cost is spread out, so adding at the end is still cheap on average. A static structure never pays that copy, and it also cannot accept an item once it is full." },
        { type: "p", text: "Memory follows the same split. The static structure may waste slots, or it may be too small. The dynamic structure uses memory close to the amount of data, plus the spare capacity it reserved so the next few additions do not need another copy. Flexibility belongs to the dynamic structure: one list can hold three names or three thousand without the programmer declaring the size first." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "A comparison needs a situation. \"Dynamic is better\" is incomplete. A board of 64 squares is a good static array, because the size never changes. A list of students who join and leave during the year is a good dynamic list, because the size is not known on the first day." },
      ],
    },
    {
      id: "lists",
      nav: "Lists",
      kicker: "B2.2.2 · Construct programs that apply arrays and lists",
      title: "One row of values, or a grid",
      lede: "An array stores items in numbered slots of a fixed size. A list can grow. Python uses a list for both: keep the length fixed when the problem is an array, and append or remove when the problem is a dynamic list.",
      blocks: [
        {
          type: "pair",
          able: [
            "Read and update a one-dimensional and a two-dimensional collection.",
            "Add, remove and traverse items in a dynamic list.",
            "Say whether a list in your answer has a fixed length or a changing one.",
          ],
          notes: [
            "Indexes start at 0.",
            "In a grid, the first index is the row and the second is the column.",
            "A Python list can change length. Treat it as a fixed array only when the problem's size is fixed.",
          ],
        },
        { type: "p", text: "A one-dimensional array is a single row. Item 0 is the first item. A two-dimensional array is a grid: a list of rows, and each row is a list of values. `grid[row][column]` selects one cell. Python writes both structures as lists. The language will let a list grow, so when the problem is a fixed array you only replace existing slots. You do not append." },
        {
          type: "code",
          title: "A row and a grid",
          source: `scores = [70, 85, 90]
scores[1] = 88
print(scores[1])   # 88
print(len(scores)) # 3, the length stays fixed when you only replace a slot

grid = [
    [1, 2, 3],
    [4, 5, 6],
]
print(grid[1][2])  # 6, row 1, column 2
grid[0][0] = 9
print(grid[0])     # [9, 2, 3]`,
          caption: "scores[1] is the second mark. In the grid, row 1 is [4, 5, 6] and column 2 of that row is 6. Replacing a cell does not change the shape.",
        },
        { type: "p", text: "A dynamic list supports three jobs the syllabus names: add an element, remove an element, and traverse the elements. Traversing means visiting each item once. Adding at the end is the usual, cheap operation. Removing from the middle shifts the later items into the gap." },
        {
          type: "code",
          title: "Add, remove and traverse",
          source: `names = ["Mei"]
names.append("Ali")
names.append("Noor")
names.remove("Mei")
print(names)  # ['Ali', 'Noor']

for name in names:
    print(name)`,
          caption: "append adds at the end. remove deletes the first matching value and closes the gap. The for loop visits Ali, then Noor.",
        },
        {
          type: "code",
          title: "Visit every cell of a grid",
          source: `grid = [
    [1, 2, 3],
    [4, 5, 6],
]
total = 0
for row in grid:
    for value in row:
        total = total + value
print(total)  # 21`,
          caption: "The outer loop takes one row at a time. The inner loop takes each value in that row. Every cell is visited once.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Say which structure you are using. A Python list can represent either a 1D array or a dynamic list. The surrounding sentences must say whether the length is fixed. Replacing a slot keeps an array's size. append changes a list's size." },
      ],
    },
    {
      id: "stacks",
      nav: "Stacks",
      kicker: "B2.2.3 · Explain a stack as a last-in, first-out structure",
      title: "The last item in is the first item out",
      lede: "A stack stores items in a pile. The item most recently pushed is the only one you can pop next. That rule is last in, first out.",
      blocks: [
        {
          type: "pair",
          able: [
            "Describe push, pop, peek and isEmpty.",
            "Trace a sequence of those operations.",
            "Explain their cost in time and memory, and name a problem a stack fits.",
          ],
          notes: [
            "The top of the stack is the end you add to and remove from.",
            "pop and peek are invalid when the stack is empty.",
            "Undo, bracket matching and the call stack are stack problems.",
          ],
        },
        { type: "p", text: "Four operations define a stack. push adds an item on top. pop removes the top item and returns it. peek returns the top item without removing it. isEmpty reports whether there is any item. pop and peek have no sensible result on an empty stack, so a careful program checks isEmpty first, or raises an error." },
        {
          type: "code",
          title: "A stack whose top is the end of a list",
          source: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

undo = Stack()
undo.push("type A")
undo.push("type B")
print(undo.peek())       # type B
print(undo.pop())        # type B
print(undo.pop())        # type A
print(undo.is_empty())   # True`,
          caption: "B is pushed last, so it is the first value popped. After both pops the stack is empty. A further pop would raise IndexError.",
        },
        { type: "p", text: "The simulation pushes and pops at the top. You can step through and watch the pile grow and shrink." },
        { type: "more", external: true, href: "https://guojianryan.github.io/CompSimu/simulations/stacks/index.html", label: "Stacks on CompSimu" },
        { type: "p", text: "Using the end of a list keeps each operation cheap. push, pop, peek and isEmpty do a fixed amount of work, written O(1). push is O(1) on average: now and then the list copies its items into a larger block, and that one push costs more, but those copies are rare enough that the average stays constant. Memory is proportional to the number of items, plus a little spare capacity the list reserved. Pushing at the front would be a poor stack: every item would have to shift, so each push would cost more as the stack grew." },
        { type: "p", text: "A stack fits a problem where the most recent item is the one you need next. An undo history is that problem: the last edit is the one to reverse. Checking brackets is another. Each opening bracket is pushed. Each closing bracket must match the most recent unmatched opener, which is the top of the stack. A queue would be the wrong tool, because it would match the oldest opener instead." },
        {
          type: "code",
          title: "Brackets match when the stack ends empty",
          source: `def brackets_match(text):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}
    for symbol in text:
        if symbol in "([{":
            stack.append(symbol)
        elif symbol in ")]}":
            if not stack or stack.pop() != pairs[symbol]:
                return False
    return not stack

print(brackets_match("(a[b])"))  # True
print(brackets_match("(a[b)]"))  # False
print(brackets_match("((a)"))    # False`,
          caption: "append is push and pop removes the latest opener. (a[b)] fails because ] arrives while ( is on top. ((a) fails because a bracket is still on the stack at the end.",
        },
      ],
    },
    {
      id: "queues",
      nav: "Queues",
      kicker: "B2.2.4 · Explain a queue as a first-in, first-out structure",
      title: "The first item in is the first item out",
      lede: "A queue stores items in a line. The item that has been waiting longest is the one removed next. That rule is first in, first out.",
      blocks: [
        {
          type: "pair",
          able: [
            "Describe enqueue, dequeue, front and isEmpty.",
            "Trace a sequence of those operations.",
            "Explain their cost, and name a problem a queue fits better than a stack.",
          ],
          notes: [
            "Items enter at the back and leave from the front.",
            "dequeue and front are invalid on an empty queue.",
            "A printer and a help desk are queue problems.",
          ],
        },
        { type: "p", text: "enqueue adds an item at the back. dequeue removes the item at the front and returns it. front returns the front item without removing it. isEmpty reports whether the queue has any item. The two ends are different, which is why a stack's single end is the wrong shape for this rule." },
        {
          type: "code",
          title: "A queue with an efficient front and back",
          source: `from collections import deque

class Queue:
    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()

    def front(self):
        if self.is_empty():
            raise IndexError("front of empty queue")
        return self._items[0]

    def is_empty(self):
        return len(self._items) == 0

line = Queue()
line.enqueue("Mei")
line.enqueue("Ali")
print(line.front())      # Mei
print(line.dequeue())    # Mei
print(line.front())      # Ali
print(line.is_empty())   # False`,
          caption: "Mei arrived first, so Mei leaves first. Ali is then at the front. A stack would have returned Ali from the first pop.",
        },
        { type: "p", text: "The simulation adds at the back and removes from the front. You can step through the line and see who leaves next." },
        { type: "more", external: true, href: "https://guojianryan.github.io/CompSimu/simulations/queues/index.html", label: "Queues on CompSimu" },
        { type: "p", text: "A deque is a structure with two usable ends. append and popleft each do a fixed amount of work, so enqueue, dequeue, front and isEmpty are O(1). Memory is proportional to the number of items waiting, plus spare capacity. An ordinary list can imitate a queue with pop(0), and the result is correct, but every later item shifts one place left. That dequeue is O(n). It gets slower as the line gets longer, so it is the wrong implementation once the queue is large." },
        {
          type: "code",
          title: "pop(0) works, and it shifts every later item",
          source: `items = ["Mei", "Ali", "Noor"]
print(items.pop(0))  # Mei
print(items)         # ['Ali', 'Noor']`,
          caption: "Ali and Noor both moved. That shift is why a list used as a queue costs more per dequeue as it grows. The deque version does not shift the remaining items.",
        },
        { type: "p", text: "Choose a queue when the earliest arrival must be served first. A printer, a checkout and a help desk are that problem. Choose a stack when the latest arrival must be served first, as with undo. Using the wrong one does not crash. It serves the wrong person, which is a logic error." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Name the operation in the syllabus wording. Adding to a queue is enqueue, not push. Looking at the next item without removing it is front on a queue and peek on a stack. A trace that removes from the wrong end has the right structure and the wrong rule." },
        { type: "more", href: "b2-3-programming-constructs.html", label: "B2.3 Programming constructs" },
      ],
    },
  ],
  mcqs: [
    {
      q: "A program stores an 8 by 8 board. The size never changes. Which comparison is the strongest?",
      options: [
        "A dynamic list is required, because all modern programs use one",
        "A static array fits: the size is known, and no resize or wasted growth is needed",
        "A static array cannot be indexed, so a list is faster to read",
        "A dynamic list uses less memory for every problem, including this one",
      ],
      answer: 1,
      why: "The board has a fixed number of squares, so a static array allocates exactly that memory and never copies it to grow. Indexing is fast for a static array as well. The last option ignores the spare capacity a dynamic list keeps, and the empty slots a static array would waste only when the size was chosen badly.",
    },
    {
      q: "grid is [[1, 2, 3], [4, 5, 6]]. What is grid[1][2]?",
      options: ["2", "4", "5", "6"],
      answer: 3,
      why: "The first index is the row. Row 1 is [4, 5, 6], and column 2 of that row is 6. The tempting answer 2 reads row 0, column 1, swapping the indexes.",
    },
    {
      q: "A stack is empty. The program pushes \"A\", pushes \"B\", then pops once. What does that pop return, and what does peek return afterwards?",
      options: [
        "A, then B",
        "B, then A",
        "B, then B",
        "A, then A",
      ],
      answer: 1,
      why: "The last value pushed is the first popped, so pop returns B. A is now on top, so peek returns A. B, then B would be right only if pop had not removed B.",
    },
    {
      q: "A queue is used for a printer. Mei is enqueued, then Ali. Which statement is correct?",
      options: [
        "dequeue returns Ali, because the latest job goes first",
        "dequeue returns Mei, and front would have shown Mei without removing the job",
        "front removes Mei and leaves Ali",
        "isEmpty is true after the two enqueues",
      ],
      answer: 1,
      why: "A queue is first in, first out, so Mei is served first. front looks at Mei and does not remove the job. The first option describes a stack, which is the wrong structure for a printer.",
    },
  ],
  checks: [
    "Compare static and dynamic structures for memory, speed of access, and a problem each one fits.",
    "Read and update one cell in a 2D collection, and say which index is the row.",
    "Add an item, remove an item, and traverse a dynamic list.",
    "Trace push, pop, peek and isEmpty, including a pop on an empty stack.",
    "Explain why the end of a list is a good top for a stack, including the time cost.",
    "Trace enqueue, dequeue, front and isEmpty, and say why pop(0) on a list is a slower dequeue.",
    "Name one problem for a stack and one for a queue, and say what goes wrong if they are swapped.",
  ],
};
