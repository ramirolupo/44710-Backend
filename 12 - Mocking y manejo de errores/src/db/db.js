import mongoose from 'mongoose';
import config from '../config/config.js';

const connectionString = config.MONGO_DB;

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos MongoDB');
} catch (error) {
    console.log(`ERROR => ${error}`);
}