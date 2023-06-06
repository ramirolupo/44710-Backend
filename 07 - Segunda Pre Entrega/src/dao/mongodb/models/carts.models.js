import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const cartsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    products: { type: [ infoSchema ], required: true }

    
});

export const CartsModel = mongoose.model('carts', cartsSchema);


