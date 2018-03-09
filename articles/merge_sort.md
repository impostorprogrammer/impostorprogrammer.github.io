[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# Merge sort - Ordenamiento por mezcla



1. Ordena una lista
2. Si la lista solo tiene un elemento, esta ordenada
3. Divide la lista en dos partes, y luego ordena cada lista 
<br/>(recursividad - Vuelve a paso 1 con cada parte/lista)
4. Con los dos listas ordenadas, combina los dos en una lista ordenada
5. Retorna la lista ordenada

<img src="Merge-sort-example-300px.gif">
Image Author: Swfung8 from https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif

<img src="merge-sort-diagram.png">

```javascript
function mergeSort(toSort)
{
    var toSortArray = [...toSort];
    if(toSort.length < 2)
        return toSort;
    //even sized arrays
    //Divide in two
    var left = toSortArray.slice(0, Math.round(toSortArray.length/2));
    var right = toSortArray.slice(Math.round(toSortArray.length/2));
    
    var leftSorted = mergeSort(left);
    var rightSorted = mergeSort(right);

    var result = merge(leftSorted, rightSorted);
    return result;
}

function merge(leftSorted, rightSorted)
{
    let merged = [];
    let leftRemoved = 0;
    let rightRemoved = 0; 
    while(leftSorted.length - leftRemoved > 0 && rightSorted.length - rightRemoved > 0)
    {
        if(leftSorted[0] <= rightSorted[0])
            merged.push(leftSorted[leftRemoved++]);
        else
            merged.push(rightSorted[rightRemoved++]);
    }
    while(leftSorted.length - leftRemoved > 0)
    {
        merged.push(leftSorted[leftRemoved++]);
    }
    while(rightSorted.length - rightRemoved > 0)
    {
        merged.push(rightSorted[rightRemoved++]);
    }
    return merged;
}
```