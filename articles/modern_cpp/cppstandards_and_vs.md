[//]: # ( spellcheck-language es )

<!-- Features and support until 2015 https://msdn.microsoft.com/en-us/library/hh567368.aspx -->
<!-- Up until 2017 15.3 Preview https://blogs.msdn.microsoft.com/vcblog/2017/05/10/c17-features-in-vs-2017-3/  -->
<!-- Up until 2017 15.6 Installed  -->


# Las 4 versiones principales del estándar del C++
Hoy en día tenemos 4 'grandes' estándares de C++ para tomar en cuenta:

* **C++ clásico:**
* **C++11**
* **C++14**
* **C++17**

## Mejoras en el lenguaje C++ y en la librería estándar de C++
Cada versión del estándar ha llevada cambios y mejoras tanto en el lenguaje como en la librería estándar.

# C++ clásico - Punteros crudos y desnudos, <span class="hljs-keyword">new</span> y <span class="hljs-keyword">delete</span>
Incluye los estándares **C++98** y **C++03** (El **C++03** fue principalmente para solucionar problemas identificados en **C++98**)

## El C++ que conocemos de toda la vida...

<!-- TODO: Validate this code -->
```cpp
class Persona{
    public:
    Persona(const char* nombre)
    {
        if(nombre && nombre[0] != 0)
        {
            strcpy(m_nombre, nombre);
        }
    }
    private:
    char m_nombre[1024];
    ...
}

Persona* p1 = new Persona();
...

delete p1;
p1 = NULL;

```

# C++11 - Mejorar y corregir las deficiencias en la librería estándar y mas 
Una de los objetivos del diseño era preferir cambios en la librería estándar sobre cambios al lenguaje.

Aunque así, el lenguaje se mejoraron significativamente incluyendo soporte de _**multihilo**_, soporte de _**programación genérico**_, _**inicialización uniforme**_ y _**rendimiento**_. Como fue previsto se realizaron cambios significativos en la biblioteca estándar de C++ también, las adiciones incluyeron _**expresiones regulares**_, _**punteros inteligentes**_, _**tablas hash**_ y _**generadores de números aleatorios**_ entre otras cosas.

## C++11 Mayor Language Features

## C++11 Mayor Standard Library Features


# Compatibilidad con estándares de C++ y versiones de Visual Studio 

# C++ clásico - Visual Studio versiones hasta 2012 
Aunque 2012 tenia cositas del estándar de C++11, prácticamente fue C++ clásico.

# C++11 - Visual Studio 2013 parcialmente, y Visual Studio 2015 efectivamente
Visual Studio 2013 tenia un gran parte del estándar de C++11 implementado, aunque es el 2015 se considera efectivamente con suporte de C++11.

# C++14 - Visual Studio 2015 parcialmente, y Visual Studio 2017 efectivamente
Visual Studio 2015 tenia un importantes parte del estándar de C++14 implementado como: _lambdas genéricos_ y _tipos de retorno <span class="hljs-keyword">auto</span>_. Pero al final es el Visual Studio 2017 se considera efectivamente con suporte de C++14.

# C++17

```cpp
new
delete

```
