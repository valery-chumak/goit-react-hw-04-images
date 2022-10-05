import React from 'react';
import css from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ items, onClick }) {
  return (
    <ul className={css.ImageGallery}>
      {items.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imageTags={tags}
          imageUrl={webformatURL}
          largeImg={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
