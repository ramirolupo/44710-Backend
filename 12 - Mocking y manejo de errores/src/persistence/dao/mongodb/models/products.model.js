import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: true },
    category: { type: String, required: true, index: true },
    thumbnails: { type: [String], required: false }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model('products',productSchema);

