import firebase from '../firebase_init';
const db = firebase().firestore();

export enum ContactTypes {
    EMAIL = 'EMAIL',
    TEXT = 'TEXT'
};

export type Ticket = {
    id?: string;
    contact_type: ContactTypes;
    contact_info: string;
    created_at: Date;
};

export const createTicket = (ticket: Ticket): Promise<any> => {
    return db.collection("tickets")
        .add(ticket);
}
