import React from 'react';
import { Container, Row, Col, CardTitle, CardText, Media } from 'reactstrap';

import { ProductCard } from './ProductCard';

const styles = {
    container: {
        boxShadow: '5px 5px 10px rgb(136 10 142 / 40%)',
        borderRadius: '10px',
        margin: '1rem',
        width: '95%',
    },
    left: {
        padding: '2rem',
    },
};

export const MerchantTile = ({ data }) => {
    const { merchant, companyDescription, logo, publishedState, products } =
        data;

    if (!publishedState) {
        // we only want to render a given merchant if they are published
        return null;
    }

    return (
        <>
            <Container style={styles.container} fluid={true}>
                <Row style={styles.row}>
                    <Col style={styles.left} sm="4">
                        <Row>
                            <Media
                                object
                                src={logo}
                                alt=" Merchant logo"
                                className="icon"
                            />
                            <CardTitle className="text-title">
                                {merchant}
                            </CardTitle>
                        </Row>
                        <CardText>
                            About {merchant}: {companyDescription}
                        </CardText>
                    </Col>
                    <Col sm="7">
                        {products &&
                            products.length > 0 &&
                            products.map((product) => (
                                <ProductCard key={product.id} data={product} />
                            ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
};
