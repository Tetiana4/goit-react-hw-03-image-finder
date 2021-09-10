import React from 'react';
// import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ images }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li key={image.id}>
          <img
            src="image.webformatURL"
            alt=""
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </ul>
  );
};
