import { Component } from "react";
import { nanoid } from "nanoid";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MainContainer } from "./App.styled";

import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

const KEY_LS = 'contacts';

export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }

  componentDidMount = () => {
    const initialState = JSON.parse(localStorage.getItem(KEY_LS));
    if (initialState) {
      this.setState({ contacts: [...initialState] });
    };
  }
  
  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(KEY_LS, JSON.stringify(this.state.contacts))
    };
  }

    onSubmitForm = data => {
    const obj = { ...data, id: nanoid() };
    this.setState(({ contacts }) => {
      if (this.newName(contacts, obj) === undefined) {
        return { contacts: [...contacts, obj] }
      } else {
        Notify.warning(`${obj.name} is already in contacts`, {
          width: '300px',
          position: 'right-top',
          timeout: 2000,
          fontSize: '20px',
        });
        return { contacts: [...contacts] }
      };
    });
  }

   newName = (contacts, obj) => {
     return contacts.find(({ name }) => 
      name.toLowerCase() === obj.name.toLowerCase())
  }

  removeContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId)
    }));
  }

  onChangeFilter = (evt) => {
    const {value} = evt.currentTarget;
    this.setState({ filter: value })
  }

   filterByName = () => {
    const { contacts, filter } = this.state;
    const lowerFilter = filter.toLowerCase().trim();
    return contacts.filter(({ name }) => 
      (name.toLowerCase().trim().includes(lowerFilter) ))
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.filterByName();

    return (
      <MainContainer>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitForm} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.onChangeFilter} />
        <ContactList onRemoveContact={this.removeContact} contacts={visibleContacts}/>
      </MainContainer>
    );
  };
}