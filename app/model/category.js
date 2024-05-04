import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = Schema({
    description: { type: String , required: true },
    total: { type: Number , required: true },
    photo_url: { type: String , required: false },
    created: { type:  Date, default: Date.now }
});

CategorySchema.set('toJSON', {
    transform: function (doc, ret) {
        // delete ret.password; // exclude the  column 'password'
        delete ret.__v;
    }
});

export default model('categorys', CategorySchema);