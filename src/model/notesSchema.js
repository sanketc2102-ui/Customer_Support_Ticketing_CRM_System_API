import mongoose from "mongoose";
import { Schema } from "mongoose";

const notesSchema = new Schema(
  {
    ticket_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    note_text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

const Notes = mongoose.model("Note", notesSchema);

export default Notes;
