import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

class Notifier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({ visible: false })
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.byIds) {
            const current = Object.values(nextProps.byIds).reduce((acc, curr) => {
                return {
                    quantity: curr.newQuantity,
                    item: curr.product
                }
            }, {})
            if (current.quantity) {
                this.setState({ visible: true })
                this.setState({ text: `${current.quantity} ${current.item.name} added to your cart.`})
            }
        }
    }
    render() {
        return(
            <div className='notifier-bar'>
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {this.state.text}
                </Alert>
            </div>
        )
    }
}
const mapStateToProps = (state) =>({
    byIds: state.cart.byIds,
});
export default connect(mapStateToProps)(Notifier);
