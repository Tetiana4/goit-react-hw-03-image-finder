import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { Searchbar } from '../Components/Searchbar/Searchbar';
import { ImageGallery } from '../Components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../Components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Components/Button/Button';
import { Spinner } from '../Components/Loader/Loader';
import Modal from '../Components/Modal/Modal';

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
    this.setState({ imageName });
  };

  handleSelectedImg = imageUrl => {
    this.setState({ selectedImg: imageUrl });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;

    if (prevState.imageName !== this.state.imageName) {
      if (imageName.trim() === '') {
        return toast.error('Common... write something.');
      }

      try {
        this.setState({ status: 'pending', images: [] });
        const images = await fetchImages(imageName, page);

        if (images.length === 0) {
          return toast.error('Please, write something better');
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));

        toast('Hope you are enjoy');
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

  toogleModal = () => {
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
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, showModal, largeUrl } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleFormSubmit} />
        {status === 'pending' && <Spinner />}
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            toogleModal={this.toogleModal}
            writeSrcState={this.selectedImg}
          />
        </ImageGallery>
        {images.length > 0 && <Button onClick={this.onLoadMore} />}

        {showModal && (
          <Modal
            largeImg={largeUrl}
            showLoader={showModal}
            toogleModal={this.toogleModal}
          />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
