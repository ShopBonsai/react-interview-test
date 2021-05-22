import React, { useState } from 'react';
import { CardTitle, CardSubtitle, CardText, CardBody, Media } from 'reactstrap';
import { ProductImage, AddToCart, QuantityInput } from './';

const Product = ({ product, updateCart }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const { color, description, image, name, price, size, id, quantity } =
		product;

	return (
		<Media key={id} className='product-card'>
			<ProductImage image={image} />
			<CardBody>
				<CardTitle style={{ fontWeight: 600 }}>{name}</CardTitle>
				<CardTitle>Price: {price}</CardTitle>
				<CardSubtitle>Color: {color}</CardSubtitle>
				<CardSubtitle>Size: {size}</CardSubtitle>
				<CardText>Details: {description}</CardText>
				<AddToCart
					quantity={selectedQuantity}
					productId={id}
					quantity={selectedQuantity}
					updateCart={updateCart}
				>
					<QuantityInput
						availableQuantity={quantity}
						selectedQuantity={selectedQuantity}
						setSelectedQuantity={setSelectedQuantity}
					/>
				</AddToCart>
			</CardBody>
		</Media>
	);
};

export default Product;
