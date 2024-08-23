const moduleHTTP = require("node:http");
//@voir : https://nodejs.org/api/http.html

const serveurHTTP = moduleHTTP.createServer();
//@voir : https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener

// Ici on peut décider de répondre à une requête HTTP envoyé par un navigateur.
// Pour répondre à une requête on utiliser l'évènement 'request' d'un objet
// de type httpServer.
// .on() est la méthode pour associer un gestionnaire d'évènement à un évènement
// pris en charge par l'objet considéré. @voir : https://nodejs.org/api/http.html#event-request
serveurHTTP.on(
  "request",
  function (objetQuiRepresentLaRequete, objetQuiRepresentLaReponse) {
    // Cette fonction est exécuté quand le serveur reçoit une requête HTTP
    console.log("Requête reçue");
    console.log(objetQuiRepresentLaRequete.url);
  }
);

serveurHTTP.listen(1234, function () {
  // 1234 est le numéro de port identifiant le serveur
  // fonction à exécuter une fois le serveur démarré
  console.log("Serveur démarré et identifié avec le port 1234");
  // si le port est déjà utilisé, c'est à dire qu'un serveur est DEJA démarré
  // avec ne numéro de port on obtient l'erreur suivante :
  //   Error: listen EADDRINUSE: address already in use :::1234
});
//@voir : https://nodejs.org/api/http.html#serverlisten hérite de la méthode .listen de l'objet natif net
//@voir : https://nodejs.org/api/net.html#serverlisten
