// ETAPES PREALABLES :
// 1 - REVENIR SUR LA BASE DE DONNEES "videoclub".
`use videoclub`;

// 2 - INSERER LES DOCUMENTS SUIVANTS :
db.films.insertMany([
  {
    title: "The Lord Of The Rings: The Fellowship of the Ring",
    length: 182,
    actors: [
      {
        firstName: "Elijah", // actors.firstName => "Elijah"
        lastName: "Wood",
      },
      {
        firstName: "Orlando",
        lastName: "Bloom",
      },
    ],
    director: {
      firstName: "Peter",
      lastName: " Jackson",
    },
    yearOfRelease: 2000,
  },
  { title: "Titanic" },
  { title: "MadMax" },
  { title: "Matrix" },
]);

// QUESTION 1 : COMMENT TROUVER UN FILM DONT LE NOM CONTIENT 'rings' (EN UTILISANT UNE EXPRESSION REGULIERE) ?
// indice : attention à la casse...
db.films.find({ title: { $regex: /rings/gim } });

// QUESTION 2 : COMMENT AFFICHER UNIQUEMENT LE PRENOM DES ACTEURS DE CE FILM ?
db.films.find({ title: { $regex: /rings/gim } }, { "actors.firstName": 1 });
// QUESTION 3 : COMMENT TROUVER LES FILMS DONT UN ACTEUR S'APPELLE 'Elijah' ?
db.films.find({ "actors.firstName": /Elijah/i }, { title: 1 });
