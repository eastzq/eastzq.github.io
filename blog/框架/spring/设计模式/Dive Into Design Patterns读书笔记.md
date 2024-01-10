

# Dive Into Design Patterns 读书笔记

---

## 1.1 什么是设计模式？

设计模式是在软件设计中常见问题的解决方案。它们提供了经过验证的、可重用的设计思想和方法，用于解决特定的设计问题和模式。设计模式可以被视为预先制定的蓝图或模板，可以帮助开发者在代码中自定义解决重复出现的设计问题。

设计模式的主要目标是增加代码的可重用性、可维护性和可扩展性。它们通过提供一套经过验证的最佳实践，帮助开发者避免常见的设计陷阱和问题，并提供了一种共享的设计语言，使得团队成员之间更容易理解和交流。

### 1.1.1 模式包括什么

#### Creational patterns(创建型模式)

> 这个模式提供了一种对象创建机制，可以提高现有代码的灵活性和重用性

#### Structural patterns(结构型模式)

> 这个模式关注于如何在保持结构的灵活和效率的同时组合对象和类到更大的结构中

#### Behavioral patterns(行为型模式)

> 这个模式关注对象之间的交互和职责分配，描述了对象之间如何协作以及如何分配职责和行为

## 1.2 软件设计原则

### 1.2.1 好的设计的特点

- 代码重用

> 开发任何软件的时候，时间和成本是最有价值的指标，花更少的时间在开发意味着能比竞争者更早进入市场，更低的开发成本意味着有更多的资金用于营销，并能更广泛地接触潜在客户。

> ---

> **代码重用** 是一种降低开发成本的常用的方法，它的意图十分明显：与其从头开始反复开发，为什么我们不在新项目中重用现有代码呢？这个想法在纸面上看起来十分不错，但事实上，让现有代码在新的上下文中工作通常需要额外的努力。

> 使用设计模式是一种提高软件组件重用的灵活性和易用性的方式，然而这是**以组件更加复杂为代价的**

- 可扩展性

> 修改代码在一个程序员的生涯中是一个持续的事情

> 比如，你发布了一个电子游戏，但是它只能在windows平台上运行，那么很快可能就有玩家要求你适配macos

> 再或者，你做了一套UI框架，里面有着方形的按钮，但是没过多久，圆形按钮成了主流

### 1.2.2 设计原则

#### Encapsulate What Varies(封装变化)

> 主要目的是**最小化变化带来的影响**

是面向对象设计中的一个原则，也是设计模式中的一个重要概念。它强调将变化的部分封装起来，以便将其与稳定的部分分离开来。

该原则的核心思想是识别系统中可能发生变化的部分，并将其封装在一个单独的组件或类中，以便将变化的影响限制在该组件或类的范围内，而不会波及到其他部分。通过这种方式，可以提高系统的灵活性和可维护性。

封装变化的好处包括：

1. **降低耦合度**：通过将变化的部分与稳定的部分分离开来，可以降低各组件或类之间的依赖关系，减少耦合度。这使得系统更易于修改和扩展，因为变化只会影响到封装变化的组件或类。
  
2. **提高可维护性**：将变化的部分封装在一个独立的组件或类中，使得对变化的理解和修改更加容易。开发人员可以更专注地处理特定的变化，并在需要时进行修改、替换或扩展。
  
3. **增加灵活性**：通过封装变化，系统可以更容易地适应不同的需求和变化的环境。变化可以通过修改封装变化的组件或类来实现，而不需要对整个系统进行修改。
  

> 想象你的程序是一条船，变化是水底下可怕的水雷，被水雷炸到，整个船就会沉没到水中。既然这样的话，我们把船设计成分开的隔室，然后再封装起来，这样就算撞到水雷， 没被炸坏的部分也能继续使用，漂流到水上，不至于整艘船沉没

同样地，你可以将程序中变化的部分隔离到独立的模块中，保护其余的代码免受不利影响。因此，你需要花费更少的时间来使程序恢复正常，并实施和测试这些变化。你在进行变更的时间越少，就有越多的时间来实现功能。

#### Encapsulation on a method level(封装在方法级别上)

> 你正在做一个电子商务网站，在你代码的某一处，有一个`getOrderTotal`方法用于计算订单总额还有税额，我们预期到和计算税额相关的代码未来也许需要改变，`税率由消费者所在的国家，州或者城市决定`，如果税率因为某些原因变化的花，你就得去经常修改`getOrderTotal`方法，尽管该方法的名称并不关心如何计算税款。

