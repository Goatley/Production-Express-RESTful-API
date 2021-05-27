import IUser from '../Interfaces/auth/IUser.js';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter your first name']
        },

        lastName: {
            type: String,
            required: [true, 'Please enter your last name']
        },

        salt: {
            type: String,
            required: [true, 'Salt required']
        },

        hash: {
            type: String,
            required: [true, 'Hash required']
        },

        email: {
            type: String,
            required: [true, 'Please enter a valid email'],
            index: true,
        }
    }, 
    { timestamps: true }
)

export default mongoose.model<IUser & mongoose.Document>('User', User);