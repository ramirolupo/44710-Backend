import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://ramaalupo:admin@rlcluster.v1kncvp.mongodb.net/?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos MongoDB');
} catch (error) {
    console.log(error);
}