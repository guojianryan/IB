export const topic = {
  id: "B3.1",
  title: "Fundamentals of OOP for a single class",
  kicker: "IB DP Computer Science · Theme B · SL and HL",
  lede: "Object-oriented programming organises a program around objects. An object keeps its own data, and its methods are the actions that use that data. A class is the blueprint those objects are built from. This page is the single-class part of B3. The examples are Python 3. Short listings marked In Java give the vocabulary a Java Paper 2 uses for the same ideas: `private`, `static`, `this`, and constructors.",
  chips: ["B3.1", "SL and HL", "Python 3", "7 hours at SL"],
  mapTitle: "B3.1, and two supporting sections",
  mapLede: "B3.1 is examined at both SL and HL. The five numbered cards are the syllabus statements. The two Extra cards support B3.1.4 and B3.1.5, and they are not separate statements. Inheritance and polymorphism are named in B3.1.1. The code for them is in B3.2, which is HL only.",
  map: [
    ["#fundamentals", "B3.1.1", "Evaluate the fundamentals", "Classes, objects, encapsulation, inheritance and polymorphism, and when OOP is a poor fit."],
    ["#design", "B3.1.2", "Design a class", "One responsibility, the data, the actions, and a UML class diagram."],
    ["#static", "B3.1.3", "Static and non-static", "Instance data versus class data, and instance, class and static methods."],
    ["#classes", "B3.1.4", "Write the class, make the object", "class, a call that instantiates, and __init__ setting the starting state."],
    ["#encapsulation", "B3.1.5", "Encapsulation and information hiding", "Protect the invariant, and hide the decision that is likely to change."],
    ["#methods", "Extra", "Common methods", "Supports B3.1.4 and B3.1.5. Constructors, getters, setters, __str__ and __eq__."],
    ["#references", "Extra", "Object references", "Supports B3.1.4. Two names can point at one object."],
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
            "Class: a class is a blueprint for objects. It defines the attributes and the methods, and it holds no real data of its own until an object is created. B3.1.4 shows how to write one.",
            "Object: an object is one instance built from a class. It stores state in its attributes and exposes behaviour through its methods. From one class you can make many objects, such as `user1` and `user2` from a User class.",
            "Attribute: an attribute is data stored by the class or by one object. An instance attribute belongs to one object, as with `self.speed`. A class attribute is shared, as with `Bike.count`. B3.1.3 distinguishes them.",
            "Method: a method is called on an object (`bike.accelerate(5)`) or on a class (`Bike.total_bikes()`). It can take parameters. An instance method receives `self`. A class method uses `@classmethod` and `cls`. A static method uses `@staticmethod` and receives neither. B3.1.3 shows all three.",
            "Encapsulation: encapsulation bundles data with the methods that operate on it, and outside code reaches that data through those methods. B3.1.5 explains the mechanism, and how it differs from information hiding.",
            "Inheritance: inheritance is an is-a relationship. A subclass reuses and extends a superclass. The code is in B3.2.1, which is HL only.",
            "Polymorphism: one method name can behave differently depending on the object. Overriding is the usual form: a subclass replaces a parent method. Python has no compile-time overloading. The code, including the Java fragment, is in B3.2.2, which is HL only.",
            "Accessor, mutator, initialiser: an accessor returns an attribute. A mutator updates one, usually after checking the new value. In Python the initialiser is `__init__`. Getters, setters, `__str__` and `__eq__` are written out in the Methods section, which supports B3.1.4 and B3.1.5.",
            "Access: Python does not enforce `private` the way Java does. No leading underscore means public. `_balance` means internal. `__code` is renamed to `_ClassName__code`, which warns other code rather than locking the value away. Dunder methods such as `__init__` are not renamed. The table in B3.1.5 sets the three forms side by side.",
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
            "Increased complexity for a small or one-off problem, where a class adds structure the problem does not need.",
            "Overhead: creating many objects costs time and memory, and a design with too many classes can be harder to follow than a shorter program.",
            "Effort: an object-oriented program takes planning before the first line of code is written.",
          ],
        },
        { type: "h3", text: "When OOP is the wrong tool" },
        { type: "p", text: "B3.1.1 asks you to name a problem where OOP is a poor fit. These three are the useful cases." },
        {
          type: "list",
          items: [
            "A one-off data-cleaning script, or a simple calculation. Procedural code is clearer, and a class adds structure the job does not need.",
            "A data-transformation pipeline. A functional style, using `map`, `filter` and pure functions, fits better than objects that each carry state.",
            "Performance-critical numeric work. One object per value adds overhead. A packed array, such as a NumPy array, keeps the numbers together.",
          ],
        },
        { type: "h3", text: "A model evaluate answer" },
        { type: "p", text: "Question: Evaluate the use of object-oriented programming for a program that converts a folder of CSV files into one summary table. [4]" },
        {
          type: "list",
          items: [
            "OOP helps when the data are lasting entities with their own rules, because a class can be reused and tested on its own. (1 mark)",
            "This job is a one-off transformation. A short script that reads each file and writes one table is easier to follow. (1 mark)",
            "Classes such as Row, File and Converter would add planning and object overhead, with no second use for those classes. (1 mark)",
            "Conclusion: procedural code is the better fit. OOP would earn its cost if the same entities later needed validation rules, a user interface, or reuse in another program. (1 mark)",
          ],
        },
        { type: "p", text: "An evaluate answer names the idea, gives a reason for it and a reason against it, and ends with a judgement that follows those reasons. \"OOP allows code reuse\" on its own would not reach the top mark." },
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

    @property
    def on_loan(self) -> bool:
        return self._on_loan

    def return_book(self) -> bool:
        if not self._on_loan:
            return False
        self._on_loan = False
        return True

