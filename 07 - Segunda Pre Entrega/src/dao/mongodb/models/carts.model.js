import mongoose from 'mongoose';


const CartSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
  ]
});

CartSchema.pre(['find', 'findById'], function(){
    this.populate('products')
  })

export const CartModel = mongoose.model('carts', CartSchema);


