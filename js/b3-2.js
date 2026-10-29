export const topic = {
  id: "B3.2",
  title: "Fundamentals of OOP for multiple classes",
  kicker: "IB DP Computer Science · Theme B · HL only",
  lede: "B3.1 built one class. B3.2 is what happens when classes work together. A subclass reuses its parent's code, the same call can do different work, an abstract class defines the interface, and a has-a relationship is either ownership or a looser grouping. The syllabus names three design patterns: singleton, factory, and observer.",
  chips: ["B3.2", "HL only", "Python 3", "Part of B3's 23 HL hours"],
  mapTitle: "The five statements in B3.2",
  mapLede: "All five are HL only. SL stops at B3.1, but the definitions of inheritance and polymorphism are still named inside B3.1.1. B3 as a whole is recommended at 23 hours for HL; this page is the multiple-class half.",
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
      title: "A subclass is a more specific version of its parent",
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
            "Python has no Java access keywords. The syllabus still expects Java's four access levels, and the Python naming convention.",
          ],
        },
        { type: "p", text: "Inheritance expresses an is-a relationship. A subclass is a more specialised version of a parent class. The subclass automatically reuses non-private attributes and methods from the parent, and it can add new behaviour or override inherited methods. Common behaviour is written once in the parent and inherited by many subclasses." },
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
        {
          type: "code",
          lang: "Java",
          title: "The same hierarchy with extends and super",
          source: `class Person {
    protected String name;
    Person(String name) { this.name = name; }
    String introduce() { return "Hello, I am " + name + "."; }
}

class Teacher extends Person {
    private String subject;
    Teacher(String name, String subject) {
        super(name);
        this.subject = subject;
    }
    @Override
    String introduce() {
        return super.introduce() + " I teach " + subject + ".";
    }
}`,
          caption: "`extends` names the parent. `super(name)` runs the parent's constructor. `@Override` marks that `introduce` replaces the parent version; the compiler checks the signature matches.",
        },
        { type: "h3", text: "What the example shows" },
        {
          type: "list",
          items: [
            "`Teacher` and `Student` inherit from `Person`, so they reuse the `name` attribute and the `introduce` method.",
            "`super().__init__(name)` calls the parent initialiser so the inherited part of the object is set up correctly.",
            "`super().introduce()` runs the parent's version. Each subclass overrides `introduce` for its own instances.",
            "The subclass can add new data, such as `subject`, and can also override methods.",
          ],
        },
        {
          type: "uml",
          w: 820,
          h: 360,
          caption: "The hollow triangle points at the parent. By UML convention each subclass box shows only what it adds or overrides: `subject` and `grade_level` are new; `introduce()` appears again because it is overridden. Inherited `name` stays in Person only.",
          nodes: [
            { id: "person", x: 280, y: 12, w: 260, name: "Person", attrs: ["+ name: str"], ops: ["+ introduce(): str"] },
            { id: "teacher", x: 24, y: 210, w: 300, name: "Teacher", attrs: ["+ subject: str"], ops: ["+ introduce(): str"] },
            { id: "student", x: 470, y: 210, w: 320, name: "Student", attrs: ["+ grade_level: int"], ops: ["+ introduce(): str"] },
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
          title: "Which members a subclass can use",
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
          caption: "Inside Child, `__private` is looked up as `_Child__private`, which was never set. The parent's value is stored as `_Parent__private`. Reaching it that way works, but it breaks the information hiding the underscores were meant to provide. A subclass should use the parent's methods, not the mangled name.",
        },
        { type: "h3", text: "Advantages of inheritance" },
        {
          type: "list",
          items: [
            "Reuse: shared data and behaviour live once in the parent.",
            "Extension: a subclass adds only what is new, such as `subject`.",
            "Shared fixes: a fix in the parent reaches every subclass that still uses that code.",
            "Focused tests: behaviour inherited unchanged need not be retested in the subclass, unless it calls a method the subclass overrides.",
          ],
        },
        { type: "h3", text: "Disadvantages of inheritance" },
        {
          type: "list",
          items: [
            "Tight coupling / fragile base class: a change in the parent can silently break subclasses.",
            "Deep hierarchies are hard to follow: you must read up the chain to know what a method does.",
            "Wrong is-a claims, such as `Square(Rectangle)`, force awkward overrides when the relationship is not true in ordinary language.",
            "Prefer composition when the relationship is really has-a. A car is not a kind of engine; that decision is B3.2.4.",
          ],
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "\"Changes in the superclass are reflected in the subclass\" is both a benefit and a risk. An evaluate question wants both sides: reuse and shared fixes on one hand, fragile base class and deep hierarchies on the other." },
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
        { type: "p", text: "Think of dogs. A Chihuahua, a Golden Retriever, and a German Shepherd all hear \"Fetch!\", but each may carry it out differently: one returns quickly, one enthusiastically, one slowly. The same command, different behaviour. That is the basic idea: one interface, many forms." },
        { type: "p", text: "In OOP, the same method call can work with objects of different types. Client code focuses on what an object can do, not on its exact class." },
        { type: "h3", text: "Dynamic polymorphism in Python" },
        { type: "p", text: "Dynamic polymorphism happens when different subclasses provide their own versions of the same method and the program chooses the correct version at run time. In Python, this is usually demonstrated through method overriding." },
        {
          type: "code",
          title: "print_area does not mention Rectangle or Circle",
          source: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

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
          caption: "`Shape` is an abstract base class, so `Shape()` fails. `print_area(Rectangle(4, 3))` prints 12. `print_area(Circle(2))` prints 12.56636. B3.2.3 returns to why abstract classes cannot be constructed.",
        },
        { type: "p", text: "The function `print_area()` does not need to know whether it receives a Rectangle or a Circle. It simply calls `area()`. The specific implementation used depends on the actual object passed in." },
        { type: "p", text: "Dynamic binding makes it possible to write code that does not depend on one specific class. `print_area()` can take any subclass of Shape: a circle, a rectangle, a triangle, or a shape that has not been written yet. That function depends on Shape, not on the particular subclasses. A new kind of Shape does not force `print_area()` to change." },
        {
          type: "uml",
          w: 800,
          h: 370,
          caption: "`Shape` is marked `<<abstract>>`, matching the ABC in the code. `Rectangle.area` and `Circle.area` override it. The call `shape.area()` is valid because Shape declares `area`. Which body runs depends on the actual object.",
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
            "One call site works for every subclass that shares the interface.",
            "Each subclass writes only the code it needs. Rectangle's `area` is a product; Circle's is not a copy of it.",
            "New subclasses do not force callers such as `print_area` to change.",
          ],
        },
        { type: "p", text: "Dynamic polymorphism has to resolve the method at run time. The language can check that `shape.area()` is a valid call, because Shape defines `area()`. If subclasses override `area()`, the language cannot know which version will run, because the actual object's class may be known only when the program is running. The call is resolved then: the runtime finds the object's class and calls that class's method. The extra lookup is a small cost. Dynamic polymorphism means the binding happens at run time, not at compile time." },
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
            return [(i.name, i.price) for i in self.items] == [
                (i.name, i.price) for i in other.items
            ]
        return False

