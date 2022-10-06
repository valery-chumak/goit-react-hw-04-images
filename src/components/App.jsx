import React, { useState, useEffect } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from '../styles/styles.module.css';
import { searchPhotos } from './api/Api';
import Searchbar from './Searchbar/Searchbar';

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (search) {
      fetchPhotosSearch(search, page).then(response => {
        setItems(prev => [...prev, ...response]);
      });
    }
  }, [search, page]);

  const handleChangeState = search => {
    setItems([]);
    setSearch(search);
    setPage(1);
    setLoading(false);
  };
  const fetchPhotosSearch = async (search, page) => {
    setLoading(true);
    try {
      const data = await searchPhotos(search, page);
      return data.hits;
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const loadMore = () => {
    setPage(prev => {
      return prev + 1;
    });
    setLoading(false);
  };
  const openModal = ({ largeImg }) => {
    setShowModal(true);
    setModalContent(largeImg);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

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
