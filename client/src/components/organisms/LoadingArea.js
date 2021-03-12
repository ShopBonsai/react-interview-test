import React from 'react';
import { Spinner } from 'reactstrap';

import './LoadingArea.css';

export const LoadingArea = () => (
  <div className='loading-area'>
    <Spinner size='lg' />
  </div>
)