book = LibraryBook("1984", "George Orwell")
print(book.borrow())       # True
print(book.on_loan)        # True
print(book.borrow())       # False, already out
print(book.return_book())  # True
print(book.return_book())  # False, already on the shelf`,
          caption: "`borrow()` prints True the first time and False the second time, because the book is already on loan. Outside code reads `on_loan`. It does not reach into `_on_loan`.",
        },
        { type: "p", text: "The object stores its own state in `_title`, `_author`, and `_on_loan`. Those names are internal. The public way to read the flag is the `on_loan` property. A name with two leading underscores, such as `__code` in the Secret class above, is renamed by Python. That rename makes an accidental access less likely. It is not a lock." },
        { type: "p", text: "`borrow()` and `return_book()` are the behaviours that control that state. Each one refuses a change that would break the rule: you cannot borrow a book that is already out, and you cannot return a book that is on the shelf." },
        { type: "lab", name: "library" },
        { type: "callout", kind: "exam", label: "Exam watch", text: "\"State\" needs a named fact. \"Evaluate\" needs the shape of the model answer above: a reason for OOP, a reason against it, and a conclusion. The LibraryBook class is a fair case for OOP, because each book has state and the methods enforce a rule." },
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
        { type: "p", text: "A UML class diagram is the planning tool named in the syllabus. One class is a box in three compartments: the name, the attributes, the methods. A minus sign means private. A plus sign means public. A static member is underlined. Types are written after a colon, and a constructor is written in the methods compartment with the class's name and no return type. The diagram below is the design for a student who can enrol in courses, drop them, and answer whether they are already enrolled. It does not also calculate fees, print a timetable or send messages. Those are other responsibilities." },
        {
          type: "classbox",
          name: "Student",
          attrs: ["− name : str", "− student_id : str", "− courses : list[str]"],
          ops: [
            "+ Student(name: str, student_id: str)",
            "+ enrol(course: str): None",
            "+ drop(course: str): None",
            "+ is_enrolled(course: str): bool",
          ],
          caption: "A minus sign means private, and a plus sign means public. The constructor is the operation with the class's own name and no return type. `is_enrolled` only reports a fact. `enrol` and `drop` change the list.",
        },
        {
          type: "code",
          title: "The same design in Python",
          source: `class Student:
    def __init__(self, name: str, student_id: str):
        self._name = name
        self._student_id = student_id
        self._courses: list[str] = []

    def enrol(self, course: str) -> None:
        if course not in self._courses:
            self._courses.append(course)

    def drop(self, course: str) -> None:
        if course in self._courses:
            self._courses.remove(course)

    def is_enrolled(self, course: str) -> bool:
        return course in self._courses`,
          caption: "The attributes match the minus signs on the diagram. Outside code uses `enrol`, `drop` and `is_enrolled`. It does not read `_courses` directly.",
        },
        { type: "p", text: "The design is simple because the class has one main job: to manage a student's course list. That is usually better than putting registration, fee calculation, timetable printing, and messaging into the same class." },
        { type: "h3", text: "Draw this class, then compare" },
        { type: "p", text: "A parking bay stores its bay number and whether a car is in it. A car can arrive, which succeeds only when the bay is free, or leave, which marks the bay free. The class keeps one shared count of how many bays are currently occupied. Draw the box before you read the model: the name, the attributes, the constructor and the methods. Use a minus for a private member, and underline the shared count." },
        {
          type: "classbox",
          name: "ParkingBay",
          attrs: [
            "− number : int",
            "− occupied : bool",
            { text: "− occupied_count : int", static: true },
          ],
          ops: [
            "+ ParkingBay(number: int)",
            "+ arrive(): bool",
            "+ leave(): None",
            "+ is_occupied(): bool",
          ],
          caption: "The model. `occupied_count` is static, so it is underlined. `arrive` changes state and reports whether it succeeded. `is_occupied` only reports. `leave` changes state and returns nothing.",
        },
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
        {
          type: "classbox",
          name: "Bike",
          attrs: [
            { text: "+ count : int", static: true },
            "+ speed : int",
          ],
          ops: [
            "+ Bike(speed: int)",
            "+ accelerate(amount: int): None",
            { text: "+ total_bikes(): int", static: true },
            { text: "+ km_to_miles(km: float): float", static: true },
          ],
          caption: "In UML, static members are underlined. `count`, `total_bikes` and `km_to_miles` belong to the class. `speed` and `accelerate` belong to one bike. Python tells a class method from a static method with `@classmethod` and `@staticmethod`. UML underlines both.",
        },
        {
          type: "code",
          lang: "Java",
          title: "In Java: private, static and this",
          source: `class Bike {
    private int speed;
    public static int count = 0;

    public Bike(int speed) {
        this.speed = speed;
        Bike.count = Bike.count + 1;
    }

    public void accelerate(int amount) {
        this.speed = this.speed + amount;
    }
}`,
          caption: "`static` marks the shared field. `private` marks the field that belongs to one bike. `this.speed` is the same idea as `self.speed`. Java writes the type in front of the name.",
        },
        { type: "lab", name: "bikes" },
        {
          type: "code",
          title: "The assignment that does not count the bikes",
          source: `class Bike:
    count = 0

    def __init__(self):
        self.count = self.count + 1

b1, b2, b3 = Bike(), Bike(), Bike()
print(Bike.count)          # 0
print(b1.count, b3.count)  # 1 1`,
          caption: "Each new bike reads the class value 0, then the assignment creates an instance attribute set to 1. `Bike.count` stays 0.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "`self.count = self.count + 1` reads the class value but writes a new instance attribute. `Bike.count` stays 0 forever, and every bike reports 1. Write `Bike.count += 1`, or `type(self).count += 1`, when the value is meant to be shared." },
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
            "In everyday explanations, `__init__` is called the constructor. More precisely, it is the initialiser.",
            "A method call applies behaviour to one particular object, the one before the dot.",
          ],
        },
        { type: "p", text: "To define a class in Python, use the `class` keyword. To instantiate an object, call the class name like a function. Python treats classes as callable objects, creates a new instance, and then runs `__init__` to initialise the new object's state." },
        { type: "p", text: "In beginner OOP discussions, `__init__` is often described as a constructor because it is the method that initialises object data. More precisely, Python creates the object first and then calls `__init__` to customise it." },
        { type: "callout", kind: "note", label: "Extension", text: "`__new__` is the method that allocates the instance. `__init__` then sets its attributes. You do not need to write `__new__` for B3.1. In an answer, name `__init__` and say that it initialises an object the class has already created." },
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
          caption: "Both objects end up with year, month and day set by the same `__init__`. `from_string` only parses the text. Because it uses `cls`, a subclass that inherits the method still constructs a member of the subclass.",
        },
        {
          type: "code",
          lang: "Java",
          title: "In Java: two constructors, no return type",
          source: `class Date {
    private int year;
    private int month;
    private int day;

    public Date(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public Date(String text) {
        String[] parts = text.split("-");
        this.year = Integer.parseInt(parts[0]);
        this.month = Integer.parseInt(parts[1]);
        this.day = Integer.parseInt(parts[2]);
    }
}`,
          caption: "A Java constructor has the class's name and no return type. Two constructors with the same name and different parameters is overloading. Python cannot declare a second `__init__`. The class method above is the Python substitute.",
        },
      ],
    },
    {
      id: "methods",
      nav: "Methods · extra",
      kicker: "Common methods · supports B3.1.4 and B3.1.5",
      title: "Constructors, getters, setters, __str__ and __eq__",
      lede: "These methods support B3.1.4 and B3.1.5. Getters and setters are how encapsulation is written. `__str__` and `__eq__` change how an object behaves with `print` and `==`.",
      blocks: [
        { type: "h3", text: "Constructor" },
        { type: "p", text: "A constructor runs when a new object is created, and it sets that object's starting state. In Python the method is `__init__`." },
        { type: "p", text: "Python has one `__init__`. Another way to build the same kind of object is a class method that prepares the arguments and then calls `cls(...)`. `Date.from_string` in B3.1.4 is that method, and the Java listing there shows the overloaded constructors Python cannot write." },
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
            "`__repr__` is the developer-facing form. The interactive prompt, and a list of objects, use it. Without `__repr__`, `print([book1, book2])` still shows `<Book object at 0x...>`, even when `__str__` exists.",
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
        return NotImplemented

book1 = Book("1984", "George Orwell", "978-0451524935")
book2 = Book("1984", "George Orwell", "978-0451524935")
book3 = Book("Brave New World", "Aldous Huxley", "978-0060850524")
print(book1)            # '1984' by George Orwell
print(book1 == book2)   # True, same ISBN
print(book1 is book2)   # False, two objects
print(book1 == book3)   # False
print(book1 == "1984")  # False, not a Book
try:
    seen = {book1}
except TypeError:
    print("TypeError")  # unhashable, because __eq__ is defined`,
          caption: "The isinstance check matters. Without it, comparing a book with a string can raise AttributeError when the method tries to read `other.isbn`. Returning `NotImplemented` lets Python try the other value's comparison. Defining `__eq__` and not `__hash__` makes Book unhashable, so a set of books raises TypeError.",
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "== and `is` are not interchangeable. == uses __eq__ when it exists, so two objects can compare equal by value. `is` asks whether both names point at one object. A question about object references is almost always an `is` question. A question about logical equality is an == question." },
      ],
    },
    {
      id: "references",
      nav: "References · extra",
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
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
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
    acc.withdraw(-500)
except ValueError as error:
    print(error)            # Withdrawal must be positive
print(acc.balance)          # 70, unchanged
try:
    acc.withdraw(500)
except ValueError as error:
    print(error)            # Insufficient funds
try:
    acc.balance = 1000
except AttributeError as error:
    print(type(error).__name__)  # AttributeError: no setter`,
          caption: "`withdraw(30)` leaves the balance at 70. `withdraw(-500)` is refused because a withdrawal must be positive, so the balance stays 70. `withdraw(500)` raises ValueError for insufficient funds and does not change it. `acc.balance = 1000` raises AttributeError, because the property has no setter.",
        },
        {
          type: "code",
          lang: "Java",
          title: "In Java: a private field and a getter",
          source: `class BankAccount {
    private int balance;

    public BankAccount(int balance) {
        this.balance = balance;
    }

    public int getBalance() {
        return balance;
    }

    public void withdraw(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal must be positive");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        balance = balance - amount;
    }
}`,
          caption: "`private` keeps `balance` off the public interface. Callers use `getBalance()` and `withdraw`. The same two checks protect the invariant: a withdrawal is positive, and it does not exceed the balance.",
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
        { type: "p", text: "Information hiding means each module keeps a design decision secret, so that changing the decision affects only that module. Split a program around the decisions most likely to change, such as data formats, algorithms, or storage." },
        { type: "callout", kind: "note", label: "Extension", text: "David Parnas set this out in 1972. The paper is useful background. The exam point is the next question: what could change here, and who would have to know?" },
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
        { type: "callout", kind: "note", label: "Extension", text: "The stack module is beyond what most SL answers need. It shows information hiding without a class. Revise the gradebook first. That is the example of a hidden decision behind a stable interface." },
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
      why: "The class is the plan. The object is the instance built from it, and that is the one that occupies memory and stores data. The first option describes an object, which is the usual mix-up. A getter is a method. A second name is a reference.",
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
      why: "`speed` is an instance attribute, so `accelerate` changes only the first bike. `Bike.count` changes when a bike is constructed, not when one is accelerated. The first option would be right only if `speed` were a class attribute.",
    },
    {
      q: "`acc1 = BankAccount(\"Alice\", 500)` and then `acc2 = acc1`. After `acc2.deposit(200)`, what is `acc1.balance`?",
      options: ["500", "200", "700", "It raises an error, because acc1 was not used"],
      answer: 2,
      why: "The assignment copies the reference. There is still one account, so the deposit is visible through both names. `acc1 is acc2` is `True`. The answer 500 treats `acc2 = acc1` as a copy of the data.",
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
      why: "Encapsulation is the grouping, and it is possible in Python. Information hiding is the decision to expose an interface and conceal the storage and the rules. The last option confuses Java's `private` keyword with the idea. Access modifiers are one tool, not the whole idea.",
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
      why: "Assignment to a property calls the setter. The setter rejects the value before writing `_balance`, so the old state survives. The first option would be right for a plain attribute, which is why the property exists.",
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
      why: "== follows `__eq__`, so the ISBN match makes it `True`. `is` asks whether both names point at the same object. They were constructed separately, so `is` is `False`. True and True would mean the two names were the same object.",
    },
    {
      q: "Which job is the weakest fit for a set of classes?",
      options: [
        "A library system with books, members and loans",
        "A one-off script that merges several CSV files into one table",
        "A game with players, enemies and items",
        "A shop with products, a cart and orders",
      ],
      answer: 1,
      why: "Books, players and products are lasting entities with their own rules. The script is one transformation, and procedural code is clearer. A shop is a strong fit for OOP, even when the program is not huge.",
    },
    {
      q: "On the Student class diagram, what does `− courses : list[str]` mean?",
      options: [
        "A public list that any code may edit",
        "A private attribute whose type is a list of strings",
        "A method that returns the courses",
        "A static attribute shared by every student",
      ],
      answer: 1,
      why: "A minus sign means private, and the type comes after the colon. A plus sign would mean public. A method sits in the bottom compartment and has parentheses. A static member is underlined.",
    },
    {
      q: "Why is `Bike.km_to_miles` a static method rather than an instance method?",
      options: [
        "It changes every bike's speed",
        "It uses neither one bike nor the class data. It only converts a number",
        "It must be static because it returns a float",
        "It creates a new Bike",
      ],
      answer: 1,
      why: "`@staticmethod` receives neither `self` nor `cls`. `total_bikes` is the class method, because it reads `cls.count`. A float return type does not decide which kind of method it is.",
    },
    {
      q: "A Bike class sets `count = 0`, and `__init__` does `self.count = self.count + 1`. After two bikes are created, what are `Bike.count` and `b1.count`?",
      options: ["2 and 2", "0 and 1", "1 and 1", "2 and 1"],
      answer: 1,
      why: "The assignment writes a new instance attribute. The class attribute stays 0, and each bike's own count is 1. 2 and 2 is what `Bike.count += 1` would produce, which is the version that actually counts the bikes.",
    },
    {
      q: "`Secret.__init__` sets `self.__code = 1234`. What does `s.__code` do, and where is 1234?",
      options: [
        "It prints 1234, because a double underscore means public",
        "It raises AttributeError. The value is stored as `s._Secret__code`",
        "It prints nothing, because the attribute is deleted",
        "It raises AttributeError, and the value cannot be read at all",
      ],
      answer: 1,
      why: "Python renames `__code` to `_Secret__code`. The rename is a warning, not a lock, so the last option goes too far. The value is still there under the mangled name.",
    },
    {
      q: "You want to build a Date from three integers or from a string such as \"2026-05-07\". What can Python do?",
      options: [
        "Write two `__init__` methods, and Python picks one from the argument types",
        "Write one `__init__`, and a class method such as `from_string` that calls `cls(...)`",
        "Write a static method named `__init2__`",
        "A Date cannot be created from a string",
      ],
      answer: 1,
      why: "Python does not overload constructors. A class has one `__init__`. The first option is what Java does, and the Java listing in B3.1.4 shows that form. It is not what Python does.",
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
    "Name a problem where OOP is a poor fit, and evaluate it with a reason for, a reason against, and a conclusion.",
    "On a UML class box, underline a static member and include the constructor in the methods compartment.",
    "Predict `Bike.count` and each bike's `count` after `__init__` does `self.count = self.count + 1`.",
    "Say what `__repr__` is for, and why a class that defines `__eq__` and not `__hash__` cannot be added to a set.",
  ],
};
