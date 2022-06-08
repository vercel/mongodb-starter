import { MongoClient } from 'mongodb';

const databaseUrl = process.env.MONGODB_URI as string;
const options = {};

let client;
let connection: Promise<any>;

declare global {
  var _connection: Promise<any>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Atlas database URL to .env or .env.local');
}

const connectToMongo = () => {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._connection) {
      client = new MongoClient(databaseUrl, options);
      global._connection = client.connect();
    }
    connection = global._connection;
  } else {
    if (!connection) {
      client = new MongoClient(databaseUrl, options);
      connection = client.connect();
    }
  }

  return connection;
};

export default connectToMongo;
