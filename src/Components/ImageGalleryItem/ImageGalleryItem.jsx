import { Component } from 'react';

export class ImageGalleryItem extends Component {
  selectedImg = e => {
    this.props.selectedImg(e.target.dataset.src);
    this.props.toggleModal();
  };

  render() {
    const { images } = this.props;
    return images.map(image => (
      <li key={image.id}>
        <img
          src={image.webformatURL}
          alt=""
          data-src={image.largeImageURL}
          onClick={this.selectedImg}
        />
      </li>
    ));
  }
}
