# Learning some design patterns
Little repo with some design patterns I had learned, forgot most of them but still a cool learning

Usage: Add a design pattern in `src/design-patterns/` and run with
```
yarn start [design-pattern-name]
```

# Here are some notes I wrote down from GeeksForGeeks

Add descriptions and examples for all these and build a small simple program for all of them.

##### ~={cyan}**Creational Patterns**=~
focus on the process of object creation or problems related to object creation. They help in making a system independent of how its objects are created, composed and represented. Creational patterns give a lot of flexibility in **what** gets created, **who** creates it and **how** it gets created. 

There are two main themes in these patterns:
- They keep information about the specific classes used in the system hidden
- They hide the details of how instances of these classes are created and assembled
###### **Factory**
defines an interface for creating an object. The Factory method lets a class defer the instantiation to a subclass.

- *When to use?*
	- A class cannot predict the type of objects it needs to create
	- A class wants its subclasses to specify the objects it creates
	- Classes delegate responsibility to one of multiple helper subclasses, whereas we aim to keep the information about which helper subclass is the delegate within a specific scope or location

- *Key components of the Factory*
	- Product
		- abstract class or interface that defines common operations for objects that the factory will create
		- concrete products are the actual classes that implement the product interface, each representing a specific type of object to be created
	- Creator
		- abstract class or interface that defines the factory method
		- responsible for creating product objects, but it delegates the actual creation to subclasses
	- Concrete Creators
		- subclasses of the creator that implements the factory method
		- decides which concrete product to create, often based on input params or configuration
	- Factory Method
		- method defined in the creator class that is responsible for creating product objects
		- typically created as abstract in the creator and implemented in the concrete creators

- *Advantages*
	- separates object creation from client code, enhancing flexibility and maintainability since changes to creation do not affect clients.
	- new product types can easily be extended without altering client code by simply creating new concrete creator subclasses.
	- simplifies unit testing by allowing mock product creation, enabling tests of various implementations without actual object dependencies
	- can be re-used across different application parts, centralizing and streamlining object creation logic
	- hides specific product classes from clients, thereby reducing dependencies and improving maintainability 

