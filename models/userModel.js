// server/models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
