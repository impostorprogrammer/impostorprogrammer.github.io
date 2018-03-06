[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# Clases Ejercicio 1 
## Diseña una clase que representa un Libro
Libros tiene Títulos, la clase Libro tiene una propiedad Titulo, solo lectura. El titulo se guarda en el constructor.


## Diseña otra clase que representa una Estantería
Cada estantería tiene un propiedad lectura solo, libros que retorna la colección de libros guardado.

Los Libros se pueden guardar en una Estantería. Cada libro guardado, tiene una propiedad Estantería que contiene una referencia al Estantería donde esta guardado.

## Los dos clases Libro y Estanteria se pueden usar en esa manera:
```javascript
let libro1 = new Libro("Libro1");
let libro2 = new Libro("Libro2");

let estanteria1 = new Estanteria("e1");

libro1.guardameEn(estanteria1);
libro2.guardameEn(estanteria1);
console.log(libro1.estanteria.nombre); // e1
console.log(estanteria1.libros.length); // 2
console.log(estanteria1.libros[0].titulo); // Libro1

```






# Solucion:


```javascript




class Libro {
    constructor(titulo) {
        this._titulo = titulo;
    }

    get titulo() {
        return this._titulo;
    }
    get estanteria() {
        return this._estanteria;
    }
    guardameEn(estanteria) {
        this._estanteria = estanteria;
        this._estanteria.libros.push(this);
    }
}

class Estanteria {
    constructor(nombre)
    {
        this._nombre = nombre;
        this._libros = [];
    }
    get nombre(){
        return this._nombre;
    }
    get libros()
    {
        return this._libros;
    }
}

let libro1 = new Libro("Libro1");
let libro2 = new Libro("Libro2");

let estanteria1 = new Estanteria("e1");

libro1.guardameEn(estanteria1);
libro2.guardameEn(estanteria1);
console.log(libro1.estanteria.nombre); // e1
console.log(estanteria1.libros.length); // 2
console.log(estanteria1.libros[0].titulo); // Libro1
```

