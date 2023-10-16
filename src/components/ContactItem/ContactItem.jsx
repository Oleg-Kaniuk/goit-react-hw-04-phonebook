import { Contact, ButtonRemove } from "./ContactItem.styled";

export const ContactItem = ({ id, name, number, onRemoveContact }) => (
    <Contact key={id}>
        <p>{name}: {number}</p>
        <ButtonRemove type="button" onClick={() => onRemoveContact(id)}>Delete</ButtonRemove>
    </Contact>
);