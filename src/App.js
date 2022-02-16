import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  deleteContact = (event) => {
    event.preventDefault();
    const idDeletedContact = event.currentTarget.id;
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== idDeletedContact
      ),
    }));
  };

  addContact = (contact) => {
    contact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };
    if (
      !this.state.contacts.find(
        (oldContact) =>
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

  addFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  filterContacts = () =>
    this.state.contacts.filter((contact) =>
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
