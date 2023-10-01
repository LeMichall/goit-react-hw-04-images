import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onClickImage }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
        onClick={onClickImage}
        data-bgimage={item.largeImageURL}
        data-alt={item.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func,
  item: PropTypes.shape({
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }),
};
