import { Schema, model, models } from "mongoose";

const SaveSchema = new Schema(
  {
    boxShadows: [
      {
        id: { type: String, required: true },
        horizontalOffset: { type: Number, required: true },
        verticalOffset: { type: Number, required: true },
        blurRadius: { type: Number, required: true },
        spreadRadius: { type: Number, required: true },
        color: { type: String, required: true },
        active: { type: Boolean, required: true },
        inset: { type: Boolean, required: true },
      },
    ],
    creator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Save = models.Save ?? model("Save", SaveSchema);

export default Save;

/**
 * {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    horizontalOffset: { type: Number, required: true },
    verticalOffset: { type: Number, required: true },
    blurRadius: { type: Number, required: true },
    spreadRadius: { type: Number, required: true },
    color: { type: String, required: true },
    active: { type: Boolean, required: true },
    inset: { type: Boolean, required: true },
},
 */
