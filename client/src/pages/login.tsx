import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { gql, useMutation, useQuery } from '@apollo/client';
import { isLoggedInVar } from '../createApolloClient';
import { navigate, Redirect } from '@reach/router';
import { IS_LOGGED_IN } from '../requireAuth';
import { GET_CART } from '../components/cart-total';

export const AUTH_GOOGLE = gql`
    mutation authGoogle($authGoogleAccessToken: String!) {
        authGoogle(accessToken: $authGoogleAccessToken) {
            token
            name
        }
    }
`;
const Login = props => {
    const {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);
    const [authGoogle, { loading, data, error }] = useMutation(AUTH_GOOGLE, {
        async onCompleted({ authGoogle: { token } }) {
            await localStorage.setItem('token', token);
            isLoggedInVar(true);
        },
    });
    const responseGoogle = response => {
        if (response.error) {
            //TODO: Handle Error
        }
        authGoogle({
            variables: {
                authGoogleAccessToken: response.accessToken,
            },
        });
    };
    if (isLoggedIn) {
        // TODO: Currently, it seems that the queries that need auth are pre-called without the token and cached. Window refresh to redirect ensures all calls have the token.
        // return <Redirect noThrow to="/" />;
        window.location.href = window.location.href.replace('login', '');
        return null;
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <GoogleLogin
                clientId="1057747297021-a6jjec4ohpsjr4gnc523afpes0nuuup4.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default Login;
