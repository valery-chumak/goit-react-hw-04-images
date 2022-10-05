import React from 'react';
import css from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
export default function Button({ onClick }) {
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
