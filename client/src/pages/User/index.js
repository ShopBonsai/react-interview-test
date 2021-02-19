import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CardTitle, CardSubtitle, CardBody, Media, Spinner } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import './styles.css';

/** this could probably be in its own compoment with generic names, and imported where needed */
const withUser = Component => props => {
    const GET_USER = gql`
        query {
            user(id: "${props.match.params.userId}") {
                id
                name
                role
                image
            }
        }
        `;

  return (
    <Query query={GET_USER}>
      {({ loading, data }) => {
        return (
          <Component userLoading={loading} user={data && data.user} {...props} />
        );
      }}
    </Query>
  );
};

class User extends Component {
  
    showUser() {
      const { user, userLoading } = this.props;

      if(userLoading) {
          return (
              <div className="spinner">
                <Spinner color="primary" />
              </div>
          )
      }
  
      if (user) {
        const { id, name, role, image } = user // this keeps consistancy with the products componenet
        return (
        <div>
            <Media key={id} className="user-card">
            <Media left>
            <Media object src={image} alt="user image cap" className="user-photo" />
            </Media>
            <CardBody>
                <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
                <CardSubtitle>Role: {role}</CardSubtitle>
            </CardBody>
            </Media>
        </div>
        );
      } else {
        return (
          <div>
            <h3>User not available</h3>
          </div>
        );
      }
    }
  
    render() {
      return (
        <div>
          {this.showUser()}
        </div>
      );
    }
  }
  export default withRouter(withUser(User))