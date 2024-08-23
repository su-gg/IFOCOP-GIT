// Afficher la liste des bdds
`show dbs``show databases` // Comment sélectionner une base de données à utiliser ?
`use videoclub` // Comment afficher la liste des collections contenues dans la base de données sélectionnée ? // Les collections contiennent des documents; // UNe bdd de mongo est constituée de collections.
`show collections` // Cela nous permet par la suite de taper la commande suivante dans le terminal afin d'accéder à une collection donnée : // Quand on tape "use xxxxxxx" dans le terminal, cela nous instancie un objet "db" représentant la base de données sélectionnée.
`db.<collection>.<method>`;

/* Sur une base de données, il y a 4 types d'opération : les opérations CRUD

C reate     : pour insérer des documents            - méthode insert()
R ead       : pour lire des documents               - méthode find()
U pdate     : pour mettre à jour des documents      - méthode update()      
D elete     : pour supprimer des documents          - méthode delete()
*/
db.personnes.insertOne({
  prenom: "Alain",
  nom: "Proviste",
});
// Pour insérer un document dans la collection films de la bdd videoclub, on utilise la méthode .insert() sur la collection dans laquelle on souhaite insérer un document :

/*use videoclub*/
db.films.insertOne({
  titre: "Titanic",
  annee: 1998,
  description: "Quand un bateau rencontre un glaçon",
});

db.films.insertMany([
  { titre: "Avatar", annee: 2015 },
  { titre: "Fight Club", annee: 1992 },
]);
// Pour trouver tous les films, on utilise la méthode .find() sur la collection contenant les films :
let madate = new Date();
db.films.insertOne({
  titre: "007",
  created: madate,
});

// Pour faire des insertions multiples, on passe un tableau d'objets à notre méthode insert() au lieu d'un simple objet :
db.films.findOne();
// https://www.mongodb.com/resources/products/fundamentals/embedded-mongodb

// Le client mongo est une console js. Par conséquent, on peut tout à fait utiliser des variables comme valeurs pour une insertion :
db.realisateurs.insertOne({ prenom: "James", nom: "Cameron" });
// On a une méthode qui présente correctement un document dans une collection :
db.realisateurs.insertOne({
  titre: "Allien3",
  realisateur: "6694f38389b359d32025bc1e",
});
// Une notion importante de MongoDB est celle de sous-document embarqué (embedded document) :

// La commande cls (clear screen) permet de vider la console
