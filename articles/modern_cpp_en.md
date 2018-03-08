[//]: # ( spellcheck-language en )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# Modern C++ - AKA C++ >= 11
A discovery of the new ubiquitous features in modern C++ that show why C++ code 11 and beyond is clean, safe and fast, as clean and secure as code written in any other modern and current language, and with the traditional C++ performance so strong as always.
A look at ways to make the code more robust and easier to maintain, such as avoiding memory leaks, more validation during compilation, ensuring how to avoid incorrect or unintentional overload resolution, ways of facilitating code refactoring and more.

We look at patterns and paradigms like making the code scalable and robust with best practices of multithreading, concurrency and minimization of "bottlenecks" and blocking.

# Common dangers in C++ when returning references

## Returning references to stack allocated memory
```cpp
int& getSomething() {
    int stackValue = 123;
    return stackValue;  // DON'T DO THIS.
}
```
The memory allocated for the reference will go away, and you have a reference to nothing
## Returning reference to heap allocated memory
```cpp
int& getSomething() {
    int* heapValue = new int;
    return *heapValue;  // DON'T DO THIS.
}
```
Now the caller will have to do 'strange' things to get the original pointer out of the reference to delete it, or simply miss that it has an underlying heap allocation needing deletion.

## Didn't notice the value was returned by reference
```cpp
int anyOldInt = getSomething(); //Storing a copy in stack variable, original reference lost!
```

## Forgetting to get keep the reference, but still trying to delete it
```cpp
int not_good = getSomething(); 
delete &not_good;   // bad behavior, trying to delete memory of stack variable
```

## Strange way of deleting memory of pointer
```cpp
int& myRef = getSomething(); // We must use the &, to not loose the reference!
delete &myRef;               // and get the underlying pointer to delete... strange
```

### Avoid returning references, use a pattern to pass on the responsibility
## Typically use <span class="hljs-built_in">std::unique_ptr&lt;T&gt;</span> and let it manage the lifetime of the object
```cpp
std::unique_ptr<int> getSomething() {
    return std::make_unique<int>(123);
}
```

And the calling code simply keeps the pointer around as for the life-time of the <span class="hljs-built_in">std::unique_ptr&lt;T&gt;</span> instance.

```cpp
std::unique_ptr<int> x = getSomething();
```

## <span class="hljs-keyword">auto</span> - Much better yet, you can safely and conveniently use auto

```cpp
auto x = getSomething();
```
