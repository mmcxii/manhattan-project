import path from 'path';
import express, { Application } from 'express';
import morgan from 'morgan';
import DB from './db';
import routeConfig from './routes';

// Create Express app
const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Setup routes
routeConfig(app);

const PORT = process.env.PORT || 6969;

// Listen for HTTP traffic once DB connection is established
DB.connect().then(() => {
  console.log('Successfully connected to DB.');
  app.listen(PORT, () =>
    console.log(`Listening for connections on port: ${PORT}`)
  );
}).catch(error => {
  console.error(`Could not start app: ${error}`);
  process.exit();
});