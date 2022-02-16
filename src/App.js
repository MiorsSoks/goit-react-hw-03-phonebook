import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

// {id: '1', name: "Your Contact", number: '12345'}

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts);

    if (contacts) this.setState({ contacts: parsedContacts });
    console.log(localStorage.getItem('contacts'));
    
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {localStorage.setItem('contacts', JSON.stringify(this.state.contacts))};
  }

  deleteContact = event => {
    event.preventDefault();
    const idDeletedContact = event.currentTarget.id;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== idDeletedContact
      ),
    }));
  };

  addContact = contact => {
    contact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };
    if (
      !this.state.contacts.find(
        oldContact =>
          oldContact.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    } else {
      alert(`${contact.name} is already in contacts`);
    }
  };

  addFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  filterContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  render() {
    const { filter } = this.state;
    const filterContacts = this.filterContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter filter={filter} addFilter={this.addFilter} />
        <ContactList
          filterContacts={filterContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
