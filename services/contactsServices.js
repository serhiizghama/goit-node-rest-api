import Contact from "../models/contact.js";

export async function getContactsList() {
    try {
        return await Contact.findAll();
    } catch (error) {
        console.error("Error listing contacts:", error);
        throw error;
    }
}

export async function getContactById(contactId) {
    try {
        return await Contact.findByPk(contactId);
    } catch (error) {
        console.error(`Error getting contact with ID ${contactId}:`, error);
        throw error;
    }
}

export async function addContact(name, email, phone) {
    try {
        return await Contact.create({ name, email, phone });
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
}

export async function updateContact(contactId, updatedData) {
    try {
        const [rowsUpdated, [updatedContact]] = await Contact.update(updatedData, {
            where: { id: contactId },
            returning: true,
        });
        return rowsUpdated ? updatedContact : null;
    } catch (error) {
        console.error(`Error updating contact with ID ${contactId}:`, error);
        throw error;
    }
}

export async function removeContact(contactId) {
    try {
        const contact = await getContactById(contactId);
        if (!contact) return null;
        await contact.destroy();
        return contact;
    } catch (error) {
        console.error(`Error removing contact with ID ${contactId}:`, error);
        throw error;
    }
}

export async function updateStatusContact(contactId, favoriteValue) {
    try {
        console.log(`${contactId, favoriteValue}`)
        const [rowsUpdated, [updatedContact]] = await Contact.update({ favorite: favoriteValue }, {
            where: { id: contactId },
            returning: true,
        });
        return rowsUpdated ? updatedContact : null;
    } catch (error) {
        console.error(`Error updating favorite status for contact with ID ${contactId}:`, error);
        throw error;
    }
}
