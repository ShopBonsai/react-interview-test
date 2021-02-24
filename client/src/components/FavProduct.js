import React, { Component } from 'react';

class FavProduct extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <small>- {this.props.favorite.name} by <b>{this.props.favorite.brand}</b><br/></small>
                <small>in color {this.props.favorite.color} and size {this.props.favorite.size} for ${this.props.favorite.price}<br/></small>
            </div>
        )
    }
}
export default FavProduct
