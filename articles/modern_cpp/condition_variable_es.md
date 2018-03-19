[//]: # ( spellcheck-language es )

# C++ 11 - **`std::condition_variable`**

El nuevo **`std::condition_variable`** en C++ 11 es un bicho versátil pero por lo menos para mi un fuente de confusión.

Principalmente tiene dos roles, uno funciona en un hilo recibiendo notificaciones, y la otra para transmitir notificaciones desde un un hilo a otro.

## Recibiendo
    1. El hilo espera (`wait()`) hasta que recibe un 'señal' sin mantener un bloqueo de un candado (**`std::mutex`**)    
    2. Cuando el hilo recibe el 'señal' se despierta y adquiere el bloqueo de un candado otra vez.


## Transmitiendo
1. Un hilo puede despertar un hilo esperando (cualquiera), efectivamente señalando que algo ha ocurrido


## Protegiendo recursos
El **`std::condition_variable`** siempre trabaja en conjunto e un **`std::mutex`** via un **`std::unique_lock`**, en simple caso solo para proteger una condición. Pero también podemos utilizar para proteger otros recursos, mas de eso abajo en ejemplo 3. 

## Ejemplo 1 -- Crear y despertar un hilo con un **`std::condition_variable`**

```cpp

std::mutex awakeThreadMutex;
std::condition_variable signal_thread;

void waitOnSignal()
{
	cout << "Thread created" << el;
	std::unique_lock<std::mutex> locker(awakeThreadMutex);
	signal_thread.wait(locker);
	cout << "Thread signaled" << el;
}

void startThreadAndSignal()
{
	std::thread t(waitOnSignal);

	std::this_thread::sleep_for(std::chrono::milliseconds(1000));

	signal_thread.notify_one(); //Or signal_thread.notify_one(); it is the same here with only one thread

	t.join(); //Wait for thread to terminate, if not undefined/bad things happens
}

```

## Activación falsa de **`std::condition_variable`**
El ejemplo anterior, tiene una problema, hay una posibilidad que el hile esperando con `wait()` sea despertado sin ninguno otro hilo ha señalado. 
En ingles se llama 'spurious wake up'

Así la recomendación es siempre usa una condición con un bucle que controla si realmente fue señalada.
El alternativo con predicado, en teoría puede ser más eficaz si el implementador de la librería consigue algo mejor que un bucle...

## Ejemplo 2 -- Despertar hilo, y evitar falsa alarma _'spurious wake up'_

```cpp
std::atomic<bool> threadSignaled = false;

void waitOnSignal2()
{
	cout << "Thread created in waitOnSignal2" << el;
	std::unique_lock<std::mutex> locker(awakeThreadMutex);
```

 _**Alternativo con bucle**_

---
```cpp

	while (!threadSignaled) //Guarantees to protect if a spurious wake up happens
	{
		signal_thread.wait(locker);
	}
```


 _**Alternative con wait() usando predicado**_

---

```cpp

	//Alternative using wait() with predicate
	signal_thread.wait(locker, []() { return threadSignaled.load(); });
```
---
```cpp
	cout << "Thread signaled in waitOnSignal2" << el;
}

void startThreadAndSignal2()
{

	 //Version safe against spurious wake ups
	std::thread t2(waitOnSignal2);
	std::this_thread::sleep_for(std::chrono::milliseconds(1000));

	threadSignaled = true;
	signal_thread.notify_one(); //Or signal_thread.notify_one(); it is the same here, first thread is gone

	t2.join(); //Wait for thread to terminate, if not undefined/bad things happens

}

```

## Porqué usamos el `std::unique_lock` y no el `std::lock_guard`

El `std::condition_variable::wait` requiere un `std::unique_lock` porque mientras está esperando se libera el bloque, y despertando se adqiure otra vez. 
El `std::lock_guard` no tiene esta funcionalidad. Pero el `std::unique_lock` tiene el mismo comportamiento que `std::lock_guard` y se libera el bloqueo cuando sale del ámbito. 


## Protegiendo recursos compartido

Ya hemos visto como hilos puede señalar una al otro, pero el `std::condition_variable` no solo sirve para esto. También si los hilos comparten recursos y cuando necesitamos coordinar el acceso entre ellos los `std::condition_variable` nos sirve en combinaciónes para señalar y proteger que el recurso ya está libre para otro hilo.

## Pasar el recurso entre dos hilos
En el siguiente ejemplo creamos dos hilos que comparte un recurso, un vector. Cada uno de ellos trabaja con el vector protegido y cuando terminan su trabajo, señala para el otro hilo que toma las riendas del recurso y hace su trabajo con el vector protegido. Cuando termina su trabajo, le vuelve a señalar para el otro hilo, y así siguen.

Nota que usamos dos **`std::condition_variable`**, uno para comunicar or señalar en una direcion y receiber desde la misma, y otra para comunicar en la otra direcion.

 ¡Ver el ejemplo!

## Ejemplo 3 -- Dos hilos trabajando alternativamente en añadir elementos en un vector compartido

```cpp
    std::mutex alternateThreadsMutex;
    std::condition_variable runThread1condition;
    std::atomic<bool> runThread1 = false;
    std::atomic<bool> runThread2 = false;
    std::condition_variable runThread2condition;
    std::vector<int> threadWork;

    void thread1()
    {
        while (true)
        {
            std::unique_lock<std::mutex> lock(alternateThreadsMutex);
            runThread1condition.wait(lock, []() { return runThread1.load(); });
            auto workSize = threadWork.size();
            if (workSize < 1000)
                threadWork.push_back(1);

            runThread1 = false;
            runThread2 = true;
            lock.unlock();
            
            runThread2condition.notify_one();
            if (++workSize >= 1000)
            {
                break;
            }
        }
    }

    void thread2()
    {
        while (true)
        {
            std::unique_lock<std::mutex> lock(alternateThreadsMutex);
            runThread2condition.wait(lock, []() { return runThread2.load(); });
            auto workSize = threadWork.size();
            if (workSize < 1000)
                threadWork.push_back(1);

            runThread2 = false;
            runThread1 = true;
            lock.unlock();
            runThread1condition.notify_one();
            if (++workSize >= 1000)
            {
                break;
            }
        }
    }


    void alternateThreads()
    {
        std::thread t1(thread1);
        std::thread t2(thread2);

        runThread2 = true;
        runThread2condition.notify_one();

        t1.join();
        t2.join();

        cout << threadWork.size() << el;
    }

```



# El código completo disponible en [github](https://raw.githubusercontent.com/JonasBr68/moderncpp_samples/master/Features/CPP11Features/ConditionVariables.cpp)

