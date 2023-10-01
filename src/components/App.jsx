import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

const APIkey = '39764230-ed321e5fcf0eec48c182a2af6';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    isLoading: false,
    isModal: false,
    perPage: 12,
  };
  showLoadMore = false;
  modalData = {};

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.search.value;

    if (query) {
      this.setState(prevState => {
        if (prevState.query !== query) {
          return {
            query: query,
            page: 1,
            images: [],
          };
        }
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      const { query, page, perPage } = this.state;
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );
        if (!response.ok) {
          throw new Error(`error!`);
        }
        const responseData = await response.json();
        if (!responseData.totalHits) {
          this.showLoadMore = false;

          alert('There are no images matching your search query.');
        } else {
          if (this.state.page === 1) {
            this.setState({ images: [...responseData.hits] });
          } else {
            this.setState({
              images: [...prevState.images, ...responseData.hits],
            });
          }

          if (perPage * this.state.page >= responseData.totalHits) {
            this.showLoadMore = false;
          } else {
            this.showLoadMore = true;
          }
        }
      } catch (error) {
        this.showLoadMore = false;
        alert('Error. Please try again.');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  onClickImage = e => {
    document.addEventListener('keydown', this.keyDown);
    this.modalData = {
      img: e.target.dataset.bgimage,
      alt: e.target.dataset.alt,
    };
    this.setState({
      isModal: !this.state.isModal,
    });
  };
  keyDown = e => {
    if (e.code === 'Escape') {
      document.removeEventListener('keydown', this.keyDown);
      this.setState({
        isModal: !this.state.isModal,
        modalData: {},
      });
    }
  };
  closeModal = e => {
    if (e.target === e.currentTarget) {
      document.removeEventListener('keydown', this.keyDown);
      this.setState({
        isModal: !this.state.isModal,
        modalData: {},
      });
    }
  };
  render() {
    const { images, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {images[0] && this.showLoadMore && !isLoading && (
          <Button onClick={this.onClick} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isModal && (
          <Modal data={this.modalData} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
