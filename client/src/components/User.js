import React, { Component } from 'react';
import { Query } from 'react-apollo';
import GET_USER_BY_ID from '../graphql/queries/getUserById';
import GET_PRODUCT_BY_ID from '../graphql/queries/getProductById';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/actions';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import FavProduct from './FavProduct'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({ isOpen: !this.state.isOpen })
    }
    setUser(data) {
        this.props.setCurrentUser({ user: data.user })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.currentUser && nextProps.currentUser.likes) {
            this.setState({ likes: nextProps.currentUser.likes.length })
        }
    }
    render() {
        return(
            <div>
                <Query query={ GET_USER_BY_ID }
                       variables={{ userId: this.props.currentUser.userId }}
                       onCompleted={ data => this.setUser(data) }
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>Error ☠️</div>
                        return (
                            <div>
                                <small>{data.user.firstName} {data.user.lastName}<br/></small>
                            </div>
                        );
                    }}
                </Query>
                <Button id='Popover1' type='button' size='sm' onClick={()=> this.toggle()}>
                    <small>♥️ {this.state.likes} favorite{this.state.likes > 1 ? 's' : null} </small>
                </Button>
                <Popover placement="bottom" isOpen={this.state.isOpen} target="Popover1" toggle={() => this.toggle}>
                    <PopoverHeader>My fav products ♥️</PopoverHeader>
                    <PopoverBody>
                        {
                         this.state.likes > 0 ?
                            <div>{
                                this.props.currentUser.likes.map(item => {
                                    return (
                                        <div key={item}>
                                            <Query
                                                query={GET_PRODUCT_BY_ID}
                                                variables={{ productId: item }}>
                                                {({ loading, error, data }) => {
                                                    if (loading) return <div>Loading...</div>
                                                    if (error) return <div>Error ☠️</div>
                                                    return (
                                                        <FavProduct key={item}
                                                            favorite={data.productById}
                                                        />
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                    )
                                })
                            }</div>
                         : 0
                        }
                    </PopoverBody>
                </Popover>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    currentUser: state.user.data
});
const mapDispatchToProps = {
    setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
