import React, {Component} from 'react';
import { connect } from "react-redux";
import { addToCart, setLikedProduct } from '../redux/actions';
import { Mutation } from 'react-apollo';
import SET_LIKED_ITEM from '../graphql/mutations/setLikedItem'
import { CardTitle, CardSubtitle, CardText, ButtonGroup, Button, CardBody, Media,  InputGroup, InputGroupAddon, Input} from 'reactstrap';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };
        this.setQuantity = this.setQuantity.bind(this);
        this.likeProduct = this.likeProduct.bind(this);
        this.isLiked = this.isLiked.bind(this);
    }
    setQuantity(quantity) {
        this.setState({ quantity: quantity });
    }
    handleProduct(product, quantity) {
        this.props.addToCart({
            quantity,
            product
        });
        this.setState({ quantity: 1 })
    }
    isLiked(productId) {
        if (this.props && this.props.currentUser && this.props.currentUser.likes) {
            return this.props.currentUser.likes.includes(productId);
        }
        return false
    }
    likeProduct(mutation, product) {
        mutation();
        this.props.setLikedProduct({
            product
        });
    }
    render() {
        return (
            <div>
                <Media className='product-card'>
                    <Media left href='#'>
                        <Media object src={this.props.product.image} alt='Product image cap'/>
                    </Media>
                    <CardBody>
                        <CardTitle style={{fontWeight: 600}}>{this.props.product.name}</CardTitle>
                        <CardTitle>Price: ${this.props.product.price}</CardTitle>
                        <CardSubtitle>Color: {this.props.product.color}</CardSubtitle>
                        <CardSubtitle>Size: {this.props.product.size}</CardSubtitle>
                        <CardText>Details: {this.props.product.description}</CardText>
                        <InputGroup style={{marginBottom: '4px'}}>
                            <InputGroupAddon addonType='prepend'>
                                Quantity
                            </InputGroupAddon>
                            <Input type='number'
                                   value={this.state.quantity}
                                   onChange={event => this.setQuantity(event.target.value)} />
                        </InputGroup>
                        <ButtonGroup size='lg' className='button-group'>
                            <Mutation mutation={SET_LIKED_ITEM} variables={{ userId: this.props.currentUser.userId, productId: this.props.product.id }}>
                                {(setLikedItem, { loading, error, data }) => {
                                if (loading) return <div>Loading...</div>
                                if (error) return <div>Error ☠️</div>
                                 return (
                                     <Button
                                         block
                                         className='like-color'
                                         disabled={ this.isLiked(this.props.product.id) || data && data.setLikedItem.isLiked }
                                         onClick={() => this.likeProduct(setLikedItem, this.props.product)}>♥️
                                    </Button>
                                 )
                                }}
                            </Mutation>
                            <Button color='primary' block onClick={() => this.handleProduct(this.props.product, Number(this.state.quantity))}>Buy</Button>
                        </ButtonGroup>
                    </CardBody>
                </Media>
            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    byIds: state.cart.byIds,
    currentUser: state.user.data
});
const mapDispatchToProps = {
    addToCart,
    setLikedProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
