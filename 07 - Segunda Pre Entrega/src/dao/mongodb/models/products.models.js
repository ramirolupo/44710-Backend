import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

UserSchema.plugin(mongoosePaginate);


export const ProductsModel = mongoose.model(
   'products',
   productsSchema 
);

