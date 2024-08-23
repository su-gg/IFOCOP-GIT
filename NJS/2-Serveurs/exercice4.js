/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 31.42.53.64
   - Port : 5555
   - Ressource : /accueil

  Donne l'URL : http://31.42.53.64:5555/home
**/

/**
  Exercices :

  1.
  Créez deux fichiers HTML valides : home.html et about.html

  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP
  - le contenu du fichier home.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /accueil
  - le contenu du fichier about.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /apropos
**/
/* Exo réalisé
const http = require("http");
const fs = require("fs");
const path = require("path");

// Chemins vers les fichiers HTML
const homePath = path.join(__dirname, "home-ex4.html");
const aboutPath = path.join(__dirname, "about-ex4.html");

// Fonction pour lire un fichier HTML et envoyer la réponse
function serveFile(res, filePath) {
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
}

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  if (req.url.includes("/accueil")) {
    serveFile(res, homePath);
  } else if (req.url.includes("/apropos")) {
    serveFile(res, aboutPath);
  } else {
    // Retourner une réponse 404 pour les autres URLs
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Erreur 404</h1><p>Page non trouvée</p>");
  }
});

// Démarrer le serveur sur le port 1217
server.listen(1217, () => {
  console.log("Bienvenue sur mon localhost");
});
*/
/**
  Exercices :

  2. Créez un fichier HTML valide : 404.html

  Votre serveur HTTP doit retourner dans sa réponse HTTP le contenu du fichier
  404.html si l'URL utilisé pour effectuer la requête HTTP ne contient pas la
  ressource /accueil ou /apropos.

  N'oubliez pas de préciser le code 404 dans les en-têtes de la réponse HTTP.
**/
const http = require("http");
const fs = require("fs");
const path = require("path");

// Chemins vers les fichiers HTML
const homePath = path.join(__dirname, "home-ex4.html");
const aboutPath = path.join(__dirname, "about-ex4.html");
const notFoundPath = path.join(__dirname, "404-ex4.html");

// Fonction pour lire un fichier HTML et envoyer la réponse
function serveFile(res, filePath, statusCode = 200) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // En cas d'erreur, envoyer une réponse 500
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Erreur interne du serveur");
    } else {
      // Envoyer le contenu du fichier HTML
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  if (req.url.includes("/accueil")) {
    serveFile(res, homePath);
  } else if (req.url.includes("/apropos")) {
    serveFile(res, aboutPath);
  } else {
    serveFile(res, notFoundPath, 404);
  }
});

// Démarrer le serveur sur le port 1217
server.listen(1217, () => {
  console.log("Localhost1217");
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
