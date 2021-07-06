import React from 'react';

const DropdownL = ({ list, value, handlerDisplayItems, type }) => {

  return (
    <div className="dropdown--list__item">

      <select name={type} id={type} value={value} onChange={handlerDisplayItems} className="dropdown--list__select">
        <option>Choose {type}</option>
        {list.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownL
