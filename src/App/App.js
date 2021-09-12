import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../services/api';
import { Container } from './App.styled';
import { Searchbar } from '../Components/Searchbar/Searchbar';
import { ImageGallery } from '../Components/ImageGallery/ImageGallery';
import { Button } from '../Components/Button/Button';
import { Spinner } from '../Components/Loader/Loader';
import Modal from '../Components/Modal/Modal';
import '../App.css';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: 'idle',
    page: 1,
    showModal: false,

    modalSrc: '',
  };

  toogleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
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
          toast.error('Please, write something better');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));

        // this.setState({
        //   images,
        //   status: 'resolved',
        // });

        toast('Hope you are enjoy');
      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error('Error');
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, showModal } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleFormSubmit} />
        {status === 'pending' && <Spinner />}
        <ImageGallery images={images} />
        {images.length > 1 && <Button onClick={this.onLoadMore} />}

        {/* {isShowImageList && <ImageGallery images={images} />} */}

        {showModal && <Modal />}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
