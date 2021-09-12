import { Component } from 'react';

export class ImageGalleryItem extends Component {
  writeSrcState = e => {
    this.props.writeSrcState(e.target.dataset.src);
    this.props.toogleModal();
  };

  render() {
    const { images } = this.props;
    return images.map(image => (
      <li key={image.id}>
        <img
          src={image.webformatURL}
          alt=""
          data-src={image.largeImageURL}
          onClick={this.writeSrcState}
        />
      </li>
    ));
  }
}
