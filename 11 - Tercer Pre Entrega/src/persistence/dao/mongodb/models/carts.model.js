import mongoose from 'mongoose';


const CartSchema = new mongoose.Schema({
    products: [
      {
        _id: false,
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
    this.populate('products.product')
  })

export const CartModel = mongoose.model('carts', CartSchema);


