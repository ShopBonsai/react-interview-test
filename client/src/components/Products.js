import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Alert, Spinner } from "reactstrap";

import { Product } from "./Product";

import "./styles.css";

const GET_PRODUCTS = gql`
  query GetProducts {
    merchants {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

export const ProductsList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <div className="text-center mt-40">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="danger">
        {error.message || "Oops something went wrong"}
      </Alert>
    );
  }

  if (!loading && data.merchants && data.merchants.length > 0) {
    return (
      <div>
        {data.merchants.map(({ products }) => {
          return (
            products &&
            products.length > 0 &&
            products.map((product) => <Product key={product.id} {...product} />)
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <h3>No products available</h3>
    </div>
  );
};
