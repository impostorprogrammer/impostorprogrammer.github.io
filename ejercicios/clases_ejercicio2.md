[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# Clases Ejercicio 2
## Herencia

Crea 3 clases: Gato, Rata y Perro que tienen el mismo super-clase

Todo los clases, tiene tipo, peso y nombre.

Evita duplicar código, usa herencia!

El tipo (propiedad) de unos de estos objetos no se pueden cambiar, se inicializa cuando el objeto es instanciado.

## Ejemplo de uso
```javascript
const oGato = new Gato(3.3, "Felino");
console.log(oGato.tipo + " " + oGato.peso + " " + oGato.nombre); // Gato 3.2 Felino

const oPerro = new Perro(7.1, "Fido");
console.log(oPerro.tipo + " " + oPerro.peso + " " + oPerro.nombre); // Perro 7.1 Fido

oPerro.tipo = "Leon"; //Excepcion: TypeError: Cannot set property tipo of #<Perro> which has only a getter
```



# Solucion:


```javascript



class Animal {
    constructor(tipo, peso, nombre)
    {
        this._tipo = tipo;
        this.peso = peso;
        this.nombre = nombre;
    }
    get tipo(){
        return this._tipo;
    }
}

class Gato extends Animal {
    constructor(peso, nombre)
    {
        super("Gato", peso, nombre);
    }
}

class Perro extends Animal {
    constructor(peso, nombre)
    {
        super("Perro", peso, nombre);
    }
}

class Rata extends Animal {
    constructor(peso, nombre)
    {
        super("Rata", peso, nombre);
    }
}

const oGato = new Gato(3.3, "Felino");
console.log(oGato.tipo + " " + oGato.peso + " " + oGato.nombre); // Gato 3.2 Felino

const oPerro = new Perro(7.1, "Fido");
console.log(oPerro.tipo + " " + oPerro.peso + " " + oPerro.nombre); // Perro 7.1 Fido

oPerro.tipo = "Leon"; //Excepcion: TypeError: Cannot set property tipo of #<Perro> which has only a getter


```