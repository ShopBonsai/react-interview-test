import React from 'react';
import { Form, Button, Spinner } from 'reactstrap';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const ADD_TO_CART = gql`
	mutation addToCart($id: String!, $quantity: Int!) {
		addToCart(product: { id: $id, quantity: $quantity }) {
			success
			message
			totalNumberOfCartItems
		}
	}
`;

const AddToCart = ({ children, productId, quantity, updateCart }) => {
	const handleUpdateCart = (res) => {
		// TODO: check if not successful, implemement error toast/message
		if (res.data.addToCart.success) {
			updateCart(res.data.addToCart.totalNumberOfCartItems);
		}
	};

	return (
		<Form>
			{children}
			<Mutation
				mutation={ADD_TO_CART}
				variables={{ id: productId, quantity: quantity }}
			>
				{(AddToCart, { loading, error }) => {
					// TODO: implement better error handling
					if (error) console.log(error);

					return (
						<Button
							color='primary'
							size='lg'
							block
							onClick={() => AddToCart().then((res) => handleUpdateCart(res))}
							disabled={loading}
							style={{
								padding: loading ? '.30rem 1rem' : '.5rem 1rem',
							}}
						>
							{loading ? <Spinner color='light' /> : 'Add to cart'}
						</Button>
					);
				}}
			</Mutation>
		</Form>
	);
};

export default AddToCart;
