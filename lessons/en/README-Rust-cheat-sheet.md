Rust is a systems programming language that is knwon for its emphasis on
safety, performance and concurrency.
Rust is designed to provide low-level control over system resources
without sacrificing high-level abstractions.

What does Rust have different from other programmig languages.
- ownership and borrowing
- lifetime
- pattern matching
- concurrency without data races
- traits
- no null or garbage collection
- macros
- cargo
- community and ecosystem
- UTF-8 and Unicode text


# Chapter 1 - The Basics
In this first chapter we're going to be exploring the very basics with 
functions, variables, and the most primitive types. Glad to have you on 
board!

Also! In case you are wondering who this adorable crab who is speaking to you 
is, I am **Ferris**, the unofficial mascot for the Rust programming language. 
Nice to meet you.

Once you get familiar with Rust, you can call yourself a **Rustacean**. 
That's how people who use, contribute or are interested in Rust call themself.

## The Rust Playground
This tour uses an interactive coding tool from [https://play.rust-lang.org/?version=stable&mode=debug&edition=2021](Rust Playground).

It's a great way to play around with Rust and show others your creativity and challenges!

```rust
fn main() {
    println!("Welcome to the playground! You can modify the code in here.");
}
```


## What is `println!`?
Unlike other programming languages, where there is a function for
writting text in `stdout` (standard output), Rust uses the `macros` **println!** and **print!**.
We'll talk about `macros` later.

> `println!` will display using a new line character `\n` at the end of the string 
> `print!` will not use the `\n` at the end of the text


```rust
fn main() {
    println!();
    print!("There is an empty line above this. ");
    print!("Isn't it great?");
    println!();     // new line at the end of stdout
}

```

## How to compile?
On Linux / MacOS systems:
```
$ rustc main.rs
$ ./main
```

On Windows systems?
```
> rustc main.rs
> .\main.exe
```

| Operating System (OS) | terminal commands                 |
| --------------------- | --------------------------------- |
| Linux / MacOS         | $ rustc main.rs <br> $ ./main     |
| Windows               | > rustc main.rs <br> > ./main.exe |



## Variables
Variables are declared using the `let` keyword.

When assigning a value, Rust will be able to infer the type of your variable 99% of the time.
If it cannot you may add the type to your variable declaration.

Notice how we can assign to the same variable name multiple times. This is called variable shadowing and the type can be changed for subsequent references to that name.

Variable names are always in `snake_case`.


```rust

fn main() {
    // rust infers the type of x
    let x = 13;
    println!("{}", x);

    // rust can also be explicit about the type
    let x: f64 = 3.14159;
    println!("{}", x);

    // rust can also declare and initialize later, but this is rarely done
    let x;
    x = 0;
    println!("{}", x);
}
```



## Changing Variables
Rust cares a great deal about what variables are modifiable.
Values fall into two types:

- **mutable** - the compiler will allow the variable to be written to and read from (`let mut var;`)
- **immutable** - the compiler will only allow the variable to be read from. (`let var;`)

Mutable values are denoted with a `mut` keyword.

We will have more to say on this concept later, but for now just keep an eye out for this keyword.


```rust

fn main() {
    let mut x = 42;
    println!("{}", x);
    x = 13;
    println!("{}", x);
}
```


## Basic Types
Basic data types:
- bool
- u8
- u16
- u32
- u64
- u128
- i8
- i16
- i32
- i64
- i128
- usize
- isize
- f32
- f64

| u/i |  sign            | sign                               | sign| 
| --- | ---------------- | ---------------------------------- | --- |
| `u` | unsigned numbers | positive numbers only              |  +  |
| `i` |  signed numbers  | both negative and positive numbers |  ±  |


Rust has a variety of familiar types:

- `booleans` - bool for representing true/false
- unsigned integers - `u8` `u16` `u32` `u64` `u128` for representing nonnegative whole numbers
- signed integers - i8 i16 i32 i64 i128 for representing whole numbers
pointer sized integers - usize isize for representing indexes and sizes of things in memory
- floating point - `f32` `f64`
- tuple - `(value, value, ...)` for passing fixed sequences of values on the stack
- arrays - `[value, value, ...]` a collection of similar elements with fixed length known at compile time
- slices - a collection of similar elements with length known at runtime
- `str` (string slice) - text with a length known at runtime

Text might be more complex than you are used to in other languages; since 
Rust is a system programming language, it cares about memory issues you 
might not be used to. We will be going into this in detail later.

Numeric types can be explicitly specified by appending the type to the end 
of the number (e.g. `13u32`, `2u8`).

> cannot apply unary operator '-' on `u8`, `u16`, `u32`, `u64`, `u128`

```rust
fn main() {
    let a = 13u8;
    let b = 7u32;
    let c = a as u32 + b;
    println!("{}", c);

    let t = true;
    println!("{}", t as u8);

    
    let d: u32 = 12;
    // let e: u32 = -12;  // unsinged nubers include only positive numbers
    let e: i32 = 12;
    let f: i32 = -12;
    println!("{} {} {} {}",
                d, -(d as i32), e, f);
}


```


## Basic Type Conversion
Rust requires explicitness when it comes to numeric types. One cannot use a 
`u8` for a `u32` casually without error.

Luckily Rust makes numeric type conversions very easy with the `as` keyword.

``` rust
fn main() {
    let a = 13u8;
    let b = 7u32;
    let c = a as u32 + b;
    println!("{}", c);

    let t = true;
    println!("{}", t as u8);
}

```


## Constants
Constants allow us to specify a common value that's used throughout our code 
many times efficiently. Instead of copying values like variables where they 
are used, constants directly replace the text identifier where they are used 
with their value at compile time.

Unlike variables, constants must always have explicit types.

Constant names are always in `SCREAMING_SNAKE_CASE`.


``` rust
const PI: f32 = 3.14159;

fn main() {
    println!(
        "To make an apple {} from scratch, you must first create a universe.",
        PI
    );
}

```


## Collections
Rust provides a variety of collection types that allow you to store and
manipulate data.

The main collections in Rust:
- Arrays
- Vectors
- Slices
- Strings
- Tuple
- Hash Maps
- Hash Sets

We will discuss each of them latter on.


```rust
use std::collections::HashMap;
use std::collections::HashSet;

fn main() {

    // array
    let array: [i32; 3] = [1, 2, 3];
    println!("{:?}", array);
    
    // vector
    let vector: Vec<i32> = vec![1, 2, 3];
    println!("{:?}", vector);

    // slice (from other collection)
    let slice = &array[1..3];
    println!("{:?}", slice);
    
    // string
    let string: String = String::from("Hello, Rust!");
    println!("{:?}", string);
    
    // tuple
    let tuple: (i32, f64, u8) = (42, 3.14, 5);
    println!("{:?}", tuple);

    // map
    let mut map = HashMap::new();
    map.insert("one", 1);
    map.insert("two", 2);
    println!("{:?}", map);
    
    // set
    let mut set = HashSet::new();
    set.insert(1);
    set.insert(2);
    println!("{:?}", set);
}

```

## Printing with `{:?}`
Notice that when displaying a collection, `println!("{}", collection);` 
doesn't work.

In Rust, the `:?` is a format specifier used with the `Debug` trait when 
printing values / collections of values.
When you use `println!("{:?}", x);`, the Rust compiler formats the variable
accordingly.

This is particularly useful for `collections` like vectors, arrays, structs 
and enums.

`{:#?}` will print them in a way that is designed to be informative during
debugging.


| function              | basic type | collection |
| --------------------- | ---------- | ---------- |
| println!("{}", x);    |     ✅     |     ❌     |
| println!("{:?}", x);  |     ✅     |     ✅     |
| println!("{:#?}", x); |     ✅     |     ✅     |

```rust
fn main() {

    let my_vector = vec![1, 2, 3];
    // println!("{}", my_vector);   // will generate an error
    println!("{:?}", my_vector);
    println!("{:#?}", my_vector);   // debug mode
    
    let x: i32 = -12;
    println!("{}", x);
    println!("{:?}", x);
    println!("{:#?}", x);	
}

```



## Arrays
An *array* is a **fixed length** collection of data elements all of the same type.

The data type for an *array* is `[T;N]` where T is the elements' type, and N 
is the fixed length known at compile-time.

Individual elements can be retrieved with the `[x]` operator where x is a 
usize index (starting at `0`) of the element you want.

Collections with a dynamic length, often called dynamic or variable arrays, 
are introduced in a later chapter about **Vectors**.

```rust
fn main() {
    let nums: [i32; 5] = [1, 2, 3, 4, 5];

    println!("{}", nums[1]);

    println!("{:?}", nums);     // :? for displaying collections
    println!("{:#?}", nums);    // :#? displaying a collection in debug mode
    
    for el in nums {
        print!("{} ", el);
    }
    println!();
    
    for i in 0..=(nums.len() - 1) {
        print!("{} ", nums[i]);
    }
    println!();
    
    for i in 0..nums.len() {
        print!("{} ", nums[i]);
    }
    println!("");
}

```


## Vectors
Vectors are on of the most flexible and commonly used collection types in Rust.
They represent a dynamic, growable array, and they are part of the standard
Rust library (`std::vec::Vec`). No need to `use` it. :)


```rust
fn main() {
    // vec![] is a macro
    let v1 = vec![1, 2, 3, 4, 5];
    println!("{:?}", v1);
    
    let mut v2 = Vec::new();
    v2.push(1);
    v2.push(2);
    v2.push(3);
    
    // Using a for loop
    for el in &v1 {
        print!("{} ", el);
    }
    println!();
    
    // Using iter() method
    for el in v1.iter() {
        print!("{} ", el);
    }
    println!();
    
    for i in 0..v1.len() {
        print!("{} ", v1[i]);
    }
    println!();
    
    
    // we'll talk about Some and Result later
    if let Some(element) = v1.get(1) {
        println!("Second element: {}", element);
    } else {
        println!("Index out of bounds.");
    }
    
}

```


## Strings
In Rust strings are UTF-8 encoded sequence of Unicode characters.

The String type, which is part of the standard library 
(`std::string::String`), is the most commonly used string type in Rust.

Rust also has a primitive string type, `&str`, which represents a string slice.

We'll later discuss in detail about Strings.

```rust
fn main() {
    let str1 = "Hello, world"; // &str Type
    println!("{:?}", str1);
    
    let mut s1: String = String::from("");
    s1.push_str("Hello");
    s1.push_str(", world!");
    println!("{:?}", s1);
    
    let s2: String = String::from("Rust");
    let s3: String = s1 + &s2;  // s1 will be moved to s3
    println!("{:?}", s3);
    // println!("{:?}", s1);    // doesn't work : s1 is borrowed by s3
    
    let s4: String = s3.clone();
    for ch in s4.chars() {
        print!("{}", ch);
    }
    
}

```


