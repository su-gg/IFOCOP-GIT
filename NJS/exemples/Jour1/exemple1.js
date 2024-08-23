// Un fichier contenant du code qui sera à faire exécuter par node s'appelle un module (de code)

// Le module dont on demande l’exécution en premier est appelé : module principal

// Instruction exécutée au sein du module principal : 
console.log("ceci est un fichier écrit en Javascript !");

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

// Pour savoir quelle est la prise en charge de la (version) de syntaxe
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





