import url from "url";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { hash } from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import MongoStore from "connect-mongo";
import expressSession from "express-session";
import { findOne } from "./src/db/findOne.js";
import { dirname, join, normalize } from "path";
import favicon from "express-favicon";
import { insertOne } from "./src/db/insertOne.js";
// import sessionFileStore from 'session-file-store';
import { CONSTANTS } from "./src/constants/index.js";
import { createAuthToken } from "./src/helpers/createAuthToken.js";
import { comparePasswords } from "./src/helpers/comparePasswords.js";
import { isAuthenticated } from "./src/middlewares/isAuthenticated/index.js";
import { adminAuthentication } from "./src/middlewares/adminAuthentication/index.js";

//import client from "./src/db/client.js";
// const { dirname, join, normalize } = require('path');

// Uniquement si vous êtes en "type": "module"...
const __dirname = dirname(url.fileURLToPath(import.meta.url));
//const FileStore = sessionFileStore(expressSession);
//const fileStoreOptions = {
//  fileExtension: ".json",
//  ttl: 3600,
//  path: "./sessions",
//};

const app = express();
app.set("view engine", "pug");
app.set("views", "views/pages");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(join(__dirname, "public", "favicon.ico")));

// On peut créer un middleware global pour tous les fichiers statiques, mais cela impliquerait, dans les attributs src et href, de préciser le nom réel des dossiers sur notre serveur...
// app.use(express.static(join(__dirname, 'public')));

// Ou bien, on choisit comme ci-dessous de créer plusieurs middlewares de fichiers statiques : un pour chaque type de fichier... toujours mettre le slash  pour appeler le fichier
app.use("/styles", express.static(join(__dirname, "public", "css")));
app.use("/scripts", express.static(join(__dirname, "public", "js")));
app.use("/images", express.static(join(__dirname, "public", "images")));
app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: CONSTANTS.mongoUrl,
      dbName: "divfs-2",
      collectionName: "sessions",
      autoRemove: "native",
    }) /* new FileStore(fileStoreOptions) */,
    secret: CONSTANTS.sessionSecret,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

const adminRouter = express.Router();
app.use("/admin", adminRouter);

const getMenuItems = (req) => {
  const menuItems = [];
  if (req?.session?.user) {
    menuItems.push(...CONSTANTS.connectedMenuItems);
  } else {
    menuItems.push(...CONSTANTS.disconnectedMenuItems);
  }
  return menuItems;
};

adminRouter.get("/", adminAuthentication, (req, res, next) => {
  console.log("dans le route /admin du adminRouter");
  return res.render("admin", {
    path: "/",
    menuItems: getMenuItems(req),
    pageTitle: "Administration",
  });
});

app.get("/", (req, res, next) => {
  // On retourne un document JSON...
  // return res.json({
  //   "message": "Bienvenue sur mon site !"
  // });

  // On retourne à présent un fichier HTML...
  //return res.sendFile("index.html", htmlOptions, (err) => {
  //  if (err) {
  //    // On invoque la fonction next() avec un argument pour détourner le code vers le middleware de gestion des erreurs... [A FAIRE]
  //    next(err);
  //  } else {
  //    console.log("Fichier index.html servi avec succès !");
  //  }
  //});
  //});
  //console.log("req.session: ", req.session);

  // Maintenant, nous retournons notre page HTML en utilisant le générateur de template Pug...
  return res.render(
    "home",
    {
      path: "/",
      pageTitle: "Accueil",
      mySite: "Suzanne",
      array: ["Toto", "Titi", "Tata", "Tutu"],
      menuItems: getMenuItems(req),
    } /* , (err, html) => {
    if (err) {
      console.error(err);
    } else {
      return res.send(html);
    }
  } */
  );
});

app.get("/html/:file", (req, res, next) => {
  // /html/toto.html ==> request.params.file = toto.html
  const fileName = req.params.file;

  console.log("req.params: ", req.params);
  console.log("req.url: ", req.url);

  return res.sendFile(fileName, htmlOptions, (err) => {
    if (err) {
      // On redirige vers la page d'accueil si le fichier spécifié en paramètre de l'URL est introuvable...
      return res.redirect("/");
    } else {
      console.log(`Fichier ${fileName} servi avec succès !`);
    }
  });
});

// Ici on définit simplement une route /test/:param qui prend un paramètre et qui, si le paramètre est 42, fait passer la requête à la route suivante...
app.get("/test/:param", (req, res, next) => {
  const { param } = req.params;
  console.log("param? ", param);

  if (String(42) === param) {
    return next();
  }
  return res.json({ message: "Sur la page /test/:param" });
});
// Ici on définit une route /test/* qui va permettre de récupérer les requêtes effectuées /test avec un paramètre ayant n'importe quelle valeur...
app.get("/test/*", (req, res, next) => {
  return res.json({ message: "Sur la page /test/*" });
});

