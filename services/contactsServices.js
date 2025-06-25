import Contact from "../db/models/Contact.js";

export async function getContactsList(userId) {
    try {
        return await Contact.findAll({ where: { owner: userId } });
    } catch (error) {
        console.error("Error listing contacts:", error);
        throw error;
    }
}

export async function getContactById(contactId, userId) {
    try {
        return await Contact.findOne({ where: { id: contactId, owner: userId } });
    } catch (error) {
        console.error(`Error getting contact with ID ${contactId}:`, error);
        throw error;
    }
}

export async function addContact(name, email, phone, userId) {
    try {
        return await Contact.create({ id: nanoid(), name, email, phone, owner: userId });
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
}

export async function updateContact(contactId, updatedData, userId) {
    try {
        const contact = await Contact.findOne({
            where: { id: contactId, owner: userId },
        });

        if (!contact) {
            console.log(`Contact with ID ${contactId} not found`);
            return null;
        }

        const updatedContact = await contact.update(updatedData);
        return updatedContact;
    } catch (error) {
        console.error(`Error updating contact with ID ${contactId}:`, error);
        throw error;
    }
}

export async function removeContact(contactId, userId) {
    try {
        const contact = await Contact.findOne({
            where: { id: contactId, owner: userId },
        });
        if (!contact) return null;
        await contact.destroy();
        return contact;
    } catch (error) {
        console.error(`Error removing contact with ID ${contactId}:`, error);
        throw error;
    }
}

export async function updateStatusContact(contactId, { favorite }, userId) {
    try {
        const [rowsUpdated, [updatedContact]] = await Contact.update(
            { favorite },
            {
                where: { id: contactId, owner: userId },
                returning: true,
            }
        );
        return rowsUpdated ? updatedContact : null;
    } catch (error) {
        console.error(
            `Error updating favorite status for contact with ID ${contactId}:`,
            error
        );
        throw error;
    }
}
