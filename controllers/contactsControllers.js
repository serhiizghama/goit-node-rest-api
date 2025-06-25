import {
    getContactsList,
    getContactById,
    removeContact,
    addContact,
    updateContact as updateContactService,
    updateStatusContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const result = await getContactsList(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const contact = await getContactById(id, userId);
        if (!contact) {
            throw HttpError(404);
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        const { status = 500, message = "Internal Server Error" } = error;
        res.status(status).json({ message });
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const removedContact = await removeContact(id, userId);
        if (!removedContact) {
            throw HttpError(404);
        }
        res.status(200).json(removedContact);
    } catch (error) {
        console.error("Error deleting contact:", error);
        const { status = 500, message = "Internal Server Error" } = error;
        res.status(status).json({ message });
    }
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        if (!name || !email || !phone) {
            throw HttpError(400, "Name, email, and phone are required");
        }
        const { id: userId } = req.user;
        const result = await addContact(name, email, phone, userId);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { id: userId } = req.user;
    try {
        if (name || email || phone) {
            const updatedContact = await updateContactService(id, { name, email, phone }, userId);
            if (!updatedContact) {
                throw HttpError(404);
            }
            res.status(200).json(updatedContact);
        } else {
            throw HttpError(400, "Name, email, or phone is required");
        }
    } catch (error) {
        console.error("Error updating contact:", error);
        const { status = 500, message = "Internal Server Error" } = error;
        res.status(status).json({ message });
    }
};

export const updateFavoriteController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;
        const { id: userId } = req.user;

        if (typeof favorite !== "boolean") {
            return next(HttpError(400, "Missing field favorite"));
        }
        const updatedContact = await updateStatusContact(contactId, { favorite }, userId);
        if (!updatedContact) {
            return next(HttpError(404, "Not found"));
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        next(error);
    }
};
