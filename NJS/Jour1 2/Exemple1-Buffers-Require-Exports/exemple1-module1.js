console.log("Ce code est exécuté dans le fichier exemple1-module1.js");


const valeurCreeDansLeModule = "Une valeur créé dans le module 1";


// Ici on peut utiliser la propriété module.exports
// pour declarer la valeur de retour du require() de
// ce module :
module.exports = valeurCreeDansLeModule;
// La définition du contenu de module.exports ne doit
// avoir lieu qu'une seule fois dans le module 1.
