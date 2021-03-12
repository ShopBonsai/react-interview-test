import React from 'react';
import { Col, Row } from 'reactstrap';
import ProductsList from '../components/templates/Products';
export const HomePage = () => (
    <Row>
        <Col>
            <h1>All Products</h1>
            <ProductsList />
        </Col>
    </Row>
)