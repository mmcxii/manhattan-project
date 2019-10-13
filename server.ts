import express, { Application } from 'express';
import morgan from 'morgan'
import DB from './db';

const app: Application = express();
app.use(morgan('dev'));

const PORT = process.env.PORT || 6969;

// Listen for HTTP traffic once DB connection is established
DB.once('open', () => {
    console.log('Successfully connected to DB.');
    app.listen(PORT, () => console.log(`Listening for connections on port: ${PORT}`));
});