import mongoose from "mongoose";
import { Schema } from "mongoose";

const tickeSchema = new Schema(
  {
    ticket_id: {
      type: String,
      unique: true,
      required: true, // generated in controller, e.g. TKT-001
    },
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    customer_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

const Tickets = mongoose.model("Ticket", tickeSchema);

export default Tickets;