> 我们把计算税额的方法独立出来，叫`calculateTax`，再放入`getOrderTotal`方法中，这样当我们需要修改税率的时候，只需要修改`calculateTax`方法就可以了

#### Encapsulation on a class level(封装在类级别上)

随着时间的推移，你可能会给一个原本只执行简单任务的方法添加越来越多的责任。这些额外的行为通常会伴随着它们自己的辅助字段和方法，最终会模糊包含类的主要责任。将所有内容提取到一个新类中可能会使事情更加清晰和简单。

![](https://static.meowrain.cn/i/2023/10/04/x9j7ry-3.webp)

#### 面向接口编程，而不是面向实现编程

> 程序指向接口，而不是实现。依赖于抽象，而不是具体的类。

#### 偏爱组合而不是继承

> 继承也许是重用代码的最明显和简单的方式
> 
> 但是它也有明显的缺点：
> 
> - 子类不能减少超类的接口，就算接口中的方法你有的不会用到，你依然需要全部实现
>   
> - 当重写方法时，您需要确保新的行为与基础行为是兼容的。
>   
> - 继承会破坏超类的封装性，因为父类的内部细节变得对子类可见。也可能存在相反的情况，即为了更容易进行进一步扩展，程序员让超类了解某些子类的细节。
>   
> - 子类与超类之间存在紧密耦合关系。超类的任何更改都可能破坏子类的功能。
>   
> - 尝试通过继承来重用代码可能导致创建并行继承层次结构。继承通常在一个维度上进行。但是，当存在两个或更多维度时，您必须创建大量的类组合，使类层次结构膨胀到荒谬的大小。
>   

有一种替代继承的方法叫做**组合（composition）**。而继承表示类之间的“是一个”关系（汽车是一种交通工具），组合表示“有一个”关系（汽车有一个引擎）。

![](https://static.meowrain.cn/i/2023/10/06/10p7a0a-3.webp)

我们可以使用组合的方式解决问题，汽车对象可以将行为委托给其他对象，而不是自己实现行为。

额外的好处是您可以在运行时替换行为。例如，您可以通过将不同的引擎对象分配给汽车对象来替换与汽车对象关联的引擎对象。

![](https://static.meowrain.cn/i/2023/10/06/10rovtb-3.webp)

这种类的结构类似于策略模式

### 1.2.3 SOLID 原则

SOLID 是以下是原则的缩写：

- S 单一职责原则
- O 开闭原则
- L 里氏替换原则
- I 接口隔离原则
- D 依赖倒置原则

#### 单一职责原则

> 一个类应该只有一个变化的原因，一个类应该只做一件事

单一职责的好处：

- 更容易版本管理
- 减少合并冲突

违反单一原则的情况：

```cpp
#include <iostream>
#include <fstream>
#include <string>

class FileManager {
public:
    FileManager(const std::string& filename) : filename(filename) {}

    void writeToFile(const std::string& data) {
        std::ofstream file(filename);
        if (file.is_open()) {
            file << data;
            file.close();
        } else {
            std::cerr << "Unable to open file." << std::endl;
        }
    }

    std::string readFromFile() {
        std::string data;
        std::ifstream file(filename);
        if (file.is_open()) {
            std::string line;
            while (std::getline(file, line)) {
                data += line + "\n";
            }
            file.close();
        } else {
            std::cerr << "Unable to open file." << std::endl;
        }
        return data;
    }

    void processFile(const std::string& data) {
        // 处理文件数据的其他操作
        // ...
    }

private:
    std::string filename;
};

int main() {
    FileManager fileManager("data.txt");

    // 写入数据到文件
    fileManager.writeToFile("Hello, world!");

    // 从文件读取数据
    std::string fileData = fileManager.readFromFile();
    std::cout << "File Contents:\n" << fileData;

    // 对文件数据进行处理
    fileManager.processFile(fileData);

    return 0;
}
```

> 上面的代码中，FileManager 类承担了多个职责，包括写入文件、读取文件和处理文件数据。这违反了单一职责原则，因为这些功能应该分别属于不同的类。应该将这些功能拆分成单独的类以提高代码的可维护性和可扩展性。例如，可以创建一个独立的类来处理文件的读写，而另一个类来处理文件数据的处理。

像下面这样，修改后，就符合单一职责原则了

```cpp
#include <iostream>
#include <fstream>
#include <string>

class FileManager {
public:
    FileManager(const std::string& filename) : filename(filename) {}

    void writeToFile(const std::string& data) {
        std::ofstream file(filename);
        if (file.is_open()) {
            file << data;
            file.close();
        } else {
            std::cerr << "Unable to open file." << std::endl;
        }
    }

    std::string readFromFile() {
        std::string data;
        std::ifstream file(filename);
        if (file.is_open()) {
            std::string line;
            while (std::getline(file, line)) {
                data += line + "\n";
            }
            file.close();
        } else {
            std::cerr << "Unable to open file." << std::endl;
        }
        return data;
    }

private:
    std::string filename;
};

class DataProcessor {
public:
    void processFileData(const std::string& data) {
        // 处理文件数据的其他操作
        // ...
    }
};

int main() {
    FileManager fileManager("data.txt");

    // 写入数据到文件
    fileManager.writeToFile("Hello, world!");

    // 从文件读取数据
    std::string fileData = fileManager.readFromFile();
    std::cout << "File Contents:\n" << fileData;

    DataProcessor dataProcessor;

    // 对文件数据进行处理
    dataProcessor.processFileData(fileData);

    return 0;
}
```

#### 开闭原则

开闭原则要求“class 应该对扩展开放对修改关闭”。
修改意味着修改存在 class 的代码，扩展意味着添加新的功能。
这个原则想要表达的是：我们应该能在不动 class 已经存在代码的前提下添加新的功能。这是因为当我们修改存在的代码时，我们就面临着创建潜在 bug 的风险。因此，如果可能，应该避免碰通过测试的（大部分时候）可靠的生产环境的代码。

开闭原则的好处：
如果一个软件系统符合开闭原则的，那么从软件工程的角度来看，它至少具有这样的好处：

对软件测试友好
软件遵守开闭原则的话，软件测试时只需要对扩展的代码进行测试就可以了，因为原有的测试代码仍然能够正常运行。

可复用性好
我们可以在软件完成以后，仍然可以对软件进行扩展，加入新的功能，非常灵活。因此，这个软件系统就可以通过不断地增加新的组件，来满足不断变化的需求。

可维护性好
由于对于已有的软件系统的组件，特别是它的抽象底层不去修改，因此，我们不用担心软件系统中原有组件的稳定性，这就使变化中的软件系统有一定的稳定性和延续性。

下面是一个违反开闭原则的代码：

```cpp
class Rectangle {
    double width;
    double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
}

class Circle {
    double radius;

    public Circle(double radius) {
        this.radius = radius;
    }
}

class AreaCalculator {
    public double calculateRectangleArea(Rectangle rectangle) {
        return rectangle.width * rectangle.height;
    }

    public double calculateCircleArea(Circle circle) {
        return Math.PI * circle.radius * circle.radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rectangle = new Rectangle(5, 10);
        Circle circle = new Circle(3);

        AreaCalculator calculator = new AreaCalculator();
        double rectangleArea = calculator.calculateRectangleArea(rectangle);
        double circleArea = calculator.calculateCircleArea(circle);

        System.out.println("Rectangle Area: " + rectangleArea);
        System.out.println("Circle Area: " + circleArea);
    }
}
```

上面的代码用于计算不同形状的面积，但是这个设计违反了开闭原则，如果要求你添加一个新形状，就需要修改`AreaCalculator`类的代码

下面我们来写一个符合开闭原则的代码：

```cpp
abstract class Shape {
    public abstract double calculateArea();
}

class Rectangle extends Shape {
    double width;
    double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Circle extends Shape {
    double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Triangle extends Shape {
    double base;
    double height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape rectangle = new Rectangle(5, 10);
        Shape circle = new Circle(3);
        Shape triangle = new Triangle(4, 7);

        System.out.println("Rectangle Area: " + rectangle.calculateArea());
        System.out.println("Circle Area: " + circle.calculateArea());
        System.out.println("Triangle Area: " + triangle.calculateArea());
    }
}
```

在这个修改后的版本中，我们引入了一个抽象基类 Shape，每个具体形状类都继承自 Shape 并实现了 calculateArea 方法。这样，我们可以轻松地添加新的形状类而不需要修改 AreaCalculator 类，符合开闭原则。通过多态性，我们可以在运行时动态选择适当的计算方法。这种设计使程序更加灵活和可扩展。

#### 里氏替换原则

里氏替换原则（Liskov Substitution Principle, LSP）是面向对象设计原则的一种，也叫里氏代换原则。里氏替换原则是关于继承的一个原则，遵循里氏替换原则能够更好地发挥继承的作用，里氏替换原则最早是在1988年，由麻省理工学院的一位姓里的女士（Barbara Liskov）提出来的。

一个对象（例如类）可以被子对象（例如扩展第一个类的类）替换，而不会破坏程序

Liskov Substitution Principle（LSP）允许子类重写父类的方法，但要确保重写的方法在行为上是与父类方法兼容的，而且不会引起不一致或错误。

不一致通常指的是在子类中重写了父类的方法，但是子类的方法行为与父类的方法行为不相符，违反了原有的契约。这可能表现为以下几种情况：

1. **返回类型不兼容：** 如果子类重写了父类的方法，但是返回类型不同，可能导致使用多态性时调用出错。
  
  ```java
  class Animal {
      public int speak() {
          // Base class method
          return 0;
      }
  }
  
  class Dog extends Animal {
      @Override
      public void speak() {
          // Subclass method with incompatible return type
          // This violates LSP
      }
  }
  ```
  
2. **参数列表不兼容：** 如果子类重写了父类的方法，但是参数列表不同，可能导致在多态调用时传递的参数不符合预期。
  
  ```java
  class Animal {
      public void eat(String food) {
          // Base class method
      }
  }
  
  class Dog extends Animal {
      @Override
      public void eat(int food) {
          // Subclass method with incompatible parameter type
          // This violates LSP
      }
  }
  ```
  
3. **异常不一致：** 如果子类重写了父类的方法，但是抛出的异常不同，可能导致异常处理的不一致。
  
  ```java
  class Animal {
      public void move() throws Exception {
          // Base class method
      }
  }
  
  class Dog extends Animal {
      @Override
      public void move() throws IOException {
          // Subclass method with incompatible checked exception
          // This violates LSP
      }
  }
  ```
  

总体而言，Liskov Substitution Principle 鼓励子类在继承父类时保持行为的一致性，以确保可以透明地替代父类对象而不引起问题。

Liskov Substitution Principle（LSP）是面向对象编程中的重要原则，它强调了子类应该能够替代其父类而不引起问题。除了前面提到的基本原则之外，还有一些细节和注意事项，有助于更好地理解和应用LSP：

1. **方法的前置条件和后置条件：** 子类重写父类方法时，应确保方法的前置条件（即方法的输入要求）不比父类更强。同时，方法的后置条件（即方法的输出结果）不应比父类更弱。这有助于确保子类的行为不会违反父类的约定。
  
2. **异常的处理：** 子类在重写父类方法时，如果方法声明中包含异常抛出，子类可以抛出与父类相同或更具体的异常。不过，不应该抛出更宽泛的异常类型，因为这可能会破坏调用者的期望。
  
3. **方法的可访问性：** 子类重写父类方法时，不应该减小方法的可访问性。如果父类方法是公共的（public），则子类重写的方法也应该是公共的。
  
4. **不要修改父类的行为：** 子类在重写父类方法时，不应该修改父类方法的行为，而是应该扩展或特化行为。如果需要修改行为，这可能表示父类的设计需要重新审查。
  
5. **避免冗余：** 不要在子类中提供与父类相同的方法，除非有充分的理由。子类应该通过继承来获取父类的方法，而不是重复定义。
  
6. **合理的继承层次结构：** 父类和子类之间的继承关系应该合理。避免深层次的继承结构，因为它们可能会引入复杂性和难以理解的问题。如果继承关系复杂，考虑是否可以使用组合代替继承。
  
7. **测试和验证：** 在应用LSP时，进行充分的测试和验证是至关重要的。确保子类能够正确地替代父类，而不引发错误或不一致的行为。
  

总之，LSP的核心原则是保持一致性和可替代性。子类应该继承父类的行为，并且可以根据需要扩展或特化行为，而不会破坏父类的契约。遵循这些细节和注意事项可以帮助确保LSP的正确应用，从而提高代码的可维护性和可扩展性。