import React, { useState } from 'react';
import { Media } from 'reactstrap';
import SkeletonImage from './SkeletonImage';

const ProgressiveImage = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {!imageLoaded && <SkeletonImage /> }
      <Media object src={src} alt="Product image cap" onLoad={() => setImageLoaded(true)} />
    </>
  )
}

export default ProgressiveImage;