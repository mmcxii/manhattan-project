// Load env variables
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import { SocketServer } from './socketServer';
import morgan from 'morgan';
import DB from './db';
import routeConfig from './routes';

// Create Express app
const app: Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'client/build')));

// Setup routes
routeConfig(app);

const PORT = process.env.PORT || 6969;
module.exports = app;
// Listen for HTTP traffic once DB connection is established
DB.connect()
  .then(() => {
    console.log('Successfully connected to DB.');
    const httpServer = app.listen(PORT, () => console.log(`Listening for connections on port: ${PORT}`));

    // Attach socket server to http server to listen for socket events
    SocketServer(httpServer);
  })
  .catch(error => {
    console.error(`Could not start app: ${error}`);
    process.exit();
  });
