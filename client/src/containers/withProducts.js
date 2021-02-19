import { GET_PRODUCTS } from "../graphql";
import { Query } from "react-apollo";
import React from "react";

export const withProducts = (Component) => {
  const WrappedWithProducts = (props) => {
    return (
      <Query query={GET_PRODUCTS}>
        {({ data, loading }) => {
          return (
            <Component
              areMerchantsLoading={loading}
              merchants={data && data.merchants}
              {...props}
            />
          );
        }}
      </Query>
    );
  };

  WrappedWithProducts.displayName = "wrappedWithProducts";
  return WrappedWithProducts;
};
