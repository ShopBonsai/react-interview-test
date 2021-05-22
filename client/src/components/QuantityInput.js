import React, { useState } from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

const QuantityInput = ({ availableQuantity, selectedQuantity, setSelectedQuantity }) => {

	const onInputChange = (e) => {
		const numericValue = parseInt(e.target.value, 10);
		if (numericValue) {
			setSelectedQuantity(
				numericValue > availableQuantity ? availableQuantity : numericValue
			);
		}
	};

	const onButtonClick = (action) => {
		// TODO: Show some message when the user is trying to add more items than available.
		if (action === 'increment') {
			selectedQuantity < availableQuantity
				? setSelectedQuantity(selectedQuantity + 1)
				: null;
		} else {
			// we assume that action === 'decrement'
			selectedQuantity > 1 ? setSelectedQuantity(selectedQuantity - 1) : null;
		}
	};

	return (
		<InputGroup className='mb-2 w-75'>
			<InputGroupAddon addonType='prepend'>
				<Button onClick={() => onButtonClick('decrement')}>-</Button>
			</InputGroupAddon>
			<Input
				type='number'
				min='1'
				max={availableQuantity}
				value={selectedQuantity}
				onChange={onInputChange}
			/>
			<InputGroupAddon addonType='append'>
				<Button onClick={() => onButtonClick('increment')}>+</Button>
			</InputGroupAddon>
		</InputGroup>
	);
};

export default QuantityInput;
