/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 1.2.3.4
   - Port : 7777

  Donne l'URL : http://1.2.3.4:7777
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de
  réponse en format HTML obtenu à partir du contenu d'un fichier.

  Vous devez donc créer un fichier HTML valide à coté de votre programme.

  A chaque requête HTTP reçue, vous utiliserez les méthodes asynchrones de
  l'objet FileSystem de Node JS pour lire et obtenir le contenu de votre fichier
  HTML. Puis, vous produirez une réponse HTTP contenant le contenu du fichier
  HTML.
**/

const http = require("http");
const fs = require("fs");
const path = require("path");

// Chemin vers le fichier HTML
const filePath = path.join(__dirname, "index-ex3.html");

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  // Lire le fichier HTML de manière asynchrone
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // En cas d'erreur, envoyer une réponse 500
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Erreur interne du serveur");
    } else {
      // Envoyer le contenu du fichier HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

// Démarrer le serveur sur le port 1216
server.listen(1216, () => {
  console.log("Bienvenue sur mon localhost 1216");
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