## Tuple
`Tuple` represents an **immutable** collections of elements, that can have 
differente data types.
Since it's **immutable**, it cannot be modified after its creation.
The elements of a tuple can be accessed by index (indexing starts from 0),
using the `.` operator.

```tuple_name.index```


```rust
fn main() {
    // Create a tuple
    let my_tuple = (11, "Hello, Rust!", 3.14);

    // Access elements using indexing
    let first_element = my_tuple.0;
    let second_element = my_tuple.1;
    let third_element = my_tuple.2;

    // Print the elements
    println!("First: {}", first_element);
    println!("Second: {}", second_element);
    println!("Third: {}", third_element);
}

```


## Functions
A function has zero or more parameters.

In this example, the add function takes two arguments of type `i32`
(signed integer of 32-bit length).

If you just want to `return` an expression, you can drop the return keyword 
and the semicolon at the end, as we did in the subtract function.

Function names are always in `snake_case`.

Hint: if you define a function, the data it accepts are called parameters. If you call that function and pass data to it, then it's called arguments.


```rust
fn add(x: i32, y: i32) -> i32 {
    return x + y;
}

fn subtract(x: i32, y: i32) -> i32 {
    x - y
}

fn last_digit(mut x: i32) -> u8 {
    
    if x < 0 {
        while x < -9 {
            x = x / 10;
        }
        return (-x) as u8;
    
    } else {
        while x > 9 {
            x = x / 10;
        }
        return x as u8;
    }
}

fn main() {
    println!("42 + 13 = {}", add(42, 13));
    println!("42 - 13 = {}", subtract(42, 13));
    
    let mut nr = 612129;
    println!("last digit of {} = {}", nr, last_digit(nr));

    nr = -31324;
    println!("last digit of {} = {}", nr, last_digit(nr));
}

```


## Multiple Return Values
Functions can return multiple values by returning a *tuple* of values.

Tuple elements can be referenced by their index number.

Rust supports various kinds of destructuring that we will see in many forms, 
allowing us to extract sub-pieces of data structures in ergonomic ways. Be 
on the lookout!


```rust
fn swap(x: i32, y: i32) -> (i32, i32) {
    return (y, x);
}

fn main() {
    // return a tuple of return values
    let result = swap(123, 321);
    println!("{} {}", result.0, result.1);

    // destructure the tuple into two variables names
    let (a, b) = swap(result.0, result.1);
    println!("{} {}", a, b);
}

```


## Returning Nothing
If no return type is specified for a function, it returns an empty tuple, 
also known as a *unit*.

An empty tuple is represented by `()`.

Using `()` is uncommon, but will come up often enough that it's good to know 
whats happening.

```rust
fn make_nothing() -> () {
    return ();
}

// the return type is implied as ()
fn make_nothing2() {
    // this function will return () if nothing is specified to return
}

fn main() {
    let a = make_nothing();
    let b = make_nothing2();

    // Printing a debug string for a and b
    // Because it's hard to print nothingness
    println!("The value of a: {:?}", a);
    println!("The value of b: {:?}", b);
}
```



## Macros
A `macro` is an abstraction from another code, that allows developers to
define reusable patterns and reduce duplicate code.

In Rust, there are two types of `macros`:
- declarative
- procedural

## Declarative macros
Declarative macros, such as **print!**, **format!** or **todo!**
are invoked using the syntax `macro_name!(....)`.
The `!` indicates that it's a macro invocation
rather than a regular function call.

## Procedural macros
Procedural macros operate on the abstract syntax tree (AST) of Rust code and 
generate or modify code accordingly. They are more powerful and flexible 
than declarative macros but are also more complex.
Examples: `#[derive(Debug)]`, `#[test]`, `#[derive(Serialize)]`


# Chapter 1 - Conclusion
Nice job so far! The basics of Rust aren't so bad, right? We're getting a 
peek into how the Rust compiler thinks. As a system programming language it 
cares a lot about the size of values in memory, whether things can be 
modified or not, and making sure your math is what you want it to be. Next 
up we'll be looking at some old friends: `if` tests and for `loops`.

