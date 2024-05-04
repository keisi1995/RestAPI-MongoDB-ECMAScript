import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const UserSchema = Schema({
    first_name: { type: String , required: true },
    last_name: { type: String , required: true },
    phone_number: { type: String , required: false },
    email: { type: String , required: true, match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password: { type: String , required: true, select: false },
    created: { type:  Date, default: Date.now }
});

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        // delete ret.password; // exclude the  column 'password'
        delete ret.__v;
    }
});

// UserSchema.pre(/^find/, function(next) {
//     this.select('-password'); // exclude the column 'password' of all querys
//     next();
// });

UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.query.withPassword = function() {
    return this.select('+password');
};

UserSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

export default model('users', UserSchema);