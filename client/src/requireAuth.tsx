import { navigate } from '@reach/router';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

const requireAuth = Component => props => {
    const { data } = useQuery(IS_LOGGED_IN);
    if (data.isLoggedIn) {
        return <Component {...props} />;
    } else {
        navigate('/login', { replace: true });
    }
    return null;
};

export default requireAuth;
