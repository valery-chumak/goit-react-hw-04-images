import React, { useState } from 'react';
import css from '../../styles/styles.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearch(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchForm_button}
          // onClick={handleSubmit}
        >
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          name="search"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
