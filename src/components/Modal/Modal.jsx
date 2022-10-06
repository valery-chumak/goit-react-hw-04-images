import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../../styles/styles.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  const handleClose = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);

  return createPortal(
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
