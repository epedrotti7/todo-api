import mongoose from 'mongoose';

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || 'example';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB = process.env.MONGO_INITDB_DATABASE || 'todoapp';

const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

export default db;
