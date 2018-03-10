[//]: # ( spellcheck-language es )

# Funciones como parámetros, y callbacks (retro-llamadas)

## Llamadas asincrónicas 

A veces hay llamadas que pueden tomar un tiempo para completar y volver. Para evitar bloquear el programa en espera de tales llamadas, usamos algo de llamadas asincrónicas.

Le decimos a la llamada qué hacer cuando regrese, y luego seguimos adelante con el resto del programa, antes de que algo haya sucedido.

## Ejemplo: setTimeout con función como parámetro

```javascript

function callback()
{
    console.log("callback called");
}
setTimeout(callback, 3000);


setTimeout(function(){
    console.log("2 segundos");
}, 2000);


setTimeout(()=>{
    console.log("Despues de 1 segundo");
}, 1000);

console.log("setTimeout llamado 3 veces...");

```

## Función de flecha
```javascript
const myArrow = (msg)=>
{
    console.log(msg);    
};

myArrow("Hello");
```

## Descargar algo que puede tardar mucho tiempo, o fallar

```javascript
//En nodeJs instala xmlhttprequest primero, con
//npm install xmlhttprequest
//y use ese linea
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();

request.onload = function () {
    console.log(this.responseText);
    //let jsonO = JSON.parse(this.responseText);
    console.log("Response received");
};

request.onerror = function () {
    console.log("There was a problem with the request");
};

request.open("get", "https://api.npmjs.org/downloads/range/2018-02-28:2018-03-09/measure-duration", true);
request.send();
console.log("La peticion ye esta hecha...");
```


## Nuestra propia función que recibe una función
## Ejemplo
```javascript
function callTheFunction(functionToCall)
{
    functionToCall();
}
```

# Ejercicio: 
## Crea una función que recibe una función myFunction como parámetro 
## La función recibido, usa un parámetro string, pasa "Hola" como parámetro cuando lo llamas dentro tu función myFunction

## Luego llama tu función myFunction, así: 
```javascript
myFunction(console.log);
```

