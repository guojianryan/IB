export const topic = {
  id: "B2.1",
  title: "Programming fundamentals",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "The guiding question for B2 is how computer programming can solve a problem. This page is the fundamentals: the data a program stores, the text it takes apart, the failures it should expect, and the ways to find a fault. The examples are Python 3.",
  chips: ["B2.1", "SL and HL", "Python 3"],
  mapTitle: "The four statements in B2.1",
  mapLede: "B2 as a whole is 40 hours at SL and 42 hours at HL. These four statements are for both levels.",
  map: [
    ["#types", "B2.1.1", "Variables and data types", "Global and local names, and Boolean, char, integer, decimal and string values."],
    ["#strings", "B2.1.2", "Substrings", "Extract, join, replace and alter part of a string."],
    ["#exceptions", "B2.1.3", "Exception handling", "try, except, else and finally, and the failures they do not catch."],
    ["#debugging", "B2.1.4", "Debugging", "Trace tables, print statements, breakpoints and stepping."],
  ],
  sections: [
    {
      id: "types",
      nav: "Types",
      kicker: "B2.1.1 · Construct and trace programs using global and local variables",
      title: "A name, a value, and where that name lives",
      lede: "A variable is a name bound to a value. The data type says what kind of value it is. The scope says which parts of the program can use that name.",
      blocks: [
        {
          type: "pair",
          able: [
            "Declare and trace Boolean, char, integer, decimal and string values.",
            "Say whether a name is local or global, and what a function is allowed to do with it.",
            "Predict the output when a function assigns to a name that also exists outside it.",
          ],
          notes: [
            "The syllabus words and the Python types are paired in the table below.",
            "A local name belongs to the function that created it.",
            "Reading a global is allowed. Assigning to it needs the `global` keyword in Python.",
          ],
        },
        { type: "h3", text: "The five data types" },
        { type: "p", text: "The syllabus names five data types: Boolean, char, integer, decimal and string. Python writes them as bool, a string of length 1, int, float and str. In an exam answer, use the syllabus word. In the code, use the Python spelling." },
        {
          type: "table",
          title: "The five syllabus types in Python",
          head: ["Syllabus", "What it stores", "Python"],
          rows: [
            ["Boolean", "True or false", "bool: True, False"],
            ["char", "One character", "A string of length 1, such as \"A\""],
            ["integer", "A whole number", "int"],
            ["decimal", "A number with a fractional part", "float"],
            ["string", "A sequence of characters", "str, written \"Mei\""],
          ],
        },
        {
          type: "code",
          title: "One value of each type",
          source: `enrolled = True
initial = "A"
mark = 18
average = 18.5
name = "Mei"

print(type(enrolled).__name__)  # bool
print(len(initial))             # 1, so this string is a single character
print(mark)                     # 18
print(average)                  # 18.5
print(name)                     # Mei
print(0.1 + 0.2)                # 0.30000000000000004`,
          caption: "A Python float is a binary approximation, so 0.1 + 0.2 is not stored as exactly 0.3. For a trace on paper, pick values that stay exact, such as 18.5. In an answer, call this type a decimal.",
        },
        { type: "h3", text: "Local and global" },
        { type: "p", text: "A global variable is created outside every function. A local variable is created inside a function. The local name exists only while that function is running. After the function returns, the rest of the program cannot use it." },
        {
          type: "code",
          title: "A local name does not escape the function",
          source: `def make_label():
    label = "Mei"
    return label

print(make_label())  # Mei
try:
    print(label)
except NameError:
    print("NameError")`,
          caption: "label is local to make_label. The last line raises NameError because the main program has no variable of that name.",
        },
        { type: "p", text: "A function may read a global variable. If the function also assigns to that name, Python treats every use of the name inside the function as local. The assignment has not happened yet when the right-hand side is read, so the program raises UnboundLocalError. The `global` keyword says that the assignment should change the global variable instead." },
        {
          type: "code",
          title: "Reading a global, and the assignment that does not",
          source: `score = 10

def show():
    print(score)

def add_local():
    score = score + 1

def add_global():
    global score
    score = score + 1

show()  # 10
try:
    add_local()
except UnboundLocalError:
    print("UnboundLocalError")
add_global()
print(score)  # 11`,
          caption: "show reads the global and prints 10. add_local assigns to score, so Python looks for a local score, does not find one, and raises UnboundLocalError. The global score is still 10 until add_global changes it to 11.",
        },
        { type: "p", text: "Inside a function, a name belongs to the whole function, not to the if or the loop that first used it. Both branches of an if can use the same local name, and so can the lines that follow them." },
        {
          type: "code",
          title: "An if does not create a new scope in Python",
          source: `def check(mark):
    if mark >= 50:
        status = "pass"
    else:
        status = "fail"
    return status

print(check(73))  # pass`,
          caption: "status is local to check. Both branches can see it, and so can the return that follows them.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "If a trace asks for a variable after a function has returned, check the scope before you copy the value out. A local name is gone. A global name is still there, and it changes only if some function assigned to it with global, or if the main program assigned to it directly." },
      ],
    },
    {
      id: "strings",
      nav: "Strings",
      kicker: "B2.1.2 · Construct programs that extract and manipulate substrings",
      title: "Take a string apart, then build another",
      lede: "A substring is a slice of a string. Programs identify it by position, then alter, join or replace text to make the string the problem needs.",
      blocks: [
        {
          type: "pair",
          able: [
            "Extract a substring by its start and end positions.",
            "Join strings, and replace one piece of text with another.",
            "Explain why the original string is unchanged after a replacement.",
          ],
          notes: [
            "Positions start at 0.",
            "The end position in a slice is not included.",
            "A negative position counts back from the end.",
          ],
        },
        { type: "p", text: "Each character has an index. The first character is index 0. In Python, `text[start:end]` takes the characters from `start` up to, but not including, `end`. Leaving out `start` means the beginning. Leaving out `end` means the end. A negative index counts from the last character, so `-1` is the final character." },
        {
          type: "code",
          title: "Extract, join and replace",
          source: `code = "IB-CS-2027"
print(code[0:2])                 # IB
print(code[3:5])                 # CS
print(code[-4:])                 # 2027
print(code[0])                   # I, one character

joined = code[0:2] + " " + code[3:5]
print(joined)                    # IB CS

updated = code.replace("-", "/")
print(updated)                   # IB/CS/2027
print(code)                      # IB-CS-2027, the original is unchanged`,
          caption: "Index 2 is the first hyphen, and the slice stops before it, so code[0:2] is IB. replace returns a new string. code still holds the hyphens.",
        },
        { type: "p", text: "Altering a string means building a new one from the pieces you want to keep and the pieces you want to change. Strings themselves are not edited character by character in these operations. Concatenation with `+` also builds a new string." },
        {
          type: "code",
          title: "Change one character by rebuilding the string",
          source: `word = "cat"
updated = "b" + word[1:]
print(word)     # cat
print(updated)  # bat`,
          caption: "word[1:] is at. Putting b in front makes bat. The name word still refers to cat.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Count the end index carefully. A slice of length 2 that starts at index 3 ends at index 5, because the end is excluded. Off-by-one mistakes are the usual reason a substring trace is wrong." },
      ],
    },
    {
      id: "exceptions",
      nav: "Exceptions",
      kicker: "B2.1.3 · Describe how programs use common exception handling techniques",
      title: "Expect the failure, and decide what happens next",
      lede: "A program fails at a point where the input, a resource, or the logic is not what the programmer assumed. Exception handling is how the program responds to the failures it can detect while it is running.",
      blocks: [
        {
          type: "pair",
          able: [
            "Name unexpected input, a missing resource, and a logic error as points of failure.",
            "Write try/except/finally, and say when else runs.",
            "Say which of those failures exception handling does not catch.",
          ],
          notes: [
            "The try block is the code that might fail.",
            "except runs when a matching error is raised.",
            "finally runs whether the try succeeded or failed.",
          ],
        },
        { type: "h3", text: "Three kinds of failure" },
        {
          type: "list",
          items: [
            "Unexpected input. The user types `eighteen` where the program expects an integer.",
            "Resource unavailability. The program tries to open a file that is not there, or that this user is not allowed to read.",
            "A logic error. The instructions run, and they compute the wrong result. Nothing crashes.",
          ],
        },
        { type: "p", text: "Exception handling is for the first two, when the language raises an error while the program is running. A logic error does not raise an error. The program finishes and the answer is wrong. Finding that fault is debugging, which is B2.1.4." },
        { type: "p", text: "The construct is `try`, `except`, and optionally `else` and `finally`. The `except` block runs when the named error is raised. The `else` block runs when the try block finishes with no error. The `finally` block runs in both cases, including when a return is waiting to leave the function." },
        {
          type: "code",
          title: "A bad mark is caught. finally runs either way.",
          source: `def parse_mark(text):
    try:
        mark = int(text)
    except ValueError:
        print("not an integer")
        return None
    else:
        print("parsed")
        return mark
    finally:
        print("attempt finished")

print(parse_mark("18"))
print(parse_mark("eighteen"))`,
          caption: "For 18 the program prints parsed, then attempt finished, then 18. For eighteen it prints not an integer, then attempt finished, then None. else does not run after the ValueError. finally runs before either return completes.",
        },
        {
          type: "code",
          title: "A missing file is a resource failure",
          source: `try:
    open("missing-marks.txt", encoding="utf-8")
except FileNotFoundError:
    print("FileNotFoundError")`,
          caption: "The file is not there, so open raises FileNotFoundError. The except block reports it and the program continues. Opening, reading and closing files is B2.5.",
        },
        {
          type: "code",
          title: "A logic error is not an exception",
          source: `def average(total, count):
    return total - count

try:
    result = average(180, 2)
    print(result)  # 178
except Exception:
    print("caught")`,
          caption: "The function subtracts where it should divide. Python runs it and prints 178. The except block does not run, because no exception was raised. The result is simply wrong.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Do not write that try/except fixes every bug. It handles a detected failure such as bad input or a missing file. A wrong formula, an infinite loop and a swapped pair of instructions keep running. Those are found by tracing and by the other debugging techniques." },
      ],
    },
    {
      id: "debugging",
      nav: "Debugging",
      kicker: "B2.1.4 · Construct and use common debugging techniques",
      title: "Find the fault by watching the values change",
      lede: "Debugging is how you locate a fault and confirm the fix. The syllabus techniques are a trace table, a breakpoint, a print statement, and executing the code one step at a time.",
      blocks: [
        {
          type: "pair",
          able: [
            "Complete a trace table for a short piece of code.",
            "Place a print so that it shows the value that explains a wrong result.",
            "Describe what a breakpoint and a single step show you.",
          ],
          notes: [
            "A trace table is the paper version of stepping.",
            "A print statement reports one value at the moment that line runs.",
            "A breakpoint stops the program on a chosen line so you can inspect the variables.",
          ],
        },
        { type: "p", text: "A trace table has a column for each variable that matters, and a row for each step. You fill the row with the values after that step. The last row that the loop accepts is the state when the loop stops. The output is whatever the program prints from those values." },
        {
          type: "code",
          title: "A loop worth tracing by hand",
          source: `n = 4
total = 0
i = 1
while i <= n:
    total = total + i
    i = i + 1
print(total)  # 10`,
          caption: "Each pass adds the current i, then increases i. When i becomes 5 the condition i <= n is false, so the loop stops. total is 10.",
        },
        {
          type: "table",
          title: "Trace table for the loop",
          head: ["Moment", "i", "total", "Does i <= n allow another pass?"],
          rows: [
            ["Before the loop", "1", "0", "Yes"],
            ["End of pass 1", "2", "1", "Yes"],
            ["End of pass 2", "3", "3", "Yes"],
            ["End of pass 3", "4", "6", "Yes"],
            ["End of pass 4", "5", "10", "No, so the loop stops"],
          ],
        },
        { type: "p", text: "A print statement is the same idea inside the program. You print the variables just before the line you distrust. When the fault is found, you remove those prints so they are not part of the finished program." },
        {
          type: "code",
          title: "A print shows why the average was refused",
          source: `def average(total, count):
    print("count is", count)
    if count == 0:
        return None
    return total / count

print(average(180, 0))  # count is 0, then None
print(average(180, 2))  # count is 2, then 90.0`,
          caption: "The print runs before the division. It shows that the first call was given a count of 0, which is why the function returns None instead of dividing.",
        },
        { type: "p", text: "A breakpoint marks a line in a debugger. The program runs until it reaches that line, then stops. Stepping runs one line at a time. After each step you can read the variables, just as you would fill the next row of a trace table. Print statements are the version of this that needs no debugger. Breakpoints are the version the tool controls." },
        { type: "p", text: "Use more than one technique when the first one is awkward. A long loop is tedious on paper, so a print of the values every hundredth pass is enough. A three-line calculation is clearer as a trace table than as a page of debugger screenshots. The goal is the same: name the first step where a value is not what it should be. That step is the fault, or it is the first place the fault becomes visible." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "In a trace question, write a row for the test that stops the loop, not only for the passes that run. The mark is often for the final value of the counter, which has already moved past the last successful pass." },
        { type: "more", href: "b2-2-data-structures.html", label: "B2.2 Data structures" },
      ],
    },
  ],
  mcqs: [
    {
      q: "A global score is 10. A function contains the line score = score + 1 and does not use global. What happens when the function is called?",
      options: [
        "score becomes 11",
        "The function raises UnboundLocalError, and the global score stays 10",
        "The function creates a local score of 1",
        "The function prints 10 and leaves score unchanged",
      ],
      answer: 1,
      why: "The assignment makes every use of score in that function local. The right-hand score is read before any local value exists, so Python raises UnboundLocalError. The tempting first option is what happens only when the function declares global score.",
    },
    {
      q: "code is \"IB-CS-2027\". What is code[3:5]?",
      options: ["-C", "CS", "CS-", "C"],
      answer: 1,
      why: "Index 3 is C and index 4 is S. The slice stops before index 5, so the hyphen is not included. The tempting third option includes the end index.",
    },
    {
      q: "A try block parses an integer. The text is not an integer, so except runs. When does finally run?",
      options: [
        "It does not run, because an exception happened",
        "It runs only when the try block succeeds",
        "It runs after except, before the function's return finishes",
        "It runs instead of except",
      ],
      answer: 2,
      why: "finally runs whether or not the exception happened. It does not replace except. The first option is the usual mix-up with else, which runs only when the try block succeeds.",
    },
    {
      q: "average returns total - count instead of total / count. The call average(180, 2) is inside try/except. What happens?",
      options: [
        "The except block runs, because the formula is wrong",
        "The program prints 178 and the except block does not run",
        "The program prints 90.0, because Python corrects the operator",
        "The program raises ZeroDivisionError",
      ],
      answer: 1,
      why: "A logic error produces a wrong result without raising an exception. 180 - 2 is 178, and except has nothing to catch. Exception handling is for failures the language detects, such as bad input or a missing file.",
    },
  ],
  checks: [
    "List the five syllabus data types and the Python type used for each.",
    "Trace a function call and say which names are local and which are global after it returns.",
    "Explain why assigning to a global name inside a function needs the global keyword.",
    "Extract a substring, join two strings, and replace part of a string without changing the original.",
    "State the three points of failure: unexpected input, an unavailable resource, and a logic error.",
    "Write a try/except/finally that handles text which is not an integer, and say when finally runs.",
    "Complete a trace table for a while loop, including the test that stops it.",
    "Describe what a print statement, a breakpoint and a single step each show you.",
  ],
};
