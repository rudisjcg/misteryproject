import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },
    subComment: {
      type: Array,
      required: false,
    },
    session: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment =
  models.commentSchema || mongoose.model("commentSchema", commentSchema);
export default Comment;
