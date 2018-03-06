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

# Clases

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


## Primera Clase 
```javascript

class FirstClass {

}

let fc1 = new FirstClass();
let fc2 = new FirstClass();
console.log(fc1 instanceof FirstClass); //instanceof -> ¿es esto una instancia de aquel?
console.log(typeof fc1); // 'object'
console.log(fc1 instanceof Date);
console.log(fc1 == fc2);

```
<img src="./FirstClassDebugger.png" alt="Simple clase en el depurador" title="Simple clase en el depurador-----">


## Objetos 'clásico'...
### Mira atentamente ese código, que no usa clases. ¿Cuántos problemas o errores encuentras? ¿Cómo lo arreglarías?

```javascript
// assigna hoy el Octubre 24
let hoy = {
    dia: 10,
    mes: 24,
};

let manana = {
    ano: hoy.ano,
    mes: hoy.mes,
    dia: hoy.dia + 1,
};

let pasadoManana = {
    ano: manana.ano,
    mes: manana.mes,
    dia: manana.dia + 1 <= 31 ? manana.dia + 1 : 1,
};
```

El objeto **hoy** no es valido, no hay un mes 24. Tampoco esta completamente inicializado, falta el <span class="hljs-attr">**año**</span>.
Seria mucho mejor tener una función que inicializa todo correcto y que no se puede olvidar. <br/> 
También nota que añadiendo un dia, verificamos si no sobrepasa 31, pero solo en un lugar, no en el objeto **manana**.

### Mucho mejor si interactuamos con estos objetos solo vía unos funciones que cada uno mantenga los objetos en un estado valido.

## Versión mejorado usando clases

```javascript
class FechaSimple {
    constructor(dia, mes, ano){
        this._dia = dia;
        this._mes = mes;
        this._ano = ano;
    }
    anadirDias(nDias)
    {
        //Aumentar los dias con nDias y validar aqui
    }
    obtenerDia()
    {
        return this._dia;
    }
}

let hoy = new FechaSimple(24, 10, 2018); //Garantizado ser inicializado correcto 

//Manipulando solo a traves unos funciones 'autorizados' asegura que el estado se mantiene valido
hoy.anadirDias(1);
console.log(hoy.obtenerDias());

```

* ## Las funciones que pertenecen a los objetos a menudo se llaman **métodos**.
* ## Cuando creamos un objeto de una clase, ese objeto es una **instancia** de la clase. 

# Método constructor
Es un método especial, que resuelve el primer problema inicializando el objeto siempre en la misma manera, y no se puede olvidar. Es la única manera crear un objeto de una clase.

```javascript
let hoy = new FechaSimple(24, 10, 2018); //Llama el constructor del FechaSimple con los argumentos
```

## Validez del los datos y el estado del objeto
Intentamos diseñar nuestros clases en una manera que garantiza que su estado esta valida. Usando un `constructor` que sabes iniciar solo con valores validos. Creando métodos que solo cambian valores en una manera que deja los valores del objeto siempre en un estado valido.

Obviamente, solo el hecho que tenemos un `constructor` y métodos no garantiza el validez. _**PERO**_, si hemos equivocado hay un lugar concreto y fácil encontrar donde corregir los errores. 

## Proteger los datos del objeto
Para asegurarnos que nada o nadie altera los datos del objeto fuera de los métodos _oficiales_ seria bueno si podríamos proteger los datos o propiedades de alteración directa, fuer de los métodos diseñado por tal fin.

En `JavaScript` y los clases no hay desafortunadamente ningún mecanismo inherente o nativo para hacer esto. Tenemos que hacerlo usando convenciones, y nuestra propia disciplina para cumplirlo. En otros lenguajes de programación en muchas ocasiones hay palabra claves para proteger los miembros (propiedades) del los clases y objetos.

Si prestaba atención en el ejemplo arriba del clase <span class="hljs-title">FechaSimple</span> los propiedades tiene un prefijo **'`_`'** como **`_dia`**  etc. Así, podemos usar la convención que propiedades con ese prefijo son _**privados**_ y no se debe usar n tocar fuera del clase que los defina.


## Propiedades en clases


