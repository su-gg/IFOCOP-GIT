/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.30.20.30
   - Port : 8899
   - Ressource : /index

  Donne l'URL : http://10.30.20.30:8899/index
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide si et seulement si l'URL contenue dans la
  requête HTTP contient
    /index.

  Votre objet de type http.IncomingMessage contient une propriété .url vous
  permettant d'obtenir des informations relatives à l'URL employé pour effectuer
  la requête HTTP.
**/
/*
const http = require("http");

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  // Vérifier si l'URL contient "/index"
  if (req.url.includes("/index")) {
    // Définir le contenu de la réponse HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Mon Serveur HTTP en Node.js</title>
      </head>
      <body>
        <h1>Bienvenue sur la page d'index!</h1>
        <p>Il suffit d'ajouter /index à mon local host pour afficher la page.</p>
      </body>
      </html>
    `;

    // Définir le code de statut et les en-têtes de la réponse
    res.writeHead(200, { "Content-Type": "text/html" });

    // Envoyer le contenu HTML
    res.end(htmlContent);
  } else {
    // Retourner une réponse 404 pour les autres URLs
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page non trouvée");
  }
});

// Démarrer le serveur sur le port 1213
server.listen(1213, () => {
  console.log("in the pocket");
});
*/
/**
  2.
  Améliorez votre serveur HTTP pour que, si l'URL employé pour effectuer la
  requête HTTP ne contient pas /index, votre serveur HTTP produise une réponse
  HTTP avec dans :
   - l'en-tête, un code 404;
   - le corps, un message en format HTML valide du type :
     L'URL demandé n'existe pas.
**/

const http = require("http");

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  // Vérifier si l'URL contient "/index"
  if (req.url.includes("/index")) {
    // Définir le contenu de la réponse HTML pour l'URL contenant "/index"
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Mon Serveur HTTP en Node.js</title>
      </head>
      <body>
        <h1>Bienvenue sur la page d'index!</h1>
        <p>Il suffit d'ajouter /index à mon local host pour afficher la page.</p>
      </body>
      </html>
    `;

    // Définir le code de statut et les en-têtes de la réponse
    res.writeHead(200, { "Content-Type": "text/html" });

    // Envoyer le contenu HTML
    res.end(htmlContent);
  } else {
    // Définir le contenu de la réponse HTML pour les autres URLs
    const notFoundContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Page non trouvée</title>
      </head>
      <body>
        <h1>Erreur 404</h1>
        <p>L'URL demandée n'existe pas.</p>
      </body>
      </html>
    `;

    // Définir le code de statut et les en-têtes de la réponse
    res.writeHead(404, { "Content-Type": "text/html" });

    // Envoyer le contenu HTML pour la page 404
    res.end(notFoundContent);
  }
});

// Démarrer le serveur sur le port 1215
server.listen(1215, () => {
  console.log("Serveur en écoute sur le port 1215");
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
