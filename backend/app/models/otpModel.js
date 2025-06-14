// models/quizScoreModel.js
import { mongoose } from "mongoose";

const otpModelschema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    otp: { type: String },
    status: { type: Number, default:0 },
    createdDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const otpModel = mongoose.model("otps", otpModelschema);
