window.addEventListener("DOMContentLoaded", () => {
  console.log("Fichier signin.js chargé correctement !");
  const signinForm = document.getElementById("signin-form");

  signinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const signinFormData = new FormData(signinForm);
    console.log("signinFormData: ", signinFormData);

    // Méthode 1 : on décide d'envoyer directement un objet JSON au serveur via Fetch...
    // 1-a: On déclare une variable dans laquelle sera stocké l'objet JSON formé par les
    // paires clé/valeur du formulaire...
    // const jsonForm = {};

    // 1-2: On va donc itérer sur ce FormData.Iterator en utilisant une destructuration d'assignation...
    // for (const [key, value] of signinFormData.entries()) {
    //   console.log(`{ clé: ${key}, valeur: ${value} }`);
    //   jsonForm[key] = value;
    // }
    // console.log('jsonForm: ', jsonForm);

    // 1-3: On convertit le document JSON en chaîne de caractères...
    // const strJsonBody = JSON.stringify(jsonForm);

    // Méthode 2 : 2-1: On utilise le constructeur URLSearchParams afin d'extraire les informations dont on a besoin sous un format utilisable par le serveur...
    const formValues = new URLSearchParams(signinFormData);

    try {
      // Puis enfin, peu importe la méthode choisie, on envoie la requête via l'API Fetch...
      const result = await fetch("http://localhost:1215/signin", {
        method: "POST",
        // Méthode 1: 1-4: on définit les en-têtes de la requête...
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Content-Length': strJsonBody.length
        // },
        // Méthode 2: 2-2: On définit les en-têtes de la requête...
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": formValues.size,
        },
        // Méthode 1: 1-5: On assigne la valeur de la propriété body...
        // body: strJsonBody
        // Méthode 2: 2-3: On assigne la valeur de la propriété body...
        body: formValues,
      });
      console.log("result? ", result);
      // Méthode si l'on choisit à l'exercice 3 de retourner une balise via la réponse du serveur...
      // const imgTag = await result.text();

      // Méthode si l'on choisit à l'exercice 3 de retourner simplement l'image via la réponse du serveur...
      // const imgBlob = await result.blob();
      // console.log('imgBlob: ', imgBlob);
      // const imgSrc = URL.createObjectURL(imgBlob);
      // console.log('imgSrc: ', imgSrc);
      // const huskyImgDiv = document.getElementById('husky');
      // huskyImgDiv.setAttribute('src', imgSrc);
      // huskyImgDiv.style.display = 'block';
      // setTimeout(() => {
      //   huskyImgDiv.setAttribute('src', '');
      //   huskyImgDiv.style.display = 'none';
      // }, 3000);
      // Méthode 1: 1-6 : on convertit la réponse au format JSON...
      // resultDiv.innerHTML = imgTag;

      const { message, success, url } = await result.json();
      console.log("message: ", message, "success: ", success, "url: ", url);
      const resultDiv = document.getElementById("display-result");

      resultDiv.innerText = message;

      setTimeout(() => {
        resultDiv.innerText = "";
        if (success) {
          signinForm.reset();
        }
        if (url) {
          window.location = url;
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      return (window.location = "/");
    }
  });
});
