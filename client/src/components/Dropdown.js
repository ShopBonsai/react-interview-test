import React, { useState } from "react";
import {
  Dropdown as DropdownReactstrap,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Dropdown = ({ quantity = 0, selectedQuantity, handleSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  // generate array of integers in range 1..quantity
  const quantityItems = Array.from({ length: quantity }, (_, i) => i + 1);

  return (
    <DropdownReactstrap isOpen={dropdownOpen} toggle={toggle} direction="down">
      <DropdownToggle caret>Quantity: {selectedQuantity}</DropdownToggle>
      <DropdownMenu>
        {quantityItems.map(quantityValue => (
          <DropdownItem
            value={quantityValue}
            onClick={handleSelect}
            key={quantityValue}
          >
            {quantityValue}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownReactstrap>
  );
};

export default Dropdown;
