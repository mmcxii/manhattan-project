import mongoose, { Connection } from 'mongoose';

const DB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost/manhattenDB';

const DB: Connection = mongoose.createConnection(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

DB.on('error', error => console.log(`DB ERROR: ${error}`));

export default DB;