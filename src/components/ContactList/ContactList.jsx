import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem";

export default function ContactList({ filterContacts, deleteContact }) {
  return (
    <ul>
      {filterContacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  filterContacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
