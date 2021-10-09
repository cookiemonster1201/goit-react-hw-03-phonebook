import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Container from 'components/Container';
import ContactsForm from 'components/ContactsForm';
import ContactsList from 'components/ContactsList';
import { Filter } from 'components/Filter';

const H1 = styled.h1`
  margin-bottom: 40px;
  font-size: 50px;
  text-align: center;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
`;

const H2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 40px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleStateChange = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleContactAdd = ({ name, number }) => {
    const isContactExisting = this.state.contacts.some(
      contact => contact.name === name || contact.number === number,
    );

    if (!isContactExisting) {
      this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            {
              id: uuidv4(),
              name,
              number,
            },
          ],
        };
      });
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilterValue = filter.toLowerCase();
    return contacts.length > 0
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilterValue),
        )
      : null;
  };

  handleContactDelete = contactId => {
    this.setState(prevState => {
      const contactToDelete = prevState.contacts.find(
        contact => contact.id === contactId,
      );

      const contactToDeleteIdx = prevState.contacts.indexOf(contactToDelete);
      prevState.contacts.splice(contactToDeleteIdx, 1);

      return {
        contacts: [...prevState.contacts],
        filter: '',
      };
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <H1>Phonebook</H1>
        <ContactsForm onSubmit={this.handleContactAdd} />
        <Div>
          <H2>Contacts</H2>
          <Filter value={filter} onChange={this.handleStateChange} />
          {filteredContacts && (
            <ContactsList
              contacts={filteredContacts}
              onClick={this.handleContactDelete}
            />
          )}
        </Div>
      </Container>
    );
  }
}

export default App;
