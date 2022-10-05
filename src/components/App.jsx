import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from '../styles/styles.module.css';
import { searchPhotos } from './api/Api';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    showModal: false,
    modalContent: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevSearch = prevState.search;
    const curSearch = this.state.search;
    if (prevProps.search !== this.props.search) {
      this.handleChangeState();
    }
    if (prevSearch !== curSearch) {
      this.fetchPhotosSearch().then(response => {
        this.setState({
          items: response,
          page: page + 1,
        });
      });
    }
  }

  handleChangeState = ({ search }) => {
    this.setState({
      search: search,
      page: 1,
      loading: true,
    });
  };
  async fetchPhotosSearch() {
    const { search, page } = this.state;
    this.setState({ loading: true });

    try {
      const data = await searchPhotos(search, page);
      return data.hits;
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }
  loadMore = () => {
    const { search, page } = this.state;
    this.setState({ loading: true });
    this.fetchPhotosSearch(search, page).then(response => {
      this.setState(prevState => ({
        items: [...prevState.items, ...response],
        page: prevState.page + 1,
        loading: false,
      }));
    });
  };
  openModal = ({ largeImg }) => {
    this.setState({
      showModal: true,
      modalContent: largeImg,
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: '',
    });
  };
  render() {
    const { items, loading, error, showModal, modalContent } = this.state;
    const { loadMore, handleChangeState, closeModal, openModal } = this;
    const isImages = Boolean(items.length);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleChangeState} />
        {isImages && <ImageGallery items={items} onClick={openModal} />}
        {showModal && (
          <Modal onClose={closeModal}>
            <img src={modalContent} alt="" />
          </Modal>
        )}
        {loading && <Loader />}
        {error && <h2>Sorry. Something get wrong. Try later.</h2>}
        {isImages && <Button onClick={loadMore} />}
      </div>
    );
  }
}
