export const topic = {
  id: "B3.1",
  title: "Fundamentals of OOP for a single class",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "Object-oriented programming organises a program around objects. An object keeps its own data, and its methods are the actions that use that data. A class is the blueprint those objects are built from. This page is the single-class part of B3: the ideas, the design, the Python, and the limits of the paradigm.",
  chips: ["B3.1", "SL and HL", "Python 3", "7 hours at SL"],
  mapTitle: "The five statements in B3.1",
  mapLede: "B3.1 is examined at both SL and HL. Inheritance and polymorphism are named here. The code for them, and the rest of the work with several classes, is in B3.2, which is HL only.",
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
        { type: "h3", text: "Key OOP concepts" },
        {
          type: "list",
          items: [
            "Class: a class is a blueprint, template, or recipe used to create objects. It defines the structure (what attributes it will have) and the behaviour (what methods it can run), but it does not contain real data on its own. Writing a class is like drawing the architectural blueprint for a house. You cannot live inside the blueprint itself, but you use it to build actual houses.",
            "Object: an object is a concrete instance of a class created from its blueprint. It occupies space in the computer's memory and holds actual data. If the class is the blueprint of a house, the object is the house built on a specific street. From one class blueprint you can instantiate as many objects as you need. For example, user1 for Alice and user2 for Bob are both objects of the User class. An object consists of state (its attributes) and related behaviour (its methods). It stores that state in fields and exposes the behaviour through methods.",
            "Attribute: attributes are the data stored inside a class or its objects. They represent the state of the class itself, or of each instance created from it. There are two types: instance attributes and class attributes. Instance attributes belong to each object and are accessed through `self`. Class attributes belong to the class itself and are shared by all instances.",
            "Method: a method is a collection of code that can be identified by its name and accessed at any point in a program by simply using its name. Methods can accept input values, known as parameters. An instance method can be called on an instance of a class, and has access to both instance variables (unique to each instance) and class variables (shared across all instances of the class). In Python, it always has `self` as the first parameter. A class method belongs to the class itself, not to any individual instance. It works with class-level data and can be called without creating an object. In Python, it uses the `@classmethod` decorator and `cls` instead of `self`.",
            "Encapsulation: encapsulation conceals the implementation details of data within a class and provides access to that data from outside the class only through methods such as accessor or mutator methods. B3.1.5 explains how the mechanism works.",
            "Inheritance: inheritance models an is-a relationship. A class (the child, or subclass) can inherit attributes and methods from another class (the parent, or superclass). Inheritance lets a class reuse and extend another class's code. The code is in B3.2.1, which is HL only.",
            "Polymorphism: polymorphism means different classes can be used through the same interface, so one method name can produce different behaviour depending on the object. Subclasses can override a parent method, and each object then responds in its own way. In short, it is one interface with many implementations. There are two types: method overloading and method overriding. The code is in B3.2.2, which is HL only.",
            "Special methods: an accessor (getter) returns an attribute of an object. A mutator (setter) updates a private attribute, usually after checking the new value, and the object's state changes. A constructor in Python is the special method `__init__`. It runs automatically when you create an object, and its job is to initialise the instance variables and set up the object's starting state.",
            "Access modifiers: Python does not enforce access the way Java and C++ do. It uses naming conventions to signal whether an attribute or method is meant to be public or private. By default, attributes and methods are public. A name without a leading underscore is public, so it can be used from anywhere. A single leading underscore, as in `_balance`, marks a name as internal. A double underscore prefix marks a name as private. Python then mangles that name to `_ClassName__name`, which makes an accidental access less likely. Dunder methods such as `__init__` and `__str__` are not mangled, because they have underscores on both sides.",
          ],
        },
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
          caption: "The last line prints 1234, which is the point. The attribute was renamed, not locked away. In an exam answer, say that this kind of privacy is a warning, not a guarantee.",
        },
        { type: "h3", text: "Why OOP can help" },
        { type: "p", text: "OOP is often a strong choice when a problem involves several real-world entities with different responsibilities. A library system can be broken into Book, Member, and Loan objects. A game can be broken into Player, Enemy, and Item objects. An online shop can be broken into Product, Cart, and Order objects." },
        { type: "p", text: "By giving each class a clear role, the program becomes easier to reason about. Changes in one part of the system can often be made inside one class instead of being scattered across unrelated code." },
        { type: "h3", text: "Advantages and disadvantages" },
        { type: "p", text: "Advantages:" },
        {
          type: "list",
          items: [
            "Code reuse: a class created for an object-oriented program can easily be reused in other programs, and in other parts of the program.",
            "Speed of development: work can be split across development groups, so developers can work on different parts of the program at the same time.",
            "Quicker to test: each module is small and independent, and can therefore be tested separately.",
          ],
        },
        { type: "p", text: "Disadvantages:" },
        {
          type: "list",
          items: [
            "Increased complexity for small problems.",
            "Size: object-oriented programs are in general larger than other programs. That may pose a problem when there is only limited storage.",
            "Effort: object-oriented programs require a lot of work to create. A great deal of planning goes into an object-oriented program well before a single piece of code is written.",
            "Unsuitable for minor projects. OOP increases complexity but gains little for small projects.",
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
          caption: "`borrow()` prints True the first time and False the second time, because `_on_loan` is already True.",
        },
        { type: "p", text: "In this example, the object stores its own state in `_title`, `_author`, and `_on_loan`. These instance variables are treated as private. Variables with two leading underscores are also private, and they trigger name mangling, which makes them difficult to access from the outside. The Secret class above is that case." },
        { type: "p", text: "The methods `borrow()` and `return_book()` are the behaviours that control that state." },
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
            "UML is a planning diagram, not Python code. This syllabus statement expects you to use it.",
          ],
        },
        { type: "p", text: "Class design begins before code is written. Start by identifying the important entities in the problem, the data each entity must store, and the actions each entity must perform. A strong design gives each class one clear responsibility." },
        { type: "p", text: "The syllabus also points to UML class diagrams. A UML class diagram is a planning tool that shows class names, attributes, methods, and relationships between classes. Even if the final code is Python, UML still helps structure the design." },
        { type: "h3", text: "Questions to ask when designing a class" },
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
          caption: "A minus sign means private, and a plus sign means public. The attributes are the state. The three methods are the behaviour. `is_enrolled` only reports a fact. `enrol` and `drop` change the list.",
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
          caption: "This version leaves `name`, student_id and `courses` public, so it does not yet match the minus signs on the diagram. A closer match stores `_name`, `_student_id` and `_courses` and lets outside code use the three methods only.",
        },
        { type: "p", text: "The design is simple because the class has one main job: to manage a student's course list. That is usually better than putting registration, fee calculation, timetable printing, and messaging into the same class." },
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
            "Non-static means it belongs to one object, as with `self` and `self.speed`.",
            "Static, in this syllabus, means it belongs to the class: shared data, or a method with no object.",
            "Use the shared value for a fact about the whole class, such as how many objects exist.",
          ],
        },
        { type: "p", text: "The syllabus uses the terms static and non-static. Python does not use the keyword `static` for variables, but the idea still exists through class attributes, instance attributes, class methods, and static methods." },
        { type: "h3", text: "Python equivalents" },
        {
          type: "list",
          items: [
            "Instance attribute: belongs to one object. Accessed through `self`, for example `self.speed`.",
            "Class attribute: belongs to the class itself and is shared by all objects, for example `Bike.count`.",
            "Instance method: works with one object's data and receives `self`.",
            "Class method: uses `@classmethod`, receives `cls`, and usually works with class-level data.",
            "Static method: uses `@staticmethod` and behaves like a utility function placed inside the class namespace.",
          ],
        },
        { type: "p", text: "Use an instance attribute when each object should keep its own separate value. Use a class attribute when one value should be shared across every object of that class." },
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
          caption: "`accelerate` must be an instance method because it changes one bike. `total_bikes` uses `cls.count`, so a subclass that shares the counter still works. `km_to_miles` uses neither a bike nor the class, so it is a static method: a utility that happens to live in the class.",
        },
        { type: "p", text: "Every Bike object has its own `speed`, so `speed` is an instance attribute. The class-wide value `count` tracks how many bikes have been created, so it is a class attribute shared across all objects." },
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
            "In everyday explanations, `__init__` is called the constructor. More precisely, it is the initialiser. `__new__` is what actually creates the instance.",
            "A method call applies behaviour to one particular object, the one before the dot.",
          ],
        },
        { type: "p", text: "To define a class in Python, use the `class` keyword. To instantiate an object, call the class name like a function. Python treats classes as callable objects, creates a new instance, and then runs `__init__` to initialise the new object's state." },
        { type: "p", text: "In beginner OOP discussions, `__init__` is often described as a constructor because it is the method that initialises object data. More precisely, Python creates the object first and then calls `__init__` to customise it." },
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
          caption: "`Car(\"Toyota\")` creates the object and initialises it in one expression. The speed starts at 0, then `accelerate(15)` changes only `my_car`. A second car, `Car(\"Honda\")`, would still have a speed of 0.",
        },
        { type: "h3", text: "Key ideas to explain" },
        {
          type: "list",
          items: [
            "Class definition: the blueprint is created. No car exists yet, and no memory is holding a make or a speed.",
            "Instantiation and initialisation: instantiation allocates memory to create a concrete instance of a class. Initialisation sets that new instance's starting state, assigning default or given values to its attributes. Calling `Car(...)` does both. Each call makes a distinct object, even when the arguments match.",
            "Method call: behaviour is applied to that particular object, the one before the dot.",
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
      lede: "These are the methods the class notes treat as standard equipment. Getters and setters are how encapsulation is actually written. `__str__` and `__eq__` change how an object behaves with `print` and `==`.",
      blocks: [
        { type: "h3", text: "Constructor" },
        { type: "p", text: "A constructor in Python is a special method that runs automatically when a new object is created. Its main role is to initialise the object's state, its instance variables, with starting values." },
        { type: "p", text: "In Python, the `__init__()` method serves as the standard constructor. The notes also say a class can have multiple constructors with different parameters. Java can do that, and the compiler picks one from the argument types. Python still has one `__init__`. A second way to build the same kind of object is a class method that prepares the arguments and then calls `cls(...)`, as `Date.from_string` does above. That is an alternative constructor, not overloading." },
        { type: "h3", text: "Getters and setters" },
        { type: "p", text: "Getters and setters, also known as accessors and mutators, are public methods used to access and update private attributes safely. That is one way encapsulation is written." },
        {
          type: "list",
          items: [
            "Getters read and retrieve the current value of a private variable.",
            "Setters write or update the value of a private variable, usually after a check. For example, a balance cannot be negative, a grade must be between 0 and 100, and a name cannot be empty.",
          ],
        },
        { type: "p", text: "In Python, getters and setters are most cleanly implemented with the `@property` decorator. Callers then use the method like a regular attribute, and the class still controls validation." },
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
          caption: "`self.balance = balance` inside `__init__` already goes through the setter, so `BankAccount(\"Alice\", -10)` fails at construction rather than storing a bad value. The stored attribute is `_balance`. The public name `balance` is the property.",
        },
        { type: "p", text: "In conventional object-oriented programming, similar to Java or C++, getters and setters are explicit methods prefixed with `get_` and `set_`." },
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
          caption: "Same protection, with the method call written out. The getter is called with parentheses. The setter is passed the new value.",
        },
        { type: "p", text: "You must know both ways to define getters and setters. The property style is the usual Python. The `get_` and `set_` style is what a question written in Java vocabulary is often expecting you to recognise." },
        { type: "h3", text: "__str__ and __eq__" },
        { type: "p", text: "Both `__str__` and `__eq__` are special dunder (double underscore) methods. They customise how objects behave with built-in functions and operators." },
        {
          type: "list",
          items: [
            "`__str__` controls what `print(obj)` or `str(obj)` returns: a human-readable string. Without it, `print` shows something like `<Book object at 0x7f...>`.",
            "`__eq__` controls how `==` compares two objects by their values rather than by their memory locations. Without it, `==` asks whether both names refer to the same object. Comparing with `is` still means the same object, and `__eq__` does not change `is`.",
          ],
        },
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
      lede: "An object reference in Python is a name that points to an object stored in memory. The name does not contain the object. It only refers to it.",
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
          caption: "`acc1 is acc2` prints True. After `acc2.deposit(200)`, both names print 700.",
        },
        { type: "p", text: "In the example above, there is only one object, created by calling the constructor. There are two object references, and both refer to that same object." },
        { type: "p", text: "If you want `acc2` to be an independent account rather than an alias, you must instantiate a new object, or create a copy, rather than assigning `acc2 = acc1`. One way is `acc2 = BankAccount(acc1.owner, acc1.balance)`." },
        { type: "lab", name: "references" },
        { type: "callout", kind: "note", label: "Remember", text: "Passing an object into a function also passes the reference. A function that calls `deposit` on its parameter changes the caller's object. Rebinding the parameter, with `account = BankAccount(...)`, does not change the caller's variable. Rebinding a name is local. Mutating the object is shared." },
      ],
    },
    {
      id: "encapsulation",
      nav: "Encapsulation",
      kicker: "B3.1.5 · Encapsulation and information hiding",
      title: "Wrap the data, and hide the mechanism",
      lede: "Encapsulation and information hiding both help you build code that can change without breaking. They are related but not the same. Encapsulation is a mechanism: you bundle data with the code that works on it. Information hiding is a design goal: you keep the decisions most likely to change behind a stable interface.",
      blocks: [
        { type: "p", text: "By the end of this section you should be able to:" },
        {
          type: "list",
          items: [
            "Define encapsulation and information hiding in your own words.",
            "Use Python's conventions (`_name`, `__name`, `@property`) to protect an object's internals.",
            "Explain why private fields alone do not guarantee information hiding.",
          ],
        },
        { type: "h3", text: "Encapsulation" },
        { type: "p", text: "Encapsulation means putting data and the functions that operate on it into one unit, usually a class, and controlling how outside code reaches that data. Its main job is to protect invariants: rules the object must always obey." },
        { type: "h3", text: "Advantages of encapsulation" },
        { type: "p", text: "There are several benefits of using encapsulation in programming." },
        {
          type: "list",
          items: [
            "Firstly, it makes maintenance easier. Any change to the data, or to the way it is stored and accessed internally, can be made in just one class. Other classes that use that data can keep calling the public accessor methods, and they do not need to be modified.",
            "Secondly, encapsulation enhances data hiding and security. A class can hide the way data is stored, preventing accidental access or modification. It can also restrict the ways its data and actions are altered or called, which is an extra layer of security.",
            "Thirdly, encapsulation can make testing easier, because the data structure is contained in a single class. Each class manages its own data, so classes can be tested independently without relying on the internal details of other classes.",
            "Lastly, encapsulation can speed up development. Different programmers can work independently on different classes. Because the internal workings of each class are hidden, they can work on several classes at the same time without interfering with each other's work.",
          ],
        },
        { type: "p", text: "Encapsulation is implemented with:" },
        {
          type: "list",
          items: [
            "Public methods.",
            "Control over who can see the operations, the methods, and the fields.",
            "Data that is private, and not directly accessible.",
          ],
        },
        { type: "h3", text: "Without encapsulation" },
        { type: "p", text: "Here a bank account is just a dictionary. Any code can change the balance directly, so nothing stops it from going negative." },
        {
          type: "code",
          title: "A dictionary has no invariant",
          source: `account = {"owner": "Mei", "balance": 100}
account["balance"] -= 500   # nothing prevents this
print(account["balance"])   # -400: the rule "balance >= 0" is broken`,
          caption: "The print is −400. Nothing in the dictionary knew that a balance has to stay at least 0.",
        },
        { type: "h3", text: "With encapsulation" },
        { type: "p", text: "Now the data and the rules live together. Outside code changes the balance only through methods that check the rule." },
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
          caption: "`withdraw(30)` leaves the balance at 70. `withdraw(500)` raises ValueError and does not change it. `acc.balance = 1000` raises AttributeError, because the property has no setter.",
        },
        { type: "lab", name: "bank" },
        { type: "h3", text: "How Python controls access" },
        { type: "p", text: "Python has no private keyword. It relies on naming conventions instead." },
        {
          type: "table",
          head: ["Name", "Meaning", "Enforced?"],
          rows: [
            ["balance", "Public: part of the interface", "No restriction"],
            ["_balance", "Internal: \"please don't touch\"", "Convention only"],
            ["__balance", "Name-mangled to _BankAccount__balance", "Hard to reach by accident, still reachable"],
          ],
        },
        { type: "p", text: "The Python saying is \"we are all consenting adults here.\" The underscore tells other programmers what is safe to depend on. Use a single underscore for most internal attributes. Use a double underscore mainly to avoid name clashes in subclasses." },
        { type: "h3", text: "Properties: start simple, add rules later" },
        { type: "p", text: "In Python you can start with a plain public attribute. If you later need validation, switch to a `@property`. Callers keep writing `obj.attr` and never notice the change." },
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
          caption: "`self.age = age` inside `__init__` already goes through the setter, so `Student(\"Ali\", -5)` fails at construction. From outside, `s.age = 21` still looks like an assignment.",
        },
        { type: "p", text: "This is why Python code rarely needs `get_x()` and `set_x()` methods." },
        { type: "h3", text: "Information hiding" },
        { type: "p", text: "Information hiding means each module keeps a design decision secret, so that changing the decision affects only that module. David Parnas introduced the idea in 1972. His advice: split a program around the decisions most likely to change, such as data formats, algorithms, or storage." },
        { type: "p", text: "The question to ask is not \"which fields are private?\" but \"what could change here, and who would have to know?\"" },
        { type: "h3", text: "Example: a gradebook" },
        { type: "p", text: "The interface below is small: add a score, get a student's average, get the top student. How the scores are stored is the secret. Version 1 stores every score in a list." },
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
          caption: "These calls use the public interface and nothing else. They print 85.0 and Ali.",
        },
        { type: "p", text: "Suppose the school now has millions of scores, and calculating each average is too slow. Version 2 keeps only a running total and a count for each student." },
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
          caption: "The four calls are the same as in version 1, and so are the results: 85.0 and Ali.",
        },
        { type: "p", text: "The code that uses the gradebook does not change at all. This works because no caller ever saw the list of scores. The storage choice was hidden, so it could be replaced freely." },
        { type: "h3", text: "How they differ" },
        { type: "p", text: "Encapsulation is a tool; information hiding is the goal the tool usually serves. You can have either one without the other, and seeing both cases makes the difference clear." },
        { type: "h3", text: "Encapsulation without information hiding" },
        { type: "p", text: "This class bundles its data and marks it internal, but every getter and setter exposes the exact representation: temperature stored in Fahrenheit." },
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
          caption: "Reading and writing go through methods, and the caller still has to know that the stored number is Fahrenheit.",
        },
        { type: "p", text: "Callers now depend on Fahrenheit. Switching the internal unit to Celsius would break every one of them. The data is encapsulated, but the decision is not hidden." },
        { type: "p", text: "A version that hides the decision describes what callers want, not how it is stored:" },
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
          caption: "`_kelvin` is the secret. Callers ask for `celsius()` or `fahrenheit()` and never name the stored unit.",
        },
        { type: "h3", text: "Information hiding without encapsulation" },
        { type: "p", text: "This module uses no class. Callers get an opaque handle (a plain integer) and pass it to functions. The data is not bundled with its behaviour, and nothing is enforced, yet callers cannot see how a stack is stored." },
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
          caption: "The calls are in the same listing so that the example runs when you paste it. In two files, main.py would say `import stack`, then `stack.new()`, `stack.push(s, 1)`, `stack.push(s, 2)`, and `stack.pop(s)`. The handle `s` is only an integer.",
        },
        { type: "p", text: "You could rewrite stack.py to use a linked list of tuples, and main.py would keep working. This is the same pattern as C's FILE*. A Python module is itself a loose bundle of names, so \"without encapsulation\" here means without a class and without access control." },
        {
          type: "table",
          title: "Encapsulation and information hiding",
          head: ["", "Encapsulation", "Information hiding"],
          rows: [
            ["What it is", "A language mechanism", "A design principle"],
            ["Core idea", "Bundle data with its methods; control access", "Keep changeable decisions behind a stable interface"],
            ["Main benefit", "Protects invariants (for example, a balance never negative)", "Limits how far a change spreads"],
            ["Python tools", "Classes, `_name`, `__name`, `@property`", "Small interfaces, opaque handles, returning copies"],
            ["Can exist alone?", "Yes: getters and setters that expose everything", "Yes: a module of functions with an opaque handle"],
          ],
        },
        { type: "p", text: "In good code the two usually work together: encapsulation gives you the walls, and information hiding decides where to put them." },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Do not stop at \"the attributes are private.\" Say what is bundled, which decision is hidden, and what a caller can still depend on. Getters and setters that expose Fahrenheit are the case the table describes as encapsulation without information hiding." },
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
      why: "`speed` is an instance attribute, so `accelerate` changes only the first bike. `Bike.count` changes when a bike is constructed, not when one is accelerated.",
    },
    {
      q: "`acc1 = BankAccount(\"Alice\", 500)` and then `acc2 = acc1`. After `acc2.deposit(200)`, what is `acc1.balance`?",
      options: ["500", "200", "700", "It raises an error, because acc1 was not used"],
      answer: 2,
      why: "The assignment copies the reference. There is still one account, so the deposit is visible through both names. `acc1 is acc2` is `True`.",
    },
    {
      q: "Which statement best distinguishes encapsulation from information hiding?",
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
    "Give one case of encapsulation without information hiding.",
  ],
};
