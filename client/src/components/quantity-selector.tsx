import React from 'react';

import { Container, Col, Row } from 'reactstrap';

const QuantitySelector = (props: any) => {
    return (
        <Container
            style={{
                padding: '15px',
                width: '200px',
                border: '1px solid lightgray',
                margin: '20px 0',
                textAlign: 'center',
                backgroundColor: 'white',
            }}
        >
            <Row style={{ color: 'gray' }}>
                <Col
                    style={{ cursor: 'pointer' }}
                    onClick={props.onDecreaseQuantity}
                >
                    -
                </Col>
                <Col>{props.quantity}</Col>
                <Col
                    style={{ cursor: 'pointer' }}
                    onClick={props.onIncreaseQuantity}
                >
                    +
                </Col>
            </Row>
        </Container>
    );
};

export default QuantitySelector;
