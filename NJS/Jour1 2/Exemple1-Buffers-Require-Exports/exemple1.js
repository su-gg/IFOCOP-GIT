// Un fichier contenant du code  qui sera à faire exécuter par node
// s'appelle un module (de code).

// Le module dont ont demande l'exécution en premier est appelé
// module principal.

// Instruction exécutée au sein du module principal.
console.log("Ceci est un fichier écrit en JavaScript !");

// Exemples d'éléments syntaxiques acceptés par le moteur JS de  Node.js
const maConstante = "Ceci est un texte qui ne changera jamais";

const additionneur = (a, b) => {
  return a + b;
}

class FabricantDeVoiture {
  constructor(p, c) {
    this.proprietaire = p;
    this.couleur = c;
  }
}

const v1 = new FabricantDeVoiture('Sami', 'rouge');

console.log(v1);

// Pour savoir quel est la prise en charge de la (version) de syntaxe
// ECMAScript(/JavaScript), vous pouvez utiliser : https://node.green/

/**
 * Nouveau de type de données : Les "Buffers"
 * Un Buffer représente des octets (bytes).
 * Un Octet c'est un groupe de 8 bit, exemple : 10101111 (8 bits)
 * Les données dans un stockage persistant (disque dur, ssd, clé usb, etc..)
 * ou un stockage volatile (mémoire vive) d'ordinateur sont toujours stockées
 * sous la forme d'octets.
 * Exemple :
 * Prenons un bitmap 50 pixels par 50 pixels.
 * Sur le stockage chaque pixel sera stocké sous la forme d'un groupe de 3 octets
 * 1 octet pour la teinte de rouge.
 * 1 octet pour la teinte de vert.
 * 1 octet pour la teinte de bleu.
 * Donc 150 octets pour la première ligne de pixels
 * Etant donné qu'il y'a 50 lignes de 50 pixel, au total j'aurais
 * 50 x 150 = 7500 octets pour décrire chaque pixel du bitmap.
 * Au debut des 75000 octets, on mettra des octets qui décrivent
 * - la largeur 00110010 (représentation de 50 en binaire)
 * - la hauteur 00110010 (représentation de 50 en binaire)
 * Au total mon image de 50 pixels par 50 pixels occupera un espace disque de :
 * 7502 octets.
 */
// Pour manipuler les octets, l'API de Node nous propose un constructeur Buffer
// @voir : https://nodejs.org/docs/latest-v20.x/api/buffer.html

const leBufferCorrespondantAUnTexte = Buffer.from("ceci est un texte");

// Ici on affiche le buffer dans la console.
console.log(leBufferCorrespondantAUnTexte);
// Pour la facilité de lecture le buffer est affiché selon une représentation
// hexadécimale (63 en base 16 correspond 01100011 en base 2, etc...)
const leBufferCorrespondantALaLettreE = Buffer.from("e");
console.log("Buffer correspondant à la lettre e :", leBufferCorrespondantALaLettreE);

// Conversion d'un Buffer en chaîne de caractère utf-8:
const conversion = leBufferCorrespondantALaLettreE.toString('utf-8');
console.log("Conversion du Buffer précédent en caractère :", conversion);

/** Modularisation
 * Comment faire pour utiliser plusieurs modules (généralement à partir du
 * module principal).
 * Historiquement on utilise un spécification de modularisation qui s'appelle
 * Common JS (CJS). Cette spécification décrit comment un module peut faire
 * appel à un autre module et comment on peut obtenir des valeur créé dans
 * un autre module dans le module qui y fait appel.
*/

// La méthode native .require de l'objet natif module permet de demander
// l'exécution du code d'un autre module :
module.require('./exemple1-module1.js');

// Cette méthode peut également être exécuté sans spécifié le nom de l'objet
// natif module qui la contient. Exemple :
require('./exemple1-module1.js');  // équivaut à module.require('./exemple1-module1.js')

// Lorsqu'on exécute require(), le code du module n'est pas REEXECUTE.
// Le code du module appelé par require() n'est exécuté que lors du
// PREMIER require().
module.require('./exemple1-module1.js');
module.require('./exemple1-module1.js');
module.require('./exemple1-module1.js');
module.require('./exemple1-module1.js');
module.require('./exemple1-module1.js');
module.require('./exemple1-module1.js');
module.require('./exemple1-module1.js');


const valeurObtenueEnSortieDuModule1 = module.require('./exemple1-module1.js');
// La valeur obtenue en sortie module 1 est
// la valeur défini dans module.exports dans
// le module 1.
console.log(valeurObtenueEnSortieDuModule1);

const onRecupereLaMemeValeur = module.require('./exemple1-module1.js');
// Le code du module n'est pas REEXECUTE. La valeur
// retournée est la valeur déjà retournée la première
// fois.

console.log(onRecupereLaMemeValeur);

// Si un dossier node_modules existe et qu'il contient un fichier
// exemple1-module2.js. On peut écrire :
module.require('exemple1-module2'); // déclenche exemple1-module2.js
// Si un dossier node_modules existe et qu'il contient un sous dossier
// exemple1-module3 qui contient un fichier index.js. On peut écrire :
module.require('exemple1-module3'); // déclenche exemple1-module3/index.js
// Si un dossier node_modules existe dans le dossier parent qu'il contient un
// sous dossier exemple1-module4 ou un fichier exemple1-module4.js. On peut
// écrire :
module.require('exemple1-module4');