app
  .route("/signup")
  .get((req, res, next) => {
    return res.render("signup", {
      path: "/signup",
      pageTitle: "Inscription",
      menuItems: getMenuItems(req),
    });
  })
  .post(async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const newUserId = uuid();
    const saltRounds = 10;
    let notificationMessage = {};

    if (password && email && firstname && lastname) {
      try {
        console.log(`Recherche d'un utilisateur existant avec cet e-mail...`);
        const existingUser = await findOne(CONSTANTS.db, "users", { email });

        if (!existingUser) {
          console.log(`Début du hashage du mot de passe...`);
          const securedPwd = await hash(password, saltRounds);

          console.log(
            `Début de l'insertion du nouveau compte en base de données...`
          );
          const insertResult = await insertOne(CONSTANTS.db, "users", {
            id: newUserId,
            firstname,
            lastname,
            email,
            password: securedPwd,
            isAdmin: false,
          });

          console.log(
            `Le compte a été créé avec succès: ${JSON.stringify(insertResult)}`
          );

          notificationMessage = {
            message: `Un nouveau compte a été créé avec succès pour l'e-mail ${email}. Vous allez à présent redirigé vers votre page de profil.`,
            url: `/profile/${newUserId}`,
            timeout: 3000,
            success: true,
          };

          console.log(`Création de la session pour le nouvel utilisateur...`);

          const authToken = createAuthToken(newUserId, email);

          req.session.user = {
            id: newUserId,
            email,
            isLoggedIn: true,
            sessionToken: authToken,
          };
        } else {
          console.log("Un compte existe déjà avec cette adresse e-mail");
          notificationMessage = {
            message: `Un compte est déjà associé à l'e-mail ${email}. Vous allez être redirigé vers la page de connexion.`,
            url: "/signin",
            timeout: 3000,
            success: false,
          };
        }
      } catch (error) {
        return next(error);
      }
    } else {
      console.log(
        "Il manque des informations nécessaires à la création du compte"
      );
      notificationMessage = {
        message: `Il manque une information nécessaire à la création de votre compte. Merci de vérifier le formulaire.`,
        url: "",
        timeout: 3000,
        success: false,
      };
    }
    return res.json(notificationMessage);
  });

app
  .route("/signin")
  .get((req, res, next) => {
    // Mauvaise façon de faire, il faudra trouver une meilleure façon de détecter si l'utilisateur est connecté ou non. [ A FAIRE ]
    // if (req?.session?.user) {
    //   console.log('req.session: ', req.session);
    //   const { userLoggedIn, sessionToken } = req.session.user;

    //   if (userLoggedIn) {
    //     const { userId } = jwt.verify(sessionToken, CONSTANTS.privateKey);
    //     return res.redirect(`/profile/${userId}`);
    //   }
    // }

    return res.render("signin", {
      path: "/signin",
      pageTitle: "Connexion",
      menuItems: getMenuItems(req),
    });
  })
  .post(async (req, res, next) => {
    // On peut directement extraire les valeurs des propriétés de l'objet JSON qui nous a été envoyé par le client...
    const formEmail = req.body?.email;
    const formPwd = req.body?.password;
    let signinResult = {
      message: "",
      url: "",
      success: false,
    };
    let userInfo = {};
    let signinSuccess = false;

    if (formEmail && formPwd) {
      try {
        console.log("About to look for an existing user...");
        const existingUser = await findOne(
          CONSTANTS.db,
          "users",
          { email: formEmail },
          { _id: 0 }
        );

        if (!existingUser) {
          signinResult = {
            message: `Mot de passe ou e-mail incorrect, merci de vérifier les informations`,
            success: signinSuccess,
            url: "",
          };
        } else {
          console.log("Existing user found !");
          const { email, password, isAdmin, id, firstname, lastname } =
            existingUser;

          console.log("About to compare passwords...");
          signinSuccess = await comparePasswords(formPwd, password);

          console.log("signinSuccess after comparePasswords: ", signinSuccess);

          if (!signinSuccess) {
            signinResult = {
              message: `Les mots de passe ne correspondent pas, merci de réessayer.`,
              success: signinSuccess,
              url: "",
            };
          } else {
            console.log("About to create authToken...");
            const authToken = createAuthToken(id, email);
            console.log("AuthToken successfully created");

            userInfo = {
              sessionToken: authToken,
              isAdmin: isAdmin,
              userLoggedIn: true,
              userName: `${firstname} ${lastname}`,
            };

            req.session.user = userInfo;
            signinResult = {
              message: `Connexion réussie, vous allez être automatiquement redirigé vers votre page de profil.`,
              success: signinSuccess,
              url: `/profile/${id}`,
            };
          }
        }
      } catch (error) {
        console.log("about to call next(error)");
        return next(error);
      }
    } else {
      signinResult = {
        message: `Il manque l'e-mail ou le mot de passe, merci de vérifier le formulaire.`,
        success,
        url: "",
      };
    }
    console.log("About to return at end of callback function of POST /signin");
    return res.json(signinResult);
  });

app.get("/profile/:userIdParam", isAuthenticated, (req, res, next) => {
  return res.render("profile", {
    path: /profile/i,
    menuItems: getMenuItems(req),
    pageTitle: "Mon profil",
    userName: req?.session?.user
      ? req?.session?.user?.userName
      : "utilisateur anonyme",
  });
});

// Création d'une route pour la gestion de la déconnexion...
/* Déconnexion = 1) vidage de la session de l'utilisateur et 2) redirection vers la page d'accueil du site. Notre route devra vider la session et renvoyer l'URL de la page d'accueil au client. */
app.get("/signout", (req, res, next) => {
  console.log("Route /signout invoquée...");
  let redirectionUrl = "/";

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    } else {
      redirectionUrl = "/signin";
    }
  });
  return res.redirect(redirectionUrl);
});

// Création d'une route pour la modification des informations du profil utilisateur...
app.all("*", (req, res, next) => {
  return res.render("404", {
    pageTitle: "Erreur 404",
  });
});

app.use((err, req, res, next) => {
  console.error(
    `The following error was received by the error middleware: ${err}`
  );
  return res.render("404", {
    pageTitle: "Erreur 404",
  });
});

app.listen(CONSTANTS.port, () => {
  console.log(`Serveur démarré sur le port ${CONSTANTS.port}`);
});