- *Disadvantages*
	- many classes and interfaces which can complicate understanding and maintenance
	- [[Learnings - Random topics#**Polymorphism**|polymorphism]] and [[Learnings - Random topics#**Dynamic binding**|dynamic binding]] may slightly affect performance, although this is usually minimal
	- concrete creators are tightly coupled to their products, necessitating changes across both when one is modified
	- client code must be aware of concrete subclasses to make accurate factory calls
	- should be applied after careful consideration to avoid unnecessary complexity; a simple object creation will not need a factory
	- testing factory logic can be more complicated when compared to simpler designs

```bash
    +----------------+
    |   Creator      |
    |----------------|
    | factoryMethod()|
    +-------+--------+
            |
            v
  +-------------------+
  |   ConcreteCreator |
  |-------------------|
  | factoryMethod()   |
  +-------+-----------+
          |
          v
  +----------------+
  |   Product      |<-------+
  |----------------|        |
  +----------------+        |
          ^                 |
          |                 |
  +-------------------+     |
  | ConcreteProductA  |     |
  +-------------------+     |
                            |
  +-------------------+     |
  | ConcreteProductB  |-----+
  +-------------------+
```

*Example*
[Open Factory Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/factory/)

###### **Abstract Factory**
provides an interface for creating families of related or dependent objects without specifying their concrete classes and implementation. The abstract factory pattern is a way of organizing how you create groups of things that are related to each other.

It is almost the same as the [[#**Factory**|Factory]] pattern and is considered another layer of abstraction over the factory pattern. It works around a so called *super factory* which creates other factories. 
At runtime, the abstract factory is coupled with **any** desired concrete factory which can create objects of the desired type.

- *When to use?*
	- when your system requires multiple families of related products and you want to ensure compatibility between them
	- when you need flexibility and extensibility, allowing for new product variants to be added without changing existing client code
	- when you want to encapsulate the creation logic, making it easier to modify or extend the object creation process without affecting the client
	- when you aim to maintain consistency across different product families, ensuring a uniform interface for the products

- *When not to use?*
	- when product families are unlikely to change, otherwise it will add unnecessary complexity
	- when we're dealing with single, independent objects and aren't concerned with families of related products
	- when the overhead of maintaining multiple factories outweighs the benefits
	- if simpler creational design patterns meet your needs without adding further complexity, such as the Factory or Builder pattern

- *Key components of the Abstract Factory*
	- Abstract Factory
		- provides a high-level blueprint that defines rules for creating families of related objects without specifying their concrete classes
		- provides a way, such that concrete factories follow a common interface, providing a consistent way to produce related set of objects
	- Concrete Factory
		- implements the rules specified by the abstract factory; contains the logic for creating specific instances of objects within a family
		- multiple concrete factories can exist, each of them produce a distinct family of related objects
	- Abstract Products
		- represents a family of related objects by defining a set of common methods or properties
		- acts as an abstract or interface type that all concrete products within a family must follow to and provides a unified way for concrete products to be used interchangeably
	- Concrete Products
		- actual instances of objects created by concrete factories
		- they implement the methods declared in the abstract products, ensuring consistency within a family and belong to a specific category or family of related objects
	- Client
		- utilizes the abstract factory to create families of objects without specifying their concrete types and interacts with objects through abstract interfaces provided by abstract products

- *Advantages*
	- separates the creation of objects, so clients don't need to know specific classes
	- clients interact with objects through abstract interfaces, keeping class names hidden from client code 
	- changing the factory allows for different product configurations, as all related products change together
	- the pattern ensures that an application uses objects from only one family at a time for better compatibility

- *Disadvantages*
	- can add unnecessary complexity to simple projects with multiple factories and interfaces
	- adding new product types may require changes to both concrete factories and the abstract factory interface, impacting existing code
	- introducing more factories and product families can quickly increase the number of classes, making code management difficult in smaller projects
	- it may violate the [[Software Design Principles#**Dependency Inversion Principle**|dependency inversion principle]] if client code directly depends on concrete factories rather than abstract interfaces

```bash
               +-----------------------+
               |    AbstractFactory    |
               |-----------------------|
               | createCar()           |
               | createSpecification() |
               +----------+------------+
                          |
          ----------------------------------------
          |                                      |
          v                                      v
+---------------------------+       +-----------------------------+
| ConcreteFactoryEurope     |       | ConcreteFactoryNorthAmerica |
|---------------------------|       |-----------------------------|
| createCar()               |       | createCar()                 |
| createSpecification()     |       | createSpecification()       |
+---------------+-----------+       +---------------+-------------+
                |                                   |
                |                                   |
      -------------------------             -----------------------
      |                       |             |                     |
      v                       v             v                     v
+------------------+        +------------------+         +------------------+
| AbstractProduct  |        | AbstractProduct  |         | AbstractProduct  |
| Car              |        | Specification    |         | Car              |
|------------------|        |------------------|         |------------------|
+------------------+        +------------------+         +------------------+
      |                            |     |                       |
      |                            |     |                       |
+-----------------+ +-----------------+ +-----------------+ +-----------------+
| ConcreteProduct | | ConcreteProduct | | ConcreteProduct | | ConcreteProduct |
| Hatchback       | | EuropeSpec      | | NASpec.         | | Sedan           |
+-----------------+ +-----------------+ +-----------------+ +-----------------+

```

*Example*
[Open Abstract Factory Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/abstract-factory/)

###### **Builder**
is a creational design pattern to construct a complex object step by step. This pattern separates the construction of a complex object from its representation, allowing the same construction process  to create different representations.

- *When to use?*
	- when you need to create complex objects with a large number of optional components or configuration parameters
	- **Complex Object Construction:** when you have an object with many optional components or configurations and you want to provide a clear separation between the construction process and actual representation of the object. 
	- **Step by Step Construction:** when the construction of an objects involves a step-by-step process where different configurations or options need to be set at different stages
	- **Avoiding constructors with multiple parameters:** when the number of parameters in a constructor becomes too large, and using telescoping constructors (constructors with multiple parameters) becomes unwieldy and error-prone
	- **Configurable Object Creation:** when you need to create objects with different configurations or variations, and you want a more flexible and readable way to specify these configurations
	- **Common interface for multiple representations:** when you want to provide a common interface for constructing different representations of an object

- *When not to use?*
	- **Simple Object Construction:** if the object you're constructing only has a few simple parameters or configurations, and the construction process is straight forward, using a builder might be unnecessary
	- **Performance concerns:** in performance-critical applications, the additional overhead created by the builder pattern might be a concern. The extra method calls and object creations involved in the builder process could impact performance, especially if the object construction is frequent
	- **Immutable objects with final fields:** while working with a language that supports immutable objects with final fields (e.g., Java's `final` keyword) and the object structure is relatively simple, you might prefer using constructors with params or static factory methods
	- **Increased Code Complexity:** could increase code complexity. If the object being constructed doesn't benefit from a step-by-step construction process, using a builder might add unnecessary complexity
	- **Tight coupling with the product:** if the builder is tightly coupled with the product it constructs, and changes to the product require corresponding modifications to the builder, it might reduce the flexibility and maintainability of the code

- *Key components*
	- Product
		- is the complex object that the builder pattern is responsible for constructing
		- It may consist of multiple components or parts, and its structure can vary based on the implementation
		- The product is typically a class with attributes representing the different parts that the builder constructs
	- Builder
		- is an interface or abstract class that declares the construction steps for building a complex object
		- It typically includes methods for constructing individual parts of the product
		- By defining an interface, the builder allows for the creation of different concrete builders that can produce variations of the product
	- Concrete Builder
		- implements the builder interface, providing the specific implementations or building each part of the product
		- Each concrete builder is customized to create a specific variation of the product
		- It keeps track of the product being constructed and provides methods for setting or constructing each part
	- Director
		- responsible for managing the construction process of the complex object
		- It collaborates with a builder, but it doesn't know the specific details about how each part of the object is constructed
		- It provides a high-level interface for construction the product and managing the steps needed to create the complex object
	- Client
		- code that initiates the construction of the complex object
		- creates a builder object and passes it to the director to initiate the construction process
		- may retrieve the final product from the builder after construction is complete

```bash
               +----------------------+
               |      Director        |
               |----------------------|
               | construct()          |
               +----------+-----------+
                          |
                          v
               +----------------------+
               | Builder (Interface)  |
               |----------------------|
               | buildPartA()         |
               | buildPartB()         |
               | getResult()          |
               +----------+-----------+
                          |
   --------------------------------------------
   |                                          |
   v                                          v
+----------------------+          +----------------------+
|  ConcreteBuilder1    |          |  ConcreteBuilder2    |
|----------------------|          |----------------------|
| buildPartA()         |          | buildPartA()         |
| buildPartB()         |          | buildPartB()         |
| getResult()          |          | getResult()          |
+-----------+----------+          +-----------+----------+
              |                                 |
              v                                 v
+-----------------------+        +------------------------+
|   Product1            |        |   Product2             |
|-----------------------|        |------------------------|
| PartA, PartB          |        | PartA, PartB           |
+-----------------------+        +------------------------+

```

*Example*
[Open Builder Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/builder/)
###### **Singleton**
ensures a class has only one instance and provides a global access point to it. It's ideal for scenarios requiring centralized control, like managing database connections or configuration settings.

- *Principles*
	- **Single Instance:** singleton ensure that only one instance of the class exists throughout the application
	- **Global Access:** provides a global point of access to that instance
	- **Lazy or Eager Initialization:** Support creating the instance either when needed *(lazy)* or when the class is loaded *(eager)*
	- **Thread Safety:** Implement mechanisms to prevent multiple threads from creating separate instances simultaneously
	- **Private Constructor:** Restrict direct instantiation by making the constructor private, forcing usage of the access point

- *When to use?*
	- when you need to ensure that only one instance of a class exists in your application
	- when straightforward way for clients is needed to access that instance from a specific location in the codebase
	- if you think you might want to extend the class later, the singleton pattern is a good choice. It allows for subclassing, so clients can work with the extended version without changing the original singleton
	- often used for logging, managing connections with hardware or databases, caching data, or handling thread pools, where having just one instance makes sense

- *Initialization Types of Singleton*
	- **Early Initialization:** Class is initialized, whether it will be used or not. Main advantage of this method is it's simplicity. You initiate the class at the time of it loading. Drawback is that it gets initialized always when loading, whether it'll be used or not.
	- **Lazy Initialization:** Class is only initialized when it is required. Saves you from not instantiating it when you don't need it. Generally, lazy initialization is used when we create a singleton class.

- *Key Components*
	- **Static Member:** The singleton employs a static member within the class. This static member ensures that memory is only allocated once, preserving the single instance of the singleton class, e.g. `private static Singleton instance;` 
	- **Private Constructor:** serves as a barricade against external attempts to create instances of the singleton class. This ensures that the class has control over it's own instantiation process.
	- **Static Factory Method:** acts as a gateway, providing a global point of access to the singleton object. When someone requests an instance, this method either creates a new instance (in case there wasn't one), or returns the existing one. 

- *Use cases*
	- In applications where creating and managing database connections is resource heavy, using a singleton ensures that there's just one connection maintained throughout the application
	- when global settings need to be accessed by different parts of the application,  a singleton configuration manager provides a single point of access for these settings
	- helps to centralize control and making it easier to manage the state and actions of user interface components
	- can effectively organize print jobs and streamlines the process in systems where document printing is required

- *Advantages*
	- guarantees that there's only one instance with a unique identifier, which helps prevent naming issues
	- provides adaptability based on the use case in regards to having two initialization methods, lazy and eager
	- can be thread-safe, ensuring that multiple threads cannot create duplicate instances
	- with just keeping one instance, it can help lowering memory usage

- *Disadvantages*
	- difficulty with doing unit tests, as we have a global state. This can influence the test results (but there's mocking?)
	- race conditions can occur in multi-threaded environments when creating and/or initializing a singleton instance
	- if later on you decide that you need multiple instances or want to change/modify how the  instances are created, it can require significant code changes
	- global dependency can make it difficult to replace the singleton with a different pattern or using dependency injection
	- subclassing a singleton can be tricky because the constructor usually is private. This requires careful handling and may not fit standard inheritance practices

```bash
               +---------------------------+
               |        Singleton          |
               |---------------------------|
               | - instance: Singleton     |
               |---------------------------|
               | + getInstance(): Singleton|
               +---------------------------+
                          |
                          v
                +--------------------------+
                |   Client Code            |
                |--------------------------|
                | Singleton.getInstance()  |
                +--------------------------+
```

*Example*
[Open Singleton Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/singleton/)
###### **Prototype**
enables the creation of new objects by copying an existing object. Prototype allows us to hide the complexity of making new instances from the client. The existing object acts as a prototype and contains the state of the object.

The prototype design pattern is useful, when object creation is a time-consuming and costly operation. Objects are being created with the existing object itself by copying the existing ones.

- The newly object may change the same properties only if required. This approach saves costly resources and time, especially when object creation is a heavy process

- One of the best available ways to create an object from existing objects is the `clone()` method. Clone is the simplest approach to implementing a prototype pattern. However, it's your call to decide how to copy existing objects based on your business model

>[!Use Case]
>Suppose a user creates a document with a specific layout, fonts and styling and wishes to create similar documents with slight modifications.

- *When to use?*
	- when creating new objects is more complex or costly than copying existing ones. Cloning can be more efficient if significant resources are needed.
	- helpful for managing various objects with minor differences. Instead of creating multiple classes, you can clone and modify prototypes.
	- Consider the prototype pattern for dynamic configurations where you need to create objects at runtime. You can clone a base configuration and adjust it as necessary.
	- can lower initialization costs, as cloning is often faster than building a new object from scratch, especially if initialization is resource-intensive.

- *When not to use?*
	- when your application predominantly deals with unique object instances, and the overhead of implementing the pattern outweighs its benefits.
	- if object creation is simple and does not involve significant resource consumption, and there are no variations of objects, using the prototype pattern might be unnecessary complexity.
	- if your objects are immutable (unchangeable) and do not need variations, the benefits of cloning may not be significant
	- if your system has a clear and straightforward object creation process that is easy to understand and manage, introducing the prototype pattern may add unnecessary complexity.

- *Key components*
	- **Prototype Interface or Abstract Class**
		- defines the method for cloning objects and sets a standard that all concrete prototypes must follow. Its main purpose is to serve as a blueprint for creating new objects by outlining the cloning contract
		- it includes a clone method that concrete prototypes will implement to create copies of themselves
	- **Concrete Prototype**
		- this class implements the prototype interface or extends the abstract class. It represents a specific type of object that can be cloned
		- the concrete prototype details how the cloning process should work for instances of that class and provides the specific logic for the clone method
	- **Client**
		- is the code or module that requests new object creation by interacting with the prototype
		- initiates the cloning process without needing to know the specifics of the concrete classes involved
	- **Clone Method**
		- this method is declared in the prototype interface or abstract class and outlines how an object should be copied
		- concrete prototypes implement this method to defined their specific cloning behavior, detailing how to duplicate the objects internal state to create a new, independent instance

```bash
+---------------------------+                +----------------------------+
| Prototype                 |<--------------| Client                      |
|---------------------------| Uses clone()  |-----------------------------|
| + clone(): Prototype      |               | Requests clones of objects  |
+---------------------------+               +-----------------------------+
               ▲
               |
+---------------------------+
| ConcretePrototype         |
|---------------------------|
| - data: string            |
| + clone(): Prototype      |
| + getData(): string       |
+---------------------------+
```

*Example*
[Open Prototype Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/prototype/)
##### ~={magenta}**Structural Patterns**=~
are solutions in software design that focus on how classes and objects are organized to form larger, functional structures. These patterns help developers simplify relationships between objects, making code more efficient, flexible and easy to maintain. By using structural patterns, you can better manage complex class hierarchies, reuse existing code and create scalable architectures.

There are two recurring themes in these patterns:
- This pattern is particularly useful for making independently developed class libraries work together
- These patterns describe ways to compose objects to realize new functionality
- The added flexibility of object composition comes from the ability to change the composition at run-time, which is impossible with static class composition
###### **Adapter**
The adapter design pattern serves as a bridge, to make two incompatible interfaces function together. This pattern involves a single class, the adapter, responsible for joining functionalities of independent or incompatible interfaces. The adapter approach is very helpful when attempting to incorporate third-party libraries or legacy code into a new system.

>[!Use case]
>Suppose you have two buddies, one of them speaks French exclusively and the other English exclusively. The language barrier prevents them from communicating with each other. 

- *When to use?*
	- we need to connect systems or components that weren't build to work together. The adapter allows these incompatible interfaces to communicate, making integration smoother.
	- when we have existing code or libraries that we want to use, but they don't match our current system. The adapter helps us incorporate this old code without having to rewrite it.
	- in case a project grows and new components are added frequently - the adapter lets you integrate these new pieces without affecting the existing code, keeping the system flexible and adaptable.
	- by isolating the changes needed for compatibility in one place, the adapter makes it easier to maintain the code. This reduces risk of bugs that might arise from changing multiple parts of the system.

- *When not to use?*
	- if a system is straightforward and all components are compatible, an adapter is not needed.
	- adapters can introduce a slight overhead, which might be a concern in performance-sensitive environments.
	- when there are no issues with interface compatibility, using an adapter will be redundant
	- projects with a short lifespan, the overhead of implementing an adapter might not be worth it.

- *Key components*
	- **Target Interface:** Defines the interface expected by the client. It represents the set of operations that the client code can use. It's the common interface that the client code interacts with.
	- **Adaptee:** The existing class or system with an incompatible interface that needs to be integrated into the new system. It's the class or system that the client code cannot directly use due to interface mismatches.
	- **Adapter:** A class that implements the target interface and internally uses an instance of the adaptee to make it compatible with the target interface. It acts as a bridge, adapting the interface of the adaptee to match the target interface.
	- **Client:** The code that uses the target interface to interact with objects. It remains unaware of the specific implementation details of the adaptee and the adapter. It's the code that benefits from the integration of the adaptee into the system through the adapter.

- *Different Implementations*
	- **Class Adapter (Inheritance-based)**
		- In this approach, the adapter class inherits from both the target interface (the one that the client expects) and the adaptee (the existing class needing adaptation)
		- Programming languages that allow [[Learnings - Random topics#Multiple Inheritance (in C++)|multiple inheritance]], like C++, are more likely to use this technique
		- However, in languages like Java and C#, which do not support multiple inheritance, this approach is less frequently used
	- **Object Adapter (Composition-based)**
		- The object adapter employs composition instead of inheritance. In this implementation, the adapter holds an instance of the adaptee and implements the target interface
		- This approach is more flexible as it allows a single adapter to work with multiple adaptees and does not require the complexities of inheritance
		- The object adapter is widely used in languages like Java and C#
	- **Two-way Adapter**
		- A two-way adapter can function as both a target and an adaptee, depending on which interface is being invoked
		- This type of adapter is particularly useful when two systems need to work together and require mutual adaptation
	- **Interface Adapter (Default Adapter)**
		- When only a few methods from an interface are necessary, an interface adapter can be employed
		- This is especially useful in cases where the interface contains many methods, and the adapter provides default implementations for those that are not needed
		- This approach is often seen in languages like Java, where abstract classes or default method implementations in interfaces simplify the implementation process

- *Advantages*
	- you can reuse existing code without needing to modify it. This promotes code reuse and helps maintain a cleaner architecture
	- by separating the issues of interface adaptation, the adapter pattern frees classes to concentrate on their main duties without having to deal with adaptation code that clogs their logic
	- because you can simply switch out multiple adapters to support different interfaces without altering the underlying system
	- by separating your system from particular implementations, adapters make it simpler to swap out or modify parts without compromising the functionality of other parts

- *Disadvantages*
	- can add a layer of complexity to your system. Having multiple adapters can make the code harder to navigate and understand
	- the additional layer of indirection may introduce slight performance overhead, especially if the adapter needs to perform complex transformations
	- if not managed properly, the use of adapters can lead to maintenance challenges. Keeping track of multiple adapters for various interfaces can become cumbersome
	- there's a risk of overusing adapters for trivial changes, which leads to unnecessary complexity. It's critical to asses whether an adapter is actually needed for the given circumstance
	- only two interfaces can be translated by adapters; if you need to adjust more than one interface, you might need a lot of different adapters, which could make the design even more difficult

```bash
+----------------+        +-------------------+
|                |        |                   |
| Client         |        | Target Interface  |
| (VideoApp)     |------->| MediaPlayer       |  
|                |        | play(fileType)    |
+----------------+        +-------------------+
        |
        | Implements              Adapts
        v
+----------------+        +-------------------+
|                |        |                   |
| Adapter        |------->| Legacy System     | 
| (MediaAdapter) |        | OldVideoPlayer    | <- Adaptee
|                |        | playMp4(), playAVI|
+----------------+        +-------------------+
```

*Example*
[Open Adapter Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/adapter/)

###### **Bridge**
decouples an abstraction from its implementation, allowing them to be developed and changed independently. It achieves this by encapsulating the implementation inside an interface or abstract class, which the abstraction references. The abstraction defines high-level behavior, while the implementation handles the details. This separation makes it possible to change the implementation at runtime without affecting the abstraction or client code, promoting loose coupling and flexibility. Refined abstractions extend the abstraction, while concrete implementers provide specific implementations, ensuring that changes to one do not impact the other.

- *When to use?*
	- the bridge pattern is an application of the advice, "prefer composition over inheritance"
	- it becomes handy when you must subclass different times[^1] in ways that are orthogonal with one another[^2]

- *Key components*
	- **Abstraction:** core of the bridge design pattern and defines the crux. Contains a reference to the implementer
	- **Refined Abstraction:** Extends the abstraction, takes the finer detail one level below. Hides the finer elements from implementers
	- **Implementer:** Defines the interface for implementation classes. This interface does not need to correspond directly to the abstraction interface and can be very different. Abstraction provides an implementation in terms of operations provided by the implementer interface
	- **Concrete Implementation:** implements the above implementer by providing the concrete implementation

- *Advantages*
	- decouples an abstraction from its implementation so that the two can vary independently
	- mainly used for implementing platform independent features
	- adds one more method level redirection to achieve the objective
	- encourages you to separate the high-level interface (abstraction) and the low-level functionality (implementation) into independent class hierarchies
	- you can dynamically change the implementation of an abstraction at runtime

```bash
+------------------------------+        +---------------------+
|   Abstraction                |        | Implementer         |
|  (RemoteControl)             |        | (TVImplementation)  |
|------------------------------|        |---------------------|
| - implementer: IImplementer  |        | - turnOn()          |
| + turnOn()                   |        | + turnOn()          |
+------------------------------+        +---------------------+
        |                                    |
        v                                    v
+---------------------+                 +----------------------+
| RefinedAbstraction  |                 | ConcreteImplementer  |
|  (SmartRemote)      |                 | (SonyTV)             |
|---------------------|                 |----------------------|
| + turnOn()          |                 | + turnOn()           |
+---------------------+                 +----------------------+
        |
        v
+------------------------+
|   Client               |
|------------------------|
|  - remote: Abstraction |
|  + useRemote()         |
+------------------------+
```

*Example*
[Open Bridge Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/bridge/)

[^1]: This refers to needing multiple hierarchies of subclasses, where each hierarchy represents a different dimension or aspect of variation.

[^2]: orthogonal means independent or unrelated. It indicates that these hierarchies vary independently and don't directly influence each other. 

###### **Composite**
lets you compose objects into tree-like structures to represent part-whole hierarchies. It allows clients to treat individual objects and compositions of objects uniformly. In other words, whether dealing with a single object or a group of objects (composite), clients can use them interchangeably.

- *When to use?*
	- when clients need to ignore the difference between compositions of objects and individual objects. Treat primitives and composites as homogeneous, when using objects in the same way

- *When not to use?*
	- makes it harder to restrict the type of components of a composite
	- when you don't want to represent a full or partial hierarchy of objects

- *Key components*
	- **Component:** declares the interface for objects in the composition and for accessing and managing its child components. This is like a blueprint that tells us what both individual items (leaves) and groups of items (composites) should be able to do. It lists the things they all have in common.
	- **Leaf:** defines behavior for primitive objects in the composition. This is the basic building block of the composition, representing individual objects that don't have any child components. Leaf elements implement the operations defined by the component interface.
	- **Composite:** stores child components and implements child-related operations in the component interface. This is a class that has child components, which can be either leaf elements or other composites. A composite class implements the methods declared in the component interface, often by delegating the operations to its child components.
	- **Client:** manipulates the objects in the composition through the component interface. The client uses the component class interface to interact with objects in the composition structure. If the recipient is a leaf then the request is handled directly. If the recipient is a composite, then it usually forwards the request to its child components, possibly performing additional operations before and after forwarding.

- *Why do we need this?*
	- Composite design pattern was created to address specific challenges related to the representation and manipulation of hierarchical structures in a uniform way.
	- **Uniform Interface**
		- provides a uniform interface for both individual objects and compositions
		- this uniformity simplifies client code, making it more intuitive and reducing the need for conditional statements to differentiate between different types of objects
		- other design patterns may not offer the same level of consistency in handling individual and composite objects
	- **Hierarchical Structures**
		- primary focus of the composite pattern is to deal with hierarchical structures where objects can be composed of other objects
		- while other patterns address different types of problems, the composite pattern specifically targets scenarios involving tree-like structures
	- **Flexibility and Scalability**
		- allows for dynamic composition of objects, enabling the creation of complex structures
		- promotes flexibility and scalability, making it easier to add or remove elements from the hierarchy without modifying the client code
	- **Common Operations**
		- reduces code duplication and promotes a consistent approach to handling both leaf and composite objects
	- **Client Simplification**
		- simplifies client code by providing a unified way to interact with individual and composite objects. This simplification is particularly valuable when working with complex structures, such as graphical user interfaces or organizational hierarchies

- *Advantages*
	- less number of objects reduces the memory usage, and it manages to keep us away from errors related to memory like `out of memory error`
	- although creating an object in Java is really fast, we can still reduce the execution time of our program by sharing objects

- *Disadvantages*
	- can make the design overly general
	- makes it harder to restrict the components of a composite
	- sometimes you want a composite to have only a certain component, with composite, you cannot rely on the type system to enforce these constraints for you. You'll have to use run-time checks instead

```bash
                        +---------------------+
                        |    Component        |
                        |---------------------|
                        | + operation()       |
                        +---------------------+
                                 ^
                                 |
        +------------------------+-------------------------+
        |                                                  |
+---------------------+                     +---------------------+
|   Leaf              |                     |   Composite         |
|---------------------|                     |---------------------|
| + operation()       |                     | + operation()       |
|                     |                     | + add(Component)    |
|                     |                     | + remove(Component) |
|                     |                     | + getChild(index)   |
+---------------------+                     +---------------------+
                                                    ^
		                                            |
			                        +---------------+---------------+
                                    |                               |
                          +---------------------+          +------------------+
                          |   Leaf              |          |   Leaf           |
                          |---------------------|          |------------------|
                          | + operation()       |          | + operation()    |                            +---------------------+          +------------------+
```

*Example*
[Open Composite Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/composite/)

###### **Decorator**
allows behavior to be added to individual objects dynamically, without affecting the behavior of other objects from the same class. It involves creating a set of decorator classes that are used to wrap concrete components. This pattern is useful when you need to add functionality to objects in a flexible and reusable way.

This pattern is vital for enhancing functionality while adhering to the [[Software Design Principles#Open-closed Principle|open-closed principle]]. 

- *When to use?*
	- **Extending Functionality:** when you have a base component with basic functionality, but you need to add additional features or behaviors to it dynamically without altering its structure. Decorators allow you to add new responsibilities to objects at runtime
	- **Multiple Combinations of Features:** when you want to provide multiple combinations of features or options to an object. Decorators can be stacked and combines in different ways to create customized variations of objects, providing flexibility to users
	- **Legacy Code Integration:** when working with legacy code or third-party libraries where modifying the existing codebase is not feasible or desirable, decorators can be used to extend the functionality of existing objects without altering their implementation
	- **GUI Components:** in graphical user interface (GUI) development, decorators can be used to add additional visual effects, such as borders, shadows, or animations, to GUI components like buttons, panels, or windows
	- **I/O Streams:** decorators are commonly used in i/o stream classes in languages like Java. They allow you to wrap streams with additional functionality such as buffering, compression, encryption, or logging without modifying the original stream classes

- *Characteristics*
	- promotes flexibility and extensibility in software systems by allowing developers to compose objects with different combinations of functionalities at runtime
	- follows the open/closed principle, as new decorators can be added without modifying existing code, making it a powerful tool for building a modular and customizable software components
	- commonly used in scenarios where a variety of optional features or behaviors need to be added to objects in a flexible and reusable manner, such as in text formatting, graphical user interfaces, or customization of products like coffee or ice cream

- *Key components*
	- **Component Interface:** this is an abstract class or interface that defines the common interface for both  the concrete components and decorators. It specifies the operations that can be performed on the objects
	- **Concrete Component:** These are the basic objects or classes that implement the component interface. They are the objects to which we want to add new behavior or responsibilities
	- **Decorator:** This is an abstract class that also implements the component interface and has a reference to a component object. Decorators are responsible for adding new behaviors to the wrapped component object
	- **Concrete Decorator:** These are the concrete classes that extend the decorator class. They add specific behaviors or responsibilities to the component. Each concrete decorator can add one or more behaviors to the component

- *Advantages*
	- **Open-closed Principle:** See [[Software Design Principles#Open-closed Principle|here]] for definition
	- **Flexibility:** allows you to add or remove responsibilities from objects at runtime. This makes it easy to create complex object structures with varying combinations of behaviors
	- **Reusable Code:** Decorators are reusable components. You can create a library of decorator classes and apply them to different objects and classes as needed, reducing code duplication
	- **Composition over Inheritance:** Unlike traditional inheritance, which can lead to a deep and inflexible class hierarchy, the decorator pattern uses composition. You can compose objects with different decorators to achieve the desired functionality, avoiding the drawbacks of inheritance, such as tight coupling and rigid hierarchies
	- **Dynamic Behavior Modification:** Decorators can be applied or removed at runtime, providing dynamic behavior modification for objects. This is particularly useful when you need to adapt an objects behavior based on changing requirements or user preferences
	- **Clear Code Structure:** promotes a clear and structured design, making it easier for developers to understand how different features and responsibilities are added to objects

- *Disadvantages*
	- **Complexity:** As you add more decorators to an object, the code can become more complex and harder to understand. The nesting of decorators can make the codebase difficult to navigate and debug, especially when there are many decorators involved
	- **Increased Number of Classes:** you often end up with a large number of small, specialized decorator classes. This can lead to a proliferation of classes in your codebase, which may increase maintenance overhead
	- **Order of Decoration:** the order in which decorators are applied can affect the final behavior of the object. If decorators are not applied in the correct order, it can lead to unexpected results. Managing the order of decorators can be challenging, especially in complex scenarios
	- **Potential for Overuse:** because it's easy to add decorators to objects, there is a risk of overusing the decorator pattern, making the codebase unnecessarily complex. It's important to use decorators judiciously and only when they genuinely add value to the design
	- **Limited Support in Some Languages:** Some programming languages may not provide convenient support for implementing decorators. Implementing the pattern can be more verbose and less intuitive in such languages

```bash
                 +-------------------+
                 |    Component      |
                 |-------------------|
                 | + operation()     |
                 +-------------------+
                         ^
                         |
         +---------------+---------------+
         |                               |
 +-------------------+         +-------------------+
 | ConcreteComponent |         |    Decorator      |
 |-------------------|         |-------------------|
 | + operation()     |         | - component: Comp |
 +-------------------+         | + operation()     |
                                +-------------------+
                                       ^
                                       |
                  +--------------------+--------------------+
                  |                                         |
       +--------------------+                +--------------------+
       | ConcreteDecoratorA |                | ConcreteDecoratorB |
       |--------------------|                |--------------------|
       | + operation()      |                | + operation()      |
       | + addedBehavior()  |                | + addedBehavior()  |
       +--------------------+                +--------------------+
```

*Example*
[Open Decorator Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/decorator/)

###### **Facade**
provides a unified interface to a set of interfaces in a subsystem. Facade defines a high-level interface that makes the subsystem easier to use. So in other words, it's structuring a system into subsystems to help reduce the complexity. A common design goal is to minimize communication and dependencies between subsystems.

>[!Visualization]
>Visualize a structure. The house is the facade, it is visible to the outside world, but beneath it is a working system of pipes, cables, and other components that allow the building to run. It provides an easy-to-use interface so that users may interact with the system.

- *When to use?*
	- a facade provides a simple default view of the subsystem that is good enough for most clients
	- there are many dependencies between clients and the implementation classes of an abstraction
	- a facade to decouple the subsystem from clients and other subsystems, thereby promoting subsystem independence and portability
	- facade defines an entry point to each subsystem level. If subsystems are dependent, then you can simplify the dependencies between them by making them communicate with each other through their facades.

- *Key components*
	- **Facade**
		- knows which subsystem classes are responsible for a request
		- delegates client requests to appropriate subsystem objects
	- **Subsystem Classes**
		- implements subsystem functionality
		- handles work assigned by the facade object
		- it has no knowledge of the facade, it does not keep references to it
	- **Interface**
		- refers to the set of simplified methods that the facade exposes to the client
		- hides the complexities of the subsystem, ensuring that clients interact only with high-level operations, without dealing with the underlying details of the system

- *Use cases*
	- **Simplifying Complex External Systems**
		- encapsulates database connection, query executing and result processing - thereby offering a clean interface to the application
		- simplifies the usage of external APIs by hiding the complexities of authentication, request formatting and response parsing
	- **Layering Subsystems**
		- facades define clear boundaries between subsystems, reducing dependencies and promoting modularity
		- facades offer simplified interfaces to lower-level subsystems, making them easier to understand and use
	- **Providing a Unified Interface to Diverse Systems**
		- A facade can combine multiple APIs into a single interface, streamlining interactions and reducing code duplication
		- A facade can create a modern interface for older, less accessible systems, facilitating their integration with newer components
	- **Protecting Clients from Unstable Systems**
		- facades minimize the impact of changes to underlying systems by maintaining a stable interface
		- facades can protect clients from changes or issues in external libraries or services

- *Advantages*
	- **Simplified Interface**
		- simplifies use and understanding of a complex system by offering a clear and concise interface
		- hides internal details of the system, reducing cognitive load for clients
	- **Reduced Coupling**
		- clients become less reliant on the internal workings of the underlying system when they are disconnected from it
		- encourages the reusability and modularity of code components
		- allows for the independent testing and development of various system components
	- **Encapsulation**
		- encapsulates complex interactions within a subsystem, protecting clients from changes in its implementation
		- allows for changes to the subsystem without affecting clients, as long as the facade interface remains stable
	- **Improved Maintainability**
		- easier to change or extend the underlying system without affecting clients, as long as the facade interface remains consistent
		- allows for refactoring and optimization of the subsystem without impacting client code

- *Disadvantages*
	- **Increased Complexity**
		- adding the facade layer in the system increases the level of abstraction
		- because of this, the code may be more difficult to understand and debug
	- **Reduced Flexibility**
		- facade acts as a single point of access to the underlying system
		- this can limit the flexibility for clients who need to bypass the facade or access specific functionalities hidden within the subsystem
	- **Overengineering**
		- applying the facade pattern to simple systems might be unnecessary, adding complexity where it's not needed
		- consider the cost-benefit trade-off before implementing a facade for every situation
	- **Potential Performance Overhead**
		- adding an extra layer of indirection through the facade can introduce a slight performance overhead, especially for frequently used operations
		- this may not be significant for most applications, but it's worth considering in performance-critical scenarios

```bash
===========================
    Facade Design Pattern
===========================
[Client] ---------------> [Facade]
                            |
                            +-----------------> [Subsystem A]
                            |                     - Handles specific logic A
                            +-----------------> [Subsystem B]
                            |                     - Handles specific logic B
                            +-----------------> [Subsystem C]
                                                  - Handles specific logic C
```

*Example*
[Open Facade Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/facade/)

###### **Flyweight**
optimizes memory usage by sharing a common state among multiple objects. It aims to reduce the number of objects created and to decrease memory footprint, which is particularly useful when dealing with a large number of similar objects.

Here's how it works:
- **Shared vs Unique Data:** Objects are split into shared (intrinsic) data and unique (extrinsic) data. The shared data is stored in a central place and reused, while the unique data is kept separately
- **Example:** Imagine a text editor displaying thousands of characters. Using flyweight, the program can store each unique character style (like font or color) only once and reuse it, rather then duplicating it for every character

- *When to use?*
	- **When you need to create a large number of similar objects:** For instance, suppose you have to make hundreds of graphical objects (such as buttons and icons) with similar attributes (such as color and picture) but different positions and other variable features
	- **When memory consumption is a concern:** By sharing common data, the flyweight pattern can assist reduce the memory footprint of memory-sensitive applications that would otherwise require a large amount of RAM to create several instances of comparable objects
	- **When performance optimization is needed:** The pattern can enhance efficiency by lowering the overhead related to trash collection, object generation, and destruction by minimizing the number of objects

- *When not to use?*
	- **When objects have unique intrinsic states:** If each object instance requires a unique set of intrinsic state that cannot be shared with other objects, applying the flyweight pattern may not provide significant benefits
	- **When the overhead of implementing the pattern outweighs the benefits:** If the number of objects is relatively small or the shared state is minimal, the complexity introduced by the flyweight pattern may not justify its implementation
	- **When mutable objects are involved:** The flyweight pattern is best suited for immutable objects or objects whose intrinsic state does not change once initialized. If objects frequently change their intrinsic state, managing shared state can become complex and error-prone
	- **When the application does not have performance or memory constraints:** If memory usage and performance are not critical concerns for your application, implementing the flyweight pattern may add unnecessary complexity without significant benefits

- *Key components*
	- **Flyweight Interface/Class**
		- defines the interface through which flyweight objects can receive and act on extrinsic state
	- **Concrete Flyweight Classes**
		- implements the flyweight interface and represents objects that can be shared
		- stores intrinsic state (state that can be shared) and provides methods to manipulate intrinsic state if needed
	- **Flyweight Factory**
		- manages a pool of flyweight objects
		- provides methods for clients to retrieve or create flyweight objects
		- ensures flyweight objects are shared appropriately to maximize reusability
	- **Client**
		- uses flyweight objects to perform operations
		- maintains or passes extrinsic state to flyweight objects when needed
		- does not manage the lifecycle of flyweight objects directly but interacts with them via the factory

```bash
===============================
      Flyweight Design Pattern
===============================

[Client A] ----+
               |
[Client B] ----|--> [Flyweight Factory] ---> [Flyweight 1]
               |                                - Shared State: "Tree Type"
[Client C] ----|                             ---> [Flyweight 2]
                                                - Shared State: "Building Type"

+-----------+                +-----------+
| Extrinsic |                | Intrinsic |
| Data:     |                | Data:     |
| Location  |                | Shared    |
| Size      |                | Features  |
+-----------+                +-----------+
```

*Example*
[Open Flyweight Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/flyweight/)

###### **Proxy**
is a way to use a placeholder object to control access to another object. Instead of interacting directly with the main object, the client talks to the proxy, which then manages the interaction. This is useful for things like controlling access, delaying object creation until its needed (lazy initialization), logging, or adding security checks.

>[!Visualization]
>A real-world example can be a cheque or credit card as a proxy for what is in our bank account. It can be used in a place of cash and provides a means of accessing that cash when required.

The client and actual object are connected by a proxy object. The client communicates with the proxy, which manages access to the real object, rather than the real object directly. Before sending the request to the real object, the proxy can take care of additional tasks like caching, security, logging, and lazy loading.

- *When to use?*
	- when you want to postpone the creation of a resource-intensive object until it's actually needed
	- when you need to control and manage access to an object, ensuring that certain conditions or permissions are met before allowing clients to interact with the real object
	- use a proxy to optimize the utilization of resources, such as caching results or avoiding redundant computations or data retrieval
	- when dealing with distributed systems and you want to interact with objects located in different addresses or systems
	- the proxy can handle the communication details, making remote object interaction more seamless

- *When not to use?*
	- **Overhead for simple operations:** avoid using a proxy for simple objects or operations that don't involve resource-intensive tasks. Introducing a proxy might add unnecessary complexity in such cases
	- **Unnecessary abstraction:** if your application doesn't require lazy loading, access control, or additional functionalities provided by proxies, introducing proxies may lead to unnecessary abstraction and code complexity
	- **Performance impact:** if the introduction of a proxy negatively impacts performance rather than improving it, especially in cases where objects are lightweight and creation is not significant overhead
	- **When access control isn't needed:** if there are no access control requirements and the client code can directly interact with the real object without any restrictions
	- **When eager loading is acceptable:** if eager loading of objects is acceptable and doesn't affect the performance of the system, introducing a proxy for lazy loading will be unnecessary

- *Why do we need it?*
	- **Lazy Loading**
		- one of the primary use cases for proxies is lazy loading. In situations where creating or initializing an object is resource-intensive, the proxy delays the creation of the real object until it is actually needed
		- this can lead to improved performance by avoiding unnecessary resource allocation
	- **Access Control**
		- proxies can enforce access control policies
		- by acting as a gatekeeper to the real object, proxies can restrict access based on certain conditions, providing a security permission checks
	- **Protection Proxy**
		- protection proxies control access to a real object by adding an additional layer of security checks
		- they can ensure that the client code has the necessary permissions before allowing access to the real object
	- **Caching**
		- proxies can implement caching mechanisms to store results or resources
		- this is particularly useful when repeated operations on a real object can be optimized by caching previous results, avoiding redundant computations or data fetching
	- **Logging and Monitoring**
		- proxies provide a convenient point to add logging or monitoring functionalities
		- by intercepting method calls to the real object, proxies can log information, track usage, or measure performance without modifying the real object

- *Key components*
	- **Subject**
		- is an interface or an abstract class that defines the common interface shared by the `RealSubject` and `Proxy` classes. It declares the methods that the `Proxy` uses to control access to the `RealSubject`
		- it usually includes the methods that the client code can invoke on the `RealSubject` and `Proxy`
	- **RealSubject**
		- is the actual object that the `Proxy` represents. It contains the real implementation of the business logic or the resource that the client code wants to access
	- **Proxy**
		- acts as a surrogate or placeholder for the `RealSubject`. It controls access to the real object and may provide additional functionality such as lazy loading, access control, or logging
		- implements the same interface as `RealSubject` (Subject)
		- maintains a reference to `RealSubject`

- *Chaining of Proxies*
	- chaining proxies means connecting them in a sequence, where each proxy adds its behavior or checks before passing the request to the next proxy or the real object. It's like forming a chain of guards, each responsible for a specific task

```bash
===============================
      Chaining of Proxies
===============================

[Client] -------------> [Proxy 1]
                           |
                           +-----------------> [Proxy 2]
                                |
                                +-----------------> [Proxy 3]
                                     |
                                     +-----------------> [Real Subject]
```

```bash
==============================
     Proxy Design Pattern
==============================

[Client] -------------> [Proxy]
                           |
                           +-----------------> [Real Subject]
                           |                     - Actual logic
                           +-----------------> (Optional) Access control, caching, or logging
```

*Example*
[Open Proxy Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/proxy/)

##### ~={yellow}**Behavioral Patterns**=~
focus on the interactions and communication between objects. They help define how objects collaborate and distribute responsibility among them,  making it easier to manage complex control flow and communication in a system.
###### **Observer**
defines a one-to-many dependency between objects. When one object (the subject) changes state, all its dependents (observers) are notified and updated automatically.

>[!Note]
>**Subjects** are the objects that maintain and notify observers about changes in their state, while **Observers** are the entities that react to those changes.

Some key points about the observer design pattern:
- defines how a group of objects interact based on changes in the state of a subject
- observers react to changes in the subjects state
- the subject doesn't need to know the specific classes of its observers, allowing for flexibility
- observers can be easily added or removed without affecting the subject

>[!Visualization]
>Imagine a scenario where a weather station is observed by various smart devices. The weather station maintains a list of registered devices. The weather station will update all the devices whenever there is change in the weather.


- *When to use?*
	- when you need one object to notify multiple others about changes
	- when you want to keep objects loosely connected, so they don't rely on each others details
	- when you want observers to automatically respond to changes in the subjects state
	- when you want to easily add or remove observers without changing the main subject
	- when you're dealing with event systems that require various components to react without direct connections

- *When not to use?*
	- when the relationships between objects are simple and don't require notifications
	- when performance is a concern, as many observers can lead to overhead during updates
	- when the subject and observers are tightly coupled, as it defeats the purpose of decoupling
	- when the number of observers is fixed and won't change over time
	- when the order of notifications is crucial, as observers may be notified in an unpredictable sequence

- *Key components*
	- **Subject**
		- the subject maintains a list of observers (subscribers or listeners)
		- it provides a method to register and unregister observers dynamically and defines a method to notify observers of changes in its state
	- **Observer**
		- defines an interface with an update method that concrete observers must implement and ensures a common or consistent way for concrete observers to receive updates from the subject
	- **ConcreteSubject**
		- are specific implementations of the subject. They hold the actual state or data that observers want to track. When this state changes, concrete subjects notify their observers
		- for instance, if a weather station is the subject, specific weather stations in different locations would be concrete subjects
	- **ConcreteObserver**
		- implements the observer interface. They register with a concrete subject and react when notified of a state change
		- when the subjects state changes, the concrete observers `update()` method is invoked, allowing it to take appropriate actions
		- For example, a weather app on your smartphone is a concrete observer that reacts to changes from a weather station

```bash
===============================
      Observer Design Pattern
===============================

          [Subject]
             |
    +--------+---------+
    |                  |
[Observer 1]     [Observer 2]
    |                  |
[Observer 3]       [Observer 4]
             \         /
              \_______/
               Updates

===============================
```

*Example*
[Open Observer Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/observer/)
###### **Iterator**
provides a way to access the elements of an aggregate object (such as a list or collection) sequentially without exposing its underlying representation. It defines a separate object, called an iterator, which encapsulates the details of traversing the elements of the aggregate, allowing the aggregate to change its internal structure without affecting the way its elements are accessed.

- Simple and frequently used design pattern. There are a lot of data structures/collections available in every language
- Each collection must provide an iterator that lets it iterate through its objects. However, while doing so it should make sure that it does not expose its implementation.

>[!Visualization]
>Let's say we have a collection of employees in a company, and we want to iterate over the employees to calculate their total salary. However, the employees are stored in different types of collections (arrays, lists, etc.), and we want to iterate over them without exposing the underlying collection types.

- *When to use?*
	- **Need for sequential access:** Use the iterator pattern when you need to access elements of a collection sequentially without exposing its underlying representation. This pattern provides a uniform way to iterate over different types of collections
	- **Decoupling iteration logic:** Use the iterator pattern when you want to decouple the iteration logic from the collection. This allows the collection to change its internal structure without affecting the way its elements are accessed
	- **Support for multiple iterators:** use the iterator pattern when you need to support multiple iterators over the same collection. Each iterator maintains its own iteration state, allowing multiple iterations to occur concurrently
	- **Simplifying client code:** Use the iterator pattern to simplify client code that iterates over a collection. Clients only need to interact with the iterator interface, abstracting away the complexity of the collections internal structure

- *When not to use?*
	- **When the collection is not accessed sequentially:** If the collection is not accessed sequentially, using the iterator pattern may add unnecessary complexity. Consider other patterns or direct access methods based on the specific access patterns required
	- **When the collection structure is fixed:** If the structure of the collection is fixed and unlikely to change, using the iterator pattern may be overkill. Direct access methods may be more appropriate and simpler to implement
	- **When performance is critical:** In performance-critical applications, the overhead of using iterators may be significant, especially if the collection is large. In such cases, consider direct access methods for better performance
	- **When the language provides better alternatives:** Some languages provide built-in constructs or libraries that offer more efficient ways to iterate over collections. In such cases, using these alternatives may be more appropriate than implementing the iterator pattern

- *Key components*
	- **Iterator Interface/Abstract Class:** Defines the interface for accessing and traversing elements in the collection. It typically includes methods like `hasNext()`, `next()`, and optionally `remove()`
	- **Concrete Iterator:** Implements the iterator interface and maintains the current in the traversal of the aggregate. It provides the actual implementation for the traversal operations defined in the iterator interface
	- **Aggregator Interface/Abstract Class:** Defines the interface for creating an iterator object. It typically includes a method like `createIterator()` that returns an iterator object for the collection
	- **Concrete Aggregate:** Implements the aggregate interface and represents the collection of objects. It provides the implementation for creating an iterator object that can traverse its elements

```bash
==============================================
			Iterator Design Pattern
==============================================

	      [Client]
	          |
	          v
	      [Iterator] <--------> [Aggregate]
	          |                      |
	          v                      v
	[Current Item]    [Collection of Items]
	      |                       |
	      +-----------------------+
	             Access Items

==============================================
```

*Example*
[Open Iterator Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/iterator/)
###### **Strategy**
defines a family of algorithms, encapsulates each one, and makes them interchangeable, allowing clients to switch algorithms dynamically without altering the code structure.

>[!Visualization]
>Imagine you're planning a trip to a new city, and you have several options for getting there: by car, by train, or by plane. Each mode of transportation offers its own set of advantages and disadvantages, depending on factors such as cost, travel time, and convenience.

- *When to use?*
	- **Multiple Algorithms:** When you have multiple algorithms that can be used interchangeably based on different contexts, such as sorting algorithms, searching algorithms, compression algorithms, etc.
	- **Encapsulating Algorithms:** When you want to encapsulate the implementation details of algorithms separately from the context that uses them, allowing for easier maintenance, testing, and modification of algorithms without affecting the client code
	- **Runtime Selection:** When you need to dynamically select and switch between different algorithms at runtime based on user preferences, configuration settings, or system states
	- **Reducing Conditional Statements:** When you have a class with multiple conditional statements that choose between different behaviors, using the strategy pattern helps in eliminating the need for conditional statements and making the code more modular and maintainable
	- **Testing and Extensibility:** When you want to facilitate easier unit testing by enabling the substitution of algorithms with mock objects or stubs. Additionally, the strategy pattern makes it easier to extend the system with new algorithms without modifying existing code

- *When not to use?*
	- **Single Algorithm:** If there's only one fixed algorithm that will be used throughout the lifetime of the application, and there's no need for dynamic selection or switching between algorithms, using the strategy pattern might be unnecessary
	- **Overhead:** If the overhead of implementing multiple strategies outweighs the benefits, especially in simple scenarios where direct implementation without the strategy pattern is more straightforward and clear
	- **Inflexible Context:** If the context class tightly depends on a single algorithm and there's no need for flexibility or interchangeability, using the strategy pattern may introduce unnecessary abstraction and complexity

- *Key Components*
	- **Context**
		- A class or object known as the context assigns the task to a strategy object and contains a reference to it
			- It serves as an intermediary between the client and the strategy, offering an integrated approach for task execution without exposing every detail of the process
			- The context maintains a reference to a strategy object and calls its methods to perform the task, allowing for interchangeable strategies to be used
	- **Strategy Interface**
		- An abstract class or interface known as the strategy interface specifies a set of methods that all concrete strategies must implement
			- As a kind of agreement, it guarantees that all strategies follow the same set of rules and are interchangeable by the context
			- Promotes flexibility and modularity in the design by establishing a common interface that enables decoupling between the context and the specific strategies
	- **Concrete Strategies**
		- are the various implementations of the strategy interface. Each concrete strategy provides a specific algorithm or behavior for performing the task defined by the strategy interface
			- They encapsulate the details of their respective algorithms and provide a method for executing the task
			- They are interchangeable and can be selected and configured by the client based on the requirements of the task
	- **Client**
		- is responsible for selecting and configuring the appropriate strategy and providing it to the context
			- It knows the requirements of the task and decided which strategy to use based on those requirements
			- The client creates an instance of the desired concrete strategy and passes it to the context, enabling the context to use the selected strategy to perform the task

- *Communication between Components*
	- communication between the components occur in a structured and decoupled manner
		- **Client to Context**
			- client, which knows the requirements of the task, interacts with the context to initiate the task execution
			- client selects an appropriate strategy based on the task requirements and provides it to the context
			- client may configure the selected strategy before passing it to the context if necessary
		- **Context to Strategy**
			- context holds a reference to the selected strategy and delegates the task to it
			- context invokes a method on the strategy object, triggering execution of the specific algorithm or behavior encapsulated within the strategy
		- **Strategy to Context**
			- once the strategy completes its execution, it may return a result or perform any necessary actions
			- the strategy communicates the result or any relevant information back to the context, which may further process or utilize the result as needed
		- **Strategy Interface as Contract**
			- strategy interface serves as a contract that defines a set of methods that all concrete strategies must implement
			- context communicates with strategies through the common interface, promoting interchangeability and decoupling
		- **Decoupled Communication**
			- since the components' communication is decoupled, the context is not required to be aware of the exact details of how each strategy carries out the task
			- as long as they follow the same interface, strategies can be switched or replaced without affecting the client or other strategies

- *Advantages*
	- A family of algorithms can be defined as a class hierarchy and can be used interchangeably to alter application behavior without changing its architecture
	- By encapsulating the algorithm separately, new algorithms complying with the same interface can be easily introduced
	- application can switch strategies at run-time
	- strategy enables the clients to choose the required algorithm, without using a "switch" statement or a series of "if-else" statements
	- data structures used for implementing the algorithm are completely encapsulated in strategy classes. Therefore, the implementation of an algorithm can be changed without affecting the context class

- *Disadvantages*
	- application must be aware of all strategies to select the right one for the right situation
	- context and the strategy classes normally communicate through the interface specified by the abstract strategy base class. Strategy base class must expose interface for all the required behaviors, which some concrete strategy classes might not implement
	- in most cases, the application configures the context with the required strategy object. Therefore, the application needs to create and maintain two objects in place of one

```bash
==================================================
      Strategy Design Pattern
==================================================

      [Context]
          |
          v
  +----------------+
  |   Strategy     |<--------------------+
  | (Interface)    |                     |
  +----------------+                     |
          |                              |
          v                              v
  [ConcreteStrategy1]         [ConcreteStrategy2]
          |                              |
          +------------------------------+
                      |
                Executes Algorithm

==================================================
```

*Example*
[Open Strategy Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/strategy/)

###### **State**
allows an object to alter its behavior when its internal state changes. It achieves this by encapsulating the objects behavior within different state objects, and the object itself dynamically switches between these state objects depending on its current state.

>[!Visualization]
>This pattern focuses on managing state transitions and coordinating state-specific behaviors.
>
>Imagine a vending machine that sells various products. The vending machine needs to manage different states such as ready to serve, waiting for product selection, processing payment, and handling out-of-stock situations. Design a system that models the behavior of this vending machine efficiently.

- *When to use?*
	- **Multiple states with distinct behaviors:** If your object exists in several states (e.g., on/off, open/closed), and each state dictates unique behaviors, the state pattern can encapsulate this logic effectively
	- **Complex conditional logic:** When conditional statements become extensive and complex within your object, the state pattern helps organize and separate state-specific behavior into individual classes, enhancing readability and maintainability
	- **Frequent state changes:** If your object transitions between states frequently, the state pattern provides a clear mechanism for managing these transitions and their associated actions
	- **Adding new states easily:** If you anticipate adding new states in the future, the state pattern facilitates this by allowing you to create new state classes without affecting existing ones

- *When not to use?*
	- **Few states with simple behavior:** If your object has only a few simple states with minimal behavioral differences, the overhead of the state pattern outweighs its benefits. In such cases, simpler conditional logic within the object itself might suffice
	- **Performance-critical scenarios:** The pattern can introduce additional object creation and method calls, potentially impacting performance. If performance is paramount, a different approach might be more suitable
	- **Over-engineering simple problems:** Don't apply the pattern just for the sake of using a design pattern. If your logic is clear and maintainable without it, stick with the simpler solution

- *Key Components*
	- **Context:** is the class that contains the object whose behavior changes based on its internal state. It maintains a reference to the current state object that represents the current state of the context. The context provides an interface for clients to interact with and typically delegates state-specific behavior to the current state object
	- **State Interface or Base Class:** defines a common interface for all concrete state classes. This interface typically declares methods that represent the state-specific behavior that the context can exhibit. It allows the context to interact with state objects without knowing their concrete types
	- **Concrete States:** Concrete state classes implement the state interface or extend the base class. Each concrete state encapsulates the behavior associated with a specific state of the context. These classes define how the context behaves when it is in their respective states

```bash
==========================================
       State Design Pattern
==========================================

         [Context]
             |
             v
      [State Interface]
             |
   +---------+----------+
   |                    |
[ConcreteStateA]   [ConcreteStateB]
             |
      +------+------+
      |             |
  Behavior A   Transition to B
                      |
               +------+------+
               |             |
           Behavior B   Transition to A

==========================================
```

*Example*
[Open State Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/state/)

###### **Visitor**
makes it possible to add new operations to preexisting classes without changing them. It improves the modularity and maintainability of code, which makes it perfect for operations on a variety of object structures. 

- *Key Components*
	- **Visitor Interface:** This interface declares a visit method for each type of element in the object structure. Each method is designed to handle a specific element type
	- **Concrete Visitor:** This class implements the visitor interface and provides the specific behavior for each visit method. It contains the logic for the operations that need to be performed on the elements
	- **Element Interface:** This interface defines an `accept` method that takes a visitor as an argument. This method allows the visitor to visit the concrete elements
	- **Concrete Elements:** These classes implement the element interface and represent the various types of objects in the structure. Each concrete element defines how it accepts a visitor by calling the corresponding method on the visitor
	- **Object Structure:** This is the collection of elements (the concrete elements) that the visitor will operate on. It often includes methods to add, remove, and retrieve elements

- *Advantages*
	- **Separation of concerns:** This pattern keeps operations separate from the object themselves, making it easier to manage and understand the code
	- **Easy to add new features:** You can introduce new operations simply by creating new visitor classes without changing existing objects. This makes the system flexible
	- **Centralized logic:** All the operations are in one place (the visitor), which helps you see how different tasks interact with your objects
	- **Easier maintenance:** If you need to update or fix something, you can do it in the visitor class without touching the object classes, making maintenance simpler
	- **Type safety:** Each visitor method is specific to an object type, which helps catch errors early and ensures the right operations are applied

- *Disadvantages*
	- **Added complexity:** It can make your code more complicated, especially if you have many types of objects or operations to manage
	- **Challenging to add new objects:** While adding new operations is easy, introducing new types of objects requires changes to all visitor classes, which can be a hassle
	- **Tight coupling:** Visitors need to know about all the specific object types, which can create a dependency and make your design less flexible
	- **More classes to manage:** This pattern can lead to a lot of extra classes and interfaces, which can clutter your codebase and make it harder to navigate
	- **Not ideal for frequent changes:** if your object types change often, the visitor pattern can become a burden, as you'd need to update multiple visitor classes each time

```bash
=====================================
      Visitor Design Pattern
=====================================

         [Client]
             |
             v
      [Object Structure]
             |
   +---------+---------+
   |                   |
[ElementA]         [ElementB]
   |                   |
   +---------+---------+
             |
          [Visitor]
             |
   +---------+---------+
   |                   |
[ConcreteVisitorA] [ConcreteVisitorB]

=====================================
```

*Example*
[Open Visitor Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/visitor/)

###### **Memento**
is used to capture and restore internal state of an object without exposing its implementation details. It allows you to save and restore the state of an object to a previous state, providing the ability to undo or roll back changes made to the object.

>[!Visualization]
>Imagine you're building a text editor application, and you want to implement an undo feature that allows users to revert changes made to a document. The challenge is to store the state of the document at various points in time and restore it when needed without exposing the internal implementation of the document.


- *When to use?*
	- **Undo functionality:** When you need to implement an undo feature in your application that allows users to revert changes made to an objects state
	- **Snapshotting:** When you need to save the state of an object at various points in time to support features like versioning or checkpoints
	- **Transaction rollback:** When you need to rollback changes to an objects state in case of errors or exceptions, such as in database transactions
	- **Caching:** When you want to cache the state of an object to improve performance or reduce redundant computations

- *When not to use?*
	- **Large object state:** If the objects state is large or complex, storing and managing multiple snapshots of its state can consume a significant amount of memory and processing resources
	- **Frequent state changes:** If the objects state changes frequently and unpredictably, sorting and managing snapshots of its state may become impractical or inefficient
	- **Immutable objects:** If the objects state is immutable or easily reconstructible there may be little benefit in using the memento pattern to capture and restore its state
	- **Overhead:** Introducing the memento pattern can add complexity to the codebase, especially if the application does not require features like undo functionality or state rollback

- *Key Components*
	- **Originator:** This component is responsible for creating and managing the state of an object. It has methods to set and get the objects state, and it can create memento objects to store its state. It only provides a way to retrieve the state, without allowing direct modification. This ensures the state remains
	- **Caretaker:** The caretaker is responsible for keeping track of memento objects. It doesn't know the details of the state stored in the memento, but can request mementos from the originator to save or restore the objects state
	- **Client:** Typically represented as the part of the application or system that interacts with the originator and caretaker to achieve specific functionality. The client initiates requests to save or restore the state of the originator through the caretaker 

- *Advantages:*
	- **Encapsulation:** The pattern allows you to encapsulate the state of the document within memento objects, preventing direct access manipulation of the documents state
	- **Undo functionality:** By storing snapshots of the documents state at different points in time, the memento pattern enables the implementation of an undo features, allowing users to revert changes and restore previous document states
	- **Separation of concerns:** The memento pattern separates the responsibility of state management from the document itself, promoting cleaner and more maintainable code

```bash
=======================================
      Memento Design Pattern
=======================================

        [Originator]
             |
   +---------+---------+
   |                   |
[Create Memento]   [Restore Memento]
             |
             v
         [Memento]
             |
             v
       [Caretaker]
             |
   +---------+---------+
   |                   |
[Store Memento]   [Retrieve Memento]

=======================================
```

*Example*
[Open Memento Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/memento/)

###### **Mediator**
simplifies communication between multiple objects in a system by centralizing their interactions through a mediator. Instead of objects interacting directly, they communicate via a mediator, reducing dependencies and making the system easier to manage.

>[!Purpose of pattern]
>It defines how a mediator object facilitates the interaction between other objects, guiding their behavior and communication without them being directly aware of each other. This pattern emphasizes the behavior and communication patterns among objects.

- *When to use?*
	- **Complex communication:** Your system involves a set of objects that need to communicate with each other in a complex manner, and you want to avoid direct dependencies between them
	- **Loose coupling:** You want to promote loose coupling between objects, allowing them to interact without knowing the details of each others implementations
	- **Centralized control:** You need a centralized mechanism to coordinate and control the interactions between objects, ensuring a more organized and maintainable system
	- **Changes in behavior:** You anticipate changes in the behavior of components, and you want to encapsulate these changes within the mediator, preventing widespread modifications
	- **Enhanced reusability:** You want to reuse individual components in different contexts without altering their internal logic or communication patterns

- *When not to use?*
	- **Simple interactions:** The interactions between components are straightforward, and introducing a mediator would add unnecessary complexity
	- **[[Software Design Principles#Single Responsibility Principle|Single Responsibility Principle (SRP)]]:** SRP states that each component has a single responsibility, adding a mediator could go against this principle and result in less maintainable code
	- **Performance concerns:** Introducing a mediator could introduce a performance overhead, especially in situations where direct communication between components is more efficient
	- **Small scale applications:** In small-scale applications with a limited number of components, the overhead of implementing a mediator might outweigh its benefits
	- **Over-engineering:** If the mediator pattern appears like an over-engineered answer for your systems particular requirements, don't use it. Always take the particular requirements of your application as well as trade-offs into account

- *Key Components*
	- **Mediator:** The mediator interface defines the communication contract, specifying methods that concrete mediators should implement to facilitate interactions among colleagues. It encapsulates the logic for coordinating and managing the interactions between these objects, promoting loose coupling and centralizing control over their communication
	- **Colleague:** Colleague classes are the components or objects that interact with each other. They communicate through the mediator, and each colleague class is only aware of the mediator, not the other colleagues. This isolation ensures that changes in one colleague do not directly affect others
	- **Concrete mediator:** Is a specific implementation of the mediator interface. It coordinates the communication between concrete colleague objects, handling their interactions and ensuring a well-organized collaboration while keeping them decoupled
	- **Concrete colleague:** Concrete colleague classes are the specific implementations of the colleague interface. They rely on the mediator to communicate with other colleagues, avoiding direct dependencies and promoting a more flexible and maintainable system architecture

```bash
===============================
      Mediator Design Pattern
===============================

      [Mediator]
          |
  +-------+-------+
  |               |
[ColleagueA]   [ColleagueB]
      |               |
      +-------+-------+
              |
        Communication
         (via Mediator)

===============================
```

*Example*
[Open Mediator Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/mediator/)

###### **Chain of Responsibility**
allows an object to pass a request along a chain of handlers. Each handler in the chain decides either to process the request or to pass it along the chain to the next handler.

>[!Visualization]
>Imagine a customer service department with multiple levels of support staff, each responsible for handling different types of customer inquiries based on their complexity.

- *Characteristics*
	- **Loose coupling:** This means the sender of a request doesn't need to know which specific object will handle it. Similarly, the handler doesn't need to understand how the requests are sent. This keeps the components separate and flexible. 
	- **Dynamic chain:** While the program is running, changing the chain is simple. This makes your code incredibly flexible because you may add or delete handlers without changing the main body of the code
	- **SRP:** Each handler in the chain has one job - either to handle the request or to pass it to the next handler. This keeps the code organized and focused, making it easier to manage
	- **Sequential order:** Requests move through the chain one at a time. Each handler gets a chance to process the request in a specific order, ensuring consistency
	- **Fallback mechanism:** If a request isn't handled by any of the handlers, the chain can include a fallback option. This means there's a default way to deal with requests that don't fit anywhere else
 
- *Key Components*
	- **Handler Interface or Abstract Class:** This is the base class that defines the interface for handling requests and in many cases, for chaining to the next handler in the sequence
	- **Concrete Handlers:** These are the classes that implement how the requests are going to be handled. They can handle the request or pass it to the next handler in the chain if it is unable to handle that request
	- **Client:** The request is sent by the client, who then forwards it to the chains first handler. Which handler will finally handle the request is unknown to the client

- *Advantages*
	- The pattern enables sending a request to a series of possible recipients without having to worry about which object will handle it in the end. This lessens the reliance between items
	- New handlers can be easily added or existing ones can be modified without affecting the client code. This promotes flexibility and extensibility within the system
	- The sequence and order of handling requests can be changed dynamically during runtime, which allows adjustment of the processing logic as per the requirements
	- It simplifies the interaction between the sender and receiver objects, as the sender does not need to know about the processing logic

- *Disadvantages*
	- The chain should be implemented correctly otherwise there's a chance that some requests might not get handled at all, which leads to unexpected behavior
	- The request will go through several handlers in the chain if it is lengthy and complicated, which could cause performance overhead. The processing logic of each handler has an effect on the systems overall performance
	- The fact that the chain has several handlers can make debugging more difficult. Tracking the progression of a request and determining which handler is in charge of handling it can be difficult
	- It may become more difficult to manage and maintain the chain of responsibility if the chain is dynamically modified at runtime

- *Applications*
	- In graphical user interfaces (GUIs), events like mouse clicks or key presses can be handled by a chain of listeners. Each listener checks if it can handle the event, passing it along the chain if it can't. This way, multiple components can respond to the same event without being tightly linked
	- In logging systems, you might have different levels of loggers. Each logger can handle specific log messages. If one logger can't process a message (for example, if it's below its level), it passes it to the next logger in the chain
	- In security systems, access requests can be processed by a series of handlers that check permissions. For instance, one handler might check user roles, while another checks specific permissions. If one handler denies access, it can pass the request to the next handler for further evaluation

```bash
================================
 Chain of Responsibility Pattern
================================

      [Client]
         |
         v
+-------------------+
|  Handler (Base)   |
+-------------------+
         |
         v
+-------------------+
| ConcreteHandlerA  |
|   (Handles or     |
|   Passes Down)    |
+-------------------+
         |
         v
+-------------------+
| ConcreteHandlerB  |
|   (Handles or     |
|   Passes Down)    |
+-------------------+
         |
         v
+-------------------+
| ConcreteHandlerC  |
|   (Final Handler) |
+-------------------+

================================
```

*Example*
[Open Chain Of Responsibility Project](file:///Users/ibrahim-furkandemirbilek/Code/design-patterns/chain-of-responsibility/)


