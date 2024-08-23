import jwt from "jsonwebtoken";
import { CONSTANTS } from "../../constants/index.js";

export const isAuthenticated = (req, _res, next) => {
  const { userIdParam } = req.params;
  let authenticatedUserPayload = undefined;
  const userNotConnected = {
    error: "invalid-auth",
    message: `Merci de vous connecter afin de pouvoir accéder à ce contenu.`,
    url: "/login",
  };
  const wrongUser = {
    error: "invalid-auth",
    message: `Ce contenu est réservé à un autre utilisateur. Merci de vous connecter.`,
    url: "/login",
  };

  if (req?.session?.user) {
    console.log("user property found in req.session");
    const { sessionToken } = req?.session?.user;
    const { id } = req?.session?.user;

    if (sessionToken) {
      console.log("sessionToken found in req.session.user: ", sessionToken);
      authenticatedUserPayload = jwt.verify(sessionToken, CONSTANTS.privateKey);
      console.log(
        "authenticatedUserPayload: ",
        JSON.stringify(authenticatedUserPayload)
      );

      if (userIdParam) {
        console.log("userIdParam found in the url");
        console.log(
          "authenticatedUserPayload.userId: ",
          authenticatedUserPayload.userId
        );
        console.log(
          "ids match? ",
          authenticatedUserPayload.userId === userIdParam
        );

        if (authenticatedUserPayload.userId === userIdParam) {
          console.log(
            "about to call next() function in isAuthenticated middleware..."
          );
          return next();
        } else {
          return next(wrongUser);
        }
      } else {
        if (id) {
          console.log("No userIdParam found, but found a id instead");

          if (authenticatedUserPayload.userId === id) {
            console.log("id matches payload id");
            return next();
          } else {
            console.log("id does not match payload id");
            return next(wrongUser);
          }
        } else {
          return next(userNotConnected);
        }
      }
    } else {
      return next(userNotConnected);
    }
  } else {
    return next(userNotConnected);
  }
};
