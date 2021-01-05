import React from 'react';
import { Link } from "react-router-dom";

const ErrorPage = (props) =>{
  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1>Oops!</h1>
        <p>The page you’re looking for can’t be found. Go back to your previous page or use the search bar to try again.</p>

        <div className="actions">
          <Link to="/store" className="text-primary">Go to Store</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;