More Resources:
- [https://www.youtube.com/watch?v=n5TRBkbystY](Youtube: Rust Cast - A deeper dive on Rust's primitive number types)
- [https://doc.rust-lang.org/1.30.0/book/2018-edition/ch03-02-data-types.html](Website: Rust Book 2018 - A deeper description on basic data types)
- [https://doc.rust-lang.org/1.30.0/book/2018-edition/ch03-02-data-types.html](Website: Rust Cheat Sheet - Data Types)




# Chapter 2 - Basic Control Flow
In this chapter let's talk about basic control flow methods in Rust. If you 
are familiar with C based languages you'll feel right at home and maybe 
enjoy a surprise or two.



## if/else
Code branching in Rust is not surprising.

Conditions don't have parentheses! Did we ever really need them? Our logic 
now looks nice and clean.

All your usual relational and logical operators still work: `==`, `!=`, `<`, `>`, `<=`, `>=`, `!`, `||`, `&&`.


```rust
fn main() {
    let x = 42;
    if x < 42 {
        println!("less than 42");
    } else if x == 42 {
        println!("is 42");
    } else {
        println!("greater than 42");
    }
}

```


## loop
Need an infinite loop?

Rust makes it easy.

`break` will escape a loop when you are ready.

`loop` has a secret we'll talk about soon.


```rust
fn sum_digits(x: i32) -> i32 {
    let mut aux: i32 = x;
    let mut sum = 0_i32;
    while aux != 0 {
        sum = sum + x % 10;
        aux = aux / 10;
    }
    return sum;
}

fn main() {
    let mut x = 0;
    while x != 42 {
        x += 1;
    }
    println!("x is {}", x);

    x = 121;
    println!("the sum of digits of number {} = {}",
                x, sum_digits(x));
    
}

```


## for
Rust's `for` loop is a powerful upgrade. It iterates over values from any 
expression that evaluates into an iterator. What's an iterator? An iterator 
is an object that you can ask the question "What's the next item you have?" 
until there are no more items.

We'll explore this more in a future chapter. In the meantime, just know Rust 
makes it easy to create iterators that generate a sequence of integer 
numbers.

The `..` operator creates an iterator that generates numbers from a start 
number up to but not including an end number.

The `..=` operator creates an iterator that generates numbers from a start 
number up to and including an end number.

```rust
fn main() {

    for x in 0..5 {
        print!("{} ", x);
    }
    println!();

    for x in 0..=5 {
        print!("{} ", x);
    }
    println!();

    let nums : [i32; 5] = [10, -1, 9, -80, 1];
    
    print!("{} : ", stringify!(nums));
    for el in nums {
        print!("{} ", el);
    }
    println!();

    print!("{} : ", stringify!(nums));
    for idx in 0 .. nums.len() {
        print!("{} ", nums[idx]);
    }
    println!();
}

```


## match

Miss your switch statement? Rust has an incredibly useful keyword for 
matching all possible conditions of a value and executing a code path if the 
match is true. Let's see how this works for numbers. We will have more to 
say in future chapters on pattern matching more complex data. I promise you 
it will be worth the wait.


`match` is exhaustive so all cases must be handled.

Matching combined with destructuring is by far one of the most common patterns you will see in all of Rust.

```rust
fn main() {
    let x = 42;

    match x {
        0 => {
            println!("found zero");
        }
        // we can match against multiple values
        1 | 2 => {
            println!("found 1 or 2!");
        }
        // we can match against ranges
        3..=9 => {
            println!("found a number 3 to 9 inclusively");
        }
        // we can bind the matched number to a variable
        matched_num @ 10..=100 => {
            println!("found {} number between 10 to 100!", matched_num);
        }
        // this is the default match that must exist if not all cases are handled
        _ => {
            println!("found something else!");
        }
    }
}

```



## Returning Values From loop
`loop` can break to return a value.

```rust
fn main() {
    let mut x = 0;
    let v = loop {
        x += 1;
        if x == 13 {
            break "found the 13";
        }
    };
    println!("from loop: {}", v);
}

```

## Returning Values From Block Expressions
`if`, `match`, `functions`, and scope blocks all have a unique way of returning values in Rust.

If the last statement in an `if`, `match`, function, or scope block is an expression without a `;`, Rust will return it as a value from the block. This is a great way to create concise logic that returns a value that can be put into a new variable.

Notice that it also allows an `if` statement to operate like a concise ternary expression.


```rust
fn example() -> i32 {
    let x = 42;
    // Rust's ternary expression
    let v = if x < 42 { -1 } else { 1 };
    println!("from if: {}", v);

    let food = "hamburger";
    let result = match food {
        "hotdog" => "is hotdog",
        // notice the braces are optional when its just a single return expression
        _ => "is not hotdog",
    };
    println!("identifying food: {}", result);

    let v = {
        // This scope block lets us get a result without polluting function scope
        let a = 1;
        let b = 2;
        a + b
    };
    println!("from block: {}", v);

    // The idiomatic way to return a value in rust from a function at the end
    v + 4
}

fn main() {
    println!("from function: {}", example());
}

```




# Chapter 2 - Conclusion
Hopefully I've shown a glimpse of Rust's power even in the most basic 
language features. We'll be talking about `for` and match even more in depth 
as we gain more knowledge that can utilize their capabilities. Next time 
we'll get into Rust's foundational data structures.




## Chapter 3 - Basic Data Structure Types
It's time we explore beyond basic types! In this chapter we will look at the 
most primitive data structures in Rust, paying close attention to their 
representations in memory. I think you will enjoy how little Rust hides from 
you how things work.


# Strucutres
A `struct` is a collection of fields.

A *field* is simply a data value associated with a data structure. Its value can be of a primitive type or a data structure.

Its definition is like a blueprint for a compiler on how to layout the fields in memory nearby each other.


```rust
struct SeaCreature {
    // String is a struct
    animal_type: String,
    name: String,
    arms: i32,
    legs: i32,
    weapon: String,
}
```


## Calling Methods
Unlike functions, methods are functions associated with a specific data type.

**static methods** — methods that belong to a type itself are called using the `::` operator.

**instance methods** — methods that belong to an instance of a type are called using the `.` operator.

We will talk more on making your own methods in future chapters.


```rust
fn main() {
    // Using a static method to create an instance of String
    let s = String::from("Hello world!");
    // Using a method on the instance
    println!("{} is {} characters long.", s, s.len());
}

```



## Memory
Rust programs have 3 memory regions where data is stored:

- **data memory** - For data that is fixed in size and **static** (i.e. 
always available through life of program). Consider the text in your program 
(e.g. "Hello World!"): This text's bytes are only ever read from one place 
and therefore can be stored in this region. Compilers make lots of 
optimizations with this kind of data, and they are generally considered very 
fast to use since locations are known and fixed.
- **stack memory** - For data that is declared as variables within a 
function. The location of this memory never changes for the duration of a function call; because of this compilers can optimize code so stack data is very fast to access.
- **heap memory** - For data that is created while the application is running. Data in this region may be added, moved, removed, resized, etc. Because of its dynamic nature it's generally considered slower to use, but it allows for much more creative usages of memory. When data is added to this region we call it an **allocation**. When data is removed from this section we call it a **deallocation**.



## Creating Data In Memory
When we **instantiate** a struct in our code our program creates the associated field data side by side in memory.

We instantiate by specifying all field values within

`StructName { ... }`.

Struct fields are accessed using a dot operator `.`.

Memory details of our example:

- The text inside the quotes is read only data (e.g. "Ferris"), therefore it is placed in the *data memory region*.
- The function call `String::from` creates a struct `String` that is placed 
side by side with the fields of SeaCreature in the stack. A String 
represents text that can be changed and does this by:
	1. Creating memory on the *heap* for the text where it can be modified
	2. Storing a reference to that memory location on the *heap* and storing it in `String` struct (More on this in future lessons)
- Finally our two friends *Ferris* and *Sarah* have data structures that will always have fixed locations in our program, so they are placed on the *stack*.


```rust
struct SeaCreature {
    animal_type: String,
    name: String,
    arms: i32,
    legs: i32,
    weapon: String,
}

fn main() {
    // SeaCreature's data is on stack
    let ferris = SeaCreature {
        // String struct is also on stack,
        // but holds a reference to data on heap
        animal_type: String::from("crab"),
        name: String::from("Ferris"),
        arms: 2,
        legs: 4,
        weapon: String::from("claw"),
    };

    let sarah = SeaCreature {
        animal_type: String::from("octopus"),
        name: String::from("Sarah"),
        arms: 8,
        legs: 0,
        weapon: String::from("brain"),
    };
    
    println!(
        "{} is a {}. They have {} arms, {} legs, and a {} weapon",
        ferris.name, ferris.animal_type, ferris.arms, ferris.legs, ferris.weapon
    );
    println!(
        "{} is a {}. They have {} arms, and {} legs. They have no weapon..",
        sarah.name, sarah.animal_type, sarah.arms, sarah.legs
    );
}

```



## Tuple-like Structs
For conciseness, you can create structs that are used like a tuple.

Reminder

```rust
struct Location(i32, i32);

fn main() {
    // This is still a struct on a stack
    let loc = Location(42, 32);
    println!("{}, {}", loc.0, loc.1);
}
```


## Unit-like Structs
Structs do not have to have any fields at all.

As mentioned in Chapter 1 a *unit* is another word for an empty tuple `()`. This is why this kind of struct is called *Unit-like*.

This type of struct is rarely used.

```rust
struct Marker;

fn main() {
    let _m = Marker;
}

```



## Enumerations
Enumerations allow you to create a new type that can have a value of 
several tagged elements using the `enum` keyword.

`match` helps ensure exhaustive handling of all possible enum values making it a powerful tool in ensuring quality code.


```rust
#![allow(dead_code)] // this line prevents compiler warnings

enum Species {
    Crab,
    Octopus,
    Fish,
    Clam
}

struct SeaCreature {
    species: Species,
    name: String,
    arms: i32,
    legs: i32,
    weapon: String,
}

fn main() {
    let ferris = SeaCreature {
        species: Species::Crab,
        name: String::from("Ferris"),
        arms: 2,
        legs: 4,
        weapon: String::from("claw"),
    };

    match ferris.species {
        Species::Crab => println!("{} is a crab",ferris.name),
        Species::Octopus => println!("{} is a octopus",ferris.name),
        Species::Fish => println!("{} is a fish",ferris.name),
        Species::Clam => println!("{} is a clam",ferris.name),
    }
}

```




## Enumerations With Data
`enum` elements can also have one or more data types allowing them
to behave like *union* from C.

When an `enum` is pattern matched using `match`,
you can bind a variable name to each data value.

Memory details of `enum`:
- An enum data value will have a memory size equal to its largest element. This allows for all potential values to fit in the same space of memory.
- In addition to element data types (if any), each element also has a numeric value that represents which tag it is.

Other details:
- Rust's `enum` is something also known as a *tagged* union.
- The combining of types to make a new type is what people mean when they say Rust has *algebraic* types.


```rust
#![allow(dead_code)] // this line prevents compiler warnings

enum Species { Crab, Octopus, Fish, Clam }
enum PoisonType { Acidic, Painful, Lethal }
enum Size { Big, Small }
enum Weapon {
    Claw(i32, Size),
    Poison(PoisonType),
    None
}

struct SeaCreature {
    species: Species,
    name: String,
    arms: i32,
    legs: i32,
    weapon: Weapon,
}

fn main() {
    // SeaCreature's data is on stack
    let ferris = SeaCreature {
        // String struct is also on stack,
        // but holds a reference to data on heap
        species: Species::Crab,
        name: String::from("Ferris"),
        arms: 2,
        legs: 4,
        weapon: Weapon::Claw(2, Size::Small),
    };

    match ferris.species {
        Species::Crab => {
            match ferris.weapon {
                Weapon::Claw(num_claws,size) => {
                    let size_description = match size {
                        Size::Big => "big",
                        Size::Small => "small"
                    };
                    println!("ferris is a crab with {} {} claws", num_claws, size_description)
                },
                _ => println!("ferris is a crab with some other weapon")
            }
        },
        _ => println!("ferris is some other animal"),
    }
}

```





# Chapter 3 - Conclusion
How exciting! We now have the most basic tools for representing the form of 
our ideas in code. Hopefully now we can see a glimmer of how Rust's 
fundamental operations work in harmony and conciseness with its types. Next 
up we will talk about a concept that gives our data types even more 
flexibility of representation: *generics*.



# Chapter 4 - Generic Types
Generic types are incredibly important in Rust. They are used in the 
representation of nullable values (i.e. variables which might not have a 
value yet), error handling, collections, and more! In this section we will 
be learning about the foundational generic types you will likely be using 
all the time.




## What Are Generic Types?
Generic types allow us to partially define a `struct` or `enum`, enabling a compiler to create a fully defined version at compile-time based off our code usage.

Rust generally can infer the final type by looking at our instantiation, 
but if it needs help you can always be explicit using the `::<T>` operator, 
also known by the name `turbofish` (he's a good friend of mine!).


```rust
// A partially defined struct type
struct BagOfHolding<T> {
    item: T,
}

fn main() {
    // Note: by using generic types here, we create compile-time created types. 
    // Turbofish lets us be explicit.
    let i32_bag = BagOfHolding::<i32> { item: 42 };
    let bool_bag = BagOfHolding::<bool> { item: true };
    
    // Rust can infer types for generics too!
    let float_bag = BagOfHolding { item: 3.14 };
    
    // Note: never put a bag of holding in a bag of holding in real life
    let bag_in_bag = BagOfHolding {
        item: BagOfHolding { item: "boom!" },
    };

    println!(
        "{} {} {} {}",
        i32_bag.item, bool_bag.item, float_bag.item, bag_in_bag.item.item
    );
}

```



## Representing Nothing
In other languages, the keyword `null` is used to represent an absence of a 
value. It creates difficulty in programming languages because it creates 
the possibility that our program might fail when interacting with a 
variable/field.

Rust does not have `null`, but it is not ignorant of the importance of 
representing nothing! Consider a naive representation using a tool we 
already know.

This pattern of providing a `None` alternative representation for one or many alternate values is so common in Rust because of its lack of a `null` value. Generic types help solve this challenge.


```rust
enum Item {
    Inventory(String),
    // None represents the absence of an item
    None,
}

struct BagOfHolding {
    item: Item,
}

```


## Option
Rust has a built in generic enum called `Option` that allows us to 
represent nullable values without using `null`.

```rust
enum Option<T> {
    None,
    Some(T),
}
```

This enum is so common, instances of the enum can be created anywhere with 
the enum variants `Some` and `None`.



```rust
// A partially defined struct type
struct BagOfHolding<T> {
    // Our parameter type T can be handed to others
    item: Option<T>,
}

fn main() {
    // Note: A bag for i32, holding nothing! We have to specify the type
    // because otherwise Rust would not know what type of bag it is.
    let i32_bag = BagOfHolding::<i32> { item: None };

    if i32_bag.item.is_none() {
        println!("there's nothing in the bag!")
    } else {
        println!("there's something in the bag!")
    }

    let i32_bag = BagOfHolding::<i32> { item: Some(42) };

    if i32_bag.item.is_some() {
        println!("there's something in the bag!")
    } else {
        println!("there's nothing in the bag!")
    }

    // match lets us deconstruct Option elegantly and ensure we handle all cases!
    match i32_bag.item {
        Some(v) => println!("found {} in bag!", v),
        None => println!("found nothing"),
    }
}

```



## Result
Rust has a built in generic enum called `Result` that allows us to return a 
value that has the possibility of failing. It is the idiomatic way in which 
the language does error handling.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

Note that our generics type has multiple *parameterized types*
separated by a comma.

This enum is so common, instances of the enum can be created anywhere with 
the enum variants `Ok` and `Err`.


```rust
fn do_something_that_might_fail(i:i32) -> Result<f32,String> {
    if i == 42 {
        Ok(13.0)
    } else {
        Err(String::from("this is not the right number"))   
    }
}

fn main() {
    let result = do_something_that_might_fail(12);

    // match lets us deconstruct Result elegantly and ensure we handle all cases!
    match result {
        Ok(v) => println!("found {}", v),
        Err(e) => println!("Error: {}",e),
    }
}
```



## Failable Main
`main` has the capability of returning a `Result`!


```rust
fn do_something_that_might_fail(i: i32) -> Result<f32, String> {
    if i == 42 {
        Ok(13.0)
    } else {
        Err(String::from("this is not the right number"))
    }
}

// Main returns no value, but could return an error!
fn main() -> Result<(), String> {
    let result = do_something_that_might_fail(12);

    match result {
        Ok(v) => println!("found {}", v),
        Err(_e) => {
            // handle this error gracefully
            
            // return a new error from main that said what happened!
            return Err(String::from("something went wrong in main!"));
        }
    }

    // Notice we use a unit value inside a Result Ok
    // to represent everything is fine
    Ok(())
}

```


## Graceful Error Handling
`Result` is so common that Rust has a powerful operator `?` for working 
with them. These two statements are equivalent:

```
do_something_that_might_fail()?
```
```
match do_something_that_might_fail() {
    Ok(v) => v,
    Err(e) => return Err(e),
}
```


```rust
fn do_something_that_might_fail(i: i32) -> Result<f32, String> {
    if i == 42 {
        Ok(13.0)
    } else {
        Err(String::from("this is not the right number"))
    }
}

fn main() -> Result<(), String> {
    // Look at how much code we saved!
    let v = do_something_that_might_fail(42)?;
    println!("found {}", v);
    Ok(())
}

```




## Ugly Option/Result Handling
Working with `Option`/`Result` can be tedious when you are just trying to 
write some quick code. Both `Option` and `Result` have a function called `unwrap` that can be useful for getting a value in a quick and dirty manner.

`unwrap` will:
1. Get the value inside Option/Result
2. If the enum is of type None/Err, `panic!`

These two pieces of code are equivalent:

```
my_option.unwrap()
```
```
match my_option {
    Some(v) => v,
    None => panic!("some error message generated by Rust!"),
}
```


Similarly:
```
my_result.unwrap()
```
```
match my_result {
    Ok(v) => v,
    Err(e) => panic!("some error message generated by Rust!"),
}
```

Be a good rustacean and properly use `match` when you can!


```rust
fn do_something_that_might_fail(i: i32) -> Result<f32, String> {
    if i == 42 {
        Ok(13.0)
    } else {
        Err(String::from("this is not the right number"))
    }
}

fn main() -> Result<(), String> {
    // concise but assumptive and gets ugly fast
    let v = do_something_that_might_fail(42).unwrap();
    println!("found {}", v);
    
    // this will panic!
    let v = do_something_that_might_fail(1).unwrap();
    println!("found {}", v);
    
    Ok(())
}

```



## About panic!
In Rust, `panic!` is a macro used to stop the execution of the program
without a recoverable error. When a panic occurs, the program immediately
stop, unwinding the stack and cleaning up resourses along the way.

Moreover, the code instructions written after `panic!` will no longer be executed.

Usually, `panics` can by avoided by pattern matching the error with `Result`.

```rust
fn main() {
    println!("Reachable.");

    // Generates a panic
    panic!("This is a panic!");

    // This line be executed
    println!("Unreachable");
}

```



## Vectors
Some of the most useful generic types are collection types.
A vector is a variably sized list of items represented by the struct `Vec`.

The macro `vec!` lets us easily create a vector rather than manually 
constructing one.

`Vec` has the method `iter()` which creates an iterator from a vector, allowing us to easily put a vector into a `for` loop.

Memory Details:
- `Vec` is a struct, but internally it contains a reference to a fixed list of its items on the heap.
- A vector starts with a default capacity; when more items are added than it has capacity for, it reallocates its data on the heap to have a new fixed list with large capacity.


```rust
fn main() {
    // We can be explicit with type
    let mut i32_vec = Vec::<i32>::new(); // turbofish <3
    i32_vec.push(1);
    i32_vec.push(2);
    i32_vec.push(3);

    // But look how clever Rust is about determining the type automatically
    let mut float_vec = Vec::new();
    float_vec.push(1.3);
    float_vec.push(2.3);
    float_vec.push(3.4);

    // That's a beautiful macro!
    let string_vec = vec![String::from("Hello"), String::from("World")];

    for word in string_vec.iter() {
        println!("{}", word);
    }
}

```


# Chapter 4 - Conclusion
In one chapter we've learned how much power generic types give us! Don't 
worry if you don't know fully how to use everything, right now it's just 
good to be aware of the major ideas you will see again and again in code. 
Our functions are getting quite lengthy! In our next chapter we will spend 
talk about an important concept in Rust: data ownership.



# Chapter 5 - Ownership & Borrowing Data
Rust has a unique paradigm for managing memory compared to other 
programming languages. We're going to look at the behaviors and validations 
of the compiler one by one so it's not overwhelming. It's important to 
remember that ultimately the rules we show don't exist to make your life 
hard, but to help you make your code less error-prone!



## Ownership
Instantiating a type and **binding** it to a variable name creates a memory 
resource that the Rust compiler will validate through its whole **lifetime**. 
The bound variable is called the resource's **owner**.


```rust
struct Foo {
    x: i32,
}

fn main() {
    // We instantiate structs and bind to variables
    // to create memory resources
    let foo = Foo { x: 42 };
    // foo is the owner
}

```


## Scope-Based Resource Management
Rust uses the end of scope as the place to deconstruct and deallocate a resource.

The term for this deconstruction and deallocation is called a *drop*.

Memory detail:
- Rust does not have garbage collection.
- This is also called Resource Acquisition Is Initialization (RAII) in C++.


```rust
struct Foo {
    x: i32,
}

fn main() {
    let foo_a = Foo { x: 42 };
    let foo_b = Foo { x: 13 };

    println!("{}", foo_a.x);

    println!("{}", foo_b.x);
    // foo_b is dropped here 
    // foo_a is dropped here
}

```


## Dropping is Hierarchical
When a struct is dropped, the struct itself is dropped first, then its 
children are dropped individually, and so on.

Memory Details:
- By automatically freeing memory Rust helps ensure that there are fewer memory leaks.
- Memory resources can only be dropped once.


```rust
struct Bar {
    x: i32,
}

struct Foo {
    bar: Bar,
}

fn main() {
    let foo = Foo { bar: Bar { x: 42 } };
    println!("{}", foo.bar.x);
    // foo is dropped first
    // then foo.bar is dropped
}

```



## Moving Ownership
When an owner is passed as an argument to a function, ownership is moved
to the function parameter.

After a **move** the variable in the original function can no longer be used.

Memory details:
- During a **move** the stack memory of the owners value is copied to the function call's parameter stack memory.


```rust
struct Foo {
    x: i32,
}

fn do_something(f: Foo) {
    println!("{}", f.x);
    // f is dropped here
}

fn main() {
    let foo = Foo { x: 42 };
    // foo is moved to do_something
    do_something(foo);
    // foo can no longer be used
}

```


## Returning Ownership
Ownership can also be returned from a function.


```rust
struct Foo {
    x: i32,
}

fn do_something() -> Foo {
    Foo { x: 42 }
    // ownership is moved out
}

fn main() {
    let foo = do_something();
    // foo becomes the owner
    // foo is dropped because of end of function scope
}

```



## Borrowing Ownership with References
References allow us borrow access to a resource with the `&` operator.

References are also dropped like other resources.


```rust
struct Foo {
    x: i32,
}

fn main() {
    let foo = Foo { x: 42 };
    let f = &foo;
    println!("{}", f.x);
    // f is dropped here
    // foo is dropped here
}

```


## Borrowing Mutable Ownership with References
We can also borrow mutable access to a resource with the `&mut` operator.

A resource owner cannot be moved or modified while mutably borrowed.

Memory detail:
- Rust prevents having two ways to mutate an owned value because it introduces the possibility of a data race.


```rust
struct Foo {
    x: i32,
}

fn do_something(f: Foo) {
    println!("{}", f.x);
    // f is dropped here
}

fn main() {
    let mut foo = Foo { x: 42 };
    let f = &mut foo;

    // FAILURE: do_something(foo) would fail because
    // foo cannot be moved while mutably borrowed

    // FAILURE: foo.x = 13; would fail here because
    // foo is not modifiable while mutably borrowed

    f.x = 13;
    // f is dropped here because it's no longer used after this point
    
    println!("{}", foo.x);
    
    // this works now because all mutable references were dropped
    foo.x = 7;
    
    // move foo's ownership to a function
    do_something(foo);
}

```


## Dereferencing
Using `&mut` references, you can set the owner's value using the `*` operator.

You can also get a copy of an owned value using the `*` operator
(if the value can be copied - we will discuss copyable types in later chapters).


```rust
fn main() {
    let mut foo = 42;
    let f = &mut foo;
    let bar = *f; // get a copy of the owner's value
    *f = 13;      // set the reference's owner's value
    println!("{}", bar);
    println!("{}", foo);
}

```



## Accessing After Borowing
No many how many references are passed from the borowed variable,
its value can be accessed without having to dereference it.

```rust
fn main() {
    let x: u32 = 14;
    let mut y: &&&u32 = &&&x;
    println!("{} = {}", x, y);
}

```



## Passing Around Borrowed Data
Rust's rules for references might best be summarized by:
- Rust only allows there to be one mutable reference **or** multiple non-mutable references **but not both**.
- A reference must never **live longer** than its owner.

This doesn't tend to be a problem when passing around references to functions.

Memory details:
- The first rule of references prevents data races. What's a data race? A data race when reading from data has the possibility of being out of sync due to the existence of a writer to the data at the same time. This happens often in multi-threaded programming.
- The second rule of references prevents the misuse of references that refer to non-existent data (called dangling pointers in C).


```rust
struct Foo {
    x: i32,
}

fn do_something(f: &mut Foo) {
    f.x += 1;
    // mutable reference f is dropped here
}

fn main() {
    let mut foo = Foo { x: 42 };
    do_something(&mut foo);
    // because all mutable references are dropped within
    // the function do_something, we can create another.
    do_something(&mut foo);
    // foo is dropped here
}

```




## References Of References
References can even be used on pieces of references.

```rust
struct Foo {
    x: i32,
}

fn do_something(a: &Foo) -> &i32 {
    return &a.x;
}

fn main() {
    let mut foo = Foo { x: 42 };
    let x = &mut foo.x;
    *x = 13;
    // x is dropped here allow us to create a non-mutable reference
    let y = do_something(&foo);
    println!("{}", y);
    // y is dropped here
    // foo is dropped here
}

```



## Explicit Lifetimes
Even though Rust doesn't always show it in code, the compiler understands 
the lifetime of every variable and will attempt to validate that a 
reference never exists longer than its owner.

Functions can be explicit by parameterizing the function signature with 
symbols that help identify which parameters and return values share the 
same lifetime.

Lifetime specifiers always start with a ' (e.g. `'a`, `'b`, `'c`)


```rust
struct Foo {
    x: i32,
}

// the parameter foo and return value share the same lifetime
fn do_something<'a>(foo: &'a Foo) -> &'a i32 {
    return &foo.x;
}

fn main() {
    let mut foo = Foo { x: 42 };
    let x = &mut foo.x;
    *x = 13;
    // x is dropped here, allowing us to create a non-mutable reference
    let y = do_something(&foo);
    println!("{}", y);
    // y is dropped here
    // foo is dropped here
}

```



## Multiple Lifetimes
Lifetime specifiers allow us to be explicit with certain scenarios the 
compiler cannot resolve itself by distinguishing all of a function 
signature component's lifetimes.


```rust
struct Foo {
    x: i32,
}

// foo_b and the return value share the same lifetime
// foo_a has an unrelated lifetime
fn do_something<'a, 'b>(foo_a: &'a Foo, foo_b: &'b Foo) -> &'b i32 {
    println!("{}", foo_a.x);
    println!("{}", foo_b.x);
    return &foo_b.x;
}

fn main() {
    let foo_a = Foo { x: 42 };
    let foo_b = Foo { x: 12 };
    let x = do_something(&foo_a, &foo_b);
    // foo_a is dropped here because only foo_b's lifetime exist beyond here
    println!("{}", x);
    // x is dropped here
    // foo_b is dropped here
}

```





## Static Lifetimes
A **static** variable is a memory resource created at compile-time that 
exists through a program start to finish. They must have their types 
explicitly specified.

A **static lifetime** is a memory resource that lasts indefinitely to the 
end of a program. Note that by this definition some static lifetime 
resources can be created at runtime.

Resources with static lifetimes have a special lifetime specifier `'static`.

`'static` resources will never drop.

If static lifetime resources contain references they must all be `'static` 
(anything less would not live long enough).

Memory detail:

- Modifying static variables is inherently dangerous because they are globally accessible to be read from by anyone introducing the possibility of a data race. We'll talk about the challenges of global data later.
- Rust allows the use of `unsafe { ... }` blocks to perform some operations that the compiler cannot make memory guarantees about. The R̸͉̟͈͔̄͛̾̇͜U̶͓͖͋̅Ṡ̴͉͇̃̉̀T̵̻̻͔̟͉́͆Ơ̷̥̟̳̓͝N̶̨̼̹̲͛Ö̵̝͉̖̏̾̔M̶̡̠̺̠̐͜Î̷̛͓̣̃̐̏C̸̥̤̭̏͛̎͜O̶̧͚͖͔̊͗̇͠N̸͇̰̏̏̽̃ should not be talked about casually.


```rust
static PI: f64 = 3.1415;

fn main() {
    // static variables can also be scoped to a function
    static mut SECRET: &'static str = "swordfish";

    // string literals have a 'static lifetime
    let msg: &'static str = "Hello World!";
    let p: &'static f64 = &PI;
    println!("{} {}", msg, p);

    // You can break some rules, but you must be explicit
    unsafe {
        // we can set SECRET to a string literal because it is also `static
        SECRET = "abracadabra";
        println!("{}", SECRET);
    }
}

