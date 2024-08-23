import jwt from "jsonwebtoken";
import { CONSTANTS } from "../constants/index.js";

export const createAuthToken = (userId, userEmail) => {
  const authToken = jwt.sign({ userId, userEmail }, CONSTANTS.privateKey, {
    expiresIn: 600,
  });

  return authToken;
};
