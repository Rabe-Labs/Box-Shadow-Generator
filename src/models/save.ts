import mongoose, { Schema, model, models } from "mongoose";

const SaveSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    horizontalOffset: { type: Number, required: true },
    verticalOffset: { type: Number, required: true },
    blurRadius: { type: Number, required: true },
    spreadRadius: { type: Number, required: true },
    color: { type: String, required: true },
    active: { type: Boolean, required: true },
    inset: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Save = models.Save || model("User", SaveSchema);

export default Save;
