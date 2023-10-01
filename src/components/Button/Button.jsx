import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ onClick }) => {
  return (
    <div className={css.buttonContainer}>
      <button type="button" onClick={onClick} className={css.button}>
        Load More
      </button>
    </div>
  );
};
Button.propTypes = {
  onclick: PropTypes.func,
};
