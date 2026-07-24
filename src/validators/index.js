import { body, param, query } from "express-validator";

const createTicketValidator = [
  body("customer_name")
    .trim()
    .notEmpty()
    .withMessage("customer_name is required"),
  body("customer_email")
    .trim()
    .notEmpty()
    .withMessage("customer_email is required")
    .isEmail()
    .withMessage("customer_email must be a valid email"),
  body("subject").trim().notEmpty().withMessage("subject is required"),
  body("description").trim().notEmpty().withMessage("description is required"),
];

const getTicketsValidator = [
  query("status")
    .optional()
    .isIn(["Open", "In Progress", "Closed"])
    .withMessage("status must be Open, In Progress or Closed"),
  query("search").optional().trim().isString(),
];

const ticketIdParamValidator = [
  param("ticket_id")
    .trim()
    .notEmpty()
    .withMessage("ticket_id param is required"),
];

const updateTicketValidator = [
  ...ticketIdParamValidator,
  body("status")
    .optional()
    .isIn(["Open", "In Progress", "Closed"])
    .withMessage("status must be Open, In Progress or Closed"),
  body("notes")
    .optional()
    .trim()
    .isString()
    .withMessage("notes must be a string"),
];

export {
  createTicketValidator,
  ticketIdParamValidator,
  updateTicketValidator,
  getTicketsValidator,
};
