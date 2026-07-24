import { body } from "express-validator";

const createTicketValidator = () => {
  return [
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
    body("description")
      .trim()
      .notEmpty()
      .withMessage("description is required"),
  ];
};

export { createTicketValidator };
