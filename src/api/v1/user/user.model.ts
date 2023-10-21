import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
    _id: { type: String, trim: true },
    walletAddress: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    works: {
        type: [{
            cid: String,
            timestamp: Date
        }]
    }
});

export const User = model("User", userSchema);