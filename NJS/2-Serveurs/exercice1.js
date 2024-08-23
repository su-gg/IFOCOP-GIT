/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 100.50.25.12
   - Port : 6666

   Donne l'URL : http://100.50.25.12:6666
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide.

  Attention, vous devez pensez à retourner dans l'en-tête de votre réponse HTTP
  le Mime Type correct (pour le HTML, il s'agit du Mime Type text/html)
**/
//importer le module http
const http = require("http");

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  // Définir le contenu de la réponse HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Mon Serveur HTTP en Node.js</title>
    </head>
    <body>
      <h1>Bienvenue sur mon serveur HTTP!</h1>
      <p>Ceci est une réponse HTML générée par Node.js.</p>
    </body>
    </html>
  `;

  // Définir le code de statut et les en-têtes de la réponse
  res.writeHead(200, { "Content-Type": "text/html" });

  // Envoyer le contenu HTML
  res.end(htmlContent);
});

// Démarrer le serveur sur le port 3000
server.listen(3000, () => {
  console.log("C'est dans la boite");
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
 **/
