import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteController,
} from "../controllers/contactsControllers.js";
import { validateBody } from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema, } from "../schemas/contactsSchemas.js";
import authenticate from '../middleware/authenticate.js';
const contactsRouter = express.Router();

// Apply authentication middleware to all routes
contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:contactId/favorite", validateBody(updateFavoriteSchema), updateFavoriteController);

export default contactsRouter;