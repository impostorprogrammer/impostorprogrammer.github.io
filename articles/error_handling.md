[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# Manejo de errores y excepciones

## ?Que hacemos cuando nuestro código, o nuestro funciones recibe datos que no tiene sentido, cuando el resultado de un función no tiene sentido, cuando sabemos que algo esta mal, y no podemos seguir en el código?

## Estrategias
La estrategia o manera de señalar errores o manejar situaciones fuera de lo normal depende casi siempre de la situación. <br/>
### Ejemplos:
* Si el llamador de una función puede recuperarse de un error o no. 
* Si hay una manera comunicar a el llamador que ha ocurrido un error.
* Si es una situación que sabemos que suele pasar, pero hay que manejarlo.
* Si es algo inesperado, algo que no sabemos como tratar, ni tampoco que hacer.

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
Tal comportamiento estaría en línea con cómo las funciones del javascript mismo manejan resultados que no son números.
Arriba retornamos <span class="hljs-literal">NaN</span> si recibimos datos inesperados.

Nota que en ese ejemplo comprobamos si los argumentos son del tipo esperados. Esa manera de 'proteger' o verificar es muy común. 

¿Pero que pasa si el función ya puede retornar todo tipos de valores cuando funciona normalmente?<br/> Como por ejemplo:
```javascript
function ultimoElemento(array) {
    if (array.length > 0)
        return array[array.length - 1];
    else
        return undefined;
}

console.log(ultimoElemento([1, 2, undefined])); 
```

En ese caso, no se puede distinguir el resultado si el ultimo elemento era <span class="hljs-literal">undefined</span> o si no es un array, o el array es vacío, o el parámetro ni siquiera es un objeto...

Seguramente has visto fallos en tus intentos de programar, no funciona y en un punto to depurador se reclama o sale un error _raro_ como algo así,

<img src="./TypeException.png" alt="Exception has occurred: TypeError: Cannot read property 'length' of undefined" title="Exception has occurred: TypeError: Cannot read property 'length' of undefined">

Esto es justo lo que pasaría, si llamas el función <span class="hljs-title">ultimoElemento</span> sin parámetro. Se ha producido una excepción. Muchas veces nos ayuda a encontrar fallos en el código, y eso es bueno. Pero no seria bueno si nosotros también podría causar un "fallo" así en situaciones excepcionales, cuando no hay como seguir. O puede que hay un fallo en el código en otro lugar, y queremos saberlo. Bueno, si los excepciones se pueden lanzar desde código normal también, hasta definir nuestro propio excepciones.

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

Hay situaciones cuando una función, o una llamado, tal vez fuera de nuestro control lanza una excepción, pero sabemos como recuperar y intentar otra vez, o llamar otra funcionalidad. 

Pero como hemos visto, la programa entera falla, y termina después de una excepción fue lanzada.
Así, hace falta una manera de 'coger' la excepción lanzado sin terminar la programa.<br/> 
Para eso en javascript tenemos la combinación <span class="hljs-keyword">try/catch</span>.

## <span class="hljs-keyword">try/catch</span>

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