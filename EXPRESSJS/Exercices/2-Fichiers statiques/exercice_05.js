/*********************************************************
 ***********UTILISATION DES FICHIERS STATIQUES 3***********
 *********************************************************/

/*********************************
 ***********Présentation***********
 *********************************/
/*
La méthode sendFile de l'objet res permet d'envoyer un fichier spécifique au client.
Elle s'utilise comme suit :
res.sendFile('<nom du fichier>'[, options][, callback]);
options: un objet contenant le dossier racine. Par exemple : {root: 'files'}
*/

/*********************************
 *************Exercice*************
 *********************************/
/*
------ 1 ------
Créez un document HTML. Intégrez au-moins un titre et une balise image.
Placez ce document et l'image dans un dossier.

------ 2 ------
Utilisez la méthode sendFile pour envoyer le fichier au client.
*/
