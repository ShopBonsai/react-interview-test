import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './createApolloClient';
import { Products, Nav } from './components';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemsInCart: 0,
		};
		this.updateCart = this.updateCart.bind(this)
	}

	updateCart(quantity) {
		this.setState({ itemsInCart: quantity });
	}

	render() {
		return (
			<ApolloProvider client={apolloClient}>
				<Nav itemsInCart={this.state.itemsInCart} />
				<Products updateCart={this.updateCart} />
			</ApolloProvider>
		);
	}
}

export default App;