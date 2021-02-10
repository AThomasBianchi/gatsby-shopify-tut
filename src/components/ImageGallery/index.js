import React, { useEffect, useState } from 'react';
import Image from 'gatsby-image';
import { ImageGalleryWrapper } from './styles';
import ImageThumbnail from './ImageThumbnail';

export function ImageGallery({ selectedVariantImageId, images }) {
  const [activeImageThumbnail, setActiveImageThumbail] = useState(
    images.find(({ id }) => id === selectedVariantImageId) || images[0]
  )
  
  useEffect(() => {
    setActiveImageThumbail(images.find(({ id }) => id === selectedVariantImageId) || images[0])
  }, [selectedVariantImageId, images])

  const handleClick = (image) => {
    setActiveImageThumbail(image)
  }

  return (
    <ImageGalleryWrapper>
      <div>
        <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid}/>
      </div>
      <div>
        {images.map(image => {
          return <ImageThumbnail 
            key={image.id} 
            image={image}
            onClick={handleClick}
            isActive={image.id === activeImageThumbnail.id}/>
        })}
      </div>
    </ImageGalleryWrapper>
  );
}