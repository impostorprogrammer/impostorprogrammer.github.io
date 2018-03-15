[//]: # ( spellcheck-language es )

# C++ 11 - Ya existe hilos y concurrencia

Antes de **C++ 11**, en teoría no se pudo crear un programa multihilo en C++ estándar y compilarlo para diferentes plataformas.
Era imposible (en teoría), porque el estándar de C++ antes de C++ 11 no sabia que era hilos, no tenia ningún concepto de acceso de memoria concurrente desde instrucciones originando de diversos hilos o núcleos.

Aunque muchos somos que hemos creado estos tipos de programas, pero no fue gracias al estándar C++ 98/03 fue con ayuda de librerías de terceros y los creadores de los compiladores. Si tenia que hacerlo para varios plataformas, la opción probablemente será usar ptrheads (posix threads), creando threads con `pthread_create`, o en Windows usando VC++ con los `CreateThread` (Win32) o  `_beginthread/_beginthreadex` (C runtime library).

Pero todo eso fueron extensiones no estándar para desarrollo con C++. Ahora desde C++ 11 el estándar tiene un modelo bien definido del acceso a memoria y como tiene que funcionar una implementación cumpliendo con el C++ estándar.

# Antes de C++ 11, solo había un hilo
Antes de C++ 11, solo había un hilo, una programa con un hilo único con un secuencia de instrucciones leyendo y escribiendo al memoria bastante sencillo y intuitivo. Claro para los creadores de compiladores y procesadores no era tan sencillo, con todo optimizaciones que han inventado, como reordenar instrucciones, cacheo, hasta ejecutando instrucciones anticipado (_¿Spectre_ alguien?). Bueno, nada de eso era una preocupación para C++, era algo que tenían que resolver y implementar en los compiladores y librerías. 

# El modelo nuevo de memoria en C++
Están hablando sobre el nuevo modelo de memoria en C++, no hablan sobre multihilo, pero bastante sobre concurrencia.
Pensando un poco, la introducción de mas que un hilo en C++ conlleva nuevas comportamientos, nuevas problemas, y todo efectivamente es relacionado con concurrencia.
Como acceder la memoria concurrente, como leer y escribir, y definir un comportamiento determinístico en un nuevo mundo caótico. 

Al fin, creo que _han hecho algo muy bueno_ porque han conseguido, ya tenemos tres estándares basado en esto: C++ 11, 14 y 17. Han creado abstracciones para hilos, operaciones atómicas, mecanismos de bloqueo y serialización seguros y eficientes, funcionalidad para coordinar entre hilos etc.

En este articulo [De Gavin Clarke](http://www.theregister.co.uk/2011/06/11/herb_sutter_next_c_plus_plus/page2.html) y en [ese pregunta en stackoverflow](https://stackoverflow.com/questions/6319146/c11-introduced-a-standardized-memory-model-what-does-it-mean-and-how-is-it-g) hay mucho para aprender de ello.

# Ahora tenemos en C++ para todas plataformas en la librería estándar
## Hilos y asincronicidad

```cpp
    std::thread
    std::this_thread
    std::async
    std::future
    std::shared_future
    std::promise
    std::packaged_task
```

## Tipos Atómicas

```cpp
    std::atomic<...>
```
## <span class="hljs-keyword">thread_local</span>

```cpp
    thread_local
```

<span class="hljs-keyword">thread_local</span> es como <span class="hljs-keyword">static</span> pero solo accesible desde un hilo, el hilo que lo creo. En Windows/VC++ había el `_declspec(thread)` como extensión antes.

## Sincronización

```cpp
    std::call_once
    std::condition_variable
    std::lock
    std::mutex
    std::shared_lock
    std::timed_mutex
    std::unique_lock
    std::shared_mutex
    std::recursive_mutex
    std::shared_timed_mutex
    std::recursive_timed_mutex
    std::try_lock
    std::adopt_lock
    std::defer_lock
    std::shared_lock
    std::try_to_lock
    std::unique_lock
    ...
```

## Barreras de memoria

```cpp
std::atomic_thread_fence
```


