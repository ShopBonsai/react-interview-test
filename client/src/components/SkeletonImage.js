import React from 'react';
import './skeletonImage.css';

const SkeletonImage = () => (
  <div className="skeleton-wrapper">
    <div className="placeholder">
      <div className="animated-background"></div>
    </div>
  </div>
)

export default SkeletonImage;