```



## Lifetimes In Data Types
Similarly to functions, data types can be parameterized with lifetime 
specifiers of its members.

Rust validates that the containing data structure of the references never 
lasts longer than the owners its references point to.

We can't have structs running around with references pointing to 
nothingness!

```rust
struct Foo<'a> {
    i:&'a i32
}

fn main() {
    let x = 42;
    let foo = Foo {
        i: &x
    };
    println!("{}",foo.i);
}

```




# Chapter 5 - Conclusion
Whew, congrats for making it through! I know it's a lot to take in, but you 
are well under way to becoming a Rustacean. Hopefully it's clear how Rust 
as a language aims to solve many of these common challenges in systems 
programming:

- Unintentional modification of resources
- Forgetting to deconstruct resources
- Resources accidentally being deconstructed twice
- Using resources after they have been deconstructed
- Data races caused by writing to resources while others are reading from resources
- Seeing clearly areas of the code where the compiler can’t make guarantees

In the next chapter we'll apply some of this knowledge as we look at how Rust handles text.


# Chapter 6 - Text
Now that we understand a bit how Rust thinks of memory, we are prepared to 
talk about text in more detail. Rust cares a great deal about international 
text and byte level concerns you might not be familiar with from other 
languages. That said, Rust has many great tools for managing those concerns.



## String Literals
String literals are always Unicode.

String literals type are `&'static str`:

