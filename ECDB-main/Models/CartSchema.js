const { Schema, default: mongoose, model } = require("mongoose");
// First Try (Everything is working fine)
const CartItemSchema  = new Schema({
    productId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});

const CartUserSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema]
});

const CartItem = model('CartItemSchema', CartItemSchema); 
const CartUser = model('CartUserSchema', CartUserSchema); 

module.exports = { CartItem, CartUser };
 