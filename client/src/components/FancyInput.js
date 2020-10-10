import React from 'react';
import './fancyInput.css'

const FancyInput = ({ onChange, placeholder = 'Placeholder' }) => (
  <div className="input-container">
    <input className="input-field" onChange={onChange} type="text" placeholder={placeholder} />
    <span className="focus-border"></span>
  </div>
)

export default FancyInput;