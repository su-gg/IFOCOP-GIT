console.log('Ceci est un module');

const valeur1 = 'Ceci est une première valeur à exporter';

const fonction1 = function(){
  // ceci est une fonction à exporter
}

const estVrai1 = true; // ceci est un booléen à exporter

module.exports; // cette propriété contient un objet vide par défaut

// On peut écrire :
/*
module.exports.laValeur1 = valeur1;
module.exports.laFonction1 = fonction1;
module.exports.laValeurEstVrai1 = estVrai1;
*/
// La propriété exports est référencée dans l'objet global de node
// On peut y accéder directement sans indiquer l'objet module :
exports.laValeur1 = valeur1;
exports.laFonction1 = fonction1;
exports.laValeurEstVrai1 = estVrai1;