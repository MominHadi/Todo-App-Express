import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        enum: ["admin", "user"],
        type: String,
        default: "user"
    }
});

export const User = mongoose.model('User', UserSchema);