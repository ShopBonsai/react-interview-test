import React, { FunctionComponent } from 'react';
import { Col, Row } from 'reactstrap';
import { Link } from '@reach/router';
import { colors } from '../styles';
import CartTotal from './cart-total';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../requireAuth';

const linkStyles = {
    color: 'black',
    '&:hover': {
        color: colors.primary,
    },
};
const Footer: FunctionComponent = () => {
    const {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);
    if (!isLoggedIn) return null;
    return (
        <footer
            style={{
                margin: '0 auto',
                padding: '50px',
                backgroundColor: 'white',
                boxShadow: '-1px -2px lightgray',
                position: 'fixed',
                width: '100%',
                bottom: 0,
                textAlign: 'center',
                color: 'black',
            }}
        >
            <Row>
                <Col>
                    <Link style={linkStyles} to="/">
                        Home
                    </Link>
                </Col>
                <Col>
                    <Link style={linkStyles} to="/cart">
                        Cart <CartTotal />
                    </Link>
                </Col>
                <Col>
                    <Link style={linkStyles} to="/profile">
                        Profile
                    </Link>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
