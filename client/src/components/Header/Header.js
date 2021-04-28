import React from 'react';
import { fetchGet } from '../../helper/fetchHelper';
import '../styles.css';
import { Form, Label, Input } from 'reactstrap';

const Header = ({ username, onUsernameInput }) => {
  /*
   * NOTE: This is just for demonstration purposes.
   * Ideally you would want to store this information in a cookie or
   * other persistent storage on client
   */

  /*
   * authStatus => ENUM::string => ["IDLE", "PENDING", "AUTHED", "UN_AUTHED"]
   * Using ENUM-likes to manage the different HTTP "statuses"
   * This is preferable to using Booleans, ie. (isLoading), as it
   * it provides you more flexibility
   */

  const [authStatus, setAuthStatus] = React.useState(
    username === '' ? 'IDLE' : 'AUTHED'
  );

  const submitUsername = async e => {
    e.preventDefault();

    // TODO: Actually do a query over here if there is time
    /*
     * I had a terrible time with Apollo...
     * This is all hardcoded.
     */
    setAuthStatus('PENDING');

    // const res = await fetchGet('/users', { username });
    const res = await fetchGet(`/users?username=${username}`);

    const { user } = res;

    if (user !== undefined) {
      setAuthStatus('AUTHED');
      window.localStorage.setItem('username', user.username);
      window.localStorage.setItem('user_id', user.id);
    } else {
      setAuthStatus('UN_AUTHED');
      // TODO: Users deserve to know what has failed.
      /*
       * Only "clear" out necessary fields
       * Assure they are _obvious_ (outlined in red)
       * Change the .focus() to be the first invalid field
       */
    }
  };

  return (
    <>
      {/* TODO: ON_PENDING load a spinning gif, but... not now */}
      {authStatus === 'AUTHED' ? (
        <div className="display-name">
          <p>Greetings, {username}!</p>
        </div>
      ) : (
        <Form onSubmit={submitUsername} className="login-form">
          <Label htmlFor="username">
            Enter username
            <p>You are not currently signed in 😢</p>
          </Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={onUsernameInput}
            className={`${authStatus === 'UN_AUTHED' && 'failed-input'}`}
          />
        </Form>
      )}
    </>
  );
};

export default Header;
