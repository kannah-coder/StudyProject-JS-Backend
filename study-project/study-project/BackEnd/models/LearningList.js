import mongoose from "mongoose";

const learningListSchema = new mongoose.Schema({
  name: String,
  difficulty: Number,
  image: String,
  language: String,
  quantity: { type: Number, default: 1 },
  totalDifficulty: Number,
  status: { type: String, default: "In Progress" },
});


export default mongoose.model("LearningList", learningListSchema);
