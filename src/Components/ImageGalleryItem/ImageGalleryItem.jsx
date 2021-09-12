import { Galleryitm, Galleryimg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = image => {
  return (
    <Galleryitm key={image.id}>
      <Galleryimg src={image.webformatURL} alt="" />
    </Galleryitm>
  );
};
