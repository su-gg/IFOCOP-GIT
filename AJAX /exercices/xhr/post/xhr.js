document.addEventListener('DOMContentLoaded', function () {
  // Récupérer les éléments du formulaire et les zones d'affichage
  const form = document.getElementById('dataForm');
  const titleDisplay = document.getElementById('titleDisplay');
  const bodyDisplay = document.getElementById('bodyDisplay');

  // Écouter la soumission du formulaire
  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut du formulaire

      // Récupérer les données du formulaire
      const formData = new FormData(form);
      const title = formData.get('title');
      const body = formData.get('body');

      // Utiliser XMLHttpRequest pour simuler l'envoi des données et afficher les résultats
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/submit', true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              // Afficher les données dans les zones définies
              titleDisplay.textContent = title;
              bodyDisplay.textContent = body;
          }
      };

      xhr.send(JSON.stringify({ title: title, body: body }));
  });
});