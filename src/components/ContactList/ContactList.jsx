import { ContactItem } from "components/ContactItem/ContactItem";
import { ContactsList } from "./ContactList.styled";

export const ContactList = ({ contacts, onRemoveContact }) => (
    <ContactsList>
         {contacts.map(contact => (
             <ContactItem key={contact.id} name={contact.name} number={contact.number} id={contact.id} onRemoveContact={onRemoveContact} />
        ))}
    </ContactsList>
);