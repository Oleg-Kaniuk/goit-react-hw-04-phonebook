import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MainContainer } from "./App.styled";

import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

const KEY_LS = 'contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  
  const [contacts, setContacts] = useState(() => {
    const initialState = JSON.parse(localStorage.getItem(KEY_LS));
    return  initialState || initialContacts});
  const [filter, setFilter] = useState('');

   useEffect(() => {
    localStorage.setItem(KEY_LS, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = data => {
    const obj = { ...data, id: nanoid() };

    setContacts(prevContacts => {
      if (newName(prevContacts, obj) === undefined) {
        return [...prevContacts, obj];
      } else {
        Notify.warning(`${obj.name} is already in contacts`, {
          width: '300px',
          position: 'right-top',
          timeout: 2000,
          fontSize: '20px',
        });
        return [...prevContacts];
      };
    });
  };

  const newName = (prevContacts, obj) => {
    return prevContacts.find(({ name }) =>
      name.toLowerCase() === obj.name.toLowerCase())
  };

  const removeContact = (contactId) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId));
  }

  const onChangeFilter = (evt) => {
    const {value} = evt.currentTarget;
    setFilter(value);
  }

  const filterByName = () => {
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      (name.toLowerCase().includes(lowerFilter)))
  }

  const visibleContacts = filterByName();

    return (
      <MainContainer>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={onSubmitForm} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={onChangeFilter} />
        <ContactList onRemoveContact={removeContact} contacts={visibleContacts}/>
      </MainContainer>
    );
  
}