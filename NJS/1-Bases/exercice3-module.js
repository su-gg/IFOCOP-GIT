const fs = require('fs');

// Fonction pour lire et afficher le contenu du fichier
function readFileContent(filePath) {
    if (!filePath) {
        console.error('Veuillez fournir le chemin du fichier en argument.');
        return;
    }

    // Vérifier l'existence du fichier
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            console.error(`Le fichier "${filePath}" n'existe pas.`);
        } else {
            // Lire le contenu du fichier si il existe
            fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                    console.error('Erreur lors de la lecture du fichier:', error);
                } else {
                    console.log('Contenu du fichier:');
                    console.log(data);
                }
            });
        }
    });
}

// Exporter la fonction
module.exports = {
    readFileContent
};
