// SUPPRESSION DE DOCUMENT(S)

// db.collection.deleteOne(query, options)
// db.collection.deleteMany(query, options)

// IMPORTER LE FICHIER "seas.json"
`mongoimport --db mondial --collection seas --file "/Users/suu/IFOCOP/MONGO_DB/seas.json"`;

// SUPPRESSION DE TOUS LES ENREGISTREMENTS (= TOUS LES DOCUMENTS DANS LA COLLECTION) :
db.seas.deleteMany({});

// IMPORTER A NOUVEAU AVANT DE POURSUIVRE...
`mongoimport --db mondial --collection seas --file "/Users/suu/IFOCOP/MONGO_DB/seas.json"`;

// QUESTION 1 : COMMENT SUPPRIMER L'OCEAN ATLANTIQUE ?

db.seas.deleteOne({ name: /atlanti/i });

// QUESTION 2 : COMMENT SUPPRIMER LES MERS BORDANT L'OCEAN ATLANTIQUE ?
db.seas.find();
db.seas.deleteMany({ bordering: /atlanti/i }); // suppression

db.seas.countDocuments(); // connaitre le nombre de mers restante

// QUESTION 3 : QUELLE EST LA MER LA PLUS PROFONDE ?
db.seas.find({}, { depth: 1, name: 1, _id: 0 }).sort({ depth: -1 }).limit(1);
// QUESTION 4 : COMMENT AJOUTER L'ETENDUE D'EAU "Océan Atlantique" ?
db.seas.aggregate;
// QUESTION 5 : COMMENT AJOUTER UN TABLEAU "myArray" A TOUTES LES MERS ?
db.seas.updateMany({}, { $set: { myArray: [] } });
// QUESTION 6 : QUELLE EST LA PROFONDEUR CUMULEE DE TOUTES LES MERS ?
db.seas.aggregate([
  {
    $group: {
      _id: "plouf",
      profCumuleDeToutesLesMers: { $sum: "$depth" },
    },
  },
]);