cart1 = ShoppingCart("Alice")
cart1.add_item(Item("Book", 12.99))
cart1.add_item(Item("Pen", 1.50))
cart2 = ShoppingCart("Alice")
cart2.add_item(Item("Book", 12.99))
cart2.add_item(Item("Pen", 1.50))
print(str(cart1))      # Alice's Cart (2 items)
print(len(cart1))      # 2
print(cart1 == cart2)  # True: same items, in the same order`,
          caption: "`str(cart1)` uses `__str__`. `len(cart1)` uses `__len__` and prints 2. `cart1 == cart2` uses `__eq__` and prints True when the item lists match. Defining `__eq__` without `__hash__` makes the class unhashable; see the note in B3.1.4.",
        },
        { type: "p", text: "This is often called operator overloading, because it defines how a built-in operator, such as `+`, `==`, or `<`, behaves for a custom object. Defining `__eq__` overloads `==`. Despite the name, Python's operator overloading is resolved at run time: you are overriding a method inherited from `object`. It is not the compile-time overloading described below. `__str__` is the readable form. `__repr__` is the unambiguous form, useful in a debugger. `__len__` is what `len(cart)` calls." },
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

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));       // 5
        System.out.println(calc.add(2.5, 3.5));   // 6.0
        System.out.println(calc.add(1, 2, 3));    // 6
    }
}`,
          caption: "The calls sit inside `main`, so the fragment compiles. The compiler picks which `add` to invoke from the number and types of the arguments. Printing the results shows that a different method body runs each time. The binding is done at compile time, which is why this is called static polymorphism.",
        },
        {
          type: "list",
          items: [
            "Efficiency: the method is chosen at compile time, so the running program skips the lookup that dynamic polymorphism needs, and the compiler can optimise the call.",
            "One name for related operations: `add` covers ints, doubles and three-argument sums, instead of three separate names.",
            "The compiler selects the version from the argument types, so the caller does not have to remember those names.",
            "Related functionality stays under one identifier, which keeps the class less cluttered.",
          ],
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "Overriding is dynamic. The signature stays the same, the subclass supplies a new body, and the actual object decides which body runs. That decision is a lookup, and it happens at run time. Overloading is static. The name stays the same, the parameters differ, and the arguments decide which method runs, at compile time. The efficiency claim belongs to overloading, because the search is already finished before the program runs." },
      ],
    },
    {
      id: "abstraction",
      nav: "Abstraction",
      kicker: "B3.2.3 · Abstraction in OOP",
      title: "Name what must be done. Leave how it is done to the subclass.",
      lede: "Abstraction keeps the essential feature and hides the detail that callers do not need. An abstract class says what its subclasses must be able to do, and it cannot be constructed until they provide those methods.",
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
        { type: "p", text: "Abstraction means focusing on the essential features of an object while hiding unnecessary implementation detail. An abstract class describes what related subclasses must be able to do, without fully defining how every method works. In Python that is usually an abstract base class from the `abc` module: you cannot instantiate it until a concrete subclass implements every method marked `@abstractmethod`." },
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
          caption: "`card.pay(20)` prints the card message. `PaymentMethod()` raises TypeError. A subclass that forgets `pay` is still abstract, and constructing it also fails.",
        },
        {
          type: "code",
          lang: "Java",
          title: "abstract class, interface, and @Override",
          source: `abstract class PaymentMethod {
    abstract void pay(double amount);
}

