import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 10px;
  width: 150px;
  margin-top: 10px;
  background-color: #ff1414;
  color: whitesmoke;
  border-radius: 5px;
  transition: background-color 200ms linear, color 500ms linear;

  &:hover,
  &:focus {
    background-color: #c9baba;
    color: red;
    transition: background-color 200ms linear, color 500ms linear;
  }
`;
const P = styled.p`
  font-size: 25px;
`;

class ContactsListItem extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = ({ currentTarget: { name } }) => {
    this.props.onClick(name);
  };

  render() {
    const {
      contact: { name, number, id },
    } = this.props;
    return (
      <>
        <P>
          {name}: {number}
        </P>
        <Button name={id} type="button" onClick={this.handleClick}>
          delete
        </Button>
      </>
    );
  }
}

export { ContactsListItem, Button };
