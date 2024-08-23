export const CONSTANTS = Object.freeze({
  port: 1215,
  privateKey: String(process.env.PRIVATE_KEY),
  sessionSecret: String(process.env.SESSION_SECRET),
  mongoUrl: String(process.env.MONGO_URL),
  db: "divfs-2",
  disconnectedMenuItems: [
    { name: "Accueil", url: "/" },
    { name: "Connexion", url: "/signin" },
    { name: "Inscription", url: "/signup" },
  ],
  connectedMenuItems: [
    { name: "Accueil", url: "/" },
    { name: "Déconnexion", url: "/signout" },
  ],
});
