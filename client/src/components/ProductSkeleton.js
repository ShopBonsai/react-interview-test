import React from 'react';
import { Media, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const ProductSkeleton = () => {
	return (
		<Media className='product-card'>
			<Media left className='pulse img'/>
			<CardBody className='w-100'>
				<CardTitle className='pulse w-75'/>
				<CardSubtitle className='pulse w-50 mb-2'/>
				<CardText className='pulse'/>
			</CardBody>
		</Media>
	);
};

export default ProductSkeleton;
