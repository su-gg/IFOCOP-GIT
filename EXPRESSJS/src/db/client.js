import { MongoClient } from "mongodb";
import { CONSTANTS } from "../constants/index.js";

const client = new MongoClient(CONSTANTS.mongoUrl);

export default client;
