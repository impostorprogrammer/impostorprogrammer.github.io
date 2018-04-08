[//]: # ( spellcheck-language en )

<!-- Sets up a default language for inline syntax highlighting -->
```CSharp
```
# The dangers with using `dynamic` - Never mix `var` and `dynamic`

DynamicObject, or as used in C# `dynamic` can be a very powerful tool. I was using it the other day to quickly process some simple JSON strings into it's parts and building up my own strongly typed object.

Then I ran into a very non-intuitive run time exception:

`Microsoft.CSharp.RuntimeBinder.RuntimeBinderException Message='System.Collections.Generic.IList<string>' does not contain a definition for 'Add'`

How can it be possible that IList doesn't have an Add method? At first I couldn't figure it out, my collection was properly initialized and had a valid instance of IList<string>, but when calling it at run-time it was consistently throwing this exception.

It turns out this is a 'feature' in the C# language, whenever a method receives a `dynamic` parameter, it is allowed to return a dynamic object, even if the method has a strongly typed return type. The sample program below illustrates the issue.

Intuitively, or at least for me, looking at the code in the below program one would expect the a return value from a method returning a `string` to be of type `string`, so as common these days one would happily use a `var` as declaration instead of `string`. Turns out that is problematic, apparently if the method returning a string has a `dynamic` input parameter, the compiler is allowed to return a `dynamic` as well, even though the method declaration clearly states it should be a `string`.  

The compiler doesn't even give a warning about such behavior.


```CSharp
    class Program
    {
        static public string MakeString(dynamic dyn)
        {
            return dyn.str;
        }
        static void Main(string[] args)
        {
            IList<string> list = new List<string>();

            dynamic input = new ExpandoObject();
            input.str = "string value";

            var str = MakeString(input);
            //string str = MakeString(input); // Using this with explicit type, works as expected

            // Microsoft.CSharp.RuntimeBinder.RuntimeBinderException 'System.Collections.Generic.IList<string>' does not contain a definition for 'Add'
            list.Add(str); 
        }
    }
```

## Solution
Turns out the solution is simple, don't use a `var` declaration, use an explicit typed (`string`) variable instead and it works as expected.

## Further info...
More details at [Stackoverflow](https://stackoverflow.com/questions/25892404/passing-dynamic-object-to-c-sharp-method-changes-return-type) or
in the 
[C# 5 Language Spec, 7.6.5](https://download.microsoft.com/download/0/B/D/0BDA894F-2CCD-4C2C-B5A7-4EB1171962E5/CSharp%20Language%20Specification.docx)

