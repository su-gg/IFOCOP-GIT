// VELIB

// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib

// Cette fois-ci les données sous fournies sous la forme d'un tableau d'objets, il faut donc ajouter l'option --jsonArray pour importer
'mongoimport --db paris --collection velib --file "/Users/suu/IFOCOP/MONGO_DB/jcdecaux_velib_paris.json" --jsonArray'`use paris`;

// QUESTION 1 : COMMENT METTRE A JOUR TOUS LES ENREGISTREMENTS EN LEUR AJOUTANT UN CHAMP "zipCode" ?

// const address = "RUE DES CHAMPEAUX(PRES DE LA GARE ROUTIERE) - 93170 BAGNOL0ET";
// const regex = /\d{5}/gm;
// const found = address.match(regex);
// console.log(found);

const allVelib = db.velib.find();
const regexZip = /\d{5}/gm;

allVelib.forEach((oneVelib) => {
  //console.log(oneVelib.address.match(regexZip)[0]); vérifie que l'on a bien tous les zipcode
  let oneVelibZip = parseInt(oneVelib.address.match(regexZip)[0]);

  db.velib.updateOne({ _id: oneVelib._id }, { $set: { zipCode: oneVelibZip } });
});

// QUESTION 2 : QUEL EST L'ARRONDISSEMENT DE PARIS OÙ IL Y A LE PLUS DE STATIONS (EN UTILISANT $in) ?
db.velib.aggregate([
  {
    $match: {
      zipCode: {
        $in: [
          75001, 75002, 75003, 75004, 75005, 75006, 75007, 75008, 75009, 75010,
          75011, 75012, 75013, 75014, 75015, 75016, 75017, 75018, 75019, 75020,
        ],
      },
    },
  },
  { $group: { _id: "$zipCode", nbStations: { $sum: 1 } } },
  { $sort: { nbStations: -1 } },
  { $limit: 1 },
]);

// QUESTION 3 : QUELLE EST LA VILLE (HORS "Paris) QUI A LE PLUS DE STATIONS ?
db.velib.aggregate([
  {
    $match: { $or: [{ zipCode: { $gt: 75020 } }, { zipCode: { $lt: 75000 } }] },
  },
  { $group: { _id: "$zipCode", nbStations: { $sum: 1 } } },
  { $sort: { nbStations: -1 } },
  { $limit: 1 },
]);
// QUESTION 4 : COMMENT RETROUVER LA PISCINE "Dunois" ?
db.piscines.find({ name: /dunois/i });

// QUESTION 5 : QUELLES SONT LES 5 STATIONS VELIB LES PLUS PROCHES DE LA PISCINE "Dunois" ?// croisement de BDD
// Première version : en utilisant une fonction de calcul de distance
//www.geodatasource.com/developers/javascript

// INFO : Coordonnées de Dunois :
// "lat" : 48.832973, "lon" : 2.366437

https: var lonDunois = 2.366437;
var latDunois = 48.832973;

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

// QUESTION 5-a : COMMENT OBTENIR LE MEME RESULTAT EN UTILISANT L'OPERATEUR $near ?

`"geometry": {
  "type": "Point",
  "coordinates": [longitude, latitude]
  }`;

const lonDunois = 2.366437;
const latDunois = 48.832973;

const allVelib = db.velib.find();

allVelib.forEach((oneVelib) => {
  let distanceDunois = distance(
    latDunois,
    lonDunois,
    oneVelib.latitude,
    oneVelib.longitude,
    "K"
  );

  db.velib.updateOne(
    { _id: oneVelib._id },
    { $set: { distanceDunois: distanceDunois } }
  );
});
// il nous reste à afficher les 5 plus proches
db.velib.find({}, { name: 1, distanceDunois: 1, _id: 0 });

db.velib.find({
  position: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [lonDunois, latDunois],
      },
      $maxDistance: 4000,
      $minDistance: 0,
    },
  },
});

// QUESTION 6 : COMMENT AFFICHER LA DISTANCE DES STATIONS PAR RAPPORT A LA PISCINE "Dunois" EN UTILISANT UN PIPELINE D'AGREGATION ET L'ETAPE $geonear ?
db.createIndex({ position: "2dsphere" });

db.velib.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [lonDunois, latDunois] },
      distanceField: "distanceDunoisGeoNear",
    },
  },
  { $limit: 5 },
]);
