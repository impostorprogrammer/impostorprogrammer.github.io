[//]: # ( spellcheck-language es )

# Manejo de errores y excepciones

## ¿Qué hacemos cuando nuestro código, o nuestras funciones reciben datos que no tiene sentido, cuando el resultado de una función no tiene sentido, cuando sabemos que algo está mal, y no podemos seguir en el código?

## Estrategias
La estrategia o manera de señalar errores o manejar situaciones fuera de lo normal depende casi siempre de la situación. <br/>
### Ejemplos:
* Si el llamador de una función puede recuperarse de un error o no.
* Si hay una manera comunicar al llamador que ha ocurrido un error.
* Si es una situación que sabemos que suele pasar, pero hay que manejarlo.
* Si es algo inesperado, algo que no sabemos cómo tratar, ni tampoco que hacer.


## Retornando valores 'especiales'
Una función que debe devolver un número, puede indicar un error o situación inesperada retornando NaN
```javascript
function sumNtoM(n, m) {
    if(typeof n != 'number' || typeof m != 'number')
        return NaN;
    if (n == m)
    {
        return m; //No hay nada mas que sumar, la suma de n a n = n
    }
    else
    {
        //suma n y la suma del resto de los numero n+1 hasta m
        return n + sumNtoM(n + 1, m);
    }
}
```
Tal comportamiento estaría en línea con cómo las funciones del JavaScript mismo manejan resultados que no son números.
Arriba retornamos <span class="hljs-literal">NaN</span> si recibimos datos inesperados como un string, un objetos o undefined.

Nota que en ese ejemplo comprobamos si los argumentos son del tipo esperados. Esa manera de 'proteger' o verificar es muy común. 

## No hay ningun valor 'especial' para retornar
¿Pero qué pasa si la función ya puede retornar todo tipos de valores cuando funciona normalmente?<br/>Como, por ejemplo:
```javascript
function ultimoElemento(array) {
    if (array.length > 0)
        return array[array.length - 1];
    else
        return undefined;
}

console.log(ultimoElemento([1, 2, undefined])); 
```

En ese caso, no se puede distinguir el resultado si el último elemento era <span class="hljs-literal">undefined</span> o si no es un array, o el array es vacío, o el parámetro ni siquiera es un objeto...

Seguramente has visto fallos en tus intentos de programar, no funciona y en un punto el depurador se reclama o sale un error _raro_ como algo así:

<img src="./TypeException.png" alt="Exception has occurred: TypeError: Cannot read property 'length' of undefined" title="Exception has occurred: TypeError: Cannot read property 'length' of undefined">

Esto es justo lo que pasaría, si llamas la función  <span class="hljs-title">ultimoElemento</span> sin parámetro. Se ha producido una excepción. Muchas veces nos ayuda a encontrar fallos en el código, y eso es bueno. Pero no sería bueno si nosotros también podríamos causar un "fallo" así en situaciones excepcionales, cuando no hay como seguir. O puede que hay un fallo en el código en otro lugar, y queremos saberlo. Bueno, si las excepciones se pueden lanzar desde código normal también, hasta definir nuestro propio excepciones.

## Excepciones

Cuando nos encuentra en una situación excepcional, cuando no sabemos como recuperar, ni tampoco que hacer, podemos lanzar una excepción. 
### Para lanzarlo usamos <span class="hljs-keyword">throw</span>

```javascript
function ultimoElemento(array) {
    if (array.length > 0)
        return array[array.length - 1];
    else
        throw "No se puede sacar el ultimo elemento de un array vacio";
}

console.log(ultimoElemento([])); 
```

## Excepciones esperados...

Hay situaciones cuando una función, o una llamado, tal vez fuera de nuestro control lanza una excepción, pero sabemos como recuperar y intentar otra vez, o llamar otra funcionalidad, o abandonar sin terminar la programa.

Pero como hemos visto, la programa entera falla, y termina después de una excepción fue lanzada.
Así, hace falta una manera de 'coger' la excepción lanzado sin terminar la programa.<br/> 
Para eso en JavaScript tenemos la combinación <span class="hljs-keyword">try/catch</span>.

## <span class="hljs-keyword">try/catch/finally</span>

### En un bloque <span class="hljs-keyword">try</span> podemos intenta algo que puede lanzar una excepción.
### Si una excepción fue lanzado dentro del bloque <span class="hljs-keyword">try</span>, llegamos en el bloque <span class="hljs-keyword">catch</span>

```javascript

try {
    //Intenta algo que puede lanzar una excepción.
}
catch(error){
    //Si una excepcione fue lanzado dentro del bloque try, llegamos aqui
}

```

## Un clase que recibe datos mal en el constructor
## En un constructor no podemos retornar un valor, tenemos que usar una excepción
```javascript
class Fecha
{
    constructor(dia, mes, ano)
    {
        if(typeof dia != 'number' || 
           typeof mes != 'number' || 
           typeof ano != 'number')
           {
               throw "dia, mes o ano no es un numero!";
           }
    }
}
let f = new Fecha(2,"marzo",2018);


try{
    let f2 = new Fecha(2,"marzo",2018);
}
catch(error)
{
    
}

```

## Ahora con este código

```javascript
class Fecha
{
    constructor(dia, mes, ano)
    {
        if(typeof dia != 'number' || 
           typeof mes != 'number' || 
           typeof ano != 'number')
           {
               throw new Error("dia, mes o ano no es un numero!");
           }
    }
}

try {
    let f2 = new Fecha(2,"marzo",2018);
    console.log("Esto no ejecuta si hay una excepción");
}
catch(error) {
    console.log(error.message);    
}
finally
{
    console.log("Excepcion o no, siempre esto");
}
```

# Ejercicio: Añadir todo la verificación posible en el constructor de Fecha

## 1. Lanza excepciones con mensajes que son instructivas para el usuario del clase
## 2. Hacer llamadas comprobando todo los casos que has añadido


```javascript
class Fecha
{
    constructor(dia, mes, ano)
    {
        if(typeof dia != 'number' || 
           typeof mes != 'number' || 
           typeof ano != 'number')
           {
               throw new Error("dia, mes o ano no es un numero!");
           }
        
        //MAS AQUI!!!
    }
}