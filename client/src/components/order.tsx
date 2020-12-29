import React, { FunctionComponent } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';

type OrderItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};
type OrderInterface = {
    userId: string;
    orderDate: string;
    status: string;
    orderItems: [OrderItem];
};
type OrderProps = {
    order: OrderInterface;
};
const Order: FunctionComponent<OrderProps> = ({ order }) => {
    const { orderDate, status, orderItems } = order;
    const orderTotal = orderItems
        .reduce((a, b) => {
            return a + b.quantity * b.price;
        }, 0)
        .toFixed(2);
    return (
        <div style={{ margin: '20px 0' }}>
            <Row>
                <Col>{moment(orderDate).format('MMMM Do YYYY, h:mm:ss a')}</Col>
                <Col>{status.toUpperCase()}</Col>
                <Col>{orderTotal}</Col>
            </Row>
            <Row style={{ marginLeft: '50px' }}>
                {orderItems.map(orderItem => (
                    <div style={{ width: '100%' }} key={orderItem.id}>
                        {orderItem.name}
                    </div>
                ))}
            </Row>
        </div>
    );
};

export default Order;
