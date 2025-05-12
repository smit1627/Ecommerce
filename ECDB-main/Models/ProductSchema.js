const { Schema, model } = require("mongoose");
// Reusable field config
const commonField = {
    type: String,
    trim: true,
};


// User schema
const Product = new Schema({
    title: commonField,
    description: commonField,
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: { ...commonField, required: true },
}, { timestamps: true });

// Models

const ProductModel = model('Product', Product); // Use 'Product' as model name for collection
module.exports = { ProductModel };
