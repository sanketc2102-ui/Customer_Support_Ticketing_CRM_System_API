import Tickets from "../model/ticketSchema.js";
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
  } catch (err) {
    next(err);
  }
};

const getTicketById = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

const updateTicketById = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export { createTicket, getTickets, getTicketById, updateTicketById };
