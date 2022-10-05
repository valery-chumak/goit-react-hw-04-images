import React, { Component } from 'react';
import css from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ search: '' });
  };
  render() {
    const { search } = this.state;
    const { handleSubmit, handleChange } = this;
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
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