- `&` meaning that it's referring to a place in memory, and it lacks a `&mut` meaning that the compiler will not allow modification
- `'static` meaning the string data will be available till the end of our program (it never drops)
- `str` means that it points to a sequence of bytes that are always valid **utf-8**

Memory details:
- The Rust compiler will likely put your string in the data segment of your program memory



```rust
fn main() {
    let a: &'static str = "hi 🦀";
    println!("{} {}", a, a.len());
}

```


## What is utf-8
As more languages were used on computers, the world needed to represent 
more text characters than ASCII allowed (1 byte only allowed 256 
characters).

**utf-8** was introduced with a variable byte length of 1-4 bytes greatly 
increasing the range of possible characters.

An advantage of variable sized characters is text did not have unnecessary 
bytes for very common ASCII (only requiring 1 byte still in **utf-8**).

A downside of variable sized characters is that character lookup can no 
longer be done quickly (**O(1)** constant time) with a simple indexing 
(e.g. `my_text[3]` to get the 4th character). It's possible that the 
preceding characters could have variable widths, altering where the 4th 
character actually begins in the sequence of bytes.

Instead we must iterate through a **utf-8** byte sequence to understand 
where the Unicode characters actually begin (**O(n)** linear time).

Ferris: "I'm mostly just happy to have **utf-8** for representing emojis of 
my underwater friends."

🐠🐙🐟🐬🐋


## Escaping Characters
It's challenging to visually represent certain characters,
so **escape codes** allow us to put a symbol in their place.

Rust supports the common escape codes from C-based languages:
- `\n` - newline
- `\r` - carriage return
- `\t` - tab
- `\\` - backslash
- `\0` - null
- `\'` - single-quote

