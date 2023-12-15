+++
title = "The Constant and Static Types in Rust"
date = "2023-12-15"
author = "MacBobby Chibuzor"
description = "Understand the const and static type declarations in Rust and when to use each."

[taxonomies]
tags = ["posts", "Rust", "discoveries"]
+++

---

# Introduction
In Rust, `static` and `const` are two ways to define constant values, but they have different purposes and characteristics.

## `const` in Rust

- **Scope**: `const` defines a constant value that is inlined wherever it's used. This means that each usage of a `const` is replaced with its value at compile time.
- **Mutability**: Constants are always immutable.
- **Lifetime**: `const` has no fixed memory location or address in memory. Its value is copied wherever it's used.
- **Initialization**: Must be initialized with a value that can be computed at compile time.
- **Use Cases**: Ideal for defining constant values that are used multiple times in your code, but you don't need them to have a fixed address in memory.

### Example of `const`:
```rust
const PI: f64 = 3.1415;

fn main() {
    let radius = 10.0;
    let circumference = 2.0 * PI * radius;
    println!("Circumference: {}", circumference);
}
```

## `static` in Rust

- **Scope**: `static` variables represent a single memory location in your program. All references to the `static` variable refer to the same memory location.
- **Mutability**: By default, `static` variables are immutable, but you can make them mutable with the `mut` keyword. Mutable static variables are unsafe because Rust can't guarantee thread safety for them.
- **Lifetime**: `static` variables have a 'static lifetime, meaning they are available throughout the entire run of a program.
- **Initialization**: Can be initialized with a constant expression or a value computed at runtime (in the case of `lazy_static`).
- **Use Cases**: Ideal for global or shared state that needs to be accessed across different parts of a program, especially when a fixed memory location is required.

### Example of `static`:
```rust
static GREETING: &str = "Hello, world!";

fn main() {
    println!("{}", GREETING);
}
```

### Mutable `static` (Unsafe Example):
```rust
static mut COUNTER: i32 = 0;

fn increment() {
    unsafe {
        COUNTER += 1;
    }
}

fn main() {
    unsafe {
        increment();
        println!("COUNTER: {}", COUNTER);
    }
}
```

## When to Use Each

- **Use `const` when**: You need constants that are inlined, don't need a fixed location in memory, and are immutable. This is the common choice for defining constant values.
- **Use `static` when**: You need a global variable or some form of state that persists for the entire run of the program. This is less common and should be used carefully, especially when dealing with mutable statics.

Remember, mutable static variables should be used with caution and generally avoided in favor of other state management techniques, as they introduce the risk of data races and other concurrency issues.
