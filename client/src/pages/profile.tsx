import React, { FunctionComponent } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useQuery, gql } from '@apollo/client';
import '../components/styles.css';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { colors } from '../styles';
import Order from '../components/order';
import requireAuth from '../requireAuth';

export const GET_USER = gql`
    query GET_USER {
        user {
            name
            email
        }
    }
`;
export const GET_ORDERS = gql`
    query GET_ORDERS {
        orders {
            success
            orders {
                _id
                userId
                orderDate
                status
                orderItems {
                    id
                    name
                    image
                    price
                    quantity
                }
            }
        }
    }
`;
type Order = {
    _id: string;
    userId: string;
    orderDate: string;
    status: string;
    orderItems: [OrderItem];
};
type OrderItem = {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
};

type OrdersProps = {
    orders: [Order];
    ordersLoading: boolean;
};

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const withOrderItems = Component => props => {
    const { data, loading, error } = useQuery(GET_ORDERS, {
        fetchPolicy: 'network-only',
    });
    if (loading) {
        return (
            <Container style={containerStyles}>
                <PacmanLoader color={colors.primary} />
            </Container>
        );
    }
    if (error) {
        return (
            <Container style={containerStyles}>
                Sorry, your orders are unavailable at the moment. Please try
                again later.
            </Container>
        );
    }
    return (
        <Component
            ordersLoading={loading}
            orders={data && data.orders && data.orders.orders}
            {...props}
        />
    );
};
const Profile: FunctionComponent<OrdersProps> = (props: OrdersProps) => {
    const { data, loading, error } = useQuery(GET_USER);
    const showOrderItems = () => {
        const { orders, ordersLoading } = props;
        if (!ordersLoading && orders && orders.length > 0) {
            return (
                <div>
                    <h4>Previous Orders</h4>
                    <Row style={{ padding: '15px' }}>
                        <Col>Date</Col>
                        <Col>Status</Col>
                        <Col>Total</Col>
                    </Row>
                    <div>
                        {orders.map(order => {
                            return <Order key={order._id} order={order} />;
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1 style={{ marginBottom: '100px' }}>
                        Welcome Back! Fred
                    </h1>
                    <h3>You have no orders</h3>
                </div>
            );
        }
    };
    if (loading) {
        return (
            <Container style={containerStyles}>
                <PacmanLoader color={colors.primary} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={containerStyles}>
                Sorry, your information is not available at the moment. Please
                try again later.
            </Container>
        );
    }
    console.log(data);
    return (
        <div>
            <Container>
                <div style={{ marginBottom: '100px' }}>
                    <h1>Welcome back {data.user.name}!</h1>
                    <h4>Email: {data.user.email}</h4>
                </div>
                {showOrderItems()}
            </Container>
        </div>
    );
};
export default requireAuth(withOrderItems(Profile));
