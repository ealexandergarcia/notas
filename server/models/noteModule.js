const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const changeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false, timestamps: true, collection: "note" }
);

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    changes: [changeSchema],
    status: {
      type: String,
      enum: ["not visible", "visible"],
      default: "not visible",
    },
  },
  { timestamps: true, collection: "note" }
);

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
