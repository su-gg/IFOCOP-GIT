/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 168.192.10.168
   - Port : 5678
   - Ressource : /index.html

  Donne l'URL : http://168.192.10.168:5678/index.html
**/

/**
  Exercices :

  1. Créez un serveur HTTP qui retourne dans sa réponse HTTP le contenu du
  fichier dont le nom est le même que celui obtenu à partir de l'URL si ce
  fichier existe.

  Et, si le fichier n'existe pas le serveur HTTP retournera dans sa réponse HTTP
  le contenu du fichier 404.html que vous avez créé pour l'exercice précédent.

  Vous devrez donc reconstruire le chemin qui vous permettra d'ouvrir un fichier
  à partir de la ressource fournie dans l'URL.

  Par exemple, si l'URL est :

  - http://168.192.10.168:5678/html/contact.html (la ressource est donc
    /html/contact.html)

  Le serveur HTTP devra ouvrir et obtenir le contenu du fichier dont le chemin
  système est :
  - c:\diwjs\nodejs\app\html\contact.html (ou c:\diwjs\nodejs\app\ est mon
    dossier de travail)

  Pour obtenir le chemin vers le dossier dans lequel votre serveur s'exécute,
  vous pouvez utiliser l'objet Process vu précédemment. Et pour faire en sorte
  que les slash soient corrects, vous pouvez utiliser le module path de Node JS
  et particulièrement sa méthode .normalize() . Documentée ici :
    https://nodejs.org/api/path.html#path_path_normalize_p
**/
const http = require("http");
const fs = require("fs");
const path = require("path");

// Chemin vers les fichiers HTML
const homePath = path.join(__dirname, "home-ex4.html");
const aboutPath = path.join(__dirname, "about-ex4.html");
const notFoundPath = path.join(__dirname, "404-ex4.html");

// Fonction pour lire un fichier HTML et envoyer la réponse
function serveFile(res, filePath, statusCode = 200) {
  fs.readFile(filePath, "utf8", (err, data) => {
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
      // Envoyer le contenu du fichier HTML
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  const requestedUrl = req.url === "/" ? "/home-ex4" : req.url;
  const requestedFile = path.join(__dirname, `${requestedUrl}.html`);

  serveFile(res, requestedFile);
});

// Démarrer le serveur sur le port 1218
server.listen(1218, () => {
  console.log("localhost1218");
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
