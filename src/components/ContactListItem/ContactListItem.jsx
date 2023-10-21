import PropTypes from 'prop-types';
import css from './ContactListItem.module.css';

export const ContactListItem = ({ contact, onDeleteContact }) => {
  const handleDelete = () => {
    onDeleteContact(contact.id);
  };

  return (
    <li>
      <div className={css.listItem}>
        <span className={css.listItemSpan}>
          {contact.name} <br />{' '}
          <span className={css.listItemNumber}> {contact.number} </span>
        </span>
        <button
          className={css.deleteButtons}
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
