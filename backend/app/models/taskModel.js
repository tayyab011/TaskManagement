// models/quizScoreModel.js
import { mongoose } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: { type: String },
    status: { type: String },
    email: { type: String}, 
/*   email: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, */
    createdDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const taskModel = mongoose.model("tasks", taskSchema);
