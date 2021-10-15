import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../components/Button/Button';
import { Spinner } from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';

import '../App.css';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: 'idle',
    page: 1,
    showModal: false,
    largeUrl: '',
  };

  handleFormSubmit = imageName => {
    if (this.state.imageName === imageName) {
      toast('😲 You are so boring... Maybe something new');
      return;
    }
    this.resetState();
    this.setState({ imageName });
  };

  handleSelectedImg = imageUrl => {
    this.setState({ selectedImg: imageUrl });
  };

  resetState = () => {
    this.setState({
      imageName: null,
      images: [],
      status: 'idle',
      page: 1,
      showModal: false,
      largeUrl: '',
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  selectedImg = data => {
    this.setState({
      largeUrl: data,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: this.state.page + 1,
      // page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;

    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        status: 'pending',
      });

      if (imageName.trim() === '') {
        this.setState({
          status: 'idle',
        });
        return toast.error('Common... write something.');
      }

      try {
        const images = await fetchImages(imageName, page);

        if (images.length === 0) {
          this.setState({
            status: 'idle',
          });
          return toast.error('Please, write something better');
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));

        toast('🎉 Hope you are enjoy');
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('Error');
      }

      page > 1 &&
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    }
  }

  render() {
    const { images, status, showModal, largeUrl } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleFormSubmit} />
        {status === 'pending' && <Spinner />}
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            toggleModal={this.toggleModal}
            selectedImg={this.selectedImg}
          />
        </ImageGallery>
        {images.length > 11 && <Button onClick={this.onLoadMore} />}

        {showModal && (
          <Modal
            largeImg={largeUrl}
            showLoader={showModal}
            toggleModal={this.toggleModal}
          />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
