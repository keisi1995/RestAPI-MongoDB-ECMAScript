import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProductSchema = Schema({
    description: { type: String, require: true },
    total: { type: Number, require: true },
    stock: { type: Number, require: true }
});

ProductSchema.set('toJSON', {
    transform: function (doc, ret) {
        // delete ret.password; // exclude the  column 'password'
        delete ret.__v;
    }
});

export default model('products', ProductSchema);