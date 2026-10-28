export const topic = {
  id: "B3.1",
  title: "Fundamentals of OOP for a single class",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "Object-oriented programming organises a program around objects. An object keeps its own data, and its methods are the actions that use that data. A class is the blueprint those objects are built from. This page is the single-class part of B3: the ideas, the design, the Python, and the limits of the paradigm.",
  chips: ["B3.1", "SL and HL", "Python 3", "7 hours at SL"],
  mapTitle: "The five statements in B3.1",
  mapLede: "B3.1 is examined at both SL and HL. Inheritance, polymorphism, abstraction and design patterns are named here, and then built properly in B3.2, which is HL only.",
  map: [
    ["#fundamentals", "B3.1.1", "Evaluate the fundamentals", "Classes, objects, encapsulation, inheritance and polymorphism, and when OOP is a poor fit."],
    ["#design", "B3.1.2", "Design a class", "One responsibility, the data, the actions, and a UML class diagram."],
    ["#static", "B3.1.3", "Static and non-static", "Instance data versus class data, and instance, class and static methods."],
    ["#classes", "B3.1.4", "Write the class, make the object", "class, a call that instantiates, and __init__ setting the starting state."],
    ["#encapsulation", "B3.1.5", "Encapsulation and information hiding", "Protect the invariant, and hide the decision that is likely to change."],
  ],
  sections: [
    {
      id: "fundamentals",
      nav: "Fundamentals",
      kicker: "B3.1.1 · Evaluate the fundamentals of OOP",
      title: "A program built from objects",
      lede: "The guiding question for the whole of B3 is whether object-oriented programming is an appropriate paradigm for solving complex problems. Answering it starts with the vocabulary.",
      blocks: [
        {
          type: "pair",
          able: [
            "Describe a problem using classes, objects, attributes and methods.",
            "Explain encapsulation, inheritance and polymorphism well enough to judge whether OOP helps.",
            "Give advantages and disadvantages, and name a problem where OOP is the wrong tool.",
          ],
          notes: [
            "An object is state plus the behaviour that acts on that state.",
            "A class holds no real data of its own until an object is created from it.",
            "Inheritance and polymorphism are defined here. The code that builds them is HL, in B3.2.",
          ],
        },
        { type: "p", text: "A class is a blueprint. It says what data each object will store and what actions each object will be able to perform. Writing a class is like drawing the plan of a house: you cannot live in the plan. An object is one house built from that plan. It occupies memory and holds real values. From one User class you can make user1 for Alice and user2 for Bob. Those are two objects, two lots of state, same methods." },
        { type: "p", text: "An attribute is a stored value. An instance attribute belongs to one object and is reached through self. A class attribute belongs to the class and is shared by every object. A method is a named block of code, attached to the class, that can take parameters. An instance method is called on one object and receives that object as self, so it can see both that object's data and the shared class data. A class method belongs to the class, is marked with @classmethod, receives cls instead of self, and can be called without an object." },
        {
          type: "columns",
          items: [
            { title: "Encapsulation", text: "The data and the methods that use it live in one class. Outside code reaches the data through methods such as accessors and mutators, not by poking around in the storage." },
            { title: "Inheritance", text: "An is-a relationship. A subclass reuses the attributes and methods of a superclass and can add its own. A Teacher is a Person. The full mechanism is B3.2.1." },
            { title: "Polymorphism", text: "One name, more than one behaviour. Subclasses can override a method so each object responds in its own way. The notes also distinguish overloading from overriding. The code is B3.2.2." },
          ],
        },
        { type: "p", text: "Three method roles come up constantly. A constructor, in Python the __init__ method, runs when the object is created and sets the starting state. An accessor, or getter, returns an attribute. A mutator, or setter, changes a private attribute, usually checking the new value first. Changing state is the point of a mutator: after a successful call, the object is different." },
        { type: "p", text: "Python does not enforce access the way Java or C++ does. The convention is the signal. No leading underscore means public: anyone may use it. One leading underscore, as in _balance, means internal: other code can still read it, but should not. Two leading underscores, as in __code, trigger name mangling. Python rewrites the name to _ClassName__code so that accidental access, and a subclass that happens to use the same name, do not collide with it. Dunder methods such as __init__ and __str__ are not mangled. The double underscore is on both sides." },
        {
          type: "code",
          title: "Name mangling is a rename, not a lock",
          source: `class Secret:
    def __init__(self):
        self.__code = 1234

s = Secret()
try:
    print(s.__code)
except AttributeError:
    print("AttributeError")
print(s._Secret__code)  # 1234`,
          caption: "The second line works, which is the point. Privacy here is a warning plus a renamed attribute, not a guarantee. A real exam answer should say that.",
        },
        { type: "p", text: "OOP earns its keep when the problem is made of several entities with different jobs. A library splits into Book, Member and Loan. A game splits into Player, Enemy and Item. A shop splits into Product, Cart and Order. Each class has a role, so a change to lending rules can sit inside Loan instead of being scattered through unrelated functions." },
        {
          type: "columns",
          items: [
            {
              title: "Advantages",
              tone: "ok",
              points: [
                "Classes can be reused in other parts of the program, and in other programs.",
                "Work splits across people: different groups can build different classes at the same time.",
                "A small class with its own data can be tested on its own.",
              ],
            },
            {
              title: "Disadvantages",
              tone: "bad",
              points: [
                "More machinery than a short script needs. Small problems get more complex, not less.",
                "Object-oriented programs are often larger, which matters when storage is tight.",
                "The design has to exist before the code. That planning is real work.",
                "Little gain on a minor project, so the extra structure is not worth it.",
              ],
            },
          ],
        },
        {
          type: "code",
          title: "One book, its own state, its own actions",
          source: `class LibraryBook:
    def __init__(self, title: str, author: str):
        self._title = title
        self._author = author
        self._on_loan = False

    def borrow(self) -> bool:
        if self._on_loan:
            return False
        self._on_loan = True
        return True

    def return_book(self) -> None:
        self._on_loan = False

book = LibraryBook("1984", "George Orwell")
print(book.borrow())     # True
print(book._on_loan)     # True
print(book.borrow())     # False, already out`,
          caption: "The object stores _title, _author and _on_loan. `borrow` and return_book are the only behaviours that should change that flag. The single underscore says those attributes are internal.",
        },
        { type: "lab", name: "library" },
        { type: "callout", kind: "exam", label: "Exam watch", text: "If the question says \"evaluate\", name the idea and then say when it helps and when it does not. \"OOP allows code reuse\" on its own is thin. \"The Book class can be used by Loan and by the catalogue, but a one-off conversion script does not need a class hierarchy\" is an evaluation." },
        { type: "more", href: "b3-2-multiple-classes.html", label: "HL: inheritance and polymorphism in B3.2" },
      ],
    },
    {
      id: "design",
      nav: "Design",
      kicker: "B3.1.2 · Construct a design of classes, their methods and behaviour",
      title: "Design the class before you write it",
      lede: "Class design starts from the problem, not from the syntax. A strong class has one clear responsibility.",
      blocks: [
        {
          type: "pair",
          able: [
            "Pick out the entities in a description and give each one a class.",
            "List the attributes every object must store and the methods it must offer.",
            "Draw and read a UML class diagram for a single class.",
          ],
          notes: [
            "Decide which methods change state and which only return information.",
            "If a method does not belong to this entity, it belongs in another class.",
            "UML is a planning diagram. It is not Python, and it is not optional in this statement.",
          ],
        },
        {
          type: "list",
          items: [
            "What real-world or logical entity does this class represent?",
            "What data must every object of this class store?",
            "What actions should the object be able to perform?",
            "Which methods change state, and which only report it?",
            "Should this job live here, or in another class?",
          ],
        },
        { type: "p", text: "A UML class diagram is the planning tool named in the syllabus. One class is a box in three compartments: the name, the attributes, the methods. A minus sign means private. A plus sign means public. Types are written after a colon. The diagram below is the design for a student who can enrol in courses, drop them, and answer whether they are already enrolled. It does not also calculate fees, print a timetable or send messages. Those are other responsibilities." },
        {
          type: "classbox",
          name: "Student",
          attrs: ["− name : str", "− student_id : str", "− courses : list[str]"],
          ops: [
            "+ enrol(course: str) → None",
            "+ drop(course: str) → None",
            "+ is_enrolled(course: str) → bool",
          ],
          caption: "Minus is private, plus is public. The attributes are the state. The three methods are the behaviour. is_enrolled only reports; `enrol` and `drop` change the list.",
        },
        {
          type: "code",
          title: "The same design in Python",
          source: `class Student:
    def __init__(self, name: str, student_id: str):
        self.name = name
        self.student_id = student_id
        self.courses: list[str] = []

    def enroll(self, course: str) -> None:
        if course not in self.courses:
            self.courses.append(course)

    def drop(self, course: str) -> None:
        if course in self.courses:
            self.courses.remove(course)

    def is_enrolled(self, course: str) -> bool:
        return course in self.courses`,
          caption: "This version leaves `name`, student_id and `courses` public, so it does not yet match the minus signs on the diagram. A closer match stores _name, _student_id and _courses and lets outside code use the three methods only. The responsibility is unchanged: this class manages one student's course list.",
        },
        { type: "callout", kind: "note", label: "Remember", text: "UML method names in the class notes use the American spelling `enrol`. The Python uses `enroll`. Either is fine in an answer if you are consistent. What an examiner is checking is the responsibility, the data, and which methods mutate state." },
      ],
    },
    {
      id: "static",
      nav: "Static",
      kicker: "B3.1.3 · Distinguish between static and non-static variables and methods",
      title: "Shared data and object data",
      lede: "The syllabus says static and non-static. Python has no `static` keyword for variables. The same distinction is class attribute versus instance attribute, and class method or static method versus instance method.",
      blocks: [
        {
          type: "pair",
          able: [
            "Say which values belong to one object and which belong to the class.",
            "Choose an instance attribute when every object needs its own copy.",
            "Write an instance method, a class method and a static method, and say what each receives.",
          ],
          notes: [
            "Non-static means it depends on one object: self, and self.speed.",
            "Static, in this syllabus, means it belongs to the class: shared data, or a method with no object.",
            "Use the shared value for a fact about the whole class, such as how many objects exist.",
          ],
        },
        {
          type: "table",
          title: "The five Python forms",
          head: ["Idea", "Belongs to", "How it is written", "Use it when"],
          rows: [
            ["Instance attribute", "One object", "self.speed = speed", "Each object needs its own value"],
            ["Class attribute", "The class, shared", "count = 0 inside the class", "One value should be seen by every object"],
            ["Instance method", "One object", "def accelerate(self, amount)", "The action uses or changes that object's data"],
            ["Class method", "The class", "@classmethod and cls", "The action uses class data, and might be called with no object"],
            ["Static method", "The class namespace", "@staticmethod, no self or cls", "It is a utility that happens to live with the class"],
          ],
        },
        {
          type: "code",
          title: "Each bike has a speed. The class counts the bikes.",
          source: `class Bike:
    count = 0

    def __init__(self, speed: int):
        self.speed = speed
        Bike.count += 1

    def accelerate(self, amount: int) -> None:
        self.speed += amount

    @classmethod
    def total_bikes(cls) -> int:
        return cls.count

    @staticmethod
    def km_to_miles(km: float) -> float:
        return km * 0.621371

commuter = Bike(15)
racer = Bike(30)
commuter.accelerate(5)
print(commuter.speed)       # 20
print(racer.speed)          # 30, unchanged
print(Bike.total_bikes())   # 2
print(Bike.km_to_miles(10)) # 6.21371`,
          caption: "`accelerate` must be an instance method because it changes one bike. total_bikes uses cls.count, so a subclass that shares the counter still works. km_to_miles uses neither a bike nor the class, so it is static: a function parked inside the class.",
        },
        { type: "lab", name: "bikes" },
        { type: "callout", kind: "exam", label: "Exam watch", text: "A common slip is to store a shared total as `self.count = self.count + 1` after reading a class attribute. The first time this runs, Python finds `count` on the class, then the assignment creates a new instance attribute that hides it. Later bikes no longer update the shared counter. Write `Bike.count += 1`, or `type(self).count += 1`, when the value is meant to be shared." },
      ],
    },
    {
      id: "classes",
      nav: "Classes",
      kicker: "B3.1.4 · Construct code to define classes and instantiate objects",
      title: "Define the class, then make an object",
      lede: "`class` creates the blueprint. Calling the class name creates an object. Python makes the raw instance first, then calls __init__ to set its state.",
      blocks: [
        {
          type: "pair",
          able: [
            "Write a class with __init__ and at least one method.",
            "Instantiate an object and call a method on that object only.",
            "Explain the difference between creating the object and initialising it.",
          ],
          notes: [
            "Instantiation allocates the object. Initialisation assigns the starting attribute values.",
            "In everyday explanations __init__ is called the constructor. More precisely it is the initialiser: __new__ is what actually creates the instance.",
            "A method call applies behaviour to one particular object, the one before the dot.",
          ],
        },
        {
          type: "code",
          title: "A car you can accelerate",
          source: `class Car:
    def __init__(self, make: str, speed: int = 0):
        self.make = make
        self.speed = speed

    def accelerate(self, amount: int) -> None:
        self.speed += amount

my_car = Car("Toyota")
my_car.accelerate(15)
print(my_car.make)    # Toyota
print(my_car.speed)   # 15`,
          caption: "Car(\"Toyota\") instantiates the object and initialises it in one expression. The default speed is 0, then accelerate(15) changes only my_car. A second Car(\"Honda\") would still be on 0.",
        },
        {
          type: "columns",
          items: [
            { title: "Class definition", text: "The blueprint is created when Python executes the `class` statement. No car exists yet, and no memory is holding a make or a speed." },
            { title: "Instantiation", text: "Calling Car(...) allocates a new instance. Each call makes a distinct object, even if the arguments are identical." },
            { title: "Initialisation", text: "__init__ writes the starting state: make, and speed defaulting to 0. Skip this and the object exists but has none of the attributes the methods expect." },
          ],
        },
        { type: "p", text: "Java can declare several constructors, and the compiler picks one from the argument types. Python does not. A class has one __init__. If you need another way to build the same kind of object, give __init__ default arguments, or write a class method that prepares the arguments and then calls cls(...). That second method is an alternative constructor. It is not overloading." },
        {
          type: "code",
          title: "One initialiser, and a second way in",
          source: `class Date:
    def __init__(self, year: int, month: int, day: int):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, text: str):
        year, month, day = text.split("-")
        return cls(int(year), int(month), int(day))

today = Date(2026, 5, 7)
parsed = Date.from_string("2026-05-07")`,
          caption: "Both objects end up with year, month and day set by the same __init__. from_string only parses the text. Because it uses cls, a subclass that inherits the method still constructs a member of the subclass.",
        },
      ],
    },
    {
      id: "methods",
      nav: "Methods",
      kicker: "Common methods · supports B3.1.4 and B3.1.5",
      title: "Constructors, getters, setters, __str__ and __eq__",
      lede: "These are the methods the class notes treat as standard equipment. Getters and setters are how encapsulation is actually written. __str__ and __eq__ change how an object behaves with `print` and ==.",
      blocks: [
        { type: "p", text: "A getter reads a private attribute. A setter writes one, and is the place for the rule: a balance cannot be negative, a grade must be between 0 and 100, a name cannot be empty. You need both styles below. The property style is the usual Python. The get_ and set_ style is the conventional OOP form, and it is what a question written in Java vocabulary is often expecting you to recognise." },
        {
          type: "code",
          title: "Properties: methods that look like attributes",
          source: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative.")
        self._balance = value

account = BankAccount("Alice", 100)
print(account.balance)   # 100, getter, no brackets
account.balance = 250    # setter
try:
    account.balance = -50
except ValueError as error:
    print(error)         # Balance cannot be negative.`,
          caption: "`self.balance = balance` inside __init__ already goes through the setter, so a BankAccount(\"Alice\", -10) fails at construction rather than storing a bad value. The stored attribute is _balance. The public name `balance` is the property.",
        },
        {
          type: "code",
          title: "The same rules as get_balance and set_balance",
          source: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.set_balance(balance)

    def get_balance(self):
        return self._balance

    def set_balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative.")
        self._balance = value

account = BankAccount("Alice", 100)
print(account.get_balance())  # 100
account.set_balance(250)
try:
    account.set_balance(-50)
except ValueError as error:
    print(error)              # Balance cannot be negative.`,
          caption: "Same protection, more obvious method calls. Use this form when the question says accessor and mutator, or when you want the call sites to show that a method is running.",
        },
        { type: "p", text: "__str__ and __eq__ are dunder methods. They customise built-in operations. __str__ is what print(obj) and str(obj) use, so the object can show a readable sentence instead of `<Book object at 0x7f...>`. __eq__ is what == uses. Without it, == asks whether the two names refer to the same object in memory. With it, you choose which values count as the same book. Comparing with `is` still means \"same object\", and __eq__ does not change `is`." },
        {
          type: "code",
          title: "Same ISBN means the same book, even in two objects",
          source: `class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn

    def __str__(self):
        return f"'{self.title}' by {self.author}"

    def __eq__(self, other):
        if isinstance(other, Book):
            return self.isbn == other.isbn
        return False

book1 = Book("1984", "George Orwell", "978-0451524935")
book2 = Book("1984", "George Orwell", "978-0451524935")
book3 = Book("Brave New World", "Aldous Huxley", "978-0060850524")
print(book1)            # '1984' by George Orwell
print(book1 == book2)   # True, same ISBN
print(book1 is book2)   # False, two objects
print(book1 == book3)   # False
print(book1 == "1984")  # False, not a Book`,
          caption: "The isinstance check matters. Without it, comparing a book with a string can raise AttributeError when the method tries to read other.isbn. Returning `False` is the safe answer for a different type.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "== and `is` are not interchangeable. == uses __eq__ when it exists, so two objects can compare equal by value. `is` asks whether both names point at one object. A question about object references is almost always an `is` question. A question about logical equality is an == question." },
      ],
    },
    {
      id: "references",
      nav: "References",
      kicker: "Object references · supports B3.1.4",
      title: "A name points at an object. It does not contain it.",
      lede: "An object reference is a name bound to an object in memory. Assigning one variable to another copies the reference. Both names then refer to the same object.",
      blocks: [
        {
          type: "code",
          title: "`acc2 = acc1` does not open a second account",
          source: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

acc1 = BankAccount("Alice", 500)
acc2 = acc1
print(acc1 is acc2)   # True
acc2.deposit(200)
print(acc1.balance)   # 700
print(acc2.balance)   # 700`,
          caption: "One call to BankAccount(...), so one object. Two references. The deposit is visible through both names because there is nothing else to see. To give acc2 an independent account, construct another one: `acc2 = BankAccount(acc1.owner, acc1.balance)`. Assignment alone will not do it.",
        },
        { type: "lab", name: "references" },
        { type: "callout", kind: "note", label: "Remember", text: "Passing an object into a function also passes the reference. A function that calls `deposit` on its parameter changes the caller's object. Rebinding the parameter, with `account = BankAccount(...)`, does not change the caller's variable. Rebinding a name is local. Mutating the object is shared." },
      ],
    },
    {
      id: "encapsulation",
      nav: "Encapsulation",
      kicker: "B3.1.5 · Encapsulation and information hiding",
      title: "Wrap the data, and hide the mechanism",
      lede: "Encapsulation and information hiding both let code change without breaking, and they are not the same claim. Encapsulation is the mechanism: data and the code that works on it live in one unit. Information hiding is the goal: a decision that is likely to change stays behind a stable interface.",
      blocks: [
        {
          type: "pair",
          able: [
            "Define both terms and use them for a class you have written.",
            "Explain why a private field, on its own, does not hide a design decision.",
            "Spot a leak: a mutable internal object, a method named after the storage, or a raw library type.",
          ],
          notes: [
            "Encapsulation protects an invariant, a rule the object must always obey.",
            "Information hiding protects a decision, such as a data format, an algorithm, or a storage choice.",
            "The question is not only \"which fields are private?\" It is \"what could change here, and who would have to know?\"",
          ],
        },
        { type: "p", text: "Without encapsulation, the data is a plain value any code can edit. Nothing in this dictionary can defend the rule that a balance stays at least 0." },
        {
          type: "code",
          title: "A dictionary has no invariant",
          source: `account = {"owner": "Mei", "balance": 100}
account["balance"] -= 500   # nothing prevents this
print(account["balance"])   # -400: the rule "balance >= 0" is broken`,
          caption: "Any line in the program can reach into the dictionary. The rule lives nowhere, so it is enforced nowhere.",
        },
        { type: "p", text: "The class below puts the data and the rule in one place. Outside code changes the balance only through `deposit` and `withdraw`, and it can read `balance` but not assign to it." },
        {
          type: "code",
          title: "The account refuses to break its own rule",
          source: `class BankAccount:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("Opening balance cannot be negative")
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

    @property
    def balance(self):
        return self._balance

acc = BankAccount("Mei", 100)
acc.withdraw(30)
print(acc.balance)          # 70
try:
    acc.withdraw(500)
except ValueError as error:
    print(error)            # Insufficient funds
try:
    acc.balance = 1000
except AttributeError as error:
    print(type(error).__name__)  # AttributeError: no setter`,
          caption: "withdraw(30) is a legal change, so the balance becomes 70. withdraw(500) raises ValueError and leaves 70 in place. acc.balance = 1000 raises AttributeError because the property has no setter. The leading underscore marks _balance as internal; B3.1.1 already showed that this is a convention, not a lock.",
        },
        { type: "p", text: "A property is how Python lets you add a rule later without changing the call sites. Callers keep writing `s.age`. The `get_` and `set_` form, in the methods section, is what a question written in Java vocabulary often expects. The property is the same idea with the call looking like an attribute." },
        {
          type: "code",
          title: "Start with an attribute. Add the rule without changing the caller.",
          source: `class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not 0 < value < 150:
            raise ValueError("Age must be between 1 and 149")
        self._age = value

s = Student("Ali", 20)
s.age = 21
print(s.age)    # 21
try:
    s.age = -5
except ValueError as error:
    print(error)  # Age must be between 1 and 149`,
          caption: "self.age = age inside __init__ already goes through the setter, so Student(\"Ali\", -5) fails at construction. From outside, s.age = 21 still looks like an assignment.",
        },
        { type: "lab", name: "bank" },
        { type: "p", text: "Information hiding means each module keeps a design decision secret, so that changing the decision affects only that module. David Parnas set the idea down in 1972: split a program around the decisions most likely to change, such as data formats, algorithms, and storage. A gradebook's decision is how scores are stored. The interface stays small: `add_score`, `average`, `top_student`." },
        {
          type: "code",
          title: "Version 1: every score is kept in a list",
          source: `class Gradebook:
    def __init__(self):
        self._scores = {}

    def add_score(self, name, score):
        self._scores.setdefault(name, []).append(score)

    def average(self, name):
        scores = self._scores[name]
        return sum(scores) / len(scores)

    def top_student(self):
        return max(self._scores, key=self.average)

gb = Gradebook()
gb.add_score("Mei", 90)
gb.add_score("Mei", 80)
gb.add_score("Ali", 95)
print(gb.average("Mei"))   # 85.0
print(gb.top_student())    # Ali`,
          caption: "The caller never sees the list. That is the whole of the secret. _scores could be replaced, and these four calls would not notice.",
        },
        {
          type: "code",
          title: "Version 2: a running total, and the same caller",
          source: `class Gradebook:
    def __init__(self):
        self._totals = {}

    def add_score(self, name, score):
        entry = self._totals.setdefault(name, [0, 0])
        entry[0] += score
        entry[1] += 1

    def average(self, name):
        total, count = self._totals[name]
        return total / count

    def top_student(self):
        return max(self._totals, key=self.average)

gb = Gradebook()
gb.add_score("Mei", 90)
gb.add_score("Mei", 80)
gb.add_score("Ali", 95)
print(gb.average("Mei"))   # 85.0
print(gb.top_student())    # Ali`,
          caption: "Millions of scores would make version 1 slow, because average walks the whole list. Version 2 keeps a total and a count. The calls are character for character the same, which is only possible because no caller ever saw the list.",
        },
        { type: "p", text: "You can encapsulate without hiding anything, and you can hide a decision without a class. The two thermometers make the first case. Both bundle data with methods. Only the second one keeps a decision secret." },
        {
          type: "code",
          title: "Encapsulated, but the decision leaks",
          source: `class Thermometer:
    def __init__(self):
        self._fahrenheit = 32.0

    def get_fahrenheit(self):
        return self._fahrenheit

    def set_fahrenheit(self, value):
        self._fahrenheit = value

room = Thermometer()
room.set_fahrenheit(212)
print(room.get_fahrenheit())  # 212`,
          caption: "The field is marked internal, and every read or write goes through a method. Callers still depend on Fahrenheit. Switching the stored unit to Celsius would break every one of them. The data is encapsulated. The decision is not hidden.",
        },
        {
          type: "code",
          title: "The same object, described by what the caller wants",
          source: `class Thermometer:
    def __init__(self, celsius=0.0):
        self._kelvin = celsius + 273.15

    def celsius(self):
        return self._kelvin - 273.15

    def fahrenheit(self):
        return self.celsius() * 9 / 5 + 32

room = Thermometer(100)
print(room.celsius())      # 100.0
print(room.fahrenheit())   # 212.0`,
          caption: "The secret is that the stored unit is kelvin. Callers ask for a scale by name. The storage can change, and celsius() and fahrenheit() stay the interface.",
        },
        { type: "p", text: "The other way round needs no class. Callers receive an opaque handle, here a plain integer, and pass it to functions. Nothing is bundled into an object, and nothing is enforced, yet main.py cannot see how a stack is stored. You could rewrite the storage as a linked list of tuples and the caller would keep working. C's FILE* is the same pattern. A Python module is a loose sort of bundling, so \"without encapsulation\" here means without a class and without access control." },
        {
          type: "code",
          title: "stack.py keeps the storage. main.py sees an int.",
          source: `# stack.py
_stacks = {}
_next_id = 0

def new():
    global _next_id
    _next_id += 1
    _stacks[_next_id] = []
    return _next_id

def push(handle, item):
    _stacks[handle].append(item)

def pop(handle):
    return _stacks[handle].pop()

def is_empty(handle):
    return not _stacks[handle]

# main.py — only the integer handle crosses this line
s = new()
push(s, 1)
push(s, 2)
print(pop(s))        # 2
print(is_empty(s))   # False`,
          caption: "The handle s is only an int. main.py never mentions _stacks. In two real files the caller would be import stack, then stack.new(), stack.push(s, 1), stack.push(s, 2), stack.pop(s). The calls are gathered here so the example runs as one paste.",
        },
        {
          type: "table",
          title: "The distinction, in the form an answer can use",
          head: ["", "Encapsulation", "Information hiding"],
          rows: [
            ["What it is", "A language mechanism", "A design principle"],
            ["Core idea", "Bundle data with its methods, and control access", "Keep a changeable decision behind a stable interface"],
            ["Main benefit", "Protects an invariant, such as a balance that cannot go negative", "Limits how far a change spreads"],
            ["Python tools", "A class, _name, __name, and @property", "A small interface, an opaque handle, returning a copy"],
            ["Can exist alone?", "Yes: getters and setters that expose the whole representation", "Yes: functions that pass around an opaque handle"],
          ],
        },
        { type: "p", text: "A class can mark every field with an underscore and still leak. Three patterns are worth spotting. The test for all three is the same: if the inside changed, how many other files would you have to edit? More than zero means something has leaked." },
        {
          type: "code",
          title: "Leak 1: the caller is handed the real list",
          source: `class Course:
    def __init__(self):
        self._students = []

    def enroll(self, name):
        if len(self._students) >= 30:
            raise ValueError("Course is full")
        self._students.append(name)

    def students(self):
        return self._students

c = Course()
c.students().extend(["x"] * 100)
try:
    c.enroll("Mei")
except ValueError as error:
    print(error)                 # Course is full
print(len(c.students()))        # 100`,
          caption: "`students()` returns the actual list, so `extend` bypasses the 30-student rule and then `enroll` sees a full course that nobody enrolled in. Return a copy, `list(self._students)` or `tuple(self._students)`, and the caller can read the names without editing the class's list.",
        },
        {
          type: "code",
          title: "The same leak, with a dictionary",
          source: `class Inventory:
    def __init__(self):
        self._items = {}

    def add(self, name, qty):
        if qty <= 0:
            raise ValueError("Quantity must be positive")
        self._items[name] = self._items.get(name, 0) + qty

    def items(self):
        return self._items

inv = Inventory()
inv.add("pen", 10)
inv.items()["pen"] = -5
print(inv.items()["pen"])   # -5, add() was bypassed`,
          caption: "`add` refuses a quantity that is not positive. `items()` then gives away the real dictionary, so a caller can store −5 anyway. Return a copy, `dict(self._items)`, if the caller only needs to look.",
        },
        { type: "p", text: "The second leak is a method named after the storage. `get_student_dict()` promises that a dictionary exists. Name the method after what the caller wants, such as `find_student(name)`, and the storage can change. The third leak is returning another library's type. If `UserRepository.find()` returns a raw database row, every caller now depends on that database library. Return your own simple type, such as a `User` dataclass, and the database can be swapped." },
        { type: "p", text: "In good code the two ideas work together. Encapsulation gives you the walls. Information hiding decides where to put them." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Do not stop at \"the attributes are private.\" A private field with a getter and setter that expose the real representation, like the Fahrenheit thermometer, is encapsulation without information hiding. A method that returns the real list, like students() or items(), breaks the invariant the class thought it was protecting. Say what is bundled, what decision is hidden, and what a caller is still able to depend on." },
      ],
    },
  ],
  mcqs: [
    {
      q: "Which description matches a class, rather than an object?",
      options: [
        "A value stored in memory, with its own attributes filled in",
        "A blueprint that defines attributes and methods, and holds no real data of its own",
        "A method that returns the value of a private attribute",
        "A second name for an object that already exists",
      ],
      answer: 1,
      why: "The class is the plan. The object is the instance built from it, and that is the one that occupies memory and stores data. A getter is a method. A second name is a reference.",
    },
    {
      q: "A program creates two Bike objects and then calls `accelerate` on the first one. Which statement is correct?",
      options: [
        "Both bikes speed up, because speed is shared class data",
        "Only the first bike's speed changes, and Bike.count stays the same",
        "Bike.count increases by one, because a method ran",
        "The second bike is destroyed, because it was not used",
      ],
      answer: 1,
      why: "speed is an instance attribute, so `accelerate` writes to one object. count changes when a bike is constructed, not when one is accelerated.",
    },
    {
      q: "`acc1 = BankAccount(\"Alice\", 500)` and then `acc2 = acc1`. After `acc2.deposit(200)`, what is `acc1.balance`?",
      options: ["500", "200", "700", "It raises an error, because acc1 was not used"],
      answer: 2,
      why: "The assignment copies the reference. There is still one account, so the deposit is visible through both names. `acc1 is acc2` is `True`.",
    },
    {
      q: "Which pair is the best distinction?",
      options: [
        "Encapsulation hides data; information hiding means a class has methods",
        "Encapsulation groups data with the methods that act on it; information hiding limits what outside code can see and depend on",
        "They are two words for access modifiers",
        "Information hiding is only possible in Java, so Python cannot encapsulate",
      ],
      answer: 1,
      why: "Encapsulation is the grouping, and it is possible in Python. Information hiding is the decision to expose an interface and conceal the storage and the rules. Access modifiers are one tool for the second idea, not the whole idea.",
    },
    {
      q: "A balance property raises ValueError when the new value is negative. The account currently holds 100. What does `account.balance = -50` do?",
      options: [
        "Stores −50, because assignment never calls a method",
        "Stores 0 instead, as a default",
        "Raises ValueError and leaves the stored balance at 100",
        "Deletes the account",
      ],
      answer: 2,
      why: "Assignment to a property calls the setter. The setter rejects the value before writing _balance, so the old state survives.",
    },
    {
      q: "Two Book objects have the same ISBN and __eq__ compares ISBNs. `book1 == book2` and `book1 is book2`. What are the two results?",
      options: [
        "True and True",
        "False and False",
        "True and False",
        "False and True",
      ],
      answer: 2,
      why: "== follows __eq__, so the ISBN match makes it `True`. `is` asks whether both names point at the same object. They were constructed separately, so `is` is `False`.",
    },
  ],
  checks: [
    "Define class, object, attribute and method, and give one example of each from a program I could write.",
    "State two advantages and two disadvantages of OOP, each tied to a kind of problem.",
    "Design a class with one responsibility: its attributes, and which methods change state.",
    "Read a UML class box, including what + and − mean.",
    "Distinguish an instance attribute from a class attribute, and an instance method from a class method and a static method.",
    "Write a class, instantiate two objects, and explain why __init__ is an initialiser.",
    "Protect a value with a property or with get_ and set_ methods, and say what the setter rejects.",
    "Explain what __str__ changes and what __eq__ changes, and how == differs from `is`.",
    "Predict what happens when a second variable is assigned an existing object and a method then mutates it.",
    "Distinguish encapsulation from information hiding, and explain Python's `_`, `__` and name mangling.",
    "Give one case of encapsulation without information hiding, and spot a method that leaks a mutable internal object.",
  ],
};
