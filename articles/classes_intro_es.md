[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# Introducción a Clases, Herencia y Polimorfismo en JavaScript

Muchas veces queremos representar una idea o un concepto en nuestros programas &mdash; tal vez un usuario, un archivo, una suscripción, o una lectura de la temperatura. <br/>
Si puedes pensar en algo como una entidad distinta, es probable que debas definir una clase para representar esa "cosa" en tu programa.

## La representación de estos conceptos en el código tiene dos partes: 
* Los datos representando el _estado_ 
* Las funciones representan el _comportamiento_

## Facilidad para modelar nuestro conceptos y comportamientos
Las clases nos dan una sintaxis conveniente para definir el estado y el comportamiento de los objetos que representarán nuestros conceptos. 
<br/>
## Integridad de estado y Inicialización
Hacen que nuestro código sea más seguro garantizando que se llamará una función de _**inicialización**_, y facilitan la definición de un **_conjunto fijo de funciones_** que operan en esos datos y mantienen el _**estado válido**_. 

### Mira atentamente ese código, que no usa clases. ¿Cuántos problemas o errores encuentras? ¿Cómo lo arreglarías?
```javascript
// assigna hoy el Octubre 24
let hoy = {
    dia: 10,
    mes: 24,
};

let mañana = {
    ano: hoy.ano,
    mes: hoy.mes,
    dia: hoy.dia + 1,
};

let pasadoMañana = {
    ano: mañana.ano,
    mes: mañana.mes,
    dia: mañana.dia + 1 <= 31 ? mañana.dia + 1 : 1,
};
```

El objeto **`hoy`** no es valido, no hay un mes 24. También no esta completamente inicializado, falta el **`año`**.
Seria mucho mejor tener una función que inicializa todo correcto y no se puede olvidar. <br/> 
Tambien nota que añadiendo un dia, verificamos si no sobre pasa 31, pero solo en un lugar, no en el objeto **`mañana`**.

### Mucho mejor si interactuamos con estos objetos solo via unos funciones que cada uno mantenga los objetos en un estado valido.

## Version mejorado usando clases

```javascript
class FechaSimple {
    constructor(dia, mes, ano){
        this._dia = dia;
        this._mes = mes;
        this._ano = ano;
    }
    anadirDias(nDias)
    {
        //incrementar **this** dias con nDias
    }
    obtenerDia()
    {
        return this._dia;
    }
}

let hoy = new FechaSimple(24, 10, 2018); //Garantizado ser inicializado correcto 

//Manipulando solo a traves unos funciones 'autorizados' asegura que el estado se mantiene valido
hoy.anadirDias(1);

```

* ## Las funciones que pertenecen a los objetos a menudo se llaman **métodos**.
* ## Cuado creamos un objeto de una clase, ese objeto es una **instancia** de la clase. 

# Metodo constructor
Es un metodo especial, resolve el primer problema inicializando el objeto siempre en la misma manera, y no se puede olvidar.
Es la unica manera crear un objecto de un clase.

## Proteger los datos del objeto

