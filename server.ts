// Load env variables
import dotenv from 'dotenv';
dotenv.config()

import path from 'path';
import express, { Application } from 'express';
import morgan from 'morgan';
import DB from './db';
import routeConfig from './routes';
import { passportStrategy } from './config/passport';
import passport from 'passport';

passportStrategy(passport);

// Create Express app
const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Setup routes
routeConfig(app);

const PORT = process.env.PORT || 6969;

//api.cocktaildb();
//pi.brewerydb('citrus');
//api.quiniwine();

// Listen for HTTP traffic once DB connection is established
DB.connect()
  .then(() => {
    console.log('Successfully connected to DB.');
    app.listen(PORT, () =>
      console.log(`Listening for connections on port: ${PORT}`)
    );
  })
  .catch(error => {
    console.error(`Could not start app: ${error}`);
    process.exit();
  });
