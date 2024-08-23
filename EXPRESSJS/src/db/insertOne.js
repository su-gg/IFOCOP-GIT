// On importe le client que nous avons instancié, depuis notre fichier client.js...
import mongoClient from "./client.js";

export const insertOne = async (db, col, data) => {
  let response = undefined;

  try {
    // On démarre la connexion avec MongoDB...
    await mongoClient.connect();

    // Une fois la connexion établie, nous pouvons démarrer l'opération d'écriture en base de données...
    const collection = mongoClient.db(db).collection(col);

    // On peuple la variable response avec la valeur de retour de l'exécution de la fonction asynchrone insertOne...
    response = await collection.insertOne(data);
  } catch (error) {
    console.error(error);
  } finally {
    // Enfin, nous terminons la connexion avec MongoDB afin d'éviter de consommer de la ressource pour rien.
    await mongoClient.close();
  }

  return response;
};
