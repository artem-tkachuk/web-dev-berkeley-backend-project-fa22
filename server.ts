require('dotenv').config();    //load environmental variables

import mongo from "./src/database/mongo";

import app from "./src/app";

const port = parseInt(process.env.PORT!) || 8080;

mongo(app, port);