En las declaraciones de clases, no se declara simple propiedades como en los objetos, por ejemplo <span class="hljs-attr">dia</span> y <span class="hljs-attr">mes</span> abajo.

```javascript
let fecha = {
    dia: 3,
    mes: 12
};
```
Para añadir propiedades en los clases, se crea o añade los propiedades en el <span class="hljs-keyword">constructor</span> como:

```javascript
class Fecha {
    constructor(dia, mes)
    {
        this.dia = dia;
        this.mes = mes;
    }
}
```

Esto crea dos propiedades en los objetos instanciado del clases <span class="hljs-title">Fecha</span> y se puede acceder y usar como de siempre:
```javascript
let hoy = new Fecha(4, 3); // 4 de marzo

console.log(hoy.dia); // 4

```
## Similar como añadimos propiedades dinámicamente en JavaScript

```javascript
let fecha = {};
fecha.dia = 3;
fecha.mes = 12;
```



## Métodos **`get`** y **`set`** (getter y setter)

Pero, si creamos los propiedades como arriba, es facil acceder y alterarlo sin darse cuenta, usando la convención de _ hacemos la misma pero 'esconderlos' con la convención. 
Ya solo falta una manera de acceder y alterar estos datos en una manera segura y controlada. Por eso en los clases tenemo los metodos `get` y `set`.

### El método **`get`**
El método `get` es una función que se comporta como una propiedad, para llamarle no hace falta los brackets o paréntesis **()**, y retorna un valor. 

```javascript
class Fecha {
...
    get mes()
    {
        return this._mes;
    }
...
}
let f = new Fecha(...);
console.log(f.mes);

```

### El método **`set`**
El método  `set` es una función que se comporta como una propiedad, se recibe un parametro representando el valor que queremos asignar, pero para llamarle no hace falta los brackets/paréntesis (), solo el sintaxis para asignar valor con **`=`** . 

```javascript
class Fecha {
...
    set dia(dia){
    {
        return this._dia = dia;
    }
...
}
let f = new Fecha(...);
f.dia = 23;

```



## Ejemplo: Clase con métodos **`get`** y **`set`**
```javascript
class Fecha {
    constructor(dia, mes)
    {
        this.dia = dia;
        this._mes = mes;
    }
    get mes()
    {
        return this._mes;
    }
    get dia(){
        return this._dia;
    }
    set dia(dia){
        let diferencia = dia;
        while(diferencia>31) // Mientras nos queda mas que 31, incrementamos el mes
        {
            diferencia = diferencia - 31;
            this._mes++;
        }
        this._dia = diferencia; // Lo que queda es el dia en el mes actual
    }
}
```
*Hay una problema con esa clase, intenta averiguarlo...


## El uso de estas propiedades es igual qua cualquiera normal 

```javascript
let f = new Fecha(1,1);
f.dia = 64;
console.log(f.dia, f.mes); // 2 3
```

## Grandes ventajas con **`get`** y **`set`**

En los dos casos, con el get y el set podemos _**interceptar el acceso**_, igual leyendo el valor y asignando un valor. Así se pueden añadir logico, o cálculos etc. al los propiedades cuando están leídos o asignados.

También con **`get`** podemos hacer un _propiedad de solo lectura_, simplemente no implementamos ninguno método **`set`** con el mismo nombre. Así solo hay _una funcion para leer_ el valor, y ninguna para asignar un valor.

```javascript
class SoloLectura
{
    constructor(nombre)
    {
        this._nombre = nombre;
    }
    get Nombre() {
        return this._nombre;
    }
}

let obj = new SoloLectura("Solo Lectura");
console.log(obj.Nombre);
obj.Nombre = "No funciona!";

```
<img src="./OnlyGetter.png" alt="Exception has occurred: TypeError Cannot set property Nombre of #<Lectura> which has only a getter" title="Exception has occurred: TypeError Cannot set property Nombre of #<Lectura> which has only a getter">

## Propiedades calculadas
Con **`get`** y **`set`** puedes tener propiedades _virtuales_, es decir actúan como propiedades pero no hay una sola pieza de datos que les corresponda. También se pueden considerar propiedades calculadas.

