/* LES RESTAURANTS DE NEW YORK */

// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il se trouve l'executable mongoimport

`mongoimport --db newyork --collection restaurants --file "/Users/suu/IFOCOP/MONGO_DB/restaurants.json"` // SE PLACER DANS LA BASE DE DONNEES 'newyork' :
`use newyork`;

// QUESTION 1 : COMBIEN Y A-T-IL DE RESTAURANTS DANS LA COLLECTION ?
db.restaurants.countDocuments(); // 25359
// QUESTION 2 : COMMENT TROUVER LES RESTAURANTS QUI SONT SITUES DANS LA RUE "Morris Park Ave" :
db.restaurants.find({ "address.street": "Morris Park Ave" });
// non suzanne pas lui ! db.restaurants.find({ "address.street": { $regex: /Morris Park Ave/gim } });

// QUESTION 2-a : AVEC EN PLUS CEUX QUI SE SITUENT DANS LA RUE "Morris Park Avenue" ?
// Attention ici, bien que l'on souhaite obtenir les restaurants dont l'adresse est Morris Park Avenue
// AINSI QUE ceux dont l'adresse est Morris Park Ave, c'est bien l'opérateur $or qu'il faut utiliser,
// et non pas $and...

db.restaurants.find({
  $or: [
    { "address.street": "Morris Park Avenue" },
    { "adresse.street": "Morris Park Ave" },
  ],
});

//db.piscines.find({ $or: [{ zipCode: 75013 }, { zipCode: 75014 }] });
// QUESTION 2-b : COMMENT RETROUVER CES DEUX RESULTATS EN UTILISANT SIMPLEMENT UNE REGEXP (ET EVENTUELLEMENT LES ORTHOGRAPHES ALTERNATIVES EN MINUSCULES VIA LE FLAG "i" (insensitive)) ?
db.restaurants.find({
  $or: [
    { "address.street": { $regex: /Morris Park Avenue/i } },
    { "address.street": { $regex: /Morris Park Ave/i } },
  ],
});

// QUESTION 3 : COMMENT AFFICHER UNIQUEMENT (SANS "_id") LES CHAMPS "borough", "cuisine" et "address" ?
db.restaurants.find(
  {}, // je veux tous les restaurants
  { borough: 1, cuisine: 1, address: 1, _id: 0 }
);
// QUESTION 4 : COMMENT TROUVER LA LISTE DES RESTAURANTS SITUES A "Staten Island" ET QUI FONT DES "hamburgers" OU de la "bakery" ?
// QUESTION 4-a : AVEC L'OPERATEUR $or :
db.restaurants.find(
  {
    $and: [
      { borough: /staten island/i },
      {
        $or: [{ cuisine: /hamburger/i }, { cuisine: /bakery/i }],
      },
    ],
  },
  { borough: 1, name: 1, cuisine: 1, _id: 0 }
);
// QUESTION 4-b : AVEC UN $and IMPLICITE :

db.restaurants.find(
  {
    borough: /staten island/i,
    $or: [{ cuisine: /hamburger/i }, { cuisine: /bakery/i }],
  },
  { borough: 1, name: 1, cuisine: 1, _id: 0 } //projection
);

// QUESTION 4-c : AVEC L'OPERATEUR $in :

db.restaurants.find(
  { borough: /staten island/i, cuisine: { $in: [/hamburger/i, /bakery/i] } },
  { borough: 1, name: 1, cuisine: 1, _id: 0 }
);

// QUESTION 5 : COMMENT PARCOURIR UN CURSEUR VIA UNE BOUCLE while ?
// On peut ici utiliser la méthode javascript hasNext() qui permet de déterminer si le cursor contient
// encore des documents ou non : https://docs.mongodb.com/manual/reference/method/cursor.hasNext/

//const allRestaurants = db.restaurants.find().limit(50);
//while (allRestaurants.hasNext()) {
//printjson(allRestaurants.next());
//}

// QUESTION 6 : COMMENT PARCOURIR UN CURSEUR VIA UNE BOUCLE forEach ?
/*const allRestaurants = db.restaurants.find().limit(50);
allRestaurants.forEach((oneRestaurant) => {
  print(oneRestaurant.name);
});*/

// QUESTION 7 : QUEL EST LE TYPE DE RESTAURANT LE PLUS REPRESENTE ?
// Vous pouvez le faire en vanillaJS

//db.restaurants.

/* 1e solution*/

/*let cuisines = [];

const allRestaurants = db.restaurants.find().limit(50);
allRestaurants.forEach((oneRestaurant) => {
  if (cuisines.indexOf(oneRestaurant.cuisine) == -1) {
    cuisines.push(oneRestaurant.cuisine);
  }
});

let nbRestaurants = 0;
let cuisineMax = "";

cuisines.forEach((oneCuisine) => {
  //print(oneCuisine);
  if (db.restaurants.countDocuments({ cuisine: oneCuisine }) > nbRestaurants) {
    nbRestaurants = db.restaurants.countDocuments({ cuisine: oneCuisine });
    cuisineMax = oneCuisine;
  }
  //print("cuisine max " + cuisineMax);
});

print(cuisineMax + " - " + nbRestaurants);*/

// Heureusement, il y a dans mongo une solution native: les pipelines d'agrégation :

db.restaurants.aggregate([
  { $match: {} }, // on prend tous les restau
  { $group: { _id: "$cuisine", nbResto: { $sum: 1 } } },
  { $sort: { nbResto: -1 } },
  { $limit: 1 },
]);
