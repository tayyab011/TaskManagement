import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String },
    photo: { type: String },
    createdDate: { type:Date ,default:Date.now() },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model("users", userSchema);