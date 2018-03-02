[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

[In English](./recursion_en.html)
# Recursión
## Para entender recursividad, entienda una parte de recursividad y luego el resto de recursividad.

En la vida cotidiana estamos rodeados de recursión. Hay estructuras recursivas en todas partes, hechas por el hombre y en la naturaleza. Asimismo muchas tareas repetitivas son recursivas o pueden ser consideradas recursivas.

##  Matryoshka muñecas tradicionales son recursivas en estructura
<img src="./Nested_Matryoshka_Dolls.jpg" style="width:60%;min-width:500px;max-width:600px;" alt="Matryoshka muñecas anidado recursivamente" title="Matryoshka muñecas anidado recursivamente" >




## Recursión infinita: un cuadro de un cuadro de un cuadro de un cuadro...
<img src="https://i.imgur.com/jMLR0.jpg" style="width:60%;min-width:500px;max-width:600px;" alt="Imagen recursiva anidada en una imagen en una imagen... cortesía de Imgur" title="Imagen recursiva anidada en una imagen en una imagen... cortesía de Imgur" >
<br/>Imagen recursiva anidada en una imagen en una imagen... cortesía de Imgur



## Qué bien que nuestro manos no son recursivas...  
<img src="./RecursiveHand.jpg" style="width:60%;min-width:500px;max-width:600px;" alt="Mano recursiva de la película Dr. Strange" title="Mano recursiva de la película Dr. Strange" >
<br/>Mano recursiva de la película Dr. Strange





# Leer un libro con 100 páginas usando un enfoque recursivo

1. **Problema:** leer un libro con 100 páginas
<br/> **Solución:** si hay páginas no leídas, lea una página y luego lea un libro con 99 páginas.

2. **Problema:** leer un libro con 99 páginas
<br/> **Solución:** si hay páginas no leídas, lea una página y luego lea un libro con 98 páginas.

3. **Problema:** leer un libro con 98 páginas
<br/> **Solución:** si hay páginas no leídas, lea una página y luego lea un libro con 97 páginas.

3. **Problema:** leer un libro con 97 páginas
<br/> **Solución:** si hay páginas no leídas, lea una página y luego lea un libro con 96 páginas.

### ........ pasos excluidos para la brevedad ..........

99. **Problema:** leer un libro con 2 páginas
<br/> **Solución:** si hay páginas no leídas, lea una página y luego lea un libro con 1 páginas.
 
100. **Problema:** leer un libro con 1 páginas
<br/> **Solución:** si hay páginas no leídas, lea una página y luego lea un libro con 0 páginas.

101. **Problema:** leer un libro con 1 páginas
<br/> **Solución:** si hay páginas no leídas, no hay páginas no leídas así que para aquí!


# Solución generalizada: Leer un libro con **n** páginas

1. **Problema:** Leer un libro con **n** páginas
<br/> **Solución:** Si hay páginas no leídas, leer una página y luego leer un libro con **n-1** páginas.

2. **Problema:** Leer un libro con **n-1** páginas
<br/> **Solución:** Si hay páginas no leídas, leer una página y luego leer un libro con **n-2** páginas.

### ........ repita hasta ..........

 **Problema:** Leer un libro con **n-n** páginas
<br/> **Solución:** No hay páginas no leídas, así que para aquí!


# Diga en voz alta todos los números del 1 al 5
1. **Problema:** Diga en voz alta todos los números del 1 al 5
<br/> **Solución:** Decir en voz alta el número 1, y luego decir en voz alta los números de 2 a 5

2. **Problema:** Diga en voz alta todos los números del 2 al 5
<br/> **Solución:** Decir en voz alta el número 2, y luego decir en voz alta los números de 3 a 5

3. **Problema:** Diga en voz alta todos los números del 3 al 5
<br/> **Solución:** Decir en voz alta el número 3, y luego decir en voz alta los números de 4 a 5

4. **Problema:** Diga en voz alta todos los números del 4 al 5
<br/> **Solución:** Decir en voz alta el número 4, y luego decir en voz alta los números de 5 a 5

5. **Problema:** Diga en voz alta todos los números del 4 al 5
<br/> **Solución:** Decir en voz alta el número 5, entonces no hay más números que decir.

# Solución generalizada: diga en voz alta todos los números de **n** a **m**
1. **Problema:** Diga en voz alta todos los números del **n** al **m**
<br/> **Solución:** Decir en voz alta el número **n**, y luego decir en voz alta los números de **n+1** a **m**

2. **Problema:** Diga en voz alta todos los números del **n** al **m**
<br/> **Solución:** Decir en voz alta el número **n**, y luego decir en voz alta los números de **(n+1)+1** a **m**

### ........ repita ..........

**Problema:** Diga en voz alta todos los números del **n+x** al **m**, cuando **n+x == m**
<br/> **Solución:** Decir en voz alta el número **n+x**, cuando **n+x == m** entonces no hay más números que decir.


# Ahora con la programación...
En vez de decir en voz alta los números, vamos a imprimirlos en la consola...
# Imprime todos los números del 1 al 5 en la consola

1. **Problema:** Imprime todos los números del 1 al 5
<br/> **Solución:** Imprime el número 1, luego imprime los números del 2 al 5

2. **Problema:** Imprime todos los números del 2 al 5
<br/> **Solución:** Imprime el número 2, luego imprime los números del 3 al 5

3. **Problema:** Imprime todos los números del 3 al 5
<br/> **Solución:** Imprime el número 3, luego imprime los números del 4 al 5

4. **Problema:** Imprime todos los números del 4 al 5
<br/> **Solución:** Imprime el número 4, luego imprime los números del 5 al 5

5. **Problema:** Imprime todos los números de 5 a 5
<br/> **Solución:** Imprime el número 5, y luego no hay más números para imprimir!


# Solución generalizada: Imprime todos los números de **n** a **m**
1. **Problema:** imprimir todos los números de **n** a **m** 
<br/> **Solución:** imprimir el número **n**, a continuación, imprimir los números de **n + 1** a **m**

2. **Problema:** imprimir todos los números de **n+1** a **m**
<br/> **Solución:** imprimir el número **n+1**, a continuación, imprimir los números de **(n+1)+1** a **m**

### ........ repita ..........

**Problema:** imprimir todos los números de **n+x** a **m**, cuando **n+x == m**
<br/> **Solución:** imprimir el número **n+x**, cuando **n+x == m** no hay más números para imprimir!

# Con código JavaScript

<img src="./RecursivePrint.png" style="width:60%;min-width:500px;max-width:600px;" alt="Imprimir números recursivamente en JavaScript" title="Imprimir números recursivamente en JavaScript" >