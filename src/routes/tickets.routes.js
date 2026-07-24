import { Router } from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
  updateTicketById,
} from "../controllers/tickets.controllers.js";

const router = Router();

router.route("/").get(getTickets).post(createTicket);

router.route("/:ticket_id").get(getTicketById).put(updateTicketById);

export default router;
