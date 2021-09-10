import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from '../Components/Searchbar/Searchbar';
import { ImageGallery } from '../Components/ImageGallery/ImageGallery';
// import Button from '../Components/Button/Button';
// import Loader from '../Components/Loader/Loader';
// import Modal from '../Components/Modal/Modal';

// import './App.css';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: 'idle',
    page: null,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    const API_KEY = '22656000-e53b2481d23a663acaf14b7cd';
    const URL = `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    if (prevState.imageName !== this.state.imageName) {
      const { data } = await axios.get(URL);
      console.log(data);
      this.setState({ images: data });
    }
  }

  render() {
    const { images } = this.state;
    const showImageList = images.length > 0;
    return (
      <div>
        <Searchbar onSearch={this.handleFormSubmit} />
        {showImageList && <ImageGallery images={images} />}
        {/* <Button />
        <Loader />
        <Modal />  */}
      </div>
    );
  }
}
