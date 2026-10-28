export const topic = {
  id: "B3.2",
  title: "Fundamentals of OOP for multiple classes",
  kicker: "IB DP Computer Science · Theme B · HL only",
  lede: "B3.1 built one class. B3.2 is what happens when classes work together: a subclass reuses a parent, the same call does different work, an abstract class fixes the interface, and a has-a relationship is either ownership or a looser grouping. The syllabus names three design patterns: singleton, factory and observer.",
  chips: ["B3.2", "HL only", "Python 3", "Part of the 23 HL hours"],
  mapTitle: "The five statements in B3.2",
  mapLede: "All five are HL only. SL stops at B3.1, but the definitions of inheritance and polymorphism are still named inside B3.1.1.",
  map: [
    ["#inheritance", "B3.2.1", "Inheritance", "An is-a hierarchy, reuse, and what `private`, `protected`, `public` and `default` do to a subclass."],
    ["#polymorphism", "B3.2.2", "Polymorphism", "Overriding at run time, and overloading decided at compile time."],
    ["#abstraction", "B3.2.3", "Abstraction", "The essential interface, and abstract classes that cannot be constructed."],
    ["#relationships", "B3.2.4", "Composition and aggregation", "Has-a. The part either lives and dies with the whole, or it does not."],
    ["#patterns", "B3.2.5", "Design patterns", "Singleton, factory and observer as reusable shapes for recurring problems."],
  ],
  sections: [
    {
      id: "inheritance",
      nav: "Inheritance",
      kicker: "B3.2.1 · Inheritance, for code reusability",
      title: "A subclass is a more specific parent",
      lede: "Inheritance is an is-a relationship. Teacher is a Person. The subclass reuses the parent's attributes and methods, then adds its own data or replaces a method.",
      blocks: [
        {
          type: "pair",
          able: [
            "Draw a parent and its subclasses and say which relationship it is.",
            "Call the parent initialiser with `super`, then add the subclass's own attributes.",
            "Override a method, and reuse the parent version with `super` inside the new one.",
            "Say what `public`, `protected`, `default` and `private` mean for a subclass.",
          ],
          notes: [
            "Common behaviour is written once, in the parent.",
            "A subclass can extend the parent with new data, such as `subject` or grade_level.",
            "Python has no Java access keywords. The syllabus still expects the Java four, plus the Python convention.",
          ],
        },
        { type: "p", text: "Inheritance expresses an is-a relationship. A subclass is a more specialised version of a parent class. The subclass automatically reuses non-private attributes and methods from the parent, and it can add new behaviour or override inherited methods." },
        { type: "p", text: "Inheritance promotes code reuse because common behaviour can be written once in the parent class and then inherited by many subclasses." },
        {
          type: "code",
          title: "Person, and two more specific people",
          source: `class Person:
    def __init__(self, name: str):
        self.name = name

    def introduce(self) -> str:
        return f"Hello, I am {self.name}."

class Teacher(Person):
    def __init__(self, name: str, subject: str):
        super().__init__(name)
        self.subject = subject

    def introduce(self) -> str:
        return f"{super().introduce()} I teach {self.subject}."

class Student(Person):
    def __init__(self, name: str, grade_level: int):
        super().__init__(name)
        self.grade_level = grade_level

    def introduce(self) -> str:
        return f"{super().introduce()} I am in grade {self.grade_level}."

ada = Teacher("Ada", "Computer science")
print(ada.introduce())
print(isinstance(ada, Person))  # True: a teacher is a person`,
          caption: "`ada.introduce()` prints the parent sentence and then the subject. `isinstance(ada, Person)` is True, because a teacher is a person.",
        },
        { type: "h3", text: "Important explanation" },
        {
          type: "list",
          items: [
            "`Teacher` and `Student` inherit from `Person`, so they reuse the `name` attribute and the `introduce` method.",
            "`super().__init__(name)` calls the parent initialiser so the inherited part of the object is set up correctly.",
            "`super().introduce()` invokes the logic defined in the Person class. Each subclass uses method overriding to provide its own version for its own instances.",
            "The subclass can add new data, such as `subject`, and can also override methods.",
          ],
        },
        {
          type: "uml",
          w: 820,
          h: 360,
          caption: "The hollow triangle points at the parent. It means generalisation: Teacher and Student inherit from Person. Person is concrete here, because the class can be constructed. An abstract parent is the next section.",
          nodes: [
            { id: "person", x: 280, y: 12, w: 260, name: "Person", attrs: ["+ name: str"], ops: ["+ introduce(): str"] },
            { id: "teacher", x: 24, y: 210, w: 300, name: "Teacher", attrs: ["+ name: str", "+ subject: str"], ops: ["+ introduce(): str"] },
            { id: "student", x: 470, y: 210, w: 320, name: "Student", attrs: ["+ name: str", "+ grade_level: int"], ops: ["+ introduce(): str"] },
          ],
          edges: [
            { from: "teacher", to: "person", kind: "inherit" },
            { from: "student", to: "person", kind: "inherit" },
          ],
        },
        { type: "p", text: "The syllabus mentions access modifiers. In Python there are no Java-style `private`, `protected`, or default modifiers. Public attributes are openly accessible, single-underscore names are internal by convention, and double-underscore names trigger name mangling rather than true private access." },
        { type: "p", text: "In Java, the modifier on a parent member decides whether the subclass may use it. The four modifiers below are the ones the syllabus expects, next to the closest Python convention." },
        {
          type: "table",
          title: "Who a subclass can reach",
          head: ["Modifier", "In Java", "A subclass", "In Python"],
          rows: [
            ["public +", "Usable anywhere", "Yes", "A plain name, such as name"],
            ["protected #", "Class, subclasses, and the same package", "Yes, even in another package", "No keyword. _name is the closest convention, and it is not enforced"],
            ["default ~", "The package only. No keyword is written", "Only if the subclass is in the same package", "No equivalent"],
            ["private −", "The declaring class only", "No", "__name is mangled to _Parent__name, so the subclass does not see it under that spelling"],
          ],
        },
        {
          type: "code",
          title: "What a child can see",
          source: `class Parent:
    def __init__(self):
        self.public = 1
        self._internal = 2
        self.__private = 3

class Child(Parent):
    def show(self):
        return self.public, self._internal

    def hidden(self):
        return self.__private

child = Child()
print(child.show())            # (1, 2)
print(child._Parent__private)  # 3, the mangled name
try:
    print(child.hidden())
except AttributeError:
    print("AttributeError")    # looked up as _Child__private`,
          caption: "Inside Child, __private is looked up as _Child__private, which was never set. The parent's value is stored as _Parent__private. Reaching it that way works and breaks the information hiding the underscores were asking for. Subclasses should use the parent's methods, not the mangled name.",
        },
        { type: "h3", text: "Advantages of inheritance" },
        {
          type: "list",
          items: [
            "Reusability: a subclass can reuse the data and behaviours defined in its superclass.",
            "Extensibility: a subclass can add its own behaviours and data to extend its superclass's functionality.",
            "Easy to maintain: changes made to the superclass are automatically reflected in the subclass, which reduces maintenance.",
            "Simplifies testing: inherited functionality from the parent class does not need to be retested in the subclass. A method the subclass overrides does still need its own test.",
          ],
        },
      ],
    },
    {
      id: "polymorphism",
      nav: "Polymorphism",
      kicker: "B3.2.2 · Polymorphism, including method overriding",
      title: "One call, more than one form",
      lede: "Polymorphism comes from Greek: poly, many, and morph, form. The same request can be carried out differently depending on the object that receives it.",
      blocks: [
        {
          type: "pair",
          able: [
            "Explain polymorphism as one interface with many implementations.",
            "Write an overridden method and call it through a parent reference or a shared function.",
            "Distinguish dynamic binding, at run time, from static binding, at compile time.",
            "Override the dunder methods that make a custom object work with `print`, `len` and ==.",
          ],
          notes: [
            "Dynamic polymorphism is method overriding. The object decides at run time, which costs a lookup.",
            "Static polymorphism is method overloading. The compiler decides from the number and types of the arguments.",
            "Because that decision is made at compile time, the running program does not spend time searching for the method, and the compiler can optimise the call.",
          ],
        },
        { type: "p", text: "The word polymorphism comes from Greek:" },
        {
          type: "list",
          items: [
            "poly = many",
            "morph = forms",
          ],
        },
        { type: "p", text: "So polymorphism literally means many forms. Think of a dog. A Chihuahua, a Golden Retriever, and a German Shepherd all look different and behave somewhat differently, but they are all still dogs. If you say \"Fetch!\", each dog responds to the same command, but may carry it out differently." },
        {
          type: "list",
          items: [
            "A Chihuahua may run quickly and return.",
            "A Golden Retriever may fetch enthusiastically.",
            "A stubborn dog may take its time.",
          ],
        },
        { type: "p", text: "The same command produces different behaviours depending on the specific dog. This is the basic idea of polymorphism: one interface, many forms of behaviour." },
        { type: "p", text: "Polymorphism in OOP means that the same method call or interface can work with objects of different types. This makes code more flexible, because client code can focus on what an object can do rather than on its exact class." },
        { type: "h3", text: "Dynamic polymorphism in Python" },
        { type: "p", text: "Dynamic polymorphism happens when different subclasses provide their own versions of the same method and the program chooses the correct version at run time. In Python, this is usually demonstrated through method overriding." },
        {
          type: "code",
          title: "print_area does not mention Rectangle or Circle",
          source: `class Shape:
    def area(self) -> float:
        raise NotImplementedError

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

def print_area(shape: Shape) -> None:
    print(shape.area())

print_area(Rectangle(4, 3))  # 12
print_area(Circle(2))        # 12.56636`,
          caption: "`print_area(Rectangle(4, 3))` prints 12. `print_area(Circle(2))` prints 12.56636.",
        },
        { type: "p", text: "The function `print_area()` does not need to know whether it receives a Rectangle or a Circle. It simply calls `area()`. The specific implementation used depends on the actual object passed in." },
        { type: "p", text: "Dynamic binding makes it possible to write code that is not dependent on a specific type. `area()` can accept an object of any Shape subclass, whether a circle, a rectangle, a triangle, or a shape that has not yet been defined. The client code, `print_area()` here, is decoupled from Shape's specific subclasses and only interacts with Shape. A new type of Shape does not force a change to the client." },
        {
          type: "uml",
          w: 800,
          h: 370,
          caption: "Rectangle.area and Circle.area override Shape.area. The call shape.area() is legal because Shape declares it. Which body runs depends on the object.",
          nodes: [
            { id: "shape", x: 280, y: 10, w: 240, name: "Shape", stereo: "<<abstract>>", attrs: [], ops: ["+ area(): float"] },
            { id: "rect", x: 20, y: 210, w: 300, name: "Rectangle", attrs: ["+ width: float", "+ height: float"], ops: ["+ area(): float"] },
            { id: "circle", x: 470, y: 220, w: 280, name: "Circle", attrs: ["+ radius: float"], ops: ["+ area(): float"] },
          ],
          edges: [
            { from: "rect", to: "shape", kind: "inherit" },
            { from: "circle", to: "shape", kind: "inherit" },
          ],
        },
        { type: "lab", name: "shapes" },
        { type: "h3", text: "Advantages of dynamic polymorphism" },
        {
          type: "list",
          items: [
            "An external program can use the same method on all subclasses.",
            "An overridden method in a child class adds only the code needed for that subclass. Rectangle's `area` is a product. Circle's `area` is not a copy of it.",
            "Dynamic binding lets you write code that is not dependent on a specific type.",
          ],
        },
        { type: "p", text: "Dynamic polymorphism requires run-time method resolution. The language can check that `shape.area()` is a valid call, because Shape defines `area()`. If subclasses override `area()`, it cannot know which implementation will run, because the actual object type may only be known at run time. The call is resolved while the program is running: the runtime finds the actual object type and invokes that method. This dynamic dispatch can incur a small run-time overhead, because of the extra method lookup. Dynamic polymorphism means the binding is performed at run time rather than at compile time." },
        { type: "h3", text: "Overriding common methods" },
        { type: "p", text: "Overriding common built-in methods, the dunder or magic methods, lets custom objects work with Python's operators, functions, and behaviours." },
        {
          type: "code",
          title: "A cart that `print`, `len` and == already understand",
          source: `class Item:
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class ShoppingCart:
    def __init__(self, owner: str):
        self.owner = owner
        self.items: list[Item] = []

    def add_item(self, item: Item) -> None:
        self.items.append(item)

    def __str__(self) -> str:
        return f"{self.owner}'s Cart ({len(self.items)} items)"

    def __repr__(self) -> str:
        return f"ShoppingCart(owner={self.owner!r}, items_count={len(self.items)})"

    def __len__(self) -> int:
        return len(self.items)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, ShoppingCart):
            return self.owner == other.owner
        return False

cart1 = ShoppingCart("Alice")
cart1.add_item(Item("Book", 12.99))
cart1.add_item(Item("Pen", 1.50))
cart2 = ShoppingCart("Alice")
print(str(cart1))    # Alice's Cart (2 items)
print(len(cart1))    # 2
print(cart1 == cart2)  # True, same owner, even though the carts hold different items`,
          caption: "`str(cart1)` uses `__str__`. `len(cart1)` uses `__len__` and prints 2. `cart1 == cart2` uses `__eq__` and prints True, because the owners match, even though the carts hold different items. This cart's equality rule is a deliberate choice. Another design would compare the items.",
        },
        { type: "p", text: "This is often called operator overloading, because it defines how a built-in operator, such as `+`, `==`, or `<`, behaves for a custom object. Defining `__eq__` overloads `==`. Operator overloading lets Python's built-in operators work with your objects. `__str__` is the readable form. `__repr__` is the unambiguous form, useful in a debugger. `__len__` is what `len(cart)` calls." },
        { type: "h3", text: "Static polymorphism" },
        { type: "p", text: "In Java, static polymorphism often refers to method overloading. Python does not support traditional compile-time method overloading by signature. True static polymorphism determines which method runs at compile time, rather than by resolving the call while the program is running." },
        {
          type: "code",
          lang: "Java",
          title: "The compiler picks the add that matches the arguments",
          source: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }
    double add(double a, double b) {
        return a + b;
    }
    int add(int a, int b, int c) {
        return a + b + c;
    }
}

Calculator calc = new Calculator();
calc.add(2, 3);        // add(int, int)
calc.add(2.5, 3.5);    // add(double, double)
calc.add(1, 2, 3);     // add(int, int, int)`,
          caption: "The compiler can tell which add to invoke from the number and types of the arguments. add(2, 3) is the int version, add(2.5, 3.5) is the double version, and add(1, 2, 3) is the three-int version. The binding is done at compile time, which is why this is called static polymorphism.",
        },
        {
          type: "list",
          items: [
            "Static polymorphism, also called compile-time polymorphism, can maximise code efficiency, particularly compared with dynamic polymorphism. Resolution happens at compile time, so it removes the run-time lookup and lets the compiler optimise the call. The run-time overhead of dynamic polymorphism is the extra time spent deciding which implementation to call.",
            "Improved readability: the same function name can cover operations that are conceptually the same, instead of a different name for each version.",
            "Ease of use: the compiler selects the version from the argument types, so the caller does not have to remember separate names.",
            "Code organisation: related functionality stays under one identifier, which keeps the class less cluttered.",
          ],
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Overriding is dynamic: the same signature, a subclass body, chosen from the actual object at run time, with a lookup to pay for. Overloading is static: the same name, different parameters, chosen from the arguments at compile time. The efficiency claim belongs to the second one, because the search has already happened before the program runs." },
      ],
    },
    {
      id: "abstraction",
      nav: "Abstraction",
      kicker: "B3.2.3 · Abstraction in OOP",
      title: "Name what must be done. Leave how to the subclass.",
      lede: "Abstraction keeps the essential feature and hides the detail that callers do not need. An abstract class says what its subclasses must be able to do, and refuses to be constructed until they do it.",
      blocks: [
        {
          type: "pair",
          able: [
            "Explain abstraction as an interface that hides implementation detail.",
            "Say why an abstract class supports modular code.",
            "Use an abstract base class, and explain why constructing it fails.",
          ],
          notes: [
            "In Python the usual tool is the `abc` module.",
            "A method marked @abstractmethod must be overridden before an object can be made.",
            "Callers program against the abstract type, so a new concrete class does not ripple outwards.",
          ],
        },
        { type: "p", text: "Abstraction means focusing on the essential features of an object while hiding unnecessary implementation detail. An abstract class describes what related subclasses must be able to do, without fully defining how every method works." },
        { type: "p", text: "In Python, abstraction is commonly modelled with the `abc` module and abstract base classes. An abstract class cannot be instantiated until its abstract methods are implemented by a concrete subclass." },
        { type: "p", text: "Modular programming designs software by breaking a program into distinct, interchangeable modules. Each module should be self-contained and should have what it needs to carry out one part of the program." },
        { type: "p", text: "The PaymentMethod class and its subclasses form one module because they serve the same job. The parent defines the abstract method `pay()`, which each concrete subclass must implement. Callers can focus on the `pay()` interface without the implementation. A factory, in the patterns section, can choose the subclass, so the caller does not even need to know which one was instantiated. That makes the component easier to use and reduces complexity. The design is also extensible: a new payment method can be added without affecting the rest of the system, because the concrete classes stay decoupled from outside modules. The system can switch to a new payment method with little change elsewhere." },
        { type: "p", text: "Abstraction is a cornerstone of modular software. By hiding execution detail and exposing only the essential interface, it is a way to divide a complex system into independent, manageable pieces." },
        {
          type: "code",
          title: "The parent cannot be constructed. The children can.",
          source: `from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount: float) -> None:
        pass

class CardPayment(PaymentMethod):
    def pay(self, amount: float) -> None:
        print(f"Paid {amount} by card")

class CashPayment(PaymentMethod):
    def pay(self, amount: float) -> None:
        print(f"Paid {amount} in cash")

card = CardPayment()
card.pay(20)
try:
    PaymentMethod()
except TypeError as error:
    print(type(error).__name__)  # TypeError`,
          caption: "`card.pay(20)` prints the card message. `PaymentMethod()` raises TypeError.",
        },
        { type: "p", text: "The abstract class `PaymentMethod` defines a common interface: every payment method must implement `pay()`. The rest of the program can work with the abstract idea of a payment method rather than with one concrete class. Adding a voucher payment means a new subclass, not a rewrite of the checkout." },
        { type: "p", text: "In Python, ABC stands for abstract base class. The built-in `abc` module provides it. An ABC is a blueprint for other classes. It specifies methods and properties that a subclass must implement before it can be instantiated." },
        {
          type: "list",
          items: [
            "Cannot be instantiated directly: you cannot create an object from an ABC. Trying to instantiate it raises TypeError. A subclass that forgets an abstract method is itself still abstract, and constructing it also fails.",
            "Enforces method implementation: a subclass of an ABC must override every method marked with `@abstractmethod`.",
            "Defines interfaces: it sets a contract across classes, so behaviour stays consistent. Every real payment method has `pay`, with the same arguments.",
          ],
        },
        { type: "callout", kind: "note", label: "Remember", text: "Abstraction and encapsulation meet, but the question is different. Encapsulation asks \"where does this data live, and who may touch it?\" Abstraction asks \"what does the caller need to know in order to use this?\" A payment caller needs the amount and the `pay` method. The caller does not need the storage." },
      ],
    },
    {
      id: "relationships",
      nav: "Relationships",
      kicker: "B3.2.4 · Composition and aggregation",
      title: "Has-a, in two strengths",
      lede: "Inheritance was is-a. Composition and aggregation are both has-a. The difference is whether the part can exist without the whole.",
      blocks: [
        {
          type: "pair",
          able: [
            "Decide between inheritance, aggregation and composition for a pair of classes.",
            "Explain the lifetime: who creates the part, and what happens when the whole is destroyed.",
            "Show the relationship on a UML diagram, with the right diamond.",
          ],
          notes: [
            "A hollow diamond is aggregation. A filled diamond is composition. The diamond is drawn on the whole.",
            "Aggregation: the part is independent, and is usually passed in.",
            "Composition: the part is owned. It is usually created inside the whole, and it does not outlive it.",
          ],
        },
        { type: "p", text: "Both composition and aggregation are has-a relationships between classes, but they are not equally strong." },
        {
          type: "list",
          items: [
            "Aggregation is a relationship in which the part can exist independently of the whole. It is a one-way association, and it is still a has-a relationship. A triangle has a sides collection of three line segments. Each segment could be part of none, one, or several triangles. The segment does not die when one triangle is deleted.",
            "Composition is a relationship in which the part is strongly tied to the whole and usually does not meaningfully exist without it. If the whole is removed, its parts are typically removed too. On a diagram it is a binary association with a filled diamond at the whole. A folder could contain many files, while each file has exactly one folder. If the folder is deleted, the files are deleted as well. The no-sharing rule is the key to composition. A hospital has one or more departments, and each department belongs to exactly one hospital. If the hospital is closed, so are its departments.",
          ],
        },
        { type: "p", text: "Aggregation means the parts can function independently of the aggregating class. In composition, the parts are tightly coupled and cannot exist outside the aggregating class." },
        {
          type: "table",
          title: "The distinction the syllabus uses",
          head: ["", "Aggregation", "Composition"],
          rows: [
            ["Relationship", "Weak has-a", "Strong part-of"],
            ["The part alone", "Can exist with no whole, or with another whole", "Does not meaningfully exist outside this whole"],
            ["Who creates it", "Usually outside, then passed in", "Usually the whole, inside its initialiser"],
            ["If the whole is destroyed", "The parts remain", "The parts go with it"],
            ["UML", "Hollow diamond on the whole", "Filled diamond on the whole"],
          ],
        },
        { type: "p", text: "The diagrams below use the same examples. The hollow diamond is aggregation: the segment can be shared. The filled diamond is composition: the file is not shared, and it goes when the folder goes." },
        {
          type: "uml",
          w: 720,
          h: 180,
          caption: "Aggregation. The hollow diamond is on Triangle, the whole. A segment can belong to several triangles, so the multiplicity at Triangle is *. Each triangle has three sides.",
          nodes: [
            { id: "triangle", x: 36, y: 36, w: 200, name: "Triangle", attrs: [], ops: [] },
            { id: "segment", x: 460, y: 36, w: 200, name: "Segment", attrs: [], ops: [] },
          ],
          edges: [
            { from: "triangle", to: "segment", kind: "aggregate", fromMult: "*", toMult: "3", label: "sides" },
          ],
        },
        {
          type: "uml",
          w: 720,
          h: 180,
          caption: "Composition. The filled diamond is on the whole. A file has one folder. A folder has many files. Deleting the folder deletes the files. The same pattern is Hospital, filled diamond, to Department, with 1 at the hospital and 1..* at the department.",
          nodes: [
            { id: "folder", x: 36, y: 36, w: 200, name: "Folder", attrs: [], ops: [] },
            { id: "file", x: 460, y: 36, w: 200, name: "File", attrs: [], ops: [] },
          ],
          edges: [
            { from: "folder", to: "file", kind: "compose", fromMult: "1", toMult: "*", label: "files" },
          ],
        },
        {
          type: "code",
          title: "Players are created outside the team",
          source: `class Player:
    def __init__(self, name: str):
        self.name = name

class Team:
    def __init__(self, name: str, players: list[Player]):
        self.name = name
        self.players = players

ada = Player("Ada")
team = Team("Firsts", [ada])
# ada still exists if team is deleted`,
          caption: "`ada` is created before the team, and the comment records that Ada still exists if the team is deleted.",
        },
        { type: "p", text: "A Player can exist without a particular Team, so this is aggregation. The team groups players, but it does not define their existence." },
        {
          type: "uml",
          w: 780,
          h: 210,
          caption: "Hollow diamond on Team. One team, one or more players. The players are not owned.",
          nodes: [
            { id: "player", x: 30, y: 48, w: 230, name: "Player", attrs: ["− name: str"], ops: [] },
            { id: "team", x: 460, y: 28, w: 290, name: "Team", attrs: ["− name: str", "+ players: list"], ops: [] },
          ],
          edges: [
            { from: "team", to: "player", kind: "aggregate", fromMult: "1", toMult: "1..*" },
          ],
        },
        {
          type: "code",
          title: "The car builds its own engine",
          source: `class Engine:
    def start(self) -> None:
        print("Engine started")

class Car:
    def __init__(self, make: str):
        self.make = make
        self.engine = Engine()

car = Car("Toyota")
car.engine.start()`,
          caption: "`Engine()` runs inside `Car.__init__`, and `car.engine.start()` prints Engine started.",
        },
        { type: "p", text: "Here, the Car creates and owns its Engine. This is composition, because the engine is an internal part of the car. If the design instead passed in an engine that another car might share, the relationship would be aggregation, even though the classes have the same names." },
        {
          type: "uml",
          w: 780,
          h: 220,
          caption: "Filled diamond on Car. The role name on the line is engine. Multiplicity 1 and 1: this car has this engine.",
          nodes: [
            { id: "engine", x: 24, y: 40, w: 250, name: "Engine", attrs: [], ops: ["+ start(): None"] },
            { id: "car", x: 470, y: 24, w: 280, name: "Car", attrs: ["+ make: str", "− engine: Engine"], ops: ["+ __init__(make)"] },
          ],
          edges: [
            { from: "car", to: "engine", kind: "compose", fromMult: "1", toMult: "1", label: "engine" },
          ],
        },
        { type: "h3", text: "Advantages of aggregation and composition" },
        {
          type: "list",
          items: [
            "Aggregation allows code to be reused. The code defined in the aggregated class can be reused in the aggregating class.",
            "Aggregation allows a better organisation of the objects, because the variables and methods of the aggregated data stay in the class they belong to.",
          ],
        },
        { type: "h3", text: "Disadvantages of aggregation and composition" },
        {
          type: "list",
          items: [
            "Using aggregation can lead to more complex code when you access functions of an aggregated object. `car.engine.start()` is more navigation than `car.start()`.",
            "Aggregation increases dependencies. A change in one class can have an unexpected consequence for another class. A change to Engine can break Car.",
          ],
        },
        { type: "h3", text: "Why the distinction matters" },
        { type: "p", text: "The distinction helps when you design object lifecycles and responsibilities. If a smaller object should be created, stored, and destroyed as part of a larger object, composition is often the clearer model. If the smaller object should continue to exist independently, aggregation is usually the better description." },
        { type: "h3", text: "Summary" },
        { type: "p", text: "Composition, a strong part-of:" },
        {
          type: "list",
          items: [
            "The whole creates the part.",
            "The part cannot exist without the whole.",
            "Lifetime is tied. The part is almost always created inside the composing object, because the whole controls the part's lifetime.",
          ],
        },
        { type: "p", text: "Aggregation, a weak has-a:" },
        {
          type: "list",
          items: [
            "The whole receives the part from outside.",
            "The part can exist independently.",
            "The aggregate does not own the part.",
            "Lifetime is not tied. The part is usually created outside the aggregating object, then passed in, because the part has an independent lifecycle.",
          ],
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "A Car is not a kind of Engine, so inheritance is the wrong line. \"Is-a\" has to be true in ordinary language. \"Has-a\" splits into the hollow diamond, independent parts, and the filled diamond, owned parts. Put the diamond at the whole: the team, the car, the folder, the hospital." },
      ],
    },
    {
      id: "patterns",
      nav: "Patterns",
      kicker: "B3.2.5 · Commonly used design patterns",
      title: "Singleton, factory, observer",
      lede: "A design pattern is a reusable shape for a problem that keeps turning up. It is not a finished program, and it is not a library you import. The syllabus names three.",
      blocks: [
        {
          type: "pair",
          able: [
            "Say what problem each pattern is for, not just its name.",
            "Trace a singleton and show that a second call returns the same object.",
            "Trace a factory and show that the caller receives an object without naming the concrete class.",
            "Trace an observer and show a subject notifying every attached listener.",
          ],
          notes: [
            "Singleton: exactly one instance, and a global way to get it.",
            "Factory: object creation is moved into one place, and the caller depends on an interface.",
            "Observer: one subject, many subscribers, notified when the state changes.",
          ],
        },
        { type: "h3", text: "Singleton" },
        { type: "p", text: "The singleton pattern ensures that a class has only one instance, and it provides a global point of access to that instance. It is used when several parts of an application need to share one coordinated resource or one central state." },
        { type: "p", text: "That single shared access point is useful for shared configuration, logging setup, or an application-wide service. Every part of the program that asks for the object receives the same one." },
        {
          type: "list",
          items: [
            "Logging services: loggers write application events to one destination, such as a file. A singleton avoids competing writers producing out-of-order entries.",
            "Application configuration and settings: app-wide properties, such as environment variables or feature flags, need to be loaded once at startup and read everywhere without parsing the files again.",
          ],
        },
        { type: "p", text: "Singleton should be used carefully. A single shared object can make code harder to test and can introduce hidden global state. Tests start to depend on whatever the last test left in that object, and two parts of the program can interfere through it. Use it when one instance is a real constraint, not as a way to avoid passing arguments." },
        {
          type: "code",
          title: "The second Settings() is the first Settings()",
          source: `class Settings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self.theme = "dark"
        self._initialized = True

first = Settings()
second = Settings()
print(first is second)   # True
second.theme = "light"
print(first.theme)       # light`,
          caption: "`first is second` prints True. Setting `second.theme` to light changes `first.theme` as well.",
        },
        { type: "p", text: "`__new__` decides whether to allocate. After the first call it returns the stored instance, so `__init__` would run again on the same object. The `_initialized` flag stops the second call from resetting `theme`. That guard matters in Python, because `__init__` is not skipped just because `__new__` reused an object." },
        {
          type: "list",
          items: [
            "Main idea: only one instance is created.",
            "Typical use: shared settings, or a single service object.",
            "Risk: hidden global state can reduce modularity.",
          ],
        },
        { type: "h3", text: "Key benefits of a singleton" },
        {
          type: "list",
          items: [
            "Controlled access to one resource: it prevents conflicting access to something that can only handle one operation at a time, such as a logger, a print spooler, or a hardware device.",
            "Memory and overhead: an expensive object, such as a configuration parser or a heavy connection, is created once rather than allocated again and again.",
            "Lazy initialisation: unlike a value that is created as soon as the program starts, a singleton can be created only when it is first requested.",
            "One shared state: every module reads and writes the same data, such as runtime settings or an in-memory cache. That is the benefit, and it is also the risk.",
          ],
        },
        { type: "h3", text: "Factory" },
        { type: "p", text: "A factory centralises object creation. Instead of client code constructing every concrete class itself, one function or class decides which concrete object to create. This helps when the exact class depends on user input, configuration, or some other run-time condition. It also reduces coupling, because the rest of the program can work with a common interface rather than depending on many concrete classes." },
        { type: "p", text: "Primary uses:" },
        {
          type: "list",
          items: [
            "Dynamic object creation at run time: you do not know ahead of time which exact type you will need, for example choosing a payment gateway from a user selection.",
            "Encapsulating a complex setup: creating the object takes several steps, such as reading environment variables or preparing a database handle, before it can be used.",
            "Decoupling frameworks and libraries: plugins can supply a custom implementation without modifying the core code.",
          ],
        },
        { type: "p", text: "Key benefits:" },
        {
          type: "list",
          items: [
            "Loose coupling: client code depends on an abstract type, such as `BaseNotifier`, rather than on `EmailNotifier` or `SMSNotifier`. Changing an implementation does not break the caller.",
            "Open/closed: a new product type, such as a WhatsApp notifier, can be added without editing the existing callers. You extend the factory, or register the new class.",
            "Single responsibility: object creation lives in one place, so the business code is not full of initialisation.",
            "Consistent object state: objects are fully configured before they reach the rest of the program.",
          ],
        },
        {
          type: "code",
          title: "The caller names a channel, not a class",
          source: `from abc import ABC, abstractmethod

class BaseNotifier(ABC):
    @abstractmethod
    def send(self, message: str) -> None:
        pass

class EmailNotifier(BaseNotifier):
    def send(self, message: str) -> None:
        print(f"[EMAIL] Sending: {message}")

class SMSNotifier(BaseNotifier):
    def send(self, message: str) -> None:
        print(f"[SMS] Sending: {message}")

class PushNotifier(BaseNotifier):
    def send(self, message: str) -> None:
        print(f"[PUSH] Sending: {message}")

class NotifierFactory:
    _notifiers = {
        "email": EmailNotifier,
        "sms": SMSNotifier,
        "push": PushNotifier,
    }

    @classmethod
    def get_notifier(cls, channel_type: str) -> BaseNotifier:
        notifier_cls = cls._notifiers.get(channel_type.lower())
        if not notifier_cls:
            raise ValueError(f"Unknown notification channel: {channel_type}")
        return notifier_cls()

mail = NotifierFactory.get_notifier("email")
mail.send("Your order has shipped")
again = NotifierFactory.get_notifier("email")
print(mail is again)  # False: a factory is not a singleton`,
          caption: "Each call returns a new object, so `mail is again` prints False. A factory is not a singleton. An unknown channel fails inside the factory.",
        },
        {
          type: "list",
          items: [
            "Main idea: creation is separated from use.",
            "Typical use: selecting one of several concrete classes at run time. `BaseNotifier` is the abstraction from B3.2.3, reused as the type the factory promises.",
          ],
        },
        {
          type: "uml",
          w: 980,
          h: 430,
          caption: "The three notifiers inherit the `send` contract. The dashed arrow is a dependency: the factory creates a BaseNotifier, and the caller never mentions the concrete classes.",
          nodes: [
            { id: "base", x: 16, y: 16, w: 340, name: "BaseNotifier", stereo: "<<interface>>", attrs: [], ops: ["+ send(message: str)"] },
            { id: "factory", x: 560, y: 16, w: 400, name: "NotifierFactory", stereo: "<<factory>>", attrs: ["− _notifiers"], ops: ["+ get_notifier(channel)"] },
            { id: "email", x: 16, y: 250, w: 280, name: "EmailNotifier", attrs: [], ops: ["+ send(message: str)"] },
            { id: "sms", x: 330, y: 250, w: 280, name: "SMSNotifier", attrs: [], ops: ["+ send(message: str)"] },
            { id: "push", x: 644, y: 250, w: 300, name: "PushNotifier", attrs: [], ops: ["+ send(message: str)"] },
          ],
          edges: [
            { from: "email", to: "base", kind: "inherit" },
            { from: "sms", to: "base", kind: "inherit" },
            { from: "push", to: "base", kind: "inherit" },
            { from: "factory", to: "base", kind: "depend", label: "<<creates>>" },
          ],
        },
        { type: "lab", name: "patterns" },
        { type: "h3", text: "Observer" },
        { type: "p", text: "Observer is used when one object needs to notify several other objects about a change in state. It supports event-driven thinking: one subject changes, and its observers react." },
        { type: "p", text: "This is useful in interfaces, messaging systems, and applications where an update should be broadcast to several listeners without tightly coupling the classes. A weather station does not import the phone display and the television display and call them by class. Displays `attach` themselves. When the temperature changes, the station walks its list and calls `update` on each one." },
        { type: "p", text: "Primary use cases:" },
        {
          type: "list",
          items: [
            "Event-driven systems and interfaces: interface components update when the underlying data changes, as in a model-view split where the view observes the model.",
            "Real-time data feeds: one update is broadcast to many listeners, such as a stock ticker, a scoreboard, or a weather dashboard.",
            "Notification and messaging: one event triggers several later actions. Placing an order can send an email, write an audit log, and update a dashboard.",
          ],
        },
        { type: "p", text: "Key benefits:" },
        {
          type: "list",
          items: [
            "Loose coupling: the subject only knows that its observers implement a given interface. It does not need their concrete classes, their internal state, or their implementation.",
            "Dynamic relationships: observers can be attached or detached at run time, based on the state of the program or on what the user wants.",
            "Broadcast: the subject sends the update to any number of subscribers in one operation, rather than a hand-written call to every dependent object.",
          ],
        },
        {
          type: "code",
          title: "Attach, then wait for notify",
          source: `from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, temperature: float) -> None:
        pass

class Subject(ABC):
    @abstractmethod
    def attach(self, observer: Observer) -> None:
        pass

    @abstractmethod
    def detach(self, observer: Observer) -> None:
        pass

    @abstractmethod
    def notify(self) -> None:
        pass

class WeatherStation(Subject):
    def __init__(self):
        self._observers: list[Observer] = []
        self._temperature = 0.0

    def attach(self, observer: Observer) -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self) -> None:
        for observer in self._observers:
            observer.update(self._temperature)

    def set_temperature(self, new_temperature: float) -> None:
        self._temperature = new_temperature
        self.notify()

class PhoneDisplay(Observer):
    def update(self, temperature: float) -> None:
        print(f"[Phone] {temperature} C")

class TVDisplay(Observer):
    def update(self, temperature: float) -> None:
        print(f"[TV] {temperature} C")

station = WeatherStation()
phone = PhoneDisplay()
station.attach(phone)
station.attach(TVDisplay())
station.set_temperature(21)
station.detach(phone)
station.set_temperature(18)  # the phone no longer prints`,
          caption: "After both displays are attached, `set_temperature(21)` prints both. After the phone is detached, `set_temperature(18)` prints only the television.",
        },
        {
          type: "list",
          items: [
            "Main idea: observers subscribe, then receive updates when the subject changes.",
            "Typical use: event systems, notifications, and interfaces.",
          ],
        },
        { type: "p", text: "The displays are created outside the station and can exist with no station attached. The station keeps a list of them. That list is aggregation: a hollow diamond on WeatherStation, towards Observer. The station does not own the displays, and it does not know which concrete classes are listening." },
        { type: "lab", name: "observer" },
        {
          type: "table",
          title: "Which pattern, in one line",
          head: ["Pattern", "The problem", "The test that you have it"],
          rows: [
            ["Singleton", "The program must share exactly one of this object", "`a is b`, after two constructions"],
            ["Factory", "The caller should not choose or build the concrete class", "The result's type depends on a value, and `a is b` is `False`"],
            ["Observer", "Several objects must react when one object changes", "`attach`, change the subject, every attached `update` runs"],
          ],
        },
        { type: "callout", kind: "note", label: "Linking questions", text: "The guide asks how OOP shows up in databases, whether every program needs it or only the complex ones, how these patterns help a machine-learning system stay maintainable, and how encapsulation applies to network communication. A strong answer uses one class from this topic and one fact from A2, A3 or A4, rather than repeating a definition." },
      ],
    },
  ],
  mcqs: [
    {
      q: "Teacher(Person) calls super().__init__(name) before it sets self.subject. Why?",
      options: [
        "`super` copies every Teacher method up into Person",
        "The parent initialiser sets the inherited state, here name, before the subclass adds its own",
        "Python requires `super` as the first statement of every method",
        "It makes Teacher the parent of Person",
      ],
      answer: 1,
      why: "The subclass object includes the parent's part. super().__init__ runs Person's initialiser on this object. The inheritance arrow still points from Teacher to Person: Person is the parent.",
    },
    {
      q: "print_area takes a Shape and calls shape.area(). A Circle is passed in. Which statement is correct?",
      options: [
        "This is static polymorphism: the compiler chose Circle.area from the argument types",
        "This is overriding, resolved at run time from the actual object",
        "Circle must not define `area`, or it will hide Shape.area permanently",
        "print_area must contain an if statement for each subclass",
      ],
      answer: 1,
      why: "Circle.area overrides Shape.area. The function was written against Shape, and the body that runs is chosen when the call happens, from the object that was passed. Adding a subclass does not mean editing print_area.",
    },
    {
      q: "In the Java Calculator, add(2, 3), add(2.5, 3.5) and add(1, 2, 3) each run a different method. Why is this static polymorphism, and why can it be more efficient than overriding?",
      options: [
        "The method is chosen from the object at run time, so each call searches for an implementation",
        "The compiler chooses the method from the number and types of the arguments, so the running program does no lookup",
        "All three calls run the same method body",
        "Static polymorphism means the method was declared with the keyword `static`",
      ],
      answer: 1,
      why: "Binding happens at compile time. That removes the extra lookup dynamic polymorphism spends deciding which implementation to call, and it lets the compiler optimise the call. One name still covers the related operations.",
    },
    {
      q: "PaymentMethod is an abstract base class with an abstract `pay` method. Which call succeeds?",
      options: [
        "PaymentMethod()",
        "A subclass that does not define `pay`, then constructed",
        "CardPayment(), where CardPayment defines `pay`",
        "PaymentMethod.pay(20), with no object and no subclass",
      ],
      answer: 2,
      why: "The abstract class cannot be instantiated, and neither can a subclass that still owes an abstract method. CardPayment has supplied `pay`, so it is concrete and can be constructed.",
    },
    {
      q: "A Team is given a list of Player objects that were constructed elsewhere. A Car constructs an Engine inside __init__. Which row is right?",
      options: [
        "Both are inheritance, because each class uses another class",
        "Team–Player is aggregation; Car–Engine, as written, is composition",
        "Both are composition, because both are has-a",
        "Team–Player is composition, because the team stores the list",
      ],
      answer: 1,
      why: "Players can exist with no team, and they are passed in: aggregation, hollow diamond on Team. The engine is created by the car and treated as its part: composition, filled diamond on Car. Has-a is the family; the lifetime decides which member.",
    },
    {
      q: "Which trace matches the three patterns?",
      options: [
        "Singleton returns a new object each call; factory always returns the same one; observer has no list",
        "Singleton returns the same object; factory returns a new object of a chosen class; observer calls `update` on each attached object",
        "All three return the same object",
        "Observer is another name for inheritance",
      ],
      answer: 1,
      why: "Settings() is one shared instance. NotifierFactory.get_notifier builds a new notifier and is not a singleton. WeatherStation.notify walks the observers it has attached. Observer is a has-a list plus a callback, not an is-a hierarchy, though the displays do inherit an Observer interface.",
    },
  ],
  checks: [
    "Draw an is-a hierarchy and write the subclass, including super().__init__ and an override that calls super().",
    "State, for `public`, `protected`, `default` and `private`, whether a subclass may use the member.",
    "Explain Python's version: plain names, _names, and __names mangled with the class name.",
    "Write a polymorphic call that works for two subclasses, and say when the method body is chosen.",
    "Distinguish overriding from overloading, and explain why static polymorphism can be more efficient.",
    "Say what __str__, __repr__, __len__ and __eq__ are for.",
    "Explain why an abstract class cannot be instantiated, and what a subclass must do.",
    "Choose aggregation or composition for a new pair of classes, and draw the right diamond on the whole.",
    "Describe singleton, factory and observer by the problem each one solves, and by what a second call returns.",
  ],
};
