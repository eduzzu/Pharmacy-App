import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    cnp: { type: String, required: true, min: 13, max: 13, unique: true },
    phoneNumber: { type: String, min: 10, max: 10, unique: true },
}, { timestamps: true });
const User = model("User", userSchema);
export default User;
