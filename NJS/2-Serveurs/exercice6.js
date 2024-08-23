/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.2.1.0
   - Port : 4321
   - Ressource : /ville/paris.html

   Donne l'URL : http://10.2.1.0:4321/ville/paris.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Votre serveur HTTP doit gérer différents Mime Types. Vous devez faire en sorte
  que le Mime Type soit conforme à l'extension obtenue à partir de la ressource
  dans l'URL.

  Par exemple :
  - Si l'URL est http://10.2.1.0:4321/photo.jpeg (et que le fichier photo.jpeg
    existe)
  - Alors l'en-tête de la réponse HTTP doit contenir Content-Type : image/jpeg

  Vous devez gérer les Mime Types des formats de fichier suivant :
    css, js, jpeg, png, pdf, gif.

  La liste des Mime Types autorisés est disponible ici :
    http://www.iana.org/assignments/media-types/media-types.xhtml
**/
const http = require("http");
const fs = require("fs");
const path = require("path");

// Chemin vers le fichier 404 HTML
const notFoundPath = path.join(__dirname, "404.html");

// Map des extensions de fichier aux MIME types
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".jpeg": "image/jpeg",
  ".pdf": "application/pdf",
  ".gif": "image/gif",
};

// Fonction pour lire un fichier et envoyer la réponse
function serveFile(res, filePath, statusCode = 200) {
  const extname = path.extname(filePath);
  const mimeType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (statusCode === 404) {
        // En cas d'erreur lors de la lecture du fichier 404, envoyer une réponse 500
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erreur interne du serveur");
      } else {
        // Si le fichier demandé n'existe pas, servir le fichier 404
        serveFile(res, notFoundPath, 404);
      }
    } else {
      // Envoyer le contenu du fichier avec le bon MIME type
      res.writeHead(statusCode, { "Content-Type": mimeType });
      res.end(data);
    }
  });
}

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  const requestedUrl = req.url === "/" ? "/home-ex4.html" : req.url;
  const requestedFile = path.join(__dirname, requestedUrl);

  serveFile(res, requestedFile);
});

// Démarrer le serveur sur le port 1218
server.listen(1218, () => {
  console.log("localhost1218");
});

/**
  2. Utiliser votre serveur HTTP pour "servir" votre projet Front End (sur le
    réseau local).

  Pensez à utiliser l'onglet réseau des outils de développement de votre
  navigateur Internet pour vérifier que vous arrivez bien à télécharger toutes
  les ressources exigées par votre projet.

  Ajoutez la gestion des Mime Types manquants si nécessaire...
**/

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
