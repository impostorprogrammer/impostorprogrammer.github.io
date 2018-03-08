[//]: # ( spellcheck-language es )
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-58458282-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-58458282-5');
</script>

# C++ MODERNO - AKA C++ >= 11

Las nuevas características omnipresentes en C++ moderno que muestran por qué el código de C++ 11 y más allá es limpio, seguro y rápido, tan limpio y seguro como el código escrito en cualquier otro lenguaje moderno y corriente, y con el rendimiento tradicional de C++ tan fuerte como siempre.
Maneras que hacer que el código sea más robusto y más fácil de mantener, como evitar fugas de memoria, más validación durante compilación, asegurar como evitar una resolución de sobrecarga incorrecta o no intencionada, y maneras para facilitar refactorización de código y más.

Miramos patrones y paradigmas como hacer el código escalable y robusto con mejores prácticas de multihilo, concurrencia y minimización de “cuellos de botella” y bloqueos.


```cpp

    #include<vector>
    #include<string>
    #include<iostream>
    #include<algorithm>
    using namespace std;

    int main()  // small program messing around with strings
    {
        cout << "enter some whitespace-separated words:\n";
        vector<string> v;
        string s;
        while (cin>>s) v.push_back(s);

        sort(v.begin(),v.end());

        string cat;
        for (auto & str : v) cat += str+"+";
        cout << cat << '\n';
    }

```