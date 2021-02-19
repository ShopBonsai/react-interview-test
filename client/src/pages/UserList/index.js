import React, { Component } from 'react';
import { CardTitle, CardSubtitle, CardBody, Media, Spinner } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './styles.css';

const GET_USERS = gql`
  {
    users {
      id
      name
      role
      image
    }
  }
`;

/** this could probably be in its own compoment with generic names, and imported where needed */
const withUsers = Component => props => {
  return (
    <Query query={GET_USERS}>
      {({ loading, data }) => {
        return (
          <Component usersLoading={loading} users={data && data.users} {...props} />
        );
      }}
    </Query>
  );
};

class UserList extends Component {
  
    showUsers() {
      const { users, usersLoading } = this.props;

      if(usersLoading) {
        return (
            <div className="spinner">
              <Spinner color="primary" />
            </div>
        )
    }
  
      if (users && users.length > 0) {
        return users.map((user) => {
          const { id, name, role, image } = user // this keeps consistancy with the products componenet
          return (
            <a href={`/users/${id}`}>
              <Media key={id} className="user-card">
              <Media left>
                <Media object src={image} alt="user image cap" className="user-photo" />
                </Media>
                <CardBody>
                  <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
                  <CardSubtitle>Role: {role}</CardSubtitle>
                </CardBody>
              </Media>
            </a>
          );
        });
      } else {
        return (
          <div>
            <h3>No users available</h3>
          </div>
        );
      }
    }
  
    render() {
      return (
        <div>
          {this.showUsers()}
        </div>
      );
    }
  }
  export default withUsers(UserList)