import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeFromCart} from '../redux/actions';
import {Button} from 'reactstrap';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsAdded: false,
            subtotal: 0,
            taxes:0,
            total: 0
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.byIds) {
            this.setState({ itemsAdded: true })
            this.setState({ products: nextProps.byIds })
            const subtotal = Object.values(nextProps.byIds).reduce((acc, curr) => {
                if(!curr.newQuantity) return 0
                acc += (curr.product.price * curr.newQuantity)
                return acc
            }, 0).toFixed(2)
            this.setState({ subtotal: subtotal })
            this.getTax(subtotal)
        }
    }
    removeProduct(productId) {
        this.props.removeFromCart(productId)
    }
    getTax(subtotal) {
        const estimatedTax = 12
        const totalTax = ((subtotal * estimatedTax)/100).toFixed(2)
        this.setState({ taxes: totalTax })
        this.getTotal(subtotal, totalTax)
    }
    getTotal(subtotal, totalTax) {
        const total = (Number(subtotal) + Number(totalTax)).toFixed(2)
        this.setState({ total: total })
    }
    render() {
        return (
            <div className='cart-sidebar'>
                <h6>Your Cart</h6>
                { this.state.itemsAdded ?
                    <div>
                        <ul>
                        { Object.values(this.state.products).length > 0 && Object.values(this.state.products).map((product, index) =>
                            <li key={product && product.product ? product.product.id : index} className='cart-item'>
                                <div>
                                    <p>{product.product.name}</p>
                                    <small>Size: {product.product.size}<br/></small>
                                    <small>Color: {product.product.color}<br/></small>
                                    <small>Quantity: {product.newQuantity}<br/></small>
                                    <small>Price: ${Number(product.newQuantity * product.product.price).toFixed(2)}</small>
                                </div>
                                { product && product.product ? <Button color="danger" size="sm" onClick={() => this.removeProduct(product.product.id)} block>Remove</Button> : ''}
                            </li>
                        )}
                        </ul>
                        {Object.values(this.state.products).length > 0 ?
                            <div className='cart-summary-wrapper'>
                                <div className='cart-summary'>
                                    <p><b>SUBTOTAL: ${this.state.subtotal}</b></p>
                                    <p>Estimated Tax: ${this.state.taxes}</p>
                                    <p><b>TOTAL: ${this.state.total}</b></p>
                                    <Button block
                                        color="success"
                                        disabled={true}
                                        size="lg" >CHECKOUT <small>coming soon</small></Button>
                                </div>
                            </div> : '' }
                    </div>
                 : <div>No products yet 🙃</div> }
            </div>
        )
    }
}
const mapStateToProps = (state) =>({
    byIds: state.cart.byIds
});
const mapDispatchToProps = {
    removeFromCart
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
