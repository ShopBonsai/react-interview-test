import React from 'react';
import { Navbar, Button, NavbarBrand, Badge } from 'reactstrap';

const Nav = ({ itemsInCart }) => {
	return (
		<Navbar color='light' sticky='top'>
			<NavbarBrand href='/'>Bonsai</NavbarBrand>
			<Button>
				Cart {itemsInCart > 0 && <Badge color='secondary'>{itemsInCart}</Badge>}
			</Button>
		</Navbar>
	);
};

export default Nav;
