// LE PIPELINE D'AGREGATION

// IMPORTER DANS UNE BASE DE DONNEES LE FICHIER "website.json"
`mongoimport  --db websites --collection sites --file "/Users/suu/IFOCOP/MONGO_DB/websites.json" --jsonArray`;

`use websites`;

// QUESTION 1 : QUEL EST L'HEBERGEUR QUI HEBERGE LE PLUS DE SITES ?
db.sites.aggregate([
  { $match: {} },
  { $group: { _id: "$hebergeur", nombre: { $sum: 1 } } },
  { $sort: { nombre: -1 } },
  { $limit: 1 },
]);

// QUESTION 2: QUEL EST LE SITE QUI A LE PLUS DE TRAFIC POUR L'HEBERGEUR GANDI ?
db.sites.find({ hebergeur: /gandi/i }).sort({ traffic: 1 }).limit(1);

db.sites.aggregate([
  { $match: { hebergeur: /gandi/i } },
  { $sort: { traffic: -1 } },
  { $limit: 2 },
]);

// OBSERVATION : Le tri n'est pas cohérent car le traffic est une chaîne de caractères (string)...
// QUESTION 3 : COMMENT MODIFIER LES DOCUMENTS POUR QUE LE "traffic" SOIT UN NOMBRE ENTIER AVEC UNE METHODE DE MISE A JOUR ?
db.sites.aggregate([
  { $match: { hebergeur: /gandi/i } },
  { $addFields: { convertedTraffic: { $toInt: "$traffic" } } },
  { $sort: { convertedTraffic: -1 } },
  { $limit: 1 },
]);

db.sites.find().forEach((site) => {
  let newTraffic = parseInt(site.traffic);
  db.sites.updateOne(
    { _id: site._id },
    {
      $set: {
        traffic: newTraffic,
      },
    }
  );
});

// QUESTION 4: QUEL EST LE TRAFIC CUMULE DES HEBERGEURS ? QUI EST LE PREMIER ?
db.getCollection("sites").aggregate([
  {
    $group: {
      _id: "$_id",
      trafficTotal: { $sum: "$traffic" },
    },
  },
  { $sort: { trafficTotal: -1 } },
  { $limit: 1 },
]);
// QUESTION 5 : QUELLE EST LA MOYENNE DES LIKES PAR HEBERGEUR ?
// Voir les opérateurs d'aggregation :
//docs.mongodb.com/manual/reference/operator/aggregation/
db.getCollection("sites").aggregate([
  { $set: { likes: { $toInt: "$likes" } } },
  {
    $group: {
      _id: "$hebergeur",
      avgLikes: { $avg: "$likes" },
    },
  },
  {
    $set: { avgLikes: { $toInt: "$avgLikes" } },
  },
]);
// OBSERVATION : les "likes" sont aussi de type string, il faut donc les transformer en type nombre.
// QUESTION 5-b : COMMENT A PRESENT CALCULER LA MOYENNE DES "likes" ?

// QUESTION 5-c : COMMENT AUGMENTER DE 50 les "likes" POUR LES SITES DE "Gandi" ?
const aggResult = db.getCollection("sites").aggregate([
  {
    $match: { hebergeur: RegExp("gandi", "i") },
  },
  {
    $set: {
      likes: {
        $add: [{ $toInt: "$likes" }, 50],
      },
    },
  },
]);

aggResult.forEach((document) => {
  db.getCollection("sites").updateOne({ _id: document._id }, { $set: {} });
});
// Exporter dans un fichier newwebsite.json le contenu de notre collection
// Se placer dans un terminal du système hôte (PAS le shell mongo ; exemple : PowerShell)

https: `mongoexport --help` // pour accéder à la documentation
`mongoexport -o "<dossier des databases>\newwebsite.json" -d websites -c sites` // identique à
`mongoexport --out "<dossier des databases>\newwebsite.json" --db websites --collection sites`;

// Cela permet de faire des sauvegardes...
