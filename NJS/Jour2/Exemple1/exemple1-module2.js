const dns = require('node:dns');


const afficheServeurs = function(nomDeDomaine) {
  dns.lookup(nomDeDomaine, {family: 4}, function(erreur, adresses) {
    console.log(adresses);
  });
}

exports.fonctionQuiAfficheServeurs = afficheServeurs;