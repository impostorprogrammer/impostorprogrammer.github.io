[//]: # ( spellcheck-language es )

# C# MODERNO - Novedades en C# 6.0, 7.0, 7.1 y 7.2 y más

# C# 6.0
## 1. Propiedades automáticas de sólo lectura

```CSharp

        // TODO CS6 1.1 Read only properties can be initialized at declaraction or in constructor
        public string FirstName { get; } = "Unknown"; 

```

## 2. Inicializadores de propiedades automáticas

```CSharp

        // TODO CS6 1.1 Read only properties can be initialized at declaraction or in constructor
        public string FirstName { get; } = "Unknown"; 

```


## 3. Funciones con el cuerpo como expresión

### Función 
```CSharp
       // TODO CS6 2.0 Method with expression body
        public override string ToString() => LastName + " " + FirstName;
```

### Propiedad 

```CSharp
        public string FullName => LastName + " " + FirstName;
```

## 4. `using static` - Insertar funciones en el namespace

```CSharp
// TODO CS6 3.1 using static to allow calling Assert(...)
using static System.Diagnostics.Debug;
```
## ...
```CSharp
            // TODO CS6 3.4 Calling System.Diagnostics.Debug.Assert directly thanks to 'using static'
            Assert(name == null); 

```

## 5. Operador condicional de `null ?.`  y  `?[]`
```CSharp

            // TODO CS6 4.0 Null-conditional operator with . (dot) operator
            var name = nullStudent?.FullName;

            string[] names = null;

            // TODO CS6 4.1 Null-conditional operator with [] (index) operator
            var firstName = names?[0]; //Only calls operator [] if names is not null
```


## 6. Interpolación en string

```CSharp
        public override string ToString() => $"{LastName}, {FirstName}"; // TODO CS6 5.0 interpolated strings

        public string FullName => $"{LastName}, {FirstName}"; // TODO CS6 5.1 interpolated strings

        // TODO CS6 5.3 interpolated string with format specifier and method call
        public string GetFormattedGradePoint() => $"Name: {LastName}, {FirstName}. G.P.A: {Grades.Average():F2}";
```

## 6.2 Nuevo tipo `FormattableString`

```CSharp
        FormattableString fStr2 = $"Now2 {DateTime.Now}"; // TODO CS6 5.4 Interpolated strings compiles to FormattableString if you want
        Console.WriteLine(fStr2.Format);
        Console.WriteLine(fStr2);

        // TODO CS6 5.5 Interpolated strings/FormattableString can be used and reused with different cultures
        Console.WriteLine(fStr2.ToString(CultureInfo.CreateSpecificCulture("en-us")));

        FormattableString fStr = FormattableStringFactory.Create("Now1 {0:m}", DateTime.Now);
        Console.WriteLine(fStr);
        Console.WriteLine(fStr.ToString(CultureInfo.CreateSpecificCulture("en-us")));
        Console.WriteLine(fStr.ToString(CultureInfo.CreateSpecificCulture("es-es")));
```

## 7. Filtros de excepciones

```CSharp
           try
            {
                throw new HttpRequestException("Failed", new FormatException());
            }
            // TODO CS6 6.1 Exception filter on typeof InnerException
            catch (HttpRequestException ex) when (ex.InnerException is FormatException) 
            {
                Console.WriteLine(ex.ToString());
            }
```

## 8. Expresión `nameof(myVar)`
```CSharp
            if (string.IsNullOrEmpty(requestedUrl))
            {
                // TODO CS6 7.2 nameof turns variable into its name as string, allows safe renaming/refactoring
                throw new ArgumentNullException(nameof(requestedUrl));
            }
```

## 9. `await` en bloques de `catch` y `finally`
```CSharp

            // TODO CS6 6.5 Exception filter on exception message contents
            catch (HttpRequestException ex) when (ex.Message.Contains(" 301 ") ||
                                                    ex.Message.Contains(" 302 ") ||
                                                    ex.Message.Contains(" 307 "))
            {
                // TODO CS6 8.0 C# 6 now allows await in catch and finally blocks
                await AsyncLog("Recovered from redirect", ex);
                return response.Headers.Location;
            }
```


## 10. Inicializadores de índice

```CSharp
            Dictionary<int, string> webErrorsOld = new Dictionary<int, string>
            {
                { 404, "Page not Found" },
                { 302, "Page moved, but left a forwarding address." },
                { 500, "The web server can't come out to play today." }
            };
            // TODO CS6 9.0 Index based Initializers - works on types where indexer can add new items
            Dictionary<int, string> webErrors = new Dictionary<int, string>
            {
                [404] = "Page not Found",
                [302] = "Page moved, but left a forwarding address.",
                [500] = "The web server can't come out to play today."
            };
```

## 11. Métodos de extensión para inicializadores de colección

```CSharp
    public static class StudentExtensions
    {
        // TODO CS6 9.3 Extension method to enable Collection initializer of Enrollment
        public static void Add(this Enrollment e, Student s) => e.Enroll(s);

        public static void Add(this Enrollment e, string firstName, string lastName) => e.Enroll(new Student(firstName, lastName));
    }

            // TODO CS6 9.2 Collection initializers - Extension Add method if type has different name 
            var classList = new Enrollment()
            {              
                new Student("Vicki", "Petty"),
                new Student("Ofelia", "Hobbs"),
                new Student("Leah", "Kinney"),
                new Student("Alton", "Stoker"),
                new Student("Luella", "Ferrell"),
                { "Lessie", "Crosby" }, // Different extension method
            };

```

## ~~12. Resolución de sobrecarga mejorada~~

<br>
<br>
<br>
<br>
<br>
<hr>

# C# 7.0
## 1. Variables `out`

```CSharp
            // TODO CS70 1.0 out variable declarations, in situ visible in current scope
            if (int.TryParse(input, out var result))
                WriteLine(result);

```

## 2. Tuples y deconstrucción `ValueTuple` `Deconstructor(...)`

```CSharp
            // TODO CS70 2.0.3 Creates tuple 
            var tupleNumbers = (1, 2, 3);

            // TODO CS70 2.6.3 Tuple deconstruction into separate variables
            (int first, int second, int third) = tupleNumbers;

            // TODO CS70 2.1.3 Creates tuple with named fields
            var t = (firstValue: 1, secondValue: 2, thirdValue: 3);

            WriteLine(t.firstValue);

            // TODO CS70 2.1.4 Creates tuple with 'anonymous' fields, Item1, Item2, etc
            var t2 = (1, 2, 3);
            WriteLine(t2.Item2);
```

## 3. Descartes - Discards
```CSharp
   
            var tupleNumbers = (1, 2, 3);
   
            (_, _, int third) = tupleNumbers;

```
## 4. Coincidencia de patrones - Pattern Matching

```CSharp
            // TODO CS70 4.1 is type expression, if true casts and assigns to variable
            if (obj is int intVal)
            {
                WriteLine($"o is int = {intVal}");
            }
```

```CSharp
       //switch statement
        public static object CreateShape(string shapeDescription)
        {
            switch (shapeDescription)
            {
                case "circle":
                    return (2, "circle");

                case "square":
                    return (4, "square");

                case "large-circle":
                    return (12, "large-circle");

                case string o when (o.Trim()?.Length ?? 0) == 0:
                    // white space
                    return null;
                case null:
                    return null;
                default:
                    return "invalid shape description";
            }
        }
```

## 5. `ref` locales y retornos

```CSharp
            var idStrTuple = (id: 1, str: "idStrTuple");

            ref var refTemp = ref idStrTuple; //Creates ref to value type

            idStrTuple.str = "tuple2";

            WriteLine(refTemp.str); //tuple2
```

## 6. Funciones locales - anidados dentro otra función

```CSharp
        public static Task LocalFunctionAsync(string param)
        {
            if (string.IsNullOrEmpty(param))
                throw new ArgumentNullException(nameof(param));

            return FakeAsync(param);

            async Task FakeAsync(string msg)
            {
                await Task.Yield();
                WriteLine(msg);
            }
        }
```

## 7. Mas miembros con el cuerpo como expresión

```CSharp
        // TODO CS70 7.0 Expression bodied constructor, deconstructing tuple straight into member variables
        internal Area(in (int x, int y, int width, int height) areaTuple) => (X, Y, Width, Height) = 
                                                                            (areaTuple.x,
                                                                            areaTuple.y,
                                                                            areaTuple.width,
                                                                            areaTuple.height);
```

## 8. Expresiones `throw`

```CSharp
        private string label;
        public string Label
        {
            get => label;
            // TODO CS70 8.0 throw expression, now throw possible in expression bodied members and properties
            set => label = value ?? throw new ArgumentNullException(paramName: nameof(Label), message: "New label must not be null");
        }
```

## 9. Mejoras en la sintaxis literal numérica

```CSharp
        // TODO CS70 9.1 Binary literals
        public const int One = 0b0001;
        public const int Two = 0b0010;
        public const int Four = 0b0100;
        public const int Eight = 0b1000;

        // TODO CS70 9.2 Binary literals with digit separator
        public const int Sixteen = 0b0001_0000;
        public const int ThirtyTwo = 0b0010_0000;
        public const int SixtyFour = 0b0100_0000;
        public const int OneHundredTwentyEight = 0b1000_0000;

        // TODO CS72 Leading digit separator _ in binary and hex literals
        public const int LeadingSeparatorBin = 0b_1010_0110_0000_1010_0110;
        public const int LeadingSeparatorHex = 0x_0A_60_A6;

        // TODO CS70 9.3 Large base 10 with digit separator
        public const long BillionsAndBillions = 100_000_000_000;

        // TODO CS70 9.4 Digit separator with double, decimal and float
        public const double AvogadroConstant = 6.022_140_857_747_474e23;
        public const decimal GoldenRatio = 1.618_033_988_749_894_848_204_586_834_365_638_117_720_309_179M;
```


## ~~10. Tipos de retorno asincrónico generalizado~~

<br>
<br>
<br>
<br>
<br>
<hr>

# C# 7.1
## 1. método Main asincrónico (`async`)

```CSharp
        // TODO CS71 1.0 Async Main
        static async Task Main(string[] args)
        {
```

## 2. Expresiones literales de `default`

```CSharp

        // TODO CS71 2.0 default literal
        (int deltaX, int deltaY, double Length) res = default;
```

## 3. Nombres de elementos de tuple inferidos

```CSharp

            var tuple = (name, sirname, age);

            // TODO CS71 3.0 inferred name from variable name - probably using nameof infrastructure
            WriteLine(tuple.name);
```


<br>
<br>
<br>
<br>
<br>
<hr>

# C# 7.2
## 1. Semántica de referencia con tipos de valor

* `in`
* `ref readonly`
* `readonly struct`
* `ref struct`

```CSharp
        public static (int deltaX, int deltaY, double Length)  CalcLength(in (int X, int Y) origin, 
                                                                          in (int X, int Y) end, 
                                                                          ref (int deltaX, int deltaY, double Length) res)
        {
            (res.deltaX, res.deltaY) = ((end.X - origin.X), (end.Y - origin.Y));
            res.Length = Math.Sqrt(res.deltaX * res.deltaX + res.deltaY * res.deltaY);
            return res;
        }


        CalcLength(in roStruct, in endPoint, ref res); //No copies allowed by compiler

```

## 2. Guion bajo comenzando literal numérico
```CSharp
        // TODO CS72 Leading digit separator _ in binary and hex literals
        public const int LeadingSeparatorBin = 0b_1010_0110_0000_1010_0110;
        public const int LeadingSeparatorHex = 0x_0A_60_A6;
```

## 3. `private protected` modificador de acceso

```CSharp
        // TODO CS72 4.0 new protection level private protected maps to the CLR notion of protectedAndInternal so can be exposed via InternalsVisibleTo
        virtual private protected void OnlyForTrustedDerivedClasses()
        {
            WriteLine(nameof(this.OnlyForTrustedDerivedClasses));
        }
```

## ~~4. Argumentos con nombre en mas sitios~~

