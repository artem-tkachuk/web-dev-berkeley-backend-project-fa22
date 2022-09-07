// src/app.ts

// Imports
import express, { Application } from 'express';
import bodyParser from "body-parser";

import runnersRoutes from "./routes/runnersRoutes";
import giftsRoutes from "./routes/giftsRoutes";
import { get404 } from './controllers/error';
import {getGiftList} from "./api/getGiftList";

// Create a new express application instance
const app: Application = express();

// Body parsing
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// implement Routes
app.use(runnersRoutes);
app.use(giftsRoutes);
app.use(get404);

export default app;