// On importe le client que nous avons instancié, depuis notre fichier client.js...
import mongoClient from "./client.js";

export const findOne = async (db, col, query, projection = {}) => {
  let data = undefined;

  try {
    // On démarre la connexion avec MongoDB...
    await mongoClient.connect();

    // Une fois la connexion établie, nous pouvons démarrer l'opération d'écriture en base de données...
    const collection = mongoClient.db(db).collection(col);
    data = await collection.findOne(query, projection);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoClient.close();
  }

  return data;
};
