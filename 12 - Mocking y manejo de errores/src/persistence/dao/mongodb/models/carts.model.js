import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
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

cartSchema.pre(['find', 'findById'], function(){
    this.populate('products.product')
  })

export const cartModel = mongoose.model('carts', cartSchema);


