import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';

const APIkey = '39764230-ed321e5fcf0eec48c182a2af6';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showLoadMore, setShowLoadMore] = useState(false);
  const perPage = 12;

  const onSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.search.value;
    if (newQuery) {
      if (query !== newQuery) {
        setQuery(newQuery);
        setPage(1);
        setImages([]);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (page === 1) {
        setImages([]);
      }
      if (query.trim() === '') {
        setShowLoadMore(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );
        if (!response.ok) {
          throw new Error('Error!');
        }
        const responseData = await response.json();
        if (!responseData.totalHits) {
          setShowLoadMore(false);
          alert('There are no images matching your search query.');
        } else {
          if (page === 1) {
            setImages([...responseData.hits]);
          } else {
            setImages(prevImages => [...prevImages, ...responseData.hits]);
          }

          if (perPage * page >= responseData.totalHits) {
            setShowLoadMore(false);
          } else {
            setShowLoadMore(true);
          }
        }
      } catch (e) {
        setShowLoadMore(false);
        alert('Error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const onClick = () => {
    setPage(page + 1);
  };
  const onClickImage = e => {
    document.addEventListener('keydown', keyDown);
    setModalData({ img: e.target.dataset.bgimage, alt: e.target.dataset.alt });
    setIsModal(!isModal);
  };

  const keyDown = e => {
    if (e.code === 'Escape') {
      document.removeEventListener('keydown', keyDown);
      setIsModal(false);
      setModalData({});
    }
  };
  const closeModal = e => {
    if (e.target === e.currentTarget) {
      document.removeEventListener('keydown', keyDown);
      setIsModal(!isModal);
      setModalData({});
    }
  };
  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClickImage={onClickImage} />
      {images[0] && showLoadMore && !isLoading && <Button onClick={onClick} />}
      {isLoading && <Loader />}
      {isModal && <Modal data={modalData} closeModal={closeModal} />}
    </div>
  );
};
