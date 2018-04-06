[//]: # ( spellcheck-language es )


# Proyecto de ejercicio C# 6 hasta 7.2 con 'async' y 'await' programación

Esto es un pequeño proyecto para aprender y practicar las novedades del C# 6.0, 7.0, 7.1 y 7.2 en un proyecto usando un modelo de programación asincrónico.

## Ejemplos de código de referencia
En el proyecto _dotnet_samples\CSharp7Project_ encontrarás algunos trozo de código ilustrando como hacer ciertas cosas en adición de los ejemplos disponible el el resto de la solución dotnet_samples.

La solución dotnet_samples esta disponible en GitHub https://github.com/JonasBr68/dotnet_samples


# Utilice siempre la nueva sintaxis, maneras y patrones
Seguramente no hay como usar lo todas en este proyecto, pero la mayora si se puede.

## Un repaso de las novedades para recordarlos y usarlo!
  ## **C# 6.0**
   1. Propiedades automáticas de sólo lectura
   2. Inicializadores de propiedades automáticas
   3. Funciones con el cuerpo como expresión
    Función 
    Propiedad 
   4. `using static` - Insertar funciones en el namespace
   5. Operador condicional de `null ?.`  y  `?[]`
   6. Interpolación en string
   6.2 Nuevo tipo `FormattableString`
   7. Filtros de excepciones
   8. Expresión `nameof(myVar)`
   9. `await` en bloques de `catch` y `finally`
   10. Inicializadores de índice
   11. Métodos de extensión para inicializadores de colección
  
  ## **C# 7.0**
   1. Variables `out`
   2. Tuplas y deconstrucción `ValueTuple` `Deconstructor(...)`
   3. Descartes - Discards
   4. Coincidencia de patrones - Pattern Matching
   5. `ref` locales y retornos
   6. Funciones locales - anidados dentro otra función
   7. Mas miembros con el cuerpo como expresión
   8. Expresiones `throw`
   9. Mejoras en la sintaxis literal numérica
##   **C# 7.1**
   1. método Main asincrónico (`async`)
   2. Expresiones literales de `default`
   3. Nombres de elementos de tupla inferidos
##   **C# 7.2**
   1. Semántica de referencia con tipos de valor
   2. Guion bajo comenzando literal numérico
   3. `private protected` modificador de acceso


# El proyecto - Descarga asíncrona, deserialización en tipos fuertes usando tuplas y clases, deconstrucción y serialización de culturas con asincronicidad

Vamos descargar un archivo tipo JSon asincrónicamente, serializarlo en tipos fuertes con tuplas y clases, usando coincidencia de patrones/tipo para enlace dinámicamente y crear los tipos fuerte correspondiente. Todo la estructura de llamadas debe tener característica usando `async/await`. 

Con el entrada `Main` declarado como:

```CSharp
        static async Task Main(string[] args)
        {
```

Después de serializar el archivo en tipos fuertes, vamos crear versiones del archivo para cada cultura disponible en el ordenador, y serializar en archivos separado en una manera asincrónica. 

## Usa un proyecto tipo consola, con versión de lenguaje 7.2 y dirigiéndose a .NET 4.7.1

## Tipos
Vamos crear dos tipos o jerarquías de tipos representado los datos en el archivo.
### La primero usando neo-tuplas (C# 7.*)
### La segunda una jerarquías de clases/structs mas tradicional, aunque implementado métodos de `Deconstruct`


## Descargar archivo asincrónicamente
El archivo para descargar es disponible en http://www.impostorprogrammer.com/articles/modern_csharp/sample.json



## Deserialización en tipo con tuplas
Deserialización de archivo en objeto tipado fuerte `DocumentStruct`

	• Solo el objeto representando el archivo puede ser un tipado class/struct nombrado, el resto debe ser en forma de tuplas (`ValueTuple`) en una manera similar del clase `DBEmulator` en .\dotnet_samples\CSharp7Console\ProgramCS7.cs
	• La deserialización tiene que ser ejecutado en un hilo del thread pool usando el `Task.Run`

## Crear un clase `DocumentClass`
Con la misma estructura que `DocumentStruct`, pero con tipos explicito declarados como `class Teacher` , `class Pupil` etc, 
Ejemplo:
```CSharp
Ilist<Teacher> DocumentClass.Teachers { get; }
```
Todo tipos debe tener "Deconstructores" correspondiente de las tuplas declarado/usado en `DocumentStruct` para los mismo datos.

Un object tipo `DocumentClass` puede ser inicializado con un instancia de un `DocumentStruct`, 

Un objeto tipo `DocumentStruct` puede ser inicializado fácilmente desde un instancia de un `DocumentClass` y sus descendientes usando los "Deconstructores".

Mientras es posible, todo los miembros del `DocumentClass` y sus descendientes debe tener todo los miembros declarado con estilo "cuerpo como expresión" incluyendo la constructora.

## Propiedades lectura solo
Todo los propiedades del tipo "colección"  `DocumentClass` y `DocumentStruct` debe ser de solo lectura.

## Inicializadores de propiedades automáticas
Todo los propiedades que requiere inicialización por defecto deben ser inicializado en su declaración.


## Usa el JSON.NET para parsear el documento
Ver ejemplo en dotnet_samples\CSharp7Project\ProgramProjectSample.cs

```CSharp
           dynamic stuff = JsonConvert.DeserializeObject(jsonSample);

            foreach(var t in stuff.teachers)
            {
                WriteLine(t.name);
            }
```

## Coincidencia de patrones
Usa coincidencia de patrones con `switch` para atravesar la estructura con el objeto `dynamic` del json.
Parecido de eso, para cada elemento llamar código correspondiente  para cada tipo 'fuerte'
Tienes que boxear el `dynamic` para funcionar con coincidencia de patrones.

```CSharp
dynamic foo = 10;
switch ((object)foo)
{
    case int i:
        Console.WriteLine("int");
        break;
    default:
        Console.WriteLine("other");
        break;
}
```


## Funciones Locales
En todas métodos `async`, separa el parte `async` de validación de parámetros usando funciones locales para el parte `async`, ver ejemplo en dotnet_samples\CSharp7Console\LocalFunctions.cs

## LinQ metodos
Crea métodos recibiendo parámetros y retornando `IEnumerable` de tuplas en tu clase/struct.

## `string ToString(IFormatProvider formatProvider)`
 `DocumentClass` y `DocumentStruct` debe tener un método `ToString` como esa, que utiliza `FormattedString` and  interpolación de string para convertir el `objeto` en un `string`, usando el `CultureInfo` en `formatProvider`.

## Formato
El formato del string retornado debe coincidir con la estructura semántica (no de la sangría etc.) del archivo original, con la diferencia de fechas y números etc usan formatos correspondiente del CultureInfo usado.


## Archivos para toda culturas
Crea archivos por cada cultura disponible usando async IO y el `DocumentStruct/Class.ToString`

### Toda culturas disponible con:
```CSharp
CultureInfo[] cultures = CultureInfo.GetCultures(CultureTypes.AllCultures);
```

### Ejemplo escribir texto en archivo `async`

```CSharp
       static async Task WriteTextAsync()
        {
            using (StreamWriter writer = File.CreateText("newfile.txt"))
            {
                await writer.WriteAsync("Example text as string");
            }
        }
```


# BUENA SUERTE!