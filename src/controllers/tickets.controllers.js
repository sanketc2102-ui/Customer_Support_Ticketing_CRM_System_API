import Tickets from "../model/ticketSchema.js";
import Notes from "../model/notesSchema.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Types } from "mongoose";

const createTicket = async (req, res, next) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    const _id = new Types.ObjectId();

    const ticket = await Tickets.create({
      _id,
      ticket_id: `TKT-${_id.toString().slice(-6).toUpperCase()}`,
      customer_name,
      customer_email,
      subject,
      description,
      status: "Open",
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { ticket_id: ticket.ticket_id, created_at: ticket.created_at },
          "Ticket created successfully",
        ),
      );
  } catch (err) {
    next(err);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { customer_name: regex },
        { customer_email: regex },
        { ticket_id: regex },
        { description: regex },
      ];
    }

    const tickets = await Tickets.find(filter)
      .select("ticket_id customer_name subject status created_at -_id")
      .sort({ created_at: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, "Tickets fetched successfully", tickets));
  } catch (err) {
    next(err);
  }
};

const getTicketById = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Tickets.findOne({ ticket_id }).select(
      "ticket_id customer_name customer_email subject description status created_at -_id",
    );

    if (!ticket) {
      throw new ApiError(404, `Ticket ${ticket_id} not found`);
    }

    const notes = await Notes.find({ ticket_id: ticket._id })
      .select("note_text created_at -_id")
      .sort({ created_at: 1 });

    return res.status(200).json(
      new ApiResponse(200, "Ticket fetched successfully", {
        ...ticket.toObject(),
        notes,
      }),
    );
  } catch (err) {
    next(err);
  }
};

const updateTicketById = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    const { status, notes } = req.body;

    const ticket = await Tickets.findOne({ ticket_id });

    if (!ticket) {
      throw new ApiError(404, `Ticket ${ticket_id} not found`);
    }

    if (status) ticket.status = status;
    ticket.updated_at = new Date();
    await ticket.save();

    if (notes) {
      await Notes.create({ ticket_id: ticket._id, note_text: notes });
    }

    return res.status(200).json(
      new ApiResponse(200, "Ticket updated successfully", {
        success: true,
        updated_at: ticket.updated_at,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export { createTicket, getTickets, getTicketById, updateTicketById };
