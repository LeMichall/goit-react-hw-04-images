import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
export const ImageGallery = ({ images, onClickImage }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              item={image}
              onClickImage={onClickImage}
            />
          );
        })}
      </ul>
    </div>
  );
};
ImageGallery.propTypes = {
  onClickImage: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
};
