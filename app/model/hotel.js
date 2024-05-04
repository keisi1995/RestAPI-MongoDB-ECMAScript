import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const HotelSchema = Schema({
    theaterId: { type: Number , required: true },
    location: { type: Object, require: true }
});

HotelSchema.set('toJSON', {
    transform: function (doc, ret) {
        // delete ret.password; // exclude the  column 'password'
        delete ret.__v;
    }
});

export default model('hotels', HotelSchema);