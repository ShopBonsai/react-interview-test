import React, { useState } from 'react';
import { Media } from 'reactstrap';

const ProductImage = ({ image }) => {
	const [loaded, setLoaded] = useState(false);

	const wrapperStyles = {
		position: 'relative',
		width: 300,
		height: 300,
	};

// absolute positioning the image so that it overlays the skeleton when it loads
	const ImageStyles = {
		position: 'absolute',
		top: 0,
		left: 0,
	};

	return (
		<Media left href='#' className='img'>
			<div style={wrapperStyles}>
				{loaded ? null : <Media className='pulse img' />}
				<Media
					object
					src={image}
					alt='Product image cap'
					onLoad={() => setLoaded(true)}
					style={ImageStyles}
				/>
			</div>
		</Media>
	);
};

export default ProductImage;
