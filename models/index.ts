import mongoose, { Connection } from 'mongoose';
import { User } from './User';
import { Product } from './Product';

const DB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost/manhattenDB';

const DB: Connection = mongoose.createConnection(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

DB.on('error', error => console.log(`DB ERROR: ${error}`));
DB.once('open', () => console.log('Successfully connected to DB.'));

export default {
    DB,
    User,
    Product
};