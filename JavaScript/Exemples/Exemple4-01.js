var nombre = [1, 2, 3, 7, 11];
// on demande à l'utilisateur un nombre pour multiplier les différentes entrées du tableau :  tant qu'il n'est pas fournit (entre 2 et 1000), on repose la question
/* isNan : 
    1. parseInt("") -> NaN -> true
    2. parseInt(null) -> NaN -> true
    3. parseInt("un texte") -> NaN -> true
    4. parseInt ("17.876") -> 17 -> false
    => la boucle qui 'encadre' la question doit se poursuivre, tant que nous n'avons pas un nombre.
    */

var saisie = NaN;
while (isNaN(saisie) || saisie < 2 || saisie > 1000) {
  saisie = prompt("Donnez un chiffre entre 2 et 1000 (compris)");
  saisie = parseInt(saisie);
}
// avec le nombre fourni, on multiplie chaque indice du tableau
var resultats = [];
for (var i = 0; nombre[i]; i++) {
  resultats[i] = nombre[i] * saisie;
}
// chaque résultat de chaque opération est placé dans un nouvel indice, par exemple (multiplication par 2) : [1,2,3,7,11,2,4,6,14,22];
// on utilise la valeur finale de i de la boucle précedente pour partir du premier indice qui n'existe pas dans le tableau nombre -> utilisation j + i pour cibler les indices inexistants:
for (var j = 0; resultats[j]; j++) {
  nombre[j + i] = resultats[j];
}
// Ensuite l'ensemble des nombres sont assemblés sous la forme d'une chaine de caractère : "1-2-3-7-11-2-4-6-14-22";
var assemblage = "Le résultat; avec le nombre " + saisie + " , donne : ";
// je n'ai plus besoin de la variable i, je peux donc le réutiliser ci-dessous
for (var i = 0; nombre[i]; i++) {
  var fintexte = "";
  if (nombre[i + 1]) fintexte = " - ";
  assemblage += nombre[i] + fintexte;
}
// cette chaîne est affichée à l'utilisateur
alert(assemblage);
