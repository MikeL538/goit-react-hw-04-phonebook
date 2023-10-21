import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './contactForm.module.css';

export const ContactForm = ({
  name,
  number,
  handleInputChange,
  handleAddContact,
}) => {
  const [value, setValue] = useState(number);

  const handleChange = event => {
    const result = event.target.value.replace(/[^\d\s-+()]/g, ''); // Allows numbers, spaces, dashes, pluses and brackets
    setValue(result);
    handleInputChange(event);
  };

  return (
    <form className={css.form} onSubmit={handleAddContact}>
      <p>Name</p>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        maxLength={32}
        required
      />
      <p>Number</p>
      <input
        type="tel"
        name="number"
        value={value}
        onChange={handleChange}
        maxLength={15}
        // +1242 (Bahamas) 123 456 789 - 14 characters not counting spaces.
        // +48 123 456 789 - 15 characters with spaces so I guess 15 is the safest spot with keeping balance with styles.
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
};
