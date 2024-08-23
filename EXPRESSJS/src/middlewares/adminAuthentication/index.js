export const adminAuthentication = (req, res, next) => {
  let userIsAdmin = false;
  console.log(
    "Nous passons dans le middleware d'authentification de l'administration..."
  );

  // Ici nous ajouterons une véritable logique de vérification du rôle de l'utilisateur connecté [A FAIRE]
  userIsAdmin = true;

  if (userIsAdmin) {
    return next();
  }
  return next({ url: "/login" });
};