The complete list exists [https://doc.rust-lang.org/reference/tokens.html](here).

```rust
fn main() {
    let a: &'static str = "Ferris says:\t\"hello\"";
    println!("{}",a);
}

```


## Multi-line String Literals
Rust strings are multiline by default.

Use a `\` at the end of a line if you don't want a line break.

```rust
fn main() {
    let haiku: &'static str = "
        I write, erase, rewrite
        Erase again, and then
        A poppy blooms.
        - Tachibana Hokushi";
    println!("{}", haiku);
    
    
    println!("hello \
    world") // notice that the spacing before w is ignored
}

```


## Raw String Literals
Raw strings allow us to write a sequence of characters verbatim by starting with `r#"` and ending with `"#`. It lets us insert characters that might 
otherwise confuse a normal string as literals (like double quotes and 
backslashes).

```rust
fn main() {
    let a: &'static str = r#"
        <div class="advice">
            Raw strings are useful for some situations.
        </div>
        "#;
    println!("{}", a);
}

```


## String Literals From Files
If you have some very large text, consider using the macro `include_str!` 
to include text from local files in your program:

```
let hello_html = include_str!("hello.html");
```


## String Slice
A string slice is a reference to a sequence of bytes in memory that must 
always be valid **utf-8**.

A string slice (a sub-slice) of a `str` slice, must also be valid utf-8.

Common methods of &str`:
- `len` gets the length of the string literal in bytes (not number of characters).
- `starts_with`/`ends_with` for basic testing.
- `is_empty` returns true if zero length.
- `find` returns an `Option<usize>` of the first position of some text.


```rust
fn main() {
    let a = "hi 🦀";
    println!("{}", a.len());
    let first_word = &a[0..2];
    let second_word = &a[3..7];
    // let half_crab = &a[3..5]; FAILS
    // Rust does not accept slices of invalid unicode characters
    println!("{} {}", first_word, second_word);
}

```


## Chars
With so much difficulty in working with Unicode, Rust offers a way to 
retrieve a sequence of utf-8 bytes as a vector of characters of type `char`.

A `char is always 4 bytes long (allowing for efficient lookup of individual characters).

```rust
fn main() {
    // collect the characters as a vector of char
    let chars = "hi 🦀".chars().collect::<Vec<char>>();
    println!("{}", chars.len()); // should be 4
    // since chars are 4 bytes we can convert to u32
    println!("{}", chars[3] as u32);
}

```


## String
A `String` is a struct that owns a sequence of utf-8 bytes in heap memory.

Because its memory is on the heap, it can be extended, modified, etc. in ways string literals cannot.

Common methods:
- `push_str` to add more utf-8 bytes to the end of a string.
- `replace` to replace sequences of utf-8 bytes with others.
- `to_lowercase`/`to_uppercase` for case changes.
- `trim` for trimming space

When a String is dropped, its heap memory is also dropped.

`String` has a `+` operator that extends the string with a `&str`
and returns itself, but it might not be as ergonomic as you hope for.


```rust
fn main() {
    let mut helloworld = String::from("hello");
    helloworld.push_str(" world");
    helloworld = helloworld + "!";
    println!("{}", helloworld);
}

```


## Text As Function Parameters
String literals and strings are generally passed around as a string slice 
to functions. This offers a lot of flexibility for most scenarios where you 
don't actually have to pass ownership.


```rust
fn say_it_loud(msg:&str){
    println!("{}!!!",msg.to_string().to_uppercase());
}

fn main() {
    // say_it_loud can borrow &'static str as a &str
    say_it_loud("hello");
    // say_it_loud can also borrow String as a &str
    say_it_loud(&String::from("goodbye"));
}

```


## Building Strings
`concat` and `join` are two simple but powerful ways for building strings.


```rust
fn main() {
    let helloworld = ["hello", " ", "world", "!"].concat();
    let abc = ["a", "b", "c"].join(",");
    println!("{}", helloworld);
    println!("{}",abc);
}

```


## Formatting Strings
The `format!` macro allows us to create a string by defining a 
parameterized string with placeholders for where and how values should be 
placed (e.g. `{}`).

`format!` uses the same parameterized strings as `println!`.

The capabilities of this function are too large of scope for *Tour of Rust*
; check out the documentation [https://doc.rust-lang.org/std/fmt/](here).

```rust
fn main() {
    let a = 42;
    let f = format!("secret to life: {}",a);
    println!("{}",f);
    println!("Hello {:2$}!", "x", 5);
}

```


## Converting Strings
Many types can be converted to a string using `to_string`.

The generic function `parse` can be used to convert strings or string 
literals into a typed value. This function returns a `Result` because it could fail.


```rust
fn main() -> Result<(), std::num::ParseIntError> {
    let a = 42;
    let a_string = a.to_string();
    let b = a_string.parse::<i32>()?;
    println!("{} {}", a, b);
    Ok(())
}

```



# Chapter 6 - Conclusion
Now you know the basics of text! As you have seen, Unicode makes working 
with text a bit tricky, but the standard library has plenty of 
functionality to make it easy to manage.

Up to now, we've mostly looked at Rust from the lens of a procedural 
paradigm (i.e. just functions and data), but it's time we now talk about 
traits and the capabilities unlocked by Rust's object oriented paradigm.



# Chapter 7 - Object Oriented Programming
Expressing ideas with functions is a proven way of representing behavior 
and data (C has been doing it for decades!). Historically, computer science 
has found other useful expressive aggregations and abstractions for data. 
You may be familiar with object oriented programming (OOP) as one such way. 
In this chapter we'll explore the Rust programming language beyond 
functions.


## What Is OOP?
Object oriented programming roughly refers to programming languages that 
have a number of iconic features:
- `Encapsulation` - Associating data and functions into the conceptual unit of a single type called an object.
- `Abstraction` - Hiding data and function members to obfuscate implementation details of an object.
- `Polymorphism` - The ability to interact with objects of different types through one interface.
- `Inheritance` - The ability to inherit data and behavior from other objects.



## Rust Is Not OOP
Rust lacks inheritance of data and behavior in any meaningful way.
- Structs cannot inherit fields from a parent struct.
- Structs cannot inherit functions from a parent struct.

That said, Rust implements many programming language features, so that you 
might not mind this lacking.


## Encapsulation With Methods
Rust supports the concept of an object that is a struct associated with 
some functions (also known as *methods*).

The first parameter of any method must be a reference to the instance associated with the method call (e.g. `instanceOfObj.foo()`). Rust uses:
- `&self` - Immutable reference to the instance.
- `&mut self` - Mutable reference to the instance.

Methods are defined within an implementation block with keyword impl:
```
impl MyStruct { 
    ...
    fn foo(&self) {
        ...
    }
}
```


```rust
struct SeaCreature {
    noise: String,
}

impl SeaCreature {
    fn get_sound(&self) -> &str {
        &self.noise
    }
}

fn main() {
    let creature = SeaCreature {
        noise: String::from("blub"),
    };
    println!("{}", creature.get_sound());
}

```




## self and Self
In Rust, `self` and `Self` are fundamental concepts in ownership and
borrowing system. Both of them are used in `impl` and `trait` blocks.

`self`:
- refers to an **instance of struct**
- reference to itself
- is the first parameter of the method
- method conataining the `self` parameter are called using the name of the instance, the operator `.` and the name of the method


`Self`:
- refers to **return type** of the method
- has the same data type as the `struct` that is implemented in a `impl` block
- can be used for static method using the operator `::` (static method do not depend on a instance of a struct and a static method does not contain `self` as parameter) 


```rust
struct Coordinates {
    x: i32,
    y: i32,
}

impl Coordinates {
    // the return value, Self, has the data type as the implemented struct 
    // this method is static
    fn new(xval: i32, yval: i32) -> Self {
        return Coordinates {
            x: xval,
            y: yval,
        }
    }
    
    fn setx(&mut self, xval: i32) {
        self.x = xval;
    }
    
    fn sety(&mut self, yval: i32) {
        self.y = yval;
    }
    
    fn disp(&self) {
        println!("Point located at : {} on OX  {} on OY",
                self.x, self.y);
    }
    
}

fn main() {
    let mut p = Coordinates::new(-1i32, 1i32);
    p.disp();
    p.setx(10  as i32);
    p.sety(-10 as i32);
    p.disp();
}

```




## Defining a macro
We talked before that we can use `macros` to simplify abstractions of our code.

Let us define a `macro` that has the functionality of a copy constructor 
for a struct.

Notice that we group the macro's parameters using either `()` or `[]`.

The choice between using `()` and `[]` for `macro` invocations in Rust 
often depends on the expected syntax and visual aesthetics. While `()` is more commonly associated with function calls and grouping expressions, `[]` is often associated with array indexing or indexing-like operations.



```
struct Coordinates {
    x: i32,
    y: i32,
}

impl Coordinates {
    // original copy constructor, a static method
    fn new(xval: i32, yval: i32) -> Self {
        Coordinates { x: xval, y: yval }
    }
}

impl Coordinates {
    fn disp(&self) {
        println!("Point located at: {} on OX, {} on OY", self.x, self.y);
    }
}

// the coord! macro
macro_rules! coord {
    ($x:expr, $y:expr) => {
        Coordinates::new($x, $y)
    };
}

fn main() {
    // Use the coord! macro to create a new Coordinates instance
    let p1: Coordinates = coord!(1, 2);

    // Alternatively, you can use the coord! macro with square brackets
    let p2 = coord![2, 2];
    
    let p3 = Coordinates {
        x: 10i32,
        y: 11 as i32,
    };
    
    let p4 = Coordinates::new(-10, 11);

    p1.disp();
    p2.disp();
    p3.disp();
    p4.disp();
}

```


## Abstraction With Selective Exposure
Rust can hide the inner workings of objects.

By default fields and methods are accessible only to the module they belong to.

The `pub` keyword exposes struct fields and methods outside of the module.


```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    println!("{}", creature.get_sound());
}

```



## Polymorphism With Traits
Rust supports polymorphism with traits. Traits allow us to associate a set 
of methods with a struct type.

We first define the signatures of methods of a trait within:


```
trait MyTrait {
    fn foo(&self);
    ...
}
```

When a struct implements a trait, it establishes a contract that allows us 
to indirectly interact with the struct through the trait type
(e.g. `&dyn MyTrait`) without having to know the real type.

A struct's implemented traits methods are defined within an implementation block:

```
impl MyTrait for MyStruct { 
    fn foo(&self) {
        ...
    }
    ... 
}
```



```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    creature.make_noise();
}

```


## Implemented Methods On Traits
Traits can have implemented methods.

The functions have no direct access to the inner fields of a struct, but it 
can be useful for sharing behavior between many trait implementors.


```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
    
    fn make_alot_of_noise(&self){
        self.make_noise();
        self.make_noise();
        self.make_noise();
    }
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    creature.make_alot_of_noise();
}

```



## Trait Inheritance
Traits can inherit methods from other traits.


```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
}

trait LoudNoiseMaker: NoiseMaker {
    fn make_alot_of_noise(&self) {
        self.make_noise();
        self.make_noise();
        self.make_noise();
    }
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

impl LoudNoiseMaker for SeaCreature {}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    creature.make_alot_of_noise();
}

```


## Dynamic vs Static Dispatch
Methods are executed in two ways:
- static dispatch - When the instance type is known, we have direct knowledge of what function to call.
- dynamic dispatch - When an instance type is not known, we must find out some way of calling the correct function.

Trait types `&dyn MyTrait` give us the ability to work with instances of 
objects indirectly using dynamic dispatch.

When dynamic dispatch is used, Rust will encourage you to put `dyn` before 
your trait type so people are aware.

Memory details:
- Dynamic dispatch is slightly slower because of the pointer chasing to find the real function call.


```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

fn static_make_noise(creature: &SeaCreature) {
    // we know the real type
    creature.make_noise();
}

fn dynamic_make_noise(noise_maker: &dyn NoiseMaker) {
    // we don't know the real type
    noise_maker.make_noise();
}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    static_make_noise(&creature);
    dynamic_make_noise(&creature);
}

```


## Trait Objects
When we pass an instance of an object to a parameter of type `&dyn MyTrait` 
we pass what is called a *trait object*.

A trait object is what allows us to indirectly call the correct methods of 
an instance. A trait object is a struct that holds the pointer of our 
instance with a list of function pointers to our instance's methods.

Memory details:
- This list of functions is known in C++ as a *vtable*.


## Handling Unsized Data
Traits introduce an interesting challenge when we want to store them within 
another struct. Traits obfuscate the original struct thus it also 
obfuscates the original size. Unsized values being stored in structs are 
handled in two ways in Rust:
- `generics` - Using parameterized types effectively create struct/functions known types and thus known sizes.
- `indirection` - Putting instances on the heap gives us a level of indirection that allow us to not have to worry about the size of the actual type and just store a pointer to it. There are other ways as well!


## Generic Functions
Generics in Rust work hand in hand with traits. When we describe a 
parameterized type `T` we can constrain what types can be used as an argument by listing what required traits the argument must implement.

In this example type `T` must implement trait `Foo`:

```
fn my_function<T>(foo: T)
where
    T:Foo
{
    ...
}
```

By using generics we create static typed functions at compile time that 
will have known types and sizes, allowing us to perform static dispatch and 
store as a sized value.


```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

fn generic_make_noise<T>(creature: &T)
where
    T: NoiseMaker,
{
    // we know the real type at compile-time
    creature.make_noise();
}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    generic_make_noise(&creature);
}

```


## Generic Function Shorthand
Rust has a shorthand for expressing generics constrained by a trait:

```
fn my_function(foo: impl Foo) {
    ...
}
```

This is equivalent to writing:

```
fn my_function<T>(foo: T)
where
    T:Foo
{
    ...
}
```



```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

fn generic_make_noise(creature: &impl NoiseMaker)
{
    // we know the real type at compile-time
    creature.make_noise();
}

fn main() {
    let creature = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    generic_make_noise(&creature);
}

```



## Box
`Box` is a data structure that allows us to move our data from the stack to the heap.

`Box` is a struct known as a smart pointer that holds the pointer to our data on the heap.

Because `Box` is a struct with a known size (because it just holds a pointer), it is often used as a way to store a reference to something in a struct that must know the size of its fields.

`Box` is so common it can be used from anywhere:

```
Box::new(Foo { ... })
```


```rust
struct SeaCreature {
    pub name: String,
    noise: String,
}

impl SeaCreature {
    pub fn get_sound(&self) -> &str {
        &self.noise
    }
}

trait NoiseMaker {
    fn make_noise(&self);
}

impl NoiseMaker for SeaCreature {
    fn make_noise(&self) {
        println!("{}", &self.get_sound());
    }
}

struct Ocean {
    animals: Vec<Box<dyn NoiseMaker>>,
}

fn main() {
    let ferris = SeaCreature {
        name: String::from("Ferris"),
        noise: String::from("blub"),
    };
    let sarah = SeaCreature {
        name: String::from("Sarah"),
        noise: String::from("swish"),
    };
    let ocean = Ocean {
        animals: vec![Box::new(ferris), Box::new(sarah)],
    };
    for a in ocean.animals.iter() {
        a.make_noise();
    }
}

```



## Generic Structs Revisited
Generic structs can also have their parameterized types constrained by traits.

```
struct MyStruct<T>
where
    T: MyTrait
{
    foo: T
    ...
}
```

Generic structs have their parameterized type in their implementation blocks:
```
impl<T> MyStruct<T> {
    ...
}
```




# Chapter 7 - Conclusion
We now have more language features at hand to represent our ideas clearly! Rust abstractions might be simple but they are powerful enough to make working with code a joy. In this chapter, we caught a glimpse of smart pointers with `Box`. In the next chapter we'll learn about how smart pointers can help us with other specialized memory situations.

Resources:
- Video - [https://www.youtube.com/watch?v=pTB0EiLXUC8](Object-oriented Programming in 7 minutes)
- Article - [https://dpc.pw/the-faster-you-unlearn-oop-the-better-for-you-and-your-software]("The faster you unlearn OOP, the better for you and your software")



# Chapter 8 - Smart Pointers
In this chapter we will demystify smart pointers. Let's explore into these data structures that let us interact with the lowest level of memory.

Ferris says: "Don't feel overwhelmed by this chapter if you don't feel you 
can write your own low level memory management code in one short read. This 
chapter is mostly to introduce you to some useful tools and give a glimpse 
at how they work!"


# References Revisited
A reference is fundamentally just a number that is the start position of 
some bytes in memory. Its only purpose is to represent the concept of where 
data of a specific type exists. What makes a reference different from just 
a number is that Rust will validate the lifetime of references doesn't last 
longer than what it refers to (otherwise we'd get an error when we used it!).


## What is a pointer?
A pointer is a variable.

Each variable:
- has a name
- has a data type
- has an address (in the RAM memory)
- stores an value

Why do use data types?

By using data types, we basically tell the CPU how much memory to 
allocate for the variables we declare. For instance, the compiler 
allocates 8 bytes for each `i8` and `u8` variable. Without pointers, a variables stores a `value`.

You've seen `u16`, `f64`, `usize`. These are data types.
So are `&i32`, `&&i32` `&&&i32` and so on.

The same logic applies to pointers. A pointer is a data type itself and 
when we use pointer, the variables stores the `address` of the variable 
instead of `value`. For pointer, the stored `value` is an `address`.


| variable name | data type | address | stored value    |
| ------------- | --------- | ------- | --------------- |
|      a        |    i32    |  0x100  |      12         |
|    b = &a     |   &i32    |  0x132  |    0x100 (addr) |
|    c = &b     |  &&i32    |  0x2a1  |    0x132 (addr) |
|    d = &c     | &&&i32    |  0x712  |    0x201 (addr) |

All variables `i32`, `&i32`, `&&i32`, `&&&i32` are 32-bit variable.

`i32`      -> stores a concrete value
`&...&i32` -> stores an address


However, when you try to print references (like `&i32`, `&&i32`, `&&&i32`), 
Rust automatically `dereferences` them when using the `{}` format specifier in a `println!` `macro`. This means that the `values` themselves are 
printed, not their `addresses`.



```rust
fn main() {
    let a: i32 = 12i32;
    let b: &i32 = &a;   // pointer to i32
    let c: &&i32 = &b;  // pointer to pointer to i32
    let d: &&&i32 = &c;	// pointer to pointer to pointer to i32
    
    println!("{} {} {} {}", a, b, c, d);
    println!("{} {} {} {}", a, *b, **c, ***d);
}

```

## Raw Pointers
References can be converted into a more primitive type called a raw pointer. Much like a number, it can be copied and moved around with little restriction. Rust makes no assurances of the validity of the memory location it points to.

Two kinds of raw pointers exist:
- `*const T` - A raw pointer to data of type T that should never change.
- `*mut T` - A raw pointer to data of type T that can change.

Raw pointers can be converted to and from numbers (e.g. `usize`).

Raw pointers can access data with unsafe code (more on this later).

Memory Details:
- A reference in Rust is very similar to a pointer in C in terms of usage, but with much more compile time restrictions on how it can be stored and moved around to other functions.
- A raw pointer in Rust is similar to a pointer in C that it represents a number that can be copied or passed around, and even turned into numerical types where it can be modified as a number to do pointer math.


```rust
fn main() {
    let a = 42;
    let memory_location = &a as *const i32 as usize;
    println!("Data is here {}", memory_location);
}

```



## Dereferencing
The process of accessing/manipulating data that is being referred to by a 
reference (i.e. `&i32`) is called *dereferencing*.

References are used to access/manipulate data in two ways:
- Access to the referred data during assignment of variables.
- Access to fields or methods of the referred data.

Rust has some powerful operators that allow us to do this.

## The * Operator
The * operator is an explicit way to dereference a reference.

```
let a: i32 = 42;
let ref_ref_ref_a: &&&i32 = &&&a;
let ref_a: &i32 = **ref_ref_ref_a;
let b: i32 = *ref_a;
```

Memory detail:
- Because i32 is a primitive type that implements the `Copy` trait, the bytes of variable `a` on stack are copied into the bytes of variable `b`.


## The . Operator
The `.` operator is used in accessing fields and methods of a reference.
It works a bit more subtly.

```
let f = Foo { value: 42 };
let ref_ref_ref_f = &&&f;
println!("{}", ref_ref_ref_f.value);
```

Whoa, why didn't we need to add `***` before `ref_ref_ref_f`?
This is because the `.` operator automatically dereferences a sequence of references.
That last line is turned into the following by the compiler automatically.

```
println!("{}", (***ref_ref_ref_f).value);
```


```rust
struct Foo {
    value: i32
}

fn main() {
    let f = Foo { value: 42 };
    let ref_ref_ref_f = &&&f;
    println!("{}", ref_ref_ref_f.value);
}

```



## Smart Pointers
In addition to the ability to create references to existing typed data 
using the `&` operator, Rust gives us the ability to create
*reference-like* structs called **smart pointers**.

We can think of references at a high level as a type that gives us access 
to another type. Smart pointers are different in their behavior from normal 
references in that they operate based on internal logic that a programmer 
writes. You — the programmer — are the *smart* part.

Typically smart pointers implement `Deref`, `DerefMut`, and `Drop`
traits to specify the logic of what should happen when the structure is dereferenced with `*` and `.` operators.



```rust
use std::ops::Deref;
struct TattleTell<T> {
    value: T,
}
impl<T> Deref for TattleTell<T> {
    type Target = T;
    fn deref(&self) -> &T {
        println!("{} was used!", std::any::type_name::<T>());
        &self.value
    }
}
fn main() {
    let foo = TattleTell {
        value: "secret message",
    };
    // dereference occurs here immediately 
    // after foo is auto-referenced for the
    // function `len`
    println!("{}", foo.len());
}

```



## Smart Unsafe Code
Smart pointers tend to use *unsafe* code fairly often. As mentioned 
earlier, they are common tools for interacting with the lowest levels of 
memory in Rust.

What is an unsafe code? Unsafe code behaves exactly like normal Rust with 
the exception of a few abilities that the Rust compiler is unable to make 
guarantees about.

A primary ability of unsafe code is *dereferencing a raw pointer*.
That means taking a *raw pointer* to a position in memory and declaring "a 
data structure exists here!" and turning it into a representation of data 
you can use (i.e. `*const u8` into `u8`). Rust has no way to keep track of 
the meaning of every byte that gets written to memory. Because Rust can't 
make guarantees about what exists at an arbitrary number used as a raw pointer, it puts the dereference in an `unsafe { ... }` block.

Smart pointers *dereference raw pointers* extensively, but they are well 
proven in what they do.


```rust
fn main() {
    let a: [u8; 4] = [86, 14, 73, 64];
    // this is a raw pointer. Getting the memory address
    // of something as a number is totally safe
    let pointer_a = &a as *const u8 as usize;
    println!("Data memory location: {}", pointer_a);
    // Turning our number into a raw pointer to a f32 is
    // also safe to do.
    let pointer_b = pointer_a as *const f32;
    let b = unsafe {
        // This is unsafe because we are telling the compiler
        // to assume our pointer is a valid f32 and
        // dereference it's value into the variable b.
        // Rust has no way to verify this assumption is true.
        *pointer_b
    };
    println!("I swear this is a pie! {}", b);
}

```



## Familiar Friends
Consider some smart pointers we've already seen like `Vec<T>` and `String`.

`Vec<T>` is a smart pointer that just owns some memory region of bytes. The 
Rust compiler has no idea what exists in these bytes. The smart pointer 
interprets what it means to grab items from the region of memory it 
manages, keeps track of where data structures within those bytes begin and 
end, and then finally dereferences a raw pointer into data structures into 
a nice clean ergonomic interface for us to use (e.g. `my_vec[3]`).

Similarly, `String` keeps track of a memory region of bytes, and 
programmatically restricts content written to it to always be valid `utf-8` 
and helps dereference that memory region into a type `&str`.

Both these datastructures use unsafe dereferencing of raw pointers to do their job.

Memory details:
- Rust has an equivalent of C's `malloc` using [https://doc.rust-lang.org/std/alloc/fn.alloc.html](alloc) and [https://doc.rust-lang.org/std/alloc/struct.Layout.html](Layout) for getting ahold of your own memory regions to manage.



```rust
use std::alloc::{alloc, Layout};
use std::ops::Deref;

struct Pie {
    secret_recipe: usize,
}

impl Pie {
    fn new() -> Self {
        // let's ask for 4 bytes
        let layout = Layout::from_size_align(4, 1).unwrap();

        unsafe {
            // allocate and save the memory location as a number
            let ptr = alloc(layout) as *mut u8;
            // use pointer math and write a few 
            // u8 values to memory
            ptr.write(86);
            ptr.add(1).write(14);
            ptr.add(2).write(73);
            ptr.add(3).write(64);

            Pie { secret_recipe: ptr as usize }
        }
    }
}
impl Deref for Pie {
    type Target = f32;
    fn deref(&self) -> &f32 {
        // interpret secret_recipe pointer as a f32 raw pointer
        let pointer = self.secret_recipe as *const f32;
        // dereference it into a return value &f32
        unsafe { &*pointer }
    }
}
fn main() {
    let p = Pie::new();
    // "make a pie" by dereferencing our 
    // Pie struct smart pointer
    println!("{:?}", *p);
}

```




## Heap Allocated Memory
`Box` is a smart pointer that lets us move data from the stack to the heap.

Dereferencing it lets us use the heap allocated data ergonomically as if it 
were the original type.


```rust
struct Pie;

impl Pie {
    fn eat(&self) {
        println!("tastes better on the heap!")
    }
}

fn main() {
    let heap_pie = Box::new(Pie);
    heap_pie.eat();
}

```



## Failable Main Revisited
Rust code may have a plethora of representations of errors, but the 
standard library has a universal trait `std::error::Error`
for describing errors.

Using a smart pointer `Box` we can use the type
`Box<dyn std::error::Error>` as a common type for returning errors because 
it allows us to propagate up an error on the heap and interact with it at a 
high level without having to know a specific type.

Early in Tour of Rust we learned that `main` can return an error. We can 
now return a type capable of describing almost any kind of error that might 
occur in our program so long as the error's data structure implements Rust's common `Error` trait.



```
fn main() -> Result<(), Box<dyn std::error:Error>>
```



```rust
use std::fmt::Display;
use std::error::Error;

struct Pie;

#[derive(Debug)]
struct NotFreshError;

impl Display for NotFreshError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "This pie is not fresh!")
    }
}

impl Error for NotFreshError {}

impl Pie {
    fn eat(&self) -> Result<(), Box<dyn Error>> {
        Err(Box::new(NotFreshError))
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let heap_pie = Box::new(Pie);
    heap_pie.eat()?;
    Ok(())
}

```



## Referencing Counting
`Rc` is a smart pointer that moves data from the stack onto the heap. It 
allows us to clone other `Rc` smart pointers that all have the ability to 
immutably borrow the data that was put on the heap.

Only when the last smart pointer is dropped does the data on the heap 
become deallocated.


```rust
use std::rc::Rc;

struct Pie;

impl Pie {
    fn eat(&self) {
        println!("tastes better on the heap!")
    }
}

fn main() {
    let heap_pie = Rc::new(Pie);
    let heap_pie2 = heap_pie.clone();
    let heap_pie3 = heap_pie2.clone();

    heap_pie3.eat();
    heap_pie2.eat();
    heap_pie.eat();

    // all reference count smart pointers are dropped now
    // the heap data Pie finally deallocates
}

```




## Sharing Access
`RefCell` is a container data structure commonly held by smart pointers 
that takes in data and lets us borrow mutable and immutable references to 
what's inside. It prevents borrowing from being abused by enforcing Rust's 
memory safety rules at runtime when you ask to borrow the data within:

**Only one mutable reference OR multiple immutable references, but not both!**

If you violate these rules `RefCell` will panic.


```rust
use std::cell::RefCell;

struct Pie {
    slices: u8
}

impl Pie {
    fn eat(&mut self) {
        println!("tastes better on the heap!");
        self.slices -= 1;
    }
}

fn main() {
    // RefCell validates memory safety at runtime
    // notice: pie_cell is not mut!
    let pie_cell = RefCell::new(Pie{slices:8});
    
    {
        // but we can borrow mutable references!
        let mut mut_ref_pie = pie_cell.borrow_mut();
        mut_ref_pie.eat();
        mut_ref_pie.eat();
        
        // mut_ref_pie is dropped at end of scope
    }
    
    // now we can borrow immutably once our mutable reference drops
     let ref_pie = pie_cell.borrow();
     println!("{} slices left",ref_pie.slices);
}

```




## Sharing Across Threads
`Mutex` is a container data structure commonly held by smart pointers that 
takes in data and lets us borrow mutable and immutable references to the 
data within. This prevents borrowing from being abused by having the 
operating system restrict only one CPU thread at time to have access to the 
data, blocking other threads until that original thread is done with its 
locked borrow.

Multithreading is beyond the scope of Tour of Rust, but `Mutex` is a 
fundamental part of orchestrating multiple CPU threads accessing the same 
data.

There is a special smart pointer `Arc` which is identical to `Rc` except 
uses thread-safe incrementing of reference counts. It's often used to have many references to the same `Mutex`.




```rust
use std::sync::Mutex;

struct Pie;

impl Pie {
    fn eat(&self) {
        println!("only I eat the pie right now!");
    }
}

fn main() {
    let mutex_pie = Mutex::new(Pie);
    // let's borrow a locked immutable reference of pie
    // we have to unwrap the result of a lock
    // because it might fail
    let ref_pie = mutex_pie.lock().unwrap();
    ref_pie.eat();
    // locked reference drops here, and mutex protected value can be used by someone else
}

```



## Combining Smart Pointers
Smart pointers might seem limited, but they can make some very powerful combinations.

`Rc<Vec<Foo>>` - Allow the cloning of multiple smart pointers that can 
borrow the same vector of immutable data structures on the heap.

`Rc<RefCell<Foo>>` - Allow multiple smart pointers the ability to borrow 
mutably/immutably the same struct Foo

`Arc<Mutex<Foo>>` - Allow multiple smart pointers the ability to lock 
temporary mutable/immutable borrows in a CPU thread exclusive manner.

Memory detail:
- You'll notice a theme with many of these combinations. The use of an immutable data type (possibly owned by multiple smart pointers) to modify internal data. This is referred to as the "interior mutability" pattern in Rust. It is a pattern that lets us bend the rules of memory usage at runtime with the same level of safety as Rust's compile-time checks.


```rust
use std::cell::RefCell;
use std::rc::Rc;

struct Pie {
    slices: u8,
}

impl Pie {
    fn eat_slice(&mut self, name: &str) {
        println!("{} took a slice!", name);
        self.slices -= 1;
    }
}

struct SeaCreature {
    name: String,
    pie: Rc<RefCell<Pie>>,
}

impl SeaCreature {
    fn eat(&self) {
        // use smart pointer to pie for a mutable borrow
        let mut p = self.pie.borrow_mut();
        // take a bite!
        p.eat_slice(&self.name);
    }
}

fn main() {
    let pie = Rc::new(RefCell::new(Pie { slices: 8 }));
    // ferris and sarah are given clones of smart pointer to pie
    let ferris = SeaCreature {
        name: String::from("ferris"),
        pie: pie.clone(),
    };
    let sarah = SeaCreature {
        name: String::from("sarah"),
        pie: pie.clone(),
    };
    ferris.eat();
    sarah.eat();

    let p = pie.borrow();
    println!("{} slices left", p.slices);
}

```



# Chapter 8 - Conclusion
Smart pointers are the idioms of Rust programming and let us not have to 
re-create the very common patterns of memory usage. With them you are ready 
to tackle the toughest of challenges! Now that we have the foundations of 
Rust, let's talk a bit about how we make larger projects. In chapter 9 we 
break free of single page lines of code.


# Chapter 9 - Project Organization and Structure
So far all of our code examples have been a single file. Let's discuss how 
our code can be better organized and shared by others!



## Cargo
`Cargo` is the official Rust package management tool for `crates`.
It helps us organise code in more than one file.

Rust programs may contain a `binary crate` (an executable,
for instance `./main`) or a `library crate` (a collection of functions, 
data types, structs, trait and so on). You've already used a library in 
writing code, which is `std` (the standard Rust library).


Therefore, there are two type of crates in Rust:
- `binary crates`  : contain a `main.rs` file
- `library crates` : contain a `lib.rs` file

A `crate` cannot have both `main.rs` and `lib.rs`.

![crates](https://raw.githubusercontent.com/kannans89/RustRepo/master/Images/movie_lib.jpg)

Resources:
- [https://youtu.be/969j0qnJGi8](https://youtu.be/969j0qnJGi8)

## Writing a Program
A program has a root module in a file called `main.rs`.


## Binary Crate
For a `binary crate`, `cargo` has the following terminal commands:
```
$ cargo new my-first-binary-crates	# creates a binary create
$ cd my-first-binary-crates/
$ cargo build				# equivalent of `rustc main.rs`
$ cargo run				# equivalent of `./main`
```

If you inspect the file hierarchy system, you'll notice that `cargo`
automatically creates some files and folders, and also writes some code.
Cool!

A `binary crate` will depend on the `main.rs`.
Btw, do not try to create a `lib.rs` here.
Our friend `cargo` will be confused.


## Writing a Library
A library has a root module in a file called `lib.rs`.



## Library Crate
`cargo` has the following terminal commands for a `library crate` :
```
$ cargo new --lib my-first-library	# creates a library crate
$ cd my-first-library/
$ cargo build				# links the dependencies between files (modules)
$ cargo test				# checks the unit tests
```

Unlike other Rust executable files you've written before,
a `library` contains functions and data types that are meant to be `used`
in other programs, in order to simplify some abstractions.

Think about the C `#include <stdio.h>`. It is a library: it offers access
to functions, variables and even more. That's what a library is meant for.



## Testing My Library
Rust libraries have a `lib.rs`, where you can test functionality of your 
library.

When creating one, `cargo` helps you by creating some code:
```rust
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

```


If you need more tests, create functions annotated with `#[test]`.
Each function should use the macro `assert_eq!` or `assert!`.
Use this macro only once, since it exits the function once it is executed.

`lib.rs`:

```
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    fn add_zero() {
        // Test if adding 0 to any number returns the same number
        let result = add(5, 0);
        assert_eq!(result, 5);
        assert_eq!(result, 10);		// this line will not be executed :)
    }
}

```


Test everything you create.
You can find [here](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/testing.html)
more about [testing](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/testing.html). 


## Modules
Every Rust program or library is a *crate*.

Every crate is made of a hierarchy of *modules*.

Every crate has a root module.

A module can hold global variables, functions, structs, traits or even 
other modules!

In Rust there is not a 1 to 1 mapping of files to the module tree 
hierarchy. We must build the module tree explicitly by hand in our code.


More information about how to split you code in different files / moduels
can be found [here](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/crates-and-modules.html).




## Referencing Other Modules and Crates
Items in modules can be referenced with their full module path 
`std::f64::consts::PI`.

A simpler way is the **use** keyword. It allows us to specify particular 
items from modules we want to use throughout our code without a full path. 
For instance `use std::f64::consts::PI` allows me to just use the 
identifier `PI` in my main function.

**std** is the crate of the **standard library** of Rust which is full of 
useful data structures and functions for interacting with your operating system.

A searchable directory of crates created by the community can be found at [https://crates.io](https://crates.io/).


```rust
use std::f64::consts::PI;

fn main() {
    println!("Welcome to the playground!");
    println!("I would love a slice of {}!", PI);
}

```




## Referencing Multiple Items
Multiple items can be referenced in a single module path as so:
```
use std::f64::consts::{PI,TAU}
```
Ferris doesn't eat TAU, he only eats PI.



## Creating Modules
When we think of code, we usually imagine a hierarchy of files organized in 
directories. Rust lets you create modules closely related to your file structure.

There are two ways in Rust to declare a module.
For example, a module `foo` can be represented as:
- a file named `foo.rs`
- a directory named `foo` with a file `mod.rs` inside


## Inline Module
A sub-module can be directly inlined within a module's code.

One very common use for inline modules is creating unit tests. We create an 
inline module that only exists when Rust is used for testing!

```
// This macro removes this inline module when Rust 
// is not in test mode.
#[cfg(test)]
mod tests {
    // Notice that we don't immediately get access to the 
    // parent module. We must be explicit.
    use super::*;

    ... tests go here ...
}
```


## Internal Module Referencing
Rust has several keywords you can use in your use path to quickly get ahold 
of the module you want:
- `crate` - the root module of your crate
- `super` - the parent module of your current module
- `self`  - the current module


## Exporting
By default members of a *module* are not accessible from outside of the 
module (not even to its child modules!). We make members of a module accessible using the `pub` keyword.

By default members of a crate are not accessible outside of the crate. We 
make members of a crate accessible by marking them as `pub` in the
*root module* of your crate (`lib.rs` or `main.rs`).



## Structure Visibility
Just like functions, structures can declare what they want
exposed outside of their module using `pub`.


```rust
// SeaCreature struct will be usable outside of our module
pub struct SeaCreature {
    pub animal_type: String,
    pub name: String,
    pub arms: i32,
    pub legs: i32,
    // let's keep our weapon private
    weapon: String,
}

```


## Prelude
You might be wondering how we have access to `Vec` or `Box` everywhere 
without a `use` to import them. It is because of the module `prelude` in 
the standard library.

Know that in the Rust standard library anything that is exported in 
`std::prelude::*` is automatically available to every part of Rust.
That is the case for `Vec` and `Box`
but others as well (Option, Copy, etc.).


## Your Own Prelude
Because of standard library's prelude, it's common for your library to have 
its own prelude module as a starting point for where users should import 
all of the most common data structures for using your library
(e.g `use my_library::prelude::*`). It doesn't automatically get used in 
programs/libraries that use your crate, but it's a good convention to 
follow so people know where to start.

Ferris says, "Be a good rustacean and help a fellow crab out with a good prelude!"


# Chapter 9 - Conclusion
You now have a few tricks up your sleeve when it comes to creating Rust 
applications and libraries ready for the world. Don't worry about 
remembering it all. As your library grows and is used by other people, 
you'll find what works best at each milestone.

Resources:
- [Guidelines For Writing Rust APIs](https://rust-lang.github.io/api-guidelines/)


# Chapter 10 - The End
It's been a joy to have you on the Tour of Rust. Ferris and the Tour of 
Rust team sincerely hope you enjoy the journey ahead! If you have felt 
comfortable this far, we strongly recommend diving deeper with these resources:
- [The Official Rust Programming Book](https://doc.rust-lang.org/stable/book/)