## **`get`** calculado de otros datos

### **nombre**
```javascript
class Persona {
    constructor(nombre_de_pila, apellidos)
    {
        this._nombre_de_pila = nombre_de_pila;
        this._apellidos = apellidos;
    }
    get nombre()
    {
        return this._nombre_de_pila + " " + this._apellidos;
    }
}
let p = new Persona("Jonas", "Brandel");
console.log(p.nombre);
```
### **fecha**
```javascript
class Fecha {
    constructor(dia, mes, ano)
    {
        this._dia = dia;
        this._mes = mes;
        this._ano = ano;
    }
    get fecha(){
        return this._dia + "/" + this._mes + "/" + this._ano;
    }
}
```

## Propiedad **`set`** parseado (deconstruido) en sus partes

Hay situaciones cuando hay varias maneras expresar un valor, puede que es una manera conjunta, como por ejemplo una fecha como "2 de enero de 1968", o "2/1/1968" etc. pero en nuestras clases guardamos esto separado en día, mes, año.

Aunque así, por para mayor comodidad queremos que el uso de nuestra clase puede directamente usar una fecha así.

## Asignar el valor

```javascript
let f = new Fecha();
f.fecha = "2/1/1968";
console.log(f.ano); //1968
```

## Sacar/leer el valor

```javascript
let f = new Fecha(2, 1, 1968);
console.log(f.fecha); //"2/1/1968"
```

Con la 'magia' de metodos  **`get`** y  **`set`** podemos intreceptar y convertir a y desde nuestro formato interno.

```javascript
class Fecha {
    constructor(dia, mes, ano)
    {
        this._dia = dia;
        this._mes = mes;
        this._ano = ano;
    }
    get ano()
    {
        return this._ano;
    }
    get fecha(){
        //Calculando el string de fecha para retornar como propiedad
        return this._dia + "/" + this._mes + "/" + this._ano; 
    }
    set fecha(fechaCompuesta)
    {
        //Descontruir el string recibido como propiedad, y guardando en nuestro formato interno
        let partes = fechaCompuesta.split("/"); //divide un string en un array de 3 partes 
        this._dia = partes[0];
        this._mes = partes[1];
        this._ano = partes[2];
    }
}

let f = new Fecha();
f.fecha = "2/1/1968";
console.log(f.ano); //1968
```

# Herencia
```javascript
class Criatura {
}

class Mamifero extends Criatura {
}

class Humano extends Mamifero {
}

let yo = new Humano();
console.log(yo instanceof Humano);
console.log(yo instanceof Mamifero);
console.log(yo instanceof Criatura);

let gato = new Mamifero();
console.log(gato instanceof Humano);
console.log(gato instanceof Mamifero);
console.log(gato instanceof Criatura);
```


```javascript
class Mueble {
    constructor(tipo)
    {
        this._tipo = tipo;
    }
    get tipo()
    {
        return this._tipo;
    }
}

class MuebleConPatas extends Mueble
{
    constructor(tipo, cantidad_patas)
    {
        super(tipo);
        this._cantidad_patas = cantidad_patas;
    }
    get numeroDePatas()
    {
        return this._cantidad_patas;
    }
}

class Mesa extends MuebleConPatas
{
    constructor()
    {
        super("Mesa", 4);
    }
}

class Silla extends MuebleConPatas
{
    constructor()
    {
        super("Silla", 4);
    }
}

let s = new Silla();
let m = new Mesa();
let t = new MuebleConPatas("Taburete", 3);
let e = new Mueble("Estanteria");

function printMueble(mueble)
{
    if(!(mueble instanceof Mueble))
        throw "No es un mueble";

    let detalles = mueble.tipo;
    if(mueble instanceof MuebleConPatas)
    {
        detalles += " tiene " + mueble.numeroDePatas + " patas";
    }
    else
    {
        detalles += " no tiene patas";
    }
    console.log(detalles);
}

printMueble(s); //Silla tiene 4 patas
printMueble(m); //Mesa tiene 4 patas
printMueble(t); //Taburete tiene 3 patas
printMueble(e); //Estanteria no tiene patas
```
