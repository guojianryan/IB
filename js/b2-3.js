export const topic = {
  id: "B2.3",
  title: "Programming constructs",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "A program is a sequence of instructions, with choices, repetition, and pieces that can be reused. This page builds those four constructs in Python 3. The order of the instructions decides the result.",
  chips: ["B2.3", "SL and HL", "Python 3"],
  mapTitle: "The four statements in B2.3",
  mapLede: "All four statements are for SL and HL. Scope was introduced with variables in B2.1.1. Here it is applied to functions.",
  map: [
    ["#sequence", "B2.3.1", "Sequence", "Instructions in the order the problem requires, and the errors a bad order causes."],
    ["#selection", "B2.3.2", "Selection", "if, elif and else, with Boolean and relational operators."],
    ["#loops", "B2.3.3", "Iteration", "Counted loops and conditional loops, including a condition inside the loop."],
    ["#functions", "B2.3.4", "Functions", "Reusable blocks, parameters, return values, and local scope."],
  ],
  sections: [
    {
      id: "sequence",
      nav: "Sequence",
      kicker: "B2.3.1 · Construct programs in the correct sequence",
      title: "The order of the lines is part of the answer",
      lede: "Sequence means the instructions run from top to bottom, one after another. The same lines in a different order are a different program.",
      blocks: [
        {
          type: "pair",
          able: [
            "Put instructions in the order that produces the required result.",
            "Show how swapping two lines changes the output.",
            "Describe an infinite loop, a deadlock, and incorrect output as failures to avoid.",
          ],
          notes: [
            "Later lines see the values earlier lines left behind.",
            "A counted or conditional loop needs a step that moves toward stopping.",
            "Deadlock is two tasks each waiting for a resource the other is holding.",
          ],
        },
        { type: "p", text: "Each instruction uses the values that exist at that moment. If a receipt must show the balance before a withdrawal, the print has to happen before the subtraction. After the subtraction, that old balance is gone." },
        {
          type: "code",
          title: "The same lines, two orders, two receipts",
          source: `balance = 100
withdraw = 30

reported = balance
balance = balance - withdraw
print(reported, balance)  # 100 70

balance = 100
balance = balance - withdraw
reported = balance
print(reported, balance)  # 70 70`,
          caption: "The first version saves the balance, then subtracts, so the receipt still shows 100. The second version subtracts first, so both numbers are 70. The instructions are the same three ideas. The order changes the result.",
        },
        { type: "h3", text: "Three failures that come from the flow of instructions" },
        { type: "p", text: "Incorrect output is the failure in the receipt. The program runs to the end and prints a plausible number that is not the one the problem asked for. A trace of the first few values shows the line where the result left the required path." },
        { type: "p", text: "An infinite loop repeats because its stopping condition never becomes false. Starting at 0 and adding 3 never lands on 10, so `while n != 10` would run forever. The listing below adds a step limit so the example can finish, and prints the evidence that the condition was never going to succeed." },
        {
          type: "code",
          title: "A condition that cannot become false",
          source: `n = 0
steps = 0
while n != 10 and steps < 5:
    n = n + 3
    steps = steps + 1
print(n, steps)  # 15 5`,
          caption: "After five additions n is 15, which is not 10, and it will keep missing 10. Without the steps limit this loop would not end. A condition such as n < 10 can become false, because adding 3 moves n toward and then past 10.",
        },
        { type: "p", text: "A deadlock is not a loop that repeats. Two tasks each hold one resource and wait for the other. Suppose task A locks the file and then waits for the printer, while task B locks the printer and then waits for the file. Neither can continue, and neither is spinning through a calculation. The avoidance is an agreed order: every task locks the file before the printer, so the second lock is never requested by a task that holds them the other way around." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Name the failure precisely. An infinite loop is a condition that never becomes false. A deadlock is a wait, not a repeated calculation. Incorrect output is a finished run with the wrong result, often because two instructions are in the wrong order." },
      ],
    },
    {
      id: "selection",
      nav: "Selection",
      kicker: "B2.3.2 · Construct programs using selection",
      title: "Choose a block because a condition is true",
      lede: "Selection runs one block and skips the others. if starts the choice. elif adds another condition. else runs when every condition above it was false.",
      blocks: [
        {
          type: "pair",
          able: [
            "Write if, elif and else for a set of mutually exclusive cases.",
            "Combine conditions with and, or and not.",
            "Use relational operators and keep assignment out of the condition.",
          ],
          notes: [
            "`==` compares. `=` assigns. A condition needs the comparison.",
            "and, or and not combine Boolean values.",
            "and and or stop early when the result is already decided.",
          ],
        },
        { type: "p", text: "The conditions are tested from top to bottom. The first true condition wins, and the later branches are skipped. That is why the boundaries have to be in order: a mark of 90 satisfies both `mark >= 70` and `mark >= 80`, so the stricter test has to come first." },
        {
          type: "code",
          title: "One grade, from the first true branch",
          source: `mark = 73
if mark >= 80:
    grade = "7"
elif mark >= 70:
    grade = "6"
else:
    grade = "below 6"
print(grade)  # 6`,
          caption: "73 fails the first test and passes the second, so grade is 6. The else branch does not run. If the tests were swapped, 90 would be labelled 6, because it would meet mark >= 70 first.",
        },
        { type: "p", text: "A relational operator compares two values and produces a Boolean. The operators are `<`, `<=`, `>`, `>=`, `==` and `!=`. `and` is true only when both sides are true. `or` is true when at least one side is true. `not` reverses a Boolean." },
        {
          type: "code",
          title: "Boolean operators, and a division that is skipped",
          source: `age = 17
has_id = True
if age >= 16 and has_id:
    print("allowed")
else:
    print("refused")

if not has_id:
    print("bring identification")

count = 0
if count != 0 and (180 / count) > 50:
    print("high")
else:
    print("skipped")  # skipped`,
          caption: "allowed is printed because both parts of and are true. not has_id is false, so the identification message is skipped. count != 0 is false, so and does not evaluate the division. That short-circuit is why the program does not divide by zero.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Write the operators the condition needs. `=` stores a value and is not a comparison. `==` asks whether two values are equal. A trace of an if/elif chain should say which branch ran, and which later branches were not tested." },
      ],
    },
    {
      id: "loops",
      nav: "Loops",
      kicker: "B2.3.3 · Construct programs that use looping structures",
      title: "Repeat a block, and know why it stops",
      lede: "A counted loop repeats a known number of times. A conditional loop repeats while a condition stays true. A condition inside the loop can decide what each pass does.",
      blocks: [
        {
          type: "pair",
          able: [
            "Choose for when the number of passes is known, and while when it is not.",
            "Put a condition inside a loop without preventing the loop from ending.",
            "Trace the values at the end of each pass.",
          ],
          notes: [
            "`range(start, stop)` includes start and excludes stop.",
            "The while condition is tested before each pass.",
            "Something inside a while loop must change a variable the condition uses.",
          ],
        },
        {
          type: "table",
          title: "Counted and conditional loops",
          head: ["", "Counted loop", "Conditional loop"],
          rows: [
            ["Python", "for, often with range", "while"],
            ["You know in advance", "How many times, or which collection to visit", "Only the rule for stopping"],
            ["Typical job", "Add the marks in a list. Repeat n times", "Double a value until it passes a limit"],
            ["The risk", "An off-by-one in the stop value", "A condition that never becomes false"],
          ],
        },
        {
          type: "code",
          title: "A counted loop, with a condition on each pass",
          source: `total = 0
for mark in [40, 75, 90, 30]:
    if mark >= 50:
        total = total + mark
print(total)  # 165

print(list(range(1, 5)))  # [1, 2, 3, 4]`,
          caption: "The for loop visits each mark once. The if inside it adds only the marks that are at least 50, so 40 and 30 are skipped and the total is 165. range(1, 5) stops before 5.",
        },
        {
          type: "code",
          title: "A conditional loop that doubles until it passes the limit",
          source: `n = 1
while n < 100:
    n = n * 2
print(n)  # 128`,
          caption: "The loop stops when n is no longer below 100. The last multiplication takes n from 64 to 128, so the printed value is past the limit. That is the usual result of testing the condition at the start of the pass.",
        },
        { type: "p", text: "The condition inside the for loop does not decide whether the loop continues. The for loop continues because there is another mark in the list. The if only decides whether this pass adds anything. Confusing those two jobs produces a loop that either never stops or skips work it should have done. The variable that a while condition depends on has to change on every pass that continues. The doubling loop changes n. The loop in the sequence section, which added 3 while waiting for exactly 10, did not move toward a condition that could succeed." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "For a while loop, write the test that fails, not only the passes that succeed. The final value has often already stepped past the limit. For range, the stop value is not one of the values the loop body sees." },
      ],
    },
    {
      id: "functions",
      nav: "Functions",
      kicker: "B2.3.4 · Construct functions and modularisation",
      title: "Name a piece of work, then call it",
      lede: "A function is a named block that can be called with different inputs. Modularisation is the decision to split a program into functions so each one has a job you can read, test and reuse.",
      blocks: [
        {
          type: "pair",
          able: [
            "Write a function with parameters and a return value.",
            "Call one function from another.",
            "Explain why a parameter does not change the caller's variable.",
          ],
          notes: [
            "A parameter is a local name.",
            "return sends a value back. Without it, the call produces None.",
            "The global keyword was covered in B2.1.1. Prefer returning a new value.",
          ],
        },
        { type: "p", text: "The lines inside a function do not run when the function is defined. They run when something calls it. The parameters receive the arguments from that call. A return sends one value back to the caller. The benefit of the split is that average can be tested on its own, and report can use it without copying the division." },
        {
          type: "code",
          title: "One function calls another",
          source: `def average(total, count):
    return total / count

def report(name, total, count):
    return name + ": " + str(average(total, count))

print(report("Mei", 180, 2))  # Mei: 90.0`,
          caption: "report does not divide. It asks average to do that job and then builds the sentence. average(180, 2) returns 90.0, which is a decimal.",
        },
        { type: "p", text: "A parameter is local to the function, even when it has the same name as a global variable. Assigning to the parameter changes the local name. The caller's variable changes only if the caller stores the returned value. B2.1.1 shows the other route, the `global` keyword. Returning the new value keeps the data flow visible in the call." },
        {
          type: "code",
          title: "The parameter shadows the global name",
          source: `score = 10

def adjust(score):
    score = score + 1
    return score

print(adjust(score))  # 11
print(score)          # 10
score = adjust(score)
print(score)          # 11`,
          caption: "The first call returns 11 and leaves the global score at 10. The assignment score = adjust(score) is what stores that returned 11.",
        },
        { type: "h3", text: "Why the split is worth it" },
        {
          type: "list",
          items: [
            "Reuse. average can be called from a report, a check, or a later program.",
            "Testing. A wrong average can be found by calling average with known numbers, without running the whole program.",
            "Reading. The name report says what that block is for. The division is not buried in the middle of the printing.",
            "Change. A different rounding rule is edited in average. The callers stay as they are, as long as they still pass a total and a count and use the returned number.",
          ],
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Scope is part of this statement. If the question shows a function assigning to a parameter, the variable outside the function is unchanged unless the caller assigns the returned value, or the function used global. Say which of those two the code does." },
        { type: "more", href: "b2-4-programming-algorithms.html", label: "B2.4 Programming algorithms" },
      ],
    },
  ],
  mcqs: [
    {
      q: "balance starts at 100 and withdraw is 30. The program subtracts first and then sets reported = balance. What is printed for reported?",
      options: ["100", "70", "30", "130"],
      answer: 1,
      why: "After the subtraction, balance is 70, and that is the value reported copies. Printing before the subtraction is what would show 100. The order is the whole of the difference.",
    },
    {
      q: "mark is 90. The first test is mark >= 70, which sets the grade to 6, and a later elif tests mark >= 80. Which grade is chosen?",
      options: [
        "7, because 90 is at least 80",
        "6, because the first true test wins and the later test is skipped",
        "Both 6 and 7",
        "below 6, because a mark cannot match two tests",
      ],
      answer: 1,
      why: "Selection runs the first true branch and skips the rest. 90 matches mark >= 70, so the grade is 6 even though it would also have matched the stricter test. The stricter test has to be written first.",
    },
    {
      q: "What does list(range(1, 5)) contain?",
      options: ["[1, 2, 3, 4, 5]", "[1, 2, 3, 4]", "[0, 1, 2, 3, 4]", "[2, 3, 4, 5]"],
      answer: 1,
      why: "range includes the start and excludes the stop, so 5 is not in the list. The tempting first option counts the stop as a value the loop body would see.",
    },
    {
      q: "score is 10. adjust(score) returns score + 1 and does not use global. The caller prints score without assigning the result. What is that score?",
      options: ["11", "10", "None", "It raises UnboundLocalError"],
      answer: 1,
      why: "The parameter is a local name. The function returns 11, and the caller ignores that return, so the global score stays 10. UnboundLocalError is the other mistake, from assigning to a global name with no global keyword and no parameter.",
    },
  ],
  checks: [
    "Show two orders of the same instructions and the output each order produces.",
    "Explain an infinite loop, a deadlock, and incorrect output as different failures.",
    "Write an if/elif/else chain and say which branch runs for a given value.",
    "Combine conditions with and, or and not, and say when and skips its second expression.",
    "Choose a counted loop or a conditional loop for a described job, and justify the choice.",
    "Trace a while loop, including the test that stops it.",
    "Write two functions where one calls the other, and explain the parameter's scope.",
    "Give two benefits of splitting a program into functions.",
  ],
};