interface Refundable {
    void refund(double amount);
}

class CardPayment extends PaymentMethod implements Refundable {
    @Override
    void pay(double amount) {
        System.out.println("Paid " + amount + " by card");
    }
    @Override
    public void refund(double amount) {
        System.out.println("Refunded " + amount);
    }
}`,
          caption: "An `abstract class` can mix concrete and abstract methods. An `interface` is a pure contract: every method is abstract unless marked otherwise. `implements` is realisation; that is where the UML `<<interface>>` stereotype belongs. `@Override` checks that `pay` and `refund` match the parent signatures.",
        },
        { type: "p", text: "The abstract class `PaymentMethod` defines a common interface: every payment method must implement `pay()`. Callers can use that interface without knowing how a particular payment works. Modular programming splits a system into interchangeable pieces; PaymentMethod and its subclasses form one such piece. A factory, in the patterns section, can choose the subclass so the caller never names it. Adding a voucher payment means a new subclass, not a rewrite of the checkout." },
        {
          type: "list",
          items: [
            "Cannot be instantiated directly: constructing an ABC, or a subclass that still has an abstract method, raises TypeError.",
            "Enforces method implementation: a concrete subclass must override every `@abstractmethod`.",
            "Defines a contract: every real payment method has `pay`, with the same arguments.",
          ],
        },
        { type: "callout", kind: "note", label: "Remember", text: "Abstraction and encapsulation are related, but they answer different questions. Encapsulation asks where the data lives, and who may change it. Abstraction asks what the caller needs to know in order to use the object. A caller that makes a payment needs the amount and the `pay` method. It does not need to know how the payment is stored." },
      ],
    },
    {
      id: "relationships",
      nav: "Relationships",
      kicker: "B3.2.4 · Composition and aggregation",
      title: "Has-a, in two strengths",
      lede: "Inheritance was an is-a relationship. Composition and aggregation are both has-a relationships. The difference is whether the part can exist without the whole.",
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
        { type: "p", text: "Aggregation is a weak has-a: the part can exist on its own, and is usually passed into the whole. Composition is a strong part-of: the whole creates and owns the part, and the part is not meant to outlive it." },
        {
          type: "table",
          title: "The distinction the syllabus uses",
          head: ["", "Aggregation", "Composition"],
          rows: [
            ["Relationship", "Weak has-a", "Strong part-of"],
            ["The part alone", "Can exist with no whole, or with another whole", "Does not meaningfully exist outside this whole"],
            ["Who creates it", "Usually outside, then passed in", "Usually the whole, inside its initialiser"],
            ["If the whole is destroyed", "The parts remain", "The parts go with it (as a design intent)"],
            ["UML", "Hollow diamond on the whole", "Filled diamond on the whole"],
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
        { type: "p", text: "A player can exist without a particular team, so this is aggregation. The team groups the players. It does not decide whether a player exists." },
        {
          type: "uml",
          w: 780,
          h: 210,
          caption: "Hollow diamond on Team, the whole. Role name `players` sits on the line; do not also list `players` as an attribute. Multiplicity 1 and 1..*: one team, one or more players. Attribute visibility matches the public code.",
          nodes: [
            { id: "player", x: 30, y: 48, w: 230, name: "Player", attrs: ["+ name: str"], ops: [] },
            { id: "team", x: 460, y: 28, w: 290, name: "Team", attrs: ["+ name: str"], ops: [] },
          ],
          edges: [
            { from: "team", to: "player", kind: "aggregate", fromMult: "1", toMult: "1..*", label: "players" },
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
        self._engine = Engine()

    def start(self) -> None:
        self._engine.start()

car = Car("Toyota")
car.start()`,
          caption: "`Engine()` runs inside `Car.__init__`. Keeping the part as `_engine` signals that nothing outside is meant to hold a reference. `car.start()` prints Engine started. Python uses garbage collection, so composition is a design intent: no one else is meant to keep the part alive. Assigning `c2._engine = c1._engine` would break that intent.",
        },
        { type: "p", text: "Here, the car creates and owns its engine. This is composition, because the engine is an internal part of the car. If the car was instead given an engine that another car might share, the relationship would be aggregation, even with the same class names." },
        {
          type: "uml",
          w: 780,
          h: 220,
          caption: "Filled diamond on Car. The role name on the line is `engine`; it is not repeated as an attribute. Constructor written in UML form as `+ Car(make: str)`. Multiplicity 1 and 1: this car has this engine.",
          nodes: [
            { id: "engine", x: 24, y: 40, w: 250, name: "Engine", attrs: [], ops: ["+ start(): None"] },
            { id: "car", x: 470, y: 24, w: 280, name: "Car", attrs: ["+ make: str"], ops: ["+ Car(make: str)", "+ start(): None"] },
          ],
          edges: [
            { from: "car", to: "engine", kind: "compose", fromMult: "1", toMult: "1", label: "engine" },
          ],
        },
        { type: "h3", text: "Advantages" },
        {
          type: "list",
          items: [
            "Aggregation reuses an independent class: Player logic stays in Player, and many teams can share the same player objects over time.",
            "Composition keeps ownership clear: the car creates the engine, so the part's lifetime follows the whole.",
            "Both keep each class focused. Engine methods stay on Engine; Car does not swallow them.",
          ],
        },
        { type: "h3", text: "Disadvantages" },
        {
          type: "list",
          items: [
            "Extra hops: `car.start()` may need to reach through `_engine`, which can make a call chain harder to follow than a single method on Car.",
            "Dependencies: a change to Engine can break Car, even when the relationship is composition.",
            "Aggregation needs care with shared parts: if two teams hold the same Player, a mutation is visible in both.",
          ],
        },
        { type: "h3", text: "Which relationship?" },
        { type: "p", text: "The learning outcome asks you to choose. Ask two questions: is it is-a in ordinary language? If yes, inheritance. If it is has-a, can the part exist without this whole? If yes, aggregation (hollow diamond). If no, composition (filled diamond)." },
        {
          type: "table",
          title: "Worked decisions",
          head: ["Pair", "Relationship", "Why", "UML"],
          rows: [
            ["Dog–Animal", "Inheritance", "A dog is an animal", "Hollow triangle → Animal"],
            ["Library–Book", "Aggregation", "A book exists before and after any one library catalogue", "Hollow diamond on Library"],
            ["House–Room", "Composition", "A room of this house is not a meaningful object on its own", "Filled diamond on House"],
            ["Course–Student", "Aggregation", "A student enrols in many courses and outlives any one of them", "Hollow diamond on Course"],
            ["Car–Wheel", "Composition (typical)", "This car's wheels are fitted as its parts; sharing a wheel across cars is not the model", "Filled diamond on Car"],
          ],
        },
        { type: "callout", kind: "exam", label: "Exam watch", text: "A car is not a kind of engine, so inheritance is the wrong relationship. An is-a claim has to be true in ordinary language. Has-a splits in two: a hollow diamond when the parts are independent, and a filled diamond when the parts are owned. Draw the diamond on the whole, such as the team, the car, the folder, or the hospital." },
      ],
    },
    {
      id: "patterns",
      nav: "Patterns",
      kicker: "B3.2.5 · Commonly used design patterns",
      title: "Singleton, factory, observer",
      lede: "A design pattern is a reusable shape for a problem that keeps coming up. It is not a finished program, and it is not a library you import. The syllabus names three: singleton, factory, and observer.",
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
        { type: "p", text: "Problem: several parts of a program must share exactly one coordinated object, such as application settings or a logging destination." },
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
        { type: "p", text: "How it works: `__new__` decides whether to allocate. After the first call it returns the stored instance, so `__init__` would run again on the same object. The `_initialized` flag stops the second call from resetting `theme`. That guard matters in Python, because `__init__` is not skipped just because `__new__` reused an object." },
        { type: "p", text: "In everyday Python, a module-level object is the usual singleton: a module is imported only once, so `config = Settings()` at module scope, or the standard `logging` module, already gives one shared object. The `__new__` form is useful when a class must enforce the rule, but module-level state is what most Python programs actually use." },
        {
          type: "uml",
          w: 420,
          h: 200,
          caption: "In UML a static member is underlined. Here `_instance` is the single shared reference. Every construction returns that same object.",
          nodes: [
            { id: "settings", x: 40, y: 20, w: 340, name: "Settings", attrs: ["= + _instance: Settings", "+ theme: str"], ops: ["+ Settings()"] },
          ],
          edges: [],
        },
        { type: "p", text: "Primary uses: shared configuration loaded once at startup; a single logging destination and configuration for the whole process." },
        {
          type: "list",
          items: [
            "Controlled access to one resource: one logger, one print spooler, one device handle.",
            "One expensive setup: a configuration parse or connection is created once.",
            "Lazy initialisation: the object can be created on first request rather than at startup.",
            "One shared state: every module reads and writes the same data. That is the benefit, and it is also the risk.",
          ],
        },
        { type: "p", text: "Risks: hidden global state makes tests depend on whatever the last test left behind, and two parts of the program can interfere through the same object. One shared logger gives one destination and one configuration; it does not by itself stop threads from interleaving lines. That needs a lock. Use a singleton when one instance is a real constraint, not as a way to avoid passing arguments." },
        { type: "h3", text: "Factory" },
        { type: "p", text: "Problem: the caller should receive an object that implements a common interface, without naming or constructing the concrete class itself. The exact class often depends on a run-time value." },
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
          caption: "Each call returns a new object, so `mail is again` prints False. A factory is not a singleton. An unknown channel fails inside the factory. `BaseNotifier` is the abstraction from B3.2.3, reused as the type the factory promises.",
        },
        { type: "p", text: "How it works: the factory looks up a channel name in a dictionary of classes, constructs one, and returns it typed as `BaseNotifier`. Callers never import `EmailNotifier`." },
        {
          type: "uml",
          w: 980,
          h: 430,
          caption: "`BaseNotifier` is an ABC, so the stereotype is `<<abstract>>`, matching Shape earlier. The three notifiers inherit `send`. The dashed arrow is a dependency: the factory creates a BaseNotifier. `<<factory>>` is a teaching label, not a standard UML stereotype.",
          nodes: [
            { id: "base", x: 16, y: 16, w: 340, name: "BaseNotifier", stereo: "<<abstract>>", attrs: [], ops: ["+ send(message: str)"] },
            { id: "factory", x: 560, y: 16, w: 400, name: "NotifierFactory", attrs: ["− _notifiers"], ops: ["+ get_notifier(channel)"] },
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
        { type: "p", text: "Primary uses: choosing a payment gateway or notifier from user input; hiding a multi-step setup; letting plugins supply a class without editing the core." },
        {
          type: "list",
          items: [
            "Loose coupling: client code depends on `BaseNotifier`, not on Email or SMS.",
            "Open/closed: a WhatsApp notifier can be registered without editing callers.",
            "Single responsibility: creation lives in one place.",
            "Consistent state: objects are fully configured before they leave the factory.",
          ],
        },
        { type: "p", text: "Risks: an extra layer of indirection, and a growing `if` or dictionary to maintain whenever a new product type appears. A factory that becomes a god object for every construction in the program has gone too far." },
        { type: "lab", name: "patterns" },
        { type: "h3", text: "Observer" },
        { type: "p", text: "Problem: one object changes state, and several interested objects must react, without the subject importing every listener by concrete class." },
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
tv = TVDisplay()
station.attach(phone)
station.attach(tv)
station.set_temperature(21)
station.detach(phone)
station.set_temperature(18)  # the phone no longer prints`,
          caption: "Both displays are kept in named variables, so either can be detached later. After both are attached, `set_temperature(21)` prints both. After the phone is detached, `set_temperature(18)` prints only the television. Calling `detach` on an observer that was never attached raises ValueError.",
        },
        { type: "callout", kind: "exam", label: "Spot the problem", text: "`station.attach(TVDisplay())` with no saved reference attaches a display you can never detach later. `detach` on an observer that was never attached raises ValueError. Both are fair one-line exam traps." },
        { type: "p", text: "How it works: displays attach themselves. When the temperature changes, the station walks its list and calls `update` on each one. The station does not import PhoneDisplay or TVDisplay." },
        {
          type: "uml",
          w: 900,
          h: 420,
          caption: "Hollow diamond on WeatherStation towards Observer: the station aggregates listeners; it does not own them. WeatherStation realises Subject; PhoneDisplay and TVDisplay realise Observer. Inheritance arrows point at the abstract parents.",
          nodes: [
            { id: "subject", x: 40, y: 16, w: 280, name: "Subject", stereo: "<<abstract>>", attrs: [], ops: ["+ attach(o)", "+ detach(o)", "+ notify()"] },
            { id: "observer", x: 560, y: 16, w: 280, name: "Observer", stereo: "<<abstract>>", attrs: [], ops: ["+ update(temp)"] },
            { id: "station", x: 40, y: 240, w: 300, name: "WeatherStation", attrs: ["− _temperature: float"], ops: ["+ set_temperature(t)"] },
            { id: "phone", x: 420, y: 250, w: 220, name: "PhoneDisplay", attrs: [], ops: ["+ update(temp)"] },
            { id: "tv", x: 680, y: 250, w: 200, name: "TVDisplay", attrs: [], ops: ["+ update(temp)"] },
          ],
          edges: [
            { from: "station", to: "subject", kind: "inherit" },
            { from: "phone", to: "observer", kind: "inherit" },
            { from: "tv", to: "observer", kind: "inherit" },
            { from: "station", to: "observer", kind: "aggregate", fromMult: "1", toMult: "*", label: "observers" },
          ],
        },
        { type: "p", text: "Primary uses: interface components that update when a model changes; real-time feeds such as a scoreboard; one event that triggers email, audit log and dashboard together." },
        {
          type: "list",
          items: [
            "Loose coupling: the subject only knows that observers implement `update`.",
            "Dynamic relationships: attach or detach at run time.",
            "Broadcast: one notify reaches every subscriber.",
          ],
        },
        { type: "p", text: "Risks: update chains that are hard to trace when one observer triggers another; memory leaks from observers that are attached and never detached. Keep a reference if you will need to detach later." },
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
        "It copies every Teacher method up into Person",
        "The parent initialiser sets the inherited state, here name, before the subclass adds its own",
        "Python requires `super` as the first statement of every method",
        "Without `super`, Teacher would not be allowed to override `introduce`",
      ],
      answer: 1,
      why: "The subclass object includes the parent's part. super().__init__ runs Person's initialiser on this object. The inheritance arrow still points from Teacher to Person: Person is the parent.",
    },
    {
      q: "In the access-modifier table, which row is correct for a subclass in another package?",
      options: [
        "It can read the parent's `private` members as `self.__private`",
        "It can use `protected` members; it cannot use `private` members",
        "It can use `default` (package) members from any package",
        "Python's `__name` is visible to the subclass under the same spelling",
      ],
      answer: 1,
      why: "protected is visible to subclasses even across packages. private is not. default is package-only. In Python, `__private` inside the child is looked up as `_Child__private`, not the parent's mangled name.",
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
      why: "`Circle.area` overrides `Shape.area`. The function was written to use Shape, and the body that runs is chosen when the call happens, from the object that was passed in. Adding a subclass does not mean you have to edit `print_area`.",
    },
    {
      q: "In the Java Calculator, add(2, 3), add(2.5, 3.5) and add(1, 2, 3) each run a different method. Why is this static polymorphism, and why can it be more efficient than overriding?",
      options: [
        "The method is chosen from the object at run time, so each call searches for an implementation",
        "The compiler chooses the method from the number and types of the arguments, so the running program does no lookup",
        "Overloading is decided at run time, just like overriding",
        "Static polymorphism means the method was declared with the keyword `static`",
      ],
      answer: 1,
      why: "The binding happens at compile time. That removes the extra lookup that dynamic polymorphism uses to decide which implementation to call, and it lets the compiler optimise the call. One name still covers the related operations.",
    },
    {
      q: "PaymentMethod is an abstract base class with an abstract `pay` method. Which call succeeds?",
      options: [
        "PaymentMethod()",
        "Constructing a subclass that has not defined `pay`",
        "CardPayment(), where CardPayment defines `pay`",
        "PaymentMethod.pay(20), with no object and no subclass",
      ],
      answer: 2,
      why: "An abstract class cannot be instantiated. Neither can a subclass that still has an abstract method left unimplemented. `CardPayment` has supplied `pay`, so it is concrete and can be constructed.",
    },
    {
      q: "On a UML diagram, where does the diamond go for Team aggregating Player, and what does hollow versus filled mean?",
      options: [
        "The diamond goes on Player, the part; hollow means composition",
        "The diamond goes on Team, the whole; hollow is aggregation, filled is composition",
        "Both ends get a diamond; filled means the part can exist alone",
        "Diamonds are only used for inheritance",
      ],
      answer: 1,
      why: "Draw the diamond on the whole. Hollow means the parts are independent (aggregation). Filled means the parts are owned (composition). Inheritance uses a hollow triangle, not a diamond.",
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
      why: "Players can exist with no team, and they are passed in. That is aggregation, with a hollow diamond on Team. The engine is created by the car and treated as one of its parts. That is composition, with a filled diamond on Car. Both are has-a relationships. The lifetime of the part decides which one it is.",
    },
    {
      q: "WeatherStation has phone and tv attached. set_temperature(21) runs, then phone is detached, then set_temperature(18) runs. What prints?",
      options: [
        "Both displays at 21, then both at 18",
        "Both displays at 21, then only TV at 18",
        "Only phone at 21, then only TV at 18",
        "Nothing, because notify runs only once when the station is constructed",
      ],
      answer: 1,
      why: "notify walks the current observer list. After the first reading both are attached. After detach(phone), only the television remains for the second reading.",
    },
    {
      q: "Which trace matches the three patterns?",
      options: [
        "Singleton returns a new object each call; factory always returns the same one; observer has no list",
        "Singleton returns the same object; factory returns a new object of a chosen class; observer calls `update` on each attached object",
        "All three return the same object",
        "Factory and singleton are the same pattern under different names",
      ],
      answer: 1,
      why: "Every `Settings()` call returns the one shared instance. `NotifierFactory.get_notifier` builds a new notifier, so a factory is not a singleton. `WeatherStation.notify` walks the observers that have been attached. Observer keeps a has-a list and calls back into it.",
    },
  ],
  tasks: [
    {
      kind: "draw",
      prompt: "A School has many Classroom objects that it creates in its constructor. Each classroom belongs to that school alone. Draw the UML relationship: which class gets the diamond, and is it hollow or filled?",
      reveal: "Filled diamond on School (composition). Multiplicity typically 1 on School and 1..* on Classroom. Do not also list `classrooms` as an attribute if the role name is on the line.",
    },
    {
      kind: "spot",
      prompt: "class Square(Rectangle) overrides set_width to also set height, so a square stays square. A function written for Rectangle doubles only the width. What goes wrong, and which relationship would be safer?",
      reveal: "The function expects a rectangle whose width can change independently of height. Square breaks that assumption (a classic wrong is-a). Prefer composition: a Square has a side length, or has a Rectangle it controls, rather than claiming to be one.",
    },
    {
      kind: "spot",
      prompt: "A subclass forgets to implement PaymentMethod.pay. What happens on CardPayment() if CardPayment is that subclass? What happens on PaymentMethod()?",
      reveal: "Both raise TypeError. A class with an unimplemented abstract method is still abstract, so it cannot be constructed. The parent ABC also cannot be constructed.",
    },
    {
      kind: "exam",
      prompt: "Evaluate the use of inheritance in the design of a graphics application where Circle, Rectangle and Triangle all provide area() and draw(). [6 marks]",
      reveal: "Award up to 6 for balanced evaluation, for example: (AO1/2) inheritance models is-a and lets Shape declare a shared interface; subclasses reuse shared code and override area/draw; (AO3 benefit) print_area or a draw loop need not change when a new shape is added; (AO3 benefit) common fixes live in one parent; (AO3 limit) a fragile base class can break every shape; (AO3 limit) deep hierarchies are hard to follow; (AO3 alternative) composition may fit better if a shape is built from other shapes rather than specialising one. Name both sides for full marks.",
    },
    {
      kind: "exam",
      prompt: "A weather app must update a phone widget, a desktop window and a log file whenever the temperature changes. Identify a suitable design pattern, outline how the classes collaborate, and state one risk. [6 marks]",
      reveal: "Observer / subject–observer. WeatherStation (subject) keeps a list of Observer objects; PhoneWidget, DesktopWindow and TempLog each implement update; attach/detach manage the list; set_temperature updates state and calls notify. Risk: observers never detached (leaks), or update chains that are hard to trace. Credit a clear UML description: hollow diamond on the station towards Observer.",
    },
  ],
  checks: [
    "Draw an is-a hierarchy and write the subclass, including super().__init__ and an override that calls super().",
    "State, for `public`, `protected`, `default` and `private`, whether a subclass may use the member.",
    "Explain Python's version: plain names, _names, and __names mangled with the class name.",
    "Give one advantage and one disadvantage of inheritance, including fragile base class or composition-over-inheritance.",
    "Write a polymorphic call that works for two subclasses, and say when the method body is chosen.",
    "Distinguish overriding from overloading, and explain why Python operator overloading is still run-time.",
    "Explain why an abstract class cannot be instantiated, and what a subclass must do.",
    "Choose aggregation or composition for a new pair of classes, and draw the right diamond on the whole.",
    "Describe singleton, factory and observer by the problem each one solves, one risk each, and what a second call returns.",
  ],
};
