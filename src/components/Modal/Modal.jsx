import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ data, closeModal }) => {
  const { img, alt } = data;
  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  data: PropTypes.shape({
    img: PropTypes.string,
    alt: PropTypes.string,
  }),
};
