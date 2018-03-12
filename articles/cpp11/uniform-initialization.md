[//]: # ( spellcheck-language es )
<!-- Inspirado en este https://mbevin.wordpress.com/2012/11/16/uniform-initialization/ -->

# Inicialización uniforme - Nuevo en C++ 11
Las listas uniformes de inicialización e inicializador proporcionan una nueva sintaxis común para la inicialización en c++ 11.

## Listas de inicializadores
Antes de C++ 11 no había una manera fácil para por ejemplo inicializar un std::vector o std::map etc. con una conjunto de valores.
Se podía hacerlo con los array tipo-C de vieja escuela, pero no con los colecciones de la STL.

Tendría que primero inicializar un array tipo-C, y después usarlo con algo de código para inyectar los valores.

## La vieja escuela - <span class="hljs-built_in">std::vector, std::map</span> etc.

```cpp
	//Via un array inicializado con una lista de inicializacion
	int carray[] = { 0,1,2,3,4 };

	std::vector<int> vec;
	for (int i = 0; i<5; i++) { vec.push_back(carray[i]); }

	std::set<int> conj;
	for (int i = 0; i<5; i++) { conj.insert(carray[i]); }

	std::map<int, std::string> mapa;
	mapa[0] = "cero";
	mapa[1] = "uno";
	mapa[2] = "dos";

	std::vector<int> vec2;
	vec2.push_back(10);
	vec2.push_back(20);
	vec2.push_back(30);
	vec2.push_back(40);
	int total = vec2.size();

	const char* values[] = { "Via", "a", "constructor", "using", "initializer_list" };
	std::vector<std::string> strings;
	for (int c = 0; c<5; c++) { strings.push_back(values[c]); }
```

## Desde C++ 11 - Directamente con una lista de inicializacion

Con C++ 11 podemos iniciar directamente con una lista de valores, similares como en C#

```cpp
	std::vector<int> vec = { 0,1,2,3,4 };

	std::set<int> conj = { 0,1,2,3,4 };

	std::map<int, std::string> mapa = { {0,"cero" }, {1, "uno"}, {2, "dos"} };
	auto second = mapa[2];
	cout << second << el;

	std::vector<std::string> strings = { "Via", "an", "initializer_list" };
	cout << strings.at(2) << el;
```


## C++ 11 - Protección de conversióne de datos no deseado o peligroso

```cpp
	int minusOne = -112345;

	unsigned int ui { minusOne }; //error C2397: conversion from 'int' to 'unsigned int' requires a narrowing conversion
	unsigned int ui2 = minusOne;

	int minusOne2{ ui2 }; //error C2397 : conversion from 'unsigned int' to 'int' requires a narrowing conversion
	int minusOne3 = ui2;


	double d = 3.2;
	float f = d;
	float f2{ d }; //error C2397: conversion from 'double' to 'float' requires a narrowing conversion

	//No loss of data, no problem or warning
	double d2{ f };
	int64_t longLong{ minusOne };
```

## C++ 98 - Inicializacion de struct
```cpp
    struct TestStruct {
        int m_i;
        int m_x;
        double m_f;
    };

	TestStruct ts = { 1, 2, 3.2 }; // For structs you could do this since C99
	TestStruct ts1 = { 1, 2 }; //Zero initializing the rest
	TestStruct ts2 = {};     // Initialize to 0
```

## C++ 11 - Inicializacion de struct
```cpp
	TestStruct ts = { 1, 2.1, 3.2 }; // warning C4244: 'initializing' : conversion from 'double' to 'int', possible loss of data
	
	TestStruct tsF2 = { 1, {2.1}, 3.2 }; // error C2397: conversion from 'double' to 'int' requires a narrowing conversion

	TestStruct* pTS = new TestStruct{ 1, 2, 3.2 }; 

	TestStruct* pTS1 = new TestStruct{ 1, 3};

	TestStruct* pTS2 = new TestStruct{ 1.2 , 2, 3.2 };  //warning C4244 : 'initializing' : conversion from 'double' to 'int', possible loss of data
	TestStruct* pTS3 = new TestStruct{ {1.2}, 2, 3.2 }; // error C2440 : 'initializing' : cannot convert from 'initializer-list' to 'TestStruct'
```

## Clase de toda la vida

```cpp
    class Test
    {
        public:
            Test(int i, std::string tipo, double f = 0.0):
                i(i),
                tipo(tipo),
                f(f)
            {

            }
            int getI() { 
                return i; 
            }
            int p;
        private:
            int i;
            std::string tipo;
            double f;
    }
```
```cpp
    class Simple {
    public:
        int first;
        double second;
        std::string third;
    };
```

## C++ 98 - Inicializacion de clases

```cpp
	Test t(23, "old"); 	//Via constructor only way

	Simple s1 = { 1, 2.1, "Simple" }; //Same behaviour as struct, Simple is an 'aggregate' class

```

## C++ 11 - Inicializacion de clases

```cpp
	auto t = Test{ 34, "Test", 22, 3 }; // No matching constructor - error C2440: '<function-style-cast>' : cannot convert from 'initializer-list' to 'Test'

	auto t = Test{ 34 }; // No matching constructor - error C2440: '<function-style-cast>' : cannot convert from 'initializer-list' to 'Test'

    //DIFFERENTE de clases
	auto t0 = Test{ 32.1, "Test" }; //error C2398: Element '1': conversion from 'double' to 'int' requires a narrowing conversion
	auto t1 = Test{ 32, "Test" };

	auto t2 = Test{ 0, "Test2" };
	cout << t2.getI() << el;

	Test arrTests[] = { { 1,"1" },{ 2,"2" },{ 3,"3" } };

	std::vector<Test> classes = { { 1,"1" },{ 2,"2", 3.1415 },{ 3 ,"3" } };

```

<h2 id="class-members">C++ 11 inicialization de miembros de clases en la declaracion del clase</h2>

```cpp
    class Test
    {
        public:
            Test(int i, std::string tipo, double f = 0.0):
                i(i),
                tipo(tipo),
                f(f)
            {

            }
            int getI() { 
                return i; 
            }
            int p{-1};
        private:
            int i {0};
            std::string tipo {"Sin Tipo"}; //No implementado en Visual Studio 2013 toolset, desde VS 2015
            double f {1.0f};
    }
```
## Delegating constructors en C++ 11
