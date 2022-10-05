import React from 'react';
import css from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({
  imageTags,
  imageUrl,
  largeImg,
  onClick,
}) {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick({ largeImg })}>
      <img
        className={css.ImageGalleryItem_image}
        src={imageUrl}
        alt={imageTags}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
