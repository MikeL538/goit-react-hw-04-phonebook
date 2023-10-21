import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { contacts as contactsData } from 'data/contacts';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export const App = () => {
  const [state, setState] = useState({
    contacts: contactsData,
    filter: '',
    name: '',
    number: '',
  });

  const { name, number, contacts, filter } = state;
  const contactExists = contacts.some(
    contact => contact.name === name || contact.number === number
  );

  const addNewContact = newContact => {
    const updatedContacts = [...contacts, newContact];
    setState(prevState => ({
      ...prevState,
      contacts: updatedContacts,
      name: '',
      number: '',
    }));
    updateLocalStorage(updatedContacts);
  };

  const handleAddContact = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contactExists) {
      alert('This contact is already in your phonebook!');
      return;
    }
    addNewContact(newContact);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFilterChange = newFilter => {
    setState(prevState => ({ ...prevState, filter: newFilter }));
  };

  const deleteContact = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setState(prevState => ({ ...prevState, contacts: updatedContacts }));
    updateLocalStorage(updatedContacts);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      const { name, number } = contact;
      return (
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.includes(filter)
      );
    });
  };

  const updateLocalStorage = updatedContacts => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setState(prevState => ({ ...prevState, contacts: storedContacts }));
    }
  }, []);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        handleInputChange={handleInputChange}
        handleAddContact={handleAddContact}
      />
      <h2>Contacts</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
