// Mise à jour -> update

// REVENIR SUR LA BASE DE DONNEES "newyork"
`use newyork`;

// QUESTION 1 : COMMENT MODIFIER LES RESTAURANTS DONT LA CUISINE EST "hamburger" POUR LEUR AJOUTER UN CHAMP "healthy_food" ayant pour valeur 2 ?

db.restaurants.updateMany(
  { cuisine: "hamburger" },
  { $set: { healthy_food: 2 } }
);

// QUESTION 2 : COMMENT DEFINIR LE CHAMP "healthy_food" A 9 POUR LES RESTAURANTS VEGETARIENS (vegetarian) ?
db.restaurants.updateMany(
  { cuisine: /hamburger/i },
  { $set: { healthy_food: 9 } }
);

// QUESTION 3 : COMMENT VERIFIER QUE TOUS LES RESTAURANTS ONT BIEN UN TABLEAU "grades" ?
db.restaurants.countDocuments({ grades: { $exists: true } });
db.restaurants.countDocuments({ grades: { $type: 4 } });
db.restaurants.countDocuments({ grades: { $type: "array" } });
// QUESTION 4: COMMENT SUPPRIMER LE CHAMP "building" DES RESTAURANTS SITUES DANS LE "Bronx" ET AJOUTER UN BOOLEEN A true ?
db.restaurants.updateMany(
  { borough: /Bronx/i },
  { $unset: { "address.building": "Adios" } },
  { $set: { verif: true } }
);
// VERIFIER QUE LE CHAMP "building" N'EST PLUS PRESENT ET QUE VOTRE BOOLEEN EST BIEN PRESENT ET A true...
db.restaurants.find({ borough: /Bronx/i }, { address: 1, verif: 1, name: 1 });
// QUESTION 5 : COMMENT AJOUTER UN CHAMP "rating" A 5 POUR TOUS LES RESTAURANTS ?
db.restaurants.updateMany({}, { $set: { rating: 5 } });
// QUESTION 6 : COMMENT MULTIPLIER LE CHAMP "rating" PAR 2 POUR LES RESTAURANTS SITUES DANS LE "Queens" ?
db.restaurants.updateMany({ borough: /Queens/i }, { $mul: { rating: 2 } });

// QUESTION 7 : COMMENT TROUVER TOUS LES RESTAURANTS DE "Brooklyn" ?
db.restaurants.find({ borough: "Brooklyn" });

// QUESTION 7-a : COMMENT LIMITER LES RESULTATS A 100 ENTREES ?
db.restaurants.find({ borough: "Brooklyn" }).limit(100);

// QUESTION 7-b : COMMENT APPLIQUER UN count() ?
db.restaurants.countDocuments({ borough: "Brooklyn" });

// QUESTION 7-c : COMMENT APPLIQUER UN size() ?
db.restaurants.find({ borough: "Brooklyn" }).size();

// QUestion 7-d : QUELLE EST LA DIFFERENCE ENTRE .count() ET .size() ?
// Normalement suze() tient compte de la limite // count() ne tient pas compte de la limite
// QUESTION 8 : COMMENT AJOUTER UNE ENTREE AU TABLEAU "grades" POUR LE RESTAURANT "Tu-Lu'S Gluten-Free Bakery" ?

db.restaurants.updateOne(
  { name: "Tu-lu's Gluten Free Bakery" },
  {
    $push: {
      grades: {
        date: new Date(),
        grade: "A",
        score: 15,
      },
    },
  }
);
// VERIFIER QUE L'AJOUT A ETE REUSSI...
db.restaurants.find({ name: "Tu-Lu'S Gluten-Free Bakery" });
// QUESTION 9 : COMMENT MODIFIER LE CHAMP "rating" POUR TOUS LES DOCUMENTS POUR QU'IL SOIT EGAL A LA MOYENNE ARITHMETIQUE DES GRADES ?
// indice : créer un curseur et le manipuler avec une boucle forEach.

const allRestaurants = db.restaurants.find().limit(5);
allRestaurants.forEach((oneRestaurant) => {
  let moyenne = 0;
  //print(oneRestaurant.name);
  oneRestaurant.grades.forEach((oneGrade) => {
    print(oneGrade.score);
    moyenne += oneGrade.score;
  });
  //print("Total des scores " + moyenne);
  moyenne /= oneRestaurant.grades.length;
  //print("moyenne:" + moyenne);
  print(oneRestaurant.grades);
});

db.restaurants.updateOne(
  { _id: oneRestaurant._id }, //query
  { $set: { rating: moyenne } } //update
);
// VERIFIER...

// QUESTION 10 : QUEL EST LE RESTAURANT QUI A LA MEILLEURE MOYENNE ?
db.restaurants
  .find({}, { grades: 1, name: 1, rating: 1, _id: 0 })
  .sort({ rating: -1 })
  .limit(1);
