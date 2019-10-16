import mongoose, { Connection } from 'mongoose';

const DB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/manhattenDB';

export default {
  connect: (): Promise<void | Connection> => {
    return mongoose
      .connect(DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(db => db.connection.on('error', error => console.log(`DB ERROR: ${error}`)));
  },
};
