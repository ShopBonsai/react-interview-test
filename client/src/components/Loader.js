import React from 'react';
import { Spinner } from 'reactstrap';

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
    },
    loader: {
        height: '3rem',
        width: '3rem',
    },
    text: {
        marginBottom: '1rem',
    },
    tile: {
        boxShadow: '5px 5px 15px rgb(136 10 142 / 40%)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center',
        padding: '2rem',
    },
};

const Container = ({ children }) => {
    return <div style={styles.container}>{children}</div>;
};

export const Loader = () => {
    return (
        <div>
            <Container>
                <div style={styles.tile}>
                    <h3 style={styles.text}>Loading products...</h3>
                    <Spinner style={styles.loader} color="primary" />
                </div>
            </Container>
        </div>
    );
};
