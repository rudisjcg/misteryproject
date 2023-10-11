import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    image: {
      type: { type: [String] },
    },
    likes: {
      type: Array,
      required: false,
    },
    subComment: {
      type: Array,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment =
  models?.commentSchema || mongoose.model("commentSchema", commentSchema);
export default Comment;
