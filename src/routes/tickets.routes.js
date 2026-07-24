import { Router } from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicketById,
} from "../controllers/tickets.controllers.js";
import {
  createTicketValidator,
  getTicketsValidator,
  ticketIdParamValidator,
  updateTicketValidator,
} from "../validators/index.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

router
  .route("/")
  .get(getTicketsValidator, validate, getTickets)
  .post(createTicketValidator, validate, createTicket);

router
  .route("/:ticket_id")
  .get(ticketIdParamValidator, validate, getTicketById)
  .put(updateTicketValidator, validate, updateTicketById);

export default router;
